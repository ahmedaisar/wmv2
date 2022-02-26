import { writable } from "svelte/store";

export const hotels = writable([]);

const fetcHotels = async () => {

    const response = await fetch("https://www.simplymaldivesholidays.co.uk/wp-admin/admin-ajax.php?action=resorts_list_all", {
        headers: { 'x-requested-with': 'XMLHttpRequest' },
    });

    let data = await response.json();

    hotels.set(data);
}

fetcHotels();
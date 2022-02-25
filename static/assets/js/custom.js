var CSRF_TOKEN = jQuery('meta[name="csrf-token"]').attr('content');
var GL = GL || {};
var GL_FILTER = GL_FILTER || {};
var GL_BOOKING = GL_BOOKING || {};
var GL_BUSINESS_SEARCH = GL_BUSINESS_SEARCH || {};
const PRICE_RANGE = {
    null: "None",
    0: "Free",
    1: "$",
    2: "$$",
    3: "$$$",
    4: "$$$$",
};

(function ($) {
    "use strict";

    var menu_filter_wrap = jQuery('.golo-menu-filter');

    GL = {
        init: function () {
            GL.keypressInputSearch();

            GL.addWishList();
            GL.removeWishList();
            GL.submitLogin();
            GL.submitRegister();
            GL.submitForgotPassword();
        },

        keypressInputSearch: function () {
            jQuery('.golo-ajax-search').on('input', 'input[name="keyword"]', function () {
                var $this = jQuery(this);
                if ($this.val()) {
                    GL.ajaxSearch($this);
                } else {
                    $this.parents('.golo-ajax-search').find('.search-result').hide();
                }
            });
        },

        ajaxSearch: function ($this) {
            let keyword = $this.parents('.golo-ajax-search').find('input[name="keyword"]').val();

            // call api
            jQuery.ajax({
                // dataType: 'json',
                url: `${app_url}/ajax-search`,
                data: {
                    'keyword': keyword
                },
                beforeSend: function () {
                    $this.parents('.golo-ajax-search').addClass('active');
                    // $this.parents('.golo-ajax-search').find('.golo-loading-effect').fadeIn();
                },
                success: function (data) {
                    $this.parents('.golo-ajax-search').find('.search-result').fadeIn(300);
                    $this.parents('.golo-ajax-search').removeClass('active');

                    if (data) {
                        $this.parents('.golo-ajax-search').find('.search-result').html(data);
                    } else {
                        $this.parents('.golo-ajax-search').find('.search-result').html('<div class="golo-ajax-result">No place found</div>');
                    }

                    GL.clickOutside('.search-result');
                },
                error: function (e) {
                    console.log(e);
                }
            });
        },

        addWishList: function () {
            jQuery(document).on("click", ".add_wishlist", function (event) {
                event.preventDefault();
                var $this = jQuery(this);
                let place_id = jQuery(this).attr('data-id');
                jQuery.ajax({
                    type: "POST",
                    url: `${app_url}/wishlist`,
                    data: {
                        '_token': CSRF_TOKEN,
                        'place_id': place_id
                    },
                    dataType: 'json',
                    beforeSend: function () {
                        $this.html('<i class="golo-loading"></i>');
                    },
                    success: function (response) {
                        if (response.code === 200) {
                            $this.addClass('active');
                            $this.addClass('remove_wishlist');
                            $this.removeClass('add_wishlist');
                            $this.html('<i class="la la-bookmark la-24"></i>');
                        }
                    },
                    error: function (jqXHR) {
                        var response = jQuery.parseJSON(jqXHR.responseText);
                        if (response.message) {
                            alert(response.message);
                        }
                    }
                });
            });
        },
        removeWishList: function () {
            jQuery(document).on("click", ".remove_wishlist", function (event) {
                event.preventDefault();
                var $this = jQuery(this);
                let place_id = jQuery(this).attr('data-id');
                jQuery.ajax({
                    type: "delete",
                    url: `${app_url}/wishlist`,
                    data: {
                        '_token': CSRF_TOKEN,
                        'place_id': place_id
                    },
                    dataType: 'json',
                    beforeSend: function () {
                        $this.html('<i class="golo-loading"></i>');
                    },
                    success: function (response) {
                        if (response.code === 200) {
                            $this.removeClass('active');
                            $this.removeClass('remove_wishlist');
                            $this.addClass('add_wishlist');
                            $this.html('<i class="la la-bookmark la-24"></i>');
                        }
                    },
                    error: function (jqXHR) {
                        var response = jQuery.parseJSON(jqXHR.responseText);
                        if (response.message) {
                            alert(response.message);
                        }
                    }
                });
            });
        },

        submitLogin: function () {
            jQuery('#login').submit(function (event) {
                event.preventDefault();
                let $form = jQuery(this);
                let formData = getFormData($form);
                jQuery('#submit_login').text('Loading...').prop('disabled', true);
                jQuery.ajax({
                    type: "POST",
                    url: `${app_url}/login`,
                    data: formData,
                    dataType: 'json',
                    success: function (response) {
                        jQuery('#submit_login').text('Login').prop('disabled', false);
                        if (response.code === 200) {
                            location.reload();
                        } else {
                            jQuery('#login_error').show().text(response.message);
                        }
                    },
                    error: function (jqXHR) {
                        jQuery('#submit_login').text('Login').prop('disabled', false);
                        var response = jQuery.parseJSON(jqXHR.responseText);
                        if (response.message) {
                            alert(response.message);
                        }
                    }
                });

            });
        },
        submitRegister: function () {
            jQuery('#register').submit(function (event) {
                event.preventDefault();
                let $form = jQuery(this);
                let formData = getFormData($form);
                jQuery('#submit_register').text('Loading...').prop('disabled', true);
                jQuery.ajax({
                    type: "POST",
                    url: `${app_url}/register`,
                    data: formData,
                    dataType: 'json',
                    success: function (response) {
                        jQuery('#submit_register').text('Register').prop('disabled', false);
                        if (response.code === 200) {
                            location.reload();
                        } else {
                            jQuery('#register_error').show().text(response.message);
                        }
                    },
                    error: function (jqXHR) {
                        jQuery('#submit_register').text('Register').prop('disabled', false);
                        var response = jQuery.parseJSON(jqXHR.responseText);
                        if (response.message) {
                            alert(response.message);
                        }
                    }
                });
            });
        },
        submitForgotPassword: function () {
            jQuery('#forgot_password').submit(function (event) {
                event.preventDefault();
                let $form = jQuery(this);
                let formData = getFormData($form);
                jQuery('#submit_forgot_password').text(`Loading...`).prop('disabled', true);
                jQuery.ajax({
                    type: "POST",
                    url: `${app_url}/api/user/reset-password`,
                    data: formData,
                    dataType: 'json',
                    success: function (response) {
                        jQuery('#submit_forgot_password').text('Forgot password').prop('disabled', false);
                        if (response.code === 200) {
                            jQuery('#fp_success').show().text(response.message);
                        } else {
                            jQuery('#fp_error').show().text(response.message);
                        }
                    },
                    error: function (jqXHR) {
                        jQuery('#submit_forgot_password').text('Forgot password').prop('disabled', false);
                        var response = jQuery.parseJSON(jqXHR.responseText);
                        if (response.message) {
                            alert(response.message);
                        }
                    }
                });

            });
        },

        clickOutside: function (element) {
            jQuery(document).on('click', function (event) {
                var $this = jQuery(element);
                if ($this !== event.target && !$this.has(event.target).length) {
                    $this.fadeOut(300);
                }
            });
        },

    };

    GL_FILTER = {
        init: function () {
            GL_FILTER.filterToggle();
            GL_FILTER.filterPlace();
            GL_FILTER.filterClear();

        },

        // Show/Hide filter panel
        filterToggle: function () {
            jQuery('.golo-filter-toggle').on('click', function (e) {
                e.preventDefault();
                jQuery(this).toggleClass('active');
                jQuery(this).parents('.city-content__panel').find('.golo-menu-filter').slideToggle(300);
            });
        },

        filterPlace: function () {
            // click filter: Sort By, Price Filter
            jQuery('.golo-menu-filter ul.filter-control a').on('click', function (e) {
                e.preventDefault();
                jQuery('.golo-pagination').find('input[name="paged"]').val(1);

                if (jQuery(this).parent().hasClass('active')) {
                    jQuery(this).parents('.golo-menu-filter ul.filter-control').find('li').removeClass('active');
                } else {
                    jQuery(this).parents('.golo-menu-filter ul.filter-control').find('li').removeClass('active');
                    jQuery(this).parent().addClass('active');
                }
                var ajax_call = true;
                GL_FILTER.ajaxFilter();
            });

            // click filter: Types, Amenities
            jQuery('.golo-menu-filter input.input-control').on('input', function () {
                jQuery('.golo-pagination').find('input[name="paged"]').val(1);
                var ajax_call = true;
                GL_FILTER.ajaxFilter();
            });
        },

        // Show/Hide button Clear All
        filterDisplayClear: function () {
            if (jQuery('.golo-menu-filter ul.filter-control li.active').length > 0) {
                jQuery('.golo-nav-filter').addClass('active');
                jQuery('.golo-clear-filter').show();
            } else {
                jQuery('.golo-nav-filter').removeClass('active');
                jQuery('.golo-clear-filter').hide();
            }

            jQuery('.golo-menu-filter input[type="checkbox"]:checked').each(function () {
                if (jQuery(this).length > 0) {
                    jQuery('.golo-nav-filter').addClass('active');
                    jQuery('.golo-clear-filter').show();
                } else {
                    jQuery('.golo-nav-filter').removeClass('active');
                    jQuery('.golo-clear-filter').hide();
                }
            });
        },

        // Click button Clear All
        filterClear: function () {
            jQuery('.golo-clear-filter').on('click', function () {
                jQuery('.golo-menu-filter ul.filter-control li').removeClass('active');
                jQuery('.golo-menu-filter input[type="checkbox"]').prop('checked', false);
                var ajax_call = true;
                GL_FILTER.ajaxFilter();
            });
        },

        ajaxFilter: function () {
            let city_id = jQuery('input[name="city_id"]').val(),
                category_id = jQuery('input[name="category_id"]').val(),
                sort_by = menu_filter_wrap.find('.sort-by.filter-control li.active a').data('sort'),
                price = menu_filter_wrap.find('.price.filter-control li.active a').data('price'),
                place_types = [],
                amenities = [];

            menu_filter_wrap.find("input[name='types']:checked").each(function () {
                place_types.push(parseInt(jQuery(this).val()));
            });
            menu_filter_wrap.find("input[name='amenities']:checked").each(function () {
                amenities.push(parseInt(jQuery(this).val()));
            });

            // call api
            jQuery.ajax({
                url: `${app_url}/places/filter`,
                data: {
                    'city_id': city_id,
                    'category_id': category_id,
                    'sort_by': sort_by,
                    'price': price,
                    'place_types': place_types,
                    'amenities': amenities
                },
                beforeSend: function () {
                    jQuery('#list_places').html('<div class="col-md-12 text-center">Loading...</div>');
                },
                success: function (data) {
                    jQuery('#list_places').html(data);
                    GL_FILTER.filterDisplayClear();
                },
                error: function (e) {
                    console.log(e);
                }
            });

        }

    };

    GL_BOOKING = {
        init: function () {
            GL_BOOKING.submitForm();
            GL_BOOKING.bookingForm();
        },

        bookingForm: function () {
            jQuery('#booking_form').submit(function (event) {
                event.preventDefault();
                let $form = jQuery(this);
                let formData = getFormData($form);

                if (formData.numbber_of_adult == "0") {
                    alert("Please enter numbber of adult");
                    return;
                }
                if (!formData.date) {
                    alert("Please select date");
                    return;
                }
                if (!formData.time) {
                    alert("Please select time");
                    return;
                }

                GL_BOOKING.ajaxBooking(formData)
            });
        },

        submitForm: function () {
            jQuery('#booking_submit_form').submit(function (event) {
                event.preventDefault();
                let $form = jQuery(this);
                let formData = getFormData($form);
                GL_BOOKING.ajaxBooking(formData)
            });
        },

        ajaxBooking: function (formData) {

            // call api
            jQuery.ajax({
                dataType: 'json',
                url: `${app_url}/bookings`,
                method: "post",
                data: formData,
                beforeSend: function () {
                    jQuery('.booking_submit_btn').html('Sending...').prop('disabled', true);
                },
                success: function (data) {
                    jQuery('.booking_submit_btn').html('Send').prop('disabled', false);
                    if (data.code === 200) {
                        jQuery('.booking_success').show();
                        jQuery('.booking_error').hide();
                        // jQuery('form :input').val('');
                    } else {
                        jQuery('.booking_success').hide();
                        jQuery('.booking_error').show();
                    }
                },
                error: function (e) {
                    jQuery('.booking_submit_btn').html('Send').prop('disabled', false);
                    jQuery('.booking_success').hide();
                    jQuery('.booking_error').show();
                    console.log(e);
                }
            });

        }
    };

    GL_BUSINESS_SEARCH = {
        init: function () {
            GL_BUSINESS_SEARCH.clickAllInputSearch();
            GL_BUSINESS_SEARCH.keyupInputSearch();
            GL_BUSINESS_SEARCH.focusInputSearch();
            GL_BUSINESS_SEARCH.keyupLocationSearch();
            GL_BUSINESS_SEARCH.clickItemCategory();
            GL_BUSINESS_SEARCH.clickItemLocation();
            GL_BUSINESS_SEARCH.clickListingItem();
            GL_BUSINESS_SEARCH.globalJS();
        },

        globalJS: function () {
            jQuery('.open-suggestion').on('focus', function (e) {
                e.preventDefault();
                jQuery(this).parent().find('.search-suggestions').fadeIn();
            });
            jQuery('.open-suggestion').on('blur', function (e) {
                e.preventDefault();
                jQuery(this).parent().find('.search-suggestions').fadeOut();
            });
        },

        clickAllInputSearch: function () {
            jQuery(document).on('click', '.search-suggestions a', function (e) {
                // e.preventDefault();
                var text = jQuery(this).find('span').text();
                jQuery(this).parents('.field-input').find('input').attr("placeholder", text).val('');
                jQuery(this).parents('.search-suggestions').fadeOut();
            });
        },

        clickListingItem: function () {
            jQuery(document).on('click', '.listing_items a', function (e) {
                console.log("listing_items click input_search");
                // e.preventDefault();
                // let city_id = e.currentTarget.getAttribute('data-id');
                // jQuery('#input_search').val(city_id).attr('name', 'city[]');
            });
        },

        keyupInputSearch: function () {
            jQuery(document).on('keyup', '#input_search', function (e) {
                jQuery('#category_id').val('');
                let keyword = jQuery(this).val();
                GL_BUSINESS_SEARCH.searchListing(keyword);
            });
        },

        focusInputSearch: function () {
            jQuery(document).on('focus', '#input_search, #location_search', function () {
                console.log("focus input_search");
                GL_BUSINESS_SEARCH.searchCategoryPlace('');
                GL_BUSINESS_SEARCH.searchLocationSearch('');
            });
        },

        searchListing: function (keyword) {
            jQuery.ajax({
                url: `${app_url}/ajax-search-listing`,
                data: {
                    'keyword': keyword
                },
                beforeSend: function () {
                },
                success: function (data) {
                    jQuery('.category-suggestion').html(data);
                },
                error: function (e) {
                    console.log(e);
                }
            });
        },

        searchCategoryPlace: function (keyword) {
            jQuery.ajax({
                url: `${app_url}/categories`,
                data: {
                    'keyword': keyword
                },
                beforeSend: function () {
                },
                success: function (data) {
                    let html = '<ul class="category_items">';
                    data.forEach(function (value, index) {
                        html += `<li><a href="#" data-id="${value.id}"><span>${value.name}</span></a></li>`;
                    });
                    html += '</ul>';
                    jQuery('.category-suggestion').html(html);
                },
                error: function (e) {
                    console.log(e);
                }
            });
        },

        keyupLocationSearch: function () {
            jQuery(document).on('keyup', '#location_search', function () {
                let keyword = jQuery(this).val();
                GL_BUSINESS_SEARCH.searchLocationSearch(keyword);
            });
        },

        searchLocationSearch: function (keyword) {
            jQuery.ajax({
                url: `${app_url}/cities`,
                data: {
                    'keyword': keyword
                },
                beforeSend: function () {
                },
                success: function (data) {
                    let html = '<ul>';
                    data.forEach(function (value, index) {
                        html += `<li><a href="#" data-id="${value.id}"><span>${value.name}</span></a></li>`;
                    });
                    html += '</ul>';
                    jQuery('.location-suggestion').html(html);
                },
                error: function (e) {
                    console.log(e);
                }
            });
        },

        clickItemCategory: function () {
            jQuery(document).on('click', '.category_items a', function (e) {
                e.preventDefault();
                let category_id = e.currentTarget.getAttribute('data-id');
                jQuery('#category_id').val(category_id);
            });
        },

        clickItemLocation: function () {
            jQuery(document).on('click', '.location-suggestion a', function (e) {
                e.preventDefault();
                let city_id = e.currentTarget.getAttribute('data-id');
                jQuery('#city_id').val(city_id).attr('name', 'city[]');
            });
        }

    }

    GL.init();
    GL_FILTER.init();
    GL_BOOKING.init();
    GL_BUSINESS_SEARCH.init();

})(jQuery);

/**
 * @param slug
 * @param type
 * @returns {*}
 */
function getUrlAPI(slug, type = "api") {
    const base_url = window.location.origin;
    if (type === "full")
        return slug;
    else
        return base_url + "/" + type + slug;
}

/**
 * @param data
 * @returns {Promise<any | never>}
 */
function callAPI(data) {
    try {
        let method = data.method || "GET";
        let header = data.header || {'Accept': 'application/json', 'Content-Type': 'application/json'};
        let body = JSON.stringify(data.body);

        return fetch(data.url, {
            'method': method,
            'headers': header,
            'body': body
        }).then(res => {
            return res.json();
        }).then(response => {
            return response;
        })

    } catch (e) {
        alert(e);
        console.log(e);
    }
}

/**
 * @param $form
 * return object
 */
function getFormData($form) {
    var unindexed_array = $form.serializeArray();
    var indexed_array = {};
    jQuery.map(unindexed_array, function (n, i) {
        indexed_array[n['name']] = n['value'];
    });
    return indexed_array;
}

/**
 *
 * @param input
 * @param element_id
 */
function previewUploadImage(input, element_id) {
    if (input.files && input.files[0]) {
        let reader = new FileReader();
        reader.onload = function (e) {
            jQuery(`#${element_id}`).attr('src', e.target.result);
        };
        reader.readAsDataURL(input.files[0]);
    }
}

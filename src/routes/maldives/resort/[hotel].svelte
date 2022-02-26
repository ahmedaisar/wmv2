<script lang="ts">

import { page } from '$app/stores';
import { onMount } from 'svelte';
 

onMount(async() => {
 

});

const hotelname = $page.params.hotel;
async function getHotel() {

let response = await fetch("http://localhost:4000/www.simplymaldivesholidays.co.uk/wp-admin/admin-ajax.php?action=resorts_list_all&url=resort/" + hotelname, {
    headers: {'x-requested-with': 'XMLHttpRequest'}
});

let hotels = await response.json();
return hotels;
}

const promise = getHotel();






</script>
 

 
  {#await promise}
    <p>Loading...</p>
  {:then hotel}
 

  
      <main id="main" class="site-main place-04">
        <div class="place">
            <div class="slick-sliders">
                <div class="slick-slider photoswipe" data-item="1" data-arrows="false" data-itemScroll="1" data-dots="false" data-infinite="true" data-centerMode="false" data-centerPadding="0">
                    {#if hotel[0].pictures }
                           {#each hotel[0].pictures as gallery}
                                <div class="place-slider__item photoswipe-item">
                                    <a href="{gallery.url}" data-height="900" data-width="1200" data-caption="{gallery.name}"></a>
                                </div>
                            {/each}
                                <img src="{hotel[0].pictures[0].url}" alt="{hotel[0].pictures[0].name}">
                         
                    {:else}
                        <div class="place-slider__item"><a href="#"><img src="https://via.placeholder.com/1280x500?text=WMV" alt="slider no image"></a></div>
                    {/if}
                </div>
                <!-- <div class="place-share">
                    <a title="Save" href="#" class="add-wishlist @if($place->wish_list_count) remove_wishlist active @else @guest open-login @else add_wishlist @endguest @endif" data-id="{{$place->id}}">
                        <i class="la la-bookmark la-24"></i>
                    </a>
                    <a title="Share" href="#" class="share">
                        <i class="la la-share-square la-24"></i>
                    </a>
                    <div class="social-share">
                        <div class="list-social-icon">
                            <a class="facebook" href="#" onclick="window.open('https://www.facebook.com/sharer.php?u=' + window.location.href,'popUpWindow','height=550,width=600,left=200,top=100,resizable=yes,scrollbars=yes,toolbar=no,menubar=no,location=no,directories=no,status=yes');">
                                <i class="la la-facebook"></i>
                            </a>
                            <a class="twitter" href="#" onclick="window.open('https://twitter.com/share?url=' + window.location.href,'popUpWindow','height=500,width=550,left=200,top=100,resizable=yes,scrollbars=yes,toolbar=no,menubar=no,location=no,directories=no,status=yes');">
                                <i class="la la-twitter"></i>
                            </a>
                            <a class="linkedin" href="#" onclick="window.open('https://www.linkedin.com/shareArticle?mini=true&url=' + window.location.href,'popUpWindow','height=550,width=600,left=200,top=100,resizable=yes,scrollbars=yes,toolbar=no,menubar=no,location=no,directories=no,status=yes');">
                                <i class="la la-linkedin"></i>
                            </a>
                            <a class="pinterest" href="#" onclick="window.open('https://pinterest.com/pin/create/button/?url=' + window.location.href,'popUpWindow','height=500,width=550,left=200,top=100,resizable=yes,scrollbars=yes,toolbar=no,menubar=no,location=no,directories=no,status=yes');">
                                <i class="la la-pinterest"></i>
                            </a>
                        </div>
                    </div>
                </div> -->
                <!-- .place-share -->
                <div class="place-gallery">
                    <a class="show-gallery" title="Gallery" >
                        <i class="la la-images la-24"></i>
                       Gallery
                    </a>
                    <!-- {#if hotel[0].videos}
                        <a title="Video" href="{hotel[0].videos[0]}" data-lity class="lity-btn">
                            <i class="la la-youtube la-24"></i>
                            Videos
                        </a>
                    {/if} -->
                </div><!-- .place-item__photo -->
                <div class="pswp" tabindex="-1" role="dialog" aria-hidden="true">
                    <!-- Background of PhotoSwipe.
                           It's a separate element as animating opacity is faster than rgba(). -->
                    <div class="pswp__bg"></div>
                    <!-- Slides wrapper with overflow:hidden. -->
                    <div class="pswp__scroll-wrap">
                        <!-- Container that holds slides.
                              PhotoSwipe keeps only 3 of them in the DOM to save memory.
                              Don't modify these 3 pswp__item elements, data is added later on. -->
                        <div class="pswp__container">
                            <div class="pswp__item"></div>
                            <div class="pswp__item"></div>
                            <div class="pswp__item"></div>
                        </div>
                        <!-- Default (PhotoSwipeUI_Default) interface on top of sliding area. Can be changed. -->
                        <div class="pswp__ui pswp__ui--hidden">
                            <div class="pswp__top-bar">
                                <!--  Controls are self-explanatory. Order can be changed. -->
                                <div class="pswp__counter"></div>
                                <button class="pswp__button pswp__button--close" title="Close (Esc)"></button>
                                <button class="pswp__button pswp__button--share" title="Share"></button>
                                <button class="pswp__button pswp__button--fs" title="Toggle fullscreen"></button>
                                <button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button>
                                <!-- Preloader demo https://codepen.io/dimsemenov/pen/yyBWoR -->
                                <!-- element will get class pswp__preloader--active when preloader is running -->
                                <div class="pswp__preloader">
                                    <div class="pswp__preloader__icn">
                                        <div class="pswp__preloader__cut">
                                            <div class="pswp__preloader__donut"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
                                <div class="pswp__share-tooltip"></div>
                            </div>
                            <button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)">
                            </button>
                            <button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)">
                            </button>
                            <div class="pswp__caption">
                                <div class="pswp__caption__center"></div>
                            </div>
                        </div>
                    </div>
                </div><!-- .pswp -->
            </div><!-- .place-slider -->
            <div class="container">
                <div class="row">
                    <div class="col-lg-8">
                        <div class="place__left">
                            <ul class="place__breadcrumbs breadcrumbs">
                                <li><a title="{hotel[0].name}" href="/">{hotel[0].name}</a></li>
                                <!-- @foreach($categories as $cat)
                                    <li><a href="{{route('page_search_listing', ['category[]' => $cat->id])}}" title="{{$cat->name}}">{{$cat->name}}</a></li>
                                @endforeach -->
                            </ul>
                            <!-- .place__breadcrumbs -->
                            <div class="place__box place__box--npd">
                                <h1>{hotel[0].name}</h1>
                                
                                <div class="place__meta">
                                    <div class="place__reviews reviews">
											<span class="place__reviews__number reviews__number">
												REVIEW SCORE
												<i class="la la-star"></i>
											</span>
                                        <span class="place__places-item__count reviews_count"> reviews count here</span>
                                    </div>
                                    <!-- <div class="place__currency">{{PRICE_RANGE[$place->price_range]}}</div> -->
                                   
                                </div><!-- .place__meta -->
                            </div><!-- .place__box -->

                         

                            <div class="place__box place__box-overview">
                                <h3>Overview</h3>
                                <div class="place__desc">
                                    {hotel[0].overview}
                                </div><!-- .place__desc -->
                                <a href="#" class="show-more" title="Show more">Show more</a>
                            </div>
                            <div class="place__box place__box-map">
                                <h3 class="place__title--additional">
                                    Location & Maps
                                </h3>
                                <!-- <div class="maps">
                                    <div id="golo-place-map"></div>
                                    <input type="hidden" id="place_lat" value="{{$place->lat}}">
                                    <input type="hidden" id="place_lng" value="{{$place->lng}}">
                                    <input type="hidden" id="place_icon_marker" value="{{asset('assets/images/icon-mapker.svg">
                                </div> -->
                                <div class="address">
                                    <i class="la la-map-marker"></i>
                                    HOTEL ADDRESS HERE
                                    <a href="https://maps.google.com/?q=" title="Direction" target="_blank" rel="nofollow"> Direction</a>
                                </div>
                            </div><!-- .place__box -->
                            <!-- <div class="place__box">
                                <h3>Contact Info</h3>
                                <ul class="place__contact">
                                    @if($place->phone_number)
                                        <li>
                                            <i class="la la-phone"></i>
                                            <a href="tel:{{$place->phone_number}}" rel="nofollow">{{$place->phone_number}}</a>
                                        </li>
                                    @endif
                                    @if($place->website)
                                        <li>
                                            <i class="la la-globe"></i>
                                            <a href="//{{$place->website}}" target="_blank" rel="nofollow">{{$place->website}}</a>
                                        </li>
                                    @endif
                                    @if($place->email)
                                        <li>
                                            <i class="la la-envelope"></i>
                                            <a href="mailto:{{$place->email}}" rel="nofollow">{{$place->email}}</a>
                                        </li>
                                    @endif
                                    @foreach($place->social as $social)
                                        @if($social['name'] && $social['url'])
                                            <li>
                                                <i class="{{SOCIAL_LIST[$social['name']]['icon']}}"></i>
                                                <a href="{{SOCIAL_LIST[$social['name']]['base_url'] . $social['url']}}" title="{{$social['url']}}" rel="nofollow" target="_blank">{{$social['url']}}</a>
                                            </li>
                                        @endif
                                    @endforeach
                                </ul>
                            </div> -->
                            
                            <!-- .place__box -->
                          

                            <!-- <div class="place__box place__box--reviews">
                                <h3 class="place__title--reviews">
                                    Review ({{count($reviews)}})
                                    @if(isset($reviews))
                                        <span class="place__reviews__number"> {{$review_score_avg}}
                                            <i class="la la-star"></i>
                                        </span>
                                    @endif
                                </h3>

                                <ul class="place__comments">
                                    @foreach($reviews as $review)
                                        <li>
                                            <div class="place__author">
                                                <div class="place__author__avatar">
                                                    <a title="Nitithorn" href="#"><img src="{{getUserAvatar($review['user']['avatar'])}}" alt=""></a>
                                                </div>
                                                <div class="place__author__info">
                                                    <h4>
                                                        <a title="Nitithorn" href="#">{{$review['user']['name']}}</a>
                                                        <div class="place__author__star">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12">
                                                                <path fill="#DDD" fill-rule="evenodd" d="M6.12.455l1.487 3.519 3.807.327a.3.3 0 0 1 .17.525L8.699 7.328l.865 3.721a.3.3 0 0 1-.447.325L5.845 9.4l-3.272 1.973a.3.3 0 0 1-.447-.325l.866-3.721L.104 4.826a.3.3 0 0 1 .17-.526l3.807-.327L5.568.455a.3.3 0 0 1 .553 0z"/>
                                                            </svg>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12">
                                                                <path fill="#DDD" fill-rule="evenodd" d="M6.12.455l1.487 3.519 3.807.327a.3.3 0 0 1 .17.525L8.699 7.328l.865 3.721a.3.3 0 0 1-.447.325L5.845 9.4l-3.272 1.973a.3.3 0 0 1-.447-.325l.866-3.721L.104 4.826a.3.3 0 0 1 .17-.526l3.807-.327L5.568.455a.3.3 0 0 1 .553 0z"/>
                                                            </svg>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12">
                                                                <path fill="#DDD" fill-rule="evenodd" d="M6.12.455l1.487 3.519 3.807.327a.3.3 0 0 1 .17.525L8.699 7.328l.865 3.721a.3.3 0 0 1-.447.325L5.845 9.4l-3.272 1.973a.3.3 0 0 1-.447-.325l.866-3.721L.104 4.826a.3.3 0 0 1 .17-.526l3.807-.327L5.568.455a.3.3 0 0 1 .553 0z"/>
                                                            </svg>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12">
                                                                <path fill="#DDD" fill-rule="evenodd" d="M6.12.455l1.487 3.519 3.807.327a.3.3 0 0 1 .17.525L8.699 7.328l.865 3.721a.3.3 0 0 1-.447.325L5.845 9.4l-3.272 1.973a.3.3 0 0 1-.447-.325l.866-3.721L.104 4.826a.3.3 0 0 1 .17-.526l3.807-.327L5.568.455a.3.3 0 0 1 .553 0z"/>
                                                            </svg>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12">
                                                                <path fill="#DDD" fill-rule="evenodd" d="M6.12.455l1.487 3.519 3.807.327a.3.3 0 0 1 .17.525L8.699 7.328l.865 3.721a.3.3 0 0 1-.447.325L5.845 9.4l-3.272 1.973a.3.3 0 0 1-.447-.325l.866-3.721L.104 4.826a.3.3 0 0 1 .17-.526l3.807-.327L5.568.455a.3.3 0 0 1 .553 0z"/>
                                                            </svg>
                                                            @php
                                                                $width = $review->score * 20;
                                                                $review_width = "style='width:{$width}%'";
                                                            @endphp
                                                            <span {!! $review_width !!}>
																<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12">
																    <path fill="#23D3D3" fill-rule="evenodd" d="M6.12.455l1.487 3.519 3.807.327a.3.3 0 0 1 .17.525L8.699 7.328l.865 3.721a.3.3 0 0 1-.447.325L5.845 9.4l-3.272 1.973a.3.3 0 0 1-.447-.325l.866-3.721L.104 4.826a.3.3 0 0 1 .17-.526l3.807-.327L5.568.455a.3.3 0 0 1 .553 0z"/>
																</svg>
																<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12">
																    <path fill="#23D3D3" fill-rule="evenodd" d="M6.12.455l1.487 3.519 3.807.327a.3.3 0 0 1 .17.525L8.699 7.328l.865 3.721a.3.3 0 0 1-.447.325L5.845 9.4l-3.272 1.973a.3.3 0 0 1-.447-.325l.866-3.721L.104 4.826a.3.3 0 0 1 .17-.526l3.807-.327L5.568.455a.3.3 0 0 1 .553 0z"/>
																</svg>
																<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12">
																    <path fill="#23D3D3" fill-rule="evenodd" d="M6.12.455l1.487 3.519 3.807.327a.3.3 0 0 1 .17.525L8.699 7.328l.865 3.721a.3.3 0 0 1-.447.325L5.845 9.4l-3.272 1.973a.3.3 0 0 1-.447-.325l.866-3.721L.104 4.826a.3.3 0 0 1 .17-.526l3.807-.327L5.568.455a.3.3 0 0 1 .553 0z"/>
																</svg>
																<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12">
																    <path fill="#23D3D3" fill-rule="evenodd" d="M6.12.455l1.487 3.519 3.807.327a.3.3 0 0 1 .17.525L8.699 7.328l.865 3.721a.3.3 0 0 1-.447.325L5.845 9.4l-3.272 1.973a.3.3 0 0 1-.447-.325l.866-3.721L.104 4.826a.3.3 0 0 1 .17-.526l3.807-.327L5.568.455a.3.3 0 0 1 .553 0z"/>
																</svg>
																<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12">
																    <path fill="#23D3D3" fill-rule="evenodd" d="M6.12.455l1.487 3.519 3.807.327a.3.3 0 0 1 .17.525L8.699 7.328l.865 3.721a.3.3 0 0 1-.447.325L5.845 9.4l-3.272 1.973a.3.3 0 0 1-.447-.325l.866-3.721L.104 4.826a.3.3 0 0 1 .17-.526l3.807-.327L5.568.455a.3.3 0 0 1 .553 0z"/>
																</svg>
															</span>
                                                        </div>
                                                    </h4>
                                                    <time>{{formatDate($review->created_at, 'd/m/Y</time>
                                                </div>
                                            </div>
                                            <div class="place__comments__content">
                                                <p>{{$review->comment}}</p>
                                            </div>
                                        </li>
                                    @endforeach
                                </ul>

                                @guest
                                    <div class="login-for-review account logged-out">
                                        <a href="#" class="btn-login open-login">Login</a>
                                        <span>to review</span>
                                    </div>
                                @else
                                    <div class="review-form">
                                        <h3>Write a review</h3>
                                        <form id="submit_review">
                                            @csrf
                                            <div class="rate">
                                                <span>Rate This Place</span>
                                                <div class="stars">
                                                    <a href="#" class="star-item" data-value="1" title="star-1">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12">
                                                            <path fill="#DDD" fill-rule="evenodd" d="M6.12.455l1.487 3.519 3.807.327a.3.3 0 0 1 .17.525L8.699 7.328l.865 3.721a.3.3 0 0 1-.447.325L5.845 9.4l-3.272 1.973a.3.3 0 0 1-.447-.325l.866-3.721L.104 4.826a.3.3 0 0 1 .17-.526l3.807-.327L5.568.455a.3.3 0 0 1 .553 0z"/>
                                                        </svg>
                                                    </a>
                                                    <a href="#" class="star-item" data-value="2" title="star-2">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12">
                                                            <path fill="#DDD" fill-rule="evenodd" d="M6.12.455l1.487 3.519 3.807.327a.3.3 0 0 1 .17.525L8.699 7.328l.865 3.721a.3.3 0 0 1-.447.325L5.845 9.4l-3.272 1.973a.3.3 0 0 1-.447-.325l.866-3.721L.104 4.826a.3.3 0 0 1 .17-.526l3.807-.327L5.568.455a.3.3 0 0 1 .553 0z"/>
                                                        </svg>
                                                    </a>
                                                    <a href="#" class="star-item" data-value="3" title="star-3">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12">
                                                            <path fill="#DDD" fill-rule="evenodd" d="M6.12.455l1.487 3.519 3.807.327a.3.3 0 0 1 .17.525L8.699 7.328l.865 3.721a.3.3 0 0 1-.447.325L5.845 9.4l-3.272 1.973a.3.3 0 0 1-.447-.325l.866-3.721L.104 4.826a.3.3 0 0 1 .17-.526l3.807-.327L5.568.455a.3.3 0 0 1 .553 0z"/>
                                                        </svg>
                                                    </a>
                                                    <a href="#" class="star-item" data-value="4" title="star-4">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12">
                                                            <path fill="#DDD" fill-rule="evenodd" d="M6.12.455l1.487 3.519 3.807.327a.3.3 0 0 1 .17.525L8.699 7.328l.865 3.721a.3.3 0 0 1-.447.325L5.845 9.4l-3.272 1.973a.3.3 0 0 1-.447-.325l.866-3.721L.104 4.826a.3.3 0 0 1 .17-.526l3.807-.327L5.568.455a.3.3 0 0 1 .553 0z"/>
                                                        </svg>
                                                    </a>
                                                    <a href="#" class="star-item" data-value="5" title="star-5">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12">
                                                            <path fill="#DDD" fill-rule="evenodd" d="M6.12.455l1.487 3.519 3.807.327a.3.3 0 0 1 .17.525L8.699 7.328l.865 3.721a.3.3 0 0 1-.447.325L5.845 9.4l-3.272 1.973a.3.3 0 0 1-.447-.325l.866-3.721L.104 4.826a.3.3 0 0 1 .17-.526l3.807-.327L5.568.455a.3.3 0 0 1 .553 0z"/>
                                                        </svg>
                                                    </a>
                                                </div>
                                            </div>
                                            <div class="field-textarea">
                                                <img class="author-avatar" src="{{getUserAvatar(user()->avatar)}}" alt="">
                                                <textarea name="comment" placeholder="Write a review"></textarea>
                                            </div>
                                            <div class="field-submit">
                                                <small class="form-text text-danger" id="review_error">error!</small>
                                                <input type="hidden" name="score" value="">
                                                <input type="hidden" name="place_id" value="{{$place->id}}">
                                                <button type="submit" class="btn" id="btn_submit_review">Submit</button>
                                            </div>
                                        </form>
                                    </div>
                                @endguest

                            </div> -->
                            <!-- .place__box -->
                        </div><!-- .place__left -->
                    </div>

                    <div class="col-lg-4">
                        <div class="sidebar sidebar--shop sidebar--border">
                            <!-- <div class="widget-reservation-mini">
                                @if($place->booking_type === \App\Models\Booking::TYPE_AFFILIATE)
                                    <h3>Booking online</h3>
                                    <a href="#" class="open-wg btn">Book now</a>
                                @elseif($place->booking_type === \App\Models\Booking::TYPE_BOOKING_FORM)
                                    <h3>Make a reservation</h3>
                                    <a href="#" class="open-wg btn">Book now</a>
                                @elseif($place->booking_type === \App\Models\Booking::TYPE_CONTACT_FORM)
                                    <h3>Send me a message</h3>
                                    <a href="#" class="open-wg btn">Send</a>
                                @else
                                    <h3>Banner Ads</h3>
                                    <a href="#" class="open-wg btn">View</a>
                                @endif
                            </div> -->
                           
                        </div>
                        <!-- .sidebar -->

                    </div>
                </div>
            </div>
        </div><!-- .place -->

        <!-- <div class="similar-places">
            <div class="container">
                <h2 class="similar-places__title title">Similar places</h2>
                <div class="similar-places__content">
                    <div class="row">
                        @foreach($similar_places as $place)
                            <div class="col-lg-3 col-md-6">
                                @include('frontend.common.place_item')
                            </div>
                        @endforeach
                    </div>
                </div>
            </div>
        </div>
         -->
        <!-- .similar-places -->
    </main><!-- .site-main -->
 
  {:catch error}
    <p style="color: red">{error.message}</p>
  {/await}

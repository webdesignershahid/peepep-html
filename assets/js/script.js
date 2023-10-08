(function ($) {
    "use strict";
    var dropdownElementList = [].slice.call(document.querySelectorAll('.dropdown-toggle'))
    var dropdownList = dropdownElementList.map(function (dropdownToggleEl) {
      return new bootstrap.Dropdown(dropdownToggleEl)
    });
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
    $(document).ready(function () {
        $("body").tooltip({ selector: '[data-bs-toggle=tooltip]' });
    });

    let peepep = {

        mobile_expand_menu: function(){
            //=============  Mobile Menu Integration  =============\\
            function mobile_menu(selector, actionSelector) {
                var mobile_menu = $(selector);
                mobile_menu.on("click", function() {
                    $(selector).toggleClass('navExpanded');
                });
                
                var hamburgerbtn = $(selector);
                hamburgerbtn.on("click", function() {
                    $(actionSelector).toggleClass('navExpanded');
                });

                $(document).on('click', function(e) {
                    var selectorType = $(actionSelector).add(mobile_menu);
                    if (selectorType.is(e.target) !== true && selectorType.has(e.target).length === 0) {
                        $(actionSelector).removeClass("navExpanded");
                        $(selector).removeClass("navExpanded");
                    }
                });
                // $(".menu_wrapper a").on('click', function() {
                //     $('.menu_wrapper, .menu-overlay').removeClass("sidemenu-open");
                // });
            
            };
            mobile_menu('.hambargur button', '.sideNav');  
        },
        
        /* ============================================================ */
        /* StickyHeader
        /* ============================================================ */
        sticky_header: function() {
            let header = $("header");
            // Add a scroll event listener to the window object
            window.addEventListener('scroll', () => {
                const scrollPosition = window.scrollY;
            
                if (scrollPosition > 60) {
                    header.addClass('sticky');
                } else {
                    header.removeClass('sticky');
                }
            });
        },


        /* ============================================================ */
        /* Scroll Top
        /* ============================================================ */
        scroll_to_top: function() {
            $('body').append("<a href='#' title='Scroll Top' class='topbutton btn-hide'><i class='fal fa-angle-double-up'></i></a>"
            );
            let $scrolltop = $('.topbutton');
            $(window).on('scroll', function () {
                if ($(this).scrollTop() > $(this).height()) {
                    $scrolltop.addClass('btn-show').removeClass('btn-hide');
                } else {
                    $scrolltop.addClass('btn-hide').removeClass('btn-show');
                }
            });
            $scrolltop.click(function(){
                $('html, body').animate({
                    scrollTop : 0
                },50);
		        return false;
            });
        },

        initialize: function() {
			peepep.mobile_expand_menu();
			// peepep.scroll_to_top();
			peepep.sticky_header();
		}
    };
    $(function() {
		peepep.initialize();
	});

})(jQuery);
    
$('#notification_dropdown .btn_mark_as').on('click', function(){
    $(this).parents('.notification__single').removeClass('unread').children().children('.btn_mark_as').remove();
});
$('#notification_dropdown .dropdown_footer').on('click', function(){
    $('.notification__single').removeClass('unread').children().children('.btn_mark_as').remove();
});
let bidsListlink = $('.total_bid a');
bidsListlink.click(function(e){
    e.preventDefault();
    var target = $($(this).attr("href"));
    var offset = 220;

    $("html, body").animate({
      scrollTop: target.offset().top - offset
    },50);
});

/* ============================================================ */
/* PRELOADER
/* ============================================================ */
$(window).on('load', function() {
    // $("#peepepSound")[0].play();
    $(".preloader").fadeOut();     
});

// Init Wow Js
new WOW({
    mobile:false
}).init();


// Homepage Signup Side Slider
let clients_logo = new Swiper ('.signup-cta .swiper', {
    spaceBetween: 30,
    slidesPerView: 1,
    effect: 'fade',
    fadeEffect : {
        crossFade: true
    },
    loop: true,
	speed: 800,
    autoplay: {
        delay: 5000
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
});

let auction_gallery = new Swiper ('.auction-photos .swiper, .inventory-photos .swiper', {
    slidesPerView: 1,
    loop: true,
    autoplay: {
        delay: 5000,
    },
    pagination: {
        el: ".swiper-pagination",
        dynamicBullets: true,
        clickable: true,
    }
});
let related_listing = new Swiper ('.related_inventory .swiper', {
    slidesPerView: 1,
    spaceBetween: 10,
    loop: true,
    autoplay: {
        delay: 5000,
    },
    breakpoints: { 
        576: {
            slidesPerView: 2,
        },
        768: {
            slidesPerView: 2,
            spaceBetween: 30,
        },
        1400: {
            slidesPerView: 3,
            spaceBetween: 30,
        }
    },
    pagination: {
        el: ".related_inventory .swiper-pagination",
        clickable: true,
        dynamicBullets: true,
        dynamicMainBullets: 5,
      },
});

$(document).ready(function () {    
    // jQuery Steps
    let upload_inventory_stepForm = $('#uploadCarSteps');
    upload_inventory_stepForm.steps({
        headerTag: "h5",
        bodyTag: "section",
        transitionEffect: "fade",
        titleTemplate: '<span class="step">#index#.</span><span>#title#</span>',
        labels: {
            previous:'Back',
            finish: 'Submit'
        },
        onInit :function (event, current) {
            $('.actions a[href=\\#finish]').attr('id', 'submit_uploads');
        },
        onFinished: function () {
            $("#upload_car_steps_form").submit();
            window.location.href = "thanks-for-upload.html";
        }
    });
    let update_business_info = $('#update_business_Info');
    update_business_info.steps({
        headerTag: "h5",
        bodyTag: "section",
        transitionEffect: "fade",
        titleTemplate: '<span class="step">#index#.</span><span>#title#</span>',
        labels: {
            previous:'Back',
            finish: 'Submit'
        },
        onFinished: function () {
            $("#update_business_info_steps").submit();
            window.location.href = "thanks-for-submission.html";
        }
    });  

    // Vehicle Body Style icon with select2
    function iconState (state) {
        if (!state.id) {
            return state.text;
        }
        var baseUrl = "assets/images/vehicle-body";
        var $state = $(
            '<span><img src="' + baseUrl + '/' + state.element.value.toLowerCase() + '.png" class="img-flag" width="30 " /> ' + state.text + '</span>'
        );
        return $state;
    }
    // countdown Numbers
    $('.number').counterUp({
        delay: 30,
        time: 5000
    });
    $('header .button-wrapper .profile-progress::before').counterUp({
        delay: 30,
        time: 5000
    });
    // jQuery Select2
    $('.select2').select2();
    $('#vehicleType').select2({
        templateResult: iconState
    });
    $(`[name="selectYear"], .create_option_dynamic`).select2({
        tags: true,
    });

    // Lighbox
    const lightbox = GLightbox({});

})
// Data Table
$('.dataTable').dataTable({
    responsive: true,
    "searching": false,
    "ordering": false,
    "lengthChange": false,
});
$('.uploaded_inventory table').dataTable({
    responsive: true,
    "autoWidth": false,
    "columnDefs": [
        { "width": '80px', "targets": 0 },
        { "width": '150px', "targets": 1 },
        { "width": '150px', "targets": 4 },
        { "width": '100px', "targets": 5 },
    ]
});
$('a[data-bs-toggle="tab"]').on('shown.bs.tab', function (e) {
    $($.fn.dataTable.tables(true)).DataTable()
       .columns.adjust()
       .responsive.recalc();
});


/* 
$(function() {
    var position = localStorage.getItem('button-position');
    var obj = JSON.parse(position);
    var $draggable = $('.upload_vehicle_float_button');
    if (position) {
        $draggable.css({
            left: obj.left,
            top: obj.top,
        });
    }

    // Make the button draggable
    $draggable.draggable({
        stop: function(event, ui) {
            var position = ui.position;
            localStorage.setItem('button-position', JSON.stringify(position));
        },
        containment: "body"
    })
});
*/
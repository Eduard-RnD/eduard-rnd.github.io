$(document).ready(function(){
var slider = tns({
    container: '.carousel__tinyn',
    items: 1,
    slideBy: 'page',
    speed: 1200,
    controls: false,
    autoplay: true,
    autoplayTimeout: 3000,
    nav: false,
    autoplayButtonOutput: false,
    responsive: {
        240: {
            nav: true,
        },
        777: {
            nav: false
        }
      }
});
document.querySelector('.button_prev').addEventListener('click', function () {
    slider.goTo('prev')
});
document.querySelector('.button_next').addEventListener('click', function () {
    slider.goTo('next')
});

    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function(){
        $(this)
          .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
          .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });
    
    function toggleSlide(item) {
        $(item).each(function(i) {
            $(this).on('click', function(e) {
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
            })
        });
    };
    toggleSlide ('.catalog-item__link');
    toggleSlide ('.catalog-item__back');

    // Modal

    $('[data-modal=consultation]').on('click', function() {
        $('.overlay, #consultation').fadeIn('fast');
    });
    $('.modal__close').on('click', function() {
        $('.overlay, #consultation, #order, #thanks').fadeOut('fast');
    });
    $('.button_buy').each(function(i) {
        $(this).on('click', function() {
            $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
            $('.overlay, #order').fadeIn('fast');
        })
    });

    function validateForms(form) {
        $(form).validate({
            rules: {
                name: "required",
                phone: {
                    required: true
                },
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                name: "Пожалуйста введи свое имя",
                phone: {
                    required: "Введите номер телефона",
                    number: "Телефон должен состоять из цифр"
                },
                email: {
                    required: "Введите адрес почтового ящика",
                    email: "Почтовый ящик должен быть в формате name@domain.ru"
                }
            }
        });
    };
    validateForms('#consultation-form');
    validateForms('#consultation form');
    validateForms('#order form');

    $('input[name=phone]').mask("+7 (999) 999-99-99");

    $('form').submit(function(e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function() {
            $(this).find("input").val("");
            $('#consultation, #order').fadeOut();
            $('.overlay, #thanks').fadeIn('fast');
            $('form').trigger('reset')
        });
        return false;
    });

    // Scroll page to up
    
    $(window).scroll(function() {
        if ($(this).scrollTop() > 1600) {
            $('.pageup-scroll').fadeIn();
        } else {
            $('.pageup-scroll').fadeOut();
        }
    });

    $("a[href=#up]").click(function() {
        const _href = $(this).attr("href");
        $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
        return false;
    });
    $("a[href=#catalog]").click(function() {
        const _href = $(this).attr("href");
        $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
        return false;
    });

    $(function(){
        new WOW().init();      
    });

});


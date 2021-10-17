/* Типы данных
number Для обозначения всего, что можно измерит количественно
string - "", '', `` Любая информация отображаемая словами 
true/false Буливые данные
null Когда чего-то просто не существует в природе 
undefined Что-то существует, но конкретного значения не имеет
let obj = { Объект требуется для отображения свойств
    name: 'apple',
    color: 'green',
    weight: 200
} */
$(document).ready(function(){
  $('.carousel__inner').slick({
      speed: 1000,
      slidesToShow: 1,
      /* adaptiveHeight: true, */ 
      /* Автоматическое изменение высоты */
      autoplay: true,
      autoplaySpeed: 2000,
      prevArrow: '<button type="button" class="slick-prev"><img src="../src/icons/left_arrow.svg"></button>',
      nextArrow: '<button type="button" class="slick-next"><img src="../src/icons/right_arrow.svg"></button>',
      /* responsive: [
          {
              breakpoint: 992,
              Показывает, на каком промежутке мы будем устанавливать правила. То есть от 0 до 992 пикселей
              settings: {
                  dots: true,
                  arrows: false
              }
          }
      ] */
      responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
    });

    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
      $(this)
        .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
        .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });

    /* $(".catalog__item__link").each (function(i) {
      $(this).on('click', function(e) {
        e.preventDefault();
        $('.catalog__item__visible').eq(i).toggleClass('catalog__item__visible_active');
        $('.catalog__item__hidden').eq(i).toggleClass('catalog__item__hidden_active');
      })
    });

    $(".catalog__item__back").each (function(i) {
      $(this).on('click', function(e) {
        e.preventDefault();
        $('.catalog__item__visible').eq(i).toggleClass('catalog__item__visible_active');
        $('.catalog__item__hidden').eq(i).toggleClass('catalog__item__hidden_active');
      })
    });

    Либо же можно сделать подобие калькулятора пригодного для любой функции */

    function toggleSlide(item) {
      $(item).each (function(i) {
        $(this).on('click', function(e) {
          e.preventDefault();
          $('.catalog__item__visible').eq(i).toggleClass('catalog__item__visible_active');
          $('.catalog__item__hidden').eq(i).toggleClass('catalog__item__hidden_active');
        })
      });
    }

    toggleSlide('.catalog__item__link')
    toggleSlide('.catalog__item__back')

    //Modal

    $('[data-modal=consultation]').on('click', function() {
      $('.overlay, #consultation').fadeIn('slow');
    });

    $('.modal__close').on('click', function(){
      $('.overlay, #consultation, #order, #thanks').fadeOut('slow');
    });

    /* $('.button_mini').on('click', function(){
      $('.overlay, #order').fadeIn('slow');
    }); */

    $('.button_mini').each(function(i) {
      $(this).on('click', function() {
        $('#order .modal__descr').text($('.catalog__item__subtitle').eq(i).text());
        $('.overlay, #order').fadeIn('slow');
      });
    });

  function validateForms(form){
    $(form).validate({
      rules: {
        name: {
          required: true,
          minlength: 2
        },
        phone: {
          required: true,
          minlength: 10
        },
        email: {
          required: true,
          email: true
        }
      },
      messages: {
        name: { 
          required: "Пожалуйста, введите свое имя",
          minlength: jQuery.validator.format("Введите минимум {0} символа(ов)!")
        },
        phone: "Пожалуйста, введите свой телефон",
        email: {
          required: "Пожалуйста, введите свою почту",
          email: "Неправильно введен адрес почты"
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
    /*позволяет отменить стандартное поведение браузера*/
    $.ajax({
      type: "POST",
      url: "mailer/smart.php",
      data: $(this).serialize()
    }).done(function() {
      $(this).find("input").val("");
      $('#consultation, #order').fadeOut('slow');
      $('.overlay, #thanks').fadeIn('slow');

      $('form').trigger('reset');
    });
    return false;
  });

  //Smooth scroll and pageup
  $(window).scroll(function() {
    if ($(this).scrollTop() > 600) {
       $('.pageup').fadeIn();
    } else {
      $('.pageup').fadeOut();
    }

    $("a[href^=#up]").click(function(){
      const _href = $(this).attr("href");
      $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
      return false;
  });
  });

  new WOW().init();
});
/* 1я обертка отвечатет за то, чтобы слайдер загружался, когда наш документ только полностью готов
$ - это и есть библиотека jquary*/
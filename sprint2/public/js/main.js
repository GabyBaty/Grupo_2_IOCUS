jQuery(document).ready(function($){
    $('.banner_slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        prevArrow:'.arrow_prev',
        nextArrow: '.arrow_next',
        fade: true,
        asNavFor: '.imagenes'
      });
      $('.imagenes').slick({
        slidesToShow: 6,
        slidesToScroll: 1,
        asNavFor: '.banner_slider',
        dots: false,
        centerMode: false,
        focusOnSelect: true,
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                dots: false,
                arrows:false,
                centerMode: false,
                
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                arrows:false,
                centerMode: false,
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows:false,
                centerMode: false,
              }
            }
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
          ]
      });
});
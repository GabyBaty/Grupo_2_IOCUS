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

// Botón ir al cielo.
mybutton = document.getElementById("myBtn");

// Cuando el usuario se desplaza hacia abajo más de 20px, mostrará el botón
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}
// Cuando el usuario hace click en el botón, se desplaza hacia el comienzo del documento.
function topFunction() {
  document.body.scrollTop = 0; // Safari
  document.documentElement.scrollTop = 0; // Chrome, Firefox, EDGE y Opera
} 
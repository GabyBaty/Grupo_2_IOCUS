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

//Boton ir al cielo
let mybutton = document.getElementById("btn-back-to-top");

// Cuando el usuario se desplaza más de 20px, el botón aparecerá.
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (
    document.body.scrollTop > 20 ||
    document.documentElement.scrollTop > 20
  ) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}
// Cuando el usuario hace click en el botón, será desplazado al inicio del documento
mybutton.addEventListener("click", backToTop);

function backToTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

//Cambio de imágenes en el detalle de un producto
function changeImage(element) {

  var main_prodcut_image = document.getElementById('main_product_image');
  main_prodcut_image.src = element.src;
  
  
  }
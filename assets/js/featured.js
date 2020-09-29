//Most of the code below is from https://codepen.io/Anahiiit/pen/wvGPvaQ

$(document).ready(function($) {
    let $owl = $('.owl-carousel');
      $owl.children().each( function( index ) {
        $(this).attr( 'data-position', index ); 
      });
      
      $owl.owlCarousel({
        center: true,
        nav: true,
        loop: true,
        items: 4,
      margin:10,
        navText: ["<i class='fas fa-caret-left'></i>","<i class='fas fa-caret-right'></i>"],
        responsive:{
          0:{
              items:2,
              //Code below from https://owlcarousel2.github.io/OwlCarousel2/docs/api-options.html
              center: false
          },
          768:{
              items:3,
              //Code below from https://owlcarousel2.github.io/OwlCarousel2/docs/api-options.html
              center: false
          },
          992:{
              items:4,
              //Code below from https://owlcarousel2.github.io/OwlCarousel2/docs/api-options.html
              center: false
          }
       }
      });
    $(document).on('click', '.item', function() {
      $owl.trigger('to.owl.carousel', $(this).data( 'position' ) ); 
    });
          });
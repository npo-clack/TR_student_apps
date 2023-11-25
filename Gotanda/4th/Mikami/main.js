/*$(function() {
    $('.box1').click(function() {
        if ($('.accordion-wrapper').hasClass('open')) {
            $('.accordion-wrapper').removeClass('open');
            $('.accordion-wrapper').css('height', $('.box1').innerHeight());
        } else {
            $('.accordion-wrapper').addClass('open');
            $('.accordion-wrapper').css('height', $('.box1').innerHeight() + $('.box2').innerHeight());
        }
    });

    $('.box1').hover(function() {
        if ($('.accordion-wrapper').hasClass('open')) {
            $('.accordion-wrapper').css('height', $('.box1').innerHeight() + $('.box2').innerHeight());
        }
    }, function() {
        if ($('.accordion-wrapper').hasClass('open')) {
            $('.accordion-wrapper').css('height', 'auto');
        }
    });
});*/

$(function() {
  $('.box1').click(function() {
      if ($('.accordion-wrapper').hasClass('open')) {
          $('.accordion-wrapper').removeClass('open');
      } else {
          $('.accordion-wrapper').addClass('open');
      }
  });
});
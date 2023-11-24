jQuery(function() {
  var windowWidth = $(window).width();
  var headerHeight = 20;

  var documentUrl = location.origin + location.pathname + location.search;
  jQuery(document).on('click', 'a[href*="#"]', function(event) {
    var anchor = event.currentTarget;
    var anchorUrl = anchor.protocol + '//' + anchor.host + anchor.pathname + anchor.search;
    if (documentUrl !== anchorUrl) {
      return true;
    }

    var speed = 500;
    var position = $(anchor.hash).offset().top - headerHeight;
    jQuery('body,html').animate({
      scrollTop: position
    }, speed, 'swing');
    event.preventDefault();
    return false;
  });
});
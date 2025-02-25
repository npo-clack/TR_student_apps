$(document).ready(function() {
    function nextSlide() {
        $(".slides").animate({ marginLeft: "-500px" }, 500, function() {
            $(this).append($(".slide:first")).css("margin-left", "0");
        });
    }
    setInterval(nextSlide, 1000);
});

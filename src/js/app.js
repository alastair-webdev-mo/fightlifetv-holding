$(document).ready(function(){

 var progress = $('.progress .bar');
 progress.stop(true,false).animate({
      width:'100%'
 }, 2000, function() {
 	  $(".load-screen").animate({
    top: "-300px"
  }, 800);
  $("#load").animate({
    opacity: "toggle"
  }, 500);
});

 $(function() {
	$('.site-links li').bind('hover',function(event){
		var $anchor = $(this);
		/*
		if you want to use one of the easing effects:
		$('html, body').stop().animate({
			scrollLeft: $($anchor.attr('href')).offset().left
		}, 1500,'easeInOutExpo');
		 */
		$('html, body').stop().animate({
			scrollLeft: $($anchor.attr('href')).offset().left
		}, 1000);
		event.preventDefault();
	});
});


$('.site-links li').hover(function(e) {
	e.preventDefault();

	var content_id = $(this).attr('data-tab');
	$('.site-links li').removeClass('current');
	$('.center-content').removeClass('current');
	$(".bg").removeClass('active');

	$("."+content_id).addClass('current');

});

$('.site-links li').click(function(e) {
	e.preventDefault();
});

});

document.addEventListener("DOMContentLoaded",
function() {
    var div, n,
    v = document.getElementsByClassName("youtube-player");
    for (n = 0; n < v.length; n++) {
        div = document.createElement("div");
        div.setAttribute("data-id", v[n].dataset.id);
        div.innerHTML = labnolThumb(v[n].dataset.id);
        div.onclick = labnolIframe;
        v[n].appendChild(div);
    }
});
 
function labnolThumb(id) {
    var thumb = '<img src="https://i.ytimg.com/vi/ID/hqdefault.jpg">',
    play = '<div class="play"></div>';
    return thumb.replace("ID", id) + play;
}
 
function labnolIframe() {
    var iframe = document.createElement("iframe");
    var embed = "https://www.youtube.com/embed/ID?autoplay=1";
    iframe.setAttribute("src", embed.replace("ID", this.dataset.id));
    iframe.setAttribute("frameborder", "0");
    iframe.setAttribute("allowfullscreen", "1");
    this.parentNode.replaceChild(iframe, this);
}
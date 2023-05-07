$('span.user_search').click(function(e){$(window).scrollTop($('#banner').offset().top-$('.page-top').height()-100);});$(document).ready(function(){$('#myCarousel').carousel({interval:10000})
$(".latest_jobs_class").click(function(){window.location=$(this).attr('id')})
$(".latest_jobs a").click(function(e){e.stopPropagation()})});;
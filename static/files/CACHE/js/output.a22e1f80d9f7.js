;$(window).load(function(){$(".se-pre-con").fadeOut("slow");;});$(document).ready(function(){var showChar=130;var ellipsestext="...";var moretext="more";var lesstext="less";$('.more').each(function(){var content=$(this).children('p').html();if(content&&content.length>showChar){var c=content.substr(0,showChar);var h=content.substr(showChar,content.length-showChar);var html=c+'<span class="moreellipses">'+ellipsestext+'&nbsp;</span><span class="morecontent"><span class="moretext">'+h+'</span><span class="morelink">'+moretext+'</span></span>';$(this).children('p').html(html);}});$('body').on("click",".morelink",function(e){e.preventDefault();if($(this).hasClass("less")){$(this).removeClass("less");$(this).html(moretext);}else{$(this).addClass("less");$(this).html(lesstext);}
$(this).parent().prev().toggle();$(this).prev().toggle();return false;});});$(document).ready(function(){$('#job_skills').empty()
$('#job_skills').append(new Option('Select a Skill',''))
$.getJSON("/jobs/get_skills/",function(data){$.each(JSON.parse(data.response),function(key,field){$('#job_skills').append(new Option(field.fields.name,field.pk))})});$(window).scroll(function(e){var $el=$('.inner_login_box, .upload_btn_block, .subscribe_box');$('.inner_login_box, .upload_btn_block, .subscribe_box').css({'position':'static','top':'0px'});var isPositionFixed=($el.css('position')=='fixed');job_height=$('.main_container').height()
if($(this).scrollTop()<$(".right_container").height()&&isPositionFixed)
{$('.inner_login_box, .upload_btn_block, .subscribe_box').css({'position':'static','top':'0px'});}
if($(this).scrollTop()>$(".right_container").height()&&$(this).scrollTop()<(job_height-650)&&!isPositionFixed){$('.subscribe_box').css({'position':'fixed','top':'181px'});$('.subscribe_box').addClass('scroll_subscribe');$('.upload_btn_block').css({'position':'fixed','top':'121px'});$('.upload_btn_block').addClass('scroll_upload')
$('.left_login_text').text('Already a Member? Login')
$('#left_register_type').val('login')
$('.left_new_user_login').hide()
$('.left_new_account').show()
$('p.hint').remove();$('.left_login_form_button').text('Login Here')
$('#mail_password').show()
$('.left_forgot_password').show();$('.inner_login_box').css({'position':'fixed','top':'426px'});$('.inner_login_box').addClass('scroll_loginbox');}});});$('ul.pagination li a').click(function(e){href=$(this).attr('data-href');$('#page').val($(this).attr('class'));$('#refine_search').val('True');$('#refine-search').attr("action",href)
$('#refine-search').submit();});;$(function(){$("#slider-range").slider({range:true,min:0,max:20,values:[$('#refine_experience_min').val(),$('#refine_experience_max').val()],slide:function(event,ui){$('#refine_experience_min').val(ui.values[0]);$('#refine_experience_max').val(ui.values[1]);$('#refine_search').val('True');$('#refine-search').submit();}}).slider("pips").slider("float");});$('.tab_button').click(function(e){e.preventDefault();$('.tab_button').removeClass('active');$(this).addClass('active')
var panel=$(this).attr('data-url');$('.tab_block').removeClass('active')
$('#'+panel).addClass('active');});
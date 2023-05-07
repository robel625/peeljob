$(".month").click(function(e){e.preventDefault();$("#month").val($(this).attr("data"));$("#calander_form").attr("action",$(this).attr("href"));$("#calander_form").submit();})
$(".week").click(function(e){e.preventDefault();$("#week").val($(this).attr("data"));$("#month").val($(this).attr("data_month"));$("#calander_form").attr("action",$(this).attr("href"));$("#calander_form").submit();})
$(".full_year_view").click(function(e){e.preventDefault();$("#year").val($(this).attr("data"));$("#calander_form").attr("action",$(this).attr("href"));$("#calander_form").submit();})
$(".full_month_view").click(function(e){e.preventDefault();$("#month").val($(this).attr("data"));$("#calander_form").attr("action",$(this).attr("href"));$("#calander_form").submit();})
$(".prev_next").click(function(e){e.preventDefault();$("#year").val($(this).attr("data"));$("#calander_form").attr("action",window.location.pathname);$("#calander_form").submit();})
$(".prev_next_month").click(function(e){e.preventDefault();if($(this).attr("data")==1){if($(this).attr("data_event")=="prev"){if($($(".prev_next_month")[1]).attr("data")==11){$("#year").val(parseInt($("#year").val())-1);}}else{$("#year").val(parseInt($("#year").val())+1);}}
if($(this).attr("data")==12){if($(this).attr("data_event")=="prev"){$("#year").val(parseInt($("#year").val())-1);}}
$("#month").val($(this).attr("data"));$("#calander_form").attr("action",window.location.pathname);$("#calander_form").submit();})
$("#week_calendar").change(function(e){e.preventDefault();$("#week").val($(this).val());$("#month").val($('#month_calendar').val());path='/calendar/'+$('#year').val()+'/month/'+$('#month_calendar').val()+'/week/'+$('#week_calendar').val()+'/'
$("#calander_form").attr("action",path);$("#calander_form").submit();})
$("#month_calendar").change(function(e){e.preventDefault();$("#month").val($(this).val());$("#week").val($('#week_calendar').val());path='/calendar/'+$('#year').val()+'/month/'+$('#month_calendar').val()+'/'
$("#calander_form").attr("action",path);$("#calander_form").submit();});$('body').click(function(e){$('.drp_level_one').css('display','none')});$('.drop_down_user').click(function(e){e.stopPropagation();if($(window).width()<767){}
else{$('.drp_level_one').css('display','block');}});$(function(){$('[data-toggle="tooltip"]').tooltip()});$(document).ready(function(){$("#calendar_toogle").click(function(){$(".left-nav-block").slideToggle();});$(".main_row").hide()
$(".pp_action_table").hide()
$(".project-overview-heading").hide()});$(".get_project_add_form").click(function(e){$(".full-calendar-block").hide()
$(".pp_action_table").hide()
$(".main_row").show()
id=$(this).attr("rel");$('select.sub_category option[id='+id+']').attr('selected',true);});$('select#project_type').change(function(e){e.preventDefault();subcat_id=$(this).val();$.ajax({type:"GET",url:"",data:{'type_id':subcat_id},success:function(response){options=''
$('.cs_class').remove()
$.each(JSON.parse(response),function(i){options+='<option value="'+JSON.parse(response)[i][0]+'" class="cs_class">'+JSON.parse(response)[i][1]+'</option>';});$("#type_status").append(options);}});});$('.unset').click(function(e){e.preventDefault();$("#week").val($('#week_calendar').val());$("#calander_form").attr("action",window.location.pathname);$("#calander_form").submit();});
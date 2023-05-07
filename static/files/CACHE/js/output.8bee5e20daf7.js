$('form#CreateSimilarAlert').ajaxForm({type:'POST',dataType:'json',data:$('#CreateSimilarAlert').serialize(),url:'/alert/create/',success:function(data){console.log(data.error,data.message)
if(data.error==false){$("#create_similarjob_alert").modal('hide')
open_dialog('Success, We will reach you with Jobs of this type','Success!')}
else{$('p.hint').remove();for(var key in data.message){$('#alert_'+key).after('<p class="hint">'+data.message[key]+'</p>');}}}})
$('#similar_job_alert').click(function(){$('p.hint').remove();$('#CreateSimilarAlert')[0].reset()
$("#create_similarjob_alert").modal('show')})
$('#recommended_jobs_carousel').carousel({interval:7000});$('#recommended_jobs_carousel2').carousel({interval:7000});$('body').on('click','.recommended_job',function(){window.location=$(this).find("a").attr("href");});$('.less').click(function(e){e.preventDefault();$(this).addClass('limited_job_posts');$('.see_more').removeClass('limited_job_posts');$(this).siblings('ul').children('li').slice('5').addClass('limited_job_posts');});;$(document).ready(function(){$("select#job_skills").select2({placeholder:"Select here",maximumSelectionSize:100});$('#job_skills').empty()
$('#job_skills').append(new Option('Select a Skill',''))
job_skills=[]
$.getJSON("/jobs/get_skills/",function(data){$.each(JSON.parse(data.response),function(key,field){if($.inArray(field.pk,job_skills)==-1){$('#job_skills').append('<option value="'+field.pk+'">'+field.fields.name+'</option>')}
else{$('#job_skills').append('<option value="'+field.pk+'" selected>'+field.fields.name+'</option>')}})
a=$("select#job_skills option:selected")
$.each($("select#job_skills option:selected"),function(i,field){$(".Jobsubscribeform .select2-search").remove()
span=$('.Jobsubscribeform .select2').children().children().children().append('<li class="select2-selection__choice" title="'+$(this).text()+'"><span class="select2-selection__choice__remove" role="presentation">×</span>'+$(this).text()+'</li>')});$(".Jobsubscribeform .select2-selection__choice__remove").click(function(e){option=$(this).parent().attr('title')
$.each($("select#job_skills option:selected"),function(k,f){if($(this).text()==option){$(this).prop("selected",false);}});$(this).parent().remove()
if(!($('.Jobsubscribeform .select2').children().children().children().children()).length){$('.Jobsubscribeform .select2').children().children().children().append('<li class="select2-search select2-search--inline"><input class="select2-search__field" type="search" tabindex="0" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" role="textbox" placeholder="Select here" style="width: 254px;"></li>')}})});$(".redirect_job_click").click(function(e){e.preventDefault()
window.open($(this).find('.job_url').attr('href'))})
$(".redirect_job_click a").click(function(e){e.stopPropagation()})});
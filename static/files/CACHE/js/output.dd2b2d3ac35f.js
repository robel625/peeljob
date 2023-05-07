$(document).ready(function(e){$('#timelines').masonry({itemSelector:'.browse_col',columnWidth:0});})
$('.alphabets_row ul li a').click(function(e){e.preventDefault();$('#page').val(1)
$('#alphabet_value').val($(this).attr('class'));$('#recruiterform').submit();});function add_class(){var cl=$("#alphabet_value").val()
if(cl){$("."+cl).parent('li').addClass('active')}}
add_class()
$('.pagination li a').click(function(e){e.preventDefault();$('#page').val($(this).attr('class'))
var clas=$(this).attr('class');if(clas==1){$('#recruiterform').attr('action','/recruiters/')}
else{$('#recruiterform').attr('action','/recruiters/page/'+clas+'/')}
$('#recruiterform').submit();});$('.company_col').click(function(e){window.open($(this).find(".recruiter_url").attr("href"),'_blank')})
$(".company_col a").click(function(e){e.stopPropagation();})
$('#job_skills').empty()
$('#job_skills').append(new Option('Select a Skill',''))
$.getJSON("/jobs/get_skills/",function(data){$.each(JSON.parse(data.response),function(key,field){$('#job_skills').append(new Option(field.fields.name,field.pk))})});;
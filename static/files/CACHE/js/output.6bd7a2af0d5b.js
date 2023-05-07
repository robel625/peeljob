$('.list-inline li a').click(function(e){e.preventDefault();$('#alphabet_value').val($(this).attr('class'));$('#skillform').submit();});function add_class(){var cl=$("#alphabet_value").val()
if(cl){$("."+cl).addClass('active')}}
add_class()
$('#job_skills').empty()
$('#job_skills').append(new Option('Select a Skill',''))
$.getJSON("/jobs/get_skills/",function(data){$.each(JSON.parse(data.response),function(key,field){$('#job_skills').append(new Option(field.fields.name,field.pk))})});;
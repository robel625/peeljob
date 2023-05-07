$(document).ready(function(e){$('#timelines').masonry({itemSelector:'.browse_col',columnWidth:20});})
$('#job_skills').empty()
$('#job_skills').append(new Option('Select a Skill',''))
$.getJSON("/jobs/get_skills/",function(data){$.each(JSON.parse(data.response),function(key,field){$('#job_skills').append(new Option(field.fields.name,field.pk))})});$(".state_url").click(function(e){window.location=$(this).attr('data-href')});
$('.company_col').click(function(e){window.open($(this).find(".company_url").attr("href"),'_blank')})
$(".company_col a").click(function(e){e.stopPropagation();})
$('.alphabets-ul li a').click(function(e){e.preventDefault();$('#page').val(1)
$('#alphabet_value').val($(this).attr('class'));$('#companyform').submit();});$('.pagination li a').click(function(e){e.preventDefault();$('#page').val($(this).attr('class'))
url='/companies/'
if($(this).attr('class')!=1){url='/companies/'+$(this).attr('class')+'/'}
$('#companyform').attr('action',url)
$('#companyform').submit();});function add_class(){var cl=$("#alphabet_value").val()
if(cl){$("."+cl).parent('li').addClass('active')}}
add_class()
$('#job_skills').empty()
$('#job_skills').append(new Option('Select a Skill',''))
$.getJSON("/jobs/get_skills/",function(data){$.each(JSON.parse(data.response),function(key,field){$('#job_skills').append(new Option(field.fields.name,field.pk))})});;
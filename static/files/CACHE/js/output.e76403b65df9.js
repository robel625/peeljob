$(".alert-delete").click(function(e){e.preventDefault();id=$(this).attr('id')
$('#block_question').text('Do you want to delete Alert Details?')
$('#block_question').dialog({modal:true,draggable:false,title:"Info!!",buttons:[{text:"Yes",click:function(){$(this).dialog("close");$.post('/alert/delete/'+id+'/',$("form#educationform").serialize(),function(data){if(data.error){if(data.response_message){open_dialog(data.response_message,'Error!')}
else{open_dialog('Something went wrong','Error!')}}else{open_dialog_with_url('Job Alert Deleted Successfully','Success!!!',".")}},'json');}},{text:"No",click:function(){$(this).dialog("close");}}]});})
$("select#job_skills").select2({placeholder:"Select here",maximumSelectionSize:100});$('#job_skills').empty()
$('#job_skills').append(new Option('Select a Skill',''))
$.getJSON("/jobs/get_skills/",function(data){$.each(JSON.parse(data.response),function(key,field){$('#job_skills').append(new Option(field.fields.name,field.pk))})});;
$(function(){$("#last_used").datepicker({changeMonth:true,changeYear:true,yearRange:"1950:2020"});});$('#skill').select2();$(".cancelbutton").click(function(e){window.location="/profile/";});$("form#projectform").submit(function(e){e.preventDefault();$.post(".",$("form#projectform").serialize(),function(data){if(data.error){$('p.hint').remove();$('.add_another').removeClass('save_other')
if(data.response_message){open_dialog(data.response_message,'Info!')}
for(var key in data.response){$('#'+key).parent().append('<p class="hint">'+data.response[key]+'</p>');}}else{if($('.add_another').hasClass('save_other')){open_dialog_with_url('Your profile has been updated successfully','Success!!!',".")}
else{open_dialog_with_url('Your profile has been updated successfully','Success!!!',"/profile/")}}},'json');});;
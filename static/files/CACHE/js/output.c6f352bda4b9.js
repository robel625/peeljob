$('.ui-dialog-buttonset button').attr('class','btn')
$(".cancelbutton").click(function(e){window.location="/profile/";});$("form#languageform").submit(function(e){e.preventDefault();$.post(".",$("form#languageform").serialize(),function(data){if(data.error){$('p.hint').remove();$('.add_another').removeClass('save_other')
if(data.response_message){open_dialog(data.response_message,'Error!')}
if(data.response){open_dialog(data.response,'Info!')}
if(data.language){open_dialog(data.language,'Info!')}}else{if($('.add_another').hasClass('save_other')){open_dialog_with_url('Your profile has been updated successfully','Success!!!',".")}
else{open_dialog_with_url('Your profile has been updated successfully','Success!!!',"/profile/")}}},'json');});;
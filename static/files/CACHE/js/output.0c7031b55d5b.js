$(document).ready(function(){$('form#SocialRegister').submit(function(e){e.preventDefault()
var formData=new FormData($(this)[0]);$.ajax({type:'POST',dataType:'json',data:formData,enctype:'multipart/form-data',processData:false,contentType:false,url:'.',success:function(data){if(data.error==false){open_dialog_with_url('Profile Updated Successfully','Success!','/profile/')}
else if(data.response){$('p.hint').remove();for(var key in data.response){if(key=='technical_skills'){$('.reg_skill_err').html('<p class="hint">'+data.response[key]+'</p>');}else if(key=='current_city'){$('.city_err').html('<p class="hint">'+data.response[key]+'</p>');}
else{$('#user_register_'+key).after('<p class="hint">'+data.response[key]+'</p>');}}}
else{open_dialog(data.response_message,'ALert');}}});});})
$('body').on('click','.ui-dialog-titlebar-close',function(e){window.location='/profile/';})
$('a').click(function(event){event.preventDefault();if(($(this).attr('href')=='/logout/')||($(this).attr('href')=='/')){window.location=$(this).attr('href')}
else{open_dialog("Please update your profile to search relevant jobs for you")}});;
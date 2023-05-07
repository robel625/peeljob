$(document).ready(function(){$('body').on('keypress',"input[type=text], textarea",function(e){if(e.which==13&&!e.shiftKey){$(this).closest("form").submit();}});$(".job_button").click(function(e){e.preventDefault()
$('.job_button').removeClass('active')
$(this).addClass('active')
$(this).find('.msg_count').remove()
$.post(".",{'r_id':$(this).attr('id'),'job_id':$(this).attr('data-id'),'mode':'get_messages'},function(data){if(data.error==false){$('.message_box1').html(data.messages)
$('.message_box1 .chat').attr('id','chat1')
$(".messages_container").scrollTop($(".messages_container")[0].scrollHeight);}
else{open_dialog('Something Went Wrong!','Alert!')}},'json');})
$(".recruiter_button").click(function(e){e.preventDefault()
$('.recruiter_button').removeClass('active')
$(this).addClass('active')
$(this).find('.msg_count').remove()
$.post(".",{'r_id':$(this).attr('id'),'mode':'get_messages'},function(data){if(data.error==false){$('.message_box2').html(data.messages)
$('.message_box2 .chat').attr('id','chat2')
$(".messages_container").scrollTop($(".messages_container")[0].scrollHeight);}
else{open_dialog('Something Went Wrong!','Alert!')}},'json');})
$('body').on('submit','form.messageform',function(e){e.preventDefault();if($(this).find('input[name=message], textarea').val().trim()==''){open_dialog('Please Enter any message!','Alert!')
return false}
$.post(".",$(this).serialize(),function(data){$('div.error').remove();if(data.error==false){$msg=$('.message_box').clone()
$($msg).attr('id',data.msg_id)
$($msg).removeClass('message_box')
$($msg).find('#message_text').text(data.message)
$($msg).find('#message_time').text(data.time)
$(".empty_msg").remove()
if(data.job_post){$(".message_box1 .chat").append($msg.show())
$(".messages_container").scrollTop($(".messages_container")[0].scrollHeight);}
else{$(".message_box2 .chat").append($msg.show())
$(".messages_container").scrollTop($(".messages_container")[0].scrollHeight);}
$('input[name=message], textarea').val('')}
else{open_dialog('Something Went Wrong!','Alert!')}},'json');});$('body').on('click','.delete_msg',function(e){e.stopPropagation()
id=$(this).parent().attr('id')
$.post('.',{'mode':'delete_message','id':id},function(data){if(data.error==false){if($('#'+id).siblings().length==0){$('#'+id).closest('.chat').html('<div class="text-center empty_msg"><h2> No Messages</h2></div>')}
$('#'+id).remove()
open_dialog("Message Removed Successfully!",'Success!')}
else{open_dialog(data.message,'Alert!')}},'json');})
$('body').on('click','.delete_chat',function(e){e.preventDefault()
chat=$(this).closest('.message_box1')
$.post('.',{'mode':'delete_chat','user':$(this).attr('id'),'job':$(this).attr('data-href')},function(data){if(data.error==false){open_dialog("Chat cleared Successfully!",'Success!')
if(chat.length>0){$('#chat1').html('<div class="text-center empty_msg"><h2> No Messages</h2></div>')}
else{$('#chat2').html('<div class="text-center empty_msg"><h2> No Messages</h2></div>')}}
else{open_dialog("Something Went Wrong!",'Alert!')}},'json');})});
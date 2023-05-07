$('.unsubscribe').click(function(e){$("#UnsubsribeForm").show()
$(this).parent().hide()})
$('.cancelbutton').click(function(e){window.location='/'})
$("form#UnsubsribeForm").submit(function(e){e.preventDefault();$.post(".",$("form#UnsubsribeForm").serialize(),function(data){if(data.error==true){if(data.err_message){open_dialog_with_url(data.err_message,'Success!','/')}
else{$('p.hint').remove();$('#reason').after('<p class="hint">'+data.message+'</p>');}}
else{open_dialog_with_url("Your have successfully unsubscribed from our Services",'Success!','/')}},'json');});;
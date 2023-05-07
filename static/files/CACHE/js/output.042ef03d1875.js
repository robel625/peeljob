$(document).ready(function(){$('.view_comment').click(function(){var cmt_bloc=$(this).closest(".comment_section").siblings(".replies_block");$(this).closest(".comment_section").siblings(".cmments_repls").not(cmt_bloc).slideUp();if(cmt_bloc.is(':visible')){cmt_bloc.slideUp();}
else{cmt_bloc.slideDown();}});$('.add-like').click(function(){var _this=$(this)
if($(_this).hasClass('logged')){if($(_this).find('.fa').hasClass('active')!=true){model=$(_this).attr('data-href')
id=$(_this).attr('id')
$(_this).find('.fa').addClass('active')
$.post('/assessment-changes/',{mode:'add_like',model:model,id:id},function(data){$(_this).find('.count').text(parseInt($(_this).find('.count').text())+1)
var dis_like=$(_this).prev()
if($(dis_like).find('.fa').hasClass('active')){$(dis_like).find('.fa').removeClass('active')
$(dis_like).find('.count').text(parseFloat($(dis_like).find('.count').text())-1)}})}}
else{$('#login_register').modal('show')}});$('.dis-like').click(function(){var _this=$(this)
if($(_this).hasClass('logged')){if($(_this).find('.fa').hasClass('active')!=true){model=$(_this).attr('data-href')
id=$(_this).attr('id')
$(_this).find('.fa').addClass('active')
$.post('/assessment-changes/',{mode:'dis_like',model:model,id:id},function(data){$(_this).find('.count').text(parseInt($(_this).find('.count').text())+1)
add_like=$(_this).next()
if($(add_like).find('.fa').hasClass('active')){$(add_like).find('.fa').removeClass('active')
$(add_like).find('.count').text(parseFloat($(add_like).find('.count').text())-1)}})}}
else{$('#login_register').modal('show')}});$(".comment_form").submit(function(e){var _this=$(this)
e.preventDefault()
if($(_this).hasClass('logged')){$.post('/assessment-changes/',$(this).serialize(),function(data){var data=JSON.parse(data);if(data.error){$(_this).find('.comment').after('<p class="error">'+data.message+'</p>')}else{$(_this).find('.comment').val('')
$(_this).closest('.replies_block').find('.no_comment').remove()
$(_this).closest('.replies_block').find('ul').append('<li><span>You</span>'+data.comment+'</li>')}})}
else{$('#login_register').modal('show')}})});;
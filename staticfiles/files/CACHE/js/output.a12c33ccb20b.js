(function($){function CircleProgress(config){this.init(config);}
CircleProgress.prototype={value:0.0,size:100.0,startAngle:-Math.PI,thickness:'auto',fill:{gradient:['#3aeabb','#fdd250']},emptyFill:'rgba(0, 0, 0, .2)',animation:{duration:1200,easing:'circleProgressEasing'},animationStartValue:0.0,reverse:false,lineCap:'butt',constructor:CircleProgress,el:null,canvas:null,ctx:null,radius:0.0,arcFill:null,lastFrameValue:0.0,init:function(config){$.extend(this,config);this.radius=this.size/2;this.initWidget();this.initFill();this.draw();},initWidget:function(){var canvas=this.canvas=this.canvas||$('<canvas>').prependTo(this.el)[0];canvas.width=this.size;canvas.height=this.size;this.ctx=canvas.getContext('2d');},initFill:function(){var self=this,fill=this.fill,ctx=this.ctx,size=this.size;if(!fill)
throw Error("The fill is not specified!");if(fill.color)
this.arcFill=fill.color;if(fill.gradient){var gr=fill.gradient;if(gr.length==1){this.arcFill=gr[0];}else if(gr.length>1){var ga=fill.gradientAngle||0,gd=fill.gradientDirection||[size/2*(1-Math.cos(ga)),size/2*(1+Math.sin(ga)),size/2*(1+Math.cos(ga)),size/2*(1-Math.sin(ga))];var lg=ctx.createLinearGradient.apply(ctx,gd);for(var i=0;i<gr.length;i++){var color=gr[i],pos=i/(gr.length-1);if($.isArray(color)){pos=color[1];color=color[0];}
lg.addColorStop(pos,color);}
this.arcFill=lg;}}
if(fill.image){var img;if(fill.image instanceof Image){img=fill.image;}else{img=new Image();img.src=fill.image;}
if(img.complete)
setImageFill();else
img.onload=setImageFill;}
function setImageFill(){var bg=$('<canvas>')[0];bg.width=self.size;bg.height=self.size;bg.getContext('2d').drawImage(img,0,0,size,size);self.arcFill=self.ctx.createPattern(bg,'no-repeat');self.drawFrame(self.lastFrameValue);}},draw:function(){if(this.animation)
this.drawAnimated(this.value);else
this.drawFrame(this.value);},drawFrame:function(v){this.lastFrameValue=v;this.ctx.clearRect(0,0,this.size,this.size);this.drawEmptyArc(v);this.drawArc(v);},drawArc:function(v){var ctx=this.ctx,r=this.radius,t=this.getThickness(),a=this.startAngle;ctx.save();ctx.beginPath();if(!this.reverse){ctx.arc(r,r,r-t/2,a,a+Math.PI*2*v);}else{ctx.arc(r,r,r-t/2,a-Math.PI*2*v,a);}
ctx.lineWidth=t;ctx.lineCap=this.lineCap;ctx.strokeStyle=this.arcFill;ctx.stroke();ctx.restore();},drawEmptyArc:function(v){var ctx=this.ctx,r=this.radius,t=this.getThickness(),a=this.startAngle;if(v<1){ctx.save();ctx.beginPath();if(v<=0){ctx.arc(r,r,r-t/2,0,Math.PI*2);}else{if(!this.reverse){ctx.arc(r,r,r-t/2,a+Math.PI*2*v,a);}else{ctx.arc(r,r,r-t/2,a,a-Math.PI*2*v);}}
ctx.lineWidth=t;ctx.strokeStyle=this.emptyFill;ctx.stroke();ctx.restore();}},drawAnimated:function(v){var self=this,el=this.el,canvas=$(this.canvas);canvas.stop(true,false);el.trigger('circle-animation-start');canvas.css({animationProgress:0}).animate({animationProgress:1},$.extend({},this.animation,{step:function(animationProgress){var stepValue=self.animationStartValue*(1-animationProgress)+v*animationProgress;self.drawFrame(stepValue);el.trigger('circle-animation-progress',[animationProgress,stepValue]);}})).promise().always(function(){el.trigger('circle-animation-end');});},getThickness:function(){return $.isNumeric(this.thickness)?this.thickness:this.size/14;},getValue:function(){return this.value;},setValue:function(newValue){if(this.animation)
this.animationStartValue=this.lastFrameValue;this.value=newValue;this.draw();}};$.circleProgress={defaults:CircleProgress.prototype};$.easing.circleProgressEasing=function(x,t,b,c,d){if((t/=d/2)<1)
return c/2*t*t*t+b;return c/2*((t-=2)*t*t+2)+b;};$.fn.circleProgress=function(configOrCommand,commandArgument){var dataName='circle-progress',firstInstance=this.data(dataName);if(configOrCommand=='widget'){if(!firstInstance)
throw Error('Calling "widget" method on not initialized instance is forbidden');return firstInstance.canvas;}
if(configOrCommand=='value'){if(!firstInstance)
throw Error('Calling "value" method on not initialized instance is forbidden');if(typeof commandArgument=='undefined'){return firstInstance.getValue();}else{var newValue=arguments[1];return this.each(function(){$(this).data(dataName).setValue(newValue);});}}
return this.each(function(){var el=$(this),instance=el.data(dataName),config=$.isPlainObject(configOrCommand)?configOrCommand:{};if(instance){instance.init(config);}else{var initialConfig=$.extend({},el.data());if(typeof initialConfig.fill=='string')
initialConfig.fill=JSON.parse(initialConfig.fill);if(typeof initialConfig.animation=='string')
initialConfig.animation=JSON.parse(initialConfig.animation);config=$.extend(initialConfig,config);config.el=el;instance=new CircleProgress(config);el.data(dataName,instance);}});};})(jQuery);;/*!
 * jQuery Form Plugin
 * version: 3.51.0-2014.06.20
 * Requires jQuery v1.5 or later
 * Copyright (c) 2014 M. Alsup
 * Examples and documentation at: http://malsup.com/jquery/form/
 * Project repository: https://github.com/malsup/form
 * Dual licensed under the MIT and GPL licenses.
 * https://github.com/malsup/form#copyright-and-license
 */(function(factory){if(typeof define==='function'&&define.amd){define(['jquery'],factory);}else{factory((typeof(jQuery)!='undefined')?jQuery:window.Zepto);}}
(function($){var feature={};feature.fileapi=$("<input type='file'/>").get(0).files!==undefined;feature.formdata=window.FormData!==undefined;var hasProp=!!$.fn.prop;$.fn.attr2=function(){if(!hasProp){return this.attr.apply(this,arguments);}
var val=this.prop.apply(this,arguments);if((val&&val.jquery)||typeof val==='string'){return val;}
return this.attr.apply(this,arguments);};$.fn.ajaxSubmit=function(options){if(!this.length){log('ajaxSubmit: skipping submit process - no element selected');return this;}
var method,action,url,$form=this;if(typeof options=='function'){options={success:options};}
else if(options===undefined){options={};}
method=options.type||this.attr2('method');action=options.url||this.attr2('action');url=(typeof action==='string')?$.trim(action):'';url=url||window.location.href||'';if(url){url=(url.match(/^([^#]+)/)||[])[1];}
options=$.extend(true,{url:url,success:$.ajaxSettings.success,type:method||$.ajaxSettings.type,iframeSrc:/^https/i.test(window.location.href||'')?'javascript:false':'about:blank'},options);var veto={};this.trigger('form-pre-serialize',[this,options,veto]);if(veto.veto){log('ajaxSubmit: submit vetoed via form-pre-serialize trigger');return this;}
if(options.beforeSerialize&&options.beforeSerialize(this,options)===false){log('ajaxSubmit: submit aborted via beforeSerialize callback');return this;}
var traditional=options.traditional;if(traditional===undefined){traditional=$.ajaxSettings.traditional;}
var elements=[];var qx,a=this.formToArray(options.semantic,elements);if(options.data){options.extraData=options.data;qx=$.param(options.data,traditional);}
if(options.beforeSubmit&&options.beforeSubmit(a,this,options)===false){log('ajaxSubmit: submit aborted via beforeSubmit callback');return this;}
this.trigger('form-submit-validate',[a,this,options,veto]);if(veto.veto){log('ajaxSubmit: submit vetoed via form-submit-validate trigger');return this;}
var q=$.param(a,traditional);if(qx){q=(q?(q+'&'+qx):qx);}
if(options.type.toUpperCase()=='GET'){options.url+=(options.url.indexOf('?')>=0?'&':'?')+q;options.data=null;}
else{options.data=q;}
var callbacks=[];if(options.resetForm){callbacks.push(function(){$form.resetForm();});}
if(options.clearForm){callbacks.push(function(){$form.clearForm(options.includeHidden);});}
if(!options.dataType&&options.target){var oldSuccess=options.success||function(){};callbacks.push(function(data){var fn=options.replaceTarget?'replaceWith':'html';$(options.target)[fn](data).each(oldSuccess,arguments);});}
else if(options.success){callbacks.push(options.success);}
options.success=function(data,status,xhr){var context=options.context||this;for(var i=0,max=callbacks.length;i<max;i++){callbacks[i].apply(context,[data,status,xhr||$form,$form]);}};if(options.error){var oldError=options.error;options.error=function(xhr,status,error){var context=options.context||this;oldError.apply(context,[xhr,status,error,$form]);};}
if(options.complete){var oldComplete=options.complete;options.complete=function(xhr,status){var context=options.context||this;oldComplete.apply(context,[xhr,status,$form]);};}
var fileInputs=$('input[type=file]:enabled',this).filter(function(){return $(this).val()!=='';});var hasFileInputs=fileInputs.length>0;var mp='multipart/form-data';var multipart=($form.attr('enctype')==mp||$form.attr('encoding')==mp);var fileAPI=feature.fileapi&&feature.formdata;log("fileAPI :"+fileAPI);var shouldUseFrame=(hasFileInputs||multipart)&&!fileAPI;var jqxhr;if(options.iframe!==false&&(options.iframe||shouldUseFrame)){if(options.closeKeepAlive){$.get(options.closeKeepAlive,function(){jqxhr=fileUploadIframe(a);});}
else{jqxhr=fileUploadIframe(a);}}
else if((hasFileInputs||multipart)&&fileAPI){jqxhr=fileUploadXhr(a);}
else{jqxhr=$.ajax(options);}
$form.removeData('jqxhr').data('jqxhr',jqxhr);for(var k=0;k<elements.length;k++){elements[k]=null;}
this.trigger('form-submit-notify',[this,options]);return this;function deepSerialize(extraData){var serialized=$.param(extraData,options.traditional).split('&');var len=serialized.length;var result=[];var i,part;for(i=0;i<len;i++){serialized[i]=serialized[i].replace(/\+/g,' ');part=serialized[i].split('=');result.push([decodeURIComponent(part[0]),decodeURIComponent(part[1])]);}
return result;}
function fileUploadXhr(a){var formdata=new FormData();for(var i=0;i<a.length;i++){formdata.append(a[i].name,a[i].value);}
if(options.extraData){var serializedData=deepSerialize(options.extraData);for(i=0;i<serializedData.length;i++){if(serializedData[i]){formdata.append(serializedData[i][0],serializedData[i][1]);}}}
options.data=null;var s=$.extend(true,{},$.ajaxSettings,options,{contentType:false,processData:false,cache:false,type:method||'POST'});if(options.uploadProgress){s.xhr=function(){var xhr=$.ajaxSettings.xhr();if(xhr.upload){xhr.upload.addEventListener('progress',function(event){var percent=0;var position=event.loaded||event.position;var total=event.total;if(event.lengthComputable){percent=Math.ceil(position/total*100);}
options.uploadProgress(event,position,total,percent);},false);}
return xhr;};}
s.data=null;var beforeSend=s.beforeSend;s.beforeSend=function(xhr,o){if(options.formData){o.data=options.formData;}
else{o.data=formdata;}
if(beforeSend){beforeSend.call(this,xhr,o);}};return $.ajax(s);}
function fileUploadIframe(a){var form=$form[0],el,i,s,g,id,$io,io,xhr,sub,n,timedOut,timeoutHandle;var deferred=$.Deferred();deferred.abort=function(status){xhr.abort(status);};if(a){for(i=0;i<elements.length;i++){el=$(elements[i]);if(hasProp){el.prop('disabled',false);}
else{el.removeAttr('disabled');}}}
s=$.extend(true,{},$.ajaxSettings,options);s.context=s.context||s;id='jqFormIO'+(new Date().getTime());if(s.iframeTarget){$io=$(s.iframeTarget);n=$io.attr2('name');if(!n){$io.attr2('name',id);}
else{id=n;}}
else{$io=$('<iframe name="'+id+'" src="'+s.iframeSrc+'" />');$io.css({position:'absolute',top:'-1000px',left:'-1000px'});}
io=$io[0];xhr={aborted:0,responseText:null,responseXML:null,status:0,statusText:'n/a',getAllResponseHeaders:function(){},getResponseHeader:function(){},setRequestHeader:function(){},abort:function(status){var e=(status==='timeout'?'timeout':'aborted');log('aborting upload... '+e);this.aborted=1;try{if(io.contentWindow.document.execCommand){io.contentWindow.document.execCommand('Stop');}}
catch(ignore){}
$io.attr('src',s.iframeSrc);xhr.error=e;if(s.error){s.error.call(s.context,xhr,e,status);}
if(g){$.event.trigger("ajaxError",[xhr,s,e]);}
if(s.complete){s.complete.call(s.context,xhr,e);}}};g=s.global;if(g&&0===$.active++){$.event.trigger("ajaxStart");}
if(g){$.event.trigger("ajaxSend",[xhr,s]);}
if(s.beforeSend&&s.beforeSend.call(s.context,xhr,s)===false){if(s.global){$.active--;}
deferred.reject();return deferred;}
if(xhr.aborted){deferred.reject();return deferred;}
sub=form.clk;if(sub){n=sub.name;if(n&&!sub.disabled){s.extraData=s.extraData||{};s.extraData[n]=sub.value;if(sub.type=="image"){s.extraData[n+'.x']=form.clk_x;s.extraData[n+'.y']=form.clk_y;}}}
var CLIENT_TIMEOUT_ABORT=1;var SERVER_ABORT=2;function getDoc(frame){var doc=null;try{if(frame.contentWindow){doc=frame.contentWindow.document;}}catch(err){log('cannot get iframe.contentWindow document: '+err);}
if(doc){return doc;}
try{doc=frame.contentDocument?frame.contentDocument:frame.document;}catch(err){log('cannot get iframe.contentDocument: '+err);doc=frame.document;}
return doc;}
var csrf_token=$('meta[name=csrf-token]').attr('content');var csrf_param=$('meta[name=csrf-param]').attr('content');if(csrf_param&&csrf_token){s.extraData=s.extraData||{};s.extraData[csrf_param]=csrf_token;}
function doSubmit(){var t=$form.attr2('target'),a=$form.attr2('action'),mp='multipart/form-data',et=$form.attr('enctype')||$form.attr('encoding')||mp;form.setAttribute('target',id);if(!method||/post/i.test(method)){form.setAttribute('method','POST');}
if(a!=s.url){form.setAttribute('action',s.url);}
if(!s.skipEncodingOverride&&(!method||/post/i.test(method))){$form.attr({encoding:'multipart/form-data',enctype:'multipart/form-data'});}
if(s.timeout){timeoutHandle=setTimeout(function(){timedOut=true;cb(CLIENT_TIMEOUT_ABORT);},s.timeout);}
function checkState(){try{var state=getDoc(io).readyState;log('state = '+state);if(state&&state.toLowerCase()=='uninitialized'){setTimeout(checkState,50);}}
catch(e){log('Server abort: ',e,' (',e.name,')');cb(SERVER_ABORT);if(timeoutHandle){clearTimeout(timeoutHandle);}
timeoutHandle=undefined;}}
var extraInputs=[];try{if(s.extraData){for(var n in s.extraData){if(s.extraData.hasOwnProperty(n)){if($.isPlainObject(s.extraData[n])&&s.extraData[n].hasOwnProperty('name')&&s.extraData[n].hasOwnProperty('value')){extraInputs.push($('<input type="hidden" name="'+s.extraData[n].name+'">').val(s.extraData[n].value).appendTo(form)[0]);}else{extraInputs.push($('<input type="hidden" name="'+n+'">').val(s.extraData[n]).appendTo(form)[0]);}}}}
if(!s.iframeTarget){$io.appendTo('body');}
if(io.attachEvent){io.attachEvent('onload',cb);}
else{io.addEventListener('load',cb,false);}
setTimeout(checkState,15);try{form.submit();}catch(err){var submitFn=document.createElement('form').submit;submitFn.apply(form);}}
finally{form.setAttribute('action',a);form.setAttribute('enctype',et);if(t){form.setAttribute('target',t);}else{$form.removeAttr('target');}
$(extraInputs).remove();}}
if(s.forceSync){doSubmit();}
else{setTimeout(doSubmit,10);}
var data,doc,domCheckCount=50,callbackProcessed;function cb(e){if(xhr.aborted||callbackProcessed){return;}
doc=getDoc(io);if(!doc){log('cannot access response document');e=SERVER_ABORT;}
if(e===CLIENT_TIMEOUT_ABORT&&xhr){xhr.abort('timeout');deferred.reject(xhr,'timeout');return;}
else if(e==SERVER_ABORT&&xhr){xhr.abort('server abort');deferred.reject(xhr,'error','server abort');return;}
if(!doc||doc.location.href==s.iframeSrc){if(!timedOut){return;}}
if(io.detachEvent){io.detachEvent('onload',cb);}
else{io.removeEventListener('load',cb,false);}
var status='success',errMsg;try{if(timedOut){throw'timeout';}
var isXml=s.dataType=='xml'||doc.XMLDocument||$.isXMLDoc(doc);log('isXml='+isXml);if(!isXml&&window.opera&&(doc.body===null||!doc.body.innerHTML)){if(--domCheckCount){log('requeing onLoad callback, DOM not available');setTimeout(cb,250);return;}}
var docRoot=doc.body?doc.body:doc.documentElement;xhr.responseText=docRoot?docRoot.innerHTML:null;xhr.responseXML=doc.XMLDocument?doc.XMLDocument:doc;if(isXml){s.dataType='xml';}
xhr.getResponseHeader=function(header){var headers={'content-type':s.dataType};return headers[header.toLowerCase()];};if(docRoot){xhr.status=Number(docRoot.getAttribute('status'))||xhr.status;xhr.statusText=docRoot.getAttribute('statusText')||xhr.statusText;}
var dt=(s.dataType||'').toLowerCase();var scr=/(json|script|text)/.test(dt);if(scr||s.textarea){var ta=doc.getElementsByTagName('textarea')[0];if(ta){xhr.responseText=ta.value;xhr.status=Number(ta.getAttribute('status'))||xhr.status;xhr.statusText=ta.getAttribute('statusText')||xhr.statusText;}
else if(scr){var pre=doc.getElementsByTagName('pre')[0];var b=doc.getElementsByTagName('body')[0];if(pre){xhr.responseText=pre.textContent?pre.textContent:pre.innerText;}
else if(b){xhr.responseText=b.textContent?b.textContent:b.innerText;}}}
else if(dt=='xml'&&!xhr.responseXML&&xhr.responseText){xhr.responseXML=toXml(xhr.responseText);}
try{data=httpData(xhr,dt,s);}
catch(err){status='parsererror';xhr.error=errMsg=(err||status);}}
catch(err){log('error caught: ',err);status='error';xhr.error=errMsg=(err||status);}
if(xhr.aborted){log('upload aborted');status=null;}
if(xhr.status){status=(xhr.status>=200&&xhr.status<300||xhr.status===304)?'success':'error';}
if(status==='success'){if(s.success){s.success.call(s.context,data,'success',xhr);}
deferred.resolve(xhr.responseText,'success',xhr);if(g){$.event.trigger("ajaxSuccess",[xhr,s]);}}
else if(status){if(errMsg===undefined){errMsg=xhr.statusText;}
if(s.error){s.error.call(s.context,xhr,status,errMsg);}
deferred.reject(xhr,'error',errMsg);if(g){$.event.trigger("ajaxError",[xhr,s,errMsg]);}}
if(g){$.event.trigger("ajaxComplete",[xhr,s]);}
if(g&&!--$.active){$.event.trigger("ajaxStop");}
if(s.complete){s.complete.call(s.context,xhr,status);}
callbackProcessed=true;if(s.timeout){clearTimeout(timeoutHandle);}
setTimeout(function(){if(!s.iframeTarget){$io.remove();}
else{$io.attr('src',s.iframeSrc);}
xhr.responseXML=null;},100);}
var toXml=$.parseXML||function(s,doc){if(window.ActiveXObject){doc=new ActiveXObject('Microsoft.XMLDOM');doc.async='false';doc.loadXML(s);}
else{doc=(new DOMParser()).parseFromString(s,'text/xml');}
return(doc&&doc.documentElement&&doc.documentElement.nodeName!='parsererror')?doc:null;};var parseJSON=$.parseJSON||function(s){return window['eval']('('+s+')');};var httpData=function(xhr,type,s){var ct=xhr.getResponseHeader('content-type')||'',xml=type==='xml'||!type&&ct.indexOf('xml')>=0,data=xml?xhr.responseXML:xhr.responseText;if(xml&&data.documentElement.nodeName==='parsererror'){if($.error){$.error('parsererror');}}
if(s&&s.dataFilter){data=s.dataFilter(data,type);}
if(typeof data==='string'){if(type==='json'||!type&&ct.indexOf('json')>=0){data=parseJSON(data);}else if(type==="script"||!type&&ct.indexOf("javascript")>=0){$.globalEval(data);}}
return data;};return deferred;}};$.fn.ajaxForm=function(options){options=options||{};options.delegation=options.delegation&&$.isFunction($.fn.on);if(!options.delegation&&this.length===0){var o={s:this.selector,c:this.context};if(!$.isReady&&o.s){log('DOM not ready, queuing ajaxForm');$(function(){$(o.s,o.c).ajaxForm(options);});return this;}
log('terminating; zero elements found by selector'+($.isReady?'':' (DOM not ready)'));return this;}
if(options.delegation){$(document).off('submit.form-plugin',this.selector,doAjaxSubmit).off('click.form-plugin',this.selector,captureSubmittingElement).on('submit.form-plugin',this.selector,options,doAjaxSubmit).on('click.form-plugin',this.selector,options,captureSubmittingElement);return this;}
return this.ajaxFormUnbind().bind('submit.form-plugin',options,doAjaxSubmit).bind('click.form-plugin',options,captureSubmittingElement);};function doAjaxSubmit(e){var options=e.data;if(!e.isDefaultPrevented()){e.preventDefault();$(e.target).ajaxSubmit(options);}}
function captureSubmittingElement(e){var target=e.target;var $el=$(target);if(!($el.is("[type=submit],[type=image]"))){var t=$el.closest('[type=submit]');if(t.length===0){return;}
target=t[0];}
var form=this;form.clk=target;if(target.type=='image'){if(e.offsetX!==undefined){form.clk_x=e.offsetX;form.clk_y=e.offsetY;}else if(typeof $.fn.offset=='function'){var offset=$el.offset();form.clk_x=e.pageX-offset.left;form.clk_y=e.pageY-offset.top;}else{form.clk_x=e.pageX-target.offsetLeft;form.clk_y=e.pageY-target.offsetTop;}}
setTimeout(function(){form.clk=form.clk_x=form.clk_y=null;},100);}
$.fn.ajaxFormUnbind=function(){return this.unbind('submit.form-plugin click.form-plugin');};$.fn.formToArray=function(semantic,elements){var a=[];if(this.length===0){return a;}
var form=this[0];var formId=this.attr('id');var els=semantic?form.getElementsByTagName('*'):form.elements;var els2;if(els&&!/MSIE [678]/.test(navigator.userAgent)){els=$(els).get();}
if(formId){els2=$(':input[form="'+formId+'"]').get();if(els2.length){els=(els||[]).concat(els2);}}
if(!els||!els.length){return a;}
var i,j,n,v,el,max,jmax;for(i=0,max=els.length;i<max;i++){el=els[i];n=el.name;if(!n||el.disabled){continue;}
if(semantic&&form.clk&&el.type=="image"){if(form.clk==el){a.push({name:n,value:$(el).val(),type:el.type});a.push({name:n+'.x',value:form.clk_x},{name:n+'.y',value:form.clk_y});}
continue;}
v=$.fieldValue(el,true);if(v&&v.constructor==Array){if(elements){elements.push(el);}
for(j=0,jmax=v.length;j<jmax;j++){a.push({name:n,value:v[j]});}}
else if(feature.fileapi&&el.type=='file'){if(elements){elements.push(el);}
var files=el.files;if(files.length){for(j=0;j<files.length;j++){a.push({name:n,value:files[j],type:el.type});}}
else{a.push({name:n,value:'',type:el.type});}}
else if(v!==null&&typeof v!='undefined'){if(elements){elements.push(el);}
a.push({name:n,value:v,type:el.type,required:el.required});}}
if(!semantic&&form.clk){var $input=$(form.clk),input=$input[0];n=input.name;if(n&&!input.disabled&&input.type=='image'){a.push({name:n,value:$input.val()});a.push({name:n+'.x',value:form.clk_x},{name:n+'.y',value:form.clk_y});}}
return a;};$.fn.formSerialize=function(semantic){return $.param(this.formToArray(semantic));};$.fn.fieldSerialize=function(successful){var a=[];this.each(function(){var n=this.name;if(!n){return;}
var v=$.fieldValue(this,successful);if(v&&v.constructor==Array){for(var i=0,max=v.length;i<max;i++){a.push({name:n,value:v[i]});}}
else if(v!==null&&typeof v!='undefined'){a.push({name:this.name,value:v});}});return $.param(a);};$.fn.fieldValue=function(successful){for(var val=[],i=0,max=this.length;i<max;i++){var el=this[i];var v=$.fieldValue(el,successful);if(v===null||typeof v=='undefined'||(v.constructor==Array&&!v.length)){continue;}
if(v.constructor==Array){$.merge(val,v);}
else{val.push(v);}}
return val;};$.fieldValue=function(el,successful){var n=el.name,t=el.type,tag=el.tagName.toLowerCase();if(successful===undefined){successful=true;}
if(successful&&(!n||el.disabled||t=='reset'||t=='button'||(t=='checkbox'||t=='radio')&&!el.checked||(t=='submit'||t=='image')&&el.form&&el.form.clk!=el||tag=='select'&&el.selectedIndex==-1)){return null;}
if(tag=='select'){var index=el.selectedIndex;if(index<0){return null;}
var a=[],ops=el.options;var one=(t=='select-one');var max=(one?index+1:ops.length);for(var i=(one?index:0);i<max;i++){var op=ops[i];if(op.selected){var v=op.value;if(!v){v=(op.attributes&&op.attributes.value&&!(op.attributes.value.specified))?op.text:op.value;}
if(one){return v;}
a.push(v);}}
return a;}
return $(el).val();};$.fn.clearForm=function(includeHidden){return this.each(function(){$('input,select,textarea',this).clearFields(includeHidden);});};$.fn.clearFields=$.fn.clearInputs=function(includeHidden){var re=/^(?:color|date|datetime|email|month|number|password|range|search|tel|text|time|url|week)$/i;return this.each(function(){var t=this.type,tag=this.tagName.toLowerCase();if(re.test(t)||tag=='textarea'){this.value='';}
else if(t=='checkbox'||t=='radio'){this.checked=false;}
else if(tag=='select'){this.selectedIndex=-1;}
else if(t=="file"){if(/MSIE/.test(navigator.userAgent)){$(this).replaceWith($(this).clone(true));}else{$(this).val('');}}
else if(includeHidden){if((includeHidden===true&&/hidden/.test(t))||(typeof includeHidden=='string'&&$(this).is(includeHidden))){this.value='';}}});};$.fn.resetForm=function(){return this.each(function(){if(typeof this.reset=='function'||(typeof this.reset=='object'&&!this.reset.nodeType)){this.reset();}});};$.fn.enable=function(b){if(b===undefined){b=true;}
return this.each(function(){this.disabled=!b;});};$.fn.selected=function(select){if(select===undefined){select=true;}
return this.each(function(){var t=this.type;if(t=='checkbox'||t=='radio'){this.checked=select;}
else if(this.tagName.toLowerCase()=='option'){var $sel=$(this).parent('select');if(select&&$sel[0]&&$sel[0].type=='select-one'){$sel.find('option').selected(false);}
this.selected=select;}});};$.fn.ajaxSubmit.debug=false;function log(){if(!$.fn.ajaxSubmit.debug){return;}
var msg='[jquery.form] '+Array.prototype.join.call(arguments,'');if(window.console&&window.console.log){window.console.log(msg);}
else if(window.opera&&window.opera.postError){window.opera.postError(msg);}}}));;/*!
 * jQuery blockUI plugin
 * Version 2.70.0-2014.11.23
 * Requires jQuery v1.7 or later
 *
 * Examples at: http://malsup.com/jquery/block/
 * Copyright (c) 2007-2013 M. Alsup
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 * Thanks to Amir-Hossein Sobhi for some excellent contributions!
 */;(function(){"use strict";function setup($){$.fn._fadeIn=$.fn.fadeIn;var noOp=$.noop||function(){};var msie=/MSIE/.test(navigator.userAgent);var ie6=/MSIE 6.0/.test(navigator.userAgent)&&!/MSIE 8.0/.test(navigator.userAgent);var mode=document.documentMode||0;var setExpr=$.isFunction(document.createElement('div').style.setExpression);$.blockUI=function(opts){install(window,opts);};$.unblockUI=function(opts){remove(window,opts);};$.growlUI=function(title,message,timeout,onClose){var $m=$('<div class="growlUI"></div>');if(title)$m.append('<h1>'+title+'</h1>');if(message)$m.append('<h2>'+message+'</h2>');if(timeout===undefined)timeout=3000;var callBlock=function(opts){opts=opts||{};$.blockUI({message:$m,fadeIn:typeof opts.fadeIn!=='undefined'?opts.fadeIn:700,fadeOut:typeof opts.fadeOut!=='undefined'?opts.fadeOut:1000,timeout:typeof opts.timeout!=='undefined'?opts.timeout:timeout,centerY:false,showOverlay:false,onUnblock:onClose,css:$.blockUI.defaults.growlCSS});};callBlock();var nonmousedOpacity=$m.css('opacity');$m.mouseover(function(){callBlock({fadeIn:0,timeout:30000});var displayBlock=$('.blockMsg');displayBlock.stop();displayBlock.fadeTo(300,1);}).mouseout(function(){$('.blockMsg').fadeOut(1000);});};$.fn.block=function(opts){if(this[0]===window){$.blockUI(opts);return this;}
var fullOpts=$.extend({},$.blockUI.defaults,opts||{});this.each(function(){var $el=$(this);if(fullOpts.ignoreIfBlocked&&$el.data('blockUI.isBlocked'))
return;$el.unblock({fadeOut:0});});return this.each(function(){if($.css(this,'position')=='static'){this.style.position='relative';$(this).data('blockUI.static',true);}
this.style.zoom=1;install(this,opts);});};$.fn.unblock=function(opts){if(this[0]===window){$.unblockUI(opts);return this;}
return this.each(function(){remove(this,opts);});};$.blockUI.version=2.70;$.blockUI.defaults={message:'<h1>Please wait...</h1>',title:null,draggable:true,theme:false,css:{padding:0,margin:0,width:'30%',top:'40%',left:'35%',textAlign:'center',color:'#000',border:'3px solid #aaa',backgroundColor:'#fff',cursor:'wait'},themedCSS:{width:'30%',top:'40%',left:'35%'},overlayCSS:{backgroundColor:'#000',opacity:0.6,cursor:'wait'},cursorReset:'default',growlCSS:{width:'350px',top:'10px',left:'',right:'10px',border:'none',padding:'5px',opacity:0.6,cursor:'default',color:'#fff',backgroundColor:'#000','-webkit-border-radius':'10px','-moz-border-radius':'10px','border-radius':'10px'},iframeSrc:/^https/i.test(window.location.href||'')?'javascript:false':'about:blank',forceIframe:false,baseZ:1000,centerX:true,centerY:true,allowBodyStretch:true,bindEvents:true,constrainTabKey:true,fadeIn:200,fadeOut:400,timeout:0,showOverlay:true,focusInput:true,focusableElements:':input:enabled:visible',onBlock:null,onUnblock:null,onOverlayClick:null,quirksmodeOffsetHack:4,blockMsgClass:'blockMsg',ignoreIfBlocked:false};var pageBlock=null;var pageBlockEls=[];function install(el,opts){var css,themedCSS;var full=(el==window);var msg=(opts&&opts.message!==undefined?opts.message:undefined);opts=$.extend({},$.blockUI.defaults,opts||{});if(opts.ignoreIfBlocked&&$(el).data('blockUI.isBlocked'))
return;opts.overlayCSS=$.extend({},$.blockUI.defaults.overlayCSS,opts.overlayCSS||{});css=$.extend({},$.blockUI.defaults.css,opts.css||{});if(opts.onOverlayClick)
opts.overlayCSS.cursor='pointer';themedCSS=$.extend({},$.blockUI.defaults.themedCSS,opts.themedCSS||{});msg=msg===undefined?opts.message:msg;if(full&&pageBlock)
remove(window,{fadeOut:0});if(msg&&typeof msg!='string'&&(msg.parentNode||msg.jquery)){var node=msg.jquery?msg[0]:msg;var data={};$(el).data('blockUI.history',data);data.el=node;data.parent=node.parentNode;data.display=node.style.display;data.position=node.style.position;if(data.parent)
data.parent.removeChild(node);}
$(el).data('blockUI.onUnblock',opts.onUnblock);var z=opts.baseZ;var lyr1,lyr2,lyr3,s;if(msie||opts.forceIframe)
lyr1=$('<iframe class="blockUI" style="z-index:'+(z++)+';display:none;border:none;margin:0;padding:0;position:absolute;width:100%;height:100%;top:0;left:0" src="'+opts.iframeSrc+'"></iframe>');else
lyr1=$('<div class="blockUI" style="display:none"></div>');if(opts.theme)
lyr2=$('<div class="blockUI blockOverlay ui-widget-overlay" style="z-index:'+(z++)+';display:none"></div>');else
lyr2=$('<div class="blockUI blockOverlay" style="z-index:'+(z++)+';display:none;border:none;margin:0;padding:0;width:100%;height:100%;top:0;left:0"></div>');if(opts.theme&&full){s='<div class="blockUI '+opts.blockMsgClass+' blockPage ui-dialog ui-widget ui-corner-all" style="z-index:'+(z+10)+';display:none;position:fixed">';if(opts.title){s+='<div class="ui-widget-header ui-dialog-titlebar ui-corner-all blockTitle">'+(opts.title||'&nbsp;')+'</div>';}
s+='<div class="ui-widget-content ui-dialog-content"></div>';s+='</div>';}
else if(opts.theme){s='<div class="blockUI '+opts.blockMsgClass+' blockElement ui-dialog ui-widget ui-corner-all" style="z-index:'+(z+10)+';display:none;position:absolute">';if(opts.title){s+='<div class="ui-widget-header ui-dialog-titlebar ui-corner-all blockTitle">'+(opts.title||'&nbsp;')+'</div>';}
s+='<div class="ui-widget-content ui-dialog-content"></div>';s+='</div>';}
else if(full){s='<div class="blockUI '+opts.blockMsgClass+' blockPage" style="z-index:'+(z+10)+';display:none;position:fixed"></div>';}
else{s='<div class="blockUI '+opts.blockMsgClass+' blockElement" style="z-index:'+(z+10)+';display:none;position:absolute"></div>';}
lyr3=$(s);if(msg){if(opts.theme){lyr3.css(themedCSS);lyr3.addClass('ui-widget-content');}
else
lyr3.css(css);}
if(!opts.theme)
lyr2.css(opts.overlayCSS);lyr2.css('position',full?'fixed':'absolute');if(msie||opts.forceIframe)
lyr1.css('opacity',0.0);var layers=[lyr1,lyr2,lyr3],$par=full?$('body'):$(el);$.each(layers,function(){this.appendTo($par);});if(opts.theme&&opts.draggable&&$.fn.draggable){lyr3.draggable({handle:'.ui-dialog-titlebar',cancel:'li'});}
var expr=setExpr&&(!$.support.boxModel||$('object,embed',full?null:el).length>0);if(ie6||expr){if(full&&opts.allowBodyStretch&&$.support.boxModel)
$('html,body').css('height','100%');if((ie6||!$.support.boxModel)&&!full){var t=sz(el,'borderTopWidth'),l=sz(el,'borderLeftWidth');var fixT=t?'(0 - '+t+')':0;var fixL=l?'(0 - '+l+')':0;}
$.each(layers,function(i,o){var s=o[0].style;s.position='absolute';if(i<2){if(full)
s.setExpression('height','Math.max(document.body.scrollHeight, document.body.offsetHeight) - (jQuery.support.boxModel?0:'+opts.quirksmodeOffsetHack+') + "px"');else
s.setExpression('height','this.parentNode.offsetHeight + "px"');if(full)
s.setExpression('width','jQuery.support.boxModel && document.documentElement.clientWidth || document.body.clientWidth + "px"');else
s.setExpression('width','this.parentNode.offsetWidth + "px"');if(fixL)s.setExpression('left',fixL);if(fixT)s.setExpression('top',fixT);}
else if(opts.centerY){if(full)s.setExpression('top','(document.documentElement.clientHeight || document.body.clientHeight) / 2 - (this.offsetHeight / 2) + (blah = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + "px"');s.marginTop=0;}
else if(!opts.centerY&&full){var top=(opts.css&&opts.css.top)?parseInt(opts.css.top,10):0;var expression='((document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + '+top+') + "px"';s.setExpression('top',expression);}});}
if(msg){if(opts.theme)
lyr3.find('.ui-widget-content').append(msg);else
lyr3.append(msg);if(msg.jquery||msg.nodeType)
$(msg).show();}
if((msie||opts.forceIframe)&&opts.showOverlay)
lyr1.show();if(opts.fadeIn){var cb=opts.onBlock?opts.onBlock:noOp;var cb1=(opts.showOverlay&&!msg)?cb:noOp;var cb2=msg?cb:noOp;if(opts.showOverlay)
lyr2._fadeIn(opts.fadeIn,cb1);if(msg)
lyr3._fadeIn(opts.fadeIn,cb2);}
else{if(opts.showOverlay)
lyr2.show();if(msg)
lyr3.show();if(opts.onBlock)
opts.onBlock.bind(lyr3)();}
bind(1,el,opts);if(full){pageBlock=lyr3[0];pageBlockEls=$(opts.focusableElements,pageBlock);if(opts.focusInput)
setTimeout(focus,20);}
else
center(lyr3[0],opts.centerX,opts.centerY);if(opts.timeout){var to=setTimeout(function(){if(full)
$.unblockUI(opts);else
$(el).unblock(opts);},opts.timeout);$(el).data('blockUI.timeout',to);}}
function remove(el,opts){var count;var full=(el==window);var $el=$(el);var data=$el.data('blockUI.history');var to=$el.data('blockUI.timeout');if(to){clearTimeout(to);$el.removeData('blockUI.timeout');}
opts=$.extend({},$.blockUI.defaults,opts||{});bind(0,el,opts);if(opts.onUnblock===null){opts.onUnblock=$el.data('blockUI.onUnblock');$el.removeData('blockUI.onUnblock');}
var els;if(full)
els=$('body').children().filter('.blockUI').add('body > .blockUI');else
els=$el.find('>.blockUI');if(opts.cursorReset){if(els.length>1)
els[1].style.cursor=opts.cursorReset;if(els.length>2)
els[2].style.cursor=opts.cursorReset;}
if(full)
pageBlock=pageBlockEls=null;if(opts.fadeOut){count=els.length;els.stop().fadeOut(opts.fadeOut,function(){if(--count===0)
reset(els,data,opts,el);});}
else
reset(els,data,opts,el);}
function reset(els,data,opts,el){var $el=$(el);if($el.data('blockUI.isBlocked'))
return;els.each(function(i,o){if(this.parentNode)
this.parentNode.removeChild(this);});if(data&&data.el){data.el.style.display=data.display;data.el.style.position=data.position;data.el.style.cursor='default';if(data.parent)
data.parent.appendChild(data.el);$el.removeData('blockUI.history');}
if($el.data('blockUI.static')){$el.css('position','static');}
if(typeof opts.onUnblock=='function')
opts.onUnblock(el,opts);var body=$(document.body),w=body.width(),cssW=body[0].style.width;body.width(w-1).width(w);body[0].style.width=cssW;}
function bind(b,el,opts){var full=el==window,$el=$(el);if(!b&&(full&&!pageBlock||!full&&!$el.data('blockUI.isBlocked')))
return;$el.data('blockUI.isBlocked',b);if(!full||!opts.bindEvents||(b&&!opts.showOverlay))
return;var events='mousedown mouseup keydown keypress keyup touchstart touchend touchmove';if(b)
$(document).bind(events,opts,handler);else
$(document).unbind(events,handler);}
function handler(e){if(e.type==='keydown'&&e.keyCode&&e.keyCode==9){if(pageBlock&&e.data.constrainTabKey){var els=pageBlockEls;var fwd=!e.shiftKey&&e.target===els[els.length-1];var back=e.shiftKey&&e.target===els[0];if(fwd||back){setTimeout(function(){focus(back);},10);return false;}}}
var opts=e.data;var target=$(e.target);if(target.hasClass('blockOverlay')&&opts.onOverlayClick)
opts.onOverlayClick(e);if(target.parents('div.'+opts.blockMsgClass).length>0)
return true;return target.parents().children().filter('div.blockUI').length===0;}
function focus(back){if(!pageBlockEls)
return;var e=pageBlockEls[back===true?pageBlockEls.length-1:0];if(e)
e.focus();}
function center(el,x,y){var p=el.parentNode,s=el.style;var l=((p.offsetWidth-el.offsetWidth)/2)-sz(p,'borderLeftWidth');var t=((p.offsetHeight-el.offsetHeight)/2)-sz(p,'borderTopWidth');if(x)s.left=l>0?(l+'px'):'0';if(y)s.top=t>0?(t+'px'):'0';}
function sz(el,p){return parseInt($.css(el,p),10)||0;}}
if(typeof define==='function'&&define.amd&&define.amd.jQuery){define(['jquery'],setup);}else{setup(jQuery);}})();;$('.menu').click(function(e){$('.filter_drop_down').slideUp(400);$('.sign_in_drop').slideUp(400);$('.login_pop_up').hide();if($('.vertical_menu').css('display')=='block'){$('.overlay_div').hide();$('.vertical_menu').animate({left:'-400px'},600,function(){$('.vertical_menu').hide();});}
else{$('.overlay_div').show();$('.vertical_menu').show().animate({left:'0px'},600);}});$('body .overlay_div').click(function(e){reset_menu();})
$('.filter_icon').click(function(e){e.stopPropagation();if($('.filter_drop_down').is(':visible')==true){$('.overlay_div').hide()
$('.filter_drop_down').slideUp(400);}
else{reset_menu();$('.overlay_div').show()
$('.filter_drop_down').slideDown(400);}});$('.filter_drop_down').click(function(e){e.stopPropagation();})
$('.sign_in_icon').click(function(e){e.stopPropagation();if($('.sign_in_drop').is(':visible')==true){$('.overlay_div').hide()
$('.sign_in_drop').slideUp(400);}
else{reset_menu();$('.overlay_div').show()
$('.sign_in_drop').slideDown(400);}})
function reset_menu(){$('.overlay_div').hide();$('.vertical_menu').hide();$('.filter_drop_down').slideUp(400);$('.sign_in_drop').slideUp(400);$('.login_pop_up').hide()
$('.share_pop_up').hide()
$('.login_pop_up').hide()
$('.create_similarjob_alert').hide()}
$('#job_list .close_icon').click(function(e){e.preventDefault();e.stopPropagation();$(this).parent().fadeOut('slow');})
$('.job_seeker').click(function(e){e.preventDefault();e.stopPropagation();reset_menu();$('.overlay_div').show();$('.login_pop_up').show('fast');})
$('.login_reg_pop').click(function(e){e.preventDefault();e.stopPropagation();reset_menu();$('#ApplicantForm').trigger("reset");$("#sign_in_li").click()
$('p.hint').remove()
$('.overlay_div').show();$('.login_pop_up').show('fast');})
$(".reg_pop_up").click(function(){reset_menu();$('#ApplicantForm').trigger("reset");$("#sign_up_li").click()
$('p.hint').remove()
$('.overlay_div').show();$('.login_pop_up').show('fast');})
$('.share_jobspost').click(function(e){e.preventDefault();e.stopPropagation();reset_menu();$('.overlay_div').show();$('.share_pop_up').show('fast');})
$('.close_pop_up').click(function(e){reset_menu();})
$('.filter_drop_down .input_filter').focus(function(e){$('.filter_drop_down').css('position','relative')});$("#sign_up_li").click(function(){$("#login_div").hide()
$("#register_div").show()
$('#user_register_type').val('register')
$('p.hint').remove();})
$("#sign_in_li").click(function(){$("#register_div").hide()
$("#login_div").show()
$(this).hide()
$("#sign_up_li").show()
$('#user_register_type').val('login')
$('p.hint').remove();$('#modal-header').text("Already a Member? Login")
$('#button_value').text('LOGIN')
$("#forgot_pass").show()
$('#userlogin_password').show()})
$("#sign_in_but").click(function(){$("#sign_in_li").hide()
$("#register_div").hide()
$("#login_div").show()
$('#user_register_type').val('login')
$('p.hint').remove();$('#modal-header').text("Already a Member? Login")
$('#button_value').text('LOGIN')
$("#forgot_pass").show()
$('#userlogin_password').show()})
$("#forgot_pass").click(function(){$(this).hide()
$('#sign_in_li').show()
$('#sign_up_li').show()
$('#modal-header').text("Reset Your Password")
$('#button_value').text('SUBMIT')
$('p.hint').remove();$('#user_register_type').val('forgot_password')
$('#userlogin_password').hide()})
$('form#ApplicantForm').submit(function(e){e.preventDefault();register_type=$('#user_register_type').val()
if(register_type=='login'){url='/applicant/login/'}else if(register_type=='forgot_password'){url='/user/forgot_password/'}
else{url='/registration/using_email/'}
$.ajax({type:'POST',dataType:'json',headers: {'X-CSRFToken': '{{ csrf_token }}'},data:$('#ApplicantForm').serialize(),url:url,success:function(data){if(data.error==false){if(data.redirect_url){window.location=data.redirect_url;}
else{open_dialog("Password Has been sent to your email address",'Success!')
reset_menu();}}
else if(data.response){$('p.hint').remove();for(var key in data.response){$('#userlogin_'+key).after('<p class="hint">'+data.response[key]+'</p>');}}
else{$('p.hint').remove();$('#userlogin_response_message').html('<p class="hint">'+data.response_message+'</p>');}}});});$('form#ApplicantFormRegister').submit(function(e){e.preventDefault();$('.login_form_button').prop('disabled',true);var formData=new FormData($(this)[0]);$.ajax({type:'POST',dataType:'json',data:formData,enctype:'multipart/form-data',processData:false,contentType:false,url:'/registration/using_email/',success:function(data){$('.login_form_button').prop('disabled',false);if(data.error==false){$('p.hint').remove();if(data.redirect_url){window.location=data.redirect_url;}
else{window.location='.'}}
else if(data.response){$('p.hint').remove();for(var key in data.response){if(key=='technical_skills'){$('.reg_skill_err').html('<p class="hint">'+data.response[key]+'</p>');}
else if(key=='current_city'){$('.city_err').html('<p class="hint">'+data.response[key]+'</p>');}
else{$('#user_register_'+key).after('<p class="hint">'+data.response[key]+'</p>');}}}
else{$('p.hint').remove();$('#user_register_response_message').html('<p class="hint">'+data.response_message+'</p>');}}});});function open_dialog(text,title){$('#block_question').text(text);$('.ui-dialog-titlebar-close').empty()
$('#block_question').dialog({modal:true,dialogClass:"no-close",draggable:false,title:title,buttons:[{text:"OK",click:function(){$(this).dialog("close");window.scrollTo(0,0);}}]});$('.ui-dialog-titlebar-close').html('<span>X</span>')}
function open_dialog_with_url(text,title,url){$('#block_question').text(text);$('.ui-dialog-titlebar-close').empty()
$('#block_question').dialog({modal:true,dialogClass:"no-close",draggable:false,title:title,buttons:[{text:"OK",click:function(){window.location=url;}}]});$('.ui-dialog-titlebar-close').html('<span>X</span>')}
$('#upload_resume_id').click(function(e){e.preventDefault()
$('#user_register_resume').click();});$('#user_register_resume').change(function(){$('#upload_resume_id').hide()
$('#user_register_resume').show()});$('.add_another').click(function(e){$(this).closest('form').submit();$(this).addClass('save_other')});$(document).ready(function($){var offset=300,offset_opacity=1200,scroll_top_duration=700,$back_to_top=$('.cd-top');$(window).scroll(function(){($(this).scrollTop()>offset)?$back_to_top.addClass('cd-is-visible'):$back_to_top.removeClass('cd-is-visible cd-fade-out');if($(this).scrollTop()>offset_opacity){$back_to_top.addClass('cd-fade-out');}});$back_to_top.on('click',function(event){event.preventDefault();$('body,html').animate({scrollTop:0,},scroll_top_duration);});});skills=$('#filter_skill').val()
locations=$('#filter_location').val()
if(skills){skills=skills.trim().split(',')}
if(locations){locations=locations.trim().split(',')}
for(each in skills){if(skills[each]!=''){$('.jobs_list').highlight(skills[each].trim())
$('.right_container').highlight(skills[each].trim())}}
for(each in locations){if(locations[each]!=''){if(locations[each]!=''){$('.jobs_list, .right_container').highlight(locations[each].trim())
$('.right_container').highlight(locations[each].trim())}}}
$(".send_mail").click(function(e){e.preventDefault()
verified=$(this).hasClass('active')
completed=$(this).hasClass('completed')
logged=$(this).hasClass('logged')
if(verified&&completed&&logged){window.location=$(this).attr('href')}
else{if(!logged){$('.job_seeker').click();}
else if(!verified){open_dialog('You need to verify your Email to apply For this Job','Info!')}
else if(!completed){open_dialog_with_url('Please complete your profile to apply for this job','Info!','/profile/')}}})
function validateForm(){var qs=document.forms["search-form"]["q"].value;var ql=document.forms["search-form"]["location"].value;var job_type=$("#job_type").val()
if(!job_type){var job_type=$("input[name=job_type]:checked").val()}
if(qs==null||qs==""&&ql==''){open_dialog('Please select atleast one Skill or Location','info!')
return false;}else{$.ajax({url:'/get/search-slugs/',async:false,data:{'q_slug':qs,'location':ql},success:function(data){slug=data.skill_slug
location_slug=data.location_slug}})
if(qs.length>0&&ql.length>0){if(job_type=='Fresher'){url='/'+slug+'-fresher-jobs-in-'+location_slug+'/'}else if(job_type=='walk-in'){url='/'+slug+'-walkins-in-'+location_slug+'/'}else{url='/'+slug+'-jobs-in-'+location_slug+'/'}}
if(qs.length>0&&ql.length==0){if(job_type=='Fresher'){url='/'+slug+'-fresher-jobs/'}else if(job_type=='walk-in'){url='/'+slug+'-walkins/'}else{url='/'+slug+'-jobs/'}}
if(ql.length>0&&qs.length==0){if(job_type=='Fresher'){url='/fresher-jobs-in-'+location_slug+'/'}else if(job_type=='walk-in'){url='/walkins-in-'+location_slug+'/'}else{url='/jobs-in-'+location_slug+'/'}}
if(job_type&&job_type!='Fresher'&&job_type!='walk-in'){url+='?job_type='+job_type}
document.forms["search-form"].action=url;return true;}}
$("#other_loc").click(function(e){$(this).parent().find('.hint').remove()
if($(this).is(":checked")){$('.current').hide()
$("#user_register_other_location").show()}
else{$('.current').show()
$("#user_register_other_location").hide()}})
$('.job_apply_login').click(function(e){e.preventDefault();$('p.hint').remove();$('.job_seeker').click();$.post('/jobs/applied_for/',{'job_id':$(this).attr('id')},function(data){},'json')})
$("a.applicant_apply").click(function(e){e.preventDefault();href=$(this).attr('data-href')
$.post('/jobs/apply/'+$(this).attr('id')+'/',{},function(data){if(data.error){if(data.url){open_dialog_with_url(data.response,'Error!',data.url)}
else{open_dialog(data.response,'Error!')}}else{open_dialog_with_url(data.response,'Info!',data.url)}},'json');});var Autocomplete=function(options){this.form_selector=options.form_selector
this.url='/search/skill-auto/'||options.url
this.delay=parseInt(options.delay||300)
this.minimum_length=parseInt(options.minimum_length||1)
this.form_elem=null
this.query_box=null}
Autocomplete.prototype.setup=function(){var self=this
this.form_elem=$(this.form_selector)
this.query_box=this.form_elem.find('input[name=q]')
this.query_box.on('keyup',function(){var query=self.query_box.val().split(', ').slice(-
1)[0]
if(self.query_box&&query.trim().length<self.minimum_length){$('.ac-skillresults').remove()
return false}
self.fetch(query)})
this.form_elem.on('click','.ac-result',function(ev){old_str=document.getElementsByName("q")[0].value;if(old_str.lastIndexOf(', ')>0){document.getElementsByName("q")[0].value=old_str.substr(0,old_str.lastIndexOf(', ')+2)+
$(this).text()+', ';}else{document.getElementsByName("q")[0].value=$(this).text()+', ';}
$('.ac-skillresults').remove()
return false})}
Autocomplete.prototype.fetch=function(query){var self=this
$.ajax({url:this.url,data:{'q':query},success:function(data){self.show_results(data)}})}
Autocomplete.prototype.show_results=function(data){$('.ac-skillresults').remove()
var results=data.results||[]
var results_wrapper=$('<div class="ac-skillresults"></div>')
var base_elem=$('<div class="result-wrapper"><a href="" class="ac-result"></a><br><p class="auther"></p></div>')
if(results.length>0){for(var res_offset in results){elem=$('<div class="result-wrapper"><a data-href="'+
results[res_offset]['slug']+'" class="ac-result"><span>'+
results[res_offset]
['name']+'</span></a></div>');results_wrapper.append(elem);}}else{return false}
this.query_box.after(results_wrapper)}
$(document).ready(function(){window.autocomplete=new Autocomplete({form_selector:'.autocomplete-me'})
window.autocomplete.setup()});var AutocompleteCity=function(options){this.form_selector=options.form_selector
this.url='/search/city-auto/'||options.url
this.delay=parseInt(options.delay||300)
this.minimum_length=parseInt(options.minimum_length||1)
this.form_elem=null
this.query_box=null}
AutocompleteCity.prototype.setup=function(){var self=this
this.form_elem=$(this.form_selector)
this.query_box=this.form_elem.find('input[name=location]')
this.query_box.on('keyup',function(){var query=self.query_box.val().split(', ').slice(-
1)[0]
if(self.query_box&&query.trim().length<self.minimum_length){$('.ac-cityresults').remove()
return false}
self.fetch(query)})
this.form_elem.on('click','.ac-cityresult',function(ev){old_str=document.getElementsByName("location")[0].value;if(old_str.lastIndexOf(', ')>0){document.getElementsByName("location")[0].value=old_str.substr(0,old_str.lastIndexOf(', ')+2)+
$(this).text()+', ';}else{document.getElementsByName("location")[0].value=$(this).text()+', ';}
$('.ac-cityresults').remove()
return false})}
AutocompleteCity.prototype.fetch=function(query){var self=this
$.ajax({url:this.url,data:{'location':query},success:function(data){self.show_results(data)}})}
AutocompleteCity.prototype.show_results=function(data){$('.ac-cityresults').remove()
var results=data.results||[]
var results_wrapper=$('<div class="ac-cityresults"></div>')
var base_elem=$('<div class="result-wrapper"><a href="" class="ac-result"></a><br><p class="auther"></p></div>')
if(results.length>0){for(var res_offset in results){elem=$('<div class="result-wrapper"><a href="" class="ac-cityresult"><span>'+
results[res_offset]['name']+'</span></a></div>');results_wrapper.append(elem);}}else{$('.ac-cityresults').remove()
return false}
this.query_box.after(results_wrapper)}
var AutocompleteIndustry=function(options){this.form_selector=options.form_selector
this.url='/search/industry-auto/'||options.url
this.delay=parseInt(options.delay||300)
this.minimum_length=parseInt(options.minimum_length||1)
this.form_elem=null
this.query_box=null}
AutocompleteIndustry.prototype.setup=function(){var self=this
this.form_elem=$(this.form_selector)
this.query_box=this.form_elem.find('input[name=industry]')
this.query_box.on('keyup',function(){var query=self.query_box.val()
if(query.length<self.minimum_length){$('.ac-industryresults').remove()
return false}
self.fetch(query)})
this.form_elem.on('click','.ac-industryresult',function(ev){old_str=document.getElementsByName("industry")[0].value;if(old_str.lastIndexOf(', ')>0){document.getElementsByName("industry")[0].value=old_str.substr(0,old_str.lastIndexOf(', ')+2)+
$(this).text()+', ';}else{document.getElementsByName("industry")[0].value=$(this).text()+', ';}
$('.ac-industryresults').remove()
return false})}
AutocompleteIndustry.prototype.fetch=function(query){var self=this
$.ajax({url:this.url,data:{'industry':query},success:function(data){self.show_results(data)}})}
AutocompleteIndustry.prototype.show_results=function(data){$('.ac-industryresults').remove()
var results=data.results||[]
var results_wrapper=$('<div class="ac-industryresults"></div>')
var base_elem=$('<div class="result-wrapper"><a href="" class="ac-result"></a><br><p class="auther"></p></div>')
if(results.length>0){for(var res_offset in results){elem=$('<div class="result-wrapper"><a href="" class="ac-industryresult"><span>'+
results[res_offset]['name']+'</span></a></div>');results_wrapper.append(elem);}}else{return false}
this.query_box.after(results_wrapper)}
var AutocompleteFunctionalArea=function(options){this.form_selector=options.form_selector
this.url='/search/functional-area-auto/'||options.url
this.delay=parseInt(options.delay||300)
this.minimum_length=parseInt(options.minimum_length||3)
this.form_elem=null
this.query_box=null}
AutocompleteFunctionalArea.prototype.setup=function(){var self=this
this.form_elem=$(this.form_selector)
this.query_box=this.form_elem.find('input[name=functional_area]')
this.query_box.on('keyup',function(){var query=self.query_box.val()
if(query.length<self.minimum_length){$('.ac-functionalarearesults').remove()
return false}
self.fetch(query)})
this.form_elem.on('click','.ac-functionalarearesult',function(ev){old_str=document.getElementsByName("functional_area")[0].value;if(old_str.lastIndexOf(', ')>0){document.getElementsByName("functional_area")[0].value=old_str.substr(0,old_str.lastIndexOf(', ')+2)+
$(this).text()+', ';}else{document.getElementsByName("functional_area")[0].value=$(this).text()+', ';}
$('.ac-functionalarearesults').remove()
return false})}
AutocompleteFunctionalArea.prototype.fetch=function(query){var self=this
$.ajax({url:this.url,data:{'functional_area':query},success:function(data){self.show_results(data)}})}
AutocompleteFunctionalArea.prototype.show_results=function(data){$('.ac-functionalarearesults').remove()
var results=data.results||[]
var results_wrapper=$('<div class="ac-functionalarearesults"></div>')
var base_elem=$('<div class="result-wrapper"><a href="" class="ac-result"></a><br><p class="auther"></p></div>')
if(results.length>0){for(var res_offset in results){elem=$('<div class="result-wrapper"><a href="" class="ac-functionalarearesult"><span>'+
results[res_offset]['name']+'</span></a></div>');results_wrapper.append(elem);}}else{return false}
this.query_box.after(results_wrapper)}
$(document).ready(function(){window.autocompleteCity=new AutocompleteCity({form_selector:'.autocomplete-me'})
window.autocompleteCity.setup()
window.AutocompleteIndustry=new AutocompleteIndustry({form_selector:'.autocomplete-me'})
window.AutocompleteIndustry.setup()
window.AutocompleteFunctionalArea=new AutocompleteFunctionalArea({form_selector:'.autocomplete-me'})
window.AutocompleteFunctionalArea.setup()});$('#similar_job_alert').click(function(){reset_menu();$('p.hint').remove();$('.overlay_div').show();$('#CreateSimilarAlert')[0].reset()
$("#create_similarjob_alert").show()})
$('form#CreateSimilarAlert').ajaxForm({type:'POST',dataType:'json',data:$('#CreateSimilarAlert').serialize(),url:'/alert/create/',success:function(data){if(data.error==false){$('p.hint').remove();reset_menu();$("#create_similarjob_alert").hide()
open_dialog('Success, We will reach you with Jobs of this type','Success!')}
else{$('p.hint').remove();for(var key in data.message){$('#alert_'+key).after('<p class="hint">'+data.message[key]+'</p>');}}}});
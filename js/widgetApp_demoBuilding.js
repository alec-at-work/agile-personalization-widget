
/* Cookie Methods */
// function checkCookie(n){for(var t=n+"=",e=document.cookie.split(";"),r=0;r<e.length;r++){for(var i=e[r];" "===i.charAt(0);)i=i.substring(1,i.length);if(0===i.indexOf(t))return i.substring(t.length,i.length)}return!1};
// function setCookie(e,o,n){void 0===n&&(n=null);var t=new Date;t.setTime(t.getTime()+24*n*60*60*1e3);var i=null===n?"":"expires="+t.toUTCString(),a=encodeURIComponent(o);document.cookie=e+"="+a+"; "+i+";domain="+utag.cfg.domain+";path=/"};

// Device Handling
var isMobile = false; //initiate as false
// device detection
if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) { 
    isMobile = true;
}
var handleDeviceClick = isMobile ? 'touchstart' : 'click';

// pop-over functionality
function enableFunctionality(config){
	$('.waf-pers-bubble-close-button').on(handleDeviceClick, function(e){
		$('#waf-pers-bubble-holder').fadeOut(function(){
			$('#waf-pers-bubble-holder').remove();
		//	setCookie('adsk_abm_click','y',null);
		});
	});

	$('[data-abm-link]').on(handleDeviceClick, function(e){
		let url = $(this).attr('data-abm-link');
		window.open(url,'_blank');
	});

	// the contact buttons
	$('.waf-pers-contact-block').on(handleDeviceClick, function(e){
		// setCookie('adsk_abm_click','y',null);
	});
	
	var bubHeight = $('#waf-pers-bubble-holder').height(),
		bubInnerHeight = $('.waf-pers-bubble').height();
	console.info('total height = ' + bubHeight + "  vs  inner height = " + bubInnerHeight);
	var offscreenY = jQuery(window).height() + 1;
	// console.log('the offscreenY = ' + offscreenY);


	// adjust other things
	$("#waf-pers-bubble-holder").css('top', offscreenY);
	$('#waf-pers-bubble-holder').css('height', bubHeight);

	$('#waf-pers-banner-holder').css('height', bubHeight);
	$("#waf-pers-bubble-holder").removeClass('abm-message-hidden');
	
	// now set it offscreen, then animate it coming onto the screen
	showMessage(config);

};

// adjust the sizing of the pieces
function fitToSize(config) {
	var config = config || {};
		config.style = config.style || {};
	var banners = $("#waf-pers-banner-text"),
		bannerH = "100%", // banners.outerHeight(true), // $(banners[0]).height()
		bannerW = ((config.style.width || banners.width()) + 20) + "px", // , 	// banners[0].width();
		size = "100% " + bannerH,
		sty = config.style;

	/*
	console.log('Banner Height = ' + bannerH);
	console.log('Banner Height alt = ' + banners.outerHeight(true));
	console.log('Banner Height alt 2 = ' + $(banners[0]).height());
	console.log('Banner Width = ' + bannerW);
	console.log('Banner Img Siz = ' + size);
	*/

	$("#waf-pers-bubble-holder").css("width", bannerW); // + "px");
	$("#waf-pers-bubble-banner").css("height", bannerH); // + "px");
	$('#waf-pers-banner-holder').css('height', bannerH); // + "px");
	$("#waf-pers-bubble-banner").css("width", "100%"); // + "px");
	if (config.banner.image) {
		$("#waf-pers-bubble-banner").css("background-image", 'url("' + config.banner.image + '")');
		$(".waf-pers-offer-block").addClass('waf-pers-blue-cta');
		$(".waf-pers-bubble").addClass('waf-pers-generic-bg');
	} else {
		// check for some other types
		var generic = 'waf-pers-generic-palette-';
		if (sty.palette) {
			if (sty.palette.indexOf(generic) > -1) {
				// add the "-banner" to the palette to set the banner
				var bannerClass = sty.palette + '-banner',
					color = sty.palette.split(generic)[1],
					ctaClass = 'waf-pers-' + color + '-cta';

				// console.log("doing the color class of: " + ctaClass);
				$("#waf-pers-bubble-banner").addClass(bannerClass);
				$(".waf-pers-offer-block").addClass(ctaClass);
			}
		}

	}
	$("#waf-pers-bubble-banner").css("background-size", size);
	$("#waf-pers-bubble-banner").css("opacity", "0.7");
	// and the height of th eother one
	// $("#waf-pers-bubble-banner-border").css("top", bannerH + "px");
	$('.waf-pers-bubble-banner-border').css('top', bannerH ); //+ "px");

	// adjust the main cta button width
		// min-width: 125px;
		// max-width: 300px;
	var ctas = $('.waf-pers-offer-block'),
		max = 125;
	$.each(ctas, function(ix, ctaEl){
		// console.log('old max --> ' + max);
		var ctaW = $(ctaEl).width();
		max = ctaW > max ? (ctaW <= 300 ? ctaW : 300) : max;
			// console.log('CTA ' + ix + ' --> ' + $(ctaEl).width());
			// console.log('new max --> ' + max);

		// adjust the height and some other stuff
		var childs = $(ctaEl).children(),
			childrenH = childs.outerHeight(true),
			arrowMargin = Math.ceil(childrenH / 2),
			newMarginTop = 0;
	/*	
		$.each(childs, function(cd, cObj){
		//	if ($(cObj).innerHeight() > childrenH)
		//			childrenH = $(cObj).innerHeight();
		//	if ($(cObj).innerHeight() > childrenH)
		//			childrenH = $(cObj).outerHeight(true);
			 console.log('child height: ' + $(cObj).height());
			 console.log('child inner: ' + $(cObj).innerHeight());
			 console.log('child Outer: ' + $(cObj).outerHeight(true));
		});

		console.log('left CTA!');
		console.log($('.abm-cta-left').height());
		console.log($('.abm-cta-left').innerHeight());
		console.log($('.abm-cta-left').outerHeight());
		*/

		// console.log('adjusting CTA height to = ' + childrenH);
		 // console.log('arrowMargin = ' + arrowMargin);
		 //console.log('adjustArrow = ' + adjustArrow);
		$(ctaEl).height(childrenH ); //+ "px" );
		// console.log($(ctaEl).height());
		// console.log($(ctaEl).innerHeight());
		// console.log($(ctaEl).outerHeight());
		$(ctaEl).find('.abm-cta-right').css('position','absolute').css('top', (arrowMargin * 2) + 'px').css('margin-top','-' + arrowMargin + 'px');
	});
 	// console.log("adjsting CTAs to width of: " + max + 'px');
	$('.waf-pers-offer-block').width(max); // + "px");
};

// animate the thing onto the screen
function showMessage(config){
	var config = config || {};
		config.style = config.style || {};

	// need to run fit to size twice
	fitToSize(config);
	setTimeout(function(){		
		fitToSize(config);

		var bounceSpeed = 300,
			bubEl = $('#waf-pers-bubble-holder'),
			innerBub = $(".waf-pers-bubble"),
			bubH = innerBub.height(),
			winH = jQuery(window).height(),
			newTopRise = winH - bubH - 60,
			newTopSettle = winH - bubH - 30;

		// readjust the height of the bubble holder...
		bubEl.css('height', bubH);

		bubEl.animate({ "top": newTopRise }, bounceSpeed, "linear", 
			function() { bubEl.animate({ "top": newTopSettle }, bounceSpeed);
		});
	},50);

};

// the dragability
function loadPep($) {
	
	// minified library
	!function(l,a,h){"use strict";var s="pep",e={initiate:function(){},start:function(){},drag:function(){},stop:function(){},easing:null,rest:function(){},moveTo:!1,callIfNotStarted:["stop","rest"],startThreshold:[0,0],grid:[1,1],debug:!1,activeClass:"pep-active",multiplier:1,velocityMultiplier:2.5,shouldPreventDefault:!0,allowDragEventPropagation:!0,stopEvents:"",hardwareAccelerate:!0,useCSSTranslation:!0,disableSelect:!0,cssEaseString:"cubic-bezier(0.190, 1.000, 0.220, 1.000)",cssEaseDuration:1e3,shouldEase:!0,droppable:!1,droppableActiveClass:"pep-dpa",overlapFunction:!1,constrainTo:!1,removeMargins:!0,place:!0,deferPlacement:!1,axis:null,forceNonCSS3Movement:!1,elementsWithInteraction:"input",revert:!1,revertAfter:"stop",revertIf:function(){return!0},ignoreRightClick:!0,startPos:{left:null,top:null}};function o(t,i){return this.name=s,this.el=t,this.$el=l(t),this.options=l.extend({},e,i),this.$document=l(this.$el[0].ownerDocument),this.$body=this.$document.find("body"),this.moveTrigger="MSPointerMove pointermove touchmove mousemove",this.startTrigger="MSPointerDown pointerdown touchstart mousedown",this.stopTrigger="MSPointerUp pointerup touchend mouseup",this.startTriggerArray=this.startTrigger.split(" "),this.moveTriggerArray=this.moveTrigger.split(" "),this.stopTriggerArray=this.stopTrigger.split(" "),this.stopEvents=[this.stopTrigger,this.options.stopEvents].join(" "),"window"===this.options.constrainTo?this.$container=this.$document:this.options.constrainTo&&"parent"!==this.options.constrainTo?this.$container=l(this.options.constrainTo):this.$container=this.$el.parent(),this.isPointerEventCompatible()&&this.applyMSDefaults(),this.CSSEaseHash=this.getCSSEaseHash(),this.scale=1,this.started=!1,this.disabled=!1,this.activeDropRegions=[],this.resetVelocityQueue(),this.init(),this}o.prototype.init=function(){this.options.debug&&this.buildDebugDiv(),this.options.disableSelect&&this.disableSelect(),this.options.place&&!this.options.deferPlacement&&(this.positionParent(),this.placeObject()),this.ev={},this.pos={},this.subscribe()},o.prototype.subscribe=function(){var i=this;this.onStartEvent=function(t){i.handleStart(t)},this.$el.on(this.startTrigger,this.onStartEvent),this.onStartEventOnElementsWithInteraction=function(t){t.stopPropagation()},this.$el.on(this.startTrigger,this.options.elementsWithInteraction,this.onStartEventOnElementsWithInteraction),this.onStopEvents=function(t){i.handleStop(t)},this.$document.on(this.stopEvents,this.onStopEvents),this.onMoveEvents=function(t){i.moveEvent=t},this.$document.on(this.moveTrigger,this.onMoveEvents)},o.prototype.unsubscribe=function(){this.$el.off(this.startTrigger,this.onStartEvent),this.$el.off(this.startTrigger,this.options.elementsWithInteraction,this.onStartEventOnElementsWithInteraction),this.$document.off(this.stopEvents,this.onStopEvents),this.$document.off(this.moveTrigger,this.onMoveEvents)},o.prototype.handleStart=function(t){var i=this;if(this.isValidMoveEvent(t)&&!this.disabled&&(!this.options.ignoreRightClick||3!==t.which)){if(this.isPointerEventCompatible()&&t.preventManipulation&&t.preventManipulation(),t=this.normalizeEvent(t),this.options.place&&this.options.deferPlacement&&(this.positionParent(),this.placeObject()),this.log({type:"event",event:t.type}),this.options.hardwareAccelerate&&!this.hardwareAccelerated&&(this.hardwareAccelerate(),this.hardwareAccelerated=!0),!1===this.options.initiate.call(this,t,this))return;clearTimeout(this.restTimeout),this.$el.addClass(this.options.activeClass),this.removeCSSEasing(),this.startX=this.ev.x=t.pep.x,this.startY=this.ev.y=t.pep.y,this.initialPosition=this.initialPosition||this.$el.position(),this.startEvent=this.moveEvent=t,this.active=!0,this.options.shouldPreventDefault&&t.preventDefault(),this.options.allowDragEventPropagation||t.stopPropagation(),function t(){i.active&&(i.handleMove(),i.requestAnimationFrame(t))}(),function t(){i.options.easing&&(i.easing&&i.options.easing.call(i,null,i),i.requestAnimationFrame(t))}()}},o.prototype.handleMove=function(){if(void 0!==this.moveEvent){var t,i,s=this.normalizeEvent(this.moveEvent),e=a.parseInt(s.pep.x/this.options.grid[0])*this.options.grid[0],o=a.parseInt(s.pep.y/this.options.grid[1])*this.options.grid[1];if(this.addToLIFO({time:s.timeStamp,x:e,y:o}),-1<l.inArray(s.type,this.startTriggerArray)?i=t=0:(t=e-this.ev.x,i=o-this.ev.y),this.dx=t,this.dy=i,this.ev.x=e,this.ev.y=o,0!==t||0!==i){var n=Math.abs(this.startX-e),r=Math.abs(this.startY-o);!this.started&&(n>this.options.startThreshold[0]||r>this.options.startThreshold[1])&&(this.started=!0,this.$el.addClass("pep-start"),this.options.start.call(this,this.startEvent,this)),this.doMoveTo(t,i),this.options.droppable&&this.calculateActiveDropRegions(),!1!==this.options.drag.call(this,s,this)?(this.log({type:"event",event:s.type}),this.log({type:"event-coords",x:this.ev.x,y:this.ev.y}),this.log({type:"velocity"})):this.resetVelocityQueue()}else this.log({type:"event",event:"** stopped **"})}},o.prototype.doMoveTo=function(t,i){var s,e,o=this.handleConstraint(t,i);"function"==typeof this.options.moveTo?(s=0<=t?"+="+Math.abs(t/this.scale)*this.options.multiplier:"-="+Math.abs(t/this.scale)*this.options.multiplier,e=0<=i?"+="+Math.abs(i/this.scale)*this.options.multiplier:"-="+Math.abs(i/this.scale)*this.options.multiplier,this.options.constrainTo&&(s=!1!==o.x?o.x:s,e=!1!==o.y?o.y:e),"x"===this.options.axis&&(e=o.y),"y"===this.options.axis&&(s=o.x),this.options.moveTo.call(this,s,e)):this.shouldUseCSSTranslation()?(t=t/this.scale*this.options.multiplier,i=i/this.scale*this.options.multiplier,this.options.constrainTo&&(t=!1===o.x?t:0,i=!1===o.y?i:0),"x"===this.options.axis&&(i=0),"y"===this.options.axis&&(t=0),this.moveToUsingTransforms(t,i)):(s=0<=t?"+="+Math.abs(t/this.scale)*this.options.multiplier:"-="+Math.abs(t/this.scale)*this.options.multiplier,e=0<=i?"+="+Math.abs(i/this.scale)*this.options.multiplier:"-="+Math.abs(i/this.scale)*this.options.multiplier,this.options.constrainTo&&(s=!1!==o.x?o.x:s,e=!1!==o.y?o.y:e),"x"===this.options.axis&&(e=o.y),"y"===this.options.axis&&(s=o.x),this.moveTo(s,e))},o.prototype.handleStop=function(t){this.active&&(this.log({type:"event",event:t.type}),this.active=!1,this.easing=!0,this.$el.removeClass("pep-start").addClass("pep-ease"),this.options.droppable&&this.calculateActiveDropRegions(),(this.started||!this.started&&-1<l.inArray("stop",this.options.callIfNotStarted))&&this.options.stop.call(this,t,this),this.options.shouldEase?this.ease(t,this.started):this.removeActiveClass(),this.options.revert&&("stop"===this.options.revertAfter||!this.options.shouldEase)&&this.options.revertIf&&this.options.revertIf.call(this)&&this.revert(),this.started=!1,this.resetVelocityQueue())},o.prototype.ease=function(t,i){this.$el.position();var s=this.velocity(),e=(this.dt,s.x/this.scale*this.options.multiplier),o=s.y/this.scale*this.options.multiplier,n=this.handleConstraint(e,o,!0);this.cssAnimationsSupported()&&this.$el.css(this.getCSSEaseHash());var r=0<s.x?"+="+e:"-="+Math.abs(e),a=0<s.y?"+="+o:"-="+Math.abs(o);this.options.constrainTo&&(r=!1!==n.x?n.x:r,a=!1!==n.y?n.y:a),"x"===this.options.axis&&(a="+=0"),"y"===this.options.axis&&(r="+=0");var p=!this.cssAnimationsSupported()||this.options.forceNonCSS3Movement;"function"==typeof this.options.moveTo?this.options.moveTo.call(this,r,a):this.moveTo(r,a,p);var h=this;this.restTimeout=setTimeout(function(){h.options.droppable&&h.calculateActiveDropRegions(),h.easing=!1,(i||!i&&-1<l.inArray("rest",h.options.callIfNotStarted))&&h.options.rest.call(h,t,h),h.options.revert&&"ease"===h.options.revertAfter&&h.options.shouldEase&&h.options.revertIf&&h.options.revertIf.call(h)&&h.revert(),h.removeActiveClass()},this.options.cssEaseDuration)},o.prototype.normalizeEvent=function(t){return t.pep={},this.isTouch(t)?(t.pep.x=t.originalEvent.touches[0].pageX,t.pep.y=t.originalEvent.touches[0].pageY,t.pep.type=t.type):!this.isPointerEventCompatible()&&this.isTouch(t)||(t.pageX?(t.pep.x=t.pageX,t.pep.y=t.pageY):(t.pep.x=t.originalEvent.pageX,t.pep.y=t.originalEvent.pageY),t.pep.type=t.type),t},o.prototype.resetVelocityQueue=function(){this.velocityQueue=new Array(5)},o.prototype.moveTo=function(t,i,s){this.log({type:"delta",x:t,y:i}),s?this.$el.animate({top:i,left:t},0,"easeOutQuad",{queue:!1}):this.$el.stop(!0,!1).css({top:i,left:t})},o.prototype.moveToUsingTransforms=function(t,i){var s=this.matrixToArray(this.matrixString());this.cssX||(this.cssX=this.xTranslation(s)),this.cssY||(this.cssY=this.yTranslation(s)),this.cssX=this.cssX+t,this.cssY=this.cssY+i,this.log({type:"delta",x:t,y:i}),s[4]=this.cssX,s[5]=this.cssY,this.translation=this.arrayToMatrix(s),this.transform(this.translation)},o.prototype.transform=function(t){this.$el.css({"-webkit-transform":t,"-moz-transform":t,"-ms-transform":t,"-o-transform":t,transform:t})},o.prototype.xTranslation=function(t){return t=t||this.matrixToArray(this.matrixString()),parseInt(t[4],10)},o.prototype.yTranslation=function(t){return t=t||this.matrixToArray(this.matrixString()),parseInt(t[5],10)},o.prototype.matrixString=function(){var t=function(t){return!(!t||"none"===t||t.indexOf("matrix")<0)},i="matrix(1, 0, 0, 1, 0, 0)";return t(this.$el.css("-webkit-transform"))&&(i=this.$el.css("-webkit-transform")),t(this.$el.css("-moz-transform"))&&(i=this.$el.css("-moz-transform")),t(this.$el.css("-ms-transform"))&&(i=this.$el.css("-ms-transform")),t(this.$el.css("-o-transform"))&&(i=this.$el.css("-o-transform")),t(this.$el.css("transform"))&&(i=this.$el.css("transform")),i},o.prototype.matrixToArray=function(t){return t.split("(")[1].split(")")[0].split(",")},o.prototype.arrayToMatrix=function(t){return"matrix("+t.join(",")+")"},o.prototype.addToLIFO=function(t){var i=this.velocityQueue;(i=i.slice(1,i.length)).push(t),this.velocityQueue=i},o.prototype.velocity=function(){for(var t=0,i=0,s=0;s<this.velocityQueue.length-1;s++)this.velocityQueue[s]&&(t+=this.velocityQueue[s+1].x-this.velocityQueue[s].x,i+=this.velocityQueue[s+1].y-this.velocityQueue[s].y,this.dt=this.velocityQueue[s+1].time-this.velocityQueue[s].time);return{x:t*this.options.velocityMultiplier,y:i*this.options.velocityMultiplier}},o.prototype.revert=function(){this.shouldUseCSSTranslation()&&this.moveToUsingTransforms(-this.xTranslation(),-this.yTranslation()),this.moveTo(this.initialPosition.right,this.initialPosition.bottom)},o.prototype.requestAnimationFrame=function(t){return a.requestAnimationFrame&&a.requestAnimationFrame(t)||a.webkitRequestAnimationFrame&&a.webkitRequestAnimationFrame(t)||a.mozRequestAnimationFrame&&a.mozRequestAnimationFrame(t)||a.oRequestAnimationFrame&&a.mozRequestAnimationFrame(t)||a.msRequestAnimationFrame&&a.msRequestAnimationFrame(t)||a.setTimeout(t,1e3/60)},o.prototype.positionParent=function(){this.options.constrainTo&&!this.parentPositioned&&(this.parentPositioned=!0,"parent"===this.options.constrainTo?this.$container.css({position:"relative"}):"window"===this.options.constrainTo&&"#document"!==this.$container.get(0).nodeName&&"static"!==this.$container.css("position")&&this.$container.css({position:"static"}))},o.prototype.placeObject=function(){this.objectPlaced||(this.objectPlaced=!0,this.offset="parent"===this.options.constrainTo||this.hasNonBodyRelative()?this.$el.position():this.$el.offset(),parseInt(this.$el.css("left"),10)&&(this.offset.left=this.$el.css("left")),"number"==typeof this.options.startPos.left&&(this.offset.left=this.options.startPos.left),parseInt(this.$el.css("top"),10)&&(this.offset.top=this.$el.css("top")),"number"==typeof this.options.startPos.top&&(this.offset.top=this.options.startPos.top),this.options.removeMargins&&this.$el.css({margin:0}),this.$el.css({position:"absolute",top:this.offset.top,left:this.offset.left}))},o.prototype.hasNonBodyRelative=function(){return 1<this.$el.parents().filter(function(){var t=l(this);return t.is("body")||"relative"===t.css("position")}).length},o.prototype.setScale=function(t){this.scale=t},o.prototype.setMultiplier=function(t){this.options.multiplier=t},o.prototype.removeCSSEasing=function(){this.cssAnimationsSupported()&&this.$el.css(this.getCSSEaseHash(!0))},o.prototype.disableSelect=function(){this.$el.css({"-webkit-touch-callout":"none","-webkit-user-select":"none","-khtml-user-select":"none","-moz-user-select":"none","-ms-user-select":"none","user-select":"none"})},o.prototype.removeActiveClass=function(){this.$el.removeClass([this.options.activeClass,"pep-ease"].join(" "))},o.prototype.handleConstraint=function(t,i,s){var e=this.$el.position();this.pos.x=e.left,this.pos.y=e.top;var o,n,r,a,p={x:!1,y:!1};return this.log({type:"pos-coords",x:this.pos.x,y:this.pos.y}),l.isArray(this.options.constrainTo)?(this.options.constrainTo[3]!==h&&this.options.constrainTo[1]!==h&&(n=!1===this.options.constrainTo[1]?1/0:this.options.constrainTo[1],r=!1===this.options.constrainTo[3]?-1/0:this.options.constrainTo[3]),!1!==this.options.constrainTo[0]&&!1!==this.options.constrainTo[2]&&(o=!1===this.options.constrainTo[2]?1/0:this.options.constrainTo[2],a=!1===this.options.constrainTo[0]?-1/0:this.options.constrainTo[0]),this.pos.x+t<r&&(p.x=r),this.pos.y+i<a&&(p.y=a)):"string"==typeof this.options.constrainTo&&(a=r=0,n=this.$container.width()-this.$el.outerWidth(),o=this.$container.height()-this.$el.outerHeight(),this.pos.x+t<0&&(p.x=0),this.pos.y+i<0&&(p.y=0)),this.pos.x+t>n&&(p.x=n),this.pos.y+i>o&&(p.y=o),this.shouldUseCSSTranslation()&&s&&(p.x===r&&this.xTranslation()&&(p.x=r-this.xTranslation()),p.x===n&&this.xTranslation()&&(p.x=n-this.xTranslation()),p.y===a&&this.yTranslation()&&(p.y=a-this.yTranslation()),p.y===o&&this.yTranslation()&&(p.y=o-this.yTranslation())),p},o.prototype.getCSSEaseHash=function(t){var i;if(void 0===t&&(t=!1),t)i="";else{if(this.CSSEaseHash)return this.CSSEaseHash;i=["all",this.options.cssEaseDuration+"ms",this.options.cssEaseString].join(" ")}return{"-webkit-transition":i,"-moz-transition":i,"-ms-transition":i,"-o-transition":i,transition:i}},o.prototype.calculateActiveDropRegions=function(){var e=this;this.activeDropRegions.length=0,l.each(l(this.options.droppable),function(t,i){var s=l(i);e.isOverlapping(s,e.$el)?(s.addClass(e.options.droppableActiveClass),e.activeDropRegions.push(s)):s.removeClass(e.options.droppableActiveClass)})},o.prototype.isOverlapping=function(t,i){if(this.options.overlapFunction)return this.options.overlapFunction(t,i);var s=t[0].getBoundingClientRect(),e=i[0].getBoundingClientRect();return!(s.right<e.left||s.left>e.right||s.bottom<e.top||s.top>e.bottom)},o.prototype.isTouch=function(t){return-1<t.type.search("touch")},o.prototype.isPointerEventCompatible=function(){return"MSPointerEvent"in a},o.prototype.applyMSDefaults=function(t){this.$el.css({"-ms-touch-action":"none","touch-action":"none","-ms-scroll-chaining":"none","-ms-scroll-limit":"0 0 0 0"})},o.prototype.isValidMoveEvent=function(t){return!this.isTouch(t)||this.isTouch(t)&&t.originalEvent&&t.originalEvent.touches&&1===t.originalEvent.touches.length},o.prototype.shouldUseCSSTranslation=function(){if(this.options.forceNonCSS3Movement)return!1;if(void 0!==this.useCSSTranslation)return this.useCSSTranslation;var t=!1;return t=!(!this.options.useCSSTranslation||"undefined"!=typeof Modernizr&&!Modernizr.csstransforms),this.useCSSTranslation=t},o.prototype.cssAnimationsSupported=function(){if(void 0!==this.cssAnimationsSupport)return this.cssAnimationsSupport;if("undefined"!=typeof Modernizr&&Modernizr.cssanimations)return this.cssAnimationsSupport=!0;var t=!1,i=document.createElement("div"),s="Webkit Moz O ms Khtml".split(" "),e="";if(i.style.animationName&&(t=!0),!1===t)for(var o=0;o<s.length;o++)if(i.style[s[o]+"AnimationName"]!==h){(e=s[o])+"Animation","-"+e.toLowerCase()+"-",t=!0;break}return this.cssAnimationsSupport=t},o.prototype.hardwareAccelerate=function(){this.$el.css({"-webkit-perspective":1e3,perspective:1e3,"-webkit-backface-visibility":"hidden","backface-visibility":"hidden"})},o.prototype.getMovementValues=function(){return{ev:this.ev,pos:this.pos,velocity:this.velocity()}},o.prototype.buildDebugDiv=function(){var t;0===l("#pep-debug").length&&(t=l("<div></div>")).attr("id","pep-debug").append("<div style='font-weight:bold; background: red; color: white;'>DEBUG MODE</div>").append("<div id='pep-debug-event'>no event</div>").append("<div id='pep-debug-ev-coords'>event coords: <span class='pep-x'>-</span>, <span class='pep-y'>-</span></div>").append("<div id='pep-debug-pos-coords'>position coords: <span class='pep-x'>-</span>, <span class='pep-y'>-</span></div>").append("<div id='pep-debug-velocity'>velocity: <span class='pep-x'>-</span>, <span class='pep-y'>-</span></div>").append("<div id='pep-debug-delta'>&Delta; movement: <span class='pep-x'>-</span>, <span class='pep-y'>-</span></div>").css({position:"fixed",bottom:5,right:5,zIndex:99999,textAlign:"right",fontFamily:"Arial, sans",fontSize:10,border:"1px solid #DDD",padding:"3px",background:"white",color:"#333"});var i=this;setTimeout(function(){i.debugElements={$event:l("#pep-debug-event"),$velocityX:l("#pep-debug-velocity .pep-x"),$velocityY:l("#pep-debug-velocity .pep-y"),$dX:l("#pep-debug-delta .pep-x"),$dY:l("#pep-debug-delta .pep-y"),$evCoordsX:l("#pep-debug-ev-coords .pep-x"),$evCoordsY:l("#pep-debug-ev-coords .pep-y"),$posCoordsX:l("#pep-debug-pos-coords .pep-x"),$posCoordsY:l("#pep-debug-pos-coords .pep-y")}},0),l("body").append(t)},o.prototype.log=function(t){if(this.options.debug)switch(t.type){case"event":this.debugElements.$event.text(t.event);break;case"pos-coords":this.debugElements.$posCoordsX.text(t.x),this.debugElements.$posCoordsY.text(t.y);break;case"event-coords":this.debugElements.$evCoordsX.text(t.x),this.debugElements.$evCoordsY.text(t.y);break;case"delta":this.debugElements.$dX.text(t.x),this.debugElements.$dY.text(t.y);break;case"velocity":var i=this.velocity();this.debugElements.$velocityX.text(Math.round(i.x)),this.debugElements.$velocityY.text(Math.round(i.y))}},o.prototype.toggle=function(t){this.disabled=void 0===t?!this.disabled:!t},l.extend(l.easing,{easeOutQuad:function(t,i,s,e,o){return-e*(i/=o)*(i-2)+s},easeOutCirc:function(t,i,s,e,o){return e*Math.sqrt(1-(i=i/o-1)*i)+s},easeOutExpo:function(t,i,s,e,o){return i===o?s+e:e*(1-Math.pow(2,-10*i/o))+s}}),l.fn[s]=function(i){return this.each(function(){if(!l.data(this,"plugin_"+s)){var t=new o(this,i);l.data(this,"plugin_"+s,t),l.pep.peps.push(t)}})},l.pep={},l.pep.peps=[],l.pep.toggleAll=function(s){l.each(this.peps,function(t,i){i.toggle(s)})},l.pep.unbind=function(t){var i=t.data("plugin_"+s);void 0!==i&&(i.toggle(!1),i.unsubscribe(),t.removeData("plugin_"+s))}}(window.$waf||window.jQuery,window);

	// the rest of the functionality
	var $pepper,
		pepperMove = false,
		eval = '#waf-pers-bubble-holder :not(.abm-clickable)';
	
	// touch start method
	$(eval).on('mousedown touchstart', function(e){
		
		pepperMove = true;
		$pepper = $("#waf-pers-bubble-holder");
		$pepper.pep({ 
			constrainTo : 'window', 
			place : false, 
			disableSelect : false,
			overlapFunction: false,
			useCSSTranslation: false
		}); 

	});
	// touch end method
	$(document).on('mouseup touchend', function(e){
		if (pepperMove) {
			$.pep.unbind( $pepper ); 
			$pepper.css('position','fixed');
			pepperMove = false;
		}
	});

};

// methods for filling it

function generateText(config, key, holder) {
	var text = config.text || 'no text declared',
		link = config.link || false,
		key = key || 'no user key',
		msg = $('<div class="waf-pers-cta waf-pers-offer-block-secondary"> \
			<span>' + text.trim() + '</span></div>');
	if (link) {
		msg.addClass('abm-clickable');
		msg.attr('data-abm-link', link + '?mktvar004=waf-widget-campaign-' + key + '&abmCampaignClicked=true' );
		msg.attr('data-wat-val', 'messaging-link');
		msg.attr('data-wat-loc', 'abm-' + key);	
	}
	holder.append(msg);
};

function generateCta(config, key, holder) {
	var text = config.text || 'no text declared',
		link = config.link || false,
		key = key || 'no user key',
		cta = $('<div class="waf-pers-cta waf-pers-offer-block abm-clickable" \
		data-abm-link="' + link + '?mktvar004=waf-widget-campaign-' + key + '&abmCampaignClicked=true"> \
		<span class="abm-cta-left">' + text.trim() + '</span><span class="abm-cta-right">\></span></div>');

	cta.attr('data-wat-val', 'cta-link');
	cta.attr('data-wat-loc', 'abm-' + key);	

	// console.log('cta height: ' + cta.height() );

	holder.append(cta);
	// console.log('cta height: ' + cta.height() );
};

function generateCloseButton(closeText, key, holder) {
	var closeText = closeText || 'Close',
		close = $('<div class="waf-pers-cta abm-clickable waf-pers-bubble-close-button"><span>' + closeText + '</span></div>');
		close.attr('data-wat-val', 'close');
		close.attr('data-wat-loc', 'abm-' + key);
	holder.append(close);
}

function getBannerImg(palette) {
	// console.log('getting palette for : ' + palette);
	var paletteNum = palette.split('waf-pers-message-palette-')[1] || 'none';
	// console.log('getting palette for : ' + paletteNum);
	switch (paletteNum) {
		case 'one' :
			return '/agile-personalization-widget/imgs/brand_banner_1.jpg';
			break;
		case 'two' :
			return '/agile-personalization-widget/imgs/brand_banner_2.jpg';
			break;
		case 'three' :
			return '/agile-personalization-widget/imgs/brand_banner_3.jpg';
			break;
		case 'four' :
			return '/agile-personalization-widget/imgs/brand_banner_4.jpg';
			break;
		default :
			return false;
			break;
	};
}

window.utag_data = window.utag_data || {};

// Personalization IF the "Marketing Alias" exists -- to be part of the data set, ultimately
function personalizeConfig(oldConfig) {
	console.log(".... attempting Personalization ...");
	// check for the marketing alias
	var alias = window.___companyData ? (
		window.___companyData !== "non" ? (
			window.___companyData.marketingAlias ? 
				window.___companyData.marketingAlias : false) : false) : false;

	if (window.utag_data['account_marketing_alias']) {
		if (window.utag_data['account_marketing_alias'] !== "false") {
			alias = window.utag_data['account_marketing_alias'];
		}
	}

	if (window.widgetForceAlias) {
		alias = window.widgetForceAlias;
	}

	if (alias) {
		console.log('found the Marketing Alias, here we go!');
		var changes = oldConfig.personalizations,
			newConfig = oldConfig;
		$.each(changes, function(configKey, newVal){
			if (newVal) {
				personalVal = newVal.replace('##marketingAlias##', alias);
				newConfig[configKey]['text'] = personalVal;
			}
		});
		return newConfig	;
	} else {
		console.log("sorry, no Personalization possible here...");
		return oldConfig;
	}

}

// build detection

function constructCustomMessaging(userVar, segment, config) {
	
	var segment = segment || 'na';
	console.log('ADSK WAF personaliztion messaging config below...');
	console.log('KEY --> ' + userVar);
	console.log(config);

	var _bubbleHolder = $('<div id="waf-pers-bubble-holder"></div>');
		// update configKey for new var that is user declared
		_bubbleHolder.attr('data-wat-content-name', userVar);
		_bubbleHolder.attr('data-wat-content-type', 'waf-pers-widget-testing');
		_bubbleHolder.attr('data-wat-content-segment', segment);

	bstrapBubble = $('<div class="waf-pers-bubble ' + config.style.palette + '" />');
	if (config.banner) {
		if (config.banner.text) {
			var banner = $('<div id="waf-pers-banner-holder"> \
				<div id="waf-pers-bubble-banner"></div>\
				<div id="waf-pers-banner-text"><span>' + config.banner.text.trim() + '</span></div> \
				<hr class="waf-pers-bubble-banner-border">');
			bstrapBubble.append(banner);	
		}
	}
	if (config.primaryMessage) generateText(config.primaryMessage, userVar, bstrapBubble);
	if (config.primaryCta) generateCta(config.primaryCta, userVar, bstrapBubble);
	if (config.secondaryCta) generateCta(config.secondaryCta, userVar, bstrapBubble);
	if (config.secondaryMessage) generateText(config.secondaryMessage, userVar, bstrapBubble);
	generateCloseButton(config.closeText || false, userVar, bstrapBubble);

	$(_bubbleHolder).append(bstrapBubble);
	$('body').append(_bubbleHolder);
}

window.adskWafPersonalizeConfig = window.adskWafPersonalizeConfig || {};
console.log("WAF Personalization Options");
console.log(window.adskWafPersonalizeConfig);

window.adskWafPersonalizeMsg = function(userVar, userSegment, config) {

	var userVar = userVar || false,
		userSegment = userSegment || false,
		config = typeof window.adskWafPersonalizeConfig[userVar] === "undefined" ? config : window.adskWafPersonalizeConfig[userVar];

	if (config) {
		try {
			config.style = config.style || {};
			var palette = config.style.palette ? config.style.palette : 'waf-pers-message-palette-one';
			config.banner = config.banner || {};
			config.banner.image = getBannerImg(palette);

			/* do the personalizations */
			if (config.personalize) config = personalizeConfig(config);

			constructCustomMessaging(userVar, userSegment, config);
			$("#waf-pers-bubble-holder").addClass('abm-message-hidden');
			enableFunctionality(config);
			loadPep($);
		} catch(err) {
			console.warn("WAF Personalization Widget Build ERROR: " + err.message);	
			// track errors
			gtag('event', 'Widget Build Error', {
              'event_category': 'Errors',
              'event_label' : err.message
            }); 
		}
		
	} else {
		console.warn("WAF Personalization CONFIG Missing, will not build messaging");
		// track errors
		gtag('event', 'Invalid Config Used', {
          'event_category': 'Errors',
          'event_label' : JSON.stringify(config)
        }); 
	}
};

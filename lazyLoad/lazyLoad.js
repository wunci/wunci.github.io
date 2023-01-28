(function(window){
	Wvld = function(){}
	Wvld.prototype.each = function(obj,callback){
		var isObj = Object.prototype.toString.call(obj)
		if (isObj === '[object Object]') {
			for (var name in obj){
				callback.call(obj[name],name,obj[name])
			}
		}else if (isObj === '[object Array]' || isObj === '[object NodeList]' || isObj === '[object HTMLCollection]'){
			for (var i = 0,len = obj.length;  i < len; i++) {
				callback.call(obj[i],i,obj[i])
			}
		}else{
			throw '不是数组或json'
		}
	}
	Wvld.prototype.lazyLoad = function(opts){
		var W = window.innerWidth || document.documentElement.clientWidth;
	    var H = window.innerHeight || document.documentElement.clientHeight;
		var initImg = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC'
	    var imgs = [];
	    var cls = opts.cls ?  opts.cls : '.lazyLoad'
	    if (document.querySelectorAll) {
			imgs = document.querySelectorAll('img'+ cls);
	    }else{
	    	var eles = document.getElementsByTagName('*');
	    	this.each(eles,function(i,val){
				if (new RegExp( "(\\s|^)" + cls.slice(1) + "(\\s|$)").test(eles[i].className) && eles[i].nodeName == 'IMG'){
	    			imgs.push(eles[i])
	    		}
	    	});
	    }
	    // 横向滚动父级列表
		var parentsNode = [];
		this.each(imgs,function(i,val){
			var parent = imgs[i].parentNode
			while(parent){
				if(parent.nodeType == 1){
	                parentsNode.push(parent);
	            }
	            parent = parent.parentNode
			}
		})
		window.addEventListener('DOMContentLoaded',throttle(lazyload,200,500));
		window.addEventListener('scroll',throttle(lazyload,200,500));
		window.addEventListener('resize',throttle(lazyload,200,500));
		// 横向滚动条监听，查找多层父级
		this.each(parentsNode,function(i){
			if (parentsNode[i].scrollWidth > 0) {
				parentsNode[i].addEventListener('scroll',throttle(lazyload,200,500));
			}
		})
		var that = this
		function lazyload(){
			var timer = null,
				speed = 0;
			that.each(imgs,function(i,val){
				var rect = imgs[i].getBoundingClientRect()
				var dataSrc = opts.src ? opts.src : 'data-src'
				if (imgs[i].src != imgs[i].getAttribute(dataSrc)) {
					imgs[i].src = opts.initImg ? opts.initImg : initImg
				}
				if ((rect.top <= H && rect.bottom >= 0) && (rect.left <= W && rect.right >= 0) ){
					if (imgs[i].src != imgs[i].getAttribute(dataSrc)) {
						// 监听图片加载
						var imgLoad = new Image()
						imgLoad.src = imgs[i].getAttribute(dataSrc)
						imgLoad.onload = function(){
							imgs[i].src = imgs[i].getAttribute(dataSrc)
							timer = setInterval(function(){
								speed += 0.02;
								imgs[i].style.opacity = speed;
								if (speed >= 1) {
									clearInterval(timer)
									imgs[i].style.opacity = 1;
									imgs[i].style.cssText = ''
								}
							},30)
						}
					}
				}
			})
		}
		// 节流
		function throttle(fun, delay, time) {
		    var timeout,
		        startTime = new Date();
		    return function() {
		        var context = this,
		            args = arguments,
		            curTime = new Date();
		        clearTimeout(timeout);
		        // 如果达到了规定的触发时间间隔，触发
		        if (curTime - startTime >= time) {
		            fun.apply(context, args);
		            startTime = curTime;
	            // 没达到触发间隔，重新设定定时器
		        } else {
		            timeout = setTimeout(fun, delay);
		        }
		    };
		};
	}
	vld = new Wvld();
	window.vld = window.wunci = vld
})(window)

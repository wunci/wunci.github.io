(function(window){
	Wvld = function(){}
	Wvld.prototype.test = function(){
		// 定义规则
		var types = {
			// 是否为空
	        isEmpty:function(value){
	            if(value == null || value.length === 0 || /^\s+$/g.test(value)){
	                return false;
	            }
	            return true;
	        },
	        // 手机号或座机
	        isPhone:function(value){
	            var reg = /^([1][3|5|8]\d{9}|\d{4}-?\d{7}|\d{3}-?\d{8})$/;
	            if(reg.test(value)){
	                return true;
	            }
	            return false;
	        },
	        // 邮箱
	        isEmail:function(value){
	        	var reg = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/;
	        	if (reg.test(value)) {	
	        		return true
	        	}
	        	return false
	        },
	        // url
	        isUrl:function(value){
	        	var reg = /^((ht|f)tps?):\/\/[\w\-]+(\.[\w\-]+)+([\w\-\.,@?^=%&:\/~\+#]*[\w\-\@?^=%&\/~\+#])?/;
	        	if (reg.test(value)) {	
	        		return true
	        	}
	        	return false
	        },
	        // qq
	        isQQ:function(value){
	        	var reg = /^[1-9][0-9]{4,}$/;
	        	if (reg.test(value)) {	
	        		return true
	        	}
	        	return false
	        },
	        // 邮政编码
	        isPostcode:function(value){
	        	var reg = /^[1-9]\d{5}(?!\d)$/;
	        	if (reg.test(value)) {	
	        		return true
	        	}
	        	return false
	        },
	        // 身份证
	        isCertificate:function(value){
	        	var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
	        	if (reg.test(value)) {	
	        		return true
	        	}
	        	return false
	        },
	        // 匹配中文
	        isChinese:function(value){
	        	var reg = /[\u4e00-\u9fa5]/;
	        	if (reg.test(value)) {	
	        		return true
	        	}
	        	return false
	        },
	        // 密码强度
	        pwdStrong:function(value){
	        	var reg = /(?!^[0-9]{6,12}$)^[0-9A-Za-z]{6,12}$/;
	        	if (reg.test(value)) {	
	        		return true
	        	}
	        	return false
	        },
	        // 检测重复密码
	        repeat:function(value){
	        	var pwdVal = document.querySelector('input[name=pwd]').value
	        	if (pwdVal === value && !/^\s+$/g.test(pwdVal) && value.length !== 0) {	
	        		return true
	        	}
	        	return false
	        },
	    }
	    return function(value,type){ 
	    	//type为检测类型,value为检测的值
	        if(!types[type]){
	            throw "检测类型不存在";
	        }
	        if(!types[type](value)){
	            return true;
	        }
	        return false;
	    }
	}
	// 验证开始
	Wvld.prototype.validation = function(value,types,target,wrap,successCb){
	    var that = this       
	    this.each(types,function(key,val){
	        var isTrue = that.test()(value,val.type);
	        // 验证不通过
	        if( isTrue ){
	            target.className = target.className.replace(/(^\s*)|(\s*$)/g,'');
	            if (!/\berror-red\b/g.test(target.className)) {
	            	target.className += ' error-red';
		            var newEle = document.createElement('span');
		            newEle.innerHTML = val.prompt;
		            newEle.className = 'error-tips';
		          	if (target.parentNode) {
		          		target.parentNode.insertBefore(newEle,target.nextSibling)
		          	}else{
		            	target.parentNode.appendChild(newEle)
		          	}
		            return false 
	            }
	        }else{
	        	 // 验证通过
	        	var nextS = target.nextSibling
	        	console.log(target)
	        	nextS && nextS.nodeName == 'SPAN' && nextS.className == 'error-tips' ? target.parentNode.removeChild(nextS) : '';
	        	target.className = target.className.replace(/\berror-red\b/g,'');
	        }	
	    })
	    
	}
	// each循环
	Wvld.prototype.each = function(obj,callback){
		var isObj = Object.prototype.toString.call(obj) 
		if (isObj === '[object Object]') {
			for (var name in obj){
				callback.call(obj[name],name,obj[name])
			}
		}else if (isObj === '[object Array]' || isObj === '[object NodeList]'){
			for (var i = 0,len = obj.length;  i < len; i++) {
				callback.call(obj[i],i,obj[i])
			}
		}else{
			throw '不是数组或json'
		}
	}
	// form提交表单开始验证
	Wvld.prototype.form = function(data){
		var that = this;
		var nodeName = document.querySelector(data['wrap']).nodeName
		console.log(nodeName)
		var wrap = nodeName == 'FORM' ? '' : data['wrap']
		var event = data['on'] ? data['on'] : 'blur';
		var successCb = data['onSuccess']
		var isError = true
		document.querySelector(wrap+ ' form').onsubmit = function(){
			var input = document.querySelectorAll('input');
			that.each(data['fields'],function(key,val){
				var ele = document.querySelector(wrap+' input[name='+ val.name +']')
				var rules = val.rules
				that.validation(ele.value,rules,ele,wrap);
			})
			for (var i = 0,len = input.length; i < len; i++) {
				if (/\berror-red\b/g.test(input[i].className)) {
					isError = true
					return false 
				}else{
					isError = false
				}
			}
			if (!isError && successCb) {
				successCb()  
				return false
			}else{
				document.querySelector(wrap+' form').submit()
			}
		}
		this.each(data['fields'],function(key,val){
			var ele = document.querySelector(wrap+' input[name='+ val.name +']')
			var rules = val.rules
			if (window.attachEvent) {
				ele.attachEvent('on'+event,function(){
					that.validation(ele.value,rules,ele,wrap);
				})
			}else{
				ele.addEventListener(event,function(){
					that.validation(ele.value,rules,ele,wrap);
				})
			}
		})
	}
	// ajax封装
	Wvld.prototype.ajax = function(opts){
		var defaults = {
			type:'get',
			url:'',
			data:'',
			async: true,
			contentType: 'application/x-www-form-urlencoded',
			success:function(){},
			error:function(){}
		}

		for (var key in opts){
			defaults[key] = opts[key]
		}
		if (typeof defaults.data == 'object') {
			var str = '';
			for (var name in defaults.data){
				str += name +'='+ defaults.data[name] + '&'
			}
			defaults.data = str.replace(/&$/,'')
		}

		defaults.type = defaults.type.toUpperCase()
		defaults.cache = defaults.cache ? '' : '&' + new Date().getTime()

		if (defaults.type === 'GET' && (defaults.data || defaults.cache)) defaults.url += '?' + defaults.data + defaults.cache 

		var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP')
		xhr.open(defaults.type,defaults.url,defaults.async)

		if (defaults.type == 'GET') {
			xhr.send()
		}else{
			xhr.setRequestHeader('Content-type',defaults.contentType)
			xhr.send(defaults.data)
		}
		xhr.onreadystatechange = function(){
			if (xhr.readyState === 4 && xhr.status === 200) {
				defaults.success.call(xhr,xhr.responseText)
			}else{
				defaults.error()
			}
		}
	}

	vld = new Wvld();
	window.vld = window.wclimb = vld

})(window)
	

			
			
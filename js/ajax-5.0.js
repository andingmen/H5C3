(function () {

var a = 100;


// 暴露出ajax接口
ajax = window.ajax = {}

// 增加1个方法： get方法
/*
 * 参数：
 *   obj 是1个对象，代表参数的集合，里面有很多参数，如下所示：
 * 		url     	请求的地址与参数
 *      data        发送的数据
 *      async       是否是同步,  true / false
 * 	    fail        失败的处理回调函数
 * 	    success     成功的处理回调函数
 */
ajax.get = function(obj) {
	
	if (obj.async == undefined) {
		obj.async = true;
	}
	
	if (obj.data == undefined) {
		obj.data = "";
	}
	
	var xhr = new XMLHttpRequest();
	
	var url = obj.url;
	url += "?"
	url += translate(obj.data);
	
	xhr.open("GET", url, obj.async);
	
	xhr.send()
	
	if (obj.async == true) {
		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4) {
				
				if (xhr.status == 200) {
					
					var str = xhr.responseText;
					obj.success && obj.success(str);
				} else {
					obj.fail && obj.fail();
				}
				
			}
			
		}
	} else {
		// 同步方式
		if (xhr.status == 200) {
			var str = xhr.responseText;
			obj.success && obj.success(str);
		} else {
			obj.fail && obj.fail();
		}
	}
	
}



// 增加1个方法： post方法
/*
 * 参数：
 *   obj 是1个对象，代表参数的集合，里面有很多参数，如下所示：
 * 		url     	请求的地址与参数
 *      data        发送的数据
 *      async       是否是同步,  true / false
 * 	    fail        失败的处理回调函数
 * 	    success     成功的处理回调函数
 */
ajax.post = function(obj) {
	
	if (obj.async == undefined) {
		obj.async = true;
	}
	
	if (obj.data == undefined) {
		obj.data = "";
	}
	
	var xhr = new XMLHttpRequest();
	
	var url = obj.url;
	
	xhr.open("POST", url, obj.async);

	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhr.send(obj.data)
	
	if (obj.async == true) {
		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4) {
				
				if (xhr.status == 200) {
					
					var str = xhr.responseText;
					obj.success && obj.success(str);
				} else {
					obj.fail && obj.fail();
				}
				
			}
			
		}
	} else {
		// 同步方式
		if (xhr.status == 200) {
			var str = xhr.responseText;
			obj.success && obj.success(str);
		} else {
			obj.fail && obj.fail();
		}
	}
	
}
function translate(obj){
		var str = "";
		for(var i in obj){
			str += i;
			str += "=";
			str += decodeURIComponent(obj[i]);
			str += "&";
		}
		str = str.substr(0,str.length-1)
		return str
		
	}
})();
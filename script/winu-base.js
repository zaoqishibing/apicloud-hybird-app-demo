/*
* 版权所有：中山赢友网络科技有限公司（http://www.winu.net/，http://www.appsoft.io)
* 开发人员：新生帝(JsonLei)
* 设计名称：APICloud通用基础类库
* 软件版本：V1.0.0 Beta
* 设计时间：2015年11月17号
* 设计理念：只为了更懒和那份不可替代性！
*/

// 服务器地址
//window.serverUrl = "http://192.168.0.123:8080/wailintoo/index.php/open/";
//window.uploadUrl = "http://192.168.0.123:8080/wailintoo/";
window.serverUrl = "http://wchild-apicloudim-linshiren.l213.vhostgo.com/index.php/Home/";
window.uploadUrl = "http://wchild-apicloudim-linshiren.l213.vhostgo.com/";
// AC默认参数 BEGIN
window.openWinAnimationType = "movein";
window.openWinAnimationSubType = "from_right";
window.openWinAnimationDuration = 300;
window.openWinDelay = 300;
window.toastDuration = 4000;
window.toastLocation = "bottom";
window.showProgressAnimationType = "fade";
window.showProgressTitle = "加载中...";
window.showProgressText = "";
window.ajaxTimeout = 30;
// APP默认参数 END
// 用户偏好设置的Key
window.userKey = "userInfo";
// 继承拓展对象
function _extents(obj1, obj2) {
	for (var i in obj2) {
		if (obj1[i]) {
			continue;
		} else {
			obj1[i] = obj2[i];
		}
	}
}

// 手机号验证
function _checkPhone(phone) {
	var res = !!phone.match(/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/);
	return res;
}

// 打开新窗口
function _openWin(name, url, pageParam, bgColor, animateDirection, bounces, reload) {
	var _pageParam = ( typeof arguments[2] == "undefined" || arguments[2] == null) ? api.pageParam : arguments[2];
	var _bgColor = ( typeof arguments[3] == "undefined" || arguments[3] == null) ? 'rgba(0,0,0,0)' : arguments[3];
	var _animateDirection = ( typeof arguments[4] == "undefined" || arguments[4] == null) ? window.openWinAnimationSubType : arguments[4];
	var _bounces = ( typeof arguments[5] == "undefined" || arguments[5] == null) ? false : arguments[5];
	var _reload = ( typeof arguments[6] == "undefined" || arguments[6] == null) ? false : arguments[6];
	api.openWin({
		name : name,
		url : url,
		pageParam : _pageParam,
		bgColor : _bgColor,
		bounces : _bounces,
		scrollToTop : true,
		slidBackEnabled : true,
		animation : {
			type : window.openWinAnimationType,
			subType : _animateDirection,
			duration : window.openWinAnimationDuration
		},
		delay : api.systemType == "ios" ? 0 : window.openWinDelay,
		reload : _reload,
		allowEdit : false,
		vScrollBarEnabled : false,
		hScrollBarEnabled : false
	});
}

// 打开新框架
function _openFrame(name, url, rect, pageParam, bgColor, bounces, reload, showProgress) {
	var __rect = {
		x : 0,
		y : 0,
		w : api.winWidth,
		y : api.winHeight,
		l : 0,
		t : 0,
		b : 0,
		r : 0
	};
	var _rect = ( typeof arguments[2] == "undefined" || arguments[2] == null || typeof arguments[2] != "object") ? __rect : arguments[2];
	var _pageParam = ( typeof arguments[3] == "undefined" || arguments[3] == null) ? api.pageParam : arguments[3];
	var _bgColor = ( typeof arguments[4] == "undefined" || arguments[4] == null) ? 'rgba(0,0,0,0)' : arguments[4];
	var _bounces = ( typeof arguments[5] == "undefined" || arguments[5] == null) ? false : arguments[5];
	var _reload = ( typeof arguments[6] == "undefined" || arguments[6] == null) ? false : arguments[6];
	var _showProgress = ( typeof arguments[7] == "undefined" || arguments[7] == null) ? false : arguments[7];
	api.openFrame({
		name : name,
		url : url,
		rect : {
			x : typeof _rect.x != "number" ? __rect.x : _rect.x,
			y : typeof _rect.y != "number" ? __rect.y : _rect.y,
			w : typeof _rect.w != "number" ? __rect.w : _rect.w,
			h : typeof _rect.h != "number" ? __rect.h : _rect.h,
			marginLeft : typeof _rect.l != "number" ? __rect.l : _rect.l,
			marginTop : typeof _rect.t != "number" ? __rect.t : _rect.t,
			marginBottom : typeof _rect.b != "number" ? __rect.b : _rect.b,
			marginRight : typeof _rect.r != "number" ? __rect.r : _rect.r
		},
		bgColor : _bgColor,
		pageParam : _pageParam,
		scrollToTop : true,
		bounces : _bounces,
		showProgress : _showProgress,
		reload : _reload,
		vScrollBarEnabled : false,
		hScrollBarEnabled : false,
		allowEdit : true
	});
}

// 关闭当前窗口到新的窗口
function _closeToWin(name) {
	api.closeToWin({
		name : name,
		animation : {
			type : 'movein',
			subType : 'from_left',
			duration : 300
		}
	});
}

// 小提示
function _toast(msg, duration, location, _call) {
	var _duration = ( typeof arguments[1] == "undefined" || arguments[1] == null) ? window.toastDuration : arguments[1];
	var _location = ( typeof arguments[2] == "undefined" || arguments[2] == null) ? window.toastLocation : arguments[2];
	api.toast({
		msg : msg,
		duration : _duration,
		location : _location
	});
	if ( typeof _call == "function") {
		setTimeout(_call, duration);
	}
}

// 加载框
function _showProgress(title, text, modal, animationType) {
	var _title = ( typeof arguments[0] == "undefined" || arguments[0] == null) ? window.showProgressTitle : arguments[0];
	var _text = ( typeof arguments[1] == "undefined" || arguments[1] == null) ? window.showProgressText : arguments[1];
	var _modal = ( typeof arguments[2] == "undefined" || arguments[2] == null) ? true : arguments[2];
	var _animationType = ( typeof arguments[3] == "undefined" || arguments[3] == null) ? window.showProgressAnimationType : arguments[3];
	api.showProgress({
		style : 'default',
		animationType : _animationType,
		title : _title,
		text : _text,
		modal : _modal
	});
}

// 双击退出应用
function _twoClickCloseApp(_call) {
	//定义个时间戳
	var mkeyTime = new Date().getTime();

	_addEventListener('keyback', function(ret) {
		//如果当前时间减去标志时间大于2秒，说明是第一次点击返回键，反之为2秒内点了2次，则退出。
		if ((new Date().getTime() - mkeyTime) > 2000) {
			mkeyTime = new Date().getTime();
			_toast('再按一次退出程序', 2000);
		} else {
			if ( typeof _call == "function") {
				_call();
			}
			// 静默关闭,不弹出关闭提示窗口
			api.closeWidget({
				silent : true
			});
		}
	}, {});
}

// 下拉刷新
function _setRefreshHeaderInfo(_call, bgColor, textColor) {
	var _bgColor = ( typeof arguments[1] == "undefined" || arguments[1] == null) ? '#efeff4' : arguments[1];
	var _textColor = ( typeof arguments[2] == "undefined" || arguments[2] == null) ? '#999' : arguments[2];
	api.setRefreshHeaderInfo({
		visible : true,
		loadingImg : 'widget://image/refresh.png',
		bgColor : _bgColor,
		textColor : _textColor,
		textDown : '下拉刷新...',
		textUp : '松开刷新...',
		showTime : true
	}, function(ret, err) {
		if ( typeof _call == "function") {
			_call();
		}
	});
}

// 上拉加载
function _scrolltobottom(_call, threshold) {
	var _threshold = ( typeof arguments[1] == "undefined" || arguments[1] == null) ? 0 : arguments[1];
	_addEventListener('scrolltobottom', _call, {
		threshold : _threshold
	});
}

// 获取偏好设置
function _getPrefs(key, _call) {
	api.getPrefs({
		key : key
	}, function(ret, err) {
		var v = ret.value;
		if ( typeof _call == "function") {
			_call(v);
		}
	});
}

// 设置偏好设置
function _setPrefs(key, value, _call) {
	api.setPrefs({
		key : key,
		value : value
	}, function(ret, err) {
		var v = ret.value;
		if ( typeof _call == "function") {
			_call();
		}
	});
}

// 移除偏好设置
function _removePrefs(key, _call) {
	api.removePrefs({
		key : key
	}, function(ret, err) {
		var v = ret.value;
		if ( typeof _call == "function") {
			_call();
		}
	});
}

// 设置存储
function _setStorage(key, value) {
	$api.setStorage(key, value);
}

// 获取存储
function _getStorage(key) {
	return $api.getStorage(key);
}

// 移除存储
function _removeStorage(key) {
	return $api.rmStorage(key);
}

// 异步请求
function _ajax(url, method, data, dataType, _call, headers, cache, timeout, tag) {
	var _data = ( typeof arguments[2] == "undefined" || arguments[2] == null) ? {} : arguments[2];
	var _dataType = ( typeof arguments[3] == "undefined" || arguments[3] == null) ? "json" : arguments[3];
	var _headers = ( typeof arguments[5] == "undefined" || arguments[5] == null) ? {} : arguments[5];
	var _cache = ( typeof arguments[6] == "undefined" || arguments[6] == null) ? false : arguments[6];
	var _timeout = ( typeof arguments[7] == "undefined" || arguments[7] == null) ? window.ajaxTimeout : arguments[7];
	var _tag = ( typeof arguments[8] == "undefined" || arguments[8] == null) ? '' : arguments[8];
	api.ajax({
		url : url,
		cache : _cache,
		tag : _tag,
		method : method,
		headers : _headers,
		timeout : _timeout,
		dataType : _dataType,
		returnAll : false,
		data : _data
	}, function(ret, err) {
		if (ret) {
			if ( typeof _call == "function") {
				_call(ret);
			}
		} else {
			api.hideProgress();
			api.refreshHeaderLoadDone();
			_toast("亲，网速不给力哦~");
			api.alert({
				msg : ('错误码：' + err.code + '；错误信息：' + err.msg + '网络状态码：' + err.statusCode)
			});
		}

	});
}

// 解决状态栏重合
function _fixStatusBar(headerid, callback) {
	var header = $api.byId(headerid);
	var systemType = api.systemType;
	var systemVersion = parseFloat(api.systemVersion);
	if (systemType == "ios" || (systemType == "android" && systemVersion >= 4.4)) {
		if (systemType == "android") {
			header.style.paddingTop = '25px';
		}
		$api.fixStatusBar(header);
	} else {
		$api.fixIos7Bar(header);
	}
	var headerPos = $api.offset(header);
	if ( typeof callback == "function") {
		callback(headerPos);
	}
}

// 指定window或者frame执行脚本
function _execScript(winName, frmName, fnStr) {
	var _winName = ( typeof arguments[0] == "undefined" || arguments[0] == null) ? api.winName : arguments[0];
	var _frmName = ( typeof arguments[1] == "undefined" || arguments[1] == null) ? api.frameName : arguments[1];
	var _fnStr = ( typeof arguments[2] == "undefined" || arguments[2] == null) ? '' : arguments[2];
	api.execScript({
		name : _winName,
		frameName : _frmName,
		script : _fnStr
	});
}

// 广播事件
function _sendEvent(eventName, extra) {
	var _extra = ( typeof arguments[1] == "undefined" || arguments[1] == null) ? {} : arguments[1];
	api.sendEvent({
		name : eventName,
		extra : _extra
	});
}

// 监听事件
function _addEventListener(eventName, _call, extra) {
	var _extra = ( typeof arguments[2] == "undefined" || arguments[2] == null) ? {} : arguments[2];
	api.addEventListener({
		name : eventName,
		extra : _extra
	}, function(ret, err) {
		if ( typeof _call == "function") {
			_call(ret);
		}
	});
}

// 打开相册或相机
//library            //图片库
//camera            //相机
//album            //相册
//pic            //图片
//video        //视频
//function _getPicture(_call, encodingType, mediaValue, destinationType, quality, targetWidth, targetHeight, saveToPhotoAlbum, allowEdit) {
//	var _encodingType = ( typeof arguments[1] == "undefined" || arguments[1] == null) ? "jpg" : arguments[1];
//	var _mediaValue = ( typeof arguments[2] == "undefined" || arguments[2] == null) ? "pic" : arguments[2];
//	var _destinationType = ( typeof arguments[3] == "undefined" || arguments[3] == null) ? "url" : arguments[3];
//	var _quality = ( typeof arguments[4] == "undefined" || arguments[4] == null) ? 50 : arguments[4];
//	var _targetWidth = ( typeof arguments[5] == "undefined" || arguments[5] == null) ? 320 : arguments[5];
//	var _targetHeight = ( typeof arguments[6] == "undefined" || arguments[6] == null) ? 320 : arguments[6];
//	var _saveToPhotoAlbum = ( typeof arguments[7] == "undefined" || arguments[7] == null) ? true : arguments[7];
//
//	api.actionSheet({
//		title : '您想要从哪里选取图片？',
//		cancelTitle : '取消',
//		buttons : ["优雅自拍", "相册收藏"]
//	}, function(ret, err) {
//		if (ret.buttonIndex == 3) {
//			return;
//		}
//		var sourceType = "album";
//		if (ret.buttonIndex == 1) {
//			sourceType = "camera";
//		}
//
//		api.getPicture({
//			sourceType : sourceType,
//			encodingType : _encodingType,
//			destinationType : _destinationType,
//			mediaValue : _mediaValue,
//			quality : _quality,
//			targetWidth : _targetWidth,
//			targetHeight : _targetHeight,
//			saveToPhotoAlbum : _saveToPhotoAlbum
//		}, function(ret, err) {
//			if (ret) {
//				if ( typeof _call == "function") {
//					_call(ret.data);
//				}
//			} else {
//				api.alert({
//					msg : err.msg
//				});
//			}
//		});
//	});
//
//}

// 判断是否是IOS
function _isIOS() {
	return api.systemType == "ios" ? true : false;
}

// 滚动到底部
function _scrollToEnd() {
	document.getElementsByTagName('body')[0].scrollTop = document.getElementsByTagName('body')[0].scrollHeight;
}

// 设置frame显示隐藏状态
function _setFrameStatus(name, isHidden) {
	api.setFrameAttr({
		name : name,
		hidden : isHidden
	});
}

// 判断是否是正整数
function _isNumber(str) {
	var re = /^[0-9]*[1-9][0-9]*$/;
	return re.test(str)
}

// 是否是正浮点数
function _isDecimal(str) {
	var re = /^(([0-9]|([1-9][0-9]{0,9}))((\.[0-9]{1,2})?))$/;
	return re.test(str)
}

// 是否是日期格式
function _isDate(str) {
	var re = /^(?:(?:1[6-9]|[2-9][0-9])[0-9]{2}([-/.]?)(?:(?:0?[1-9]|1[0-2])\1(?:0?[1-9]|1[0-9]|2[0-8])|(?:0?[13-9]|1[0-2])\1(?:29|30)|(?:0?[13578]|1[02])\1(?:31))|(?:(?:1[6-9]|[2-9][0-9])(?:0[48]|[2468][048]|[13579][26])|(?:16|[2468][048]|[3579][26])00)([-/.]?)0?2\2(?:29))(\s+([01][0-9]:|2[0-3]:)?[0-5][0-9]:[0-5][0-9])?$/;
	return re.test(str)
}

// 清除缓存
function _clearCache() {
	api.clearCache(function(ret, err) {
		_toast("清除成功");
	});
}

// 退出登录
function _loginOut(_call) {
	_removePrefs(window.userKey, _call);
}

// 禁止返回
function _stopBack(_call) {
	_addEventListener('keyback', function(ret) {
		if ( typeof _call == "function") {
			_call(ret.data);
		}
	}, {});
}

// 弹窗
function _alert(obj) {
	if ( typeof obj == "object") {
		api.alert({
			msg : JSON.stringify(obj)
		}, function(ret, err) {

		});
	} else {
		api.alert({
			msg : obj
		}, function(ret, err) {

		});
	}
}

// 根据出生日期算年龄
function ages(str) {
	var r = str.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
	if (r == null)
		return false;
	var d = new Date(r[1], r[3] - 1, r[4]);
	if (d.getFullYear() == r[1] && (d.getMonth() + 1) == r[3] && d.getDate() == r[4]) {
		var Y = new Date().getFullYear();
		return (Y - r[1]);
	}
	return 0;
}

// 获取文件拓展名
function _getExt(fileName) {
	return fileName.substring(fileName.lastIndexOf('.') + 1);
}

// PHP时间戳转时间
function _trans_php_time_to_str(timestamp, n) {
	update = new Date(timestamp * 1000);
	//时间戳要乘1000
	year = update.getFullYear();
	month = (update.getMonth() + 1 < 10) ? ('0' + (update.getMonth() + 1)) : (update.getMonth() + 1);
	day = (update.getDate() < 10) ? ('0' + update.getDate()) : (update.getDate());
	hour = (update.getHours() < 10) ? ('0' + update.getHours()) : (update.getHours());
	minute = (update.getMinutes() < 10) ? ('0' + update.getMinutes()) : (update.getMinutes());
	second = (update.getSeconds() < 10) ? ('0' + update.getSeconds()) : (update.getSeconds());
	if (n == 1) {
		return (year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second);
	} else if (n == 2) {
		return (year + '-' + month + '-' + day);
	} else {
		return 0;
	}
}

// 生成guid,主要用于生成随机文件名
function _newGuid() {
	function S4() {
		return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
	}

	return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}

// 获取当前的时间，拼接成2015-11-09这样的格式，主要用于对图片进行时间分类
function _getNowFormatDate() {
	var date = new Date();
	var seperator1 = "-";
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	var strDate = date.getDate();
	if (month >= 1 && month <= 9) {
		month = "0" + month;
	}
	if (strDate >= 0 && strDate <= 9) {
		strDate = "0" + strDate;
	}
	var currentdate = year + seperator1 + month + seperator1 + strDate
	return currentdate;
}

// 图片压缩
// imageFilter:压缩对象
// imgsrc：源图片的路径
// quality：图片压缩质量，一般建议0.5
// scale：图片压缩比例，也是建议0.5
// ext：源图片拓展名
// callback：转换成功之后回调函数
function _imgCompress(imageFilter, imgsrc, quality, scale, ext, callback) {
	// 压缩文件的保存目录
	var savePath = api.cacheDir + "/" + _getNowFormatDate() + "/";
	// 压缩文件生成的随机文件名称
	var savename = _newGuid() + "." + ext;
	imageFilter.compress({
		img : imgsrc,
		quality : quality,
		scale : quality,
		save : {
			album : false,
			imgPath : savePath,
			imgName : savename
		}
	}, function(ret, err) {
		if (ret) {
			callback(savePath + savename);
		} else {
			alert(JSON.stringify(err));
		}
	});
}

// 上传图片
//function _uploadImgs(data, _call) {
//	_toast("上传中...", 10000);
//	_ajax(window.serverUrl + "index/uploads", "post", {
//		files : {
//			"pic" : data
//		}
//	}, "json", function(ret) {
//		if (ret.statu == 1) {
//			_toast("上传成功!");
//			if ( typeof _call == "function") {
//				_call(ret);
//			}
//		} else if (ret.statu == 0) {
//			_toast("系统繁忙，请重新上传!");
//		} else {
//			_toast("非法参数!");
//		}
//	});
//}

// 时间戳转时间
function _formatDate(timespan) {
	var today = new Date(); //系统当前时间
	var todayYears = today.getFullYear(); //得到年份,getFullYear()比getYear()更普适
	var todayMonths = today.getMonth() + 1; //得到月份，要加1
	var todayDays = today.getDate(); //得到日期
	var todayHours = today.getHours(); //得到小时 
	var todayMinutes = today.getMinutes(); //得到分钟
	var todaySeconds = today.getSeconds(); //得到秒钟
	var now = new Date(timespan);
	var year = now.getFullYear();
	var month = now.getMonth() + 1;
	var date = now.getDate();
	var hour = now.getHours();
	var minute = now.getMinutes();
	var second = now.getSeconds();
	if(todayYears!=year){
	return year + "-" + month+ "-" + date;
	}
	else if(todayMonths!=month){
	return month + "-" + date + "   " + hour + ":" + minute;
	}
	else if (todayDays!=date){
	if(todayDays-date>=2 ){
	return month + "-" + date + "   " + hour + ":" + minute;
	}
	if (todayDays-date==1){
	return "昨天"+"  "+hour + ":" + minute ;
	}
	}else if (todayHours!=hour){
	
//	if(todayHours==hour&&todayMinutes-minute<=3){
//	return "刚刚";
//	}else{
	return hour + ":" + minute ;
	
	}else if(todayMinutes!=minute){
	if(todayMinutes-minute>=11){
	return hour + ":" + minute ;
	}else if(todayMinutes-minute<=10){
	return  todayMinutes-minute+"分钟前";
	}
	}else{
	return "刚刚";
	}
}

// 时间判断是否3分钟内
function _formatDate3second(time,latestmessagetime) {
	var today = new Date(time); //系统当前时间
	var todayYears = today.getFullYear(); //得到年份,getFullYear()比getYear()更普适
	var todayMonths = today.getMonth() + 1; //得到月份，要加1
	var todayDays = today.getDate(); //得到日期
	var todayHours = today.getHours(); //得到小时 
	var todayMinutes = today.getMinutes(); //得到分钟
//	var todaySeconds = today.getSeconds(); //得到秒钟
	var now1=new Date(latestmessagetime);
	
	var year = now1.getFullYear();
	var month = now1.getMonth() + 1;
	var date = now1.getDate();
	var hour = now1.getHours();
	var minute = now1.getMinutes();
//	var second = now.getSeconds();
	if((todayYears==year)&&(todayMonths==month)&&(todayDays==date)&&(todayHours==hour)&&(todayMinutes-minute<=3)){
	return false
	}else{
	return  true
	}
}
// 去除数组重复项
function _unique(arr) {
	var result = [], hash = {};
	for (var i = 0, elem; ( elem = arr[i]) != null; i++) {
		if (!hash[elem]) {
			result.push(elem);
			hash[elem] = true;
		}
	}
	return result;
}
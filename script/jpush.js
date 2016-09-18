function init_jpush() {
	if (api.systemType == 'ios') {//ios系统不需要进行加载自动就加载了，但是需要 进行点击消息事件的监听
		listener_msg_clicked();
	} else {
		load_jpush();//非ios系统需要进行加载
	}
	setListener_msg();//进行消息监听，也就是说当应用在前台的时候，也能够接收消息且进行逻辑处理
	//以下是绑定设备为别名，这里需要解释一下，我们后面后端程序进行推送消息的时候是通过别名来进行推送的，所以需要绑定一下，我们这里是绑定的设备唯一识别码，如果你是按照用户名等等的绑定这里可以不要调用。在需要绑定的地方执行setAlias(deviceId);
	var deviceId=get_deviceId();
	setAlias(deviceId);
}

function load_jpush() {//加载jpush
	var ajpush = api.require('ajpush');
	ajpush.init(function(ret) {
		listener_msg();
		//$alert("推送状态:" + json2str(ret));
	});
}

function listener_msg() {//针对非IOS系统的消息点击
	api.addEventListener({
		name : 'appintent'
	}, function(ret, err) {
		sendMsg(ret.appParam.ajpush);
		//$alert("appintent:" + json2str(ret));
	})
}

function listener_msg_clicked() {//针对IOS系统的消息点击
	api.addEventListener({
		name : 'noticeclicked'
	}, function(ret, err) {
		sendMsg(ret.value);
		//$alert("noticeclicked:" + json2str(ret));
	})
}

function setListener_msg() {//消息监听，即应用在前台的时候的监听
	var ajpush = api.require('ajpush');
	ajpush.setListener(function(ret) {
		sendMsg(ret);
		//$alert("setListener_msg:" + json2str(ret));
	});
}

function clear_notice() {//清除消息通知，一般用不到，不用管
	var ajpush = api.require('ajpush');
	var param = {
		id : -1
	};
	ajpush.clearNotification(param, function(ret) {
	alert(ret.status);
		if (ret && ret.status) {
			//success
		}
	});
}
function set_badge()//针对ios系统的清楚角标提醒数字，只要执行了就设置为空
{
	var ajpush = api.require('ajpush');
	ajpush.setBadge({badge:0});
}
function setAlias(id) {//绑定别名
	var param = {
		alias : id,
		tags : ['tag_' + id, 'coolfull']
	};
	var ajpush = api.require('ajpush');
	ajpush.bindAliasAndTags(param, function(ret) 
	{
		//		$alert("bindAliasAndTags:" + json2str(ret));
		var statusCode=ret.statusCode;
		if (statusCode=='6002') 
		{
			setAlias();
		}
	});
}

function sendMsg(ret)//统一的消息逻辑处理
{
	if (api.systemType == 'ios') 
	{
		if(ret.extra)
		{
			var extra=ret.extra;
		}
		else if(ret.extras)
		{
			var extra=ret.extras;
		}
		set_badge();//清除角标
	}
	else
	{
		var extra=str2json(ret.extra);
	}
	var content=ret.content;
	var type=extra.type; 
	var order_id=extra.order_id;
	//注，以上的逻辑稍微有点复杂，就不详细描述为什么了，简单一点说,extra是你后端传过来的json，content,是你推送的内容，我们把后端过来的extra转换成一个json对象，然后去进行逻辑。以上我们是得到了后端传过来的一个age的值
	if(type=="qiangdan")
	{
		var TEL=extra.TEL;
		var mail_name=extra.mail_name;
		if(is_define(mail_name)){
			mail_name='快递';
		}else{
			mail_name=subString(mail_name,2);
		}
		api.confirm(
		{
			//title : '您的订单被：'+mail_name+'师傅抢到',
			msg : content,
			buttons : ['查看详情', '给'+mail_name+'师傅打电话']
		}, function(ret, err) 
		{
			if (ret.buttonIndex == 1) 
			{
				//做处理   比如跳转到订单页
				set_local("order_id",order_id);
				open_w("daichuli_detail","order/daichuli_detail.html");
				return true;
			} 
			else 
			{
				api.call(
				{
					type : 'tel_prompt',
					number : TEL
				});
			}
		});
	}else if(type=="songda")
	{
		api.confirm(
		{
			//title : '您的订单已送达',
			msg : content,
			buttons : ['评价', '关闭']
		}, function(ret, err) 
		{
			if (ret.buttonIndex == 1) 
			{
				//做处理   比如跳转到订单页
				set_local("order_id",order_id);
				open_w("wancheng_pingjia","order/wancheng_pingjia.html");
				return true;
			} 
			else 
			{
				return false;
			}
		});
	}else if(type=="qujian")
	{
		api.confirm(
		{
			//title : '您的订单已被取走',
			msg : content,
			buttons : ['查看详情', '关闭']
		}, function(ret, err) 
		{
			if (ret.buttonIndex == 1) 
			{
				//做处理   比如跳转到订单页
				set_local("order_id",order_id);
				open_w("paisong_detail","order/paisong_detail.html");
				return true;
			} 
			else 
			{
				return false;
			}
		});
	}
}

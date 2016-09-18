function openPicSheet()
{
	api.actionSheet(
	{
		title : '上传头像',
		cancelTitle : '关闭',
		buttons : ['打开相机', '本地图库']
	}, function(ret, err)
	{
		if (ret.buttonIndex == 1)
		{
			openPic('camera');
		}
		if (ret.buttonIndex == 2) 
		{
			openPic('library');
		}
	});
}
function openPic(type)
{
	api.getPicture(
	{
		sourceType : type,
		encodingType : 'jpg',
		mediaValue : 'pic',
		destinationType : 'url',
		allowEdit : true,
		quality : 50,
		targetWidth : 300,
		targetHeight : 300,
		saveToPhotoAlbum : false
	},function(ret, err)
	{
		if (ret)
		{
			api.ajax(
			{
		    	url: serverURL+'/upload_face.php',
		    	method: 'post',
		    	timeout: 30,
		    	dataType: 'json',
		    	returnAll:false,
		    	data:{
		        	values: {uid: '13909261561'},
		        	files: {face:ret.data}
		    	}
			},function(ret,err)
			{
		    	if (ret)
		    	{
					alert(json2str(ret));
		    	}
		    	else
		    	{
		        	api.alert({msg:('错误码：'+err.code+'；错误信息：'+err.msg+'网络状态码：'+err.statusCode)});
		    	}
			});
		}
		else
		{
		}
	});
}

//function Login() {
//	var tel = $api.val($api.byId('tel'));
//	var pwd = $api.val($api.byId('pwd'));
//	var reg = /^0{0,1}(13[0-9]|18[0-9]|17[0-9]|14[0-9]|15[0-9])[0-9]{8}$/;
//	if (tel == "") {
//		$toast("请输入手机号码", '2000');
//		return false;
//	} else if (!tel.match(reg)) {
//		$toast('手机格式不正确', '2000');
//		return false;
//	} else if (pwd == "") {
//		$toast("请输入密码", '2000');
//		return false;
//	} else {
//		//开始登陆设置本地存储
//		set_local("UID", 1);
//		api.execScript({
//			name : 'root',
//			frameName : 'my',
//			script : 'isLogin();'
//		});
//		close_w("login");
//	}
//}
//会员注册
function reg(mobile, password, yqm)
{
	var deviceId=get_deviceId();
	show_doing();
	api.ajax(
	{
		url : serverURL+"app/action.php?type=reg",
		method : 'POST',
		timeout : '30',
		dataType : 'json',
		data : 
		{
			values:
			{
				tel : mobile,
				password : password,
				reference : yqm,
				deviceId:deviceId
			}
		}
	},
	function(ret, err)
	{
		hide_doing();
		if (ret)
		{
			if (ret.status == 1)
			{
				$toast(ret.msg ,'3000');
			}
			else
			{
				set_local("tel",mobile);
				$toast(ret.msg,'1000');
				setTimeout(function(){close_wName('login');close_wName('reg');},2000)
			}
		}
		else
		{
			$toast("网络开小差，检查后再试吧",toast_time);
		};
	});
}
//会员登陆接口
function login(mobile, pwd)
{
	var deviceId=get_deviceId();
	show_doing();
	api.ajax(
	{
		url : serverURL+"app/action.php?type=log",
		method : 'POST',
		timeout : '30',
		dataType : 'json',
		returnAll : false,
		data:
		{
			values:{tel:mobile,password:pwd,deviceId:deviceId}
		}
	},
	function(ret, err) 
	{
		hide_doing();
		if (ret) 
		{
			if(ret.status==0)
			{
				$toast(ret.msg,'3000');
			}
			else
			{
				set_local("tel",mobile);
				$toast(ret.msg,'1000');
				api.execScript(
				{
					name: 'root',
					frameName:'my',
					script: 'get_point();'
				});
				setTimeout(function(){close_wName('login');close_wName('reg');},1000);
			}
		}
		else
		{
			$toast("网络开小差，检查后再试吧",toast_time);
		}
	});
}
//退出登陆
function Logout()
{
	api.confirm(
	{
		title : '提示信息',
		msg : '确定要退出吗？',
		buttons : ['确定', '取消']
	},
	function(ret, err)
	{
		if (ret.buttonIndex==1)
		{
			set_local("tel","");
			uescript_f('root','my','get_point()');
			api.execScript(
			{
				name: 'root',
				frameName:'my',
				script: 'get_point();'
			});
			close_w();

		}
		else
		{
			return false;
		}
	});
}
//获取验证码
function getCode()
{
	var tel = $api.val($api.byId('tel'));
	if(tel=='')
	{
		$toast("请输入手机号码", '2000');
		return false;			
	}
	else
	{
		open_w("reg1","reg1.html");
	}
}
var wait = 60;
function time()
{
	if(wait == 0)
	{
		$api.removeCls($api.byId('codetxt'), 'c-grac');
		$api.removeCls($api.byId('codetxt'), 't-gra2');
		$api.removeCls($api.byId('codetxt'), 'c-grac');
		$api.addCls($api.byId('codetxt'), 'c-e60012');
		$api.addCls($api.byId('codetxt'), 't-wh');
		$api.html($api.byId('codetxt'), '重新获取');
		wait = 60;
	}
	else
	{
		$api.addCls($api.byId('codetxt'), 'c-grac');
		$api.addCls($api.byId('codetxt'), 't-gra2');
		$api.addCls($api.byId('codetxt'), 'c-grac');
		$api.removeCls($api.byId('codetxt'), 'c-e60012');
		$api.removeCls($api.byId('codetxt'), 't-wh');
		$api.html($api.byId('codetxt'), "重新获取(" + wait + "s)");
		wait--;
		setTimeout(function() {time()}, 2000);
	}
}
function checkCode()
{
	open_w("reg2","reg2.html");
}
//修改密码
function pwd_edit(yuan_pwd, pwd, fu_pwd)
{
	show_doing();
	api.ajax(
	{
		url : serverURL+"app/action.php?type=pwd_edit&tel="+get_local('tel'),
		method : 'POST',
		timeout : '30',
		dataType : 'json',
		data : 
		{
			values:
			{
				yuan_pwd : yuan_pwd,
				pwd : pwd,
				fu_pwd : fu_pwd
			}
		}
	},
	function(ret, err)
	{
		hide_doing();
		if (ret)
		{
			if (ret.status==0)
			{
				$toast(ret.msg ,'3000');
			}
			else
			{
				$toast(ret.msg,'2000');
				close_w();
			}
		}
		else
		{
			$toast("网络开小差，检查后再试吧",toast_time);
			//$alert(json2str(err));
		};
	});
}
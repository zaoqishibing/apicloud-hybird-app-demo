function sdk_wx_reg()
{
	var weiXin = api.require('weiXin');
	weiXin.registerApp(
	    function(ret,err){
	        if (ret.status)
	        {
	            api.alert({msg:''+ret.status});
	        }
	        else
	        {
	            api.alert({msg:err.msg});
	        }
	    }
	);
}
function sdk_wx_share(scene,contentType,title,description,thumbUrl,contentUrl)
{
	//scene:session,timeline,favorite
	//contentType:text,image,music,video,web_page
	var weiXin = api.require('weiXin');
	weiXin.registerApp(
	    function(ret,err)
	    {
	        if (ret.status)
	        {
	        	weiXin.sendRequest(
	        	{
				    scene:scene,
				    contentType:contentType,
				    title:title,
				    description:description,
				    thumbUrl:thumbUrl,
				    contentUrl: contentUrl
				},
				function(ret,err)
				{
				    if(ret.status)
				    {
						$toast('发表成功');
				    } else
				    {
						$toast('发表失败');
				    };
				});
	        }
	        else
	        {
	        	$toast(err.msg);
	        }
	    }
	);
}
function sdk_wx_login(callback)
{
	var weiXin = api.require('weiXin');
	weiXin.registerApp(
	function(ret,err)
	{
		if (ret.status)
		{
			weiXin.auth(function(rets,errs)
			{ 
				if(ret.status)
				{
					if(is_define(callback))
					{
						callback(rets.token);
			    	}
			 	}
			 	else
			 	{
			    	$toast(errs.msg);
				}
			});
		}
		else
		{
			$toast(err.msg);
		}
	});	
}
function sdk_wx_get_userinfo()
{
	var obj = api.require('weiXin');
	obj.getUserInfo(function(ret,err)
	{
		if (ret.status)
	   	{
			$alert(json2str(ret));
		}
		else
		{
			$toast(err.msg);
		}
	});
}
function sdk_wx_pay()
{
	show_doing();
	api.ajax(
	{
		url : serverURL + "payment/weixin/source/app.php",
		method : 'POST',
		timeout : '30',
		dataType : 'json',
		returnAll : false,
		cache : true
	},
	function(ret, err)
	{
		if (ret)
		{
			var back_info = ret;
			var weiXin = api.require('weiXin');
			weiXin.registerApp(function(ret, err)
			{
				if (ret.status) 
				{
					weiXin.payOrder(
					{
						orderId : back_info.prepayid,
						partnerId : back_info.partnerid,
						nonceStr : back_info.noncestr,
						timeStamp : back_info.timestamp,
						package : back_info.package,
						sign : back_info.sign
					},function(ret, err)
					{
						hide_doing();
						if (ret.status)
						{
							$toast('支付成功');
						}
						else
						{
							$toast(err.msg, 3000);
						}
					});
				}
				else
				{
					hide_doing();
					$toast(err.msg,3000);
				}
			});
		}
		else
		{
			hide_doing();
			net_error();
		}
	});
}
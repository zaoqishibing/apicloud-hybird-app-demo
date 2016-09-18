
function sdk_qq_share_text(text)
{
	var obj = api.require('qq');
	obj.shareText(
	{
	    text:text
	},function(ret,err)
	{
		if(ret.status)
		{
			$toast('分享成功');
		}
		else
		{
			$toast('分享失败');
		}
	});
}
function sdk_qq_share_img(title,desc,pic)
{
	if(is_define(pic))
	{
		var imgPath=pic;
	}
	else
	{
		var imgPath="widget://icon/icon150x150.png";
	}
	var obj = api.require('qq');
	obj.shareImage(
	{
	    title:title,
	    description:desc,
	    imgPath:imgPath
	},function(ret,err)
	{
		if(ret.status)
		{
			$toast('分享成功');
		}
		else
		{
			$toast('分享失败');
		}
	});
}
function sdk_qq_share_url(url,pic,title,desc,type)
{
	if(is_define(type))
	{
		var type="QZone";
	}
	var obj = api.require('qq');
	obj.shareNews(
	{
	    url:url,
	    title:title,
	    description:desc,
	    imgPath:pic,
	    type:type
	},function(ret,err)
	{
		if(ret.status)
		{
			$toast('分享成功');
		}
		else
		{
			$toast('分享失败');
		}
	});
}
function sdk_qq_login(callback)
{
	var obj = api.require('qq');
	obj.login(
	function(ret,err)
	{
		if(ret.status)
		{
			if(is_define(callback))
			{
				callback(ret.openId,ret.accessToken)
			}
		}
	});
}
function sdk_qq_get_userinfo()
{
	var obj = api.require('qq');
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
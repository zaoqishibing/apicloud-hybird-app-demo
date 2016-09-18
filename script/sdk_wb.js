function sdk_wb_share_text(text)
{
	var weibo = api.require('weibo');
	weibo.shareText(
	{
	    text:text,
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
function sdk_wb_share_img(img,text)
{
//text小于140个字符
	if(!is_define(text))
	{
		var text="";
	}
	var weibo = api.require('weibo');
	weibo.shareImage(
	{
	    text:text,
	    imageUrl:img
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
function sdk_wb_share_url(title,img,url,text,desc)
{
//desc,title,小于1K
//text小于140个字符
//img一定小于32K
	if(!is_define(text))
	{
		var text="";
	}
	if(!is_define(desc))
	{
		var desc="";
	}
	var weibo = api.require('weibo');
	weibo.shareWebPage(
	{
	    text: text,
	    title: title,
	    description:desc,
	    thumb: img,
	    contentUrl:url
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
function sdk_wb_login(callback)
{
	var weibo=api.require('weibo');
	weibo.auth(function(ret,err)
	{
	    if (ret.status)
		{
	    	if(is_define(callback))
	    	{
				callback(ret.userId,ret.token);
	    	}
	    }
	    else
	    {
	    	$toast("登录失败");
	    }
	});
}
function sdk_wb_get_userinfo(userid,token)
{
	var weibo = api.require('weibo');
	weibo.getUserInfo(
	{
  		token:token,
  		userId:userid
	},function(ret,err)
	{
    	if (ret.status)
    	{
        	$alert(json2str(ret));
    	}
	});
}
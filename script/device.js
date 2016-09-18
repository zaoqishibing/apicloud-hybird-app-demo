//扫描
function d_scan(callback,sound)//c1为成功回调,c2为取消回调,c3为失败回调
{
	if(!is_define(sound))
	{
		var sound="";
	}
	var obj = api.require('FNScanner');
	obj.openScanner(
	{
	    sound:sound,
	    autoLight: true,
	    saveToAlbum: false,
	    saveImg: {
	        path: '',
	        w: 200,
	        h: 200
	    }
	}, function(ret) 
	{
	     if(ret)
	     {
	     	if(ret.eventType=="success")
	     	{
		        if(is_define(callback))
		        {
		        	callback(ret.content);
		       	}
			}
			else if(ret.eventType=="cancel")
			{
				$toast('取消扫码');
			}
			else if(ret.eventType=="fail")
			{
				$toast('扫码失败');
			}
	     }
	});
	return false;
}
//生成二维码或者条码，type=bar_image为条码,type=qr_image为二维码
function d_make_code(content,type,callback)
{
	if(!is_define(type))
	{
		var type="qr_image";
	}
	var obj = api.require('FNScanner');
	obj.encodeImg({
	    type:type,
	    content:content,
	    saveToAlbum: true
	},
	function(ret)
	{
	    if(ret.status)
	    {
	        if(is_define(callback))
	        {
	        	callback(ret.albumPath);
	        }
	        else
	        {
	        	$toast('生成成功，已经保存到相册');
	        }
	    }
	});
}
function d_card_credit()
{
	var obj = api.require('cardReader');
	obj.open(function(ret,err)
	{
	    if(ret.status)
	    {
	    	$alert(json2str(ret));
	    }
	    else
	    {
	        $toast("扫描失败");
	    }
	});
}
function d_set_clip(v)
{
	if(is_define(v))
	{
		var trip="复制到剪切板成功";
	}
	else
	{
		var trip="操作失败";
	}
	var obj = api.require('clipBoard');
	obj.set(
	{
	    value:v
	},
	function(ret, err)
	{
	    if(ret.status)
	    {
	    	$toast(trip);
	    }
	    else
	    {
	    	$toast('操作失败');
	    }
	});
}
function d_get_clip(callback)
{
	var obj = api.require('clipBoard');
	obj.get(function(ret, err)
	{
		if(ret.value&&is_define(callback))
		{
			callback(ret.value);
		}
	});
}
function d_start_record()
{
	api.startRecord();
	var html="<div id='voice_record_button' onclick=d_end_record(d_play_voice) class='w30e h30e area_auto tx-c uc-a03 c-999 pd10'><img src='../image/icon/sdk/microphone.png' class='w30e h30e'></div>";
	$("body").append(html);
}
function d_end_record(callback)
{
	$("#voice_record_button").remove();
	api.stopRecord(function(ret,err)
	{
        if (ret)
        {
        	callback(ret.path);
        }
    });
}
function d_play_voice(path,callback)
{
	api.startPlay(
	{
    	path:path
	},function()
	{
		callback('播放完成');
	});
}
function d_play_video(path)
{
	api.openVideo(
	{
    	url:path
	});
}
//监听摇一摇
function d_shake(callback)
{
	api.addEventListener(
	{
    	name:'shake'
	},function(ret,err)
	{
		if(is_define(callback))
		{
			callback();
		}
	});
}
//打开联系人
function d_contact(callback)
{
	api.openContacts
	(
	    function(ret,err)
	    {
	        if(ret.status)
	        {
	        	if(is_define(callback))
	        	{
	        		callback(ret.name,ret.phone);
	        	}
	        }  
	    }
	);
}
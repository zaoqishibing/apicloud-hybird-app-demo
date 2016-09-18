//城市选择
function list_city()
{
	open_w('list_city','../pub_html/list_city.html');
}
//三级联动选择区域
function select_area(callback)
{
	var obj = api.require('citySelector');
	obj.open(
	{
		anim:true
	},function(ret,err)
	{
		if(is_define(callback))
		{
			callback(ret.province+"|"+ret.city+"|"+ret.county);
		}
	});
	obj.show({anim:true});
}
//打开日历选择
function list_date()
{
	open_w('list_date','../pub_html/list_date.html');
}
//选择开始结束时间
function time_start_end(callback)
{
	var obj = api.require('periodSelector');
	obj.open({
	    x: 0,
	    y:api.winHeight-200,
	    w:api.winWidth,
	    h:200
	}, function(ret,err)
	{
		alert(json2str(ret));
		if(is_define(callback))
		{
			callback(ret.sHour+":"+ret.sMinute,ret.eHour+":"+ret.eMinute);
		}
	});
}
//图像浏览
function view_img(img_arr,index) {
	if(!is_define(index))
	{
		var index=0; 
	}
	var obj = api.require('imageBrowser');
	obj.openImages(
	{
		imageUrls:img_arr,
		showList:false,
		activeIndex:index
	});
}
//多级非联动选择
function more_select(callback)
{
	var over_select_html='<div id="over_select_button" tapmode="" class="tx-r tx-r pstnf absl0 c-999 w10 absb0" style="background-color:#f0f1f2;height:140px;"><p class="pdr05 ubb ubt ub-999 umh2">完成</p></div>';
	api.parseTapmode();
	var obj = api.require('UICustomPicker');
	obj.open(
	{
	    rect:
	    {
			x: 0,
			y: api.frameHeight-108, 
			w: api.frameWidth, 
			h: 108 
		},
	    styles:
	    {
	        bg: '#d2d5db',
	        normalColor: '#000',
	        selectedColor: '#333',
	        selectedSize: 36,
	        tagColor: '#3685dd',
	        tagSize: 14
	    },
	    data:[{
	        tag: '时',
	        scope: '0-23'
	    },{
	        tag: '分',
	        scope:['0','10','20','30','40','50']
	    }],
	    rows: 3,
	    autoHide:false,
	    fixedOn:api.frameName,
	    fixed: true
	},function(ret, err)
	{
		if(ret.eventType=='show')
		{
			$("body").append(over_select_html);
	    	$("#over_select_button").bind("click",function(){$("#over_select_button").remove();obj.close({id:ret.id});api.parseTapmode();});
		}
	    else if(ret.eventType=='selected')
	    {
	    	if(is_define(callback))
	    	{
	    		callback(ret.data);
	    	}
	    }
	});
}
function close_more_select()
{
	$("#over_select_button").remove();
	var obj = api.require('UICustomPicker');
	obj.close({id:0});
}
function shake_view()
{
	open_w('shake_view','../pub_html/shake_view.html');
}
function img_share()
{
	api.openFrame({
		name : 'img_share',
		url : '../pub_html/img_share.html',
		rect : {
			x : 0,
			y : 0,
			w : 'auto',
			h :'auto',
		},
		bounces : false,
		allowEdit : true,
		bgColor : 'rgba(0,0,0,0.5)',
		vScrollBarEnabled : true,
		hScrollBarEnabled : true,
		reload : false
	});
}
function open_drag_layer()
{
	var $header = $api.dom('#header');
	$api.fixIos7Bar($header);
	var header_h = $api.offset($header).h+50;
	api.openFrame({
		name : 'drag_layer',
		url : '../pub_html/drag_layer.html',
		rect : {
			x : 0,
			y : header_h,
			w : 'auto',
			h :'auto',
		},
		bounces : false,
		allowEdit : true,
		bgColor : 'rgba(0,0,0,0)',
		vScrollBarEnabled : true,
		hScrollBarEnabled : true,
		reload : false
	});
}
function open_drag_layer_c(h)
{
	var $header = $api.dom('#header');
	$api.fixIos7Bar($header);
	var header_h = $api.offset($header).h+parseInt(h)+50;
	api.openFrame({
		name : 'drag_layer_c',
		url : '../pub_html/drag_layer_c.html',
		rect : {
			x : 0,
			y : header_h,
			w : 'auto',
			h :'auto',
		},
		opaque : true,
		bounces : true,
		allowEdit : true,
		bgColor : '#ffffff',
		vScrollBarEnabled : true,
		hScrollBarEnabled : true,
		reload : false
	});
}
function set_drag_layer(h)
{
	var $header = $api.dom('#header');
	$api.fixIos7Bar($header);
	var header_h = $api.offset($header).h+parseInt(h)+50;
	api.setFrameAttr(
	{
		name: 'drag_layer',
		rect:
		{
			x:0,
			y:header_h,
			w:'auto',
			h:'auto'
		}
	});
}
function set_drag_layer_c(h)
{
	//console.log(h);
	var $header = $api.dom('#header');
	$api.fixIos7Bar($header);
	var header_h = $api.offset($header).h+parseInt(h)+50;
	api.setFrameAttr(
	{
		name: 'drag_layer_c',
		rect:
		{
			x:0,
			y:header_h,
			w:'auto',
			h:'auto'
		},
		bounces: true,
		bgColor: '#fff',
		vScrollBarEnabled:true,
		hScrollBarEnabled:true
	});
}
function drag_an(h)
{
	return false;
	api.animation (
	{
	    name: 'drag_layer',
	    delay: 0,
	    duration: 500,
	    curve: 'ease_in',
	    repeatCount: 0,
	    autoreverse: false,
	    translation:
	    {
	        x: 0,
	        y: h
	    }
	}, function()
	{
	    //api.alert({msg: '动画结束'});
	});
	api.animation (
	{
	    name: 'drag_layer_c',
	    delay: 0,
	    duration: 500,
	    curve: 'ease_in',
	    repeatCount: 0,
	    autoreverse: false,
	    translation:
	    {
	        x: 0,
	        y: h
	    }
	}, function()
	{
	    //api.alert({msg: '动画结束'});
	});
}
function select_area_self(callback)
{
	var over_select_html='<div id="over_select_button" onclick="close_select_area_self()" tapmode="" class="umh15 tx-r tx-r pstnf absl0 umh2 c-999 w10 ubt" style="bottom:120px;background-color:#f0f1f2;border-color:#929599"><p class="pdr05">完成</p></div>';
	$("body").append(over_select_html);
	api.parseTapmode();
	api.ajax(
	{
		url : serverURL + "three_select.php",
		method : 'POST',
		timeout : '30',
		dataType : 'json'
	},function(ret, err)
	{
		if (ret)
		{
			var obj = api.require('UILinkedPicker');
			obj.open(
			{
				rect:{
					x: 0,
					y: api.frameHeight-120, 
					w: api.frameWidth, 
					h: 120  
				},
				styles:
				{
					bg: '#d2d5db',  
					text:
					{                  
						size: 14,             
						selected: '#999',     
						normal: '#333'        
					},
					item:
					{                   
						w: parseInt(api.frameWidth/3),                
						h: 24,                
						normal: 'rgba(0,0,0,0)',    
						selected: 'rgba(0,0,0,0)',  
						zoomIn: 1.2        
		            }
				},
				rows:5,
				indexs:[0,0,0],
				bounce:true,
				fixedOn:api.frameName,
				fixed:true,
				data:ret
			}, function(ret) 
			{
				if(is_define(callback))
				{
					callback(json2str(ret));
				}
			});
		}
		else
		{
			net_error();
		};
	});
}
function close_select_area_self()
{
	$("#over_select_button").remove();
	var obj = api.require('UILinkedPicker');
	obj.hide();
}
function select_img_more(callback)
{
	var obj = api.require('UIMediaScanner');
	obj.open({
	    type:'picture',
	    column: 4,
	    classify: true,
	    max: 9,
	    sort: {
	        key: 'time',
	        order: 'desc'
	    },
	    texts: {
	        stateText: '已选择*项',
	        cancelText: '取消',
	        finishText: '完成'
	    },
	    styles: {
	        bg: '#fff',
	        mark: {
	            icon: '',
	            position: 'bottom_left',
	            size: 20
	        },
	        nav: {
	            bg: '#eee',
	            stateColor: '#000',
	            stateSize: 18,
	            cancelBg: 'rgba(0,0,0,0)',
	            cancelColor: '#000',
	            cancelSize: 18,
	            finishBg: 'rgba(0,0,0,0)',
	            finishColor: '#000',
	            finishSize: 18
	        }
	    }
	},function(ret)
	{
	    if(ret)
	    {
	    	for(i=0;i<ret.list.length;i++)
	    	{
	    		alert(ret.list[0].thumbPath);
	    	}
	    }
	});
}
function bottom_action_button()
{
	var obj = api.require('actionButton');
	obj.open(
	{
		bg:"rgba(0,0,0,0.5)",
		size:60,
		items:[{bgColor:'#00CED1',title:'朋友圈',image:'widget://image/icon/default_face.png'},
	        {bgColor:'#FFC0CB',title:'微信好友',image:'widget://image/icon/default_face.png'},
	        {bgColor:'#DB7093',title:'腾讯微博',image:'widget://image/icon/default_face.png'},
	        {bgColor:'#DB7093',title:'新浪微博',image:'widget://image/icon/default_face.png'},
	        {bgColor:'#7FFF00',title:'短信',image:'widget://image/icon/default_face.png'}],
	    matrix:{row:1,column:5,bottomMargin:0},
	    pageControl:{activeColor:'#778899',inactiveColor:'#DDA0DD'}
	},function(ret,err)
	{
	    api.alert({msg:ret.index});
	});
}
function search_bar(callback)
{
	var obj = api.require('UISearchBar');
	obj.open({
	    placeholder: '请输入搜索关键字',
	    historyCount: 10,
	    showRecordBtn: true,
	    texts: {
	        cancelText: '取消',
	        clearText: '清除搜索记录'
	    },
	    styles: {
	        navBar: {
	            bgColor: '#FFFFFF',
	            borderColor: '#ccc'
	        },
	        searchBox: {
	            bgImg: '',
	            color: '#000',
	            height: 32
	        },
	        cancel: {
	            bg: 'rgba(0,0,0,0)',
	            color: '#D2691E',
	            size: 16
	        },
	        list: {
	            color: '#696969',
	            bgColor: '#FFFFFF',
	            borderColor: '#eee',
	            size: 16
	        },
	        clear: {
	            color: '#000000',
	            borderColor: '#ccc',
	            size: 16
	        }
	    }
	},function(ret)
	{
		if(is_define(callback))
		{
			if(ret.eventType=='search'||ret.eventType=='history')
			{
				callback(ret.text);
			}
		}
	});
}
function touch_id(callback_s,callback_e)
{
	var obj = api.require('touchID');
	obj.verify(
	function(ret,err){
	    if(ret.status)
	    {
	    	if(is_define(callback_s))
	    	{
	        	callback_s();
	        }
	    }
	    else
	    {
	    	if(is_define(callback_e))
	    	{
		        if(ret.index==0)//手动输入密码
		        {
		        	callback_e();
		        }
		        else if(ret.index==1)//用户取消验证
		        {
		        }
		        else if(ret.index==2)//验证三次失败
		        {
		        	callback_e();
		        }
		        else if(ret.index==3)//多长验证失败请锁定手机
		        {
		        	callback_e();
		        }
		        else
		        {
		            callback_e();
		        }
			}
	    }
	});
}
function lock_screen(is_modify)
{
	if(get_os()=="ios")
	{
		if(!is_define(is_modify))
		{
			var is_modify=0;
		}
		api.openWin(
		{
		    name: 'lock_screen',
		    slidBackEnabled:false,
		    url: 'widget://pub_html/lock_screen.html',
		    pageParam:{is_modify:is_modify}
		});
	}
	else
	{
		if(is_define(get_local("lock_pass")))
		{
			if(is_define(is_modify))//修改密码
			{
				var screenLock = api.require('screenLock');
				screenLock.show(
				{
					color:'#000000'
				},
				function(ret,err)
				{
					if(ret.status==111)
					{
						screenLock.set(
						{
							color:'#000000'
						},
						function(ret,err)
						{
							if(ret.status==111)
							{
								set_local("lock_pass","coolfull");
							}
						});
					}
				});
			}
			else//验证密码
			{
				var screenLock = api.require('screenLock');
				screenLock.show(
				{
					color:'#000000'
				},
				function(ret,err)
				{
					api.alert({msg:''+ret.status});
				});
			}
		}
		else//设置密码
		{
			var screenLock = api.require('screenLock');
			screenLock.set(
			{
				color:'#000000'
			},
			function(ret,err)
			{
				if(ret.status==111)
				{
					set_local("lock_pass","coolfull");
				}
			});
		}
	}
}
function bottom_comment(callback)
{
	var obj = api.require('inputField');
	obj.open(
	{
		bgColor:'#23aec3',
		lineColor:'#f2f2f2',
		fileBgColor:'#ffffff',
		borderColor:'#f2f2f2',
		placeholder:'请输入评论内容',
		maxLines:5,
		sendImg:'widget://image/sdk/send_bg.png'
	},function(ret,err)
	{
		if(is_define(ret.msg)&&is_define(callback))
		{
			callback(ret.msg);
			obj.close();
		}
		else
		{
			$toast('请输入评论内容');
		}
	})
}
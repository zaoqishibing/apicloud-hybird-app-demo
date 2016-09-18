

/*
 * 通用打开窗口  
 * winname 窗口名字
 * winurl 窗口地址
 */
function comOpenWin(winname,winurl){
	
	api.openWin({
	    name: winname,
	    url: winurl,
	    animation:{
	    	type:"none", 
	    	duration:300  
	    }
    });
}


/*
 * 通用打开Frame  
 * framename Frame名字
 * frameurl Frame地址
 */
function comOpenFrame(framename,frameurl){
		var header = $api.byId('header');
		var headerPos = $api.offset(header);
		var bodyHeight = window.innerHeight;
		api.openFrame({
			name : framename,
			url : frameurl,
			bounces : false,
			vScrollBarEnabled : false,
			rect : {
				x : 0,
				y : headerPos.h,
				w : 'auto',
				h : bodyHeight - headerPos.h
			}
		});
}

/*
 * 页面清扫返回
 * 需放在apiready
 */
function GoBack(winname) {
	api.addEventListener({name : 'swiperight'}, function(ret, err) {
		api.closeWin({name: winname});
	});
}


/*
 * 数据库操作
 * 
 */


function ExecuteSql(sqlname, sql,callback) {
	var db = api.require('db');
	db.executeSql({
		name : sqlname,
		sql : sql
	}, function(ret, err) {
		if (ret.status) {
		if(typeof callback == 'function'){
		callback();
			}
		} else {
			api.alert({
	            msg:err.msg
            });
		}
	});
}


function SelectSql(sqlname,sql,callback) {
	var db = api.require('db');
	db.selectSql({
		name : sqlname,
		sql : sql
	},function(ret, err) {
		if (ret.status) {
			var data = ret.data;
			if(typeof callback == "function"){
				callback(data);
			}
		//	api.alert({
		//	msg:JSON.stringify(data)
       //});
		//
		} else {
			api.alert({
			msg:err.msg
            }
            );
		};
	});
}

// var a=SelectSql();


function CreateDB(dbname,dburl,callback) {
	var db = api.require('db');
//	var dbpath='fs://'+dbname+'.db';
	db.openDatabase({
		name : dbname,
		path :dburl
	}, function(ret, err) {
		if (ret.status) {
		if(typeof callback == 'function'){
				callback();
			}
			api.alert({
	        	 msg:'数据库打开成功'
            });
		} else {
			api.alert({
	            msg:JSON.stringify(err.msg)
            });
		}
	});

}
/*
 * 文件移动
 */
function FsMoveTo(oldurl,newurl){
	var fs = api.require('fs');
fs.moveTo({
    oldPath: oldurl,
    newPath: newurl
},function(ret,err){
    var status = ret.status;
    if (status) {
        api.alert({msg:'移动文件成功'});
    }else {
        api.alert({msg:err.msg});
    };
});
}
//远程图片本地缓存  
function  remote_imageCache(url,callback){
api.imageCache({
    url: url
},function(ret,err){
    if (ret) {
        var local_path = ret.url;
       // alert(local_path);
    }
    if(typeof callback == 'function'){
    callback();
    }
});
}

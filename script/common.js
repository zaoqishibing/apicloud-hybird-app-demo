
//备注一下吧  ************************非常重要，需要将里边的参数改成自己的参数*///////通用方法  mcm 数据库的请求 
function ajaxRequest(url, method, bodyParam, callBack) {
    var common_url = 'https://d.apicloud.com/mcm/api'; //宿舍楼  连接到云端  通用 URL
    var appId = 'A6995045649271'; //门
    var key = 'C9C29F89-BCCD-501A-F46D-137CAB6FC4B4'; //钥匙
    var now = Date.now();
    var appKey = SHA1(appId + "UZ" + key + "UZ" + now) + "." + now;
    //用到了 api.ajax  请求   
    api.ajax({
        url: common_url + url, // 把url注册登录的值传进来
        method: method,//把method 值传进来
        cache: true, //是否缓存
        timeout: 20, //超时时间
        //头部信息
        headers: {
            "Content-type": "application/json;charset=UTF-8",//内容类型
            "X-APICloud-AppId": appId,//app的序列号
            "X-APICloud-AppKey": appKey //app的钥匙
        },																					
        data: {
            body: bodyParam //传入变量的值 字符串类型
        }
    }, function (ret, err) {
        callBack(ret, err);
    });
}
//***********************************************************************---------------------------------------------------------------------------
		//对连接融云、重连、监听被挤下线提示是否重连进行封装
var chatRoomVoicePath = "fs://media/chatroom/voice_room.amr";//聊天室语音路径
var chatContactVoicePath = "fs://media/chatroom/voice_contact.amr";//单聊语音路径
var chatRoomCacheFilePath = "fs://cache/chatroom/ujiaoyichatroom.json";//聊天室缓存路径
var privateChatMsgPath = "fs://cache/privatechat/contactmsg.json";//消息用户列表缓存
//删除文件
function removefile(path,callback){
        var fs = api.require('fs');
        fs.remove({
                path: path
        },function(ret,err){
                if(typeof(callback)=="function") callback(ret,err);
        });
}
//滑动到底部
function pageDown(time) {
    setTimeout(function () {
        api.pageDown({bottom: true, animate: true}, function (ret) {
        });
    }, time || 0)
}
/*********************************************************************融云相关操作 start****************************************************************************************/
/**
* 融云转换code --> message,消息
*/
function errcode2msg(errCode) {
    switch (errCode) {
        case -9:
            errMsg = '断开连接';
            break;
        case -2:
            errMsg = '发送处理失败';
            break;
        case -1:
            errMsg = '未知错误';
            break;
        case 1:
            errMsg = '网络不可用';
            break;
        case 2:
            errMsg = '连接中';
            break;
        case 6:
            errMsg = '用户账户在其他设备登录，本机会被踢掉线';
            break;
        case 7:
            errMsg = '用户账户在 Web 端登录';
            break;
        case 405:
            errMsg = '在黑名单中';
            break;
        case 2002:
            errMsg = '数据包不完整，请求数据包有缺失';
            break;
        case 2003:
            errMsg = '服务器不可用';
            break;
        case 2004:
            errMsg = '错误的令牌（Token），Token 解析失败，请重新向身份认证服务器获取 Token';
            break;
        case 2005:
            errMsg = '可能是错误的 App Key，或者 App Key 被服务器积极拒绝';
            break;
        case 2006:
            errMsg = '服务端数据库错误';
            break;
        case 3001:
            errMsg = '服务器超时';
            break;
        case 5004:
            errMsg = '服务器超时';
            break;
        case -10000:
            errMsg = '未调用 init 方法进行初始化';
            break;
        case -10001:
            errMsg = '未调用 connect 方法进行连接';
            break;
        case -10002:
            errMsg = '输入参数错误';
            break;
        case 0:
            errMsg = '连接成功';
            break;
    }
    return errMsg;
};
 	
//处理消息附件内容  昵称、头像等内容
function transExtra(arg) {
    var result = '';
    try {
        result = eval('(' + arg + ')');
    } catch (e) {
        result = arg.slice(1, -1);
    } finally {
    }
    return result;
}


/*自定义 和融云通信的 ajax 方法.  */
function ajaxToRongCloud(appKey, appSecret, userId, name, portraitUri, callback) {
	/* 引入hash加密算法库 */
	/* sha1 加密 */
	function sha1(str) {
		/* 使用github上的一个开源 JS 加密库 进行 sha1 加密.
		 项目地址: https://github.com/h2non/jshashes
		 */
		var sha1Val = new Hashes.SHA1().hex(str);
		return sha1Val;
	}
	// -----------------------------------------------
	var appKey = appKey;
	var appSecret = appSecret;
	var nonce = Math.floor(Math.random() * 1000000000);
	var timestamp = Date.now();
	var signature = sha1("" + appSecret + nonce + timestamp);
	var userId = userId;
	var name = name;
	var portraitUri = portraitUri;
	var url = "https://api.cn.rong.io/user/getToken.json";
	api.ajax({
		url : url,
		method : "post",
		headers : {
			"RC-App-Key" : appKey,
			"RC-Nonce" : "" + nonce,
			"RC-Timestamp" : "" + timestamp,
			"RC-Signature" : "" + signature,
			"Content-Type" : "application/x-www-form-urlencoded"
		},
		data : {
			values : {
				userId : userId,
				name : name,
				portraitUri : portraitUri
			}
		}
	}, function(ret, err) {
		if ("function" == typeof callback) {
			callback(ret, err)
		}
	});
}
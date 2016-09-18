function sdk_face_obtainLogin(){
   var superID = api.require('superID');
   superID.registerApp();
}

function sdk_face_login(callback)
{
	var superID = api.require('superID');
	superID.obtainLoginView(
	function(ret,err)
	{
		alert(json2str(err));
		$alert(json2str(ret));
	});
}
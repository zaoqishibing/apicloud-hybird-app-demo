/*聊天对象*/
var uiChatObject = {
    sourcePath:"widget://image/chatBox/emotion/emotion.json",/* 表情默认源文件.*/
   	imagePath:"widget://image/chatBox/emotion",//表情默认所在路径
    emotionData:[],
    //将文字中的表情符号翻译成图片,并可自定义图片尺寸.
    transTextToImag:function(text, imgWidth, imgHeight){
        if(!text) return;
        var imgWidth = imgWidth || 30;
        var imgHeight = imgHeight || 30;
        var regx= /\[(.*?)\]/gm
        var textTransed = text.replace(regx,function(match){
			var imgSrc = uiChatObject.emotionData[match];
			if(!imgSrc){ /* 说明不对应任何表情,直接返回即可.*/
				return match;
			}
			var img = "<img src='" + imgSrc+ "' width='" + imgWidth +  "' height ='" + imgHeight +"' />";
			return img;
		});
		return textTransed;
    },
    transText:function(text, imgWidth, imgHeight){
        if(!text) return;
        var imgWidth = imgWidth || 30;
        var imgHeight = imgHeight || 30;
        var regx= /\[(.*?)\]/gm
        var textTransed = text.replace(regx,function(match){
			var imgSrc = uiChatObject.emotionData[match];
			if(!imgSrc){ /* 说明不对应任何表情,直接返回即可.*/
				return match;
			}
			return imgSrc;
		});
		return textTransed;
    },
    //一个工具方法: 可以获取 所有表情图片的名称和真实url地址,
    //以JSON对像形式返回;其中以表情文本为 属性名, 以图片真实路径为属性值
    init:function(){
        if(uiChatObject.emotionData.length<1){
            api.readFile({
                path: uiChatObject.sourcePath
            }, function(ret, err){
                if(ret.status){
                    var emotionArray = JSON.parse(ret.data);
                    var emotion = {};
                    for(var idx in emotionArray){
                        var emotionItem = emotionArray[idx];
                        var emotionText = emotionItem["text"];
                        var emotionUrl = uiChatObject.imagePath+"/" + emotionItem["name"] + ".png";
                        emotion[emotionText] = emotionUrl;
                    }
                    uiChatObject.emotionData = emotion;
                }
            });
        }else{
            uiChatObject.emotionData = [];
        }
    }
};

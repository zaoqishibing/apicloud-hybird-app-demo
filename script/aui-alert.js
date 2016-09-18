/*
 * AUI JAVASCRIPT PLUGIN
 * 自定义弹出层
 * v 0.0.1
 * Copyright (c) 2015 auicss.com @流浪男  QQ：343757327  群：344869952
 */
(function(window) {
	var aui = {};
	aui.isElement = function(obj) {
		return !!(obj && obj.nodeType == 1);
	};
	aui.alert = function(opts, callback) {
		var width = 80, title = '', tag = [], content = '', radius = 0, buttons = [], titleColor = '#333', contColor = '#333', btnColor = '#007aff';
		var _setting = function() {
			width = opts.width ? opts.width : width;

			title = opts.title ? opts.title : title;
			tag = opts.tag ? opts.tag : tag;
			content = opts.content ? opts.content : content;
			radius = opts.radius ? opts.radius : radius;
			buttons = opts.buttons ? opts.buttons : buttons;
			titleColor = opts.titleColor ? opts.titleColor : titleColor;
			contColor = opts.contColor ? opts.contColor : contColor;
			btnColor = opts.btnColor ? opts.btnColor : btnColor;
		}
		var _init = function() {
			if (api.winName == 'root' && !api.frameName) {
				frmUrl = 'html/aui_alert_frm.html';
			} else {
				frmUrl = 'aui_alert_frm.html';
			}
			api.openFrame({
				name : 'aui_alert_frm',
				url : frmUrl,
				rect : {
					x : 0,
					y : 0,
					w : 'auto',
					h : 'auto'
				},
				pageParam : {
					width : width,

					title : title,

					tag : tag,
					content : content,
					radius : radius,
					buttons : buttons,
					titleColor : titleColor,
					contColor : contColor,
					btnColor : btnColor
				},
				bounces : false,
				vScrollBarEnabled : false,
				hScrollBarEnabled : false
			})
			api.addEventListener({
				name : 'auiAlertEvent'
			}, function(ret) {
				if (ret) {
					callback('' + ret.value.buttonIndex + '');
					
					/*setTimeout(function(){
					 callback(''+ret.value.buttonIndex+'');
					 },150)*/
				}
			});
		}
		_setting();
		_init();

	}
	window.$aui = aui;

})(window);


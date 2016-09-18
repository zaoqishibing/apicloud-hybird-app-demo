function sdk_zfb_pay()
{
	api.ajax(
	{
		url : serverURL + "payment/alipay/app.php",
		method : 'POST',
		timeout : '30',
		dataType : 'json',
		returnAll : false,
		cache : true
	}, function(ret, err)
	{
		if(ret)
		{
			var obj = api.require('aliPay');
			obj.pay(
			{
				subject:ret.subject,
				body:ret.body,
				amount:ret.money,
				tradeNO:ret.order_sn
			},
			function(ret, err)
			{
				hide_doing();
				if (ret.code==9000)
				{
					$toast('支付成功');
				}
				else
				{
					$toast('支付失败，请重试');
				}
			});
		}
		else
		{
			hide_doing();
			net_error();
		}
	});
}
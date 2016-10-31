<!doctype html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
<title>网页标题</title>
</head>
<body>
<div>ddd</div>
</body>
<?php	
	
	// 公众号 APPID 和 APPSECRET
	define('APPID', '');
	define('APPSECRET', '');
    
	include("jssdk_set/jssdk_set.php");
?>
<script>

	// 分享信息
	var aShareInfo = [ 
		'分享到朋友圈的标题', //分享到朋友圈的标题
        'https://github.com/samoyi/WechatShare', //分享到朋友圈的链接
        'https://avatars2.githubusercontent.com/u/14341150?v=3&s=460', //分享到朋友圈的图标地址
        '分享给朋友的标题', //分享给朋友的标题
        '分享给朋友的描述', //分享给朋友的描述
        'https://github.com/samoyi/WechatShare', //分享给朋友的链接
        'https://avatars2.githubusercontent.com/u/14341150?v=3&s=460' //分享给朋友的图标地址
	];
	
	var invokeWechatAPI = new InvokeWechatAPI();
	wx.ready(function ()
	{
		// ready之后立刻调用的接口写在这里，之后再调用的可以写在外面
		invokeWechatAPI.onMenuShareAppMessage(aShareInfo[3], aShareInfo[4], aShareInfo[5], aShareInfo[6]);
	});
</script>
</html>
   
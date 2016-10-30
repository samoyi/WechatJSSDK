<!doctype html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
<title>网页标题</title>
</head>
<body>

</body>
<script src="jssdk_set/APIInvoking.js"></script>
<script>

aJSSDKAPI = [
		'onMenuShareTimeline', // 分享到朋友圈
      	'onMenuShareAppMessage',  // 分享给朋友
      	'getLocation', // 获取用户坐标 
];



	// 分享信息，七项数组
	var aShareInfo = [ 
		'分享到朋友圈的标题1', //分享到朋友圈的标题
        'https://github.com/samoyi/WechatShare', //分享到朋友圈的链接
        'https://avatars2.githubusercontent.com/u/14341150?v=3&s=460', //分享到朋友圈的图标地址
        '分享给朋友的标题2', //分享给朋友的标题
        '分享给朋友的描述', //分享给朋友的描述
        'https://github.com/samoyi/WechatShare', //分享给朋友的链接
        'https://avatars2.githubusercontent.com/u/14341150?v=3&s=460' //分享给朋友的图标地址
	];
	
	var invokeWechatAPI = new InvokeWechatAPI();
	
	
	document.addEventListener("touchend", function()
	{	
		invokeWechatAPI.chooseImage();
		invokeWechatAPI.onMenuShareTimeline(aShareInfo[0], aShareInfo[1], aShareInfo[2]);
		invokeWechatAPI.onMenuShareAppMessage(aShareInfo[3], aShareInfo[4], aShareInfo[5], aShareInfo[6]);
	});
</script>
<?php	
	

	// 公众号 APPID 和 APPSECRET
	define('APPID', '');
	define('APPSECRET', '');


	// 根据事件延迟设置分享信息（可选）	
	// 默认表示页面加载后即设置，可以设置为在某个对象上触发了某个事件之后再设置上面的分享信息。
	// 不能设为window.onload以及之前的事件，因为有时在绑定的时候已经发生了该事件
	$setShareEventObjectID = ''; //在该ID对象上触发 $setShareEventType 事件时才设置上述分享内容。
    $setShareEventType = ''; // 在以 $setShareEventObjectID 为ID的对象上触发该事件类型时才设置上述分享内容。
    

	include("jssdk_set/jssdk_set.php");
?>
</html>
   
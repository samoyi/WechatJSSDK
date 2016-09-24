<!doctype html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
<title>网页标题</title>
</head>
<body>

</body>
<?php	
	

	// 公众号 APPID 和 APPSECRET
	define('APPID', 'your APPID');
	define('APPSECRET', 'your APPSECRET');


	// 分享信息
	$shareInfo = array
	(
		'WechatShareTimelineTitle' => '分享到朋友圈的标题', //分享到朋友圈的标题
        'WechatShareTimelineLink' => 'https://github.com/samoyi/WechatShare', //分享到朋友圈的链接
        'WechatShareTimelineImgURL' => 'https://avatars2.githubusercontent.com/u/14341150?v=3&s=460', //分享到朋友圈的图标地址

        'WechatShareAppMessageTitle' => '分享给朋友的标题', //分享给朋友的标题
        'WechatShareAppMessageDesc' => '分享给朋友的描述', //分享给朋友的描述
        'WechatShareAppMessageLink' => 'https://github.com/samoyi/WechatShare', //分享给朋友的链接
        'WechatShareAppMessageImgURL' => 'https://avatars2.githubusercontent.com/u/14341150?v=3&s=460' //分享给朋友的图标地址
	);


	// 根据事件延迟绑定
	// 默认表示页面加载后即设置。
	// 不能设为window.onload以及之前的事件，因为有时在绑定的时候已经发生了该事件
	$setShareEventObjectID = ''; //在该ID对象上触发 $setShareEventType 事件时才设置上述分享内容。
    $setShareEventType = ''; // 在以 $setShareEventObjectID 为ID的对象上触发该事件类型时才设置上述分享内容。
    

	include("WechatShare/WechatShareSet.php");
?>
</html>
   
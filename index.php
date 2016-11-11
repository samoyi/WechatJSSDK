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
	define('APPID', '');
	define('APPSECRET', '');
    
	include("jssdk_set/jssdk_set.php");
?>
<script>

	
	var invokeWechatAPI = new InvokeWechatAPI();
	wx.ready(function ()
	{
		// ready之后立刻调用的接口写在这里，之后再调用的可以写在外面	
		
	});
</script>
</html>
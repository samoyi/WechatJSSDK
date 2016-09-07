<?php
    

?>
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
	
	$name = "hongfangzi";

	require_once "jssdk.php";
	$info = json_decode( file_get_contents("mpInfo.json") );
	
	$infoArr = $info->$name;
	var_dump($infoArr );
    $jssdk = new JSSDK($infoArr[0], $infoArr[1]);//初始化修改。修改为需要的微信公众好的AppID和AppSecret
    $signPackage = $jssdk->GetSignPackage();
	echo '<script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>';
	include("WechatShare.php");
?>

</html>
   
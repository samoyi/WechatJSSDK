<?php

    require "jssdk.php";
    $jssdk = new JSSDK(APPID, APPSECRET);
    $signPackage = $jssdk->GetSignPackage();

    echo '<script src="http://res.wx.qq.com/open/js/jweixin-1.2.0.js"></script>';
	echo '<script src="jssdk_set/ArgumentsTypeCheckerForWechat.js"></script>';
	echo '<script src="jssdk_set/APIInvoking.js"></script>';

?>


<script>

wx.config(
{
    debug: <?php echo json_encode(WECHAT_DEBUG); ?>, 
    appId: '<?php echo $signPackage["appId"];?>',
    timestamp: <?php echo $signPackage["timestamp"];?>, // TODO 这一行如果放在JS文件中会报错，但放在php文件中的script标签中不会报错
    nonceStr: '<?php echo $signPackage["nonceStr"];?>',
    signature: '<?php echo $signPackage["signature"];?>',
    jsApiList:
    [
      // 所有要调用的 API 都要加到这个列表中
      'onMenuShareTimeline',
      'onMenuShareAppMessage',
	  'onMenuShareQQ',
	  'onMenuShareQZone',
	  'chooseImage',
	  'previewImage',
	  'uploadImage',
	  'downloadImage',
	  'startRecord',
	  'stopRecord',
	  'onVoiceRecordEnd',
	  'playVoice',
	  'pauseVoice',
	  'stopVoice',
	  'onVoicePlayEnd',
	  'uploadVoice',
	  'downloadVoice',
	  'translateVoice',
	  'getNetworkType',
	  'openLocation',
      'getLocation',
	  'startSearchBeacons',
	  'stopSearchBeacons',
	  'onSearchBeacons',
	  'hideOptionMenu',
	  'showOptionMenu',
	  'closeWindow',
	  'hideMenuItems',
	  'showMenuItems',
	  'hideAllNonBaseMenuItem',
	  'showAllNonBaseMenuItem',
	  'scanQRCode',
	  'openProductSpecificView',
	  'chooseCard',
	  'addCard',
	  'openCard',
	  'consumeAndShareCard',
	  'chooseWXPay'
    ]
});




</script>

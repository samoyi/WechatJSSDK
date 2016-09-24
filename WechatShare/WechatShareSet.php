<?php

    require_once "jssdk.php";

    $jssdk = new JSSDK(APPID, APPSECRET);//初始化修改。修改为需要的微信公众好的AppID和AppSecret
    $signPackage = $jssdk->GetSignPackage();

    echo '<script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>';

?>


<script>

wx.config(
{
    //debug: true,
    appId: '<?php echo $signPackage["appId"];?>',
    timestamp: <?php echo $signPackage["timestamp"];?>, // TODO 这一行如果放在JS文件中会报错，但放在php文件中的script标签中不会报错
    nonceStr: '<?php echo $signPackage["nonceStr"];?>',
    signature: '<?php echo $signPackage["signature"];?>',
    jsApiList:
    [
      // 所有要调用的 API 都要加到这个列表中
      'onMenuShareTimeline',
      'onMenuShareAppMessage'
    ]
});


wx.ready(function ()
{
    var setShareEventObject = document.getElementById("<?php echo $setShareEventObjectID; ?>"), //事件对象
    setShareEventType = "<?php echo $setShareEventType; ?>"; // 事件类型
    if( setShareEventObject )
    {
       setShareEventObject.addEventListener(setShareEventType, setShare, false);
    }
    else
    {
       setShare();
    }


    function setShare()
    {

       wx.onMenuShareTimeline(
       {
           title: "<?php echo $shareInfo['WechatShareTimelineTitle']; ?>", // 分享标题
           link: "<?php echo $shareInfo['WechatShareTimelineLink']; ?>", // 分享链接
           imgUrl: "<?php echo $shareInfo['WechatShareTimelineImgURL']; ?>", // 分享图标
           success: function ()
           {
               // 用户确认分享后执行的回调函数
           },
           cancel: function ()
           {
               // 用户取消分享后执行的回调函数
           }
       });

       wx.onMenuShareAppMessage(
       {
           title: "<?php echo $shareInfo['WechatShareAppMessageTitle']; ?>", // 分享标题
           desc: "<?php echo $shareInfo['WechatShareAppMessageDesc']; ?>", // 分享描述
           link: "<?php echo $shareInfo['WechatShareAppMessageLink']; ?>", // 分享链接
           imgUrl: "<?php echo $shareInfo['WechatShareAppMessageImgURL']; ?>", // 分享图标
           type: '', // 分享类型,music、video或link，不填默认为link
           dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
           success: function ()
           {
               // 用户确认分享后执行的回调函数
           },
           cancel: function ()
           {
               // 用户取消分享后执行的回调函数
           }
       });
    }
});
</script>
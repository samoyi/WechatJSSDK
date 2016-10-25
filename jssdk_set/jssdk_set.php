<?php

    require_once "jssdk.php";

    $jssdk = new JSSDK(APPID, APPSECRET);//初始化修改。修改为需要的微信公众好的AppID和AppSecret
    $signPackage = $jssdk->GetSignPackage();

    echo '<script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>';
    echo '<script src="jssdk_set/jssdk_setter.js"></script>';

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
      'onMenuShareAppMessage',
      'getLocation'
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
           title: aShareInfo[0], // 分享标题
           link: aShareInfo[1], // 分享链接
           imgUrl: aShareInfo[2], // 分享图标
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
           title: aShareInfo[3], // 分享标题
           desc: aShareInfo[4], // 分享描述
           link: aShareInfo[5], // 分享链接
           imgUrl: aShareInfo[6], // 分享图标
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


       wx.getLocation(
       {
            type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
            success: function (res) 
            {
                var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
                var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
                var speed = res.speed; // 速度，以米/每秒计
                var accuracy = res.accuracy; // 位置精度
                document.write(longitude+ "," + latitude + " " + accuracy);
            }
        });
    }
});
</script>





<script>


    //初始化修改
    //以下两行设定在什么事件发生后才设置分享时的内容。例如在用户填写了一个表单并触发了按钮的点击事件之后，用填写的内容设置分享标题。
    //默认不经过事件直接设置。不能设为window的onload事件，因为有时在绑定的时候已经发生了该事件
    var GetWechatShareEventObject = null,
        GetWechatShareEventType = "",

    //手动添加分享时的设置
    SetWechatShareData = function()
    {
        var WechatShareTimelineTitle = '分享到朋友圈111的标题',//分享到朋友圈的标题
            WechatShareTimelineLink = '',//分享到朋友圈的链接
            WechatShareTimelineImgURL = 'http://www.funca.com.cn/cuizhenkuan/invitation/image/logo.png',//分享到朋友圈的图标地址

            WechatShareAppMessageTitle = '分享给朋友的222标题',//分享给朋友的标题
            WechatShareAppMessageDesc = '分享给朋友的描述',//分享给朋友的描述
            WechatShareAppMessageLink = '',//分享给朋友的链接
            WechatShareAppMessageImgURL = 'http://www.funca.com.cn/cuizhenkuan/invitation/image/logo.png';//分享给朋友的图标地址

        return [WechatShareTimelineTitle, WechatShareTimelineLink, WechatShareTimelineImgURL, WechatShareAppMessageTitle, WechatShareAppMessageDesc, WechatShareAppMessageLink, WechatShareAppMessageImgURL];
        /*
        虽然SetWechatShareData是局部变量，但调用它的时候如果其内部的七个变量不定义为局部变量，则就会变成全局。而如果定
        义为局部变量且不返回的话，下面真正的api处又无法使用。所以作为一个数组返回，返回出用一个局部变量接受。这样就不会
        创建全局变量了。
        */

        //下面的代码段是在GetWechatShareEventType事件触发之后、真正设置之前要执行的代码。
        //例如用户进行了测试，触发了计算结果事件，之后需要在这里添加计算结果的代码，并且把标题或描述改为计算结果
        {

        };
    };
//微信分享设置结束------------------------------------------------------------------------------------------------------






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
















//如非必要，请勿修改↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
    
    wx.ready(function ()
    {
        if( GetWechatShareEventObject )
        {
           GetWechatShareEventObject.addEventListener(GetWechatShareEventType, setShare, false);
        }
        else
        {
           setShare();
        }

        function setShare()
        {
           var aShareMsg = SetWechatShareData();

           wx.onMenuShareTimeline(
           {
               title: aShareMsg[0], // 分享标题
               link: aShareMsg[1], // 分享链接
               imgUrl: aShareMsg[2], // 分享图标
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
               title: aShareMsg[3], // 分享标题
               desc: aShareMsg[4], // 分享描述
               link: aShareMsg[5], // 分享链接
               imgUrl: aShareMsg[6], // 分享图标
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

























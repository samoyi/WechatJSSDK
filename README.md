# 微信JSSDK类

## 正在添加接口方法，目前只有 分享接口 和 图像接口


### 功能：
* 将所有的接口写成InvokeWechatAPI类的方法进行方便的调用
* 所有抛出错误同时都会alert相同错误信息，以便在手机上看到

### 使用方法：
1. 将 jssdk_set 文件夹放到主页面（这里是index.php）同级的位置
2. 在这页面填写APPID和APPSECRET
3. 在具体调用接口的代码之前引入 APIInvoking.js 文件，即这里index.php中的 ```<script src="jssdk_set/APIInvoking.js"></script>```
4. 在wx.ready回调时就要调用的接口直接放进其回调函数中，之后再调用的接口可以放到外部

### 注意事项：
* 如果出现 *invalid url domain* 的错误提示，可能可以通过设置公众号 **JS接口安全域名** 来解决：进入公众平台——点击公众平台logo——功能设置——JS接口安全域名 

### 对官方文件的合并
1. 直接将 jssdk.php 中的代码（JSSDK类）写进 jssdk_set.php
2. 在JSSDK类构造函数中动态创建 jsapi_ticket.php 和 access_token.php


### 不打算实现的接口
* 分享到腾讯微博
* 分享到QQ空间

### 存在问题的接口实现
* 语音识别接口如果没有接收到语音似乎会出现错误



### 暂时没有实现的接口
* 摇一摇周边——开启查找周边ibeacon设备接口
* 摇一摇周边——关闭查找周边ibeacon设备接口
* 摇一摇周边——监听周边ibeacon设备接口

## TODO
* 不应该只能讲文件放在index同级的地方
* 将文件中的 jssdk_set 路径换成动态获取
* 隐藏右上角菜单接口、批量隐藏功能按钮接口以及隐藏所有非基础按钮接口在我手机上无效，在微信web开发者工具上正常。还要在其他手机上测试。
* 看看这里官方缓存token的方法是否比我在红房子中写的更好
* 整体优化
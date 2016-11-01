# 微信JSSDK类

## 正在添加接口方法，目前只有 分享接口 和 图像接口


### 功能：
* 将所有的接口写成InvokeWechatAPI类的方法进行方便的调用

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

## TODO
* 将文件中的 jssdk_set 路径换成动态获取
* 看看这里官方缓存token的方法是否比我在红房子中写的更好
* 整体优化
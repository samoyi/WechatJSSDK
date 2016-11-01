<?php

    // 直接把 jssdk.php 文件的内容放到这里，省去该文件。该文件中就一个JSSDK类;
	class JSSDK 
	{
		private $appId;
		private $appSecret;

		public function __construct($appId, $appSecret) 
		{
			$this->appId = $appId;
			$this->appSecret = $appSecret;
			
			// 动态创建 jsapi_ticket.php 文件
			if( !is_file("jssdk_set/jsapi_ticket.php") )
			{
				$jsapi_ticket_content = '<?php exit();?>
{"jsapi_ticket":"","expire_time":0}';
				file_put_contents("jssdk_set/jsapi_ticket.php", $jsapi_ticket_content);
				
				$access_token_content = '<?php exit();?>
{"access_token":"","expire_time":0}';
				file_put_contents("jssdk_set/access_token.php", $access_token_content);
			}
		}

		public function getSignPackage() 
		{
			$jsapiTicket = $this->getJsApiTicket();

			// 注意 URL 一定要动态获取，不能 hardcode.
			$protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off' || $_SERVER['SERVER_PORT'] == 443) ? "https://" : "http://";
			$url = "$protocol$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";

			$timestamp = time();
			$nonceStr = $this->createNonceStr();

			// 这里参数的顺序要按照 key 值 ASCII 码升序排序
			$string = "jsapi_ticket=$jsapiTicket&noncestr=$nonceStr&timestamp=$timestamp&url=$url";

			$signature = sha1($string);

			$signPackage = array
			(
			  "appId"     => $this->appId,
			  "nonceStr"  => $nonceStr,
			  "timestamp" => $timestamp,
			  "url"       => $url,
			  "signature" => $signature,
			  "rawString" => $string
			);
			return $signPackage; 
		}

		private function createNonceStr($length = 16) 
		{
			$chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
			$str = "";
			for ($i = 0; $i < $length; $i++) 
			{
			  $str .= substr($chars, mt_rand(0, strlen($chars) - 1), 1);
			}
			return $str;
		}

		private function getJsApiTicket() 
		{
			// jsapi_ticket 应该全局存储与更新，以下代码以写入到文件中做示例
			$data = json_decode($this->get_php_file("jssdk_set/jsapi_ticket.php"));
			if ($data->expire_time < time()) 
			{
				$accessToken = $this->getAccessToken();
				// 如果是企业号用以下 URL 获取 ticket
				// $url = "https://qyapi.weixin.qq.com/cgi-bin/get_jsapi_ticket?access_token=$accessToken";
				$url = "https://api.weixin.qq.com/cgi-bin/ticket/getticket?type=jsapi&access_token=$accessToken";
				$res = json_decode($this->httpGet($url));
				$ticket = $res->ticket;
				if ($ticket) 
				{
					$data->expire_time = time() + 7000;
					$data->jsapi_ticket = $ticket;
					$this->set_php_file("jssdk_set/jsapi_ticket.php", json_encode($data));
				}
			} 
			else 
			{
				$ticket = $data->jsapi_ticket;
			}
			return $ticket;
		}

		private function getAccessToken() 
		{
			// access_token 应该全局存储与更新，以下代码以写入到文件中做示例
			$data = json_decode($this->get_php_file("jssdk_set/access_token.php"));
			if ($data->expire_time < time()) 
			{
				// 如果是企业号用以下URL获取access_token
				// $url = "https://qyapi.weixin.qq.com/cgi-bin/gettoken?corpid=$this->appId&corpsecret=$this->appSecret";
				$url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=$this->appId&secret=$this->appSecret";
				$res = json_decode($this->httpGet($url));
				$access_token = $res->access_token;
				if ($access_token) 
				{
					$data->expire_time = time() + 7000;
					$data->access_token = $access_token;
					$this->set_php_file("access_token.php", json_encode($data));
				}
			} 
			else 
			{
				$access_token = $data->access_token;
			}
			return $access_token;
		}

		private function httpGet($url) 
		{
			$curl = curl_init();
			curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
			curl_setopt($curl, CURLOPT_TIMEOUT, 500);
			// 为保证第三方服务器与微信服务器之间数据传输的安全性，所有微信接口采用https方式调用，必须使用下面2行代码打开ssl安全校验。
			// 如果在部署过程中代码在此处验证失败，请到 http://curl.haxx.se/ca/cacert.pem 下载新的证书判别文件。
			curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, true);
			curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, true);
			curl_setopt($curl, CURLOPT_URL, $url);

			$res = curl_exec($curl);
			curl_close($curl);

			return $res;
		}

		private function get_php_file($filename) 
		{
			return trim(substr(file_get_contents($filename), 15));
		}
		private function set_php_file($filename, $content) 
		{
			$fp = fopen($filename, "w");
			fwrite($fp, "<?php exit();?>" . $content);
			fclose($fp);
		}
	}



    $jssdk = new JSSDK(APPID, APPSECRET);
    $signPackage = $jssdk->GetSignPackage();

    echo '<script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>';
	echo '<script src="jssdk_set/ArgumentsTypeChecker ForWechat.js"></script>';
	echo '<script src="jssdk_set/APIInvoking.js"></script>';
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
	  'onMenuShareQQ',
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
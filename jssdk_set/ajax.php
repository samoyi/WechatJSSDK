<?php
	// 该文件用来相应JS的相关请求
	
	if( isset($_GET['cardSignatureData']) )
	{
		require_once "jssdk.php";
		$jssdk = new JSSDK(APPID, APPSECRET);
	
		$cardSignatureData = $jssdk->cardSignatureData;
		$res = array(
			'timestamp'=>$cardSignatureData->timestamp,
			'nonce_str'=>$cardSignatureData->nonce_str,
			'cardSignature'=>$jssdk->getCardSignature( $_GET['cardid'] )
		);
		echo json_encode($res);
		exit;
	}
?>
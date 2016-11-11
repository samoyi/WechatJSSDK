"use strict";


/* TODO 
 * 1. 每个调用函数都要单独调用一下checkupConfigurationArgument函数
 *
 *
 */

function InvokeWechatAPI()
{
	var argumentsTypeChecker = new ArgumentsTypeChecker();

	
	// public functions ------------------------------------------------------

	// AjaxGet
	/*
	 * 可选的fnSuccessCallback接受一个参数引用 responseText
	 * 可选的fnFailCallbackstatus接受一个参数引用 status
	 * 如果有参数直接写进 sUrl
	 */
	function AjaxGet(sUrl, fnSuccessCallback, fnFailCallback)
	{
		var xhr = new XMLHttpRequest();
		xhr.addEventListener('readystatechange', function()
		{
			if (xhr.readyState == 4)
			{
				if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304)
				{
					if(fnSuccessCallback)
					{
						fnSuccessCallback( xhr.responseText );
					}
				}
				else 
				{
					if(fnFailCallback)
					{
						fnFailCallback( xhr.status );
					}
				}
			}
		}, false);
		xhr.open("get", sUrl, true);
		xhr.send(null);		
	}
	
	// get type of checked with lower case
	function showTypeWithLowerCase( checked )
	{
		var sType = Object.prototype.toString.call(checked).slice(8, -1);
		return sType.toLowerCase();
	}
	
	// 检查一个组参数是否都是是指定类型
	/*
	 * 第一个参数是被检查的函数名，用来报错是提示是哪个函数
	 * 第二个参数是要检查的参数组成的数组或整个arguments对象
	 * 第三个参数是期望的类型，如果被检测参数中有一项不是该类型就会报错，不区分大小写
	 */
	function confirmArgumentsType(sFunctionName, aArguments, sExpectedType)
	{
		sExpectedType = sExpectedType.toLocaleLowerCase();
		Array.prototype.forEach.call(aArguments, function(item, index)
		{
			if( showTypeWithLowerCase( item ) !== sExpectedType )
			{
				alert( sFunctionName + "方法的参数类型错误，期望类型为：" + sExpectedType );
				throw new TypeError( sFunctionName + "方法的参数类型错误，期望类型为：" + sExpectedType );
			}
		});
	}
	
	// 如果设置了某个参数，该参数是否是引用类型
	function checkupConfigurationArgument(sFunctionName, oConfigurationArgument)
	{
		if( oConfigurationArgument && (typeof oConfigurationArgument !== "object") )
		{
			alert(sFunctionName + "方法参数只能是object类型");
			throw new TypeError(sFunctionName + "方法参数只能是object类型");
		}
	}
	
	
	// Polyfill Object.assign
	if (typeof Object.assign != 'function') 
	{
		(function () 
		{
			Object.assign = function (target) 
			{
				'use strict';
				// We must check against these specific cases.
				if (target === undefined || target === null) 
				{
					alert("Object.assign函数的target参数不能使undefined或者null");
					throw new TypeError('Cannot convert undefined or null to object');
				}

				var output = Object(target);
				for (var index = 1; index < arguments.length; index++) 
				{
					var source = arguments[index];
					if (source !== undefined && source !== null) 
					{
						for (var nextKey in source) 
						{
							if (source.hasOwnProperty(nextKey)) 
							{
								output[nextKey] = source[nextKey];
							}
						}
					}
				}
				return output;
			};
		})();
	}
	
	
	
	

	
	// API invoking ----------------------------------------------------------
	if(typeof this.sayName != "function")
	{
		
		// 分享到朋友圈
		/*
		 * 默认的三个参数为分享标题、分享链接、分享图标地址
		 * 如果要修改配置，传入整个配置对象作为第四个参数，将以 Object.assign() 的方式改写默认参数
		 */
		InvokeWechatAPI.prototype.onMenuShareTimeline = function(sTitle, sLink, sImgUrl, oConfiguration)
		{
			if( arguments.length <3 || Array.prototype.some.call(arguments, function(item){ return typeof item !== "string"; })) // 判断是否有三个字符串参数
			{
				alert("onMenuShareTimeline方法至少需要三个字符串参数来指定分享标题、分享链接和分享图标");
				throw new Error("onMenuShareTimeline方法至少需要三个字符串参数来指定分享标题、分享链接和分享图标");
			}
			argumentsTypeChecker.confirmPlainObject( "onMenuShareTimeline", arguments[3], true);
			
			var oDefaultConfiguration = 
			{
			   title: sTitle, // 分享标题
			   link: sLink, // 分享链接
			   imgUrl: sImgUrl, // 分享图标
			};
			wx.onMenuShareTimeline( Object.assign(oDefaultConfiguration, oConfiguration) );
		};
		
		// 分享给朋友
		/*
		 * 默认的四个参数为分享标题、分享描述、分享链接、分享图标地址
		 * 如果要修改配置，传入整个配置对象作为第五个参数，将以 Object.assign() 的方式改写默认参数
		 */
		InvokeWechatAPI.prototype.onMenuShareAppMessage = function(sTitle, sDes, sLink, sImgUrl, oConfiguration)
		{
			if( arguments.length <4 || Array.prototype.some.call(arguments, function(item){ return typeof item !== "string"; })) // 判断是否有四个字符串参数
			{
				alert("onMenuShareAppMessage方法至少需要四个字符串参数来指定分享标题、分享描述、分享链接和分享图标");
				throw new Error("onMenuShareAppMessage方法至少需要四个字符串参数来指定分享标题、分享描述、分享链接和分享图标");
			}
			argumentsTypeChecker.confirmPlainObject( "onMenuShareAppMessage", oConfiguration, true);
			
			var oDefaultConfiguration = 
			{
			   title: sTitle, // 分享标题
			   desc: sDes, // 分享描述
			   link: sLink, // 分享链接
			   imgUrl: sImgUrl, // 分享图标
			};
			wx.onMenuShareAppMessage( Object.assign(oDefaultConfiguration, oConfiguration) );
		};
		
		// 分享到QQ
		/*
		 * 默认的四个参数为分享标题、分享描述、分享链接、分享图标地址
		 * 如果要修改配置，传入整个配置对象作为第五个参数，将以 Object.assign() 的方式改写默认参数
		 */
		InvokeWechatAPI.prototype.onMenuShareQQ = function(sTitle, sDes, sLink, sImgUrl, oConfiguration)
		{
			if( arguments.length <4 || Array.prototype.some.call(arguments, function(item){ return typeof item !== "string"; })) // 判断是否有四个字符串参数
			{
				alert("onMenuShareQQ方法至少需要四个字符串参数来指定分享标题、分享描述、分享链接和分享图标");
				throw new Error("onMenuShareQQ方法至少需要四个字符串参数来指定分享标题、分享描述、分享链接和分享图标");
			}
			argumentsTypeChecker.confirmPlainObject( "onMenuShareQQ", oConfiguration, true);
			
			var oDefaultConfiguration = 
			{
				title: sTitle, // 分享标题
				desc: sDes, // 分享描述
				link: sLink, // 分享链接
				imgUrl: sImgUrl // 分享图标
			};
			wx.onMenuShareQQ( Object.assign(oDefaultConfiguration, oConfiguration) );

		};
		
		
		
		// 拍照或从手机相册中选图接口
		/*
		 * 第一个参数是选取图片之后的要执行的函数。需要传入一个参数代表响应的对象，该对象的localIds属性保存着选定照片的localId组成的数组，localId可以作为img标签的src属性显示图片
		 * 如果要修改配置，传入整个配置对象参数，将以 Object.assign() 的方式改写默认参数
		 */
		InvokeWechatAPI.prototype.chooseImage = function(fnSuccessCallback, oConfiguration)
		{
			argumentsTypeChecker.confirmPlainObject( "chooseImage", oConfiguration, true);
			
			var oDefaultConfiguration = 
			{
				success: fnSuccessCallback
			};
			wx.chooseImage( Object.assign(oDefaultConfiguration, oConfiguration) );
		};
		
		// 预览图片接口
		/*
		 * 第一个参数是启动预览后要显示的图片，第二个参数是所有要预览的图片的url
		 */
		InvokeWechatAPI.prototype.previewImage = function(sCurrentImageUrl, aPreviewImageUrl)
		{
			if( (typeof arguments[0] !== "string") || !Array.isArray(arguments[1]) || arguments[1].length<1 )
			{
				alert("previewImage方法参数错误");
				throw new TypeError("previewImage方法参数错误");
			}
			
			wx.previewImage({
				current: sCurrentImageUrl, // 当前显示图片的http链接
				urls: aPreviewImageUrl // 需要预览的图片http链接列表
			});
		};
		
		// 上传图片接口
		/*
		 * 如果要上传chooseImage方法中获得的图片，需要在chooseImage方法的回调中调用该方法
		 * 如果要修改配置，传入整个配置对象参数，将以 Object.assign() 的方式改写默认参数
		 * 可以传入fnSuccessCallback可选参数作为全部上传成功之后的回调函数，它只是作为success回调函数的一部分，
		 * fnSuccessCallback接受一个参数，引用上传的所有图片的服务器端ID组成的数组
		 */
		InvokeWechatAPI.prototype.uploadImage = function(aLocalIds, fnSuccessCallback, oConfiguration)
		{	
			if( !Array.isArray(arguments[0]) || arguments[0].length<1 )
			{
				alert("uploadImage方法必须将chooseImage方法获得的localId组成的数组作为参数");
				throw new TypeError("uploadImage方法必须将chooseImage方法获得的localId组成的数组作为参数");
			}
			argumentsTypeChecker.confirmPlainObject( "uploadImage", oConfiguration, true)
								.checkArgumentsType( "uploadImage", [fnSuccessCallback], "function"); 		
								
			var oDefaultConfiguration = 
			{
				localId: '', // 需要上传的图片的本地ID，由chooseImage接口获得
				isShowProgressTips: 1, // 默认为1，显示进度提示
				success: function (res) 
				{
					var serverId = res.serverId; // 返回图片的服务器端ID
					aServerId.push( serverId );
					if( aLocalIds.length === aServerId.length && fnSuccessCallback ) // 全部上传成功
					{
						fnSuccessCallback(aServerId);
					}
					
				}
			};
			var oConfiguration = Object.assign(oDefaultConfiguration, oConfiguration),
				aServerId = [];
			aLocalIds.forEach(function(item)
			{
				oConfiguration.localId = item;
				wx.uploadImage(oConfiguration);
			});
		};
		
		// 下载图片接口
		/*
		 * 第一个是被下载图片的ID数组，通过uploadImage方法获得
		 * 如果要下载用户刚上传的图片，则需要把uploadImage方法的回调函数参数设置为该方法
		 * 如果要修改配置，传入整个配置对象作为第二个参数，将以 Object.assign() 的方式改写默认参数
		 * 可以传入fnSuccessCallback可选参数作为全部下载成功之后的回调函数，它只是作为success回调函数的一部分
		 * fnSuccessCallback接受一个参数，引用下载的所有图片的本地ID组成的数组
		 */
		InvokeWechatAPI.prototype.downloadImage = function(aServerId, fnSuccessCallback, oConfiguration)
		{
			if( arguments.length<1 || !Array.isArray(aServerId) )
			{
				alert("downloadImage方法需要传入uploadImage方法获取到的图片ID数组");
				throw new Error("downloadImage方法需要传入uploadImage方法获取到的图片ID数组");
			}
			argumentsTypeChecker.confirmPlainObject( "downloadImage", oConfiguration, true)
								.checkArgumentsType( "downloadImage", [fnSuccessCallback], "function"); 
								
			var oDefaultConfiguration = 
			{
				serverId: '', // 需要下载的图片的服务器端ID，由uploadImage接口获得
				isShowProgressTips: 1, // 默认为1，显示进度提示
				success: function (res) 
				{
					var localId = res.localId; // 返回图片下载后的本地ID
					aLocalIds.push(localId);
					if( aLocalIds.length === aServerId.length && fnSuccessCallback ) // 全部下载成功
					{
						fnSuccessCallback(aLocalIds);
					}
				}
			};
			var oConfiguration = Object.assign(oDefaultConfiguration, oConfiguration),
				aLocalIds = [];
			aServerId.forEach(function(item)
			{
				oConfiguration.serverId = item;
				wx.downloadImage(oConfiguration);
			});
		};
		
		
		
		// 开始录音接口
		InvokeWechatAPI.prototype.startRecord = function()
		{	
			wx.startRecord();
		};
		
		// 停止录音接口
		/*
		 * 参数为回调函数，接受一个参数，引用该段录音的localId
		 */
		InvokeWechatAPI.prototype.stopRecord = function( fnSuccessCallback )
		{
			argumentsTypeChecker.checkArgumentsType("stopRecord", [fnSuccessCallback], "function");
			
			wx.stopRecord(
			{
				complete: function (res) 
				{
					var localId = res.localId;
					fnSuccessCallback(localId);
				}
			});
		};
		
		// 监听录音自动停止接口
		/*
		 * 录音时间超过一分钟没有停止的时候会执行 complete 回调
		 * 参数为回调函数，接受一个参数，引用该段录音的localId
		 */
		InvokeWechatAPI.prototype.onVoiceRecordEnd = function( fnSuccessCallback )
		{
			argumentsTypeChecker.checkArgumentsType("onVoiceRecordEnd", [fnSuccessCallback], "function");
			
			wx.onVoiceRecordEnd(
			{
				complete: function (res) 
				{
					var localId = res.localId; 
					fnSuccessCallback(localId);
				}
			});
		};
		
		// 播放语音接口
		/*
		 * 参数为onVoiceRecordEnd或stopVoice获得的localId
		 */
		InvokeWechatAPI.prototype.playVoice = function( sLocalId )
		{	
			argumentsTypeChecker.checkArgumentsType("playVoice", [sLocalId], "string");

			wx.playVoice(
			{	
				localId: sLocalId 
			});
		};
		
		// 暂停播放接口
		InvokeWechatAPI.prototype.pauseVoice = function(sLocalId)
		{	
			argumentsTypeChecker.checkArgumentsType("pauseVoice", [sLocalId], "string");
			
			wx.pauseVoice(
			{
				localId: sLocalId // 需要暂停的音频的本地ID，由stopRecord接口获得
			});
		};
		
		// 停止播放接口
		InvokeWechatAPI.prototype.stopVoice = function(sLocalId)
		{	
			argumentsTypeChecker.checkArgumentsType("stopVoice", [sLocalId], "string");
			
			wx.pauseVoice(
			{
				localId: sLocalId // 需要暂停的音频的本地ID，由stopRecord接口获得
			});
		};
		
		// 监听语音播放完毕接口
		/*
		 * 参数为回调函数，接受一个参数，引用该段录音的localId
		 */
		InvokeWechatAPI.prototype.onVoicePlayEnd = function(fnSuccessCallback)
		{	
			argumentsTypeChecker.checkArgumentsType("onVoicePlayEnd", [fnSuccessCallback], "function");
			
			wx.onVoicePlayEnd(
			{
				success: function (res) 
				{
					var localId = res.localId; // 返回音频的本地ID
					fnSuccessCallback(localId);
				}
			});
		};
		
		// 上传语音接口
		/*
		 * 第二个参数为回调函数，接受一个参数，引用该段录音的serverId
		 */
		InvokeWechatAPI.prototype.uploadVoice = function(sLocalId, fnSuccessCallback)
		{	
			argumentsTypeChecker.checkArgumengsAmount("uploadVoice", arguments, 2)
								.checkArgumentsType("uploadVoice", [sLocalId], "string")
								.checkArgumentsType("uploadVoice", [fnSuccessCallback], "function");
								
			wx.uploadVoice(
			{
				localId: sLocalId,
				isShowProgressTips: 1,
				success: function (res) 
				{
					var serverId = res.serverId; // 返回音频的服务器端ID
					fnSuccessCallback(serverId);
				}
			});
		};
		
		// 下载语音接口
		/*
		 * 第二个参数为回调函数，接受一个参数，引用被下载的录音的localId
		 */
		InvokeWechatAPI.prototype.downloadVoice = function(sServerId, fnSuccessCallback)
		{	
			argumentsTypeChecker.checkArgumengsAmount("downloadVoice", arguments, 2)
								.checkArgumentsType("downloadVoice", [sServerId], "string")
								.checkArgumentsType("downloadVoice", [fnSuccessCallback], "function");
								
			wx.downloadVoice(
			{	
				serverId: sServerId, // 需要下载的音频的服务器端ID，由uploadVoice接口获得
				isShowProgressTips: 1, // 默认为1，显示进度提示
				success: function (res) 
				{	
					var localId = res.localId; // 返回音频的本地ID
					fnSuccessCallback(localId);
				}
			});
		};
		
		
		
		// 识别音频并返回识别结果接口
		/*
		 * 第二个参数为回调函数，接受一个参数，引用被识别的结果字符串
		 */
		InvokeWechatAPI.prototype.translateVoice = function (sLocalId, fnSuccessCallback)
		{
			wx.translateVoice(
			{
					localId: sLocalId, // 需要识别的音频的本地Id，由录音相关接口获得
					isShowProgressTips: 1, // 默认为1，显示进度提示
					success: function(res)
					{ 
						var sTranslateResult = res.translateResult;
						fnSuccessCallback(sTranslateResult);
					}			
			});				
		};

		
		
		// 获取网络状态接口
		/*
		 * 参数为获得网络状态之后的回调函数，该回调函数接受一个参数，引用网络类型
		 */
		InvokeWechatAPI.prototype.getNetworkType = function( fnSuccessCallback )
		{
			argumentsTypeChecker.checkArgumentsType("getNetworkType", [fnSuccessCallback], "function");
			
			wx.getNetworkType(
			{
				success: function (res) 
				{	
					var networkType = res.networkType; // 返回网络类型2g，3g，4g，wifi
					fnSuccessCallback(networkType);
				}
			});
			
		};
		
		
		
		// 使用微信内置地图查看位置接口
		/*
		 * 前四个是必选参数
		 * 经纬度参数传数字值。东经和北纬是整数，西经和南纬是负数。
		 * 第五个是可选参数，表示显示比例尺，默认14
		 * 第六个是可选参数，表示查看位置页面底部的超链接地址
		 */
		InvokeWechatAPI.prototype.openLocation = function(nLongitude, nLatitude, sPositionName, sAddress, nScale, sInfoUrl)
		{
			argumentsTypeChecker.checkArgumengsAmount( "openLocation", arguments, 4 )
								.checkArgumentsType("openLocation", [arguments[0], arguments[1]], "number")
								.checkArgumentsType("openLocation", [arguments[2], arguments[3]], "string"); 
								
			nScale = nScale?nScale:14;
			sInfoUrl = sInfoUrl?sInfoUrl:"";
			wx.openLocation({
				latitude: nLatitude, // 纬度，浮点数，范围为90 ~ -90
				longitude: nLongitude, // 经度，浮点数，范围为180 ~ -180。
				name: sPositionName, // 位置名
				address: sAddress, // 地址详情说明
				scale: nScale, // 地图缩放级别,整形值,范围从1~28。默认为最大
				infoUrl: sInfoUrl // 在查看位置界面底部显示的超链接,可点击跳转
			});
		};
		
		// 获取地理位置接口
		/*
		 * 如果要修改配置，传入整个配置对象，将以 Object.assign() 的方式改写默认参数
		 */
		InvokeWechatAPI.prototype.getLocation = function( oConfiguration )
		{
			argumentsTypeChecker.confirmPlainObject( "getLocation", oConfiguration, true); 
								
			var oDefaultConfiguration = {
				success: function (res) 
				{
					var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
					var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
					var speed = res.speed; // 速度，以米/每秒计
					var accuracy = res.accuracy; // 位置精度
				}
			};
			wx.getLocation( Object.assign(oDefaultConfiguration, oConfiguration) );
		};
		
		
		 
		// 隐藏右上角菜单接口
		InvokeWechatAPI.prototype.hideOptionMenu = function()
		{
			wx.hideOptionMenu();
		};
		
		// 显示右上角菜单接口
		InvokeWechatAPI.prototype.showOptionMenu = function()
		{
			wx.showOptionMenu();
		};
		
		// 关闭当前网页窗口接口
		InvokeWechatAPI.prototype.closeWindow = function()
		{
			wx.closeWindow();
		};
		
		// 批量隐藏功能按钮接口
		InvokeWechatAPI.prototype.hideMenuItems = function(aInterfaces)
		{
			argumentsTypeChecker.checkArgumentsType("showMenuItems", [aInterfaces], "array");
			
			wx.hideMenuItems(
			{
				menuList: aInterfaces // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
			});
		};
		
		// 批量显示功能按钮接口
		InvokeWechatAPI.prototype.showMenuItems = function(aInterfaces)
		{
			argumentsTypeChecker.checkArgumentsType("showMenuItems", [aInterfaces], "array");
			
			wx.showMenuItems({
				menuList: aInterfaces // 要显示的菜单项，所有menu项见附录3
			});
		};
		
		// 隐藏所有非基础按钮接口
		InvokeWechatAPI.prototype.hideAllNonBaseMenuItem = function()
		{
			wx.hideAllNonBaseMenuItem(); // “基本类”按钮详见附录3
		};
		
		// 显示所有功能按钮接口
		InvokeWechatAPI.prototype.showAllNonBaseMenuItem = function()
		{
			wx.showAllNonBaseMenuItem();
		};
		
		
		
		//调起微信扫一扫接口
		/*
		 * 可选参数如果为真，则直接返回扫描结果给回调函数。否则由微信处理扫描结果
		 * 如果设置为真，则还需要传入回调函数作为第二个参数。该回调函数的参数引用扫描结果
		 */
		InvokeWechatAPI.prototype.scanQRCode = function( bReturnScanResult, fnSuccessCallback)
		{
			if( arguments.length >1 )
			{
				argumentsTypeChecker.checkArgumentsType("scanQRCode", [fnSuccessCallback], "function");
			}
			
			wx.scanQRCode(
			{
				needResult: (bReturnScanResult?1:0), // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
				scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
				success: function (res) 
				{	
					if( bReturnScanResult )
					{	
						var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
						fnSuccessCallback(result);
					}
					
				}
			});
		};
		
		
		
		// 跳转微信商品页接口
		InvokeWechatAPI.prototype.openProductSpecificView = function(sProductID, nViewType)
		{
			argumentsTypeChecker.checkArgumentsType("openProductSpecificView", [sProductID], "string");
			if( nViewType && nViewType!==1 && nViewType!==2 )
			{
				alert("openProductSpecificView方法的可选参数nViewType只能是0、1、2三个数字之一");
				throw new TypeError("openProductSpecificView方法的可选参数nViewType只能是0、1、2三个数字之一");
			}
			else
			{
				nViewType = 0;
			}
			
			wx.openProductSpecificView(
			{
				productId: sProductID, // 商品id
				viewType: nViewType // 0.默认值，普通商品详情页1.扫一扫商品详情页2.小店商品详情页
			});
		};
		
		

		

	}
}









"use strict";


/* TODO 
 * 1. 每个调用函数都要单独调用一下checkupConfigurationArgument函数
 *
 *
 */

function InvokeWechatAPI()
{
	// public functions ------------------------------------------------------

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
	
	// 如果设置了某个参数，该参数是引用类型
	function checkupConfigurationArgument(sFunctionName, oConfigurationArgument)
	{
		if( oConfigurationArgument && (typeof oConfigurationArgument !== "object") )
		{
			throw new TypeError(sFunctionName + "方法参数只能是object类型");
		}
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
				throw new Error("onMenuShareTimeline方法至少需要三个字符串参数来指定分享标题、分享链接和分享图标");
			}
			checkupConfigurationArgument("onMenuShareTimeline", arguments[3]);
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
				throw new Error("onMenuShareAppMessage方法至少需要四个字符串参数来指定分享标题、分享描述、分享链接和分享图标");
			}
			checkupConfigurationArgument("onMenuShareAppMessage", oConfiguration);
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
				throw new Error("onMenuShareQQ方法至少需要四个字符串参数来指定分享标题、分享描述、分享链接和分享图标");
			}
			checkupConfigurationArgument("onMenuShareQQ", oConfiguration);
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
			checkupConfigurationArgument("chooseImage", oConfiguration);
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
				throw new TypeError("previewImage方法参数错误")
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
				throw new TypeError("uploadImage方法必须将chooseImage方法获得的localId组成的数组作为参数")
			}
			if( typeof fnSuccessCallback !== "function" )
			{
				throw new TypeError("uploadImage方法第二个参数必须是回调函数")
			}
			checkupConfigurationArgument("uploadImage", oConfiguration);
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
				throw new Error("downloadImage方法需要传入uploadImage方法获取到的图片ID数组");
			}
			if( typeof fnSuccessCallback !== "function" )
			{
				throw new TypeError("downloadImage方法第二个参数必须是回调函数")
			}
			checkupConfigurationArgument("downloadImage", oConfiguration);
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
		
		
		
		// 获取地理位置接口
		/*
		 * 如果要修改配置，传入整个配置对象，将以 Object.assign() 的方式改写默认参数
		 */
		InvokeWechatAPI.prototype.getLocation = function( oConfiguration )
		{
			checkupConfigurationArgument("getLocation", oConfiguration);
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
		
	}
}








"use strict";


function InvokeWechatAPI()
{
	// public functions ------------------------------------------------------

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
	//属性

	
	// API invoking ----------------------------------------------------------
	if(typeof this.sayName != "function")
	{
		// 分享到朋友圈
		/*
		 * 如果要修改参数，传入整个参数对象，将以 Object.assign() 的方式改写默认参数
		 */
		InvokeWechatAPI.prototype.onMenuShareTimeline = function(sTitle, sLink, sImgUrl)
		{
			wx.onMenuShareTimeline(
			{
			   title: sTitle, // 分享标题
			   link: sLink, // 分享链接
			   imgUrl: sImgUrl, // 分享图标
			});
		};
		

		// 分享给朋友
		InvokeWechatAPI.prototype.onMenuShareAppMessage = function(sTitle, sDes, sLink, sImgUrl)
		{
			wx.onMenuShareAppMessage(
			{
			   title: sTitle, // 分享标题
			   desc: sDes, // 分享描述
			   link: sLink, // 分享链接
			   imgUrl: sImgUrl, // 分享图标
			});
		};
		
		
		// 拍照或从手机相册中选图
		/*
		 * 如果要修改参数，传入整个参数对象，将以 Object.assign() 的方式改写默认参数
		 */
		InvokeWechatAPI.prototype.chooseImage = function(oConfigration)
		{
			if( oConfigration && (typeof oConfigration !== "object") )
			{
				throw new TypeError("chooseImage函数参数只能是object类型");
			}
			var oDefaultConfigration = 
			{
				success: function (res) 
				{
					var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
				}
			};
			wx.chooseImage( Object.assign(oDefaultConfigration, oConfigration) );
		};
	}
}









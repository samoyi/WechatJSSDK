"use strict";


function Jssdk_setter(name, age, job)
{
	//属性
	this.name = name;
	this.age = age;
	this.job = job;
	
	//方法
	if (typeof this.sayName !== "function")
	{
		Jssdk_setter.prototype.sayName = function ()
		{
			alert(this.name);
		};
		Jssdk_setter.prototype.Sth = "hi";
		Jssdk_setter.prototype.saySth = function ()
		{
			alert(this.Sth);
		};

		// 确定一个坐标是否在一组坐标围城的多边形中
		/*
		 * 第一个参数是测试点的纬度和经度组成的二项数组
		 * 第二个 参数是多边形顶点坐标组成的数组，每个数组项为一个顶点的纬度和经度组成的二项数组
		 */
		Jssdk_setter.prototype.isInArea = function(aTestPointOrdinate, aVertexOrdinate)
		{

		};
	}
}
var friend = new Jssdk_setter("Nicholas", 29, "Software Engineer");
friend.sayName();
friend.saySth();
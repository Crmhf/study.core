/**
 * 创建人：池戎
 * 创建时间：2010/12/22
 * 功能描述：用来存放请求服务的数据信息
 * 参数描述：无
 */

/**
 * 通用的ajax请求封装的方法
 * @param serviceUrl 服务地址
 * @param param 服务参数
 * @param callBack 是否自己写返回成功后执行的代码
 * @param async 默认true 异步请求,如果需要改为同步,输入 false
 * @param requestType 默认为空,如果写 'get' 发送get请求
 */
function jsonAjax(serviceUrl, param, callBack, async, requestType) {
	var ret, errorMsg;
	// 系统级别的报错
	var _error = function(result) {
			// TODO 系统级别的错误待更好的方式捕捉!
			switch (result.status) {
				case 0:
					errorMsg = "!系统级错误0-未发送请求!";
					console.error(errorMsg + '具体的服务地址为:' + serviceUrl);
				case 404:
					errorMsg = "!系统级错误404-网络连接失败!";
					console.error(errorMsg + '具体的服务地址为:' + serviceUrl);
					break;
				case 500:
					errorMsg = "!系统级错误500-内部服务错误!";
					console.error(errorMsg + '具体的服务地址为:' + serviceUrl);
					break;
				default:
					// 记录信息到日志服务器
					// Controller.__writeLog("请求服务时发生错误,信息:" + result.responseText, serviceUrl, 0);
					errorMsg = "!!!!!!系统级别错误。操作失败,请关闭重试!";
					console.error(errorMsg + '具体的服务地址为:' + serviceUrl);
					break;
			}
		},
		// 获取系统级别的成功,但是从业务层面上来说有可能是错误的
		success = function(result, status, xhr) {
			switch (result.statusCode) {
				// TODO 目前有的服务请求成功之后,没有statusCode返回,当取到的statusCode为undefined时,也可能是出于成功状态 20161209
				case undefined:
					console.info("请求成功,没有返回statusCode!地址为:" + serviceUrl);
					if (callBack) { callBack(result, status, xhr) };
				case 200:
					console.info("请求成功!地址为:" + serviceUrl);
					// 如果性能允许的情况下,可以考虑把调用的服务都记录下来
					if (callBack) { callBack(result, status, xhr) };
					break;
				case 400:
					errorMsg = result.message;
					console.warn('业务级错误-' + errorMsg + '具体的服务地址为:' + serviceUrl);
					break;
				case 404:
					debugger;
					errorMsg = result.message;
					console.warn('业务级错误-' + errorMsg + '具体的服务地址为:' + serviceUrl);
					break;
				case 500:
					errorMsg = result.message;
					console.warn('业务级错误-' + errorMsg + '具体的服务地址为:' + serviceUrl);
					break;
				default:
					errorMsg = '请求服务时服务请求失败,但未捕捉到错误信息!';
					console.warn('业务级错误-' + errorMsg + '具体的服务地址为:' + serviceUrl);
					// Controller.__writeLog("请求服务时发生错误,信息:" + result.responseText, serviceUrl, 0);
					break;
			}
		};

	// 默认采用POST的请求方式
	if(requestType != 'get') {
		$.ajax({
			type: "POST",
			url: serviceUrl,
			data: param,
			async: async === true,
			cache: false,
			dataType: "json",
			contentType: "application/json;charset=utf-8",
			success: success,
			error: _error // 系统级错误
		});
	}else{
		$.ajax({
			type: "GET",
			url: serviceUrl + param,
			async: async === true,
			cache: false,
			dataType: "json",
			contentType: "application/json;charset=utf-8",
			success: success,
			error: _error // 系统级错误
		});
	}


}
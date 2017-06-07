/**
 * Copyright © 2017 KingTopWare Corporation. All rights reserved.
 *
 * @title: 秒杀
 * @prject:
 * @description: 说明文件的功能--请后续修改
 * @author: ChiRong
 * @date: 2017/6/7
 * @version: v1.0
 * @modify: 说明对该文件的修改内容、修改原因以及修改日期--请后续修改
 */

var button = $('button');
setInterval(
	function(){
		if(button.value == '秒杀')
			button.click();
	}
	,1000
);

var pace = 0;
/**
 * @param {Object} obj 当前的对象
 * @param {Object} json 要修改的属性，以及终点值
 * @param {Object} fn 链式
 * @param {Object} speed 设置速度
 */
function startAnimation(obj,json,fn,speed){
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		var flag = true;	//必须外面，放for里会变成全部听最后一个元素
		for(attr in json){
			var cur = 0;
			switch (attr){
				case 'opacity':
					cur = Math.round(parseFloat(getStyle(obj,attr)) * 100);
					break;
				case 'scrollTop':
					cur = obj.attr;
					break;
				default:
					cur = parseInt(getStyle(obj,attr));
					break;
			}
			// 1.设置步长
			if(speed){
				pace = (json[attr] - cur) /  speed;
			}else{
				pace = (json[attr] - cur) /  10;
			}
			pace = pace > 0 ? Math.ceil(pace) : Math.floor(pace);
			// 2.临界处理
			if (cur !== json[attr]) {
				flag = false;
			}
			// 3.运动起来
			if (attr === 'opacity') {
				obj.style[attr] = (cur + pace) / 100;
			}else{
				obj.style[attr] = cur + pace + 'px';
			}
			switch (attr){
				case 'opacity':
					obj.style[attr] = (cur + pace) / 100;
					break;
				case 'scrollTop':
					obj[attr] = cur + speed;
					break;
				default:
					obj.style[attr] = cur + pace + 'px';
					break;
			}
		}
		//结束，必须放外面，放for里会变成只兼容到前一个元素
		if(flag){
			clearInterval(obj.timer);
			if(fn){
				fn();
			}
		}
	},30)
}
function getStyle(obj,attr){
	if(getComputedStyle){
		return getComputedStyle(obj,null)[attr];
	}else{
		obj.currentStyle[attr];
	}
}
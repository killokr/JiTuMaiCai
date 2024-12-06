window.onload = function(){
	let btn = document.querySelectorAll('.banner_title>.slide>span'); // 控制长条运动|[0]←+ [1]→-
	let bl = document.querySelector('.banner_line'); // 长条
	let ble = document.querySelectorAll('.banner_line>a'); // 长条里的商品元素
	let bl_pace = 0; // 避免类型转换，赋长条运动初始值
	let bd = 0-(ble.length-5)*248.2; // 定义←边界 | 空间换时间
	let bl_timer;
	bl.style.width = ble.length*248.2+'px'; // 长条宽度初始值
	btn[0].style.backgroundColor = '#ccc';
	btn[0].onmousedown = function(){
		clearInterval(bl_timer);
		bl_timer = setInterval(function(){
			if(bl_pace < 0){
				bl_pace = (parseFloat(bl_pace) + 24.82).toFixed(2); // 莫名其妙给转成字符串了，把它转回来 
				bl.style.transform = 'translateX('+ bl_pace + 'px)';
				btn[1].style.backgroundColor = '#9ea';
			}else{
				btn[0].style.backgroundColor = '#ccc';
				clearInterval(bl_timer);
			};
		},50);
	}
	btn[1].onmousedown = function(){
		clearInterval(bl_timer);
		bl_timer = setInterval(function(){
			if(bl_pace > bd){
				bl_pace = (bl_pace - 24.82).toFixed(2);
				bl.style.transform = 'translateX('+ bl_pace + 'px)';
				btn[0].style.backgroundColor = '#9ea';
			}else{
				btn[1].style.backgroundColor = '#ccc';
				clearInterval(bl_timer);
			};
		},50);
	}
	
	btn[0].onmouseup = function(){
		clearInterval(bl_timer);
	}
	btn[1].onmouseup = function(){
		clearInterval(bl_timer);
	}
	// ←边界82.7，→0
	//site-content轮播图处理
	var slider_images = document.getElementsByClassName('slider-images')[0].children;
	var slider_btn = document.getElementsByClassName('slider-btn')[0].children;
	var slider_item = document.getElementsByClassName('slider-item')[0].children;
	var slide_timer = null;
	var slider_box = document.getElementsByClassName('site-slider')[0];
	//定义索引值
	var iNow = 0;
	//赋值小圆点(默认第一个)
	slider_item[0].className = 'current';
	//给除第一个外的所有圆点清除选中样式
	for (var i = 1; i < slider_images.length; i++) {
		slider_images[i].style.opacity = 0;
	}
	//下一张
	slider_btn[1].onclick = function(){
		startAnimation(slider_images[iNow],{opacity:0});
		iNow++;
		if(iNow === slider_images.length){
			iNow = 0;
		}
		startAnimation(slider_images[iNow],{opacity:100});
		changeIndex();
	}
	//上一张
	slider_btn[0].onclick = function(){
		startAnimation(slider_images[iNow],{opacity:0});
		iNow--;
		if(iNow < 0){
			iNow = slider_images.length - 1;
		}
		startAnimation(slider_images[iNow],{opacity:100});
		changeIndex();
	}
	//根据索引切图
	for (var i = 0; i < slider_item.length; i++) {
		slider_item[i].index = i;
		slider_item[i].onclick = function(){
			startAnimation(slider_images[iNow],{opacity:0});
			iNow = this.index;
			startAnimation(slider_images[iNow],{opacity:100});
			changeIndex();
		}
	}
	//自动播放设置
	slide_timer = setInterval(autoPlay,5000);
	slider_box.onmouseover = function(){
		//再触碰和离开子元素时，会重复触发经过事件
		clearInterval(slide_timer);
	}
	slider_box.onmouseout = function(){
		slide_timer = setInterval(autoPlay,5000);
	}
	//自动播放(下一张)
	function autoPlay(){
		startAnimation(slider_images[iNow],{opacity:0});
		iNow++;
		if(iNow === slider_images.length){
			iNow = 0;
		}
		startAnimation(slider_images[iNow],{opacity:100});
		changeIndex();
	}
	//根据索引修改小圆点
	function changeIndex(){
		for (var i = 0; i < slider_item.length; i++) {
			slider_item[i].className = '';
		}
		slider_item[iNow].className = 'current';
	}
}

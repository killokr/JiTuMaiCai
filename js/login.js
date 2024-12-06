window.onload = function(){
	// 点击前往页面首页-->缓降“没注册？注册吗__href”
	let go = document.querySelector('.header>.go');
	let sign = document.querySelector('.header>.go>.goSign');
	go.onmouseover = function(){
		sign.style.display = 'block';
		startAnimation(sign,{top:30},null,5);
	}
	go.onmouseout = function(){
		startAnimation(sign,{top:-1},()=>{
			sign.style.display = 'none';
		});
	}
	
	// 登录方式切换
	let login_style = document.querySelectorAll('.window-header h3'); // [0]密码登录  [1]扫码登录
	let style = document.querySelectorAll('.window>div:not(.window-header)'); // [0]密码登录  [1]扫码登录
	login_style[0].onclick = function(){
		style[1].style.display = 'none';
		style[0].style.display = 'block';
	}
	login_style[1].onclick = function(){
		style[0].style.display = 'none';
		style[1].style.display = 'block';
	}
	
	// 动画
}
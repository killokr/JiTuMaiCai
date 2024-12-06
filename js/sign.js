window.onload = function(){
	let slide = document.querySelectorAll('.slide');
	let text = document.querySelectorAll('.slide .text');
	let doc = document.documentElement || document.body;
	let backTop = document.querySelector('#backTop');
	let st = [];
	// 事件重复触发，浏览器重算并重绘，造成页面跳动
	let flag = [0,0];
	slide.forEach(s => {
		s.style.height = window.outerHeight + 'px';
		st.push(s.offsetTop-window.outerHeight/1.5);
	});
	window.onscroll = function(){
		if(doc.scrollTop > st[2]){
			text[2].style.transform = 'translateY(5px)';
			if(flag.indexOf(0)!=-1) return; // 会从页面底部刷新
			window.onscroll = function(){
				if(doc.scrollTop > st[0]) backTop.style.opacity = 1;
				else {
					backTop.style.opacity = 0;
					backTop.style.animation = '';
				}
			}
		}else if(doc.scrollTop > st[1]){
			if(flag[1]) return;
			backTop.style.opacity = 1;
			text[1].style.transform = 'translateY(5px)';
			flag[1] = true;
			
		}else if(doc.scrollTop > st[0]){
			if(flag[0]) return;
			text[0].style.transform = 'translateY(5px)';
			flag[0] = true;
		}
	}
	
	backTop.onclick = function(){
		backTop.style.animation = 'move .7s linear';
		setTimeout(()=>{
			doc.scrollTop = 0;
			backTop.style.opacity = 0;
		},500);
	}
}

/* 为什么 line-height 会导致页面“跳动”？
布局重排（Reflow）：
line-height 是一个影响元素高度和行间距的属性。当你修改 line-height 时，浏览器需要重新计算整个文档的布局，因为这会影响到其他元素的位置和大小。这个过程称为 布局重排。
每次滚动事件触发时，如果你频繁修改 line-height，浏览器会不断进行布局重排，这会导致性能下降，并且可能会引起页面“跳动”或卡顿。
样式重绘（Repaint）：
修改 line-height 不仅会触发布局重排，还会触发 样式重绘，即浏览器需要重新绘制受影响的区域。频繁的重绘也会消耗大量资源，进一步加剧性能问题。
动画性能：
line-height 的过渡动画是基于布局属性的变化，这意味着每次动画帧更新时，浏览器都需要重新计算布局。这种频繁的布局计算会导致动画不够平滑，甚至出现“跳动”现象。

为什么 transform 不会导致页面“跳动”？
GPU 加速：
transform 是一个 GPU 加速的属性，意味着它可以在 GPU 上进行渲染，而不是在 CPU 上进行布局计算。这使得 transform 动画更加高效，不会触发布局重排或样式重绘。
当你使用 transform: translateY() 来移动元素时，浏览器只需要调整元素的视觉位置，而不需要重新计算整个文档的布局。因此，transform 动画通常更加平滑，不会引起页面“跳动”。
不影响布局：
transform 只改变元素的视觉位置，而不改变其实际的布局位置。这意味着其他元素的布局不会受到影响，浏览器不需要重新计算整个文档的布局，从而避免了性能问题。 */
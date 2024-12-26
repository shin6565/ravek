window.addEventListener('load',function(){
	gsap.registerPlugin(ScrollTrigger);
	// ふわっとフェードインアニメーション
	const fadeInItems = document.querySelectorAll('.animated__fadeIn');
	fadeInItems.forEach(item => {
	  ScrollTrigger.create({
	    trigger: item,
	    start: "top 80%", // 要素が上部から80%の位置で発火
	    markers: true,
	    onEnter: () => {
	      // 要素内に入ったら、js-showクラスをつける
	      item.classList.add("js-show");
	    }
	  });
	});


    const slideInLeftItems = document.querySelectorAll('.animated__slideIn--left');
	slideInLeftItems.forEach(item => {
	  ScrollTrigger.create({
	    trigger: item,
	    start: "top 80%", // 要素が上部から80%の位置で発火
	    onEnter: () => {
	      // 要素内に入ったら、js-showクラスをつける
	      item.classList.add("js-show");
	    }
	  });
	});
	
	const slideInRightItems = document.querySelectorAll('.animated__slideIn--right');
	slideInRightItems.forEach(item => {
	  ScrollTrigger.create({
	    trigger: item,
	    start: "top 80%", // 要素が上部から80%の位置で発火
	    onEnter: () => {
	      // 要素内に入ったら、js-showクラスをつける
	      item.classList.add("js-show");
	    }
	  });
	});
});
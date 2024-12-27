window.addEventListener('load', function() {
	gsap.registerPlugin(ScrollTrigger);
	
	const timeDelay = 250; // 時間差のタイミング(ミリ秒)
	const maxItemNumber = 4; // delay0-3まであるため4に変更
	
	// 通常のフェードイン（delay指定なし）
	const normalFadeInItems = document.querySelectorAll('.animated__fadeIn:not([class*="--delay"])');
	normalFadeInItems.forEach(item => {
	  ScrollTrigger.create({
		trigger: item,
		start: "top 80%",
		onEnter: () => {
		  item.classList.add("js-show");
		}
	  });
	});
	
	// 時間差フェードイン（delay指定あり）
	for (let i = 0; i < maxItemNumber; i++) {
	  const fadeInItems = document.querySelectorAll(`.animated__fadeIn.--delay${i}`);
	  fadeInFunction(fadeInItems, i * timeDelay);
	}
	
	function fadeInFunction(fadeInItems, timeout) {
	  fadeInItems.forEach(item => {
		ScrollTrigger.create({
		  trigger: item,
		  start: "top 80%",
		  onEnter: () => {
			setTimeout(() => {
			  item.classList.add("js-show");
			}, timeout);
		  }
		});
	  });
	}


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
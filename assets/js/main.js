const cardSwiper = new Swiper('.c-slider__swiper', {
    // 切り替えのモーション
    speed: 1000, // 表示切り替えのスピード
    effect: "slide", // 切り替えのmotion (※1)
    allowTouchMove: true, // スワイプで表示の切り替えを有効に
  
    // 最後→最初に戻るループ再生を有効に
    loop: true,
  
    slidesPerGroup: 1,
    // 自動スライドについて
    // autoplay: { 
    //   delay: 3000, // 何秒ごとにスライドを動かすか
    // },

    
  

    // デフォルト（モバイル）の設定
    slidesPerView: 1,

    // スライド間のスペースを30pxに設定
    spaceBetween: 30,
   
    
    // ブレイクポイントの設定
    breakpoints: {
      // 768px以上の場合
      768: {
        slidesPerView: 2.5,
      },
    },
  
    // ページネーション
    pagination: {
      el: ".swiper-pagination", // paginationのclass
      clickable: true, // クリックでの切り替えを有効に
      type: "bullets" // paginationのタイプ (※2)
    },
  
    // ナビゲーション
    navigation: {
      prevEl: ".swiper-button-prev", // 戻るボタンのclass
      nextEl: ".swiper-button-next" // 進むボタンのclass
    },
  });




  // ハンバーガーメニュー
document.addEventListener("DOMContentLoaded", () => {
  //定義
  const drawerIcon = document.querySelector('.c-drawer__icon');
  const drawer = document.querySelector('.c-drawer');
  const drawerNavItem = document.querySelectorAll('.c-drawer__body a[href^="#"]');
  const headerHeight = document.querySelector('header').offsetHeight;
  const breakpoint = 768;
  let isMenuOpen = false;
  let isMenuOpenAtBreakpoint = false;

  //メニューを開くアニメーション
  const openMenu = () => {
    if (!drawer.classList.contains("js-show")) {
      drawer.classList.add("js-show");
      drawerIcon.classList.add("js-show");
    }
  }

  //メニューを閉じるアニメーション
  const closeMenu = () => {
    if (drawer.classList.contains("js-show")) {
      drawer.classList.remove("js-show");
      drawerIcon.classList.remove("js-show");
      isMenuOpen = false;
    }
  }

  //メニューの開閉動作
  const toggleMenu = () => {
    if (!drawer.classList.contains("js-show")) {
      openMenu();
    } else {
      closeMenu();
    }
  };

  //リサイズ処理
  const handleResize = () => {
    const bp = breakpoint;
    const windowWidth = window.innerWidth;
    if (windowWidth > bp && isMenuOpenAtBreakpoint) {
      closeMenu();
    } else if (windowWidth <= bp && drawer.classList.contains("js-show")) {
      isMenuOpenAtBreakpoint = true;
    }
  };

  //メニュー外クリック処理
  const clickOuter = (event) => {
    if (drawer.classList.contains("js-show") && !drawer.contains(event.target) && isMenuOpen) {
      closeMenu();
    } else if (drawer.classList.contains("js-show") && !drawer.contains(event.target)) {
      isMenuOpen = true;
    }
  }

  //該当箇所までスクロール
  const linkScroll = (target) => {
    if (target) {
      const targetPosition = target.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = targetPosition - headerHeight;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  }

  //ヘッダーアイコン クリック時
  drawerIcon.addEventListener("click", toggleMenu);
  //画面幅リサイズ時
  window.addEventListener("resize", handleResize);
  //メニュー外クリック時
  document.addEventListener("click", clickOuter);
  //ページ内リンクナビメニュー クリック時
  drawerNavItem.forEach(item => {
    item.addEventListener("click", event => {
      event.preventDefault();
      closeMenu();
      const targetItem = document.querySelector(item.getAttribute("href"));
      linkScroll(targetItem);
    });
  });
});



// スムーススクロール

jQuery(function() {
  var $header = jQuery('#js-header');

  // smooth scroll
  jQuery('a[href*="#"]').on('click', function(e) {
    var speed = 500;
    var href = jQuery(this).attr('href');
    var target;
    var position;

    // トップページ以外からのリンクの場合
    if (href.indexOf('/') === 0) {
      // 現在のページがトップページでない場合は、通常のリンク動作を行う
      if (window.location.pathname !== '/') {
        return true;
      }
      // トップページの場合は、#以降の部分を取得
      href = href.split('#')[1];
      if (!href) return true;
      href = '#' + href;
    }

    target = jQuery(href === '#' || href === '' ? 'html' : href);
    if (target.length === 0) return true;

    position = target.offset().top - $header.outerHeight();
    jQuery('html, body').animate({ scrollTop: position }, speed, 'swing');
    e.preventDefault();
  });

  // header
  // （以下のコードは変更なし）
});
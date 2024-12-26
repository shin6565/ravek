
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



// // スムーススクロール
// jQuery(function() {
//   var $header = jQuery('#js-header');

//   // smooth scroll
//   jQuery('a[href*="#"]').on('click', function(e) {
//     var speed = 500;
//     var href = jQuery(this).attr('href');
//     var target;
//     var position;

//     // トップページ以外からのリンクの場合
//     if (href.indexOf('/') === 0) {
//       // 現在のページがトップページでない場合は、通常のリンク動作を行う
//       if (window.location.pathname !== '/') {
//         return true;
//       }
//       // トップページの場合は、#以降の部分を取得
//       href = href.split('#')[1];
//       if (!href) return true;
//       href = '#' + href;
//     }

//     target = jQuery(href === '#' || href === '' ? 'html' : href);
//     if (target.length === 0) return true;

//     position = target.offset().top - $header.outerHeight();
//     jQuery('html, body').animate({ scrollTop: position }, speed, 'swing');
//     e.preventDefault();
//   });

//   // header
//   // （以下のコードは変更なし）
// });


// スクロールヒント
//カスタマイズ ver
window.addEventListener('DOMContentLoaded', function () {
  new ScrollHint('.js-scrollable', {
    scrollHintIconAppendClass: 'scroll-hint-icon-white', 
    i18n: {
      scrollable: "スクロールできます"
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  setUpAccordion();
});

const setUpAccordion = () => {
const details = document.querySelectorAll(".js-details");
const IS_OPENED_CLASS = "is-opened";

details.forEach((element) => {
  const summary = element.querySelector(".js-summary");
  const content = element.querySelector(".js-content");
  

  summary.addEventListener("click", (event) => {
    // デフォルトの挙動を無効化
    event.preventDefault();

    // is-openedクラスの有無で判定（detailsのopen属性の判定だと、アニメーション完了を待つ必要がありタイミング的に不安定になるため）
    if (element.classList.contains(IS_OPENED_CLASS)) {
      // アコーディオンを閉じるときの処理
      // アイコン操作用クラスを切り替える(クラスを取り除く)
      element.classList.toggle(IS_OPENED_CLASS);

      // アニメーション実行
      closingAnim(content, element).restart();
    } else {
      // アコーディオンを開くときの処理
      // アイコン操作用クラスを切り替える(クラスを付与)
      element.classList.toggle(IS_OPENED_CLASS);
      // open属性を付与
      element.setAttribute("open", "true");
      // アニメーション実行
      openingAnim(content).restart();
    }
  });
});
}


/**
 * アコーディオンを閉じる時のアニメーション
 */
const closingAnim = (content, element) => gsap.to(content, {
  height: 0,
  opacity: 0,
  duration: 0.4,
  ease: "power3.out",
  overwrite: true,
  onComplete: () => {
    // アニメーションの完了後にopen属性を取り除く
    element.removeAttribute("open");
  },
});

/**
 * アコーディオンを開く時のアニメーション
 */
const openingAnim = (content) => gsap.fromTo(
  content,
  {
    height: 0,
    opacity: 0,
  },
  {
    height: "auto",
    opacity: 1,
    duration: 0.4,
    ease: "power3.out",
    overwrite: true,
  }
);
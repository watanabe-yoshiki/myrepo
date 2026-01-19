document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     要素取得
  ========================= */
  const hamburger = document.querySelector(".hamburger");
  const spMenu = document.querySelector(".sp-menu");
  const spMenuInner = document.querySelector(".sp-menu-inner");
  const overlay = document.querySelector(".sp-overlay");
  const closeBtn = document.querySelector(".sp-close");
  const navLinks = document.querySelectorAll(".nav-link");

  /* =========================
     ハンバーガーメニュー開閉
  ========================= */
  function openMenu() {
    spMenu.style.display = "block";
    overlay.style.display = "block";
    document.body.style.overflow = "hidden"; // 背景スクロール防止
  }

  function closeMenu() {
    spMenu.style.display = "none";
    overlay.style.display = "none";
    document.body.style.overflow = "";
  }

  if (hamburger) {
    hamburger.addEventListener("click", openMenu);
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", closeMenu);
  }

  if (overlay) {
    overlay.addEventListener("click", closeMenu);
  }

  /* =========================
     スムーススクロール
  ========================= */
  navLinks.forEach(link => {
    link.addEventListener("click", e => {
      const href = link.getAttribute("href");

      if (!href || !href.startsWith("#")) return;

      e.preventDefault();

      const target = document.querySelector(href);
      if (!target) return;

      // header 高さを考慮したスクロール
      const headerHeight =
        window.innerWidth <= 768 ? 80 : 160;

      const targetPosition =
        target.getBoundingClientRect().top +
        window.pageYOffset -
        headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth"
      });

      // SPメニューが開いていたら閉じる
      closeMenu();
    });
  });

  /* =========================
     リサイズ時の安全処理
     （PCに戻ったらSPメニューを閉じる）
  ========================= */
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      closeMenu();
    }
  });

});

document.getElementById('pagetop').addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});


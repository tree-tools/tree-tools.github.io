// 共通パーツを読み込む関数
document.addEventListener("DOMContentLoaded", () => {
  includeHtml().then(() => {
    initHeader();
  });
});

function includeHtml() {
  const includeTargets = document.querySelectorAll("[data-include]");
  const promises = [];

  includeTargets.forEach(el => {
    const file = el.getAttribute("data-include");
    const p = fetch(file)
      .then(response => response.text())
      .then(data => {
        el.innerHTML = data;
      });
    promises.push(p);
  });

  return Promise.all(promises);
}

// 共通パーツ読み込み後に呼ぶ初期化処理
function initHeader() {
  // ハンバーガーメニュー
  const menuToggle = document.getElementById("menu-toggle");
  const navMenu = document.getElementById("nav-menu");
  const header = document.querySelector(".site-header");

  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      menuToggle.classList.toggle("active");
      navMenu.classList.toggle("show");
    });

    // メニュー外をクリックしたら閉じる
    document.addEventListener("click", (e) => {
      if (
        navMenu.classList.contains("show") &&
        !navMenu.contains(e.target) &&
        e.target !== menuToggle
      ) {
        navMenu.classList.remove("show");
        menuToggle.classList.remove("active");
      }
    });
  }

  // スクロールでヘッダーに影をつける
  if (header) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 20) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    });
  }
}

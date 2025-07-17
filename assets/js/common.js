document.addEventListener("DOMContentLoaded", () => {
  includeHtml().then(() => {
    // DOM確定待ち
    requestAnimationFrame(() => {
      initHeader();
    });
  });
});

function initHeader() {
  const menuToggle = document.getElementById("menu-toggle");
  const navMenu = document.getElementById("nav-menu");
  const header = document.querySelector(".site-header");

  console.log("menuToggle:", menuToggle);
  console.log("navMenu:", navMenu);

  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      e.preventDefault(); // 必要なら
      menuToggle.classList.toggle("active");
      navMenu.classList.toggle("show");
    });

    document.addEventListener("click", (e) => {
      if (
        navMenu.classList.contains("show") &&
        !navMenu.contains(e.target) &&
        !menuToggle.contains(e.target)
      ) {
        navMenu.classList.remove("show");
        menuToggle.classList.remove("active");
      }
    });
  }

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

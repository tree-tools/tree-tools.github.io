// 共通パーツを読み込む関数
// 共通の初期化は common.js から一度だけ実行する。

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
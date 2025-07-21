// /assets/js/load-updates.js

function loadUpdates({ targetId, count = null }) {
  fetch('/includes/updates.html')
    .then(response => response.text())
    .then(html => {
      const container = document.getElementById(targetId);
      if (!container) return;

      const temp = document.createElement('div');
      temp.innerHTML = html;

      const dl = temp.querySelector('dl');
      if (!dl) return;

      const dtList = Array.from(dl.querySelectorAll('dt'));
      const ddList = Array.from(dl.querySelectorAll('dd'));

      const total = Math.min(count || dtList.length, dtList.length);

      for (let i = 0; i < total; i++) {
        const dt = dtList[i].cloneNode(true);
        const dd = ddList[i].cloneNode(true);
        container.appendChild(dt);
        container.appendChild(dd);
      }
    })
    .catch(err => {
      console.error('更新情報の読み込みに失敗しました:', err);
    });
}

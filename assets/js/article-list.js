document.addEventListener("DOMContentLoaded", () => {
    fetch("./list.json")
      .then(res => res.json())
      .then(data => {
        renderTags(data);
        renderArticles(data);
  
        // 検索イベント
        document.getElementById("search-btn").addEventListener("click", () => {
          const keyword = document.getElementById("search-input").value.toLowerCase();
          const filtered = data.filter(item =>
            item.title.toLowerCase().includes(keyword) ||
            item.summary.toLowerCase().includes(keyword) ||
            item.tags.some(tag => tag.toLowerCase().includes(keyword))
          );
          renderArticles(filtered);
        });
      });
  
    function renderTags(data) {
      const tagSet = new Set();
      data.forEach(item => item.tags.forEach(tag => tagSet.add(tag)));
      const tagList = document.getElementById("tag-list");
      tagSet.forEach(tag => {
        const btn = document.createElement("button");
        btn.className = "tags-btn";
        btn.textContent = tag;
        btn.addEventListener("click", () => {
          const filtered = data.filter(item => item.tags.includes(tag));
          renderArticles(filtered);
        });
        tagList.appendChild(btn);
      });
    }
  
    function renderArticles(data) {
      const container = document.getElementById("article-list");
      container.innerHTML = "<h2>記事一覧</h2>";
      if (data.length === 0) {
        container.innerHTML = "<p>該当する記事がありません。</p>";
        return;
      }
      data.forEach(item => {
        const article = document.createElement("div");
        article.className = "article-item section muted-box";
        article.innerHTML = `
          <h3><a href="${item.url}">${item.title}</a></h3>
          <details>
            <summary>詳細を表示</summary>
            <p>${item.summary}</p>
            <p>タグ： ${item.tags.map(tag => `<span class="tag">${tag}</span>`).join(", ")}</p>
          </details>
          <p>投稿日: ${item.date}</p>
        `;
        container.appendChild(article);
      });
    }
  });
  
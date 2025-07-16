document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll('.copy-btn').forEach(button => {
      button.addEventListener('click', () => {
        const codeElement = button.nextElementSibling.querySelector('code');
        const text = codeElement.textContent;
        navigator.clipboard.writeText(text).then(() => {
          button.textContent = 'Copied!';
          setTimeout(() => {
            button.textContent = 'Copy';
          }, 2000);
        });
      });
    });
  });
  
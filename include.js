// include.js
document.addEventListener("DOMContentLoaded", () => {
  const includeHeader = document.getElementById("header");
  const includeFooter = document.getElementById("footer");

  if (includeHeader) {
    fetch("header.html")
      .then(response => {
        if (!response.ok) throw new Error("Erro ao carregar o header");
        return response.text();
      })
      .then(data => (includeHeader.innerHTML = data))
      .catch(err => console.error(err));
  }

  if (includeFooter) {
    fetch("footer.html")
      .then(response => {
        if (!response.ok) throw new Error("Erro ao carregar o footer");
        return response.text();
      })
      .then(data => (includeFooter.innerHTML = data))
      .catch(err => console.error(err));
  }
});

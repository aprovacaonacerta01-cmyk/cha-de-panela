const API_URL = "https://script.google.com/macros/s/AKfycbxpEDBYVzqs57cEkTpAImFdqg5Vx5KRN4hqIsA54W4WT8CC03Ee686GxumMXuoXtH-d/exec";

fetch(API_URL)
  .then(res => res.json())
  .then(dados => {
    const lista = document.getElementById("lista-presentes");

    dados.forEach((item, index) => {
      const div = document.createElement("div");
      div.className = "presente";

      div.innerHTML = `
        <img src="${item[1]}">
        <div>
          <strong>${item[0]}</strong><br>
          <a href="${item[2]}" target="_blank">
            Caso queria uma sugestão de onde comprar o presente só entrar no link ❤️
          </a>
        </div>
        ${item[3] ? `<span>${item[3]}</span>` :
          `<input placeholder="Seu nome" data-linha="${index + 2}">`}
      `;

      lista.appendChild(div);
    });
  });

function confirmarPresentes() {
  const inputs = document.querySelectorAll("input");
  const selecionados = [];

  inputs.forEach(input => {
    if (input.value) {
      selecionados.push({
        linha: input.dataset.linha,
        nome: input.value
      });
    }
  });

  fetch(API_URL, {
    method: "POST",
    body: JSON.stringify(selecionados)
  }).then(() => {
    window.location.href = "obrigado.html";
  });
}

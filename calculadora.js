javascript
// Função para calcular juros simples
function calcularJurosSimples() {
  // Obter os valores dos inputs
  var principal = parseFloat(document.getElementById("principal").value);
  var taxa = parseFloat(document.getElementById("taxa").value);
  var periodo = parseFloat(document.getElementById("periodo").value);
  var aporte = parseFloat(document.getElementById("aporte").value);

  // Calcular o montante
  var montante = principal + (principal * taxa * periodo) + (aporte * periodo);

  // Exibir o resultado
  document.getElementById("resultado").innerHTML = "Montante (Juros Simples): R$ " + montante.toFixed(2);

  // Adicionar o resultado ao histórico
  adicionarAoHistorico("Juros Simples: R$ " + montante.toFixed(2));
}

// Função para calcular juros compostos
function calcularJurosCompostos() {
  // Obter os valores dos inputs
  var principal = parseFloat(document.getElementById("principal").value);
  var taxa = parseFloat(document.getElementById("taxa").value);
  var periodo = parseFloat(document.getElementById("periodo").value);
  var aporte = parseFloat(document.getElementById("aporte").value);

  // Calcular o montante
  var montante = principal * Math.pow((1 + taxa), periodo) + (aporte * ((Math.pow((1 + taxa), periodo) - 1) / taxa));

  // Exibir o resultado
  document.getElementById("resultado").innerHTML = "Montante (Juros Compostos): R$ " + montante.toFixed(2);

  // Adicionar o resultado ao histórico
  adicionarAoHistorico("Juros Compostos: R$ " + montante.toFixed(2));
}

// Função para adicionar um item ao histórico
function adicionarAoHistorico(item) {
  // Obter o histórico do cache do navegador
  var historico = JSON.parse(localStorage.getItem("historico")) || [];

  // Adicionar o item ao histórico
  historico.push(item);

  // Salvar o histórico no cache do navegador
  localStorage.setItem("historico", JSON.stringify(historico));

  // Atualizar a exibição do histórico
  atualizarHistorico();
}

// Função para atualizar a exibição do histórico
function atualizarHistorico() {
  // Obter o histórico do cache do navegador
  var historico = JSON.parse(localStorage.getItem("historico")) || [];

  // Obter o elemento do histórico
  var historicoElement = document.getElementById("historico");

  // Limpar o conteúdo atual do histórico
  historicoElement.innerHTML = "";

  // Adicionar cada item do histórico ao elemento
  historico.forEach(function (item, index) {
    // Criar o elemento do item do histórico
    var itemElement = document.createElement("div");
    itemElement.classList.add("historico-item");

    // Criar o elemento de texto do item do histórico
    var textElement = document.createElement("span");
    textElement.innerHTML = item;

    // Criar o botão de exclusão do item do histórico
    var deleteButton = document.createElement("button");
    deleteButton.innerHTML = "Excluir";
    deleteButton.addEventListener("click", function () {
      excluirItemDoHistorico(index);
    });

    // Adicionar o texto e o botão ao elemento do item do histórico
    itemElement.appendChild(textElement);
    itemElement.appendChild(deleteButton);

    // Adicionar o elemento do item do histórico ao histórico
    historicoElement.appendChild(itemElement);
  });
}

// Função para excluir um item do histórico
function excluirItemDoHistorico(index) {
  // Obter o histórico do cache do navegador
  var historico = JSON.parse(localStorage.getItem("historico")) || [];

  // Remover o item do histórico pelo índice
  historico.splice(index, 1);

  // Salvar o histórico atualizado no cache do navegador
  localStorage.setItem("historico", JSON.stringify(historico));

  // Atualizar a exibição do histórico
  atualizarHistorico();
}

// Chamar a função para atualizar a exibição do histórico ao carregar a página
window.onload = function () {
  atualizarHistorico();
};
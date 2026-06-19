const API = "http://localhost:3000";

const formCadastro = document.getElementById("formCadastro");

if (formCadastro) {
  formCadastro.addEventListener("submit", async function (e) {
    e.preventDefault();

    const dados = {
      nome: document.getElementById("nome").value,
      email: document.getElementById("email").value,
      telefone: document.getElementById("telefone").value,
      senha: document.getElementById("senha").value
    };

    const resposta = await fetch(`${API}/cadastro`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(dados)
    });

    const resultado = await resposta.json();

    alert(resultado.mensagem);

    if (resultado.sucesso) {
      window.location.href = "login.html";
    }
  });
}

const formLogin = document.getElementById("formLogin");

if (formLogin) {
  formLogin.addEventListener("submit", async function (e) {
    e.preventDefault();

    const dados = {
      email: document.getElementById("emailLogin").value,
      senha: document.getElementById("senhaLogin").value
    };

    const resposta = await fetch(`${API}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(dados)
    });

    const resultado = await resposta.json();

    if (resultado.sucesso) {
      localStorage.setItem("usuario", JSON.stringify(resultado.usuario));
      alert("Login realizado com sucesso!");
      window.location.href = "agendamento.html";
    } else {
      alert(resultado.mensagem);
    }
  });
  
}
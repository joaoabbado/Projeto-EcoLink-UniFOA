const formulario = document.forms[0];

document.addEventListener("DOMContentLoaded", () => {
  const authString = localStorage.getItem("auth");

  if (authString) {
    const auth = JSON.parse(authString);
    const nomeUsuario = auth.user?.nome;
    const emailUsuario = auth.user?.email;

    document.querySelector("#nome").value = nomeUsuario || "";
    document.querySelector("#email").value = emailUsuario || "";
  } else {
    console.log("Nenhum usuário logado.");
  }
});

async function updatePerfil(event) {
  event.preventDefault();

  const auth = JSON.parse(localStorage.getItem("auth"));
  const id = auth?.user?.id; // <-- aqui corrigido
  const perfil = auth?.user?.perfil;
  const nome = document.querySelector("#nome").value;
  const email = document.querySelector("#email").value;
  const senhaAtual = document.querySelector("#senhaatual").value;
  const novaSenha = document.querySelector("#novasenha").value;
  const confirma = document.querySelector("#confirma").value;

  // Log para debug
  console.log({
    id,
    nome,
    email,
    senhaAtual,
    senha: novaSenha,
    confirma,
    perfil
  });

  try {
    const reqUpdate = await fetch('http://localhost:3000/user/update', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id,
        nome,
        email,
        senhaAtual,
        senha: novaSenha,
        confirma,
        perfil
      }),
    });

    const data = await reqUpdate.json();

    if (reqUpdate.ok) {
      alert(data.message);
    } else {
      document.querySelector("#error").innerHTML = `<i class="bi bi-exclamation-circle"></i><a> ${data.message}</a>`;
    }
  } catch (error) {
    console.error('Erro ao atualizar perfil:', error);
    alert('Erro de conexão com o servidor.');
  }
}

formulario.onsubmit = updatePerfil;

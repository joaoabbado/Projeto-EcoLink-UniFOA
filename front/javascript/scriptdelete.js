const formLog = document.forms[0];

formLog.addEventListener("submit", function (e) {
  e.preventDefault();
  deleteUser(formLog);
});

// Variáveis globais
let userId = null;

document.addEventListener("DOMContentLoaded", () => {
  const authString = localStorage.getItem("auth");

  if (authString) {
    const auth = JSON.parse(authString);
    userId = auth?.user?.id;
    const emailUsuario = auth?.user?.email;

    const inputEmail = document.querySelector("#email");
    if (inputEmail && emailUsuario) {
      inputEmail.value = emailUsuario;
    }
  } else {
    console.log("Nenhum usuário logado.");
  }
});

async function deleteUser(form) {
  const email = form.email;
  const senha = form.senha;

  if (!email.value || !senha.value) {
    document.querySelector("#error").innerHTML = `<i class="bi bi-exclamation-circle"></i> Insira o email e a senha`;
    return;
  }

  if (!userId) {
    document.querySelector("#error").innerHTML = `<i class="bi bi-exclamation-circle"></i> Usuário não autenticado`;
    return;
  }

  try {
    const reqLogin = await fetch(`http://127.0.0.1:3000/user/delete/${userId}`, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email.value,
        senha: senha.value
      })
    });

    const data = await reqLogin.json();

    if (reqLogin.ok) {
      localStorage.removeItem('auth');
      window.location.href = '/front/index.html';
    } else {
      document.querySelector("#error").innerHTML = `<i class="bi bi-exclamation-circle"></i> ${data.message}`;
    }
  } catch (err) {
    document.querySelector("#error").innerHTML = `<i class="bi bi-exclamation-circle"></i> Erro ao excluir usuário`;
    console.error("Erro:", err);
  }
}

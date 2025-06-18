const formLog = document.forms[0];
formLog.addEventListener("submit", function (e) {
    e.preventDefault(); 
    register(formLog);
  });
function salvar(token){
    localStorage.setItem('auth',JSON.stringify(token))
  }

async function register(form) {
    const erros = document.querySelector("#error-list");
    const caixa = document.querySelector(".erros");
    erros.innerHTML = "";

    let hasError = false;

    if (nome.value.trim() === "") {
        erros.innerHTML += `<li><i class="bi bi-exclamation-circle"></i><a href='javascript:nome.focus()'> Entre com um nome</a></li>`;
        hasError = true;
    }

    if (email.value.trim() === "") {
        erros.innerHTML += `<li><i class="bi bi-exclamation-circle"></i><a href='javascript:email.focus()'> Entre com o email</a></li>`;
        hasError = true;
    }

    if (senha.value.trim() === "") {
        erros.innerHTML += `<li><i class="bi bi-exclamation-circle"></i><a href='javascript:senha.focus()'> Entre com a senha</a></li>`;
        hasError = true;
    } else {
        if (senha.value.length < 8) {
            erros.innerHTML += `<li><i class="bi bi-exclamation-circle"></i><a href='javascript:senha.focus()'> A senha deve conter no mínimo 8 caracteres</a></li>`;
            hasError = true;
        }
        if (senha.value !== confirma.value) {
            erros.innerHTML += `<li><i class="bi bi-exclamation-circle"></i><a href='javascript:confirma.focus()'> A confirmação e a senha devem ser iguais</a></li>`;
            hasError = true;
        }
    }

    if (hasError) {
        caixa.classList.remove("hide");
    } else {
      caixa.classList.add("hide");
      const req = await fetch('http://127.0.0.1:3000/user/create',{
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          nome: form.nome.value,
          email: form.email.value,
          senha: form.senha.value,
          confirma: form.confirma.value
        })
      })
      const auth = await req.json() 
      if(auth){
        salvar(auth)
        location.href = "../front/indexhomelogado.html"
  
      }
    }
  }
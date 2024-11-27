import { adicionarUsuario } from './scriptBD.js';

const form = document.querySelector("#form-user");

form.addEventListener("submit", (evt) => {
    evt.preventDefault(); 

    const { nome, email, senha, confirma } = evt.target;
    const erros = document.querySelector("#error-list");
    const caixa = document.querySelector(".erros");
    erros.innerHTML = "";

    let hasError = false;

    // valida nome
    if (nome.value.trim() === "") {
        erros.innerHTML += `<li><i class="bi bi-exclamation-circle"></i><a href='javascript:nome.focus()'> Entre com um nome</a></li>`;
        hasError = true;
    }

    //valida email
    if (email.value.trim() === "") {
        erros.innerHTML += `<li><i class="bi bi-exclamation-circle"></i><a href='javascript:email.focus()'> Entre com o email</a></li>`;
        hasError = true;
    }

    //valida senha
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

        adicionarUsuario({
            nome: nome.value.trim(),
            email: email.value.trim(),
            senha: senha.value.trim(),
            tipo: "aluno", //não está sendo usado pra nada
        });
        alert("Cadastro realizado com sucesso!");
        window.location.href = "indexLogin.html";
    }
});
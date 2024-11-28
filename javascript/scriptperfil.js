function previewProfilePic(event) {
    const img = document.getElementById('profile-pic');
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const nomeUsuario = localStorage.getItem("usuarioLogado");
    const emailUsuario = localStorage.getItem("usuarioEmail");
    const senhaUsuario = localStorage.getItem("usuarioSenha");

    if (nomeUsuario && emailUsuario && senhaUsuario) {
        const inputNome = document.querySelector("#nome");
        inputNome.value = nomeUsuario;
        
        const inputEmail = document.querySelector("#email");
        inputEmail.value = emailUsuario;
        
        const inputSenha = document.querySelector("#senha");
        inputSenha.value = senhaUsuario;
    } else {
        console.log("Nenhum usuário logado.");
    }
});
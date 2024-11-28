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


// Função para pré-visualizar a nova imagem selecionada
function previewProfilePic(event) {
    const input = event.target;
    const file = input.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const profilePic = document.getElementById("profile-pic");
            profilePic.src = e.target.result; // Atualiza a imagem na página
        };
        reader.readAsDataURL(file);
    }
}

// Função para salvar a imagem no localStorage
function saveProfilePic() {
    const profilePic = document.getElementById("profile-pic").src;
    localStorage.setItem("profilePic", profilePic); // Salva a imagem no localStorage
    alert("Imagem de perfil salva com sucesso!");
}

// Função para carregar a imagem salva ao abrir a página
function loadProfilePic() {
    const savedPic = localStorage.getItem("profilePic");
    if (savedPic) {
        const profilePic = document.getElementById("profile-pic");
        profilePic.src = savedPic; // Carrega a imagem salva no localStorage
    }
}

// Carrega a imagem salva ao abrir a página
window.onload = loadProfilePic;

// Adiciona evento ao botão "Salvar"
document.getElementById("save-button").addEventListener("click", saveProfilePic);

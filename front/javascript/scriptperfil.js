document.addEventListener("DOMContentLoaded", () => {
    const logoutLink = document.getElementById("logoutLink");
    
    logoutLink.addEventListener("click", function (event) {
      event.preventDefault(); 
      logout();
    });
  });
  
  function logout() {
    localStorage.removeItem('auth');
    window.location.href = '/front/index.html';
}

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
    const authString = localStorage.getItem("auth");
  
    if (authString) {
        const auth = JSON.parse(authString);
        const nomeUsuario = auth.user?.nome;
        const emailUsuario = auth.user?.email;

        const inputNome = document.querySelector("#nome");
        const inputEmail = document.querySelector("#email");

        if (inputNome && nomeUsuario) {
            inputNome.value = nomeUsuario;
        }

        if (inputEmail && emailUsuario) {
            inputEmail.value = emailUsuario;
        }
    } else {
        console.log("Nenhum usuário logado.");
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const dados = JSON.parse(localStorage.getItem("auth")); // Substitua "token" pelo nome real da chave
  
    if (dados && dados.user && dados.user.acesso === "admin") {
      const link = document.getElementById("adminLink");
      if (link) {
        link.style.display = "inline"; // ou "block", dependendo de como quer que ele apareça
      }
    }
  });

// // Função para pré-visualizar a nova imagem selecionada
// function previewProfilePic(event) {
//     const input = event.target;
//     const file = input.files[0];

//     if (file) {
//         const reader = new FileReader();
//         reader.onload = function (e) {
//             const profilePic = document.getElementById("profile-pic");
//             profilePic.src = e.target.result; // Atualiza a imagem na página
//         };
//         reader.readAsDataURL(file);
//     }
// }

// // Função para salvar a imagem no localStorage
// function saveProfilePic() {
//     const profilePic = document.getElementById("profile-pic").src;
//     localStorage.setItem("profilePic", profilePic); // Salva a imagem no localStorage
//     alert("Imagem de perfil salva com sucesso!");
// }

// // Função para carregar a imagem salva ao abrir a página
// function loadProfilePic() {
//     const savedPic = localStorage.getItem("profilePic");
//     if (savedPic) {
//         const profilePic = document.getElementById("profile-pic");
//         profilePic.src = savedPic; // Carrega a imagem salva no localStorage
//     }
// }

// // Carrega a imagem salva ao abrir a página
// window.onload = loadProfilePic;

// // Adiciona evento ao botão "Salvar"
// document.getElementById("save-button").addEventListener("click", saveProfilePic);

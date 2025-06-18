
document.addEventListener("DOMContentLoaded", () => {
    const authString = localStorage.getItem("auth");

    let nomeUsuario = "Usuário Desconhecido";
    if (authString) {
        const auth = JSON.parse(authString);
        nomeUsuario = auth.user?.nome || nomeUsuario;

        const saudacao = document.querySelector("#saudacao");
        if (saudacao) saudacao.textContent = nomeUsuario;
    }

    const formPost = document.querySelector(".formPost");
    const postsContainer = document.getElementById("postsContainer");

    formPost.addEventListener("submit", (event) => {
        event.preventDefault(); 

        const textarea = formPost.querySelector("textarea");
        const textoPost = textarea.value.trim();

        if (textoPost === "") {
            alert("Digite algo para postar.");
            return;
        }

        const novaPostagem = document.createElement("li");
        novaPostagem.classList.add("post");

        novaPostagem.innerHTML = `
            <div class="infoUserPost">
                <div class="nameAndHour">
                    <i class="bi bi-person-circle"></i>
                    <strong>${nomeUsuario}</strong>
                    <p>agora</p>
                </div>
            </div>

            <a href="indexForum.html">
                <p class="legenda">${textoPost}</p>
            </a>

            <div class="btnIntercao">
                <button class="actionBtnPost" type="button"><i class="bi bi-heart"></i></button>

                <a href="indexForum.html">
                    <button class="actionBtnPost" type="button"><i class="bi bi-chat-dots"></i></button>
                </a>

                <button class="actionBtnPost" type="button"><i class="bi bi-share"></i></button>

                <button class="actionBtnPost" type="button"><i class="bi bi-bookmark"></i></button>
            </div>


        `;

        postsContainer.prepend(novaPostagem);

        textarea.value = "";
    });
});

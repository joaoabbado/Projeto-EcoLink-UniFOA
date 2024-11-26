import { pegarData } from "./scriptBD.js"

    function getUsuario(email,senha){
        const usuarios = pegarData()

        console.log(usuarios)
        
        const u = usuarios.filter(
            function(usu){
                return usu.email == email && usu.senha === senha
            }
        )
        return u
    }
    
    function entrar(){
        const email = document.querySelector("#email").value
        const senha = document.querySelector("#senha").value
        const usuario = getUsuario(email,senha)
        
        if(usuario.length == 0){
            document.querySelector("#error").textContent = "Usuário ou senha incorretos!"
        }else{
                localStorage.setItem("usuarioLogado", usuario[0].nome);
                window.location.href = "indexhomelogado.html";
        }
    }
    
    document.addEventListener("DOMContentLoaded", () => {
        const loginButton = document.querySelector("#loginBotao");
        loginButton.addEventListener("click", entrar);
    });


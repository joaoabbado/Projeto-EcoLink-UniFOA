document.addEventListener("DOMContentLoaded", function () {
    verificarLogin();
  });

function verificarLogin(){
    console.log("Entrou no verificar login")
    const auth = JSON.parse(localStorage.getItem('auth'));
    if(!auth){
        location.href = "/front/index.html"
    }else{
        console.log("Funcionou!")
    }
}

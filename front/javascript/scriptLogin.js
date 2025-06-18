
const formLog = document.forms[0];

function salvar(token){
    localStorage.setItem('auth',JSON.stringify(token))
  }
  
async function entrar(form){
    const email = form.email;
    const senha = form.senha

    if(email.value === "" || senha.value === ""){
        document.querySelector("#error").innerHTML = `<i class="bi bi-exclamation-circle"></i> Usuário ou senha incorretos!`;
    }else{
    const reqLogin = await fetch('http://127.0.0.1:3000/login',{ 
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({email:email.value,senha:senha.value})
      })
      const token = await reqLogin.json()
      console.log(token)
      //se retornar token
      if (token.ok==true) {
        salvar(token)
        location.href = "../front/indexhomelogado.html"
      } else {
        document.querySelector("#error").innerHTML = `<i class="bi bi-exclamation-circle"></i> Usuário ou senha incorretos!`;
        email.select();
      }
    }
}

formLog.onsubmit = (e) => {
    e.preventDefault();
    entrar(formLog)
  };
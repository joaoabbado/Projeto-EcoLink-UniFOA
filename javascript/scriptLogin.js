
const usuarios = [
    {
        id: 1,
        nome: 'Paulo',
        email: 'paulo@gmail.com',
        tipo: 'aluno',
        senha: 'senhaP'
    },
    {
        id: 2,
        nome: 'Guilherme',
        email: 'guilherme@gmail.com',
        tipo: 'adm',
        senha: 'senhaG'
    },
    {
        id: 3,
        nome: 'Arthur',
        email: 'arthur@gmail.com',
        tipo: 'aluno',
        senha: 'senhaA'
    },
    {
        id: 4,
        nome: 'Gorito',
        email: 'gorito@gmail.com',
        tipo: 'aluno',
        senha: 'senhaG'
    },
    {
        id: 5,
        nome: 'João',
        email: 'joão@gmail.com',
        tipo: 'aluno',
        senha: 'senhaJ'
    },
    {
        id: 5,
        nome: 'Glyden',
        email: 'glyden@gmail.com',
        tipo: 'aluno',
        senha: 'senhaG'
    },
    {
        id: 5,
        nome: 'Pilad',
        email: 'pilad@gmail.com',
        tipo: 'aluno',
        senha: 'senhaP'
    }
]

// localStorage.setItem("BDusuarios",JSON.stringify(usuarios))
// const visualizarJSON = localStorage.getItem("BDusuarios")
// console.log(visualizarJSON);

function getUsuario(email,senha){
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
                window.location.href = "indexhomelogado.html";
        }
    }
    
    // function changeName() {
    //     const username = localStorage.getItem('username');
        
    //     if (username) {
    //       document.getElementById('profile-name1').textContent = username;
    //       document.getElementById('profile-name2').textContent = username;
    //       document.getElementById('welcome-message').textContent = "Bem-vindo " + username + ", ao seu portal dedicado a sustentabilidade!"
    //     } else {
    //       console.log("Usuário não encontrado no localStorage");
    //     }
    //   }
    
    // function changeWelcome(){
    
    // }
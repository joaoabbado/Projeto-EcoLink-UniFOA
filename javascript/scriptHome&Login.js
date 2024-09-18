/*---------------------------------- "BANCO DE DADOS" --------------------------------------*/
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
/*---------------------------------- PÁGINA PRINCIPAL --------------------------------------*/
let currentIndex = 0;
let currentText = 0;
const slides = document.querySelectorAll('.carousel-images img');
const totalSlides = slides.length;

function showSlide(index) {
    if (index >= totalSlides) {
        currentIndex = 0;
    } else if (index < 0) {
        currentIndex = totalSlides - 1;
    } else {
        currentIndex = index;
    }
    
    const newTransform = -currentIndex * 100 + '%';
    document.querySelector('.carousel-images').style.transform = `translateX(${newTransform})`;
}

function nextText(){
    console.log(currentText)
    if(currentText == 0){
        document.querySelector('#title-inside-carousel').innerHTML = '<h1>Titulo da postagem 2</h1><h2>Uma breve descrição sobre a postagem será mostrada aqui.</h2>';
        currentText += 1
    }else if(currentText == 1){
        document.querySelector('#title-inside-carousel').innerHTML = '<h1>Titulo da postagem 3</h1><h2>Uma breve descrição sobre a postagem será mostrada aqui.</h2>';
        currentText += 1
    }else if(currentText == 2){
        document.querySelector('#title-inside-carousel').innerHTML = '<h1>Titulo da postagem 1</h1><h2>Uma breve descrição sobre a postagem será mostrada aqui.</h2>';
        currentText = 0
    }
}
function previousText(){
    console.log(currentText)
    if(currentText == 0){
        document.querySelector('#title-inside-carousel').innerHTML = '<h1>Titulo da postagem 3</h1><h2>Uma breve descrição sobre a postagem será mostrada aqui.</h2>';
        currentText = 2
    }else if(currentText == 1){
        document.querySelector('#title-inside-carousel').innerHTML = '<h1>Titulo da postagem 1</h1><h2>Uma breve descrição sobre a postagem será mostrada aqui.</h2>';
        currentText -= 1
    }else if(currentText == 2){
        document.querySelector('#title-inside-carousel').innerHTML = '<h1>Titulo da postagem 2</h1><h2>Uma breve descrição sobre a postagem será mostrada aqui.</h2>';
        currentText -= 1 
    }
}
function nextSlide() {
    showSlide(currentIndex + 1);
    nextText();
}

function prevSlide() {
    showSlide(currentIndex - 1);
    previousText();
}

showSlide(currentIndex);

setInterval(nextSlide, 3000);
/*-------------------------------*/
function showSidebar(){
    const sidebar = document.querySelector('.sidebar')
    sidebar.style.display = 'flex'
}
function hideSidebar(){
    const sidebar = document.querySelector('.sidebar')
    sidebar.style.display = 'none'
}
/*---------------------------------- PÁGINA DE LOGIN --------------------------------------*/

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
        if(usuario[0].tipo === "adm"){
            localStorage.setItem('username', usuario[0].nome);
            window.location.href = "indexhomelogado.html"


        }else if(usuario[0].tipo === "aluno"){
            localStorage.setItem('username', usuario[0].nome);
            window.location.href = "indexhomelogado.html"

        }else{

        }
    }
}

function changeName() {
    const username = localStorage.getItem('username');
    
    if (username) {
      document.getElementById('profile-name1').textContent = username;
      document.getElementById('profile-name2').textContent = username;
      document.getElementById('welcome-message').textContent = "Bem-vindo " + username + ", ao seu portal dedicado a sustentabilidade!"
    } else {
      console.log("Usuário não encontrado no localStorage");
    }
  }

function changeWelcome(){

}
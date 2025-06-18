
/*---------------------------------- "PEGAR NOME DO USUARIO" --------------------------------------*/

document.addEventListener("DOMContentLoaded", () => {
    const authString = localStorage.getItem("auth");

    if (authString) {
        const auth = JSON.parse(authString);
        const nomeUsuario = auth.user?.nome;

        if (nomeUsuario) {
            const saudacao = document.querySelector("#saudacao");
            if (saudacao) saudacao.textContent = nomeUsuario;

            const saudacao2 = document.querySelector("#saudacao2");
            if (saudacao2) saudacao2.textContent = nomeUsuario;
        }
    }
});
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
   // console.log(currentText)
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
   // console.log(currentText)
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

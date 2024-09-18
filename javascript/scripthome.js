let currentIndex = 0;
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

function nextSlide() {
    showSlide(currentIndex + 1);
}

function prevSlide() {
    showSlide(currentIndex - 1);
}

// Mostrar o primeiro slide inicial
showSlide(currentIndex);

// Passagem automática das imagens a cada 3 segundos
setInterval(nextSlide, 7000);

/*-------------------------------------------------------*/

function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
}
function irPagina() {
    window.location.href = "indexsocial.html";
}
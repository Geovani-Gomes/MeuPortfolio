function toggleDarkMode() {
    const body = document.body;
    body.classList.toggle('dark-mode');

    // Alternar classes para os links de navegação
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.classList.toggle('dark-mode');
    });

    // Alternar classes para o botão do hero
    const heroButton = document.querySelector('.hero .btn');
    heroButton.classList.toggle('dark-mode');

    // Alternar classes para o header
    const header = document.querySelector('header');
    header.classList.toggle('dark-mode');
}

document.addEventListener('DOMContentLoaded', (event) => {
    const textElement = document.querySelector('.animated-text');
    const text = "Desenvolvedor";

    function typeText() {
        textElement.style.width = '12ch';
        textElement.style.animation = `typing 2s steps(${text.length}, end), blink-caret .75s step-end infinite`;
    }

    function eraseText() {
        textElement.style.width = '0ch';
        textElement.style.animation = `erasing 2s steps(${text.length}, end)`;
    }

    function loopTypingAnimation() {
        typeText();
        setTimeout(() => {
            eraseText();
        }, 4000); 
    }

    loopTypingAnimation();
    setInterval(loopTypingAnimation, 6000); 

    const track = document.querySelector('.carousel-track');
    const slides = Array.from(track.children);
    const nav = document.querySelector('.carousel-nav');
    const indicators = Array.from(document.querySelectorAll('.carousel-indicators button'));

    const slideWidth = slides[0].getBoundingClientRect().width;

    // Arranjar os slides um ao lado do outro
    const setSlidePosition = (slide, index) => {
        slide.style.left = slideWidth * index + 'px';
    };
    slides.forEach(setSlidePosition);

    const moveToSlide = (track, currentSlide, targetSlide) => {
        track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
        currentSlide.classList.remove('current-slide');
        targetSlide.classList.add('current-slide');
    };

    const updateIndicators = (currentIndicator, targetIndicator) => {
        currentIndicator.classList.remove('current-slide');
        targetIndicator.classList.add('current-slide');
        // Muda a cor do indicador ativo para azul
        targetIndicator.style.backgroundColor = '#007bff'; // Azul
        currentIndicator.style.backgroundColor = 'black'; // Preto para os inativos
    };

    nav.addEventListener('click', e => {
        const targetIndicator = e.target.closest('button');

        if (!targetIndicator) return;

        const currentSlide = track.querySelector('.current-slide');
        const currentIndicator = nav.querySelector('.current-slide');
        const targetIndex = indicators.findIndex(indicator => indicator === targetIndicator);
        const targetSlide = slides[targetIndex];

        moveToSlide(track, currentSlide, targetSlide);
        updateIndicators(currentIndicator, targetIndicator);
    });

    
    const prevButton = document.querySelector('.prev-button');
    const nextButton = document.querySelector('.next-button');

    prevButton.addEventListener('click', () => {
        const currentSlide = track.querySelector('.current-slide');
        const prevSlide = currentSlide.previousElementSibling || slides[slides.length - 1]; 
        moveToSlide(track, currentSlide, prevSlide);
        const currentIndicator = nav.querySelector('.current-slide');
        const targetIndex = slides.findIndex(slide => slide === prevSlide);
        const targetIndicator = indicators[targetIndex];
        updateIndicators(currentIndicator, targetIndicator);
    });

    nextButton.addEventListener('click', () => {
        const currentSlide = track.querySelector('.current-slide');
        const nextSlide = currentSlide.nextElementSibling || slides[0]; 
        moveToSlide(track, currentSlide, nextSlide);
        const currentIndicator = nav.querySelector('.current-slide');
        const targetIndex = slides.findIndex(slide => slide === nextSlide);
        const targetIndicator = indicators[targetIndex];
        updateIndicators(currentIndicator, targetIndicator);
    });
});

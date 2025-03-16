document.addEventListener('DOMContentLoaded', function () {
    const downBtn = document.querySelector('.home-down-btn');
    const downloadMenu = document.querySelector('.download-menu');

    downBtn.addEventListener('mouseenter', function () {
        downloadMenu.classList.add('show');
    });

    downBtn.addEventListener('mouseleave', function (e) {
        // 检查鼠标是否移动到下载菜单上
        if (!downloadMenu.contains(e.relatedTarget)) {
            downloadMenu.classList.remove('show');
        }
    });

    downloadMenu.addEventListener('mouseleave', function () {
        downloadMenu.classList.remove('show');
    });
});

const carousel = document.querySelector('.carousel');
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
let currentIndex = 0;
let startX, moveX, lastX;
let isDragging = false;

const slideElement = document.querySelector('.slide');
let slideWidth = slideElement.offsetWidth;

function adjustSlideWidth() {
    if (window.innerWidth < 750) {
        slideElement.style.width = '16.6rem';
    } else {
        slideElement.style.width = '680px';
    }
    slideWidth = slideElement.offsetWidth; // Update slideWidth after changing the width
}

function updateCarousel(offset = 0) {
    let centerOffset = window.innerWidth / 2 - slideWidth / 2;
    const translateX = -currentIndex * slideWidth + offset;
    carousel.style.transform = `translateX(${centerOffset + translateX}px)`;

    slides.forEach((slide, index) => {
        if (index === currentIndex) {
            slide.classList.add('active');
        } else {
            slide.classList.remove('active');
        }
    });

    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentIndex);
    });
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    updateCarousel();
}

let autoSlideInterval = setInterval(nextSlide, 5000); // Auto-advance every 5 seconds

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentIndex = index;
        updateCarousel();
        resetAutoSlide();
    });
});

function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(nextSlide, 5000);
}

carousel.addEventListener('mousedown', startDrag);
carousel.addEventListener('mousemove', drag);
carousel.addEventListener('mouseup', endDrag);
carousel.addEventListener('mouseleave', endDrag);

carousel.addEventListener('touchstart', startDrag);
carousel.addEventListener('touchmove', drag);
carousel.addEventListener('touchend', endDrag);

function startDrag(e) {
    isDragging = true;
    startX = e.type.includes('mouse') ? e.pageX : e.touches[0].pageX;
    lastX = startX;
    carousel.style.transition = 'none';
}

function drag(e) {
    if (!isDragging) return;
    e.preventDefault();
    moveX = e.type.includes('mouse') ? e.pageX : e.touches[0].pageX;
    const diff = moveX - lastX;
    updateCarousel(diff);
    lastX = moveX;
}

function endDrag() {
    if (!isDragging) return;
    isDragging = false;
    carousel.style.transition = 'transform 0.5s ease-in-out';
    const movedBy = startX - lastX;
    if (Math.abs(movedBy) > slideWidth / 3) {
        if (movedBy > 0 && currentIndex < slides.length - 1) {
            currentIndex++;
        } else if (movedBy < 0 && currentIndex > 0) {
            currentIndex--;
        }
    }
    updateCarousel();
    resetAutoSlide();
}

// Initial setup
adjustSlideWidth();
updateCarousel();

// Resize handling
function handleResize() {
    adjustSlideWidth();
    updateCarousel();
}

window.addEventListener('resize', handleResize);
handleResize(); // Call once to set initial position

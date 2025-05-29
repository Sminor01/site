function initializeSlider(images) {
    const slider = document.querySelector('.slider');
    const dotsContainer = document.querySelector('.slider-dots');
    const prevButton = document.querySelector('.slider-button.prev');
    const nextButton = document.querySelector('.slider-button.next');
    
    let currentSlide = 0;
    
    // Create slides
    images.forEach((image, index) => {
        // Add image to slider
        const slide = document.createElement('img');
        slide.src = image;
        slide.alt = `Slide ${index + 1}`;
        slider.appendChild(slide);
        
        // Create dot
        const dot = document.createElement('div');
        dot.className = 'dot';
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });
    
    // Set initial slide width
    updateSliderWidth();
    
    // Event listeners
    prevButton.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + images.length) % images.length;
        updateSlider();
    });
    
    nextButton.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % images.length;
        updateSlider();
    });
    
    // Touch events for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    slider.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    slider.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        if (touchEndX < touchStartX - swipeThreshold) {
            // Swipe left
            currentSlide = (currentSlide + 1) % images.length;
            updateSlider();
        } else if (touchEndX > touchStartX + swipeThreshold) {
            // Swipe right
            currentSlide = (currentSlide - 1 + images.length) % images.length;
            updateSlider();
        }
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            currentSlide = (currentSlide - 1 + images.length) % images.length;
            updateSlider();
        } else if (e.key === 'ArrowRight') {
            currentSlide = (currentSlide + 1) % images.length;
            updateSlider();
        }
    });
    
    // Window resize handler
    window.addEventListener('resize', updateSliderWidth);
    
    function updateSliderWidth() {
        const slideWidth = slider.parentElement.offsetWidth;
        slider.style.width = `${slideWidth * images.length}px`;
        slider.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
    }
    
    function updateSlider() {
        const slideWidth = slider.parentElement.offsetWidth;
        slider.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
        
        // Update dots
        document.querySelectorAll('.dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }
    
    // Auto-play (optional)
    let autoPlayInterval;
    
    function startAutoPlay() {
        autoPlayInterval = setInterval(() => {
            currentSlide = (currentSlide + 1) % images.length;
            updateSlider();
        }, 5000);
    }
    
    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }
    
    // Start auto-play and handle hover
    startAutoPlay();
    slider.addEventListener('mouseenter', stopAutoPlay);
    slider.addEventListener('mouseleave', startAutoPlay);
} 
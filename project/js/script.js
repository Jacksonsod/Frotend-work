document.addEventListener('DOMContentLoaded', function () {
    // ===================== DARK MODE TOGGLE =====================
    const toggle = document.getElementById('modeToggle');
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    document.body.classList.toggle('dark-mode', isDarkMode);
    toggle.checked = isDarkMode;

    toggle.addEventListener('change', () => {
        const enabled = toggle.checked;
        document.body.classList.toggle('dark-mode', enabled);
        localStorage.setItem('darkMode', enabled);
    });

    // ===================== CLOCKS =====================
    function updateDigitalClock() {
        const digitalClock = document.getElementById('digital-clock');
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        digitalClock.textContent = `${hours}:${minutes}:${seconds}`;
    }

    function updateAnalogClock() {
        const now = new Date();
        const hour = now.getHours();
        const minute = now.getMinutes();
        const second = now.getSeconds();

        // Update the hour hand, minute hand, and second hand
        const hourDeg = (hour % 12) * 30 + (minute / 60) * 30;
        const minuteDeg = minute * 6 + (second / 60) * 6;
        const secondDeg = second * 6;

        document.querySelector('.hour-hand').style.transform = `rotate(${hourDeg}deg)`;
        document.querySelector('.minute-hand').style.transform = `rotate(${minuteDeg}deg)`;
        document.querySelector('.second-hand').style.transform = `rotate(${secondDeg}deg)`;
    }

    // Initialize clocks and update every second
    function startClocks() {
        updateDigitalClock();
        updateAnalogClock();

        setInterval(() => {
            updateDigitalClock();
            updateAnalogClock();
        }, 1000); // Update every second
    }

    // Start clocks after DOM is loaded
    startClocks();
});


    // ===================== FULLSCREEN LIGHTBOX & ZOOM =====================
    const fullScreenLightbox = document.createElement('div');
    fullScreenLightbox.classList.add('fullscreen-lightbox');
    fullScreenLightbox.innerHTML = `<img src="" alt="Full Screen Image">`;
    document.body.appendChild(fullScreenLightbox);

    const fullScreenImg = fullScreenLightbox.querySelector('img');
    let currentFullScreenIndex = 0;

    // Get carousel images
    const carouselImages = Array.from(document.querySelectorAll('.carousel-images img'));

    // Open full-screen when clicked
    carouselImages.forEach((img, index) => {
        img.addEventListener('click', () => {
            currentFullScreenIndex = index;
            openFullScreen(index);
        });
    });

    function openFullScreen(index) {
        const src = carouselImages[index].src;
        fullScreenImg.src = src;
        fullScreenLightbox.classList.add('active');
    }

    function closeFullScreen() {
        fullScreenLightbox.classList.remove('active');
        fullScreenImg.src = '';
    }

    function showNextFullScreenImage() {
        currentFullScreenIndex = (currentFullScreenIndex + 1) % carouselImages.length;
        openFullScreen(currentFullScreenIndex);
    }

    function showPrevFullScreenImage() {
        currentFullScreenIndex = (currentFullScreenIndex - 1 + carouselImages.length) % carouselImages.length;
        openFullScreen(currentFullScreenIndex);
    }

    // Click outside image closes lightbox
    fullScreenLightbox.addEventListener('click', (e) => {
        if (e.target !== fullScreenImg) {
            closeFullScreen();
        }
    });

    // Keyboard navigation for fullscreen images
    document.addEventListener('keydown', (e) => {
        if (!fullScreenLightbox.classList.contains('active')) return;

        switch (e.key) {
            case 'ArrowRight':
                showNextFullScreenImage();
                break;
            case 'ArrowLeft':
                showPrevFullScreenImage();
                break;
            case 'Escape':
                closeFullScreen();
                break;
        }
    });

    // ===================== IMAGE GALLERY ZOOM =====================
    const galleryImages = document.querySelectorAll('.gallery-image');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');

    let scale = 1; // Keep track of zoom level

    // Open lightbox when an image is clicked
    galleryImages.forEach(image => {
        image.addEventListener('click', () => {
            lightboxImg.src = image.src; // Set image source to the clicked image
            lightbox.classList.add('active');
        });
    });

    // Close lightbox when clicked outside of the image or on the image itself
    lightbox.addEventListener('click', (event) => {
        if (event.target === lightbox || event.target === lightboxImg) {
            lightbox.classList.remove('active');
            scale = 1; // Reset zoom scale when lightbox is closed
            lightboxImg.classList.remove('zoomed');
            lightboxImg.style.transform = 'scale(1)';
        }
    });

    // Zoom functionality using mouse wheel
    fullScreenImg.addEventListener('wheel', (event) => {
        event.preventDefault();

        if (event.deltaY < 0) {
            scale += 0.5; // Zoom in
        } else {
            scale -= 0.5; // Zoom out
        }

        // Set limits for zoom scale
        if (scale < 1) scale = 1;
        if (scale > 3) scale = 3;

        console.log(`Zoom scale: ${scale}`); // Debugging: Log the scale value
        fullScreenImg.style.transform = `scale(${scale})`;
        fullScreenImg.classList.add('zoomed'); // Change cursor when zoomed
    });

    // Click to zoom in/out on the image inside fullscreen
    fullScreenImg.addEventListener('click', () => {
        if (scale === 1) {
            scale = 2; // Zoom in when clicked
        } else {
            scale = 1; // Reset to original size when clicked again
        }

        console.log(`Zoom scale after click: ${scale}`); // Debugging: Log the scale value
        fullScreenImg.style.transform = `scale(${scale})`;
        fullScreenImg.classList.toggle('zoomed'); // Toggle zoomed class to change cursor
    });

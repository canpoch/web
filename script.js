// Language switching functionality
document.addEventListener('DOMContentLoaded', function() {
    const langButtons = document.querySelectorAll('.lang-btn');
    const elementsWithLang = document.querySelectorAll('[data-ca], [data-en]');
    let currentLang = 'ca';

    // Language switching
    langButtons.forEach(button => {
        button.addEventListener('click', function() {
            const newLang = this.id.replace('lang-', '');
            
            if (newLang !== currentLang) {
                currentLang = newLang;
                
                // Update active button
                langButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // Update all text elements
                elementsWithLang.forEach(element => {
                    const text = element.getAttribute(`data-${currentLang}`);
                    if (text) {
                        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                            element.placeholder = text;
                        } else {
                            element.textContent = text;
                        }
                    }
                });
                
                // Update document language
                document.documentElement.lang = currentLang;
            }
        });
    });

    // Scroll indicator functionality
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            const firstSection = document.querySelector('#origen');
            if (firstSection) {
                firstSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }

    // Hide scroll indicator when scrolled past hero
    window.addEventListener('scroll', function() {
        const hero = document.querySelector('.hero');
        const scrollIndicator = document.querySelector('.scroll-indicator');
        
        if (hero && scrollIndicator) {
            const heroHeight = hero.offsetHeight;
            const scrollY = window.scrollY;
            
            if (scrollY > heroHeight * 0.5) {
                scrollIndicator.style.opacity = '0';
                scrollIndicator.style.pointerEvents = 'none';
            } else {
                scrollIndicator.style.opacity = '1';
                scrollIndicator.style.pointerEvents = 'auto';
            }
        }
    });

    // Mobile menu toggle (for future enhancement)
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Contact form is handled by Formspree, no custom JavaScript needed

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add scroll-based navbar styling
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(240, 234, 214, 0.98)';
                navbar.style.borderBottom = '1px solid rgba(74, 93, 74, 0.2)';
            } else {
                navbar.style.background = 'rgba(240, 234, 214, 0.95)';
                navbar.style.borderBottom = '1px solid rgba(74, 93, 74, 0.1)';
            }
        }
    });

    // Gallery functionality
    const galleryCategories = document.querySelectorAll('.gallery-category');
    const photoModal = document.getElementById('photoModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalImage = document.getElementById('modalImage');
    const thumbnailsContainer = document.getElementById('thumbnailsContainer');
    const closeModal = document.querySelector('.close-modal');
    const prevButton = document.querySelector('.modal-prev');
    const nextButton = document.querySelector('.modal-next');
    const photoCounter = document.querySelector('.photo-counter');
    
    let currentPhotos = [];
    let currentPhotoIndex = 0;
    let currentCategory = '';

    // Photo arrays for each category
    const photoCollections = {
        casa_teva_al_bosc: [
            'CanPoch_FotosMontseCapdevila_low-08165.jpg',
            'CanPoch_FotosMontseCapdevila_low-08187.jpg',
            'CanPoch_FotosMontseCapdevila_low-08288.jpg',
            'CanPoch_FotosMontseCapdevila_low-08319.jpg',
            'CanPoch_FotosMontseCapdevila_low-08382.jpg',
            'CanPoch_FotosMontseCapdevila_low-08481.jpg',
            'CanPoch_FotosMontseCapdevila_low-08527.jpg',
            'CanPoch_FotosMontseCapdevila_low-08678.jpg',
            'CanPoch_FotosMontseCapdevila_low-08737.jpg',
            'CanPoch_FotosMontseCapdevila_low-08794.jpg',
            'CanPoch_FotosMontseCapdevila_low-08860.jpg',
            'CanPoch_FotosMontseCapdevila_low-08926.jpg',
            'CanPoch_FotosMontseCapdevila_low-08966.jpg',
            'CanPoch_FotosMontseCapdevila_low-09004.jpg',
            'CanPoch_FotosMontseCapdevila_low-09290.jpg',
            'CanPoch_FotosMontseCapdevila_low-09330.jpg',
            'CanPoch_FotosMontseCapdevila_low-09331.jpg',
            'CanPoch_FotosMontseCapdevila_low-09595.jpg',
            'CanPoch_FotosMontseCapdevila_low-09630.jpg',
            'CanPoch_FotosMontseCapdevila_low-09690 còpia.jpg',
            'CanPoch_FotosMontseCapdevila_low-09740.jpg'
        ],
        exterior: [
            'CanPoch_FotosMontseCapdevila_low-07392.jpg',
            'CanPoch_FotosMontseCapdevila_low-07396.jpg',
            'CanPoch_FotosMontseCapdevila_low-07400.jpg',
            'CanPoch_FotosMontseCapdevila_low-07418.jpg',
            'CanPoch_FotosMontseCapdevila_low-07419.jpg',
            'CanPoch_FotosMontseCapdevila_low-07426.jpg',
            'CanPoch_FotosMontseCapdevila_low-07432.jpg',
            'CanPoch_FotosMontseCapdevila_low-07442.jpg',
            'CanPoch_FotosMontseCapdevila_low-07446.jpg',
            'CanPoch_FotosMontseCapdevila_low-07460.jpg',
            'CanPoch_FotosMontseCapdevila_low-07463.jpg',
            'CanPoch_FotosMontseCapdevila_low-07490.jpg',
            'CanPoch_FotosMontseCapdevila_low-07509.jpg',
            'CanPoch_FotosMontseCapdevila_low-07517.jpg',
            'CanPoch_FotosMontseCapdevila_low-07559.jpg',
            'CanPoch_FotosMontseCapdevila_low-08000 còpia.jpg',
            'CanPoch_FotosMontseCapdevila_low-08019.jpg',
            'CanPoch_FotosMontseCapdevila_low-08022.jpg',
            'CanPoch_FotosMontseCapdevila_low-08517.jpg',
            'CanPoch_FotosMontseCapdevila_low-09419.jpg',
            'CanPoch_FotosMontseCapdevila_low-09525.jpg',
            'CanPoch_FotosMontseCapdevila_low-09536.jpg',
            'CanPoch_FotosMontseCapdevila_low-09539.jpg',
            'CanPoch_FotosMontseCapdevila_low-09605.jpg',
            'CanPoch_FotosMontseCapdevila_low-09607.jpg'
        ],
        interior: [
            'CanPoch_FotosMontseCapdevila_low-07568.jpg',
            'CanPoch_FotosMontseCapdevila_low-07588.jpg',
            'CanPoch_FotosMontseCapdevila_low-07611.jpg',
            'CanPoch_FotosMontseCapdevila_low-07613.jpg',
            'CanPoch_FotosMontseCapdevila_low-07663.jpg',
            'CanPoch_FotosMontseCapdevila_low-07667.jpg',
            'CanPoch_FotosMontseCapdevila_low-07671.jpg',
            'CanPoch_FotosMontseCapdevila_low-07681.jpg',
            'CanPoch_FotosMontseCapdevila_low-07683.jpg',
            'CanPoch_FotosMontseCapdevila_low-07694.jpg',
            'CanPoch_FotosMontseCapdevila_low-07710.jpg',
            'CanPoch_FotosMontseCapdevila_low-07719.jpg',
            'CanPoch_FotosMontseCapdevila_low-07724.jpg',
            'CanPoch_FotosMontseCapdevila_low-07734.jpg',
            'CanPoch_FotosMontseCapdevila_low-07757.jpg',
            'CanPoch_FotosMontseCapdevila_low-07762.jpg',
            'CanPoch_FotosMontseCapdevila_low-07765.jpg',
            'CanPoch_FotosMontseCapdevila_low-07766.jpg',
            'CanPoch_FotosMontseCapdevila_low-07768.jpg',
            'CanPoch_FotosMontseCapdevila_low-07772.jpg',
            'CanPoch_FotosMontseCapdevila_low-07777.jpg',
            'CanPoch_FotosMontseCapdevila_low-07821.jpg',
            'CanPoch_FotosMontseCapdevila_low-07837.jpg',
            'CanPoch_FotosMontseCapdevila_low-07845.jpg',
            'CanPoch_FotosMontseCapdevila_low-07848.jpg',
            'CanPoch_FotosMontseCapdevila_low-07850.jpg',
            'CanPoch_FotosMontseCapdevila_low-07860.jpg',
            'CanPoch_FotosMontseCapdevila_low-07863.jpg',
            'CanPoch_FotosMontseCapdevila_low-07871.jpg',
            'CanPoch_FotosMontseCapdevila_low-07890.jpg',
            'CanPoch_FotosMontseCapdevila_low-07896.jpg',
            'CanPoch_FotosMontseCapdevila_low-07899.jpg',
            'CanPoch_FotosMontseCapdevila_low-07920.jpg',
            'CanPoch_FotosMontseCapdevila_low-07931.jpg',
            'CanPoch_FotosMontseCapdevila_low-07934.jpg',
            'CanPoch_FotosMontseCapdevila_low-07935.jpg',
            'CanPoch_FotosMontseCapdevila_low-07937.jpg',
            'CanPoch_FotosMontseCapdevila_low-07964.jpg',
            'CanPoch_FotosMontseCapdevila_low-07977.jpg',
            'CanPoch_FotosMontseCapdevila_low-07981.jpg',
            'CanPoch_FotosMontseCapdevila_low-07989.jpg',
            'CanPoch_FotosMontseCapdevila_low-08102.jpg',
            'CanPoch_FotosMontseCapdevila_low-08112.jpg',
            'CanPoch_FotosMontseCapdevila_low-08116.jpg',
            'CanPoch_FotosMontseCapdevila_low-08119.jpg'
        ]
    };

    // Open gallery when clicking on a category
    galleryCategories.forEach(category => {
        category.addEventListener('click', function() {
            const categoryName = this.getAttribute('data-category');
            const title = this.querySelector('h3').textContent;
            openGallery(categoryName, title);
        });
    });

    function openGallery(category, title) {
        currentCategory = category;
        currentPhotos = photoCollections[category];
        currentPhotoIndex = 0;
        
        modalTitle.textContent = title;
        photoModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Load thumbnails
        thumbnailsContainer.innerHTML = '';
        currentPhotos.forEach((photo, index) => {
            const thumb = document.createElement('img');
            thumb.src = `photos/${category}/${photo}`;
            thumb.alt = `${title} ${index + 1}`;
            thumb.className = 'thumbnail';
            thumb.addEventListener('click', () => showPhoto(index));
            thumbnailsContainer.appendChild(thumb);
        });
        
        showPhoto(0);
    }

    function showPhoto(index) {
        currentPhotoIndex = index;
        const photoPath = `photos/${currentCategory}/${currentPhotos[index]}`;
        modalImage.src = photoPath;
        modalImage.alt = `${modalTitle.textContent} ${index + 1}`;
        
        // Update counter
        photoCounter.textContent = `${index + 1} / ${currentPhotos.length}`;
        
        // Update active thumbnail
        const thumbnails = thumbnailsContainer.querySelectorAll('.thumbnail');
        thumbnails.forEach((thumb, i) => {
            thumb.classList.toggle('active', i === index);
        });
        
        // Scroll active thumbnail into view
        if (thumbnails[index]) {
            thumbnails[index].scrollIntoView({ behavior: 'smooth', inline: 'center' });
        }
    }

    // Navigation
    prevButton.addEventListener('click', () => {
        currentPhotoIndex = (currentPhotoIndex - 1 + currentPhotos.length) % currentPhotos.length;
        showPhoto(currentPhotoIndex);
    });

    nextButton.addEventListener('click', () => {
        currentPhotoIndex = (currentPhotoIndex + 1) % currentPhotos.length;
        showPhoto(currentPhotoIndex);
    });

    // Close modal
    function closeGallery() {
        photoModal.classList.remove('active');
        document.body.style.overflow = '';
    }

    closeModal.addEventListener('click', closeGallery);
    
    photoModal.addEventListener('click', function(e) {
        if (e.target === photoModal) {
            closeGallery();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (photoModal.classList.contains('active')) {
            if (e.key === 'ArrowLeft') {
                prevButton.click();
            } else if (e.key === 'ArrowRight') {
                nextButton.click();
            } else if (e.key === 'Escape') {
                closeGallery();
            }
        }
    });


}); 
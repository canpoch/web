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

    // Contact form submission (basic handling)
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Here you would typically send the data to a server
            console.log('Form data:', data);
            
            // Show success message (basic implementation)
            alert(currentLang === 'ca' ? 
                'Gràcies pel teu missatge! Ens posarem en contacte aviat.' : 
                'Thank you for your message! We will get in touch soon.');
            
            // Reset form
            this.reset();
        });
    }

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
                navbar.style.background = 'rgba(245, 241, 230, 0.98)';
                navbar.style.borderBottom = '1px solid rgba(74, 93, 74, 0.2)';
            } else {
                navbar.style.background = 'rgba(245, 241, 230, 0.95)';
                navbar.style.borderBottom = '1px solid rgba(74, 93, 74, 0.1)';
            }
        }
    });
}); 
// scripts.js

// Counter Animation
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200; // The lower the slower

    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        let count = 0;

        const updateCount = () => {
            const increment = target / speed;

            if (count < target) {
                count += increment;
                counter.innerText = Math.floor(count) + '+';
                setTimeout(updateCount, 10);
            } else {
                counter.innerText = target + '+';
            }
        };

        updateCount();
    });
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Variable to track if animation has run
let hasAnimated = false;

// Function to check and trigger animation
function checkAnimation() {
    const statsSection = document.querySelector('.statistics');

    if (statsSection && isInViewport(statsSection) && !hasAnimated) {
        animateCounters();
        hasAnimated = true;
    }
}

// Mobile menu toggle with improved functionality
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('nav ul');
    const menuIcon = document.querySelector('.mobile-menu-btn i');
    const header = document.querySelector('header');

    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Calculate header height dynamically
            const headerHeight = header ? header.offsetHeight : 100;
            
            navMenu.classList.toggle('active');

            // Set the top position dynamically
            if (navMenu.classList.contains('active')) {
                navMenu.style.paddingTop = (headerHeight + 20) + 'px';
            }

            // Change icon
            if (menuIcon) {
                if (navMenu.classList.contains('active')) {
                    menuIcon.classList.remove('fa-bars');
                    menuIcon.classList.add('fa-times');
                } else {
                    menuIcon.classList.remove('fa-times');
                    menuIcon.classList.add('fa-bars');
                }
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!mobileMenuBtn.contains(event.target) && !navMenu.contains(event.target) && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                if (menuIcon) {
                    menuIcon.classList.remove('fa-times');
                    menuIcon.classList.add('fa-bars');
                }
            }
        });

        // Close menu when clicking on a link
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                if (menuIcon) {
                    menuIcon.classList.remove('fa-times');
                    menuIcon.classList.add('fa-bars');
                }
            });
        });

        // Close menu on window resize
        window.addEventListener('resize', function() {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                if (menuIcon) {
                    menuIcon.classList.remove('fa-times');
                    menuIcon.classList.add('fa-bars');
                }
            }
        });
    }
}

// Initialize all functions when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize mobile menu
    initMobileMenu();

    // Check animation on scroll
    window.addEventListener('scroll', checkAnimation);

    // Check animation on load
    checkAnimation();
});

// Smooth scrolling
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

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.15)';
    } else {
        header.style.backgroundColor = 'white';
        header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    }
});

// Form submission
document.getElementById('contactForm').addEventListener('submit', function(e) {
    const submitBtn = this.querySelector('.btn');

    // Show loading state
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    // Let Formspree handle the rest
    // The form will submit normally to Formspree
});

function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');

    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        let count = 0;

        // Calculate animation duration based on value (larger numbers take longer)
        const duration = Math.min(3000, Math.max(1500, target * 15));
        const startTime = Date.now();

        const updateCount = () => {
            const currentTime = Date.now();
            const elapsedTime = currentTime - startTime;

            if (elapsedTime < duration) {
                // Using easeOutExpo for a more professional, slowing-down effect
                const progress = 1 - Math.pow(1 - (elapsedTime / duration), 4);
                count = Math.floor(progress * target);
                counter.innerText = count + '+';
                requestAnimationFrame(updateCount);
            } else {
                counter.innerText = target + '+';
            }
        };

        requestAnimationFrame(updateCount);
    });
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;

    // Element is considered in viewport when at least 20% of it is visible
    return (rect.top <= windowHeight * 0.8 && rect.bottom >= windowHeight * 0.2);
}

// Variable to track animations
const animatedElements = new Set();

// Scroll-triggered animations
function initScrollAnimations() {
    // Elements to animate on scroll
    const animatables = [
        { selector: '.about-content > div', animation: 'fade-in-up', delay: 0.2 },
        { selector: '.service-card', animation: 'fade-in-up', delay: 0.15 },
        { selector: '.project-card', animation: 'fade-in', delay: 0.1 },
        { selector: '.value-card', animation: 'fade-in-scale', delay: 0.1 },
        { selector: '.contact-info, .contact-form', animation: 'fade-in-side', delay: 0 },
        { selector: '.section-title', animation: 'fade-in-title', delay: 0 }
    ];

    function checkAnimations() {
        animatables.forEach(({selector, animation, delay}) => {
            document.querySelectorAll(selector).forEach((element, index) => {
                // Skip already animated elements
                if (animatedElements.has(element)) return;

                if (isInViewport(element)) {
                    // Add animation classes with sequential delays
                    setTimeout(() => {
                        element.classList.add('animated', animation);
                        animatedElements.add(element);
                    }, index * (delay * 1000));
                }
            });
        });

        // Check for statistics section to trigger counter animation
        const statsSection = document.querySelector('.statistics');
        if (statsSection && isInViewport(statsSection) && !animatedElements.has(statsSection)) {
            animateCounters();
            animatedElements.add(statsSection);
        }
    }

    // Add event listeners
    window.addEventListener('scroll', checkAnimations, { passive: true });
    window.addEventListener('resize', checkAnimations, { passive: true });

    // Initial check
    checkAnimations();
}

// Parallax effect for hero section
function initParallax() {
    const hero = document.querySelector('.hero');

    if (hero) {
        window.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY;

            if (scrollPosition < window.innerHeight) {
                // Move background image slowly on scroll
                hero.style.backgroundPosition = `center ${scrollPosition * 0.4}px`;
            }
        }, { passive: true });
    }
}

// Smooth header transitions
function initHeaderAnimations() {
    const header = document.querySelector('header');
    const logoText = document.querySelector('.logo-text h1');
    let lastScrollY = window.scrollY;

    if (header) {
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            const scrollingDown = scrollY > lastScrollY;
            lastScrollY = scrollY;

            if (scrollY > 100) {
                header.classList.add('header-scrolled');

                // If scrolling down rapidly, hide header
                if (scrollingDown && scrollY > 300 && (scrollY - lastScrollY) > 10) {
                    header.style.transform = 'translateY(-100%)';
                } else {
                    header.style.transform = 'translateY(0)';
                }
            } else {
                header.classList.remove('header-scrolled');
            }
        }, { passive: true });
    }
}

// Project hover effects
function initProjectAnimations() {
    const projects = document.querySelectorAll('.project-card');

    projects.forEach(project => {
        const overlay = project.querySelector('.project-overlay');
        const img = project.querySelector('img');

        project.addEventListener('mouseenter', () => {
            overlay.style.opacity = '1';
            img.style.transform = 'scale(1.05)';
        });

        project.addEventListener('mouseleave', () => {
            overlay.style.opacity = '0';
            img.style.transform = 'scale(1)';
        });
    });
}

// Service card hover animations
function initServiceAnimations() {
    const services = document.querySelectorAll('.service-card');

    services.forEach(card => {
        const img = card.querySelector('.service-card-img img');

        card.addEventListener('mouseenter', () => {
            img.style.transform = 'scale(1.1)';
            card.style.transform = 'translateY(-10px)';
            card.style.boxShadow = '0 15px 30px rgba(0,0,0,0.1)';
        });

        card.addEventListener('mouseleave', () => {
            img.style.transform = 'scale(1)';
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = '0 5px 15px rgba(0,0,0,0.05)';
        });
    });
}

// Smooth scrolling with improved easing
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);

            if (target) {
                // Close mobile menu if open
                const navMenu = document.querySelector('nav ul');
                const menuIcon = document.querySelector('.mobile-menu-btn i');

                if (navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    if (menuIcon) {
                        menuIcon.classList.remove('fa-times');
                        menuIcon.classList.add('fa-bars');
                    }
                }

                // Calculate offset for header height
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;
                const startPosition = window.scrollY;
                const distance = targetPosition - startPosition;

                // Smooth scroll with easing
                let startTime = null;
                const duration = 1000; // 1 second

                function animation(currentTime) {
                    if (startTime === null) startTime = currentTime;
                    const timeElapsed = currentTime - startTime;
                    const progress = Math.min(timeElapsed / duration, 1);

                    // easeInOutQuad easing
                    const easing = progress < 0.5
                        ? 2 * progress * progress
                        : 1 - Math.pow(-2 * progress + 2, 2) / 2;

                    window.scrollTo(0, startPosition + distance * easing);

                    if (timeElapsed < duration) {
                        requestAnimationFrame(animation);
                    }
                }

                requestAnimationFrame(animation);
            }
        });
    });
}

// Form animations
function initFormAnimations() {
    const formInputs = document.querySelectorAll('.form-control');

    formInputs.forEach(input => {
        // Add focus effects
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', () => {
            input.parentElement.classList.remove('focused');

            // Add filled class if input has value
            if (input.value.trim() !== '') {
                input.parentElement.classList.add('filled');
            } else {
                input.parentElement.classList.remove('filled');
            }
        });

        // Check initial state
        if (input.value.trim() !== '') {
            input.parentElement.classList.add('filled');
        }
    });

    // Form submission animation
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        // Update form to use Formspree
        contactForm.action = 'https://formspree.io/f/mrbkqylr';
        contactForm.method = 'POST';

        // Add hidden field for better email subject
        const hiddenInput = document.createElement('input');
        hiddenInput.type = 'hidden';
        hiddenInput.name = '_subject';
        hiddenInput.value = 'New Contact Form Submission - Cooper Construction';
        contactForm.appendChild(hiddenInput);

        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Add submitting class
            contactForm.classList.add('submitting');

            // Create FormData to send to Formspree
            const formData = new FormData(contactForm);

            // Submit to Formspree using fetch
            fetch('https://formspree.io/f/mvgrzakb', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            }).then(response => {
                contactForm.classList.remove('submitting');

                if (response.ok) {
                    contactForm.classList.add('submitted');

                    // Display success message
                    const successMessage = document.createElement('div');
                    successMessage.className = 'success-message';
                    successMessage.innerHTML = `
                    <div class="success-icon">
                        <i class="fas fa-check-circle"></i>
                    </div>
                    <h3>Message Sent Successfully!</h3>
                    <p>Thank you for contacting us. We will get back to you soon.</p>
                `;

                    // Replace form with success message
                    contactForm.parentNode.appendChild(successMessage);
                    contactForm.style.display = 'none';

                    // Reset form
                    setTimeout(() => {
                        contactForm.reset();
                        const formInputs = document.querySelectorAll('.form-control');
                        formInputs.forEach(input => {
                            if (input.parentElement) {
                                input.parentElement.classList.remove('filled');
                            }
                        });
                    }, 500);
                } else {
                    throw new Error('Form submission failed');
                }
            }).catch(error => {
                contactForm.classList.remove('submitting');

                // Display error message
                const errorMessage = document.createElement('div');
                errorMessage.className = 'error-message';
                errorMessage.innerHTML = `
                <div class="error-icon">
                    <i class="fas fa-exclamation-triangle"></i>
                </div>
                <h3>Oops! Something went wrong</h3>
                <p>Please try again or contact us directly at coopershoringandpiling@gmail.com</p>
            `;

                contactForm.parentNode.insertBefore(errorMessage, contactForm);

                // Remove error message after 5 seconds
                setTimeout(() => {
                    if (errorMessage.parentNode) {
                        errorMessage.parentNode.removeChild(errorMessage);
                    }
                }, 5000);
            });
        });
    }
}

// Logo animation on hover
function initLogoAnimation() {
    const logo = document.querySelector('.logo');
    const logoText = document.querySelector('.logo-text h1');

    if (logo && logoText) {
        logo.addEventListener('mouseenter', () => {
            logoText.style.transform = 'translateY(-2px)';
        });

        logo.addEventListener('mouseleave', () => {
            logoText.style.transform = 'translateY(0)';
        });
    }
}

// Add required CSS for animations
function addAnimationStyles() {
    const styleSheet = document.createElement('style');
    styleSheet.innerHTML = `
        /* Animation Classes */
        .animated {
            animation-duration: 0.8s;
            animation-fill-mode: both;
        }
        
        /* Header animations */
        header {
            transition: transform 0.4s ease, background-color 0.3s ease, box-shadow 0.3s ease;
        }
        
        .header-scrolled {
            background-color: rgba(255, 255, 255, 0.98) !important;
            box-shadow: 0 2px 20px rgba(0,0,0,0.15) !important;
        }
        
        .header-scrolled .logo-text h1 {
            font-size: 22px;
        }
        
        .logo-text h1, .logo-text span {
            transition: all 0.3s ease;
        }
        
        /* Form focus effects */
        .form-group {
            position: relative;
        }
        
        .form-control {
            transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }
        
        .form-group.focused .form-control {
            border-color: var(--primary);
            box-shadow: 0 0 0 3px rgba(112, 154, 213, 0.2);
        }
        
        /* Form submission animation */
        .submitting .btn {
            background-color: #ccc;
            pointer-events: none;
            position: relative;
        }
        
        .submitting .btn::after {
            content: '';
            position: absolute;
            width: 20px;
            height: 20px;
            border: 2px solid white;
            border-top-color: transparent;
            border-radius: 50%;
            right: 15px;
            top: calc(50% - 10px);
            animation: rotate 0.8s linear infinite;
        }
        
        .success-message {
            text-align: center;
            padding: 40px;
            animation: fadeIn 0.5s ease;
        }
        
        .success-icon {
            font-size: 60px;
            color: #4CAF50;
            margin-bottom: 20px;
        }
        
        /* Animation keyframes */
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes fadeInUp {
            from { 
                opacity: 0; 
                transform: translateY(30px);
            }
            to { 
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes fadeInDown {
            from { 
                opacity: 0; 
                transform: translateY(-30px);
            }
            to { 
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes fadeInLeft {
            from { 
                opacity: 0; 
                transform: translateX(-30px);
            }
            to { 
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        @keyframes fadeInRight {
            from { 
                opacity: 0; 
                transform: translateX(30px);
            }
            to { 
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        @keyframes scaleIn {
            from { 
                opacity: 0; 
                transform: scale(0.9);
            }
            to { 
                opacity: 1;
                transform: scale(1);
            }
        }
        
        @keyframes rotate {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        /* Apply animation classes */
        .fade-in { animation-name: fadeIn; }
        .fade-in-up { animation-name: fadeInUp; }
        .fade-in-down { animation-name: fadeInDown; }
        .fade-in-title { animation-name: fadeInDown; }
        .fade-in-scale { animation-name: scaleIn; }
        .fade-in-side:nth-child(odd) { animation-name: fadeInLeft; }
        .fade-in-side:nth-child(even) { animation-name: fadeInRight; }
        
        /* Service cards and project cards animations */
        .service-card, .project-card, .value-card {
            opacity: 0;
            transition: transform 0.4s ease, box-shadow 0.4s ease;
        }
        
        .service-card-img img, .project-card img {
            transition: transform 0.5s ease;
        }
        
        .project-overlay {
            transition: opacity 0.4s ease;
        }
        
        /* Button animations */
        .btn {
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        
        .btn:hover {
            transform: translateY(-3px);
            box-shadow: 0 8px 25px rgba(112, 154, 213, 0.4);
        }
        
        .btn:active {
            transform: translateY(-1px);
            box-shadow: 0 4px 15px rgba(112, 154, 213, 0.4);
        }
        
        /* Social links animations */
        .social-link {
            transition: all 0.3s ease;
        }
        
        .social-link:hover {
            transform: translateY(-5px);
        }
        
        /* Navigation animation */
        nav ul li a::after {
            transition: width 0.3s ease;
        }
        
        /* Mobile menu animation */
        nav ul {
            transition: all 0.3s ease-in-out;
        }
        
        .mobile-menu-btn i {
            transition: all 0.3s ease;
        }
        
        /* Hero section animations */
        .hero {
            position: relative;
            overflow: hidden;
        }
        
        .hero::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: radial-gradient(circle at center, rgba(25, 115, 141, 0.7) 0%, rgba(31, 34, 50, 0.9) 70%);
            z-index: 1;
        }
        
        .hero-content {
            position: relative;
            z-index: 2;
            opacity: 0;
            animation: heroContentFadeIn 1.2s forwards 0.5s;
        }
        
        @keyframes heroContentFadeIn {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        /* Responsive animations */
        @media (max-width: 768px) {
            .animated {
                animation-duration: 0.6s;
            }
            
            .header-scrolled .logo-text h1 {
                font-size: 20px;
            }
        }
    `;

    document.head.appendChild(styleSheet);
}

// Initialize all animations
document.addEventListener('DOMContentLoaded', function() {
    // Add animation styles
    addAnimationStyles();

    // Initialize all animations
    initHeaderAnimations();
    initParallax();
    initScrollAnimations();
    initProjectAnimations();
    initServiceAnimations();
    initSmoothScroll();
    initFormAnimations();
    initLogoAnimation();

    // Initial animations for hero section
    setTimeout(() => {
        document.querySelector('.hero-content')?.classList.add('animated', 'fade-in-up');
    }, 300);
})

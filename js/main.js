/**
 * CodeVerse Symposium - Main JavaScript File
 * Contains all core functionality for the website
 */

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const navMenu = document.querySelector('nav ul');
    
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('show');
            this.querySelector('i').classList.toggle('fa-times');
            this.querySelector('i').classList.toggle('fa-bars');
        });
    }

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navMenu.classList.contains('show')) {
                    navMenu.classList.remove('show');
                    mobileMenuBtn.querySelector('i').classList.replace('fa-times', 'fa-bars');
                }
            }
        });
    });

    // Header Scroll Effect
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // Countdown Timer
    const countdownElement = document.getElementById('countdown');
    if (countdownElement) {
        const eventDate = new Date('September 3, 2025 08:00:00').getTime();
        
        const updateCountdown = setInterval(function() {
            const now = new Date().getTime();
            const distance = eventDate - now;
            
            if (distance < 0) {
                clearInterval(updateCountdown);
                countdownElement.innerHTML = '<div class="countdown-ended">Event has started!</div>';
                return;
            }
            
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            document.getElementById('days').textContent = days.toString().padStart(2, '0');
            document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
            document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
            document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
        }, 1000);
    }

    // Scroll Animation Trigger
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('[data-animate]');
        const windowHeight = window.innerHeight;
        const triggerPoint = windowHeight * 0.85;
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            
            if (elementPosition < triggerPoint) {
                element.classList.add('animated');
            }
        });
    };
    
    // Initial check and scroll event listener
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);

    // Round Tabs Functionality
    const roundTabs = document.querySelectorAll('.round-tab');
    const roundSections = document.querySelectorAll('.round-details');
    
    if (roundTabs.length && roundSections.length) {
        roundTabs.forEach(tab => {
            tab.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Remove active class from all tabs and sections
                roundTabs.forEach(t => t.classList.remove('active'));
                roundSections.forEach(s => s.classList.remove('active'));
                
                // Add active class to clicked tab
                this.classList.add('active');
                
                // Show corresponding section
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    targetSection.classList.add('active');
                    
                    // Smooth scroll to section
                    window.scrollTo({
                        top: targetSection.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Form Validation for Contact Page
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            const requiredFields = this.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    field.style.borderColor = '#ff6b6b';
                    isValid = false;
                } else {
                    field.style.borderColor = '#444';
                }
            });
            
            if (isValid) {
                const successMessage = document.getElementById('contact-success');
                if (successMessage) {
                    successMessage.style.display = 'block';
                    this.reset();
                    
                    setTimeout(() => {
                        successMessage.style.display = 'none';
                    }, 5000);
                }
            } else {
                // Scroll to first error
                const firstError = this.querySelector('[required]:invalid');
                if (firstError) {
                    firstError.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center'
                    });
                }
            }
        });
    }

    // Initialize all animations on page load
    const animatedElements = document.querySelectorAll('[data-animate]');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
    });
});
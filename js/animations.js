/**
 * CodeVerse Symposium - Interactive Animations
 * Handles all dynamic animations and scroll effects
 */

class SymposiumAnimations {
  constructor() {
    this.animatedElements = document.querySelectorAll('[data-animate]');
    this.intersectionObserver = null;
    this.scrollProgress = document.getElementById('scroll-progress');
    this.codeElements = document.querySelectorAll('.code-block');
    this.interactiveCards = document.querySelectorAll('.interactive-card');
    
    this.init();
  }

  init() {
    // Initialize all animations
    this.setupScrollAnimations();
    this.setupScrollProgress();
    this.setupCodeAnimations();
    this.setupInteractiveCards();
    this.setupParallaxEffects();
    this.setupHoverAnimations();

    // Initial check for elements in viewport
    this.checkElementsInViewport();
  }

  setupScrollAnimations() {
    // Use Intersection Observer for better performance
    this.intersectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
          this.intersectionObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    });

    // Observe all animated elements
    this.animatedElements.forEach(el => {
      el.style.opacity = '0';
      this.intersectionObserver.observe(el);
    });
  }

  setupScrollProgress() {
    if (!this.scrollProgress) return;

    window.addEventListener('scroll', () => {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = (scrollTop / scrollHeight) * 100;
      
      this.scrollProgress.style.width = `${progress}%`;
      
      // Change color when reaching certain sections
      if (progress > 70) {
        this.scrollProgress.style.backgroundColor = 'var(--primary)';
      } else {
        this.scrollProgress.style.backgroundColor = 'var(--secondary)';
      }
    });
  }

  setupCodeAnimations() {
    this.codeElements.forEach(codeBlock => {
      // Animate code blocks when they come into view
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.animateCodeBlock(entry.target);
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.5 });

      observer.observe(codeBlock);
    });
  }

  animateCodeBlock(codeBlock) {
    // Get all lines of code
    const lines = codeBlock.querySelectorAll('.code-line');
    let delay = 0;
    
    // Animate each line with a slight delay
    lines.forEach(line => {
      setTimeout(() => {
        line.style.opacity = '1';
        line.style.transform = 'translateX(0)';
      }, delay);
      
      delay += 100; // 100ms delay between lines
    });
  }

  setupInteractiveCards() {
    this.interactiveCards.forEach(card => {
      // Tilt effect on mouse move
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const angleX = (y - centerY) / 20;
        const angleY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg)`;
      });
      
      // Reset on mouse leave
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
      });
    });
  }

  setupParallaxEffects() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    window.addEventListener('scroll', () => {
      const scrollPosition = window.pageYOffset;
      
      parallaxElements.forEach(element => {
        const speed = parseFloat(element.getAttribute('data-parallax'));
        const yPos = scrollPosition * speed;
        element.style.transform = `translateY(${yPos}px)`;
      });
    });
  }

  setupHoverAnimations() {
    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.btn, .gform-btn');
    
    buttons.forEach(button => {
      button.addEventListener('click', function(e) {
        // Remove any existing ripple
        const existingRipple = this.querySelector('.ripple');
        if (existingRipple) {
          existingRipple.remove();
        }
        
        // Create new ripple
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        
        // Position the ripple
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        
        this.appendChild(ripple);
        
        // Remove ripple after animation
        setTimeout(() => {
          ripple.remove();
        }, 1000);
      });
    });
  }

  checkElementsInViewport() {
    // Initial check for elements already in viewport
    this.animatedElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      const isVisible = (
        rect.top <= window.innerHeight * 0.75 &&
        rect.bottom >= 0
      );
      
      if (isVisible) {
        el.classList.add('animated');
      }
    });
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new SymposiumAnimations();
});

// Add CSS for animations
const animationStyles = document.createElement('style');
animationStyles.textContent = `
  /* Ripple effect */
  .ripple {
    position: absolute;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.7);
    transform: scale(0);
    animation: ripple 0.6s linear;
    pointer-events: none;
  }
  
  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
  
  /* Code line animations */
  .code-line {
    opacity: 0;
    transform: translateX(-20px);
    transition: all 0.5s ease-out;
  }
  
  /* Scroll progress bar */
  #scroll-progress {
    position: fixed;
    top: 0;
    left: 0;
    height: 4px;
    background: var(--secondary);
    z-index: 1000;
    transition: width 0.1s ease, background-color 0.3s ease;
  }
  
  /* Interactive cards */
  .interactive-card {
    transition: transform 0.5s ease-out;
    transform-style: preserve-3d;
  }
`;
document.head.appendChild(animationStyles);
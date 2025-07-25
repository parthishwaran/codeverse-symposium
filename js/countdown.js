/**
 * CodeVerse Symposium - Countdown Timer
 * Displays time remaining until the event starts
 */

class SymposiumCountdown {
  constructor() {
    // Event date: September 3, 2025 at 8:00 AM IST
    this.eventDate = new Date('2025-09-03T08:00:00+05:30').getTime();
    this.countdownElement = document.getElementById('countdown');
    this.daysElement = document.getElementById('days');
    this.hoursElement = document.getElementById('hours');
    this.minutesElement = document.getElementById('minutes');
    this.secondsElement = document.getElementById('seconds');
    
    // Time units in milliseconds
    this.second = 1000;
    this.minute = this.second * 60;
    this.hour = this.minute * 60;
    this.day = this.hour * 24;
    
    this.interval = null;
    
    this.init();
  }
  
  init() {
    if (!this.countdownElement) return;
    
    // Start the countdown immediately
    this.updateCountdown();
    
    // Update every second
    this.interval = setInterval(() => this.updateCountdown(), 1000);
    
    // Add animation classes
    this.addAnimations();
  }
  
  updateCountdown() {
    const now = new Date().getTime();
    const distance = this.eventDate - now;
    
    // If event has passed
    if (distance < 0) {
      this.handleEventStart();
      return;
    }
    
    // Calculate time units
    const days = Math.floor(distance / this.day);
    const hours = Math.floor((distance % this.day) / this.hour);
    const minutes = Math.floor((distance % this.hour) / this.minute);
    const seconds = Math.floor((distance % this.minute) / this.second);
    
    // Update DOM elements
    this.daysElement.textContent = days.toString().padStart(2, '0');
    this.hoursElement.textContent = hours.toString().padStart(2, '0');
    this.minutesElement.textContent = minutes.toString().padStart(2, '0');
    this.secondsElement.textContent = seconds.toString().padStart(2, '0');
    
    // Add pulse animation when any unit changes to 0
    this.checkForZeroValues(days, hours, minutes, seconds);
  }
  
  handleEventStart() {
    clearInterval(this.interval);
    
    // Create celebration effect
    this.countdownElement.innerHTML = `
      <div class="countdown-ended">
        <div class="celebration">
          <i class="fas fa-calendar-check"></i>
          <h3>The Event Has Started!</h3>
          <p>Join us now at the venue</p>
        </div>
      </div>
    `;
    
    // Add celebration styles
    const style = document.createElement('style');
    style.textContent = `
      .countdown-ended {
        text-align: center;
        animation: fadeIn 1s ease-out;
      }
      .celebration {
        background: rgba(108, 99, 255, 0.1);
        padding: 30px;
        border-radius: 10px;
        border: 2px solid var(--primary);
      }
      .celebration i {
        font-size: 3rem;
        color: var(--primary);
        margin-bottom: 15px;
        animation: pulse 2s infinite;
      }
      .celebration h3 {
        color: white;
        margin-bottom: 10px;
      }
      .celebration p {
        color: #aaa;
      }
    `;
    document.head.appendChild(style);
  }
  
  addAnimations() {
    // Add hover effects to each countdown item
    const items = document.querySelectorAll('.countdown-item');
    items.forEach(item => {
      item.addEventListener('mouseenter', () => {
        item.querySelector('span').style.transform = 'scale(1.2)';
        item.querySelector('span').style.color = 'white';
      });
      
      item.addEventListener('mouseleave', () => {
        item.querySelector('span').style.transform = 'scale(1)';
        item.querySelector('span').style.color = 'var(--primary)';
      });
    });
  }
  
  checkForZeroValues(days, hours, minutes, seconds) {
    // Add special animation when any unit reaches 0
    if (days === 0) {
      this.daysElement.parentElement.classList.add('highlight');
    } else {
      this.daysElement.parentElement.classList.remove('highlight');
    }
    
    if (hours === 0) {
      this.hoursElement.parentElement.classList.add('highlight');
    } else {
      this.hoursElement.parentElement.classList.remove('highlight');
    }
    
    if (minutes === 0) {
      this.minutesElement.parentElement.classList.add('highlight');
    } else {
      this.minutesElement.parentElement.classList.remove('highlight');
    }
    
    if (seconds === 0) {
      this.secondsElement.parentElement.classList.add('highlight');
    } else {
      this.secondsElement.parentElement.classList.remove('highlight');
    }
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new SymposiumCountdown();
});
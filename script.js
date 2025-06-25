// Mobile navigation toggle
document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu toggle functionality
  const navToggle = document.createElement('button');
  navToggle.className = 'nav-toggle btn';
  navToggle.innerHTML = '<i class="ri-menu-line"></i>';
  navToggle.style.display = 'none'; // Hidden by default
  
  const navContainer = document.querySelector('.nav__container');
  navContainer.appendChild(navToggle);
  
  const navLinks = document.querySelector('.nav__links');
  
  navToggle.addEventListener('click', function() {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
  });
  
  // Responsive behavior
  function handleResize() {
    if (window.innerWidth < 780) {
      navToggle.style.display = 'block';
      navLinks.style.display = 'none';
    } else {
      navToggle.style.display = 'none';
      navLinks.style.display = 'flex';
    }
  }
  
  // Initial check
  handleResize();
  
  // Add resize listener
  window.addEventListener('resize', handleResize);
  
  // Smooth scrolling for anchor links
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
        if (window.innerWidth < 780) {
          navLinks.style.display = 'none';
        }
      }
    });
  });
  
  // Doctor carousel functionality - UPDATED AND IMPROVED
  const doctorsGrid = document.querySelector('.doctors__grid');
  const doctorCards = document.querySelectorAll('.doctors__card');
  const prevBtn = document.querySelector('.doctors__nav span:first-child');
  const nextBtn = document.querySelector('.doctors__nav span:last-child');
  
  if (doctorsGrid && prevBtn && nextBtn && doctorCards.length > 0) {
    let currentIndex = 0;
    let cardsPerView = calculateCardsPerView();
    let isAnimating = false;
    const animationDuration = 300; // ms
    
    // Calculate visible cards based on screen size
    function calculateCardsPerView() {
      if (window.innerWidth < 600) return 1;
      if (window.innerWidth < 900) return 2;
      return 3;
    }
    
    // Get the width of a single card including margin/gap
    function getCardWidth() {
      const cardStyle = window.getComputedStyle(doctorCards[0]);
      const cardWidth = doctorCards[0].offsetWidth;
      const cardMargin = parseFloat(cardStyle.marginRight || 0);
      return cardWidth + cardMargin;
    }
    
    // Update carousel position with smooth transition
    function updateCarousel(direction = null) {
      if (isAnimating) return;
      isAnimating = true;
      
      const cardWidth = getCardWidth();
      const maxIndex = Math.max(0, doctorCards.length - cardsPerView);
      
      // Handle automatic wrapping if needed
      if (direction === 'next' && currentIndex >= maxIndex) {
        currentIndex = maxIndex;
      } else if (direction === 'prev' && currentIndex <= 0) {
        currentIndex = 0;
      }
      
      doctorsGrid.style.transition = `transform ${animationDuration}ms ease`;
      doctorsGrid.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
      
      // Update button states
      updateButtonStates();
      
      // Reset animation flag after transition completes
      setTimeout(() => {
        doctorsGrid.style.transition = '';
        isAnimating = false;
      }, animationDuration);
    }
    
    // Update navigation button states
    function updateButtonStates() {
      const maxIndex = Math.max(0, doctorCards.length - cardsPerView);
      prevBtn.classList.toggle('disabled', currentIndex === 0);
      nextBtn.classList.toggle('disabled', currentIndex >= maxIndex);
    }
    
    // Navigation handlers
    prevBtn.addEventListener('click', () => {
      if (currentIndex > 0) {
        currentIndex--;
        updateCarousel('prev');
      }
    });
    
    nextBtn.addEventListener('click', () => {
      if (currentIndex < doctorCards.length - cardsPerView) {
        currentIndex++;
        updateCarousel('next');
      }
    });
    
    // Handle window resize
    function handleCarouselResize() {
      const newCardsPerView = calculateCardsPerView();
      if (newCardsPerView !== cardsPerView) {
        cardsPerView = newCardsPerView;
        currentIndex = Math.min(currentIndex, Math.max(0, doctorCards.length - cardsPerView));
        updateCarousel();
      }
    }
    
    // Touch/swipe support for mobile devices
    let touchStartX = 0;
    let touchEndX = 0;
    const swipeThreshold = 50;
    
    doctorsGrid.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
    }, { passive: true });
    
    doctorsGrid.addEventListener('touchmove', (e) => {
      touchEndX = e.touches[0].clientX;
    }, { passive: true });
    
    doctorsGrid.addEventListener('touchend', () => {
      const diffX = touchStartX - touchEndX;
      if (Math.abs(diffX) > swipeThreshold) {
        if (diffX > 0) {
          // Swipe left - next
          nextBtn.click();
        } else {
          // Swipe right - previous
          prevBtn.click();
        }
      }
    }, { passive: true });
    
    // Initialize
    updateButtonStates();
    window.addEventListener('resize', handleCarouselResize);
    
    // Make first card slightly larger for better visual effect
    if (doctorCards.length > 0) {
      doctorCards[0].classList.add('active');
    }
  }
  
  // Form submission handling
  const bookingForm = document.querySelector('.header__form form');
  if (bookingForm) {
    bookingForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form values
      const firstName = this.querySelector('input[placeholder="First Name"]').value;
      const lastName = this.querySelector('input[placeholder="Last Name"]').value;
      
      // Simple validation
      if (!firstName || !lastName) {
        alert('Please fill in all required fields');
        return;
      }
      
      // In a real application, you would send this data to a server
      alert(`Thank you, ${firstName} ${lastName}! Your appointment request has been received. We'll contact you shortly.`);
      
      // Reset form
      this.reset();
    });
  }
  
  // Service card hover effects
  const serviceCards = document.querySelectorAll('.service__card');
  serviceCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-10px)';
      this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.15)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
      this.style.boxShadow = '5px 5px 20px rgba(0, 0, 0, 0.1)';
    });
  });
});

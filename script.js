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
  
  // Doctor carousel functionality
  const doctorsGrid = document.querySelector('.doctors__grid');
  const doctorCards = document.querySelectorAll('.doctors__card');
  const prevBtn = document.querySelector('.doctors__nav span:first-child');
  const nextBtn = document.querySelector('.doctors__nav span:last-child');
  
  if (doctorsGrid && prevBtn && nextBtn) {
    let currentIndex = 0;
    const cardWidth = doctorCards[0].offsetWidth + 32; // card + gap
    
    function updateCarousel() {
      doctorsGrid.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    }
    
    prevBtn.addEventListener('click', () => {
      if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
      }
    });
    
    nextBtn.addEventListener('click', () => {
      if (currentIndex < doctorCards.length - 3) {
        currentIndex++;
        updateCarousel();
      }
    });
    
    // Handle responsive behavior for carousel
    function handleCarouselResize() {
      if (window.innerWidth < 900) {
        doctorsGrid.style.transform = 'translateX(0)';
        currentIndex = 0;
      }
    }
    
    window.addEventListener('resize', handleCarouselResize);
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










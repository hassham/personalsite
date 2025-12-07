// Skills section toggle functionality
document.addEventListener('DOMContentLoaded', function() {
  const aboutSection = document.querySelector('#about');
  const skillsSection = document.querySelector('#skills');
  
  // Handle clicks on "Skills & Expertise" link
  document.addEventListener('click', function(e) {
    if (e.target.getAttribute('href') === '#skills') {
      e.preventDefault();
      if (aboutSection) aboutSection.style.display = 'none';
      if (skillsSection) skillsSection.style.display = 'block';
    }
    
    // Handle clicks on "Back" link
    if (e.target.getAttribute('href') === '#about' || e.target.classList.contains('back-link')) {
      e.preventDefault();
      if (skillsSection) skillsSection.style.display = 'none';
      if (aboutSection) aboutSection.style.display = 'block';
    }
  });
  
  // Smooth scroll for navigation links
  const navLinks = document.querySelectorAll('.main-nav a[href^="#"]');
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        e.preventDefault();
        window.scrollTo({
          top: targetSection.offsetTop - 100,
          behavior: 'smooth'
        });
      }
    });
  });
});

(function() {
  const revealElements = document.querySelectorAll('.scroll-reveal');
  
  const revealOnScroll = () => {
    const triggerBottom = window.innerHeight * 0.85;
    
    revealElements.forEach(el => {
      const elTop = el.getBoundingClientRect().top;
      
      if (elTop < triggerBottom) {
        el.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll(); // Initial check
})();

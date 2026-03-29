
  // ── SLIDESHOW ──
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot-btn');
  const progressBar = document.getElementById('progressBar');
  let current = 0;
  let timer;
  const DURATION = 5000;

  function goToSlide(n) {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = (n + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current].classList.add('active');
    resetProgress();
  }

  function changeSlide(dir) {
    goToSlide(current + dir);
    clearInterval(timer);
    timer = setInterval(() => goToSlide(current + 1), DURATION);
  }

  function resetProgress() {
    progressBar.style.transition = 'none';
    progressBar.style.width = '0%';
    requestAnimationFrame(() => requestAnimationFrame(() => {
      progressBar.style.transition = 'width ' + DURATION + 'ms linear';
      progressBar.style.width = '100%';
    }));
  }

  timer = setInterval(() => goToSlide(current + 1), DURATION);
  resetProgress();

  // ── SCROLL REVEAL ──
  const reveals = document.querySelectorAll('.reveal');
  reveals.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  });
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.opacity = '1';
        e.target.style.transform = 'none';
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.08 });
  reveals.forEach(el => observer.observe(el));

  // ── SUBMIT FEEDBACK ──
  document.querySelector('.btn-submit').addEventListener('click', function() {
    this.textContent = '✓ Message Sent!';
    this.style.background = '#2e7d32';
    setTimeout(() => { this.textContent = 'Send Message →'; this.style.background = ''; }, 3000);
  });

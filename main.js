document.addEventListener('DOMContentLoaded', () => {
  // Cache selectors
  const navLinks = document.querySelectorAll('.nav-links a');
  const sections = Array.from(navLinks).map(link => {
    const id = link.getAttribute('href').slice(1);
    return document.getElementById(id);
  });
  const themeToggle = document.createElement('button');
  const body = document.body;

  // Add theme toggle button to nav
  themeToggle.setAttribute('aria-label', 'Toggle Dark Mode');
  themeToggle.classList.add('theme-toggle');
  themeToggle.textContent = '🌙';
  document.querySelector('.nav-container').appendChild(themeToggle);

  // Load theme preference
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') body.classList.add('dark-mode');
  updateThemeToggle();

  // Smooth scroll for nav links
  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const targetId = link.getAttribute('href').slice(1);
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        window.scrollTo({
          top: targetSection.offsetTop - 70,
          behavior: 'smooth'
        });
      }
    });
  });

  // Highlight nav link on scroll
  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY + 80; // offset for nav height
    
    sections.forEach((section, index) => {
      if (section.offsetTop <= scrollPos && (section.offsetTop + section.offsetHeight) > scrollPos) {
        navLinks.forEach(link => link.classList.remove('active'));
        navLinks[index].classList.add('active');
      }
    });
  });

  // Theme toggle handler
  themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const isDark = body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    updateThemeToggle();
  });

  function updateThemeToggle() {
    themeToggle.textContent = body.classList.contains('dark-mode') ? '☀️' : '🌙';
  }
});

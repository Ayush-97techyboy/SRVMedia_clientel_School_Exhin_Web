document.addEventListener('DOMContentLoaded', () => {
  const mainHeader = document.getElementById('main-header');
  if (mainHeader) {
    const onScrollHeader = () => {
      if (window.scrollY > 30) {
        mainHeader.classList.add('header--scrolled');
      } else {
        mainHeader.classList.remove('header--scrolled');
      }
    };
    window.addEventListener('scroll', onScrollHeader, { passive: true });
    onScrollHeader();
  }
  
  if (window.DualAxisSlider) {
    new window.DualAxisSlider({
      container: '.hero__slider-wrapper',
      autoPlayInterval: 6000
    });
  }

  if (window.LogoMarquee) {
    new window.LogoMarquee();
  }

  if (window.SchoolCardsSlider) {
    new window.SchoolCardsSlider();
  }

  if (window.ExhibitionSlider) {
    new window.ExhibitionSlider();
  }

  const headerToggle = document.querySelector('.header__toggle');
  const headerNav = document.querySelector('.header__nav');

  if (headerToggle && headerNav) {
    headerToggle.addEventListener('click', () => {
      const isOpen = headerNav.classList.toggle('header__nav--open');
      headerToggle.setAttribute('aria-expanded', isOpen.toString());
      headerToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    });

    headerNav.querySelectorAll('.header__nav-link').forEach(link => {
      link.addEventListener('click', () => {
        headerNav.classList.remove('header__nav--open');
        headerToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  const heroForm = document.getElementById('hero-enquire-form');
  const regForm = document.getElementById('registration-form');
  const successAlert = document.getElementById('registration-success');

  if (heroForm) {
    heroForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!heroForm.checkValidity()) {
        heroForm.reportValidity();
        return;
      }
      alert('Thank you! Your enquiry has been received. Our team will contact you shortly.');
      heroForm.reset();
    });
  }

  if (regForm) {
    regForm.addEventListener('submit', (e) => {
      e.preventDefault();

      if (!regForm.checkValidity()) {
        regForm.reportValidity();
        return;
      }

      if (successAlert) {
        successAlert.classList.add('form-success-alert--visible');
        successAlert.focus();
      }

      regForm.reset();

      setTimeout(() => {
        if (successAlert) {
          successAlert.classList.remove('form-success-alert--visible');
        }
      }, 6000);
    });
  }

  const mustVisitContainer = document.getElementById('must-visit-container');
  const mustVisitPrev = document.getElementById('must-visit-prev');
  const mustVisitNext = document.getElementById('must-visit-next');

  if (mustVisitContainer && mustVisitPrev && mustVisitNext) {
    mustVisitPrev.addEventListener('click', () => {
      mustVisitContainer.scrollBy({ left: -340, behavior: 'smooth' });
    });
    mustVisitNext.addEventListener('click', () => {
      mustVisitContainer.scrollBy({ left: 340, behavior: 'smooth' });
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#hero-enquire-form' || targetId === '#register') {
        e.preventDefault();
        const targetElement = document.getElementById('register') || document.getElementById('hero-enquire-form');
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
          const nameInput = document.getElementById('hero-parent-name');
          if (nameInput) {
            setTimeout(() => nameInput.focus(), 400);
          }
        }
      } else if (targetId && targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          targetElement.focus();
        }
      }
    });
  });
});

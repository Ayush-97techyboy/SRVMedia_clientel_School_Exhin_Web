class SchoolCardsSlider {
  constructor() {
    this.grid = document.querySelector('.school-grid');
    this.dotsContainer = document.querySelector('.school-mobile-dots');
    if (!this.grid || !this.dotsContainer) return;

    this.cards = Array.from(this.grid.querySelectorAll('.school-card'));
    this.dots = [];
    this.init();
  }

  init() {
    
    this.dotsContainer.innerHTML = '';
    this.cards.forEach((card, index) => {
      const dot = document.createElement('button');
      dot.className = `school-mobile-dot ${index === 0 ? 'school-mobile-dot--active' : ''}`;
      dot.setAttribute('aria-label', `Go to school type ${index + 1}: ${card.querySelector('.school-card__title')?.textContent || ''}`);
      dot.addEventListener('click', () => {
        this.scrollToCard(index);
      });
      this.dotsContainer.appendChild(dot);
      this.dots.push(dot);
    });

    let scrollTimeout;
    this.grid.addEventListener('scroll', () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        this.updateActiveDotOnScroll();
      }, 100);
    });
  }

  scrollToCard(index) {
    if (this.cards[index]) {
      const cardWidth = this.cards[index].offsetWidth;
      this.grid.scrollTo({
        left: cardWidth * index,
        behavior: 'smooth'
      });
      this.setActiveDot(index);
    }
  }

  updateActiveDotOnScroll() {
    const scrollLeft = this.grid.scrollLeft;
    const cardWidth = this.cards[0]?.offsetWidth || 1;
    const activeIndex = Math.round(scrollLeft / cardWidth);
    this.setActiveDot(activeIndex);
  }

  setActiveDot(index) {
    this.dots.forEach((dot, idx) => {
      const isActive = idx === index;
      dot.classList.toggle('school-mobile-dot--active', isActive);
      dot.setAttribute('aria-selected', isActive.toString());
    });
  }
}

window.SchoolCardsSlider = SchoolCardsSlider;

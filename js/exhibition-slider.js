class ExhibitionSlider {
  constructor() {
    this.track = document.querySelector('.exhibition-track');
    if (!this.track) return;

    this.cards = Array.from(this.track.querySelectorAll('.exhibition-card'));
    this.prevBtn = document.querySelector('.exhibition-nav-btn--prev');
    this.nextBtn = document.querySelector('.exhibition-nav-btn--next');
    this.dotsContainer = document.querySelector('.exhibition-dots');
    this.liveRegion = document.getElementById('hero-aria-live');

    this.currentIndex = 0;
    this.visibleCount = this.getVisibleCount();
    this.maxIndex = Math.max(0, this.cards.length - this.visibleCount);
    this.dots = [];

    this.touchStartX = 0;
    this.touchEndX = 0;

    this.init();
  }

  getVisibleCount() {
    const width = window.innerWidth;
    if (width < 768) return 1;
    if (width < 992) return 2;
    return 3;
  }

  init() {
    this.createDots();

    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', () => this.prev());
    }
    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', () => this.next());
    }

    window.addEventListener('resize', () => {
      this.visibleCount = this.getVisibleCount();
      this.maxIndex = Math.max(0, this.cards.length - this.visibleCount);
      this.createDots();
      this.updateTrack();
    });

    this.track.addEventListener('touchstart', (e) => {
      this.touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    this.track.addEventListener('touchend', (e) => {
      this.touchEndX = e.changedTouches[0].screenX;
      this.handleSwipe();
    }, { passive: true });

    this.updateTrack();
  }

  createDots() {
    if (!this.dotsContainer) return;
    this.dotsContainer.innerHTML = '';
    this.dots = [];
    const totalDots = this.maxIndex + 1;

    for (let i = 0; i < totalDots; i++) {
      const dot = document.createElement('button');
      dot.className = `exhibition-dot ${i === this.currentIndex ? 'exhibition-dot--active' : ''}`;
      dot.setAttribute('aria-label', `Go to exhibition card slide ${i + 1}`);
      dot.addEventListener('click', () => this.goTo(i));
      this.dotsContainer.appendChild(dot);
      this.dots.push(dot);
    }
  }

  goTo(index) {
    if (index < 0) index = 0;
    if (index > this.maxIndex) index = this.maxIndex;

    this.currentIndex = index;
    this.updateTrack();
  }

  next() {
    if (this.currentIndex < this.maxIndex) {
      this.goTo(this.currentIndex + 1);
    } else {
      this.goTo(0);
    }
  }

  prev() {
    if (this.currentIndex > 0) {
      this.goTo(this.currentIndex - 1);
    } else {
      this.goTo(this.maxIndex);
    }
  }

  updateTrack() {
    const cardWidth = this.cards[0]?.offsetWidth || 0;
    const gap = 24; 
    const translateX = (cardWidth + gap) * this.currentIndex;

    this.track.style.transform = `translateX(-${translateX}px)`;

    this.dots.forEach((dot, idx) => {
      const isActive = idx === this.currentIndex;
      dot.classList.toggle('exhibition-dot--active', isActive);
      dot.setAttribute('aria-selected', isActive.toString());
    });

    if (this.liveRegion) {
      this.liveRegion.textContent = `Exhibition card slide ${this.currentIndex + 1} of ${this.maxIndex + 1}`;
    }
  }

  handleSwipe() {
    const deltaX = this.touchEndX - this.touchStartX;
    if (Math.abs(deltaX) > 40) {
      if (deltaX < 0) {
        this.next();
      } else {
        this.prev();
      }
    }
  }
}

window.ExhibitionSlider = ExhibitionSlider;

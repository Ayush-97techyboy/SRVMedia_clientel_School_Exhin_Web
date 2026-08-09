class DualAxisSlider {
  constructor(options = {}) {
    this.container = document.querySelector(options.container || '.hero__slider-wrapper');
    if (!this.container) return;

    this.slides = Array.from(this.container.querySelectorAll('.hero__slide'));
    this.dots = Array.from(document.querySelectorAll('.hero__dot'));
    this.prevBtn = document.querySelector('.hero__ctrl-btn--prev');
    this.nextBtn = document.querySelector('.hero__ctrl-btn--next');
    this.playPauseBtn = document.querySelector('.hero__play-pause-btn');
    this.liveRegion = document.getElementById('hero-aria-live');

    this.currentIndex = 0;
    this.autoPlayInterval = options.autoPlayInterval || 5000;
    this.isPlaying = true;
    this.timer = null;

    this.touchStartX = 0;
    this.touchStartY = 0;
    this.touchEndX = 0;
    this.touchEndY = 0;

    this.init();
  }

  init() {
    if (this.slides.length === 0) return;

    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', () => {
        this.prevSlide();
        this.resetAutoPlay();
      });
    }

    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', () => {
        this.nextSlide();
        this.resetAutoPlay();
      });
    }

    this.dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        this.goToSlide(index);
        this.resetAutoPlay();
      });
    });

    if (this.playPauseBtn) {
      this.playPauseBtn.addEventListener('click', () => {
        this.toggleAutoPlay();
      });
    }

    this.container.addEventListener('mouseenter', () => this.pauseAutoPlay());
    this.container.addEventListener('mouseleave', () => {
      if (this.isPlaying) this.startAutoPlay();
    });
    this.container.addEventListener('focusin', () => this.pauseAutoPlay());
    this.container.addEventListener('focusout', () => {
      if (this.isPlaying) this.startAutoPlay();
    });

    this.container.addEventListener('keydown', (e) => this.handleKeyDown(e));

    this.container.addEventListener('touchstart', (e) => {
      this.touchStartX = e.changedTouches[0].screenX;
      this.touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });

    this.container.addEventListener('touchend', (e) => {
      this.touchEndX = e.changedTouches[0].screenX;
      this.touchEndY = e.changedTouches[0].screenY;
      this.handleSwipe();
    }, { passive: true });

    this.initVerticalSubAxes();

    this.updateSliderState();
    this.startAutoPlay();
  }

  initVerticalSubAxes() {
    this.slides.forEach((slide) => {
      const vBtns = Array.from(slide.querySelectorAll('.hero__vertical-btn'));
      const vPanes = Array.from(slide.querySelectorAll('.hero__vertical-pane'));

      vBtns.forEach((btn, index) => {
        btn.addEventListener('click', () => {
          vBtns.forEach(b => {
            b.classList.remove('hero__vertical-btn--active');
            b.setAttribute('aria-selected', 'false');
          });
          vPanes.forEach(p => p.classList.remove('hero__vertical-pane--active'));

          btn.classList.add('hero__vertical-btn--active');
          btn.setAttribute('aria-selected', 'true');
          if (vPanes[index]) {
            vPanes[index].classList.add('hero__vertical-pane--active');
          }

          this.announceLive(`Selected highlight: ${btn.textContent.trim()}`);
        });
      });
    });
  }

  goToSlide(index) {
    if (index < 0) index = this.slides.length - 1;
    if (index >= this.slides.length) index = 0;

    this.currentIndex = index;
    this.updateSliderState();
  }

  nextSlide() {
    this.goToSlide(this.currentIndex + 1);
  }

  prevSlide() {
    this.goToSlide(this.currentIndex - 1);
  }

  updateSliderState() {
    this.slides.forEach((slide, index) => {
      const isActive = index === this.currentIndex;
      slide.classList.toggle('hero__slide--active', isActive);
      slide.setAttribute('aria-hidden', (!isActive).toString());

      if (isActive) {
        slide.removeAttribute('tabindex');
      } else {
        slide.setAttribute('tabindex', '-1');
      }
    });

    this.dots.forEach((dot, index) => {
      const isActive = index === this.currentIndex;
      dot.classList.toggle('hero__dot--active', isActive);
      dot.setAttribute('aria-selected', isActive.toString());
    });

    const activeTitle = this.slides[this.currentIndex]?.querySelector('.hero__title')?.textContent || '';
    this.announceLive(`Slide ${this.currentIndex + 1} of ${this.slides.length}: ${activeTitle.trim()}`);
  }

  startAutoPlay() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    this.pauseAutoPlay();
    this.timer = setInterval(() => {
      this.nextSlide();
    }, this.autoPlayInterval);
  }

  pauseAutoPlay() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  resetAutoPlay() {
    if (this.isPlaying) {
      this.startAutoPlay();
    }
  }

  toggleAutoPlay() {
    this.isPlaying = !this.isPlaying;
    if (this.isPlaying) {
      this.startAutoPlay();
      if (this.playPauseBtn) {
        this.playPauseBtn.setAttribute('aria-label', 'Pause slideshow');
        this.playPauseBtn.innerHTML = `<span>Pause</span>`;
      }
      this.announceLive('Slideshow resumed');
    } else {
      this.pauseAutoPlay();
      if (this.playPauseBtn) {
        this.playPauseBtn.setAttribute('aria-label', 'Play slideshow');
        this.playPauseBtn.innerHTML = `<span>Play</span>`;
      }
      this.announceLive('Slideshow paused');
    }
  }

  handleKeyDown(e) {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      this.nextSlide();
      this.resetAutoPlay();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      this.prevSlide();
      this.resetAutoPlay();
    } else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      
      const activeSlide = this.slides[this.currentIndex];
      const vBtns = Array.from(activeSlide.querySelectorAll('.hero__vertical-btn'));
      if (vBtns.length > 0) {
        let activeVIndex = vBtns.findIndex(b => b.classList.contains('hero__vertical-btn--active'));
        if (e.key === 'ArrowDown') {
          activeVIndex = (activeVIndex + 1) % vBtns.length;
        } else {
          activeVIndex = (activeVIndex - 1 + vBtns.length) % vBtns.length;
        }
        vBtns[activeVIndex].click();
      }
    }
  }

  handleSwipe() {
    const deltaX = this.touchEndX - this.touchStartX;
    const deltaY = this.touchEndY - this.touchStartY;

    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 40) {
      if (deltaX < 0) {
        this.nextSlide();
      } else {
        this.prevSlide();
      }
      this.resetAutoPlay();
    }
  }

  announceLive(text) {
    if (this.liveRegion) {
      this.liveRegion.textContent = text;
    }
  }
}

window.DualAxisSlider = DualAxisSlider;

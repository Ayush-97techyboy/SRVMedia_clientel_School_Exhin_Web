class LogoMarquee {
  constructor() {
    this.marqueeRows = document.querySelectorAll('.marquee__row');
    this.init();
  }

  init() {
    this.marqueeRows.forEach((row) => {
      row.addEventListener('mouseenter', () => this.pauseRow(row));
      row.addEventListener('mouseleave', () => this.resumeRow(row));
      row.addEventListener('focusin', () => this.pauseRow(row));
      row.addEventListener('focusout', () => this.resumeRow(row));
    });
  }

  pauseRow(row) {
    const groups = row.querySelectorAll('.marquee__group');
    groups.forEach(g => g.style.animationPlayState = 'paused');
  }

  resumeRow(row) {
    const groups = row.querySelectorAll('.marquee__group');
    groups.forEach(g => g.style.animationPlayState = 'running');
  }
}

window.LogoMarquee = LogoMarquee;

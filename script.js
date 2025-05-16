document.addEventListener('DOMContentLoaded', () => {
    // Smooth Scroll for Navigation
    class Navigation {
        constructor() {
            this.navLinks = document.querySelectorAll('.nav-link');
            this.init();
        }

        init() {
            this.navLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const targetId = link.getAttribute('href');
                    document.querySelector(targetId).scrollIntoView({ behavior: 'smooth' });
                });
            });
        }
    }

    new Navigation();

    // Horizontal Carousel
    class Carousel {
        constructor() {
            this.container = document.querySelector('.carousel-container');
            this.carousel = document.querySelector('.carousel');
            this.slides = document.querySelectorAll('.carousel-slide');
            this.prevBtn = document.querySelector('.prev-btn');
            this.nextBtn = document.querySelector('.next-btn');
            this.currentIndex = 0;
            this.touchStartX = 0;
            this.touchEndX = 0;
            this.autoScroll = null;
            this.init();
        }

        scrollToSlide(index) {
            if (index >= this.slides.length) {
                this.currentIndex = 0;
            } else if (index < 0) {
                this.currentIndex = this.slides.length - 1;
            } else {
                this.currentIndex = index;
            }
            const slide = this.slides[this.currentIndex];
            slide.scrollIntoView({ behavior: 'smooth', inline: 'start' });
        }

        startAutoScroll() {
            this.autoScroll = setInterval(() => {
                this.scrollToSlide(this.currentIndex + 1);
            }, 5000);
        }

        stopAutoScroll() {
            clearInterval(this.autoScroll);
        }

        init() {
            this.prevBtn.addEventListener('click', () => {
                this.scrollToSlide(this.currentIndex - 1);
            });

            this.nextBtn.addEventListener('click', () => {
                this.scrollToSlide(this.currentIndex + 1);
            });

            this.carousel.addEventListener('touchstart', (e) => {
                this.touchStartX = e.touches[0].clientX;
            });

            this.carousel.addEventListener('touchmove', (e) => {
                this.touchEndX = e.touches[0].clientX;
            });

            this.carousel.addEventListener('touchend', () => {
                const deltaX = this.touchEndX - this.touchStartX;
                if (deltaX > 50) {
                    this.scrollToSlide(this.currentIndex - 1);
                } else if (deltaX < -50) {
                    this.scrollToSlide(this.currentIndex + 1);
                }
            });

            this.carousel.addEventListener('mouseenter', () => this.stopAutoScroll());
            this.carousel.addEventListener('mouseleave', () => this.startAutoScroll());

            // Lazy load images
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target.querySelector('img');
                        if (img && img.dataset.src) {
                            img.src = img.dataset.src;
                            img.removeAttribute('data-src');
                        }
                        observer.unobserve(entry.target);
                    }
                });
            }, { rootMargin: '0px 0px 100px 0px' });

            this.slides.forEach(slide => {
                const img = slide.querySelector('img');
                if (img) {
                    img.dataset.src = img.src;
                    img.src = '';
                    observer.observe(slide);
                }
            });

            this.startAutoScroll();
            this.scrollToSlide(this.currentIndex);
        }
    }

    new Carousel();

    // Biodiversity Chart
    class BiodiversityChart {
        constructor() {
            this.ctx = document.getElementById('biodiversityChart').getContext('2d');
            this.data = {
                labels: ['Forests', 'Wetlands', 'Grasslands', 'Deserts'],
                datasets: [{
                    label: 'Biodiversity Index',
                    data: [60, 45, 30, 20],
                    backgroundColor: 'rgba(46, 125, 50, 0.5)',
                    borderColor: 'rgba(46, 125, 50, 1)',
                    borderWidth: 1
                }]
            };
            this.init();
        }

        init() {
            new Chart(this.ctx, {
                type: 'bar',
                data: this.data,
                options: {
                    responsive: true,
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: { display: true, text: 'Index', color: '#1b5e20' },
                            ticks: { color: '#1b5e20' }
                        },
                        x: {
                            title: { display: true, text: 'Ecosystem Type', color: '#1b5e20' },
                            ticks: { color: '#1b5e20' }
                        }
                    },
                    plugins: {
                        legend: { display: false },
                        title: {
                            display: true,
                            text: 'Biodiversity by Ecosystem (2025)',
                            color: '#1b5e20',
                            font: { size: 16 }
                        }
                    },
                    animation: {
                        duration: 1000,
                        easing: 'easeOutQuart'
                    }
                }
            });
        }
    }

    new BiodiversityChart();
});
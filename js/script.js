/**
 * Friends Cabs - Main JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {

    // --- Preloader ---
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                preloader.style.opacity = '0';
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 500);
            }, 800); // Small delay to let animations start smoothly
        });
    }

    // --- Sticky Navbar & Scroll Effects ---
    const header = document.querySelector('.header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- Mobile Hamburger Menu ---
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // --- Optimized Scroll Reveal Animations (IntersectionObserver) ---
    const revealElements = document.querySelectorAll('.reveal, .reveal-mobile');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // observer.unobserve(entry.target); // stop observing if you only want it once
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // Fallback for browsers/devices where IntersectionObserver may be delayed
    // or not fire during smooth scrolling. This manual check ensures animations
    // trigger as the user scrolls on mobile.
    const checkRevealsOnScroll = () => {
        revealElements.forEach(el => {
            if (!el.classList.contains('active')) {
                const rect = el.getBoundingClientRect();
                // trigger when element enters viewport (with slight offset)
                if (rect.top < window.innerHeight - 50) {
                    el.classList.add('active');
                }
            }
        });
    };

    window.addEventListener('scroll', checkRevealsOnScroll, { passive: true });
    window.addEventListener('touchmove', checkRevealsOnScroll, { passive: true });
    window.addEventListener('touchstart', checkRevealsOnScroll, { passive: true });
    window.addEventListener('resize', checkRevealsOnScroll);
    window.addEventListener('orientationchange', checkRevealsOnScroll);
    // also run once in case some elements are already in view on load
    checkRevealsOnScroll();

    // --- Mobile Touch Feedback Enhancements ---
    const interactiveElements = document.querySelectorAll('.btn, .highlight-card, .feature-item, .stat-item');

    interactiveElements.forEach(el => {
        el.addEventListener('touchstart', () => {
            el.classList.add('touch-active');
        }, { passive: true });

        el.addEventListener('touchend', () => {
            setTimeout(() => {
                el.classList.remove('touch-active');
            }, 150);
        }, { passive: true });
    });

    // --- Animated Counters (For Home and About pages) ---
    const counters = document.querySelectorAll('.counter-num');

    const startCounter = (counter) => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const speed = 200;
        const inc = target / speed;

        const updateCount = () => {
            const currentCount = +counter.innerText;
            if (currentCount < target) {
                counter.innerText = Math.ceil(currentCount + inc);
                setTimeout(updateCount, 20);
            } else {
                counter.innerText = target;
            }
        };

        if (counter.innerText == '0') {
            updateCount();
        }
    };

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startCounter(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));

    // --- Active Link Setter ---
    const currentPage = window.location.pathname.split('/').pop();
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (currentPage === linkPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        }
    });

});


/* ---- NAV TOGGLE ---- */
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    document.querySelectorAll(".sidebar a").forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });
}

/* ---- PORTFOLIO FILTER ---- */
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioCards = document.querySelectorAll('.portfolio-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {

        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        portfolioCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        });
    });
});

/* ---- VIDEO AUTOPLAY ON SCROLL ---- */
const videos = document.querySelectorAll('.video-wrapper video');

if ('IntersectionObserver' in window) {
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.play().catch(() => {});
            } else {
                entry.target.pause();
            }
        });
    }, { threshold: 0.4 });

    videos.forEach(video => {
        video.muted = true;
        video.loop = true;
        video.playsInline = true;
        videoObserver.observe(video);
    });
}

/* ---- PRE-SELECT SERVICE IN CONTACT FORM (from ?service= link) ---- */
const serviceSelect = document.querySelector('form select[name="service"]');

if (serviceSelect) {
    const requested = new URLSearchParams(window.location.search).get('service');
    if (requested) {
        const match = Array.from(serviceSelect.options)
            .find(opt => opt.text.trim() === requested.trim());
        if (match) match.selected = true;
    }
}

/* ---- LIGHTBOX ---- */
const lightbox = document.getElementById('lightbox');

if (lightbox) {
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxVideo = document.getElementById('lightboxVideo');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxBackdrop = document.getElementById('lightboxBackdrop');

    function openLightbox(type, src, title) {
        lightboxCaption.textContent = title || '';

        if (type === 'image') {
            lightboxImg.src = src;
            lightboxImg.style.display = 'block';
            lightboxVideo.style.display = 'none';
            lightboxVideo.pause();
            lightboxVideo.src = '';
        } else {
            lightboxVideo.src = src;
            lightboxVideo.style.display = 'block';
            lightboxImg.style.display = 'none';
            lightboxImg.src = '';
            lightboxVideo.play();
        }

        lightbox.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('open');
        document.body.style.overflow = '';
        lightboxVideo.pause();
        lightboxVideo.src = '';
        lightboxImg.src = '';
    }

    document.querySelectorAll('.lightbox-trigger').forEach(img => {
        img.addEventListener('click', () => {
            openLightbox('image', img.src, img.getAttribute('data-title'));
        });
    });

    document.querySelectorAll('.lightbox-video-trigger').forEach(wrapper => {
        wrapper.addEventListener('click', () => {
            openLightbox('video', wrapper.getAttribute('data-src'), wrapper.getAttribute('data-title'));
        });
    });

    lightboxClose.addEventListener('click', closeLightbox);
    lightboxBackdrop.addEventListener('click', closeLightbox);
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') closeLightbox();
    });
}

/* ---- COUNT-UP STATS ---- */
const counters = document.querySelectorAll('.count');

if (counters.length && 'IntersectionObserver' in window) {
    const animateCount = el => {
        const target = Number(el.dataset.target);
        const suffix = el.dataset.suffix || '';
        const duration = 1600;
        const start = performance.now();

        const tick = now => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.round(target * eased).toLocaleString('en-US') + suffix;
            if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
    };

    const counterObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCount(entry.target);
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.6 });

    counters.forEach(c => {
        c.textContent = '0' + (c.dataset.suffix || '');
        counterObserver.observe(c);
    });
}
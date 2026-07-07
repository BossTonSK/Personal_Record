// ============================================
// Smooth Scroll Navigation
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============================================
// Navbar Background on Scroll
// ============================================
const navbar = document.querySelector('.navbar');
let lastScrollTop = 0;

window.addEventListener('scroll', function () {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Add shadow effect on scroll
    if (scrollTop > 50) {
        navbar.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.15)';
        navbar.style.background = 'rgba(250, 250, 250, 0.98)';
    } else {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
        navbar.style.background = 'rgba(250, 250, 250, 0.95)';
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// ============================================
// Intersection Observer for Fade-in Effects
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all fade-in elements
document.querySelectorAll('.fade-in-text, .skill-card, .contact-card').forEach(el => {
    observer.observe(el);
});

// ============================================
// Parallax Effect on Mouse Move
// ============================================
const heroSection = document.querySelector('.hero');
const blobs = document.querySelectorAll('.blob');

if (heroSection) {
    document.addEventListener('mousemove', (e) => {
        if (window.innerWidth > 768) {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;

            blobs.forEach((blob, index) => {
                const moveX = (x - 0.5) * 40 * (index + 1);
                const moveY = (y - 0.5) * 40 * (index + 1);
                blob.style.transform = `translate(${moveX}px, ${moveY}px)`;
            });
        }
    });
}

// ============================================
// Button Ripple Effect
// ============================================
document.querySelectorAll('.cta-button, .contact-card').forEach(button => {
    button.addEventListener('click', function (e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');

        // Remove existing ripple if any
        const existingRipple = this.querySelector('.ripple');
        if (existingRipple) {
            existingRipple.remove();
        }

        this.appendChild(ripple);
    });
});

// Add ripple styles dynamically
const style = document.createElement('style');
style.textContent = `
    .cta-button, .contact-card {
        position: relative;
        overflow: hidden;
    }

    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }

    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ============================================
// Scroll Reveal Animation
// ============================================
window.addEventListener('scroll', () => {
    const reveals = document.querySelectorAll('.section-title');
    
    reveals.forEach(reveal => {
        const windowHeight = window.innerHeight;
        const revealTop = reveal.getBoundingClientRect().top;
        const revealPoint = 150;

        if (revealTop < windowHeight - revealPoint) {
            reveal.style.opacity = '1';
        }
    });
});

// ============================================
// Active Navigation Link on Scroll
// ============================================
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (scrollY >= sectionTop - 200) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.style.color = 'var(--primary-medium)';
        } else {
            link.style.color = 'var(--dark)';
        }
    });
});

// ============================================
// Page Load Animation
// ============================================
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    document.body.style.transition = 'opacity 0.5s ease-out';
});

// ============================================
// Smooth Loading
// ============================================
window.addEventListener('beforeunload', () => {
    document.body.style.opacity = '0.5';
});

console.log('🚀 Portfolio loaded! Welcome to Sumet\'s world.');

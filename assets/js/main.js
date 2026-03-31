/* =========================================================================
   Anna Portfolio - Smooth interactions and micro-animations
   ========================================================================= */

document.addEventListener('DOMContentLoaded', () => {

    /* --- Smooth Scrolling for Navigation --- */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    /* --- Navbar Glassmorphism State on Scroll --- */
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.5)';
            navbar.style.background = 'rgba(26, 28, 31, 0.85)';
        } else {
            navbar.style.boxShadow = 'none';
            navbar.style.background = 'var(--surface-variant)';
        }
    });

    /* --- Intersection Observer for Scroll Animations --- */
    // Select elements with class 'fade-up'
    const animatedElements = document.querySelectorAll('.fade-up, .timeline-item, .project-card, .container-asymmetric > *');
    
    // Set initial state for elements not already having the class
    animatedElements.forEach(el => {
        if (!el.classList.contains('fade-up')) {
            el.classList.add('fade-up');
        }
    });

    const observerOptions = {
        threshold: 0.15, // Trigger when 15% of the element is visible
        rootMargin: "0px 0px -50px 0px"
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Optional: only animate once
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => scrollObserver.observe(el));

    /* --- 3D Hover Effect on Hero Image --- */
    const profileFrame = document.querySelector('.profile-frame');
    if (profileFrame) {
        profileFrame.addEventListener('mousemove', (e) => {
            const rect = profileFrame.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -10; // Max rotation 10deg
            const rotateY = ((x - centerX) / centerX) * 10;
            
            profileFrame.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        profileFrame.addEventListener('mouseleave', () => {
            profileFrame.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
            profileFrame.style.transition = 'transform 0.5s ease';
        });

        profileFrame.addEventListener('mouseenter', () => {
            profileFrame.style.transition = 'none'; // remove transition for smooth tracking
        });
    }

});

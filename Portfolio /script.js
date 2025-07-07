// Features:
// - Smooth scrolling to sections with focus management for accessibility
// - Enhanced client-side contact form validation with ARIA and inline messages
// - Highlight active section in navbar on scroll
// - Better accessibility for skip links

document.addEventListener('DOMContentLoaded', function () {
    // Smooth scrolling with focus management
    document.querySelectorAll('nav a[href^="#"]').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
                // Set focus for accessibility
                target.setAttribute('tabindex', '-1');
                target.focus({ preventScroll: true });
                setTimeout(() => {
                    target.removeAttribute('tabindex');
                }, 1000);
            }
        });
    });

    // Skip-link accessibility (focus main content)
    const skipLink = document.querySelector('.skip-link');
    if (skipLink) {
        skipLink.addEventListener('click', function (e) {
            const main = document.getElementById('main-content');
            if (main) {
                main.setAttribute('tabindex', '-1');
                main.focus({ preventScroll: true });
                setTimeout(() => {
                    main.removeAttribute('tabindex');
                }, 1000);
            }
        });
    }

    // Contact form validation (inline & ARIA)
    const form = document.querySelector('form#contact-form');
    if (form) {
        form.setAttribute('novalidate', 'novalidate');
        form.addEventListener('submit', function (e) {
            let valid = true;
            let errorMsg = '';

            // Helper to show inline error
            function showError(input, msg) {
                valid = false;
                input.setAttribute('aria-invalid', 'true');
                let err = input.parentNode.querySelector('.error-msg');
                if (!err) {
                    err = document.createElement('div');
                    err.className = 'error-msg';
                    err.style.color = 'red';
                    err.style.fontSize = '0.95em';
                    err.setAttribute('role', 'alert');
                    input.parentNode.appendChild(err);
                }
                err.textContent = msg;
            }
            function clearError(input) {
                input.setAttribute('aria-invalid', 'false');
                let err = input.parentNode.querySelector('.error-msg');
                if (err) err.textContent = '';
            }

            const name = form.querySelector('input[name="name"]');
            const email = form.querySelector('input[name="email"]');
            const message = form.querySelector('textarea[name="message"]');

            clearError(name); clearError(email); clearError(message);

            if (!name.value.trim()) {
                showError(name, 'Please enter your name.');
            }
            if (!email.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
                showError(email, 'Please enter a valid email address.');
            }
            if (!message.value.trim()) {
                showError(message, 'Please enter your message.');
            }

            if (!valid) {
                e.preventDefault();
                // Focus first invalid
                const firstInvalid = form.querySelector('[aria-invalid="true"]');
                if (firstInvalid) firstInvalid.focus();
            }
        });

        // Remove error on input
        Array.from(form.elements).forEach(el => {
            if (['INPUT', 'TEXTAREA'].includes(el.tagName)) {
                el.addEventListener('input', () => {
                    el.setAttribute('aria-invalid', 'false');
                    const err = el.parentNode.querySelector('.error-msg');
                    if (err) err.textContent = '';
                });
            }
        });
    }

    // Highlight active nav link on scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a[href^="#"]');

    function onScroll() {
        let scrollPos = window.scrollY + 120; // Offset for header
        sections.forEach(section => {
            if (
                section.offsetTop <= scrollPos &&
                section.offsetTop + section.offsetHeight > scrollPos
            ) {
                navLinks.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href') === `#${section.id}`);
                });
            }
        });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // Initial

    // Ensure .active is visually noticeable (add in CSS if not present)
    // Example: nav a.active { border-bottom: 2px solid var(--accent); color: var(--accent); }
});

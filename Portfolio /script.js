/*
// JavaScript for personal portfolio website
// Features:
// - Smooth scrolling to sections when nav links are clicked
// - Basic client-side contact form validation (name, email, message)
// - Highlight active section in navbar on scroll
*/

document.addEventListener('DOMContentLoaded', function () {
    // Smooth scrolling for nav links
    document.querySelectorAll('nav a[href^="#"]').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Contact form validation
    const form = document.querySelector('form#contactForm');
    if (form) {
        form.addEventListener('submit', function (e) {
            let valid = true;
            const name = form.querySelector('input[name="name"]');
            const email = form.querySelector('input[name="email"]');
            const message = form.querySelector('textarea[name="message"]');
            let errorMsg = '';

            if (!name.value.trim()) {
                valid = false;
                errorMsg += 'Please enter your name.\n';
            }
            if (!email.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
                valid = false;
                errorMsg += 'Please enter a valid email address.\n';
            }
            if (!message.value.trim()) {
                valid = false;
                errorMsg += 'Please enter your message.\n';
            }

            if (!valid) {
                e.preventDefault();
                alert(errorMsg);
            }
        });
    }

    // Highlight active section in navbar on scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a[href^="#"]');

    function onScroll() {
        let scrollPos = window.scrollY + 100; // Offset for header height
        sections.forEach(section => {
            if (
                section.offsetTop <= scrollPos &&
                section.offsetTop + section.offsetHeight > scrollPos
            ) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${section.id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', onScroll);
    onScroll(); // Initial call
});
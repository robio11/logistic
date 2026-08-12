/**
 * Nexzone Packers and Movers - Enhanced Smooth Web Application Logic
 * Mobile: 8690016052
 * Address: Bharat Mata Circle, Narayan Vihar, Mansarovar, Jaipur - 302026
 */

document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initSmoothScroll();
    initScrollAnimations();
    initBookingModal();
    initContactForm();
});

/* =========================================================
   Smooth Animated Mobile Navigation Drawer
   ========================================================= */
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    if (mobileMenuBtn && mobileMenu) {
        // Ensure menu starts closed
        mobileMenu.classList.add('menu-closed');
        mobileMenu.classList.remove('hidden', 'menu-open');

        mobileMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = mobileMenu.classList.contains('menu-open');

            if (isOpen) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        });

        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                closeMobileMenu();
            });
        });

        // Close on outside click
        document.addEventListener('click', (e) => {
            if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                closeMobileMenu();
            }
        });
    }

    function openMobileMenu() {
        mobileMenu.classList.remove('menu-closed');
        mobileMenu.classList.add('menu-open');
        const icon = mobileMenuBtn.querySelector('i');
        if (icon) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-xmark');
        }
    }

    function closeMobileMenu() {
        mobileMenu.classList.remove('menu-open');
        mobileMenu.classList.add('menu-closed');
        const icon = mobileMenuBtn.querySelector('i');
        if (icon) {
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        }
    }
}

/* =========================================================
   Smooth Anchor Scrolling
   ========================================================= */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const headerOffset = 90;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* =========================================================
   Scroll Reveal Animations
   ========================================================= */
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe service cards, features, and content blocks
    document.querySelectorAll('.card-hover, section h2, section p, section form').forEach(el => {
        observer.observe(el);
    });
}

/* =========================================================
   Smooth Booking Modal Logic
   ========================================================= */
function initBookingModal() {
    const modal = document.getElementById('booking-modal');
    const openBtns = document.querySelectorAll('.open-booking-modal');
    const closeBtn = document.getElementById('close-modal-btn');
    const modalForm = document.getElementById('modal-booking-form');

    if (!modal) return;

    openBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const serviceName = btn.getAttribute('data-service') || 'Relocation Service';
            const serviceInput = document.getElementById('modal-service-input');
            if (serviceInput) serviceInput.value = serviceName;
            
            modal.classList.remove('hidden');
            modal.classList.add('flex', 'animate-fade-in-down');
        });
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    function closeModal() {
        modal.classList.add('hidden');
        modal.classList.remove('flex', 'animate-fade-in-down');
    }

    if (modalForm) {
        modalForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('modal-name')?.value;
            const phone = document.getElementById('modal-phone')?.value;
            const from = document.getElementById('modal-from')?.value;
            const to = document.getElementById('modal-to')?.value;
            const service = document.getElementById('modal-service-input')?.value;

            const whatsappMessage = `Hello Nexzone Packers and Movers!\n\nI want to book a service:\n- Name: ${name}\n- Phone: ${phone}\n- Service: ${service}\n- Moving From: ${from}\n- Moving To: ${to}\n\nPlease confirm availability and details!`;

            closeModal();
            modalForm.reset();

            showToastNotification('Thank you! Redirecting you to WhatsApp for instant confirmation...');
            setTimeout(() => {
                window.open(`https://wa.me/918690016052?text=${encodeURIComponent(whatsappMessage)}`, '_blank');
            }, 1000);
        });
    }
}

/* =========================================================
   Contact Form Handler
   ========================================================= */
function initContactForm() {
    const contactForm = document.getElementById('main-contact-form');
    if (!contactForm) return;

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('contact-name')?.value;
        const phone = document.getElementById('contact-phone')?.value;
        const service = document.getElementById('contact-service')?.value;
        const message = document.getElementById('contact-msg')?.value;

        const waText = `Hello Nexzone Packers and Movers!\n\nNew Inquiry from Website:\n- Name: ${name}\n- Phone: ${phone}\n- Service: ${service}\n- Note: ${message}\n\nPlease call me back!`;

        showToastNotification('Inquiry sent successfully! Opening WhatsApp chat...');
        contactForm.reset();
        setTimeout(() => {
            window.open(`https://wa.me/918690016052?text=${encodeURIComponent(waText)}`, '_blank');
        }, 1000);
    });
}

/* =========================================================
   Custom Toast Notification
   ========================================================= */
function showToastNotification(msg) {
    const toast = document.createElement('div');
    toast.className = 'fixed bottom-20 right-6 bg-slate-900 text-white px-6 py-4 rounded-xl shadow-2xl z-50 flex items-center gap-3 border border-sky-500 animate-bounce';
    toast.innerHTML = `<i class="fas fa-check-circle text-sky-400 text-xl"></i><span>${msg}</span>`;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 4000);
}

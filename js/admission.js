// Admission Process JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS animation
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true
    });

    // Back to top button
    const backToTop = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('active');
        } else {
            backToTop.classList.remove('active');
        }
    });
    
    backToTop.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Initialize testimonial carousel
    const girlsTestimonialCarousel = new bootstrap.Carousel(document.getElementById('girlsTestimonialCarousel'), {
        interval: 5000,
        pause: 'hover'
    });

    // Online Application Form Submission
    const onlineAdmissionForm = document.getElementById('onlineAdmissionForm');
    
    if (onlineAdmissionForm) {
        onlineAdmissionForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Form validation
            if (this.checkValidity()) {
                // Simulate form submission
                const modal = bootstrap.Modal.getInstance(document.getElementById('onlineApplicationModal'));
                modal.hide();
                
                // Show success message
                alert('Thank you for your application! Our admissions team will contact you within 2-3 working days.');
                
                // Reset form
                this.reset();
            }
            
            this.classList.add('was-validated');
        }, false);
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});
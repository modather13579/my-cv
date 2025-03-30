// Set current year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Animate skill bars on scroll
document.addEventListener('DOMContentLoaded', function() {
    const skillItems = document.querySelectorAll('.skill-item');
    const skillLevels = {
        'العمل الجماعي': '90%',
        'التنظيم وإدارة المهام': '85%',
        'المرونة والتكيف': '95%',
        'حل المشكلات': '80%',
        'إدارة الوقت': '88%',
        'التواصل الفعال': '92%'
    };
    
    // Initialize skill levels
    skillItems.forEach(item => {
        const skillName = item.querySelector('h3').textContent.trim();
        const fill = item.querySelector('.skill-level-fill');
        if (skillLevels[skillName]) {
            fill.style.width = skillLevels[skillName];
            fill.setAttribute('data-level', skillLevels[skillName]);
        }
    });
    
    const animateSkills = () => {
        skillItems.forEach(item => {
            const fill = item.querySelector('.skill-level-fill');
            const width = fill.style.width;
            fill.style.width = '0';
            
            setTimeout(() => {
                fill.style.width = width;
            }, 100);
        });
    };
    
    // Run animation when skills section is in view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkills();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    observer.observe(document.querySelector('.skills'));
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});
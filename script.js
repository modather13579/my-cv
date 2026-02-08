// ==========================================
// تفعيل الملاحة الجانبية (Hamburger Menu)
// ==========================================
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // فتح/إغلاق القائمة
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // إغلاق القائمة عند النقر على رابط
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            
            // تحديث الرابط النشط
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // تحديث الرابط النشط عند التمرير
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });
});

// ==========================================
// تأثيرات الحركة عند التمرير
// ==========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.experience-card, .skill-item, .education-card, .contact-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ==========================================
// تأثيرات إضافية
// ==========================================

// إضافة تأثير عند تحميل الصفحة
window.addEventListener('load', function() {
    document.body.style.opacity = '1';
});

// تحسين الأداء - Lazy Loading للصور (إن وجدت)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ==========================================
// تحسين الوصول والتفاعل
// ==========================================

// إضافة تأثير عند التركيز على العناصر
document.querySelectorAll('a, button').forEach(element => {
    element.addEventListener('focus', function() {
        this.style.outline = '2px solid #fbbf24';
        this.style.outlineOffset = '2px';
    });

    element.addEventListener('blur', function() {
        this.style.outline = 'none';
    });
});

// ==========================================
// معالجة الأخطاء والتحقق من التوافق
// ==========================================

// التحقق من دعم المتصفح للميزات الحديثة
if (!window.CSS || !window.CSS.supports('display', 'grid')) {
    console.warn('متصفحك قد لا يدعم جميع الميزات الحديثة');
}

// ==========================================
// وظائف مساعدة
// ==========================================

// دالة للتمرير السلس إلى قسم معين
function smoothScroll(target) {
    const element = document.querySelector(target);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// تصدير الدوال للاستخدام الخارجي
window.smoothScroll = smoothScroll;

// ==========================================
// تحسينات الأداء
// ==========================================

// تقليل استهلاك الموارد عند التمرير
let ticking = false;
window.addEventListener('scroll', function() {
    if (!ticking) {
        window.requestAnimationFrame(function() {
            // تحديث العناصر المرئية
            ticking = false;
        });
        ticking = true;
    }
});

console.log('✅ تم تحميل السيرة الذاتية بنجاح!');

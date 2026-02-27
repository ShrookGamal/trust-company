gsap.registerPlugin(ScrollTrigger);

// 1. دالة الترجمة الذكية
function updateLanguage(lang) {
    const isRtl = lang === 'ar';
    document.documentElement.setAttribute('lang', lang);
    document.documentElement.setAttribute('dir', isRtl ? 'rtl' : 'ltr');

    document.querySelectorAll('[data-ar]').forEach(el => {
        const text = el.getAttribute(`data-${lang}`);
        if (text) {
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = text;
            } else {
                el.innerHTML = text; 
            }
        }
    });

    // تحديث اتجاه السلايدرات عند تغيير اللغة
    document.querySelectorAll('.innerSwiper').forEach(s => {
        if (s.swiper) {
            s.swiper.changeLanguageDirection(isRtl ? 'rtl' : 'ltr');
            s.swiper.update();
        }
    });

    ScrollTrigger.refresh();
}

window.addEventListener('load', () => {
    // تشغيل اللغة الافتراضية
    updateLanguage('ar');

    // --- 2. أنيميشن الدخول (إصلاح اختفاء الناف بار) ---
    const entranceTL = gsap.timeline();
    entranceTL.from(".floating-nav", { 
        y: -100, opacity: 0, duration: 1, ease: "power4.out",
        onComplete: () => { gsap.set(".floating-nav", { clearProps: "all" }); }
    })
    .from(".hero-text h1", { x: 50, opacity: 0, duration: 0.8 }, "-=0.3")
    .from(".glass-form-v4", { scale: 0.9, opacity: 0, duration: 1, ease: "back.out(1.5)" }, "-=0.6");

    // --- 3. مراقبة السكرول (ناف بار + Active Link) ---
    const navBar = document.querySelector(".floating-nav");
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-links a");

    window.addEventListener("scroll", () => {
        let scrollY = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollY > 50) navBar.classList.add("nav-scrolled");
        else navBar.classList.remove("nav-scrolled");

        let current = "";
        sections.forEach(s => {
            if (scrollY > (s.offsetTop - 200)) current = s.getAttribute("id");
        });
        navLinks.forEach(link => {
            link.classList.remove("active");
            if (current && link.getAttribute("href").includes(current)) link.classList.add("active");
        });
    });

    // --- 4. تشغيل الـ 12 سلايدر ---
    new Swiper(".innerSwiper", {
        loop: true,
        autoplay: { delay: 3500, disableOnInteraction: false },
        pagination: { el: ".swiper-pagination", clickable: true },
        observer: true,
        observeParents: true
    });

    // --- 5. أنيميشن السكاشن ---
    gsap.from(".about-main-img", { scrollTrigger: { trigger: ".about-v5", start: "top 80%" }, scale: 0.8, opacity: 0, duration: 1 });
    gsap.from(".service-item-v7", { scrollTrigger: { trigger: ".services-v7", start: "top 80%" }, y: 60, opacity: 0, stagger: 0.2, duration: 1 });

    // --- 6. إعادة تفعيل العدادات (Counters) - الحتة اللي كانت ناقصة ---
    const counters = document.querySelectorAll('.counter, .count');
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        
        ScrollTrigger.create({
            trigger: counter,
            start: "top 90%",
            onEnter: () => {
                let count = 0;
                const updateCount = () => {
                    const increment = target / 50; 
                    if(count < target) {
                        count += increment;
                        counter.innerText = Math.ceil(count);
                        setTimeout(updateCount, 30);
                    } else {
                        counter.innerText = target;
                    }
                };
                updateCount();
            }
        });
    });

    ScrollTrigger.refresh();
});

// --- 7. تبديل اللغة ---
const langBtn = document.getElementById('langBtn');
if (langBtn) {
    langBtn.onclick = () => {
        const isAr = document.documentElement.getAttribute('lang') === 'ar';
        const newLang = isAr ? 'en' : 'ar';
        langBtn.innerText = isAr ? 'AR' : 'EN';
        updateLanguage(newLang);
    };
}

// --- 8. أوكورديون التدريب ---
document.querySelectorAll('.acc-header-v24').forEach(header => {
    header.onclick = () => {
        const item = header.parentElement;
        const content = item.querySelector('.acc-content-v24');
        document.querySelectorAll('.acc-item-v24').forEach(other => {
            if (other !== item) {
                other.classList.remove('active');
                other.querySelector('.acc-content-v24').style.maxHeight = null;
            }
        });
        item.classList.toggle('active');
        content.style.maxHeight = item.classList.contains('active') ? content.scrollHeight + "px" : null;
    };
});

// --- 9. موبايل منيو ---
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
if (menuToggle) {
    menuToggle.onclick = () => {
        mobileMenu.style.display = mobileMenu.style.display === 'flex' ? 'none' : 'flex';
    };
}

// --- 10. فورم الواتساب ---
const consultForm = document.getElementById('consultForm');
if (consultForm) {
    consultForm.onsubmit = (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const sub = document.getElementById('subject').value;
        window.open(`https://wa.me/962798502477?text=${encodeURIComponent("*طلب استشارة*\nالاسم: "+name+"\nالمجال: "+sub)}`, '_blank');
    };
}
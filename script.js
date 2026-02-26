gsap.registerPlugin(ScrollTrigger);

window.addEventListener('load', () => {
    const entranceTL = gsap.timeline();
    entranceTL.from(".floating-nav", { 
        y: -100, 
        opacity: 0, 
        duration: 1, 
        ease: "power4.out",
        onComplete: () => {
            gsap.set(".floating-nav", { clearProps: "all" }); 
        }
    })
    .from(".hero-text h1", { x: 50, opacity: 0, duration: 0.8 }, "-=0.3")
    .from(".hero-text .slogan", { x: 50, opacity: 0, duration: 0.6 }, "-=0.4")
    .from(".glass-form-v4", { scale: 0.9, opacity: 0, duration: 1, ease: "back.out(1.5)" }, "-=0.6");
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-links a");
    const navBar = document.querySelector(".floating-nav");

    window.addEventListener("scroll", () => {
        let current = "";
        let scrollY = window.pageYOffset || document.documentElement.scrollTop;
        if (navBar) {
            if (scrollY > 50) { 
                navBar.classList.add("nav-scrolled");
            } else {
                navBar.classList.remove("nav-scrolled");
            }
        }
        sections.forEach((section) => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 180; 
            const sectionId = section.getAttribute("id");

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                current = sectionId;
            }
        });

        navLinks.forEach((link) => {
            link.classList.remove("active");
            if (current && link.getAttribute("href").includes(current)) {
                link.classList.add("active");
            }
        });
    });
    if(document.querySelector(".about-v5")) {
        gsap.from(".about-main-img", { scrollTrigger: { trigger: ".about-v5", start: "top 80%" }, scale: 0.8, opacity: 0, duration: 1 });
        gsap.from(".content-side > *", { scrollTrigger: { trigger: ".about-v5", start: "top 80%" }, y: 30, opacity: 0, stagger: 0.2, duration: 0.8 });
    }

    if(document.querySelector(".services-v7")) {
        gsap.from(".service-item-v7", { scrollTrigger: { trigger: ".services-v7", start: "top 80%" }, y: 60, opacity: 0, stagger: 0.2, duration: 1 });
    }
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
                    } else { counter.innerText = target; }
                };
                updateCount();
            }
        });
    });

    ScrollTrigger.refresh();
});

const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
if (menuToggle && mobileMenu) {
    menuToggle.onclick = () => {
        const isVisible = mobileMenu.style.display === 'flex';
        mobileMenu.style.display = isVisible ? 'none' : 'flex';
    };
}
const langBtn = document.getElementById('langBtn');
if (langBtn) {
    langBtn.onclick = () => {
        const currentLang = document.documentElement.getAttribute('lang');
        const newLang = currentLang === 'ar' ? 'en' : 'ar';
        document.documentElement.setAttribute('lang', newLang);
        document.documentElement.setAttribute('dir', newLang === 'ar' ? 'rtl' : 'ltr');
        langBtn.innerText = newLang === 'ar' ? 'EN' : 'AR';
        
        document.querySelectorAll('[data-ar]').forEach(el => {
            const translation = el.getAttribute(`data-${newLang}`);
            if (translation) el.innerText = translation;
        });
        ScrollTrigger.refresh();
    };
}
const consultForm = document.getElementById('consultForm');
if (consultForm) {
    consultForm.onsubmit = (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const subject = document.getElementById('subject').value;
        const details = document.getElementById('details').value;
        const companyPhone = "962798502477";
        const message = `*طلب استشارة جديدة من الموقع* \n\n*الاسم:* ${name}\n*الهاتف:* ${phone}\n*المجال:* ${subject}\n*التفاصيل:* ${details || 'لا يوجد'}`;
        window.open(`https://wa.me/${companyPhone}?text=${encodeURIComponent(message)}`, '_blank');
    };
}
document.querySelectorAll('.acc-header-v24').forEach(header => {
    header.addEventListener('click', () => {
        const item = header.parentElement;
        const content = item.querySelector('.acc-content-v24');
                document.querySelectorAll('.acc-item-v24').forEach(other => {
            if (other !== item) {
                other.classList.remove('active');
                other.querySelector('.acc-content-v24').style.maxHeight = null;
            }
        });
        item.classList.toggle('active');
        if (item.classList.contains('active')) {
            content.style.maxHeight = content.scrollHeight + "px";
        } else {
            content.style.maxHeight = null;
        }
    });
});
window.addEventListener('DOMContentLoaded', () => {
    const lang = document.documentElement.getAttribute('lang') || 'ar';
    updateLanguage(lang); 
});
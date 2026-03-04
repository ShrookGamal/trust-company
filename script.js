gsap.registerPlugin(ScrollTrigger);
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
    document.querySelectorAll('.innerSwiper').forEach(s => {
        if (s.swiper) {
            s.swiper.changeLanguageDirection(isRtl ? 'rtl' : 'ltr');
            s.swiper.update();
        }
    });

    ScrollTrigger.refresh();
}

window.addEventListener('load', () => {
    updateLanguage('ar');
    const entranceTL = gsap.timeline();
    entranceTL.from(".floating-nav", { 
        y: -100, opacity: 0, duration: 1, ease: "power4.out",
        onComplete: () => { gsap.set(".floating-nav", { clearProps: "all" }); }
    })
    .from(".hero-text h1", { x: 50, opacity: 0, duration: 0.8 }, "-=0.3")
    .from(".glass-form-v4", { scale: 0.9, opacity: 0, duration: 1, ease: "back.out(1.5)" }, "-=0.6");
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
    new Swiper(".innerSwiper", {
        loop: true,
        autoplay: { delay: 3500, disableOnInteraction: false },
        pagination: { el: ".swiper-pagination", clickable: true },
        observer: true,
        observeParents: true
    });
    gsap.from(".about-main-img", { scrollTrigger: { trigger: ".about-v5", start: "top 80%" }, scale: 0.8, opacity: 0, duration: 1 });
    gsap.from(".service-item-v7", { scrollTrigger: { trigger: ".services-v7", start: "top 80%" }, y: 60, opacity: 0, stagger: 0.2, duration: 1 });
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
const langBtn = document.getElementById('langBtn');
if (langBtn) {
    langBtn.onclick = () => {
        const isAr = document.documentElement.getAttribute('lang') === 'ar';
        const newLang = isAr ? 'en' : 'ar';
        langBtn.innerText = isAr ? 'AR' : 'EN';
        updateLanguage(newLang);
    };
}
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
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
if (menuToggle) {
    menuToggle.onclick = () => {
        mobileMenu.style.display = mobileMenu.style.display === 'flex' ? 'none' : 'flex';
    };
}
const consultForm = document.getElementById('consultForm');
if (consultForm) {
    consultForm.onsubmit = (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const sub = document.getElementById('subject').value;
        const details = document.getElementById('details').value || "No details";
        
        const emailTo = "info@qtrusts.com";
        const subject = "New Consultation Request";
        const body = `Name: ${name}\nPhone: ${phone}\nField: ${sub}\nDetails: ${details}`;
        
        window.location.href = `mailto:${emailTo}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    };
}
const careerForm = document.getElementById('careerFormV32');
if (careerForm) {
    careerForm.onsubmit = (e) => {
        e.preventDefault();      
        const name = document.getElementById('jobName').value;
        const phone = document.getElementById('jobPhone').value;
        const spec = document.getElementById('jobSpec').value;
        const fileInput = document.getElementById('jobCV');
        const fileName = fileInput.files[0] ? fileInput.files[0].name : "No file attached";        
        
        const emailTo = "info@qtrusts.com";
        const subject = "Job Application";
        const body = `Name: ${name}\nPhone: ${phone}\nSpecialty: ${spec}\nAttached File Name: ${fileName}`;
        
        window.location.href = `mailto:${emailTo}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    };
}
function openRegModal(courseName) {
    const modal = document.getElementById('trainingModal');
    const courseText = document.getElementById('selectedCourseName');
    courseText.innerText = courseName;
    modal.style.display = "flex";
}

function closeRegModal() {
    document.getElementById('trainingModal').style.display = "none";
}

window.onclick = function(event) {
    const modal = document.getElementById('trainingModal');
    if (event.target == modal) { modal.style.display = "none"; }
}

const regForm = document.getElementById('regForm');
if (regForm) {
    regForm.onsubmit = (e) => {
        e.preventDefault();
        const name = document.getElementById('regName').value;
        const phone = document.getElementById('regPhone').value;
        const course = document.getElementById('selectedCourseName').innerText;
        
        const lowerCourse = course.toLowerCase();
        let targetLink = "";
        if (lowerCourse.includes('nursing') || lowerCourse.includes('تمريض')) {
            const whatsapp30 = "962797711230"; 
            targetLink = `https://wa.me/${whatsapp30}?text=${encodeURIComponent("*طلب تسجيل تمريض*\nالاسم: "+name+"\nالدورة: "+course)}`;
            window.open(targetLink, '_blank');
        } 
        else if (lowerCourse.includes('lab') || lowerCourse.includes('microbiology') || lowerCourse.includes('hematology') || lowerCourse.includes('cytology') || lowerCourse.includes('ascp') || lowerCourse.includes('مختبرات')) {
            const whatsapp47 = "962796034647";
            targetLink = `https://wa.me/${whatsapp47}?text=${encodeURIComponent("*طلب تسجيل مختبرات*\nالاسم: "+name+"\nالدورة: "+course)}`;
            window.open(targetLink, '_blank');
        }
        else {
            const emailTo = "info@qtrusts.com";
            const subject = "Course Registration Request";
            const body = `Name: ${name}\nPhone: ${phone}\nCourse: ${course}`;
            window.location.href = `mailto:${emailTo}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        }
        
        closeRegModal();
    };
}

const fileInputUI = document.getElementById('jobCV');
if (fileInputUI) {
    fileInputUI.onchange = () => {
        if (fileInputUI.files.length > 0) {
            document.querySelector('.file-msg').innerText = fileInputUI.files[0].name;
        }
    };
}
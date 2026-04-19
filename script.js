const svcData = {
    'جراحة المخ والأعصاب': {
        desc: 'نقدم خدمات جراحة المخ والأعصاب باستخدام أحدث التقنيات العالمية.',
        sub: 'جراحات دقيقة بأحدث التقنيات العالمية'
    },
    'علاج الصداع والشقيقة': {
        desc: 'متخصصون في تشخيص وعلاج جميع أنواع الصداع المزمن.',
        sub: 'تشخيص وعلاج جميع أنواع الصداع والشقيقة المزمنة'
    },
    'علاج الصرع والتشنجات': {
        desc: 'نقدم تشخيصاً دقيقاً للصرع باستخدام تخطيط المخ الرقمي.',
        sub: 'تشخيص دقيق وعلاج شامل للصرع والتشنجات'
    },
    'علاج آلام العمود الفقري': {desc: 'علاج متكامل لآلام العمود الفقري.', sub: 'علاج الديسك وآلام الظهر بدون جراحة'},
    'الطب النفسي والعلاج السلوكي': {
        desc: 'نقدم خدمات الطب النفسي الشاملة.',
        sub: 'علاج الاكتئاب والقلق واضطرابات المزاج'
    },
    'علاج الشلل الرعاش': {desc: 'متخصصون في تشخيص وعلاج مرض باركنسون.', sub: 'تشخيص وعلاج مرض باركنسون'}
};

// Preloader
let preProgress = 0;
const preInterval = setInterval(function () {
    preProgress += Math.random() * 12 + 3;
    if (preProgress >= 100) {
        preProgress = 100;
        clearInterval(preInterval);
        setTimeout(function () {
            const pl = document.getElementById('preloader');
            pl.classList.add('fade-out');
            setTimeout(function () {
                pl.style.display = 'none';
            }, 800);
        }, 300);
    }
    document.getElementById('preProgressFill').style.width = preProgress + '%';
    document.getElementById('preProgressPercent').textContent = Math.floor(preProgress) + '%';
}, 200);
window.addEventListener('load', function () {
    setTimeout(function () {
        if (preProgress < 100) {
            clearInterval(preInterval);
            preProgress = 100;
            document.getElementById('preProgressFill').style.width = '100%';
            document.getElementById('preProgressPercent').textContent = '100%';
            setTimeout(function () {
                const pl = document.getElementById('preloader');
                pl.classList.add('fade-out');
                setTimeout(function () {
                    pl.style.display = 'none';
                }, 800);
            }, 400);
        }
    }, 2500);
});

// AOS
AOS.init({duration: 800, once: true, offset: 80, easing: 'ease-out-cubic', disable: 'mobile'});

// Swiper
new Swiper('.testSwiper', {
    slidesPerView: 1,
    spaceBetween: 16,
    loop: true,
    autoplay: {delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true},
    pagination: {el: '.swiper-pagination', clickable: true},
    breakpoints: {640: {slidesPerView: 1.5}, 768: {slidesPerView: 2}, 1024: {slidesPerView: 3}}
});

// Navigation
function go(page, param) {
    document.querySelectorAll('.page-section').forEach(function (s) {
        s.classList.remove('active');
    });
    document.querySelectorAll('.nav-link-custom').forEach(function (l) {
        l.classList.remove('active');
    });
    if (page === 'svc') {
        document.getElementById('pg-svc').classList.add('active');
        const svc = svcData[param] || {desc: 'خدمة طبية متخصصة', sub: ''};
        document.getElementById('svcPageTitle').textContent = param;
        document.getElementById('svcPageSub').textContent = svc.sub;
        document.getElementById('svcBreadcrumb').textContent = param;
        document.getElementById('svcPageDesc').textContent = svc.desc;
    } else {
        const target = document.getElementById('pg-' + page);
        if (target) target.classList.add('active');
    }
    document.querySelectorAll('.nav-link-custom').forEach(function (l) {
        if (l.getAttribute('data-p') === page || (page === 'svc' && l.getAttribute('data-p') === 'services')) l.classList.add('active');
    });
    window.scrollTo({top: 0, behavior: 'smooth'});
    closeMobileMenu();
    setTimeout(function () {
        AOS.refresh();
    }, 100);
}

// ==================== IMPROVED MOBILE MENU ====================
const menuToggler = document.getElementById('menuToggler');
const navbarNav = document.getElementById('navbarNav');
const menuOverlay = document.getElementById('menuOverlay');

menuToggler.addEventListener('click', function () {
    if (navbarNav.classList.contains('show')) {
        closeMobileMenu();
    } else {
        navbarNav.classList.add('show');
        menuOverlay.classList.add('active');
        menuToggler.classList.add('active');
    }
});

menuOverlay.addEventListener('click', closeMobileMenu);

function closeMobileMenu() {
    navbarNav.classList.remove('show');
    menuOverlay.classList.remove('active');
    menuToggler.classList.remove('active');
}

// Navbar scroll
const navEl = document.getElementById('mainNavbar');
const scrollP = document.getElementById('scrollProgress');
const backTop = document.getElementById('backTop');
window.addEventListener('scroll', function () {
    if (window.scrollY > 60) navEl.classList.add('scrolled'); else navEl.classList.remove('scrolled');
    scrollP.style.width = ((window.scrollY / (document.documentElement.scrollHeight - document.documentElement.clientHeight)) * 100) + '%';
    if (window.scrollY > 600) backTop.classList.add('show'); else backTop.classList.remove('show');
});

// ==================== JOURNEY ANIMATION ====================
const journeyLineFill = document.getElementById('journeyLineFill');
const journeyMobileFill = document.getElementById('journeyMobileFill');
const journeySteps = document.querySelectorAll('.journey-item');

const journeyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Animate horizontal line (desktop)
            if (journeyLineFill) journeyLineFill.style.width = '100%';
            // Animate vertical line (mobile)
            if (journeyMobileFill) journeyMobileFill.style.height = '100%';
            // Animate steps with staggered delay
            journeySteps.forEach((step, index) => {
                setTimeout(() => {
                    step.classList.add('animate');
                }, index * 400);
            });
            journeyObserver.unobserve(entry.target);
        }
    });
}, {threshold: 0.3});

const journeyContainer = document.querySelector('.journey-wrapper');
if (journeyContainer) {
    journeyObserver.observe(journeyContainer);
}

// Counters
function animCounters() {
    document.querySelectorAll('.counter-num').forEach(function (el) {
        const target = parseInt(el.getAttribute('data-c'));
        const dur = 2000, fps = 60, frames = dur / (1000 / fps), inc = target / frames;
        let cur = 0, frame = 0;

        function upd() {
            cur += inc;
            frame++;
            if (frame < frames) {
                el.textContent = Math.floor(cur).toLocaleString('ar-EG');
                requestAnimationFrame(upd);
            } else {
                el.textContent = target < 100 ? '+' + target : '+' + target.toLocaleString('ar-EG');
            }
        }

        upd();
    });
}

let cDone = false;
const cObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
        if (e.isIntersecting && !cDone) {
            cDone = true;
            animCounters();
        }
    });
}, {threshold: 0.25});
const cEl = document.querySelector('.counter-sec');
if (cEl) cObs.observe(cEl);

setTimeout(function () {
    document.querySelectorAll('.stat-num[data-t]').forEach(function (el) {
        const target = parseInt(el.getAttribute('data-t'));
        const dur = 2000, fps = 60, frames = dur / (1000 / fps), inc = target / frames;
        let cur = 0, frame = 0;

        function upd() {
            cur += inc;
            frame++;
            if (frame < frames) {
                el.textContent = Math.floor(cur).toLocaleString('ar-EG');
                requestAnimationFrame(upd);
            } else {
                el.textContent = target < 100 ? target + '+' : '+' + target.toLocaleString('ar-EG');
            }
        }

        upd();
    });
}, 1000);

// FAQ
function togFaq(btn) {
    const parent = btn.closest('.faq-item');
    const active = parent.classList.contains('active');
    document.querySelectorAll('.faq-item').forEach(function (f) {
        f.classList.remove('active');
    });
    if (!active) parent.classList.add('active');
}

// Doctor Modal
function openDoc(name, spec, exp, uni, specs) {
    document.getElementById('docName').textContent = name;
    document.getElementById('docSpec').textContent = spec;
    document.getElementById('docExp').textContent = exp;
    document.getElementById('docUni').textContent = uni;
    document.getElementById('docSpecs').textContent = specs;
    new bootstrap.Modal(document.getElementById('docModal')).show();
}

function closeDocM() {
    const i = bootstrap.Modal.getInstance(document.getElementById('docModal'));
    if (i) i.hide();
}

// Forms
function handleBk(e) {
    e.preventDefault();
    bootstrap.Modal.getInstance(document.getElementById('bookingModal')).hide();
    showT('تم استلام طلب الحجز!');
    e.target.reset();
}

function handleAppt(e) {
    e.preventDefault();
    showT('تم استلام طلب الحجز بنجاح!');
    e.target.reset();
}

function handleExit(e) {
    e.preventDefault();
    closeExit();
    showT('تم استلام طلبك!');
    e.target.reset();
}

// Toast
function showT(msg) {
    const t = document.getElementById('toast');
    document.getElementById('toastMsg').textContent = msg;
    t.classList.add('show');
    setTimeout(function () {
        t.classList.remove('show');
    }, 4500);
}

// Exit Intent
let exitShown = false;
document.addEventListener('mouseout', function (e) {
    if (!exitShown && e.clientY < 5 && e.relatedTarget === null) {
        exitShown = true;
        document.getElementById('exitPop').classList.add('show');
    }
});

function closeExit() {
    document.getElementById('exitPop').classList.remove('show');
}

document.getElementById('exitPop').addEventListener('click', function (e) {
    if (e.target === this) closeExit();
});

const phoneIn = document.getElementById('apptForm') ? document.getElementById('apptForm').querySelector('input[type="tel"]') : null;
if (phoneIn) phoneIn.addEventListener('input', function () {
    this.value = this.value.replace(/[^0-9]/g, '');
});
// دالة تعمل بمجرد تحميل الصفحة لتعبئة البيانات
document.addEventListener('DOMContentLoaded', function() {

    // 1. جلب البيانات من الرابط (URL Parameters)
    const urlParams = new URLSearchParams(window.location.search);
    const serviceName = urlParams.get('service');

    // 2. قاعدة بيانات الخدمات (نفس البيانات التي كانت في الدالة القديمة)
    const servicesData = {
        'جراحة المخ والأعصاب': {
            title: 'جراحة المخ والأعصاب',
            sub: 'جراحات دقيقة بأحدث التقنيات العالمية',
            desc: 'نقدم خدمات جراحة المخ والأعصاب باستخدام أحدث التقنيات العالمية، بما في ذلك الجراحة المجهرية والملاحة العصبية. يقوم فريقنا بإجراء عمليات دقيقة لأورام المخ والأعصاب الشوكية.'
        },
        'علاج الصداع والشقيقة': {
            title: 'علاج الصداع والشقيقة',
            sub: 'تشخيص وعلاج شامل للصداع المزمن',
            desc: 'متخصصون في تشخيص وعلاج جميع أنواع الصداع المزمن، بما في ذلك الصداع النصفي (الشقيقة) والتوتري، باستخدام بروتوكولات علاجية حديثة.'
        },
        'علاج الصرع والتشنجات': {
            title: 'علاج الصرع والتشنجات',
            sub: 'تشخيص دقيق وعلاج شامل',
            desc: 'نقدم تشخيصاً دقيقاً للصرع باستخدام تخطيط المخ الرقمي بالفيديو، ونوفر علاجاً شاملاً يشمل الأدوية الحديثة والمتابعة المستمرة.'
        },
        'علاج آلام العمود الفقري': {
            title: 'علاج آلام العمود الفقري',
            sub: 'علاج الديسك بدون جراحة',
            desc: 'علاج متكامل لآلام العمود الفقري والديسك وانزلاق الغضروف باستخدام تقنيات حديثة غير جراحية مثل الحقن والعلاج الطبيعي المتخصص.'
        },
        'الطب النفسي والعلاج السلوكي': {
            title: 'الطب النفسي والعلاج السلوكي',
            sub: 'رعاية نفسية متكاملة',
            desc: 'نقدم خدمات الطب النفسي الشاملة لعلاج الاكتئاب والقلق واضطرابات المزاج باستخدام العلاج الدوائي والسلوكي المعرفي.'
        },
        'علاج الشلل الرعاش': {
            title: 'علاج الشلل الرعاش',
            sub: 'تشخيص وعلاج مرض باركنسون',
            desc: 'متخصصون في تشخيص وعلاج مرض باركنسون (الشلل الرعاش) وأعراضه الحركية، مع توفير خطة علاجية دوائية وتأهيلية شاملة.'
        }
    };

    // 3. التحقق من وجود الخدمة وتحديث الصفحة
    // نستخدم decodeURIComponent للتأكد من قراءة النص العربي بشكل صحيح
    const decodedService = decodeURIComponent(serviceName);

    if (decodedService && servicesData[decodedService]) {
        const data = servicesData[decodedService];

        // تحديث العناصر في الصفحة إذا كانت موجودة
        const titleEl = document.getElementById('svcPageTitle');
        const subEl = document.getElementById('svcPageSub');
        const descEl = document.getElementById('svcPageDesc');
        const breadEl = document.getElementById('svcBreadcrumb');

        if (titleEl) titleEl.textContent = data.title;
        if (subEl) subEl.textContent = data.sub;
        if (descEl) descEl.textContent = data.desc;
        if (breadEl) breadEl.textContent = data.title;

    } else {
        // في حال لم يتم العثور على الخدمة، توجيه للصفحة الرئيسية أو عرض رسالة
        // window.location.href = 'services.html';
    }
});
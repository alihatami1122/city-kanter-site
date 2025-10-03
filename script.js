// ======= Products Array =======
const products = [
  { img: "https://cdn.imgurl.ir/uploads/q92056_asal1_1.jpg", alt: "کانتر چوبی طرح کلاسیک" },
  { img: "https://cdn.imgurl.ir/uploads/z413683_asal1_2.jpg", alt: "کانتر چوبی طرح مدرن" },
  { img: "https://cdn.imgurl.ir/uploads/p488559_asal1_3.jpg", alt: "کانتر چوبی اداره" },
  { img: "https://cdn.imgurl.ir/uploads/r74669_photo_2025-09-14_22-51-12.jpg", alt: "کانتر چوبی سفارشی" },
  { img: "https://cdn.imgurl.ir/uploads/x911502_asal1_16.jpg", alt: "کانتر چوبی طراحی شده" },
  { img: "https://cdn.imgurl.ir/uploads/m49521_asal1_15.jpg", alt: "کانتر چوبی با کیفیت" },
  { img: "https://cdn.imgurl.ir/uploads/i39051_asal1_14.jpg", alt: "کانتر چوبی مدرن" },
  { img: "https://cdn.imgurl.ir/uploads/t341_asal1_13.jpg", alt: "کانتر چوبی لوکس" },
  { img: "https://cdn.imgurl.ir/uploads/l970959_asal1_12.jpg", alt: "کانتر چوبی اداری" },
  { img: "https://cdn.imgurl.ir/uploads/t70141_asal1_9.jpg", alt: "کانتر چوبی پذیرش" },
  { img: "https://cdn.imgurl.ir/uploads/73306_photo_2025-09-14_22-51-17.jpg", alt: "کانتر چوبی فروشگاهی" },
  { img: "https://cdn.imgurl.ir/uploads/s22660_ds.jpg", alt: "کانتر چوبی مطب" },
  { img: "https://cdn.imgurl.ir/uploads/t264529_photo_2025-09-14_22-54-02.jpg", alt: "کانتر چوبی بانکی" },
  { img: "https://cdn.imgurl.ir/uploads/k476384_photo_2025-09-14_22-52-15.jpg", alt: "کانتر چوبی لابی" },
  { img: "https://cdn.imgurl.ir/uploads/r74430_asal1_6.jpg", alt: "کانتر چوبی ام دی اف" },
  { img: "https://cdn.imgurl.ir/uploads/h731037_asal1_8.jpg", alt: "کانتر چوبی پیشخوان" }
];

// ======= ورود به سایت =======
function enterSite() {
  const welcomeScreen = document.getElementById("welcome-screen");
  const siteContainer = document.getElementById("site-container");
  
  if (welcomeScreen && siteContainer) {
    welcomeScreen.style.display = "none";
    siteContainer.style.display = "block";
  }
}

// ======= وقتی صفحه لود شد =======
document.addEventListener("DOMContentLoaded", () => {
  // اسکرول به بالا
  window.scrollTo(0, 0);
  
  const productGrid = document.getElementById("product-grid");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = lightbox?.querySelector("img");
  const prevBtn = document.getElementById("prev");
  const nextBtn = document.getElementById("next");
  const sections = document.querySelectorAll("section");
  const menuToggle = document.getElementById("menu-toggle");
  const nav = document.querySelector("nav");
  const navLinks = document.querySelectorAll(".nav-links a");

  let currentIndex = 0;

  // ======= Render Products =======
  if (productGrid) {
    products.forEach((product, i) => {
      const card = document.createElement("div");
      card.className = "product-card";
      card.innerHTML = `<img src="${product.img}" alt="${product.alt}" loading="lazy" width="300" height="200">`;
      card.addEventListener("click", () => {
        currentIndex = i;
        showLightbox();
      });
      productGrid.appendChild(card);
    });
  }

  // ======= Lightbox =======
  function showLightbox() {
    if (lightboxImg && products[currentIndex]) {
      lightboxImg.src = products[currentIndex].img;
      lightboxImg.alt = products[currentIndex].alt;
      lightbox.classList.add("visible");
    }
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % products.length;
      showLightbox();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + products.length) % products.length;
      showLightbox();
    });
  }

  if (lightbox) {
    lightbox.addEventListener("click", e => {
      if (e.target === lightbox) lightbox.classList.remove("visible");
    });
  }

  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && lightbox) {
      lightbox.classList.remove("visible");
    }
  });

  // ======= Scroll Reveal =======
  function revealSections() {
    sections.forEach(sec => {
      if (sec.getBoundingClientRect().top < window.innerHeight - 100) {
        sec.classList.add("visible");
      }
    });
  }
  
  // استفاده از throttling برای performance
  let scrollTimeout;
  function handleScroll() {
    if (!scrollTimeout) {
      scrollTimeout = setTimeout(() => {
        scrollTimeout = null;
        revealSections();
      }, 100);
    }
  }
  
  window.addEventListener("scroll", handleScroll, { passive: true });
  revealSections();

  // ======= Hamburger Menu =======
  if (menuToggle && nav) {
    menuToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      nav.classList.toggle("open");
      menuToggle.classList.toggle("active");
    });

    navLinks.forEach(link => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        menuToggle.classList.remove("active");
      });
    });

    // بستن منو با کلیک خارج
    document.addEventListener("click", (e) => {
      if (nav.classList.contains("open") && 
          !nav.contains(e.target) && 
          e.target !== menuToggle) {
        nav.classList.remove("open");
        menuToggle.classList.remove("active");
      }
    });
  }

  // ======= Starfield Animation =======
  const starCanvas = document.getElementById("star-canvas");
  if (starCanvas) {
    const ctx = starCanvas.getContext("2d");
    let stars = [];
    const numStars = 150;

    function resizeStarCanvas() {
      starCanvas.width = window.innerWidth;
      starCanvas.height = window.innerHeight;
    }

    function createStars() {
      stars = [];
      for (let i = 0; i < numStars; i++) {
        stars.push({
          x: Math.random() * starCanvas.width,
          y: Math.random() * starCanvas.height,
          radius: Math.random() * 2 + 1,
          alpha: Math.random(),
          delta: Math.random() * 0.02 + 0.01
        });
      }
    }

    function animateStars() {
      ctx.clearRect(0, 0, starCanvas.width, starCanvas.height);
      stars.forEach(star => {
        star.alpha += star.delta;
        if (star.alpha > 1 || star.alpha < 0) star.delta = -star.delta;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,215,0,${star.alpha})`;
        ctx.fill();
      });
      requestAnimationFrame(animateStars);
    }

    window.addEventListener("resize", resizeStarCanvas);
    resizeStarCanvas();
    createStars();
    animateStars();
  }

  // ======= WhatsApp Send =======
  function sendWhatsApp() {
    const name = document.getElementById("contact-name")?.value.trim() || '';
    const email = document.getElementById("contact-email")?.value.trim() || '';
    const message = document.getElementById("contact-message")?.value.trim() || '';

    if (!name || !email || !message) {
      alert("لطفاً همه فیلدها را پر کنید.");
      return;
    }

    const finalMessage = `سلام 👋\nپیام جدید از فرم سایت:\n👤 نام: ${name}\n📧 ایمیل: ${email}\n📝 پیام: ${message}`;
    const encodedMessage = encodeURIComponent(finalMessage);
    const phone = "989029191722";

    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

    if (isMobile) {
      window.location.href = `whatsapp://send?phone=${phone}&text=${encodedMessage}`;
    } else {
      window.open(`https://web.whatsapp.com/send?phone=${phone}&text=${encodedMessage}`, "_blank");
    }

    document.getElementById("contact-form").reset();
  }

  const whatsappSend = document.getElementById("whatsapp-send");
  if (whatsappSend) {
    whatsappSend.addEventListener("click", function(e) {
      e.preventDefault();
      sendWhatsApp();
    });
  }

  // ======= Clock & Date =======
  function updateClock() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');

    const clockEl = document.getElementById('clock');
    if (clockEl) clockEl.textContent = `⏰ ${hours}:${minutes}`;

    const dateEl = document.getElementById('date');
    if (dateEl) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      dateEl.textContent = `📅 ${now.toLocaleDateString('fa-IR', options)}`;
    }
  }
  setInterval(updateClock, 1000);
  updateClock();

  // ======= Page Visits (localStorage) =======
  function updateVisits() {
    let visits = localStorage.getItem('visitCount');
    visits = visits ? parseInt(visits) + 1 : 1;
    localStorage.setItem('visitCount', visits);

    const formatted = visits.toLocaleString('fa-IR');
    const visitsEl = document.getElementById('visits');
    if (visitsEl) visitsEl.textContent = `👁️ بازدید: ${formatted}`;
  }
  updateVisits();

  // ======= Floating Action Button =======
  const fabContainer = document.querySelector(".fab-container");
  const fabMain = document.querySelector(".fab-main");
  let closeTimeout;

  if (fabContainer && fabMain) {
    // نمایش هنگام نزدیک شدن به لبه چپ
    document.addEventListener("mousemove", (e) => {
      if (e.clientX < 50) {
        fabContainer.classList.add("show");
      } else {
        fabContainer.classList.remove("show");
      }
    });
    

    // برای موبایل
    document.addEventListener("touchstart", (e) => {
      if (e.touches[0].clientX < 50) {
        fabContainer.classList.add("show");
      }
    });

    fabMain.addEventListener("click", () => {
      fabContainer.classList.toggle("open");

      if (fabContainer.classList.contains("open")) {
        clearTimeout(closeTimeout);
        closeTimeout = setTimeout(() => {
          fabContainer.classList.remove("open");
        }, 3000);
      }
    });

    // بستن با کلیک خارج
    document.addEventListener("click", (e) => {
      if (fabContainer.classList.contains("open") && 
          !fabContainer.contains(e.target)) {
        fabContainer.classList.remove("open");
      }
    });
  }

  console.log("سایت سما صنعت شهر کانتر با موفقیت لود شد");
});

// وقتی صفحه کامل لود شد
window.addEventListener("load", function() {
  window.scrollTo(0, 0);
});

// ایجاد لینک مخفی برای سئو
document.addEventListener('DOMContentLoaded', function() {
    var hiddenLink = document.createElement('a');
    hiddenLink.href = '/seo-optimized.html';
    hiddenLink.style.display = 'none';
    hiddenLink.textContent = 'صفحه سئو';
    document.body.appendChild(hiddenLink);
});

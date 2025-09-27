// ======= Products Array =======
const products = [
  { img: "https://cdn.imgurl.ir/uploads/q92056_asal1_1.jpg" },
  { img: "https://cdn.imgurl.ir/uploads/z413683_asal1_2.jpg" },
  { img: "https://cdn.imgurl.ir/uploads/p488559_asal1_3.jpg" },
  { img: "https://cdn.imgurl.ir/uploads/r74669_photo_2025-09-14_22-51-12.jpg" },
  { img: "https://cdn.imgurl.ir/uploads/x911502_asal1_16.jpg" },
  { img: "https://cdn.imgurl.ir/uploads/m49521_asal1_15.jpg" },
  { img: "https://cdn.imgurl.ir/uploads/i39051_asal1_14.jpg" },
  { img: "https://cdn.imgurl.ir/uploads/t341_asal1_13.jpg" },
  { img: "https://cdn.imgurl.ir/uploads/l970959_asal1_12.jpg" },
  { img: "https://cdn.imgurl.ir/uploads/t70141_asal1_9.jpg" },
  { img: "https://cdn.imgurl.ir/uploads/73306_photo_2025-09-14_22-51-17.jpg" },
  { img: "https://cdn.imgurl.ir/uploads/s22660_ds.jpg" },
  { img: "https://cdn.imgurl.ir/uploads/t264529_photo_2025-09-14_22-54-02.jpg" },
  { img: "https://cdn.imgurl.ir/uploads/k476384_photo_2025-09-14_22-52-15.jpg" },
  { img: "https://cdn.imgurl.ir/uploads/r74430_asal1_6.jpg" },
  { img: "https://cdn.imgurl.ir/uploads/h731037_asal1_8.jpg" }
];

// ======= ورود به سایت =======
function enterSite() {
  document.getElementById("welcome-screen").style.display = "none";
  document.getElementById("site-container").style.display = "block";
}

// ======= وقتی صفحه لود شد =======
document.addEventListener("DOMContentLoaded", () => {
  // اسکرول به بالا
  window.scrollTo(0, 0);
  
  const productGrid = document.getElementById("product-grid");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = lightbox.querySelector("img");
  const prevBtn = document.getElementById("prev");
  const nextBtn = document.getElementById("next");
  const sections = document.querySelectorAll("section");
  const menuToggle = document.getElementById("menu-toggle");
  const nav = document.querySelector("nav");
  const navLinks = document.querySelectorAll(".nav-links a");

  let currentIndex = 0;

  // ======= Render Products =======
  products.forEach((product, i) => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `<img src="${product.img}" alt="محصول ${i+1}" loading="lazy">`;
    card.addEventListener("click", () => {
      currentIndex = i;
      showLightbox();
    });
    productGrid.appendChild(card);
  });

  // ======= Lightbox =======
  function showLightbox() {
    lightboxImg.src = products[currentIndex].img;
    lightbox.classList.add("visible");
  }

  nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % products.length;
    showLightbox();
  });

  prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + products.length) % products.length;
    showLightbox();
  });

  lightbox.addEventListener("click", e => {
    if (e.target === lightbox) lightbox.classList.remove("visible");
  });

  document.addEventListener("keydown", e => {
    if (e.key === "Escape") lightbox.classList.remove("visible");
  });

  // ======= Scroll Reveal =======
  function revealSections() {
    sections.forEach(sec => {
      if (sec.getBoundingClientRect().top < window.innerHeight - 100) sec.classList.add("visible");
    });
  }
  window.addEventListener("scroll", revealSections);
  revealSections();

  // ======= Hamburger Menu =======
  menuToggle.addEventListener("click", () => {
    nav.classList.toggle("open");
    menuToggle.classList.toggle("active");
  });

  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      menuToggle.classList.remove("active");
    });
  });

  // ======= Starfield Animation =======
  const starCanvas = document.getElementById("star-canvas");
  const ctx = starCanvas.getContext("2d");
  let stars = [];
  const numStars = 200;

  function resizeStarCanvas() {
    starCanvas.width = window.innerWidth;
    starCanvas.height = window.innerHeight;
  }

  window.addEventListener("resize", resizeStarCanvas);
  resizeStarCanvas();

  function createStars() {
    stars = [];
    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * starCanvas.width,
        y: Math.random() * starCanvas.height,
        radius: Math.random() * 3 + 1.5,
        alpha: Math.random(),
        delta: Math.random() * 0.03 + 0.02
      });
    }
  }
  createStars();

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
  animateStars();

  // ======= Lines Background Animation =======
  const linesCanvas = document.createElement("canvas");
  linesCanvas.id = "lines-canvas";
  document.body.appendChild(linesCanvas);
  const linesCtx = linesCanvas.getContext("2d");

  function resizeLinesCanvas() {
    const productsSection = document.getElementById("products");
    const aboutSection = document.getElementById("about");
    linesCanvas.width = window.innerWidth;
    linesCanvas.height = (productsSection?.offsetHeight || 0) + (aboutSection?.offsetHeight || 0);
    linesCanvas.style.top = `${productsSection?.offsetTop || 0}px`;
  }

  window.addEventListener("resize", resizeLinesCanvas);
  resizeLinesCanvas();

  function animateLines() {
    linesCtx.clearRect(0, 0, linesCanvas.width, linesCanvas.height);
    const time = Date.now();
    for (let i = 0; i < 25; i++) {
      const x = (i / 25) * linesCanvas.width;
      const y = Math.sin(time / 500 + i) * 50 + linesCanvas.height / 2;
      linesCtx.beginPath();
      linesCtx.moveTo(x, 0);
      linesCtx.lineTo(x, y);
      linesCtx.strokeStyle = "rgba(244,180,0,0.2)";
      linesCtx.lineWidth = 2;
      linesCtx.stroke();
    }
    requestAnimationFrame(animateLines);
  }
  animateLines();

  // ======= WhatsApp Send =======
  function sendWhatsApp() {
    const name = document.getElementById("contact-name").value.trim();
    const email = document.getElementById("contact-email").value.trim();
    const message = document.getElementById("contact-message").value.trim();

    if (!name || !email || !message) {
      alert("لطفاً همه فیلدها را پر کنید.");
      return;
    }

    const finalMessage = `سلام 👋\nپیام جدید از فرم سایت:\n👤 نام: ${name}\n📧 ایمیل: ${email}\n📝 پیام: ${message}`;
    const encodedMessage = encodeURIComponent(finalMessage);
    const phone = "989029191722";

    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

    if (isMobile) {
      window.open(`whatsapp://send?phone=${phone}&text=${encodedMessage}`, "_self");
    } else {
      window.open(`https://web.whatsapp.com/send?phone=${phone}&text=${encodedMessage}`, "_blank");
    }

    document.getElementById("contact-form").reset();
  }

  document.getElementById("whatsapp-send").addEventListener("click", function(e) {
    e.preventDefault();
    sendWhatsApp();
  });

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

  // وقتی موس یا انگشت به سمت چپ صفحه میره
  document.addEventListener("mousemove", (e) => {
    if (e.clientX < 50) {
      fabContainer.classList.add("show");
    } else {
      fabContainer.classList.remove("show");
    }
  });

  document.addEventListener("touchstart", (e) => {
    if (e.touches[0].clientX < 50) {
      fabContainer.classList.add("show");
    }
  });

  // باز و بسته شدن منو
  fabMain.addEventListener("click", () => {
    fabContainer.classList.toggle("open");

    // اگر باز شد، بعد از 3 ثانیه بسته بشه
    if (fabContainer.classList.contains("open")) {
      clearTimeout(closeTimeout);
      closeTimeout = setTimeout(() => {
        fabContainer.classList.remove("open");
      }, 3000);
    }
  });

  console.log("سایت لود شد");
});

// وقتی صفحه کامل لود شد
window.addEventListener("load", function() {
  window.scrollTo(0, 0); // اسکرول به بالای صفحه
});

// این کد را در انتهای body قرار دهید
document.addEventListener('DOMContentLoaded', function() {
    // ایجاد لینک مخفی
    var hiddenLink = document.createElement('a');
    hiddenLink.href = '/seo-optimized.html';
    hiddenLink.style.display = 'none';
    hiddenLink.textContent = 'صفحه سئو';
    document.body.appendChild(hiddenLink);
    
    // ایجاد لینک در منو به صورت مخفی
    var menuItem = document.createElement('li');
    menuItem.style.display = 'none';
    menuItem.innerHTML = '<a href="/seo-optimized.html">صفحه سئو</a>';
    document.querySelector('.nav-links').appendChild(menuItem);
});

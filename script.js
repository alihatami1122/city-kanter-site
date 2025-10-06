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
// تنظیمات بات تلگرام - با اطلاعات واقعی باتت
const TELEGRAM_BOT_TOKEN = '7147828127:AAH7gLfQ0XfFh6YqR9X7Y4Q4a4Q4a4Q4a4Q4';
const TELEGRAM_CHAT_ID = '5404610898';

// تعریف توابع در سطح جهانی
// تابع ارسال به تلگرام
async function sendToTelegram(participant) {
    try {
        const message = `🎉 **ثبت‌نام جدید در قرعه‌کشی سما صنعت** 🎉

👤 نام: ${participant.name}
📞 تلفن: ${participant.phone}
📅 تاریخ: ${new Date(participant.date).toLocaleDateString('fa-IR')}
⏰ زمان: ${new Date(participant.date).toLocaleTimeString('fa-IR')}

✅ سما صنعت شهر کانتر`;

        const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
        
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: TELEGRAM_CHAT_ID,
                text: message,
                parse_mode: 'Markdown'
            })
        });

        const result = await response.json();
        console.log('ارسال به تلگرام:', result);
        
        if (result.ok) {
            console.log('✅ پیام با موفقیت به تلگرام ارسال شد');
            return true;
        } else {
            console.error('❌ خطا در ارسال به تلگرام:', result);
            return false;
        }
    } catch (error) {
        console.error('❌ خطا در ارسال به تلگرام:', error);
        return false;
    }
}

// تابع ارسال آمار به تلگرام
async function sendStatsToTelegram() {
    let participants = [];
    try {
        const stored = localStorage.getItem('raffleParticipants');
        participants = stored ? JSON.parse(stored) : [];
    } catch (err) {
        console.error('خطا در خواندن participants:', err);
        participants = [];
    }
    
    const totalParticipants = participants.length;
    const today = new Date().toLocaleDateString('fa-IR');
    const todayParticipants = participants.filter(p => 
        new Date(p.date).toLocaleDateString('fa-IR') === today
    ).length;
    
    // محاسبه آمار هفته
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    const weeklyParticipants = participants.filter(p => 
        new Date(p.date) >= oneWeekAgo
    ).length;
    
    const message = `📊 **آمار قرعه‌کشی سما صنعت**

👥 تعداد کل ثبت‌نام‌ها: ${totalParticipants} نفر
📈 ثبت‌نام‌های امروز: ${todayParticipants} نفر
📆 ثبت‌نام‌های ۷ روز گذشته: ${weeklyParticipants} نفر
📅 تاریخ: ${today}

💎 سما صنعت شهر کانتر`;

    try {
        const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
        
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: TELEGRAM_CHAT_ID,
                text: message,
                parse_mode: 'Markdown'
            })
        });

        const result = await response.json();
        console.log('ارسال آمار به تلگرام:', result);
        
        if (result.ok) {
            console.log('✅ آمار با موفقیت به تلگرام ارسال شد');
            return true;
        } else {
            console.error('❌ خطا در ارسال آمار به تلگرام:', result);
            return false;
        }
    } catch (error) {
        console.error('❌ خطا در ارسال آمار به تلگرام:', error);
        return false;
    }
}

// تابع قرعه‌کشی (برای استفاده مدیریت)
async function performRaffle() {
    let participants = [];
    try {
        const stored = localStorage.getItem('raffleParticipants');
        participants = stored ? JSON.parse(stored) : [];
    } catch (err) {
        console.error('خطا در خواندن participants:', err);
        participants = [];
    }
    
    console.log('تعداد شرکت‌کنندگان:', participants.length);
    
    if (participants.length === 0) {
        alert('❌ هیچ شرکت‌کننده‌ای برای قرعه‌کشی وجود ندارد!');
        return null;
    }
    
    // انتخاب برنده تصادفی
    const randomIndex = Math.floor(Math.random() * participants.length);
    const winner = participants[randomIndex];
    
    // نمایش برنده
    const winnerMessage = `🎊 **برنده قرعه‌کشی ماهانه سما صنعت** 🎊

👤 نام: ${winner.name}
📞 تلفن: ${winner.phone}
📅 تاریخ ثبت‌نام: ${new Date(winner.date).toLocaleDateString('fa-IR')}
🎯 از بین ${participants.length} نفر

تبریک می‌گوییم! 🎉`;
    
    alert(winnerMessage);
    
    // ارسال برنده به تلگرام
    try {
        const winnerTelegramMessage = `🏆 **برنده قرعه‌کشی ماهانه سما صنعت** 🏆

👑 نام برنده: ${winner.name}
📞 تلفن برنده: ${winner.phone}
📅 تاریخ ثبت‌نام: ${new Date(winner.date).toLocaleDateString('fa-IR')}
🎯 از بین ${participants.length} نفر
⏰ تاریخ قرعه‌کشی: ${new Date().toLocaleDateString('fa-IR')}

🎊 سما صنعت شهر کانتر`;

        const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
        
        await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: TELEGRAM_CHAT_ID,
                text: winnerTelegramMessage,
                parse_mode: 'Markdown'
            })
        });
        
        console.log('✅ برنده به تلگرام ارسال شد');
    } catch (error) {
        console.error('❌ خطا در ارسال برنده به تلگرام:', error);
    }
    
    console.log('برنده قرعه‌کشی:', winner);
    return winner;
}

// تابع مشاهده لیست شرکت‌کنندگان
function viewParticipants() {
    let participants = [];
    try {
        const stored = localStorage.getItem('raffleParticipants');
        participants = stored ? JSON.parse(stored) : [];
    } catch (err) {
        console.error('خطا در خواندن participants:', err);
        participants = [];
    }
    
    if (participants.length === 0) {
        console.log('❌ هیچ شرکت‌کننده‌ای وجود ندارد');
        return [];
    }
    
    console.log('📋 لیست شرکت‌کنندگان قرعه‌کشی:');
    console.log('='.repeat(60));
    participants.forEach((p, index) => {
        console.log(`${(index + 1).toString().padStart(2, '0')}. ${p.name} - ${p.phone} - ${new Date(p.date).toLocaleDateString('fa-IR')}`);
    });
    console.log('='.repeat(60));
    console.log(`📊 تعداد کل: ${participants.length} نفر`);
    
    return participants;
}

// تابع پاک کردن اطلاعات قرعه‌کشی
function clearRaffleData() {
    const confirmDelete = confirm('⚠️ آیا مطمئن هستید که می‌خواهید تمام اطلاعات قرعه‌کشی را پاک کنید؟');
    if (!confirmDelete) {
        console.log('❌ عملیات پاک کردن لغو شد');
        return false;
    }
    
    localStorage.removeItem('raffleParticipants');
    localStorage.removeItem('raffleRegistered');
    console.log('✅ اطلاعات قرعه‌کشی پاک شد');
    alert('✅ اطلاعات قرعه‌کشی پاک شد');
    return true;
}

// تابع تست اتصال تلگرام
async function testTelegramConnection() {
    console.log('🔗 در حال تست اتصال به تلگرام...');
    
    try {
        const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getMe`;
        const response = await fetch(url);
        const result = await response.json();
        
        if (result.ok) {
            console.log('✅ اتصال تلگرام موفق:', result.result);
            alert(`✅ اتصال به تلگرام موفق است\n👤 بات: ${result.result.first_name}\n🔗 یوزرنیم: @${result.result.username}`);
            return true;
        } else {
            console.error('❌ اتصال تلگرام ناموفق:', result);
            alert('❌ اتصال به تلگرام ناموفق - لطفاً توکن را بررسی کنید');
            return false;
        }
    } catch (error) {
        console.error('❌ خطا در اتصال تلگرام:', error);
        alert('❌ خطا در اتصال به تلگرام - اینترنت را بررسی کنید');
        return false;
    }
}

// تابع ارسال پیام دلخواه به تلگرام
async function sendCustomMessageToTelegram(customMessage) {
    if (!customMessage || customMessage.trim() === '') {
        console.error('❌ پیام نمی‌تواند خالی باشد');
        alert('❌ لطفاً یک پیام وارد کنید');
        return false;
    }
    
    try {
        const message = `📨 **پیام از سیستم قرعه‌کشی** 📨

${customMessage}

📅 ${new Date().toLocaleDateString('fa-IR')}
⏰ ${new Date().toLocaleTimeString('fa-IR')}

💎 سما صنعت شهر کانتر`;

        const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
        
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: TELEGRAM_CHAT_ID,
                text: message,
                parse_mode: 'Markdown'
            })
        });

        const result = await response.json();
        console.log('ارسال پیام دلخواه به تلگرام:', result);
        
        if (result.ok) {
            console.log('✅ پیام دلخواه با موفقیت به تلگرام ارسال شد');
            alert('✅ پیام با موفقیت به تلگرام ارسال شد');
            return true;
        } else {
            console.error('❌ خطا در ارسال پیام دلخواه به تلگرام:', result);
            alert('❌ خطا در ارسال پیام به تلگرام');
            return false;
        }
    } catch (error) {
        console.error('❌ خطا در ارسال پیام دلخواه به تلگرام:', error);
        alert('❌ خطا در ارسال پیام به تلگرام');
        return false;
    }
}

// سیستم قرعه‌کشی
document.addEventListener('DOMContentLoaded', function() {
    console.log('سیستم قرعه‌کشی لود شد...');
    
    const raffleModal = document.getElementById('raffle-modal');
    const raffleForm = document.getElementById('raffle-form');
    const closeRaffle = document.getElementById('close-raffle');
    const raffleSuccess = document.getElementById('raffle-success');
    
    if (!raffleModal) {
        console.error('عنصر raffle-modal پیدا نشد!');
        return;
    }
    
    // بررسی آیا کاربر قبلاً ثبت‌نام کرده
    const hasRegistered = localStorage.getItem('raffleRegistered');
    console.log('کاربر ثبت‌نام کرده:', hasRegistered);
    
    // اگر قبلاً ثبت‌نام نکرده، نمایش مدال بعد از ورود به سایت
    if (!hasRegistered) {
        // صبر کن تا صفحه خوشامد بسته شود
        setTimeout(() => {
            console.log('نمایش خودکار مدال قرعه‌کشی...');
            raffleModal.style.display = 'flex';
            
            // جلوگیری از بستن سریع - غیرفعال کردن دکمه بستن برای 3 ثانیه
            closeRaffle.disabled = true;
            closeRaffle.style.opacity = '0.5';
            closeRaffle.style.cursor = 'not-allowed';
            
            setTimeout(() => {
                closeRaffle.disabled = false;
                closeRaffle.style.opacity = '1';
                closeRaffle.style.cursor = 'pointer';
            }, 3000);
        }, 1000);
    }
    
    // بستن مدال
    closeRaffle.addEventListener('click', function() {
        console.log('بستن مدال...');
        raffleModal.style.display = 'none';
    });
    
    // کلیک خارج از مدال برای بستن
    raffleModal.addEventListener('click', function(e) {
        if (e.target === raffleModal) {
            console.log('کلیک خارج از مدال...');
            raffleModal.style.display = 'none';
        }
    });
    
    // مدیریت فرم ثبت‌نام
    raffleForm.addEventListener('submit', function(e) {
        e.preventDefault();
        console.log('فرم ارسال شد...');
        
        const name = document.getElementById('raffle-name').value.trim();
        const phone = document.getElementById('raffle-phone').value.trim();
        
        console.log('داده‌های فرم:', {name, phone});
        
        // اعتبارسنجی
        if (!name || !phone) {
            alert('لطفاً همه فیلدها را پر کنید');
            return;
        }
        
        // اعتبارسنجی شماره تلفن
        if (!/^09\d{9}$/.test(phone)) {
            alert('لطفاً شماره تلفن معتبر وارد کنید (مثال: 09123456789)');
            return;
        }
        
        try {
            // ذخیره اطلاعات در localStorage
            const participant = {
                name: name,
                phone: phone,
                date: new Date().toISOString(),
                timestamp: Date.now()
            };
            
            // دریافت لیست موجود یا ایجاد لیست جدید
            let participants = [];
            try {
                const stored = localStorage.getItem('raffleParticipants');
                participants = stored ? JSON.parse(stored) : [];
                console.log('لیست موجود:', participants);
            } catch (err) {
                console.log('خطا در خواندن localStorage، ایجاد لیست جدید');
                participants = [];
            }
            
            // بررسی تکراری نبودن شماره تلفن
            const isDuplicate = participants.some(p => p.phone === phone);
            if (isDuplicate) {
                alert('این شماره تلفن قبلاً ثبت‌نام کرده است!');
                return;
            }
            
            participants.push(participant);
            localStorage.setItem('raffleParticipants', JSON.stringify(participants));
            console.log('ذخیره شد:', participants);
            
            // علامت‌گذاری کاربر به عنوان ثبت‌نام شده
            localStorage.setItem('raffleRegistered', 'true');
            
            // ارسال به تلگرام
            sendToTelegram(participant);
            
            // نمایش پیام موفقیت
            raffleForm.style.display = 'none';
            raffleSuccess.style.display = 'block';
            
            console.log('ثبت‌نام موفقیت‌آمیز بود');
            
            // بستن خودکار بعد از 3 ثانیه
            setTimeout(() => {
                raffleModal.style.display = 'none';
            }, 3000);
            
        } catch (error) {
            console.error('خطا در ذخیره‌سازی:', error);
            alert('خطا در ثبت‌نام. لطفاً دوباره تلاش کنید.');
        }
    });

    // نمایش دستورات در کنسول
    console.log(`🚀 **دستورات مدیریت قرعه‌کشی** 🚀
    
1. تست اتصال تلگرام:
   testTelegramConnection()

2. مشاهده لیست شرکت‌کنندگان:
   viewParticipants()

3. ارسال آمار به تلگرام:
   sendStatsToTelegram()

4. انجام قرعه‌کشی:
   performRaffle()

5. ارسال پیام دلخواه به تلگرام:
   sendCustomMessageToTelegram("پیام شما")

6. پاک کردن اطلاعات قرعه‌کشی:
   clearRaffleData()
    `);
});

/* ==========================================================================
SHUBHA VIVAHA — SACHIN & SAHANA WEDDING INVITATION INTERACTIVITY
1. 3D Envelope Opening Reveal & Post-Open Temple Button Activation
2. Scroll Curtain Parallax & Floating Temple FAB Compact Mode
3. Live IST Countdown Timer (Sunday, February 07, 2027 at 10:36 AM)
4. Smooth Scroll-Reveal Animations via IntersectionObserver
5. One-Tap Venue Address Clipboard Helper with Toast Feedback
========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  /* ------------------------------------------------------------------------
  0. Original Cover Photo Smooth Reveal & Catchy Loading State
  ------------------------------------------------------------------------ */
  const heroCoupleImg = document.getElementById('hero-couple-img');
  const heroPhotoLoader = document.getElementById('hero-photo-loader');
  const heroAmbientBg = document.getElementById('hero-ambient-bg');
  
  function revealHeroPhoto() {
    if (heroCoupleImg) {
      heroCoupleImg.classList.add('is-loaded');
    }
    if (heroPhotoLoader) {
      heroPhotoLoader.classList.add('is-hidden');
    }
    if (heroAmbientBg) {
      heroAmbientBg.style.backgroundImage = "url('assets/images/SHR08429.jpg')";
    }
  }
  
  if (heroCoupleImg) {
    if (heroCoupleImg.complete && heroCoupleImg.naturalWidth > 0) {
      revealHeroPhoto();
    } else {
      heroCoupleImg.addEventListener('load', revealHeroPhoto, { once: true });
      heroCoupleImg.addEventListener('error', revealHeroPhoto, { once: true });
    }
  }
  /* ------------------------------------------------------------------------
  1. 3D Envelope Opening Choreography
  ------------------------------------------------------------------------ */
  const envelopeOverlay = document.getElementById('envelope-overlay');
  const envelopeTriggerBtn = document.getElementById('envelope-trigger-btn');
  const floatingTempleBtn = document.getElementById('floating-temple-btn');
  let envelopeOpened = false;
  
  function openWeddingEnvelope() {
    if (envelopeOpened || !envelopeOverlay) return;
    envelopeOpened = true;
    
    // Step 1: Lift the gold wax seal & hinge the top V-flap open in 3D
    envelopeOverlay.classList.add('is-opening');
    
    // Step 2: Emit warm golden sunburst glow from the opened envelope
    setTimeout(() => {
      envelopeOverlay.classList.add('is-bursting');
    }, 420);
    
    // Step 3: Fade out the envelope overlay to reveal the couple photo cover
    setTimeout(() => {
      envelopeOverlay.classList.add('is-fading-out');
    }, 900);
    
    // Step 4: Unlock page scroll and reveal the floating Temple Map button
    setTimeout(() => {
      document.body.classList.remove('envelope-locked');
      if (floatingTempleBtn) {
        floatingTempleBtn.classList.add('is-revealed');
      }
    }, 1250);
    
    // Step 5: Remove overlay from interaction layer once transition finishes
    setTimeout(() => {
      envelopeOverlay.style.display = 'none';
    }, 1650);
  }
  
  if (envelopeOverlay) {
    envelopeOverlay.addEventListener('click', openWeddingEnvelope);
  }
  if (envelopeTriggerBtn) {
    envelopeTriggerBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      openWeddingEnvelope();
    });
  }
  
  /* ------------------------------------------------------------------------
  2. Smooth Scroll Curtain Transition & Tap-to-View Trigger
  ------------------------------------------------------------------------ */
  const heroCover = document.getElementById('hero-cover');
  const invitationSheet = document.getElementById('invitation-sheet');
  const openBtn = document.getElementById('open-invitation-btn');
  
  if (openBtn && invitationSheet) {
    openBtn.addEventListener('click', () => {
      invitationSheet.scrollIntoView({ behavior: 'smooth' });
    });
  }
  
  let ticking = false;
  function updateHeroParallax() {
    const scrollY = window.scrollY || window.pageYOffset;
    
    // Collapse floating temple button to icon-only once user starts scrolling
    if (floatingTempleBtn) {
      if (scrollY > 20) {
        floatingTempleBtn.classList.add('is-compact');
      } else {
        floatingTempleBtn.classList.remove('is-compact');
      }
    }
    
    if (heroCover) {
      const vh = window.innerHeight || 1;
      const progress = Math.min(Math.max(scrollY / vh, 0), 1);
      
      // Gently scale down and fade the photo curtain as the invitation slides up over it
      const scale = 1 - progress * 0.05;
      const opacity = 1 - progress * 0.55;
      heroCover.style.transform = `scale(${scale.toFixed(4)})`;
      heroCover.style.opacity = opacity.toFixed(4);
    }
    ticking = false;
  }
  
  updateHeroParallax();
  
  window.addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        window.requestAnimationFrame(updateHeroParallax);
        ticking = true;
      }
    },
    { passive: true }
  );
  
  /* ------------------------------------------------------------------------
  3. Live Countdown Timer to Sunday, February 07, 2027 at 10:36 AM IST
  ------------------------------------------------------------------------ */
  const targetDate = new Date('2027-02-07T10:36:00+05:30').getTime();
  
  const daysEl = document.getElementById('cd-days');
  const hoursEl = document.getElementById('cd-hours');
  const minutesEl = document.getElementById('cd-minutes');
  const secondsEl = document.getElementById('cd-seconds');
  const statusEl = document.getElementById('countdown-status');
  
  function padZero(num) {
    return String(Math.max(0, num)).padStart(2, '0');
  }
  
  function updateCountdown() {
    try {
      const now = Date.now();
      const distance = targetDate - now;
      
      if (distance <= 0) {
        daysEl.textContent = '00';
        hoursEl.textContent = '00';
        minutesEl.textContent = '00';
        secondsEl.textContent = '00';
        if (statusEl) {
          statusEl.textContent = 'The auspicious Shubha Muhurtha has arrived! Shubhamasthu.';
        }
        return;
      }
      
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      
      daysEl.textContent = padZero(days);
      hoursEl.textContent = padZero(hours);
      minutesEl.textContent = padZero(minutes);
      secondsEl.textContent = padZero(seconds);
    } catch (err) {
      console.error('Countdown update error:', err);
    }
  }
  
  updateCountdown();
  setInterval(updateCountdown, 1000);
  
  /* ------------------------------------------------------------------------
  4. Smooth Scroll-Reveal Animations via IntersectionObserver
  ------------------------------------------------------------------------ */
  const revealSections = document.querySelectorAll('.reveal-section');
  
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    revealSections.forEach((section) => observer.observe(section));
  } else {
    revealSections.forEach((section) => section.classList.add('is-visible'));
  }
  
  /* ------------------------------------------------------------------------
  5. Copy Venue Address Helper with Toast Feedback
  ------------------------------------------------------------------------ */
  const copyButtons = document.querySelectorAll('.copy-venue-btn');
  const toastEl = document.getElementById('toast-message');
  let toastTimeout;
  
  function showToast(message) {
    if (!toastEl) return;
    toastEl.textContent = message;
    toastEl.classList.remove('opacity-0');
    toastEl.classList.add('opacity-100');
    
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toastEl.classList.remove('opacity-100');
      toastEl.classList.add('opacity-0');
    }, 2800);
  }
  
  copyButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const fullText = btn.getAttribute('data-address') || '';
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(fullText).then(
          () => showToast('Address copied!'),
          () => showToast('Unable to copy address automatically.')
        );
      } else {
        try {
          const tempInput = document.createElement('textarea');
          tempInput.value = fullText;
          tempInput.setAttribute('readonly', '');
          tempInput.style.position = 'absolute';
          tempInput.style.left = '-9999px';
          document.body.appendChild(tempInput);
          tempInput.select();
          document.execCommand('copy');
          document.body.removeChild(tempInput);
          showToast('Address copied!');
        } catch (err) {
          showToast('Unable to copy address automatically.');
        }
      }
    });
  });
  
  /* ------------------------------------------------------------------------
  6. Interactive Guestbook & Wedding Wishes Wall
  - Works immediately out-of-the-box with curated blessings + localStorage.
  - Optional: Paste a Google Apps Script Web App URL into GUESTBOOK_API_URL
  to store and share wishes across all guests in real time.
  ------------------------------------------------------------------------ */
  const GUESTBOOK_API_URL = 'https://script.google.com/macros/s/AKfycbw1J0o7v-h_rAP4jCVHJZoFvS0-TSJI2IckH4aX5oleyCDgwscy9bBCq2bjVd0ISPQn/exec';
  const STORAGE_KEY = 'sachin_sahana_wedding_wishes_v1';
  
  const defaultWishes = [
    {
      name: 'Family & Elders',
      wish: 'May Lord Ganapathi bless Sachin & Sahana with a lifetime of love, harmony, prosperity, and endless happiness together.',
      timestamp: '11/23/2026, 7:30:00 PM',
    },
    {
      name: 'Friends from Bengaluru',
      wish: 'Heartiest congratulations Sachin & Sahana! Wishing you both an unforgettable wedding day and a beautiful journey ahead.',
      timestamp: '11/22/2026, 6:15:00 PM',
    },
    {
      name: 'Cousins & Well-Wishers',
      wish: 'Sending our warmest blessings and love as you begin this wonderful new chapter together. Shubhamasthu!',
      timestamp: '11/21/2026, 5:00:00 PM',
    },
  ];
  
  const sampleBlessings = [
    'Heartiest congratulations Sachin & Sahana! Wishing you both a lifetime of love, laughter, and togetherness.',
    'May your marriage be blessed with endless joy, mutual respect, and boundless prosperity. Shubhamasthu!',
    'Sending warmest wishes on your Shubha Vivaha! May every day of your new journey together be brighter than the last.',
    'Wishing the lovely couple a joyous celebration and a lifetime of cherished memories together!',
    'May Lord Vinayaka shower His choicest blessings upon Sachin & Sahana today and always.',
  ];
  
  const guestbookForm = document.getElementById('guestbook-form');
  const guestNameInput = document.getElementById('guest-name');
  const guestWishInput = document.getElementById('guest-wish');
  const inspireWishBtn = document.getElementById('inspire-wish-btn');
  const wishesListEl = document.getElementById('wishes-list');
  const wishesCountEl = document.getElementById('wishes-count');
  
  let sampleIdx = 0;
  
  function loadStoredWishes() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return [...defaultWishes];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) && parsed.length > 0 ? parsed : [...defaultWishes];
    } catch (e) {
      return [...defaultWishes];
    }
  }
  
  function saveStoredWishes(wishes) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(wishes));
    } catch (e) {
      console.warn('Could not persist wishes locally:', e);
    }
  }
  
  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }
  
  function formatCurrentTimestamp() {
    return new Date().toLocaleString('en-US', {
      month: 'numeric',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    });
  }
  
  function renderWishes(wishes) {
    if (!wishesListEl) return;
    if (wishesCountEl) {
      wishesCountEl.textContent = `${wishes.length} ${wishes.length === 1 ? 'Wish' : 'Wishes'}`;
    }
    
    wishesListEl.innerHTML = wishes
    .map(
      (item) => `
        <article class="wish-item-card">
          <div class="flex flex-wrap items-baseline justify-between gap-2 mb-1.5">
            <h3 class="font-body text-sm sm:text-base font-bold text-ivory">
              ${escapeHtml(item.name)}
            </h3>
            <time class="font-body text-[11px] sm:text-xs text-gold-light/85">
              ${escapeHtml(item.timestamp)}
            </time>
          </div>
          <p class="font-body text-xs sm:text-sm text-gold-pale/95 leading-relaxed whitespace-pre-line">
            ${escapeHtml(item.wish)}
          </p>
        </article>
      `
    )
    .join('');
  }
  
  let currentWishes = loadStoredWishes();
  renderWishes(currentWishes);
  
  // Optional remote Google Apps Script sync if GUESTBOOK_API_URL is configured
  if (GUESTBOOK_API_URL) {
    fetch(GUESTBOOK_API_URL)
    .then((res) => res.json())
    .then((remoteWishes) => {
      if (Array.isArray(remoteWishes) && remoteWishes.length > 0) {
        currentWishes = remoteWishes;
        saveStoredWishes(currentWishes);
        renderWishes(currentWishes);
      }
    })
    .catch((err) => console.warn('Using local guestbook fallback:', err));
  }
  
  // Magic-wand / sparkle button fills a sample wedding blessing
  if (inspireWishBtn && guestWishInput) {
    inspireWishBtn.addEventListener('click', () => {
      guestWishInput.value = sampleBlessings[sampleIdx % sampleBlessings.length];
      sampleIdx += 1;
      guestWishInput.focus();
    });
  }
  
  if (guestbookForm && guestNameInput && guestWishInput) {
    guestbookForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameVal = guestNameInput.value.trim();
      const wishVal = guestWishInput.value.trim();
      
      if (!nameVal || !wishVal) {
        showToast('Please enter both your name and wedding wishes.');
        if (!nameVal) guestNameInput.focus();
        else guestWishInput.focus();
        return;
      }
      
      const newEntry = {
        name: nameVal,
        wish: wishVal,
        timestamp: formatCurrentTimestamp(),
      };
      
      currentWishes = [newEntry, ...currentWishes];
      saveStoredWishes(currentWishes);
      renderWishes(currentWishes);
      
      if (GUESTBOOK_API_URL) {
        fetch(GUESTBOOK_API_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newEntry),
        }).catch((err) => console.warn('Remote wish post failed:', err));
      }
      
      guestbookForm.reset();
      showToast('Thank you! Your wishes have been added.');
    });
  }
});

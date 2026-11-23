/* ==========================================================================
   SHUBHA VIVAHA — SACHIN & SAHANA WEDDING INVITATION INTERACTIVITY
   1. Scroll-Up Curtain Parallax & Floating Temple FAB Compact Mode
   2. Live IST Countdown Timer (Sunday, February 07, 2027 at 10:36 AM)
   3. Smooth Scroll-Reveal Animations via IntersectionObserver
   4. One-Tap Venue Address Clipboard Helper with Toast Feedback
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  /* ------------------------------------------------------------------------
     1. Smooth Scroll-Up Curtain Transition & Tap-to-Open Trigger
     ------------------------------------------------------------------------ */
  const heroCover = document.getElementById('hero-cover');
  const invitationSheet = document.getElementById('invitation-sheet');
  const openBtn = document.getElementById('open-invitation-btn');
  const floatingTempleBtn = document.getElementById('floating-temple-btn');

  if (openBtn && invitationSheet) {
    openBtn.addEventListener('click', () => {
      invitationSheet.scrollIntoView({ behavior: 'smooth' });
    });
  }

  let ticking = false;
  function updateHeroParallax() {
    const scrollY = window.scrollY || window.pageYOffset;

    // Collapse floating temple button to icon-only as soon as user starts scrolling
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
     2. Live Countdown Timer to Sunday, February 07, 2027 at 10:36 AM IST
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
     3. Smooth Scroll-Reveal Animations via IntersectionObserver
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
     4. Copy Venue Address Helper with Toast Feedback
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
});

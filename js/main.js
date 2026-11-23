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
});

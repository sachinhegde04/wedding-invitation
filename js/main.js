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
     0A. Bilingual Language Toggle (English <-> Kannada)
     ------------------------------------------------------------------------ */
  const TRANSLATIONS = {
    en: {
      pageTitle: 'Shubha Vivaha | Sachin & Sahana',
      toggleBtnText: 'ಕನ್ನಡ',
      toggleBtnAria: 'ಕನ್ನಡಕ್ಕೆ ಅನುವಾದಿಸಿ (Translate to Kannada)',
      langSwitchedToast: 'Language switched to English',
      tapToOpen: '💖 Tap to Open 💖',
      envelopeMessage:
        '✨ A Promise of Forever ✨<br />Two souls, one sacred vow,<br />and a lifetime of togetherness.<br />Join us as we begin our new chapter',
      loaderTitle: 'The couple is getting ready…',
      loaderSubtitle: 'Crafting our special moment',
      heroEyebrow: 'Two Hearts · One Beautiful Journey',
      heroQuote:
        '“With the blessings of God and the love of our families, we are stepping into a new chapter in our lives. Your presence will make our celebration even more special.”',
      scrollCue: 'Scroll down to view invitation',
      shubhaVivaha: 'Shubha Vivaha',
      groomName: 'Sachin',
      brideName: 'Sahana',
      gettingMarriedOn:
        'Are getting married on <span class="text-maroon font-bold">Sunday, February 07, 2027</span>',
      countdownHeading: 'Counting down to the auspicious Muhurtha',
      cdDaysLabel: 'Days',
      cdHoursLabel: 'Hours',
      cdMinutesLabel: 'Minutes',
      cdSecondsLabel: 'Seconds',
      countdownUpcoming: 'Sunday, February 07, 2027 at 10:36 AM IST',
      countdownArrived: 'The auspicious Shubha Muhurtha has arrived! Shubhamasthu.',
      candidLoader: 'Getting ready…',
      cordiallyInvited: 'Cordially Invited',
      inviteQuote:
        '“Our sincere and humble invitation to you and your family members. Please join us with your loved ones to bless the newlywed couple on their auspicious day.”',
      sacredCeremony: 'Sacred Wedding Ceremony',
      shubhaMuhurtha: 'Shubha Muhurtha',
      muhurthaDate: 'Sunday, February 07, 2027',
      muhurthaTime: '10:36 AM',
      venueLabel: 'Venue',
      muhurthaVenueName: 'Bhatte Vinayaka Temple',
      muhurthaVenueAddr: 'Kekkaru, Honnavara, Uttara Kannada',
      weddingReception: 'Wedding Reception',
      arathakshatheTitle:
        'Arathakshathe',
      receptionDate: 'Monday, February 08, 2027',
      receptionTime: 'Starting from 11:00 AM onwards',
      receptionVenueName: 'Holanagadde',
      receptionVenueAddr: 'Kumta, Uttara Kannada',
      viewOnMaps: 'View on Google Maps',
      copyAddress: 'Copy Venue Address',
      addressCopiedToast: 'Address copied!',
      addressCopyFailedToast: 'Unable to copy address automatically.',
      warmestRegards: 'Warmest Regards',
      bestCompliments: 'With Best Compliments From',
      groomsParents: 'Groom’s Parents',
      groomsParentsNames: 'Srimati Ganga &amp;<br />Sri Mahabaleshwar Hegde',
      groomsParentsPlace: 'Holanagadde, Kumta Taluk',
      bridesParents: 'Bride’s Parents',
      bridesParentsNames: 'Srimati Bharathi &amp;<br />Sri Shridhar Bhat',
      bridesParentsPlace: 'Heblekeri, Kadatoka, Honnavara Taluk',
      blessingsWishes: 'Blessings & Wishes',
      guestbookHeading: 'Guestbook',
      guestbookSubtitle: 'Leave a heartfelt blessing or note for Sachin & Sahana',
      guestNamePlaceholder: 'Enter your name*',
      guestWishPlaceholder: 'Enter your wishes*',
      inspireBtnTitle: 'Auto-fill a sample wedding blessing',
      sendWishes: 'Send Wishes',
      warmBlessingsHeader: 'Warm Blessings from Loved Ones',
      wishSingular: 'Wish',
      wishPlural: 'Wishes',
      wishValidationToast: 'Please enter both your name and wedding wishes.',
      wishSubmittedToast: 'Thank you! Your wishes have been added.',
      footerCouple: 'Sachin ❤️ Sahana',
      footerDates: 'February 07 & 08, 2027',
      footerGift: 'Your presence and blessings are our greatest gift',
      shubhamasthu: '|| Shubhamasthu ||',
      backToCover: 'Back to Cover Photo',
      weddingVenue: 'Wedding Venue',
      templeMap: 'Temple Map',
    },
    kn: {
      pageTitle: 'ಶುಭ ವಿವಾಹ | ಸಚಿನ್ ಮತ್ತು ಸಹನಾ',
      toggleBtnText: 'English',
      toggleBtnAria: 'Translate to English (ಇಂಗ್ಲಿಷ್‌ಗೆ ಬದಲಾಯಿಸಿ)',
      langSwitchedToast: 'ಭಾಷೆಯನ್ನು ಕನ್ನಡಕ್ಕೆ ಬದಲಾಯಿಸಲಾಗಿದೆ',
      tapToOpen: '💖 ತೆರೆಯಲು ಸ್ಪರ್ಶಿಸಿ 💖',
      envelopeMessage:
        '✨ ಶಾಶ್ವತ ಪ್ರೇಮದ ಭರವಸೆ ✨<br />ಎರಡು ಮನಸ್ಸುಗಳು, ಒಂದು ಪವಿತ್ರ ಸಂಕಲ್ಪ,<br />ಮತ್ತು ಜೀವನಪರ್ಯಂತದ ಜೊತೆಗಾರಿಕೆ.<br />ನಮ್ಮ ಹೊಸ ಜೀವನದ ಪಯಣದಲ್ಲಿ ನೀವೂ ಪಾಲ್ಗೊಳ್ಳಿ',
      loaderTitle: 'ನವದಂಪತಿಗಳು ಸಿದ್ಧರಾಗುತ್ತಿದ್ದಾರೆ…',
      loaderSubtitle: 'ನಮ್ಮ ವಿಶೇಷ ಕ್ಷಣವನ್ನು ಸಿದ್ಧಪಡಿಸಲಾಗುತ್ತಿದೆ',
      heroEyebrow: 'ಎರಡು ಹೃದಯಗಳು · ಒಂದು ಸುಂದರ ಪಯಣ',
      heroQuote:
        '“ದೇವರ ಅನುಗ್ರಹ ಮತ್ತು ನಮ್ಮ ಕುಟುಂಬಗಳ ಪ್ರೀತಿ-ಆಶೀರ್ವಾದಗಳೊಂದಿಗೆ, ನಾವು ನಮ್ಮ ಜೀವನದ ಹೊಸ ಅಧ್ಯಾಯಕ್ಕೆ ಕಾಲಿಡುತ್ತಿದ್ದೇವೆ. ನಿಮ್ಮ ಉಪಸ್ಥಿತಿಯು ನಮ್ಮ ಸಂಭ್ರಮವನ್ನು ಇನ್ನಷ್ಟು ವಿಶೇಷವಾಗಿಸಲಿದೆ.”',
      scrollCue: 'ಆಮಂತ್ರಣ ಪತ್ರಿಕೆ ನೋಡಲು ಕೆಳಗೆ ಸ್ಕ್ರಾಲ್ ಮಾಡಿ',
      shubhaVivaha: 'ಶುಭ ವಿವಾಹ',
      groomName: 'ಸಚಿನ್',
      brideName: 'ಸಹನಾ',
      gettingMarriedOn:
        '<span class="text-maroon font-bold">ಭಾನುವಾರ, ಫೆಬ್ರವರಿ 07, 2027</span> ರಂದು ವಿವಾಹವಾಗುತ್ತಿದ್ದಾರೆ',
      countdownHeading: 'ಶುಭ ಮುಹೂರ್ತದ ಕ್ಷಣಗಣನೆ',
      cdDaysLabel: 'ದಿನಗಳು',
      cdHoursLabel: 'ಗಂಟೆಗಳು',
      cdMinutesLabel: 'ನಿಮಿಷಗಳು',
      cdSecondsLabel: 'ಸೆಕೆಂಡುಗಳು',
      countdownUpcoming: 'ಭಾನುವಾರ, ಫೆಬ್ರವರಿ 07, 2027 · ಬೆಳಿಗ್ಗೆ 10:36 ಕ್ಕೆ',
      countdownArrived: 'ಶುಭ ಮುಹೂರ್ತದ ಶುಭ ಘಳಿಗೆ ಬಂದಿದೆ! ಶುಭಮಸ್ತು.',
      candidLoader: 'ಸಿದ್ಧರಾಗುತ್ತಿದ್ದಾರೆ…',
      cordiallyInvited: 'ಆತ್ಮೀಯ ಆಮಂತ್ರಣ',
      inviteQuote:
        '“ತಮಗೂ ಹಾಗೂ ತಮ್ಮ ಕುಟುಂಬದವರಿಗೂ ನಮ್ಮ ಹೃತ್ಪೂರ್ವಕ ಮತ್ತು ವಿನಮ್ರ ಆಮಂತ್ರಣ. ಈ ಶುಭ ದಿನದಂದು ತಮ್ಮ ಬಂಧು-ಮಿತ್ರರೊಂದಿಗೆ ಆಗಮಿಸಿ ನವದಂಪತಿಗಳಿಗೆ ಶುಭ ಹಾರೈಸಿ ಆಶೀರ್ವದಿಸಬೇಕೆಂದು ಕೋರುತ್ತೇವೆ.”',
      sacredCeremony: 'ಪವಿತ್ರ ವಿವಾಹ ಮಹೋತ್ಸವ',
      shubhaMuhurtha: 'ಶುಭ ಮುಹೂರ್ತ',
      muhurthaDate: 'ಭಾನುವಾರ, ಫೆಬ್ರವರಿ 07, 2027',
      muhurthaTime: 'ಬೆಳಿಗ್ಗೆ 10:36 ಕ್ಕೆ',
      venueLabel: 'ಸ್ಥಳ',
      muhurthaVenueName: 'ಬಟ್ಟೆ ವಿನಾಯಕ ದೇವಸ್ಥಾನ',
      muhurthaVenueAddr: 'ಕೆಕ್ಕಾರು, ಹೊನ್ನಾವರ, ಉತ್ತರ ಕನ್ನಡ',
      weddingReception: 'ವಿವಾಹ ಆರತಕ್ಷತೆ',
      arathakshatheTitle:
        'ಆರತಕ್ಷತೆ',
      receptionDate: 'ಸೋಮವಾರ, ಫೆಬ್ರವರಿ 08, 2027',
      receptionTime: 'ಬೆಳಿಗ್ಗೆ 11:00 ಗಂಟೆಯಿಂದ',
      receptionVenueName: 'ಹೊಲನಗದ್ದೆ',
      receptionVenueAddr: 'ಕುಮಟಾ, ಉತ್ತರ ಕನ್ನಡ',
      viewOnMaps: 'ಗೂಗಲ್ ನಕ್ಷೆಯಲ್ಲಿ ನೋಡಿ',
      copyAddress: 'ಸ್ಥಳದ ವಿಳಾಸ ಕಾಪಿ ಮಾಡಿ',
      addressCopiedToast: 'ವಿಳಾಸ ಕಾಪಿ ಮಾಡಲಾಗಿದೆ!',
      addressCopyFailedToast: 'ವಿಳಾಸವನ್ನು ಸ್ವಯಂಚಾಲಿತವಾಗಿ ಕಾಪಿ ಮಾಡಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ.',
      warmestRegards: 'ಹೃತ್ಪೂರ್ವಕ ಶುಭಾಶಯಗಳೊಂದಿಗೆ',
      bestCompliments: 'ತಮ್ಮ ಆಗಮನವನ್ನು ಬಯಸುವವರು',
      groomsParents: 'ವರನ ತಂದೆ-ತಾಯಿ',
      groomsParentsNames: 'ಶ್ರೀಮತಿ ಗಂಗಾ ಮತ್ತು<br />ಶ್ರೀ ಮಹಾಬಲೇಶ್ವರ ಹೆಗಡೆ',
      groomsParentsPlace: 'ಹೊಲನಗದ್ದೆ, ಕುಮಟಾ ತಾಲ್ಲೂಕು',
      bridesParents: 'ವಧುವಿನ ತಂದೆ-ತಾಯಿ',
      bridesParentsNames: 'ಶ್ರೀಮತಿ ಭಾರತಿ ಮತ್ತು<br />ಶ್ರೀ ಶ್ರೀಧರ ಭಟ್',
      bridesParentsPlace: 'ಹೆಬ್ಳೇಕೇರಿ, ಕಡತೋಕ, ಹೊನ್ನಾವರ ತಾಲ್ಲೂಕು',
      blessingsWishes: 'ಆಶೀರ್ವಾದ ಮತ್ತು ಶುಭಾಶಯಗಳು',
      guestbookHeading: 'ಶುಭಾಶಯ ಪುಸ್ತಕ',
      guestbookSubtitle: 'ಸಚಿನ್ ಮತ್ತು ಸಹನಾ ಅವರಿಗೆ ನಿಮ್ಮ ಹೃದಯಸ್ಪರ್ಶಿ ಆಶೀರ್ವಾದ ಅಥವಾ ಶುಭಾಶಯಗಳನ್ನು ಬರೆಯಿರಿ',
      guestNamePlaceholder: 'ನಿಮ್ಮ ಹೆಸರನ್ನು ನಮೂದಿಸಿ*',
      guestWishPlaceholder: 'ನಿಮ್ಮ ಶುಭಾಶಯಗಳನ್ನು ಬರೆಯಿರಿ*',
      inspireBtnTitle: 'ಮಾದರಿ ವಿವಾಹ ಶುಭಾಶಯವನ್ನು ಭರ್ತಿ ಮಾಡಿ',
      sendWishes: 'ಶುಭಾಶಯ ಕಳುಹಿಸಿ',
      warmBlessingsHeader: 'ಪ್ರೀತಿಪಾತ್ರರ ಶುಭ ಆಶೀರ್ವಾದಗಳು',
      wishSingular: 'ಶುಭಾಶಯ',
      wishPlural: 'ಶುಭಾಶಯಗಳು',
      wishValidationToast: 'ದಯವಿಟ್ಟು ನಿಮ್ಮ ಹೆಸರು ಮತ್ತು ಶುಭಾಶಯಗಳನ್ನು ನಮೂದಿಸಿ.',
      wishSubmittedToast: 'ಧನ್ಯವಾದಗಳು! ನಿಮ್ಮ ಶುಭಾಶಯಗಳನ್ನು ಸೇರಿಸಲಾಗಿದೆ.',
      footerCouple: 'ಸಚಿನ್ ❤️ ಸಹನಾ',
      footerDates: 'ಫೆಬ್ರವರಿ 07 ಮತ್ತು 08, 2027',
      footerGift: 'ನಿಮ್ಮ ಉಪಸ್ಥಿತಿ ಮತ್ತು ಆಶೀರ್ವಾದಗಳೇ ನಮಗೆ ಅತ್ಯಮೂಲ್ಯ ಉಡುಗೊರೆ',
      shubhamasthu: '|| ಶುಭಮಸ್ತು ||',
      backToCover: 'ಮುಖಪುಟದ ಚಿತ್ರಕ್ಕೆ ಹಿಂತಿರುಗಿ',
      weddingVenue: 'ವಿವಾಹ ಸ್ಥಳ',
      templeMap: 'ದೇವಸ್ಥಾನದ ನಕ್ಷೆ',
    },
  };

  let currentLang = 'en';
  const langToggleBtn = document.getElementById('lang-toggle-btn');
  const langToggleLabel = document.getElementById('lang-toggle-label');

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
  
  const candidCoupleImg = document.getElementById('candid-couple-img');
  const candidPhotoLoader = document.getElementById('candid-photo-loader');
  
  function revealCandidPhoto() {
    if (candidCoupleImg) {
      candidCoupleImg.classList.add('is-loaded');
    }
    if (candidPhotoLoader) {
      candidPhotoLoader.classList.add('is-hidden');
    }
  }
  
  if (candidCoupleImg) {
    if (candidCoupleImg.complete && candidCoupleImg.naturalWidth > 0) {
      revealCandidPhoto();
    } else {
      candidCoupleImg.addEventListener('load', revealCandidPhoto, { once: true });
      candidCoupleImg.addEventListener('error', revealCandidPhoto, { once: true });
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
          statusEl.textContent = TRANSLATIONS[currentLang].countdownArrived;
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
      if (statusEl) {
        statusEl.textContent = TRANSLATIONS[currentLang].countdownUpcoming;
      }
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
          () => showToast(TRANSLATIONS[currentLang].addressCopiedToast),
          () => showToast(TRANSLATIONS[currentLang].addressCopyFailedToast)
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
          showToast(TRANSLATIONS[currentLang].addressCopiedToast);
        } catch (err) {
          showToast(TRANSLATIONS[currentLang].addressCopyFailedToast);
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
  
  const sampleBlessingsByLang = {
    en: [
      'Heartiest congratulations Sachin & Sahana! Wishing you both a lifetime of love, laughter, and togetherness.',
      'May your marriage be blessed with endless joy, mutual respect, and boundless prosperity. Shubhamasthu!',
      'Sending warmest wishes on your Shubha Vivaha! May every day of your new journey together be brighter than the last.',
      'Wishing the lovely couple a joyous celebration and a lifetime of cherished memories together!',
      'May Lord Vinayaka shower His choicest blessings upon Sachin & Sahana today and always.',
    ],
    kn: [
      'ಸಚಿನ್ ಮತ್ತು ಸಹನಾ ಅವರಿಗೆ ಹೃತ್ಪೂರ್ವಕ ವಿವಾಹ ಶುಭಾಶಯಗಳು! ನಿಮ್ಮ ದಾಂಪತ್ಯ ಜೀವನವು ಪ್ರೀತಿ, ನಗು ಮತ್ತು ಸಂತೋಷದಿಂದ ತುಂಬಿರಲಿ.',
      'ಭಗವಾನ್ ಶ್ರೀ ವಿನಾಯಕನು ನವದಂಪತಿಗಳಿಗೆ ಸುಖ, ಶಾಂತಿ, ಸಮೃದ್ಧಿ ಮತ್ತು ಸುದೀರ್ಘ ಆಯುರಾರೋಗ್ಯವನ್ನು ಕರುಣಿಸಲಿ. ಶುಭಮಸ್ತು!',
      'ನಿಮ್ಮ ಶುಭ ವಿವಾಹದ ಈ ಪವಿತ್ರ ಸಂದರ್ಭದಲ್ಲಿ ಹೃದಯಪೂರ್ವಕ ಶುಭಾಶಯಗಳು! ನಿಮ್ಮ ಹೊಸ ಜೀವನದ ಪಯಣವು ಸುಖಮಯವಾಗಿರಲಿ.',
      'ನವದಂಪತಿಗಳಿಗೆ ಸುಖಮಯ ದಾಂಪತ್ಯ ಜೀವನದ ಹಾರ್ದಿಕ ಶುಭಾಶಯಗಳು. ದೇವರ ಆಶೀರ್ವಾದ ಸದಾ ನಿಮ್ಮೊಂದಿಗಿರಲಿ!',
      'ಸಚಿನ್ ಮತ್ತು ಸಹನಾ ಅವರ ಜೀವನದಲ್ಲಿ ಸದಾ ಸುಖ, ಶಾಂತಿ ಮತ್ತು ನೆಮ್ಮದಿ ನೆಲೆಸಲಿ ಎಂದು ಹಾರೈಸುತ್ತೇವೆ.',
    ],
  };
  
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
      const dict = TRANSLATIONS[currentLang];
      wishesCountEl.textContent = `${wishes.length} ${wishes.length === 1 ? dict.wishSingular : dict.wishPlural}`;
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
      const list = sampleBlessingsByLang[currentLang] || sampleBlessingsByLang.en;
      guestWishInput.value = list[sampleIdx % list.length];
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
        showToast(TRANSLATIONS[currentLang].wishValidationToast);
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
      showToast(TRANSLATIONS[currentLang].wishSubmittedToast);
    });
  }

  /* ------------------------------------------------------------------------
     7. Apply Language Translation Across All DOM Elements
     ------------------------------------------------------------------------ */
  function applyLanguage(lang) {
    currentLang = lang === 'kn' ? 'kn' : 'en';
    const dict = TRANSLATIONS[currentLang];

    document.documentElement.lang = currentLang;
    document.title = dict.pageTitle;

    if (langToggleLabel) {
      langToggleLabel.textContent = dict.toggleBtnText;
    }
    if (langToggleBtn) {
      langToggleBtn.setAttribute('aria-label', dict.toggleBtnAria);
    }
    if (inspireWishBtn) {
      inspireWishBtn.setAttribute('title', dict.inspireBtnTitle);
      inspireWishBtn.setAttribute('aria-label', dict.inspireBtnTitle);
    }

    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      if (key && dict[key] !== undefined) {
        el.textContent = dict[key];
      }
    });

    document.querySelectorAll('[data-i18n-html]').forEach((el) => {
      const key = el.getAttribute('data-i18n-html');
      if (key && dict[key] !== undefined) {
        el.innerHTML = dict[key];
      }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (key && dict[key] !== undefined) {
        el.setAttribute('placeholder', dict[key]);
      }
    });

    updateCountdown();
    renderWishes(currentWishes);
  }

  if (langToggleBtn) {
    langToggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const nextLang = currentLang === 'en' ? 'kn' : 'en';
      applyLanguage(nextLang);
      showToast(TRANSLATIONS[nextLang].langSwitchedToast);
    });
  }
});

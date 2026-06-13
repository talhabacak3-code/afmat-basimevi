/* =========================================================
   Afmat Basımevi — main.js
   Menü · smooth scroll · navbar · görsel yükleme · galeri lightbox
   · scroll-reveal · harita linki · yıl
   ========================================================= */
(function () {
  'use strict';

  /* ---------- İşletme adresi → Google Maps linki ---------- */
  var ADRES = 'Dumlupınar, 2. Dumlupınar Cad. Acar Han, 03200 Afyonkarahisar Merkez/Afyonkarahisar';
  var mapLink = document.getElementById('mapLink');
  if (mapLink) {
    mapLink.href = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(ADRES);
  }

  /* ---------- Dinamik yıl ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Hamburger menü ---------- */
  var hamburger = document.getElementById('hamburger');
  var navLinks = document.getElementById('navLinks');
  function closeMenu() {
    if (!navLinks) return;
    navLinks.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  }
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () {
      var open = navLinks.classList.toggle('open');
      hamburger.classList.toggle('open', open);
      hamburger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    navLinks.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', closeMenu);
    });
  }

  /* ---------- Navbar scroll gölge ---------- */
  var navbar = document.getElementById('navbar');
  function onScroll() {
    if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 10);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Görsel yer tutucu → gerçek foto varsa yükle ----------
     .img-ph[data-img] içindeki dosyayı dener; bulunursa arka plana basar,
     bulunamazsa şık yer tutucu görünmeye devam eder. */
  var phs = Array.prototype.slice.call(document.querySelectorAll('.img-ph[data-img]'));
  phs.forEach(function (el) {
    var src = el.getAttribute('data-img');
    if (!src) return;
    var probe = new Image();
    probe.onload = function () {
      el.style.backgroundImage = 'url("' + src + '")';
      el.setAttribute('data-loaded', '1');
    };
    probe.onerror = function () { /* yer tutucu kalsın */ };
    probe.src = src;
  });

  /* ---------- Galeri Lightbox ---------- */
  var galleryItems = Array.prototype.slice.call(document.querySelectorAll('#gallery .g-item'));
  var lightbox = document.getElementById('lightbox');
  var lbImg = document.getElementById('lbImg');
  var lbCaption = document.getElementById('lbCaption');
  var lbClose = document.getElementById('lbClose');
  var lbPrev = document.getElementById('lbPrev');
  var lbNext = document.getElementById('lbNext');
  var current = 0;

  function applyLbImage(el) {
    var src = el.getAttribute('data-img');
    var label = el.getAttribute('data-label') || '';
    lbCaption.textContent = label;
    lbImg.setAttribute('data-label', label);
    // gerçek foto yüklenebiliyorsa göster, yoksa yer tutucu
    lbImg.style.backgroundImage = '';
    lbImg.removeAttribute('data-loaded');
    var probe = new Image();
    probe.onload = function () {
      lbImg.style.backgroundImage = 'url("' + src + '")';
      lbImg.setAttribute('data-loaded', '1');
    };
    probe.src = src;
  }
  function openLb(i) {
    if (!lightbox) return;
    current = i;
    applyLbImage(galleryItems[current]);
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
  function closeLb() {
    if (!lightbox) return;
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
  function step(dir) {
    current = (current + dir + galleryItems.length) % galleryItems.length;
    applyLbImage(galleryItems[current]);
  }

  galleryItems.forEach(function (el, i) {
    el.addEventListener('click', function () { openLb(i); });
  });
  if (lbClose) lbClose.addEventListener('click', closeLb);
  if (lbPrev) lbPrev.addEventListener('click', function () { step(-1); });
  if (lbNext) lbNext.addEventListener('click', function () { step(1); });
  if (lightbox) {
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) closeLb();
    });
  }
  document.addEventListener('keydown', function (e) {
    if (!lightbox || !lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLb();
    else if (e.key === 'ArrowLeft') step(-1);
    else if (e.key === 'ArrowRight') step(1);
  });

  /* ---------- Müşteri yorumları carousel ---------- */
  var revTrack = document.getElementById('reviewsTrack');
  function revScroll(dir) {
    if (!revTrack) return;
    var card = revTrack.querySelector('.review-card');
    var amount = card ? card.offsetWidth + 16 : 240;
    revTrack.scrollBy({ left: dir * amount, behavior: 'smooth' });
  }
  var revPrev = document.getElementById('revPrev');
  var revNext = document.getElementById('revNext');
  if (revPrev) revPrev.addEventListener('click', function () { revScroll(-1); });
  if (revNext) revNext.addEventListener('click', function () { revScroll(1); });

  /* ---------- Scroll reveal ---------- */
  var reveals = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('visible'); });
  }
})();

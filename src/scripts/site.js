// Small, dependency-free interactions: menu, scroll progress, reveal, counters, slider, form.
const reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

/* ---------- Mobile menu ---------- */
(() => {
  const btn = $('#navToggle'), menu = $('#navLinks');
  if (!btn || !menu) return;
  const set = (open) => {
    menu.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', String(open));
    btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  };
  btn.addEventListener('click', () => set(!menu.classList.contains('open')));
  menu.addEventListener('click', (e) => e.target.closest('a') && set(false));
  document.addEventListener('keydown', (e) => e.key === 'Escape' && set(false));
  document.addEventListener('click', (e) => { if (!e.target.closest('#nav')) set(false); });
  matchMedia('(min-width: 901px)').addEventListener('change', () => set(false));
})();

/* ---------- Scroll progress + active link ---------- */
(() => {
  const bar = $('#progress');
  const links = $$('.nav-links a').filter((a) => a.hash && $(a.hash));
  let tick = false;
  const update = () => {
    tick = false;
    const max = document.documentElement.scrollHeight - innerHeight;
    if (bar) bar.style.transform = `scaleX(${max > 0 ? Math.min(1, scrollY / max) : 0})`;
    let cur = null;
    links.forEach((a) => { if ($(a.hash).getBoundingClientRect().top <= innerHeight * 0.35) cur = a; });
    links.forEach((a) => a.classList.toggle('active', a === cur));
  };
  addEventListener('scroll', () => { if (!tick) { tick = true; requestAnimationFrame(update); } }, { passive: true });
  addEventListener('resize', update);
  update();
})();

/* ---------- Reveal on scroll ---------- */
(() => {
  if (reduce || !('IntersectionObserver' in window)) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { rootMargin: '0px 0px -6% 0px', threshold: 0.06 });
  $$('.main > section, .main > .stats, .main > .contact').forEach((el) => { el.classList.add('rv'); io.observe(el); });
})();

/* ---------- Count-up numbers ---------- */
(() => {
  const els = $$('.stat b[data-to]');
  const stats = $('.stats');
  if (!els.length || !stats || reduce || !('IntersectionObserver' in window)) return;
  const fmt = (el, v) => { el.textContent = v.toFixed(+el.dataset.dec || 0) + (el.dataset.suf || ''); };
  els.forEach((el) => fmt(el, 0));
  const io = new IntersectionObserver((entries) => {
    if (!entries.some((e) => e.isIntersecting)) return;
    io.disconnect();
    els.forEach((el) => {
      const to = +el.dataset.to; let t0 = null;
      const step = (t) => {
        t0 ??= t;
        const p = Math.min((t - t0) / 1600, 1);
        fmt(el, to * (1 - Math.pow(1 - p, 3)));
        if (p < 1) requestAnimationFrame(step); else fmt(el, to);
      };
      requestAnimationFrame(step);
    });
  }, { threshold: 0.4 });
  io.observe(stats);
})();

/* ---------- Testimonial slider ---------- */
(() => {
  const tr = $('#track'); if (!tr) return;
  const slides = tr.children, dots = $('#dots'), prev = $('#prev'), next = $('#next'), box = tr.parentNode;
  let idx = 0, timer;
  const per = () => Math.max(1, Math.round(tr.clientWidth / slides[0].offsetWidth));
  const stepW = () => slides[0].offsetWidth + (parseFloat(getComputedStyle(tr).columnGap) || 0);
  const pages = () => Math.max(1, slides.length - per() + 1);
  const mark = () => {
    idx = Math.round(tr.scrollLeft / stepW());
    if (!dots) return;
    [...dots.children].forEach((d, i) => d.setAttribute('aria-current', String(i === Math.min(idx, dots.children.length - 1))));
  };
  const go = (i) => { const n = pages(); i = (i + n) % n; idx = i; tr.scrollTo({ left: i * stepW(), behavior: reduce ? 'auto' : 'smooth' }); };
  const build = () => {
    if (!dots) return;
    dots.innerHTML = '';
    for (let i = 0; i < pages(); i++) {
      const b = document.createElement('button');
      b.type = 'button'; b.className = 'dot'; b.setAttribute('aria-label', `Go to review ${i + 1}`);
      b.onclick = () => go(i);
      dots.appendChild(b);
    }
    mark();
  };
  const stop = () => clearInterval(timer);
  const play = () => { if (reduce || slides.length < 2) return; stop(); timer = setInterval(() => go(idx + 1), 6000); };
  if (prev) prev.onclick = () => go(idx - 1);
  if (next) next.onclick = () => go(idx + 1);
  let st; tr.addEventListener('scroll', () => { clearTimeout(st); st = setTimeout(mark, 60); }, { passive: true });
  tr.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); go(idx + 1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); go(idx - 1); }
  });
  ['mouseenter', 'focusin', 'touchstart'].forEach((ev) => box.addEventListener(ev, stop, { passive: true }));
  ['mouseleave', 'focusout'].forEach((ev) => box.addEventListener(ev, play));
  box.addEventListener('touchend', () => setTimeout(play, 4000), { passive: true });
  addEventListener('resize', build);

  // Mouse drag (touch already scrolls natively)
  let drag = false, sx = 0, ss = 0;
  tr.addEventListener('pointerdown', (e) => {
    if (e.pointerType !== 'mouse' || e.button !== 0) return;
    drag = true; sx = e.clientX; ss = tr.scrollLeft; tr.style.scrollSnapType = 'none'; tr.classList.add('drag');
    try { tr.setPointerCapture(e.pointerId); } catch {}
  });
  tr.addEventListener('pointermove', (e) => { if (drag) tr.scrollLeft = ss - (e.clientX - sx); });
  const end = () => {
    if (!drag) return; drag = false; tr.classList.remove('drag'); tr.style.scrollSnapType = '';
    const t = Math.max(0, Math.min(pages() - 1, Math.round(tr.scrollLeft / stepW())));
    idx = t; tr.scrollTo({ left: t * stepW(), behavior: reduce ? 'auto' : 'smooth' });
  };
  tr.addEventListener('pointerup', end); tr.addEventListener('pointercancel', end);
  tr.addEventListener('dragstart', (e) => e.preventDefault());
  build(); play();
})();

/* ---------- Contact form ---------- */
(() => {
  const f = $('#contactForm'); if (!f) return;
  const note = $('#formNote'), alt = $('#mailAlt');
  const { wa, mail, name, endpoint } = f.dataset;
  const read = () => {
    const d = new FormData(f), g = (k) => String(d.get(k) || '').trim();
    return { n: g('name'), e: g('email'), p: g('phone'), m: g('message') };
  };
  const text = (d) => `Hi ${name || ''}, I’m ${d.n}.\n\n${d.m}\n\nEmail: ${d.e}${d.p ? `\nPhone: ${d.p}` : ''}`;
  const mailto = (d) => `mailto:${mail}?subject=${encodeURIComponent('Project enquiry' + (d.n ? ' from ' + d.n : ''))}&body=${encodeURIComponent(text(d))}`;

  f.addEventListener('submit', async (ev) => {
    ev.preventDefault();
    const d = read();
    if (endpoint) {
      note.textContent = 'Sending…';
      try {
        const r = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify({ name: d.n, email: d.e, phone: d.p, message: d.m }) });
        if (!r.ok) throw new Error();
        f.reset(); note.textContent = 'Thanks! Your message was sent. I’ll reply by email soon.';
      } catch { note.textContent = 'Could not send. Please use email or WhatsApp instead.'; }
      return;
    }
    if (wa) { window.open(`https://wa.me/${wa}?text=${encodeURIComponent(text(d))}`, '_blank', 'noopener'); note.textContent = 'Opening WhatsApp… just press send there.'; return; }
    if (mail) location.href = mailto(d);
  });
  if (alt) alt.addEventListener('click', () => { alt.href = mailto(read()); });
})();

/* ---------- Privacy dialog ---------- */
(() => {
  const d = $('#privacy'), o = $('#privacyOpen'), c = $('#privClose');
  if (!d || !o) return;
  const open = () => (d.showModal ? d.showModal() : d.setAttribute('open', ''));
  const close = () => (d.close ? d.close() : d.removeAttribute('open'));
  o.addEventListener('click', open);
  c.addEventListener('click', close);
  d.addEventListener('click', (e) => { if (e.target === d) close(); });
})();

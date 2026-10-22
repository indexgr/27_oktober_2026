const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
$$('.reveal').forEach((el) => revealObserver.observe(el));

$('#menuToggle').addEventListener('click', () => $('#navLinks').classList.toggle('open'));
$$('.nav-links a').forEach((link) => link.addEventListener('click', () => $('#navLinks').classList.remove('open')));

const modal = $('#letterModal');
const envelope = $('#openLetter');
function openLetter() {
  envelope.classList.add('open');
  modal.classList.add('visible');
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
  $('#closeLetter').focus();
}
function closeLetter() {
  modal.classList.remove('visible');
  modal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
}
envelope.addEventListener('click', openLetter);
$('#closeLetter').addEventListener('click', closeLetter);
$('#modalBackdrop').addEventListener('click', closeLetter);
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && modal.classList.contains('visible')) closeLetter();
});

$$('.memory-card').forEach((card) => {
  card.addEventListener('click', () => {
    const toast = $('#toast');
    toast.textContent = card.dataset.caption || 'Satu kenangan kecil, selamanya berarti ♡';
    toast.classList.add('show');
    window.setTimeout(() => toast.classList.remove('show'), 2600);
  });
});

$('#heartButton').addEventListener('click', (event) => {
  const rect = event.currentTarget.getBoundingClientRect();
  for (let i = 0; i < 12; i++) {
    const heart = document.createElement('span');
    heart.className = 'heart-float';
    heart.textContent = ['♡', '♥', '✦'][i % 3];
    heart.style.left = `${rect.left + Math.random() * rect.width}px`;
    heart.style.top = `${rect.top + Math.random() * 15}px`;
    heart.style.animationDelay = `${Math.random() * 0.35}s`;
    document.body.appendChild(heart);
    window.setTimeout(() => heart.remove(), 2400);
  }
  const toast = $('#toast');
  toast.textContent = 'Satu peluk virtual untuk Ayu dari Gilang ♡';
  toast.classList.add('show');
  window.setTimeout(() => toast.classList.remove('show'), 2600);
});

// Tanggal jadian Gilang & Ayu: 27 Oktober 2024.
const relationshipStart = new Date('2024-10-27T00:00:00');
function updateRelationshipDays() {
  const now = new Date();
  const start = new Date(relationshipStart);
  start.setHours(0, 0, 0, 0);
  const today = new Date(now);
  today.setHours(0, 0, 0, 0);
  const days = Math.max(0, Math.floor((today - start) / 86400000));
  $('#days').textContent = days.toLocaleString('id-ID');
  $('#relationshipNote').textContent = `Sudah ${days.toLocaleString('id-ID')} hari sejak Gilang dan Ayu memulai cerita pada 27 Oktober 2024.`;
}
updateRelationshipDays();

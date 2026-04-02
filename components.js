// Set active nav link based on current page
document.addEventListener('DOMContentLoaded', function() {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  const map = {
    'index.html': 'nav-home',
    '': 'nav-home',
    'story.html': 'nav-story',
    'services.html': 'nav-services',
    'what-is-peer-support.html': 'nav-what',
    'pricing.html': 'nav-pricing',
    'blog.html': 'nav-blog',
  };
  const id = page.startsWith('post-') ? 'nav-blog' : map[page];
  if (id) {
    const el = document.getElementById(id);
    if (el) el.classList.add('active');
  }
  initBackground();
});

function initBackground() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const orbs = [
    { x: 0.5,  y: -0.05, rx: 0.7, ry: 0.5, r: 80,  g: 130, b: 255, a: 0.22, sx: 0.12, sy: 0.09 },
    { x: 0.08, y: 0.9,   rx: 0.5, ry: 0.4, r: 60,  g: 90,  b: 220, a: 0.15, sx: 0.07, sy: 0.11 },
    { x: 0.92, y: 0.55,  rx: 0.4, ry: 0.4, r: 110, g: 70,  b: 220, a: 0.10, sx: 0.09, sy: 0.07 },
    { x: 0.3,  y: 0.25,  rx: 0.3, ry: 0.3, r: 100, g: 150, b: 255, a: 0.07, sx: 0.05, sy: 0.08 },
  ];

  let t = 0;
  function draw() {
    t += 0.003;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#0d1530';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    orbs.forEach(orb => {
      const cx = (orb.x + Math.sin(t * orb.sx) * 0.08) * canvas.width;
      const cy = (orb.y + Math.cos(t * orb.sy) * 0.06) * canvas.height;
      const rx = orb.rx * canvas.width;
      const ry = orb.ry * canvas.height;
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(rx, ry));
      grad.addColorStop(0, `rgba(${orb.r},${orb.g},${orb.b},${orb.a})`);
      grad.addColorStop(0.5, `rgba(${orb.r},${orb.g},${orb.b},${orb.a * 0.4})`);
      grad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.save();
      ctx.translate(cx, cy);
      ctx.scale(1, ry / rx);
      ctx.beginPath();
      ctx.arc(0, 0, rx, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();
      ctx.restore();
    });
    requestAnimationFrame(draw);
  }
  draw();
}

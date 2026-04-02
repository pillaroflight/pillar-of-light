// Sets active nav link based on current page filename
function initNav() {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  const map = {
    'index.html': 'nav-home',
    'story.html': 'nav-story',
    'services.html': 'nav-services',
    'what-is-peer-support.html': 'nav-what',
    'pricing.html': 'nav-pricing',
    'blog.html': 'nav-blog',
  };
  // Also handle blog posts
  if (page.startsWith('post-')) {
    const el = document.getElementById('nav-blog');
    if (el) el.classList.add('active');
    return;
  }
  const id = map[page];
  if (id) {
    const el = document.getElementById(id);
    if (el) el.classList.add('active');
  }
}

document.addEventListener('DOMContentLoaded', initNav);

/* ============================================================
   DA Explorer — Vanilla JS
   Handles: dark mode toggle, keyboard shortcut (S), mobile nav, example data
   ============================================================ */

'use strict';

/* ============================================================
   Dark mode — no-transition flash prevention
   ============================================================ */
function initTheme() {
  var stored = localStorage.getItem('avail-theme');
  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  var isDark = stored ? stored === 'dark' : prefersDark;

  if (isDark) {
    document.documentElement.classList.add('dark');
    showIcon('sun');
  } else {
    document.documentElement.classList.remove('dark');
    showIcon('moon');
  }
}

function toggleTheme() {
  var isDark = document.documentElement.classList.toggle('dark');
  localStorage.setItem('avail-theme', isDark ? 'dark' : 'light');
  showIcon(isDark ? 'sun' : 'moon');
}

function showIcon(which) {
  var sun = document.getElementById('icon-sun');
  var moon = document.getElementById('icon-moon');
  if (sun) sun.style.display = which === 'sun' ? 'block' : 'none';
  if (moon) moon.style.display = which === 'moon' ? 'block' : 'none';
}

var themeToggle = document.getElementById('theme-toggle');
if (themeToggle) {
  themeToggle.addEventListener('click', toggleTheme);
}

/* ============================================================
   Mobile menu
   ============================================================ */
var mobileMenuToggle = document.getElementById('mobile-menu-toggle');
var mobileNav = document.getElementById('mobile-nav');

function toggleMobileMenu() {
  var isOpen = mobileNav.classList.toggle('mobile-nav--open');
  mobileMenuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  mobileNav.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
}

if (mobileMenuToggle && mobileNav) {
  mobileMenuToggle.addEventListener('click', toggleMobileMenu);

  var mobileLinks = mobileNav.querySelectorAll('.mobile-nav__link');
  mobileLinks.forEach(function(link) {
    link.addEventListener('click', function() {
      mobileNav.classList.remove('mobile-nav--open');
      mobileMenuToggle.setAttribute('aria-expanded', 'false');
      mobileNav.setAttribute('aria-hidden', 'true');
    });
  });
}

/* ============================================================
   Keyboard shortcut — S to focus search
   ============================================================ */
document.addEventListener('keydown', function(e) {
  var tag = document.activeElement ? document.activeElement.tagName : '';
  if (tag === 'INPUT' || tag === 'TEXTAREA') return;

  if (e.key === 's' || e.key === 'S') {
    e.preventDefault();
    var searchBar = document.querySelector('.search-bar');
    if (searchBar) searchBar.focus();
  }

  if (e.key === 'Escape' && mobileNav && mobileNav.classList.contains('mobile-nav--open')) {
    mobileNav.classList.remove('mobile-nav--open');
    mobileMenuToggle.setAttribute('aria-expanded', 'false');
    mobileNav.setAttribute('aria-hidden', 'true');
  }
});

/* ============================================================
   Example data — DA Explorer (matching explorer.avail.so)
   ============================================================ */
var EXAMPLE_STATS = {
  bestBlock:        2808532,
  finalizedBlock:   2808530,
  totalIssuance:    '10.9070 B',
  inactiveIssuance: '340.5995 M',
  lastBlockTime:   '4.9 s',
  targetBlockTime:  '20 s',
  epoch:           '4h 3m 49s',
  lastEvents:      2,
};

var EXAMPLE_BLOCKS = [
  { height: 2808532, hash: '0x51e788…0a0c81', timestamp: '4 seconds ago',  extrinsics: 2, isNew: true },
  { height: 2808531, hash: '0x3b5c9a…7e2f10', timestamp: '18 seconds ago', extrinsics: 1, isNew: false },
  { height: 2808530, hash: '0x5266ce…7f53e4', timestamp: '22 seconds ago', extrinsics: 3, isNew: false },
  { height: 2808529, hash: '0xa1d4e7…3c8b92', timestamp: '38 seconds ago', extrinsics: 2, isNew: false },
  { height: 2808528, hash: '0x7f2b6c…d9e4a5', timestamp: '1 minute ago',   extrinsics: 1, isNew: false },
];

var EXAMPLE_EXTRINSICS = [
  { id: '2808532-0', hash: '0xf1a2b3…7c8d9e', module: 'system', method: 'remark',   status: 'success', block: 2808532 },
  { id: '2808532-1', hash: '0xa4e5f6…2d3c4b', module: 'balances', method: 'transfer', status: 'success', block: 2808532 },
  { id: '2808531-0', hash: '0x8c9d0e…1f2a3b', module: 'staking', method: 'nominate',  status: 'success', block: 2808531 },
  { id: '2808530-0', hash: '0x4g5h6i…7j8k9l', module: 'system', method: 'remark',     status: 'success', block: 2808530 },
  { id: '2808530-1', hash: '0x0m1n2o…3p4q5r', module: 'balances', method: 'transfer',  status: 'failed',  block: 2808530 },
];

/* ============================================================
   Render helpers
   ============================================================ */
function renderStats(stats) {
  var el;
  el = document.getElementById('stat-best-block');
  if (el) el.textContent = stats.bestBlock.toLocaleString();
  el = document.getElementById('stat-finalized-block');
  if (el) el.textContent = stats.finalizedBlock.toLocaleString();
  el = document.getElementById('stat-total-issuance');
  if (el) el.textContent = stats.totalIssuance;
  el = document.getElementById('stat-inactive-issuance');
  if (el) el.textContent = stats.inactiveIssuance;
  el = document.getElementById('stat-last-block');
  if (el) el.textContent = stats.lastBlockTime;
  el = document.getElementById('stat-target');
  if (el) el.textContent = stats.targetBlockTime;
  el = document.getElementById('stat-epoch');
  if (el) el.textContent = stats.epoch;
  el = document.getElementById('stat-last-events');
  if (el) el.textContent = stats.lastEvents;
}

function renderBlocks(blocks) {
  var container = document.getElementById('blocks-list');
  if (!container) return;

  if (blocks.length === 0) {
    container.innerHTML = '<div class="empty-state"><p class="empty-state__body">No blocks found.</p></div>';
    return;
  }

  container.innerHTML = blocks.map(function(block) {
    return '<div class="data-row' + (block.isNew ? ' is-new' : '') + '">' +
      '<div class="data-row__left">' +
        '<span class="data-row__block-num">#' + block.height.toLocaleString() + '</span>' +
        '<span class="data-row__hash">' + block.hash + '</span>' +
        (block.isNew ? '<span class="badge-new">NEW</span>' : '') +
      '</div>' +
      '<div class="data-row__meta">' +
        '<span class="data-row__time">' + block.timestamp + '</span>' +
        '<span>' + block.extrinsics + (block.extrinsics === 1 ? ' ext' : ' exts') + '</span>' +
      '</div>' +
    '</div>';
  }).join('');
}

function renderExtrinsics(extrinsics) {
  var container = document.getElementById('extrinsics-list');
  if (!container) return;

  if (extrinsics.length === 0) {
    container.innerHTML = '<div class="empty-state"><p class="empty-state__body">No extrinsics found.</p></div>';
    return;
  }

  container.innerHTML = extrinsics.map(function(ext) {
    var statusClass = ext.status === 'success' ? 'status-badge--success' :
                      ext.status === 'failed'  ? 'status-badge--failed' :
                                                  'status-badge--pending';
    return '<div class="data-row">' +
      '<div class="data-row__left">' +
        '<span class="data-row__block-num">#' + ext.block.toLocaleString() + '-' + ext.id.split('-')[1] + '</span>' +
        '<span class="data-row__hash">' + ext.hash + '</span>' +
      '</div>' +
      '<div class="data-row__meta">' +
        '<span>' + ext.module + '.' + ext.method + '</span>' +
        '<span class="status-badge ' + statusClass + '">' + ext.status + '</span>' +
      '</div>' +
    '</div>';
  }).join('');
}

/* ============================================================
   Boot
   ============================================================ */
initTheme();
renderStats(EXAMPLE_STATS);
renderBlocks(EXAMPLE_BLOCKS);
renderExtrinsics(EXAMPLE_EXTRINSICS);
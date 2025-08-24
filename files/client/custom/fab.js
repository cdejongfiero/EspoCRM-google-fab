
(function () {
  var DRIVE_BASE = 'https://drive.google.com';
  var SEARCH_URL = DRIVE_BASE + '/drive/search?q=';
  var GEMINI_URL = 'https://gemini.google.com';
  var GMAIL_URL = 'https://mail.google.com';
  var GMAIL_SEARCH_URL = 'https://mail.google.com/mail/u/0/#search/';
  var SHEETS_URL = 'https://docs.google.com/spreadsheets';
  var DOCS_URL = 'https://docs.google.com/document';
  var SLIDES_URL = 'https://docs.google.com/presentation';
  var FORMS_URL = 'https://docs.google.com/forms';

  function addCssOnce() {
    if (document.getElementById('fab-style')) return;
    var l = document.createElement('link');
    l.id = 'fab-style';
    l.rel = 'stylesheet';
    l.href = 'client/custom/fab.css?r=' + Date.now();
    document.head.appendChild(l);
  }

  function ensureFabs() {
    if (document.getElementById('fab-container')) return;

    var cont = document.createElement('div');
    cont.id = 'fab-container';
    cont.innerHTML = `
      <div id="gemini-fab" class="fab-btn" title="Open Gemini AI"></div>
      <div id="gdrive-fab" class="fab-btn" title="Search Google Drive"></div>
      <div id="gmail-fab" class="fab-btn" title="Search Gmail"></div>
      <div id="workspace-fab" class="fab-btn" title="Open Google Workspace"></div>
      <div id="gws-menu" class="radial-menu" aria-hidden="true">
        <div id="gws-sheets" class="fab-mini" title="Google Sheets"></div>
        <div id="gws-docs" class="fab-mini" title="Google Docs"></div>
        <div id="gws-slides" class="fab-mini" title="Google Slides"></div>
        <div id="gws-forms" class="fab-mini" title="Google Forms"></div>
      </div>
    `;
    document.body.appendChild(cont);

    // Listeners
    document.getElementById('gdrive-fab').addEventListener('click', openDrivePanel);
    document.getElementById('gemini-fab').addEventListener('click', function(){
      window.open(GEMINI_URL, '_blank', 'noopener');
    });

    var gmail = document.getElementById('gmail-fab');
    if (gmail) {
      gmail.addEventListener('click', openGmailPanel);
    }

    var wsFab = document.getElementById('workspace-fab');
    var menu = document.getElementById('gws-menu');
    if (wsFab && menu) {
      wsFab.addEventListener('click', toggleGwsMenu);
      // Submenu items
      document.getElementById('gws-sheets').addEventListener('click', function(){ window.open(SHEETS_URL, '_blank', 'noopener'); closeGwsMenu(); });
      document.getElementById('gws-docs').addEventListener('click', function(){ window.open(DOCS_URL, '_blank', 'noopener'); closeGwsMenu(); });
      document.getElementById('gws-slides').addEventListener('click', function(){ window.open(SLIDES_URL, '_blank', 'noopener'); closeGwsMenu(); });
      document.getElementById('gws-forms').addEventListener('click', function(){ window.open(FORMS_URL, '_blank', 'noopener'); closeGwsMenu(); });
      // Close on outside click
      document.addEventListener('click', function(e){
        var target = e.target;
        if (!menu.classList.contains('open')) return;
        if (target.closest && (target.closest('#workspace-fab') || target.closest('#gws-menu'))) return;
        closeGwsMenu();
      });
    }
  }

  function openDrivePanel() {
    addCssOnce();
    if (document.getElementById('gdrive-panel')) { showPanel(); return; }

    var overlay = document.createElement('div');
    overlay.id = 'gdrive-panel';
    overlay.innerHTML = [
      '<div class="gd-inner" role="dialog" aria-modal="true" aria-label="Google Drive Search">',
      '  <input id="gd-input" type="text" placeholder="Search in Drive..." autocomplete="on" />',
      '  <div class="gd-actions">',
      '    <button id="gd-search">Search</button>',
      '    <button id="gd-close" class="gd-secondary">Close (Esc)</button>',
      '  </div>',
      '</div>'
    ].join('');
    document.body.appendChild(overlay);

    var input = document.getElementById('gd-input');
    var btnSearch = document.getElementById('gd-search');
    var btnClose = document.getElementById('gd-close');

    function submit() {
      var q = input.value.trim();
      if (!q) { input.focus(); return; }
      var url = SEARCH_URL + encodeURIComponent(q);
      window.open(url, '_blank', 'noopener');
      hidePanel();
    }
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') submit();
      if (e.key === 'Escape') hidePanel();
    });
    btnSearch.addEventListener('click', submit);
    btnClose.addEventListener('click', hidePanel);

    showPanel();
  }

  function showPanel() {
    var el = document.getElementById('gdrive-panel');
    if (!el) return;
    el.style.display = 'block';
    var input = document.getElementById('gd-input');
    if (input) { input.focus(); input.select(); }
    document.addEventListener('keydown', escToClose, { once: true });
  }
  function escToClose(e) { if (e.key === 'Escape') hidePanel(); }
  function hidePanel() { var el = document.getElementById('gdrive-panel'); if (el) el.style.display='none'; }

  function openGmailPanel() {
    addCssOnce();
    if (document.getElementById('gmail-panel')) { showGmailPanel(); return; }

    var overlay = document.createElement('div');
    overlay.id = 'gmail-panel';
    overlay.innerHTML = [
      '<div class="gd-inner" role="dialog" aria-modal="true" aria-label="Gmail Search">',
      '  <input id="gm-input" type="text" placeholder="Search in Gmail..." autocomplete="on" />',
      '  <div class="gd-actions">',
      '    <button id="gm-search">Search</button>',
      '    <button id="gm-close" class="gd-secondary">Close (Esc)</button>',
      '  </div>',
      '</div>'
    ].join('');
    document.body.appendChild(overlay);

    var input = document.getElementById('gm-input');
    var btnSearch = document.getElementById('gm-search');
    var btnClose = document.getElementById('gm-close');

    function submit() {
      var q = input.value.trim();
      if (!q) { input.focus(); return; }
      var url = GMAIL_SEARCH_URL + encodeURIComponent(q);
      window.open(url, '_blank', 'noopener');
      hideGmailPanel();
    }
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') submit();
      if (e.key === 'Escape') hideGmailPanel();
    });
    btnSearch.addEventListener('click', submit);
    btnClose.addEventListener('click', hideGmailPanel);

    showGmailPanel();
  }

  function showGmailPanel() {
    var el = document.getElementById('gmail-panel');
    if (!el) return;
    el.style.display = 'block';
    var input = document.getElementById('gm-input');
    if (input) { input.focus(); input.select(); }
    document.addEventListener('keydown', function esc(e){ if (e.key === 'Escape') hideGmailPanel(); }, { once: true });
  }
  function hideGmailPanel() { var el = document.getElementById('gmail-panel'); if (el) el.style.display='none'; }

  function toggleGwsMenu() {
    var menu = document.getElementById('gws-menu');
    var wsFab = document.getElementById('workspace-fab');
    if (!menu || !wsFab) return;
    var open = menu.classList.toggle('open');
    menu.setAttribute('aria-hidden', open ? 'false' : 'true');
    wsFab.classList.toggle('active', open);
  }

  function closeGwsMenu() {
    var menu = document.getElementById('gws-menu');
    var wsFab = document.getElementById('workspace-fab');
    if (!menu || !wsFab) return;
    menu.classList.remove('open');
    menu.setAttribute('aria-hidden', 'true');
    wsFab.classList.remove('active');
  }

  function init() {
    addCssOnce();
    ensureFabs();
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else { init(); }
  window.addEventListener('hashchange', init);
  document.addEventListener('espocrm:after-navigate', init);
})();

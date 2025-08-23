
(function () {
  var DRIVE_BASE = 'https://drive.google.com';
  var SEARCH_URL = DRIVE_BASE + '/drive/search?q=';
  var GEMINI_URL = 'https://gemini.google.com';

  function addCssOnce() {
    if (document.getElementById('fab-style')) return;
    var l = document.createElement('link');
    l.id = 'fab-style';
    l.rel = 'stylesheet';
    l.href = '/client/custom/fab.css?r=' + Date.now();
    document.head.appendChild(l);
  }

  function ensureFabs() {
    if (document.getElementById('fab-container')) return;

    var cont = document.createElement('div');
    cont.id = 'fab-container';
    cont.innerHTML = `
      <div id="gdrive-fab" class="fab-btn" title="Cerca in Google Drive"></div>
      <div id="gemini-fab" class="fab-btn" title="Apri Gemini AI"></div>
    `;
    document.body.appendChild(cont);

    // Listeners
    document.getElementById('gdrive-fab').addEventListener('click', openDrivePanel);
    document.getElementById('gemini-fab').addEventListener('click', function(){
      window.open(GEMINI_URL, '_blank', 'noopener');
    });
  }

  function openDrivePanel() {
    addCssOnce();
    if (document.getElementById('gdrive-panel')) { showPanel(); return; }

    var overlay = document.createElement('div');
    overlay.id = 'gdrive-panel';
    overlay.innerHTML = [
      '<div class="gd-inner" role="dialog" aria-modal="true" aria-label="Ricerca Google Drive">',
      '  <input id="gd-input" type="text" placeholder="Cerca in Drive..." autocomplete="on" />',
      '  <div class="gd-actions">',
      '    <button id="gd-search">Cerca</button>',
      '    <button id="gd-close" class="gd-secondary">Chiudi (Esc)</button>',
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

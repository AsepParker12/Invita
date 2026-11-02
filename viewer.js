/* Invita - penampil undangan publik (view.html dan file HTML mandiri) */
(function (g) {
  'use strict';
  const I = g.Invita;

  function showError(root, msg) {
    root.innerHTML = '<div style="height:100%;display:flex;align-items:center;justify-content:center;text-align:center;padding:30px;font:16px/1.6 system-ui,sans-serif;color:#444">' +
      '<div><h2 style="margin:0 0 8px">Undangan tidak bisa dibuka</h2><p style="margin:0">' + I.esc(msg) + '</p></div></div>';
  }

  async function boot() {
    const root = document.getElementById('root');
    const params = new URLSearchParams(location.hash.slice(1));
    const guest = params.get('to') || '';
    let inv = null;
    try {
      if (g.__INVITA_DATA__) inv = g.__INVITA_DATA__;
      else if (params.get('d') && I.share) inv = await I.share.decode(params.get('d'));
    } catch (e) { return showError(root, 'Data undangan rusak atau tautannya terpotong. Minta pengirim membagikan ulang tautannya.'); }
    if (!inv || !inv.data) return showError(root, 'Tautan ini tidak berisi data undangan.');

    const d = I.withDefaults(inv.data);
    const title = (d.title + ' ' + d.host).trim() || 'Undangan Digital';
    document.title = title;
    const meta = document.querySelector('meta[name=description]');
    if (meta) meta.content = 'Anda diundang: ' + title;

    const shareUrl = () => location.href.split('&to=')[0].replace(/#to=.*/, '');
    I.renderInvitation(root, { id: inv.id, data: d }, { mode: 'public', guest, getShareUrl: shareUrl });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
  g.addEventListener('hashchange', () => { if (!g.__INVITA_DATA__) location.reload(); });
})(window);

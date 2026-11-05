/* Invita - tautan statis (data undangan dikodekan di #hash) dan ekspor file HTML mandiri */
(function (g) {
  'use strict';
  const I = g.Invita;

  const b64u = bytes => {
    let s = '';
    for (let i = 0; i < bytes.length; i += 0x8000) s += String.fromCharCode.apply(null, bytes.subarray(i, i + 0x8000));
    return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  };
  const unb64u = str => {
    str = str.replace(/-/g, '+').replace(/_/g, '/');
    while (str.length % 4) str += '=';
    const bin = atob(str), a = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) a[i] = bin.charCodeAt(i);
    return a;
  };
  async function pipe(bytes, stream) {
    const w = stream.writable.getWriter(); w.write(bytes); w.close();
    return new Uint8Array(await new Response(stream.readable).arrayBuffer());
  }
  async function encode(obj) {
    const bytes = new TextEncoder().encode(JSON.stringify(obj));
    if (g.CompressionStream) return 'g.' + b64u(await pipe(bytes, new CompressionStream('gzip')));
    return 'p.' + b64u(bytes);
  }
  async function decode(s) {
    let bytes = unb64u(s.slice(2));
    if (s.slice(0, 2) === 'g.') bytes = await pipe(bytes, new DecompressionStream('gzip'));
    return JSON.parse(new TextDecoder().decode(bytes));
  }

  // Foto/musik hasil unggah (data:) terlalu besar untuk tautan, jadi dibuang dan dicatat jumlahnya
  function linkPayload(inv) {
    const d = JSON.parse(JSON.stringify(I.withDefaults(inv.data)));
    const dropped = [];
    if (d.cover.startsWith('data:')) { d.cover = ''; dropped.push('foto utama'); }
    const before = d.gallery.length;
    d.gallery = d.gallery.filter(u => !u.startsWith('data:'));
    if (before !== d.gallery.length) dropped.push((before - d.gallery.length) + ' foto galeri');
    if (Array.isArray(d.story)) { let n = 0; d.story = d.story.map(x => { if (x && typeof x.photo === 'string' && x.photo.startsWith('data:')) { n++; return Object.assign({}, x, { photo: '' }); } return x; }); if (n) dropped.push(n + ' foto cerita'); }
    if (d.music.src.startsWith('data:')) { d.music = { src: '', name: '' }; dropped.push('musik'); }
    return { payload: { v: 1, id: inv.id, data: d }, dropped };
  }

  const viewerBase = () => new URL('view.html', location.href).href;

  async function buildLink(inv, guest) {
    const lp = linkPayload(inv);
    const enc = await encode(lp.payload);
    const url = viewerBase() + '#d=' + enc + (guest ? '&to=' + encodeURIComponent(guest) : '');
    return { url, dropped: lp.dropped };
  }

  // File HTML tunggal berisi CSS, JS, dan seluruh data (termasuk foto) agar bisa diunggah ke hosting statis apa pun
  async function buildStandalone(inv) {
    const get = async p => { const r = await fetch(p, { cache: 'no-cache' }); if (!r.ok) throw new Error('Gagal memuat ' + p); return r.text(); };
    const [css, js1, js2] = await Promise.all([get('invitation.css'), get('invitation.js'), get('viewer.js')]);
    const d = I.withDefaults(inv.data);
    const json = JSON.stringify({ v: 1, id: inv.id, data: d }).replace(/</g, '\\u003c').split('\u2028').join('\\u2028').split('\u2029').join('\\u2029');
    const title = ((d.title + ' ' + d.host).trim() || 'Undangan Digital');
    const safeJs = s => s.replace(/<\/script/gi, '<\\/script');
    return '<!doctype html>\n<html lang="id"><head><meta charset="utf-8">' +
      '<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">' +
      '<title>' + I.esc(title) + '</title><meta name="description" content="' + I.esc('Anda diundang: ' + title) + '">' +
      '<meta property="og:title" content="' + I.esc(title) + '"><meta property="og:type" content="website">' +
      '<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>' +
      '<link href="https://fonts.googleapis.com/css2?family=Allura&family=Amiri:wght@400;700&family=Cinzel:wght@400;600&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=DM+Serif+Display&family=Dancing+Script:wght@500;700&family=Great+Vibes&family=Inter:wght@400;500;600;700&family=Jost:wght@400;500;600&family=Lora:ital,wght@0,400;0,600;1,400&family=Montserrat:wght@400;500;600&family=Parisienne&family=Pinyon+Script&family=Playfair+Display:wght@400;600&family=Poppins:wght@400;500;600&display=swap" rel="stylesheet">' +
      '<style>html,body{margin:0;height:100%;background:#1a1a1a}#root{height:100vh;height:100dvh;max-width:480px;margin:0 auto;background:#fff}</style>' +
      '<style>' + css + '</style></head><body><div id="root"></div>' +
      '<script src="https://cdnjs.cloudflare.com/ajax/libs/qrcode-generator/1.4.4/qrcode.min.js"><\/script>' +
      '<script>window.__INVITA_DATA__=' + json + ';<\/script>' +
      '<script>' + safeJs(js1) + '<\/script><script>' + safeJs(js2) + '<\/script></body></html>';
  }

  I.share = { encode, decode, buildLink, buildStandalone, linkPayload, viewerBase };
})(window);

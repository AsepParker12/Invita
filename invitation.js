/* Invita - mesin render undangan (dipakai editor, penampil publik, dan file mandiri) */
(function (g) {
  'use strict';
  const Invita = g.Invita = g.Invita || {};

  const FONTS = {
    romantic: { label: 'Romantis (Allura)', head: "'Allura',cursive", body: "'Cormorant Garamond',serif" },
    signature:{ label: 'Tanda tangan (Pinyon Script)', head: "'Pinyon Script',cursive", body: "'Lora',serif" },
    parisienne:{ label: 'Manis (Parisienne)', head: "'Parisienne',cursive", body: "'Jost',sans-serif" },
    elegant:  { label: 'Elegan (Playfair Display)', head: "'Playfair Display',serif", body: "'Lora',serif" },
    script:   { label: 'Kaligrafi (Great Vibes)', head: "'Great Vibes',cursive", body: "'Cormorant Garamond',serif" },
    classic:  { label: 'Klasik (Cinzel)', head: "'Cinzel',serif", body: "'Cormorant Garamond',serif" },
    luxe:     { label: 'Mewah (Cormorant)', head: "'Cormorant Garamond',serif", body: "'Jost',sans-serif" },
    modern:   { label: 'Modern (Poppins)', head: "'Poppins',sans-serif", body: "'Poppins',sans-serif" },
    clean:    { label: 'Bersih (Montserrat)', head: "'Montserrat',sans-serif", body: "'Inter',sans-serif" },
    playful:  { label: 'Ceria (Dancing Script)', head: "'Dancing Script',cursive", body: "'Poppins',sans-serif" },
    editorial:{ label: 'Editorial (DM Serif Display)', head: "'DM Serif Display',serif", body: "'Inter',sans-serif" }
  };

  const STYLES = ['frame', 'arch', 'modern', 'minimal', 'bold', 'soft'];
  const POS = { center: 'center', top: 'center 15%', bottom: 'center 85%' };
  const FLOWS = ['scroll', 'tap'];
  const ANIMS = ['rise', 'slide', 'zoom', 'fade'];
  const svgUri = x => 'url("data:image/svg+xml,' + encodeURIComponent(x) + '")';
  const SV = (vb, inner) => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + vb + ' ' + vb + '">' + inner + '</svg>';
  const PATS = {
    none: null,
    star: { sz: 56, svg: SV(56, '<g fill="none" stroke="#000" stroke-width="1.4"><rect x="13" y="13" width="30" height="30"/><rect x="13" y="13" width="30" height="30" transform="rotate(45 28 28)"/><circle cx="28" cy="28" r="4"/></g>') },
    confetti: { sz: 90, svg: SV(90, '<g fill="#000"><circle cx="12" cy="14" r="3"/><rect x="48" y="10" width="7" height="7" transform="rotate(25 51 13)"/><path d="M75 40l5 9H70z"/><circle cx="30" cy="52" r="2.5"/><rect x="60" y="70" width="6" height="6" transform="rotate(-20 63 73)"/><circle cx="14" cy="78" r="2"/><path d="M40 82l4 7h-8z"/></g>') },
    dots: { sz: 26, svg: SV(26, '<circle cx="13" cy="13" r="1.8" fill="#000"/>') },
    lines: { sz: 22, svg: SV(22, '<path d="M0 22L22 0M-4 4L4-4M18 26l8-8" stroke="#000" stroke-width="1.1"/>') },
    sparkle: { sz: 64, svg: SV(64, '<g fill="#000"><path d="M16 8c1 6 3 8 9 9-6 1-8 3-9 9-1-6-3-8-9-9 6-1 8-3 9-9z"/><path d="M46 38c.8 4.5 2.5 6 7 7-4.5.8-6.2 2.5-7 7-.8-4.5-2.5-6.2-7-7 4.5-1 6.2-2.5 7-7z"/></g>') },
    leaf: { sz: 64, svg: SV(64, '<g fill="#000"><path d="M12 34c0-11 8-18 18-18 0 11-7 20-18 18z"/><path d="M42 60c0-7 5-11 11-11 0 7-4 12-11 11z"/><path d="M44 18c0-6 4-9 9-9 0 6-3 10-9 9z"/></g>') }
  };
  const BASE_THEME = { primary: '#b76e79', accent: '#c9a227', bg: '#fff8f5', text: '#4a3436', soft: '#f6e3df' };

  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const isColor = c => /^#[0-9a-f]{3,8}$/i.test(c || '');
  function safeUrl(u, o) {
    u = String(u || '').trim();
    if (/^https?:\/\//i.test(u)) return u;
    if (!(o && o.noData) && /^data:(image|audio)\//i.test(u)) return u;
    return '';
  }
  function normPhone(p) {
    let n = String(p || '').replace(/[^\d]/g, '');
    if (n.startsWith('0')) n = '62' + n.slice(1);
    return n;
  }

  function baseData() {
    return {
      title: '', host: '', opening: '', description: '',
      date: '', start: '', end: '', tz: 'WIB',
      venue: '', address: '', mapsLink: '',
      cover: '', gallery: [], music: { src: '', name: '' }, wa: '',
      theme: Object.assign({}, BASE_THEME), font: 'elegant', style: 'frame', kicker: 'Undangan',
      closing: '', art: 'lainnya', bism: false, flow: 'scroll', anim: 'rise', pat: 'none', flora: false, coverPos: 'center',
      features: { countdown: true, rsvp: true, guestbook: true, qr: true, share: true, calendar: true }
    };
  }
  function withDefaults(d) {
    d = d || {};
    const b = baseData();
    const o = Object.assign(b, d);
    o.theme = Object.assign({}, BASE_THEME, d.theme || {});
    Object.keys(BASE_THEME).forEach(k => { if (!isColor(o.theme[k])) o.theme[k] = BASE_THEME[k]; });
    o.features = Object.assign({ countdown: true, rsvp: true, guestbook: true, qr: true, share: true, calendar: true }, d.features || {});
    o.music = Object.assign({ src: '', name: '' }, d.music || {});
    o.music.src = safeUrl(o.music.src);
    o.music.name = String(o.music.name || '');
    o.gallery = Array.isArray(d.gallery) ? d.gallery.map(u => safeUrl(u)).filter(Boolean).slice(0, 12) : [];
    o.cover = safeUrl(o.cover);
    if (!FONTS[o.font]) o.font = 'elegant';
    if (!STYLES.includes(o.style)) o.style = 'frame';
    if (!['WIB', 'WITA', 'WIT'].includes(o.tz)) o.tz = 'WIB';
    if (!FLOWS.includes(o.flow)) o.flow = 'scroll';
    if (!ANIMS.includes(o.anim)) o.anim = 'rise';
    if (!PATS[o.pat]) o.pat = 'none';
    if (!POS[o.coverPos]) o.coverPos = 'center';
    o.flora = !!o.flora;
    o.bism = !!o.bism;
    if (!ART[o.art]) o.art = 'lainnya';
    // Perjalanan Kami: disimpan sebagai data.story. Format lama (penanda di dalam deskripsi) dimigrasi dan dibersihkan
    let st = Array.isArray(d.story) ? d.story : null;
    const mk = String(o.description == null ? '' : o.description).match(/\[\[INVITA_STORY:([^\]]*)\]\]/);
    if (!st && mk) { try { st = JSON.parse(decodeURIComponent(escape(atob(mk[1])))); } catch (e) { st = null; } }
    o.description = String(o.description == null ? '' : o.description).replace(/\s*\[\[INVITA_STORY:[^\]]*(?:\]\])?/g, '').trim();
    const cut = (v, n) => String(v == null ? '' : v).slice(0, n);
    o.story = (Array.isArray(st) ? st : []).slice(0, 8).map(x => x && typeof x === 'object' ? { date: cut(x.date, 40), title: cut(x.title, 80), text: cut(x.text, 400), photo: safeUrl(x.photo) } : null)
      .filter(x => x && (x.date || x.title || x.text || x.photo));
    // gaya gerak dan tampilan per template (bisa dari data.mo, cadangannya dihitung dari gaya undangan)
    const MR = { sk: 7, hv: 8, fx: 12, op: 8, lt: 5, bd: 4, au: 4 };
    const hs = [o.style, o.font, o.pat, o.anim, o.art, o.flow].join('|'); let hh = 0;
    for (let i = 0; i < hs.length; i++) hh = (hh * 31 + hs.charCodeAt(i)) >>> 0;
    const m0 = d.mo && typeof d.mo === 'object' ? d.mo : {}; o.mo = {}; let kk = 3;
    Object.keys(MR).forEach(key => { const v = parseInt(m0[key], 10); o.mo[key] = v >= 0 && v < MR[key] ? v : ((hh >>> 3) * (kk++) + kk) % MR[key]; });
    ['title', 'host', 'opening', 'description', 'date', 'start', 'end', 'venue', 'address', 'mapsLink', 'wa', 'kicker', 'closing']
      .forEach(k => { o[k] = String(o[k] == null ? '' : o[k]).slice(0, 4000); });
    return o;
  }

  function parseDate(d, t) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(d || '')) return null;
    const p = d.split('-').map(Number);
    const tm = /^\d{2}:\d{2}$/.test(t || '') ? t : '00:00';
    const q = tm.split(':').map(Number);
    const x = new Date(p[0], p[1] - 1, p[2], q[0], q[1]);
    return isNaN(x) ? null : x;
  }
  function dateLong(d) {
    const x = parseDate(d);
    return x ? x.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) : '';
  }

  function mapUrls(d) {
    const link = safeUrl(d.mapsLink, { noData: true });
    let q = '', coords = '';
    if (link) {
      const m = link.match(/@(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?)/) ||
        link.match(/[?&](?:q|query|destination|ll)=(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?)/);
      if (m) coords = m[1] + ',' + m[2];
      else {
        const mq = link.match(/[?&](?:q|query)=([^&]+)/) || link.match(/\/place\/([^/@?]+)/);
        if (mq) { try { q = decodeURIComponent(mq[1].replace(/\+/g, ' ')); } catch (e) { /* abaikan */ } }
      }
    }
    const addr = [d.venue, d.address].filter(Boolean).join(', ');
    const target = coords || q || addr;
    const enc = encodeURIComponent(target);
    return {
      hasTarget: !!target,
      embed: target ? 'https://www.google.com/maps?q=' + enc + '&output=embed' : '',
      view: link || (target ? 'https://www.google.com/maps/search/?api=1&query=' + enc : ''),
      dir: target ? 'https://www.google.com/maps/dir/?api=1&destination=' + enc : link
    };
  }

  function qrSvg(text, px) {
    if (!g.qrcode) throw new Error('Pustaka QR belum termuat. Periksa internet lalu muat ulang halaman.');
    let qr;
    try { qr = g.qrcode(0, 'L'); qr.addData(String(text), 'Byte'); qr.make(); }
    catch (e) { throw new Error('Tautan terlalu panjang untuk dijadikan QR Code. Unggah file HTML undangan, lalu buat QR dari tautan publiknya.'); }
    const n = qr.getModuleCount(), m = 2, s = n + m * 2;
    let path = '';
    for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) if (qr.isDark(r, c)) path += 'M' + (c + m) + ' ' + (r + m) + 'h1v1h-1z';
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + s + ' ' + s + '"' + (px ? ' width="' + px + '" height="' + px + '"' : '') +
      ' shape-rendering="crispEdges"><rect width="' + s + '" height="' + s + '" fill="#fff"/><path d="' + path + '" fill="#000"/></svg>';
  }

  const ICON = {
    cal: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="3"/><path d="M8 3v4M16 3v4M3 10h18"/></svg>',
    clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
    pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.800 12 21 12 21z"/><circle cx="12" cy="9.500" r="2.500"/></svg>',
    music: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V6l11-2v12"/><circle cx="6.500" cy="18" r="2.500"/><circle cx="17.500" cy="16" r="2.500"/></svg>',
    route: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11l18-8-8 18-2-8z"/></svg>',
    close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>'
  };
  const ORN = {
    corner: '<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="1.3"><path d="M4 96V34C4 17 17 4 34 4h62"/><path d="M14 96V44c0-16 14-30 30-30h52" opacity=".45"/><circle cx="34" cy="34" r="3.500" fill="currentColor" stroke="none"/></svg>',
    divider: '<svg viewBox="0 0 200 20" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M0 10h82M118 10h82"/><path d="M100 3l7 7-7 7-7-7z" fill="currentColor" stroke="none"/><circle cx="88" cy="10" r="1.500" fill="currentColor" stroke="none"/><circle cx="112" cy="10" r="1.500" fill="currentColor" stroke="none"/></svg>',
    glyph: '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><circle cx="32" cy="32" r="22" opacity=".4"/><path d="M32 14c4 8 12 10 18 18-8 4-10 12-18 18-4-8-12-10-18-18 8-4 10-12 18-18z"/></svg>'
  };

  const leaf = (x, y, r, k) => '<path d="M0 0C6-10 18-12 26-8 22 2 10 8 0 0z" transform="translate(' + x + ' ' + y + ') rotate(' + r + ') scale(' + k + ')"/>';
  const bloom = (x, y, r, o) => '<g transform="translate(' + x + ' ' + y + ')" opacity="' + (o || .9) + '">' +
    [0, 60, 120, 180, 240, 300].map(k => '<ellipse cx="0" cy="' + (-r * .62) + '" rx="' + (r * .34) + '" ry="' + (r * .62) + '" transform="rotate(' + k + ')"/>').join('') +
    '<circle r="' + (r * .26) + '" fill="var(--bg)" opacity=".85"/></g>';
  ORN.branch = '<svg viewBox="0 0 160 160" fill="currentColor"><path d="M8 152C48 128 96 84 150 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>' +
    [[30, 138, -95, 1], [30, 138, 5, .9], [52, 120, -95, 1], [52, 120, 0, 1], [74, 100, -100, 1.05], [74, 100, -5, 1], [96, 78, -100, 1], [96, 78, -5, .95], [118, 52, -105, .9], [118, 52, -10, .85], [138, 28, -110, .7], [150, 12, -60, .7]]
      .map(a => leaf(a[0], a[1], a[2], a[3])).join('') + bloom(26, 134, 15, .85) + bloom(68, 96, 11, .8) + bloom(112, 54, 9, .75) + '</svg>';
  const ST = 'fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"';
  const mk = x => '<svg viewBox="0 0 64 64" ' + ST + '>' + x + '</svg>';
  const ART = {
    wedding: mk('<circle cx="24" cy="38" r="13"/><circle cx="40" cy="38" r="13"/><path d="M32 8l5 6-5 6-5-6z"/><path d="M14 18c-5 3-7 8-6 13M50 18c5 3 7 8 6 13" opacity=".6"/>'),
    birthday: mk('<ellipse cx="22" cy="24" rx="10" ry="12"/><ellipse cx="42" cy="21" rx="10" ry="12"/><path d="M22 36c-2 8 3 14 10 22M42 33c2 9-3 15-10 25"/><path d="M20 12c2-1 4-1 5 1"/>'),
    aqiqah: mk('<path d="M38 10a22 22 0 1 0 14 32A18 18 0 0 1 38 10z"/><path d="M48 14l2 5 5 .5-4 3.5 1.2 5-4.2-2.8-4.2 2.8 1.2-5-4-3.5 5-.5z"/>'),
    khitanan: mk('<path d="M38 10a22 22 0 1 0 14 32A18 18 0 0 1 38 10z"/><path d="M48 14l2 5 5 .5-4 3.5 1.2 5-4.2-2.8-4.2 2.8 1.2-5-4-3.5 5-.5z"/>'),
    wisuda: mk('<path d="M32 14L7 27l25 13 25-13z"/><path d="M17 34v11c0 5 30 5 30 0V34"/><path d="M57 27v15M55 45l2 4 2-4"/>'),
    keluarga: mk('<path d="M8 32L32 11l24 21M15 27v26h34V27"/><path d="M32 47c-9-5-9-12-3.500-12 2 0 3 1 3.500 2 .5-1 1.500-2 3.500-2 5.500 0 5.500 7-3.500 12z"/>'),
    pengajian: mk('<path d="M9 54h46M13 54V38h38v16"/><path d="M19 38c0-9 6-14 13-14s13 5 13 14"/><path d="M32 24v-9M29.500 15h5M9 54V30M55 54V30M6 30h6M52 30h6"/>'),
    reuni: mk('<circle cx="17" cy="24" r="6"/><circle cx="32" cy="20" r="6.500"/><circle cx="47" cy="24" r="6"/><path d="M6 50c0-8 5-12 11-12s11 4 11 12M20 50c0-9 5-14 12-14s12 5 12 14M36 50c0-8 5-12 11-12s11 4 11 12"/>'),
    resmi: mk('<circle cx="32" cy="32" r="22"/><circle cx="32" cy="32" r="16" opacity=".6"/><path d="M32 20l3.500 8 8.500.7-6.500 5.600 2 8.500-7.500-4.500-7.500 4.500 2-8.500-6.500-5.600 8.500-.7z"/>'),
    rapat: mk('<path d="M9 14h46v28H9zM32 42v10M22 52h20"/><path d="M17 24h30M17 31h18"/>'),
    opening: mk('<circle cx="32" cy="32" r="6"/><path d="M32 6v11M32 47v11M6 32h11M47 32h11M14 14l8 8M42 42l8 8M50 14l-8 8M22 42l-8 8"/>'),
    lainnya: mk('<path d="M32 8c2 12 8 18 20 24-12 6-18 12-20 24-2-12-8-18-20-24 12-6 18-12 20-24z"/><circle cx="32" cy="32" r="3.500"/>')
  };
  const initials = h => {
    const pm = String(h || '').split(/\s+(?:&|dan|and)\s+/i).map(x => x.trim()).filter(Boolean);
    const ch = w => (w.match(/[A-Za-z0-9]/) || [''])[0].toUpperCase();
    if (pm.length >= 2) return ch(pm[0]) + '<i>&amp;</i>' + ch(pm[1]);
    const w = String(h || '').trim().split(/\s+/).filter(Boolean).slice(0, 2);
    return w.map(ch).join('');
  };
  const BISM = 'بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ';
  const nl = s => esc(s).replace(/\n/g, '<br>');

  function renderInvitation(root, inv, opts) {
    opts = opts || {};
    const mode = opts.mode || 'public'; // public | preview | mini | static
    const d = withDefaults(inv.data);
    const full = mode === 'public' || mode === 'preview';
    const ph = mode !== 'public';
    const font = FONTS[d.font];
    const cleanups = [];
    const guest = String(opts.guest || '').trim();
    const mu = mapUrls(d);
    const waNum = normPhone(d.wa);
    const rsvpOn = !!(d.features.rsvp && waNum);
    const gbOn = !!d.features.guestbook;
    const target = parseDate(d.date, d.start);
    const dateL = dateLong(d.date);
    const timeL = d.start ? d.start + (d.end ? ' - ' + d.end : '') + ' ' + d.tz : '';
    const P = (v, p) => v ? esc(v) : (ph ? '<span class="ph">' + esc(p) + '</span>' : '');
    const T = (v, p) => v ? nl(v) : (ph ? '<span class="ph">' + esc(p) + '</span>' : '');
    const showCover = full && opts.cover !== false;
    const tap = full && d.flow === 'tap';
    const RV = tap ? '' : ' reveal';
    let tapGo = null, tapIdx = () => 0;
    const sc = (n, t) => (n <= t[0] ? 1 : n <= t[1] ? 0.82 : n <= t[2] ? 0.66 : 0.54);
    const pm = d.host.split(/\s+(?:&|dan|and)\s+/i);
    const parts = pm.length === 2 && pm[0].trim() && pm[1].trim() ? [pm[0].trim(), pm[1].trim()] : null;
    const stacked = !!parts && d.host.length > 14;
    const hk = stacked ? sc(Math.max(parts[0].length, parts[1].length), [12, 18, 26]) : sc(d.host.length, [12, 20, 30]);
    const tk = d.title.length <= 18 ? 1 : d.title.length <= 28 ? 0.85 : 0.7;
    const hostH = !d.host ? P(d.host, 'Nama penyelenggara')
      : stacked ? '<span class="n">' + esc(parts[0]) + '</span><span class="amp">&amp;</span><span class="n">' + esc(parts[1]) + '</span>' : esc(d.host);
    const ini = initials(d.host);
    const sealHtml = ini ? '<div class="seal"><span>' + ini + '</span></div>' : '';
    const floraHtml = d.flora ? ['a', 'b', 'c', 'd'].map(k => '<div class="flora fl-' + k + '">' + ORN.branch + '</div>').join('') : '';
    const notify = opts.notify || (m => inote(m));

    const wrap = document.createElement('div');
    wrap.className = 'inv-wrap m-' + mode + (tap ? ' flow-tap' : '') + (showCover ? '' : ' opened nocover');
    wrap.dataset.style = d.style;
    wrap.dataset.anim = d.anim;
    wrap.dataset.pat = d.pat;
    wrap.dataset.flora = d.flora ? '1' : '0';
    Object.keys(d.mo).forEach(k => { wrap.dataset[k === 'sk' ? 'sk' : k] = d.mo[k]; });
    wrap.style.setProperty('--p', d.theme.primary);
    wrap.style.setProperty('--a', d.theme.accent);
    wrap.style.setProperty('--bg', d.theme.bg);
    wrap.style.setProperty('--t', d.theme.text);
    wrap.style.setProperty('--soft', d.theme.soft);
    wrap.style.setProperty('--fh', font.head);
    wrap.style.setProperty('--fb', font.body);
    wrap.style.setProperty('--hk', hk);
    wrap.style.setProperty('--tk', tk);
    if (PATS[d.pat]) { wrap.style.setProperty('--pat', svgUri(PATS[d.pat].svg)); wrap.style.setProperty('--patsz', PATS[d.pat].sz + 'px'); }

    const corners = ['tl', 'tr', 'bl', 'br'].map(c => '<div class="orn orn-' + c + '">' + ORN.corner + '</div>').join('');
    let h = '<div class="inv">';
    // Hero
    h += '<section class="hero' + (d.cover ? ' has-cover' : '') + '"><div class="hero-bg"></div><div class="hero-pat"></div>' + floraHtml + '<div class="hero-in">' + corners +
      '<p class="kicker">' + esc(d.kicker) + '</p>' +
      '<div class="hero-art">' + ART[d.art] + '</div><div class="hero-photo"><span>' + ART[d.art] + '</span></div>' +
      '<h1 class="h-title">' + P(d.title, 'Judul undangan') + '</h1>' +
      '<h2 class="h-host">' + hostH + '</h2>' +
      '<p class="h-date">' + P(dateL, 'Tanggal acara') + '</p>' +
      (full ? '<div class="scroll-hint"><span>' + (tap ? 'Ketuk untuk lanjut' : 'Gulir ke bawah') + '</span><i></i></div>' : '') + '</div></section>';

    if (mode !== 'mini') {
      if (d.opening || d.description || ph) {
        h += '<section class="sec'+RV+'"><div class="divd">' + ORN.divider + '</div>' +
          (d.bism ? '<p class="bism" lang="ar" dir="rtl">' + BISM + '</p>' : '') + '<p class="open">' + T(d.opening, 'Kalimat pembuka undangan') + '</p>' +
          '<p class="desc">' + T(d.description, 'Deskripsi atau isi undangan') + '</p></section>';
      }
      if (d.story.length) {
        h += '<section class="sec jr' + RV + '"><p class="eyebrow">Perjalanan Kami</p><h3>Bab yang membawa kami ke hari ini</h3><div class="jr-list">' +
          d.story.map((x, i) => '<article class="jr-i" style="--i:' + i + '">' +
            (x.photo ? '<figure><img loading="lazy" alt="' + esc(x.title || 'Momen kami') + '" src="' + esc(x.photo) + '"></figure>' : '<figure class="empty"><span>&#10022;</span></figure>') +
            '<div class="jr-t"><time>' + esc(x.date) + '</time><h4>' + esc(x.title || 'Momen Kami') + '</h4><p>' + nl(x.text) + '</p></div></article>').join('') + '</div></section>';
      }
      h += '<section class="sec alt'+RV+'"><p class="eyebrow">Waktu &amp; Tempat</p><h3>Informasi Acara</h3><div class="ev-grid">' +
        '<div class="ev-card">' + ICON.cal + '<h4>Tanggal</h4><p>' + P(dateL, 'Tanggal acara') + '</p></div>' +
        '<div class="ev-card">' + ICON.clock + '<h4>Waktu</h4><p>' + P(timeL, 'Jam acara') + '</p></div>' +
        '<div class="ev-card wide">' + ICON.pin + '<h4>Lokasi</h4><p><strong>' + P(d.venue, 'Nama tempat') + '</strong>' +
        (d.address || ph ? '<br>' + T(d.address, 'Alamat lengkap') : '') + '</p></div></div>' +
        (full && d.features.calendar && target ? '<button class="ibtn ghost" data-a="ics">Simpan ke Kalender</button>' : '') + '</section>';

      if (full && d.features.countdown) {
        h += '<section class="sec'+RV+'"><p class="eyebrow">Menuju Hari Acara</p><h3>Hitung Mundur</h3>' +
          (target ? '<div class="cd"><div class="cd-box"><b data-cd="d">0</b><small>Hari</small></div><div class="cd-box"><b data-cd="h">0</b><small>Jam</small></div><div class="cd-box"><b data-cd="m">0</b><small>Menit</small></div><div class="cd-box"><b data-cd="s">0</b><small>Detik</small></div></div>'
            : (ph ? '<p class="ph">Isi tanggal acara untuk menampilkan hitung mundur.</p>' : '')) + '</section>';
      }
      if (full && (mu.hasTarget || mu.view || ph)) {
        h += '<section class="sec alt'+RV+'"><p class="eyebrow">Peta</p><h3>Lokasi Acara</h3>' +
          (mu.embed ? '<div class="map"><iframe loading="lazy" title="Peta lokasi acara" referrerpolicy="no-referrer-when-downgrade" src="' + esc(mu.embed) + '"></iframe></div>'
            : (ph ? '<p class="ph">Isi nama tempat, alamat, atau link Google Maps agar peta tampil.</p>' : '')) +
          ((mu.view || mu.dir) ? '<div class="btn-row">' +
            (mu.view ? '<a class="ibtn" target="_blank" rel="noopener" href="' + esc(mu.view) + '">' + ICON.pin + 'Lihat Lokasi</a>' : '') +
            (mu.dir ? '<a class="ibtn ghost" target="_blank" rel="noopener" href="' + esc(mu.dir) + '">' + ICON.route + 'Buka Petunjuk Arah</a>' : '') + '</div>' : '') + '</section>';
      }
      if (d.gallery.length) {
        h += '<section class="sec'+RV+'"><p class="eyebrow">Momen</p><h3>Galeri Foto</h3><div class="gal">' +
          d.gallery.map((u, i) => '<button class="g-item" data-i="' + i + '" aria-label="Perbesar foto ' + (i + 1) + '"><img loading="lazy" alt="Foto galeri ' + (i + 1) + '" src="' + esc(u) + '"></button>').join('') + '</div></section>';
      }
      if (full && (rsvpOn || gbOn || (ph && d.features.rsvp))) {
        h += '<section class="sec alt'+RV+'" id="sec-rsvp"><p class="eyebrow">' + (rsvpOn ? 'RSVP' : 'Buku Tamu') + '</p><h3>' + (rsvpOn ? 'Konfirmasi Kehadiran' : 'Ucapan &amp; Doa') + '</h3>';
        if (d.features.rsvp && !waNum && ph) h += '<p class="ph">RSVP butuh nomor WhatsApp penyelenggara. Isi di editor agar konfirmasi tamu sampai ke Anda.</p>';
        if (rsvpOn || gbOn) {
          h += '<form class="rsvp" novalidate><label class="ifield"><span>Nama</span><input name="name" maxlength="60" autocomplete="name" value="' + esc(guest) + '" placeholder="Nama Anda"></label>' +
            (rsvpOn ? '<label class="ifield"><span>Kehadiran</span><select name="att"><option>Hadir</option><option>Tidak hadir</option><option>Masih ragu</option></select></label>' +
              '<label class="ifield"><span>Jumlah orang</span><input name="count" type="number" min="1" max="20" value="1"></label>' : '') +
            '<label class="ifield"><span>Ucapan' + (rsvpOn ? ' (opsional)' : '') + '</span><textarea name="msg" rows="3" maxlength="400" placeholder="Tulis ucapan dan doa"></textarea></label>' +
            '<p class="ierr" hidden></p><button class="ibtn" type="submit">' + (rsvpOn ? 'Kirim lewat WhatsApp' : 'Kirim Ucapan') + '</button>' +
            '<p class="note">' + (rsvpOn ? 'Konfirmasi dikirim ke penyelenggara lewat WhatsApp. ' : '') + (gbOn ? 'Ucapan di buku tamu hanya tersimpan di perangkat ini.' : '') + '</p></form>';
        }
        if (gbOn) h += '<div class="gb-list"></div>';
        h += '</section>';
      }
      const shareOn = full && (d.features.share || d.features.qr);
      if (d.closing || shareOn || ph) {
        h += '<section class="sec' + RV + '" id="sec-share">' +
          ((d.closing || ph) ? '<div class="divd">' + ORN.divider + '</div><p class="closing">' + T(d.closing, 'Kalimat penutup') + '</p>' + (d.host ? '<p class="sign">' + esc(d.host) + '</p>' : '') : '') +
          (shareOn ? '<p class="eyebrow" style="margin-top:34px">Bagikan</p><h3>Sebarkan Undangan</h3>' +
            (d.features.share ? '<div class="btn-row"><button class="ibtn" data-a="share">Bagikan</button><button class="ibtn ghost" data-a="copy">Salin Tautan</button></div>' : '') +
            (d.features.qr ? '<div class="qr-box"></div><p class="note">Pindai untuk membuka undangan</p>' : '') : '') +
          (tap ? '<p class="credit">Dibuat dengan Invita</p>' : '') + '</section>';
      }
      if (!tap) h += '<footer class="foot">Dibuat dengan Invita</footer>';
    }
    h += '</div>';
    if (tap) h += '<div class="tap-ui"><div class="segs"></div><button class="tp-btn tp-prev" data-a="prev" aria-label="Halaman sebelumnya"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg></button><button class="tp-btn tp-next" data-a="next" aria-label="Halaman berikutnya"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M9 5l7 7-7 7"/></svg></button></div>';

    if (showCover) {
      h += '<div class="cover"><div class="cover-bg"></div><div class="cover-in">' + sealHtml + '<p class="kicker">' + esc(d.kicker) + '</p>' +
        '<h1>' + P(d.title, 'Judul undangan') + '</h1><h2>' + hostH + '</h2>' +
        '<div class="cover-guest"><small>Kepada Yth.</small><strong>' + (guest ? esc(guest) : 'Tamu Undangan') + '</strong></div>' +
        '<button class="ibtn open-btn" data-a="open">Buka Undangan</button></div></div>';
    }
    if (full && d.music.src) h += '<button class="inv-music" aria-label="Putar atau jeda musik" data-a="music">' + ICON.music + '</button>';
    if (d.gallery.length && full) h += '<div class="lightbox" hidden><button class="lb-x" aria-label="Tutup">' + ICON.close + '</button><img alt=""></div>';
    h += '<div class="itoast" hidden></div>';
    wrap.innerHTML = h;

    function inote(m) {
      const t = wrap.querySelector('.itoast');
      if (!t) return;
      t.textContent = m; t.hidden = false;
      clearTimeout(inote.t); inote.t = setTimeout(() => { t.hidden = true; }, 2600);
    }
    // gambar latar lewat JS agar aman
    const heroBg = wrap.querySelector('.hero-bg'), heroPhoto = wrap.querySelector('.hero-photo'), coverBg = wrap.querySelector('.cover-bg');
    if (d.cover) {
      const u = 'url(' + JSON.stringify(d.cover) + ')';
      const pos = POS[d.coverPos];
      heroBg.style.backgroundImage = u; heroPhoto.style.backgroundImage = u;
      heroBg.style.backgroundPosition = pos; heroPhoto.style.backgroundPosition = pos;
      if (coverBg) { coverBg.style.backgroundImage = u; coverBg.style.backgroundPosition = pos; }
    }
    root.innerHTML = '';
    root.appendChild(wrap);
    const scroller = wrap.querySelector('.inv');

    // reveal
    const reveals = wrap.querySelectorAll('.reveal');
    if (!full || tap || !('IntersectionObserver' in g)) reveals.forEach(r => r.classList.add('in'));
    else {
      const io = new IntersectionObserver(es => es.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); if (e.target.id === 'sec-share') loadQr(); }
      }), { root: scroller, threshold: 0.12 });
      reveals.forEach(r => io.observe(r));
      cleanups.push(() => io.disconnect());
    }

    // mode ketuk: pindah halaman dengan ketuk, geser, atau tombol
    if (tap) {
      const pages = [...scroller.children].filter(c => c.tagName === 'SECTION');
      const segs = wrap.querySelector('.segs');
      segs.innerHTML = pages.map(() => '<i></i>').join('');
      let idx = 0;
      tapIdx = () => idx;
      tapGo = n => {
        idx = Math.max(0, Math.min(pages.length - 1, n));
        pages.forEach((pg, i) => { pg.classList.toggle('on', i === idx); pg.classList.toggle('past', i < idx); if (i === idx) pg.scrollTop = 0; });
        [...segs.children].forEach((x, i) => x.classList.toggle('on', i <= idx));
        wrap.classList.toggle('at-end', idx === pages.length - 1);
        wrap.classList.toggle('at-start', idx === 0);
        if (pages[idx].id === 'sec-share') loadQr();
      };
      tapGo(Math.min(opts.page || 0, pages.length - 1));
      scroller.addEventListener('click', e => {
        if (e.target.closest('a,button,input,select,textarea,label,iframe,form,.map,.qr-box,.gb-list')) return;
        const r = scroller.getBoundingClientRect();
        tapGo(e.clientX - r.left < r.width * 0.3 ? idx - 1 : idx + 1);
      });
      let sx = 0, sy = 0;
      scroller.addEventListener('touchstart', e => { sx = e.touches[0].clientX; sy = e.touches[0].clientY; }, { passive: true });
      scroller.addEventListener('touchend', e => {
        const dx = e.changedTouches[0].clientX - sx, dy = e.changedTouches[0].clientY - sy;
        if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) tapGo(dx < 0 ? idx + 1 : idx - 1);
      }, { passive: true });
      if (mode === 'public') {
        const key = e => { if (e.key === 'ArrowRight' || e.key === 'ArrowDown') tapGo(idx + 1); else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') tapGo(idx - 1); };
        document.addEventListener('keydown', key);
        cleanups.push(() => document.removeEventListener('keydown', key));
      }
    }

    // countdown
    if (full && target) {
      const els = {}; wrap.querySelectorAll('[data-cd]').forEach(e => { els[e.dataset.cd] = e; });
      if (els.d) {
        const tick = () => {
          const s = Math.floor((target - Date.now()) / 1000);
          if (s <= 0) { const box = wrap.querySelector('.cd'); if (box) box.innerHTML = '<p class="cd-done">Acara sudah dimulai atau telah berlangsung.</p>'; clearInterval(iv); return; }
          els.d.textContent = Math.floor(s / 86400); els.h.textContent = Math.floor(s % 86400 / 3600);
          els.m.textContent = Math.floor(s % 3600 / 60); els.s.textContent = s % 60;
        };
        const iv = setInterval(tick, 1000); tick();
        cleanups.push(() => clearInterval(iv));
      }
    }

    // musik
    let audio = null;
    const mbtn = wrap.querySelector('.inv-music');
    if (full && d.music.src) {
      audio = new Audio(); audio.loop = true; audio.preload = 'none'; audio.src = d.music.src;
      cleanups.push(() => { audio.pause(); audio.removeAttribute('src'); });
    }
    const playMusic = () => audio && audio.play().then(() => mbtn && mbtn.classList.add('on')).catch(() => notify('Musik tidak bisa diputar. Periksa file atau tautan musik.', 'error'));

    wrap.addEventListener('click', async ev => {
      const a = ev.target.closest('[data-a]');
      if (a) {
        const act = a.dataset.a;
        if (act === 'open') {
          wrap.classList.add('opened'); playMusic();
          setTimeout(() => { const c = wrap.querySelector('.cover'); if (c) c.remove(); }, 1300);
        } else if (act === 'music' && audio) {
          if (audio.paused) playMusic(); else { audio.pause(); mbtn.classList.remove('on'); }
        } else if (act === 'copy') {
          try { await copyText(await getUrl()); notify('Tautan disalin', 'ok'); } catch (e) { notify('Gagal menyalin tautan', 'error'); }
        } else if (act === 'share') {
          try {
            const url = await getUrl();
            const title = (d.title + ' ' + d.host).trim() || 'Undangan';
            if (navigator.share) await navigator.share({ title, text: 'Anda diundang: ' + title, url });
            else window.open('https://wa.me/?text=' + encodeURIComponent('Anda diundang: ' + title + '\n' + url), '_blank', 'noopener');
          } catch (e) { if (e && e.name !== 'AbortError') notify('Gagal membagikan', 'error'); }
        } else if (act === 'ics') downloadIcs();
        else if (act === 'prev' && tapGo) tapGo(tapIdx() - 1);
        else if (act === 'next' && tapGo) tapGo(tapIdx() + 1);
        return;
      }
      const gi = ev.target.closest('.g-item');
      if (gi) { const lb = wrap.querySelector('.lightbox'); lb.querySelector('img').src = d.gallery[+gi.dataset.i]; lb.hidden = false; return; }
      if (ev.target.closest('.lightbox')) wrap.querySelector('.lightbox').hidden = true;
    });

    async function getUrl() { return opts.getShareUrl ? await opts.getShareUrl() : location.href; }
    async function copyText(t) {
      if (navigator.clipboard && g.isSecureContext) return navigator.clipboard.writeText(t);
      const ta = document.createElement('textarea'); ta.value = t; ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select(); const ok = document.execCommand('copy'); ta.remove();
      if (!ok) throw new Error('copy gagal');
    }
    async function loadQr() {
      const box = wrap.querySelector('.qr-box'); if (!box || box.dataset.done) return;
      box.dataset.done = '1';
      try { box.innerHTML = qrSvg(await getUrl()); } catch (e) { box.innerHTML = '<p class="ph">' + esc(e.message) + '</p>'; }
    }
    function downloadIcs() {
      const st = parseDate(d.date, d.start); if (!st) return;
      const en = d.end ? parseDate(d.date, d.end) : new Date(st.getTime() + 2 * 3600e3);
      const f = x => x.getFullYear() + String(x.getMonth() + 1).padStart(2, '0') + String(x.getDate()).padStart(2, '0') + 'T' + String(x.getHours()).padStart(2, '0') + String(x.getMinutes()).padStart(2, '0') + '00';
      const e = s => String(s).replace(/([,;\\])/g, '\\$1').replace(/\n/g, '\\n');
      const ics = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Invita//ID', 'BEGIN:VEVENT', 'UID:' + Date.now() + '@invita', 'DTSTAMP:' + f(new Date()),
        'DTSTART:' + f(st), 'DTEND:' + f(en), 'SUMMARY:' + e((d.title + ' ' + d.host).trim() || 'Acara'),
        'LOCATION:' + e([d.venue, d.address].filter(Boolean).join(', ')), 'END:VEVENT', 'END:VCALENDAR'].join('\r\n');
      const a = document.createElement('a');
      a.href = URL.createObjectURL(new Blob([ics], { type: 'text/calendar' })); a.download = 'acara.ics';
      document.body.appendChild(a); a.click(); a.remove();
    }

    // RSVP + buku tamu (tersimpan lokal di perangkat)
    const gbKey = 'invita:gb:' + (inv.id || 'x');
    const readGb = () => { try { return JSON.parse(localStorage.getItem(gbKey) || '[]'); } catch (e) { return []; } };
    const drawGb = () => {
      const list = wrap.querySelector('.gb-list'); if (!list) return;
      const items = readGb();
      list.innerHTML = items.length ? items.slice().reverse().map(x => '<div class="gb-item"><b>' + esc(x.name) + '</b><p>' + nl(x.msg) + '</p><small>' + new Date(x.ts).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' }) + '</small></div>').join('')
        : '<p class="note">Belum ada ucapan di perangkat ini.</p>';
    };
    drawGb();
    const form = wrap.querySelector('form.rsvp');
    if (form) form.addEventListener('submit', e => {
      e.preventDefault();
      const f = form.elements, err = form.querySelector('.ierr');
      const name = f.name.value.trim(), msg = f.msg.value.trim();
      err.hidden = true;
      if (!name) { err.textContent = 'Nama wajib diisi.'; err.hidden = false; return; }
      if (!rsvpOn && !msg) { err.textContent = 'Tulis ucapan terlebih dulu.'; err.hidden = false; return; }
      if (gbOn && msg) {
        try { const arr = readGb(); arr.push({ name, msg, ts: Date.now() }); localStorage.setItem(gbKey, JSON.stringify(arr.slice(-100))); } catch (x) { /* penyimpanan penuh */ }
        drawGb();
      }
      if (rsvpOn) {
        const text = 'Halo, saya ' + name + '.\nKonfirmasi kehadiran untuk "' + ((d.title + ' ' + d.host).trim()) + '": ' + f.att.value +
          (f.att.value === 'Hadir' ? ' (' + (f.count.value || 1) + ' orang)' : '') + '.' + (msg ? '\nUcapan: ' + msg : '');
        window.open('https://wa.me/' + waNum + '?text=' + encodeURIComponent(text), '_blank', 'noopener');
      }
      f.msg.value = '';
      notify(rsvpOn ? 'Membuka WhatsApp untuk mengirim konfirmasi' : 'Ucapan tersimpan di perangkat ini', 'ok');
    });

    return {
      wrap,
      page: () => tapIdx(),
      destroy() { cleanups.forEach(fn => { try { fn(); } catch (e) { /* abaikan */ } }); cleanups.length = 0; }
    };
  }

  Object.assign(Invita, { PATS, POS, FLOWS, ANIMS, FONTS, STYLES, BASE_THEME, esc, safeUrl, normPhone, baseData, withDefaults, parseDate, dateLong, mapUrls, qrSvg, renderInvitation });
})(window);

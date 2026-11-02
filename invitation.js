/* Invita - mesin render undangan (dipakai editor, penampil publik, dan file mandiri) */
(function (g) {
  'use strict';
  const Invita = g.Invita = g.Invita || {};

  const FONTS = {
    elegant:  { label: 'Elegan (Playfair Display)', head: "'Playfair Display',serif", body: "'Lora',serif" },
    script:   { label: 'Kaligrafi (Great Vibes)', head: "'Great Vibes',cursive", body: "'Cormorant Garamond',serif" },
    classic:  { label: 'Klasik (Cinzel)', head: "'Cinzel',serif", body: "'Cormorant Garamond',serif" },
    modern:   { label: 'Modern (Poppins)', head: "'Poppins',sans-serif", body: "'Poppins',sans-serif" },
    clean:    { label: 'Bersih (Montserrat)', head: "'Montserrat',sans-serif", body: "'Inter',sans-serif" },
    playful:  { label: 'Ceria (Dancing Script)', head: "'Dancing Script',cursive", body: "'Poppins',sans-serif" },
    editorial:{ label: 'Editorial (DM Serif Display)', head: "'DM Serif Display',serif", body: "'Inter',sans-serif" }
  };
  const STYLES = ['frame', 'arch', 'modern', 'minimal', 'bold', 'soft'];
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
    ['title', 'host', 'opening', 'description', 'date', 'start', 'end', 'venue', 'address', 'mapsLink', 'wa', 'kicker']
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
    const notify = opts.notify || (m => inote(m));

    const wrap = document.createElement('div');
    wrap.className = 'inv-wrap m-' + mode + (showCover ? '' : ' opened nocover');
    wrap.dataset.style = d.style;
    wrap.style.setProperty('--p', d.theme.primary);
    wrap.style.setProperty('--a', d.theme.accent);
    wrap.style.setProperty('--bg', d.theme.bg);
    wrap.style.setProperty('--t', d.theme.text);
    wrap.style.setProperty('--soft', d.theme.soft);
    wrap.style.setProperty('--fh', font.head);
    wrap.style.setProperty('--fb', font.body);

    const corners = ['tl', 'tr', 'bl', 'br'].map(c => '<div class="orn orn-' + c + '">' + ORN.corner + '</div>').join('');
    let h = '<div class="inv">';
    // Hero
    h += '<section class="hero' + (d.cover ? ' has-cover' : '') + '"><div class="hero-bg"></div><div class="hero-in">' + corners +
      '<p class="kicker">' + esc(d.kicker) + '</p>' +
      '<div class="hero-photo"><span>' + ORN.glyph + '</span></div>' +
      '<h1 class="h-title">' + P(d.title, 'Judul undangan') + '</h1>' +
      '<h2 class="h-host">' + P(d.host, 'Nama penyelenggara') + '</h2>' +
      '<p class="h-date">' + P(dateL, 'Tanggal acara') + '</p>' +
      (full ? '<div class="scroll-hint"><span>Gulir ke bawah</span><i></i></div>' : '') + '</div></section>';

    if (mode !== 'mini') {
      if (d.opening || d.description || ph) {
        h += '<section class="sec reveal"><div class="divd">' + ORN.divider + '</div>' +
          '<p class="open">' + T(d.opening, 'Kalimat pembuka undangan') + '</p>' +
          '<p class="desc">' + T(d.description, 'Deskripsi atau isi undangan') + '</p></section>';
      }
      h += '<section class="sec alt reveal"><p class="eyebrow">Waktu &amp; Tempat</p><h3>Informasi Acara</h3><div class="ev-grid">' +
        '<div class="ev-card">' + ICON.cal + '<h4>Tanggal</h4><p>' + P(dateL, 'Tanggal acara') + '</p></div>' +
        '<div class="ev-card">' + ICON.clock + '<h4>Waktu</h4><p>' + P(timeL, 'Jam acara') + '</p></div>' +
        '<div class="ev-card wide">' + ICON.pin + '<h4>Lokasi</h4><p><strong>' + P(d.venue, 'Nama tempat') + '</strong>' +
        (d.address || ph ? '<br>' + T(d.address, 'Alamat lengkap') : '') + '</p></div></div>' +
        (full && d.features.calendar && target ? '<button class="ibtn ghost" data-a="ics">Simpan ke Kalender</button>' : '') + '</section>';

      if (full && d.features.countdown) {
        h += '<section class="sec reveal"><p class="eyebrow">Menuju Hari Acara</p><h3>Hitung Mundur</h3>' +
          (target ? '<div class="cd"><div class="cd-box"><b data-cd="d">0</b><small>Hari</small></div><div class="cd-box"><b data-cd="h">0</b><small>Jam</small></div><div class="cd-box"><b data-cd="m">0</b><small>Menit</small></div><div class="cd-box"><b data-cd="s">0</b><small>Detik</small></div></div>'
            : (ph ? '<p class="ph">Isi tanggal acara untuk menampilkan hitung mundur.</p>' : '')) + '</section>';
      }
      if (full && (mu.hasTarget || mu.view || ph)) {
        h += '<section class="sec alt reveal"><p class="eyebrow">Peta</p><h3>Lokasi Acara</h3>' +
          (mu.embed ? '<div class="map"><iframe loading="lazy" title="Peta lokasi acara" referrerpolicy="no-referrer-when-downgrade" src="' + esc(mu.embed) + '"></iframe></div>'
            : (ph ? '<p class="ph">Isi nama tempat, alamat, atau link Google Maps agar peta tampil.</p>' : '')) +
          ((mu.view || mu.dir) ? '<div class="btn-row">' +
            (mu.view ? '<a class="ibtn" target="_blank" rel="noopener" href="' + esc(mu.view) + '">' + ICON.pin + 'Lihat Lokasi</a>' : '') +
            (mu.dir ? '<a class="ibtn ghost" target="_blank" rel="noopener" href="' + esc(mu.dir) + '">' + ICON.route + 'Buka Petunjuk Arah</a>' : '') + '</div>' : '') + '</section>';
      }
      if (d.gallery.length) {
        h += '<section class="sec reveal"><p class="eyebrow">Momen</p><h3>Galeri Foto</h3><div class="gal">' +
          d.gallery.map((u, i) => '<button class="g-item" data-i="' + i + '" aria-label="Perbesar foto ' + (i + 1) + '"><img loading="lazy" alt="Foto galeri ' + (i + 1) + '" src="' + esc(u) + '"></button>').join('') + '</div></section>';
      }
      if (full && (rsvpOn || gbOn || (ph && d.features.rsvp))) {
        h += '<section class="sec alt reveal" id="sec-rsvp"><p class="eyebrow">' + (rsvpOn ? 'RSVP' : 'Buku Tamu') + '</p><h3>' + (rsvpOn ? 'Konfirmasi Kehadiran' : 'Ucapan &amp; Doa') + '</h3>';
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
      if (full && (d.features.share || d.features.qr)) {
        h += '<section class="sec reveal" id="sec-share"><p class="eyebrow">Bagikan</p><h3>Sebarkan Undangan</h3>' +
          (d.features.share ? '<div class="btn-row"><button class="ibtn" data-a="share">Bagikan</button><button class="ibtn ghost" data-a="copy">Salin Tautan</button></div>' : '') +
          (d.features.qr ? '<div class="qr-box"></div><p class="note">Pindai untuk membuka undangan</p>' : '') + '</section>';
      }
      h += '<footer class="foot">Dibuat dengan Invita</footer>';
    }
    h += '</div>';

    if (showCover) {
      h += '<div class="cover"><div class="cover-bg"></div><div class="cover-in"><p class="kicker">' + esc(d.kicker) + '</p>' +
        '<h1>' + P(d.title, 'Judul undangan') + '</h1><h2>' + P(d.host, 'Nama penyelenggara') + '</h2>' +
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
      heroBg.style.backgroundImage = u; heroPhoto.style.backgroundImage = u;
      if (coverBg) coverBg.style.backgroundImage = u;
    }
    root.innerHTML = '';
    root.appendChild(wrap);
    const scroller = wrap.querySelector('.inv');

    // reveal
    const reveals = wrap.querySelectorAll('.reveal');
    if (!full || !('IntersectionObserver' in g)) reveals.forEach(r => r.classList.add('in'));
    else {
      const io = new IntersectionObserver(es => es.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); if (e.target.id === 'sec-share') loadQr(); }
      }), { root: scroller, threshold: 0.12 });
      reveals.forEach(r => io.observe(r));
      cleanups.push(() => io.disconnect());
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
      destroy() { cleanups.forEach(fn => { try { fn(); } catch (e) { /* abaikan */ } }); cleanups.length = 0; }
    };
  }

  Object.assign(Invita, { FONTS, STYLES, BASE_THEME, esc, safeUrl, normPhone, baseData, withDefaults, parseDate, dateLong, mapUrls, qrSvg, renderInvitation });
})(window);

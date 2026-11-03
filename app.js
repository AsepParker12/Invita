/* Invita - aplikasi: beranda, galeri template, dashboard, editor, publikasi */
(function () {
  'use strict';
  const I = window.Invita;
  const { esc, withDefaults, renderInvitation } = I;
  const Store = I.Store;
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => [...(r || document).querySelectorAll(s)];
  const view = $('#view');

  let projects = [];
  let disposers = [];
  const onLeave = fn => disposers.push(fn);
  const uid = () => (crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(36) + Math.random().toString(36).slice(2, 10));
  const clone = o => JSON.parse(JSON.stringify(o));
  const slug = p => ((p.name || 'undangan').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'undangan');
  const fmtTime = ts => new Date(ts).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' });

  /* ---------- UI dasar ---------- */
  function toast(msg, type) {
    const el = document.createElement('div');
    el.className = 'toast ' + (type || 'info'); el.textContent = msg;
    $('#toasts').appendChild(el); setTimeout(() => el.remove(), 3800);
  }
  function openModal(html, o) {
    o = o || {};
    const bg = document.createElement('div');
    bg.className = 'modal-bg';
    bg.innerHTML = '<div class="modal ' + (o.wide ? 'wide ' : '') + (o.cls || '') + '" role="dialog" aria-modal="true">' + html + '</div>';
    $('#modals').appendChild(bg);
    const fns = [];
    const onKey = e => { if (e.key === 'Escape') m.close(); };
    const m = {
      el: bg.firstElementChild,
      onClose: fn => fns.push(fn),
      close() { document.removeEventListener('keydown', onKey); fns.forEach(f => f()); bg.remove(); }
    };
    document.addEventListener('keydown', onKey);
    bg.addEventListener('mousedown', e => { if (e.target === bg) m.close(); });
    bg.addEventListener('click', e => { if (e.target.closest('[data-close]')) m.close(); });
    return m;
  }
  function confirmDialog(o) {
    return new Promise(res => {
      const m = openModal('<h2>' + esc(o.title) + '</h2><p class="muted">' + esc(o.text) + '</p><div class="mfoot"><button class="btn" data-close>Batal</button><button class="btn ' + (o.danger ? 'btn-danger solid' : 'btn-primary') + '" id="cfOk">' + esc(o.ok || 'Ya') + '</button></div>');
      let done = false;
      $('#cfOk', m.el).onclick = () => { done = true; m.close(); res(true); };
      m.onClose(() => { if (!done) res(false); });
    });
  }
  function saveBlob(blob, name) {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob); a.download = name;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 4000);
  }
  async function copyText(t) {
    try {
      if (navigator.clipboard && window.isSecureContext) await navigator.clipboard.writeText(t);
      else { const ta = document.createElement('textarea'); ta.value = t; ta.style.position = 'fixed'; document.body.appendChild(ta); ta.select(); const ok = document.execCommand('copy'); ta.remove(); if (!ok) throw 0; }
      toast('Tersalin', 'ok');
    } catch (e) { toast('Gagal menyalin. Salin manual dari kolom tautan.', 'error'); }
  }
  const scriptCache = {};
  function loadScript(src) {
    if (!scriptCache[src]) scriptCache[src] = new Promise((res, rej) => {
      const s = document.createElement('script'); s.src = src; s.onload = res; s.onerror = () => rej(new Error('Gagal memuat ' + src)); document.head.appendChild(s);
    });
    return scriptCache[src];
  }

  /* ---------- tema ---------- */
  const ICON_SUN = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.900 4.900l1.400 1.400M17.700 17.700l1.400 1.400M2 12h2M20 12h2M4.900 19.100l1.400-1.400M17.700 6.300l1.400-1.400"/></svg>';
  const ICON_MOON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 13A9 9 0 1 1 11 3a7 7 0 0 0 10 10z"/></svg>';
  function syncThemeBtn() { $('#themeBtn').innerHTML = document.documentElement.dataset.theme === 'dark' ? ICON_SUN : ICON_MOON; }
  $('#themeBtn').onclick = () => {
    const t = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = t;
    try { localStorage.setItem('invita:theme', t); } catch (e) { /* abaikan */ }
    syncThemeBtn();
  };

  /* ---------- penyimpanan ---------- */
  async function save(p) {
    p.updatedAt = Date.now();
    try { await Store.put(p); return true; }
    catch (e) { toast('Gagal menyimpan. Penyimpanan browser mungkin penuh. Hapus proyek lama atau kecilkan foto.', 'error'); return false; }
  }

  /* ---------- validasi ---------- */
  function errors(p, strict) {
    const d = p.data, e = {};
    if (strict) {
      if (!d.title.trim()) e['data.title'] = 'Judul undangan wajib diisi';
      if (!d.host.trim()) e['data.host'] = 'Nama penyelenggara wajib diisi';
      if (!d.date) e['data.date'] = 'Tanggal acara wajib diisi';
      if (!d.start) e['data.start'] = 'Jam mulai wajib diisi';
      if (!d.venue.trim()) e['data.venue'] = 'Nama tempat wajib diisi';
    }
    if (d.date && !I.parseDate(d.date)) e['data.date'] = 'Tanggal tidak valid';
    if (d.start && d.end && d.end <= d.start) e['data.end'] = 'Jam selesai harus setelah jam mulai';
    if (d.mapsLink.trim() && !/^https?:\/\/\S+$/i.test(d.mapsLink.trim())) e['data.mapsLink'] = 'Link harus diawali http:// atau https://';
    else if (d.mapsLink.trim() && !/(google\.[a-z.]+\/maps|maps\.google|goo\.gl|maps\.app)/i.test(d.mapsLink)) e['data.mapsLink'] = 'Gunakan link dari Google Maps';
    if (d.wa.trim() && !/^\+?[\d\s-]{8,18}$/.test(d.wa.trim())) e['data.wa'] = 'Nomor WhatsApp tidak valid (contoh 0812xxxxxxx)';
    return e;
  }
  function statusOf(p) {
    if (p.publicUrl) return { k: 'pub', t: 'Diterbitkan' };
    if (!Object.keys(errors(p, true)).length) return { k: 'ready', t: 'Siap dibagikan' };
    return { k: 'draft', t: 'Draf' };
  }

  /* ---------- thumbnail & galeri ---------- */
  function miniThumb(el, inv) {
    el.classList.add('fit');
    el.innerHTML = '<div class="fit-in" style="width:360px;height:480px"></div>';
    const inner = $('.fit-in', el);
    const r = renderInvitation(inner, inv, { mode: 'mini' });
    const apply = () => { inner.style.transform = 'scale(' + (el.clientWidth / 360) + ')'; };
    apply();
    const ro = window.ResizeObserver ? new ResizeObserver(apply) : null;
    if (ro) ro.observe(el);
    return () => { if (ro) ro.disconnect(); r.destroy(); };
  }
  function demoData(t) {
    const d = I.sampleData(t);
    d.features = Object.assign({}, d.features, { share: false, qr: false, guestbook: false, rsvp: false });
    return d;
  }
  function previewTemplate(t) {
    const m = openModal('<div class="phone"><div class="screen" id="tplScreen"></div></div>' +
      '<p style="color:#fff;text-align:center;font-size:13px;margin:12px 0 0">Contoh tampilan <b>' + esc(t.name) + '</b>. Nama, tanggal, dan lokasi hanyalah contoh, bukan data Anda.</p>' +
      '<div class="pv-tools"><button class="btn btn-sm" data-close>Tutup</button><button class="btn btn-sm btn-gold" id="useTpl">Gunakan template ini</button></div>', { cls: 'pvm' });
    const r = renderInvitation($('#tplScreen', m.el), { id: 'tpl-' + t.id, data: demoData(t) }, { mode: 'preview', guest: 'Nama Tamu', notify: toast });
    m.onClose(() => r.destroy());
    $('#useTpl', m.el).onclick = () => { m.close(); createProject(t); };
  }
  function mountGallery(el) {
    el.innerHTML = '<div class="chips" role="group" aria-label="Kategori undangan"></div><div class="tpl-grid"></div>';
    const chips = $('.chips', el), grid = $('.tpl-grid', el);
    const cats = I.CATEGORIES;
    chips.innerHTML = cats.map(c => '<button class="chip" data-c="' + c.id + '">' + esc(c.label) + '</button>').join('');
    let cat = cats[0].id, cleanups = [];
    const clear = () => { cleanups.forEach(f => f()); cleanups = []; };
    onLeave(clear);
    function draw() {
      clear();
      $$('.chip', chips).forEach(b => b.classList.toggle('on', b.dataset.c === cat));
      grid.innerHTML = '';
      I.TEMPLATES.filter(t => t.cat === cat).forEach(t => {
        const card = document.createElement('article');
        card.className = 'tpl';
        card.innerHTML = '<div class="thumb"></div><div class="meta"><b>' + esc(t.name) + '</b><span>' + esc(t.catLabel) + ' &middot; ' + I.FLOW_LABEL[t.flow] + ' &middot; ' + I.ANIM_LABEL[t.anim] + '</span></div>' +
          '<div class="acts"><button class="btn btn-sm" data-pv>Preview</button><button class="btn btn-sm btn-primary" data-use>Gunakan</button></div>';
        grid.appendChild(card);
        cleanups.push(miniThumb($('.thumb', card), { id: 'tpl-' + t.id, data: demoData(t) }));
        $('[data-pv]', card).onclick = () => previewTemplate(t);
        $('[data-use]', card).onclick = () => createProject(t);
      });
    }
    chips.onclick = e => { const b = e.target.closest('.chip'); if (b) { cat = b.dataset.c; draw(); } };
    draw();
  }
  async function createProject(t) {
    const now = Date.now();
    const p = { id: uid(), name: 'Undangan ' + t.catLabel, templateId: t.id, createdAt: now, updatedAt: now, guest: '', publicUrl: '', data: I.newData(t) };
    if (!(await save(p))) return;
    projects.push(p);
    location.hash = '#/edit/' + p.id;
  }

  /* ---------- Beranda ---------- */
  const FI = {
    edit: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20h4L19 9l-4-4L4 16z"/></svg>',
    map: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s7-6.200 7-11.500A7 7 0 0 0 5 9.500C5 14.800 12 21 12 21z"/><circle cx="12" cy="9.500" r="2.500"/></svg>',
    wa: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20l1.300-4A8 8 0 1 1 8 18.700z"/></svg>',
    qr: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><path d="M14 14h3v3M21 14v7h-4M14 21v-3"/></svg>'
  };
  function viewHome() {
    view.innerHTML =
      '<section class="hero-app"><div class="wrap hero-grid"><div>' +
      '<span class="pill">Gratis &middot; tanpa akun &middot; siap GitHub Pages</span>' +
      '<h1>Bukan Sekadar Undangan, Melainkan <em>Awal Sebuah Kenangan</em></h1>' +
      '<p class="lead">Pilih template, isi detail acara, pasang peta Google Maps, hitung mundur, RSVP lewat WhatsApp, dan QR Code. Bagikan lewat tautan yang bisa dibuka siapa saja di HP.</p>' +
      '<div class="cta-row"><a class="btn btn-primary" href="#/new">Buat Undangan</a><a class="btn" href="#templates">Lihat Template</a></div>' +
      '<div class="hero-stats"><div><b>' + I.TEMPLATES.length + '</b><span>desain template</span></div><div><b>' + I.CATEGORIES.length + '</b><span>kategori acara</span></div><div><b>0</b><span>biaya server</span></div></div></div>' +
      '<div class="hero-visual" aria-label="Contoh tampilan undangan"><div class="phone back"><div class="screen" id="phB" style="pointer-events:none"></div></div><div class="phone front"><div class="screen" id="phF" style="pointer-events:none"></div></div></div></div></section>' +
      '<section class="section"><div class="wrap"><div class="features">' +
      '<div class="card feat"><div class="ico">' + FI.edit + '</div><h3>Editor yang mudah</h3><p>Isi form, lihat hasilnya langsung di samping. Foto, warna, font, dan musik bisa diatur.</p></div>' +
      '<div class="card feat"><div class="ico">' + FI.map + '</div><h3>Google Maps tanpa API key</h3><p>Peta tampil di undangan lengkap dengan tombol lihat lokasi dan petunjuk arah.</p></div>' +
      '<div class="card feat"><div class="ico">' + FI.wa + '</div><h3>RSVP via WhatsApp</h3><p>Tamu konfirmasi kehadiran dengan satu ketukan, pesannya langsung masuk ke WhatsApp Anda.</p></div>' +
      '<div class="card feat"><div class="ico">' + FI.qr + '</div><h3>QR Code &amp; tautan</h3><p>Bagikan tautan, unduh QR Code, atau simpan undangan sebagai gambar dan PDF.</p></div></div></div></section>' +
      '<section class="section" id="templates"><div class="wrap"><div class="sec-head"><div><h2>Pilih template</h2><p>Setiap template punya karakter berbeda. Klik Preview untuk melihat undangan lengkap dengan animasi pembukanya.</p></div><a class="btn btn-primary" href="#/new">Buat Undangan</a></div><div id="gal"></div></div></section>' +
      '<section class="section"><div class="wrap"><div class="sec-head"><h2>Cara kerjanya</h2></div><div class="steps">' +
      '<div class="card step"><h3>Pilih template</h3><p>Pilih kategori dan desain yang cocok dengan acara Anda.</p></div>' +
      '<div class="card step"><h3>Isi dan atur</h3><p>Lengkapi detail acara, unggah foto, atur warna dan musik.</p></div>' +
      '<div class="card step"><h3>Bagikan</h3><p>Salin tautan atau kirim langsung ke WhatsApp tamu Anda.</p></div></div></div></section>' +
      '<section class="section"><div class="wrap"><div class="honest"><h3>Penting: cara kerja penyimpanan dan berbagi</h3>' +
      '<p>Invita tidak punya server. Proyek Anda disimpan di browser perangkat ini (IndexedDB). Jika data browser dihapus atau Anda pindah perangkat, proyek hilang, jadi gunakan fitur Export JSON di Dashboard untuk cadangan.</p>' +
      '<p>Tautan undangan membawa datanya sendiri di dalam alamat, sehingga bisa dibuka orang lain tanpa server. Syaratnya, Invita sudah diunggah ke GitHub Pages. Foto yang diunggah dari perangkat terlalu besar untuk tautan, jadi gunakan file HTML mandiri atau foto dari URL.</p>' +
      '<p>Ucapan buku tamu hanya tersimpan di perangkat tamu yang menulisnya. Konfirmasi kehadiran sampai ke Anda lewat WhatsApp.</p></div></div></section>';
    const cl = [];
    const ph = (sel, id) => { const t = I.templateById(id); const r = renderInvitation($(sel), { id: 'demo-' + id, data: demoData(t) }, { mode: 'preview', cover: false, guest: 'Nama Tamu' }); cl.push(() => r.destroy()); };
    ph('#phB', 'birthday-confetti'); ph('#phF', 'wedding-rosegold');
    onLeave(() => cl.forEach(f => f()));
    mountGallery($('#gal'));
    $('a[href="#templates"]').onclick = e => { e.preventDefault(); $('#templates').scrollIntoView({ behavior: 'smooth' }); };
  }

  function viewNew() {
    view.innerHTML = '<div class="wrap"><div class="page-head"><h1>Pilih template</h1><p>Pilih desain untuk memulai. Semua warna, font, dan isi bisa diubah di editor.</p></div><div id="gal"></div></div>';
    mountGallery($('#gal'));
  }

  /* ---------- Dashboard ---------- */
  function viewDashboard() {
    const list = projects.slice().sort((a, b) => b.updatedAt - a.updatedAt);
    const cnt = { draft: 0, ready: 0, pub: 0 };
    list.forEach(p => cnt[statusOf(p).k]++);
    view.innerHTML = '<div class="wrap"><div class="page-head"><h1>Dashboard</h1><p>Semua proyek undangan di perangkat ini.</p></div>' +
      '<div class="stats"><div class="card stat"><b>' + list.length + '</b><span>Total undangan dibuat</span></div><div class="card stat"><b>' + cnt.draft + '</b><span>Draf</span></div><div class="card stat"><b>' + cnt.ready + '</b><span>Siap dibagikan</span></div><div class="card stat"><b>' + cnt.pub + '</b><span>Diterbitkan</span></div></div>' +
      '<div class="cta-row" style="margin:0 0 22px"><a class="btn btn-primary" href="#/new">+ Buat undangan baru</a><button class="btn" id="btnImport">Import JSON</button><button class="btn" id="btnExportAll"' + (list.length ? '' : ' disabled') + '>Export semua (JSON)</button></div>' +
      '<p class="muted" id="usage" style="font-size:13px;margin:-8px 0 22px"></p>' +
      (list.length ? '<div class="proj-grid" id="plist"></div>' : '<div class="card empty"><h3>Belum ada undangan</h3><p>Mulai dengan memilih template, atau import cadangan JSON.</p><a class="btn btn-primary" href="#/new">Buat Undangan</a></div>') +
      '</div>';
    const cl = []; onLeave(() => cl.forEach(f => f()));
    const box = $('#plist');
    list.forEach(p => {
      const st = statusOf(p), tpl = I.templateById(p.templateId);
      const el = document.createElement('article');
      el.className = 'card proj';
      el.innerHTML = '<div class="thumb"></div><div><h3>' + esc(p.name || 'Tanpa nama') + '</h3><small>' + esc(tpl ? tpl.catLabel + ' &middot; ' + tpl.name : 'Template') + '</small><small>Diubah ' + esc(fmtTime(p.updatedAt)) + '</small>' +
        '<span class="badge ' + st.k + '">' + st.t + '</span><div class="proj-acts"><a class="btn btn-sm btn-primary" href="#/edit/' + p.id + '">Edit</a><button class="btn btn-sm" data-a="pv">Preview</button><button class="btn btn-sm" data-a="share">Bagikan</button><button class="btn btn-sm" data-a="dup">Duplikat</button><button class="btn btn-sm" data-a="exp">Export</button><button class="btn btn-sm btn-danger" data-a="del">Hapus</button></div></div>';
      box.appendChild(el);
      cl.push(miniThumb($('.thumb', el), { id: p.id, data: p.data }));
      el.addEventListener('click', async e => {
        const b = e.target.closest('[data-a]'); if (!b) return;
        const a = b.dataset.a;
        if (a === 'pv') previewFull(p);
        else if (a === 'share') openPublish(p);
        else if (a === 'exp') exportProjects([p], slug(p));
        else if (a === 'dup') {
          const c = clone(p); c.id = uid(); c.name = (p.name || 'Undangan') + ' (salinan)'; c.publicUrl = ''; c.createdAt = c.updatedAt = Date.now();
          if (await save(c)) { projects.push(c); toast('Proyek diduplikat', 'ok'); route(); }
        } else if (a === 'del') {
          if (await confirmDialog({ title: 'Hapus undangan?', text: '"' + (p.name || 'Tanpa nama') + '" akan dihapus permanen dari perangkat ini. Pastikan sudah diexport jika masih dibutuhkan.', ok: 'Hapus', danger: true })) {
            try { await Store.del(p.id); projects = projects.filter(x => x.id !== p.id); toast('Proyek dihapus', 'ok'); route(); } catch (err) { toast('Gagal menghapus', 'error'); }
          }
        }
      });
    });
    $('#btnImport').onclick = importFlow;
    $('#btnExportAll').onclick = () => exportProjects(projects, 'invita-cadangan');
    Store.usage().then(u => {
      const el = $('#usage'); if (!el) return;
      el.textContent = (Store.volatile ? 'Peringatan: penyimpanan browser tidak tersedia, proyek hanya hidup sampai halaman ditutup. ' : '') +
        (u && u.quota ? 'Penyimpanan browser terpakai ' + (u.usage / 1048576).toFixed(1) + ' MB dari kuota sekitar ' + Math.round(u.quota / 1048576) + ' MB.' : '');
    });
  }
  function exportProjects(list, name) {
    saveBlob(new Blob([JSON.stringify({ app: 'invita', version: 1, exportedAt: new Date().toISOString(), projects: list }, null, 1)], { type: 'application/json' }), name + '.json');
    toast('File JSON diunduh', 'ok');
  }
  function importFlow() {
    const inp = document.createElement('input');
    inp.type = 'file'; inp.accept = '.json,application/json';
    inp.onchange = async () => {
      const f = inp.files[0]; if (!f) return;
      try {
        const j = JSON.parse(await f.text());
        if (!j || j.app !== 'invita' || !Array.isArray(j.projects)) throw new Error('Bukan file cadangan Invita');
        let n = 0;
        for (const x of j.projects) {
          if (!x || typeof x.data !== 'object') continue;
          const now = Date.now();
          const p = { id: uid(), name: String(x.name || 'Undangan impor').slice(0, 80), templateId: I.templateById(x.templateId) ? x.templateId : '', createdAt: now, updatedAt: now, guest: String(x.guest || '').slice(0, 80), publicUrl: /^https?:\/\//i.test(x.publicUrl || '') ? x.publicUrl : '', data: withDefaults(x.data) };
          if (await save(p)) { projects.push(p); n++; }
        }
        toast(n + ' proyek diimpor', n ? 'ok' : 'error'); route();
      } catch (e) { toast('Import gagal: ' + e.message, 'error'); }
    };
    inp.click();
  }

  function previewFull(p) {
    const m = openModal('<div class="phone"><div class="screen" id="fullScreen"></div></div><div class="pv-tools"><button class="btn btn-sm" data-close>Tutup</button></div>', { cls: 'pvm' });
    const r = renderInvitation($('#fullScreen', m.el), { id: p.id, data: p.data }, { mode: 'preview', guest: p.guest || 'Nama Tamu', notify: toast, getShareUrl: () => I.share.buildLink(p, '').then(x => x.url) });
    m.onClose(() => r.destroy());
  }

  /* ---------- Editor ---------- */
  const getP = (o, path) => path.split('.').reduce((a, k) => (a == null ? '' : a[k]), o);
  const setP = (o, path, v) => { const ks = path.split('.'); const last = ks.pop(); const t = ks.reduce((a, k) => a[k], o); t[last] = v; };

  async function imgToData(file, max, q) {
    if (!/^image\//.test(file.type)) throw new Error('"' + file.name + '" bukan file gambar');
    if (file.size > 25e6) throw new Error('"' + file.name + '" terlalu besar (maksimal 25 MB)');
    const url = URL.createObjectURL(file);
    try {
      const img = await new Promise((res, rej) => { const i = new Image(); i.onload = () => res(i); i.onerror = () => rej(new Error('"' + file.name + '" tidak bisa dibaca. Gunakan JPG atau PNG.')); i.src = url; });
      const s = Math.min(1, max / Math.max(img.naturalWidth, img.naturalHeight));
      const c = document.createElement('canvas');
      c.width = Math.round(img.naturalWidth * s); c.height = Math.round(img.naturalHeight * s);
      const x = c.getContext('2d'); x.fillStyle = '#fff'; x.fillRect(0, 0, c.width, c.height); x.drawImage(img, 0, 0, c.width, c.height);
      return c.toDataURL('image/jpeg', q);
    } finally { URL.revokeObjectURL(url); }
  }
  const readAsDataUrl = f => new Promise((res, rej) => { const r = new FileReader(); r.onload = () => res(r.result); r.onerror = () => rej(new Error('Gagal membaca file')); r.readAsDataURL(f); });

  function mediaHTML(p) {
    const d = p.data;
    const isData = u => u.startsWith('data:');
    return '<div class="fld"><span>Foto utama / background</span><div class="media-row">' +
      (d.cover ? '<div class="mthumb"><img alt="Foto utama" src="' + esc(d.cover) + '"><button type="button" data-act="cover-clear" aria-label="Hapus foto utama">&times;</button></div>' : '') +
      '<label class="dz" style="flex:1;min-width:160px"><input type="file" id="coverFile" accept="image/*">' + (d.cover ? 'Ganti foto' : 'Unggah foto dari perangkat') + '</label></div>' +
      '<em>Foto otomatis dikecilkan (maks 1280 px) agar ringan.</em></div>' +
      '<label class="fld"><span>atau tempel URL foto utama</span><input type="url" id="coverUrl" placeholder="https://..." value="' + (d.cover && !isData(d.cover) ? esc(d.cover) : '') + '"></label>' +
      '<div class="fld"><span>Foto galeri (maks 12)</span>' +
      (d.gallery.length ? '<div class="media-row">' + d.gallery.map((u, i) => '<div class="mthumb"><img alt="Galeri ' + (i + 1) + '" src="' + esc(u) + '"><button type="button" data-act="gal-del" data-i="' + i + '" aria-label="Hapus foto ' + (i + 1) + '">&times;</button></div>').join('') + '</div>' : '') +
      '<label class="dz"><input type="file" id="galFile" accept="image/*" multiple>Tambah foto galeri</label></div>' +
      '<div class="fld"><span>Musik latar (opsional)</span>' +
      (d.music.src ? '<div class="mini-note">Musik: ' + esc(d.music.name || 'dari tautan') + ' <button type="button" class="btn btn-sm" data-act="music-clear" style="margin-left:8px">Hapus</button></div>' : '') +
      '<label class="dz"><input type="file" id="musicFile" accept="audio/*">Unggah file audio (maks 5 MB)</label>' +
      '<input type="url" id="musicUrl" placeholder="atau tempel URL langsung ke file .mp3" value="' + (d.music.src && !isData(d.music.src) ? esc(d.music.src) : '') + '" style="margin-top:8px">' +
      '<em>Musik mulai saat tamu menekan "Buka Undangan", sesuai aturan browser. Tamu bisa mematikannya.</em></div>' +
      '<p class="mini-note" id="sizeNote"></p>';
  }

  function editorHTML(p) {
    const d = p.data;
    const F = (label, path, o) => {
      o = o || {}; const v = esc(getP(p, path));
      const inp = o.type === 'textarea' ? '<textarea data-k="' + path + '" rows="' + (o.rows || 3) + '" placeholder="' + esc(o.ph || '') + '">' + v + '</textarea>'
        : '<input type="' + (o.type || 'text') + '" data-k="' + path + '" value="' + v + '" placeholder="' + esc(o.ph || '') + '"' + (o.attrs || '') + '>';
      return '<label class="fld"><span>' + label + '</span>' + inp + (o.hint ? '<em>' + o.hint + '</em>' : '') + '<small class="err" data-err="' + path + '"></small></label>';
    };
    const SW = (label, path) => '<label class="sw"><input type="checkbox" data-k="' + path + '"' + (getP(p, path) ? ' checked' : '') + '>' + label + '</label>';
    const SEL = (label, path, opts) => '<label class="fld"><span>' + label + '</span><select data-k="' + path + '">' + opts.map(o => '<option value="' + o[0] + '"' + (getP(p, path) === o[0] ? ' selected' : '') + '>' + o[1] + '</option>').join('') + '</select></label>';
    const COL = (label, path) => '<label class="fld"><span>' + label + '</span><input type="color" data-k="' + path + '" value="' + esc(getP(p, path)) + '"></label>';
    const tplOpts = I.CATEGORIES.map(c => '<optgroup label="' + esc(c.label) + '">' + I.TEMPLATES.filter(t => t.cat === c.id).map(t => '<option value="' + t.id + '"' + (t.id === p.templateId ? ' selected' : '') + '>' + esc(t.name) + '</option>').join('') + '</optgroup>').join('');
    const fontOpts = Object.keys(I.FONTS).map(k => '<option value="' + k + '"' + (k === d.font ? ' selected' : '') + '>' + esc(I.FONTS[k].label) + '</option>').join('');
    return '<div class="wrap"><div class="ed-bar"><a class="btn btn-sm" href="#/dashboard">&larr; Dashboard</a><div class="ttl" id="edTitle">' + esc(p.name || 'Tanpa nama') + '</div><span class="save-state ok" id="saveState">Tersimpan</span>' +
      '<button class="btn btn-sm" id="btnPv">Preview penuh</button><button class="btn btn-sm btn-primary" id="btnPub">Bagikan &amp; terbitkan</button></div>' +
      '<div class="tabs-m"><button data-pane="edit" class="on">Edit</button><button data-pane="preview">Preview</button></div>' +
      '<div class="editor" data-pane="edit" id="editor"><form class="form" id="form" autocomplete="off" novalidate>' +
      '<details class="grp" open><summary>Informasi umum</summary><div class="grp-body">' +
      F('Nama proyek (hanya untuk Anda)', 'name', { ph: 'Contoh: Pernikahan Rina & Dimas' }) +
      F('Judul undangan', 'data.title', { ph: 'Contoh: The Wedding of' }) +
      F('Nama pengundang / penyelenggara', 'data.host', { ph: 'Contoh: Rina & Dimas' }) +
      F('Nama tamu undangan', 'guest', { ph: 'Contoh: Bapak Ahmad', hint: 'Tampil di sampul pembuka pada pratinjau dan jadi nama awal saat membuat tautan.' }) +
      F('Kalimat pembuka', 'data.opening', { type: 'textarea', rows: 3 }) +
      F('Deskripsi / isi undangan', 'data.description', { type: 'textarea', rows: 4 }) +
      F('Kalimat penutup', 'data.closing', { type: 'textarea', rows: 3 }) +
      '<div><button type="button" class="btn btn-sm" data-act="next-text">Ganti dengan contoh kalimat lain</button></div></div></details>' +
      '<details class="grp" open><summary>Waktu acara</summary><div class="grp-body"><div class="row2">' + F('Tanggal', 'data.date', { type: 'date' }) +
      '<label class="fld"><span>Zona waktu</span><select data-k="data.tz">' + ['WIB', 'WITA', 'WIT'].map(z => '<option' + (z === d.tz ? ' selected' : '') + '>' + z + '</option>').join('') + '</select></label></div>' +
      '<div class="row2">' + F('Jam mulai', 'data.start', { type: 'time' }) + F('Jam selesai (opsional)', 'data.end', { type: 'time' }) + '</div></div></details>' +
      '<details class="grp"><summary>Lokasi &amp; Google Maps</summary><div class="grp-body">' +
      F('Nama tempat', 'data.venue', { ph: 'Contoh: Gedung Serbaguna Melati' }) +
      F('Alamat lengkap', 'data.address', { type: 'textarea', rows: 2, ph: 'Jalan, kelurahan, kota' }) +
      F('Link Google Maps (opsional)', 'data.mapsLink', { type: 'url', ph: 'https://maps.app.goo.gl/...', hint: 'Buka Google Maps, pilih lokasi, Bagikan, Salin link. Tanpa API key. Jika kosong, peta memakai nama tempat dan alamat.' }) +
      '<div><button type="button" class="btn btn-sm" data-act="test-map">Uji lokasi di Google Maps</button></div></div></details>' +
      '<details class="grp"><summary>Foto &amp; musik</summary><div class="grp-body" id="mediaBox">' + mediaHTML(p) + '</div></details>' +
      '<details class="grp"><summary>Tampilan</summary><div class="grp-body">' +
      '<label class="fld"><span>Template</span><select id="tplSel">' + tplOpts + '</select></label>' +
      '<div class="row3">' + COL('Warna utama', 'data.theme.primary') + COL('Aksen', 'data.theme.accent') + COL('Latar', 'data.theme.bg') + COL('Teks', 'data.theme.text') + COL('Latar lembut', 'data.theme.soft') + '</div>' +
      '<div><button type="button" class="btn btn-sm" data-act="reset-colors">Kembalikan warna template</button></div>' +
      '<label class="fld"><span>Jenis font</span><select data-k="data.font">' + fontOpts + '</select></label>' +
      '<div class="row2">' + SEL('Cara membuka undangan', 'data.flow', [['scroll', 'Gulir ke bawah'], ['tap', 'Ketuk untuk pindah halaman']]) +
      SEL('Animasi', 'data.anim', [['rise', 'Naik'], ['slide', 'Geser'], ['zoom', 'Zoom'], ['fade', 'Pudar']]) + '</div>' +
      '<div class="row2">' + SEL('Pola latar', 'data.pat', [['none', 'Tanpa pola'], ['star', 'Bintang islami'], ['confetti', 'Konfeti'], ['dots', 'Titik'], ['lines', 'Garis'], ['sparkle', 'Kilau'], ['leaf', 'Daun']]) +
      SEL('Posisi foto utama', 'data.coverPos', [['center', 'Tengah'], ['top', 'Atas (agar wajah tidak terpotong)'], ['bottom', 'Bawah']]) + '</div>' +
      SW('Hiasan daun di sampul', 'data.flora') + SW('Tampilkan basmalah (tulisan Arab)', 'data.bism') + '</div></details>' +
      '<details class="grp"><summary>Fitur undangan</summary><div class="grp-body">' +
      SW('Hitung mundur', 'data.features.countdown') + SW('RSVP lewat WhatsApp', 'data.features.rsvp') + SW('Buku tamu (ucapan)', 'data.features.guestbook') +
      SW('QR Code', 'data.features.qr') + SW('Tombol bagikan &amp; salin tautan', 'data.features.share') + SW('Simpan ke kalender', 'data.features.calendar') +
      F('Nomor WhatsApp penyelenggara', 'data.wa', { type: 'tel', ph: '0812xxxxxxxx', hint: 'Dipakai untuk RSVP. Tanpa nomor ini, formulir RSVP tidak ditampilkan di undangan.' }) + '</div></details>' +
      '</form><aside class="preview-col"><div class="phone"><div class="screen" id="pvScreen"></div></div><div class="pv-tools"><button class="btn btn-sm" id="btnReplay">Putar animasi pembuka</button></div></aside></div></div>';
  }

  function viewEditor(id) {
    const p = projects.find(x => x.id === id);
    if (!p) { toast('Proyek tidak ditemukan', 'error'); location.hash = '#/dashboard'; return; }
    p.data = withDefaults(p.data);
    view.innerHTML = editorHTML(p);
    const form = $('#form'), stateEl = $('#saveState');
    let strict = false, dirty = false, pvT = null, saveT = null, pv = null;

    function showErrors() {
      const e = errors(p, strict);
      $$('[data-err]', form).forEach(el => { const m = e[el.dataset.err] || ''; el.textContent = m; el.closest('.fld').classList.toggle('bad', !!m); });
      if (strict) $$('details.grp', form).forEach(g => { if (g.querySelector('.fld.bad')) g.open = true; });
      return e;
    }
    function updateSize() {
      const n = $('#sizeNote'); if (!n) return;
      const kb = Math.round(JSON.stringify(p.data).length / 1024);
      n.textContent = 'Ukuran data proyek: ' + (kb > 1024 ? (kb / 1024).toFixed(1) + ' MB' : kb + ' KB') + (kb > 8000 ? '. Cukup besar, kurangi jumlah foto.' : '.');
    }
    function drawPreview(cover) {
      const scr = $('#pvScreen'); const old = $('.inv', scr); const top = old ? old.scrollTop : 0;
      const page = pv && pv.page ? pv.page() : 0;
      if (pv) pv.destroy();
      pv = renderInvitation(scr, { id: p.id, data: p.data }, { mode: 'preview', cover: !!cover, page: cover ? 0 : page, guest: p.guest || 'Nama Tamu', notify: toast, getShareUrl: () => I.share.buildLink(p, '').then(x => x.url) });
      if (!cover) { const n = $('.inv', scr); n.style.scrollBehavior = 'auto'; n.scrollTop = top; requestAnimationFrame(() => { n.style.scrollBehavior = ''; }); }
    }
    async function doSave() {
      clearTimeout(saveT);
      if (!dirty) return;
      dirty = false; stateEl.textContent = 'Menyimpan...'; stateEl.classList.remove('ok');
      if (await save(p)) { stateEl.textContent = 'Tersimpan'; stateEl.classList.add('ok'); } else { stateEl.textContent = 'Gagal menyimpan'; dirty = true; }
    }
    function touch() {
      dirty = true; stateEl.textContent = 'Menyimpan...'; stateEl.classList.remove('ok');
      clearTimeout(pvT); pvT = setTimeout(() => drawPreview(false), 140);
      clearTimeout(saveT); saveT = setTimeout(doSave, 500);
      updateSize();
    }
    drawPreview(false); showErrors(); updateSize();
    const onHide = () => { if (document.hidden) doSave(); };
    document.addEventListener('visibilitychange', onHide);
    onLeave(() => { document.removeEventListener('visibilitychange', onHide); clearTimeout(pvT); if (pv) pv.destroy(); doSave(); });

    form.addEventListener('input', e => {
      const t = e.target, k = t.dataset && t.dataset.k; if (!k) return;
      setP(p, k, t.type === 'checkbox' ? t.checked : t.value);
      if (k === 'name') $('#edTitle').textContent = p.name || 'Tanpa nama';
      showErrors(); touch();
    });
    form.addEventListener('click', e => {
      const b = e.target.closest('[data-act]'); if (!b) return;
      const a = b.dataset.act;
      if (a === 'cover-clear') { p.data.cover = ''; refreshMedia(); }
      else if (a === 'gal-del') { p.data.gallery.splice(+b.dataset.i, 1); refreshMedia(); }
      else if (a === 'music-clear') { p.data.music = { src: '', name: '' }; refreshMedia(); }
      else if (a === 'next-text') nextText();
      else if (a === 'test-map') {
        const mu = I.mapUrls(p.data);
        if (mu.view) window.open(mu.view, '_blank', 'noopener'); else toast('Isi nama tempat, alamat, atau link Google Maps dulu', 'error');
      } else if (a === 'reset-colors') {
        const t = I.templateById(p.templateId); if (!t) return;
        p.data.theme = Object.assign({}, t.theme);
        $$('[data-k^="data.theme."]', form).forEach(i => { i.value = getP(p, i.dataset.k); });
        touch();
      }
    });
    async function nextText() {
      const t = I.templateById(p.templateId), vs = I.textVariants(t ? t.cat : 'lainnya');
      const keys = ['title', 'opening', 'description', 'closing'];
      const cur = vs.findIndex(v => keys.every(k => v[k] === p.data[k]));
      const edited = cur < 0 && keys.some(k => String(p.data[k]).trim());
      if (edited && !(await confirmDialog({ title: 'Ganti kalimat?', text: 'Judul, kalimat pembuka, isi, dan penutup akan diganti dengan contoh lain. Perubahan manual Anda pada keempat kolom itu akan hilang.', ok: 'Ganti' }))) return;
      const v = vs[(cur + 1) % vs.length];
      keys.forEach(k => { p.data[k] = v[k]; const inp = $('[data-k="data.' + k + '"]', form); if (inp) inp.value = v[k]; });
      showErrors(); touch();
    }
    function refreshMedia() { $('#mediaBox').innerHTML = mediaHTML(p); touch(); }
    form.addEventListener('change', async e => {
      const t = e.target;
      try {
        if (t.id === 'coverFile' && t.files[0]) { p.data.cover = await imgToData(t.files[0], 1280, 0.8); refreshMedia(); }
        else if (t.id === 'galFile' && t.files.length) {
          const room = 12 - p.data.gallery.length;
          if (room <= 0) { toast('Galeri sudah penuh (maks 12 foto)', 'error'); return; }
          const files = [...t.files].slice(0, room);
          if (t.files.length > room) toast('Hanya ' + room + ' foto pertama yang ditambahkan (batas 12)');
          for (const f of files) { try { p.data.gallery.push(await imgToData(f, 960, 0.75)); } catch (err) { toast(err.message, 'error'); } }
          refreshMedia();
        } else if (t.id === 'coverUrl') {
          const v = t.value.trim();
          if (!v) { if (!p.data.cover.startsWith('data:')) { p.data.cover = ''; refreshMedia(); } }
          else if (/^https?:\/\/\S+$/i.test(v)) { p.data.cover = v; refreshMedia(); }
          else toast('URL foto harus diawali http:// atau https://', 'error');
        } else if (t.id === 'musicFile' && t.files[0]) {
          const f = t.files[0];
          if (!/^audio\//.test(f.type)) throw new Error('File harus berupa audio (mp3, m4a, ogg)');
          if (f.size > 5 * 1048576) throw new Error('File audio terlalu besar (maks 5 MB). Gunakan URL untuk file yang lebih besar.');
          p.data.music = { src: await readAsDataUrl(f), name: f.name }; refreshMedia();
        } else if (t.id === 'musicUrl') {
          const v = t.value.trim();
          if (!v) { if (!p.data.music.src.startsWith('data:')) { p.data.music = { src: '', name: '' }; refreshMedia(); } }
          else if (/^https?:\/\/\S+$/i.test(v)) { p.data.music = { src: v, name: '' }; refreshMedia(); }
          else toast('URL musik harus diawali http:// atau https://', 'error');
        } else if (t.id === 'tplSel') {
          const nt = I.templateById(t.value), old = I.templateById(p.templateId);
          if (!(await confirmDialog({ title: 'Ganti template?', text: 'Warna, font, dan gaya akan mengikuti template baru. Isi undangan Anda tidak berubah.', ok: 'Ganti' }))) { t.value = p.templateId; return; }
          ['title', 'opening', 'description', 'closing'].forEach(k => { if (!p.data[k] || (old && p.data[k] === old.defaults[k])) p.data[k] = nt.defaults[k]; });
          I.applyTemplate(p.data, nt); p.templateId = nt.id;
          dirty = true; await doSave(); route();
        }
      } catch (err) { toast(err.message || 'Terjadi kesalahan', 'error'); }
      if (t.matches && t.matches('input[type=file]')) t.value = '';
    });

    $('#btnPv').onclick = () => previewFull(p);
    $('#btnReplay').onclick = () => drawPreview(true);
    $('#btnPub').onclick = async () => { clearTimeout(saveT); await doSave(); strict = true; const e = showErrors(); openPublish(p, Object.keys(e).length ? e : null, () => { strict = true; showErrors(); }); };
    $$('.tabs-m button').forEach(b => b.onclick = () => {
      $$('.tabs-m button').forEach(x => x.classList.toggle('on', x === b));
      $('#editor').dataset.pane = b.dataset.pane;
    });
  }

  /* ---------- Bagikan & terbitkan ---------- */
  const H2C = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';
  const eagerImgs = root => $$('img', root).forEach(i => { i.loading = 'eager'; });
  const waitImgs = root => Promise.all($$('img', root).map(i => i.complete ? 0 : new Promise(r => { i.onload = i.onerror = r; })));

  async function exportImage(p) {
    toast('Menyiapkan gambar...');
    let host = null, r = null;
    try {
      await loadScript(H2C);
      if (document.fonts && document.fonts.ready) await document.fonts.ready;
      host = document.createElement('div');
      host.style.cssText = 'position:fixed;left:-9999px;top:0;width:420px';
      document.body.appendChild(host);
      r = renderInvitation(host, { id: p.id, data: p.data }, { mode: 'static', guest: p.guest });
      eagerImgs(host); await waitImgs(host);
      const canvas = await window.html2canvas(host.firstElementChild, { scale: 2, useCORS: true, backgroundColor: null });
      await new Promise(res => canvas.toBlob(b => { saveBlob(b, slug(p) + '.png'); res(); }, 'image/png'));
      toast('Gambar diunduh', 'ok');
    } catch (e) { toast('Gagal membuat gambar. Foto dari URL luar yang tidak mengizinkan akses bisa memblokirnya.', 'error'); }
    finally { if (r) r.destroy(); if (host) host.remove(); }
  }
  function exportPdf(p) {
    const root = $('#printRoot'); root.innerHTML = '';
    const r = renderInvitation(root, { id: p.id, data: p.data }, { mode: 'static', guest: p.guest });
    eagerImgs(root);
    const done = () => { r.destroy(); root.innerHTML = ''; window.removeEventListener('afterprint', done); };
    window.addEventListener('afterprint', done);
    toast('Di dialog cetak, pilih "Simpan sebagai PDF"');
    waitImgs(root).then(() => setTimeout(() => window.print(), 250));
  }
  async function svgPng(svg, size) {
    return new Promise((res, rej) => {
      const url = URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml' })), img = new Image();
      img.onload = () => { const c = document.createElement('canvas'); c.width = c.height = size; const x = c.getContext('2d'); x.imageSmoothingEnabled = false; x.drawImage(img, 0, 0, size, size); URL.revokeObjectURL(url); c.toBlob(res, 'image/png'); };
      img.onerror = rej; img.src = url;
    });
  }
  function qrBlock(box, url, name) {
    try {
      box.innerHTML = '<div class="qr-out">' + I.qrSvg(url) + '</div><div style="margin-top:8px"><button class="btn btn-sm" data-dl>Unduh QR (PNG)</button></div>';
      $('[data-dl]', box).onclick = async () => saveBlob(await svgPng(I.qrSvg(url, 768), 768), name + '-qr.png');
    } catch (e) { box.innerHTML = '<p class="warn">' + esc(e.message) + '</p>'; }
  }

  function openPublish(p, errs, onFix) {
    errs = errs || errors(p, true);
    const m = openModal('<div class="mhead"><div><h2>Bagikan &amp; terbitkan</h2><p class="muted" style="margin:0">' + esc(p.name || 'Tanpa nama') + '</p></div><button class="icon-btn" data-close aria-label="Tutup">&times;</button></div><div id="pubBody"></div>', { wide: true });
    const body = $('#pubBody', m.el);
    if (Object.keys(errs).length) {
      body.innerHTML = '<div class="warn">Lengkapi dulu data berikut sebelum undangan bisa dibagikan:</div><div class="checks" style="margin-top:12px">' +
        Object.values(errs).map(x => '<div><span class="x">&#10007;</span> ' + esc(x) + '</div>').join('') + '</div>' +
        '<div class="mfoot"><button class="btn btn-primary" id="goFix">' + (location.hash.startsWith('#/edit/') ? 'Lengkapi sekarang' : 'Buka editor') + '</button></div>';
      $('#goFix', m.el).onclick = () => { m.close(); if (location.hash.startsWith('#/edit/')) { if (onFix) onFix(); } else location.hash = '#/edit/' + p.id; };
      return;
    }
    const isLocal = location.protocol === 'file:' || /^(localhost|127\.|\[::1\]|0\.0\.0\.0)/.test(location.hostname);
    body.innerHTML =
      '<div class="checks"><div><span class="v">&#10003;</span> Data wajib sudah lengkap</div></div>' +
      '<div class="pub-sec"><h3>1. Tautan undangan</h3>' +
      '<p>Tautan ini membawa data undangan di dalam alamatnya, jadi bisa dibuka dari perangkat lain tanpa server. Syaratnya: Invita sudah diunggah ke GitHub Pages dan tautan dibuat dari alamat GitHub Pages tersebut.</p>' +
      (isLocal ? '<div class="warn">Saat ini Invita dibuka dari alamat lokal (' + esc(location.host || 'file') + '). Tautan di bawah belum bisa dibuka orang lain. Unggah Invita ke GitHub Pages, buka dari alamat publiknya, lalu buat tautan lagi.</div>' : '') +
      '<label class="fld"><span>Nama tamu (opsional, tampil di sampul)</span><input type="text" id="pGuest" maxlength="60" placeholder="Contoh: Bapak Ahmad" value="' + esc(p.guest || '') + '"></label>' +
      '<div class="linkbox"><input id="pLink" readonly aria-label="Tautan undangan"><button class="btn btn-sm" id="pCopy">Salin</button></div>' +
      '<div id="pWarn"></div><div class="cta-row" style="margin:0"><button class="btn btn-sm btn-primary" id="pWa">Kirim lewat WhatsApp</button><a class="btn btn-sm" id="pOpen" target="_blank" rel="noopener">Buka tautan</a></div>' +
      '<div id="pQr"></div></div>' +
      '<div class="pub-sec"><h3>2. File undangan mandiri (.html)</h3>' +
      '<p>Satu file berisi seluruh undangan termasuk foto dan musik yang Anda unggah. Unggah ke repositori GitHub Pages Anda (misalnya folder <b>undangan/</b>), maka undangan punya alamat sendiri yang tetap ringkas.</p>' +
      '<div><button class="btn btn-sm btn-primary" id="pHtml">Unduh file HTML</button></div>' +
      '<label class="fld"><span>Sudah diunggah? Catat tautan publiknya</span><input type="url" id="pPub" placeholder="https://namaanda.github.io/invita/undangan/rina-dimas.html" value="' + esc(p.publicUrl || '') + '"><em>Invita tidak bisa memeriksa apakah halaman itu benar-benar sudah aktif. Buka dulu tautannya untuk memastikan, baru simpan.</em><small class="err" id="pPubErr"></small></label>' +
      '<div class="cta-row" style="margin:0"><button class="btn btn-sm" id="pPubSave">Simpan sebagai tautan publik</button><a class="btn btn-sm" id="pPubOpen" target="_blank" rel="noopener" hidden>Uji tautan</a></div><div id="pPubOut"></div></div>' +
      '<div class="pub-sec"><h3>3. Unduh gambar atau PDF</h3><p>Versi statis tanpa peta dan formulir, cocok untuk dikirim sebagai gambar.</p>' +
      '<div class="cta-row" style="margin:0"><button class="btn btn-sm" id="pImg">Unduh gambar (PNG)</button><button class="btn btn-sm" id="pPdf">Simpan PDF</button></div></div>';

    const link = $('#pLink', m.el), qrBox = $('#pQr', m.el);
    let curUrl = '', seq = 0;
    async function refreshLink() {
      const my = ++seq, guest = $('#pGuest', m.el).value.trim();
      try {
        const r = await I.share.buildLink(p, guest);
        if (my !== seq) return;
        curUrl = r.url; link.value = r.url;
        $('#pOpen', m.el).href = r.url;
        let w = '';
        if (r.dropped.length) w += '<div class="warn">Tidak ikut di tautan karena ukurannya besar: ' + esc(r.dropped.join(', ')) + '. Untuk menyertakannya, pakai file HTML (bagian 2) atau gunakan foto dari URL.</div>';
        if (r.url.length > 2500) w += '<div class="warn" style="margin-top:6px">Tautan cukup panjang (' + r.url.length + ' karakter). Sebagian aplikasi bisa memotongnya. Pertimbangkan file HTML di bagian 2.</div>';
        $('#pWarn', m.el).innerHTML = w;
        qrBlock(qrBox, r.url, slug(p));
      } catch (e) { link.value = ''; $('#pWarn', m.el).innerHTML = '<div class="warn">Gagal membuat tautan: ' + esc(e.message) + '</div>'; }
    }
    refreshLink();
    $('#pGuest', m.el).addEventListener('input', () => { clearTimeout(refreshLink.t); refreshLink.t = setTimeout(refreshLink, 300); });
    $('#pCopy', m.el).onclick = () => { if (curUrl) copyText(curUrl); };
    $('#pWa', m.el).onclick = () => {
      if (!curUrl) return;
      const title = (p.data.title + ' ' + p.data.host).trim();
      window.open('https://wa.me/?text=' + encodeURIComponent('Anda diundang: ' + title + '\n' + curUrl), '_blank', 'noopener');
    };
    $('#pHtml', m.el).onclick = async () => {
      try { const html = await I.share.buildStandalone(p); saveBlob(new Blob([html], { type: 'text/html' }), slug(p) + '.html'); toast('File HTML diunduh', 'ok'); }
      catch (e) { toast('Gagal membuat file HTML. Buka Invita lewat http(s), bukan langsung dari file.', 'error'); }
    };
    const showPub = () => {
      const out = $('#pPubOut', m.el), open = $('#pPubOpen', m.el);
      if (!p.publicUrl) { out.innerHTML = ''; open.hidden = true; return; }
      open.hidden = false; open.href = p.publicUrl;
      out.innerHTML = '<div class="linkbox"><input readonly value="' + esc(p.publicUrl) + '"><button class="btn btn-sm" data-cp>Salin</button></div><div id="pubQr" style="margin-top:10px"></div>';
      $('[data-cp]', out).onclick = () => copyText(p.publicUrl);
      qrBlock($('#pubQr', out), p.publicUrl, slug(p) + '-publik');
    };
    showPub();
    $('#pPubSave', m.el).onclick = async () => {
      const v = $('#pPub', m.el).value.trim(), er = $('#pPubErr', m.el);
      if (v && !/^https:\/\/\S+$/i.test(v)) { er.textContent = 'Tautan publik harus diawali https://'; return; }
      er.textContent = '';
      p.publicUrl = v;
      if (await save(p)) { toast(v ? 'Tautan publik dicatat. Status: Diterbitkan' : 'Tautan publik dihapus', 'ok'); showPub(); }
    };
    $('#pImg', m.el).onclick = () => exportImage(p);
    $('#pPdf', m.el).onclick = () => { m.close(); exportPdf(p); };
  }

  /* ---------- Router ---------- */
  function setNav(name) {
    $$('.nav a').forEach(a => a.classList.toggle('on', a.dataset.nav === name));
    $$('.mobile-nav a').forEach(a => a.classList.toggle('on', a.dataset.nav === name));
  }
  function route() {
    disposers.splice(0).forEach(f => { try { f(); } catch (e) { /* abaikan */ } });
    const parts = location.hash.replace(/^#\/?/, '').split('/');
    const name = parts[0] || 'home';
    const titles = { home: 'Invita | Pembuat Undangan Digital Gratis', new: 'Pilih Template | Invita', dashboard: 'Dashboard | Invita', edit: 'Editor | Invita' };
    document.title = titles[name] || titles.home;
    if (name === 'new') viewNew();
    else if (name === 'dashboard') viewDashboard();
    else if (name === 'edit') viewEditor(parts[1]);
    else viewHome();
    setNav(name === 'edit' ? 'dashboard' : name);
    if (name !== 'home' || !location.hash.includes('templates')) window.scrollTo(0, 0);
  }

  async function init() {
    syncThemeBtn();
    const nav = document.createElement('nav');
    nav.className = 'mobile-nav'; nav.setAttribute('aria-label', 'Navigasi bawah');
    nav.innerHTML = '<a href="#/" data-nav="home">Beranda</a><a href="#/new" data-nav="new">Template</a><a href="#/dashboard" data-nav="dashboard">Dashboard</a>';
    document.body.appendChild(nav);
    await Store.open();
    try { projects = await Store.all(); } catch (e) { projects = []; toast('Gagal membaca proyek tersimpan', 'error'); }
    if (Store.volatile) toast('Penyimpanan browser tidak tersedia (mode privat?). Proyek hanya sementara. Gunakan Export JSON.', 'error');
    window.addEventListener('hashchange', route);
    route();
    const s = $('#splash'); s.classList.add('hide'); setTimeout(() => s.remove(), 600);
  }
  init();
})();


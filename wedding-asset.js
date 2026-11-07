/* Invita - template pernikahan berbasis gambar (aset ilustrasi).
   Memakai renderer lama (RSVP, countdown, peta, musik, tautan share tetap jalan), lalu menambah
   lapisan gambar: panggung cover, hero, bagian mempelai, panel acara. File gambar ada di folder yang sama. */
(function () {
  'use strict';
  const I = window.Invita;
  if (!I) return;
  const e = s => (I.esc ? I.esc(s) : String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])));
  const SA = 9 / 19; // rasio panggung (lebar / tinggi)

  /* ---------- katalog gambar ---------- */
  const CP = {
    jawa: { f: 'aset-pasangan-jawa.png', r: 737 / 1280, n: 'Jawa: beskap dan kebaya marun' },
    minang: { f: 'aset-pasangan-minang.png', r: 731 / 1280, n: 'Minang: jas hitam dan suntiang' },
    batak: { f: 'aset-pasangan-batak.png', r: 754 / 1280, n: 'Batak: ulos dan sortali' },
    melayu: { f: 'aset-pasangan-melayu.png', r: 805 / 1440, n: 'Melayu: teluk belanga dan baju kurung hijau' },
    hijab: { f: 'aset-pasangan-hijab.png', r: 1000 / 1438, n: 'Hijab: setelan krem dan gaun blush' },
    modern: { f: 'aset-pasangan-modern.png', r: 1000 / 1475, n: 'Modern: jas navy dan gaun putih' }
  };
  const HS = {
    gadang: { f: 'aset-adat-gadang.png', r: 1080 / 750, n: 'Rumah Gadang (Minang)', c: 'minang', m: 'minang' },
    batak: { f: 'aset-adat-batak.png', r: 919 / 760, n: 'Rumah Bolon (Batak)', c: 'batak', m: 'batak' },
    melayu: { f: 'aset-adat-melayu.png', r: 1080 / 692, n: 'Rumah Melayu', c: 'melayu', m: 'melayu' },
    riau: { f: 'aset-adat-riau.png', r: 1036 / 760, n: 'Rumah Selaso Jatuh Kembar (Riau)', c: 'melayu', m: 'riau' },
    maimun: { f: 'aset-adat-maimun.png', r: 1078 / 760, n: 'Istana Maimun (Deli)', c: 'melayu', m: 'deli' },
    aceh: { f: 'aset-adat-aceh.png', r: 1080 / 758, n: 'Rumah Aceh', c: 'minang', m: 'aceh' },
    limas: { f: 'aset-adat-limas.png', r: 1080 / 748, n: 'Rumah Limas (Palembang)', c: 'minang', m: 'songket' }
  };
  const cw = (hf, r) => hf * r / SA * 100; // lebar (% panggung) dari tinggi (% panggung)
  const px = n => Math.round(n * 100) / 100;

  /* ---------- definisi template ---------- */
  const T = {
    jawa: {
      id: 'wedding-aw-jawa', name: 'Pendopo Jawa', font: 'script', c: 'jawa', m: 'gamelan',
      theme: { primary: '#6b1a2a', accent: '#b88a2e', bg: '#fbf5e8', text: '#3a1c1c', soft: '#f2e5c9' },
      copy: ['The Wedding of', 'Dengan memohon rahmat dan ridho Allah SWT, kami mengundang Bapak/Ibu/Saudara/i untuk hadir dan memberi doa restu pada pernikahan kami.',
        'Tanpa mengurangi rasa hormat, kami menanti kehadiran Anda di pendopo keluarga untuk menyaksikan dua keluarga dipersatukan dalam adat dan cinta.',
        'Terima kasih atas doa dan kehadiran yang menjadikan hari kami semakin utuh. Rahayu, rahayu, rahayu.'],
      ms: 2600
    },
    marun: {
      id: 'wedding-aw-marun', name: 'Amplop Marun', font: 'script', c: 'jawa', m: 'strings',
      theme: { primary: '#5d0f1f', accent: '#c9a24f', bg: '#fbf3ea', text: '#3a1218', soft: '#f1dfd8' },
      copy: ['The Wedding of', 'Dari balik tirai yang perlahan terbuka, kami titipkan sebuah kabar bahagia: dua hati akhirnya sepakat berjalan bersama.',
        'Hadirlah dan jadilah bagian dari cerita yang paling kami nantikan. Doa dan kehadiran Anda adalah hadiah terindah.',
        'Kami menanti Anda dengan penuh syukur. Sampai jumpa di hari bahagia kami.'],
      ms: 3300
    },
    hijau: {
      id: 'wedding-aw-hijau', name: 'Amplop Hijau', font: 'romantic', c: 'melayu', m: 'melayu',
      theme: { primary: '#0f4a37', accent: '#c9a24f', bg: '#f6f4e8', text: '#14352a', soft: '#dfe9dc' },
      copy: ['The Wedding of', 'Di bawah naungan restu Allah, dengan penuh sukacita kami mengabarkan ikatan suci yang akan segera kami mulai.',
        'Kami memohon kehadiran dan doa terbaik Bapak/Ibu/Saudara/i agar langkah kami diberkahi.',
        'Semoga kebahagiaan ini berbalas keberkahan untuk kita semua. Terima kasih telah hadir.'],
      ms: 3300
    },
    adat: {
      id: 'wedding-aw-adat', name: 'Rumah Adat', font: 'signature', c: 'minang', m: 'pelog',
      theme: { primary: '#6a2a1c', accent: '#b98a3e', bg: '#faf3e6', text: '#3b2417', soft: '#efe0c4' },
      copy: ['The Wedding of', 'Kami bangga membawa adat dan budaya yang diwariskan keluarga kami ke dalam satu hari yang sakral.',
        'Datanglah ke rumah kami, rasakan hangatnya tradisi, dan saksikan dua keluarga menjadi satu.',
        'Atas doa dan kehadiran Anda, kami ucapkan terima kasih yang sebesar-besarnya.'],
      ms: 1800
    },
    modern: {
      id: 'wedding-aw-modern', name: 'Floral Modern', font: 'romantic', c: 'modern', m: 'harp',
      theme: { primary: '#9c5568', accent: '#b8975a', bg: '#fdf8f4', text: '#43292f', soft: '#f6e8e4' },
      copy: ['The Wedding of', 'Ada cinta yang tumbuh pelan, lalu memilih untuk tinggal selamanya. Hari itu akan segera tiba.',
        'Dengan penuh syukur, kami ingin berbagi hari bahagia ini bersama orang-orang tercinta.',
        'Terima kasih sudah menjadi bagian dari perjalanan kami. Sampai bertemu di hari yang indah.'],
      ms: 1800
    }
  };
  const KEYS = Object.keys(T);

  /* ---------- daftar template: ganti semua template pernikahan lama ---------- */
  const LEG = new Set();
  if (Array.isArray(I.TEMPLATES)) {
    const old = I.TEMPLATES.filter(t => t.cat === 'wedding' && !/^wedding-aw-/.test(t.id));
    const base = old[0] || I.TEMPLATES.find(t => t.cat === 'wedding');
    if (base) {
      old.forEach(t => LEG.add(t.id));
      const at = I.TEMPLATES.indexOf(base);
      const add = KEYS.map(k => Object.assign({}, base, {
        id: T[k].id, name: T[k].name, scene: 'aw-' + k, aw: k, style: 'frame', font: T[k].font, theme: Object.assign({}, T[k].theme),
        flow: 'scroll', anim: 'fade', pat: 'none', flora: false, mo: Object.assign({}, base.mo),
        defaults: { title: T[k].copy[0], opening: T[k].copy[1], description: T[k].copy[2], closing: T[k].copy[3] }
      }));
      for (let i = I.TEMPLATES.length - 1; i >= 0; i--) if (LEG.has(I.TEMPLATES[i].id)) I.TEMPLATES.splice(i, 1);
      I.TEMPLATES.splice(Math.min(at, I.TEMPLATES.length), 0, ...add);
    }
    const byId0 = I.templateById;
    I.templateById = id => byId0(id) || (LEG.has(id) ? byId0('wedding-aw-jawa') : undefined);
  }
  const awKey = d => { const m = String((d && d.scene) || '').match(/^aw-(\w+)$/); return m && T[m[1]] ? m[1] : ''; };
  const extras = (d, tpl) => {
    const k = tpl && tpl.aw; if (!k) return d;
    d.scene = 'aw-' + k; d.flow = 'scroll'; d.style = 'frame'; d.anim = 'fade'; d.pat = 'none'; d.flora = false;
    if (!CP[d.awc]) d.awc = T[k].c;
    if (k === 'adat' && !HS[d.awh]) { d.awh = 'gadang'; d.awc = HS.gadang.c; }
    return d;
  };
  if (I.sampleData) {
    const s0 = I.sampleData;
    I.sampleData = function (t) {
      const d = s0.apply(this, arguments);
      if (t && t.aw) { extras(d, t); d.awp1 = 'Putra dari Bapak Hendra Anggara dan Ibu Sari Wulandari'; d.awp2 = 'Putri dari Bapak Slamet Setiawan dan Ibu Ratna Dewi'; }
      return d;
    };
  }
  if (I.newData) { const n0 = I.newData; I.newData = function (t) { return extras(n0.apply(this, arguments), t); }; }
  if (I.applyTemplate) { const a0 = I.applyTemplate; I.applyTemplate = function (d, t) { const r = a0.apply(this, arguments); extras(d, t); return r; }; }

  /* musik bawaan mengikuti template (dan rumah adat yang dipilih) */
  window.__awMusic = d => {
    const k = awKey(d); if (!k) return null;
    if (k === 'adat') { const h = HS[d.awh]; return h ? h.m : 'pelog'; }
    return T[k].m;
  };

  /* ---------- nama mempelai ---------- */
  function names(d) {
    const h = String(d.host || '').trim();
    if (d.n1 && d.n2 && h === [d.n1, d.sep || '&', d.n2].join(' ')) return [String(d.n1), String(d.sep || '&'), String(d.n2)];
    const m = h.match(/^(.+?)\s+(&|dan|and|\+|x|×|♥|❤|-)\s+(.+)$/i);
    if (m) return [m[1].trim(), m[2].trim() === '-' ? '&' : m[2].trim(), m[3].trim()];
    return [h, '', ''];
  }
  const nk = ns => { const L = Math.max(ns[0].length, ns[2].length); return L <= 7 ? 1 : L <= 10 ? .86 : L <= 13 ? .72 : L <= 17 ? .6 : L <= 22 ? .5 : .42; };
  const nameHtml = (ns, ph) => {
    if (!ns[0]) return '<div class="aw-names aw-ph" role="heading" aria-level="2"><span>' + e(ph ? 'Nama Mempelai' : '') + '</span></div>';
    return '<div class="aw-names" role="heading" aria-level="2" style="--nk:' + nk(ns) + '"><span>' + e(ns[0]) + '</span>' + (ns[2] ? '<i>' + e(ns[1] || '&') + '</i><span>' + e(ns[2]) + '</span>' : '') + '</div>';
  };

  /* ---------- helper lapisan ---------- */
  const L = (cls, f, st, extra) => '<img class="L ' + cls + '" src="' + f + '" alt="" draggable="false" decoding="async" style="' + st + '"' + (extra || '') + '>';
  const cpl = (ck, hf, bottom, cls, x) => {
    const c = CP[ck] || CP.jawa, w = cw(hf, c.r), left = x == null ? (100 - w) / 2 : x;
    return L('cpl ' + (cls || ''), c.f, 'left:' + px(left) + '%;width:' + px(w) + '%;bottom:' + bottom + '%');
  };
  const sw = (cls, st) => '<i class="L ' + cls + '" style="' + st + '"></i>';
  const petals = () => '<div class="aw-petals" aria-hidden="true">' + Array.from({ length: 9 }, (_, i) =>
    '<i style="--x:' + ((i * 11.7 + 4) % 96) + '%;--d:' + ((i * 1.37) % 9).toFixed(2) + 's;--t:' + (9 + (i * 1.9) % 6).toFixed(1) + 's;--s:' + (14 + (i * 7) % 12) + 'px;--p:' + ((i % 3) * 50) + '% ' + ((i % 2) * 100) + '%;--r:' + (i * 47 % 360) + 'deg"></i>').join('') + '</div>';
  const hint = '<div class="aw-hint" aria-hidden="true"><span>Gulir ke bawah</span><i></i></div>';
  const ddate = (t, ph) => '<div class="aw-date">' + (t ? e(t) : (ph ? '<span class="ph">Tanggal acara</span>' : '')) + '</div>';

  /* ---------- hero (layar setelah undangan dibuka) ---------- */
  function heroHtml(k, o) {
    const nm = nameHtml(o.n, o.ph), kk = '<div class="aw-kick">' + e(o.kick) + '</div>';
    const g = 'aset-garis-emas.png';
    let bg = '', sc = '';
    if (k === 'jawa') {
      bg = '<div class="aw-bg"><img src="aset-jawa-latar.jpg" alt=""></div>';
      sc = L('in swag', 'aset-jawa-lengkung.png', 'left:0;top:0;width:100%;--d:.1s') +
        '<div class="L aw-tx in" style="left:14%;right:14%;top:24.5%;--d:.5s">' + kk + nm + ddate(o.date, o.ph) + '</div>' +
        L('in pend', 'aset-jawa-pendopo.png', 'left:8%;width:84%;top:46%;--d:.3s') +
        cpl(o.ck, .38, 8.5, 'in', null).replace('class="L cpl in"', 'class="L cpl in" data-d="1"').replace('style="', 'style="--d:.8s;') +
        L('in wk', 'aset-jawa-wayang-kiri.png', 'left:-2%;bottom:3%;width:18%;--d:.6s') + L('in wk r', 'aset-jawa-wayang-kanan.png', 'right:-2%;bottom:3%;width:19%;--d:.6s') +
        L('in flo', 'aset-jawa-bunga-bawah.png', 'left:-4%;bottom:-1.5%;width:108%;--d:.4s') + hint;
    } else if (k === 'marun' || k === 'hijau') {
      const gr = k === 'hijau', pre = gr ? 'aset-hijau-' : 'aset-';
      bg = '<div class="aw-bg tirai" style="background-image:url(aset-tirai-' + (gr ? 'hijau' : 'marun') + '.jpg)"></div>';
      sc = '<div class="L aw-card hold" style="left:8%;width:84%;top:6%"><img src="' + pre + 'kartu-renda.png" alt="" draggable="false"><div class="ci">' + kk + nm + '<img class="gl" src="' + g + '" alt="">' + ddate(o.date, o.ph) + '</div></div>' +
        L('hold anggrek', 'aset-anggrek-gantung.png', 'right:-3%;top:-1%;width:30%') + L('hold anggrek l', 'aset-anggrek-gantung.png', 'left:-3%;top:-1%;width:30%') +
        cpl(o.ck, .34, 7, 'in', null).replace('style="', 'style="--d:.9s;') +
        L('hold flo', 'aset-rangkaian-bawah.png', 'left:-3%;bottom:-1%;width:106%') + hint;
    } else if (k === 'adat') {
      const h = HS[o.hk] || HS.gadang, hh = 100 / h.r * SA;
      bg = '<div class="aw-bg paper"></div>';
      sc = L('in vine', 'aset-daun-atas.png', 'left:-2%;top:-1%;width:104%;--d:.1s') +
        '<div class="L aw-tx in" style="left:10%;right:10%;top:10%;--d:.4s">' + kk + nm + L('', g, 'position:static;display:block;width:62%;margin:1.5cqw auto 0') + ddate(o.date, o.ph) + '</div>' +
        L('in house', h.f, 'left:0;width:100%;top:' + px(Math.max(24, 66 - hh)) + '%;--d:.3s') +
        cpl(o.ck, .35, 6.5, 'in', null).replace('style="', 'style="--d:.8s;') + petals() + hint;
    } else {
      bg = '<div class="aw-bg paper"></div>';
      sc = L('in vine', 'aset-daun-atas.png', 'left:-2%;top:-1%;width:104%;--d:.1s') +
        L('in corner tl', 'aset-bunga-sudut.png', 'left:-9%;top:-3%;width:50%;--d:.3s') + L('in corner br', 'aset-bunga-sudut.png', 'right:-10%;bottom:-3%;width:58%;--d:.5s') +
        (o.ck === 'hijab' ? L('in moon', 'aset-bulan.png', 'right:6%;top:13%;width:12%;--d:.7s') : '') +
        '<div class="L aw-tx in" style="left:10%;right:10%;top:12%;--d:.4s">' + kk + nm + L('', g, 'position:static;display:block;width:62%;margin:1.5cqw auto 0') + ddate(o.date, o.ph) + '</div>' +
        cpl(o.ck, .43, 8, 'in', null).replace('style="', 'style="--d:.8s;') + petals() + hint;
    }
    return '<div class="aw-hero">' + bg + '<div class="aw-scene">' + sc + '</div></div>';
  }

  /* ---------- panggung cover (sebelum dibuka) ---------- */
  function stageHtml(k, o) {
    const g = 'aset-garis-emas.png';
    let bg = '', sc = '';
    const kk = '<div class="aw-kick">' + e(o.kick) + '</div>', nm = nameHtml(o.n, o.ph);
    if (k === 'jawa') {
      bg = '<div class="aw-bg"><img src="aset-jawa-latar.jpg" alt=""></div>';
      sc = L('in swag', 'aset-jawa-lengkung.png', 'left:0;top:0;width:100%;--d:.1s') +
        '<div class="L aw-panel2 in" style="--d:.35s"></div>' +
        L('in wk', 'aset-jawa-wayang-kiri.png', 'left:-3%;bottom:0;width:29%;--d:.2s') + L('in wk r', 'aset-jawa-wayang-kanan.png', 'right:-3%;bottom:0;width:30%;--d:.2s');
    } else if (k === 'marun' || k === 'hijau') {
      const gr = k === 'hijau', pre = gr ? 'aset-hijau-' : 'aset-';
      bg = '<div class="aw-bg tirai" style="background-image:url(aset-tirai-' + (gr ? 'hijau' : 'marun') + '.jpg)"></div>';
      sc = L('in anggrek', 'aset-anggrek-gantung.png', 'right:-3%;top:-1%;width:30%;--d:.2s') + L('in anggrek l', 'aset-anggrek-gantung.png', 'left:-3%;top:-1%;width:30%;--d:.2s') +
        '<div class="L aw-card" style="left:8%;width:84%;top:6%"><img src="' + pre + 'kartu-renda.png" alt="" draggable="false"><div class="ci">' + kk + nm + '<img class="gl" src="' + g + '" alt="">' + ddate(o.date, o.ph) + '</div></div>' +
        '<div class="L aw-env in" style="left:8%;width:84%;top:40%;--d:.3s"><img class="eb" src="' + pre + 'amplop-badan.png" alt="" draggable="false"><img class="ef" src="' + pre + 'amplop-tutup.png" alt="" draggable="false"><img class="es" src="' + pre + (gr ? 'segel.png' : 'segel-lilin.png') + '" alt="" draggable="false"></div>' +
        L('in flo', 'aset-rangkaian-bawah.png', 'left:-3%;bottom:-1%;width:106%;--d:.5s');
    } else if (k === 'adat') {
      const h = HS[o.hk] || HS.gadang, hh = 100 / h.r * SA;
      bg = '<div class="aw-bg paper"></div>';
      sc = L('in vine', 'aset-daun-atas.png', 'left:-2%;top:-1%;width:104%;--d:.1s') +
        '<div class="L aw-tx in" style="left:10%;right:10%;top:10%;--d:.4s">' + kk + nm + L('', g, 'position:static;display:block;width:62%;margin:1.5cqw auto 0') + '</div>' +
        L('in house', h.f, 'left:0;width:100%;top:' + px(Math.max(24, 66 - hh)) + '%;--d:.3s') +
        cpl(o.ck, .35, 6.5, 'in', null).replace('style="', 'style="--d:.8s;') + petals();
    } else {
      bg = '<div class="aw-bg paper"></div>';
      sc = L('in vine', 'aset-daun-atas.png', 'left:-2%;top:-1%;width:104%;--d:.1s') +
        L('in corner tl', 'aset-bunga-sudut.png', 'left:-9%;top:-3%;width:50%;--d:.3s') + L('in corner br', 'aset-bunga-sudut.png', 'right:-10%;bottom:-3%;width:58%;--d:.5s') +
        (o.ck === 'hijab' ? L('in moon', 'aset-bulan.png', 'right:6%;top:13%;width:12%;--d:.7s') : '') +
        '<div class="L aw-tx in" style="left:10%;right:10%;top:12%;--d:.4s">' + kk + nm + L('', g, 'position:static;display:block;width:62%;margin:1.5cqw auto 0') + '</div>' +
        cpl(o.ck, .43, 8, 'in', null).replace('style="', 'style="--d:.8s;') + petals();
    }
    return '<div class="aw-stage">' + bg + '<div class="aw-scene">' + sc + '</div></div>';
  }

  /* ---------- bagian mempelai ---------- */
  function memHtml(k, o, cls) {
    const p1 = o.d.awp1, p2 = o.d.awp2, n = o.n;
    const par = (v, ph) => v ? '<small>' + e(v) + '</small>' : (o.ph ? '<small class="ph">' + e(ph) + '</small>' : '');
    const n1 = n[0] || (o.ph ? 'Mempelai pertama' : ''), n2 = n[2] || (o.ph ? 'Mempelai kedua' : '');
    let body;
    if (k === 'jawa' || k === 'marun') {
      body = '<div class="aw-mem-grid"><figure><div class="aw-arch"><img src="aset-pria-jawa.png" alt="" loading="lazy"></div><figcaption><b>' + e(n1) + '</b>' + par(p1, 'Putra dari Bapak dan Ibu') + '</figcaption></figure>' +
        '<figure><div class="aw-arch"><img src="aset-wanita-jawa.png" alt="" loading="lazy"></div><figcaption><b>' + e(n2) + '</b>' + par(p2, 'Putri dari Bapak dan Ibu') + '</figcaption></figure></div>';
    } else {
      const c = CP[o.ck] || CP.jawa;
      body = '<div class="aw-mem-one"><div class="aw-arch wide"><img src="' + c.f + '" alt="" loading="lazy"></div><div class="aw-mem-cap"><figcaption><b>' + e(n1) + '</b>' + par(p1, 'Putra dari Bapak dan Ibu') + '</figcaption><figcaption><b>' + e(n2) + '</b>' + par(p2, 'Putri dari Bapak dan Ibu') + '</figcaption></div></div>';
    }
    return '<section class="' + cls + ' aw-mem"><div class="divd"></div><p class="eyebrow">Mempelai</p><h3>Dua Hati, Satu Doa</h3>' + body + '</section>';
  }

  /* ---------- pasang ke undangan ---------- */
  function dress(wrap, d, opts) {
    const k = awKey(d);
    if (!k || wrap.dataset.aw) return;
    const ph = opts.mode !== 'public';
    const ck = CP[d.awc] ? d.awc : T[k].c, hk = HS[d.awh] ? d.awh : 'gadang';
    const n = names(d);
    const hero = wrap.querySelector('.hero');
    const dt = hero && hero.querySelector('.h-date');
    const o = { n, ck, hk, ph, d, kick: String(d.title || '').trim() || 'The Wedding of', date: (dt && !dt.querySelector('.ph') ? dt.textContent : '').trim() };
    wrap.dataset.aw = k; wrap.dataset.awc = ck; wrap.dataset.awd = String({ jawa: 5, marun: 6, hijau: 6, adat: 3.6, modern: 3.6 }[k]); wrap.classList.add('aw');
    if (k === 'hijau') wrap.dataset.gr = '1';
    if (hero) hero.insertAdjacentHTML('afterbegin', heroHtml(k, o));
    const cover = wrap.querySelector('.cover');
    if (cover) {
      cover.classList.add('aw-cover');
      cover.insertAdjacentHTML('afterbegin', stageHtml(k, o));
      const ci = cover.querySelector('.cover-in');
      if (ci && (k === 'jawa')) ci.insertAdjacentHTML('afterbegin', '<div class="aw-ct">' + '<div class="aw-kick">' + e(o.kick) + '</div>' + nameHtml(n, ph) + '<img class="gl" src="aset-garis-emas.png" alt=""></div>');
      else if (ci && (k === 'marun' || k === 'hijau')) ci.insertAdjacentHTML('afterbegin', '<div class="aw-ct"><div class="aw-kick">' + e(o.kick) + '</div>' + nameHtml(n, ph) + '</div>');
      wrap.addEventListener('click', ev => {
        const b = ev.target && ev.target.closest && ev.target.closest('[data-a="open"]');
        if (!b || wrap.__awfx) return;
        const cv = wrap.querySelector('.cover'); if (!cv) return;
        const fx = document.createElement('div');
        fx.className = 'aw-fx'; fx.dataset.k = k;
        while (cv.firstChild) fx.appendChild(cv.firstChild);
        wrap.appendChild(fx); wrap.__awfx = 1;
        requestAnimationFrame(() => requestAnimationFrame(() => fx.classList.add('aw-out')));
        setTimeout(() => { if (fx.parentNode) fx.remove(); }, T[k].ms + 300);
      }, true);
    }
    if (opts.mode === 'mini') return;
    const inv = wrap.querySelector('.inv'); if (!inv) return;
    wrap.querySelectorAll('.divd').forEach(x => { x.innerHTML = '<img class="aw-div" src="aset-garis-emas.png" alt="">'; });
    const first = inv.querySelector('section.sec');
    if (first) first.insertAdjacentHTML('afterend', memHtml(k, o, first.className.replace(/\balt\b/, '').trim() || 'sec'));
    const ev = Array.from(inv.querySelectorAll('section.sec')).find(s => s.querySelector('.ev-grid'));
    if (ev && k !== 'modern') {
      const pre = k === 'hijau' ? 'aset-hijau-panel.png' : 'aset-panel-marun.png';
      const box = document.createElement('div'); box.className = 'aw-panel'; box.style.backgroundImage = 'url(' + pre + ')';
      const inn = document.createElement('div'); inn.className = 'aw-pin';
      while (ev.firstChild) inn.appendChild(ev.firstChild);
      box.appendChild(inn); ev.appendChild(box); ev.classList.add('aw-evp');
    }
  }

  const prev = I.renderInvitation;
  I.renderInvitation = function (root, inv, opts) {
    const r = prev.apply(this, arguments);
    try {
      const d = inv && inv.data ? (I.withDefaults ? I.withDefaults(inv.data) : inv.data) : null;
      if (d && awKey(d) && r && r.wrap) dress(r.wrap, d, opts || {});
    } catch (err) { if (window.console) console.error('wedding-asset', err); }
    return r;
  };

  /* ---------- editor: pasangan, rumah adat, orang tua ---------- */
  function installEditor() {
    const form = document.querySelector('#form');
    if (!form || form.dataset.aw) return;
    const ed = I.__edit; const k = ed && awKey(ed);
    if (!k) return;
    const host = form.querySelector('[data-k="data.host"]'); if (!host) return;
    form.dataset.aw = '1';
    const go = () => host.dispatchEvent(new Event('input', { bubbles: true }));
    const opt = (map, cur) => Object.keys(map).map(x => '<option value="' + x + '"' + (x === cur ? ' selected' : '') + '>' + e(map[x].n) + '</option>').join('');
    const pc = document.createElement('details'); pc.className = 'grp aw-edit'; pc.open = true;
    pc.innerHTML = '<summary>Gambar Pasangan dan Suasana</summary><div class="grp-body"><p class="mini-note">Pilih gambar mempelai' + (k === 'adat' ? ' dan rumah adat' : '') + '. Nama orang tua boleh dikosongkan.</p>' +
      (k === 'adat' ? '<label class="fld"><span>Rumah adat</span><select id="awh">' + opt(HS, HS[ed.awh] ? ed.awh : 'gadang') + '</select></label>' : '') +
      '<label class="fld"><span>Gambar pasangan</span><select id="awc">' + opt(CP, CP[ed.awc] ? ed.awc : T[k].c) + '</select></label>' +
      '<label class="fld"><span>Mempelai pertama (orang tua)</span><input id="awp1" maxlength="120" placeholder="Putra dari Bapak ... dan Ibu ..." value="' + e(ed.awp1 || '') + '"></label>' +
      '<label class="fld"><span>Mempelai kedua (orang tua)</span><input id="awp2" maxlength="120" placeholder="Putri dari Bapak ... dan Ibu ..." value="' + e(ed.awp2 || '') + '"></label></div>';
    form.insertBefore(pc, form.querySelectorAll('.grp')[1] || null);
    const q = s => pc.querySelector(s);
    q('#awc').onchange = ev => { if (I.__edit) I.__edit.awc = ev.target.value; go(); };
    if (q('#awh')) q('#awh').onchange = ev => { const E = I.__edit; if (!E) return; E.awh = ev.target.value; E.awc = HS[E.awh].c; q('#awc').value = E.awc; go(); };
    q('#awp1').oninput = ev => { if (I.__edit) I.__edit.awp1 = ev.target.value.slice(0, 120); go(); };
    q('#awp2').oninput = ev => { if (I.__edit) I.__edit.awp2 = ev.target.value.slice(0, 120); go(); };
  }
  if (document.body || document.documentElement) {
    new MutationObserver(() => { try { installEditor(); } catch (x) { /* abaikan */ } }).observe(document.documentElement, { childList: true, subtree: true });
  }
  window.__invAw = { T, CP, HS, names };
})();

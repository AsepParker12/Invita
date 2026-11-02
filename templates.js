/* Invita - daftar kategori dan template (24 desain) */
(function (g) {
  'use strict';
  const I = g.Invita;

  const CATEGORIES = [
    { id: 'wedding', label: 'Pernikahan', kicker: 'Undangan Pernikahan' },
    { id: 'birthday', label: 'Ulang Tahun', kicker: 'Undangan Ulang Tahun' },
    { id: 'aqiqah', label: 'Aqiqah', kicker: 'Undangan Aqiqah' },
    { id: 'khitanan', label: 'Khitanan', kicker: 'Undangan Khitanan' },
    { id: 'wisuda', label: 'Wisuda', kicker: 'Undangan Wisuda' },
    { id: 'keluarga', label: 'Acara Keluarga', kicker: 'Undangan Acara Keluarga' },
    { id: 'pengajian', label: 'Pengajian', kicker: 'Undangan Pengajian' },
    { id: 'reuni', label: 'Reuni', kicker: 'Undangan Reuni' },
    { id: 'resmi', label: 'Acara Resmi', kicker: 'Undangan Resmi' },
    { id: 'rapat', label: 'Rapat', kicker: 'Undangan Rapat' },
    { id: 'opening', label: 'Grand Opening', kicker: 'Grand Opening' },
    { id: 'lainnya', label: 'Lainnya', kicker: 'Undangan' }
  ];

  const T = (p, a, bg, t, soft) => ({ primary: p, accent: a, bg: bg, text: t, soft: soft });
  const TEXT = {
    wedding: ['The Wedding of', 'Dengan memohon rahmat dan ridho Allah SWT, kami mengundang Bapak/Ibu/Saudara/i untuk hadir pada acara pernikahan kami.', 'Merupakan kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu.'],
    birthday: ['Pesta Ulang Tahun', 'Ada pesta kecil yang seru dan kami ingin Anda ada di dalamnya.', 'Mari merayakan bertambahnya usia bersama makanan enak, tawa, dan kenangan baru.'],
    aqiqah: ['Syukuran Aqiqah', 'Dengan rasa syukur atas kelahiran buah hati kami, kami mengundang Bapak/Ibu/Saudara/i.', 'Kehadiran dan doa Anda akan melengkapi kebahagiaan kami.'],
    khitanan: ['Syukuran Khitanan', 'Alhamdulillah, dengan rasa syukur kami mengundang Bapak/Ibu/Saudara/i pada acara khitanan putra kami.', 'Doa dan kehadiran Anda sangat berarti bagi kami sekeluarga.'],
    wisuda: ['Syukuran Wisuda', 'Dengan bangga kami mengundang Anda untuk merayakan kelulusan dan wisuda.', 'Terima kasih atas dukungan dan doa yang telah menyertai perjalanan ini.'],
    keluarga: ['Silaturahmi Keluarga', 'Dengan hangat kami mengundang Anda untuk berkumpul dalam acara keluarga.', 'Mari mempererat silaturahmi dalam suasana yang akrab dan menyenangkan.'],
    pengajian: ['Pengajian Akbar', 'Assalamu\'alaikum warahmatullahi wabarakatuh. Kami mengundang Bapak/Ibu/Saudara/i untuk menghadiri pengajian.', 'Semoga majelis ini membawa keberkahan dan menambah keimanan kita semua.'],
    reuni: ['Reuni Akbar', 'Sudah lama tidak bertemu. Saatnya berkumpul, bercerita, dan bernostalgia.', 'Ajak juga teman-teman lain agar reuni ini semakin meriah.'],
    resmi: ['Dengan Hormat', 'Dengan hormat, kami mengundang Bapak/Ibu untuk menghadiri acara berikut.', 'Mohon kehadiran tepat waktu. Terima kasih atas perhatian dan kehadiran Bapak/Ibu.'],
    rapat: ['Rapat Koordinasi', 'Dengan hormat, kami mengundang Bapak/Ibu untuk menghadiri rapat sesuai jadwal berikut.', 'Mohon membawa bahan atau data yang diperlukan sesuai agenda rapat.'],
    opening: ['Grand Opening', 'Kami dengan bangga mengundang Anda pada pembukaan usaha kami.', 'Nikmati promo spesial, hidangan, dan hadiah menarik di hari pembukaan.'],
    lainnya: ['Anda Diundang', 'Dengan senang hati kami mengundang Anda untuk hadir pada acara berikut.', 'Kehadiran Anda akan membuat acara ini semakin berkesan.']
  };
  const SAMPLE = {
    wedding: ['Rina & Dimas', '2027-06-12'], birthday: ['Alya ke-7', '2027-03-20'], aqiqah: ['Muhammad Aris', '2027-02-14'],
    khitanan: ['Ahmad Fauzan', '2027-04-03'], wisuda: ['Nadia Putri, S.Pd.', '2027-08-21'], keluarga: ['Keluarga Besar Harahap', '2027-01-09'],
    pengajian: ['Ustadz Abdullah', '2027-05-07'], reuni: ['Angkatan 2007', '2027-07-17'], resmi: ['PT Maju Bersama', '2027-09-02'],
    rapat: ['Divisi Operasional', '2027-02-23'], opening: ['Kopi Senja', '2027-03-06'], lainnya: ['Nama Penyelenggara', '2027-05-15']
  };

  // [id, kategori, nama, gaya, font, tema]
  const RAW = [
    ['wedding-rosegold', 'wedding', 'Rose Gold', 'frame', 'script', T('#b76e79', '#c9a227', '#fff8f5', '#4a3436', '#f6e3df')],
    ['wedding-emerald', 'wedding', 'Emerald Arch', 'arch', 'elegant', T('#1f5b4b', '#c8a45c', '#f5f8f4', '#1d3a31', '#e0ece5')],
    ['birthday-confetti', 'birthday', 'Confetti Pop', 'bold', 'playful', T('#ff5d8f', '#ffc93c', '#fff7fb', '#3a2342', '#ffe3ee')],
    ['birthday-sky', 'birthday', 'Sky Party', 'soft', 'modern', T('#3a86ff', '#ffbe0b', '#f3f8ff', '#1b2a49', '#dbe9ff')],
    ['aqiqah-pastel', 'aqiqah', 'Pastel Berkah', 'soft', 'script', T('#6f9f99', '#e0b97d', '#f6fbfa', '#2f4a47', '#dcefec')],
    ['aqiqah-gold', 'aqiqah', 'Gold Crescent', 'frame', 'classic', T('#2e4a6b', '#d4af37', '#f8f6ef', '#20344a', '#e8e2cf')],
    ['khitanan-biru', 'khitanan', 'Biru Ceria', 'modern', 'clean', T('#1d6fa5', '#f2a541', '#f2f8fb', '#17364c', '#d8eaf4')],
    ['khitanan-sage', 'khitanan', 'Sage Minimal', 'minimal', 'editorial', T('#5c7a5b', '#b08968', '#f7f8f3', '#2c3a2b', '#e4eadb')],
    ['wisuda-navy', 'wisuda', 'Navy Gold', 'bold', 'editorial', T('#14213d', '#fca311', '#f7f7f9', '#14213d', '#e5e7ee')],
    ['wisuda-maroon', 'wisuda', 'Toga Maroon', 'frame', 'classic', T('#6d1a36', '#d4a574', '#fbf6f4', '#3b1020', '#f0dfda')],
    ['keluarga-terakota', 'keluarga', 'Terakota Hangat', 'arch', 'elegant', T('#c1664a', '#e0a96d', '#fdf6f0', '#4a2a20', '#f6e0d3')],
    ['keluarga-taman', 'keluarga', 'Taman Hijau', 'soft', 'clean', T('#4f8a5b', '#f2c14e', '#f4faf3', '#223a29', '#dcefd9')],
    ['pengajian-hijau', 'pengajian', 'Hijau Teduh', 'frame', 'elegant', T('#1b5e48', '#c9a74d', '#f4f8f5', '#163a2e', '#dcebe3')],
    ['pengajian-malam', 'pengajian', 'Biru Malam', 'arch', 'classic', T('#243b6b', '#e0c27a', '#f5f6fa', '#1b2a4d', '#dfe3f0')],
    ['reuni-sunset', 'reuni', 'Retro Sunset', 'bold', 'playful', T('#e4572e', '#f3a712', '#fff6ea', '#3b2418', '#fde3c8')],
    ['reuni-batch', 'reuni', 'Batch Modern', 'modern', 'modern', T('#6247aa', '#2ec4b6', '#f6f4fb', '#251a45', '#e4def5')],
    ['resmi-navy', 'resmi', 'Corporate Navy', 'minimal', 'clean', T('#1f3a5f', '#b08d57', '#f8f9fb', '#1a2a40', '#e3e8f0')],
    ['resmi-charcoal', 'resmi', 'Charcoal Gold', 'frame', 'classic', T('#2b2b2b', '#c5a253', '#f9f7f2', '#222222', '#ebe6d8')],
    ['rapat-slate', 'rapat', 'Clean Slate', 'minimal', 'modern', T('#334e68', '#3ebd93', '#f7fafc', '#1f2d3d', '#e1e8ef')],
    ['rapat-teal', 'rapat', 'Teal Agenda', 'modern', 'clean', T('#0f766e', '#f59e0b', '#f2faf9', '#0f2f2c', '#d3efec')],
    ['opening-grand', 'opening', 'Grand Bold', 'bold', 'editorial', T('#b91c1c', '#fbbf24', '#fffaf5', '#2b1111', '#fde2d0')],
    ['opening-fresh', 'opening', 'Fresh Launch', 'soft', 'playful', T('#0e9594', '#ff7a59', '#f1fbfb', '#0b3534', '#d0f0ef')],
    ['lainnya-violet', 'lainnya', 'Violet Dusk', 'arch', 'modern', T('#7c3aed', '#f472b6', '#faf7ff', '#2a1c4d', '#ece4ff')],
    ['lainnya-mono', 'lainnya', 'Mono Elegan', 'minimal', 'elegant', T('#3d3d3d', '#a68a64', '#faf9f7', '#262626', '#ece9e3')]
  ];

  const TEMPLATES = RAW.map(r => {
    const cat = CATEGORIES.find(c => c.id === r[1]);
    return { id: r[0], cat: r[1], catLabel: cat.label, kicker: cat.kicker, name: r[2], style: r[3], font: r[4], theme: r[5],
      defaults: { title: TEXT[r[1]][0], opening: TEXT[r[1]][1], description: TEXT[r[1]][2] } };
  });
  const byId = id => TEMPLATES.find(t => t.id === id);

  // Data awal proyek baru: isi teks dari template, identitas (nama, tanggal, lokasi) dikosongkan
  function newData(tpl) {
    return Object.assign(I.baseData(), {
      style: tpl.style, font: tpl.font, theme: Object.assign({}, tpl.theme), kicker: tpl.kicker,
      title: tpl.defaults.title, opening: tpl.defaults.opening, description: tpl.defaults.description
    });
  }
  // Data contoh HANYA untuk pratinjau template di galeri (tidak pernah disimpan sebagai proyek)
  function sampleData(tpl) {
    const s = SAMPLE[tpl.cat];
    return Object.assign(newData(tpl), {
      host: s[0], date: s[1], start: '10:00', end: '13:00', venue: 'Nama Tempat', address: 'Alamat lengkap acara'
    });
  }
  function applyTemplate(data, tpl) {
    data.style = tpl.style; data.font = tpl.font; data.theme = Object.assign({}, tpl.theme); data.kicker = tpl.kicker;
    return data;
  }

  Object.assign(I, { CATEGORIES, TEMPLATES, templateById: byId, newData, sampleData, applyTemplate });
})(window);

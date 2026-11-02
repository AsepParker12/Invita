/* Invita - daftar kategori, contoh kalimat, dan template (24 desain) */
(function (g) {
  'use strict';
  const I = g.Invita;

  const CATEGORIES = [
    { id: 'wedding', label: 'Pernikahan', kicker: 'Undangan Pernikahan' },
    { id: 'birthday', label: 'Ulang Tahun', kicker: 'Undangan Ulang Tahun' },
    { id: 'aqiqah', label: 'Aqiqah', kicker: 'Undangan Aqiqah' },
    { id: 'khitanan', label: 'Khitanan', kicker: 'Undangan Khitanan' },
    { id: 'wisuda', label: 'Wisuda', kicker: 'Undangan Wisuda' },
    { id: 'keluarga', label: 'Acara Keluarga', kicker: 'Undangan Keluarga' },
    { id: 'pengajian', label: 'Pengajian', kicker: 'Undangan Pengajian' },
    { id: 'reuni', label: 'Reuni', kicker: 'Undangan Reuni' },
    { id: 'resmi', label: 'Acara Resmi', kicker: 'Undangan Resmi' },
    { id: 'rapat', label: 'Rapat', kicker: 'Undangan Rapat' },
    { id: 'opening', label: 'Grand Opening', kicker: 'Grand Opening' },
    { id: 'lainnya', label: 'Lainnya', kicker: 'Undangan' }
  ];

  const SALAM = "Assalamu'alaikum Warahmatullahi Wabarakatuh";
  const WAS = "Wassalamu'alaikum Warahmatullahi Wabarakatuh";

  // Tiap kategori punya beberapa contoh kalimat. Pengguna bisa mengganti lewat tombol di editor.
  // Bentuk: [judul, kalimat pembuka, isi undangan, penutup]
  const TEXTS = {
    wedding: [
      ['The Wedding of', SALAM + '.\nDengan memohon rahmat dan ridho Allah SWT, kami bermaksud menyelenggarakan pernikahan putra-putri kami.',
        'Merupakan kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu kepada kedua mempelai.',
        'Atas kehadiran dan doa restunya, kami mengucapkan terima kasih.\n' + WAS + '.'],
      ['Kami Menikah', 'Dua insan, satu tujuan. Dengan penuh syukur, kami akan memulai perjalanan baru sebagai suami istri.',
        'Kami mengundang Anda untuk hadir dan berbagi kebahagiaan di hari istimewa kami.',
        'Kehadiran dan doa Anda adalah hadiah terindah bagi kami. Sampai jumpa di hari bahagia!']
    ],
    birthday: [
      ['Birthday Party', 'Bertambah usia, bertambah syukur. Yuk, rayakan bersama kami!',
        'Akan ada makanan enak, permainan seru, dan banyak tawa. Kehadiranmu membuat hari ini jadi lebih spesial.',
        'Ditunggu kehadirannya ya. Sampai jumpa di hari bahagia!'],
      ['Anda Diundang', 'Satu tahun lebih bijak, satu alasan lagi untuk berkumpul.',
        'Kami mengadakan acara sederhana untuk merayakan hari ulang tahun. Datang dan rayakan bersama kami.',
        'Terima kasih sudah menjadi bagian dari cerita tahun ini.']
    ],
    aqiqah: [
      ['Syukuran Aqiqah', SALAM + '.\nAlhamdulillah, atas karunia Allah SWT telah lahir buah hati kami. Sebagai wujud syukur, kami mengadakan aqiqah.',
        'Kami mengundang Bapak/Ibu/Saudara/i untuk hadir dan mendoakan agar ananda tumbuh menjadi anak yang sholeh/sholehah, berbakti, dan bermanfaat bagi sesama.',
        'Atas kehadiran dan doanya, kami ucapkan Jazakumullahu khairan katsiran.'],
      ['Tasyakuran Kelahiran', 'Dengan penuh rasa syukur, kami menyambut kehadiran anggota baru dalam keluarga kami.',
        'Kami mengundang Anda untuk berbagi kebahagiaan dan mendoakan ananda dalam acara aqiqah.',
        'Terima kasih atas doa dan kehadirannya.']
    ],
    khitanan: [
      ['Syukuran Khitanan', SALAM + '.\nDengan mengucap syukur kepada Allah SWT, kami akan mengkhitankan putra kami.',
        'Kami mengundang Bapak/Ibu/Saudara/i untuk hadir dan mendoakan agar ananda menjadi anak yang sehat, sholeh, dan berbakti kepada orang tua.',
        'Atas kehadiran dan doanya, kami ucapkan terima kasih.\n' + WAS + '.'],
      ['Acara Khitanan', 'Anak kami tumbuh semakin besar. Kami ingin berbagi rasa syukur ini bersama keluarga dan sahabat.',
        'Mohon kehadiran dan doa Anda agar acara khitanan berjalan lancar dan ananda diberi kesehatan.',
        'Terima kasih atas kehadirannya.']
    ],
    wisuda: [
      ['Syukuran Wisuda', 'Setelah perjalanan panjang penuh perjuangan, dengan penuh syukur kami mengundang Anda untuk merayakan kelulusan ini.',
        'Terima kasih kepada keluarga, dosen, dan sahabat yang telah mendukung. Kehadiran dan doa Anda akan melengkapi kebahagiaan hari ini.',
        'Sampai jumpa di hari kelulusan. Salam hangat.'],
      ['Graduation Day', 'Skripsi selesai, toga siap dipakai. Saatnya merayakan.',
        'Mari berkumpul untuk berbagi cerita, makan bersama, dan mengabadikan momen ini.',
        'Terima kasih sudah menemani prosesnya sampai di titik ini.']
    ],
    keluarga: [
      ['Silaturahmi Keluarga', 'Sudah lama kita tidak berkumpul. Mari luangkan waktu untuk bertemu, makan bersama, dan mempererat tali kekeluargaan.',
        'Acara ini diadakan secara kekeluargaan. Jangan lupa mengajak anggota keluarga lainnya agar suasana semakin hangat.',
        'Kami tunggu kedatangannya. Sampai jumpa!'],
      ['Kumpul Keluarga', 'Dari dekat atau jauh, mari berkumpul dalam satu meja.',
        'Siapkan cerita terbaikmu. Akan ada makan bersama, foto keluarga, dan obrolan santai.',
        'Datang ya, tanpa kehadiranmu rasanya kurang lengkap.']
    ],
    pengajian: [
      ['Pengajian Akbar', SALAM + '.\nDengan mengharap ridho Allah SWT, kami mengundang Bapak/Ibu/Saudara/i untuk menghadiri pengajian.',
        'Semoga majelis ilmu ini menambah keimanan, mempererat ukhuwah, dan membawa keberkahan bagi kita semua.',
        'Atas kehadirannya kami ucapkan terima kasih. Jazakumullahu khairan.'],
      ['Majelis Taklim', 'Mari hadiri majelis ilmu untuk menambah wawasan dan mempererat silaturahmi.',
        'Kegiatan ini terbuka untuk umum. Silakan mengajak keluarga, tetangga, dan sahabat.',
        'Semoga Allah SWT membalas kehadiran Anda dengan kebaikan.']
    ],
    reuni: [
      ['Reuni Akbar', 'Dulu satu kelas, sekarang punya cerita masing-masing. Saatnya bertemu lagi!',
        'Mari bernostalgia, bertukar kabar, dan mengenang masa-masa yang tak terlupakan. Ajak juga teman-teman lain yang belum sempat terhubung.',
        'Jangan sampai ketinggalan. Sampai jumpa di reuni!'],
      ['Kita Kumpul Lagi', 'Waktu terus berjalan, tapi pertemanan kita tidak ikut berlalu.',
        'Kami mengundang seluruh teman seperjuangan untuk hadir dan merayakan pertemuan ini bersama.',
        'Konfirmasi kehadiran ya, supaya kami bisa menyiapkan semuanya.']
    ],
    resmi: [
      ['Dengan Hormat', 'Dengan hormat,\nKami mengundang Bapak/Ibu untuk menghadiri acara yang akan diselenggarakan pada:',
        'Mengingat pentingnya acara ini, kami mohon kehadiran Bapak/Ibu tepat waktu dengan berpakaian sesuai ketentuan.',
        'Atas perhatian dan kehadiran Bapak/Ibu, kami ucapkan terima kasih.'],
      ['Undangan Kehormatan', 'Merupakan kehormatan bagi kami apabila Bapak/Ibu berkenan hadir dalam acara kami.',
        'Kehadiran Bapak/Ibu akan memberi arti penting bagi kelancaran dan keberhasilan acara ini.',
        'Hormat kami,']
    ],
    rapat: [
      ['Rapat Koordinasi', 'Dengan hormat,\nSehubungan dengan agenda yang perlu dibahas bersama, kami mengundang Bapak/Ibu untuk menghadiri rapat sebagai berikut.',
        'Mohon membawa bahan atau data pendukung yang diperlukan dan hadir tepat waktu.',
        'Atas kehadirannya diucapkan terima kasih.'],
      ['Rapat Bulanan', 'Mari duduk bersama untuk meninjau capaian dan merencanakan langkah berikutnya.',
        'Siapkan laporan singkat dan usulan Anda. Rapat akan dimulai tepat waktu.',
        'Terima kasih atas partisipasinya.']
    ],
    opening: [
      ['Grand Opening', 'Setelah persiapan yang panjang, akhirnya kami siap menyambut Anda.',
        'Datang dan nikmati menu spesial, promo pembukaan, serta hadiah menarik untuk pengunjung pertama.',
        'Kami tunggu kedatangan Anda di hari pertama kami buka.'],
      ['Kami Resmi Buka', 'Sebuah tempat baru, dengan cerita baru, dan kami ingin Anda jadi tamu pertama.',
        'Rasakan suasana baru, produk pilihan, dan sambutan hangat dari tim kami.',
        'Sampai jumpa di hari pembukaan!']
    ],
    lainnya: [
      ['Anda Diundang', 'Dengan senang hati kami mengundang Anda untuk hadir pada acara kami.',
        'Kehadiran Anda akan membuat acara ini semakin berkesan.',
        'Terima kasih, sampai jumpa di acara!'],
      ['Mari Berkumpul', 'Ada acara yang ingin kami bagikan bersama Anda.',
        'Silakan datang dan nikmati kebersamaan ini. Detail acara ada di bawah.',
        'Kami menanti kehadiran Anda.']
    ]
  };
  const SAMPLE = {
    wedding: ['Rina Setiawati & Dimas Anggara', '2027-06-12'], birthday: ['Alya ke-7', '2027-03-20'], aqiqah: ['Muhammad Aris Pratama', '2027-02-14'],
    khitanan: ['Ahmad Fauzan', '2027-04-03'], wisuda: ['Nadia Putri, S.Pd.', '2027-08-21'], keluarga: ['Keluarga Besar Harahap', '2027-01-09'],
    pengajian: ['Ustadz Abdullah', '2027-05-07'], reuni: ['Angkatan 2007', '2027-07-17'], resmi: ['PT Maju Bersama', '2027-09-02'],
    rapat: ['Divisi Operasional', '2027-02-23'], opening: ['Kopi Senja', '2027-03-06'], lainnya: ['Nama Penyelenggara', '2027-05-15']
  };

  const T = (p, a, bg, t, soft) => ({ primary: p, accent: a, bg: bg, text: t, soft: soft });
  // [id, kategori, nama, gaya, font, tema, {flow: scroll|tap, anim: rise|slide|zoom|fade, pat, flora}]
  const RAW = [
    ['wedding-rosegold', 'wedding', 'Rose Gold', 'frame', 'romantic', T('#b76e79', '#c9a227', '#fff8f5', '#4a3436', '#f6e3df'), { flow: 'scroll', anim: 'rise', pat: 'leaf', flora: true }],
    ['wedding-emerald', 'wedding', 'Emerald Arch', 'arch', 'signature', T('#1f5b4b', '#c8a45c', '#f5f8f4', '#1d3a31', '#e0ece5'), { flow: 'tap', anim: 'fade', pat: 'leaf', flora: true }],
    ['birthday-confetti', 'birthday', 'Confetti Pop', 'bold', 'playful', T('#ff5d8f', '#ffc93c', '#fff7fb', '#3a2342', '#ffe3ee'), { flow: 'tap', anim: 'zoom', pat: 'confetti', flora: false }],
    ['birthday-sky', 'birthday', 'Sky Party', 'soft', 'modern', T('#3a86ff', '#ffbe0b', '#f3f8ff', '#1b2a49', '#dbe9ff'), { flow: 'scroll', anim: 'slide', pat: 'confetti', flora: false }],
    ['aqiqah-pastel', 'aqiqah', 'Pastel Berkah', 'soft', 'parisienne', T('#6f9f99', '#e0b97d', '#f6fbfa', '#2f4a47', '#dcefec'), { flow: 'scroll', anim: 'fade', pat: 'dots', flora: true }],
    ['aqiqah-gold', 'aqiqah', 'Gold Crescent', 'frame', 'classic', T('#2e4a6b', '#d4af37', '#f8f6ef', '#20344a', '#e8e2cf'), { flow: 'tap', anim: 'rise', pat: 'star', flora: false }],
    ['khitanan-biru', 'khitanan', 'Biru Ceria', 'modern', 'clean', T('#1d6fa5', '#f2a541', '#f2f8fb', '#17364c', '#d8eaf4'), { flow: 'scroll', anim: 'slide', pat: 'star', flora: false }],
    ['khitanan-sage', 'khitanan', 'Sage Minimal', 'minimal', 'editorial', T('#5c7a5b', '#b08968', '#f7f8f3', '#2c3a2b', '#e4eadb'), { flow: 'tap', anim: 'fade', pat: 'none', flora: true }],
    ['wisuda-navy', 'wisuda', 'Navy Gold', 'bold', 'editorial', T('#14213d', '#fca311', '#f7f7f9', '#14213d', '#e5e7ee'), { flow: 'scroll', anim: 'zoom', pat: 'lines', flora: false }],
    ['wisuda-maroon', 'wisuda', 'Toga Maroon', 'frame', 'luxe', T('#6d1a36', '#d4a574', '#fbf6f4', '#3b1020', '#f0dfda'), { flow: 'tap', anim: 'slide', pat: 'none', flora: false }],
    ['keluarga-terakota', 'keluarga', 'Terakota Hangat', 'arch', 'romantic', T('#c1664a', '#e0a96d', '#fdf6f0', '#4a2a20', '#f6e0d3'), { flow: 'scroll', anim: 'rise', pat: 'leaf', flora: true }],
    ['keluarga-taman', 'keluarga', 'Taman Hijau', 'soft', 'clean', T('#4f8a5b', '#f2c14e', '#f4faf3', '#223a29', '#dcefd9'), { flow: 'tap', anim: 'slide', pat: 'leaf', flora: true }],
    ['pengajian-hijau', 'pengajian', 'Hijau Teduh', 'frame', 'elegant', T('#1b5e48', '#c9a74d', '#f4f8f5', '#163a2e', '#dcebe3'), { flow: 'scroll', anim: 'fade', pat: 'star', flora: false }],
    ['pengajian-malam', 'pengajian', 'Biru Malam', 'arch', 'classic', T('#243b6b', '#e0c27a', '#f5f6fa', '#1b2a4d', '#dfe3f0'), { flow: 'tap', anim: 'rise', pat: 'star', flora: false }],
    ['reuni-sunset', 'reuni', 'Retro Sunset', 'bold', 'playful', T('#e4572e', '#f3a712', '#fff6ea', '#3b2418', '#fde3c8'), { flow: 'scroll', anim: 'slide', pat: 'confetti', flora: false }],
    ['reuni-batch', 'reuni', 'Batch Modern', 'modern', 'modern', T('#6247aa', '#2ec4b6', '#f6f4fb', '#251a45', '#e4def5'), { flow: 'tap', anim: 'zoom', pat: 'dots', flora: false }],
    ['resmi-navy', 'resmi', 'Corporate Navy', 'minimal', 'clean', T('#1f3a5f', '#b08d57', '#f8f9fb', '#1a2a40', '#e3e8f0'), { flow: 'scroll', anim: 'fade', pat: 'lines', flora: false }],
    ['resmi-charcoal', 'resmi', 'Charcoal Gold', 'frame', 'classic', T('#2b2b2b', '#c5a253', '#f9f7f2', '#222222', '#ebe6d8'), { flow: 'tap', anim: 'fade', pat: 'none', flora: false }],
    ['rapat-slate', 'rapat', 'Clean Slate', 'minimal', 'modern', T('#334e68', '#3ebd93', '#f7fafc', '#1f2d3d', '#e1e8ef'), { flow: 'scroll', anim: 'rise', pat: 'dots', flora: false }],
    ['rapat-teal', 'rapat', 'Teal Agenda', 'modern', 'luxe', T('#0f766e', '#f59e0b', '#f2faf9', '#0f2f2c', '#d3efec'), { flow: 'tap', anim: 'slide', pat: 'lines', flora: false }],
    ['opening-grand', 'opening', 'Grand Bold', 'bold', 'editorial', T('#b91c1c', '#fbbf24', '#fffaf5', '#2b1111', '#fde2d0'), { flow: 'tap', anim: 'zoom', pat: 'sparkle', flora: false }],
    ['opening-fresh', 'opening', 'Fresh Launch', 'soft', 'playful', T('#0e9594', '#ff7a59', '#f1fbfb', '#0b3534', '#d0f0ef'), { flow: 'scroll', anim: 'zoom', pat: 'sparkle', flora: false }],
    ['lainnya-violet', 'lainnya', 'Violet Dusk', 'arch', 'modern', T('#7c3aed', '#f472b6', '#faf7ff', '#2a1c4d', '#ece4ff'), { flow: 'scroll', anim: 'rise', pat: 'sparkle', flora: false }],
    ['lainnya-mono', 'lainnya', 'Mono Elegan', 'minimal', 'elegant', T('#3d3d3d', '#a68a64', '#faf9f7', '#262626', '#ece9e3'), { flow: 'tap', anim: 'fade', pat: 'none', flora: false }]
  ];

  const BISM_CATS = ['wedding', 'aqiqah', 'khitanan', 'pengajian'];
  const FLOW_LABEL = { scroll: 'Gulir', tap: 'Ketuk' };
  const ANIM_LABEL = { rise: 'Naik', slide: 'Geser', zoom: 'Zoom', fade: 'Pudar' };

  const TEMPLATES = RAW.map(r => {
    const cat = CATEGORIES.find(c => c.id === r[1]);
    const v = TEXTS[r[1]][0];
    return Object.assign({ id: r[0], cat: r[1], catLabel: cat.label, kicker: cat.kicker, name: r[2], style: r[3], font: r[4], theme: r[5],
      defaults: { title: v[0], opening: v[1], description: v[2], closing: v[3] } }, r[6]);
  });
  const byId = id => TEMPLATES.find(t => t.id === id);
  const textVariants = cat => (TEXTS[cat] || TEXTS.lainnya).map(v => ({ title: v[0], opening: v[1], description: v[2], closing: v[3] }));

  function applyTemplate(data, tpl) {
    data.style = tpl.style; data.font = tpl.font; data.theme = Object.assign({}, tpl.theme); data.kicker = tpl.kicker;
    data.art = tpl.cat; data.bism = BISM_CATS.includes(tpl.cat);
    data.flow = tpl.flow; data.anim = tpl.anim; data.pat = tpl.pat; data.flora = tpl.flora;
    return data;
  }
  // Data awal proyek baru: teks dari template, identitas (nama, tanggal, lokasi) dikosongkan
  function newData(tpl) {
    const d = applyTemplate(I.baseData(), tpl);
    d.title = tpl.defaults.title; d.opening = tpl.defaults.opening; d.description = tpl.defaults.description; d.closing = tpl.defaults.closing;
    return d;
  }
  // Data contoh HANYA untuk pratinjau template di galeri (tidak pernah disimpan sebagai proyek)
  function sampleData(tpl) {
    const s = SAMPLE[tpl.cat];
    return Object.assign(newData(tpl), { host: s[0], date: s[1], start: '10:00', end: '13:00', venue: 'Nama Tempat', address: 'Alamat lengkap acara' });
  }

  Object.assign(I, { CATEGORIES, TEMPLATES, FLOW_LABEL, ANIM_LABEL, templateById: byId, textVariants, newData, sampleData, applyTemplate });
})(window);

/* Invita - daftar kategori, contoh kalimat, dan template (120 desain: 12 kategori x 10 template) */
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

  // Tema warna: utama, aksen, latar, teks, lembut
  const T = (p, a, bg, t, soft) => ({ primary: p, accent: a, bg: bg, text: t, soft: soft });
  // Satu baris = satu template: id, kategori, nama (singkat), gaya, font, tema, alur (scroll|tap), animasi (rise|slide|zoom|fade), pola, bunga
  const R = (id, cat, name, style, font, theme, flow, anim, pat, flora) => [id, cat, name, style, font, theme, { flow: flow, anim: anim, pat: pat, flora: flora }];
  // ID lama dipertahankan supaya proyek yang sudah tersimpan tetap terbaca
  const RAW = [
    // Pernikahan
    R('wedding-rosegold', 'wedding', 'Rose Gold', 'frame', 'romantic', T('#b76e79', '#c9a227', '#fff8f5', '#4a3436', '#f6e3df'), 'scroll', 'rise', 'leaf', true),
    R('wedding-emerald', 'wedding', 'Emerald', 'arch', 'signature', T('#1f5b4b', '#c8a45c', '#f5f8f4', '#1d3a31', '#e0ece5'), 'tap', 'fade', 'leaf', true),
    R('wedding-burgundy', 'wedding', 'Burgundy', 'frame', 'script', T('#6b1e2e', '#c8a45c', '#fbf5f3', '#3a1219', '#f1dede'), 'tap', 'slide', 'none', true),
    R('wedding-champagne', 'wedding', 'Champagne', 'minimal', 'luxe', T('#9c7a4d', '#d6bf94', '#fcf9f3', '#3f3426', '#f1e8d6'), 'scroll', 'fade', 'none', false),
    R('wedding-sage', 'wedding', 'Sage', 'soft', 'parisienne', T('#6b8460', '#d9b98a', '#f6f8f2', '#2f3b29', '#e3ead9'), 'tap', 'rise', 'leaf', true),
    R('wedding-blush', 'wedding', 'Blush', 'arch', 'romantic', T('#b9627f', '#e8c27a', '#fff6f8', '#4d2b36', '#fadfe6'), 'scroll', 'slide', 'dots', true),
    R('wedding-dustyblue', 'wedding', 'Dusty Blue', 'frame', 'elegant', T('#5f7f9e', '#d3b98a', '#f4f7fa', '#26364a', '#dce6ef'), 'tap', 'zoom', 'dots', false),
    R('wedding-terracotta', 'wedding', 'Terracotta', 'arch', 'signature', T('#b85c3e', '#e0b27a', '#fdf5ee', '#47261b', '#f5dfd0'), 'scroll', 'rise', 'leaf', true),
    R('wedding-lavender', 'wedding', 'Lavender', 'soft', 'romantic', T('#7e6aa8', '#d9b4c8', '#f9f6fc', '#2f2548', '#e9e1f4'), 'tap', 'fade', 'sparkle', true),
    R('wedding-midnight', 'wedding', 'Midnight', 'frame', 'classic', T('#1f2a4d', '#c9a24f', '#f6f6fa', '#1a2140', '#e0e3ef'), 'scroll', 'zoom', 'star', false),
    // Ulang tahun
    R('birthday-confetti', 'birthday', 'Confetti', 'bold', 'playful', T('#ff5d8f', '#ffc93c', '#fff7fb', '#3a2342', '#ffe3ee'), 'tap', 'zoom', 'confetti', false),
    R('birthday-sky', 'birthday', 'Sky', 'soft', 'modern', T('#3a86ff', '#ffbe0b', '#f3f8ff', '#1b2a49', '#dbe9ff'), 'scroll', 'slide', 'confetti', false),
    R('birthday-balloon', 'birthday', 'Balloon', 'bold', 'playful', T('#e63946', '#f9c74f', '#fff8f0', '#3b1a1d', '#fde0dc'), 'tap', 'rise', 'dots', false),
    R('birthday-candy', 'birthday', 'Candy', 'soft', 'playful', T('#c24d9f', '#7fd6cc', '#fff5fb', '#43183a', '#fbdcf0'), 'scroll', 'fade', 'sparkle', false),
    R('birthday-sunny', 'birthday', 'Sunny', 'modern', 'clean', T('#cc6a05', '#f2a900', '#fffaf0', '#452606', '#ffe9c4'), 'scroll', 'zoom', 'dots', false),
    R('birthday-mintpop', 'birthday', 'Mint Pop', 'minimal', 'modern', T('#23867a', '#ff9f6b', '#f2fbf9', '#103f3a', '#d3f0ea'), 'tap', 'slide', 'none', false),
    R('birthday-galaxy', 'birthday', 'Galaxy', 'bold', 'editorial', T('#3d2c8d', '#f7b801', '#f6f4ff', '#1f1550', '#e2dcfa'), 'tap', 'zoom', 'sparkle', false),
    R('birthday-safari', 'birthday', 'Safari', 'frame', 'editorial', T('#7a5c2e', '#e8a33d', '#fbf6ea', '#3a2a12', '#f0e3c3'), 'scroll', 'rise', 'leaf', true),
    R('birthday-unicorn', 'birthday', 'Unicorn', 'soft', 'playful', T('#9b6bd6', '#ff8fb1', '#fbf7ff', '#34205a', '#eadcfb'), 'tap', 'fade', 'sparkle', false),
    R('birthday-retro', 'birthday', 'Retro', 'bold', 'editorial', T('#d1495b', '#edae49', '#fdf6ec', '#30323d', '#f6e0c4'), 'scroll', 'slide', 'lines', false),
    // Aqiqah
    R('aqiqah-pastel', 'aqiqah', 'Pastel', 'soft', 'parisienne', T('#6f9f99', '#e0b97d', '#f6fbfa', '#2f4a47', '#dcefec'), 'scroll', 'fade', 'dots', true),
    R('aqiqah-gold', 'aqiqah', 'Hilal', 'frame', 'classic', T('#2e4a6b', '#d4af37', '#f8f6ef', '#20344a', '#e8e2cf'), 'tap', 'rise', 'star', false),
    R('aqiqah-babyblue', 'aqiqah', 'Baby Blue', 'soft', 'luxe', T('#4a7fb8', '#f0c987', '#f3f8fd', '#1f3552', '#d9e8f7'), 'scroll', 'slide', 'dots', false),
    R('aqiqah-blossom', 'aqiqah', 'Blossom', 'arch', 'romantic', T('#c0617f', '#e8c58b', '#fff5f7', '#4d2a37', '#f9dce4'), 'tap', 'fade', 'leaf', true),
    R('aqiqah-mint', 'aqiqah', 'Mint', 'minimal', 'luxe', T('#3f8a73', '#e6c27e', '#f2faf6', '#1f4034', '#d5ede3'), 'scroll', 'rise', 'none', true),
    R('aqiqah-lullaby', 'aqiqah', 'Lullaby', 'soft', 'parisienne', T('#8c7bb8', '#f2c0a8', '#f8f6fc', '#2f2850', '#e6e0f4'), 'tap', 'zoom', 'sparkle', false),
    R('aqiqah-sand', 'aqiqah', 'Sand', 'minimal', 'editorial', T('#9a7650', '#8fa68a', '#fbf7f0', '#41311f', '#efe3d0'), 'scroll', 'fade', 'none', true),
    R('aqiqah-starlight', 'aqiqah', 'Starlight', 'modern', 'modern', T('#27407a', '#e8b93a', '#f5f7fc', '#16264f', '#dde4f4'), 'tap', 'slide', 'star', false),
    R('aqiqah-olive', 'aqiqah', 'Olive', 'frame', 'elegant', T('#6f7d45', '#e3b86b', '#f7f8ee', '#2f3719', '#e6ebcf'), 'scroll', 'rise', 'leaf', true),
    R('aqiqah-cloud', 'aqiqah', 'Cloud', 'arch', 'clean', T('#5a8cab', '#f4b8b0', '#f4f9fc', '#233e52', '#dbeaf3'), 'tap', 'fade', 'dots', false),
    // Khitanan
    R('khitanan-biru', 'khitanan', 'Biru Ceria', 'modern', 'clean', T('#1d6fa5', '#f2a541', '#f2f8fb', '#17364c', '#d8eaf4'), 'scroll', 'slide', 'star', false),
    R('khitanan-sage', 'khitanan', 'Sage', 'minimal', 'editorial', T('#5c7a5b', '#b08968', '#f7f8f3', '#2c3a2b', '#e4eadb'), 'tap', 'fade', 'none', true),
    R('khitanan-royal', 'khitanan', 'Royal', 'frame', 'classic', T('#1c3f94', '#e0b64a', '#f4f6fc', '#142a63', '#dce3f6'), 'tap', 'rise', 'star', false),
    R('khitanan-petualang', 'khitanan', 'Petualang', 'bold', 'modern', T('#2f7d5b', '#f2a93b', '#f3faf5', '#173b2b', '#d6eedf'), 'scroll', 'zoom', 'leaf', false),
    R('khitanan-langit', 'khitanan', 'Langit', 'soft', 'clean', T('#237cba', '#f5b942', '#f1f8fd', '#123a56', '#d4eafa'), 'tap', 'slide', 'dots', false),
    R('khitanan-emerald', 'khitanan', 'Emerald', 'arch', 'luxe', T('#0d5c4a', '#d4b062', '#f3f8f5', '#0e3a2f', '#d6e9e0'), 'scroll', 'fade', 'star', false),
    R('khitanan-sahara', 'khitanan', 'Sahara', 'frame', 'elegant', T('#b7792b', '#3f6e8c', '#fcf5e9', '#4a2f0f', '#f4e1bd'), 'tap', 'rise', 'lines', false),
    R('khitanan-kobalt', 'khitanan', 'Kobalt', 'bold', 'modern', T('#2a4fd6', '#ffc233', '#f4f6ff', '#14246e', '#dbe2fb'), 'scroll', 'zoom', 'sparkle', false),
    R('khitanan-teduh', 'khitanan', 'Teduh', 'minimal', 'clean', T('#4c7f8a', '#e5b97a', '#f3f9f9', '#1b3d44', '#d6eaed'), 'tap', 'fade', 'none', false),
    R('khitanan-rimba', 'khitanan', 'Rimba', 'soft', 'editorial', T('#3b5d3a', '#c9a05a', '#f6f8f1', '#1f301f', '#e1e9d3'), 'scroll', 'slide', 'leaf', true),
    // Wisuda
    R('wisuda-navy', 'wisuda', 'Navy Gold', 'bold', 'editorial', T('#14213d', '#fca311', '#f7f7f9', '#14213d', '#e5e7ee'), 'scroll', 'zoom', 'lines', false),
    R('wisuda-maroon', 'wisuda', 'Maroon', 'frame', 'luxe', T('#6d1a36', '#d4a574', '#fbf6f4', '#3b1020', '#f0dfda'), 'tap', 'slide', 'none', false),
    R('wisuda-forest', 'wisuda', 'Forest', 'frame', 'elegant', T('#1f4d3a', '#d8a93b', '#f4f8f4', '#14342a', '#dcebe2'), 'scroll', 'fade', 'star', false),
    R('wisuda-royal', 'wisuda', 'Royal', 'bold', 'classic', T('#2745a3', '#f0c040', '#f4f6fc', '#15275c', '#dbe2f6'), 'tap', 'rise', 'lines', false),
    R('wisuda-slate', 'wisuda', 'Slate', 'minimal', 'clean', T('#3f4f63', '#c8a165', '#f6f7f9', '#1e2733', '#e1e5ea'), 'scroll', 'rise', 'dots', false),
    R('wisuda-honor', 'wisuda', 'Honor', 'arch', 'editorial', T('#7b1e3a', '#e6c06a', '#fbf6f3', '#3a0f1c', '#f0dcd9'), 'tap', 'fade', 'star', false),
    R('wisuda-sunrise', 'wisuda', 'Sunrise', 'modern', 'modern', T('#cf5f1a', '#2c5f8a', '#fff7ef', '#4a2208', '#fde1c8'), 'scroll', 'slide', 'sparkle', false),
    R('wisuda-ivy', 'wisuda', 'Ivy', 'soft', 'luxe', T('#2f6b4f', '#b8956a', '#f5f9f5', '#17382a', '#d9ebdf'), 'tap', 'zoom', 'leaf', true),
    R('wisuda-pearl', 'wisuda', 'Pearl', 'minimal', 'elegant', T('#6e7f9b', '#e2c9a0', '#f8f9fb', '#242e42', '#e4e8f0'), 'scroll', 'fade', 'none', false),
    R('wisuda-blackgold', 'wisuda', 'Black Gold', 'bold', 'classic', T('#222222', '#d4af37', '#f8f6f0', '#1a1a1a', '#e9e5d8'), 'tap', 'zoom', 'star', false),
    // Acara keluarga
    R('keluarga-terakota', 'keluarga', 'Terakota', 'arch', 'romantic', T('#c1664a', '#e0a96d', '#fdf6f0', '#4a2a20', '#f6e0d3'), 'scroll', 'rise', 'leaf', true),
    R('keluarga-taman', 'keluarga', 'Taman', 'soft', 'clean', T('#4f8a5b', '#f2c14e', '#f4faf3', '#223a29', '#dcefd9'), 'tap', 'slide', 'leaf', true),
    R('keluarga-madu', 'keluarga', 'Madu', 'frame', 'luxe', T('#b0750f', '#7a5c3a', '#fff8e8', '#4a3208', '#fbe9bd'), 'scroll', 'fade', 'dots', false),
    R('keluarga-senja', 'keluarga', 'Senja', 'bold', 'playful', T('#d9623f', '#f2b441', '#fff4ea', '#4b1f12', '#fcdcc7'), 'tap', 'zoom', 'sparkle', false),
    R('keluarga-kayu', 'keluarga', 'Kayu', 'minimal', 'editorial', T('#7b5a3b', '#c8a26a', '#faf5ee', '#35261a', '#eadcc7'), 'scroll', 'rise', 'none', true),
    R('keluarga-pelangi', 'keluarga', 'Pelangi', 'soft', 'playful', T('#e0568c', '#4cb8c4', '#fff6fa', '#44203a', '#fbdce9'), 'tap', 'fade', 'confetti', false),
    R('keluarga-kebun', 'keluarga', 'Kebun', 'soft', 'romantic', T('#5d8a3e', '#e6b64f', '#f6faee', '#2b3d19', '#e0edcb'), 'scroll', 'slide', 'leaf', true),
    R('keluarga-kopi', 'keluarga', 'Kopi', 'frame', 'elegant', T('#6b4a37', '#d6a66a', '#faf4ee', '#33211a', '#eadbcc'), 'tap', 'rise', 'lines', false),
    R('keluarga-awan', 'keluarga', 'Awan', 'arch', 'clean', T('#4f84ae', '#f3c7a6', '#f5f9fc', '#233d54', '#dcebf5'), 'scroll', 'fade', 'dots', false),
    R('keluarga-rempah', 'keluarga', 'Rempah', 'modern', 'luxe', T('#a0662f', '#4f7a63', '#fbf3e6', '#412610', '#f1ddb9'), 'tap', 'slide', 'star', false),
    // Pengajian
    R('pengajian-hijau', 'pengajian', 'Hijau Teduh', 'frame', 'elegant', T('#1b5e48', '#c9a74d', '#f4f8f5', '#163a2e', '#dcebe3'), 'scroll', 'fade', 'star', false),
    R('pengajian-malam', 'pengajian', 'Biru Malam', 'arch', 'classic', T('#243b6b', '#e0c27a', '#f5f6fa', '#1b2a4d', '#dfe3f0'), 'tap', 'rise', 'star', false),
    R('pengajian-nur', 'pengajian', 'Nur', 'frame', 'luxe', T('#2f6f6a', '#e2c274', '#f2f9f8', '#123a37', '#d4ece9'), 'tap', 'fade', 'star', false),
    R('pengajian-zamrud', 'pengajian', 'Zamrud', 'arch', 'script', T('#0b5d4b', '#d9b45a', '#f2f8f5', '#0a3a2f', '#d3e8de'), 'scroll', 'slide', 'star', false),
    R('pengajian-fajar', 'pengajian', 'Fajar', 'soft', 'luxe', T('#c2703a', '#2f4f6f', '#fff6ec', '#4a2410', '#fbe0c6'), 'tap', 'rise', 'sparkle', false),
    R('pengajian-hikmah', 'pengajian', 'Hikmah', 'minimal', 'elegant', T('#5a4a8a', '#d9b86a', '#f7f5fc', '#2a2150', '#e5e0f3'), 'scroll', 'fade', 'lines', false),
    R('pengajian-madinah', 'pengajian', 'Madinah', 'frame', 'classic', T('#2f7a4d', '#e8d08a', '#f4faf4', '#1a4129', '#d9eedb'), 'tap', 'zoom', 'leaf', true),
    R('pengajian-safir', 'pengajian', 'Safir', 'bold', 'clean', T('#1f4f8a', '#d8b25a', '#f3f7fc', '#102c52', '#d8e5f5'), 'scroll', 'rise', 'star', false),
    R('pengajian-berkah', 'pengajian', 'Berkah', 'soft', 'luxe', T('#8a5a2b', '#2f6b55', '#fcf6ea', '#3f2610', '#f3e1bf'), 'tap', 'slide', 'dots', false),
    R('pengajian-mihrab', 'pengajian', 'Mihrab', 'arch', 'classic', T('#1f3b4d', '#c9a24f', '#f4f7f8', '#12252f', '#d8e3e8'), 'scroll', 'zoom', 'star', false),
    // Reuni
    R('reuni-sunset', 'reuni', 'Sunset', 'bold', 'playful', T('#e4572e', '#f3a712', '#fff6ea', '#3b2418', '#fde3c8'), 'scroll', 'slide', 'confetti', false),
    R('reuni-batch', 'reuni', 'Batch', 'modern', 'modern', T('#6247aa', '#2ec4b6', '#f6f4fb', '#251a45', '#e4def5'), 'tap', 'zoom', 'dots', false),
    R('reuni-vintage', 'reuni', 'Vintage', 'frame', 'editorial', T('#8b5e3c', '#c9a45c', '#f8f1e4', '#3b2a1a', '#ecdcc0'), 'scroll', 'fade', 'lines', false),
    R('reuni-kampus', 'reuni', 'Kampus', 'bold', 'clean', T('#1f4e8c', '#f2b632', '#f3f7fc', '#122b50', '#d9e5f5'), 'tap', 'rise', 'star', false),
    R('reuni-polaroid', 'reuni', 'Polaroid', 'soft', 'playful', T('#d1566b', '#5fa8a0', '#fff5f4', '#46202a', '#fadcd9'), 'scroll', 'rise', 'dots', false),
    R('reuni-seragam', 'reuni', 'Seragam', 'modern', 'modern', T('#c0392b', '#2c3e73', '#fdf6f3', '#3d1410', '#f5dcd5'), 'tap', 'slide', 'lines', false),
    R('reuni-alumni', 'reuni', 'Alumni', 'frame', 'elegant', T('#7a1f3d', '#d9b45a', '#faf4f2', '#391020', '#efdcd8'), 'scroll', 'zoom', 'none', false),
    R('reuni-kelas', 'reuni', 'Kelas', 'minimal', 'clean', T('#2f7a6a', '#f0b429', '#f2faf8', '#123a32', '#d4ece6'), 'tap', 'fade', 'dots', false),
    R('reuni-neon', 'reuni', 'Neon', 'bold', 'modern', T('#d81b7a', '#00a8c6', '#fdf4fa', '#3a0f2e', '#fbd8ec'), 'scroll', 'zoom', 'sparkle', false),
    R('reuni-sepia', 'reuni', 'Sepia', 'soft', 'luxe', T('#7a5a38', '#b0623a', '#faf3e8', '#33220f', '#eddcc0'), 'tap', 'slide', 'none', false),
    // Acara resmi
    R('resmi-navy', 'resmi', 'Navy', 'minimal', 'clean', T('#1f3a5f', '#b08d57', '#f8f9fb', '#1a2a40', '#e3e8f0'), 'scroll', 'fade', 'lines', false),
    R('resmi-charcoal', 'resmi', 'Charcoal', 'frame', 'classic', T('#2b2b2b', '#c5a253', '#f9f7f2', '#222222', '#ebe6d8'), 'tap', 'fade', 'none', false),
    R('resmi-burgundy', 'resmi', 'Burgundy', 'frame', 'elegant', T('#6b1f33', '#c8a45c', '#fbf6f4', '#35101c', '#f0dfdc'), 'scroll', 'rise', 'none', false),
    R('resmi-emerald', 'resmi', 'Emerald', 'minimal', 'luxe', T('#14533f', '#c9a74d', '#f4f8f5', '#0f3629', '#d9eadf'), 'tap', 'slide', 'lines', false),
    R('resmi-platinum', 'resmi', 'Platinum', 'modern', 'clean', T('#586274', '#8fa3bd', '#f7f8fa', '#232a36', '#e3e7ee'), 'scroll', 'fade', 'dots', false),
    R('resmi-bronze', 'resmi', 'Bronze', 'frame', 'classic', T('#8f5a2a', '#d4a85a', '#fbf6ee', '#3c260f', '#efe0c8'), 'tap', 'rise', 'star', false),
    R('resmi-prestige', 'resmi', 'Prestige', 'arch', 'editorial', T('#1c2b4a', '#d1ac5b', '#f6f7fa', '#121c33', '#dde2ee'), 'scroll', 'zoom', 'none', false),
    R('resmi-ivory', 'resmi', 'Ivory', 'minimal', 'elegant', T('#6d6252', '#c2a366', '#fbf9f4', '#2e281f', '#ece6d8'), 'tap', 'fade', 'none', false),
    R('resmi-teal', 'resmi', 'Teal', 'modern', 'modern', T('#1b6b73', '#e0b45c', '#f2f9f9', '#0e3a40', '#d3eaec'), 'scroll', 'slide', 'lines', false),
    R('resmi-graphite', 'resmi', 'Graphite', 'bold', 'clean', T('#3a3f47', '#4f8fb3', '#f6f7f8', '#1c1f24', '#e2e5e9'), 'tap', 'rise', 'dots', false),
    // Rapat
    R('rapat-slate', 'rapat', 'Slate', 'minimal', 'modern', T('#334e68', '#3ebd93', '#f7fafc', '#1f2d3d', '#e1e8ef'), 'scroll', 'rise', 'dots', false),
    R('rapat-teal', 'rapat', 'Agenda', 'modern', 'luxe', T('#0f766e', '#f59e0b', '#f2faf9', '#0f2f2c', '#d3efec'), 'tap', 'slide', 'lines', false),
    R('rapat-focus', 'rapat', 'Focus', 'modern', 'clean', T('#2563eb', '#f59e0b', '#f5f8ff', '#13254d', '#dbe6fc'), 'scroll', 'fade', 'none', false),
    R('rapat-board', 'rapat', 'Board', 'bold', 'modern', T('#1e293b', '#f97316', '#f6f7f9', '#0f172a', '#e2e8f0'), 'tap', 'zoom', 'lines', false),
    R('rapat-sync', 'rapat', 'Sync', 'minimal', 'modern', T('#7c3aed', '#10b981', '#f8f6fe', '#2a1766', '#e6defb'), 'scroll', 'slide', 'dots', false),
    R('rapat-briefing', 'rapat', 'Briefing', 'frame', 'clean', T('#0e7490', '#f5b61a', '#f1f9fb', '#0b3a47', '#d2edf3'), 'tap', 'rise', 'none', false),
    R('rapat-forum', 'rapat', 'Forum', 'modern', 'editorial', T('#9a3412', '#0f766e', '#fdf6f1', '#431607', '#f9dfd0'), 'scroll', 'rise', 'lines', false),
    R('rapat-round', 'rapat', 'Round', 'soft', 'clean', T('#4d7c0f', '#0ea5e9', '#f6faee', '#243a07', '#e1efc8'), 'tap', 'fade', 'dots', false),
    R('rapat-kantor', 'rapat', 'Kantor', 'minimal', 'editorial', T('#475569', '#d4a373', '#f7f8fa', '#1e2733', '#e3e7ec'), 'scroll', 'zoom', 'none', false),
    R('rapat-strategi', 'rapat', 'Strategi', 'bold', 'modern', T('#be123c', '#334155', '#fdf5f7', '#4c0519', '#fbd9e2'), 'tap', 'slide', 'lines', false),
    // Grand opening
    R('opening-grand', 'opening', 'Grand', 'bold', 'editorial', T('#b91c1c', '#fbbf24', '#fffaf5', '#2b1111', '#fde2d0'), 'tap', 'zoom', 'sparkle', false),
    R('opening-fresh', 'opening', 'Fresh', 'soft', 'playful', T('#0e9594', '#ff7a59', '#f1fbfb', '#0b3534', '#d0f0ef'), 'scroll', 'zoom', 'sparkle', false),
    R('opening-festive', 'opening', 'Festive', 'bold', 'playful', T('#c2185b', '#ffb300', '#fff4f8', '#4a0b2a', '#fbd5e5'), 'scroll', 'slide', 'confetti', false),
    R('opening-boutique', 'opening', 'Boutique', 'frame', 'luxe', T('#9d4e6a', '#d9b878', '#fcf5f7', '#43202f', '#f3dde5'), 'tap', 'fade', 'none', false),
    R('opening-kafe', 'opening', 'Kafe', 'soft', 'editorial', T('#6f4e37', '#e0a458', '#fbf5ee', '#33200f', '#eddcc7'), 'scroll', 'rise', 'dots', false),
    R('opening-tropis', 'opening', 'Tropis', 'bold', 'modern', T('#0b8a5c', '#f2b705', '#f1fbf6', '#0b3d2a', '#d0f0e0'), 'tap', 'zoom', 'leaf', true),
    R('opening-urban', 'opening', 'Urban', 'modern', 'modern', T('#374151', '#f43f5e', '#f6f7f9', '#111827', '#e3e6ea'), 'scroll', 'slide', 'lines', false),
    R('opening-spotlight', 'opening', 'Spotlight', 'bold', 'editorial', T('#1d1d3b', '#ffc300', '#f6f6fb', '#12122b', '#dedef0'), 'tap', 'fade', 'star', false),
    R('opening-fiesta', 'opening', 'Fiesta', 'soft', 'playful', T('#ea580c', '#14b8a6', '#fff6ee', '#4a1d05', '#fde0c8'), 'scroll', 'rise', 'confetti', false),
    R('opening-emas', 'opening', 'Emas', 'frame', 'classic', T('#a37a1a', '#1f3a5f', '#fdf8ea', '#3f2e07', '#f4e6b9'), 'tap', 'zoom', 'star', false),
    // Lainnya
    R('lainnya-violet', 'lainnya', 'Violet', 'arch', 'modern', T('#7c3aed', '#f472b6', '#faf7ff', '#2a1c4d', '#ece4ff'), 'scroll', 'rise', 'sparkle', false),
    R('lainnya-mono', 'lainnya', 'Mono', 'minimal', 'elegant', T('#3d3d3d', '#a68a64', '#faf9f7', '#262626', '#ece9e3'), 'tap', 'fade', 'none', false),
    R('lainnya-coral', 'lainnya', 'Coral', 'soft', 'playful', T('#d9534a', '#4fb3bf', '#fff6f4', '#4a1a15', '#fddcd7'), 'scroll', 'slide', 'dots', false),
    R('lainnya-ocean', 'lainnya', 'Ocean', 'modern', 'clean', T('#1d6fa5', '#f4b942', '#f2f8fc', '#0f3550', '#d5e8f5'), 'tap', 'zoom', 'lines', false),
    R('lainnya-amber', 'lainnya', 'Amber', 'frame', 'luxe', T('#b7791f', '#2f6fba', '#fffaeb', '#4a3207', '#fbecbf'), 'scroll', 'fade', 'none', false),
    R('lainnya-forest', 'lainnya', 'Forest', 'frame', 'elegant', T('#2f5d46', '#d3a85a', '#f4f8f4', '#173226', '#dbe9df'), 'tap', 'rise', 'leaf', true),
    R('lainnya-rose', 'lainnya', 'Rose', 'arch', 'romantic', T('#be4b6e', '#e2b979', '#fff5f7', '#4a1a2b', '#f9dbe3'), 'scroll', 'slide', 'none', true),
    R('lainnya-indigo', 'lainnya', 'Indigo', 'bold', 'modern', T('#3730a3', '#fbbf24', '#f5f5ff', '#1e1b5e', '#dcdbfa'), 'tap', 'zoom', 'star', false),
    R('lainnya-pine', 'lainnya', 'Pine', 'minimal', 'luxe', T('#1f5f5b', '#e9a23b', '#f1f9f8', '#0f3a37', '#d1eae7'), 'scroll', 'fade', 'none', false),
    R('lainnya-peony', 'lainnya', 'Peony', 'soft', 'parisienne', T('#c0577a', '#8aa889', '#fdf5f8', '#44202e', '#f7dce6'), 'tap', 'rise', 'leaf', true)
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

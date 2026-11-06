/* Invita Redesign V3 - semua kategori, nama pasangan, penghubung bebas, cerita berfoto, teks surat */
(function(){
'use strict';
const I=window.Invita;if(!I)return;
const SEP={amp:'&',heart:'♥',rings:'◉ ◉',infinity:'∞',and:'dan',spark:'✦',flower:'❀'};
const SALAM="Assalamu'alaikum Warahmatullahi Wabarakatuh",WAS="Wassalamu'alaikum Warahmatullahi Wabarakatuh";
/* Teks undangan bawaan. Bentuk: [judul, kalimat pembuka, isi undangan, penutup] */
const COPY={
 wedding:[
  ['Our Wedding',SALAM+'.\n“Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan pasangan untukmu dari jenismu sendiri, agar kamu merasa tenteram kepadanya.” (QS. Ar-Rum: 21)','Dengan penuh rasa syukur, kami mengundang Bapak/Ibu/Saudara/i untuk menghadiri hari pernikahan kami. Kehadiran dan doa restu Anda adalah kebahagiaan terbesar bagi kami.','Atas kehadiran dan doa restunya, kami ucapkan terima kasih yang sebesar-besarnya.\n'+WAS+'.'],
  ['Kami Menikah','Dari dua cerita yang berbeda, kini kami memilih untuk berjalan ke satu arah yang sama.','Tak lengkap rasanya tanpa orang-orang tersayang. Kami mengundang Anda untuk datang, berbagi tawa, dan menjadi saksi awal perjalanan baru kami.','Doa dan kehadiran Anda adalah hadiah terindah bagi kami. Sampai jumpa di hari bahagia!'],
  ['The Wedding of','Ada cinta yang tumbuh pelan, lalu yakin pada satu nama. Hari ini, kami ingin merayakannya bersama Anda.','Dengan segenap kebahagiaan, kami mengundang Anda untuk hadir dan melengkapi hari istimewa ini dengan senyum dan doa terbaik.','Terima kasih telah menjadi bagian dari cerita kami. Sampai bertemu di hari yang kami nantikan.'],
  ['Hari Bahagia Kami','Dengan penuh rasa syukur, kami mengundang Anda untuk menjadi bagian dari hari bahagia kami.','Kami akan mengikat janji dalam acara sederhana yang hangat. Kehadiran Anda akan melengkapi kebahagiaan kami.','Terima kasih atas doa dan kehadiran Anda. Semoga kebaikan kembali kepada Anda.'],
  ['Dua Hati Satu Tujuan','Dua hati, satu tujuan, dan sebuah perjalanan baru yang akan kami mulai bersama.','Kami mengundang Anda untuk menyaksikan awal perjalanan kami, berbagi doa, dan merayakannya bersama keluarga tercinta.','Doa restu Anda adalah bekal terbaik bagi langkah kami.'],
  ['Merayakan Cinta','Dengan penuh kebahagiaan, kami ingin berbagi momen istimewa ini bersama orang-orang terkasih.','Acara akan berlangsung sederhana namun hangat. Semoga Anda berkenan hadir dan berbagi senyum bersama kami.','Sampai jumpa, dan terima kasih telah ikut berbahagia bersama kami.'],
  ['Kisah Kami','Sebuah kisah cinta membawa kami menuju hari yang telah lama dinantikan.','Setelah perjalanan yang panjang, kini kami siap melangkah ke babak baru. Hadirlah dan saksikan awal kisah kami.','Terima kasih telah menjadi bagian dari kisah kami.'],
  ['Menuju Selamanya','Cinta yang tumbuh perlahan kini bersiap menjadi rumah untuk selamanya.','Dengan kerendahan hati, kami mengharapkan kehadiran dan doa restu Anda pada hari pernikahan kami.','Kehadiran Anda adalah hadiah yang tak ternilai bagi kami.'],
  ['Janji Setia','Hari ini kami mengikat janji, dan kami ingin Anda ada di sana.','Mohon kesediaan Anda hadir untuk memberi doa dan restu. Itu akan menjadi kenangan indah bagi kami.','Dengan penuh cinta, kami ucapkan terima kasih.']
 ],
 birthday:[
  ['Birthday Party','Bertambah usia, bertambah syukur, dan bertambah alasan untuk berkumpul bersama orang-orang tersayang.','Yuk, rayakan bersama kami! Ada makanan enak, permainan seru, dan banyak tawa yang menunggu. Kehadiranmu membuat hari ini jauh lebih spesial.','Ditunggu ya! Datang dengan senyum terbaik, sisanya biar kami yang siapkan.'],
  ['Anda Diundang','Satu tahun lebih bijak, satu babak lebih indah.','Kami mengadakan perayaan sederhana untuk menyambut hari ulang tahun. Datang, makan bersama, dan rayakan kebahagiaan ini bersama kami.','Terima kasih sudah menjadi bagian dari cerita tahun ini.']
 ],
 aqiqah:[
  ['Syukuran Aqiqah',SALAM+'.\nAlhamdulillah, dengan penuh rasa syukur atas lahirnya buah hati kami, kami mengadakan aqiqah sebagai wujud terima kasih kepada Allah SWT.','Kami mengundang Bapak/Ibu/Saudara/i untuk hadir dan mendoakan agar ananda tumbuh menjadi anak yang sholeh/sholehah, berbakti, dan bermanfaat bagi sesama.','Atas kehadiran dan doanya, kami ucapkan Jazakumullahu khairan katsiran.'],
  ['Tasyakuran Kelahiran','Dengan penuh syukur, kami menyambut kehadiran anggota baru yang melengkapi keluarga kami.','Kami mengundang Anda untuk berbagi kebahagiaan dan memanjatkan doa terbaik bagi ananda dalam acara aqiqah.','Terima kasih atas doa dan kehadirannya.']
 ],
 khitanan:[
  ['Syukuran Khitanan',SALAM+'.\nDengan mengucap syukur kepada Allah SWT, kami akan mengkhitankan putra kami tercinta.','Kami mengundang Bapak/Ibu/Saudara/i untuk hadir dan mendoakan agar ananda tumbuh menjadi anak yang sehat, sholeh, dan berbakti kepada orang tua.','Atas kehadiran dan doanya, kami ucapkan terima kasih.\n'+WAS+'.'],
  ['Acara Khitanan','Anak kami tumbuh semakin besar dan kuat. Kami ingin berbagi rasa syukur ini bersama keluarga dan sahabat.','Mohon kehadiran dan doa Anda agar acara khitanan berjalan lancar dan ananda diberi kesehatan serta kekuatan.','Terima kasih atas kehadirannya.']
 ],
 wisuda:[
  ['Syukuran Wisuda','Setelah perjalanan panjang yang penuh perjuangan, doa, dan air mata, akhirnya satu bab penting berhasil diselesaikan.','Dengan penuh syukur, kami mengundang Anda untuk merayakan kelulusan ini dan berbagi kebahagiaan bersama orang-orang yang telah menemani prosesnya.','Terima kasih atas dukungan dan doa Anda. Ini bukan akhir, melainkan awal dari langkah yang lebih jauh.'],
  ['Graduation Day','Tidak ada kerja keras yang sia-sia. Hari ini, semuanya terbayar.','Mari rayakan pencapaian ini bersama. Kehadiran Anda akan membuat hari kelulusan ini semakin berkesan.','Terima kasih sudah menjadi bagian dari perjalanan ini.']
 ],
 keluarga:[
  ['Acara Keluarga','Hidup terasa paling hangat ketika semua orang tersayang berkumpul dalam satu ruangan.','Kami mengundang Bapak/Ibu/Saudara/i untuk hadir dalam acara keluarga kami. Mari bertukar kabar, berbagi cerita, dan mempererat silaturahmi.','Terima kasih atas kehadirannya. Sampai jumpa dan salam hangat dari kami.'],
  ['Kumpul Keluarga','Jarak boleh memisahkan, tetapi rindu selalu punya jalan pulang.','Yuk, berkumpul dan lengkapi kebersamaan kita. Kehadiran setiap orang membuat acara ini terasa semakin berarti.','Sampai bertemu, dan jangan lupa bawa senyum terbaik.']
 ],
 pengajian:[
  ['Undangan Pengajian',SALAM+'.\nDengan mengharap ridho Allah SWT, kami mengundang Bapak/Ibu/Saudara/i untuk menghadiri majelis ilmu dan dzikir.','Semoga majelis ini menjadi sebab turunnya rahmat dan keberkahan, serta mempererat ukhuwah di antara kita.','Atas kehadirannya kami ucapkan Jazakumullahu khairan.\n'+WAS+'.'],
  ['Majelis Ilmu dan Doa','Majelis yang diisi dengan ilmu dan dzikir adalah taman kebaikan bagi hati.','Mari hadir dan meramaikan majelis ini bersama keluarga, sahabat, dan tetangga.','Semoga Allah membalas setiap langkah yang kita ayunkan menuju kebaikan.']
 ],
 reuni:[
  ['Reuni Akbar','Dulu kita berbagi bangku, bekal, dan mimpi. Kini saatnya berbagi cerita tentang perjalanan masing-masing.','Mari berkumpul kembali, bernostalgia, dan menyambung tali persahabatan yang tak lekang oleh waktu.','Jangan sampai ketinggalan, ya! Bawa semangat dan cerita terbaikmu.'],
  ['Kita Bertemu Lagi','Waktu berjalan cepat, tetapi kenangan tidak pernah benar-benar pergi.','Ayo hadir dan ramaikan reuni kali ini. Banyak cerita seru yang sayang kalau dilewatkan.','Sampai ketemu di sana! Datang bareng teman-teman lama pasti lebih seru.']
 ],
 resmi:[
  ['Undangan Resmi','Dengan hormat,','Sehubungan dengan penyelenggaraan acara berikut, kami mengundang Bapak/Ibu untuk berkenan hadir pada waktu dan tempat yang tertera di bawah ini.','Atas perhatian dan kehadiran Bapak/Ibu, kami ucapkan terima kasih.'],
  ['Mohon Kehadiran','Yth. Bapak/Ibu/Saudara/i,','Kehadiran Bapak/Ibu merupakan kehormatan bagi kami dan sangat berarti bagi kelancaran acara ini. Mohon konfirmasi kehadiran melalui tombol yang tersedia.','Hormat kami, panitia penyelenggara.']
 ],
 rapat:[
  ['Undangan Rapat','Dengan hormat,','Kami mengundang Bapak/Ibu untuk menghadiri rapat sesuai jadwal di bawah ini. Mohon hadir tepat waktu dan membawa bahan yang diperlukan.','Atas kehadiran dan kerja samanya, kami ucapkan terima kasih.'],
  ['Rapat Koordinasi','Halo, tim!','Mari berkumpul untuk menyamakan langkah, meninjau progres, dan menentukan rencana berikutnya. Kehadiran semua anggota sangat dibutuhkan.','Terima kasih, sampai bertemu di ruang rapat.']
 ],
 opening:[
  ['Grand Opening','Setelah persiapan yang panjang, akhirnya pintu kami terbuka untuk Anda.','Kami mengundang Anda hadir di hari pembukaan. Nikmati suasana baru, penawaran spesial, dan kejutan menarik di hari pertama kami.','Terima kasih atas dukungan Anda. Kami tunggu kedatangannya!'],
  ['Kami Sudah Buka','Satu mimpi, satu tempat baru, dan satu alasan untuk bertemu.','Jadilah tamu pertama kami. Datang, cicipi, dan ceritakan kesan Anda kepada kami.','Sampai jumpa di hari pembukaan!']
 ],
 lainnya:[
  ['Anda Diundang','Ada kabar baik yang ingin kami bagikan, dan kami ingin Anda ada di dalamnya.','Kami mengundang Anda untuk hadir dan berbagi momen istimewa ini bersama kami. Kehadiran Anda akan sangat berarti.','Terima kasih, dan sampai jumpa di hari acara.'],
  ['Save the Date','Catat tanggalnya, siapkan harimu.','Akan ada banyak hal menyenangkan yang kami siapkan. Datang dan jadilah bagian dari momen ini.','Kami menunggu kehadiranmu.']
 ]
};
const NAMES={
 wedding:['Ivory Editorial','Emerald Garden','Royal Merlot','Quiet Luxury','Sage Poetry','Blush Romance','Blue Heirloom','Terracotta Tale','Lavender Dream','Midnight Gold'],
 birthday:['Pop Confetti','Sky Carnival','Balloon Parade','Candy Studio','Sunny Club','Mint Party','Galaxy Glow','Safari Joy','Unicorn Dream','Retro Pop'],
 aqiqah:['Pastel Blessing','Golden Hilal','Baby Blue','Blossom Prayer','Mint Serenity','Lullaby','Desert Calm','Starlight','Olive Grace','Cloud Nine'],
 khitanan:['Biru Ceria','Sage Journey','Royal Boy','Little Explorer','Langit Bahagia','Emerald Day','Sahara Tale','Kobalt Pop','Teduh','Rimba'],
 wisuda:['Navy Laureate','Maroon Honor','Forest Degree','Royal Graduate','Slate Scholar','Honor Roll','Sunrise','Ivy Academy','Pearl Diploma','Noir Gold'],
 keluarga:['Terracotta Home','Garden Table','Honey House','Sunset Family','Woodland','Rainbow Home','Green Gathering','Coffee Story','Cloud Reunion','Spice House'],
 pengajian:['Teduh Hijau','Midnight Majelis','Nur','Zamrud','Fajar','Hikmah','Madinah','Safir','Berkah','Mihrab'],
 reuni:['Sunset Memory','Batch Story','Vintage Class','Campus Day','Polaroid','Uniform','Alumni Gold','Class Notes','Neon Night','Sepia Memory'],
 resmi:['Navy Protocol','Charcoal Office','Burgundy Hall','Emerald Executive','Platinum','Bronze Forum','Prestige','Ivory Letter','Teal Agenda','Graphite'],
 rapat:['Slate Brief','Teal Agenda','Focus','Board Room','Team Sync','Briefing','Forum','Round Table','Office Notes','Strategy'],
 opening:['Grand Premiere','Fresh Start','Festive Door','Maison Opening','Coffee House','Tropical Launch','Urban Store','Spotlight','Fiesta','Golden Gate'],
 lainnya:['Violet Mood','Mono Letter','Coral Day','Ocean Note','Amber Card','Forest Letter','Rose Story','Indigo Night','Pine Minimal','Peony']
};
const PALETTES=[
 ['#71384b','#d4b169','#fffaf6','#352329','#f2e4e7'],['#174a40','#d0b16e','#f8fcf8','#17342e','#dceae3'],['#18213b','#d9b85f','#fafafd','#171c31','#e3e5ed'],['#a5533c','#d8a970','#fff8f1','#42251c','#f3dfd2'],['#596f58','#d1ac75','#f8faf5','#293529','#e2e9dc'],['#536f8a','#d0b783','#f7f9fc','#263648','#dfe7ef'],['#775f96','#d4b0c7','#fbf8ff','#312847','#eae3f3'],['#a54e6d','#e1bd79','#fff7fa','#462630','#f6dfe7'],['#6d5a3f','#cbb17c','#fffdf7','#342d23','#f0eadc'],['#2f5961','#e3b86b','#f4fbfb','#17343a','#d9eded']
];
const STYLES=['frame','arch','minimal','soft','bold','modern'];const FONTS=['romantic','signature','classic','luxe','parisienne','elegant','editorial','clean','modern','playful'];const ANIMS=['rise','fade','slide','zoom'];const PATS=['leaf','none','lines','dots','sparkle','star','confetti'];
const HAS_TPL=Array.isArray(I.TEMPLATES);
if(Array.isArray(I.FLOWS)&&!I.FLOWS.includes('auto'))I.FLOWS.push('auto');if(I.FLOW_LABEL)I.FLOW_LABEL.auto='Otomatis';
window.__invCopy=COPY;
const FXL={wedding:[0,1,6,5,11,9],keluarga:[0,6,4,7],pengajian:[2,8,11,5],aqiqah:[2,4,7,0],khitanan:[2,8,5],wisuda:[2,3,9,5],birthday:[3,4,6,9,5],opening:[3,9,5,10],reuni:[3,4,8,10],lainnya:[3,5,4,11]};
const counters={};(I.TEMPLATES||[]).forEach(t=>{const i=counters[t.cat]||0;counters[t.cat]=i+1;const p=PALETTES[i%PALETTES.length];t.name=(NAMES[t.cat]||NAMES.lainnya)[i%10];t.style=STYLES[i%STYLES.length];t.font=FONTS[i%FONTS.length];t.anim=ANIMS[i%ANIMS.length];t.pat=PATS[(i+(t.cat==='birthday'?6:0))%PATS.length];t.flora=['wedding','aqiqah','keluarga','pengajian'].includes(t.cat)&&i%3!==2;t.theme={primary:p[0],accent:p[1],bg:p[2],text:p[3],soft:p[4]};const cl=(COPY[t.cat]||COPY.lainnya),c=cl[i%cl.length];t.defaults={title:c[0],opening:c[1],description:c[2],closing:c[3]};const fl=FXL[t.cat]||FXL.lainnya;t.mo={sk:(i*3+(t.cat==='wedding'?0:2))%7,hv:(i*5+1)%8,fx:fl[i%fl.length],op:(i*3+2)%8,lt:(i*2+1)%5,bd:(i+1)%4,au:(i*3)%4};});
if(HAS_TPL){I.textVariants=cat=>(COPY[cat]||COPY.lainnya).map(v=>({title:v[0],opening:v[1],description:v[2],closing:v[3]}));
const dStory=()=>[{date:'2021',title:'Pertama Bertemu',text:'Sebuah pertemuan sederhana yang membuka halaman pertama cerita kami.',photo:''},{date:'2023',title:'Memilih Bersama',text:'Dua perjalanan sepakat untuk berjalan menuju rumah yang sama.',photo:''},{date:'2026',title:'Hari Bahagia',text:'Kini kami ingin berbagi kebahagiaan ini bersama Anda.',photo:''}];I.__defStory=dStory;
const stamp=(d,t)=>{d.mo=Object.assign({},t.mo);d.scene=t.scene||'';delete d.cv;delete d.cs;delete d.ch;delete d.ci;if(t.cat==='wedding'&&!Array.isArray(d.story))d.story=dStory();return d};
const oldSample=I.sampleData;I.sampleData=function(t){const d=oldSample(t);if(t.cat==='wedding')d.host='Ayla & Yaff';return stamp(d,t)};
const oldNew=I.newData;I.newData=function(t){return stamp(oldNew(t),t)};
const oldApply=I.applyTemplate;I.applyTemplate=function(d,t){const r=oldApply(d,t);stamp(d,t);return r};}
function enc(s){try{return btoa(unescape(encodeURIComponent(s)))}catch(e){return''}}function dec(s){try{return decodeURIComponent(escape(atob(s)))}catch(e){return''}}
function pack(x){return '[[INVITA_STORY:'+enc(JSON.stringify(x))+']]'}function unpack(s){const m=String(s||'').match(/\[\[INVITA_STORY:([^\]]+)\]\]/);if(!m)return[];try{return JSON.parse(dec(m[1]))||[]}catch(e){return[]}}function clean(s){return String(s||'').replace(/\n?\[\[INVITA_STORY:[^\]]+\]\]/g,'').trim()}
/* Memecah "Nama1 penghubung Nama2". Kalau tidak cocok: null (strict) atau nama contoh */
function split(host,strict){host=String(host||'');for(const [k,v] of Object.entries(SEP)){const a=host.split(' '+v+' ');if(a.length===2&&a[0].trim()&&a[1].trim())return[a[0].trim(),a[1].trim(),k]}return strict?null:['Ayla','Yaff','amp']}
/* Nama pasangan untuk undangan: pakai data.n1/n2/sep (penghubung bebas), cadangannya baca dari teks nama */
function pair(d){if(!d||d.art!=='wedding')return null;const h=String(d.host||'');if(!h.trim())return null;if(d.n1&&d.n2&&h===[d.n1,d.sep||'&',d.n2].join(' '))return[d.n1,d.sep||'&',d.n2];const p=split(h,true);return p?[p[0],SEP[p[2]],p[1]]:null}
function couple(wrap,d){const t=pair(d);if(!t||!wrap)return;const fs=t[1].length<=3?'1em':'.55em';const html='<span class="v3-render-names"><strong>'+I.esc(t[0])+'</strong><i style="font-size:'+fs+'">'+I.esc(t[1])+'</i><strong>'+I.esc(t[2])+'</strong></span>';wrap.querySelectorAll('.h-host,.cover h2').forEach(el=>{el.innerHTML=html});const ini=((t[0][0]||'')+(t[2][0]||'')).toUpperCase();wrap.querySelectorAll('.seal span').forEach(el=>{el.textContent=ini})}
const RVL=['fade','left','right','zoom','flip','wipe','drop','pop'];
function secFx(wrap){if(!wrap)return;const sk=+wrap.dataset.sk||0,lt=+wrap.dataset.lt||0;let n=0;wrap.querySelectorAll('.reveal').forEach(el=>{el.dataset.rv=RVL[(sk+lt+n*3)%8];n++})}
const baseRender=I.renderInvitation;
I.renderInvitation=function(root,inv,opts){const r=baseRender.apply(this,arguments);try{if(opts&&opts.mode==='preview'&&inv&&inv.id&&!/^(tpl|demo)-/.test(inv.id))I.__edit=inv.data;couple(r&&r.wrap,inv&&inv.data);secFx(r&&r.wrap)}catch(e){}try{if(window.__invScene)window.__invScene(r&&r.wrap,inv&&inv.data)}catch(e){}try{if(window.__invMotion)window.__invMotion(r&&r.wrap,opts||{},inv&&inv.data)}catch(e){}try{if(window.__invAmv)window.__invAmv(r&&r.wrap,inv&&inv.data,opts||{});window.__invMusic&&window.__invMusic.attach(r&&r.wrap,inv&&inv.data,opts||{},inv&&inv.id)}catch(e){}return r};
const esc=s=>I.esc(s);
const fld=(l,id,v,type='text',ph='')=>'<label class="fld"><span>'+l+'</span><input id="'+id+'" type="'+type+'" value="'+esc(v||'')+'"'+(ph?' placeholder="'+esc(ph)+'"':'')+'></label>';
async function imgData(file){if(!file||!file.type.startsWith('image/'))return'';const url=URL.createObjectURL(file);try{const im=await new Promise((r,j)=>{const x=new Image;x.onload=()=>r(x);x.onerror=j;x.src=url});const sc=Math.min(1,900/Math.max(im.width,im.height));const c=document.createElement('canvas');c.width=Math.round(im.width*sc);c.height=Math.round(im.height*sc);c.getContext('2d').drawImage(im,0,0,c.width,c.height);return c.toDataURL('image/jpeg',.76)}finally{URL.revokeObjectURL(url)}}
async function imgPng(file){if(!file||!file.type.startsWith('image/'))return'';const url=URL.createObjectURL(file);try{const im=await new Promise((r,j)=>{const x=new Image;x.onload=()=>r(x);x.onerror=j;x.src=url});const sc=Math.min(1,760/Math.max(im.width,im.height));const c=document.createElement('canvas');c.width=Math.round(im.width*sc);c.height=Math.round(im.height*sc);c.getContext('2d').drawImage(im,0,0,c.width,c.height);return c.toDataURL('image/png')}finally{URL.revokeObjectURL(url)}}
function installEditor(){const form=document.querySelector('#form');if(!form||form.dataset.v3)return;form.dataset.v3='1';const host=form.querySelector('[data-k="data.host"]'),desc=form.querySelector('[data-k="data.description"]');if(!host||!desc)return;const tpl=document.querySelector('#tplSel');const isWedding=!tpl||String(tpl.value).startsWith('wedding-');if(!isWedding)return;
 let n1,n2,sp;const ed=I.__edit;
 if(ed&&ed.n1&&ed.n2&&host.value===[ed.n1,ed.sep||'&',ed.n2].join(' ')){n1=ed.n1;n2=ed.n2;sp=ed.sep||'&'}else{const p=split(host.value);n1=p[0];n2=p[1];sp=SEP[p[2]]}
 let key=Object.keys(SEP).find(k=>SEP[k]===sp)||'custom';const custom=key==='custom'?sp:'';
 host.closest('.fld').hidden=true;
 const chips=Object.entries(SEP).map(([k,v])=>'<button type="button" class="v3-chip" data-sep="'+k+'" aria-pressed="'+(k===key)+'">'+esc(v)+'</button>').join('')+'<button type="button" class="v3-chip wide" data-sep="custom" aria-pressed="'+(key==='custom')+'">Tulis sendiri</button>';
 const couple=document.createElement('section');couple.className='v3-couple-editor';couple.innerHTML='<div class="v3-head"><b>Nama Pasangan</b><small>Dua nama berdiri sendiri, kata penghubungnya bebas Anda tentukan.</small></div><div class="row2">'+fld('Nama pertama','v3n1',n1,'text','Contoh: Ayla')+fld('Nama kedua','v3n2',n2,'text','Contoh: Yaff')+'</div><div class="fld"><span>Kata penghubung</span><div class="v3-chips">'+chips+'</div></div><label class="fld v3-custom"'+(key==='custom'?'':' hidden')+'><span>Tulis penghubung sendiri</span><input id="v3sepc" maxlength="18" placeholder="Contoh: bersama, with, plus" value="'+esc(custom)+'"></label><div class="v3-couple-preview"><strong id="v3p1"></strong><i id="v3ps"></i><strong id="v3p2"></strong></div>';
 host.closest('.grp-body').insertBefore(couple,host.closest('.fld'));
 const q=s=>couple.querySelector(s);const curSep=()=>key==='custom'?(q('#v3sepc').value.trim()||'&'):SEP[key];
 let stories;const legacy=unpack(desc.value);if(legacy.length&&!(ed&&Array.isArray(ed.story)))stories=legacy;else if(ed&&Array.isArray(ed.story))stories=ed.story.map(x=>({...x}));else stories=dStory();if(/\[\[INVITA_STORY:/.test(desc.value)){desc.value=clean(desc.value);desc.dispatchEvent(new Event('input',{bubbles:true}))}
 if(ed&&window.__invAmvInfo&&window.__invAmvInfo.isFilm(Object.assign({},ed,{flow:'amv'}))){
  const X=window.__invAmvInfo,E0=I.__edit;E0.film=Object.assign({},E0.amv,E0.film);delete E0.amv;const isA=/^amv/.test(E0.scene),C=X.cfg(E0),pa=document.createElement('details');pa.className='grp v3-amv-editor';pa.open=true;
  const opt=(o,cur)=>Object.entries(o).map(([k,v])=>'<option value="'+k+'"'+(k===cur?' selected':'')+'>'+esc(typeof v==='object'?v.n:v)+'</option>').join('');
  const cn=['Latar 1','Latar 2','Teks','Aksen 1','Aksen 2'],F=()=>{const E=I.__edit;E.film=E.film||{};return E.film};
  const rebuild=()=>setTimeout(()=>{const f=document.querySelector('#form');if(f){f.dataset.v3='';f.querySelectorAll('.v3-amv-editor').forEach(x=>x.remove())}},0);
  const rows=()=>X.plan(Object.assign({},I.__edit,{flow:'amv'})).map(r=>{const ov=(C.shots&&C.shots[r.id])||{};return'<div class="fm-row" data-id="'+r.id+'"><label><input type="checkbox" class="on" checked> <b>'+esc(r.label)+'</b></label><span></span><div class="sub"><input type="number" class="du" min="1" max="20" step="0.5" value="'+r.dur+'" aria-label="Durasi detik"><select class="cm">'+opt(X.cams,ov.cam||'auto')+'</select><select class="tr">'+opt(X.trs,ov.tr||'auto')+'</select></div></div>'}).join('');
  pa.innerHTML='<summary>Film (adegan, kamera, animasi)</summary><div class="grp-body"><p class="mini-note">Film jalan sendiri. Ketuk layar sekali untuk jeda, ketuk lagi untuk lanjut. Nama, tanggal, tempat, cerita, dan foto diambil dari isian lain. Kalau mau tanpa film, ubah Alur ke Gulir.</p>'+
   '<label class="fld"><span>Kalimat sambutan (kosongkan untuk kalimat bawaan template)</span><textarea id="amvo" rows="3" maxlength="260">'+esc((E0.film||{}).open||'')+'</textarea></label>'+
   '<label class="fld"><span>Kalimat penutup (kosongkan untuk bawaan)</span><textarea id="amvc" rows="2" maxlength="200">'+esc((E0.film||{}).close||'')+'</textarea></label>'+
   '<label class="fld"><span>Kata pembuka (satu baris satu kata atau kalimat pendek)</span><textarea id="amvl" rows="3" maxlength="400" placeholder="Contoh:&#10;Kami&#10;Mengundang&#10;Anda">'+esc((C.lines||[]).join('\n'))+'</textarea></label>'+
   (isA?'<label class="fld"><span>Gaya AMV</span><select id="amvk">'+opt(X.looks,String(E0.scene).replace(/^amv-?/,''))+'</select></label><label class="fld"><span>Font film</span><select id="amvf">'+opt(X.fonts,C.f)+'</select></label><label class="fld"><span>Efek teks</span><select id="amvx">'+opt(X.fx,C.fx)+'</select></label><label class="fld"><span>Dekorasi kilatan</span><select id="amvd">'+opt(X.dc,C.dc)+'</select></label>':'<label class="fld"><span>Efek teks</span><select id="amvx">'+opt(X.fx,C.fx)+'</select></label>')+
   '<label class="fld"><span>Gerak kamera (semua adegan)</span><select id="amvc">'+opt(X.cams,C.cam)+'</select></label>'+
   '<label class="fld"><span>Transisi antaradegan</span><select id="amvt">'+opt(X.trs,C.tr)+'</select></label>'+
   '<label class="fld"><span>Ornamen melayang</span><select id="amvo">'+opt(X.orns,C.orn)+'</select></label>'+
   '<label class="fld"><span>Kecepatan: <b id="amvsv">'+Math.round(C.sp*100)+'%</b></span><input id="amvs" type="range" min="50" max="200" step="10" value="'+Math.round(C.sp*100)+'"></label>'+
   '<label class="fld"><span>Ukuran pasangan: <b id="amvzv">'+C.cs+'%</b></span><input id="amvz" type="range" min="60" max="140" step="5" value="'+C.cs+'"></label>'+
   '<label class="fld"><span>Posisi pasangan (kiri ke kanan): <b id="amvxv">'+C.cx+'</b></span><input id="amvp" type="range" min="-35" max="35" step="1" value="'+C.cx+'"></label>'+
   '<label class="fld"><span>Gambar latar sendiri (dari galeri)</span><input id="amvbf" type="file" accept="image/*"></label><label class="fld"><span>atau link gambar latar (https)</span><input id="amvbu" type="url" placeholder="https://..." value="'+esc(/^https?:/i.test((C.bg||''))?C.bg:'')+'"></label><button type="button" class="btn btn-sm" id="amvbx">Pakai latar bawaan lagi</button>'+
   (isA?'<div class="fld"><span>Warna film</span><div class="amv-cols">'+C.c.map((c,i)=>'<label><input type="color" data-ci="'+i+'" value="'+c+'"><small>'+cn[i]+'</small></label>').join('')+'</div></div>':'')+
   '<div class="fld"><span>Adegan: nyalakan, durasi (detik), kamera, transisi</span><div class="fm-rows" id="fmr">'+rows()+'</div></div>'+
   '<p class="mini-note">Foto pasangan, foto cerita, dan galeri diganti dari panel masing-masing. Pasangan bisa diganti lewat panel Gambar Pasangan.</p>'+
   '<button type="button" class="btn btn-sm" id="amvr">Kembalikan pengaturan film bawaan</button></div>';
  form.insertBefore(pa,form.querySelectorAll('.grp')[1]||null);
  pa.querySelectorAll('.fm-row').forEach(r=>{const ov=(C.shots&&C.shots[r.dataset.id])||{};r.querySelector('.on').checked=ov.on!==false});
  const go=()=>{host.dispatchEvent(new Event('input',{bubbles:true}))};
  pa.querySelector('#amvo').oninput=e=>{F().open=e.target.value;go()};pa.querySelector('#amvc').oninput=e=>{F().close=e.target.value;go()};
  pa.querySelector('#amvl').oninput=e=>{F().lines=e.target.value.split('\n').map(x=>x.trim()).filter(Boolean).slice(0,12);go()};
  const k=pa.querySelector('#amvk');if(k)k.onchange=e=>{const E=I.__edit,f=F();E.scene='amv-'+e.target.value;E.film={lines:f.lines,open:f.open,close:f.close,sp:f.sp,shots:f.shots,cam:f.cam,tr:f.tr,orn:f.orn,cs:f.cs,cx:f.cx,bg:f.bg};go();rebuild()};
  const on=(id,key,ev)=>{const el=pa.querySelector(id);if(el)el[ev||'onchange']=e=>{F()[key]=e.target.value;go()}};
  on('#amvf','f');on('#amvx','fx');on('#amvd','dc');on('#amvc','cam');on('#amvt','tr');on('#amvo','orn');
  pa.querySelector('#amvs').oninput=e=>{F().sp=+e.target.value/100;pa.querySelector('#amvsv').textContent=e.target.value+'%';go()};
  pa.querySelector('#amvz').oninput=e=>{F().cs=+e.target.value;pa.querySelector('#amvzv').textContent=e.target.value+'%';go()};
  pa.querySelector('#amvp').oninput=e=>{F().cx=+e.target.value;pa.querySelector('#amvxv').textContent=e.target.value;go()};
  pa.querySelector('#amvbu').onchange=e=>{const v=e.target.value.trim();F().bg=/^https:\/\//i.test(v)?v:'';go()};
  pa.querySelector('#amvbf').onchange=async e=>{const d=await imgData(e.target.files[0]);if(d){F().bg=d;go()}};
  pa.querySelector('#amvbx').onclick=()=>{F().bg='';pa.querySelector('#amvbu').value='';go()};
  pa.querySelectorAll('[data-ci]').forEach(inp=>inp.oninput=()=>{const f=F();f.c=(f.c||C.c.slice()).slice();f.c[+inp.dataset.ci]=inp.value;go()});
  pa.querySelector('#fmr').addEventListener('change',e=>{const r=e.target.closest('.fm-row');if(!r)return;const f=F();f.shots=Object.assign({},f.shots);const o=Object.assign({},f.shots[r.dataset.id]);o.on=r.querySelector('.on').checked;const du=parseFloat(r.querySelector('.du').value);if(du>0)o.dur=du;o.cam=r.querySelector('.cm').value;o.tr=r.querySelector('.tr').value;f.shots[r.dataset.id]=o;go()});
  pa.querySelector('#amvr').onclick=()=>{const E=I.__edit;E.film={lines:F().lines};go();rebuild()};
 }
 if(ed&&ed.scene&&!/^amv/.test(ed.scene)&&window.__invCouple){
  const VL={jawa:'Jawa: beskap dan kebaya batik',jawa2:'Jawa: marun dan emas',gaun:'Jas hitam dan gaun burgundy',champagne:'Jas navy dan gaun champagne',tuxIvory:'Tuksedo dan gaun putih',tuxRed:'Tuksedo dan gaun merah',melayu:'Melayu: baju melayu dan songket',ulos:'Batak: jas dan ulos',pastel:'Setelan krem dan gaun pastel',pastelBlue:'Setelan biru dan gaun peach',sage:'Baju koko dan gaun hijau',sky:'Baju koko dan gaun biru'};
  const SKT=window.__invCouple.skins,cur=ed.cv||window.__invCouple.def(ed.scene),sk=+ed.cs||0,hjOn=!(ed.ch===0||ed.ch==='0');
  const pc=document.createElement('details');pc.className='grp v3-cpl-editor';pc.open=true;
  pc.innerHTML='<summary>Gambar Pasangan</summary><div class="grp-body"><p class="mini-note">Ganti pakaian, warna kulit, atau pakai gambar sendiri. Gambar sendiri paling bagus berupa PNG tanpa latar.</p>'+
   '<label class="fld"><span>Pakaian</span><select id="v3cv">'+window.__invCouple.keys().map(k=>'<option value="'+k+'"'+(k===cur&&!ed.ci&&ed.cv!=='none'?' selected':'')+'>'+esc(VL[k]||(/^g\d+$/.test(k)?window.__invCouple.gl[+k.slice(1)]:k))+'</option>').join('')+'<option value="none"'+(ed.cv==='none'?' selected':'')+'>Tanpa gambar pasangan</option></select></label>'+
   '<div class="fld"><span>Warna kulit</span><div class="v3-chips" id="v3cs">'+SKT.map((c,i)=>'<button type="button" class="v3-chip" data-s="'+i+'" aria-pressed="'+(i===sk)+'" aria-label="Warna kulit '+(i+1)+'" style="background:'+c+';width:38px;height:38px;padding:0;border-radius:50%"></button>').join('')+'</div></div>'+
   '<label class="fld"><span>Mempelai wanita</span><select id="v3ch"><option value="1"'+(hjOn?' selected':'')+'>Berhijab</option><option value="0"'+(hjOn?'':' selected')+'>Tanpa hijab</option></select></label>'+
   '<label class="fld"><span>Gambar sendiri (dari galeri)</span><input id="v3ci" type="file" accept="image/*"></label>'+
   '<label class="fld"><span>atau link gambar (https)</span><input id="v3cu" type="url" placeholder="https://..." value="'+esc(/^https?:/i.test(ed.ci||'')?ed.ci:'')+'"></label>'+
   '<button type="button" class="btn btn-sm" id="v3cx">Pakai gambar bawaan lagi</button></div>';
  form.insertBefore(pc,form.querySelectorAll('.grp')[1]||null);
  const go=()=>{host.dispatchEvent(new Event('input',{bubbles:true}))};
  pc.querySelector('#v3cv').onchange=e=>{const E=I.__edit;if(!E)return;if(e.target.value==='none'){E.cv='none'}else E.cv=e.target.value;E.ci='';go()};
  pc.querySelector('#v3cs').onclick=e=>{const b=e.target.closest('.v3-chip');if(!b)return;pc.querySelectorAll('#v3cs .v3-chip').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));if(I.__edit)I.__edit.cs=+b.dataset.s;go()};
  pc.querySelector('#v3ch').onchange=e=>{if(I.__edit)I.__edit.ch=+e.target.value;go()};
  pc.querySelector('#v3cu').onchange=e=>{const v=e.target.value.trim();if(I.__edit){I.__edit.ci=/^https:\/\//i.test(v)?v:'';go()}};
  pc.querySelector('#v3ci').onchange=async e=>{const d=await imgPng(e.target.files[0]);if(d&&I.__edit){I.__edit.ci=d;go()}};
  pc.querySelector('#v3cx').onclick=()=>{const E=I.__edit;if(E){E.ci='';if(E.cv==='none')delete E.cv;pc.querySelector('#v3cu').value='';go()}};
 }
 const panel=document.createElement('details');panel.className='grp v3-story-editor';panel.open=true;panel.innerHTML='<summary>Perjalanan Kami</summary><div class="grp-body"><p class="mini-note">Setiap momen bisa memakai foto sendiri. Foto yang diunggah dari perangkat tidak ikut di tautan, tapi ikut di file HTML.</p><div id="v3rows"></div><button type="button" class="btn btn-sm" id="v3add">+ Tambah cerita</button></div>';form.insertBefore(panel,form.querySelectorAll('.grp')[1]||null);const rows=panel.querySelector('#v3rows');
 function names(init){const a=q('#v3n1').value.trim(),b=q('#v3n2').value.trim(),s=curSep();q('#v3p1').textContent=a||'Nama 1';q('#v3ps').textContent=s;q('#v3p2').textContent=b||'Nama 2';const val=(a&&b)?[a,s,b].join(' '):(a||b);const E=I.__edit;if(E){E.n1=a;E.n2=b;E.sep=s}if(host.value!==val){host.value=val;host.dispatchEvent(new Event('input',{bubbles:true}))}else if(!init&&E){host.dispatchEvent(new Event('input',{bubbles:true}))}}
 function sync(){const E=I.__edit;if(E)E.story=stories.map(x=>({...x}));host.dispatchEvent(new Event('input',{bubbles:true}))}
 function draw(){rows.innerHTML='';stories.forEach((x,i)=>{const r=document.createElement('article');r.className='v3-story-row';r.innerHTML='<div class="v3-photo">'+(x.photo?'<img src="'+esc(x.photo)+'" alt="Foto cerita">':'<span>Belum ada foto</span>')+'</div><div class="v3-story-fields">'+fld('Tahun / tanggal','v3d'+i,x.date)+fld('Judul cerita','v3t'+i,x.title)+'<label class="fld"><span>Cerita singkat</span><textarea id="v3x'+i+'" rows="3">'+esc(x.text||'')+'</textarea></label><label class="v3-upload">Pilih foto<input id="v3f'+i+'" type="file" accept="image/*"></label><button type="button" class="btn btn-sm btn-danger" id="v3r'+i+'">Hapus cerita</button></div>';rows.appendChild(r);['v3d','v3t','v3x'].forEach(id=>r.querySelector('#'+id+i).addEventListener('input',()=>{stories[i]={...stories[i],date:r.querySelector('#v3d'+i).value,title:r.querySelector('#v3t'+i).value,text:r.querySelector('#v3x'+i).value};sync()}));r.querySelector('#v3f'+i).addEventListener('change',async e=>{const d=await imgData(e.target.files[0]);if(d){stories[i].photo=d;draw();sync()}});r.querySelector('#v3r'+i).onclick=()=>{stories.splice(i,1);draw();sync()};});}
 couple.addEventListener('click',e=>{const b=e.target.closest('.v3-chip');if(!b)return;key=b.dataset.sep;couple.querySelectorAll('.v3-chip').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));q('.v3-custom').hidden=key!=='custom';if(key==='custom')q('#v3sepc').focus();names()});
 couple.querySelectorAll('#v3n1,#v3n2,#v3sepc').forEach(e=>e.addEventListener('input',()=>names()));panel.querySelector('#v3add').onclick=()=>{stories.push({date:'',title:'',text:'',photo:''});draw();sync()};names(true);draw();sync();}
function textNodes(root){const w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);const a=[];while(w.nextNode())a.push(w.currentNode);return a}
function enhance(){}
/* Di halaman tamu (view.html) tidak ada templates.js: editor dan cerita ditangani file lain, jadi berhenti di sini */
if(!HAS_TPL)return;
function flowOpt(){const sel=document.querySelector('select[data-k="data.flow"]');if(sel&&!sel.querySelector('option[value=auto]')){const o=document.createElement('option');o.value='auto';o.textContent='Otomatis (menggulir sendiri, sentuh untuk jeda)';sel.appendChild(o)}if(sel&&!sel.querySelector('option[value=amv]')){const o2=document.createElement('option');o2.value='amv';o2.textContent='Film sinematik (jalan sendiri, ketuk untuk jeda)';sel.appendChild(o2)}const v=I.__edit&&I.__edit.flow;if(sel&&(v==='auto'||v==='amv'))sel.value=v}
let q=false;const mo=new MutationObserver(()=>{if(q)return;q=true;requestAnimationFrame(()=>{q=false;installEditor();flowOpt();enhance(document)})});mo.observe(document.documentElement,{subtree:true,childList:true});document.addEventListener('DOMContentLoaded',()=>{installEditor();enhance(document)});
})();

/* ===== MOTION GRAPHIC: aplikasi dan undangan ===== */
(function(){
'use strict';
const REDUCE=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
const KINDS=['petal','leaf','star','confetti','bubble','sparkle','heart','snow','lantern','ribbon','drop','firefly'];
const RISE={bubble:1,lantern:1,firefly:1,sparkle:1};
const rnd=(a,b)=>a+Math.random()*(b-a);

/* huruf demi huruf: kata dibungkus .w (tidak terpotong), tiap huruf .ch */
function kinetic(el,base){
 if(!el||el.dataset.kin)return;el.dataset.kin='1';const label=el.textContent;let n=0;
 const walk=node=>{[...node.childNodes].forEach(c=>{
  if(c.nodeType===3){if(!c.nodeValue.trim())return;const fr=document.createDocumentFragment();
   c.nodeValue.split(/(\s+)/).forEach(part=>{if(!part)return;if(/^\s+$/.test(part)){fr.appendChild(document.createTextNode(' '));return}
    const w=document.createElement('span');w.className='w';w.setAttribute('aria-hidden','true');
    [...part].forEach(ch=>{const k=document.createElement('span');k.className='ch';k.textContent=ch;k.style.setProperty('--i',n++);w.appendChild(k)});fr.appendChild(w)});
   c.replaceWith(fr)}
  else if(c.nodeType===1&&c.tagName!=='I')walk(c)})};
 walk(el);el.classList.add('kin');el.setAttribute('aria-label',label);el.style.setProperty('--d',base+'s');
}
function particles(fx,kind,h){
 fx.style.setProperty('--h',(h+60)+'px');fx.dataset.k=kind;const cols=['var(--a)','var(--p)','#fff','var(--soft)'];
 const n=kind==='drop'?22:kind==='firefly'?14:16;
 for(let i=0;i<n;i++){const e=document.createElement('i');e.className='p k-'+kind;
  const big=/heart|lantern|leaf|bubble/.test(kind);
  e.style.setProperty('--x',rnd(0,100)+'%');e.style.setProperty('--s',(kind==='drop'?rnd(14,30):big?rnd(12,26):rnd(7,16))+'px');
  e.style.setProperty('--dur',(kind==='drop'?rnd(4,8):kind==='firefly'?rnd(10,20):rnd(9,17))+'s');e.style.setProperty('--dl',-rnd(0,16)+'s');
  e.style.setProperty('--dx',(kind==='drop'?rnd(-10,10):rnd(-70,70))+'px');
  e.style.setProperty('--rot',(kind==='drop'?0:rnd(240,720))+'deg');e.style.setProperty('--c',cols[i%4]);if(RISE[kind])e.style.top='0';fx.appendChild(e)}
}
function burst(wrap){
 if(REDUCE)return;let fx=wrap.querySelector('.fxb');if(!fx){fx=document.createElement('div');fx.className='fxb';fx.setAttribute('aria-hidden','true');wrap.appendChild(fx)}if(!fx.animate)return;const ox=wrap.offsetWidth/2,oy=wrap.offsetHeight*.78,cols=['var(--a)','var(--p)','#fff','var(--soft)'];
 for(let i=0;i<30;i++){const s=document.createElement('i');s.className='pc';s.style.left=ox+'px';s.style.top=oy+'px';s.style.background=cols[i%4];if(i%3===0)s.style.borderRadius='50%';fx.appendChild(s);
  const a=rnd(-2.75,-.4),d=rnd(120,320),dx=Math.cos(a)*d,dy=Math.sin(a)*d,r=rnd(-540,540);
  s.animate([{transform:'translate(-50%,-50%) scale(.3)',opacity:1},{transform:'translate('+dx+'px,'+dy+'px) rotate('+r+'deg) scale(1)',opacity:1,offset:.55},{transform:'translate('+dx*1.12+'px,'+(dy+110)+'px) rotate('+r*1.5+'deg) scale(.9)',opacity:0}],{duration:rnd(1300,2100),easing:'cubic-bezier(.2,.8,.3,1)',fill:'forwards'}).onfinish=()=>s.remove()}
 const ring=document.createElement('i');ring.className='pr';ring.style.left=ox+'px';ring.style.top=oy+'px';fx.appendChild(ring);
 ring.animate([{transform:'translate(-50%,-50%) scale(.1)',opacity:.9},{transform:'translate(-50%,-50%) scale(7)',opacity:0}],{duration:1100,easing:'cubic-bezier(.2,.7,.2,1)'}).onfinish=()=>ring.remove();
}
function band(txt,cls){const d=document.createElement('div');d.className='mq '+cls;d.setAttribute('aria-hidden','true');const one=Array(7).fill(txt).join('  ✦  ')+'  ✦  ';d.innerHTML='<div class="mq-t"><span></span><span></span></div>';d.querySelectorAll('span').forEach(x=>{x.textContent=one});return d}

window.__invMotion=function(wrap,opts,data){
 if(!wrap||wrap.dataset.mo)return;const cover=wrap.querySelector('.cover');if(!cover)return;if(!/^(public|preview)$/.test(opts.mode||'public'))return;
 wrap.dataset.mo='1';const d=data||{},scroller=wrap.querySelector('.inv'),hero=wrap.querySelector('.hero'),tap=wrap.classList.contains('flow-tap');
 /* judul dan nama: huruf bermunculan */
 kinetic(cover.querySelector('h1'),.45);kinetic(cover.querySelector('h2'),.7);
 kinetic(wrap.querySelector('.h-title'),.5);kinetic(wrap.querySelector('.h-host'),.8);
 if(REDUCE)return;
 if(d.flow==='auto')autoplay(wrap);
 /* lapisan efek di atas isi undangan */
 const fx=document.createElement('div');fx.className='fx';fx.setAttribute('aria-hidden','true');wrap.appendChild(fx);
 particles(fx,KINDS[+wrap.dataset.fx||0]||'petal',wrap.offsetHeight||700);
 /* aurora di belakang hero */
 if(hero){const hv=document.createElement('div');hv.className='hv-l';hv.setAttribute('aria-hidden','true');hv.innerHTML='<i></i><i></i><i></i>';hero.insertBefore(hv,hero.firstChild);if(d.style!=='modern'){const a=document.createElement('div');a.className='hero-aurora au-'+(wrap.dataset.au||0);a.setAttribute('aria-hidden','true');a.innerHTML='<i></i><i></i>';hero.insertBefore(a,hero.firstChild)}}
 /* band berjalan antar bagian (hanya mode gulir) */
 if(!tap&&hero&&scroller&&wrap.dataset.bd!=='3'){const t=[d.title,String(d.host||'').trim()].filter(Boolean).join(' ✦ ')||(d.kicker||'Undangan');
  hero.after(band(t,'mq-a'));const sh=scroller.querySelector('#sec-share');if(sh)sh.before(band((d.kicker||'Undangan')+' ✦ '+(d.title||''),'mq-b'))}
 /* letusan confetti saat undangan dibuka */
 wrap.addEventListener('click',e=>{if(e.target.closest('[data-a=open]'))burst(wrap)});
 /* hitung mundur: angka berputar saat berganti */
 const cd=wrap.querySelector('.cd');if(cd&&window.MutationObserver){new MutationObserver(ms=>ms.forEach(m=>{const b=(m.target.nodeType===3?m.target.parentNode:m.target);if(b&&b.tagName==='B'){b.classList.remove('flip');void b.offsetWidth;b.classList.add('flip')}})).observe(cd,{childList:true,characterData:true,subtree:true})}
};

/* putar otomatis: menggulir sendiri, ketuk di mana saja untuk jeda lalu ketuk lagi untuk lanjut */
function autoplay(wrap){
 const sc=wrap.querySelector('.inv');if(!sc||wrap.dataset.auto)return;wrap.dataset.auto='1';
 const SPEED=96,SKIP='a,button,input,textarea,select,label,iframe,.g-item,.lightbox,.inv-music,.auto-pill';
 let playing=false,live=false,p0=0,t0=0,last=0,endAt=0,looping=false,down=null,minT=0;
 const pill=document.createElement('button');pill.type='button';pill.className='auto-pill';pill.setAttribute('aria-label','Jeda atau lanjutkan');pill.innerHTML='<i></i><span></span>';wrap.appendChild(pill);
 const flash=document.createElement('div');flash.className='auto-flash';flash.setAttribute('aria-hidden','true');flash.innerHTML='<i></i>';wrap.appendChild(flash);
 const label=pill.querySelector('span');
 function setPlay(v,fl){playing=v;wrap.classList.toggle('auto-paused',!v);wrap.classList.toggle('auto-run',v);
  if(v){sc.style.scrollBehavior='auto';p0=sc.scrollTop;last=p0;t0=performance.now();endAt=0;label.textContent='Ketuk di mana saja untuk jeda';clearTimeout(minT);minT=setTimeout(()=>wrap.classList.add('auto-min'),4200)}
  else{label.textContent='Dijeda, ketuk untuk lanjut';wrap.classList.remove('auto-min');clearTimeout(minT)}
  if(fl){flash.className='auto-flash '+(v?'play':'pause');void flash.offsetWidth;flash.classList.add('show')}}
 const toggle=()=>{if(live)setPlay(!playing,true)};
 pill.addEventListener('click',e=>{e.stopPropagation();toggle()});
 wrap.addEventListener('pointerdown',e=>{down={x:e.clientX,y:e.clientY,t:performance.now(),ok:!(e.target.closest&&e.target.closest(SKIP))}});
 wrap.addEventListener('pointerup',e=>{const d=down;down=null;if(!d||!d.ok||!live)return;if(Math.hypot(e.clientX-d.x,e.clientY-d.y)<10&&performance.now()-d.t<500)toggle()});
 wrap.addEventListener('wheel',()=>{if(live&&playing&&!looping)setPlay(false,true)},{passive:true});
 sc.addEventListener('focusin',e=>{if(live&&playing&&/^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName))setPlay(false,false)});
 if('IntersectionObserver' in window){const hero=wrap.querySelector('.hero');if(hero)new IntersectionObserver(es=>wrap.classList.toggle('hero-off',!es[0].isIntersecting),{root:sc,threshold:0}).observe(hero)}
 function step(t){
  if(!wrap.isConnected)return;
  if(playing&&!document.hidden){
   const max=sc.scrollHeight-sc.clientHeight;
   if(looping){if(sc.scrollTop<2){looping=false;p0=0;last=0;t0=t;endAt=0}}
   else if(Math.abs(sc.scrollTop-last)>3){setPlay(false,true)}
   else{let np=p0+SPEED*(t-t0)/1000;
    if(np>=max){np=max;sc.scrollTop=np;last=sc.scrollTop;if(!endAt)endAt=t;else if(t-endAt>3800){endAt=0;looping=true;sc.scrollTo({top:0,behavior:'smooth'})}}
    else{sc.scrollTop=np;last=sc.scrollTop;endAt=0}}}
  else if(playing){t0=t;p0=sc.scrollTop;last=p0}
  requestAnimationFrame(step)}
 function start(){if(live)return;live=true;setTimeout(()=>{setPlay(true,false);wrap.classList.add('auto-on');requestAnimationFrame(step)},2300)}
 if(wrap.classList.contains('opened'))start();else new MutationObserver((m,o)=>{if(wrap.classList.contains('opened')){o.disconnect();start()}}).observe(wrap,{attributes:true,attributeFilter:['class']});
}

/* ===== motion untuk antarmuka aplikasi (index.html) ===== */
function app(){
 const view=document.getElementById('view');if(!view)return;
 /* progress scroll */
 const sp=document.createElement('div');sp.id='sp';document.body.appendChild(sp);
 let tk=false;const upd=()=>{tk=false;const h=document.documentElement.scrollHeight-innerHeight;sp.style.transform='scaleX('+(h>0?Math.min(1,scrollY/h):0)+')'};
 addEventListener('scroll',()=>{if(!tk){tk=true;requestAnimationFrame(upd)}},{passive:true});
 /* riak saat tombol disentuh */
 document.addEventListener('pointerdown',e=>{const b=e.target.closest&&e.target.closest('.btn,.chip,.ibtn');if(!b||REDUCE)return;const r=b.getBoundingClientRect(),k=Math.max(r.width,r.height)*2.2,s=document.createElement('span');s.className='rip';s.style.cssText='width:'+k+'px;height:'+k+'px;left:'+(e.clientX-r.left-k/2)+'px;top:'+(e.clientY-r.top-k/2)+'px';b.appendChild(s);setTimeout(()=>s.remove(),700)});
 const countUp=el=>{if(el.dataset.cu)return;const to=parseInt(el.textContent,10);el.dataset.cu='1';if(!(to>0)||REDUCE)return;const t0=performance.now();el.textContent='0';const st=t=>{const k=Math.min(1,(t-t0)/1500);el.textContent=Math.round(to*(1-Math.pow(1-k,3)));if(k<1)requestAnimationFrame(st);else el.textContent=to};requestAnimationFrame(st)};
 const io='IntersectionObserver' in window&&!REDUCE?new IntersectionObserver(es=>{es.filter(e=>e.isIntersecting).forEach((e,i)=>{e.target.style.setProperty('--md',Math.min(i,8)*85+'ms');e.target.classList.add('mr-in');io.unobserve(e.target)})},{threshold:.08}):null;
 const SEL='.feat,.step,.honest,.tpl,.proj,.stat,.sec-head,.page-head';
 function sweep(){
  const h=view.querySelector('.hero-app h1');
  if(h&&!h.dataset.kin&&!REDUCE){h.dataset.kin='1';let i=0;const walk=n=>[...n.childNodes].forEach(c=>{if(c.nodeType===3){if(!c.nodeValue.trim())return;const fr=document.createDocumentFragment();c.nodeValue.split(/(\s+)/).forEach(p=>{if(!p)return;if(/^\s+$/.test(p)){fr.appendChild(document.createTextNode(' '));return}const m=document.createElement('span');m.className='mw';const x=document.createElement('span');x.textContent=p;x.style.setProperty('--i',i++);m.appendChild(x);fr.appendChild(m)});c.replaceWith(fr)}else if(c.nodeType===1)walk(c)});walk(h)}
  const fitDemo=()=>view.querySelectorAll('.hero-visual .screen').forEach(sc=>{const w=sc.clientWidth,h=sc.clientHeight,wr=sc.querySelector('.inv-wrap');if(!wr||!w)return;const k=w/390;wr.style.width='390px';wr.style.height=Math.ceil(h/k)+'px';wr.style.transform='scale('+k+')';wr.style.transformOrigin='0 0'});fitDemo();if(!window.__fitDemoR){window.__fitDemoR=1;addEventListener('resize',()=>{const v=document.getElementById('view');v&&v.querySelectorAll('.hero-visual .screen').forEach(sc=>{const wr=sc.querySelector('.inv-wrap');if(!wr)return;const k=sc.clientWidth/390;wr.style.height=Math.ceil(sc.clientHeight/k)+'px';wr.style.transform='scale('+k+')'})})}
  const hero=view.querySelector('.hero-app');
  if(hero&&!hero.dataset.mo){hero.dataset.mo='1';
   if(!REDUCE){const sh=document.createElement('div');sh.className='mshapes';sh.setAttribute('aria-hidden','true');sh.innerHTML='<i class="s1"></i><i class="s2"></i><i class="s3"></i><svg class="s4" viewBox="0 0 120 40"><path d="M2 20 Q 17 2 32 20 T 62 20 T 92 20 T 118 20"/></svg><i class="s5"></i>';hero.prepend(sh)}
   const cats=(window.Invita&&Invita.CATEGORIES)||[];if(cats.length&&!REDUCE){const txt=cats.map(c=>c.label).join('  ✦  ')+'  ✦  ';const m=document.createElement('div');m.className='mq-app';m.setAttribute('aria-hidden','true');m.innerHTML='<div class="mq-t"><span></span><span></span></div>';m.querySelectorAll('span').forEach(x=>{x.textContent=txt+txt});hero.after(m)}}
  view.querySelectorAll('.hero-stats b,.stat b').forEach(countUp);
  if(io)view.querySelectorAll(SEL).forEach(el=>{if(el.dataset.mr)return;el.dataset.mr='1';el.classList.add('mr');io.observe(el)});
 }
 let q=false;new MutationObserver(()=>{if(q)return;q=true;requestAnimationFrame(()=>{q=false;sweep()})}).observe(view,{childList:true,subtree:true});sweep();
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',app);else app();
})();

/* ===== TEMA ILUSTRASI: latar satu layar, pasangan tanpa wajah, sampul dengan gerakan buka khas ===== */
(function(){
'use strict';
const I=window.Invita;if(!I)return;
let uid=0;const NS='http://www.w3.org/2000/svg';
const r1=(n)=>{let x=Math.sin(n*127.1+311.7)*43758.5453;return x-Math.floor(x)};
/* kumpulan bunga: lingkaran bertumpuk, deterministik */
function flowers(w,h,cols,n,seed,y0){let s='';for(let i=0;i<n;i++){const x=r1(i+seed)*w,y=y0+r1(i*3+seed)*(h-y0),r=9+r1(i*7+seed)*13,c=cols[i%cols.length];
 s+='<g><circle cx="'+x.toFixed(1)+'" cy="'+y.toFixed(1)+'" r="'+(r+3).toFixed(1)+'" fill="#2f4a2a" opacity=".75"/><circle cx="'+x.toFixed(1)+'" cy="'+y.toFixed(1)+'" r="'+r.toFixed(1)+'" fill="'+c+'"/><circle cx="'+(x+r*.15).toFixed(1)+'" cy="'+(y-r*.1).toFixed(1)+'" r="'+(r*.62).toFixed(1)+'" fill="#fff" opacity=".28"/><circle cx="'+x.toFixed(1)+'" cy="'+y.toFixed(1)+'" r="'+(r*.28).toFixed(1)+'" fill="#000" opacity=".16"/></g>'}return s}
function leaves(w,h,c,n,seed,y0){let s='';for(let i=0;i<n;i++){const x=r1(i+seed)*w,y=y0+r1(i*5+seed)*(h-y0),a=r1(i*9+seed)*360;s+='<ellipse cx="'+x.toFixed(1)+'" cy="'+y.toFixed(1)+'" rx="16" ry="6" fill="'+c+'" transform="rotate('+a.toFixed(0)+' '+x.toFixed(1)+' '+y.toFixed(1)+')"/>'}return s}

/* pasangan tanpa wajah (kepala polos): pakaian berbeda per tema */
const V={
 jawa:{g:'beskap',b:'kebaya',gj:'#2a1a16',gk:'#7b4a26',bj:'#ead7bf',bk:'#7b4a26',hj:'#f4e8dc',ac:'#d4af5a',hat:'#6b3b1d'},
 jawa2:{g:'beskap',b:'kebaya',gj:'#7a1c28',gk:'#8a5a2c',bj:'#7a1c28',bk:'#8a5a2c',hj:'#f2dede',ac:'#e0c070',hat:'#4a2a18'},
 gaun:{g:'tux',b:'gown',gj:'#1b1416',gs:'#fff',tie:'#6b2a35',bj:'#6b2a35',hj:'#ead8cf',ac:'#d9b87a'},
 champagne:{g:'suit',b:'gown',gj:'#1c2244',gs:'#f4ead8',tie:'#d9b87a',bj:'#f1dcc0',hj:'#f7ecda',ac:'#e6bf72'},
 tuxIvory:{g:'tux',b:'gown',veil:1,gj:'#1d2233',gs:'#fff',tie:'#e8913a',bj:'#fbf3e6',hj:'#fbf3e6',ac:'#d4af5a'},
 tuxRed:{g:'tux',b:'gown',veil:1,gj:'#120d0e',gs:'#fff',tie:'#d64545',bj:'#b3202e',hj:'#f0dcd8',ac:'#f2c94c'},
 melayu:{g:'melayu',b:'kurung',gj:'#c79a3a',gk:'#7d1f2c',bj:'#d6a93e',bk:'#7d1f2c',hj:'#f7e6a8',ac:'#fff0b8',hat:'#7d1f2c'},
 ulos:{g:'ulos',b:'ulosb',gj:'#161010',gk:'#161010',bj:'#161010',bk:'#a4161a',hj:'#1c1212',ac:'#e0b84a',hat:'#161010'},
 pastel:{g:'suit',b:'gown',gj:'#c9b08e',gs:'#fff',tie:'#e9b4a8',bj:'#eab5a6',hj:'#fbeee3',ac:'#f2d27a'},
 pastelBlue:{g:'suit',b:'gown',gj:'#8aa0b8',gs:'#fff',tie:'#f5b7a0',bj:'#f1c6bb',hj:'#fdf1e6',ac:'#e8c86a'},
 sage:{g:'koko',b:'gown',gj:'#f3ead8',gk:'#f3ead8',bj:'#9fb8a0',hj:'#eef3ea',ac:'#c9a24a',hat:'#1c1c1c'},
 sky:{g:'koko',b:'gown',gj:'#eaf2f8',gk:'#eaf2f8',bj:'#a8c8e8',hj:'#f4f9fd',ac:'#e0b860',hat:'#222'}};
function shade(h){const n=parseInt(h.slice(1),16);return '#'+[(n>>16)&255,(n>>8)&255,n&255].map(x=>Math.round(x*.86).toString(16).padStart(2,'0')).join('')}
const SKT=['#f0cdae','#e4b48e','#c98f66','#8d5a3b'];
function couple(v,id,o){
 o=o||{};const c=V[v]||V.jawa,SK=SKT[o.skin|0]||SKT[0],SKD=shade(SK),HR='#2a1f1c',HJ=o.hj!==0;
 const T=(d,f)=>'<path d="'+d+'" fill="'+f+'"/><path d="'+d+'" fill="url(#sh'+id+')"/>',R=(d,f,o)=>'<path d="'+d+'" fill="'+f+'"'+(o?' opacity="'+o+'"':'')+'/>';
 const ul='url(#ul'+id+')';
 /* ===== pria (kiri) ===== */
 let G='';
 const neck=R('M92 108H116V152C112 158 96 156 92 152Z',SKD)+R('M92 108H116V126C108 132 100 132 92 126Z','#000',.12);
 const head='<ellipse cx="75" cy="80" rx="4.6" ry="8.6" fill="'+SKD+'"/><ellipse cx="133" cy="80" rx="4.6" ry="8.6" fill="'+SKD+'"/><ellipse cx="104" cy="74" rx="28" ry="37" fill="'+SK+'"/>';
 const hair=R('M75 74C66 38 88 20 108 23C130 21 144 44 133 74C130 60 124 50 114 46C108 53 96 51 90 46C82 52 77 62 75 74Z',HR)+'<path d="M84 40C96 28 120 28 128 42" fill="none" stroke="#5a463f" stroke-width="1.6" opacity=".7"/><path d="M92 36C100 32 112 33 118 37" fill="none" stroke="#6a544c" stroke-width="1" opacity=".6"/>';
 const body='M36 198C38 162 64 146 90 141L118 141C144 146 170 162 172 198L180 360L28 360Z';
 const seams='<path d="M42 196C36 250 34 310 36 360M166 196C172 250 174 310 172 360" fill="none" stroke="#000" stroke-width="1.6" opacity=".22"/>';
 const lapel=R('M90 141L66 168L60 228L96 250L103 186L96 160Z','#000',.3)+R('M118 141L142 168L148 228L112 250L105 186L112 160Z','#000',.3)+'<path d="M90 141L66 168L60 228M118 141L142 168L148 228" fill="none" stroke="#fff" stroke-width="1" opacity=".18"/>';
 const shirt=R('M90 141L104 190L118 141Z',c.gs||'#fff')+R('M90 141L85 156L102 168ZM118 141L123 156L106 168Z',c.gs||'#fff')+R('M90 141L104 190L118 141Z','#000',.06);
 const tie=R('M99 165H109L111 176H97Z',c.tie||'#222')+R('M98 176H110L115 252L104 266L93 252Z',c.tie||'#222')+R('M98 176H110L115 252L104 266Z','#000',.12);
 const bt='<circle cx="104" cy="256" r="2.6" fill="#fff" opacity=".18"/>';
 const garland=(v==='jawa'||v==='jawa2')?'<path d="M84 150C66 214 70 290 92 352" fill="none" stroke="#fff" stroke-width="4.4" stroke-dasharray="3.4 4.2" stroke-linecap="round"/>':'';
 if(c.g==='tux'||c.g==='suit'||c.g==='ulos'){
  G=neck+head+hair+T(body,c.gj)+seams+lapel+shirt+(c.g==='ulos'?'':tie)+bt+R('M140 250H164V257H140Z','#000',.25)+R('M138 200L156 196L152 210Z','#fff',.9)+
   (c.g==='ulos'?'<path d="M58 164L90 141L100 150L172 296L166 340Z" fill="'+ul+'"/><path d="M58 164L90 141L100 150L172 296L166 340Z" fill="url(#sh'+id+')"/>':'')
 }else{
  const hat=c.g==='beskap'?R('M75 70C73 40 92 28 106 28C124 28 138 40 133 70C128 60 116 54 104 54C92 54 80 60 75 70Z',c.hat)+R('M76 62H132V67H76Z',c.ac)+R('M130 56C142 52 146 64 134 68Z',c.hat):
   c.g==='koko'?R('M78 60V44Q78 34 90 34H120Q132 34 132 44V60Z',c.hat)+R('M78 56H132V60H78Z',c.ac,.8)+R('M80 62H128V66H80Z',HR):
   R('M72 66C68 34 94 22 108 24C132 24 144 40 136 66L128 56C116 46 98 48 82 58Z',c.hat)+R('M120 26L138 6L132 38Z',c.hat)+R('M76 58L132 54L132 59L76 63Z',c.ac);
  G=neck+head+(c.g==='beskap'||c.g==='koko'||c.g==='melayu'?R('M75 74C74 66 78 62 82 58L82 72Z M133 74C134 66 130 62 126 58L126 72Z',HR):'')+hat+T(body,c.gj)+seams+
   R('M90 138H118V154C112 162 96 162 90 154Z',c.gj)+R('M90 138H118V154C112 162 96 162 90 154Z','#fff',.12)+R('M103 158H105V360H103Z',c.ac,.8)+
   [176,200,224,248,272,296,320,344].map(y=>'<circle cx="104" cy="'+y+'" r="2.8" fill="'+c.ac+'"/>').join('')+
   (c.g==='melayu'?'<path d="M30 300L180 270L180 330L28 360Z" fill="'+c.gk+'"/><path d="M30 300L180 270L180 330L28 360Z" fill="url(#bt'+id+')"/>':'')
 }
 /* ===== wanita (kanan) ===== */
 const hj=c.hj,veil=c.veil?'<path d="M210 52C262 60 280 140 284 240L294 360L256 360C262 292 256 204 238 132Z" fill="'+hj+'" opacity=".42"/><path d="M210 52C170 60 150 140 148 220L142 360L176 360C170 290 176 200 186 130Z" fill="'+hj+'" opacity=".3"/>':'';
 const la=c.ac;let dots='';
 for(let i=0;i<46;i++){const x=152+r1(i+2)*118,y=218+r1(i*3+5)*140;dots+='<circle cx="'+x.toFixed(1)+'" cy="'+y.toFixed(1)+'" r="'+(.8+r1(i)*1.3).toFixed(1)+'" fill="'+la+'" opacity=".55"/>'}
 for(let i=0;i<9;i++){const x=160+r1(i+40)*104,y=226+r1(i*7+3)*120;dots+='<g transform="translate('+x.toFixed(1)+' '+y.toFixed(1)+')" fill="'+la+'" opacity=".75"><circle cx="0" cy="-3" r="2"/><circle cx="3" cy="0" r="2"/><circle cx="0" cy="3" r="2"/><circle cx="-3" cy="0" r="2"/><circle r="1.2" fill="#fff"/></g>'}
 const sleeveL='M156 198C142 224 138 252 146 272L168 270C162 248 164 224 174 204Z',sleeveR='M264 198C278 234 284 290 282 360L256 360C260 296 256 246 250 208Z';
 const dress='M152 214C152 192 178 184 210 184C242 184 268 192 268 214L276 360L144 360Z';
 let kind='';
 if(c.b==='kebaya')kind='<path d="M180 190L210 236L240 190" fill="none" stroke="'+c.ac+'" stroke-width="3"/><rect x="144" y="338" width="132" height="22" fill="url(#bt'+id+')"/><rect x="144" y="336" width="132" height="4" fill="'+c.ac+'"/>';
 else if(c.b==='kurung')kind='<path d="M150 300L276 262L276 300L148 340Z" fill="url(#bt'+id+')"/><path d="M150 300L276 262" stroke="'+c.ac+'" stroke-width="2.4"/>';
 else if(c.b==='ulosb')kind='<path d="M156 200L172 190L276 330L262 360L214 360Z" fill="'+ul+'"/>';
 const hand='<path d="M136 268C134 259 146 255 156 257L172 262C174 271 166 277 156 279C146 281 138 275 136 268Z" fill="'+SK+'"/><path d="M146 258C150 262 152 268 152 274M156 258C160 262 162 268 160 276" stroke="'+SKD+'" stroke-width="1.2" fill="none"/>';
 const sig=(v==='jawa'||v==='melayu')?R('M190 62L210 36L230 62Q210 54 190 62Z',c.ac):'';
 const headB=HJ?(  T('M210 50C176 50 162 82 166 112C164 132 156 146 152 168L150 214C168 234 252 234 270 214L268 168C264 146 256 132 254 112C258 82 244 50 210 50Z',hj)+
  '<ellipse cx="210" cy="104" rx="25.5" ry="33" fill="#000" opacity=".14"/><ellipse cx="210" cy="104" rx="23" ry="30.5" fill="'+SK+'"/>'+
  '<path d="M184 60C170 84 172 112 180 134M236 62C250 86 250 112 242 134" fill="none" stroke="#fff" stroke-width="2" opacity=".22"/>'+
  T('M158 178C182 200 238 200 262 178L268 210C240 230 180 230 152 210Z',hj)+'<path d="M166 192C190 212 230 212 254 192" fill="none" stroke="#000" stroke-width="1.4" opacity=".14"/>'+
  '<circle cx="210" cy="212" r="4.4" fill="'+c.ac+'"/><circle cx="210" cy="212" r="1.6" fill="#fff" opacity=".7"/>'+sig):(R('M184 110C176 66 192 42 210 42C230 42 244 66 236 110C238 140 234 156 232 158L188 158C186 156 182 140 184 110Z',HR)+R('M198 124H222V182C218 194 202 194 198 182Z',SKD)+R('M166 196C186 180 234 180 254 196C246 216 174 216 166 196Z',SK)+'<ellipse cx="210" cy="104" rx="23" ry="30.5" fill="'+SK+'"/>'+R('M184 102C182 64 196 46 212 46C230 46 240 64 236 102C232 84 226 74 210 68C196 72 188 84 184 102Z',HR)+'<circle cx="210" cy="38" r="13" fill="'+HR+'"/><circle cx="210" cy="38" r="13" fill="url(#sh'+id+')"/><circle cx="236" cy="58" r="3.2" fill="'+c.ac+'"/>'+sig);
 const B=veil+T(dress,c.bj)+T(sleeveR,c.bj)+kind+dots+headB+
  T(sleeveL,c.bj)+hand;
 return '<svg class="cp" viewBox="0 0 300 360" preserveAspectRatio="xMidYMax meet" aria-hidden="true"><defs>'+
  '<linearGradient id="sh'+id+'" x1="0" x2="1"><stop offset="0" stop-color="#fff" stop-opacity=".2"/><stop offset=".5" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".22"/></linearGradient>'+
  '<pattern id="bt'+id+'" width="16" height="16" patternUnits="userSpaceOnUse"><rect width="16" height="16" fill="'+(c.gk||c.bk||'#7b4a26')+'"/><path d="M8 1L15 8L8 15L1 8Z" fill="none" stroke="'+c.ac+'" stroke-width="1.1" opacity=".8"/><circle cx="8" cy="8" r="1.6" fill="'+c.ac+'" opacity=".85"/></pattern>'+
  '<pattern id="ul'+id+'" width="22" height="22" patternUnits="userSpaceOnUse"><rect width="22" height="22" fill="#a4161a"/><path d="M0 4H22M0 18H22" stroke="#f3e7d8" stroke-width="2"/><path d="M11 6L16 11L11 16L6 11Z" fill="none" stroke="#e0b84a" stroke-width="1.6"/></pattern></defs>'+G+garland+B+'</svg>'}
/* karangan bunga besar di kiri dan kanan */
function bunch(cx,cy,rx,ry,cols,n,seed){let s='';for(let i=0;i<14;i++){const a=r1(i+seed)*6.28,d=.7+r1(i*3+seed)*.5;s+='<ellipse cx="'+(cx+Math.cos(a)*rx*d).toFixed(1)+'" cy="'+(cy+Math.sin(a)*ry*d).toFixed(1)+'" rx="15" ry="5.5" fill="#3d5f38" transform="rotate('+(a*57+40).toFixed(0)+' '+(cx+Math.cos(a)*rx*d).toFixed(1)+' '+(cy+Math.sin(a)*ry*d).toFixed(1)+')"/>'}
 for(let i=0;i<n;i++){const a=r1(i*2+seed)*6.28,d=Math.sqrt(r1(i*5+seed+9)),x=cx+Math.cos(a)*rx*d,y=cy+Math.sin(a)*ry*d,r=7+r1(i*7+seed)*10,c=cols[i%cols.length];
  s+='<circle cx="'+x.toFixed(1)+'" cy="'+y.toFixed(1)+'" r="'+r.toFixed(1)+'" fill="'+c+'"/><circle cx="'+(x-r*.2).toFixed(1)+'" cy="'+(y-r*.2).toFixed(1)+'" r="'+(r*.6).toFixed(1)+'" fill="#fff" opacity=".3"/><circle cx="'+x.toFixed(1)+'" cy="'+y.toFixed(1)+'" r="'+(r*.25).toFixed(1)+'" fill="#000" opacity=".12"/>'}return s}

const SC={};
/* ---------- 1. Joglo sepia: pintu kayu membuka ---------- */
SC.joglo={couple:'g2',vc:'jawa',fl:['#8a1f2d','#c4453f','#f4e1c8','#a8324a'],
 bg:id=>'<svg viewBox="0 0 390 800" preserveAspectRatio="xMidYMax slice"><defs><linearGradient id="g'+id+'" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f7ecd2"/><stop offset=".55" stop-color="#ead5a6"/><stop offset="1" stop-color="#cfae70"/></linearGradient></defs><rect width="390" height="800" fill="url(#g'+id+')"/>'+
  [60,100,150,200,250].map((y,i)=>'<path d="M0 '+y+'Q100 '+(y-14)+' 200 '+y+'T390 '+y+'" fill="none" stroke="#b99a5e" stroke-width="1" opacity=".22"/>').join('')+
  '<ellipse cx="90" cy="120" rx="110" ry="18" fill="#fff8e6" opacity=".55"/><ellipse cx="300" cy="170" rx="120" ry="16" fill="#fff8e6" opacity=".5"/><ellipse cx="180" cy="230" rx="140" ry="14" fill="#fff8e6" opacity=".4"/>'+
  [[60,80],[90,95],[300,70],[330,110],[250,140]].map(p=>'<path d="M'+p[0]+' '+p[1]+'q4 -5 8 0q4 -5 8 0" fill="none" stroke="#4a3722" stroke-width="1.4"/>').join('')+
  '<g class="sc-sway"><ellipse cx="50" cy="470" rx="52" ry="86" fill="#51694a"/><ellipse cx="22" cy="520" rx="40" ry="70" fill="#6d8a5c"/><ellipse cx="345" cy="460" rx="55" ry="92" fill="#51694a"/><ellipse cx="372" cy="520" rx="40" ry="68" fill="#6d8a5c"/></g>'+
  '<ellipse cx="195" cy="560" rx="190" ry="48" fill="#b99a5e" opacity=".55"/>'+
  '<g><rect x="96" y="652" width="198" height="40" fill="#8a6a3a"/><rect x="108" y="600" width="174" height="52" fill="#b7894d"/>'+[118,150,182,214,246].map(x=>'<rect x="'+x+'" y="604" width="10" height="48" fill="#5e3d1f"/>').join('')+'<rect x="170" y="612" width="50" height="40" fill="#d2a867"/>'+
  '<path d="M66 600L324 600L292 560L98 560Z" fill="#7a4f2a"/><path d="M118 562L272 562L246 520L144 520Z" fill="#8a5a31"/><path d="M168 522L222 522L205 486L185 486Z" fill="#6e4524"/><rect x="193" y="468" width="4" height="20" fill="#b9902f"/>'+
  [80,110,140,170,200,230,260,290].map(x=>'<path d="M'+x+' 562L'+(x-5)+' 600" stroke="#5c3a1a" stroke-width="1.2" opacity=".5"/>').join('')+'</g>'+
  '<rect y="690" width="390" height="110" fill="#cdb27a"/>'+
  '<path d="M26 0C70 60 14 120 58 210" fill="none" stroke="#c8a24a" stroke-width="3.5"/><path d="M364 0C320 60 376 120 332 210" fill="none" stroke="#c8a24a" stroke-width="3.5"/><g fill="#c8a24a"><circle cx="58" cy="214" r="5"/><circle cx="332" cy="214" r="5"/></g></svg>',
 cover:'<div class="sc-door l"></div><div class="sc-door r"></div>'};
/* ---------- 2. Amplop beludru: tirai terbelah, kartu renda ---------- */
SC.beludru={couple:'g7',vc:'gaun',fl:['#e7b7c2','#f4e6ea','#d98aa0','#f7d7cf'],
 bg:id=>{let f='';for(let i=0;i<15;i++)f+='<rect x="'+(i*27)+'" width="27" height="700" fill="url(#f'+id+')" opacity="'+(i%2?.9:.55)+'"/>';
  return '<svg viewBox="0 0 390 800" preserveAspectRatio="xMidYMax slice"><defs><linearGradient id="f'+id+'" x1="0" x2="1"><stop offset="0" stop-color="#0b150b"/><stop offset=".5" stop-color="#2a3d22"/><stop offset="1" stop-color="#0b150b"/></linearGradient><linearGradient id="fl'+id+'" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2a1c14"/><stop offset="1" stop-color="#080504"/></linearGradient></defs><rect width="390" height="800" fill="#0f180e"/>'+f+'<rect y="690" width="390" height="110" fill="url(#fl'+id+')"/><rect y="640" width="390" height="60" fill="#d8bfae" opacity=".28"/></svg>'},
 cover:'<div class="sc-cur l"></div><div class="sc-cur r"></div><div class="sc-env"><i class="fl"></i></div>'};
/* ---------- 3. Candi kabut: gunungan terbelah ---------- */
SC.candi={couple:'g0',vc:'jawa2',fl:['#8f1d33','#1f3f78','#f6e9e0','#d98aa0','#c9496a'],
 bg:id=>'<svg viewBox="0 0 390 800" preserveAspectRatio="xMidYMax slice"><defs><linearGradient id="g'+id+'" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fbf8f3"/><stop offset="1" stop-color="#eee2dc"/></linearGradient><linearGradient id="m'+id+'" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#fbf8f3" stop-opacity=".92"/></linearGradient><pattern id="w'+id+'" width="22" height="26" patternUnits="userSpaceOnUse"><rect width="22" height="26" fill="#b27a3c"/><rect x="2" y="3" width="18" height="20" fill="none" stroke="#7a4b1e" stroke-width="1.4"/></pattern></defs><rect width="390" height="800" fill="url(#g'+id+')"/>'+
  '<path d="M0 520L70 440L130 500L200 410L270 490L330 430L390 500V800H0Z" fill="#cdbdb8" opacity=".35"/>'+
  '<g fill="#a99a9a" opacity=".42"><path d="M80 610H310L292 580H98Z"/><path d="M106 582H284L270 552H120Z"/><path d="M132 554H258L246 526H144Z"/><path d="M158 528H232L222 498H168Z"/><path d="M180 500H210L205 440L195 410L185 440Z"/><path d="M92 584H112L108 520L102 500L96 520Z"/><path d="M278 584H298L294 520L288 500L282 520Z"/></g>'+
  '<rect y="420" width="390" height="260" fill="url(#m'+id+')"/>'+
  '<path d="M0 600Q195 500 390 600V800H0Z" fill="#e6c0b8" opacity=".7"/>'+
  '<rect y="640" width="390" height="70" fill="url(#w'+id+')"/><rect y="636" width="390" height="8" fill="#8a5628"/>'+
  '<g transform="translate(195 24) scale(.72)"><path d="M0 0C0 0-30 44-34 88C-38 128-18 150 0 150C18 150 38 128 34 88C30 44 0 0 0 0Z" fill="#8f1d33"/><path d="M0 24C0 24-16 56-18 90C-19 112-8 126 0 126C8 126 19 112 18 90C16 56 0 24 0 24Z" fill="none" stroke="#e6c27a" stroke-width="1.6"/><path d="M0 52V120M-10 82H10" stroke="#e6c27a" stroke-width="1.4"/></g></svg>',
 cover:'<div class="sc-gun l"></div><div class="sc-gun r"></div>'};
/* ---------- 4. Tenun ulos: pita tenun bergeser ---------- */
SC.ulos={couple:'g1',vc:'ulos',fl:['#a4161a','#e0b84a','#f3e7d8'],
 bg:id=>{const band=(y,h)=>'<rect y="'+y+'" width="390" height="'+h+'" fill="#a4161a"/><rect y="'+(y+6)+'" width="390" height="'+(h-12)+'" fill="url(#d'+id+')"/>';
  return '<svg viewBox="0 0 390 800" preserveAspectRatio="xMidYMax slice"><defs><pattern id="d'+id+'" width="26" height="26" patternUnits="userSpaceOnUse"><rect width="26" height="26" fill="#a4161a"/><path d="M13 3L23 13L13 23L3 13Z" fill="none" stroke="#f3e7d8" stroke-width="2"/><path d="M13 9L17 13L13 17L9 13Z" fill="#e0b84a"/></pattern><pattern id="s'+id+'" width="34" height="34" patternUnits="userSpaceOnUse"><path d="M17 2L32 17L17 32L2 17Z" fill="none" stroke="#e0b84a" stroke-width=".8" opacity=".16"/></pattern></defs><rect width="390" height="800" fill="#150c0c"/><rect width="390" height="800" fill="url(#s'+id+')"/>'+band(0,70)+'<rect y="70" width="390" height="5" fill="#f3e7d8"/>'+band(724,76)+'<rect y="716" width="390" height="5" fill="#f3e7d8"/></svg>'},
 cover:'<i class="sc-band" style="--i:0;top:0"></i><i class="sc-band" style="--i:1;top:14.3%"></i><i class="sc-band" style="--i:2;top:28.6%"></i><i class="sc-band" style="--i:3;top:42.9%"></i><i class="sc-band" style="--i:4;top:57.2%"></i><i class="sc-band" style="--i:5;top:71.5%"></i><i class="sc-band" style="--i:6;top:85.8%"></i>'};
/* ---------- 5. Songket emas: kisi emas membelah diagonal ---------- */
SC.songket={couple:'g5',vc:'melayu',fl:['#e7c35a','#fff0b8','#c9302c','#d4a537'],
 bg:id=>'<svg viewBox="0 0 390 800" preserveAspectRatio="xMidYMax slice"><defs><pattern id="l'+id+'" width="44" height="44" patternUnits="userSpaceOnUse"><path d="M22 2L42 22L22 42L2 22Z" fill="none" stroke="#d4a537" stroke-width="1.2" opacity=".5"/><path d="M22 14L30 22L22 30L14 22Z" fill="#d4a537" opacity=".5"/></pattern><pattern id="t'+id+'" width="26" height="30" patternUnits="userSpaceOnUse"><path d="M0 30L13 0L26 30Z" fill="#d4a537"/><path d="M6 30L13 12L20 30Z" fill="#3a0d14"/></pattern><radialGradient id="r'+id+'" cx=".5" cy=".42" r=".7"><stop offset="0" stop-color="#6a1a26"/><stop offset="1" stop-color="#2a070c"/></radialGradient></defs><rect width="390" height="800" fill="url(#r'+id+')"/><rect width="390" height="800" fill="url(#l'+id+')"/><rect width="390" height="32" fill="url(#t'+id+')"/><rect y="768" width="390" height="32" fill="url(#t'+id+')" transform="rotate(180 195 784)"/></svg>',
 cover:'<div class="sc-dg a"></div><div class="sc-dg b"></div>'};
/* ---------- 6. Senja taman: matahari terbit, jendela terbuka ---------- */
SC.senja={couple:'g11',vc:'pastel',fl:['#f5a0a0','#fbe0c8','#c96a8a','#f7c76a'],
 bg:id=>'<svg viewBox="0 0 390 800" preserveAspectRatio="xMidYMax slice"><defs><linearGradient id="g'+id+'" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c9b0e0"/><stop offset=".45" stop-color="#ffc7a2"/><stop offset="1" stop-color="#ffe6c8"/></linearGradient><radialGradient id="s'+id+'"><stop offset="0" stop-color="#fff6d6"/><stop offset=".5" stop-color="#ffe3a8"/><stop offset="1" stop-color="#ffe3a8" stop-opacity="0"/></radialGradient></defs><rect width="390" height="800" fill="url(#g'+id+')"/>'+
  '<g class="sc-sun"><circle cx="195" cy="400" r="130" fill="url(#s'+id+')"/><circle cx="195" cy="400" r="48" fill="#fff3c8"/></g>'+
  '<g class="sc-cloud"><ellipse cx="70" cy="150" rx="70" ry="13" fill="#fff" opacity=".6"/><ellipse cx="320" cy="210" rx="80" ry="12" fill="#fff" opacity=".55"/></g>'+
  '<path class="sc-hill h1" d="M-40 520Q100 440 230 510T430 480V800H-40Z" fill="#eea77f"/><path class="sc-hill h2" d="M-40 580Q130 500 260 570T430 540V800H-40Z" fill="#d98a7c"/><path class="sc-hill h3" d="M-40 640Q120 580 250 630T430 610V800H-40Z" fill="#a8627a"/>'+
  '<g fill="#6b3a5a" opacity=".85"><path d="M40 640L52 560L64 640Z"/><path d="M60 650L74 570L88 650Z"/><path d="M320 645L333 565L346 645Z"/></g></svg>',
 cover:'<div class="sc-shut l"></div><div class="sc-shut r"></div>'};
/* ---------- 7. Buku cerita: sampul buku dan halaman yang dibalik ---------- */
SC.buku={couple:'g4',vc:'sage',fl:['#e8a6a6','#fbe3c8','#9fc3b5','#f2d27a'],
 bg:id=>'<svg viewBox="0 0 390 800" preserveAspectRatio="xMidYMax slice"><defs><linearGradient id="g'+id+'" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fdf8ec"/><stop offset="1" stop-color="#f3e6c8"/></linearGradient></defs><rect width="390" height="800" fill="url(#g'+id+')"/><rect x="14" y="14" width="362" height="772" rx="6" fill="none" stroke="#c9a24a" stroke-width="1.6" opacity=".7"/><rect x="22" y="22" width="346" height="756" rx="4" fill="none" stroke="#c9a24a" stroke-width=".8" opacity=".5"/>'+
  [[40,520],[352,520],[40,760],[352,760]].map(p=>'<circle cx="'+p[0]+'" cy="'+p[1]+'" r="3" fill="#c9a24a" opacity=".7"/>').join('')+
  Array.from({length:26},(_,i)=>'<circle cx="'+(30+r1(i+3)*330).toFixed(0)+'" cy="'+(40+r1(i*4+9)*300).toFixed(0)+'" r="'+(1+r1(i)*1.6).toFixed(1)+'" fill="#c9a24a" opacity=".45"/>').join('')+
  '<path d="M0 560Q100 500 200 550T390 520V800H0Z" fill="#cfe3d6" opacity=".9"/><path d="M0 620Q120 570 240 615T390 590V800H0Z" fill="#9fc3b5" opacity=".9"/><path d="M320 14h30v70l-15-14-15 14Z" fill="#b3282d"/></svg>',
 cover:'<div class="sc-bk b"></div><div class="sc-bk a"></div>'};
/* ---------- 8. Tiket: sobekan boarding pass ---------- */
SC.tiket={couple:'g6',vc:'tuxIvory',fl:['#f7b267','#fff1dc','#8ec5e8','#f4845f'],
 bg:id=>'<svg viewBox="0 0 390 800" preserveAspectRatio="xMidYMax slice"><defs><linearGradient id="g'+id+'" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#bcdcf5"/><stop offset="1" stop-color="#f7fbff"/></linearGradient></defs><rect width="390" height="800" fill="url(#g'+id+')"/><g fill="#fff" opacity=".85"><ellipse cx="70" cy="110" rx="60" ry="14"/><ellipse cx="110" cy="100" rx="40" ry="14"/><ellipse cx="320" cy="190" rx="70" ry="14"/><ellipse cx="280" cy="180" rx="38" ry="12"/><ellipse cx="60" cy="330" rx="64" ry="12"/></g>'+
  '<path d="M20 560C100 420 150 520 220 380S330 170 372 70" fill="none" stroke="#e8913a" stroke-width="2.4" stroke-dasharray="3 9" stroke-linecap="round"/><g transform="translate(372 70) rotate(-55)" fill="#1f3a5f"><path d="M0 0l-22 -5l-6 -3l-2 3l6 5l-8 4l-10 -2l-1 2l8 6l6 -1l8 6l3 -2l-5 -9l9 -2l8 8Z" transform="scale(1.3)"/></g></svg>',
 cover:'<div class="sc-tk a"></div><div class="sc-tk b"></div>'};
/* ---------- 9. Polaroid: tumpukan foto beterbangan ---------- */
SC.polaroid={couple:'g9',vc:'pastelBlue',fl:['#f5b7a0','#fff2e2','#c8d9a8','#f2d27a'],
 bg:id=>{const card=(x,y,r,c1,c2)=>'<g transform="translate('+x+' '+y+') rotate('+r+')"><rect x="-46" y="-54" width="92" height="108" fill="#fffdf8" filter="drop-shadow(0 4px 5px rgba(60,30,10,.3))"/><rect x="-39" y="-47" width="78" height="76" fill="url(#p'+id+')"/><rect x="-14" y="-62" width="28" height="12" fill="#f2e3a8" opacity=".85" transform="rotate(-4)"/></g>';
  return '<svg viewBox="0 0 390 800" preserveAspectRatio="xMidYMax slice"><defs><linearGradient id="p'+id+'" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f7c9b3"/><stop offset="1" stop-color="#b8d4c8"/></linearGradient></defs><rect width="390" height="800" fill="#d8b68c"/>'+[0,1,2,3,4,5,6,7,8,9,10,11,12,13].map(i=>'<rect x="'+(i*28)+'" width="2" height="800" fill="#9c7448" opacity=".25"/>').join('')+'<rect width="390" height="800" fill="#f3e2c6" opacity=".25"/>'+card(52,330,-9)+card(338,300,8)+card(46,500,6)+card(346,470,-7)+'</svg>'},
 cover:'<div class="sc-pil" style="--dx:-130%;--dy:-40%;--r:-40deg;--z:1;--tr:-6deg"></div><div class="sc-pil" style="--dx:130%;--dy:-30%;--r:36deg;--z:2;--tr:5deg"></div><div class="sc-pil" style="--dx:-120%;--dy:60%;--r:-30deg;--z:3;--tr:-3deg"></div><div class="sc-pil" style="--dx:0%;--dy:140%;--r:14deg;--z:4;--tr:2deg"></div>'};
/* ---------- 10. Bioskop: tirai merah dan lampu sorot ---------- */
SC.bioskop={couple:'g10',vc:'tuxRed',fl:['#d64545','#f2c94c','#f5e6d0','#8f1f2a'],
 bg:id=>'<svg viewBox="0 0 390 800" preserveAspectRatio="xMidYMax slice"><defs><linearGradient id="b'+id+'" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff6d8" stop-opacity=".55"/><stop offset="1" stop-color="#fff6d8" stop-opacity="0"/></linearGradient><pattern id="h'+id+'" width="28" height="30" patternUnits="userSpaceOnUse"><rect width="28" height="30" fill="#1b1013"/><rect x="8" y="8" width="12" height="14" rx="3" fill="#6b5a4a"/></pattern></defs><rect width="390" height="800" fill="#120709"/><path d="M110 0H280L390 560H0Z" fill="url(#b'+id+')" opacity=".7"/><path d="M0 0H120L60 480H0Z" fill="url(#b'+id+')" opacity=".35"/><rect x="0" width="30" height="800" fill="url(#h'+id+')"/><rect x="360" width="30" height="800" fill="url(#h'+id+')"/>'+
  [30,90,150,210,270,330,390].map((x,i)=>'<rect x="'+(x+8)+'" y="690" width="40" height="70" rx="14" fill="#2a0f14"/>').join('')+'</svg>',
 cover:'<div class="sc-cur red l"></div><div class="sc-cur red r"></div><div class="sc-val"></div>'};
/* ---------- 11. Balon udara: awan membuka ---------- */
function balloon(x,y,s,c1,c2,d){return '<g class="sc-ball" style="animation-delay:'+d+'s" transform="translate('+x+' '+y+') scale('+s+')"><ellipse cx="0" cy="0" rx="34" ry="42" fill="'+c1+'"/><path d="M0 -42C-18 -26 -18 26 0 42C18 26 18 -26 0 -42Z" fill="'+c2+'"/><path d="M-34 0H34" stroke="#fff" stroke-width="2" opacity=".5"/><path d="M-22 38L-9 66M22 38L9 66" stroke="#6b4a2a" stroke-width="1.4"/><rect x="-11" y="66" width="22" height="14" rx="2" fill="#a8743a"/></g>'}
SC.balon={couple:'g7',vc:'sky',fl:['#f6b3a0','#fff1e4','#9ecbe8','#f4d36a'],
 bg:id=>'<svg viewBox="0 0 390 800" preserveAspectRatio="xMidYMax slice"><defs><linearGradient id="g'+id+'" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8fc3ee"/><stop offset=".6" stop-color="#d6ebfa"/><stop offset="1" stop-color="#ffe9d6"/></linearGradient></defs><rect width="390" height="800" fill="url(#g'+id+')"/><g class="sc-cloud" fill="#fff"><ellipse cx="70" cy="190" rx="70" ry="14" opacity=".8"/><ellipse cx="330" cy="130" rx="64" ry="12" opacity=".7"/><ellipse cx="300" cy="380" rx="80" ry="14" opacity=".75"/><ellipse cx="60" cy="430" rx="64" ry="12" opacity=".7"/></g>'+balloon(60,300,.9,'#f08a5d','#fbd7a8',0)+balloon(335,260,.7,'#4f9bd6','#cfe8fa',-2)+balloon(320,470,.6,'#e86a8a','#fbd0da',-4)+'<path d="M0 640Q130 590 260 640T390 610V800H0Z" fill="#cfe3b9"/></svg>',
 cover:'<div class="sc-sky"></div><div class="sc-cl" style="--x:-120%;--y:-20%;left:-20%;top:2%"></div><div class="sc-cl" style="--x:120%;--y:-20%;right:-20%;top:12%"></div><div class="sc-cl" style="--x:-120%;--y:30%;left:-25%;top:45%"></div><div class="sc-cl" style="--x:120%;--y:30%;right:-25%;top:52%"></div><div class="sc-cl" style="--x:0%;--y:120%;left:10%;bottom:-12%"></div>'};
/* ---------- 12. Lampion: lentera naik ke langit malam ---------- */
SC.lampion={couple:'g3',vc:'champagne',fl:['#ffb45a','#ffe3a8','#c96a3a','#f2d27a'],
 bg:id=>'<svg viewBox="0 0 390 800" preserveAspectRatio="xMidYMax slice"><defs><linearGradient id="g'+id+'" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0b0f2e"/><stop offset=".7" stop-color="#2a1a4a"/><stop offset="1" stop-color="#5a2a4a"/></linearGradient><radialGradient id="o'+id+'"><stop offset="0" stop-color="#ffcf7a"/><stop offset="1" stop-color="#ffcf7a" stop-opacity="0"/></radialGradient></defs><rect width="390" height="800" fill="url(#g'+id+')"/>'+
  Array.from({length:60},(_,i)=>'<circle cx="'+(r1(i+1)*390).toFixed(0)+'" cy="'+(r1(i*3+2)*520).toFixed(0)+'" r="'+(.6+r1(i)*1.4).toFixed(1)+'" fill="#fff" opacity="'+(.3+r1(i+7)*.6).toFixed(2)+'"/>').join('')+
  '<circle cx="300" cy="120" r="30" fill="#fff6d6"/><circle cx="312" cy="112" r="26" fill="#1a1440"/>'+
  [[40,0,70],[120,0,150],[210,0,100],[290,0,190],[355,0,120]].map((p,i)=>'<g class="sc-lan" style="animation-delay:'+(-i*1.3)+'s"><line x1="'+p[0]+'" y1="0" x2="'+p[0]+'" y2="'+p[2]+'" stroke="#8a6a3a" stroke-width="1"/><circle cx="'+p[0]+'" cy="'+(p[2]+22)+'" r="34" fill="url(#o'+id+')"/><rect x="'+(p[0]-13)+'" y="'+p[2]+'" width="26" height="36" rx="10" fill="#ff9a3c"/><rect x="'+(p[0]-13)+'" y="'+(p[2]+10)+'" width="26" height="3" fill="#a24f10" opacity=".6"/></g>').join('')+
  '<path d="M0 640Q40 590 70 640T140 620Q190 570 230 630T330 610Q370 590 390 620V800H0Z" fill="#150d2a"/></svg>',
 cover:'<div class="sc-night"></div><i class="sc-lt" style="left:8%;top:12%;--d:0s"></i><i class="sc-lt" style="left:28%;top:62%;--d:.1s"></i><i class="sc-lt" style="left:62%;top:8%;--d:.2s"></i><i class="sc-lt" style="left:84%;top:50%;--d:.3s"></i><i class="sc-lt" style="left:14%;top:78%;--d:.15s"></i><i class="sc-lt" style="left:74%;top:84%;--d:.25s"></i><i class="sc-lt" style="left:46%;top:88%;--d:.05s"></i>'};
const THEMES={
 joglo:{theme:{primary:'#7a1f2b',accent:'#b8923f',bg:'#f7efdc',text:'#3b2a1a',soft:'#ecdfbf'},font:'classic',style:'soft',flow:'amv',anim:'rise',pat:'none',flora:false,mo:{sk:2,hv:0,fx:1,op:0,lt:3,bd:1,au:0}},
 beludru:{theme:{primary:'#e8cdbf',accent:'#c9a36a',bg:'#101a0f',text:'#f1e6dc',soft:'#1c2a19'},font:'signature',style:'soft',flow:'amv',anim:'fade',pat:'none',flora:false,mo:{sk:4,hv:0,fx:11,op:0,lt:1,bd:3,au:0}},
 candi:{theme:{primary:'#8b1e2d',accent:'#b8864b',bg:'#faf6f0',text:'#4a2326',soft:'#f0e4dc'},font:'parisienne',style:'soft',flow:'amv',anim:'rise',pat:'none',flora:false,mo:{sk:1,hv:0,fx:0,op:0,lt:4,bd:3,au:0}},
 ulos:{theme:{primary:'#e0b84a',accent:'#c0282d',bg:'#170d0d',text:'#f3e7d8',soft:'#2a1515'},font:'luxe',style:'bold',flow:'amv',anim:'slide',pat:'none',flora:false,mo:{sk:6,hv:0,fx:5,op:0,lt:2,bd:2,au:0}},
 songket:{theme:{primary:'#f2cf7a',accent:'#d4a537',bg:'#34090f',text:'#f6e9cf',soft:'#4a1219'},font:'luxe',style:'soft',flow:'amv',anim:'zoom',pat:'none',flora:false,mo:{sk:5,hv:0,fx:8,op:0,lt:0,bd:1,au:0}},
 senja:{theme:{primary:'#7a3b5e',accent:'#e0975a',bg:'#fff4ea',text:'#46283a',soft:'#fbe1cf'},font:'romantic',style:'soft',flow:'amv',anim:'rise',pat:'none',flora:false,mo:{sk:3,hv:0,fx:6,op:0,lt:1,bd:3,au:0}},
 buku:{theme:{primary:'#2f5d62',accent:'#c9a24a',bg:'#fbf5e8',text:'#33302a',soft:'#efe4cc'},font:'script',style:'soft',flow:'amv',anim:'rise',pat:'none',flora:false,mo:{sk:1,hv:0,fx:5,op:0,lt:4,bd:3,au:0}},
 tiket:{theme:{primary:'#1f3a5f',accent:'#e8913a',bg:'#f4f8fc',text:'#1d2b3d',soft:'#dde9f5'},font:'clean',style:'soft',flow:'amv',anim:'slide',pat:'none',flora:false,mo:{sk:5,hv:0,fx:4,op:0,lt:3,bd:3,au:0}},
 polaroid:{theme:{primary:'#5a3a2a',accent:'#d9805f',bg:'#fbf1e4',text:'#3a2a20',soft:'#f0dfc9'},font:'playful',style:'soft',flow:'amv',anim:'zoom',pat:'none',flora:false,mo:{sk:3,hv:0,fx:3,op:0,lt:3,bd:3,au:0}},
 bioskop:{theme:{primary:'#f2c94c',accent:'#d64545',bg:'#140a0c',text:'#f5e6d0',soft:'#241216'},font:'editorial',style:'bold',flow:'amv',anim:'fade',pat:'none',flora:false,mo:{sk:6,hv:0,fx:9,op:0,lt:2,bd:2,au:0}},
 balon:{theme:{primary:'#2d5f8a',accent:'#f08a5d',bg:'#f3f9fd',text:'#213547',soft:'#dcecf7'},font:'parisienne',style:'soft',flow:'amv',anim:'rise',pat:'none',flora:false,mo:{sk:4,hv:0,fx:4,op:0,lt:1,bd:3,au:0}},
 lampion:{theme:{primary:'#f4c77b',accent:'#ff9a3c',bg:'#0d1230',text:'#f3e9d6',soft:'#1a2150'},font:'signature',style:'soft',flow:'amv',anim:'fade',pat:'none',flora:false,mo:{sk:4,hv:0,fx:8,op:0,lt:0,bd:3,au:0}}
};
const NAMES={joglo:'Joglo Sepia',beludru:'Amplop Beludru',candi:'Candi Kabut',ulos:'Tenun Ulos',songket:'Songket Emas',senja:'Senja Taman',buku:'Buku Cerita',tiket:'Tiket Perjalanan',polaroid:'Album Polaroid',bioskop:'Layar Bioskop',balon:'Balon Udara',lampion:'Lampion Malam'};

/* ---------- 13-17. Rumah adat: limas, krong bade, melayu, ballroom, taman ---------- */
const Rc=(x,y,w,h,f,e)=>'<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" fill="'+f+'" '+(e||'')+'/>';
const Pl=(pts,f,e)=>'<polygon points="'+pts+'" fill="'+f+'" '+(e||'')+'/>';
const Pa=(d,f,e)=>'<path d="'+d+'" fill="'+f+'" '+(e||'')+'/>';
const sky=(id,a,b,c)=>'<defs><linearGradient id="k'+id+'" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="'+a+'"/><stop offset=".55" stop-color="'+b+'"/><stop offset="1" stop-color="'+c+'"/></linearGradient></defs><rect width="390" height="800" fill="url(#k'+id+')"/>';
const palm=(x,y,s,c)=>'<g class="sc-sway" transform="translate('+x+' '+y+') scale('+s+')"><path d="M0 0Q4 -60 -2 -130" stroke="#4a3320" stroke-width="7" fill="none"/>'+[-70,-35,0,35,70].map(a=>'<path d="M-2 -130Q'+(a*1.1)+' -170 '+(a*1.9)+' -118" stroke="'+c+'" stroke-width="9" fill="none" stroke-linecap="round" opacity=".95"/>').join('')+'</g>';
const ripple=(y0,n,c)=>Array.from({length:n},(_,i)=>'<path d="M'+((i*97)%330)+' '+(y0+i*13)+'q18 -6 36 0t36 0" fill="none" stroke="'+c+'" stroke-width="1.3" opacity=".35"/>').join('');
/* 13. Rumah Limas (Palembang): atap berundak, gerbang emas membuka atas dan bawah */
SC.limas={couple:'g1',vc:'jawa2',fl:['#e7b44f','#fff0c2','#c4453f','#f4d36a'],
 bg:id=>'<svg viewBox="0 0 390 800" preserveAspectRatio="xMidYMax slice">'+sky(id,'#ffe6bd','#ffc98f','#fbe3b8')+
  '<g class="sc-sun"><circle cx="300" cy="190" r="70" fill="#fff4cf" opacity=".6"/><circle cx="300" cy="190" r="34" fill="#fffaf0"/></g>'+
  '<g class="sc-cloud"><ellipse cx="80" cy="150" rx="70" ry="12" fill="#fff" opacity=".6"/><ellipse cx="250" cy="260" rx="80" ry="11" fill="#fff" opacity=".5"/></g>'+
  Rc(0,690,390,110,'#3f8c8f')+ripple(700,6,'#fff')+
  [48,86,124,162,200,238,276,314].map(x=>Rc(x,640,10,80,'#4d2f1a')).join('')+Rc(30,630,330,14,'#6b4326')+
  Rc(44,470,302,162,'#b87639')+[64,104,144,184,224,264,304].map(x=>Rc(x,474,3,154,'#7e4d22','opacity=".55"')).join('')+
  Rc(44,470,302,12,'#e0b04f')+[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14].map(i=>Pl((52+i*20)+',482 '+(62+i*20)+',482 '+(57+i*20)+',492','#7b2418')).join('')+
  [70,170,270].map(x=>Rc(x,510,50,86,'#4a2c16')+Pa('M'+x+' 510a25 22 0 0 1 50 0','#4a2c16')+Rc(x+6,516,38,76,'#f2c26a','opacity=".85"')+Rc(x+24,516,2,76,'#4a2c16')).join('')+
  Pl('4,472 386,472 332,416 58,416','#8c2f22')+Pl('4,472 386,472 380,480 10,480','#e0b04f')+
  Pl('72,418 318,418 282,376 108,376','#9a3727')+Pl('72,418 318,418 312,426 78,426','#e0b04f')+
  Pl('112,378 278,378 244,342 146,342','#a8412e')+Pl('112,378 278,378 272,385 118,385','#e0b04f')+
  Rc(193,310,4,34,'#e0b04f')+'<circle cx="195" cy="306" r="6" fill="#e0b04f"/>'+
  Pl('170,632 220,632 232,720 158,720','#7a4a28')+[640,656,672,688,704].map(y=>Rc(160,y,70,3,'#4d2f1a','opacity=".5"')).join('')+
  '</svg>',
 cover:'<div class="sc-gate t"></div><div class="sc-gate b"></div>'};
/* 14. Rumah Krong Bade (Aceh): rumah panggung tinggi, ubin tenun jatuh */
SC.krong={couple:'g5',vc:'melayu',fl:['#e7c35a','#fff0b8','#c9302c','#e0a53a'],
 bg:id=>'<svg viewBox="0 0 390 800" preserveAspectRatio="xMidYMax slice">'+sky(id,'#2a1230','#7a2a3e','#f2a05a')+
  '<g class="sc-sun"><circle cx="195" cy="470" r="150" fill="#ffb86b" opacity=".35"/><circle cx="195" cy="470" r="60" fill="#ffd89a"/></g>'+
  Pa('M-20 560Q80 480 190 540T410 520V800H-20Z','#3b1a2a','opacity=".9"')+palm(40,700,1.05,'#254a35')+palm(352,700,1.05,'#254a35')+
  [60,104,148,192,236,280].map(x=>Rc(x,610,12,130,'#4a2415')+Rc(x-3,600,18,8,'#e0a53a')).join('')+
  Rc(44,500,302,112,'#8a2326')+[0,1,2,3,4,5].map(i=>Pa('M'+(62+i*48)+' 520l18 20l-18 20l-18 -20z','none','stroke="#f0c768" stroke-width="2"')).join('')+
  [0,1,2,3,4,5].map(i=>Pa('M'+(62+i*48)+' 580l18 -14l-18 -14','none','stroke="#f0c768" stroke-width="1.4" opacity=".7"')).join('')+
  Rc(44,498,302,8,'#f0c768')+Rc(44,606,302,8,'#f0c768')+
  Pl('14,502 376,502 332,440 58,440','#5d1519')+Pl('14,502 376,502 370,512 20,512','#f0c768')+
  Pl('84,442 306,442 262,360 128,360','#6d1a1e')+Pl('84,442 306,442 298,452 92,452','#f0c768')+
  Pl('128,362 262,362 240,330 150,330','#7b2024')+
  [150,172,194,216,238].map(x=>Pa('M'+x+' 362L'+(x+10)+' 330','none','stroke="#f0c768" stroke-width="2"')).join('')+
  Rc(193,296,4,36,'#f0c768')+Pl('195,286 203,300 187,300','#f0c768')+
  Pl('170,612 220,612 236,740 154,740','#5a3018')+[622,640,658,676,694,712,730].map(y=>Rc(160,y,70,3,'#2a1208','opacity=".55"')).join('')+
  '</svg>',
 cover:'<i class="sc-tl" style="--i:0;left:0"></i><i class="sc-tl" style="--i:1;left:12.5%"></i><i class="sc-tl" style="--i:2;left:25%"></i><i class="sc-tl" style="--i:3;left:37.5%"></i><i class="sc-tl" style="--i:4;left:50%"></i><i class="sc-tl" style="--i:5;left:62.5%"></i><i class="sc-tl" style="--i:6;left:75%"></i><i class="sc-tl" style="--i:7;left:87.5%"></i>'};
/* 15. Rumah Melayu: rumah panggung bersilang selembayung, tikar digulung */
SC.melayu={couple:'g4',vc:'melayu',fl:['#f0c768','#fff2c8','#2f8f83','#e8884a'],
 bg:id=>'<svg viewBox="0 0 390 800" preserveAspectRatio="xMidYMax slice">'+sky(id,'#0f3d47','#2c7a7a','#f6c46e')+
  '<g class="sc-sun"><circle cx="195" cy="520" r="120" fill="#ffd27a" opacity=".4"/><circle cx="195" cy="520" r="46" fill="#ffe4a0"/></g>'+
  '<g class="sc-cloud"><ellipse cx="90" cy="170" rx="70" ry="11" fill="#fff" opacity=".28"/><ellipse cx="300" cy="230" rx="76" ry="10" fill="#fff" opacity=".22"/></g>'+
  Rc(0,660,390,140,'#1d5b63')+ripple(676,6,'#ffe4a0')+palm(36,690,1.1,'#1d4a3a')+palm(356,690,1.1,'#1d4a3a')+
  [64,112,160,208,256,304].map(x=>Rc(x,620,11,90,'#4a2e18')).join('')+Rc(40,606,310,14,'#6e4426')+
  Rc(52,486,286,122,'#d6a24f')+[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17].map(i=>Pl((56+i*16)+',498 '+(72+i*16)+',498 '+(64+i*16)+',516','#8b3a1e')).join('')+
  [76,160,244].map(x=>Rc(x,528,60,80,'#3a2412')+Pa('M'+x+' 528a30 26 0 0 1 60 0','#3a2412')+Rc(x+7,534,46,70,'#ffd98a')+Rc(x+29,534,2,70,'#3a2412')).join('')+
  Pl('26,490 364,490 306,420 84,420','#2a4a4e')+Pl('26,490 364,490 356,500 34,500','#e0b04f')+
  Pl('118,422 272,422 240,370 150,370','#33585c')+
  Pa('M195 372L150 322Q146 316 152 314L195 350L238 314Q244 316 240 322Z','#e0b04f')+Pa('M195 372L174 300Q172 292 180 296L195 330L210 296Q218 292 216 300Z','#c4871f')+
  Pl('172,606 218,606 228,720 162,720','#7a4a28')+[616,634,652,670,688,706].map(y=>Rc(164,y,60,3,'#3a2412','opacity=".5"')).join('')+
  '</svg>',
 cover:'<div class="sc-roll"></div>'};
/* 16. Ballroom (modern barat): lengkungan, bokeh, sorot lampu membuka */
SC.ballroom={couple:'g6',vc:'tuxIvory',fl:['#f5e6d3','#ffffff','#e9c6a8','#d9a5b3'],
 bg:id=>'<svg viewBox="0 0 390 800" preserveAspectRatio="xMidYMax slice">'+sky(id,'#f8f1e8','#eadfcf','#d8c8b2')+
  [[26,150],[146,98],[266,98]].map(a=>'').join('')+
  [20,148,276].map(x=>Pa('M'+x+' 640V470a47 47 0 0 1 94 0V640Z','#1b2442')+'<g fill="#fff" opacity=".7">'+[[10,30],[40,20],[70,52],[24,86],[60,100]].map(p=>'<circle cx="'+(x+p[0]+6)+'" cy="'+(440+p[1])+'" r="1.4"/>').join('')+'</g>'+Pa('M'+x+' 640V470a47 47 0 0 1 94 0V640','none','stroke="#c9a45c" stroke-width="5"')+Pa('M'+(x-8)+' 640V470a55 55 0 0 1 110 0V640','none','stroke="#e9d3a0" stroke-width="2"')+Rc(x+46,415,2,225,'#c9a45c','opacity=".6"')).join('')+
  Rc(0,640,390,160,'#efe5d6')+Array.from({length:7},(_,i)=>Pl((i*70-20)+',640 '+(i*70+30)+',640 '+(i*70+60)+',800 '+(i*70-70)+',800',i%2?'#d9cbb5':'#f6eddf')).join('')+
  '<g class="sc-cloud">'+Array.from({length:14},(_,i)=>'<circle cx="'+((i*61+30)%380)+'" cy="'+(300+((i*47)%320))+'" r="'+(5+i%4*3)+'" fill="#ffe9b0" opacity=".28"/>').join('')+'</g>'+
  Pa('M0 0H70Q40 160 62 330H0Z','#8c3a4a','opacity=".85"')+Pa('M390 0H320Q350 160 328 330H390Z','#8c3a4a','opacity=".85"')+
  '</svg>',
 cover:'<div class="sc-spot"></div>'};
/* 17. Taman modern: gazebo bunga, jalusi membuka */
SC.taman={couple:'g7',vc:'pastel',fl:['#f7b6c2','#fff3f0','#cfe3c0','#f4d58a'],
 bg:id=>'<svg viewBox="0 0 390 800" preserveAspectRatio="xMidYMax slice">'+sky(id,'#d5e8f7','#f1f3ee','#e4eed8')+
  '<g class="sc-cloud"><ellipse cx="80" cy="140" rx="70" ry="12" fill="#fff" opacity=".8"/><ellipse cx="300" cy="200" rx="80" ry="12" fill="#fff" opacity=".75"/></g>'+
  Pa('M-20 560Q100 500 220 550T410 530V800H-20Z','#bcd9a4')+Pa('M-20 620Q120 570 250 615T410 600V800H-20Z','#9fc88a')+
  Pa('M42 660V450a153 130 0 0 1 306 0V660','none','stroke="#fff" stroke-width="12"')+Pa('M42 660V450a153 130 0 0 1 306 0V660','none','stroke="#e8d9c4" stroke-width="3"')+
  Pa('M62 660V455a133 112 0 0 1 266 0V660','none','stroke="#fff" stroke-width="5" opacity=".8"')+
  '<g class="sc-sway">'+bunch(64,470,40,90,['#f7b6c2','#fff3f0','#f4d58a'],20,5)+bunch(326,470,40,90,['#f7b6c2','#fff3f0','#cfe3c0'],20,9)+bunch(195,336,80,26,['#fff3f0','#f7b6c2','#f4d58a'],22,13)+'</g>'+
  '</svg>',
 cover:'<i class="sc-jl" style="--i:0;top:0"></i><i class="sc-jl" style="--i:1;top:14.3%"></i><i class="sc-jl" style="--i:2;top:28.6%"></i><i class="sc-jl" style="--i:3;top:42.9%"></i><i class="sc-jl" style="--i:4;top:57.2%"></i><i class="sc-jl" style="--i:5;top:71.5%"></i><i class="sc-jl" style="--i:6;top:85.8%"></i>'};
Object.assign(THEMES,{
 limas:{theme:{primary:'#8c2f22',accent:'#c4871f',bg:'#fff1d8',text:'#4a2a1a',soft:'#fbe2b8'},font:'classic',style:'soft',flow:'amv',anim:'rise',pat:'none',flora:false,mo:{sk:2,hv:0,fx:2,op:0,lt:3,bd:1,au:0}},
 krong:{theme:{primary:'#f0c768',accent:'#e0a53a',bg:'#2a1230',text:'#f6e6cf',soft:'#3d1a3a'},font:'luxe',style:'soft',flow:'amv',anim:'zoom',pat:'none',flora:false,mo:{sk:5,hv:0,fx:8,op:0,lt:0,bd:1,au:0}},
 melayu:{theme:{primary:'#f0c768',accent:'#e8884a',bg:'#0f3d47',text:'#f6ead0',soft:'#17525a'},font:'signature',style:'soft',flow:'amv',anim:'fade',pat:'none',flora:false,mo:{sk:4,hv:0,fx:4,op:0,lt:1,bd:3,au:0}},
 ballroom:{theme:{primary:'#8c3a4a',accent:'#b8923f',bg:'#f8f1e8',text:'#3a2c32',soft:'#eadfcf'},font:'editorial',style:'soft',flow:'amv',anim:'fade',pat:'none',flora:false,mo:{sk:3,hv:0,fx:11,op:0,lt:2,bd:2,au:0}},
 taman:{theme:{primary:'#4f7a5a',accent:'#d98aa0',bg:'#f3f8ee',text:'#33473a',soft:'#e3eed8'},font:'romantic',style:'soft',flow:'amv',anim:'rise',pat:'none',flora:false,mo:{sk:1,hv:0,fx:6,op:0,lt:4,bd:3,au:0}}});
Object.assign(NAMES,{limas:'Rumah Limas Palembang',krong:'Krong Bade Aceh',melayu:'Rumah Melayu',ballroom:'Ballroom Barat',taman:'Taman Modern'});
/* ---------- 18-21. Rumah Gadang, Selaso Riau, Istana Maimun, Pendopo Jawa ---------- */
const gon=(x,y,w,h,f,g)=>Pa('M'+x+' '+y+'Q'+(x+w*.12)+' '+(y-h*.5)+' '+(x+w*.04)+' '+(y-h)+'Q'+(x+w*.3)+' '+(y-h*.5)+' '+(x+w*.5)+' '+(y-h*.45)+'Q'+(x+w*.7)+' '+(y-h*.5)+' '+(x+w*.96)+' '+(y-h)+'Q'+(x+w*.88)+' '+(y-h*.5)+' '+(x+w)+' '+y+'Z',f,g||'');
SC.gadang={couple:'g0',vc:'melayu',fl:['#e7c35a','#fff0b8','#c9302c','#d98aa0'],
 bg:id=>'<svg viewBox="0 0 390 800" preserveAspectRatio="xMidYMax slice">'+sky(id,'#9ec9d8','#e8dcc0','#f3d9a2')+
  '<g class="sc-cloud"><ellipse cx="90" cy="160" rx="70" ry="11" fill="#fff" opacity=".7"/><ellipse cx="290" cy="240" rx="80" ry="11" fill="#fff" opacity=".6"/></g>'+
  Pa('M-20 520Q60 400 150 500T300 470T420 520V800H-20Z','#5f8a5a','opacity=".8"')+Pa('M-20 600Q120 540 250 600T420 580V800H-20Z','#487a3f')+
  [70,118,166,214,262,310].map(x=>Rc(x,600,10,80,'#4a2a18')).join('')+Rc(40,586,310,16,'#6b3a1e')+
  Pl('52,586 338,586 322,470 68,470','#8a2a22')+[84,130,176,222,268].map(x=>Rc(x,478,4,104,'#e0b04f','opacity=".7"')).join('')+
  [0,1,2,3,4,5,6,7,8].map(i=>Pl((70+i*30)+',482 '+(84+i*30)+',482 '+(77+i*30)+',500','#e0b04f','opacity=".8"')).join('')+
  gon(40,474,310,90,'#3a2418')+gon(110,420,170,64,'#4a2d1d')+
  Pa('M40 474Q57 429 54 384','none','stroke="#e0b04f" stroke-width="3"')+Pa('M350 474Q333 429 336 384','none','stroke="#e0b04f" stroke-width="3"')+
  Pl('170,600 220,600 232,700 158,700','#7a4a28')+[610,628,646,664,682].map(y=>Rc(160,y,70,3,'#3a2412','opacity=".5"')).join('')+
  '</svg>',
 cover:'<div class="sc-mzg">'+Array.from({length:24},(_,i)=>'<i style="--i:'+((i%4)+(i/4|0))+'"></i>').join('')+'</div>'};
SC.selaso={couple:'g3',vc:'melayu',fl:['#f6d36a','#fff4c8','#2f8f6a','#e8884a'],
 bg:id=>'<svg viewBox="0 0 390 800" preserveAspectRatio="xMidYMax slice">'+sky(id,'#f6d36a','#f9e9b4','#cfe8d8')+
  '<g class="sc-sun"><circle cx="90" cy="150" r="52" fill="#fff6d0" opacity=".7"/></g>'+
  Rc(0,640,390,160,'#3a8a74')+ripple(660,6,'#fff')+palm(34,690,1.1,'#2a6a4a')+palm(358,690,1.1,'#2a6a4a')+
  [66,110,154,198,242,286].map(x=>Rc(x,610,11,90,'#6a4220')).join('')+Rc(44,598,302,13,'#8a5a2a')+
  Rc(56,470,278,130,'#f2d27a')+[70,128,186,244].map(x=>Rc(x,490,46,100,'#6a4220')+Pa('M'+x+' 490a23 22 0 0 1 46 0','#6a4220')+Rc(x+6,496,34,90,'#ffe9a8','opacity=".9"')).join('')+
  Pl('30,474 360,474 306,418 84,418','#2f7a5a')+Pl('30,474 360,474 352,484 38,484','#c4871f')+
  Pl('100,420 290,420 258,366 132,366','#3a8a6a')+Pl('100,420 290,420 284,428 106,428','#c4871f')+
  Pl('150,368 240,368 220,330 170,330','#46997a')+
  Pa('M195 332L160 290Q156 283 163 283L195 310L227 283Q234 283 230 290Z','#c4871f')+Rc(193,270,4,64,'#c4871f')+
  Pl('172,598 218,598 228,700 162,700','#8a5a2a')+[606,624,642,660,678].map(y=>Rc(164,y,60,3,'#4a2c12','opacity=".5"')).join('')+
  '</svg>',
 cover:'<div class="sc-fan"></div>'};
SC.maimun={couple:'g9',vc:'melayu',fl:['#f6d44a','#fff7cf','#2f8f4f','#e0892a'],
 bg:id=>'<svg viewBox="0 0 390 800" preserveAspectRatio="xMidYMax slice">'+sky(id,'#7fb5dc','#cfe6f2','#fbeec0')+
  '<g class="sc-cloud"><ellipse cx="80" cy="150" rx="70" ry="12" fill="#fff" opacity=".85"/><ellipse cx="300" cy="230" rx="80" ry="12" fill="#fff" opacity=".8"/></g>'+
  Rc(0,660,390,140,'#7da86a')+Rc(0,660,390,10,'#5f8a50')+palm(30,690,1.1,'#2f6a3a')+palm(362,690,1.1,'#2f6a3a')+
  Rc(36,470,318,196,'#f4d03f')+Rc(36,470,318,10,'#d9a520')+Rc(36,656,318,10,'#d9a520')+
  [56,106,156,206,256,306].map(x=>Rc(x,506,28,150,'#fbe27a')+Pa('M'+x+' 506a14 14 0 0 1 28 0','#fbe27a')+Rc(x+5,512,18,140,'#2f6a3a')+Pa('M'+(x+5)+' 512a9 9 0 0 1 18 0','#2f6a3a')).join('')+
  Rc(150,400,90,72,'#f4d03f')+Rc(150,400,90,8,'#d9a520')+Pa('M158 472V430a37 36 0 0 1 74 0V472','#2f6a3a')+Pa('M160 400Q195 330 230 400Z','#2f8f4f')+Pa('M170 340Q195 280 220 340Z','#2f8f4f')+Rc(193,262,4,34,'#d9a520')+'<circle cx="195" cy="258" r="6" fill="#d9a520"/>'+
  Pl('30,470 360,470 340,436 50,436','#2f8f4f')+Pl('30,470 360,470 356,478 34,478','#d9a520')+
  '</svg>',
 cover:'<i class="sc-tiang" style="--i:0;left:0"></i><i class="sc-tiang" style="--i:1;left:16.7%"></i><i class="sc-tiang" style="--i:2;left:33.4%"></i><i class="sc-tiang" style="--i:3;left:50%"></i><i class="sc-tiang" style="--i:4;left:66.7%"></i><i class="sc-tiang" style="--i:5;left:83.4%"></i>'};
SC.pendopo={couple:'g8',vc:'jawa',fl:['#d9a441','#fff0c2','#b8452f','#f4d58a'],
 bg:id=>'<svg viewBox="0 0 390 800" preserveAspectRatio="xMidYMax slice">'+sky(id,'#40507a','#d98a6a','#f6c98a')+
  '<g class="sc-sun"><circle cx="195" cy="330" r="110" fill="#ffd59a" opacity=".35"/><circle cx="195" cy="330" r="40" fill="#ffe7bd"/></g>'+
  '<g class="sc-sway"><ellipse cx="40" cy="450" rx="60" ry="100" fill="#2d4a35"/><ellipse cx="355" cy="440" rx="62" ry="106" fill="#2d4a35"/></g>'+
  Rc(0,660,390,140,'#6a4a2a')+Rc(30,640,330,24,'#8a5a30')+
  [60,150,240,330].map(x=>Rc(x-8,430,16,214,'#5a3418')+Rc(x-12,424,24,10,'#d9a441')).join('')+
  Pl('14,432 376,432 310,368 80,368','#5a2e1a')+Pl('14,432 376,432 370,442 20,442','#d9a441')+
  Pl('92,370 298,370 252,316 138,316','#6a3820')+Pl('92,370 298,370 292,378 98,378','#d9a441')+
  Pl('142,318 248,318 222,282 168,282','#7a4326')+Rc(193,250,4,34,'#d9a441')+
  '<g class="sc-cloud">'+[105,195,285].map(x=>Rc(x-1,444,2,24,'#d9a441')+'<ellipse cx="'+x+'" cy="480" rx="9" ry="13" fill="#ffd27a"/>').join('')+'</g>'+
  '</svg>',
 cover:'<div class="sc-gun"></div>'};
Object.assign(THEMES,{
 gadang:{theme:{primary:'#8a2a22',accent:'#c4871f',bg:'#f7ecd2',text:'#3a2418',soft:'#efdcb0'},font:'classic',style:'soft',flow:'amv',anim:'rise',pat:'none',flora:false,mo:{sk:2,hv:0,fx:1,op:0,lt:3,bd:1,au:0}},
 selaso:{theme:{primary:'#2f7a5a',accent:'#c4871f',bg:'#fff6d8',text:'#2e3a2a',soft:'#f6e6a8'},font:'script',style:'soft',flow:'amv',anim:'slide',pat:'none',flora:false,mo:{sk:1,hv:0,fx:5,op:0,lt:4,bd:3,au:0}},
 maimun:{theme:{primary:'#2f6a3a',accent:'#d9a520',bg:'#eaf4fa',text:'#2a3a30',soft:'#fbf0c4'},font:'clean',style:'soft',flow:'amv',anim:'zoom',pat:'none',flora:false,mo:{sk:4,hv:0,fx:4,op:0,lt:1,bd:2,au:0}},
 pendopo:{theme:{primary:'#f4d58a',accent:'#d9a441',bg:'#2b2f4a',text:'#f8eed8',soft:'#3a3f62'},font:'luxe',style:'soft',flow:'amv',anim:'fade',pat:'none',flora:false,mo:{sk:6,hv:0,fx:8,op:0,lt:0,bd:3,au:0}}});
Object.assign(NAMES,{gadang:'Rumah Gadang',selaso:'Selaso Jatuh Kembar',maimun:'Istana Maimun',pendopo:'Pendopo Jawa'});
window.__invAssets={SC,V,couple,bunch,leaves,flowers,GP:/^g(\d|1[01])$/,THEMES};
/* daftarkan ke galeri: tampil paling depan di kategori Pernikahan */
if(Array.isArray(I.TEMPLATES)){const base=I.TEMPLATES.find(t=>t.cat==='wedding');
 if(base){const add=Object.keys(SC).map(k=>Object.assign({},base,THEMES[k],{id:'wedding-'+k,name:NAMES[k],scene:k,theme:Object.assign({},THEMES[k].theme),mo:Object.assign({},THEMES[k].mo),defaults:Object.assign({},base.defaults)}));
  const at=I.TEMPLATES.indexOf(base);I.TEMPLATES.splice(at,0,...add)}}

const GP=/^g(\d|1[01])$/;const GL=['Melayu: marun emas','Palembang: hijau emas','Jawa: hitam emas','Melayu: marun berhijab','Melayu: hijau berhijab','Aceh: hitam emas berhijab','Modern Barat: jas hitam gaun putih','Modern: navy','Jawa: hitam batik modern','Melayu: navy berhijab','Jawa: hitam berhijab','Modern: krem berhijab'];
window.__invCouple={skins:SKT,gl:GL,keys:()=>GL.map((_,i)=>'g'+i).concat(Object.keys(V)),def:k=>SC[k]&&SC[k].couple};
window.__invScene=function(wrap,data){
 if(!wrap||wrap.dataset.scene)return;const k=data&&data.scene;const S=SC[k];if(!S)return;
 const id=(++uid)+'';wrap.dataset.scene=k;wrap.classList.add('has-scene');
 const hero=wrap.querySelector('.hero');
 if(hero){const bg=document.createElement('div');bg.className='sc-bg';bg.setAttribute('aria-hidden','true');bg.innerHTML=S.bg(id);hero.insertBefore(bg,hero.firstChild);
  const fg=document.createElement('div');fg.className='sc-fg';fg.setAttribute('aria-hidden','true');
  const bc=S.fl.concat(['#fff']);const fb='<svg class="sc-fb" viewBox="0 0 390 420" preserveAspectRatio="xMidYMax slice">'+bunch(14,250,62,130,bc,24,3)+bunch(380,262,58,120,bc,22,17)+'</svg>';
  const fl='<svg class="sc-fl" viewBox="0 0 390 110" preserveAspectRatio="xMidYMax slice">'+leaves(390,110,k==='candi'||k==='joglo'?'#3f5f3a':'#2f4a2a',16,5,40)+flowers(390,110,S.fl,18,11,70)+'</svg>';
  const ci=I.safeUrl?I.safeUrl(data.ci):'';let cp='';
  if(!sh.couple){}else if(ci)cp='<div class="sc-cp custom"><img alt="" src="'+I.esc(ci)+'"></div>';
  else if(data.cv!=='none'){const ck=(data.cv&&(V[data.cv]||GP.test(data.cv)))?data.cv:S.couple,vk=V[ck]?ck:(V[S.vc]?S.vc:'jawa');
   const vec=()=>'<div class="sc-cp">'+couple(vk,id,{skin:+data.cs||0,hj:(data.ch===0||data.ch==='0')?0:1})+'</div>';
   if(GP.test(ck)){const n=+ck.slice(1),c=n%4,r=(n/4)|0;cp='<div class="sc-cp ph"><i style="background-position:'+(c*100/3)+'% '+(r*50)+'%"></i></div>'}else cp=vec();
   if(GP.test(ck)){setTimeout(()=>{const im=new Image();im.onerror=()=>{const b=hero.querySelector('.sc-cp.ph');if(b)b.outerHTML=vec()};im.src='couples.jpg'},0)}}
  fg.innerHTML=fb+cp+fl;hero.appendChild(fg)}
 const cover=wrap.querySelector('.cover');
 if(cover){const c=document.createElement('div');c.className='sc-cv';c.setAttribute('aria-hidden','true');c.innerHTML=S.cover;cover.insertBefore(c,cover.firstChild)}
};
})();

/* ===== FILM: undangan sinematik (AMV Typography dan adegan ilustrasi) yang jalan sendiri, ketuk di mana saja untuk jeda atau lanjut ===== */
(function(){
const I=window.Invita;if(!I)return;
const esc=s=>I.esc(s);
const MON=['JANUARI','FEBRUARI','MARET','APRIL','MEI','JUNI','JULI','AGUSTUS','SEPTEMBER','OKTOBER','NOVEMBER','DESEMBER'],DAY=['MINGGU','SENIN','SELASA','RABU','KAMIS','JUMAT','SABTU'];
const FONTS={anton:"'Anton','Bebas Neue','Impact','Arial Narrow',sans-serif",bebas:"'Bebas Neue','Anton','Impact','Arial Narrow',sans-serif",archivo:"'Archivo Black','Anton','Impact',sans-serif",syne:"'Syne','Archivo Black','Impact',sans-serif"};
const FNAME={anton:'Anton (tebal dan rapat)',bebas:'Bebas Neue (ramping)',archivo:'Archivo Black (lebar)',syne:'Syne (modern)'};
const LOOKS={
 neon:{n:'Neon Beat',base:'ballroom',c:['#07060d','#16072a','#ffffff','#ff2e93','#19f0ff'],f:'anton',fx:['glitch','slam','split','zoom'],calm:['wipe','rise'],dc:['grid','rings','stripes']},
 poster:{n:'Poster Merah',base:'limas',c:['#f3ead7','#e63a2e','#111111','#e63a2e','#1a4fd6'],f:'archivo',fx:['wipe','slam','stack','spin','split'],calm:['wipe','stack','rise'],dc:['bars','dots','cross']},
 cinema:{n:'Sinema Emas',base:'krong',c:['#0b0906','#1a1409','#f3e4bd','#d4a84a','#8a6a2a'],f:'bebas',fx:['zoom','wipe','slam','split'],calm:['rise','wipe'],dc:['rings','bars','stripes']},
 pop:{n:'Pop Warna',base:'taman',c:['#c9b8ff','#ffe66d','#1c1530','#ff6b9d','#3ddc97'],f:'syne',fx:['spin','split','slam','stack','wipe'],calm:['rise','split','wipe'],dc:['dots','cross','rings']}};
const FXL={auto:'Otomatis (campur)',slam:'Hantam',split:'Huruf berhamburan',wipe:'Sapuan',zoom:'Zoom menembus',spin:'Putar',glitch:'Glitch',stack:'Tumpuk'};
const DCL={auto:'Otomatis',none:'Tanpa dekorasi',rings:'Lingkaran',bars:'Garis',grid:'Kisi plus',dots:'Titik',stripes:'Diagonal',cross:'Silang'};
const CAMS={auto:{n:'Otomatis (campur)'},zin:{n:'Zoom mendekat',x:[0,0],y:[0,0],s:[1.02,1.15]},zout:{n:'Zoom menjauh',x:[0,0],y:[0,0],s:[1.17,1.02]},panl:{n:'Geser ke kiri',x:[4,-4],y:[0,0],s:[1.12,1.12]},panr:{n:'Geser ke kanan',x:[-4,4],y:[0,0],s:[1.12,1.12]},tup:{n:'Kamera naik',x:[0,0],y:[5,-5],s:[1.14,1.14]},tdn:{n:'Kamera turun',x:[0,0],y:[-5,5],s:[1.14,1.14]},push:{n:'Dorong mendekat',x:[0,0],y:[0,-2],s:[1,1.24]}};
const TRL={auto:'Otomatis (campur)',fade:'Memudar',wipe:'Sapuan',circle:'Lingkaran membuka',slide:'Geser',zoom:'Zoom halus',diag:'Diagonal',blinds:'Jalusi'};
const ORNL={auto:'Sesuai tema',none:'Tanpa ornamen',kelopak:'Kelopak bunga',daun:'Daun berjatuhan',bintang:'Bintang berkelip',kupu:'Kupu-kupu'};
const DARK=s=>{const A=window.__invAssets;if(!A||!A.THEMES[s])return false;return lum(A.THEMES[s].theme.bg)<.4};
function lum(h){const n=parseInt(String(h||'#fff').slice(1),16)||0;return(.299*((n>>16)&255)+.587*((n>>8)&255)+.114*(n&255))/255}
const isC=v=>/^#[0-9a-f]{6}$/i.test(v||'');
function mixc(a,b,t){const x=parseInt(a.slice(1),16),y=parseInt(b.slice(1),16);return'#'+[16,8,0].map(s=>Math.round(((x>>s)&255)*(1-t)+((y>>s)&255)*t).toString(16).padStart(2,'0')).join('')}
function loadFonts(){if(document.getElementById('amv-fonts'))return;const l=document.createElement('link');l.id='amv-fonts';l.rel='stylesheet';l.href='https://fonts.googleapis.com/css2?family=Anton&family=Bebas+Neue&family=Archivo+Black&family=Syne:wght@800&display=swap';document.head.appendChild(l);try{['Anton','Bebas Neue','Archivo Black'].forEach(f=>document.fonts.load('40px "'+f+'"'))}catch(e){}}
const isFilm=d=>d&&d.flow==='amv'&&(/^amv/.test(String(d.scene||''))||(window.__invAssets&&window.__invAssets.SC[d.scene]));
function cfg(d){const sc=String(d.scene||''),amv=/^amv/.test(sc),k=sc.replace(/^amv-?/,'')||'neon',L=amv?(LOOKS[k]||LOOKS.neon):null;const A=Object.assign({},d.amv,d.film);
 const base=amv?L.base:sc;const c=(L?L.c:['#000','#000','#fff','#fff','#fff']).map((x,i)=>isC(A.c&&A.c[i])?A.c[i]:x);const f=FONTS[A.f]?A.f:(L?L.f:'anton');
 return{amv,k,L,base,c,f,sp:Math.max(.5,Math.min(2,+A.sp||1)),fx:FXL[A.fx]&&A.fx!=='auto'?A.fx:'auto',dc:DCL[A.dc]?A.dc:'auto',cam:CAMS[A.cam]&&A.cam!=='auto'?A.cam:'auto',tr:TRL[A.tr]&&A.tr!=='auto'?A.tr:'auto',orn:ORNL[A.orn]?A.orn:'auto',cs:Math.max(60,Math.min(140,+A.cs||100)),cx:Math.max(-35,Math.min(35,+A.cx||0)),
  bg:I.safeUrl?I.safeUrl(A.bg):'',lines:Array.isArray(A.lines)?A.lines.map(x=>String(x).slice(0,40)).filter(x=>x.trim()).slice(0,12):null,shots:A.shots&&typeof A.shots==='object'?A.shots:{}}}
function names(d){const h=String(d.host||'').trim();if(d.n1&&d.n2)return[String(d.n1),String(d.sep||'&'),String(d.n2)];const m=h.split(/\s+(&|dan|and|x|\+)\s+/i);if(m.length===3)return[m[0].trim(),/^(dan|and)$/i.test(m[1])?'&':m[1].trim(),m[2].trim()];return h?[h,'','']:['','','']}
function words(t,n){return String(t||'').replace(/\s+/g,' ').trim().split(' ').filter(Boolean).slice(0,n)}
const chunk=(w,n)=>{const o=[];for(let i=0;i<w.length;i+=n)o.push(w.slice(i,i+n).join(' '));return o};

/* ---------- teks: kalimat per tema, pemecah frasa, sinkron ketukan musik ---------- */
const FC={
 neon:'Dua hati, satu tujuan, dan sebuah perjalanan baru yang akan kami mulai bersama.',
 poster:'Dengan penuh kebahagiaan, kami ingin berbagi momen istimewa ini bersama orang-orang terkasih.',
 cinema:'Sebuah kisah cinta membawa kami menuju hari yang telah lama dinantikan.',
 pop:'Dari tawa yang sederhana, tumbuh janji untuk saling menjaga selamanya.',
 joglo:'Dengan memohon restu dan doa, kami menanti kehadiran Anda di hari pernikahan kami.',
 beludru:'Dengan penuh rasa syukur, kami mengundang Anda untuk menjadi bagian dari hari bahagia kami.',
 candi:'Seperti candi yang berdiri tenang, cinta kami tumbuh sabar dan kokoh bersama waktu.',
 ulos:'Seperti helai ulos yang saling menghangatkan, kami memulai hidup baru dalam doa dan restu.',
 songket:'Benang demi benang kami rajut, hingga menjadi kisah indah yang ingin kami rayakan bersama Anda.',
 senja:'Di bawah langit senja, kami berjanji menjaga cinta ini sepanjang hari.',
 buku:'Setiap kisah punya halaman terbaik, dan hari ini kami menuliskannya bersama Anda.',
 tiket:'Perjalanan panjang kami tiba di satu tujuan, dan Anda kami undang untuk menyambutnya.',
 polaroid:'Kenangan kecil kami menjadi kisah besar, mari abadikan hari bahagia ini bersama.',
 bioskop:'Kisah kami sampai pada adegan terindah, dan kami ingin Anda ada di dalamnya.',
 balon:'Seperti balon yang terbang tinggi, kebahagiaan kami ingin kami bagi bersama Anda.',
 lampion:'Seperti cahaya lampion di malam hari, semoga restu Anda menerangi langkah kami.',
 limas:'Dengan rasa syukur dan adat yang kami junjung, kami menanti restu dan kehadiran Anda.',
 krong:'Dengan mengharap ridha Allah, kami mengundang Anda berbagi doa di hari bahagia kami.',
 melayu:'Dengan adat dan budi bahasa, kami menjemput kehadiran Anda di majlis pernikahan kami.',
 ballroom:'Malam yang elegan, cinta yang abadi. Mari merayakannya bersama kami.',
 taman:'Di antara bunga yang mekar, kami ingin berbagi hari bahagia ini bersama Anda.',
 gadang:'Dengan mohon doa restu keluarga besar, kami menanti kehadiran Anda di hari pernikahan kami.',
 selaso:'Dengan hormat dan penuh kebahagiaan, kami mengundang Anda ke majlis pernikahan kami.',
 maimun:'Dalam kemegahan adat Melayu Deli, kami mengundang Anda untuk hadir dan mendoakan kami.',
 pendopo:'Dengan segala kerendahan hati, kami mohon doa restu dan kehadiran Anda di hari bahagia kami.'};
const FE=['Terima kasih telah menjadi bagian dari cerita kami.','Kehadiran dan doa Anda adalah hadiah terindah bagi kami.','Sampai jumpa di hari yang kami nantikan.','Atas doa dan restunya, kami ucapkan terima kasih.'];
const hsh=t=>{let h=0;for(const c of String(t))h=(h*31+c.charCodeAt(0))>>>0;return h};
const allCopy=k=>{const cp=window.__invCopy,o=[];if(cp)Object.values(cp).forEach(l=>l.forEach(v=>o.push(String(v[k]||'').trim())));return o};
function sceneKey(d,C){return C.amv?C.k:C.base}
function openText(d,C){const A=Object.assign({},d.amv,d.film);if(A.open&&String(A.open).trim())return String(A.open).trim().slice(0,260);
 const op=String(d.opening||'').trim();if(op&&!/QS\.|INVITA_STORY|^assalam|^bismillah/i.test(op)&&allCopy(1).indexOf(op)<0)return op.slice(0,260);return FC[sceneKey(d,C)]||FC.beludru}
function closeText(d,C){const A=Object.assign({},d.amv,d.film);if(A.close&&String(A.close).trim())return String(A.close).trim().slice(0,200);
 const cl=String(d.closing||'').trim();if(cl&&!/wassalam|insya|^\s*$/i.test(cl)&&allCopy(3).indexOf(cl)<0)return cl.slice(0,200);return FE[hsh(sceneKey(d,C))%FE.length]}
/* pecah kalimat di tanda baca, gabungkan potongan pendek, belah yang terlalu panjang secara seimbang */
function phrases(t,maxW){t=String(t||'').replace(/\s+/g,' ').trim();if(!t)return[];let ws=t.split(' ');if(ws.length>maxW){t=ws.slice(0,maxW).join(' ');const cut=Math.max(t.lastIndexOf(','),t.lastIndexOf('.'),t.lastIndexOf(';'));if(cut>t.length*.55)t=t.slice(0,cut);t=t.replace(/[,;:]$/,'')}
 let parts=t.split(/(?<=[,.;:!?])\s+/).filter(Boolean);const out=[];parts.forEach(p=>{const n=p.split(' ').length;if(out.length&&(out[out.length-1].split(' ').length<3||n<3)&&out[out.length-1].split(' ').length+n<=8)out[out.length-1]+=' '+p;else out.push(p)});
 const fin=[];out.forEach(p=>{const w=p.split(' ');if(w.length>8){const m=Math.ceil(w.length/2);fin.push(w.slice(0,m).join(' '),w.slice(m).join(' '))}else fin.push(p)});return fin.slice(0,5)}
function beatSnap(S,d){const M=window.__invMusic;const b=M&&M.beatMs?M.beatMs(d):0;if(!b)return;const q=(v,m)=>Math.max(m,Math.round(v/b)*b);
 S.forEach(sh=>{if(sh.ms>1e8)return;let last=0;sh.items.forEach(it=>{it.at=q(it.at,b);if(it.out){it.out=Math.max(q(it.out,b),it.at+b*1.5);last=Math.max(last,it.out)}else last=Math.max(last,it.at)});sh.ms=Math.max(q(sh.ms,b*2),last+b*3)})}
/* ---------- rencana adegan ---------- */
function plan(d,C){const S=[];const nm=names(d),[n1,sep,n2]=nm;const sp=C.sp;const amv=C.amv;const fxs=C.fx==='auto'?(amv?C.L.calm:['rise','wipe']):[C.fx];let fi=0;const nx=()=>fxs[(fi++)%fxs.length];
 const T=(t,o)=>Object.assign({t:String(t||'').trim(),k:nx(),at:0,out:0,y:50},o||{});
 const sh=(id,label,kind,dur,o)=>{const ov=C.shots[id]||{};if(ov.on===false)return;const ms=(+ov.dur>0?ov.dur*1000:dur)/sp;S.push(Object.assign({id,label,kind,ms,cam:CAMS[ov.cam]&&ov.cam!=='auto'?ov.cam:null,tr:TRL[ov.tr]&&ov.tr!=='auto'?ov.tr:null,items:[]},o||{}))};
 const D=1.1;
 const kick=String(d.kicker||'Undangan').trim(),title=String(d.title||'').trim();
  /* pembuka */
 sh('open','Pembuka','open',4300*D,{cam:'zin'});let s=S[S.length-1];
 if(s){let at=500;const ls=C.lines?C.lines:[kick,title];ls.filter(Boolean).forEach((l,i)=>{s.items.push(T(l,{at:at/sp,y:i?46:30,fs:i?1:.34,k:i?nx():'rise',small:!i,nm:!amv&&!!i}));at+=900})}
 if(amv)burst(S,d,C,['Kami','Mengundang','Anda'],T,sp,fxs);
 if(n1){sh('names','Nama pasangan','names',4800*D,{cam:'panl',couple:1,en:'r'});s=S[S.length-1];
  if(s){if(!amv)s.items.push(T('The Wedding of',{k:'rise',at:300/sp,fs:.4,small:1,sentence:1}));s.items.push(T(n1,{k:'wipe',at:700/sp,y:16,fs:1.05,nm:!amv}));if(sep)s.items.push(T(sep,{k:'rise',at:1250/sp,y:27,fs:.5,small:1,nm:!amv}));if(n2)s.items.push(T(n2,{k:'wipe',at:1700/sp,y:36,fs:1.05,nm:!amv}));
   }}
 if(!amv&&n1&&n2){[[n1,0],[n2,1]].forEach(([nn,pk])=>{sh('p'+(pk+1),'Mempelai '+(pk+1),'person',4600*D,{cam:pk?'panr':'panl',couple:1,en:'z',pk});const z=S[S.length-1];if(z){z.items.push(T(nn,{k:'wipe',at:700/sp,fs:1.05,nm:1}),T('Calon mempelai',{k:'rise',at:1500/sp,fs:.4,small:1,sentence:1}))}})}
 const dt=String(d.date||'').match(/^(\d{4})-(\d{2})-(\d{2})$/);
 if(amv&&dt)burst(S,d,C,['Simpan','Tanggalnya'],T,sp,fxs);
 if(dt){const Dd=new Date(+dt[1],+dt[2]-1,+dt[3]);sh('date','Tanggal','date',4300*D,{cam:'tup',land:1});s=S[S.length-1];
  if(s){s.items.push(T(DAY[Dd.getDay()],{k:'wipe',at:350/sp,y:15,fs:.5}),T(String(+dt[3]),{k:'count',at:900/sp,y:37,fs:1.45,num:+dt[3]}),T(MON[+dt[2]-1],{k:'wipe',at:1500/sp,y:63,fs:.62}),T(dt[1],{k:'rise',at:2100/sp,y:76,fs:.4}))}}
 if(d.venue||d.start){sh('venue','Waktu dan tempat','venue',4600*D,{cam:'push',land:0});s=S[S.length-1];
  if(s){let at=400;if(d.venue){s.items.push(T('Bertempat di',{k:'rise',at:at/sp,y:9,fs:.3,small:1}));at+=500;s.items.push(T(d.venue,{k:'wipe',at:at/sp,y:21,fs:.5}));at+=900}
   if(d.address)s.items.push(T(String(d.address).slice(0,60),{k:'rise',at:at/sp,y:40,fs:.3,small:1,sentence:1}));at+=700;
   if(d.start)s.items.push(T('Pukul '+d.start+' '+(d.tz||'WIB'),{k:'wipe',at:at/sp,y:50,fs:.4}))}}
 const ph0=phrases(openText(d,C),30);
 if(ph0.length){const per=ph0.map(p=>Math.max(2500,p.split(' ').length*400));let at=600;sh('quote','Kata sambutan','quote',per.reduce((a,b)=>a+b,0)+1500,{cam:'panr',land:2});s=S[S.length-1];if(s){ph0.forEach((p,k)=>{s.items.push(T(p,{at:at/sp,out:(at+per[k]-300)/sp,fs:1,para:1,k:nx()}));at+=per[k]})}}
 (d.story||[]).slice(0,5).forEach((x,i)=>{sh('story'+i,'Cerita: '+(x.title||x.date||i+1),'story',4400*D,{cam:['zin','panl','tdn','panr','zout'][i%5],land:i%3,card:x,idx:i});s=S[S.length-1];
  if(s){if(x.date)s.back=T(x.date,{k:'back',at:300/sp,y:30,fs:1.5});if(x.title)s.items.push(T(x.title,{k:'wipe',at:900/sp,y:74,fs:.5}));if(x.text)s.items.push(T(String(x.text).slice(0,110),{k:'rise',at:1700/sp,y:85,fs:.26,small:1,sentence:1}))}});
 const ph=[d.cover].concat(d.gallery||[]).filter(Boolean).slice(0,4);
 ph.forEach((u,i)=>{sh('photo'+i,'Foto '+(i+1),'photo',2800*D,{cam:['zin','panl','zout','panr'][i%4],img:u})});
 if(amv)burst(S,d,C,['Dengan','Penuh','Cinta'],T,sp,fxs);
 const cc=phrases(closeText(d,C),14);if(!cc.length)cc.push('Merupakan kehormatan bagi kami atas kehadiran Anda');
 {const per=cc.map(p=>Math.max(2600,p.split(' ').length*420));let at=600;sh('closing','Penutup','closing',per.reduce((a,b)=>a+b,0)+1400,{cam:'zout',couple:1,en:'z'});s=S[S.length-1];
 if(s)cc.forEach((c,k)=>{s.items.push(T(c,{at:at/sp,out:(at+per[k]-300)/sp,fs:.8,para:1,k:nx()}));at+=per[k]})}
 sh('end','Akhir','end',1e9,{cam:'zin',couple:1,en:'b'});s=S[S.length-1];
 if(s){s.ms=1e9;s.fin=1;s.items.push(T('Sampai jumpa',{k:'rise',at:300/sp,y:12,fs:.5,small:1}));if(n1){s.items.push(T(n1,{k:'wipe',at:900/sp,y:21,fs:.95,nm:!amv}));if(sep)s.items.push(T(sep,{k:'rise',at:1300/sp,y:31,fs:.4,small:1,nm:!amv}));if(n2)s.items.push(T(n2,{k:'wipe',at:1600/sp,y:38,fs:.95,nm:!amv}))}}
 beatSnap(S,d);S.forEach(sh=>{let po=0;sh.items.forEach(it=>{if(!it.out)return;if(it.at<po+780){const w=it.out-it.at;it.at=po+780;it.out=it.at+w}po=it.out;if(sh.ms<1e8)sh.ms=Math.max(sh.ms,po+1500)})});return S}
function burst(S,d,C,ws,T,sp,fxs){const k=S.length;S.push({id:'b'+k,label:'',kind:'interlude',ms:3300/sp,hid:1,land:k%3,cam:['zin','zout','panl'][k%3],items:[T(ws.join(' '),{k:'rise',at:700/sp,fs:1,para:1})]})}
/* ---------- latar buatan (parallax) ---------- */
function land(kind,id,dark,pal){const W=390,H=800;const sky=dark?['#14112e','#4a2a5a','#d9705a']:['#9fd0ea','#fde1bd','#ffe9cf'];const mt=dark?['#3a2f5e','#241c42','#120d28']:['#b6cfdc','#86ad9f','#5b8a6a'];
 const g='<defs><linearGradient id="lg'+id+'" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="'+sky[0]+'"/><stop offset=".55" stop-color="'+sky[1]+'"/><stop offset="1" stop-color="'+sky[2]+'"/></linearGradient></defs>';
 const star=dark?Array.from({length:26},(_,i)=>'<circle class="tw" style="animation-delay:'+(i%7*.4)+'s" cx="'+((i*53)%390)+'" cy="'+((i*37)%380)+'" r="'+(1+i%3*.6)+'" fill="#fff"/>').join(''):'';
 const sun='<g class="fm-sun"><circle cx="195" cy="470" r="86" fill="'+(dark?'#ffcf8a':'#fff3d0')+'" opacity=".35"/><circle cx="195" cy="470" r="38" fill="'+(dark?'#ffe3b0':'#fffaf0')+'"/></g>';
 const mts=(c,y,h,n,o)=>'<path d="M-20 '+H+'V'+y+Array.from({length:n},(_,i)=>'L'+(i*(430/n)+o)+' '+(y-h*(.55+((i*37+o)%10)/18))+'L'+(i*(430/n)+o+215/n)+' '+(y+10)).join('')+'L430 '+y+'V'+H+'Z" fill="'+c+'"/>';
 const svg=(b,c)=>'<div class="fm-ly '+c+'"><svg viewBox="0 0 '+W+' '+H+'" preserveAspectRatio="xMidYMax slice">'+b+'</svg></div>';
 if(kind==='sea')return[svg(g+'<rect width="390" height="800" fill="url(#lg'+id+')"/>'+star+sun,'ly-far'),svg('<rect y="560" width="390" height="240" fill="'+(dark?'#1a1a48':'#4aa3b8')+'"/>'+Array.from({length:14},(_,i)=>'<path class="gl" style="animation-delay:'+(i%5*.5)+'s" d="M'+((i*71)%330)+' '+(580+i*15)+'q15 -5 30 0t30 0" stroke="'+(dark?'#ffcf8a':'#fff')+'" stroke-width="1.6" fill="none" opacity=".6"/>').join('')+'<g class="fm-boat"><path d="M120 560l70 0l-10 16l-50 0z" fill="'+(dark?'#0a0820':'#6a4a2a')+'"/><path d="M155 560V500l30 56z" fill="'+(dark?'#2a2050':'#fff')+'"/></g>','ly-mid'),svg(mts(mt[2],800,150,3,10),'ly-near')];
 if(kind==='sky')return[svg(g+'<rect width="390" height="800" fill="url(#lg'+id+')"/>'+star+'<circle cx="290" cy="170" r="34" fill="#fff6dc"/><circle cx="302" cy="162" r="30" fill="'+sky[0]+'"/>','ly-far'),svg(mts(mt[1],700,170,4,0),'ly-mid'),svg(mts(mt[2],790,130,3,40),'ly-near')];
 return[svg(g+'<rect width="390" height="800" fill="url(#lg'+id+')"/>'+star+sun,'ly-far'),svg(mts(mt[0],650,210,4,0),'ly-mid'),svg(mts(mt[1],720,190,3,30)+mts(mt[2],800,150,2,60),'ly-near')]}
/* ---------- bangun satu adegan ---------- */
const TRK=['fade','slide','fade','zoom','circle','fade','wipe'];
function filmShotHtml(sh,env){const{C,d,S,A,id,dark,W}=env;const k=C.base;const sc=sh.cam||(C.cam!=='auto'?C.cam:null)||'zin';const cam=CAMS[sc]||CAMS.zin;const dur=Math.round(Math.min(sh.ms,60000)+900);
 const cv=(f)=>{const x=cam.x||[0,0],y=cam.y||[0,0],s=cam.s||[1,1];return'--x0:'+(x[0]*f).toFixed(2)+'%;--x1:'+(x[1]*f).toFixed(2)+'%;--y0:'+(y[0]*f).toFixed(2)+'%;--y1:'+(y[1]*f).toFixed(2)+'%;--s0:'+(1+(s[0]-1)*f).toFixed(3)+';--s1:'+(1+(s[1]-1)*f).toFixed(3)+';--cd:'+dur+'ms'};
 let layers='';
 const L=(html,cls,f)=>'<div class="fm-ly cm '+cls+'" style="'+cv(f)+'">'+html+'</div>';
 if(C.bg){layers=L('<img alt="" src="'+esc(C.bg)+'">','fm-img',.5)}
 else if(sh.kind==='photo'){layers=''}
 else if(sh.land!=null&&sh.kind!=='venue'||(sh.kind==='quote')){const kd=['mount','sea','sky'][(sh.land||0)%3];const ls=land(dark?(kd==='mount'?'sky':kd):kd,id+sh.id,dark);layers=ls.map((h,i)=>h.replace('class="fm-ly ','class="fm-ly cm ').replace('<div ','<div style="'+cv([.25,.55,1][i]*.8)+'" '))}
 else layers=L(S.bg(id+sh.id),'fm-base',.5)+L('<svg viewBox="0 0 390 300" preserveAspectRatio="none"><ellipse class="cl1" cx="70" cy="60" rx="90" ry="14" fill="#fff" opacity=".35"/><ellipse class="cl2" cx="300" cy="120" rx="100" ry="12" fill="#fff" opacity=".28"/></svg>','fm-cloud',.9);
 if(sh.kind==='photo')layers='<div class="fm-ly cm fm-photo" style="'+cv(1)+'"><img alt="" src="'+esc(sh.img)+'"></div>';
 let cpl='';
 if(sh.couple||(!C.amv&&!/^(photo|interlude|burst)$/.test(sh.kind))){const ci=I.safeUrl?I.safeUrl(d.ci):'';let cp='';const A2=window.__invAssets;const ck=(d.cv&&(A2.V[d.cv]||A2.GP.test(d.cv)))?d.cv:S.couple,vk=A2.V[ck]?ck:(A2.V[S.vc]?S.vc:'jawa');
  if(ci)cp='<div class="sc-cp custom"><img alt="" src="'+esc(ci)+'"></div>';else if(d.cv!=='none'){if(A2.GP.test(ck)){const n=+ck.slice(1);cp='<div class="sc-cp ph"><i style="background-position:'+((n%4)*100/3)+'% '+(((n/4)|0)*50)+'%"></i></div>'}else cp='<div class="sc-cp">'+A2.couple(vk,id+sh.id,{skin:+d.cs||0,hj:(d.ch===0||d.ch==='0')?0:1})+'</div>'}
  const bc=S.fl.concat(['#fff']);const fb='<svg class="sc-fb" viewBox="0 0 390 420" preserveAspectRatio="xMidYMax slice">'+A2.bunch(14,250,62,130,bc,24,3)+A2.bunch(380,262,58,120,bc,22,17)+'</svg>';
  const fl='<svg class="sc-fl" viewBox="0 0 390 110" preserveAspectRatio="xMidYMax slice">'+A2.leaves(390,110,'#2f4a2a',16,5,40)+A2.flowers(390,110,S.fl,18,11,70)+'</svg>';
  cpl=(sh.couple?'<div class="fm-cpl cm" style="'+cv(1.1)+'"><div class="fm-cpi en-'+(sh.en||'r')+' pk'+(sh.pk==null?'x':sh.pk)+'" style="--cs:'+C.cs/100+';--cx:'+C.cx+'%"><div class="sc-fg">'+cp+'</div></div></div>':'')+'<div class="fm-flw cm" style="'+cv(1.9)+'"><div class="sc-fg">'+fb+fl+'</div></div>'}
 let card='';
 if(sh.kind==='story'){const x=sh.card;const ph=I.safeUrl&&x.photo?'<img alt="" src="'+esc(I.safeUrl(x.photo))+'">':'<svg viewBox="0 0 200 150" preserveAspectRatio="xMidYMid slice"><rect width="200" height="150" fill="'+mixc(d.theme.soft||'#eee',d.theme.accent||'#c90',.15)+'"/>'+A.bunch(100,90,90,55,S.fl.concat(['#fff']),16,sh.idx*3+2)+'</svg>';
  card='<div class="fm-card" style="--rot:'+(sh.idx%2?-5:5)+'deg"><div class="ph">'+ph+'</div><i class="tape"></i></div>'}
 return{layers,cpl,card}}
function orn(kind,S,dark){const cols=kind==='bintang'?['#fff3b0','#ffe27a','#fff']:kind==='daun'?['#5f8a4a','#7aa65a','#3f6a3a']:(S.fl||['#f7b6c2','#fff','#f4d58a']);const sh={kelopak:'p',daun:'l',bintang:'s',kupu:'b'}[kind]||'p';let h='';for(let i=0;i<(kind==='bintang'?16:10);i++){const l=(i*83+11)%100,dl=(i%7)*.9,du=7+(i%5)*1.6;h+='<i class="o-'+sh+'" style="left:'+l+'%;top:'+((i*37)%90)+'%;--c:'+cols[i%cols.length]+';animation-delay:-'+dl+'s;animation-duration:'+du+'s"></i>'}return'<div class="fm-orn" aria-hidden="true">'+h+'</div>'}
const DEC={rings:()=>'<div class="dc dc-rings">'+[0,1,2,3].map(i=>'<i style="--i:'+i+'"></i>').join('')+'</div>',bars:()=>'<div class="dc dc-bars">'+[0,1,2,3,4].map(i=>'<i style="--i:'+i+'"></i>').join('')+'</div>',grid:()=>'<div class="dc dc-grid"></div>',dots:()=>'<div class="dc dc-dots"></div>',stripes:()=>'<div class="dc dc-stripes"><i></i><i></i><i></i></div>',cross:()=>'<div class="dc dc-cross"><i></i><i></i></div>'};
function letters(t){let n=0;return String(t).split('\n').map(l=>l.split(' ').map(w=>'<b class="aw">'+[...w].map(ch=>{const i=n++,a=(i*97)%360,r=(i*53)%90-45;return'<i style="--i:'+i+';--x:'+Math.round(Math.cos(a)*140)+'px;--y:'+Math.round(Math.sin(a)*190)+'px;--r:'+r+'deg">'+esc(ch)+'</i>'}).join('')+'</b>').join(' ')).join('<br>')}
function itemHtml(it,W,H,C){let t=it.small&&!it.sentence?it.t.toUpperCase():(C.amv&&!it.para||it.back?it.t.toUpperCase():it.t);if(it.k==='count')t=String(it.num);
 const ls=t.split('\n');const mx=Math.max(...ls.map(l=>Math.max(...l.split(' ').map(w=>w.length),3)));let fs=Math.min(W*(C.amv?.34:.46),(W*.84)/(mx*(C.amv?.5:.55)));fs=Math.max(16,fs*(it.fs||1));if(!C.amv&&it.k!=='back'&&it.k!=='count')fs=Math.min(fs,W*(it.small?.06:.15));if(it.sentence)fs=Math.min(fs,W*.05+4);if(it.small)fs=Math.min(fs,W*.07+4);
 if(it.nm&&!C.amv)fs=Math.min(W*.2,fs*1.12);
 if(it.para){fs=W*(C.amv?.088:.076)*(it.fs||1);if(C.amv&&it.t.length>46)fs*=.88}
 const tx=esc(t).replace(/\n/g,'<br>');const body=it.k==='split'?letters(t):it.k==='stack'?'':tx;
 const kk=it.k==='stack'?'k-stack':'k-'+it.k;const inner=it.k==='stack'?[0,1,2,3,4].map(i=>'<span class="sr s'+i+'" style="--i:'+i+'">'+tx+'</span>').join(''):it.k==='count'?'<span class="cn" data-to="'+it.num+'">0</span>':body;
 return'<div class="ft'+(it.small?' sm':'')+(it.para?' pa':'')+(it.nm?' nm':'')+'" data-fs="'+fs.toFixed(1)+'" style="--fs:'+fs.toFixed(1)+'px"><div class="amv-t '+kk+'"'+(it.k==='glitch'?' data-t="'+esc(t)+'"':'')+'>'+inner+'</div></div>'}
window.__invAmv=function(wrap,data,opts){
 if(!wrap||wrap.dataset.amv)return;const d=data||{};if(!isFilm(d))return;opts=opts||{};const AS=window.__invAssets;if(!AS)return;
 loadFonts();const C=cfg(d),S=AS.SC[C.base]||AS.SC.limas;const mode=opts.mode||'public',loopMode=/^(mini|static)$/.test(mode);
 wrap.dataset.amv=d.scene;wrap.dataset.look=C.k;wrap.classList.add('has-amv');wrap.classList.toggle('fm-soft',!C.amv);
 const th=Object.assign({primary:'#7a1f2b',accent:'#b8923f',bg:'#fff',text:'#222',soft:'#eee'},d.theme);const dark=DARK(C.base);
 const pal=C.amv?C.c:dark?['#120d18',th.soft,'#fff6e4',th.accent,th.primary]:['#fff8ee',th.soft,mixc(th.primary,'#000',.35),th.accent,th.primary];
 if(C.amv)wrap.style.setProperty('--af',FONTS[C.f]);else wrap.style.setProperty('--af','var(--fh)');
 ['a0','a1','a2','a3','a4'].forEach((k,i)=>wrap.style.setProperty('--'+k,pal[i]));
 wrap.dataset.tone=C.amv?'amv':dark?'dark':'light';
 const SH=plan(d,C),id=(Math.random()*1e5|0)+'';
 const st=document.createElement('div');st.className='amv';
 st.innerHTML='<div class="amv-flat"></div><div class="amv-shots"></div><div class="amv-dcl"></div><div class="amv-flash"></div><div class="amv-fx"></div><div class="amv-pg"><i></i></div><div class="amv-pz" aria-hidden="true"><svg viewBox="0 0 24 24"><rect x="6" y="5" width="4.2" height="14" rx="1"/><rect x="13.8" y="5" width="4.2" height="14" rx="1"/></svg></div><div class="amv-hint"></div><div class="amv-end" hidden><button type="button" class="amv-go">Buka detail undangan</button><button type="button" class="amv-re">Putar ulang</button></div>';
 st.style.visibility='hidden';wrap.appendChild(st);const re=document.createElement('button');re.type='button';re.className='amv-again';re.textContent='Putar film';re.hidden=true;wrap.appendChild(re);
 const q=s=>st.querySelector(s),shots=q('.amv-shots'),flat=q('.amv-flat'),flash=q('.amv-flash'),dcl=q('.amv-dcl'),pg=q('.amv-pg i'),hint=q('.amv-hint'),end=q('.amv-end');
 const ornK=C.orn==='auto'?(C.amv?'none':'kelopak'):C.orn;
 const bgs=[[C.c[0],C.c[2]],[C.c[1],C.c[2]],[C.c[3],C.c[0]],[C.c[2],C.c[0]],[C.c[4],C.c[0]]];
 let i=-1,acc=0,last=0,paused=false,running=false,vis=true,done=false,cur=null,prev=null,trEnd=0,bi=0,dcn=0,trn=0;
 const dcs=()=>C.dc==='none'?[]:C.dc==='auto'?(C.L?C.L.dc:[]):[C.dc];
 function fitShot(el){const box=el.querySelector('.fm-tx');if(!box)return;const sh=el._sh||{};
  const run=()=>{const pap=box.querySelector('.fm-paper'),ct=pap||box,cs=getComputedStyle(box),pt=parseFloat(cs.paddingTop)||0,pb=parseFloat(cs.paddingBottom)||0,gap=parseFloat(getComputedStyle(ct).rowGap)||0;const H=box.clientHeight;
   let budget=H-pt-pb;if(pap){const pc=getComputedStyle(pap);budget=Math.min(H*.66,H-pt-pb)-(parseFloat(pc.paddingTop)||0)-(parseFloat(pc.paddingBottom)||0)}if(/names|closing|end/.test(sh.kind))budget=Math.min(budget,H*(sh.kind==='end'?.42:.38)-pt*.3);if(sh.kind==='story')budget=Math.min(budget,H*.30);if(sh.kind==='person')budget=Math.min(budget,H*.17);
   const its=[...box.querySelectorAll('.ft')];its.forEach(f=>f.style.setProperty('--fs',(f.dataset.fs||40)+'px'));
   its.forEach(f=>{const tt=f.querySelector('.amv-t');if(!tt)return;let fs=parseFloat(f.dataset.fs)||40,n=0;while(n++<22&&fs>13&&tt.scrollWidth>tt.clientWidth+1){fs*=.92;f.style.setProperty('--fs',fs+'px')}});
   let k=0;const tot=()=>{let t=0,c=0;[...ct.children].forEach(x=>{t+=x.offsetHeight;c++});return t+gap*Math.max(0,c-1)};
   while(k++<26&&tot()>budget){its.forEach(f=>{const v=parseFloat(f.style.getPropertyValue('--fs'))||40;f.style.setProperty('--fs',Math.max(12,v*.93)+'px')})}};
  run();if(document.fonts&&document.fonts.ready)document.fonts.ready.then(()=>{if(el.isConnected)run()}).catch(()=>{})}
 function mk(n){const sh=SH[n];const W=wrap.clientWidth||390,H=wrap.clientHeight||760;const env={C,d:Object.assign({},d,{theme:th}),S,A:AS,id,dark,W};
  const el=document.createElement('div');const tr=sh.tr||(C.tr!=='auto'?C.tr:null)||(n===0?'fade':TRK[(trn++)%TRK.length]);
  el.className='shot sh-'+sh.kind+' tr-'+tr;el.style.setProperty('--dur',Math.round(Math.min(sh.ms,60000))+'ms');
  if(sh.kind==='burst'){const r0=filmShotHtml(sh,env);el.innerHTML=r0.layers+'<div class="fm-tint"></div>';const fl=document.createElement('div');fl.className='fm-flatb';el.appendChild(fl);sh.flat=fl}
  else{const r=filmShotHtml(sh,env);let h=r.layers;
   if(C.amv&&sh.kind!=='photo')h+='<div class="fm-tint"></div>';
   if(ornK!=='none'&&!/^(photo)$/.test(sh.kind)){h+=orn(ornK,S,dark)}
   if(sh.back)h+='<div class="fm-back">'+itemHtml(Object.assign({},sh.back,{k:'back'}),W,H,C).replace('class="ft','class="ft back')+'</div>';
   h+=r.cpl+r.card+'<div class="fm-scrim"></div>';el.innerHTML=h;
   if(sh.back){const b=el.querySelector('.fm-back .ft');sh.backEl=b}}
  const box=document.createElement('div');box.className='fm-tx';let grp=null;sh.items.forEach(it=>{const w=document.createElement('div');w.innerHTML=itemHtml(it,W,H,C);const e=w.firstChild;e.hidden=true;it.el=e;it.on=false;it.off=false;if(it.out){if(!grp){grp=document.createElement('div');grp.className='ftg';box.appendChild(grp)}grp.appendChild(e)}else{grp=null;box.appendChild(e)}});if(!C.amv&&/^(quote|venue|date|closing)$/.test(sh.kind)){const pp=document.createElement('div');pp.className='fm-paper';pp.style.visibility='hidden';while(box.firstChild)pp.appendChild(box.firstChild);box.appendChild(pp)}el.appendChild(box);
  if(sh.backEl){sh.backEl.hidden=true;sh.back.el=sh.backEl;sh.back.on=false}
  return el}
 function turn(it,sh){it.on=true;it.el.hidden=false;const pp=it.el.closest&&it.el.closest('.fm-paper');if(pp&&pp.style.visibility==='hidden'){pp.style.visibility='';pp.style.animation='none';void pp.offsetWidth;pp.style.animation=''}
  
  const cn=it.el.querySelector('.cn');if(cn){const to=+cn.dataset.to,s=performance.now();const tk=t=>{if(!cn.isConnected)return;const k=Math.min(1,(t-s)/460);cn.textContent=Math.round(to*(1-Math.pow(1-k,3)));if(k<1)requestAnimationFrame(tk)};requestAnimationFrame(tk)}
  }
 function show(n){const sh=SH[n];if(!sh)return;const el=mk(n);if(prev&&prev.parentNode)prev.remove();prev=cur;cur=el;cur._sh=sh;shots.appendChild(el);fitShot(el);trEnd=1100;
  if(sh.kind!=='burst'){dcl.innerHTML=''}
  if(sh.kind==='burst'){cur.querySelector('.fm-flatb').style.background='color-mix(in srgb,'+bgs[bi%bgs.length][0]+' 84%,transparent)'}
  if(sh.back){sh.back.on=true;sh.backEl.hidden=false}
  pg.style.transform='scaleX('+Math.min(1,n/Math.max(1,SH.length-1))+')';
  if(sh.fin){end.hidden=loopMode;wrap.classList.add('amv-fin');if(!loopMode)done=true}else{wrap.classList.remove('amv-fin')}}
 function next(){i++;acc=0;if(i>=SH.length)i=0;show(i)}
 function frame(ts){if(!wrap.isConnected)return;if(!last)last=ts;const dt=Math.min(80,ts-last);last=ts;
  if(running&&!paused&&vis&&!document.hidden&&cur){acc+=dt;const sh=cur._sh;
   sh.items.forEach(it=>{if(!it.on&&acc>=it.at)turn(it,sh);if(it.on&&!it.off&&it.out&&acc>=it.out){it.off=true;it.el.classList.add('off')}});
   if(prev&&acc>=trEnd){prev.remove();prev=null}
   if(!sh.fin&&acc>=sh.ms)next();else if(sh.fin&&loopMode&&acc>3200){i=-1;next()}
   if(sh.fin===undefined&&0){}
   const pgv=(i+Math.min(1,acc/Math.max(1,sh.ms>1e8?3000:sh.ms)))/Math.max(1,SH.length-1);pg.style.transform='scaleX('+Math.min(1,pgv)+')'}
  requestAnimationFrame(frame)}
 function setPause(v){paused=v;st.classList.toggle('paused',v);wrap.classList.toggle('amv-paused',v);try{window.__invMusic&&window.__invMusic.hold(v)}catch(e){}hint.textContent=v?'Dijeda, ketuk untuk lanjut':'Ketuk di mana saja untuk jeda';clearTimeout(setPause.t);if(v)hint.classList.add('on');else hint.classList.add('on');if(!v)setPause.t=setTimeout(()=>hint.classList.remove('on'),2600)}
 function start(){if(running)return;running=true;st.style.visibility='';try{window.__invMusic&&window.__invMusic.begin(wrap,d,!!start.again)}catch(e){}start.again=1;wrap._fmToggle=()=>setPause(!paused);i=-1;acc=0;done=false;end.hidden=true;wrap.classList.remove('amv-fin');shots.innerHTML='';cur=prev=null;next();setPause(false);requestAnimationFrame(frame)}
 let dn=null;const SKIP='button,a,input,select,textarea,label';
 st.addEventListener('pointerdown',e=>{dn={x:e.clientX,y:e.clientY,t:performance.now(),ok:!(e.target.closest&&e.target.closest(SKIP))}});
 st.addEventListener('pointerup',e=>{const p=dn;dn=null;if(!p||!p.ok||!running)return;if(Math.hypot(e.clientX-p.x,e.clientY-p.y)<12&&performance.now()-p.t<600)setPause(!paused)});
 q('.amv-go').onclick=e=>{e.stopPropagation();st.classList.add('out');re.hidden=false;setTimeout(()=>{st.hidden=true},650);const sc=wrap.querySelector('.inv');if(sc)sc.scrollTop=0};
 q('.amv-re').onclick=e=>{e.stopPropagation();running=false;start()};
 re.onclick=()=>{re.hidden=true;st.hidden=false;st.classList.remove('out');void st.offsetWidth;running=false;start()};
 if('IntersectionObserver' in window)new IntersectionObserver(es=>{vis=es[0].isIntersecting}).observe(wrap);
 const begin=()=>setTimeout(start,loopMode||opts.cover===false?150:520);
 if(wrap.classList.contains('opened')||!wrap.querySelector('.cover'))begin();else new MutationObserver((m,o)=>{if(wrap.classList.contains('opened')){o.disconnect();begin()}}).observe(wrap,{attributes:true,attributeFilter:['class']});
};
window.__invAmvInfo={looks:LOOKS,fonts:FNAME,fx:FXL,dc:DCL,cams:CAMS,trs:TRL,orns:ORNL,cfg,plan:d=>{try{const C=cfg(d);return plan(d,C).filter(s=>!s.hid).map(s=>({id:s.id,label:s.label,dur:Math.round(s.ms*C.sp/100)/10,cam:s.cam||'auto',tr:s.tr||'auto'}))}catch(e){return[]}},isFilm};
/* ---------- templat AMV ---------- */
const TH={
 neon:{theme:{primary:'#ff2e93',accent:'#19f0ff',bg:'#0a0612',text:'#f2eefc',soft:'#160b24'},font:'modern',anim:'zoom'},
 poster:{theme:{primary:'#e63a2e',accent:'#1a4fd6',bg:'#f3ead7',text:'#111111',soft:'#eadfc6'},font:'modern',anim:'slide'},
 cinema:{theme:{primary:'#d4a84a',accent:'#f3e4bd',bg:'#0b0906',text:'#f3e4bd',soft:'#1a1409'},font:'luxe',anim:'fade'},
 pop:{theme:{primary:'#ff6b9d',accent:'#3a1f8a',bg:'#d9ccff',text:'#1c1530',soft:'#c6b5ff'},font:'modern',anim:'rise'}};
if(Array.isArray(I.FLOWS)&&!I.FLOWS.includes('amv'))I.FLOWS.push('amv');if(I.FLOW_LABEL)I.FLOW_LABEL.amv='Film';
if(Array.isArray(I.TEMPLATES)){const b=I.TEMPLATES.find(t=>t.cat==='wedding');
 if(b&&!I.TEMPLATES.some(t=>/^wedding-amv/.test(t.id))){const names={neon:'AMV Neon Beat',poster:'AMV Poster Merah',cinema:'AMV Sinema Emas',pop:'AMV Pop Warna'};const mo={neon:{sk:3,hv:0,fx:11,op:0,lt:0,bd:3,au:0},poster:{sk:2,hv:0,fx:0,op:0,lt:2,bd:3,au:0},cinema:{sk:6,hv:0,fx:8,op:0,lt:0,bd:3,au:0},pop:{sk:1,hv:0,fx:6,op:0,lt:4,bd:3,au:0}};
  const add=Object.keys(TH).map(k=>Object.assign({},b,TH[k],{id:'wedding-amv-'+k,name:names[k],scene:'amv-'+k,flow:'amv',style:'modern',pat:'none',flora:false,theme:Object.assign({},TH[k].theme),mo:mo[k],defaults:Object.assign({},b.defaults)}));
  I.TEMPLATES.splice(I.TEMPLATES.indexOf(b),0,...add)}}
})();

/* ===== MUSIK BAWAAN: dibuat langsung di browser (WebAudio), jadi bebas hak cipta dan tanpa file audio ===== */
(function(){
const I=window.Invita;if(!I)return;
const AC=window.AudioContext||window.webkitAudioContext;
const SC={maj:[0,2,4,5,7,9,11],min:[0,2,3,5,7,8,10],pent:[0,2,4,7,9],mpent:[0,3,5,7,10],slen:[0,2,5,7,9],pelog:[0,1,3,7,8],hij:[0,1,4,5,7,8,10],lyd:[0,2,4,6,7,9,11]};
/* cs: tangga untuk akor, ls: tangga melodi, prog: urutan akor (derajat), pat: ketukan melodi tiap 1/8 */
const P={
 piano:{n:'Piano romantis',bpm:66,root:60,cs:'maj',ls:'maj',prog:[0,4,5,3],pad:'str',lead:'piano',mode:'arp',rev:.4,bass:1},
 harp:{n:'Harpa lembut',bpm:72,root:62,cs:'maj',ls:'maj',prog:[0,5,3,4],pad:'str',lead:'harp',mode:'arp',rev:.5,bass:1},
 lullaby:{n:'Kotak musik',bpm:76,root:67,cs:'maj',ls:'maj',prog:[0,3,0,4],pad:'soft',lead:'box',mode:'walk',pat:[1,0,1,0,1,0,0,0],rev:.4},
 guitar:{n:'Gitar akustik',bpm:78,root:57,cs:'maj',ls:'pent',prog:[0,4,5,3],pad:'soft',lead:'gtr',mode:'arp',rev:.3,bass:1},
 ukulele:{n:'Ukulele ceria',bpm:96,root:60,cs:'maj',ls:'pent',prog:[0,3,4,0],pad:'none',lead:'uku',mode:'arp',rev:.25,bass:1,shk:1},
 kalimba:{n:'Kalimba manis',bpm:84,root:64,cs:'maj',ls:'pent',prog:[0,5,3,4],pad:'soft',lead:'kal',mode:'walk',pat:[1,0,1,1,0,1,0,1],rev:.45},
 strings:{n:'Orkestra sinematik',bpm:58,root:57,cs:'min',ls:'min',prog:[0,5,2,6],pad:'str',lead:'bell',mode:'walk',pat:[1,0,0,0,0,0,1,0],rev:.7,bass:1,kick:1},
 modern:{n:'Modern elegan',bpm:88,root:60,cs:'maj',ls:'pent',prog:[0,5,3,4],sev:1,pad:'syn',lead:'piano',mode:'arp',rev:.35,bass:1,kick:1,shk:1},
 neon:{n:'Synth malam',bpm:92,root:57,cs:'min',ls:'mpent',prog:[0,5,2,6],pad:'syn',lead:'pluck',mode:'arp',rev:.5,bass:1,kick:1,shk:1},
 gamelan:{n:'Gamelan Jawa',bpm:58,root:50,cs:'slen',ls:'slen',prog:[0,2,1,3],pad:'none',lead:'gam',mode:'walk',pat:[1,0,1,0,1,0,1,1],rev:.6,gong:1,tri:1},
 pelog:{n:'Gamelan pelog',bpm:52,root:53,cs:'pelog',ls:'pelog',prog:[0,2,3,1],pad:'none',lead:'gam',mode:'walk',pat:[1,0,0,1,0,1,0,0],rev:.65,gong:1,tri:1},
 candi:{n:'Lonceng candi',bpm:50,root:55,cs:'pelog',ls:'pelog',prog:[0,1,3,2],pad:'soft',lead:'bell',mode:'walk',pat:[1,0,0,0,1,0,0,1],rev:.8,gong:1,tri:1},
 pent:{n:'Lentera pentatonik',bpm:62,root:62,cs:'pent',ls:'pent',prog:[0,2,1,3],tri:1,pad:'soft',lead:'bell',mode:'walk',pat:[1,0,1,0,0,1,0,0],rev:.7},
 batak:{n:'Gondang Batak',bpm:80,root:55,cs:'mpent',ls:'mpent',prog:[0,2,0,3],tri:1,pad:'soft',lead:'wood',mode:'walk',pat:[1,1,0,1,1,0,1,0],rev:.4,drum:1},
 songket:{n:'Rebana Palembang',bpm:84,root:60,cs:'maj',ls:'pent',prog:[0,3,4,0],pad:'soft',lead:'flute',mode:'walk',pat:[1,0,1,1,0,1,0,0],rev:.45,drum:1,bass:1},
 melayu:{n:'Gambus Melayu',bpm:72,root:57,cs:'hij',ls:'hij',prog:[0,3,4,0],tri:1,pad:'soft',lead:'flute',mode:'walk',pat:[1,0,1,0,1,1,0,0],rev:.5,drum:1,bass:1},
 riau:{n:'Selaso Riau',bpm:66,root:52,cs:'hij',ls:'hij',prog:[0,6,3,4],tri:1,pad:'str',lead:'pluck',mode:'walk',pat:[1,0,1,1,0,1,0,1],rev:.5,drum:1},
 deli:{n:'Melayu Deli',bpm:76,root:59,cs:'maj',ls:'maj',prog:[0,3,4,0],pad:'str',lead:'harp',mode:'arp',rev:.5,drum:1,bass:1},
 aceh:{n:'Seudati Aceh',bpm:70,root:55,cs:'hij',ls:'hij',prog:[0,4,0,3],tri:1,pad:'soft',lead:'flute',mode:'walk',pat:[1,0,0,1,1,0,1,0],rev:.5,drum:1},
 minang:{n:'Saluang Minang',bpm:68,root:57,cs:'pent',ls:'pent',prog:[0,2,1,3],tri:1,pad:'soft',lead:'flute',mode:'walk',pat:[1,0,1,0,0,1,1,0],rev:.55,drum:1},
 party:{n:'Marimba pesta',bpm:108,root:60,cs:'maj',ls:'maj',prog:[0,3,4,0],pad:'none',lead:'wood',mode:'arp',rev:.25,bass:1,shk:1,kick:1}};
const BY={neon:'neon',poster:'modern',cinema:'strings',pop:'kalimba',joglo:'gamelan',pendopo:'pelog',candi:'candi',beludru:'piano',senja:'guitar',buku:'harp',tiket:'modern',polaroid:'ukulele',bioskop:'strings',balon:'lullaby',lampion:'pent',ulos:'batak',songket:'songket',limas:'songket',melayu:'melayu',selaso:'riau',maimun:'deli',krong:'aceh',gadang:'minang',ballroom:'modern',taman:'harp'};
const CAT={wedding:['piano','harp','guitar','strings','modern','lullaby','ukulele'],birthday:['party','ukulele','kalimba'],aqiqah:['lullaby','kalimba','harp'],khitanan:['kalimba','guitar'],wisuda:['modern','strings','piano'],keluarga:['guitar','piano','harp'],pengajian:['pent','strings'],reuni:['ukulele','guitar'],opening:['modern','neon'],lainnya:['harp','modern']};
const hsh=t=>{let h=0;for(const c of String(t))h=(h*31+c.charCodeAt(0))>>>0;return h};
function keyFor(d,id){if(!d)return'piano';const b=d.bgm;if(b==='off')return null;if(b&&P[b])return b;
 const sc=String(d.scene||'').replace(/^amv-?/,'');if(BY[sc])return BY[sc];
 const m=String(id||'').match(/^(\w+)-(\w+)/);if(m&&BY[m[2]])return BY[m[2]];
 const l=CAT[d.art]||CAT[m&&m[1]]||CAT.lainnya;return l[hsh(id||d.title||'')%l.length]}
const mf=m=>440*Math.pow(2,(m-69)/12);
const sm=(sc,deg,root)=>{const n=sc.length,o=Math.floor(deg/n);return root+o*12+sc[((deg%n)+n)%n]};
function rng(a){return()=>{a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}

const BM={ctx:null,master:null,rev:null,noise:null,cur:null,vol:.7,muted:false,userPaused:false,held:false,wraps:new Set(),key:null};
function ensure(){if(BM.ctx||!AC)return BM.ctx;try{const c=BM.ctx=new AC();BM.master=c.createGain();BM.master.gain.value=BM.muted?0:BM.vol*.6;const cp=c.createDynamicsCompressor();cp.threshold.value=-18;cp.ratio.value=3;BM.master.connect(cp);cp.connect(c.destination);
 const n=Math.floor(c.sampleRate*2.4),b=c.createBuffer(2,n,c.sampleRate);for(let ch=0;ch<2;ch++){const x=b.getChannelData(ch);for(let i=0;i<n;i++)x[i]=(Math.random()*2-1)*Math.pow(1-i/n,2.6)}
 BM.rev=c.createConvolver();BM.rev.buffer=b;const rg=c.createGain();rg.gain.value=.55;BM.rev.connect(rg);rg.connect(BM.master);
 const nb=c.createBuffer(1,c.sampleRate,c.sampleRate),nd=nb.getChannelData(0);for(let i=0;i<nd.length;i++)nd[i]=Math.random()*2-1;BM.noise=nb}catch(e){BM.ctx=null}return BM.ctx}
/* satu mesin per lagu: penjadwal melihat ke depan, nada dibuat per not */
function Eng(key){const p=P[key],c=BM.ctx,bus=c.createGain();bus.gain.value=0;bus.connect(BM.master);const send=c.createGain();send.gain.value=p.rev;bus.connect(send);send.connect(BM.rev);
 const cs=SC[p.cs],ls=SC[p.ls],step=60/p.bpm/2;let n=0,t=c.currentTime+.12,pos=7,timer=null;const R=rng(hsh(key));
 bus.gain.setTargetAtTime(1,c.currentTime,.9);
 function osc(type,f,t0,t1,pk,a,dest,det){const o=c.createOscillator(),g=c.createGain();o.type=type;o.frequency.value=f;if(det)o.detune.value=det;g.gain.setValueAtTime(.0001,t0);g.gain.linearRampToValueAtTime(pk,t0+a);g.gain.exponentialRampToValueAtTime(.0001,t1);o.connect(g);g.connect(dest||bus);o.start(t0);o.stop(t1+.05);return g}
 function flt(f,q){const x=c.createBiquadFilter();x.type='lowpass';x.frequency.value=f;if(q)x.Q.value=q;x.connect(bus);return x}
 function noise(t0,dur,pk,type,fq){const s=c.createBufferSource();s.buffer=BM.noise;const f=c.createBiquadFilter();f.type=type;f.frequency.value=fq;const g=c.createGain();g.gain.setValueAtTime(pk,t0);g.gain.exponentialRampToValueAtTime(.0001,t0+dur);s.connect(f);f.connect(g);g.connect(bus);s.start(t0);s.stop(t0+dur+.05)}
 function note(inst,m,t0,len,v){const f=mf(m);v=v||1;switch(inst){
  case'piano':osc('triangle',f,t0,t0+1.9,.17*v,.006);osc('sine',f*2,t0,t0+1.0,.05*v,.004);break;
  case'harp':osc('triangle',f,t0,t0+1.5,.16*v,.003);osc('sine',f*2,t0,t0+.7,.04*v,.003);break;
  case'box':osc('sine',f*2,t0,t0+1.2,.12*v,.002);osc('sine',f*5.4,t0,t0+.25,.03*v,.002);break;
  case'kal':osc('sine',f,t0,t0+1.0,.17*v,.003);osc('sine',f*4,t0,t0+.18,.04*v,.002);break;
  case'bell':osc('sine',f,t0,t0+2.6,.12*v,.004);osc('sine',f*2.76,t0,t0+1.4,.05*v,.003);osc('sine',f*5.4,t0,t0+.6,.02*v,.003);break;
  case'gam':osc('sine',f,t0,t0+2.2,.14*v,.003);osc('sine',f*2.32,t0,t0+1.1,.06*v,.003);osc('sine',f*3.97,t0,t0+.5,.025*v,.003);break;
  case'gtr':{const x=flt(2600,1);osc('sawtooth',f,t0,t0+1.2,.09*v,.003,x);x.frequency.setValueAtTime(2600,t0);x.frequency.exponentialRampToValueAtTime(500,t0+.5);break}
  case'uku':{const x=flt(3000,1);osc('triangle',f,t0,t0+.55,.16*v,.003,x);break}
  case'pluck':{const x=flt(2200,3);osc('sawtooth',f,t0,t0+.7,.08*v,.003,x);x.frequency.setValueAtTime(2200,t0);x.frequency.exponentialRampToValueAtTime(380,t0+.4);break}
  case'wood':osc('sine',f,t0,t0+.5,.17*v,.002);osc('sine',f*3.9,t0,t0+.09,.05*v,.002);break;
  case'flute':{const g=osc('sine',f,t0,t0+len+.4,.12*v,.09);const l=c.createOscillator(),lg=c.createGain();l.frequency.value=5;lg.gain.value=f*.008;l.connect(lg);const o2=c.createOscillator();o2.type='sine';o2.frequency.value=f;lg.connect(o2.frequency);const g2=c.createGain();g2.gain.setValueAtTime(.0001,t0);g2.gain.linearRampToValueAtTime(.04*v,t0+.1);g2.gain.exponentialRampToValueAtTime(.0001,t0+len+.4);o2.connect(g2);g2.connect(bus);l.start(t0);o2.start(t0);l.stop(t0+len+.5);o2.stop(t0+len+.5);noise(t0,.25,.012*v,'bandpass',f*2);break}
 }}
 function padNote(m,t0,len,kind){const f=mf(m);if(kind==='str'){const x=flt(1100,.5);[-8,0,8].forEach(d=>osc('sawtooth',f,t0,t0+len,.028,len*.35,x,d))}else if(kind==='syn'){const x=flt(1500,2);[-6,6].forEach(d=>osc('square',f,t0,t0+len,.018,len*.3,x,d))}else if(kind==='soft'){[0,5].forEach(d=>osc('sine',f,t0,t0+len,.05,len*.35,bus,d))}}
 function chordMidi(bar){const d=p.prog[bar%p.prog.length];const a=[sm(cs,d,p.root),sm(cs,d+2,p.root),sm(cs,d+4,p.root)];if(p.sev)a.push(sm(cs,d+6,p.root));return a}
 function sched(s,t0){const bar=Math.floor(s/8),st=s%8,ch=chordMidi(bar),root=ch[0];
  if(st===0){if(p.pad!=='none')ch.forEach((m,i)=>padNote(m-(i?0:12)+(p.pad==='str'?0:0),t0,step*8*1.05,p.pad));if(p.gong&&bar%2===0)osc('sine',mf(root-24),t0,t0+6,.16,.01);}
  if(p.bass&&(st===0||st===4))osc('sine',mf(root-24),t0,t0+step*3.5,.2,.02);
  if(p.kick&&(st===0||st===4)){const o=c.createOscillator(),g=c.createGain();o.frequency.setValueAtTime(115,t0);o.frequency.exponentialRampToValueAtTime(42,t0+.22);g.gain.setValueAtTime(.3,t0);g.gain.exponentialRampToValueAtTime(.0001,t0+.3);o.connect(g);g.connect(bus);o.start(t0);o.stop(t0+.35)}
  if(p.shk&&st%2===1)noise(t0,.05,.035,'highpass',7000);
  if(p.drum){if(st===0){const o=c.createOscillator(),g=c.createGain();o.frequency.setValueAtTime(150,t0);o.frequency.exponentialRampToValueAtTime(70,t0+.18);g.gain.setValueAtTime(.2,t0);g.gain.exponentialRampToValueAtTime(.0001,t0+.28);o.connect(g);g.connect(bus);o.start(t0);o.stop(t0+.3)}if(st===3||st===6)noise(t0,.07,.07,'bandpass',2200)}
  if(p.mode==='arp'){const seq=[0,1,2,1,3,2,1,2];const i=seq[st]%ch.length;note(p.lead,ch[i]+12+(st%4===0?0:0),t0,step,st%2?.7:1)}
  else if(p.pat&&p.pat[st]){const mv=[-1,-1,0,1,1,2,-2][Math.floor(R()*7)];pos=Math.max(4,Math.min(13,pos+mv));if(st===0){pos=Math.round((pos+ls.length+ch[1]-root>0?pos:pos))}note(p.lead,sm(ls,pos,p.root),t0,step*(p.lead==='flute'?2.2:1),st===0?1.1:.85)}}
 function tick(){if(BM.ctx.state!=='running')return;while(t<c.currentTime+.45){sched(n,t);n++;t+=step}}
 timer=setInterval(tick,90);tick();
 return{beatMs:60000/p.bpm,stop(){clearInterval(timer);try{bus.gain.cancelScheduledValues(c.currentTime);bus.gain.setTargetAtTime(0,c.currentTime,.35)}catch(e){}setTimeout(()=>{try{bus.disconnect()}catch(e){}},2200)}}}
function status(){const on=!!(BM.cur&&BM.ctx&&BM.ctx.state==='running'&&!BM.held&&!BM.userPaused);BM.wraps.forEach(w=>{if(!w.isConnected){BM.wraps.delete(w);return}const b=w.querySelector('.bm');if(!b)return;b.classList.toggle('off',!on);const pl=b.querySelector('.bm-play');pl.innerHTML=on?SVG.pause:SVG.play;pl.setAttribute('aria-label',on?'Jeda musik':'Putar musik');const mu=b.querySelector('.bm-mute');mu.innerHTML=BM.muted?SVG.mute:SVG.vol;mu.setAttribute('aria-label',BM.muted?'Suarakan musik':'Bisukan musik');const r=b.querySelector('input');if(r)r.value=Math.round(BM.vol*100)})}
const SVG={play:'<svg viewBox="0 0 24 24"><path class="f" d="M8 5v14l11-7z"/></svg>',pause:'<svg viewBox="0 0 24 24"><rect class="f" x="6" y="5" width="4" height="14" rx="1"/><rect class="f" x="14" y="5" width="4" height="14" rx="1"/></svg>',vol:'<svg viewBox="0 0 24 24"><path class="f" d="M4 9v6h4l5 4V5L8 9z"/><path d="M16 9a4 4 0 010 6M18.5 6.500a8 8 0 010 11"/></svg>',mute:'<svg viewBox="0 0 24 24"><path class="f" d="M4 9v6h4l5 4V5L8 9z"/><path d="M17 9l5 6M22 9l-5 6"/></svg>'};
function setMaster(){if(BM.master)BM.master.gain.setTargetAtTime(BM.muted?0:BM.vol*.6,BM.ctx.currentTime,.05)}
function tryResume(){const c=ensure();if(!c)return;if(c.state!=='running')c.resume().then(status).catch(()=>{});
 if(c.state!=='running'&&!tryResume.l){tryResume.l=1;const go=()=>{tryResume.l=0;['pointerdown','touchend','keydown'].forEach(e=>document.removeEventListener(e,go,true));if(BM.cur&&!BM.userPaused&&!BM.held)c.resume().then(status).catch(()=>{})};['pointerdown','touchend','keydown'].forEach(e=>document.addEventListener(e,go,true))}}
function play(key,force){if(!P[key])return;const c=ensure();if(!c)return;if(BM.userPaused&&!force)return;
 if(force)BM.userPaused=false;
 if(!BM.cur||BM.key!==key||force&&BM.restartOk){if(BM.cur)BM.cur.stop();BM.cur=Eng(key);BM.key=key}
 tryResume();status()}
function stop(){if(BM.cur){BM.cur.stop();BM.cur=null;BM.key=null}status()}
function hold(v){BM.held=v;if(!BM.ctx)return;if(v){BM.ctx.suspend().then(status).catch(()=>{})}else if(!BM.userPaused&&BM.cur)BM.ctx.resume().then(status).catch(()=>{});status()}
function toggle(){if(!BM.ctx)return;if(BM.userPaused||BM.ctx.state!=='running'){BM.userPaused=false;BM.held=false;if(!BM.cur&&BM.pendKey)play(BM.pendKey,true);BM.ctx.resume().then(status).catch(()=>{})}else{BM.userPaused=true;BM.ctx.suspend().then(status).catch(()=>{})}status()}
document.addEventListener('visibilitychange',()=>{if(!BM.ctx||!BM.cur)return;if(document.hidden)BM.ctx.suspend();else if(!BM.userPaused&&!BM.held)BM.ctx.resume().then(status).catch(()=>{})});
function bar(wrap){let b=wrap.querySelector('.bm');if(b)return b;b=document.createElement('div');b.className='bm off';b.innerHTML='<button type="button" class="bm-play"></button><button type="button" class="bm-mute"></button><input type="range" min="0" max="100" step="1" aria-label="Volume musik">';wrap.appendChild(b);
 ['pointerdown','pointerup','click'].forEach(e=>b.addEventListener(e,x=>x.stopPropagation()));
 b.querySelector('.bm-play').onclick=()=>{BM.pendKey=BM.pendKey||BM.key;if(!BM.ctx)ensure();if(!BM.cur&&BM.pendKey){BM.userPaused=false;play(BM.pendKey,true);return}if(wrap._fmToggle&&BM.cur&&!BM.userPaused&&BM.ctx.state==='running'){wrap._fmToggle();BM.userPaused=false}else{if(wrap._fmToggle&&wrap.classList.contains('amv-paused'))wrap._fmToggle();toggle()}};
 b.querySelector('.bm-mute').onclick=()=>{BM.muted=!BM.muted;ensure();setMaster();status()};
 const r=b.querySelector('input');r.oninput=()=>{BM.vol=r.value/100;if(BM.vol>0)BM.muted=false;ensure();setMaster();status()};return b}
function attach(wrap,d,opts,id){if(!wrap||!d||!AC)return;opts=opts||{};if(!/^(public|preview)$/.test(opts.mode||'public'))return;
 if(d.music&&d.music.src)return;const key=keyFor(d,id);if(!key){if(BM.cur)stop();return}
 BM.pendKey=key;BM.wraps.add(wrap);bar(wrap);status();
 if(BM.cur&&BM.key!==key){play(key)}
 const film=wrap.classList.contains('has-amv');if(film)return;
 const go=()=>play(key);
 if(wrap.classList.contains('opened')||!wrap.querySelector('.cover')||opts.cover===false)setTimeout(go,200);
 else new MutationObserver((m,o)=>{if(wrap.classList.contains('opened')){o.disconnect();go()}}).observe(wrap,{attributes:true,attributeFilter:['class']})}
function begin(wrap,d,again){if(!d||(d.music&&d.music.src))return;const key=BM.pendKey||keyFor(d);if(!key)return;BM.wraps.add(wrap);
 if(again){if(BM.cur)BM.cur.stop();BM.cur=null}play(key);status()}
window.__invMusic={attach,begin,hold,list:()=>Object.keys(P).map(k=>[k,P[k].n]),keyFor,beatMs:d=>{const k=keyFor(d,d&&d.__id);return k&&P[k]&&AC?60000/P[k].bpm:0},stop};
})();

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
  ['The Wedding of','Ada cinta yang tumbuh pelan, lalu yakin pada satu nama. Hari ini, kami ingin merayakannya bersama Anda.','Dengan segenap kebahagiaan, kami mengundang Anda untuk hadir dan melengkapi hari istimewa ini dengan senyum dan doa terbaik.','Terima kasih telah menjadi bagian dari cerita kami. Sampai bertemu di hari yang kami nantikan.']
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
const FXL={wedding:[0,1,6,5,11,9],keluarga:[0,6,4,7],pengajian:[2,8,11,5],aqiqah:[2,4,7,0],khitanan:[2,8,5],wisuda:[2,3,9,5],birthday:[3,4,6,9,5],opening:[3,9,5,10],reuni:[3,4,8,10],lainnya:[3,5,4,11]};
const counters={};(I.TEMPLATES||[]).forEach(t=>{const i=counters[t.cat]||0;counters[t.cat]=i+1;const p=PALETTES[i%PALETTES.length];t.name=(NAMES[t.cat]||NAMES.lainnya)[i%10];t.style=STYLES[i%STYLES.length];t.font=FONTS[i%FONTS.length];t.anim=ANIMS[i%ANIMS.length];t.pat=PATS[(i+(t.cat==='birthday'?6:0))%PATS.length];t.flora=['wedding','aqiqah','keluarga','pengajian'].includes(t.cat)&&i%3!==2;t.theme={primary:p[0],accent:p[1],bg:p[2],text:p[3],soft:p[4]};const c=(COPY[t.cat]||COPY.lainnya)[0];t.defaults={title:c[0],opening:c[1],description:c[2],closing:c[3]};const fl=FXL[t.cat]||FXL.lainnya;t.mo={sk:(i*3+(t.cat==='wedding'?0:2))%7,hv:(i*5+1)%8,fx:fl[i%fl.length],op:(i*3+2)%8,lt:(i*2+1)%5,bd:(i+1)%4,au:(i*3)%4};});
if(HAS_TPL){I.textVariants=cat=>(COPY[cat]||COPY.lainnya).map(v=>({title:v[0],opening:v[1],description:v[2],closing:v[3]}));
const dStory=()=>[{date:'2021',title:'Pertama Bertemu',text:'Sebuah pertemuan sederhana yang membuka halaman pertama cerita kami.',photo:''},{date:'2023',title:'Memilih Bersama',text:'Dua perjalanan sepakat untuk berjalan menuju rumah yang sama.',photo:''},{date:'2026',title:'Hari Bahagia',text:'Kini kami ingin berbagi kebahagiaan ini bersama Anda.',photo:''}];I.__defStory=dStory;
const stamp=(d,t)=>{d.mo=Object.assign({},t.mo);d.scene=t.scene||'';if(t.cat==='wedding'&&!Array.isArray(d.story))d.story=dStory();return d};
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
const baseRender=I.renderInvitation;
I.renderInvitation=function(root,inv,opts){const r=baseRender.apply(this,arguments);try{if(opts&&opts.mode==='preview'&&inv&&inv.id&&!/^(tpl|demo)-/.test(inv.id))I.__edit=inv.data;couple(r&&r.wrap,inv&&inv.data)}catch(e){}try{if(window.__invScene)window.__invScene(r&&r.wrap,inv&&inv.data)}catch(e){}try{if(window.__invMotion)window.__invMotion(r&&r.wrap,opts||{},inv&&inv.data)}catch(e){}return r};
const esc=s=>I.esc(s);
const fld=(l,id,v,type='text',ph='')=>'<label class="fld"><span>'+l+'</span><input id="'+id+'" type="'+type+'" value="'+esc(v||'')+'"'+(ph?' placeholder="'+esc(ph)+'"':'')+'></label>';
async function imgData(file){if(!file||!file.type.startsWith('image/'))return'';const url=URL.createObjectURL(file);try{const im=await new Promise((r,j)=>{const x=new Image;x.onload=()=>r(x);x.onerror=j;x.src=url});const sc=Math.min(1,900/Math.max(im.width,im.height));const c=document.createElement('canvas');c.width=Math.round(im.width*sc);c.height=Math.round(im.height*sc);c.getContext('2d').drawImage(im,0,0,c.width,c.height);return c.toDataURL('image/jpeg',.76)}finally{URL.revokeObjectURL(url)}}
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
 const panel=document.createElement('details');panel.className='grp v3-story-editor';panel.open=true;panel.innerHTML='<summary>Perjalanan Kami</summary><div class="grp-body"><p class="mini-note">Setiap momen bisa memakai foto sendiri. Foto yang diunggah dari perangkat tidak ikut di tautan, tapi ikut di file HTML.</p><div id="v3rows"></div><button type="button" class="btn btn-sm" id="v3add">+ Tambah cerita</button></div>';form.insertBefore(panel,form.querySelectorAll('.grp')[1]||null);const rows=panel.querySelector('#v3rows');
 function names(init){const a=q('#v3n1').value.trim(),b=q('#v3n2').value.trim(),s=curSep();q('#v3p1').textContent=a||'Nama 1';q('#v3ps').textContent=s;q('#v3p2').textContent=b||'Nama 2';const val=(a&&b)?[a,s,b].join(' '):(a||b);const E=I.__edit;if(E){E.n1=a;E.n2=b;E.sep=s}if(host.value!==val){host.value=val;host.dispatchEvent(new Event('input',{bubbles:true}))}else if(!init&&E){host.dispatchEvent(new Event('input',{bubbles:true}))}}
 function sync(){const E=I.__edit;if(E)E.story=stories.map(x=>({...x}));host.dispatchEvent(new Event('input',{bubbles:true}))}
 function draw(){rows.innerHTML='';stories.forEach((x,i)=>{const r=document.createElement('article');r.className='v3-story-row';r.innerHTML='<div class="v3-photo">'+(x.photo?'<img src="'+esc(x.photo)+'" alt="Foto cerita">':'<span>Belum ada foto</span>')+'</div><div class="v3-story-fields">'+fld('Tahun / tanggal','v3d'+i,x.date)+fld('Judul cerita','v3t'+i,x.title)+'<label class="fld"><span>Cerita singkat</span><textarea id="v3x'+i+'" rows="3">'+esc(x.text||'')+'</textarea></label><label class="v3-upload">Pilih foto<input id="v3f'+i+'" type="file" accept="image/*"></label><button type="button" class="btn btn-sm btn-danger" id="v3r'+i+'">Hapus cerita</button></div>';rows.appendChild(r);['v3d','v3t','v3x'].forEach(id=>r.querySelector('#'+id+i).addEventListener('input',()=>{stories[i]={...stories[i],date:r.querySelector('#v3d'+i).value,title:r.querySelector('#v3t'+i).value,text:r.querySelector('#v3x'+i).value};sync()}));r.querySelector('#v3f'+i).addEventListener('change',async e=>{const d=await imgData(e.target.files[0]);if(d){stories[i].photo=d;draw();sync()}});r.querySelector('#v3r'+i).onclick=()=>{stories.splice(i,1);draw();sync()};});}
 couple.addEventListener('click',e=>{const b=e.target.closest('.v3-chip');if(!b)return;key=b.dataset.sep;couple.querySelectorAll('.v3-chip').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));q('.v3-custom').hidden=key!=='custom';if(key==='custom')q('#v3sepc').focus();names()});
 couple.querySelectorAll('#v3n1,#v3n2,#v3sepc').forEach(e=>e.addEventListener('input',()=>names()));panel.querySelector('#v3add').onclick=()=>{stories.push({date:'',title:'',text:'',photo:''});draw();sync()};names(true);draw();sync();}
function textNodes(root){const w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);const a=[];while(w.nextNode())a.push(w.currentNode);return a}
function enhance(root){root.querySelectorAll('.inv').forEach(inv=>{if(inv.dataset.v3)return;inv.dataset.v3='1'; const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('v3-in');io.unobserve(e.target)}}),{threshold:.12});inv.querySelectorAll('section,.event,.gallery,.v3-timeline article').forEach((el,i)=>{el.classList.add('v3-reveal');el.style.setProperty('--delay',(i%5)*70+'ms');io.observe(el)});});}
/* Di halaman tamu (view.html) tidak ada templates.js: editor dan cerita ditangani file lain, jadi berhenti di sini */
if(!HAS_TPL)return;
function flowOpt(){const sel=document.querySelector('select[data-k="data.flow"]');if(sel&&!sel.querySelector('option[value=auto]')){const o=document.createElement('option');o.value='auto';o.textContent='Otomatis (menggulir sendiri, sentuh untuk jeda)';sel.appendChild(o);const v=I.__edit&&I.__edit.flow;if(v==='auto')sel.value='auto'}}
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
 /* parallax saat menggulir */
 if(!tap&&scroller){let ticking=false;scroller.addEventListener('scroll',()=>{if(ticking)return;ticking=true;requestAnimationFrame(()=>{ticking=false;wrap.style.setProperty('--sy',Math.min(scroller.scrollTop,900))})},{passive:true})}
 /* letusan confetti saat undangan dibuka */
 wrap.addEventListener('click',e=>{if(e.target.closest('[data-a=open]'))burst(wrap)});
 /* hitung mundur: angka berputar saat berganti */
 const cd=wrap.querySelector('.cd');if(cd&&window.MutationObserver){new MutationObserver(ms=>ms.forEach(m=>{const b=(m.target.nodeType===3?m.target.parentNode:m.target);if(b&&b.tagName==='B'){b.classList.remove('flip');void b.offsetWidth;b.classList.add('flip')}})).observe(cd,{childList:true,characterData:true,subtree:true})}
};

/* putar otomatis: undangan menggulir sendiri, sentuhan menjeda, lepas tangan lanjut lagi */
function autoplay(wrap){
 const sc=wrap.querySelector('.inv');if(!sc||wrap.dataset.auto)return;wrap.dataset.auto='1';
 let pos=0,last=0,held=false,until=0,off=false,started=false,endAt=0,hintT=0;const SPEED=44;
 const pill=document.createElement('button');pill.type='button';pill.className='auto-pill';pill.setAttribute('aria-label','Jeda atau lanjutkan putar otomatis');pill.innerHTML='<i></i><span class="a1">Sentuh layar untuk jeda</span><span class="a2">Dijeda</span>';wrap.appendChild(pill);
 const act=()=>{until=performance.now()+1400};
 const hold=e=>{if(e.target.closest&&e.target.closest('.auto-pill'))return;held=true};
 const free=()=>{if(held){held=false;act()}};
 wrap.addEventListener('touchstart',hold,{passive:true});wrap.addEventListener('touchend',free,{passive:true});wrap.addEventListener('touchcancel',free,{passive:true});
 wrap.addEventListener('pointerdown',hold);addEventListener('pointerup',free);addEventListener('pointercancel',free);
 wrap.addEventListener('wheel',act,{passive:true});wrap.addEventListener('keydown',act);
 pill.addEventListener('click',()=>{off=!off;wrap.classList.toggle('auto-off',off);if(!off){pos=sc.scrollTop;until=0}});
 function step(t){
  if(!wrap.isConnected)return;
  const dt=last?Math.min(64,t-last):0;last=t;
  const f=document.activeElement,typing=f&&wrap.contains(f)&&/^(INPUT|TEXTAREA|SELECT)$/.test(f.tagName);
  const busy=held||off||typing||t<until||document.hidden||!!wrap.querySelector('.lightbox:not([hidden])');
  if(Math.abs(sc.scrollTop-pos)>2.5){pos=sc.scrollTop;act();endAt=0}
  else if(!busy){const max=sc.scrollHeight-sc.clientHeight;
   if(pos<max-1){pos=Math.min(max,pos+SPEED*dt/1000);sc.scrollTop=pos;endAt=0}
   else if(!endAt)endAt=t;else if(t-endAt>4200){endAt=0;sc.scrollTo({top:0,behavior:'smooth'});act()}}
  wrap.classList.toggle('auto-hold',!!(busy&&!off));
  requestAnimationFrame(step)}
 wrap.addEventListener('click',e=>{if(started||!e.target.closest('[data-a=open]'))return;started=true;sc.style.scrollBehavior='auto';setTimeout(()=>{pos=sc.scrollTop;wrap.classList.add('auto-on');requestAnimationFrame(step);hintT=setTimeout(()=>wrap.classList.add('auto-min'),5200)},2500)});
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
function couple(v,id){
 const c=V[v]||V.jawa,SK='#f0cdae',SKD='#dcaa86',HR='#2a1f1c';
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
 const B=veil+T(dress,c.bj)+T(sleeveR,c.bj)+kind+dots+
  T('M210 50C176 50 162 82 166 112C164 132 156 146 152 168L150 214C168 234 252 234 270 214L268 168C264 146 256 132 254 112C258 82 244 50 210 50Z',hj)+
  '<ellipse cx="210" cy="104" rx="25.5" ry="33" fill="#000" opacity=".14"/><ellipse cx="210" cy="104" rx="23" ry="30.5" fill="'+SK+'"/>'+
  '<path d="M184 60C170 84 172 112 180 134M236 62C250 86 250 112 242 134" fill="none" stroke="#fff" stroke-width="2" opacity=".22"/>'+
  T('M158 178C182 200 238 200 262 178L268 210C240 230 180 230 152 210Z',hj)+'<path d="M166 192C190 212 230 212 254 192" fill="none" stroke="#000" stroke-width="1.4" opacity=".14"/>'+
  '<circle cx="210" cy="212" r="4.4" fill="'+c.ac+'"/><circle cx="210" cy="212" r="1.6" fill="#fff" opacity=".7"/>'+sig+
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
SC.joglo={couple:'jawa',fl:['#8a1f2d','#c4453f','#f4e1c8','#a8324a'],
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
SC.beludru={couple:'gaun',fl:['#e7b7c2','#f4e6ea','#d98aa0','#f7d7cf'],
 bg:id=>{let f='';for(let i=0;i<15;i++)f+='<rect x="'+(i*27)+'" width="27" height="700" fill="url(#f'+id+')" opacity="'+(i%2?.9:.55)+'"/>';
  return '<svg viewBox="0 0 390 800" preserveAspectRatio="xMidYMax slice"><defs><linearGradient id="f'+id+'" x1="0" x2="1"><stop offset="0" stop-color="#0b150b"/><stop offset=".5" stop-color="#2a3d22"/><stop offset="1" stop-color="#0b150b"/></linearGradient><linearGradient id="fl'+id+'" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2a1c14"/><stop offset="1" stop-color="#080504"/></linearGradient></defs><rect width="390" height="800" fill="#0f180e"/>'+f+'<rect y="690" width="390" height="110" fill="url(#fl'+id+')"/><rect y="640" width="390" height="60" fill="#d8bfae" opacity=".28"/></svg>'},
 cover:'<div class="sc-cur l"></div><div class="sc-cur r"></div><div class="sc-env"><i class="fl"></i></div>'};
/* ---------- 3. Candi kabut: gunungan terbelah ---------- */
SC.candi={couple:'jawa2',fl:['#8f1d33','#1f3f78','#f6e9e0','#d98aa0','#c9496a'],
 bg:id=>'<svg viewBox="0 0 390 800" preserveAspectRatio="xMidYMax slice"><defs><linearGradient id="g'+id+'" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fbf8f3"/><stop offset="1" stop-color="#eee2dc"/></linearGradient><linearGradient id="m'+id+'" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#fbf8f3" stop-opacity=".92"/></linearGradient><pattern id="w'+id+'" width="22" height="26" patternUnits="userSpaceOnUse"><rect width="22" height="26" fill="#b27a3c"/><rect x="2" y="3" width="18" height="20" fill="none" stroke="#7a4b1e" stroke-width="1.4"/></pattern></defs><rect width="390" height="800" fill="url(#g'+id+')"/>'+
  '<path d="M0 520L70 440L130 500L200 410L270 490L330 430L390 500V800H0Z" fill="#cdbdb8" opacity=".35"/>'+
  '<g fill="#a99a9a" opacity=".42"><path d="M80 610H310L292 580H98Z"/><path d="M106 582H284L270 552H120Z"/><path d="M132 554H258L246 526H144Z"/><path d="M158 528H232L222 498H168Z"/><path d="M180 500H210L205 440L195 410L185 440Z"/><path d="M92 584H112L108 520L102 500L96 520Z"/><path d="M278 584H298L294 520L288 500L282 520Z"/></g>'+
  '<rect y="420" width="390" height="260" fill="url(#m'+id+')"/>'+
  '<path d="M0 600Q195 500 390 600V800H0Z" fill="#e6c0b8" opacity=".7"/>'+
  '<rect y="640" width="390" height="70" fill="url(#w'+id+')"/><rect y="636" width="390" height="8" fill="#8a5628"/>'+
  '<g transform="translate(195 24) scale(.72)"><path d="M0 0C0 0-30 44-34 88C-38 128-18 150 0 150C18 150 38 128 34 88C30 44 0 0 0 0Z" fill="#8f1d33"/><path d="M0 24C0 24-16 56-18 90C-19 112-8 126 0 126C8 126 19 112 18 90C16 56 0 24 0 24Z" fill="none" stroke="#e6c27a" stroke-width="1.6"/><path d="M0 52V120M-10 82H10" stroke="#e6c27a" stroke-width="1.4"/></g></svg>',
 cover:'<div class="sc-gun l"></div><div class="sc-gun r"></div>'};
/* ---------- 4. Tenun ulos: pita tenun bergeser ---------- */
SC.ulos={couple:'ulos',fl:['#a4161a','#e0b84a','#f3e7d8'],
 bg:id=>{const band=(y,h)=>'<rect y="'+y+'" width="390" height="'+h+'" fill="#a4161a"/><rect y="'+(y+6)+'" width="390" height="'+(h-12)+'" fill="url(#d'+id+')"/>';
  return '<svg viewBox="0 0 390 800" preserveAspectRatio="xMidYMax slice"><defs><pattern id="d'+id+'" width="26" height="26" patternUnits="userSpaceOnUse"><rect width="26" height="26" fill="#a4161a"/><path d="M13 3L23 13L13 23L3 13Z" fill="none" stroke="#f3e7d8" stroke-width="2"/><path d="M13 9L17 13L13 17L9 13Z" fill="#e0b84a"/></pattern><pattern id="s'+id+'" width="34" height="34" patternUnits="userSpaceOnUse"><path d="M17 2L32 17L17 32L2 17Z" fill="none" stroke="#e0b84a" stroke-width=".8" opacity=".16"/></pattern></defs><rect width="390" height="800" fill="#150c0c"/><rect width="390" height="800" fill="url(#s'+id+')"/>'+band(0,70)+'<rect y="70" width="390" height="5" fill="#f3e7d8"/>'+band(724,76)+'<rect y="716" width="390" height="5" fill="#f3e7d8"/></svg>'},
 cover:'<i class="sc-band" style="--i:0;top:0"></i><i class="sc-band" style="--i:1;top:14.3%"></i><i class="sc-band" style="--i:2;top:28.6%"></i><i class="sc-band" style="--i:3;top:42.9%"></i><i class="sc-band" style="--i:4;top:57.2%"></i><i class="sc-band" style="--i:5;top:71.5%"></i><i class="sc-band" style="--i:6;top:85.8%"></i>'};
/* ---------- 5. Songket emas: kisi emas membelah diagonal ---------- */
SC.songket={couple:'melayu',fl:['#e7c35a','#fff0b8','#c9302c','#d4a537'],
 bg:id=>'<svg viewBox="0 0 390 800" preserveAspectRatio="xMidYMax slice"><defs><pattern id="l'+id+'" width="44" height="44" patternUnits="userSpaceOnUse"><path d="M22 2L42 22L22 42L2 22Z" fill="none" stroke="#d4a537" stroke-width="1.2" opacity=".5"/><path d="M22 14L30 22L22 30L14 22Z" fill="#d4a537" opacity=".5"/></pattern><pattern id="t'+id+'" width="26" height="30" patternUnits="userSpaceOnUse"><path d="M0 30L13 0L26 30Z" fill="#d4a537"/><path d="M6 30L13 12L20 30Z" fill="#3a0d14"/></pattern><radialGradient id="r'+id+'" cx=".5" cy=".42" r=".7"><stop offset="0" stop-color="#6a1a26"/><stop offset="1" stop-color="#2a070c"/></radialGradient></defs><rect width="390" height="800" fill="url(#r'+id+')"/><rect width="390" height="800" fill="url(#l'+id+')"/><rect width="390" height="32" fill="url(#t'+id+')"/><rect y="768" width="390" height="32" fill="url(#t'+id+')" transform="rotate(180 195 784)"/></svg>',
 cover:'<div class="sc-dg a"></div><div class="sc-dg b"></div>'};
/* ---------- 6. Senja taman: matahari terbit, jendela terbuka ---------- */
SC.senja={couple:'pastel',fl:['#f5a0a0','#fbe0c8','#c96a8a','#f7c76a'],
 bg:id=>'<svg viewBox="0 0 390 800" preserveAspectRatio="xMidYMax slice"><defs><linearGradient id="g'+id+'" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c9b0e0"/><stop offset=".45" stop-color="#ffc7a2"/><stop offset="1" stop-color="#ffe6c8"/></linearGradient><radialGradient id="s'+id+'"><stop offset="0" stop-color="#fff6d6"/><stop offset=".5" stop-color="#ffe3a8"/><stop offset="1" stop-color="#ffe3a8" stop-opacity="0"/></radialGradient></defs><rect width="390" height="800" fill="url(#g'+id+')"/>'+
  '<g class="sc-sun"><circle cx="195" cy="400" r="130" fill="url(#s'+id+')"/><circle cx="195" cy="400" r="48" fill="#fff3c8"/></g>'+
  '<g class="sc-cloud"><ellipse cx="70" cy="150" rx="70" ry="13" fill="#fff" opacity=".6"/><ellipse cx="320" cy="210" rx="80" ry="12" fill="#fff" opacity=".55"/></g>'+
  '<path class="sc-hill h1" d="M-40 520Q100 440 230 510T430 480V800H-40Z" fill="#eea77f"/><path class="sc-hill h2" d="M-40 580Q130 500 260 570T430 540V800H-40Z" fill="#d98a7c"/><path class="sc-hill h3" d="M-40 640Q120 580 250 630T430 610V800H-40Z" fill="#a8627a"/>'+
  '<g fill="#6b3a5a" opacity=".85"><path d="M40 640L52 560L64 640Z"/><path d="M60 650L74 570L88 650Z"/><path d="M320 645L333 565L346 645Z"/></g></svg>',
 cover:'<div class="sc-shut l"></div><div class="sc-shut r"></div>'};
/* ---------- 7. Buku cerita: sampul buku dan halaman yang dibalik ---------- */
SC.buku={couple:'sage',fl:['#e8a6a6','#fbe3c8','#9fc3b5','#f2d27a'],
 bg:id=>'<svg viewBox="0 0 390 800" preserveAspectRatio="xMidYMax slice"><defs><linearGradient id="g'+id+'" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fdf8ec"/><stop offset="1" stop-color="#f3e6c8"/></linearGradient></defs><rect width="390" height="800" fill="url(#g'+id+')"/><rect x="14" y="14" width="362" height="772" rx="6" fill="none" stroke="#c9a24a" stroke-width="1.6" opacity=".7"/><rect x="22" y="22" width="346" height="756" rx="4" fill="none" stroke="#c9a24a" stroke-width=".8" opacity=".5"/>'+
  [[40,520],[352,520],[40,760],[352,760]].map(p=>'<circle cx="'+p[0]+'" cy="'+p[1]+'" r="3" fill="#c9a24a" opacity=".7"/>').join('')+
  Array.from({length:26},(_,i)=>'<circle cx="'+(30+r1(i+3)*330).toFixed(0)+'" cy="'+(40+r1(i*4+9)*300).toFixed(0)+'" r="'+(1+r1(i)*1.6).toFixed(1)+'" fill="#c9a24a" opacity=".45"/>').join('')+
  '<path d="M0 560Q100 500 200 550T390 520V800H0Z" fill="#cfe3d6" opacity=".9"/><path d="M0 620Q120 570 240 615T390 590V800H0Z" fill="#9fc3b5" opacity=".9"/><path d="M320 14h30v70l-15-14-15 14Z" fill="#b3282d"/></svg>',
 cover:'<div class="sc-bk b"></div><div class="sc-bk a"></div>'};
/* ---------- 8. Tiket: sobekan boarding pass ---------- */
SC.tiket={couple:'tuxIvory',fl:['#f7b267','#fff1dc','#8ec5e8','#f4845f'],
 bg:id=>'<svg viewBox="0 0 390 800" preserveAspectRatio="xMidYMax slice"><defs><linearGradient id="g'+id+'" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#bcdcf5"/><stop offset="1" stop-color="#f7fbff"/></linearGradient></defs><rect width="390" height="800" fill="url(#g'+id+')"/><g fill="#fff" opacity=".85"><ellipse cx="70" cy="110" rx="60" ry="14"/><ellipse cx="110" cy="100" rx="40" ry="14"/><ellipse cx="320" cy="190" rx="70" ry="14"/><ellipse cx="280" cy="180" rx="38" ry="12"/><ellipse cx="60" cy="330" rx="64" ry="12"/></g>'+
  '<path d="M20 560C100 420 150 520 220 380S330 170 372 70" fill="none" stroke="#e8913a" stroke-width="2.4" stroke-dasharray="3 9" stroke-linecap="round"/><g transform="translate(372 70) rotate(-55)" fill="#1f3a5f"><path d="M0 0l-22 -5l-6 -3l-2 3l6 5l-8 4l-10 -2l-1 2l8 6l6 -1l8 6l3 -2l-5 -9l9 -2l8 8Z" transform="scale(1.3)"/></g></svg>',
 cover:'<div class="sc-tk a"></div><div class="sc-tk b"></div>'};
/* ---------- 9. Polaroid: tumpukan foto beterbangan ---------- */
SC.polaroid={couple:'pastelBlue',fl:['#f5b7a0','#fff2e2','#c8d9a8','#f2d27a'],
 bg:id=>{const card=(x,y,r,c1,c2)=>'<g transform="translate('+x+' '+y+') rotate('+r+')"><rect x="-46" y="-54" width="92" height="108" fill="#fffdf8" filter="drop-shadow(0 4px 5px rgba(60,30,10,.3))"/><rect x="-39" y="-47" width="78" height="76" fill="url(#p'+id+')"/><rect x="-14" y="-62" width="28" height="12" fill="#f2e3a8" opacity=".85" transform="rotate(-4)"/></g>';
  return '<svg viewBox="0 0 390 800" preserveAspectRatio="xMidYMax slice"><defs><linearGradient id="p'+id+'" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f7c9b3"/><stop offset="1" stop-color="#b8d4c8"/></linearGradient></defs><rect width="390" height="800" fill="#d8b68c"/>'+[0,1,2,3,4,5,6,7,8,9,10,11,12,13].map(i=>'<rect x="'+(i*28)+'" width="2" height="800" fill="#9c7448" opacity=".25"/>').join('')+'<rect width="390" height="800" fill="#f3e2c6" opacity=".25"/>'+card(52,330,-9)+card(338,300,8)+card(46,500,6)+card(346,470,-7)+'</svg>'},
 cover:'<div class="sc-pl" style="--dx:-130%;--dy:-40%;--r:-40deg;--z:1;--tr:-6deg"></div><div class="sc-pl" style="--dx:130%;--dy:-30%;--r:36deg;--z:2;--tr:5deg"></div><div class="sc-pl" style="--dx:-120%;--dy:60%;--r:-30deg;--z:3;--tr:-3deg"></div><div class="sc-pl" style="--dx:0%;--dy:140%;--r:14deg;--z:4;--tr:2deg"></div>'};
/* ---------- 10. Bioskop: tirai merah dan lampu sorot ---------- */
SC.bioskop={couple:'tuxRed',fl:['#d64545','#f2c94c','#f5e6d0','#8f1f2a'],
 bg:id=>'<svg viewBox="0 0 390 800" preserveAspectRatio="xMidYMax slice"><defs><linearGradient id="b'+id+'" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff6d8" stop-opacity=".55"/><stop offset="1" stop-color="#fff6d8" stop-opacity="0"/></linearGradient><pattern id="h'+id+'" width="28" height="30" patternUnits="userSpaceOnUse"><rect width="28" height="30" fill="#1b1013"/><rect x="8" y="8" width="12" height="14" rx="3" fill="#6b5a4a"/></pattern></defs><rect width="390" height="800" fill="#120709"/><path d="M110 0H280L390 560H0Z" fill="url(#b'+id+')" opacity=".7"/><path d="M0 0H120L60 480H0Z" fill="url(#b'+id+')" opacity=".35"/><rect x="0" width="30" height="800" fill="url(#h'+id+')"/><rect x="360" width="30" height="800" fill="url(#h'+id+')"/>'+
  [30,90,150,210,270,330,390].map((x,i)=>'<rect x="'+(x+8)+'" y="690" width="40" height="70" rx="14" fill="#2a0f14"/>').join('')+'</svg>',
 cover:'<div class="sc-cur red l"></div><div class="sc-cur red r"></div><div class="sc-val"></div>'};
/* ---------- 11. Balon udara: awan membuka ---------- */
function balloon(x,y,s,c1,c2,d){return '<g class="sc-ball" style="animation-delay:'+d+'s" transform="translate('+x+' '+y+') scale('+s+')"><ellipse cx="0" cy="0" rx="34" ry="42" fill="'+c1+'"/><path d="M0 -42C-18 -26 -18 26 0 42C18 26 18 -26 0 -42Z" fill="'+c2+'"/><path d="M-34 0H34" stroke="#fff" stroke-width="2" opacity=".5"/><path d="M-22 38L-9 66M22 38L9 66" stroke="#6b4a2a" stroke-width="1.4"/><rect x="-11" y="66" width="22" height="14" rx="2" fill="#a8743a"/></g>'}
SC.balon={couple:'sky',fl:['#f6b3a0','#fff1e4','#9ecbe8','#f4d36a'],
 bg:id=>'<svg viewBox="0 0 390 800" preserveAspectRatio="xMidYMax slice"><defs><linearGradient id="g'+id+'" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8fc3ee"/><stop offset=".6" stop-color="#d6ebfa"/><stop offset="1" stop-color="#ffe9d6"/></linearGradient></defs><rect width="390" height="800" fill="url(#g'+id+')"/><g class="sc-cloud" fill="#fff"><ellipse cx="70" cy="190" rx="70" ry="14" opacity=".8"/><ellipse cx="330" cy="130" rx="64" ry="12" opacity=".7"/><ellipse cx="300" cy="380" rx="80" ry="14" opacity=".75"/><ellipse cx="60" cy="430" rx="64" ry="12" opacity=".7"/></g>'+balloon(60,300,.9,'#f08a5d','#fbd7a8',0)+balloon(335,260,.7,'#4f9bd6','#cfe8fa',-2)+balloon(320,470,.6,'#e86a8a','#fbd0da',-4)+'<path d="M0 640Q130 590 260 640T390 610V800H0Z" fill="#cfe3b9"/></svg>',
 cover:'<div class="sc-sky"></div><div class="sc-cl" style="--x:-120%;--y:-20%;left:-20%;top:2%"></div><div class="sc-cl" style="--x:120%;--y:-20%;right:-20%;top:12%"></div><div class="sc-cl" style="--x:-120%;--y:30%;left:-25%;top:45%"></div><div class="sc-cl" style="--x:120%;--y:30%;right:-25%;top:52%"></div><div class="sc-cl" style="--x:0%;--y:120%;left:10%;bottom:-12%"></div>'};
/* ---------- 12. Lampion: lentera naik ke langit malam ---------- */
SC.lampion={couple:'champagne',fl:['#ffb45a','#ffe3a8','#c96a3a','#f2d27a'],
 bg:id=>'<svg viewBox="0 0 390 800" preserveAspectRatio="xMidYMax slice"><defs><linearGradient id="g'+id+'" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0b0f2e"/><stop offset=".7" stop-color="#2a1a4a"/><stop offset="1" stop-color="#5a2a4a"/></linearGradient><radialGradient id="o'+id+'"><stop offset="0" stop-color="#ffcf7a"/><stop offset="1" stop-color="#ffcf7a" stop-opacity="0"/></radialGradient></defs><rect width="390" height="800" fill="url(#g'+id+')"/>'+
  Array.from({length:60},(_,i)=>'<circle cx="'+(r1(i+1)*390).toFixed(0)+'" cy="'+(r1(i*3+2)*520).toFixed(0)+'" r="'+(.6+r1(i)*1.4).toFixed(1)+'" fill="#fff" opacity="'+(.3+r1(i+7)*.6).toFixed(2)+'"/>').join('')+
  '<circle cx="300" cy="120" r="30" fill="#fff6d6"/><circle cx="312" cy="112" r="26" fill="#1a1440"/>'+
  [[40,0,70],[120,0,150],[210,0,100],[290,0,190],[355,0,120]].map((p,i)=>'<g class="sc-lan" style="animation-delay:'+(-i*1.3)+'s"><line x1="'+p[0]+'" y1="0" x2="'+p[0]+'" y2="'+p[2]+'" stroke="#8a6a3a" stroke-width="1"/><circle cx="'+p[0]+'" cy="'+(p[2]+22)+'" r="34" fill="url(#o'+id+')"/><rect x="'+(p[0]-13)+'" y="'+p[2]+'" width="26" height="36" rx="10" fill="#ff9a3c"/><rect x="'+(p[0]-13)+'" y="'+(p[2]+10)+'" width="26" height="3" fill="#a24f10" opacity=".6"/></g>').join('')+
  '<path d="M0 640Q40 590 70 640T140 620Q190 570 230 630T330 610Q370 590 390 620V800H0Z" fill="#150d2a"/></svg>',
 cover:'<div class="sc-night"></div><i class="sc-lt" style="left:8%;top:12%;--d:0s"></i><i class="sc-lt" style="left:28%;top:62%;--d:.1s"></i><i class="sc-lt" style="left:62%;top:8%;--d:.2s"></i><i class="sc-lt" style="left:84%;top:50%;--d:.3s"></i><i class="sc-lt" style="left:14%;top:78%;--d:.15s"></i><i class="sc-lt" style="left:74%;top:84%;--d:.25s"></i><i class="sc-lt" style="left:46%;top:88%;--d:.05s"></i>'};
const THEMES={
 joglo:{theme:{primary:'#7a1f2b',accent:'#b8923f',bg:'#f7efdc',text:'#3b2a1a',soft:'#ecdfbf'},font:'classic',style:'soft',flow:'scroll',anim:'rise',pat:'none',flora:false,mo:{sk:2,hv:0,fx:1,op:0,lt:3,bd:1,au:0}},
 beludru:{theme:{primary:'#e8cdbf',accent:'#c9a36a',bg:'#101a0f',text:'#f1e6dc',soft:'#1c2a19'},font:'signature',style:'soft',flow:'scroll',anim:'fade',pat:'none',flora:false,mo:{sk:4,hv:0,fx:11,op:0,lt:1,bd:3,au:0}},
 candi:{theme:{primary:'#8b1e2d',accent:'#b8864b',bg:'#faf6f0',text:'#4a2326',soft:'#f0e4dc'},font:'parisienne',style:'soft',flow:'tap',anim:'rise',pat:'none',flora:false,mo:{sk:1,hv:0,fx:0,op:0,lt:4,bd:3,au:0}},
 ulos:{theme:{primary:'#e0b84a',accent:'#c0282d',bg:'#170d0d',text:'#f3e7d8',soft:'#2a1515'},font:'luxe',style:'bold',flow:'scroll',anim:'slide',pat:'none',flora:false,mo:{sk:6,hv:0,fx:5,op:0,lt:2,bd:2,au:0}},
 songket:{theme:{primary:'#f2cf7a',accent:'#d4a537',bg:'#34090f',text:'#f6e9cf',soft:'#4a1219'},font:'luxe',style:'soft',flow:'scroll',anim:'zoom',pat:'none',flora:false,mo:{sk:5,hv:0,fx:8,op:0,lt:0,bd:1,au:0}},
 senja:{theme:{primary:'#7a3b5e',accent:'#e0975a',bg:'#fff4ea',text:'#46283a',soft:'#fbe1cf'},font:'romantic',style:'soft',flow:'auto',anim:'rise',pat:'none',flora:false,mo:{sk:3,hv:0,fx:6,op:0,lt:1,bd:3,au:0}},
 buku:{theme:{primary:'#2f5d62',accent:'#c9a24a',bg:'#fbf5e8',text:'#33302a',soft:'#efe4cc'},font:'script',style:'soft',flow:'scroll',anim:'rise',pat:'none',flora:false,mo:{sk:1,hv:0,fx:5,op:0,lt:4,bd:3,au:0}},
 tiket:{theme:{primary:'#1f3a5f',accent:'#e8913a',bg:'#f4f8fc',text:'#1d2b3d',soft:'#dde9f5'},font:'clean',style:'soft',flow:'tap',anim:'slide',pat:'none',flora:false,mo:{sk:5,hv:0,fx:4,op:0,lt:3,bd:3,au:0}},
 polaroid:{theme:{primary:'#5a3a2a',accent:'#d9805f',bg:'#fbf1e4',text:'#3a2a20',soft:'#f0dfc9'},font:'playful',style:'soft',flow:'auto',anim:'zoom',pat:'none',flora:false,mo:{sk:3,hv:0,fx:3,op:0,lt:3,bd:3,au:0}},
 bioskop:{theme:{primary:'#f2c94c',accent:'#d64545',bg:'#140a0c',text:'#f5e6d0',soft:'#241216'},font:'editorial',style:'bold',flow:'auto',anim:'fade',pat:'none',flora:false,mo:{sk:6,hv:0,fx:9,op:0,lt:2,bd:2,au:0}},
 balon:{theme:{primary:'#2d5f8a',accent:'#f08a5d',bg:'#f3f9fd',text:'#213547',soft:'#dcecf7'},font:'parisienne',style:'soft',flow:'auto',anim:'rise',pat:'none',flora:false,mo:{sk:4,hv:0,fx:4,op:0,lt:1,bd:3,au:0}},
 lampion:{theme:{primary:'#f4c77b',accent:'#ff9a3c',bg:'#0d1230',text:'#f3e9d6',soft:'#1a2150'},font:'signature',style:'soft',flow:'auto',anim:'fade',pat:'none',flora:false,mo:{sk:4,hv:0,fx:8,op:0,lt:0,bd:3,au:0}}
};
const NAMES={joglo:'Joglo Sepia',beludru:'Amplop Beludru',candi:'Candi Kabut',ulos:'Tenun Ulos',songket:'Songket Emas',senja:'Senja Taman',buku:'Buku Cerita',tiket:'Tiket Perjalanan',polaroid:'Album Polaroid',bioskop:'Layar Bioskop',balon:'Balon Udara',lampion:'Lampion Malam'};

/* daftarkan ke galeri: tampil paling depan di kategori Pernikahan */
if(Array.isArray(I.TEMPLATES)){const base=I.TEMPLATES.find(t=>t.cat==='wedding');
 if(base){const add=Object.keys(SC).map(k=>Object.assign({},base,THEMES[k],{id:'wedding-'+k,name:NAMES[k],scene:k,theme:Object.assign({},THEMES[k].theme),mo:Object.assign({},THEMES[k].mo),defaults:Object.assign({},base.defaults)}));
  const at=I.TEMPLATES.indexOf(base);I.TEMPLATES.splice(at,0,...add)}}

window.__invScene=function(wrap,data){
 if(!wrap||wrap.dataset.scene)return;const k=data&&data.scene;const S=SC[k];if(!S)return;
 const id=(++uid)+'';wrap.dataset.scene=k;wrap.classList.add('has-scene');
 const hero=wrap.querySelector('.hero');
 if(hero){const bg=document.createElement('div');bg.className='sc-bg';bg.setAttribute('aria-hidden','true');bg.innerHTML=S.bg(id);hero.insertBefore(bg,hero.firstChild);
  const fg=document.createElement('div');fg.className='sc-fg';fg.setAttribute('aria-hidden','true');
  const bc=S.fl.concat(['#fff']);const fb='<svg class="sc-fb" viewBox="0 0 390 420" preserveAspectRatio="xMidYMax slice">'+bunch(14,250,62,130,bc,24,3)+bunch(380,262,58,120,bc,22,17)+'</svg>';
  const fl='<svg class="sc-fl" viewBox="0 0 390 110" preserveAspectRatio="xMidYMax slice">'+leaves(390,110,k==='candi'||k==='joglo'?'#3f5f3a':'#2f4a2a',16,5,40)+flowers(390,110,S.fl,18,11,70)+'</svg>';
  fg.innerHTML=fb+'<div class="sc-cp">'+couple(S.couple,id)+'</div>'+fl;hero.appendChild(fg)}
 const cover=wrap.querySelector('.cover');
 if(cover){const c=document.createElement('div');c.className='sc-cv';c.setAttribute('aria-hidden','true');c.innerHTML=S.cover;cover.insertBefore(c,cover.firstChild)}
};
})();
 

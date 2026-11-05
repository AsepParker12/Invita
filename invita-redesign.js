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
let q=false;const mo=new MutationObserver(()=>{if(q)return;q=true;requestAnimationFrame(()=>{q=false;installEditor();enhance(document)})});mo.observe(document.documentElement,{subtree:true,childList:true});document.addEventListener('DOMContentLoaded',()=>{installEditor();enhance(document)});
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

/* pasangan tanpa wajah: kepala polos tanpa mata, hidung, mulut */
function couple(v,id){
 const P={jawa:{hj:'#f3e6da',kb:'#c9a38d',jk:'#2a1a16',kn:'#7b4a26',ac:'#d4af5a',hat:'#6b3b1d'},
  gelap:{hj:'#e9d6cc',kb:'#6b2a35',jk:'#1d1517',kn:'#4a1d28',ac:'#d4af5a',hat:'#14100f'},
  ulos:{hj:'#161010',kb:'#161010',jk:'#161010',kn:'#a4161a',ac:'#e0b84a',hat:'#161010'},
  melayu:{hj:'#e7c35a',kb:'#e7c35a',jk:'#b2812a',kn:'#7d1f2c',ac:'#fff0b8',hat:'#10100f'},
  senja:{hj:'#fbeee3',kb:'#f2b6a0',jk:'#5a3350',kn:'#8d5a7a',ac:'#f6d27a',hat:'#3d2438'}}[v]||{};
 const st='--hj:'+P.hj+';--kb:'+P.kb+';--jk:'+P.jk+';--kn:'+P.kn+';--ac:'+P.ac+';--hat:'+P.hat;
 const hatG=(v==='jawa')?'<path class="ct" d="M126 52C123 31 157 31 154 52C150 43 130 43 126 52Z"/><circle class="ca" cx="140" cy="38" r="2.4"/>':'<rect class="ct" x="127" y="30" width="26" height="15" rx="4"/>'+(v==='melayu'?'<path class="ca" d="M127 40H153V43H127Z"/>':'');
 const sash=(v==='ulos')?'<path d="M36 120L100 196L88 204L30 140Z" fill="#a4161a"/><path d="M114 118L172 196L162 202L108 134Z" fill="#a4161a"/>':'<path class="ca" d="M30 190H106V196H30Z"/><path class="ca" d="M108 190H172V196H108Z"/>';
 const sig=(v==='jawa'||v==='melayu')?'<path class="ca" d="M56 36L68 12L80 36Z"/>':'';
 return '<svg class="cp" viewBox="0 0 200 320" preserveAspectRatio="xMidYMax meet" style="'+st+'" aria-hidden="true"><defs><pattern id="bt'+id+'" width="14" height="14" patternUnits="userSpaceOnUse"><path d="M7 1L13 7L7 13L1 7Z" fill="none" stroke="var(--ac)" stroke-width="1.1" opacity=".75"/><circle cx="7" cy="7" r="1.4" fill="var(--ac)" opacity=".7"/></pattern></defs>'+
 '<ellipse cx="100" cy="314" rx="92" ry="5" fill="#000" opacity=".18"/>'+
 /* mempelai wanita */
 '<path class="chj" d="M68 26C48 26 40 48 42 68C40 86 34 98 34 114L102 114C102 98 96 86 94 68C96 48 88 26 68 26Z"/><ellipse class="csk" cx="68" cy="63" rx="13" ry="16"/>'+sig+
 '<path class="ckb" d="M36 118Q68 104 100 118L106 198L30 198Z"/><path class="ckb" d="M36 120L22 192L33 196L46 130Z"/><path class="ckb" d="M100 120L114 190L103 195L92 130Z"/><ellipse class="csk" cx="27" cy="197" rx="6" ry="7"/><ellipse class="csk" cx="109" cy="195" rx="6" ry="7"/>'+
 '<path class="ckn" d="M30 194H106L122 312H14Z"/><path d="M30 194H106L122 312H14Z" fill="url(#bt'+id+')"/><ellipse cx="40" cy="313" rx="14" ry="4" fill="#1a1210"/><ellipse cx="96" cy="313" rx="14" ry="4" fill="#1a1210"/>'+
 /* mempelai pria */
 '<ellipse class="csk" cx="140" cy="55" rx="13" ry="16"/>'+hatG+'<rect class="csk" x="134" y="68" width="12" height="14"/>'+
 '<path class="cjk" d="M114 114Q140 100 166 114L174 198L106 198Z"/><path class="cjk" d="M114 116L100 192L111 196L124 126Z"/><path class="cjk" d="M166 116L182 192L171 196L158 126Z"/><ellipse class="csk" cx="105" cy="196" rx="6" ry="7"/><ellipse class="csk" cx="177" cy="196" rx="6" ry="7"/>'+
 '<circle class="ca" cx="140" cy="124" r="2"/><circle class="ca" cx="140" cy="140" r="2"/><circle class="ca" cx="140" cy="156" r="2"/><circle class="ca" cx="140" cy="172" r="2"/>'+
 '<path class="ckn" d="M108 194H172L186 312H94Z"/><path d="M108 194H172L186 312H94Z" fill="url(#bt'+id+')"/><ellipse cx="116" cy="313" rx="14" ry="4" fill="#1a1210"/><ellipse cx="166" cy="313" rx="14" ry="4" fill="#1a1210"/>'+sash+
 '</svg>'}

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
SC.beludru={couple:'gelap',fl:['#e7b7c2','#f4e6ea','#d98aa0','#f7d7cf'],
 bg:id=>{let f='';for(let i=0;i<15;i++)f+='<rect x="'+(i*27)+'" width="27" height="700" fill="url(#f'+id+')" opacity="'+(i%2?.9:.55)+'"/>';
  return '<svg viewBox="0 0 390 800" preserveAspectRatio="xMidYMax slice"><defs><linearGradient id="f'+id+'" x1="0" x2="1"><stop offset="0" stop-color="#0b150b"/><stop offset=".5" stop-color="#2a3d22"/><stop offset="1" stop-color="#0b150b"/></linearGradient><linearGradient id="fl'+id+'" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2a1c14"/><stop offset="1" stop-color="#080504"/></linearGradient></defs><rect width="390" height="800" fill="#0f180e"/>'+f+'<rect y="690" width="390" height="110" fill="url(#fl'+id+')"/><rect y="640" width="390" height="60" fill="#d8bfae" opacity=".28"/></svg>'},
 cover:'<div class="sc-cur l"></div><div class="sc-cur r"></div><div class="sc-env"><i class="fl"></i></div>'};
/* ---------- 3. Candi kabut: gunungan terbelah ---------- */
SC.candi={couple:'jawa',fl:['#8f1d33','#1f3f78','#f6e9e0','#d98aa0','#c9496a'],
 bg:id=>'<svg viewBox="0 0 390 800" preserveAspectRatio="xMidYMax slice"><defs><linearGradient id="g'+id+'" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fbf8f3"/><stop offset="1" stop-color="#eee2dc"/></linearGradient><linearGradient id="m'+id+'" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#fbf8f3" stop-opacity=".92"/></linearGradient><pattern id="w'+id+'" width="22" height="26" patternUnits="userSpaceOnUse"><rect width="22" height="26" fill="#b27a3c"/><rect x="2" y="3" width="18" height="20" fill="none" stroke="#7a4b1e" stroke-width="1.4"/></pattern></defs><rect width="390" height="800" fill="url(#g'+id+')"/>'+
  '<path d="M0 520L70 440L130 500L200 410L270 490L330 430L390 500V800H0Z" fill="#cdbdb8" opacity=".35"/>'+
  '<g fill="#a99a9a" opacity=".42"><path d="M80 610H310L292 580H98Z"/><path d="M106 582H284L270 552H120Z"/><path d="M132 554H258L246 526H144Z"/><path d="M158 528H232L222 498H168Z"/><path d="M180 500H210L205 440L195 410L185 440Z"/><path d="M92 584H112L108 520L102 500L96 520Z"/><path d="M278 584H298L294 520L288 500L282 520Z"/></g>'+
  '<rect y="420" width="390" height="260" fill="url(#m'+id+')"/>'+
  '<path d="M0 600Q195 500 390 600V800H0Z" fill="#e6c0b8" opacity=".7"/>'+
  '<rect y="640" width="390" height="70" fill="url(#w'+id+')"/><rect y="636" width="390" height="8" fill="#8a5628"/>'+
  '<g transform="translate(195 24)"><path d="M0 0C0 0-30 44-34 88C-38 128-18 150 0 150C18 150 38 128 34 88C30 44 0 0 0 0Z" fill="#8f1d33"/><path d="M0 24C0 24-16 56-18 90C-19 112-8 126 0 126C8 126 19 112 18 90C16 56 0 24 0 24Z" fill="none" stroke="#e6c27a" stroke-width="1.6"/><path d="M0 52V120M-10 82H10" stroke="#e6c27a" stroke-width="1.4"/></g></svg>',
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
SC.senja={couple:'senja',fl:['#f5a0a0','#fbe0c8','#c96a8a','#f7c76a'],
 bg:id=>'<svg viewBox="0 0 390 800" preserveAspectRatio="xMidYMax slice"><defs><linearGradient id="g'+id+'" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c9b0e0"/><stop offset=".45" stop-color="#ffc7a2"/><stop offset="1" stop-color="#ffe6c8"/></linearGradient><radialGradient id="s'+id+'"><stop offset="0" stop-color="#fff6d6"/><stop offset=".5" stop-color="#ffe3a8"/><stop offset="1" stop-color="#ffe3a8" stop-opacity="0"/></radialGradient></defs><rect width="390" height="800" fill="url(#g'+id+')"/>'+
  '<g class="sc-sun"><circle cx="195" cy="400" r="130" fill="url(#s'+id+')"/><circle cx="195" cy="400" r="48" fill="#fff3c8"/></g>'+
  '<g class="sc-cloud"><ellipse cx="70" cy="150" rx="70" ry="13" fill="#fff" opacity=".6"/><ellipse cx="320" cy="210" rx="80" ry="12" fill="#fff" opacity=".55"/></g>'+
  '<path class="sc-hill h1" d="M-40 520Q100 440 230 510T430 480V800H-40Z" fill="#eea77f"/><path class="sc-hill h2" d="M-40 580Q130 500 260 570T430 540V800H-40Z" fill="#d98a7c"/><path class="sc-hill h3" d="M-40 640Q120 580 250 630T430 610V800H-40Z" fill="#a8627a"/>'+
  '<g fill="#6b3a5a" opacity=".85"><path d="M40 640L52 560L64 640Z"/><path d="M60 650L74 570L88 650Z"/><path d="M320 645L333 565L346 645Z"/></g></svg>',
 cover:'<div class="sc-shut l"></div><div class="sc-shut r"></div>'};
const THEMES={
 joglo:{theme:{primary:'#7a1f2b',accent:'#b8923f',bg:'#f7efdc',text:'#3b2a1a',soft:'#ecdfbf'},font:'classic',style:'soft',flow:'scroll',anim:'rise',pat:'none',flora:false,mo:{sk:2,hv:0,fx:1,op:0,lt:3,bd:1,au:0}},
 beludru:{theme:{primary:'#e8cdbf',accent:'#c9a36a',bg:'#101a0f',text:'#f1e6dc',soft:'#1c2a19'},font:'signature',style:'soft',flow:'scroll',anim:'fade',pat:'none',flora:false,mo:{sk:4,hv:0,fx:11,op:0,lt:1,bd:3,au:0}},
 candi:{theme:{primary:'#8b1e2d',accent:'#b8864b',bg:'#faf6f0',text:'#4a2326',soft:'#f0e4dc'},font:'parisienne',style:'soft',flow:'tap',anim:'rise',pat:'none',flora:false,mo:{sk:1,hv:0,fx:0,op:0,lt:4,bd:3,au:0}},
 ulos:{theme:{primary:'#e0b84a',accent:'#c0282d',bg:'#170d0d',text:'#f3e7d8',soft:'#2a1515'},font:'luxe',style:'bold',flow:'scroll',anim:'slide',pat:'none',flora:false,mo:{sk:6,hv:0,fx:5,op:0,lt:2,bd:2,au:0}},
 songket:{theme:{primary:'#f2cf7a',accent:'#d4a537',bg:'#34090f',text:'#f6e9cf',soft:'#4a1219'},font:'luxe',style:'soft',flow:'scroll',anim:'zoom',pat:'none',flora:false,mo:{sk:5,hv:0,fx:8,op:0,lt:0,bd:1,au:0}},
 senja:{theme:{primary:'#7a3b5e',accent:'#e0975a',bg:'#fff4ea',text:'#46283a',soft:'#fbe1cf'},font:'romantic',style:'soft',flow:'scroll',anim:'rise',pat:'none',flora:false,mo:{sk:3,hv:0,fx:6,op:0,lt:1,bd:3,au:0}}};
const NAMES={joglo:'Joglo Sepia',beludru:'Amplop Beludru',candi:'Candi Kabut',ulos:'Tenun Ulos',songket:'Songket Emas',senja:'Senja Taman'};

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
  const fl='<svg class="sc-fl" viewBox="0 0 390 260" preserveAspectRatio="xMidYMax slice">'+leaves(390,260,k==='candi'||k==='joglo'?'#3f5f3a':'#2f4a2a',22,5,90)+flowers(390,260,S.fl,26,11,140)+'</svg>';
  fg.innerHTML='<div class="sc-cp">'+couple(S.couple,id)+'</div>'+fl;hero.appendChild(fg)}
 const cover=wrap.querySelector('.cover');
 if(cover){const c=document.createElement('div');c.className='sc-cv';c.setAttribute('aria-hidden','true');c.innerHTML=S.cover;cover.insertBefore(c,cover.firstChild)}
};
})();
 

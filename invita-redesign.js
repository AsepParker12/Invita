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
const counters={};(I.TEMPLATES||[]).forEach(t=>{const i=counters[t.cat]||0;counters[t.cat]=i+1;const p=PALETTES[i%PALETTES.length];t.name=(NAMES[t.cat]||NAMES.lainnya)[i%10];t.style=STYLES[i%STYLES.length];t.font=FONTS[i%FONTS.length];t.anim=ANIMS[i%ANIMS.length];t.pat=PATS[(i+(t.cat==='birthday'?6:0))%PATS.length];t.flora=['wedding','aqiqah','keluarga','pengajian'].includes(t.cat)&&i%3!==2;t.theme={primary:p[0],accent:p[1],bg:p[2],text:p[3],soft:p[4]};const c=(COPY[t.cat]||COPY.lainnya)[0];t.defaults={title:c[0],opening:c[1],description:c[2],closing:c[3]};});
if(HAS_TPL){I.textVariants=cat=>(COPY[cat]||COPY.lainnya).map(v=>({title:v[0],opening:v[1],description:v[2],closing:v[3]}));
const oldSample=I.sampleData;I.sampleData=function(t){const d=oldSample(t);if(t.cat==='wedding')d.host='Ayla & Yaff';return d;};}
function enc(s){try{return btoa(unescape(encodeURIComponent(s)))}catch(e){return''}}function dec(s){try{return decodeURIComponent(escape(atob(s)))}catch(e){return''}}
function pack(x){return '[[INVITA_STORY:'+enc(JSON.stringify(x))+']]'}function unpack(s){const m=String(s||'').match(/\[\[INVITA_STORY:([^\]]+)\]\]/);if(!m)return[];try{return JSON.parse(dec(m[1]))||[]}catch(e){return[]}}function clean(s){return String(s||'').replace(/\n?\[\[INVITA_STORY:[^\]]+\]\]/g,'').trim()}
/* Memecah "Nama1 penghubung Nama2". Kalau tidak cocok: null (strict) atau nama contoh */
function split(host,strict){host=String(host||'');for(const [k,v] of Object.entries(SEP)){const a=host.split(' '+v+' ');if(a.length===2&&a[0].trim()&&a[1].trim())return[a[0].trim(),a[1].trim(),k]}return strict?null:['Ayla','Yaff','amp']}
/* Nama pasangan untuk undangan: pakai data.n1/n2/sep (penghubung bebas), cadangannya baca dari teks nama */
function pair(d){if(!d||d.art!=='wedding')return null;const h=String(d.host||'');if(!h.trim())return null;if(d.n1&&d.n2&&h===[d.n1,d.sep||'&',d.n2].join(' '))return[d.n1,d.sep||'&',d.n2];const p=split(h,true);return p?[p[0],SEP[p[2]],p[1]]:null}
function couple(wrap,d){const t=pair(d);if(!t||!wrap)return;const fs=t[1].length<=3?'1em':'.55em';const html='<span class="v3-render-names"><strong>'+I.esc(t[0])+'</strong><i style="font-size:'+fs+'">'+I.esc(t[1])+'</i><strong>'+I.esc(t[2])+'</strong></span>';wrap.querySelectorAll('.h-host,.cover h2').forEach(el=>{el.innerHTML=html});const ini=((t[0][0]||'')+(t[2][0]||'')).toUpperCase();wrap.querySelectorAll('.seal span').forEach(el=>{el.textContent=ini})}
const baseRender=I.renderInvitation;
I.renderInvitation=function(root,inv,opts){const r=baseRender.apply(this,arguments);try{if(opts&&opts.mode==='preview'&&inv&&inv.id&&!/^(tpl|demo)-/.test(inv.id))I.__edit=inv.data;couple(r&&r.wrap,inv&&inv.data)}catch(e){}try{if(window.__invMotion)window.__invMotion(r&&r.wrap,opts||{},inv&&inv.data)}catch(e){}return r};
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
 let stories=unpack(desc.value);if(!stories.length)stories=[{date:'2021',title:'Pertama Bertemu',text:'Sebuah pertemuan sederhana yang membuka halaman pertama.',photo:''},{date:'2024',title:'Memilih Bersama',text:'Dua perjalanan sepakat menuju rumah yang sama.',photo:''}];
 const panel=document.createElement('details');panel.className='grp v3-story-editor';panel.open=true;panel.innerHTML='<summary>Perjalanan Kami</summary><div class="grp-body"><p class="mini-note">Setiap momen bisa memakai foto sendiri. Foto otomatis diperkecil agar tetap ringan.</p><div id="v3rows"></div><button type="button" class="btn btn-sm" id="v3add">+ Tambah cerita</button></div>';form.insertBefore(panel,form.querySelectorAll('.grp')[1]||null);const rows=panel.querySelector('#v3rows');
 function names(init){const a=q('#v3n1').value.trim(),b=q('#v3n2').value.trim(),s=curSep();q('#v3p1').textContent=a||'Nama 1';q('#v3ps').textContent=s;q('#v3p2').textContent=b||'Nama 2';const val=(a&&b)?[a,s,b].join(' '):(a||b);const E=I.__edit;if(E){E.n1=a;E.n2=b;E.sep=s}if(host.value!==val){host.value=val;host.dispatchEvent(new Event('input',{bubbles:true}))}else if(!init&&E){host.dispatchEvent(new Event('input',{bubbles:true}))}}
 function sync(){desc.value=clean(desc.value)+'\n'+pack(stories);desc.dispatchEvent(new Event('input',{bubbles:true}))}
 function draw(){rows.innerHTML='';stories.forEach((x,i)=>{const r=document.createElement('article');r.className='v3-story-row';r.innerHTML='<div class="v3-photo">'+(x.photo?'<img src="'+esc(x.photo)+'" alt="Foto cerita">':'<span>Belum ada foto</span>')+'</div><div class="v3-story-fields">'+fld('Tahun / tanggal','v3d'+i,x.date)+fld('Judul cerita','v3t'+i,x.title)+'<label class="fld"><span>Cerita singkat</span><textarea id="v3x'+i+'" rows="3">'+esc(x.text||'')+'</textarea></label><label class="v3-upload">Pilih foto<input id="v3f'+i+'" type="file" accept="image/*"></label><button type="button" class="btn btn-sm btn-danger" id="v3r'+i+'">Hapus cerita</button></div>';rows.appendChild(r);['v3d','v3t','v3x'].forEach(id=>r.querySelector('#'+id+i).addEventListener('input',()=>{stories[i]={...stories[i],date:r.querySelector('#v3d'+i).value,title:r.querySelector('#v3t'+i).value,text:r.querySelector('#v3x'+i).value};sync()}));r.querySelector('#v3f'+i).addEventListener('change',async e=>{const d=await imgData(e.target.files[0]);if(d){stories[i].photo=d;draw();sync()}});r.querySelector('#v3r'+i).onclick=()=>{stories.splice(i,1);draw();sync()};});}
 couple.addEventListener('click',e=>{const b=e.target.closest('.v3-chip');if(!b)return;key=b.dataset.sep;couple.querySelectorAll('.v3-chip').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));q('.v3-custom').hidden=key!=='custom';if(key==='custom')q('#v3sepc').focus();names()});
 couple.querySelectorAll('#v3n1,#v3n2,#v3sepc').forEach(e=>e.addEventListener('input',()=>names()));panel.querySelector('#v3add').onclick=()=>{stories.push({date:'',title:'',text:'',photo:''});draw();sync()};names(true);draw();sync();}
function textNodes(root){const w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);const a=[];while(w.nextNode())a.push(w.currentNode);return a}
function enhance(root){root.querySelectorAll('.inv').forEach(inv=>{if(inv.dataset.v3)return;inv.dataset.v3='1';let stories=[];textNodes(inv).forEach(n=>{if(n.nodeValue.includes('[[INVITA_STORY:')){stories=unpack(n.nodeValue);n.nodeValue=clean(n.nodeValue)}});
 if(stories.length){const sec=document.createElement('section');sec.className='v3-journey';sec.innerHTML='<div class="v3-kicker">Perjalanan Kami</div><h2>Bab yang membawa kami ke hari ini</h2><div class="v3-timeline">'+stories.map((x,i)=>'<article style="--i:'+i+'">'+(x.photo?'<figure><img src="'+esc(x.photo)+'" alt="Foto '+esc(x.title||'cerita')+'"></figure>':'<figure class="empty"><span>✦</span></figure>')+'<div><time>'+esc(x.date||'')+'</time><h3>'+esc(x.title||'Momen Kami')+'</h3><p>'+esc(x.text||'')+'</p></div></article>').join('')+'</div>';inv.appendChild(sec)}
 const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('v3-in');io.unobserve(e.target)}}),{threshold:.12});inv.querySelectorAll('section,.event,.gallery,.v3-timeline article').forEach((el,i)=>{el.classList.add('v3-reveal');el.style.setProperty('--delay',(i%5)*70+'ms');io.observe(el)});});}
/* Di halaman tamu (view.html) tidak ada templates.js: editor dan cerita ditangani file lain, jadi berhenti di sini */
if(!HAS_TPL)return;
let q=false;const mo=new MutationObserver(()=>{if(q)return;q=true;requestAnimationFrame(()=>{q=false;installEditor();enhance(document)})});mo.observe(document.documentElement,{subtree:true,childList:true});document.addEventListener('DOMContentLoaded',()=>{installEditor();enhance(document)});
})();

/* ===== MOTION GRAPHIC: aplikasi dan undangan ===== */
(function(){
'use strict';
const REDUCE=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
const KIND={wedding:'petal',keluarga:'petal',pengajian:'star',aqiqah:'star',khitanan:'star',wisuda:'star',birthday:'confetti',opening:'confetti',reuni:'confetti'};
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
 fx.style.setProperty('--h',(h+60)+'px');const cols=['var(--a)','var(--p)','#fff','var(--soft)'];
 for(let i=0;i<16;i++){const e=document.createElement('i');e.className='p '+kind;
  e.style.setProperty('--x',rnd(0,100)+'%');e.style.setProperty('--s',rnd(kind==='dot'?5:8,kind==='dot'?16:17)+'px');
  e.style.setProperty('--dur',rnd(9,17)+'s');e.style.setProperty('--dl',-rnd(0,16)+'s');e.style.setProperty('--dx',rnd(-70,70)+'px');
  e.style.setProperty('--rot',rnd(240,720)+'deg');e.style.setProperty('--c',cols[i%4]);fx.appendChild(e)}
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
 particles(fx,KIND[d.art]||'dot',wrap.offsetHeight||700);
 /* aurora di belakang hero */
 if(hero&&d.style!=='modern'){const a=document.createElement('div');a.className='hero-aurora';a.setAttribute('aria-hidden','true');a.innerHTML='<i></i><i></i>';hero.insertBefore(a,hero.firstChild)}
 /* band berjalan antar bagian (hanya mode gulir) */
 if(!tap&&hero&&scroller){const t=[d.title,String(d.host||'').trim()].filter(Boolean).join(' ✦ ')||(d.kicker||'Undangan');
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

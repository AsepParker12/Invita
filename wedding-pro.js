/* Invita Wedding Pro: Amba & Tukam */
(function(){
'use strict';
const I=window.Invita;if(!I)return;
const SEP={amp:'&',heart:'♥',rings:'◉ ◉',infinity:'∞',and:'dan',spark:'✦',flower:'❀'};
const WEDDING=[
 ['wedding-rosegold','Amba & Tukam — Ivory Bloom','frame','romantic',['#7a3348','#d6af63','#fffaf5','#352127','#f5e5e7'],'rise','leaf',true],
 ['wedding-emerald','Amba & Tukam — Emerald Garden','arch','signature',['#164c41','#d4b56f','#f8fcf8','#17342f','#dfece5'],'fade','leaf',true],
 ['wedding-burgundy','Amba & Tukam — Royal Merlot','frame','classic',['#651f35','#d0a85e','#fff8f6','#35131f','#f1dfe3'],'slide','none',false],
 ['wedding-champagne','Amba & Tukam — Quiet Luxury','minimal','luxe',['#6f5a3d','#cdb27d','#fffdf7','#342d23','#f0eadc'],'fade','none',false],
 ['wedding-sage','Amba & Tukam — Sage Poetry','soft','parisienne',['#57705a','#d4b07a','#f8faf5','#28352a','#e3eadc'],'rise','leaf',true],
 ['wedding-blush','Amba & Tukam — Blush Romance','arch','romantic',['#a94f70','#e3be79','#fff7fa','#462631','#f7e0e8'],'slide','sparkle',true],
 ['wedding-dustyblue','Amba & Tukam — Blue Heirloom','frame','elegant',['#536f8c','#d3b985','#f7f9fc','#263649','#dfe7ef'],'zoom','dots',false],
 ['wedding-terracotta','Amba & Tukam — Terracotta Tale','arch','signature',['#a9573e','#d9aa72','#fff8f1','#42251c','#f3dfd2'],'rise','leaf',true],
 ['wedding-lavender','Amba & Tukam — Lavender Dream','soft','romantic',['#75649a','#d5afc5','#fbf8ff','#302747','#eae3f3'],'fade','sparkle',true],
 ['wedding-midnight','Amba & Tukam — Midnight Gold','bold','classic',['#161d35','#d7b660','#f8f8fb','#171c31','#e2e4ed'],'zoom','star',false]
];
const byId=Object.fromEntries(WEDDING.map(x=>[x[0],x]));
I.TEMPLATES.forEach(t=>{const x=byId[t.id];if(!x)return;t.name=x[1];t.style=x[2];t.font=x[3];t.theme={primary:x[4][0],accent:x[4][1],bg:x[4][2],text:x[4][3],soft:x[4][4]};t.anim=x[5];t.pat=x[6];t.flora=x[7];t.flow='scroll';t.defaults.title='The Wedding of';});
const oldSample=I.sampleData;
I.sampleData=function(t){const d=oldSample(t);if(t.cat==='wedding'){d.host='Amba & Tukam';d.title='The Wedding of';}return d;};
function b64e(s){try{return btoa(unescape(encodeURIComponent(s)))}catch(e){return ''}}
function b64d(s){try{return decodeURIComponent(escape(atob(s)))}catch(e){return ''}}
function packStory(items){return '[[INVITA_STORY:'+b64e(JSON.stringify(items))+']]'}
function unpackStory(text){const m=String(text||'').match(/\[\[INVITA_STORY:([^\]]+)\]\]/);if(!m)return[];try{return JSON.parse(b64d(m[1]))||[]}catch(e){return[]}}
function cleanStory(text){return String(text||'').replace(/\n?\[\[INVITA_STORY:[^\]]+\]\]/g,'').trim()}
function splitNames(host){const known=[' ♥ ',' ◉ ◉ ',' ∞ ',' dan ',' ✦ ',' ❀ ',' & '];for(const s of known){const p=String(host||'').split(s);if(p.length===2)return[p[0].trim(),p[1].trim(),Object.keys(SEP).find(k=>SEP[k]===s.trim())||'amp']}return[String(host||'Amba').trim(),'Tukam','amp']}
function field(label,id,value,type){return '<label class="fld"><span>'+label+'</span><input id="'+id+'" type="'+(type||'text')+'" value="'+I.esc(value||'')+'"></label>'}
function installEditor(){
 const form=document.querySelector('#form');if(!form||form.dataset.wpro)return;form.dataset.wpro='1';
 const host=document.querySelector('[data-k="data.host"]');const desc=document.querySelector('[data-k="data.description"]');if(!host||!desc)return;
 const [a,b,k]=splitNames(host.value);host.closest('.fld').style.display='none';
 const box=document.createElement('div');box.className='wpro-box';box.innerHTML='<div class="wpro-title"><b>Pasangan</b><small>Nama dibuat terpisah agar tidak pecah aneh di layar HP.</small></div><div class="row2">'+field('Nama pertama','wpName1',a)+field('Nama kedua','wpName2',b)+'</div><label class="fld"><span>Penghubung nama</span><select id="wpSep">'+Object.entries(SEP).map(([x,v])=>'<option value="'+x+'"'+(x===k?' selected':'')+'>'+v+'</option>').join('')+'</select></label><div class="wp-name-preview"><span id="wpPrev1"></span><i id="wpPrevSep"></i><span id="wpPrev2"></span></div>';
 host.closest('.grp-body').insertBefore(box,host.closest('.fld'));
 const items=unpackStory(desc.value);const story=document.createElement('details');story.className='grp wpro-story-editor';story.open=true;story.innerHTML='<summary>Perjalanan Kami</summary><div class="grp-body"><p class="mini-note">Tambahkan momen penting. Bagian ini ikut masuk ke tautan undangan.</p><div id="wpStoryRows"></div><button type="button" class="btn btn-sm" id="wpAddStory">+ Tambah momen</button></div>';
 form.insertBefore(story,form.querySelectorAll('.grp')[1]||null);
 const rows=story.querySelector('#wpStoryRows');
 function syncNames(){const n1=box.querySelector('#wpName1').value.trim(),n2=box.querySelector('#wpName2').value.trim(),s=SEP[box.querySelector('#wpSep').value]||'&';box.querySelector('#wpPrev1').textContent=n1||'Nama 1';box.querySelector('#wpPrevSep').textContent=s;box.querySelector('#wpPrev2').textContent=n2||'Nama 2';host.value=[n1,s,n2].filter(Boolean).join(' ');host.dispatchEvent(new Event('input',{bubbles:true}));}
 function draw(){rows.innerHTML='';(items.length?items:[{year:'2021',title:'Pertama Bertemu',text:'Sebuah pertemuan sederhana yang mengubah arah cerita.'},{year:'2024',title:'Memilih Bersama',text:'Dua perjalanan sepakat menuju rumah yang sama.'}]).forEach((it,i)=>{if(!items.length)items.push(it);const r=document.createElement('div');r.className='wp-story-row';r.innerHTML=field('Tahun / tanggal','wpy'+i,it.year)+field('Judul momen','wpt'+i,it.title)+'<label class="fld wp-wide"><span>Cerita singkat</span><textarea rows="2" id="wpx'+i+'">'+I.esc(it.text||'')+'</textarea></label><button type="button" class="wp-remove" aria-label="Hapus momen">×</button>';rows.appendChild(r);r.querySelector('.wp-remove').onclick=()=>{items.splice(i,1);draw();syncStory()};[...r.querySelectorAll('input,textarea')].forEach(el=>el.addEventListener('input',()=>{items[i]={year:r.querySelector('#wpy'+i).value,title:r.querySelector('#wpt'+i).value,text:r.querySelector('#wpx'+i).value};syncStory()}));});}
 function syncStory(){desc.value=cleanStory(desc.value)+'\n'+packStory(items);desc.dispatchEvent(new Event('input',{bubbles:true}));}
 box.querySelectorAll('input,select').forEach(x=>x.addEventListener('input',syncNames));story.querySelector('#wpAddStory').onclick=()=>{items.push({year:'',title:'',text:''});draw();syncStory()};draw();syncNames();syncStory();
}
function enhanceInvitation(root){
 root.querySelectorAll('.inv').forEach(inv=>{if(inv.dataset.wpro)return;inv.dataset.wpro='1';
   const walker=document.createTreeWalker(inv,NodeFilter.SHOW_TEXT);const texts=[];while(walker.nextNode())texts.push(walker.currentNode);
   let story=[];texts.forEach(n=>{if(n.nodeValue&&n.nodeValue.includes('[[INVITA_STORY:')){story=unpackStory(n.nodeValue);n.nodeValue=cleanStory(n.nodeValue)}});
   if(story.length){const sec=document.createElement('section');sec.className='wp-journey reveal-in';sec.innerHTML='<div class="wp-kicker">Perjalanan Kami</div><h2>Satu cerita, dua langkah</h2><div class="wp-timeline">'+story.map((x,i)=>'<article style="--i:'+i+'"><time>'+I.esc(x.year||'')+'</time><div><h3>'+I.esc(x.title||'Momen Kami')+'</h3><p>'+I.esc(x.text||'')+'</p></div></article>').join('')+'</div>';const target=inv.querySelector('.inv-content')||inv;target.appendChild(sec)}
   const obs=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-in');obs.unobserve(e.target)}}),{threshold:.14});inv.querySelectorAll('section,.card,.event,.gallery,.wp-journey').forEach(el=>{el.classList.add('reveal-in');obs.observe(el)});
 });
}
let scheduled=false;const mo=new MutationObserver(()=>{if(scheduled)return;scheduled=true;requestAnimationFrame(()=>{scheduled=false;installEditor();enhanceInvitation(document)})});mo.observe(document.documentElement,{childList:true,subtree:true});
document.addEventListener('DOMContentLoaded',()=>{installEditor();enhanceInvitation(document)});
})();

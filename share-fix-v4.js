/* Ensures exported standalone HTML includes redesign/story/auto-motion files. */
(function(){
'use strict';
const boot=()=>{const I=window.Invita;if(!I||!I.share||I.share.__v4)return false;I.share.__v4=true;const original=I.share.buildStandalone;
I.share.buildStandalone=async function(inv){let html=await original(inv);const get=async p=>{const r=await fetch(p,{cache:'no-cache'});return r.ok?r.text():''};const [c1,c2,c3,j1,j2]=await Promise.all([get('invita-redesign.css'),get('invita-responsive.css'),get('invita-fix-v4.css'),get('invita-redesign.js'),get('invita-fix-v4.js')]);html=html.replace('</head>','<style>'+c1+'\n'+c2+'\n'+c3+'</style></head>');html=html.replace('</body>','<script>'+j1.replace(/<\/script/gi,'<\\/script')+'<\\/script><script>'+j2.replace(/<\/script/gi,'<\\/script')+'<\\/script></body>');return html};return true};if(!boot()){const t=setInterval(()=>{if(boot())clearInterval(t)},50)};
})();

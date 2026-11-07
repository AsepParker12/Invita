/* Invita Premium template customization.
   Edit TEMPLATE_NAMES and PALETTES below if you want your own brand naming. */
(function(){
  'use strict';
  const I=window.Invita;if(!I||!Array.isArray(I.TEMPLATES))return;
  const TEMPLATE_NAMES={
    'wedding-rosegold':'Velvet Rose','wedding-emerald':'Emerald Vow','wedding-burgundy':'Royal Merlot',
    'wedding-champagne':'Champagne Letter','wedding-sage':'Sage Garden','wedding-blush':'Blush Atelier',
    'wedding-dustyblue':'Blue Heirloom','wedding-terracotta':'Tuscan Promise','wedding-lavender':'Lavender Moon',
    'wedding-midnight':'Midnight Oath','birthday-confetti':'Joy Parade','birthday-sky':'Blue Carnival',
    'aqiqah-gold':'Golden Hilal','wisuda-blackgold':'Noir Laureate','opening-boutique':'Maison Opening'
  };
  const PALETTES={
    'wedding-rosegold':{primary:'#7b3046',accent:'#d7b26a',bg:'#fffaf7',text:'#38232a',soft:'#f5e5e8'},
    'wedding-emerald':{primary:'#174b43',accent:'#d3b06c',bg:'#fbfdf9',text:'#17332f',soft:'#dfece6'},
    'wedding-midnight':{primary:'#121a32',accent:'#d7b766',bg:'#f8f8fb',text:'#181d31',soft:'#e4e5ee'},
    'birthday-confetti':{primary:'#d62f68',accent:'#ffc857',bg:'#fff9fc',text:'#38203e',soft:'#ffe2ed'},
    'opening-boutique':{primary:'#74364d',accent:'#d9b878',bg:'#fff9fa',text:'#3c202b',soft:'#f3dfe6'}
  };
  I.TEMPLATES.forEach(function(t){
    if(TEMPLATE_NAMES[t.id])t.name=TEMPLATE_NAMES[t.id];
    if(PALETTES[t.id])t.theme=Object.assign({},t.theme,PALETTES[t.id]);
  });
  /* The project name, invitation title, host name, guest name, colors, font,
     flow, animation and pattern remain editable in the existing Invita editor. */
})();

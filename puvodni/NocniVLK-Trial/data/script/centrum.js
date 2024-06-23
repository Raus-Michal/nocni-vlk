window.tik={ // window.tik je schválně vložen do objektu window, aby se zvýšila jeho priorita, neboť tento objekt je zásadní pro fugování aplikace
cas:500,
a_obchuzka:false, // určuje zda je aktivní upozornění na obchůzku
a_odpocet:false, // určuje, zda je aktivní odpočet do obchůzky (tedy zda je zapnutý Noční VLK)
a_uspano:false, // proměnná určuje zda došlo k uspání aplikace
class_h:"uhr-h", // název class v CSS, která zruší pozůstatek stínu z animace stínování Wait...
tak(){ /* funkce je nekonečný interval zajišťující veškeré procesy, které je třeba hlídat v reálném čase */
hodiny.tik(); /* zápis hodin na hlavním kontejneru */

if(this.a_obchuzka)
{
/* pokud je výzva k obchůzce aktivní */
hodinyO.tik(); /* zápis hodin na výzvě k obchůzce */
zvuk.zesiluj(); /* bude postupně zesilovat hlasitost alarmu - ve vlk.js */
obch.pocitej_T_OUT(); /* počítání Timeout */
}

if(this.a_odpocet)
{
/* pokud je odpočet - Noční VLK je zapnutý */
obch.odpocet(); /* funkce odpočítává konec Intervalu do obchůzky - ve vlk.js */
}

if(this.a_uspano)
{
// pokud dojde k uspání aplikace, proměnná tik.a_uspano, je ovládána z ochrany.js
pinkani.zesiluj(); /* bude postupně zesilovat hlasitost pinkání - ve vlk.js */
}


},
aktivace(){
// funkce vypne WAIT a zapne hodiny
const h=document.getElementById(hodiny.id[0]); // načte HTML objekt hodin
h.style.animationPlayState="paused"; /* vypne animaci stínování Wait.. */
h.className=this.class_h;  /* zruší pozůstatek stínu z animace stínování Wait... */
setInterval(this.tak.bind(this),this.cas); /* zapne interval na tikání hodin */
}};

const hodiny={id:["hod","sec1","sec2"],
cas(){
// funkce vrací aktuální čas v zařízení [hod,min,sec]

const c=new Date();
let hod=c.getHours();
let min=c.getMinutes();
let sec=c.getSeconds();

if(min<10)
{
min=`0${min}`; // doplní 0 jako první číslici dvojčíslí
}

if(sec<10)
{
sec=`0${sec}`; // doplní 0 jako první číslici dvojčíslí
}


return [hod,min,sec];
},
tik(){

let h=this.cas(); /* zjistí aktuální čas */
let h_c=`${h[0]}:${h[1]}`; /* celkový čas hodin : hodina + minuta */
let s=h[2].toString(); /* sekundy */
let s1=s[0]; /* první číslice sekund */
let s2=s[1]; /* druhá číslice sekund */

document.getElementById(this.id[0]).innerText=h_c; /* přepíše čas hodin : hodina + minuta  */
document.getElementById(this.id[1]).innerText=s1; /* přepíše první číslici sekund 10 */
document.getElementById(this.id[2]).innerText=s2; /* přepíše druhou číslici sekund 1 */
}};

const hodinyO=Object.create(hodiny); /* hodiny ve Výzvě k obchůzce */
{hodinyO.id=["o-h","o-s1","o-s2"];} /* přepis potřebných hodnot v objektu */


const mail={id_butt:"zob-em",id_inp:"inp-em", m:["..z.","xm@","@a",".c","ri","iu","mls","z","rt","sqhc","eaw"],
posluchac(){
document.getElementById(this.id_butt).addEventListener("click",this); /* přidá buttonu posluchač klik */
},
handleEvent(){
let x=this.m; /* kopie this.m pole  */
let k=x[4][0]+x[2][1]+x[5][1]+x[9][0]+x[0][0]+x[6][0]+x[4][1]+x[9][3]+x[9][2]+x[10][1]+x[6][1]+x[1][2]+x[10][0]+x[6][0]+x[2][1]+x[4][1]+x[6][1]+x[0][1]+x[9][3]+x[0][2]; /* výsek emailu */
const inp=document.getElementById(this.id_inp); /* input pro zobrazení emailu */
const t=document.getElementById(this.id_butt); /* button zobrazit email */
inp.value=k; /* do inputu pro email vloží email */
t.removeEventListener("click",this); /* vypne posluchače buttonu pro zobrazení emailu */
t.disabled=true; /* disablet buttonu */
t.title="Již není možné použít - email zobrazen"; /* změní title buttonu */
}};

const dia={aktivni:"",id:["d-zas","d-obch","d-obchM","d-uspan","d-neni","d-nezastaven","d-oziv","d-kon","d-dotaz-oziv"],zas:["b-z-a","k-d-zas","b-z-n"],obch:["b-obch-a","k-d-obch","b-obch-n"],obchM:["b-obchM-a","k-d-obchM","b-obchM-n"],usp:["k-usp","b-usp-ok"],neni:["k-neni","b-neni-ok"],oziv:["b-nezastaven","b-oziv-ok"],
ozit_dotaz:["b-dotaz-oziv-a","k-d-dotaz-oziv","b-dotaz-oziv-n"], // tlačítka dialogového okna Oživit nočního VLKa: ANO-NE
kont:"but-kon",
handleEvent(e){
const k=e.target.id; /* zjistí id prvku na který bylo kliknuto */

if(k==this.zas[0])
{
/* Kliknuto na ANO - Zastavit Nočního VLKa */
let l1=vlk.id_sec.length; /* délka pole */
for(let i=0;i<l1;i++)
{
/* Zneviditelní sektory Kruhu obchůzek a odpočtu */
document.getElementById(vlk.id_sec[i]).style.display="none";
}
document.getElementById(p_nas.id_blok).style.display="none"; /* Vypne zabrazí v Nastavení možnost úpravy délky intervalu */

document.getElementById(vlk.id_li[0]).style.display="block"; /* zobrazí tlačítko Spustit Nočního VLKa */
document.getElementById(vlk.id_li[1]).style.display="none"; /* schová tlačítko Zastavit Nočního VLKa */

tik.a_odpocet=false; /* proměnná, která funkci tik.tak() ve centrum.js dáva informaci o tom, že odpočet se NEmůže počítat */
hlidac.odpocet=false;  /* proměnná, která funkci hlidac() ve ochrana.js dáva informaci o tom, že odpočet se NEpočítá */
hlidac.DEaktivace(); /* vypne ochranu před uspáním nočního VLKa - v ochrany.js */
uloz.uloz(uloz.klice[9],true); /* uloží na local storage informaci, že byl Noční VLK zastaven - v oživit.js */
dia.off(this.id[0]); /* vypne dialogové okno */
text.pis("Noční&nbsp;VLK byl zastaven");
gong.hraj(false); /* zahraje GONG.mp3 - FALSE = 1x */
poloha.reset(); /* vyresetuje hodnoty polohy v systému obchůzek - v kresly.js */

if(uloz.ok){ // pokud funguje LocalStorage bude return - funkce v oziv.js
g_pos.ozivitOn(); /* aktivuje posluchače událostí a krytí tlačítka na 100% Oživit Nočního VLKa - v centrum.js */
}


kresly.obr=null; /* vymaže z paměti obrázek Tlapky nočního vlka - v kresly.js */
kresly.obr_nacten=false; /* hodnota určuje, že je vymazán z paměti obrázek tlapka Nočního VLKa - v kresly.js */
}
else if(k==this.zas[1]||k==this.zas[2])
{
/* Kliknuto na Křížek anebo Ne - Zastavit Nočního VLKa */
klik.hraj(false); // bude přehrávat zvuk 1x klik 
dia.off(this.id[0]); /* vypne dialogové okno */
}


if(k==this.obch[0])
{
/* Kliknuto na ANO - Provést obchůzku */
dia.off(this.id[1]); /* vypne dialogové okno */
if(osoba.odloz_start!=0)
{
/* pokud se odložený start nebude rovnat nule - bude po první výžvě k obchůzce roven 0 */
osoba.odloz_start=0;
uloz.osoba(); /* uloží na localstorage data z objektu osoba (v pruvodce.js), tato funkce je v ozivit.js */
}
obch.aktivace(); /* aktivuje obchůzku */
}
else if(k==this.obch[1]||k==this.obch[2])
{
/* Kliknuto na Křížek anebo Ne -  Provést obchůzku */
klik.hraj(false); // bude přehrávat zvuk 1x klik 
dia.off(this.id[1]); /* vypne dialogové okno */
}

if(k==this.obchM[0])
{
/* Kliknuto na ANO - Provést obchůzku MAX */
dia.off(this.id[2]); /* vypne dialogové okno */
if(osoba.odloz_start!=0)
{
/* pokud se odložený start nebude rovnat nule - bude po první výžvě k obchůzce roven 0 */
osoba.odloz_start=0;
}
osoba.okruh=11; /* default hodnota - největší obchůzka */
uloz.osoba(); /* uloží na localstorage data z objektu osoba (v pruvodce.js), tato funkce je v ozivit.js */
obch.aktivace(); /* aktivuje obchůzku */
}
else if(k==this.obchM[1]||k==this.obchM[2])
{
/* Kliknuto na Křížek anebo Ne -  Provést obchůzku MAX */
klik.hraj(false); // bude přehrávat zvuk 1x klik 
dia.off(this.id[2]); /* vypne dialogové okno */
}

if(k==this.ozit_dotaz[0])
{
/* Kliknuto na ANO - Oživit Nočního VLKa */
dia.off(this.id[8]); /* vypne dialogové okno */
hlidac.aktivace(); // opětovně aktivuje ochranu před uspáním
zamek.blok(); // aktivuje blokaci zámku obrazovky
window.onbeforeunload=()=>{return 'Chcete zavřít aplikaci Noční VLK?';}; // ochrana před náhodným uzavřením aplikace
uloz.oziv(true); // spustí oživovací procesy Nočního VLKA spuštěné tlačítkem - hodnota TRUE - v ozivit.js
}
else if(k==this.ozit_dotaz[1]||k==this.ozit_dotaz[2])
{
/* Kliknuto na Křížek anebo Ne -  Oživit Nočního VLKa */
klik.hraj(false); // bude přehrávat zvuk 1x klik 
dia.off(this.id[8]); /* vypne dialogové okno */
}

if(k==this.usp[0]||k==this.usp[1])
{
/* Kliknuto na Rozumím anebo Kříž - Aplikace byla uspána  */
hlidac.aktivace(); /* opětovně aktivuje ochranu před uspáním */
zamek.blok(); /* aktivuje blokaci zámku obrazovky */
/* window.onbeforeunload=function(){return 'Chcete zavřít aplikaci Noční VLK?';};  ochrana před náhodným uzavřením aplikace */
uzamceni.jednou(); /* pokud bude aktivní zámek obrazovky - zobrazí, že je aplikace uzamčena */
klik.hraj(false); // bude přehrávat zvuk 1x klik 
dia.off(this.id[3]); /* vypne dialogové okno */
}

if(k==this.neni[0]||k==this.neni[1])
{
/* Kliknuto na Rozumím anebo Kříž - Funkce není naprogramovaná  */
klik.hraj(false); // bude přehrávat zvuk 1x klik 
dia.off(this.id[4]); /* vypne dialogové okno */
}

if(k==this.oziv[0])
{
/* Kliknuto na Rozumím - Noční VLK nebyl zastaven  */
klik.hraj(false); // bude přehrávat zvuk 1x klik 
dia.off(this.id[5]); // vypne dialogové okno
dia.on(this.id[6]); // zapne dialogové okno - Obnovení Nočního VLKa
}

if(k==this.oziv[1])
{
/* Kliknuto na Obnovit - OŽIVENÍ NOČNÍHO VLKA  */
zamek.blok(); /* aktivuje blokaci zámku obrazovky */
window.onbeforeunload=()=>{return 'Chcete zavřít aplikaci Noční VLK?';}; /* ochrana před náhodným uzavřením aplikace */
vlk.ozivit(); /* spustí oživovací procesy Nočního VLKA - ve vlk.js */
hlidac.aktivace(); /* opětovně aktivuje ochranu před uspáním */
zvuk.zaloz(); // založí audio mp3 v globálním objektu windows, pokud nebyly již založeny (ve vlk.js)
dia.off(this.id[6]); /* vypne dialogové okno */
}

if(k==this.kont)
{
/* Zavřít kontakt na programátora */
klik.hraj(false); // bude přehrávat zvuk 1x klik 
dia.off(this.id[7]); /* vypne dialogové okno */
}
},
posON(id){
// posluchače k tlačítkům Dialogových oken

if(id==this.id[0])
{
/* tlačítka dotazu: Zastavit Nočního VLKa */
let l1=this.zas.length; /* délka řetězce */
for(let i=0;i<l1;i++)
{
document.getElementById(this.zas[i]).addEventListener("click",this);
}}

if(id==this.id[1])
{
/* tlačítka dotazu: Provést obchůzku teď ? */
let l2=this.obch.length;
for(let i=0;i<l2;i++)
{
document.getElementById(this.obch[i]).addEventListener("click",this);
}}

if(id==this.id[2])
{
/* tlačítka dotazu: Provést obchůzku MAX ? */
let l3=this.obchM.length;
for(let i=0;i<l3;i++)
{
document.getElementById(this.obchM[i]).addEventListener("click",this);
}}

if(id==this.id[3])
{
/* tlačítka upozornění : Aplikace byla uspána */
let l4=this.usp.length;
for(let i=0;i<l4;i++)
{
document.getElementById(this.usp[i]).addEventListener("click",this);
}}

if(id==this.id[4])
{
/* tlačítka upozornění : Funkce není naprogramovaná */
let l5=this.neni.length;
for(let i=0;i<l5;i++)
{
document.getElementById(this.neni[i]).addEventListener("click",this);
}}

if(id==this.id[5])
{
// tlačítko Noční VLK nebyl zastaven
// důvodem tohoto dialogového okna je hlavně zvýšení interakce uživatele s aplikací po oživení obnovením okna aplikace
document.getElementById(this.oziv[0]).addEventListener("click",this);
}

if(id==this.id[6])
{
/* tlačítko Noční VLK bude oživen */
document.getElementById(this.oziv[1]).addEventListener("click",this);
}

if(id==this.id[7])
{
/* tlačítko Kontak na programátora */
mail.posluchac(); /* aktivuje posluchač emailu */
klik.hraj(false); // bude přehrávat zvuk 1x klik 
setTimeout("document.getElementById('nad-kon').scrollIntoView({behavior:'smooth'});",250); /* scrool k nadpisu */
document.getElementById(this.kont).addEventListener("click",this); /* aktivuje posluchač k buttonu v dia oknu Zavřít kontakt */
}

if(id==this.id[8])
{
/* Dialogové okna s dotazem Oživit Nočního VLKa? ANO-NE */
let l6=this.ozit_dotaz.length;
for(let i=0;i<l6;i++)
{
document.getElementById(this.ozit_dotaz[i]).addEventListener("click",this); // přidání posluchačů událostí k dotazu dialogového okna
}}


},
posOFF(id){
// odebírání posluchačů událostí k Dialogovým oknům


if(id==this.id[0])
{
/* tlačítka dotazu: Zastavit Nočního VLKa */
let l1=this.zas.length;
for(let i=0;i<l1;i++)
{
document.getElementById(this.zas[i]).removeEventListener("click",this);
}}

if(id==this.id[1])
{
/* tlačítka dotazu: Provést obchůzku teď? */
let l2=this.obch.length;
for(let i=0;i<l2;i++)
{
document.getElementById(this.obch[i]).removeEventListener("click",this);
}}

if(id==this.id[2])
{
/* tlačítka dotazu: Provést MAX obchůzku */
let l3=this.obchM.length;
for(let i=0;i<l3;i++)
{
document.getElementById(this.obchM[i]).removeEventListener("click",this);
}}

if(id==this.id[3])
{
/* tlačítka upozornění : Aplikace byla uspána */
let l4=this.usp.length;
for(let i=0;i<l4;i++)
{
document.getElementById(this.usp[i]).removeEventListener("click",this);
}}

if(id==this.id[4])
{
/* tlačítka upozornění : Funkce není naprogramovaná */
let l5=this.oziv.length;
for(let i=0;i<l5;i++)
{
document.getElementById(this.oziv[i]).removeEventListener("click",this);
}}

if(id==this.id[5])
{
/* tlačítko Noční VLK nebyl zastaven */
document.getElementById(this.oziv[0]).removeEventListener("click",this);
}

if(id==this.id[6])
{
/* tlačítko Noční VLK bude oživen */
document.getElementById(this.oziv[1]).removeEventListener("click",this);
}

if(id==this.id[7])
{
/* tlačítka Kontak  */
document.getElementById(this.kont).removeEventListener("click",this);
}

if(id==this.id[8])
{
/* Dialogové okna s dotazem Oživit Nočního VLKa? ANO-NE */
let l6=this.ozit_dotaz.length;
for(let i=0;i<l6;i++)
{
document.getElementById(this.ozit_dotaz[i]).removeEventListener("click",this); // odebrání posluchačů událostí k dotazu dialogového okna
}}

},
on(id){
/* otevření dialogového okna */

const okno=document.getElementById(id);

this.posON(id); /* zapne posluchače k dialogovému oknu */

okno.showModal(); /* otevře dialogové okno */

this.aktivni=id; /* zapíše do proměnné, aktivní dialogové okno */

},
off(id){
/* zavření dialogového okna */
const okno=document.getElementById(id);
dia.posOFF(id); /* vypne posluchače událostí k Dialogovému oknu */
okno.close(); /* zavře dialogové okno */
this.aktivni=""; /* vynuluje proměnnou, která udává aktivní dialogové okno */
},
vyp_akt(){
/* funkce vypne právě aktivní dialogové okno */

if(this.aktivni!="")
{
/* pokud bude aktivní dialogové okno - zavře se! */
const okno=document.getElementById(this.aktivni); /* načte, které dialogové okno je aktivní */
okno.close(); /* zavře dialogové okno */
this.aktivni=""; /* vynuluje proměnnou */
}

}};

const text={kon:"i-box",box_an:"i-an",p_id:"i-text",aktivni:false,TIME:4500,

pis(zobrazit_text){
/* funkce vytvoří text přes celou obrazovku s informací */
this.aktivni=true; /* informuje Visulawievport API o aktivaci okna */
v_port.handleEvent(); /* aktivuje úpravu okna VisualViewport API v centrum.js */
document.getElementById(this.kon).style.display="block"; /* zviditelní kontajner */
document.getElementById(this.kon).style.opacity=1; /* zviditelní kontajner */
document.getElementById(this.box_an).style.animationPlayState="running"; /* spustí animaci */
document.getElementById(this.p_id).innerHTML=zobrazit_text; /* zapíše zaslaný text do bloku */
setTimeout(this.off.bind(this),this.TIME); /* ukončí animaci */
},
off(){
/* funkce ukončí text přes celou obrazovku s informací */
const o=document.getElementById(this.box_an);
o.style.animationPlayState="paused"; /* pauzne animaci */
o.style.transform="scale(1.25)"; /* nastaví default hodnoty, které změnila animace */
o.style.opacity=0; /* nastaví default hodnoty, které změnila animace */
document.getElementById(this.kon).style.display="none"; /* schová kontajner */
this.aktivni=false;  /* informuje Visulawievport API o DEaktivaci okna */
}};

const obrazovka={max:1024,min_vyska:530,min_sirka:260,a_sirka:320,cool:800,id_kotva:"hl-kon",id_kotva2:"k-h",TIME:200,vyska:null,sirka:null,d_vyska:null,d_sirka:null,top:null,left:null,

velikost(){
this.vyska=window.screen.height; /* výška obrazovky */
this.sirka=window.screen.width; /* šířka obrazovky */
this.d_vyska=window.screen.availHeight; /* Dostupná výška obrazovky */
this.d_sirka=window.screen.availWidth; /* Dostupná šířka obrazovky */
this.top=window.screen.availTop; /* Dostupné horní umístění na obrazovce */
this.left=window.screen.availLeft; /* Dostupné levé umístění na obrazovce */
},

zmen(jak){
// funkce zajišťuje změnu polohy aplikace

klik.hraj(false); // bude přehrávat zvuk 1x klik
let [Nleft,Ntop,Nsirka,Nvyska,kotva]=[this.top,this.left,this.min_sirka,this.min_vyska,this.id_kotva];

if(jak=="vl")
{
Nleft=this.left;
Ntop=this.top;
Nsirka=this.a_sirka;
Nvyska=this.d_vyska;
}
else if(jak=="vlm")
{
Nleft=this.left;
Ntop=this.top;
Nsirka=this.min_sirka;
Nvyska=this.d_vyska;
}
else if(jak=="min")
{
Nleft=0;
Ntop=0;
Nsirka=this.min_sirka;
Nvyska=this.min_vyska;
kotva=this.id_kotva2;
}
else if(jak=="cool")
{
if(this.cool<this.d_vyska)
{
Nleft=(this.d_sirka-this.cool)/2;
Ntop=(this.d_vyska-this.cool)/2;
Nsirka=this.cool;
Nvyska=this.cool;
}
else
{
Nleft=(this.d_sirka-this.cool)/2;
Ntop=this.top;
Nsirka=this.cool;
Nvyska=this.d_vyska;
}}
else if(jak=="cel")
{
Nleft=this.left;
Ntop=this.top;
Nsirka=this.d_sirka;
Nvyska=this.d_vyska;
}
else if(jak=="pln")
{
document.documentElement.requestFullscreen();
setTimeout(`document.getElementById("${kotva}").scrollIntoView({behavior:"smooth"});`,this.TIME);
return;
}
else if(jak=="vpm")
{
Nleft=this.d_sirka-this.min_sirka;
Ntop=this.top;
Nsirka=this.min_sirka;
Nvyska=this.d_vyska;
}
else if(jak=="vp")
{
Nleft=this.d_sirka-this.a_sirka;
Ntop=this.top;
Nsirka=this.a_sirka;
Nvyska=this.d_vyska;
}
window.resizeTo(Nsirka,Nvyska);
window.moveTo(Nleft,Ntop);
setTimeout(`document.getElementById("${kotva}").scrollIntoView({behavior:"smooth"});`,this.TIME);
}};

/* změna jasu aplikace */
const jas={id_zmen:"telo",min:20,
zmen(id){
klik.hraj(false); // bude přehrávat zvuk 1x klik 
let hodnota=parseInt(document.getElementById(id).value);
if(hodnota<this.min){hodnota=this.min;}
document.getElementById(this.id_zmen).style.filter=`brightness(${hodnota}%)`; /* změna jasu hlavního kontajneru */
let l1=dia.id.length;
for(let i=0;i<l1;i++)
{
document.getElementById(dia.id[i]).style.filter=`brightness(${hodnota}%)`; /* změna jasu dialogových oken */
}}}; /* KONEC změna jasu aplikace */

const p_nas={id_blok:"n-i-blok",id:"nastaveni",id_nas:["k-nas","in-plus1-n","in-minus1-n","bns1","bns2","bns3","bns4","bns5","bns6","vlk_z"],id_SVG:["in-plus2-n","in-minus2-n","s-nas"],id_level:"i-l-n",id_in:["i-15-n","i-30-n","i-60-n","i-120-n"],id_in_r:["ir-15-n","ir-30-n","ir-60-n","ir-120-n"],id_cast:["int-15-n","int-30-n","int-60-n","int-120-n"], /* posluchače událostí pro nastavení */

a(){
this.On(); /* aktivuje posluchače */
zvuk.barvy(); /* obarví tlačítka Volba zvuku alarmu Noční VLK - podle toho jaký je zvolený - ve vlk.js */
},
On(){
let l1=this.id_nas.length;
for(let i=0;i<l1;i++)
{
document.getElementById(this.id_nas[i]).addEventListener("click",this);
}
},

Off(){
// vypne posluchače k sekci Nastavení
let l1=this.id_nas.length;
for(let i=0;i<l1;i++)
{
document.getElementById(this.id_nas[i]).removeEventListener("click",this);
}},
handleEvent(e){
const k=e.target.id; /* zjistí ID prvku na který bylo kliknuto */

if(k==this.id_nas[0]||k==this.id_SVG[2])
{
// kliknuti na Křížek - zavřít Nastavení
klik.hraj(false); // bude přehrávat zvuk 1x klik 
hl_kon.otevri(this.id);
this.Off();
v_port.other=false; /* vypne VisualViewport API pro Nastavení */
}
else if(k==this.id_nas[1]||k==this.id_SVG[0])
{
klik.hraj(false); // bude přehrávat zvuk 1x klik 
pruvodce.inter("plus"); // zvýší interval do obchůzky - průvodce.js
uloz.osoba(); /* uloží na localstorage data z objektu osoba (v pruvodce.js), tato funkce je v ozivit.js */
}
else if(k==this.id_nas[2]||k==this.id_SVG[1])
{
klik.hraj(false); // bude přehrávat zvuk 1x klik 
pruvodce.inter("minus"); // sníží interval do bchůzky
uloz.osoba(); /* uloží na localstorage data z objektu osoba (v pruvodce.js), tato funkce je v ozivit.js */
}
else if(k==this.id_nas[3])
{
/* klik - volba zvuk alarmu Noční VLK - 1 */
zvuk.volba(0); /* změna zvuku na zvuk 1 - ve vlk.js  */
}
else if(k==this.id_nas[4])
{
/* klik - volba zvuk alarmu Noční VLK - 2 */
zvuk.volba(1); /* změna zvuku na zvuk 1 - ve vlk.js  */
}
else if(k==this.id_nas[5])
{
/* klik - volba zvuk alarmu Noční VLK - 3 */
zvuk.volba(2);
}
else if(k==this.id_nas[6])
{
/* klik - volba zvuk alarmu Noční VLK - 4 */
zvuk.volba(3);
}
else if(k==this.id_nas[7])
{
/* klik - volba zvuk alarmu Noční VLK - 5 */
zvuk.volba(4);
}
else if(k==this.id_nas[8])
{
/* klik - volba zvuk alarmu Noční VLK - 6 */
zvuk.volba(5);
}
else if(k==this.id_nas[9])
{
/* klik - Zesilovat zvuk alarmu Nočního VLKa */
klik.hraj(false); // bude přehrávat zvuk 1x klik 
if(document.getElementById(this.id_nas[9]).checked==true)
{
/* pokud bude Zašktnuto pole */
zvuk.zesilovat=true; /* nastaví proměnnou na postupné zesilování - ve vlk.js */
uloz.uloz(uloz.klice[11],"true"); /* uloží volbu zvuku uživatele na LocalStorage - v ozivit.js */
}
else if(document.getElementById(this.id_nas[9]).checked==false)
{
/* pokud NEbude Zašktnuto pole */
zvuk.zesilovat=false; /* nastaví proměnnou na Zakázat postupné zesilování - ve vlk.js */
uloz.uloz(uloz.klice[11],"false"); /* uloží volbu zvuku uživatele na LocalStorage - v ozivit.js */
}
}
}};

 /* Objekt pro tlačítko Obchůzky */
const p_ob={id:"obchuzky",id_ob:["k-ob"],id_but:"ob-obch",id_svg:["s-ob"],
On(){
let l1=this.id_ob.length;
for(let i=0;i<l1;i++)
{
document.getElementById(this.id_ob[i]).addEventListener("click",this);
}

if(!uloz.ok){return;} // pokud nefunguje LocalStorage bude return - funkce v oziv.js

document.getElementById(this.id_but).addEventListener("click",this); /* posluchač k button Obnovit obchůzky uložené aplikací */
let l2=obch.id_f.length;
for(let i=0;i<l2;i++)
{
/* posluchače událostí k formulářům obchůzky 15,30,60,120 */
document.getElementById(obch.id_f[i]).addEventListener("input",this);
}
},

Off(){
let l3=this.id_ob.length;
for(let i=0;i<l3;i++)
{
document.getElementById(this.id_ob[i]).removeEventListener("click",this);
}


if(!uloz.ok){return;} // pokud nefunguje LocalStorage bude return - funkce v oziv.js

document.getElementById(this.id_but).removeEventListener("click",this); /* posluchač k button Obnovit obchůzky uložené aplikací */

let l4=obch.id_f.length;
for(let i=0;i<l4;i++)
{
/* odebrání posluchače událostí k formulářům obchůzky 15,30,60,120 */
document.getElementById(obch.id_f[i]).removeEventListener("input",this);
}
},
handleEvent(e){
const k=e.target.id; /* zjistí ID prvku na který bylo kliknuto */

if(k==this.id_ob[0]||k==this.id_svg[0])
{
/* kliknuti na Křížek - Zvařít Sekci Obchůzky */
klik.hraj(false); // bude přehrávat zvuk 1x klik 
hl_kon.otevri(this.id); // zavře sekci Obchůzky a otevře hlavní kontejner aplikace
this.Off(); // vypne posluchače událostí pro sekci Obchůzky
document.getElementById(this.id_but).style.opacity=0.5; /* tlačítko Obnovit obchůzky bude 50% krytí */
document.getElementById(this.id_but).disabled=true; /* zablokuje tlačítko Obnovit obchůzky */
v_port.other=false; /* vypne VisualViewport API */
}


if(k==this.id_but)
{
/* kliknuti na Obnovit obchůzky uložené aplikací */

let test=this.kon(); /* kontrola, jestli data ve formulářích jsou stejná jako data uložená na localstorage */
if(test==false)
{
/* pokud jsou data stehná anebo není funkční localstorage -  ukončí funkci */
return;
}
else
{

const f15=document.getElementById(obch.id_f[0]); /* načte objekt formuláře */
const f30=document.getElementById(obch.id_f[1]);
const f60=document.getElementById(obch.id_f[2]);
const f120=document.getElementById(obch.id_f[3]);

let ud15=uloz.nacti(uloz.klice[4]); /* načte z local storage data obchůzek do 15minut - v oziv.js */
let ud30=uloz.nacti(uloz.klice[5]); /* načte z local storage data obchůzek do 30minut - v oziv.js */
let ud60=uloz.nacti(uloz.klice[6]);
let ud120=uloz.nacti(uloz.klice[7]);


f15.value=ud15; /* přepíše data ve formuláři za uložená */
f30.value=ud30;
f60.value=ud60;
f120.value=ud120;

text.pis("Obchůzky byly obnoveny");
gong.hraj(false); /* zahraje GONG.mp3 - FALSE = 1x vw vlk.js */
}
this.kon(); /* kontrola, jestli data ve formulářích jsou stejná jako data uložená na localstorage */
}

if(k==obch.id_f[0]||k==obch.id_f[1]||k==obch.id_f[2]||k==obch.id_f[3])
{
/* pokud dojde k interakci formuláře a uživatele */
setTimeout(this.kon.bind(this),250); /* Provede kontrolu změny ve formulářích -  zpoždění musí být */
}

},

kon(){
/* kontrola, jestli data ve formulářích jsou stejná jako data uložená na localstorage */

if(!uloz.ok){ // pokud uživateli nefunguje LocalStorage

document.getElementById(this.id_but).style.opacity=0.5; /* tlačítko Obnovit obchůzky bude 50% */
document.getElementById(this.id_but).disabled=true; /* zablokuje tlačítko Obnovit obchůzky */
return false; /* pokud pro zařízení nebude možné použití local storage - provede return */

}


const df15=document.getElementById(obch.id_f[0]).value; /* načte data z formuláře obchůzky do 15minut - pole obch.id_f je v vlk.js */
const df30=document.getElementById(obch.id_f[1]).value;
const df60=document.getElementById(obch.id_f[2]).value;
const df120=document.getElementById(obch.id_f[3]).value;

let ud15=uloz.nacti(uloz.klice[4]); /* načte z local storage data obchůzek do 15minut - v oziv.js */
let ud30=uloz.nacti(uloz.klice[5]); /* načte z local storage data obchůzek do 30minut - v oziv.js */
let ud60=uloz.nacti(uloz.klice[6]);
let ud120=uloz.nacti(uloz.klice[7]);

if(ud15==""&&ud30==""&&ud60==""&&ud120=="")
{
/* pokud budou veškeré uložené obchůzky prázdné anebo nebudou žádné uložené obchůzky */
document.getElementById(this.id_but).style.opacity=0.5; /* tlačítko Obnovit obchůzky bude 50% */
document.getElementById(this.id_but).disabled=true; /* zablokuje tlačítko Obnovit obchůzky */
return false;
}

if(df15!=ud15||df30!=ud30||df60!=ud60||df120!=ud120)
{
/* pokud se nějáké data nebudou shodovat */
document.getElementById(this.id_but).style.opacity=1; /* tlačítko Obnovit obchůzky bude mít plné krytí */
document.getElementById(this.id_but).disabled=false; /* odblokuje tlačítko Obnovit obchůzky */
return true;
}
else
{
document.getElementById(this.id_but).style.opacity=0.5; /* tlačítko Obnovit obchůzky bude 50% */
document.getElementById(this.id_but).disabled=true; /* zablokuje tlačítko Obnovit obchůzky */
return false;
}},
a(){
this.kon(); /* kontrola, jestli data ve formulářích jsou stejná jako data uložená na localstorage */
this.On(); /* aktivuje posluchače událostí */
}};

const uzamceni={id:"zamek",aktivni:false,TIME:5000,casovac:null,
a(){
// aktivace zámku obrazovky
this.aktivni=true; // proměnná určuje, že zámek obrazovky je aktivován
hl_kon.zavri(uzamceni.id,"flex",uzamceni.id); /* zavře hlavní kontajner a otevře zámek obrazovky */
v_port.handleEvent(); /* provede nový propočet velikosti okna */
this.zhasni();  /* nechá pouze tmavou obrazovku */
this.pON(); /* aktivuje posluchače událostí */
},
pON(){
// zapnutí posluchačů událostí pro zámek obrazovky
const o=document.getElementById(this.id); /* div zámku obrazovky */
o.addEventListener("click",uzamceni.jednou);
o.addEventListener("mousemove",uzamceni.jednou);
o.addEventListener("dblclick",this);
},
oOFF(){
// vypnutí posluchačů pro události zámku obrazovky
const o=document.getElementById(this.id); /* div zámku obrazovky */
o.removeEventListener("click",uzamceni.jednou);
o.removeEventListener("mousemove",uzamceni.jednou);
o.removeEventListener("dblclick",this);
this.aktivni=false;
},
handleEvent(){
// kliknuto na obrazovku Aplikace je uzamčena DABL-klikem
klik.hraj(false); // bude přehrávat zvuk 1x klik 
clearTimeout(this.casovac); // vynuluje časovač
document.getElementById(this.id).style.opacity=1; /* nechá krytí na 100% */
hl_kon.otevri(this.id); /* zruší zámek a otevře hlavní kontajner */
this.oOFF(); // odebere posluchače
},
zhasni(){
clearTimeout(this.casovac);
this.casovac=setTimeout(`document.getElementById("${this.id}").style.opacity=0;`,this.TIME);  /* nechá pouze tmavou obrazovku */
},
jednou(){
if(document.getElementById(this.id).style.display!="flex")
{
return; /* pokud nebude zámek obrazovky na obrazovce, bude return */
}
document.getElementById(this.id).style.opacity=1;
uzamceni.zhasni();
}};

const g_pos={obj:[["spustit","spustit-svg"],["vl","vlm","min","cool","cel","pln","vpm","vp"],["ovl-zvuk","ovl-jas"],["but-nas","nas-svg"],["but-ob","ob-svg"],["but-oz","oz-svg"]],neni:["navod","funkce","o-aplikaci","m","pl","k","pr"],zam:["zam","zam-svg"],min:["m","m-svg","m-p"],pla:["pl","pl-svg","pl-p"],kon:["k","k-svg","k-p"],pre:["pr","pr-svg","pr-p"], /* obj = "id objektu na kterém bude aktivován posluchač události:["ID prvku","ID SVG v prvku"] " */
ozivitOn(){
/* aktivace posluchče Oživit Nočního VLKA */
document.getElementById(this.obj[5][0]).addEventListener("click",this); /* posluchač pro Oživit */
document.getElementById(this.obj[5][0]).style.opacity=1; /* zvýší krytí na 100% */
},

ozivitOff(){
/* Deaktivace posluchče Oživit Nočního VLKA */
document.getElementById(this.obj[5][0]).removeEventListener("click",this); /* posluchač pro Oživit */
document.getElementById(this.obj[5][0]).style.opacity=0.5; /* sníží krytí na 50% */
},
aktivace(){
/* aktivuje všechny posluchače události hlavního kontajneru */

document.getElementById(this.obj[0][0]).addEventListener("click",this); /* posluchač pro Spustit */

let l1=this.obj[1].length;
for(let i=0;i<l1;i++)
{
document.getElementById(this.obj[1][i]).addEventListener("click",this); /* posluchače pro polohu Aplikace */
}
let l2=this.obj[2].length;
for(let i=0;i<l2;i++)
{
document.getElementById(this.obj[2][i]).addEventListener("change",this); /* posluchač pro ovládání zvuku a ovládání jasu */
}


document.getElementById(this.obj[3][0]).addEventListener("click",this); /* posluchač pro Nastavení */

document.getElementById(this.obj[4][0]).addEventListener("click",this); /* posluchač pro Obchůzky */

document.getElementById(this.zam[0]).addEventListener("click",this); /* posluchač pro Zámek obrazovky */

let l3=this.neni.length;
for(let i=0;i<l3;i++)
{
document.getElementById(this.neni[i]).addEventListener("click",this); /* posluchače pro funkce, které zatím NEBYLY NAPROGRAMOVANÉ */
}

},
handleEvent(e){
const k=e.target.id; /* zjistí ID prvku na který bylo kliknuto */

if(k==this.obj[0][0]||k==this.obj[0][1]) /* pokud se ID prvku anebo ID SVG prvku rovná */
{
/* Kliknuto na Spustit Nočního VLKA */
pruvodce.a(); /* funkce, která má být kliknutím spuštěna - v pruvodce.js */
}

if(k==this.obj[5][0]||k==this.obj[5][1]) /* pokud se ID prvku anebo ID SVG prvku rovná */
{
/* Kliknuto na Oživit Nočního VLKA na hlavním kontajneru */
klik.hraj(false); // bude přehrávat zvuk 1x klik
dia.on(dia.id[8]); // zapne dialogové okno - S dotazem, zda chce uživatel Obnovení Nočního VLKa
}


if(k==this.obj[1][0])
{
obrazovka.zmen(this.obj[1][0]);
}

if(k==this.obj[1][1])
{
obrazovka.zmen(this.obj[1][1]);
}

if(k==this.obj[1][2])
{
obrazovka.zmen(this.obj[1][2]);
}

if(k==this.obj[1][3])
{
obrazovka.zmen(this.obj[1][3]);
}

if(k==this.obj[1][4])
{
obrazovka.zmen(this.obj[1][4]);
}

if(k==this.obj[1][5])
{
obrazovka.zmen(this.obj[1][5]);
}

if(k==this.obj[1][6])
{
obrazovka.zmen(this.obj[1][6]);
}

if(k==this.obj[1][7])
{
obrazovka.zmen(this.obj[1][7]);
}

if(k==this.obj[2][1])
{
jas.zmen(this.obj[2][1]);
}

if(k==this.obj[2][0])
{
// kliknuto na změnu hlasitosti
zvuk.zastav(); // zastaví zvuk, pokud by byl přehráván - ve vlk.js
zvuk.zmen(this.obj[2][0]); // změní hlasitost zvuku alarmu - ve vlk.js
pinkani.zmen(this.obj[2][0]); // změní hlasitost pinkání pro hlídání uspání aplikace - ve vlk.js
gong.zmen(this.obj[2][0]); // změní hlasitost zvuku gong - ve vlk.js
zvuk.hraj(false); // přehraje zvuk alarmu 1x - ve vlk.js
}

/* pro tlačítko Nastavení */
if(k==this.obj[3][0]||k==this.obj[3][1]) /* pokud se ID prvku anebo ID SVG prvku rovná */
{
klik.hraj(false); // bude přehrávat zvuk 1x klik 
p_nas.a();  /* spustí potřební procesy a posluchače */
hl_kon.zavri(p_nas.id,"flex",p_nas.id);
v_port.other=true; /* aktivuje VisualViewport API */
v_port.handleEvent(); /* provede nový propočet velikosti okna */
}

/* pro tlačítko Obchůzky */
if(k==this.obj[4][0]||k==this.obj[4][1]) /* pokud se ID prvku anebo ID SVG prvku rovná */
{
klik.hraj(false); // bude přehrávat zvuk 1x klik
p_ob.a(); /* spustí potřební procesy a posluchače */
hl_kon.zavri(p_ob.id,"flex",p_ob.id);
v_port.other=true; /* aktivuje VisualViewport API */
v_port.handleEvent(); /* provede nový propočet velikosti okna */
}


if(k==this.zam[0]||k==this.zam[1])
{
klik.hraj(false); // bude přehrávat zvuk 1x klik 
/* KLIKNUTÍ ZÁMEK OBRAZOVKY */
uzamceni.a(); /* aktivuje potřebné funkce pro Zámek obrazovky */
}

if(k==this.neni[0]||k==this.neni[1]||k==this.neni[2]||k==this.min[0]||k==this.min[1]||k==this.min[2]||k==this.pla[0]||k==this.pla[1]||k==this.pla[2]||k==this.kon[0]||k==this.kon[1]||k==this.kon[2]||k==this.pre[0]||k==this.pre[1]||k==this.pre[2])
{
/* KLIKNUTÍ PRO NENAPROGRAMOVANÉ FUNKCE */
klik.hraj(false); // bude přehrávat zvuk 1x klik
dia.on(dia.id[4]); /* v centrum.js */
}
}};

const v_port={id_o:"uz-obchuzka",id_t:"uz-i-box",id:["spust1","spust2","spust3","spust4","spust5"],id_other:["nastaveni","obchuzky"],other:false,pruvodce:false,

handleEvent(){

// document.body.style.minWidth=parseInt(window.screen.availWidth)+"px"; přepsání hodnoty šířky, dostupnou šířkou zařízení, pomůže lepšímu přepočtu šířky visualViewport 
// document.body.style.minHeight=parseInt(window.screen.availHeight)+"px"; přepsání hodnoty výšky, dostupnou výšky zařízení, pomůže lepšímu přepočtu výšky visualViewport

document.getElementById(hl_kon.id_kon).style.minHeight=parseInt(window.screen.availHeight)+"px";  // přepsání hodnoty výšky, dostupnou výšky zařízení, pomůže lepšímu přepočtu výšky visualViewport

let v=parseInt(window.visualViewport.height); /* výška visualViewport */
// let s=parseInt(window.visualViewport.width); šířka visualViewport 

// document.body.style.minWidth=`${s}px`;
// document.body.style.minHeight=`${v}px`;

document.getElementById(hl_kon.id_kon).style.minHeight=`${v}px`; // hlavní kontejner

if(tik.a_obchuzka)
{
/* pro výzvu k obchůzce */
// document.getElementById(this.id_o).width=`${s}px`;
// document.getElementById(this.id_o).style.minWidth=`${s}px`;
document.getElementById(this.id_o).style.height=`${v}px`;
document.getElementById(this.id_o).style.minHeight=`${v}px`;
}


if(text.aktivni)
{
/* pro animaci TEXT přes celou obrazovku */
// document.getElementById(this.id_t).width=`${s}px`;
// document.getElementById(this.id_t).style.minWidth=`${s}px`;
document.getElementById(this.id_t).style.height=`${v}px`;
document.getElementById(this.id_t).style.minHeight=`${v}px`; 
}

if(this.pruvodce) /* pokud je průvodce zapnut aktivuje se změna velikosti okna pomocí visualViewport API */
{
let l1=this.id.length;
for(let i=0;i<l1;i++)
{
// document.getElementById(this.id[i]).style.width=`${s}px`;
document.getElementById(this.id[i]).style.height=`${v}px`;
document.getElementById(this.id[i]).style.minHeight=`${v}px`;
}}

if(this.other) /* pokud je zapnuto okno Nastavení, Obchůzky, Minutka, Plánovač ...  aktivuje se změna velikosti okna pomocí visualViewport API */
{
let l2=this.id_other.length;
for(let i=0;i<l2;i++)
{
// document.getElementById(this.id_other[i]).style.width=`${s}px`;
// document.getElementById(this.id_other[i]).style.height=`${v}px`;
document.getElementById(this.id_other[i]).style.minHeight=`${v}px`; // stačí použe minimální výška !!!!
}}

if(uzamceni.aktivni) /* pokud je zámek obrazovky zapnut aktivuje se změna velikosti okna pomocí visualViewport API */
{
// document.getElementById(uzamceni.id).style.width=`${s}px`;
document.getElementById(uzamceni.id).style.height=`${v}px`;
document.getElementById(uzamceni.id).style.minHeight=`${v}px`;
}

},

aktivace(){
/* Posluchače */
window.visualViewport.addEventListener("resize",this);
window.visualViewport.addEventListener("scroll",this);
addEventListener("scroll",this);
},

zahajit(){
if(window&&window.visualViewport) /* test - zda je visualViewport podporováno */
{
this.aktivace();
this.handleEvent();
setTimeout(this.handleEvent.bind(this),500); // aktivuje Visual View port API - pro pomalejší zařízení za 500ms
setTimeout(this.handleEvent.bind(this),1000); // aktivuje Visual View port API - pro ještě pomalejší zařízení za 1000ms
}}};

const hl_kon={
id_kon:"hl-kon", // id hlavního kontajneru
display_con:"flex", // css vlastnost display
id_kotva:"hlavicka", // id kotvy kam bude scroll top
TIME1:100, // časová prodleva 1
TIME2:150, // časová prodleva 2
f_id_cisti:["obch15","obch30","obch60","obch120"], // pole obsahuje id formulářů s obchůzkami
 /* OBJEKT OVLÁDÁ ZAVÍRÁNÍ A OTVÍRÁNÍ HL. KONTAJNERU */

cisti_form(){
/* funcke vyčistí formuláře s obchůzkami podle ID v poly, tak aby tam nezůstaly případná nežádoucí data */
let l1=this.f_id_cisti.lenght; // délka pole
for(let i=0;i<l1;i++)
{
document.getElementById(this.f_id_cisti[i]).value=""; // nastavení prázdné hodnoty
}
},

zavri(IDnew,typ,id_scroll){
/* funkce zavře hlavní kontejder a otevře požadovanou sekci, (id-sekce,typ nastavení display CSS, nepovynný id prvku na který má po otevření nového okna proběhnout scroll) */
document.getElementById(this.id_kon).style.zIndex=-1; // nastaví hlavní kontajner na z-index=-1, což nedovolí klikat na prvnky - není třeba vypínat posluchče, aby nedošlo k více kliknutím
document.getElementById(this.id_kon).style.opacity=0; // nastaví opacity hlavního kontajneru na 0
document.getElementById(this.id_kon).style.display="none"; // nastaví hlavní kontejner na display=0

setTimeout(()=>{
document.getElementById(IDnew).style.display=typ; // nastaví display nového okna, které nahradí hlavní kontajner
document.getElementById(IDnew).style.zIndex=0; // nastaví z-index nového okna, které nahradí hlavní kontajner
},this.TIME1); // zpoždění musí být vyšší než nastavení display=none na hlavním kontajneru, jinak dojde k nepříjemnému poskočení okna a neprojeví se transmition

setTimeout(()=>{
document.getElementById(IDnew).style.opacity=1; //  // nastaví opacity nového okna, které nahradí hlavní kontajner
if(id_scroll)
{
document.getElementById(id_scroll).scrollIntoView({behavior:"smooth"});  // provede scroll na určený prvek, pokud byl určen, tento scroll musí být o něco později než nastavení kontajneru prvku na display=typ, jinak není možné prvek na stránce zachytit, protože doposud se tam nenachází
}
},this.TIME2); // zpoždění musí být oněco vyšší než display=typ, jinak nemůže správně JS manipulovat s prvky, protože se nestihnou vytvořit
},

otevri(ID_old){
/* funkce zavře okno jiného kontejneru a otevře hlavní kontejder */
document.getElementById(ID_old).style.zIndex=-1; // nastaví z-index kontajneru, který má byýt uzavřen na -1, což nedovolí klikat na prvnky - není třeba vypínat posluchče, aby nedošlo k více kliku
document.getElementById(ID_old).style.opacity=0; // nastaví opacity kontajneru, který se má uzavřít na 0
document.getElementById(ID_old).style.display="none"; // nastaví displey=none kontajneru, který se má uzavřít

setTimeout(()=>{
document.getElementById(this.id_kon).style.display=this.display_con; // nastaví display hlavního kontajneru
document.getElementById(this.id_kon).style.zIndex=0; // nastaví z-index hlavního kontajneru
},this.TIME1); // zpoždění musí být vyšší než nastavení display=none na kontajneru, jinak dojde k nepříjemnému poskočení okna a neprojeví se transmition

setTimeout(()=>{
document.getElementById(this.id_kon).style.opacity=1; // opacity=1 pro hlavní kontejner
document.getElementById(this.id_kon).style.zIndex=0; // z-index=0 pro hlavní kontajner
document.getElementById(this.id_kotva).scrollIntoView({behavior:"smooth"}); // scroll na kotvu hlavního kontejneru
},this.TIME2); // zpoždění musí být oněco vyšší než display=typ, jinak nemůže správně JS manipulovat s prvky, protože se nestihnou vytvořit
}};

const centrala={id_error:"div-error",id_but:"but-error",cesta:"../NocniVLK.html",lic:null,
posOn(){
document.getElementById(this.id_but).addEventListener("click",this);
},
handleEvent(){
location.replace(this.cesta); /* dojde k href na this.cesta bez možnosti návratu na error stránku */
},
poloh(){
/* funkce ruší zobrazení polohy aplikace pro telefony, tablety atd. */
obrazovka.velikost(); /* zjistí jak je na tom velikost obrazovky */
if(parseInt(obrazovka.sirka)<=obrazovka.max)
{
/* pokud je obrazovka menší než 1024px, což je rozměr obrazovky malého monitoru PC ale také iPADu na šířku - proto menší rovno */
document.getElementById("poloha").style.display="none"; /* schová panel pro určení polohy aplikace */
}},
licence(){
/* funkce kontroluje, zda byla aplikace spuštěna s potvrzením licenčních podmínek a testy */
let over={};

over.cas1=Date.now()-(24*60*60*1000); /* 24h v milisekundách je platnost licence */
over.cas2=Date.now()+(10*60*1000); /* 10minut od spuštění hlavní stránky aplikace */
/* alert(location.search); */
over.retezec=location.search.slice(1); /* odebere Otazník z řetězce - aby mohlo dojít ke konverci JSON */
try
{
over.celek=JSON.parse(over.retezec);
if((parseInt(over.celek[0])>=over.cas1&&parseInt(over.celek[0])<=over.cas2)&&(over.celek[1]==false||over.celek[2]==false||over.celek[3]==false||over.celek[1]==true||over.celek[2]==true||over.celek[3]==true))
{
this.lic=true; /* ověření licence v pořádku */
}
else
{
/* pokud přenesené data do nového Ona neodpovídají - aktivuje DIV s errorem */
hl_kon.zavri(this.id_error,"flex",this.id_error);
this.posOn(); /* zapne posluchač události pro button Error DIV */
}
}
catch(e)
{
/* pokud by řetězec pro JSON byl poškozen anebo by se jednalo o jiný řetězec - zobrazí DIV error */
hl_kon.zavri(this.id_error,"flex",this.id_error);
this.posOn(); /* zapne posluchač události pro button Error DIV */
}},

komplet(){
v_port.zahajit(); /* Aktivuje posluchče a parametry pro rozměry Kontejnerů s pomocí visualViewport API  */
/* funkce spouští veškeré potřebné procesy pro start aplikace */
this.licence(); // zkontroluje, zda byly uživatelem schváleny licenční podmínky
if(this.lic!=true)
{
return; /* pokud nebude licence v pořádku ukončí funkci */
}
this.poloh(); // zkontroluje velikost obrazovky uživatele, pokud neodpovídá požadovaným rozměrům, schová panel s možnostmi polohování aplikace
hl_kon.cisti_form(); /* vyčistí formuláře obchůzek, tak, aby tam nezůstala případná nežádoucí data */
window.onbeforeunload=()=>{return 'Chcete zavřít aplikaci Noční VLK?';}; /* ochrana před náhodným uzavřením aplikace */

}};

pripravenost.centrum=true; /* MUSÍ BÝT NA POSLEDNÍM ŘÁDKU KNIHOVNY - v autorun.js - informuje o načtení této js knihovny */
const posun={id_okna:"spust",typ:"flex",id_nadpis:"n",TIME1:100,TIME2:150,TIME3:250,TIME4:500,
okna(stare,nove){
/* funkce zajišťuje posun mezi jednotlivými kroky nastavení Spustit Nočního VLKa */
const zavrit=this.id_okna+stare; // id okna mají stejný id + jsou jednotlivě odčíslovány, což vytvoří celkový string id okna
const otevrit=this.id_okna+nove; //  id okna mají stejný id + jsou jednotlivě odčíslovány, což vytvoří celkový string id okna
const kotva=this.id_nadpis+nove; //  id nadpisy mají stejný id + jsou jednotlivě odčíslovány, což vytvoří celkový string id nadpisu
document.getElementById(zavrit).style.zIndex=-1; /* nedovolí klikat na prvnky starého okna - není třeba vypínat posluchče, aby nedošlo k více kliku */
document.getElementById(zavrit).style.opacity=0; /* nastaví opacity=0 na staré okno */
document.getElementById(zavrit).style.display="none"; /* nastaví display=none na staré okno */

setTimeout(()=>{
document.getElementById(otevrit).style.display=this.typ; // u nového okna zapne display=typ
},this.TIME1); // zpoždění musí být, aby nedošlo k nežádoucímu poskočení okna

setTimeout(()=>{
document.getElementById(otevrit).style.opacity=1;
document.getElementById(otevrit).style.zIndex=0;
document.getElementById(kotva).scrollIntoView({behavior:"smooth"});
},this.TIME2);
}};

let osoba={o15:false,o30:false,o60:false,o120:false,i15:810,i30:1620,i60:3240,i120:6480,okruh:11,odloz_start:0,level:3}; /* objekt udržuje základní informace o nastavení uživatele při startu Nočního VLKa */

const _int={ /* objekt slouží k přepisu intervalu nastaveného uživatelem v průvodci spustit Nočního Vlka, v rekapitulaci a v Nastavení */ id_in:["i-15","i-30","i-60","i-120"],id_in_r:["i-15r","i-30r","i-60r","i-120r"],id_r:["ir-15","ir-30","ir-60","ir-120"],id_r_r:["ir-15r","ir-30r","ir-60r","ir-120r"],id_lev:["i-l","i-l-r"],
do15:[750,780,810,825,840,855,870],
do15T:["12&#8239;min 30&#8239;s","13&#8239;min","13&#8239;min 30&#8239;s","13&#8239;min 45&#8239;s","14&#8239;min","14&#8239;min 15&#8239;s","14&#8239;min 30&#8239;s"],
do15R:["2&#8239;min 30&#8239;s","2&#8239;min","1&#8239;min 30&#8239;s","1&#8239;min 15&#8239;s","1&#8239;min","0&#8239;min 45&#8239;s","0&#8239;min 30&#8239;s"],
do30:[1500,1560,1620,1650,1680,1710,1740],
do30T:["25&#8239;min","26&#8239;min","27&#8239;min","27&#8239;min 30&#8239;s","28&#8239;min","28&#8239;min 30&#8239;s","29&#8239;min"],
do30R:["5&#8239;min","4&#8239;min","3&#8239;min","2&#8239;min 30&#8239;s","2&#8239;min","1&#8239;min 30&#8239;s","1&#8239;min"],
do60:[3000,3120,3240,3300,3360,3420,3480],
do60T:["50&#8239;min","52&#8239;min","54&#8239;min","55&#8239;min","56&#8239;min","57&#8239;min","58&#8239;min"],
do60R:["10&#8239;min","8&#8239;min","6&#8239;min","5&#8239;min","4&#8239;min","3&#8239;min","2&#8239;min"],
do120:[6000,6240,6480,6600,6720,6840,6960],
do120T:["100&#8239;min","104&#8239;min","108&#8239;min","110&#8239;min","112&#8239;min","114&#8239;min","116&#8239;min"],
do120R:["20&#8239;min","16&#8239;min","12&#8239;min","10&#8239;min","8&#8239;min","6&#8239;min","4&#8239;min"],
prepis(level){

document.getElementById(this.id_lev[0]).innerText=level; /* Level pro volbu v průvodci */
document.getElementById(this.id_lev[1]).innerText=level; /* Level pro volbu v rekapitulaci */
document.getElementById(p_nas.id_level).innerText=level; /* Level pro volbu nastavení */

--level; /* musí se ubrat level, aby odpovídalo číslo POLÍM DAT */

const o=[this.do15T[level],this.do30T[level],this.do60T[level],this.do120T[level]];
const oR=[this.do15R[level],this.do30R[level],this.do60R[level],this.do120R[level]];

let l1=o.length;
for(let i=0;i<l1;i++)
{
/* přepis Délky intervalu */
document.getElementById(this.id_in[i]).innerHTML=o[i]; /* volba intervalu */
document.getElementById(this.id_in_r[i]).innerHTML=o[i]; /* rekapitulace */
document.getElementById(p_nas.id_in[i]).innerHTML=o[i]; /* nastavení */
}

let l2=oR.length;
for(let i=0;i<l2;i++)
{
/* přepis Časové rezervy */
document.getElementById(this.id_r[i]).innerHTML=oR[i]; /* volba intervalu */
document.getElementById(this.id_r_r[i]).innerHTML=oR[i]; /* rekapitulace */
document.getElementById(p_nas.id_in_r[i]).innerHTML=oR[i]; /* nastavení */
}

/* zapíše změnu v intervalech do Objektu dat uživatele */
osoba.i15=this.do15[level];
osoba.i30=this.do30[level];
osoba.i60=this.do60[level];
osoba.i120=this.do120[level];
/* KONEC zapíše změnu v intervalech do Objektu dat uživatele */
}};

const pruvodce={id_okno:["spust1","spust2","spust3","spust4","spust5"],tl_kriz:["k1","k2","k3","k4","k5"],svg_kriz:["s-k1","s-k2","s-k3","s-k4","s-k5"],tl_dal:["dal1","dal2","dal3","dal4","spustVLK"],tl_zpet:["zpet1","zpet2","zpet3","zpet4"],id_terc:["kr15","kr30","kr60","kr120"],id_obch:["o15a","o15b","o30a","o30b","o60a","o60b","o120a","o120b"],
class_an:"krAN", // název CSS class, která bude spouštět animaci pohyblivých terčů
int_id:["int-15","int-30","int-60","int-120"],int_id_r:["int-15r","int-30r","int-60r","int-120r"],id_ter:["kr15","kr30","kr60","kr120"],id_ter_r:["o15_r","o30_r","o60_r","o120_r"],intBUTid:["in-plus1","in-plus2","in-minus1","in-minus2"],volba:null,id_but_z:"but-zme",id_can_v:"can-v-o",id_can_r:"can-rek",id_odl:[["o10P",10],["o10M",-10],["o1P",1],["o1M",-1]],id_odl_u:["o-start","o-start-r"],
a(){
v_port.pruvodce=true; /* informuje visulViewport API o tom, že je průvodce zapnut */
v_port.handleEvent(); /* aktivuje první redukci okna - protože doposud nebyly zapnuté posluchače visualViewportu API */
hl_kon.zavri("spust1","flex","n1"); /* zavře hlavní kontajner a otevře první okno průvodce Spustit Nočního VLKa */

this.terc_barvy(); /* funkce přebarvuje TERČE: 1.strana průvodce + v rekapitulaci - poslední strana průvodce */
this.box_int(); /* zajistí zobrazení anebo nezobrazení boxů s nastavením intervalů a TERČŮ (display:block anebo display:none) */
this.enab_tl(); /* zajistí disabled anebo enabled prvního tlačítka Dále */
this.v_ochuz(); /* vyhodnotí zda zobrazit KROK volba první obchůzky */
this.posluchaceOn(); /* aktivuje všechny posluchače události potřebné v průvodci */
window.onbeforeunload=()=>{return "Chcete zavřít aplikaci Noční VLK?";}; /* ochrana před náhodným uzavřením aplikace */
},
posluchaceOn(){

let l1=this.tl_kriz.length;
for(let i=0;i<l1;i++)
{
/* přidá posluchače události všem křížkům v průvodci  */
document.getElementById(this.tl_kriz[i]).addEventListener("click",this);
}

let l2=this.tl_dal.length;
for(let i=0;i<l2;i++)
{
/* přidá posluchače události všem tlačítkům další v průvodci */
document.getElementById(this.tl_dal[i]).addEventListener("click",this);
}

let l3=this.tl_zpet.length;
for(let i=0;i<l3;i++)
{
/* přidá posluchače události všem tlačítkům další v průvodci */
document.getElementById(this.tl_zpet[i]).addEventListener("click",this);
}

let l4=this.id_terc.length;
for(let i=0;i<l4;i++)
{
/* přidá posluchače události terčům na volbu obchůzky */
document.getElementById(this.id_terc[i]).addEventListener("click",this);
}

/* přidá posluchače události k PLUS anebo MINUS interval do obchůzky */
document.getElementById(this.intBUTid[0]).addEventListener("click",this);
document.getElementById(this.intBUTid[2]).addEventListener("click",this);
/* KONEC přidá posluchače události k PLUS anebo MINUS interval do obchůzky */

document.getElementById(this.id_but_z).addEventListener("click",this); /* přidá posluchač k tlačítku Změnit první obchůzku */

let l5=this.id_odl.length;
for(let i=0;i<l5;i++)
{
/* přidá posluchače události všem tlačítkům na přidání a odebrání času na Odložený start */
document.getElementById(this.id_odl[i][0]).addEventListener("click",this);
}
},
posluchaceOff(){

let l1=this.tl_kriz.length;
for(let i=0;i<l1;i++)
{
/* odebere posluchače události všem křížkům v průvodci */
document.getElementById(this.tl_kriz[i]).removeEventListener("click",this);
}

let l2=this.tl_dal.length;
for(let i=0;i<l2;i++)
{
/* odebere posluchače události všem tlačítkům další v průvodci */
document.getElementById(this.tl_dal[i]).removeEventListener("click",this);
}

let l3=this.tl_zpet.length;
for(let i=0;i<l3;i++)
{
/* odebere posluchače události všem tlačítkům zpět v průvodci */
document.getElementById(this.tl_zpet[i]).removeEventListener("click",this);
}

let l4=this.id_terc.length;
for(let i=0;i<l4;i++)
{
/* odebere posluchače události terčům na volbu obchůzky */
document.getElementById(this.id_terc[i]).removeEventListener("click",this);
}

/* odebere posluchače události k PLUS anebo MINUS interval do obchůzky */
document.getElementById(this.intBUTid[0]).removeEventListener("click",this);
document.getElementById(this.intBUTid[2]).removeEventListener("click",this);
/* KONEC odebere posluchače události k PLUS anebo MINUS interval do obchůzky */

document.getElementById(this.id_but_z).removeEventListener("click",this); /* odebere posluchač k tlačítku Změnit první obchůzku */

let l5=this.id_odl.length;
for(let i=0;i<l5;i++)
{
/* odebere posluchače události všem tlačítkům na přidání a odebrání času na Odložený start */
document.getElementById(this.id_odl[i][0]).removeEventListener("click",this);
}

},
handleEvent(e){

const k=e.target.id; /* zjistí ID prvku na který bylo kliknuto */

/* kliknutí na posun okna a SPUŠTĚNÍ */
switch(k)
{
case this.tl_dal[0]:
// Klik na Další První KROK v průvodci Spustit Nočního VLKa
hlidac.aktivace(); /* aktivuje ochranu před uspáním v ochrany.js */
posun.okna(1,2);
pruvodce.odloz(0); /* funkce pouze pro kalibraci odloženého startu - věř, je to potřeba */
zvuk.zaloz(); // založí audio mp3 v globálním objektu windows, pokud nebyly již založeny (ve vlk.js)
break;

case this.tl_dal[1]:
window.onbeforeunload=()=>{return "Chcete zavřít aplikaci Noční VLK?";}; /* ochrana před náhodným uzavřením aplikace */
if(this.volba) // pokud byla vybrána více jak jedna obchůzka
{
posun.okna(2,3); // posun na výběr první obchůzky
kresly.system(this.id_can_v); /* vykreslí plátno se systémem obchůzek ve volbě obchůzky */
}
else
{
posun.okna(2,4); // posun na volbu odloženého startu
}
break;


case this.tl_dal[2]:
posun.okna(3,4); // posun z volba první obchůzky na volbu odloženého startu
break;

case this.tl_dal[3]:
posun.okna(4,5); // posun na rekapitulaci
kresly.system(this.id_can_r); /* vykreslí plátno se systémem obchůzek v rekapitulaci */
break;

case this.tl_dal[4]: /* Klik na Spustit */
zamek.blok(); /* aktivuje blokaci zámku obrazovky */
hl_kon.otevri(this.id_okno[4]); // zavře Průvodce spouštěním Nočního VLKa a zapne Hlavní kontejner
v_port.pruvodce=false; /* informuje Visualwievport, že průvodce spuštěním nočního VLKa je ukončen */
vlk.zapni(); // aktiveje hlavní funkci aplikace Noční VLK
break;

case this.tl_zpet[0]:
posun.okna(2,1);
break;

case this.tl_zpet[1]:
posun.okna(3,2);
break;

case this.tl_zpet[2]:
if(this.volba) // pokud uživatel zvolil více jak jednu obchůzku
{
posun.okna(4,3); // posun na výběr obchůzky
}
else
{
posun.okna(4,2); // posun na výběr intervalu
}
break;

case this.tl_zpet[3]:
posun.okna(5,4); // posun na volbu odloženého startu
break;
} /* KONEC kliknutí na posun okna a SPUŠTĚNÍ */


if(k==this.tl_kriz[0]||k==this.svg_kriz[0]||k==this.tl_kriz[1]||k==this.svg_kriz[1]||k==this.tl_kriz[2]||k==this.svg_kriz[2]||k==this.tl_kriz[3]||k==this.svg_kriz[3]||k==this.tl_kriz[4]||k==this.svg_kriz[4])
{
/* kliknuto na Křížek v průvodci spuštění Nočnmího VLKa */
this.kriz();
}

/* kliknutí na terčík Vloba obchůzky */
if(k==this.id_terc[0]||k==this.id_obch[0]||k==this.id_obch[1])
{
this.obch(15);
}
else if(k==this.id_terc[1]||k==this.id_obch[2]||k==this.id_obch[3])
{
this.obch(30);
}
else if(k==this.id_terc[2]||k==this.id_obch[4]||k==this.id_obch[5])
{
this.obch(60);
}
else if(k==this.id_terc[3]||k==this.id_obch[6]||k==this.id_obch[7])
{
this.obch(120);
}
/* KONEC kliknutí na terčík Vloba obchůzky */

/* kliknutí na plus anebo minus Interval */
if(k==this.intBUTid[0]||k==this.intBUTid[1])
{
this.inter("plus");
}
else if(k==this.intBUTid[2]||k==this.intBUTid[3])
{
this.inter("minus");
}
/* KONEC kliknutí na plus anebo minus Interval */

/* Kliknutí na změnit první obchůzku */
if(k==this.id_but_z)
{

this.o_posun(); /* posune obchůzku na další: +11 */
kresly.system(this.id_can_v); /* vykreslí plátno se systémem obchůzek ve volbě obchůzky */
kresly.system(this.id_can_r); /* vykreslí plátno se systémem obchůzek v rekapitulaci */
}
/* KONEC Kliknutí na změnit první obchůzku */

/* kliknutí na posun okna a SPUŠTĚNÍ */


/* kliknutí na tlačítka přidání anebo ubrání Odloženého startu */
switch(k)
{

case this.id_odl[0][0]:
this.odloz(this.id_odl[0][1]);
break;

case this.id_odl[1][0]:
this.odloz(this.id_odl[1][1]);
break;

case this.id_odl[2][0]:
this.odloz(this.id_odl[2][1]);
break;

case this.id_odl[3][0]:
this.odloz(this.id_odl[3][1]);
break;

} /* KONEC kliknutí na tlačítka přidání anebo ubrání Odloženého startu */

},
odloz(hodnota){
/* funkce k přepočtu Odloženého startu požadovaného uživatelem */

let odl=osoba.odloz_start; /* načerpá hodnotu odloženého startu */
odl=odl+hodnota; /* odlozený start minut celkem */

/* podmínky redukují překročení limitu a snižují opacity tlačítek, která nelze použít */
if(odl<=0)
{
odl=0;
document.getElementById(this.id_odl[1][0]).style.opacity="0.5";
document.getElementById(this.id_odl[3][0]).style.opacity="0.5";
}
else if(odl>=120)
{
odl=120;
document.getElementById(this.id_odl[0][0]).style.opacity="0.5";
document.getElementById(this.id_odl[2][0]).style.opacity="0.5";
}
else
{
let l1=this.id_odl.length;
for(let i=0;i<l1;i++)
{
document.getElementById(this.id_odl[i][0]).style.opacity="1";
}}
osoba.odloz_start=odl; /* vrací novou hodnotu požadovanou uživatelem */

document.getElementById(this.id_odl_u[0]).innerText=odl; /* přepis času ukazatele */
document.getElementById(this.id_odl_u[1]).innerText=odl; /* přepis času ukazatele v rekapitulaci */
},
o_posun(){
/* Pomocná funkce posunu obchůzky v systému obchůzek +11 */

const [o15,o30,o60,o120]=[osoba.o15,osoba.o30,osoba.o60,osoba.o120]; /* načte data uživatele */
let max=null; /* proměnná slouží k posouzení maximalnímu posunu obchůzky v daném systému obchůzek */
let okr=osoba.okruh; /* načte aktuální volbu první obchůzky uživatelem */

/* pro systém SINGL obchůzek 15 minut nebo 30 minut nebo 60 minut nebo 120 minut */
if((o15==true&&o30==false&&o60==false&&o120==false)||(o15==false&&o30==true&&o60==false&&o120==false)||(o15==false&&o30==false&&o60==true&&o120==false)||(o15==false&&o30==false&&o60==false&&o120==true))
{
max=11;
}
/* pro systém DABL obchůzek 15 minut + 30 minut nebo 30 minut + 60 minut nebo 60 minut + 120 minut */
else if((o15==true&&o30==true&&o60==false&&o120==false)||(o15==false&&o30==true&&o60==true&&o120==false)||(o15==false&&o30==false&&o60==true&&o120==true))
{
max=22;
}
/* pro systém QVATTRO obchůzek 15 minut + 30 minut + 60 min nebo 15 minut + 60 minut nebo 30 minut + 60 minut + 120 minut nebo 30 minut + 120 minut */
else if((o15==true&&o30==true&&o60==true&&o120==false)||(o15==true&&o30==false&&o60==true&&o120==false)||(o15==false&&o30==true&&o60==true&&o120==true)||(o15==false&&o30==true&&o60==false&&o120==true))
{
max=44;
}
/* pro systém OTTO obchůzek 15 minut + 30 minut + 60 min + 120 minut nebo 15 minut + 30 minut + 120 minut ... atd. */
else if((o15==true&&o30==true&&o60==true&&o120==true)||(o15==true&&o30==false&&o60==true&&o120==true)||(o15==true&&o30==true&&o60==false&&o120==true)||(o15==true&&o30==false&&o60==false&&o120==true))
{
max=88;
}

okr=okr+11; /* samotný posun */

if(okr>max)
{
okr=11; /* pokud dojde k překročení maximalní obchůzky - posune okruh zpět na začátek */
}

osoba.okruh=okr; /* změní hodnotu volbu prvního okruhu v nastavení uživatele */

},
inter(metoda){
/* posun levelu intervalu do obchůzky */

let level=osoba.level; /* načte globalni hodnoty */


if(metoda)
{
if(metoda=="plus")
{ 
level++;
if(level>7)
{
level=7;
}}
else if(metoda=="minus")
{
level--;
if(level<1)
{
level=1;
}}
osoba.level=level; /* přepis globalni hodnoty */
}

this.buttFULL(); /* zajistí vysedení tlačítka Plus anebo Mínus - opacity="0.5" */
_int.prepis(level); /* zajistí přepis intervalů, rezervy ... atd */

},
buttFULL(){

const level=osoba.level; /* načte globalni hodnoty */

 /* zajistí vysedení tlačítka Plus anebo Mínus - opacity="0.5" */
if(level==1)
{
document.getElementById(this.intBUTid[2]).style.opacity=0.5;
document.getElementById(p_nas.id_nas[2]).style.opacity=0.5; /* p_nas JE v centrum.js */
}
else if(level==7)
{
document.getElementById(this.intBUTid[0]).style.opacity=0.5;
document.getElementById(p_nas.id_nas[1]).style.opacity=0.5;
}
else
{
document.getElementById(this.intBUTid[0]).style.opacity=1;
document.getElementById(this.intBUTid[2]).style.opacity=1;
document.getElementById(p_nas.id_nas[2]).style.opacity=1;
document.getElementById(p_nas.id_nas[1]).style.opacity=1;
}},
obch(ktera){
/* rozdělovač pro funkce zmáčknutím na TERČ - Označte ochůzky na Vašem oddíle */
let [o15,o30,o60,o120]=[osoba.o15,osoba.o30,osoba.o60,osoba.o120]; /* načte data uživatele */
let terc=""; /* do proměnné se bude chytat id terče na který bylo kliknuto */

/* Terč obchůzka Do 15 Minut */
if(ktera==15)
{
if(o15==false)
{
o15=true;
}
else if(o15==true)
{
o15=false;
}
terc=this.id_ter[0]; /* označí id terče */
}

/* Terč obchůzka Do 30 Minut */
else if(ktera==30)
{
if(o30==false)
{
o30=true;
}
else if(o30==true)
{
o30=false;
}
terc=this.id_ter[1];
}

/* Terč obchůzka Do 60 Minut */
else if(ktera==60)
{
if(o60==false)
{
o60=true;
}
else if(o60==true)
{
o60=false;
}

terc=this.id_ter[2];
}

/* Terč obchůzka Do 120 Minut */
else if(ktera==120)
{
if(o120==false)
{
o120=true;
}
else if(o120==true)
{
o120=false;
}

terc=this.id_ter[3];
}

/* zapsání hodnot uživatele do objektu */
osoba.o15=o15;
osoba.o30=o30;
osoba.o60=o60;
osoba.o120=o120;
osoba.okruh=11; /* při každé změně obchůzek - bude aktuální okruh zvolený uživatelem anulován */
/* KONEC  zapsání hodnot uživatele do objektu */

/* až po předání hodnot kliknutím, vykonná procedury níže */

this.trep(terc); /* zatřepe objektem - kde terč je id terče, který se má zatřepat */
this.terc_barvy(); /* funkce přebarvuje TERČE: 1.strana průvodce + v rekapitulaci - poslední strana průvodce */
this.box_int(); /* zajistí zobrazení anebo nezobrazení boxů s nastavením intervalů a TERČŮ (display:block anebo display:none) */
this.enab_tl(); /* zajistí disabled anebo enabled prvního tlačítka Dále */
this.v_ochuz(); /* vyhodnotí zda zobrazit KROK volba první obchůzky */
},
trep(co){
// funkce, která zajistí třepání označených terčů zvolené obchůzky KROK 1 v průvosci spouštění Nočního VLKa
document.getElementById(co).classList.toggle(this.class_an); // přiřadí anebo odebere CLASS třídu pro animaci hýbajících se terčů
document.getElementById(co).style.animationPlayState="running"; // pustí animaci hýbajících se terčů, která má v CSS nastavena 30x opakování a pak se sama zastaví, takže není třeba ji nějákým způsobem zastavovat
},
v_ochuz(){
const [o15,o30,o60,o120]=[osoba.o15,osoba.o30,osoba.o60,osoba.o120]; /* načte data uživatele */
let h=0; /* promněnná pro hodnocení */

if(o15==true)
{
h++;
}

if(o30==true)
{
h++;
}

if(o60==true)
{
h++;
}

if(o120==true)
{
h++;
}

if(h>1)
{
this.volba=true;
}
else
{
this.volba=false;
}},
enab_tl(){
const [o15,o30,o60,o120]=[osoba.o15,osoba.o30,osoba.o60,osoba.o120]; /* načte data uživatele */
if(o15==true||o30==true||o60==true||o120==true)
{
document.getElementById(this.tl_dal[0]).disabled=false;
document.getElementById(this.tl_dal[0]).title="Dále";
}
else
{
document.getElementById(this.tl_dal[0]).disabled=true;
document.getElementById(this.tl_dal[0]).title="Označte obchůzky";
}},
box_int(){
/* funkce určuje zda bude v průvodci, v rekapitulaci a v nastavení viditelná volba konkrétního intervalu a zda v rekapitulaci bude vidět terč zvolených obchůzkových okruhů */

const [o15,o30,o60,o120]=[osoba.o15,osoba.o30,osoba.o60,osoba.o120]; /* načte data uživatele */

let h=[]; /* pomocné pole */

if(o15==true){
h.push([0,"block"]); /* připne číslo pole id DOM prvku a typ zobrazení */
}
else
{
h.push([0,"none"]); /* připne číslo pole id DOM prvku a typ zobrazení */
}
if(o30==true)
{
h.push([1,"block"]);
}
else
{
h.push([1,"none"]);
}
if(o60==true)
{
h.push([2,"block"]);
}
else
{
h.push([2,"none"]);
}

if(o120==true)
{
h.push([3,"block"]);
}
else
{
h.push([3,"none"]);
}

let l1=h.length;
for(let i=0;i<l1;i++)
{
document.getElementById(this.int_id[h[i][0]]).style.display=h[i][1];  /* Interval při nastavení v průvodci */
document.getElementById(this.int_id_r[h[i][0]]).style.display=h[i][1]; /* Interval při rekapitulaci */
document.getElementById(this.id_ter_r[h[i][0]]).style.display=h[i][1]; /* TERČ s obchůzkou při rekapitulaci */
document.getElementById(p_nas.id_cast[h[i][0]]).style.display=h[i][1]; /* Interval - v Nastavení - změna intervalu */
}

},
terc_barvy(){
/* funkce přebarvuje TERČE: 1.strana průvodce + v rekapitulaci - poslední strana průvodce */

const [z,c]=["rgb(137,157,120)","rgb(218,65,103)"]; /* barvy terčů AKTIVNÍ , DEAKTIVOVANÁ */

const [o15,o30,o60,o120]=[osoba.o15,osoba.o30,osoba.o60,osoba.o120]; /* načte data uživatele */

const t15=[document.getElementById(this.id_ter[0]),document.getElementById(this.id_ter_r[0])]; /* Objekt DOM terčů [1.strana průvodce,v rekapitulaci - poslední strana průvodce] do 15 MINUT */
const t30=[document.getElementById(this.id_ter[1]),document.getElementById(this.id_ter_r[1])];
const t60=[document.getElementById(this.id_ter[2]),document.getElementById(this.id_ter_r[2])];
const t120=[document.getElementById(this.id_ter[3]),document.getElementById(this.id_ter_r[3])];

if(o15==true){
t15[0].style.borderColor=z;  /* terč první strana v průvodci */
t15[1].style.borderColor=z;  /* terč v rekapitulaci - poslední strana v průvodci */
t15[0].style.boxShadow=`0px 0px 10px ${z}`;  /* terč první strana v průvodci */
t15[1].style.boxShadow=`0px 0px 10px ${z}`;  /* terč v rekapitulaci - poslední strana v průvodci */
}
else
{
t15[0].style.borderColor=c;
t15[1].style.borderColor=c;
t15[0].style.boxShadow="0px 0px 0px transparent";  /* terč první strana v průvodci */
t15[1].style.boxShadow="0px 0px 0px transparent";  /* terč v rekapitulaci - poslední strana v průvodci */
}
if(o30==true)
{
t30[0].style.borderColor=z;
t30[1].style.borderColor=z;
t30[0].style.boxShadow=`0px 0px 10px ${z}`;
t30[1].style.boxShadow=`0px 0px 10px ${z}`;
}
else
{
t30[0].style.borderColor=c;
t30[1].style.borderColor=c;
t30[0].style.boxShadow="0px 0px 0px transparent";
t30[1].style.boxShadow="0px 0px 0px transparent";
}

if(o60==true)
{
t60[0].style.borderColor=z;
t60[1].style.borderColor=z;
t60[0].style.boxShadow=`0px 0px 10px ${z}`;
t60[1].style.boxShadow=`0px 0px 10px ${z}`;
}
else
{
t60[0].style.borderColor=c;
t60[1].style.borderColor=c;
t60[0].style.boxShadow="0px 0px 0px transparent";
t60[1].style.boxShadow="0px 0px 0px transparent";
}

if(o120==true)
{
t120[0].style.borderColor=z;
t120[1].style.borderColor=z;
t120[0].style.boxShadow=`0px 0px 10px ${z}`;
t120[1].style.boxShadow=`0px 0px 10px ${z}`;
}
else
{
t120[0].style.borderColor=c;
t120[1].style.borderColor=c;
t120[0].style.boxShadow="0px 0px 0px transparent";
t120[1].style.boxShadow="0px 0px 0px transparent";
}
},
kriz(){
/* Klik na křížek v průvodci spustit Nočního VLKa */
let l1=this.id_okno.length;
for(let i=0;i<l1;i++)
{
if(document.getElementById(this.id_okno[i]).style.display=="flex")
{
let cislo=i+1; /* id okna začíná od 1 - tedy musí dojít k navýšení o 1 */
let id=`spust${cislo}`;
hl_kon.otevri(id);
this.posluchaceOff(); /* deaktivuje všechny posluchače události potřebné v průvodci */
v_port.pruvodce=false; /* informuje visulViewport API o tom, že je průvodce ukončen */
hlidac.DEaktivace(); /* vypne ochranu proti uspání karty */
kresly.obr=null; /* vymaže z paměti obrázek Tlapky nočního vlka - v kresly.js */
kresly.obr_nacten=false; /* hodnota určuje, že je vymazán z paměti obrázek tlapka Nočního VLKa - v kresly.js */
}}}};


const zpet={
a1(){
posun.okna(2,1);
},

a2(){
posun.okna(3,2);
},

a3(){
posun.okna(4,3);
},

a4(){
posun.okna(5,4);
}};

const dalsi={

a1(){
posun.okna(1,2);
},

a2(){
posun.okna(2,3);
},

a3(){
posun.okna(3,4);
},

a4(){
posun.okna(4,5);
}};

pripravenost.pruvodce=true; /* MUSÍ BÝT NA POSLEDNÍM ŘÁDKU KNIHOVNY - v autorun.js - informuje o načtení této js knihovny */
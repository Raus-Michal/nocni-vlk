var posun={id_okna:"spust",typ:"flex",id_nadpis:"n",TIME1:150,TIME2:200,TIME3:250,TIME4:500};
posun.okna=function(puvodni,nove){
/* funkce zajišťuje posun mezi jednotlivými kroky nastavení */
var stare=this.id_okna+puvodni;
var otevrit=this.id_okna+nove;
var kotva=this.id_nadpis+nove;
document.getElementById(stare).style.zIndex="-1"; /* nedovolí klikat na prvnky - není třeba vypínat posluchče, aby nedošlo k více kliku */
document.getElementById(stare).style.opacity=0;
setTimeout("document.getElementById('"+stare+"').style.display='none';",this.TIME1);
setTimeout("document.getElementById('"+otevrit+"').style.display='"+this.typ+"'; ",this.TIME2);
setTimeout("document.getElementById('"+otevrit+"').style.opacity=1;",this.TIME3);
setTimeout("document.getElementById('"+otevrit+"').style.zIndex='0';document.getElementById('"+kotva+"').scrollIntoView({behavior:'smooth'});",this.TIME4); /* posun na nadpis v případě, že bude okno menší než obsah na výšku !!!!  */
};


var osoba={o15:false,o30:false,o60:false,o120:false,i15:810,i30:1620,i60:3240,i120:6480,okruh:11,odloz_start:0,level:3};


var _int={id_in:["i-15","i-30","i-60","i-120"],id_in_r:["i-15r","i-30r","i-60r","i-120r"],id_r:["ir-15","ir-30","ir-60","ir-120"],id_r_r:["ir-15r","ir-30r","ir-60r","ir-120r"],id_lev:["i-l","i-l-r"]};
_int.do15=[750,780,810,825,840,855,870];
_int.do15T=["12&#8239;min 30&#8239;s","13&#8239;min","13&#8239;min 30&#8239;s","13&#8239;min 45&#8239;s","14&#8239;min","14&#8239;min 15&#8239;s","14&#8239;min 30&#8239;s"];
_int.do15R=["2&#8239;min 30&#8239;s","2&#8239;min","1&#8239;min 30&#8239;s","1&#8239;min 15&#8239;s","1&#8239;min","0&#8239;min 45&#8239;s","0&#8239;min 30&#8239;s"];

_int.do30=[1500,1560,1620,1650,1680,1710,1740];
_int.do30T=["25&#8239;min","26&#8239;min","27&#8239;min","27&#8239;min 30&#8239;s","28&#8239;min","28&#8239;min 30&#8239;s","29&#8239;min"];
_int.do30R=["5&#8239;min","4&#8239;min","3&#8239;min","2&#8239;min 30&#8239;s","2&#8239;min","1&#8239;min 30&#8239;s","1&#8239;min"];

_int.do60=[3000,3120,3240,3300,3360,3420,3480];
_int.do60T=["50&#8239;min","52&#8239;min","54&#8239;min","55&#8239;min","56&#8239;min","57&#8239;min","58&#8239;min"];
_int.do60R=["10&#8239;min","8&#8239;min","6&#8239;min","5&#8239;min","4&#8239;min","3&#8239;min","2&#8239;min"];

_int.do120=[6000,6240,6480,6600,6720,6840,6960];
_int.do120T=["100&#8239;min","104&#8239;min","108&#8239;min","110&#8239;min","112&#8239;min","114&#8239;min","116&#8239;min"];
_int.do120R=["20&#8239;min","16&#8239;min","12&#8239;min","10&#8239;min","8&#8239;min","6&#8239;min","4&#8239;min"];


_int.prepis=function(level){

document.getElementById(this.id_lev[0]).innerHTML=level; /* Level pro volbu v průvodci */
document.getElementById(this.id_lev[1]).innerHTML=level; /* Level pro volbu v rekapitulaci */
document.getElementById(p_nas.id_level).innerHTML=level; /* Level pro volbu nastavení */

--level; /* musí se ubrat level, aby odpovídalo číslo POLÍM DAT */

var o = [this.do15T[level],this.do30T[level],this.do60T[level],this.do120T[level]];
var oR = [this.do15R[level],this.do30R[level],this.do60R[level],this.do120R[level]];

for(var i=0;i<o.length;i++)
{
/* přepis Délky intervalu */
document.getElementById(this.id_in[i]).innerHTML=o[i]; /* volba intervalu */
document.getElementById(this.id_in_r[i]).innerHTML=o[i]; /* rekapitulace */
document.getElementById(p_nas.id_in[i]).innerHTML=o[i]; /* nastavení */
}

for(var r=0;r<oR.length;r++)
{
/* přepis Časové rezervy */
document.getElementById(this.id_r[r]).innerHTML=oR[r]; /* volba intervalu */
document.getElementById(this.id_r_r[r]).innerHTML=oR[r]; /* rekapitulace */
document.getElementById(p_nas.id_in_r[r]).innerHTML=oR[r]; /* nastavení */
}

/* zapíše změnu v intervalech do Objektu dat uživatele */
osoba.i15=this.do15[level];
osoba.i30=this.do30[level];
osoba.i60=this.do60[level];
osoba.i120=this.do120[level];
/* KONEC zapíše změnu v intervalech do Objektu dat uživatele */
};

var pruvodce={id_okno:["spust1","spust2","spust3","spust4","spust5"],tl_kriz:["k1","k2","k3","k4","k5"],svg_kriz:["s-k1","s-k2","s-k3","s-k4","s-k5"],tl_dal:["dal1","dal2","dal3","dal4","spustVLK"],tl_zpet:["zpet1","zpet2","zpet3","zpet4"],id_terc:["kr15","kr30","kr60","kr120"],id_obch:["o15a","o15b","o30a","o30b","o60a","o60b","o120a","o120b"],vystrel:false,T_vystrel:500,int_id:["int-15","int-30","int-60","int-120"],int_id_r:["int-15r","int-30r","int-60r","int-120r"],id_ter:["kr15","kr30","kr60","kr120"],id_ter_r:["o15_r","o30_r","o60_r","o120_r"],intBUTid:["in-plus1","in-plus2","in-minus1","in-minus2"],volba:null,id_but_z:"but-zme",id_can_v:"can-v-o",id_can_r:"can-rek",id_odl:[["o10P",10],["o10M",-10],["o1P",1],["o1M",-1]],id_odl_u:["o-start","o-start-r"]};

pruvodce.a=function(){
hlidac.mp3.play(); /* přehraje zvuk - gong - aby se poprvé přehrál zvuk ochrany před uspáním obrazovky */
v_port.pruvodce=true; /* informuje visulViewport API o tom, že je průvodce zapnut */
v_port.handleEvent(); /* aktivuje první redukci okna - protože doposud nebyly zapnuté posluchače visualViewportu API */
hl_kon.zavri("spust1","flex","n1");
this.terc_barvy(); /* funkce přebarvuje TERČE: 1.strana průvodce + v rekapitulaci - poslední strana průvodce */
this.box_int(); /* zajistí zobrazení anebo nezobrazení boxů s nastavením intervalů a TERČŮ (display:block anebo display:none) */
this.enab_tl(); /* zajistí disabled anebo enabled prvního tlačítka Dále */
this.v_ochuz(); /* vyhodnotí zda zobrazit KROK volba první obchůzky */
this.posluchaceOn(); /* aktivuje všechny posluchače události potřebné v průvodci */
window.onbeforeunload=function(){return 'Chcete zavřít aplikaci Noční VLK?';}; /* ochrana před náhodným uzavřením aplikace */
hlidac.mp3.pause(); /* zastaví zvuk - gong - aby se poprvé přehrál zvuk ochrany před uspáním obrazovky */
};

pruvodce.posluchaceOn=function(){

for(var i=0;i<this.tl_kriz.length;i++)
{
/* přidá posluchače události všem křížkům v průvodci  */
document.getElementById(this.tl_kriz[i]).addEventListener("click",this);
}

for(var i=0;i<this.tl_dal.length;i++)
{
/* přidá posluchače události všem tlačítkům další v průvodci */
document.getElementById(this.tl_dal[i]).addEventListener("click",this);
}

for(var i=0;i<this.tl_zpet.length;i++)
{
/* přidá posluchače události všem tlačítkům další v průvodci */
document.getElementById(this.tl_zpet[i]).addEventListener("click",this);
}

for(var i=0;i<this.id_terc.length;i++)
{
/* přidá posluchače události terčům na volbu obchůzky */
document.getElementById(this.id_terc[i]).addEventListener("click",this);
}

/* přidá posluchače události k PLUS anebo MINUS interval do obchůzky */
document.getElementById(this.intBUTid[0]).addEventListener("click",this);
document.getElementById(this.intBUTid[2]).addEventListener("click",this);
/* KONEC přidá posluchače události k PLUS anebo MINUS interval do obchůzky */

document.getElementById(this.id_but_z).addEventListener("click",this); /* přidá posluchač k tlačítku Změnit první obchůzku */

for(var i=0;i<this.id_odl.length;i++)
{
/* přidá posluchače události všem tlačítkům na přidání a odebrání času na Odložený start */
document.getElementById(this.id_odl[i][0]).addEventListener("click",this);
}
};

pruvodce.posluchaceOff=function(){

for(var i=0;i<this.tl_kriz.length;i++)
{
/* odebere posluchače události všem křížkům v průvodci */
document.getElementById(this.tl_kriz[i]).removeEventListener("click",this);
}

for(var i=0;i<this.tl_dal.length;i++)
{
/* odebere posluchače události všem tlačítkům další v průvodci */
document.getElementById(this.tl_dal[i]).removeEventListener("click",this);
}

for(var i=0;i<this.tl_zpet.length;i++)
{
/* odebere posluchače události všem tlačítkům zpět v průvodci */
document.getElementById(this.tl_zpet[i]).removeEventListener("click",this);
}

for(var i=0;i<this.id_terc.length;i++)
{
/* odebere posluchače události terčům na volbu obchůzky */
document.getElementById(this.id_terc[i]).removeEventListener("click",this);
}

/* odebere posluchače události k PLUS anebo MINUS interval do obchůzky */
document.getElementById(this.intBUTid[0]).removeEventListener("click",this);
document.getElementById(this.intBUTid[2]).removeEventListener("click",this);
/* KONEC odebere posluchače události k PLUS anebo MINUS interval do obchůzky */

document.getElementById(this.id_but_z).removeEventListener("click",this); /* odebere posluchač k tlačítku Změnit první obchůzku */

for(var i=0;i<this.id_odl.length;i++)
{
/* odebere posluchače události všem tlačítkům na přidání a odebrání času na Odložený start */
document.getElementById(this.id_odl[i][0]).removeEventListener("click",this);
}

};

pruvodce.handleEvent=function(e){

var k=e.target.id; /* zjistí ID prvku na který bylo kliknuto */

/* kliknutí na posun okna a SPUŠTĚNÍ */
switch(k)
{
case this.tl_dal[0]:
hlidac.aktivace(); /* opětovně aktivuje ochranu před uspáním */
posun.okna(1,2);
pruvodce.odloz(0); /* funkce pouze pro kalibraci odloženého startu - věř, je to potřeba */
zvuk.zaloz(); /* vytvoří objekt audio MP3 alarmu Nočního VLKa - ve vlk.js */
gong.zaloz(); /* vytvoří objekt audio MP3 - Gong - ve vlk.js */
break;

case this.tl_dal[1]:
window.onbeforeunload=function(){return 'Chcete zavřít aplikaci Noční VLK?';}; /* ochrana před náhodným uzavřením aplikace */
if(this.volba==true)
{
posun.okna(2,3);
kresly.system(this.id_can_v); /* vykreslí plátno se systémem obchůzek ve volbě obchůzky */
}
else
{
posun.okna(2,4);
}
break;


case this.tl_dal[2]:
posun.okna(3,4);
break;

case this.tl_dal[3]:
if(osoba.odloz_start!=0)
{
/* pokud se odložený start nebude rovnat nule - bude po první výžvě k obchůzce roven 0 */
gong.nahraj(); /* nahraje do paměti zvuk pro GONG - mp3 - v vlk.js */
}
else
{
zvuk.nahraj(); /* nahraje do paměti zvuk upozornění Alarmu */
}

posun.okna(4,5);
kresly.system(this.id_can_r); /* vykreslí plátno se systémem obchůzek v rekapitulaci */
break;

case this.tl_dal[4]: /* Klik na Spustit */
/* hlidac.zaloz();  vytvoří objekt audio MP3 - ochrana před uspáním karty */
zamek.blok(); /* aktivuje blokaci zámku obrazovky */
hl_kon.otevri(this.id_okno[4]);
v_port.pruvodce=false; /* informuje Visualwievport, že průvodce spuštěním nočního VLKa je ukončen */
vlk.zapni();
break;

case this.tl_zpet[0]:
posun.okna(2,1);
break;

case this.tl_zpet[1]:
posun.okna(3,2);
break;

case this.tl_zpet[2]:
if(this.volba==true)
{
posun.okna(4,3);
}
else
{
posun.okna(4,2);
}
break;

case this.tl_zpet[3]:
posun.okna(5,4);
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

};

pruvodce.odloz=function(hodnota){
/* funkce k přepočtu Odloženého startu požadovaného uživatelem */

var odlozeni=osoba.odloz_start; /* načerpá hodnotu odloýeného startu */
var z=hodnota;

odlozeni=odlozeni+z;

/* podmínky redukují překročení limitu a snižují opacity tlačítek, která nelze použít */
if(odlozeni<=0)
{
odlozeni=0;
document.getElementById(this.id_odl[1][0]).style.opacity="0.5";
document.getElementById(this.id_odl[3][0]).style.opacity="0.5";
}
else if(odlozeni>=120)
{
odlozeni=120;
document.getElementById(this.id_odl[0][0]).style.opacity="0.5";
document.getElementById(this.id_odl[2][0]).style.opacity="0.5";
}
else
{
for(var i=0;i<this.id_odl.length;i++)
{
document.getElementById(this.id_odl[i][0]).style.opacity="1";
}}
osoba.odloz_start=odlozeni; /* vrací novou hodnotu požadovanou uživatelem */

document.getElementById(this.id_odl_u[0]).innerHTML=odlozeni; /* přepis času ukazatele */
document.getElementById(this.id_odl_u[1]).innerHTML=odlozeni; /* přepis času ukazatele v rekapitulaci */
};


pruvodce.o_posun=function(){
/* Pomocná funkce posunu obchůzky v systému obchůzek +11 */

var max=null; /* proměnná slouží k posouzení maximalnímu posunu obchůzky v daném systému obchůzek */

var o15=osoba.o15;
var o30=osoba.o30;
var o60=osoba.o60;
var o120=osoba.o120;
var okr=osoba.okruh; /* načte aktuální volbu první obchůzky uživatelem */

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

okr=okr+11;

if(okr>max)
{
okr=11; /* pokud dojde k překročení maximalní obchůzky - posune okruh zpět na začátek */
}

osoba.okruh=okr; /* změní hodnotu volbu prvního okruhu v nastavení uživatele */

};


pruvodce.inter=function(metoda){

var level=osoba.level; /* načte globalni hodnoty */


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

};

pruvodce.buttFULL=function(){

var level=osoba.level; /* načte globalni hodnoty */

 /* zajistí vysedení tlačítka Plus anebo Mínus - opacity="0.5" */
if(level==1)
{
document.getElementById(this.intBUTid[2]).style.opacity=0.5;
document.getElementById(p_nas.id_nas[2]).style.opacity=0.5; /* p_nas JE v autorun.js */
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
}};

pruvodce.obch=function(ktera){
/* rozdělovač pro funkce zmáčknutím na TERČ - Označte ochůzky na Vašem oddíle */

var o15=osoba.o15; /* načtení hodnot z globální proměnné */
var o30=osoba.o30;
var o60=osoba.o60;
var o120=osoba.o120;
var terc=""; /* do proměnné se bude chytat id terče na který bylo kliknuto */

if(this.vystrel==false)
{ /* podmínka uzavírá animaci - aby nebylo ji možné provést vícekrát */
this.vystrel=true;

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
else
{
return this.vystrel=false; /* nebylo kliknuto vůbec na terč a bude return a označeno, že výstřel byl ukončen */
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
else
{
return this.vystrel=false;
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
else
{
return this.vystrel=false;
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
else
{
return this.vystrel=false;
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
}};

pruvodce.v_ochuz=function(){

var o15=osoba.o15; /* načtení hodnot z globální proměnné */
var o30=osoba.o30;
var o60=osoba.o60;
var o120=osoba.o120;

var hodnotic=0;

if(o15==true)
{
hodnotic++;
}

if(o30==true)
{
hodnotic++;
}

if(o60==true)
{
hodnotic++;
}

if(o120==true)
{
hodnotic++;
}

if(hodnotic>1)
{
this.volba=true;
}
else
{
this.volba=false;
}};

pruvodce.enab_tl=function(){

var o15=osoba.o15; /* načtení hodnot z globální proměnné */
var o30=osoba.o30;
var o60=osoba.o60;
var o120=osoba.o120;

if(o15==true||o30==true||o60==true||o120==true)
{
document.getElementById(this.tl_dal[0]).disabled=false;
document.getElementById(this.tl_dal[0]).title="Dále";
}
else
{
document.getElementById(this.tl_dal[0]).disabled=true;
document.getElementById(this.tl_dal[0]).title="Označte obchůzky";
}};

pruvodce.box_int=function(){
/* funkce určuje zda bude v průvodci a v nastavený viditelná volba konkrétního intervalu */

var o15=osoba.o15; /* načtení hodnot z globální proměnné */
var o30=osoba.o30;
var o60=osoba.o60;
var o120=osoba.o120;


var d="block",n="none";

if(o15==true){
document.getElementById(this.int_id[0]).style.display=d;  /* při nastavení v průvodci */
document.getElementById(this.int_id_r[0]).style.display=d; /* při rekapitulaci */
document.getElementById(this.id_ter_r[0]).style.display=d; /* TERČ s obchůzkou při rekapitulaci */
document.getElementById(p_nas.id_cast[0]).style.display=d; /* V nastavení - změna intervalu */
}
else
{
document.getElementById(this.int_id[0]).style.display=n;  /* při nastavení v průvodci */
document.getElementById(this.int_id_r[0]).style.display=n; /* při rekapitulaci */
document.getElementById(this.id_ter_r[0]).style.display=n; /* TERČ s obchůzkou při rekapitulaci */
document.getElementById(p_nas.id_cast[0]).style.display=n; /* V nastavení - změna intervalu */
}


if(o30==true)
{
document.getElementById(this.int_id[1]).style.display=d;
document.getElementById(this.int_id_r[1]).style.display=d;
document.getElementById(this.id_ter_r[1]).style.display=d;
document.getElementById(p_nas.id_cast[1]).style.display=d;
}
else
{
document.getElementById(this.int_id[1]).style.display=n;
document.getElementById(this.int_id_r[1]).style.display=n;
document.getElementById(this.id_ter_r[1]).style.display=n;
document.getElementById(p_nas.id_cast[1]).style.display=n;
}

if(o60==true)
{
document.getElementById(this.int_id[2]).style.display=d;
document.getElementById(this.int_id_r[2]).style.display=d;
document.getElementById(this.id_ter_r[2]).style.display=d;
document.getElementById(p_nas.id_cast[2]).style.display=d;
}
else
{
document.getElementById(this.int_id[2]).style.display=n;
document.getElementById(this.int_id_r[2]).style.display=n;
document.getElementById(this.id_ter_r[2]).style.display=n;
document.getElementById(p_nas.id_cast[2]).style.display=n;
}

if(o120==true)
{
document.getElementById(this.int_id[3]).style.display=d;
document.getElementById(this.int_id_r[3]).style.display=d;
document.getElementById(this.id_ter_r[3]).style.display=d;
document.getElementById(p_nas.id_cast[3]).style.display=d;
}
else
{
document.getElementById(this.int_id[3]).style.display=n;
document.getElementById(this.int_id_r[3]).style.display=n;
document.getElementById(this.id_ter_r[3]).style.display=n;
document.getElementById(p_nas.id_cast[3]).style.display=n;
}};

pruvodce.terc_barvy=function(){
/* funkce přebarvuje TERČE: 1.strana průvodce + v rekapitulaci - poslední strana průvodce */


var z="rgb(137,157,120)"; /* zelena barva */
var c="rgb(218,65,103)"; /* cervena barva */

var o15=osoba.o15; /* načtení hodnot z globální proměnné */
var o30=osoba.o30;
var o60=osoba.o60;
var o120=osoba.o120;

var t15=[this.id_ter[0],this.id_ter_r[0]]; /* id terčů [1.strana průvodce,v rekapitulaci - poslední strana průvodce] do 15 MINUT */
var t30=[this.id_ter[1],this.id_ter_r[1]];
var t60=[this.id_ter[2],this.id_ter_r[2]];
var t120=[this.id_ter[3],this.id_ter_r[3]];

if(o15==true){
document.getElementById(t15[0]).style.borderColor=z;  /* terč první strana v průvodci */
document.getElementById(t15[1]).style.borderColor=z;  /* terč v rekapitulaci - poslední strana v průvodci */
}
else
{
document.getElementById(t15[0]).style.borderColor=c;
document.getElementById(t15[1]).style.borderColor=c;
}


if(o30==true)
{
document.getElementById(t30[0]).style.borderColor=z;
document.getElementById(t30[1]).style.borderColor=z;
}
else
{
document.getElementById(t30[0]).style.borderColor=c;
document.getElementById(t30[1]).style.borderColor=c;
}

if(o60==true)
{
document.getElementById(t60[0]).style.borderColor=z;
document.getElementById(t60[1]).style.borderColor=z;
}
else
{
document.getElementById(t60[0]).style.borderColor=c;
document.getElementById(t60[1]).style.borderColor=c;
}

if(o120==true)
{
document.getElementById(t120[0]).style.borderColor=z;
document.getElementById(t120[1]).style.borderColor=z;
}
else
{
document.getElementById(t120[0]).style.borderColor=c;
document.getElementById(t120[1]).style.borderColor=c;
}
};

pruvodce.trep=function(co){

var t1=this.T_vystrel;
var t2=this.T_vystrel+150;

document.getElementById(co).style.animationPlayState="running";
setTimeout('document.getElementById("'+co+'").style.animationPlayState="paused";',t1);
setTimeout('pruvodce.vystrel=false;',t2);

};

pruvodce.kriz=function(){
/* Klik na křížek v průvodci spustit Nočního VLKa */
for(var i=0;i<this.id_okno.length;i++)
{
if(document.getElementById(this.id_okno[i]).style.display=="flex")
{
var cislo=i+1; /* id okna začíná od 1 - tedy musí dojít k navýšení o 1 */
var id="spust"+cislo;
hl_kon.otevri(id);
this.posluchaceOff(); /* deaktivuje všechny posluchače události potřebné v průvodci */
v_port.pruvodce=false; /* informuje visulViewport API o tom, že je průvodce ukončen */
hlidac.DEaktivace(); /* vypne ochranu proti uspání karty */
kresly.obr=null; /* vymaže z paměti obrázek Tlapky nočního vlka - v kresly.js */
kresly.obr_nacten=false; /* hodnota určuje, že je vymazán z paměti obrázek tlapka Nočního VLKa - v kresly.js */
}}};


var zpet={};

zpet.a1=function(){
posun.okna(2,1);
};

zpet.a2=function(){
posun.okna(3,2);
};

zpet.a3=function(){
posun.okna(4,3);
};

zpet.a4=function(){
posun.okna(5,4);
};

var dalsi={};

dalsi.a1=function(){
posun.okna(1,2);
};

dalsi.a2=function(){
posun.okna(2,3);
};

dalsi.a3=function(){
posun.okna(3,4);
};

dalsi.a4=function(){
posun.okna(4,5);
};

uloz.p.pruvodce=true; /* MUSÍ BÝT NA POSLEDNÍM ŘÁDKU KNIHOVNY - v oziv.js - informuje o načtení této js knihovny */
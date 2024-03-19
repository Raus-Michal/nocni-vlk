var vlk={id_sec:["sec-kruh","sec-odp"],id_but:["pl-ob","max-ob","zastav","t-max-o"],id_z_svg:"zastav-svg",id_t_max_obch:["t-max-o","t-max-o-dia"],id_li:["spu-li","zas-li"],max_obch:false};
vlk.zapni=function(){

g_pos.ozivitOff(); /* Deaktivuje posluchače událostí a krytí tlačítka na 50% Oživit Nočního VLKa - v autorun.js */
uloz.smaz(uloz.klice[9]); /* smaže informaci z local storage, že noční vlk byl zastaven */


for(var i=0;i<this.id_sec.length;i++)
{
/* zviditelní sektory Kruhu obchůzek a odpočtu */
document.getElementById(this.id_sec[i]).style.display="flex";
}

document.getElementById(p_nas.id_blok).style.display="flex"; /* zabrazí v Nastavení možnost úpravy délky intervalu */

this.obch_max(); /* funkce vyhodnotí zda bude tlačítko Provést obchůzku s maximálním OKRUHEM viditelné a zda bude mít poluchač události zapnutý */

this.posON(); /* zapne posluchač události na tlačítku Provést plánovanou obchůzku teď, Provést obchůzku MAX a Zastavit Nočního VLKa */

document.getElementById(this.id_li[0]).style.display="none"; /* schová tlačítko Spustit Nočního VLKa */
document.getElementById(this.id_li[1]).style.display="block"; /* zobrazí tlačítko Zastavit Nočního VLKa */

if(osoba.odloz_start==0)
{
zvuk.nahraj(); /* nahraje do paměti zvuk upozornění Alarmu */
obch.aktivace(); /* zapne výzvu k obchůzce - pokud nebude nastavený odložený start první obchůzky */
}
else
{
gong.nahraj(); /* nahraje do paměti zvuk pro GONG - mp3 - v vlk.js */
text.pis("Start první obchůzky byl&nbsp;odložen");
gong.hraj(false); /* zahraje GONG.mp3 - FALSE = 1x */
kresly.system(obch.id_can); /* vykreslí systém v hlavním kontejneru */
hlidac.odpocet=true;  /* proměnná, která funkci hlidac() ve ochrana.js dáva informaci o tom, že odpočet se počítá */
obch.pocitej();
}

uloz.osoba(); /* uloží na localstorage data z objektu osoba (v pruvodce.js), tato funkce je v ozivit.js */
uloz.s_obch(); /* smaže obchůzky uložené v localstorage - v oziv.js */
uloz.u_obch(); /* uloží případné obchůzky nacházenící se ve formulářích  - v oziv.js */
};


vlk.ozivit=function(){
/* funkce slouží pro oživení nočního VLKA */



uloz.klonKOPII(); /* přepis globálních proměnných z klonů a jejich vyčištění - v oziv.js */

g_pos.ozivitOff(); /* Deaktivuje posluchače událostí a krytí tlačítka na 50% Oživit Nočního VLKa - v autorun.js */

uloz.smaz(uloz.klice[9]); /* smaže informaci z local storage, že noční vlk byl zastaven  - v oziv.js */

for(var i=0;i<this.id_sec.length;i++)
{
/* zviditelní sektory Kruhu obchůzek a odpočtu */
document.getElementById(this.id_sec[i]).style.display="flex";
}

document.getElementById(p_nas.id_blok).style.display="flex"; /* zabrazí v Nastavení možnost úpravy délky intervalu */

this.obch_max(); /* funkce vyhodnotí zda bude tlačítko Provést obchůzku s maximálním OKRUHEM viditelné a zda bude mít poluchač události zapnutý */
this.posON(); /* zapne posluchač události na tlačítku Provést plánovanou obchůzku teď, Provést obchůzku MAX a Zastavit Nočního VLKa */

document.getElementById(this.id_li[0]).style.display="none"; /* schová tlačítko Spustit Nočního VLKa */
document.getElementById(this.id_li[1]).style.display="flex"; /* zobrazí tlačítko Zastavit Nočního VLKa */


_int.prepis(osoba.level); /* zajistí přepis intervalů, rezervy ... atd - v pruvodce.js */
pruvodce.box_int(); /* funkce určuje zda bude v průvodci a v nastavený viditelná volba konkrétního intervalu - pruvodce.js */


if(uloz.v_obchuzce!=true)
{ /* pokud nebyla obchůzka aktivní - v oziv.js */
text.pis("Noční&nbsp;VLK byl&nbsp;oživen");
gong.hraj(false); /* zahraje GONG.mp3 - FALSE = 1x - v vlk.js */
this.ozivit.kresly_system(); /* funkce slouží k nestandartnímu vykreslení systému obchůzek na hlavní stránce po oživení */
tik.a_odpocet=true; /* proměnná, která funkci tik.tak() ve autorun.js dáva informaci o tom, že odpočet se počítá */
hlidac.odpocet=true;  /* proměnná, která funkci hlidac() ve ochrana.js dáva informaci o tom, že odpočet se počítá */
}
else
{
obch.aktivace(); /* aktivuje obchůzku */
}

};

vlk.ozivit.kresly_system=function(){
/* funkce slouží k nestandartnímu vykreslení systému obchůzek na hlavní stránce po oživení */
var okruh_puvodni=osoba.okruh; /* ulozí původní okruh */

var o15=osoba.o15;  /* načte data od uživatele */
var o30=osoba.o30;
var o60=osoba.o60;
var o120=osoba.o120;

var okruh=osoba.okruh;  /* načte původní okruh */

if(okruh==11)
{

/* pro systém SINGL obchůzek 15 minut nebo 30 minut nebo 60 minut nebo 120 minut */
if((o15==true&&o30==false&&o60==false&&o120==false)||(o15==false&&o30==true&&o60==false&&o120==false)||(o15==false&&o30==false&&o60==true&&o120==false)||(o15==false&&o30==false&&o60==false&&o120==true))
{
okruh=11;
}
/* pro systém DABL obchůzek 15 minut + 30 minut nebo 30 minut + 60 minut nebo 60 minut + 120 minut */
else if((o15==true&&o30==true&&o60==false&&o120==false)||(o15==false&&o30==true&&o60==true&&o120==false)||(o15==false&&o30==false&&o60==true&&o120==true))
{
okruh=22;
}
/* pro systém QVATTRO obchůzek 15 minut + 30 minut + 60 min nebo 15 minut + 60 minut nebo 30 minut + 60 minut + 120 minut nebo 30 minut + 120 minut */
else if((o15==true&&o30==true&&o60==true&&o120==false)||(o15==true&&o30==false&&o60==true&&o120==false)||(o15==false&&o30==true&&o60==true&&o120==true)||(o15==false&&o30==true&&o60==false&&o120==true))
{
okruh=44;
}
/* pro systém OTTO obchůzek 15 minut + 30 minut + 60 min + 120 minut nebo 15 minut + 30 minut + 120 minut ... atd. */
else if((o15==true&&o30==true&&o60==true&&o120==true)||(o15==true&&o30==false&&o60==true&&o120==true)||(o15==true&&o30==true&&o60==false&&o120==true)||(o15==true&&o30==false&&o60==false&&o120==true))
{
okruh=88;
}


}
else
{
okruh=okruh-11;
if(okruh<11)
{
okruh=11;
}}

osoba.okruh=okruh; /* dočasně, kvůli vykreslení změní hodnotu */
kresly.system(obch.id_can); /* vykreslí systém v hlavním kontejneru */
osoba.okruh=okruh_puvodni; /* po vykreslení systému obchůzek, vrátí okruh na původní stav */
};




vlk.obch_max=function(){
 /* funkce vyhodnotí zda bude tlačítko Provést obchůzku s maximálním OKRUHEM */
 
var hodnotic=0;
var text=null;

if(osoba.o15==true)
{
hodnotic++;
text=15;
}

if(osoba.o30==true)
{
hodnotic++;
text=30;
}

if(osoba.o60==true)
{
hodnotic++;
text=60;
}

if(osoba.o120==true)
{
hodnotic++;
text=120;
}

if(hodnotic>1)
{
this.max_obch=true;
document.getElementById(this.id_but[1]).style.display="block"; /* Tlačítko provést obchůzku s MAX okruhem bude viditelné */
document.getElementById(this.id_t_max_obch[0]).innerHTML=text; /* přepíše Obchůzku na tlačítku provést obchůzku MAX okruh */
document.getElementById(this.id_t_max_obch[1]).innerHTML=text; /* přepíše Obchůzku na dotazu dialogového OKNA */
}
else
{
this.max_obch=false;
document.getElementById(this.id_but[1]).style.display="none"; /* Tlačítko provést obchůzku s MAX okruhem bude NEviditelné */
}};

vlk.posON=function(){
for(var i=0;i<this.id_but.length;i++)
{
document.getElementById(this.id_but[i]).addEventListener("click" , this);
}
if(this.max_obch!=false||this.max_obch!=true)
{
this.obch_max(); /* pokud z neznámých příčin nedošlo k vyhodnocení zda má být MAX okruh umožněn opět se vyhodnotí */
}
if(this.max_obch==false)
{
document.getElementById(this.id_but[1]).removeEventListener("click" , this); /* pokud nemá být tlačítko Provést MAX obchůzku použito - odebere se posluchač události */
}};

vlk.posOFF=function(){
for(var i=0;i<this.id_but.length;i++)
{
document.getElementById(this.id_but[i]).removeEventListener("click" , this);
}};

vlk.handleEvent=function(e){

var k=e.target.id;

if(k==this.id_but[0])
{
/* zmáčknutí tlačítka Provést plánovanou obchůzku teď */
dia.on(dia.id[1]); /* v autorun.js */
}
else if(k==this.id_but[1]||k==this.id_but[3])
{
/* zmáčknutí tlačítka Provést plánovanou obchůzku MAXI */
dia.on(dia.id[2]); /* v autorun.js */
}
else if(k==this.id_but[2]||k==this.id_z_svg)
{
/* Kliknuto na tlačítko Zastavit Nočního VLKa */
dia.on(dia.id[0]); /* v autorun.js */
}


};

var zvuk={zalozeno:false,zesilovat:true,mp3:null,cislo:1,cesta:"alarm/alarm1.mp3",alarm:["alarm/alarm1.mp3","alarm/alarm2.mp3","alarm/alarm3.mp3","alarm/alarm4.mp3","alarm/alarm5.mp3","alarm/alarm6.mp3"] ,nahrano:null,volume_min:0.05,volume:0.75,bc:"rgb(218,65,103)",bcT:"rgb(137,157,120)"};

zvuk.zaloz=function(){
this.mp3=new Audio(this.cesta);
this.zalozeno=true;
};


zvuk.nahraj=function(){

if(this.zalozeno!=true)
{
/* pokud nebude Audio mp3 objekt zalozen - založí ho */
this.zaloz();
}
this.mp3.load();
this.nahrano=true;
};

zvuk.hraj=function(jak){

if(this.nahrano!=true)
{
this.nahraj(); /* pokud není mp3 nahraná do paměti - nahraje ji */
}

this.mp3.loop=jak; /* pokud bude jak false - zajistí, že přehraje zvuk pouze 1x ; pokud true - bude se přehrávat dokola */
this.volume_min=0.05; /* dá nejnižší hlasitost na default */

if(jak==true)
{
if(this.zesilovat==true)
{
/* pokud bude aktivováno zesilování */
this.mp3.volume=this.volume_min;
}
else if(this.zesilovat==true)
{
/* pokud NEbude aktivováno zesilování */
this.mp3.volume=this.volume; /* nastavení defaul hlasitosi je 75% */
}
this.mp3.play();
}
else if(jak==false)
{
this.mp3.volume=this.volume; /* nastavení defaul hlasitosi je 75% */
this.mp3.play();
/* hlidac.load_mp3();  nahraje do mezipaměti mp3 ochrany před uspáním karty - viz. ochrany.js */
}

};

zvuk.zesiluj=function(){
/* funkce postupně zesiluje hlasitost alarmu - použito v autorun.js - funkce TIK */

if(this.zesilovat==true)
{
/* pokud bude aktivováno zesilování */
this.mp3.volume=this.volume_min;
/* rozdílné zvyšování hlasitosti podle současně nastavené hlasitosti */
if(this.volume<0.5)
{
this.volume_min=this.volume_min+0.02;
}
else
{
this.volume_min=this.volume_min+0.03;
}
/* KONEC rozdílné zvyšování hlasitosti podle současně nastavené hlasitosti */


if(this.volume_min>=this.volume)
{
this.volume_min=this.volume;
}}};

/* změna hlasitosti aplikace */
zvuk.zmen=function(id){
var hodnota=parseInt(document.getElementById(id).value);
if(hodnota<this.min){hodnota=this.min;}
this.volume=hodnota/100;
this.hraj(false); /* přehraje zvuk 1x */
}; /* KONEC změna hlasitosti aplikace */

/* barvení tlačítek s volbou zvuku */
zvuk.barvy=function(){

var b1=document.getElementById(p_nas.id_nas[3]); /* button 1 - volba zvuku alarm Noční VLK - v autorun.js */
var b2=document.getElementById(p_nas.id_nas[4]); /* button 2 - volba zvuku alarm Noční VLK - v autorun.js */
var b3=document.getElementById(p_nas.id_nas[5]);
var b4=document.getElementById(p_nas.id_nas[6]);
var b5=document.getElementById(p_nas.id_nas[7]);
var b6=document.getElementById(p_nas.id_nas[8]);

b1.style.borderColor=this.bc;
b2.style.borderColor=this.bc;
b3.style.borderColor=this.bc;
b4.style.borderColor=this.bc;
b5.style.borderColor=this.bc;
b6.style.borderColor=this.bc;

if(this.cislo==1)
{
b1.style.borderColor=this.bcT;
}
else if(this.cislo==2)
{
b2.style.borderColor=this.bcT;
}
else if(this.cislo==3)
{
b3.style.borderColor=this.bcT;
}
else if(this.cislo==4)
{
b4.style.borderColor=this.bcT;
}
else if(this.cislo==5)
{
b5.style.borderColor=this.bcT;
}
else if(this.cislo==6)
{
b6.style.borderColor=this.bcT;
}


}; /* KONEC barvení tlačítek s volbou zvuku */


/* volba zvuku */
zvuk.volba=function(cislo){

if(this.cislo==cislo)
{
/* pokud uživatel klikl na zvuk, který je zvolený - zvuk se pouze 1x přehraje a bude return */
this.hraj(false); /* přehraje zvuk 1x */
return;
}

this.cislo=cislo; /* zapíše změnu do proměnné objektu */
uloz.uloz(uloz.klice[10],this.cislo); /* uloží volbu zvuku uživatele na LocalStorage - v ozivit.js */
var typ=cislo-1; /* ubere číslu 1, aby odpovídalo začátku pole this.alarm */
this.cesta=this.alarm[typ]; /* změní cestu podle výběru */
this.zaloz(); /* Založí novou mp3 do paměti */
this.hraj(false); /* přehraje zvuk 1x */
this.barvy(); /* zajistí obarvení vybraného zvuku */
}; /* KONEC volba zvuku */

zvuk.zastav=function(){
this.mp3.pause();
/* hlidac.load_mp3();  nahraje do mezipaměti mp3 ochrany před uspáním karty - viz. ochrany.js */
};


var gong=Object.create(zvuk); /* udělá věrnou kopii objektu zvuk - pro GONG.mp3 */
gong.cesta="alarm/alarm6.mp3"; /* upraví cestu k gong mp3 */
gong.nahraj(); /* musí dojít k nahrání mp3 do paměti ! */


var obch={id_can:"can-hl",id_tlapa:"tlapa",id_f:["obch15","obch30","obch60","obch120"],intr:null,id:"obchuzka",id_ob:"ob-t",id_b:["vz1","vz2","p-obch"],id_an:["ss1","ss2","ss3","ss4"],id_odp:["o-min","o-sec1","o-sec2"],id_t_out:["t-out-m","t-out-s1","t-out-s2"],id_t:"ob",z_den:null,cas_T:null,TIME:250,TIME2:750};


obch.tlapa=function(urci){

var id_kr=this.id_can;
var id_tl=this.id_tlapa;

if(urci=="tlapa")
{
/* tlapa půjde vidět a kruh se schová */
document.getElementById(id_kr).style.opacity=0;
document.getElementById(id_tl).style.opacity=1;
}
else if(urci=="kruh")
{
/* kruh půjde vidět a tlapa se schová */
document.getElementById(id_kr).style.opacity=1;
document.getElementById(id_tl).style.opacity=0;
}};

obch.zaz_casTO=function(zbyle_s){
/* funkce zapíše do proměnných aktivaci počátku počítání TIOMOUTU */
var datum=new Date();
var c_T=datum.getTime(); /* čas v milisekundách od roku cca 1970 */

var z_s=0;

if(zbyle_s)
{
z_s=parseInt(zbyle_s);
c_T=c_T+(z_s*1000); /* ubere od času počátku timeoutu záporné mili-sekundy */
}

this.cas_T=c_T;
uloz.uloz(uloz.klice[3],this.cas_T); /* uloží počátek timeoutu na LocalStorage */
};

obch.zaz_casTO_vycisti=function(){
/* funkce VYCISTÍ proměnné aktivaci počátku počítání TIOMOUTU */
this.cas_T=null;
uloz.smaz(uloz.klice[3]); /* smažou se data o počátečním času timeoutu z localstorage */
};

obch.pocitej_T_OUT=function(){
/* funkce počítá TIOMOUTU */
var d_a=new Date();
var cas_a=d_a.getTime(); /* čas v milisekundách od roku cca 1970 */

var rozdil=parseInt(this.cas_T/1000)-parseInt(cas_a/1000);

var sT=rozdil*(-1);

var sekundy=sT%60;
var minuty=(sT-sekundy)/60;


if(sekundy<10)
{
sekundy="0"+sekundy;
}
sekundy=sekundy.toString();

var s1=sekundy.substring(0,1);
var s2=sekundy.substring(1,2);


document.getElementById(this.id_t_out[0]).innerHTML=minuty;

document.getElementById(this.id_t_out[1]).innerHTML=s1;
document.getElementById(this.id_t_out[2]).innerHTML=s2;


};


obch.zaz_cas=function(){
/* funkce zapíše do proměnných aktivaci počátku Intervalu */
var datum = new Date();
this.z_den=datum.getTime(); /* čas v milisekundách od roku cca 1970 */
uloz.uloz(uloz.klice[1],this.z_den);
};



obch.interval=function(){
/* funkce slouží k přepočtu nejmenšího intervalu do obchůzky */

if(osoba.o15==true)
{
this.intr=osoba.i15;
}
else if(osoba.o30==true)
{
this.intr=osoba.i30;
}
else if(osoba.o60==true)
{
this.intr=osoba.i60;
}
else if(osoba.o120==true)
{
this.intr=osoba.i120;
}

uloz.uloz(uloz.klice[8],this.intr); /* ukládání dat z proměnné obch.intr, funkce zajišťuje ukládání dat na local storage - v oziv.js */

};


obch.display_odp=function(zbyle_s){

if(zbyle_s<0)
{
zbyle_s=0;
}

var sekundy=zbyle_s%60;
var minuty=(zbyle_s-sekundy)/60;


if(sekundy<10)
{
sekundy="0"+sekundy;
}
sekundy=sekundy.toString();

var s1=sekundy.substring(0,1);
var s2=sekundy.substring(1,2);


document.getElementById(this.id_odp[0]).innerHTML=minuty;

document.getElementById(this.id_odp[1]).innerHTML=s1;
document.getElementById(this.id_odp[2]).innerHTML=s2;

};

obch.pocitej=function(){
this.zaz_cas(); /* zaznamená aktuální čas */
this.interval(); /* funkce slouží k přepočtu nejmenšího intervalu do obchůzky */
tik.a_odpocet=true; /* proměnná, která funkci tik.tak() ve autorun.js dáva informaci o tom, že odpočet se počítá */
hlidac.odpocet=true;  /* proměnná, která funkci hlidac() ve ochrana.js dáva informaci o tom, že odpočet se počítá */
};

obch.odpocet=function(){
/* funkce zajišťuje odpočet intervalu do obchůzky a aktivaci výzvy */

var d_a = new Date();
var c_a=d_a.getTime(); /* čas v milisekundách od roku cca 1970 */
var c_aS=parseInt(c_a/1000); /* čas v sekundách od roku cca 1970 */
var c_zS=parseInt(this.z_den/1000); /* čas počátku intervalu v sekundách od roku cca 1970 */

var rozdil=c_aS-c_zS;

if(osoba.odloz_start==0)
{
/* pokud není zadán uživatelem odložený start */
var zbyle_s=this.intr-rozdil;
}
else
{
var zbyle_s=(osoba.odloz_start*60)-rozdil; /* pokud bude odložený start zadán užívatelem - tento je v minutách a * 60 se převede na sekundy */
}

this.display_odp(zbyle_s); /* funkce zajistí zobrazení zbylého času do intervalu resp. do obchůzky */

if(zbyle_s<=0)
{
this.aktivace(zbyle_s); /* zapne výzvu k obchůzce a funkce s tím související */
}

poloha.kontrola(zbyle_s); /* funkce kontroluje polohu uživatele v kruhu systému obchůzek a příjmá opatření pro vykrewslení polohy - v kresly.js */

};


obch.handleEvent=function(e){

var k=e.target.id; /* zjistí ID prvku na který bylo kliknuto */

if(k==this.id_b[0]||k==this.id_b[1])
{
/* kliknuto na vypni zvuk */
zvuk.zastav(); /* zastaví přehrávání zvuku */
f_video.zvuk("zesilit");  /* zapne zvuk videa aby nezasahovalo do alarmu - manualní nastavení způsobí shasnutí obrazovky */
hlidac.odpocet=true;  /* proměnná, která funkci hlidac() ve ochrana.js dáva informaci o tom, že odpočet se počítá - musí to tak být jinak při vypnutí zvuku a následné minimalizaci okna se ochrana před uspáním nespustí */
document.getElementById(this.id_b[2]).focus(); /* zafokusuje tlačítko Provedu obchůzku */
}
else if(k==this.id_b[2])
{
/* kliknuto na Provedu obchůzku */
hlidac.aktivace(); /* opětovně aktivuje ochranu před uspáním */
zamek.blok(); /* aktivuje blokaci zámku obrazovky */
window.onbeforeunload=function(){return 'Chcete zavřít aplikaci Noční VLK?';}; /* ochrana před náhodným uzavřením aplikace */
this.DEaktivace();
this.pocitej(); /* aktivace potřebných funkcí pro začátek odpočítávání do obchůzky */
}

};

obch.posON=function(){
/* zapne posluchače pro Výzvu k obchůzce */
for(var i=0;i<this.id_b.length;i++)
{
document.getElementById(this.id_b[i]).addEventListener("click" , this);
}};

obch.posOFF=function(){
/* VYzapne posluchače pro Výzvu k obchůzce */
for(var i=0;i<this.id_b.length;i++)
{
document.getElementById(this.id_b[i]).removeEventListener("click" , this);
}};

obch.rozdelovac=function(){
 /* funkce vrací hodnotu konkrétní obchůzky podle systému obchůzek v aktuální chvíly */

var t=null;

var o15=osoba.o15;
var o30=osoba.o30;
var o60=osoba.o60;
var o120=osoba.o120;
var o=osoba.okruh; /* načte aktuální obchůzky uživatele */

/* pro systém SINGL obchůzek 15 minut nebo 30 minut nebo 60 minut nebo 120 minut */
if((o15==true&&o30==false&&o60==false&&o120==false)||(o15==false&&o30==true&&o60==false&&o120==false)||(o15==false&&o30==false&&o60==true&&o120==false)||(o15==false&&o30==false&&o60==false&&o120==true))
{
if(o15==true)
{
t=15;
}
else if(o30==true)
{
t=30;
}
else if(o60==true)
{
t=60;
}
else if(o120==true)
{
t=120;
}}
/* pro systém DABL obchůzek 15 minut + 30 minut nebo 30 minut + 60 minut nebo 60 minut + 120 minut */
else if((o15==true&&o30==true&&o60==false&&o120==false)||(o15==false&&o30==true&&o60==true&&o120==false)||(o15==false&&o30==false&&o60==true&&o120==true))
{if(o15==true&&o30==true&&o60==false&&o120==false)
{
if(o==11)
{
t=30;
}
else if(o==22)
{
t=15;
}}
else if(o15==false&&o30==true&&o60==true&&o120==false)
{
if(o==11)
{
t=60;
}
else if(o==22)
{
t=30;
}}
else if(o15==false&&o30==false&&o60==true&&o120==true)
{
if(o==11)
{
t=120;
}
else if(o==22)
{
t=60;
}}}
/* pro systém QVATTRO obchůzek 15 minut + 30 minut + 60 min nebo 15 minut + 60 minut nebo 30 minut + 60 minut + 120 minut nebo 30 minut + 120 minut */
else if((o15==true&&o30==true&&o60==true&&o120==false)||(o15==true&&o30==false&&o60==true&&o120==false)||(o15==false&&o30==true&&o60==true&&o120==true)||(o15==false&&o30==true&&o60==false&&o120==true))
{
if(o15==true&&o30==true&&o60==true&&o120==false)
{
if(o==11)
{
t=60;
}
else if(o==22)
{
t=15;
}
else if(o==33)
{
t=30;
}
else if(o==44)
{
t=15;
}}
else if(o15==true&&o30==false&&o60==true&&o120==false)
{
if(o==11)
{
t=60;
}
else if(o==22)
{
t=15;
}
else if(o==33)
{
t=15;
}
else if(o==44)
{
t=15;
}}
else if(o15==false&&o30==true&&o60==true&&o120==true)
{
if(o==11)
{
t=120;
}
else if(o==22)
{
t=30;
}
else if(o==33)
{
t=60;
}
else if(o==44)
{
t=30;
}}
else if(o15==false&&o30==true&&o60==false&&o120==true)
{
if(o==11)
{
t=120;
}
else if(o==22)
{
t=30;
}
else if(o==33)
{
t=30;
}
else if(o==44)
{
t=30;
}}}
/* pro systém OTTO obchůzek 15 minut + 30 minut + 60 min + 120 minut nebo 15 minut + 30 minut + 120 minut ... atd. */
else if((o15==true&&o30==true&&o60==true&&o120==true)||(o15==true&&o30==false&&o60==true&&o120==true)||(o15==true&&o30==true&&o60==false&&o120==true)||(o15==true&&o30==false&&o60==false&&o120==true))
{
if(o15==true&&o30==true&&o60==true&&o120==true)
{
if(o==11)
{
t=120;
}
else if(o==22)
{
t=15;
}
else if(o==33)
{
t=30;
}
else if(o==44)
{
t=15;
}
else if(o==55)
{
t=60;
}
else if(o==66)
{
t=15;
}
else if(o==77)
{
t=30;
}
else if(o==88)
{
t=15;
}}
else if(o15==true&&o30==false&&o60==true&&o120==true)
{
if(o==11)
{
t=120;
}
else if(o==22)
{
t=15;
}
else if(o==33)
{
t=15;
}
else if(o==44)
{
t=15;
}
else if(o==55)
{
t=60;
}
else if(o==66)
{
t=15;
}
else if(o==77)
{
t=15;
}
else if(o==88)
{
t=15;
}}
else if(o15==true&&o30==true&&o60==false&&o120==true)
{
if(o==11)
{
t=120;
}
else if(o==22)
{
t=15;
}
else if(o==33)
{
t=30;
}
else if(o==44)
{
t=15;
}
else if(o==55)
{
t=30;
}
else if(o==66)
{
t=15;
}
else if(o==77)
{
t=30;
}
else if(o==88)
{
t=15;
}}
else if(o15==true&&o30==false&&o60==false&&o120==true)
{if(o==11)
{
t=120;
}
else if(o==22)
{
t=15;
}
else if(o==33)
{
t=15;
}
else if(o==44)
{
t=15;
}
else if(o==55)
{
t=15;
}
else if(o==66)
{
t=15;
}
else if(o==77)
{
t=15;
}
else if(o==88)
{
t=15;
}}}
return t;
};



obch.text=function(){
/* funkce zajišťuje správný zápis konkrétní obchůzky (15min,30min,60,min ...) ve výzvě k obchůzce */
var t=this.rozdelovac(); /* funkce vrací hodnotu konkrétní obchůzky podle systému obchůzek v aktuální chvíly */
var id=this.id_t;

document.getElementById(id).innerHTML=t; /* přepíše text obchůzky ve výzvě k obchůzce */
};

obch.zapis=function(){
/* funkce zajišťuje správný zápis konkrétní obchůzky (15min,30min,60,min ...) v Zápisu obchůzek */
var t=this.rozdelovac(); /* funkce vrací hodnotu konkrétní obchůzky podle systému obchůzek v aktuální chvíly */

var o15=osoba.o15;
var o30=osoba.o30;
var o60=osoba.o60;
var o120=osoba.o120;

var z15=false,z30=false,z60=false,z120=false;

var f15=document.getElementById(this.id_f[0]); /* formulář obchůzky do 15 minut */
var f30=document.getElementById(this.id_f[1]);
var f60=document.getElementById(this.id_f[2]);
var f120=document.getElementById(this.id_f[3]);

var cas_aktual=hodiny.cas(); /* pošle aktuální čas */
var h=parseInt(cas_aktual[0]); /* aktuální hodina */
var m=parseInt(cas_aktual[1]); /* aktuální minuta */
var s=parseInt(cas_aktual[2]); /* aktuální sekunda */


if(s>45) /* pokud je sekund více jak 45 přičte o jednu minutu navíc */
{
m=m+1;
}

if(m<10) /* pokud minut bude méně jak 10 - přidá pře číslo nulu */
{
m=m.toString();
m="0"+m;
}
else
{
m=m.toString();
}

h=h.toString();


var t_c=h+":"+m; /* celkový zápis času */
var z=t_c+", "; /* faktický zápis do formuláře */


if(t==15)
{
/* zapis obchůzky do 15 min */
z15=true;
}
else if(t==30&&o15==true)
{
/* zapis obchůzky do 30 min + do 15minut */
z15=true;
z30=true;
}
else if(t==30&&o15==false)
{
/* zapis obchůzky do 30 min */
z30=true;
}
else if(t==60&&o15==false&&o30==false)
{
/* zapis obchůzky do 60 min */
z60=true;
}
else if(t==60&&o15==true&&o30==false)
{
/* zapis obchůzky do 60 min a do 15 minut */
z60=true;
z15=true;
}
else if(t==60&&o15==false&&o30==true)
{
/* zapis obchůzky do 60 min a do 30 minut */
z60=true;
z30=true;
}
else if(t==60&&o15==true&&o30==true)
{
/* zapis obchůzky do 60 min , do 30 minut a do 15 minut */
z60=true;
z30=true;
z15=true;
}
else if(t==120&&o15==false&&o30==false&&o60==false)
{
/* zapis obchůzky do 120minut */
z120=true;
}
else if(t==120&&o15==true&&o30==false&&o60==false)
{
/* zapis obchůzky do 120minut a 15 minut */
z120=true;
z15=true;
}
else if(t==120&&o15==false&&o30==true&&o60==false)
{
/* zapis obchůzky do 120minut a 30minut */
z120=true;
z30=true;
}
else if(t==120&&o15==false&&o30==false&&o60==true)
{
/* zapis obchůzky do 120minut a do 60minut */
z120=true;
z60=true;
}
else if(t==120&&o15==true&&o30==true&&o60==false)
{
/* zapis obchůzky do 120minut , do 15minu a do 30 minut */
z120=true;
z30=true;
z15=true;
}
else if(t==120&&o15==false&&o30==true&&o60==true)
{
/* zapis obchůzky do 120minut, 30 minut a 60minut */
z120=true;
z60=true;
z30=true;
}
else if(t==120&&o15==true&&o30==false&&o60==true)
{
/* zapis obchůzky do 120minut, 15 minut a 60minut */
z120=true;
z60=true;
z15=true;
}
else if(t==120&&o15==true&&o30==true&&o60==true)
{
/* zapis obchůzky do 120minut, 15minut, 30minut, 60minut */
z15=true;
z30=true;
z60=true;
z120=true;
}

if(z15==true)
{
/* zápis obchůzky do 15 minut */
f15.value=f15.value+z;
var o15old=uloz.nacti(uloz.klice[4]); /* načte data z localstorage */
var o15new=o15old+z; /* ke starým datům připíše novou obchůzku */
uloz.uloz(uloz.klice[4],o15new); /* uloží na local storage obchůzky do 15minut v oziv.js */
}

if(z30==true)
{
/* zápis obchůzky do 30 minut */
f30.value=f30.value+z;
var o30old=uloz.nacti(uloz.klice[5]); /* načte data z localstorage */
var o30new=o30old+z; /* ke starým datům připíše novou obchůzku */
uloz.uloz(uloz.klice[5],o30new); /* uloží na local storage obchůzky do 30minut v oziv.js */
}

if(z60==true)
{
/* zápis obchůzky do 60 minut */
f60.value=f60.value+z;
var o60old=uloz.nacti(uloz.klice[6]);
var o60new=o60old+z;
uloz.uloz(uloz.klice[6],o60new);
}

if(z120==true)
{
/* zápis obchůzky do 120 minut */
f120.value=f120.value+z;
var o120old=uloz.nacti(uloz.klice[7]);
var o120new=o120old+z;
uloz.uloz(uloz.klice[7],o120new);
}};


obch.aktivace=function(zbyle_s){ /* funkce, která aktivuje výzvu k obchůzce */
f_video.zvuk("ztlumit");  /* vypne zvuk videa aby nezasahovalo do alarmu - manualní nastavení způsobí shasnutí obrazovky */
zvuk.hraj(true); /* bude přehrávat zvuk obchůzky dokola */
tik.a_odpocet=false; /* proměnná, která funkci tik.tak() ve autorun.js dáva informaci o tom, že odpočet se NEmůže počítat */
hlidac.odpocet=false;  /* proměnná, která funkci hlidac() ve ochrana.js dáva informaci o tom, že odpočet se NEpočítá */

if(uloz.v_obchuzce==false)
{ /* běžný stav když nastane obchůzka anebo pokud nebyla obchůzka v době ukončení aplikace aktivní, jinak by při oživení v obchůzce došlo k znovu zapsání nového času TIMEOUTU - v oziv.js */
this.zaz_casTO(zbyle_s); /* funkce zapíše do proměnných aktivaci počátku počítání TIOMOUTU + zbylé sekundy */
}

tik.a_obchuzka=true; /* proměnná informuje, že výzva k obchůzce je aktivní - v autorun.js */
uloz.v_obchuzce=true; /* informuje že obchůzka je aktivní v oziv.js */
uloz.uloz(uloz.klice[2],true); /* informuje funkci ozivit() že obchůzka je aktivní v oziv.js */
dia.vyp_akt(); /* vypne aktivní dialogové okna - pokud jsou - v autorun.js */
this.tlapa("tlapa"); /* zobrazí tlapu namísto systému obchůzek nočního VLKa */
this.text(); /* Zajistí aktuální text obchůzky ve výzvě k obchůzce */
v_port.handleEvent(); /* aktivuje úpravu okna VisualViewport API v autorun.js */
if(osoba.odloz_start!=0)
{
/* pokud se odložený start nebude rovnat nule - bude po první výžvě k obchůzce roven 0 */
osoba.odloz_start=0;
uloz.osoba(); /* uloží na localstorage data z objektu osoba (v pruvodce.js), tato funkce je v ozivit.js */
}
/* vynulování ukazatele odpočtu */
document.getElementById(this.id_odp[0]).innerHTML="0";
document.getElementById(this.id_odp[1]).innerHTML="0";
document.getElementById(this.id_odp[2]).innerHTML="0";
/* Konec vynulování ukazatele odpočtu */
document.getElementById(this.id).style.display="block";
setTimeout(this.zp.bind(this),this.TIME); /* focus na BUTTON + pomalé zobrazení opacity z 0 na 1 -- musí být zpoždění pomocí timeout jinak se změna v opacity neprojeví - je to vyzkoušené!!!! */
setTimeout(this.foc.bind(this),this.TIME2); /* fokus z BUTTON na text obchůzky s vyšším zpožděním - jinak se neprovede */
for(var i=0;i<this.id_an.length;i++)
{
document.getElementById(this.id_an[i]).style.animationPlayState="running"; /* zapne animaci blikání semaforů */
}
this.posON(); /* zapne posluchače pro Výzvu k obchůzce */
};

obch.DEaktivace=function(){ /* funkce, která DEaktivuje výzvu k obchůzce */
zvuk.zastav(); /* zastaví zvuk upozornění na obchůzku */
f_video.zvuk("zesilit");  /* zapne zvuk videa aby nezasahovalo do alarmu - manualní nastavení způsobí shasnutí obrazovky */
uzamceni.jednou(); /* pokud bude aktivní zámek obrazovky - zobrazí, že je aplikace uzamčena - v autorun.js */
this.posOFF(); /* VYpne posluchače pro Výzvu k obchůzce */
tik.a_obchuzka=false; /* proměnná informuje, že výzva k obchůzce je DEaktivní v autorun.js */
this.zaz_casTO_vycisti(); /* funkce VYCISTÍ proměnné aktivaci počátku počítání TIOMOUTU */
uloz.uloz(uloz.klice[2],false); /* informuje funkci ozivit() že obchůzka NENÍ aktivní v oziv.js */
uloz.v_obchuzce=false; /* informuje že obchůzka NENÍ aktivní v oziv.js */
this.tlapa("kruh"); /* zobrazí kruh obchůzek namísto tlapy nočního VLKa */
for(var i=0;i<this.id_an.length;i++)
{
document.getElementById(this.id_an[i]).style.animationPlayState="paused"; /* VYpne animaci blikání semaforů */
}
document.getElementById(this.id).style.opacity=0; /* pomalé vymyzení opacity z 1 na 0 */
setTimeout(this.non.bind(this),this.TIME); /* pomalé vymyzení opacity z 1 na 0 -- vystřídá vymazání okna na Display=none za TIME 250ms */
poloha.reset(); /* vymaže údaje o poloze - v kresly.js */
kresly.system(this.id_can); /* vykreslí systém v hlavním kontejneru */
this.zapis(); /* funkce zajistí zápis potvrzené obchůzky do Formulářů s obchůzkama */
pruvodce.o_posun(); /* posunu obchůzky v systému obchůzek +11 v pruvodce js */
uloz.osoba(); /* uloží data na localstorage globální objekt osoba - kvůli posunu obchůzky +11 */
};

obch.zp=function(){
/* funkce slouží k focus na BUTTON + pomalému zobrazení Výzvy k obchůzce: opacity z 1 na 0 -- musí být zpoždění pomocí timeout jinak se změna v opacity neprojeví - je to vyzkoušené!!!! */
document.getElementById(this.id).style.opacity=1;
document.getElementById(this.id_b[1]).focus();
};

obch.foc=function(){
/* funkce slouží k focus na Obchůzku ve Výzvě -- musí být zpoždění pomocí timeout jinak se změna v opacity neprojeví - je to vyzkoušené!!!! */
document.getElementById(this.id_ob).scrollIntoView({block:'center',behavior:'smooth'});
};

obch.non=function(){
/* při ukončení Výzvy k obchůzce, musí dojít k pozdějšímu zrušení okna,aby se projevil efekt opacity z 1 na 0 */
document.getElementById(this.id).style.display="none";
};


uloz.p.vlk=true; /* MUSÍ BÝT NA POSLEDNÍM ŘÁDKU KNIHOVNY - v oziv.js - informuje o načtení této js knihovny */
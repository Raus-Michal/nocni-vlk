const uloz={osoba_kopie:{},z_den:"",cas_T:"",intr:"",ok:null,klice:["osoba","cas_p","obchuz","cas_to","o15","o30","o60","o120","interval","vlk_zas","alarm_v","alarm_zv"],max_obnova_ms:3600000,v_obchuzce:false,TIME:1000,casovac:null,
p:{pruvodce:null,autorun:null,vlk:null,ochrany:null,kresly:null}, /* objekt shromažďuje data o připravenosti jednotlivých js knihoven, aby po jejich připravenosti bylo možné oživení */
a(){
/* funkce slouží k aktivaci - posouzení, zda je možno použít localstorage */

if(this.ok==null)
{
let retezec=location.search.slice(1); /* odebere Otazník z řetězce - aby mohlo dojít ke konverci JSON */
let pole="";
try
{
pole=JSON.parse(retezec);
}
catch(e)
{
return; /* něco se pokazilo a nepodařilo se dostat pomocí JSON z řetězce pole - funkce bude ukončena */
}
this.ok=pole[1]; /* první položka v poly je výsledek testu, zda funguje Local storage - viz start.js funkce over */
}},
uloz(klic,data){
/* funkce zajišťuje ukládání dat na local storage */

if(!uloz.ok){return;} // pokud nefunguje LocalStorage bude return - funkce v oziv.js

localStorage.removeItem(klic); /* nejprve provede smazání dat pod klíčem */
localStorage.setItem(klic,data); /* provede uložení dat na localStorage [klíč,data k uložení] */

},
nacti(klic){
/* funkce zajišťuje ukládání dat na local storage */

if(!uloz.ok){return;} // pokud nefunguje LocalStorage bude return - funkce v oziv.js

let data=localStorage.getItem(klic); /* provede nahrání dat z localStorage [klíč] */
if(data==null)
{
data=""; /* pokud jsou data null - jsou data "" */
}

return data;

},
smaz(klic){
/* funkce zajišťuje mazání dat z local storage */

if(!uloz.ok){return;} // pokud nefunguje LocalStorage bude return - funkce v oziv.js

localStorage.removeItem(klic); /* smazání dat pod klíčem */
},
osoba(){
/* funkce slouží k ukládání dat objektu OSOBA, který shromažďuje data zvolenmá uživatelem v pruvodce.js */

if(!uloz.ok){return;} // pokud nefunguje LocalStorage bude return - funkce v oziv.js

const data=osoba; /* Objekt v pruvodce.js */
let konverce=JSON.stringify(data); /* provede konverzi, která je následně připravena k použití */
this.uloz(this.klice[0],konverce); /* pošle data funkci, která se postará o uložení na localstorage */
},
s_obch(){

if(!uloz.ok){return;} // pokud nefunguje LocalStorage bude return - funkce v oziv.js

/* funkce smaže obchůzky z Localstorage */
localStorage.removeItem(this.klice[4]); /* smaže obchůzky do 15minut */
localStorage.removeItem(this.klice[5]); /* smaže obchůzky do 30minut */
localStorage.removeItem(this.klice[6]); /* smaže obchůzky do 60minut */
localStorage.removeItem(this.klice[7]); /* smaže obchůzky do 120minut */
},
u_obch(){
/* funkce uloží všechny obchůzky z příslušných formulářů */

if(!uloz.ok){return;} // pokud nefunguje LocalStorage bude return - funkce v oziv.js

const [df15,df30,df60,df120]=[document.getElementById(obch.id_f[0]).value,document.getElementById(obch.id_f[1]).value,document.getElementById(obch.id_f[2]).value,document.getElementById(obch.id_f[3]).value]; /* data formulář zápisu obchůzek do 15,30,60,120 minut - pole obch.id_f je v vlk.js */

this.uloz(this.klice[4],df15); /* uloží na local storage obchůzky do 15minut v oziv.js */
this.uloz(this.klice[5],df30); /* uloží na local storage obchůzky do 30minut v oziv.js */
this.uloz(this.klice[6],df60);
this.uloz(this.klice[7],df120);
},
o_obch(){
/* funkce oživí obchůzky do příslušných formulářů */

if(!uloz.ok){return;} // pokud nefunguje LocalStorage bude return - funkce v oziv.js

let o15=this.nacti(this.klice[4]); /* načte obchůzky do 15minut z localstorage */
let o30=this.nacti(this.klice[5]); /* načte obchůzky do 30minut z localstorage */
let o60=this.nacti(this.klice[6]); /* načte obchůzky do 60minut z localstorage */
let o120=this.nacti(this.klice[7]); /* načte obchůzky do 120minut z localstorage */

document.getElementById(obch.id_f[0]).value=o15; /* zapíše obchůzky 15min do formuláře */
document.getElementById(obch.id_f[1]).value=o30; /* zapíše obchůzky 30min do formuláře */
document.getElementById(obch.id_f[2]).value=o60;  /* zapíše obchůzky 60min do formuláře */
document.getElementById(obch.id_f[3]).value=o120;  /* zapíše obchůzky 120min do formuláře */

},
o_Tout(){
/* FUNKCE oživí počátek času počítání TIME OUTU */

if(!uloz.ok){return;} // pokud nefunguje LocalStorage bude return - funkce v oziv.js

let cas_T_n=this.nacti(this.klice[3]);  /* načte čas zahájení timeoutu z localstorage v sekundách od roku 1970 */

if(cas_T_n=="")
{
this.cas_T=null; /* pokud nebude čas timeautu bude 0,0,0 */
}
else
{
cas_T_n=parseInt(cas_T_n);
this.cas_T=cas_T_n;
}

},
o_osoba(){
/* načte hodnoty pro úpravu objektu osoba - v pruvodce.js */

if(!uloz.ok){return;} // pokud nefunguje LocalStorage bude return - funkce v oziv.js

let data_osoba=this.nacti(this.klice[0]); /* načte objekt osoba z localstorage */
if(data_osoba==""){this.osoba_kopie=""; return;} /* pokud nebudou načtena žádná data - bude return */

try
{
this.osoba_kopie=JSON.parse(data_osoba); /* z dat uživatele udělá objekt osoba - v pruvodce.js */
}
catch(e)
{
this.osoba_kopie=""; /* načtené data osoby jsou poškozená */
return;
}

},
o_cas_P(){
/* načtení hodnot počátku počátíná času do intervalu */

if(!uloz.ok){return;} // pokud nefunguje LocalStorage bude return - funkce v oziv.js

let cas_P=localStorage.getItem(this.klice[1]);  /* načte čas zahájení odpočtu z localstorage */

if(cas_P==null){
this.z_den="";
return; /* pokud nebudou načtena žádná data - bude return */
}

this.z_den=parseInt(cas_P); /* čas v milisekundách od roku cca 1970  */
},
o_v_obchuz(){
/* načte data,zda nedochází k oživení v obchůzce */

if(!uloz.ok){return;} // pokud nefunguje LocalStorage bude return - funkce v oziv.js

let v_obch=this.nacti(this.klice[2]);  /* načte zda nedošlo k oživení v obchůzce */

if(v_obch=="true")
{ /* pokud byla obchůzka aktivní */
this.v_obchuzce=true;
}
else
{ /* pokud nebyla obchůzka aktivní */
this.v_obchuzce=false;
}},
dead_time(){
/* KONTROLA - ABY NEDOŠLO K OŽIVENÍ VLKA po více jak 60MINUTÁCH od plánovaného TIMEOUTU */
let akt_ms=Date.now(); /* vrátí počet milisekund od nulového data (1. ledna 1970 00:00:00 UTC) */
let interval=this.intr*1000; /* délka intervalu v sekundách se přepíše na milisekundy */

if(akt_ms<(this.z_den+this.max_obnova_ms+interval))
{
/* zde je vše v pořádku */
return true;
}
else
{
return false; /* pokud budou data k obnově starší než this.max_obnova_ms - ČAS V MILISEKUNDÁCH - bude false */
}
/* konec - KONTROLA - ABY NEDOŠLO K OŽIVENÍ VLKA po více jak 120MINUTÁCH */
},
klonKOPII(){
/* přepis globálních proměnných z klonů a jejich vyčištění */

osoba=this.osoba_kopie; /* provede se přepis Doplněné kopie Objektu osoba načtených z localStorage - v oziv.js */
this.osoba_kopie=""; /* vymažou se dočasně uložená data */
obch.cas_T=this.cas_T;
this.cas_T="";

obch.z_den=this.z_den; /* provede se přepis Doplněné kopie Objektu obch načtených z localStorage - v oziv.js */
this.z_den=""; /* vymažou se dočasně uložená data */
obch.intr=this.intr; /* načte ionterval do obchůzky z klonu */
this.intr="";

},
o_zvuk(){
/* funkce oživí Volbu zvuku alarmu uživatelem + volbu zda chce Postupně zesilovat zvuk */

let volba=this.nacti(this.klice[10]); /* načte volbu zvuku uživatele uloženou na LocalStorage */

let zesilovani=this.nacti(this.klice[11]); /* načte volbu uživatele, zda chce postupně zvyšovat zvuk */

if(volba!="")
{
/* pokud byla načtena nějáká volba */
volba=parseInt(volba); /* převede textový řetězec na číslo */
zvuk.cislo=volba; /* provede změnu volby v objektu zvuk - ve vlk.js */
}

if(zesilovani!="")
{
/* pokud byl uložen požadavek uživatele na zesilování */
if(zesilovani=="true")
{
/* pokud uživatel žádá postupnéí zesilování */
zvuk.zesilovat=true; /* nastaví proměnnou na Povolit postupné zesilování - ve vlk.js */
document.getElementById(p_nas.id_nas[9]).checked=true; /* nastaví Zatržení na Chckeboxu Postupně zesilovat alarm - id v autorun.js */
}
else if(zesilovani=="false")
{
/* pokud uživatel nechtěl postupnéí zesilování */
zvuk.zesilovat=false; /* nastaví proměnnou na Zakázat postupné zesilování - ve vlk.js */
document.getElementById(p_nas.id_nas[9]).checked=false; /* odstraní Zatržení na Chckeboxu Postupně zesilovat alarm - id v autorun.js */
}}
},
oziv(tlacitkem){
// funkce zajišťuje vše potřebné k oživení Nočního VLKa

if(!uloz.ok){return;} // pokud nefunguje LocalStorage bude return - funkce v oziv.js

this.o_zvuk(); /* načte volbu zvuku alarmu Noční VLK uloženou uživatelem */

this.osoba_kopie=Object.create(osoba); /* udělá věrnou kopii objektu osoba - v pruvodci.js */

this.o_osoba(); /* načte data pro objekt osoba - v pruvodce.js */
if(this.osoba_kopie=="")
{
return; /* pokud nejsou data k objektu osoba - bude return a neprovede se oživení */
}

this.o_cas_P(); /* načte časy počátku počítání intervalu */
if(this.z_den=="")
{
return; /* pokud nejsou minimální potřebná data načtena - bude return a neprovede se oživení */
}

this.intr=this.nacti(this.klice[8]); /* načte délku počítání intervalu */
if(this.intr=="")
{
return; /* pokud není načtená délka intervalu */
}
else
{
this.intr=parseInt(this.intr); /* přebede text na číslo */
}


 /* KONTROLA - ABY NEDOŠLO K OŽIVENÍ VLKA po delším čase */
const test=this.dead_time();
if(!test)
{
return; /* pokud bude test false - obnova nebude */
}  /* konec - KONTROLA - ABY NEDOŠLO K OŽIVENÍ VLKA po delším čase */

this.o_Tout(); /* oživí počátek času počítání TIME OUTU */
this.o_v_obchuz(); /* zjistí,zda nedošlo není oživení v obchůzce */


if(!tlacitkem)
{
/* pokud nedošlo k oživení nočního VLKa Tlačítkem Oživit v hlavním kontejneru */
const byl_vlk_zastaven=this.nacti(this.klice[9]); /* načte hodnotu z local storage */
if(byl_vlk_zastaven=="true")
{
/* Pokud byl noční VLK zastaven */
g_pos.ozivitOn(); /* aktivuje posluchače událostí a krytí tlačítka na 100% Oživit Nočního VLKa - v autorun.js */
}
else
{
g_pos.ozivitOn(); /* aktivuje posluchače událostí a krytí tlačítka na 100% Oživit Nočního VLKa - v autorun.js - pokub by uživatel dal v dialogovém okně ESCape, aby měl k dispozici tlačítko Oživit */
this.o_obch(); /* funkce oživí obchůzky do příslušných formulářů */
dia.on("d-oziv"); /* zapne dialogové okno s informací - že funkce Nočního vlka budou obnoveny - v autorun.js */
}
}
else
{
/* pokud bude noční VLK oživen pomočí tlačítka OŽIVIT */
this.o_obch(); /* funkce oživí obchůzky do příslušných formulářů */
vlk.ozivit(); /* spustí oživovací procesy Nočního VLKA - ve vlk.js */
}

},
akce(){

if(this.p.pruvodce==true&&this.p.autorun==true&&this.p.vlk==true&&this.p.ochrany==true&&this.p.kresly==true)
{
clearInterval(this.casovac); // zastaví časovač

if(!autorun.lic)
{
return; /* pokud nebude licence v pořádku ukončí funkci v autorun.js */
}

g_pos.aktivace(); /* aktivuje všechny posluchače události hlavního kontajneru */
tik.aktivace(); /* aktivuje SetInterval 500ms */
hlidac.aktivace(); /* aktivuje ochranu před uspáním - pouze kvůli VisualVievport API !!!!!  */
zvuk.zaloz(); // založí všechny audio mp3 do globální proměnné window ve vlk.js
this.a(); // kontrola jestli funguje uživateli LocalStorage
this.oziv(); /* oživení */

}
else
{
this.casovac=setInterval(this.akce.bind(this),this.TIME); // zapne časovač, který bude kontrolovat splnění podmínek
}

}};


uloz.akce();
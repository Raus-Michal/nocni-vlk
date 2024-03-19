var uloz={osoba_kopie:{},z_den:"",cas_T:"",intr:"",ok:null,klice:["osoba","cas_p","obchuz","cas_to","o15","o30","o60","o120","interval","vlk_zas","alarm_v","alarm_zv"],max_obnova_ms:3600000,v_obchuzce:false,TIME:1000};
uloz.casovac;

uloz.p={pruvodce:null,autorun:null,vlk:null,ochrany:null,kresly:null}; /* objekt shromažďuje data o připravenosti jednotlivých js knihoven, aby po jejich připravenosti bylo možné oživení */

uloz.a=function(){
/* funkce slouží k aktivaci - posouzení, zda je možno použít localstorage */

if(this.ok==null)
{
var retezec=location.search.slice(1); /* odebere Otazník z řetězce - aby mohlo dojít ke konverci JSON */
try
{
var pole=JSON.parse(retezec);
}
catch(e)
{
return; /* něco se pokazilo a nepodařilo se dostat pomocí JSON z řetězce pole - funkce bude ukončena */
}
this.ok=pole[1]; /* první položka v poly je výsledek testu, zda funguje Local storage - viz start.js funkce over */
}};

uloz.uloz=function(klic,data){
/* funkce zajišťuje ukládání dat na local storage */

/* alert(klic+"   "+data); */ 

/* podmínky funkčnosti localstorage */
if(this.ok==null){ this.a(); /* aktivace - posouzení použitelnosti Local storage */ }
if(this.ok!=true){return; /* pokud pro zařízení nebude možné použití local storage - provede return */ }
/* KONEC podmínky funkčnosti localstorage */

localStorage.removeItem(klic); /* nejprve provede smazání dat pod klíčem */
localStorage.setItem(klic,data); /* provede uložení dat na localStorage [klíč,data k uložení] */

};

uloz.nacti=function(klic){
/* funkce zajišťuje ukládání dat na local storage */

/* podmínky funkčnosti localstorage */
if(this.ok==null){ this.a(); /* aktivace - posouzení použitelnosti Local storage */ }
if(this.ok!=true){return; /* pokud pro zařízení nebude možné použití local storage - provede return */ }
/* KONEC podmínky funkčnosti localstorage */

var data=localStorage.getItem(klic); /* provede nahrání dat z localStorage [klíč] */
if(data==null)
{
data=""; /* pokud jsou data null - jsou data "" */
}

return data;

};


uloz.smaz=function(klic){
/* funkce zajišťuje mazání dat z local storage */

/* podmínky funkčnosti localstorage */
if(this.ok==null){ this.a(); /* aktivace - posouzení použitelnosti Local storage */ }
if(this.ok!=true){return; /* pokud pro zařízení nebude možné použití local storage - provede return */ }
/* KONEC podmínky funkčnosti localstorage */

localStorage.removeItem(klic); /* smazání dat pod klíčem */
};

uloz.osoba=function(){
/* funkce slouží k ukládání dat objektu OSOBA, který shromažďuje data zvolenmá uživatelem v pruvodce.js */

/* podmínky funkčnosti localstorage */
if(this.ok==null){ this.a(); /* aktivace - posouzení použitelnosti Local storage */ }
if(this.ok!=true){return; /* pokud pro zařízení nebude možné použití local storage - provede return */ }
/* KONEC podmínky funkčnosti localstorage */

var data=osoba; /* Objekt v pruvodce.js */
var konverce=JSON.stringify(data); /* provede konverzi, která je následně připravena k použití */
this.uloz(this.klice[0],konverce); /* pošle data funkci, která se postará o uložení na localstorage */
};

uloz.s_obch=function(){

/* podmínky funkčnosti localstorage */
if(this.ok==null){ this.a(); /* aktivace - posouzení použitelnosti Local storage */ }
if(this.ok!=true){return; /* pokud pro zařízení nebude možné použití local storage - provede return */ }
/* KONEC podmínky funkčnosti localstorage */

/* funkce smaže obchůzky z Localstorage */
localStorage.removeItem(this.klice[4]); /* smaže obchůzky do 15minut */
localStorage.removeItem(this.klice[5]); /* smaže obchůzky do 30minut */
localStorage.removeItem(this.klice[6]); /* smaže obchůzky do 60minut */
localStorage.removeItem(this.klice[7]); /* smaže obchůzky do 120minut */
};

uloz.u_obch=function(){
/* funkce uloží všechny obchůzky z příslušných formulářů */

/* podmínky funkčnosti localstorage */
if(this.ok==null){ this.a(); /* aktivace - posouzení použitelnosti Local storage */ }
if(this.ok!=true){return; /* pokud pro zařízení nebude možné použití local storage - provede return */ }
/* KONEC podmínky funkčnosti localstorage */


var df15=document.getElementById(obch.id_f[0]).value; /* data formulář zápisu obchůzek do 15 minut - pole obch.id_f je v vlk.js */
var df30=document.getElementById(obch.id_f[1]).value;
var df60=document.getElementById(obch.id_f[2]).value;
var df120=document.getElementById(obch.id_f[3]).value;

this.uloz(this.klice[4],df15); /* uloží na local storage obchůzky do 15minut v oziv.js */
this.uloz(this.klice[5],df30); /* uloží na local storage obchůzky do 30minut v oziv.js */
this.uloz(this.klice[6],df60);
this.uloz(this.klice[7],df120);
};

uloz.o_obch=function(){
/* funkce oživí obchůzky do příslušných formulářů */

/* podmínky funkčnosti localstorage */
if(this.ok==null){ this.a(); /* aktivace - posouzení použitelnosti Local storage */ }
if(this.ok!=true){return; /* pokud pro zařízení nebude možné použití local storage - provede return */ }
/* KONEC podmínky funkčnosti localstorage */


var f15=document.getElementById(obch.id_f[0]); /* formulář zápisu obchůzek do 15 minut - pole obch.id_f je v vlk.js */
var f30=document.getElementById(obch.id_f[1]);
var f60=document.getElementById(obch.id_f[2]);
var f120=document.getElementById(obch.id_f[3]);

var o15=this.nacti(this.klice[4]); /* načte obchůzky do 15minut z localstorage */
var o30=this.nacti(this.klice[5]); /* načte obchůzky do 30minut z localstorage */
var o60=this.nacti(this.klice[6]); /* načte obchůzky do 60minut z localstorage */
var o120=this.nacti(this.klice[7]); /* načte obchůzky do 120minut z localstorage */


f15.value=o15; /* zapíše obchůzky do formuláře */
f30.value=o30;
f60.value=o60;
f120.value=o120;

};




uloz.o_Tout=function(){
/* FUNKCE oživí počátek času počítání TIME OUTU */

/* podmínky funkčnosti localstorage */
if(this.ok==null){ this.a(); /* aktivace - posouzení použitelnosti Local storage */ }
if(this.ok!=true){return; /* pokud pro zařízení nebude možné použití local storage - provede return */ }
/* KONEC podmínky funkčnosti localstorage */


var cas_T=this.nacti(this.klice[3]);  /* načte čas zahájení timeoutu z localstorage v sekundách od roku 1970 */



if(cas_T=="")
{
this.cas_T=null; /* pokud nebude čas timeautu bude 0,0,0 */
}
else
{
cas_T=parseInt(cas_T);
this.cas_T=cas_T;
}

};

uloz.o_osoba=function(){
/* načte hodnoty pro úpravu objektu osoba - v pruvodce.js */


/* podmínky funkčnosti localstorage */
if(this.ok==null){ this.a(); /* aktivace - posouzení použitelnosti Local storage */ }
if(this.ok!=true){return; /* pokud pro zařízení nebude možné použití local storage - provede return */ }
/* KONEC podmínky funkčnosti localstorage */

var data_osoba=this.nacti(this.klice[0]); /* načte objekt osoba z localstorage */
if(data_osoba==""){this.osoba_kopie=""; return;} /* pokud nebudou načtena žádná data - bude return */

try
{
this.osoba_kopie=JSON.parse(data_osoba); /* z dat uživatele udělá objekt osoba - v pruvodce.js */
}
catch(e)
{
this.osoba_kopie="";
alert("data Osoby jsou poškozena!");
return;
}

};

uloz.o_cas_P=function(){
/* načtení hodnot počátku počátíná času do intervalu */

/* podmínky funkčnosti localstorage */
if(this.ok==null){ this.a(); /* aktivace - posouzení použitelnosti Local storage */ }
if(this.ok!=true){return; /* pokud pro zařízení nebude možné použití local storage - provede return */ }
/* KONEC podmínky funkčnosti localstorage */

var cas_P=localStorage.getItem(this.klice[1]);  /* načte čas zahájení odpočtu z localstorage */

if(cas_P==null){
this.z_den="";
return; /* pokud nebudou načtena žádná data - bude return */
}

this.z_den=parseInt(cas_P); /* čas v milisekundách od roku cca 1970  */
};

uloz.o_v_obchuz=function(){
/* načte data,zda nedochází k oživení v obchůzce */

/* podmínky funkčnosti localstorage */
if(this.ok==null){ this.a(); /* aktivace - posouzení použitelnosti Local storage */ }
if(this.ok!=true){return; /* pokud pro zařízení nebude možné použití local storage - provede return */ }
/* KONEC podmínky funkčnosti localstorage */

var v_obchuzce=this.nacti(this.klice[2]);  /* načte zda nedošlo k oživení v obchůzce */

if(v_obchuzce=="true")
{ /* pokud byla obchůzka aktivní */
this.v_obchuzce=true;
}
else
{ /* pokud nebyla obchůzka aktivní */
this.v_obchuzce=false;
}


};

uloz.dead_time=function(){
/* KONTROLA - ABY NEDOŠLO K OŽIVENÍ VLKA po více jak 60MINUTÁCH od plánovaného TIMEOUTU */
var datum=new Date();
var akt_ms=datum.getTime(); /* čas v milisekundách od roku cca 1970 */

var interval=this.intr*1000; /* délka intervalu v sekundách se přepíše na milisekundy */

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
};

uloz.klonKOPII=function(){
/* přepis globálních proměnných z klonů a jejich vyčištění */

osoba=this.osoba_kopie; /* provede se přepis Doplněné kopie Objektu osoba načtených z localStorage - v oziv.js */
this.osoba_kopie=""; /* vymažou se dočasně uložená data */
obch.cas_T=this.cas_T;
this.cas_T="";

obch.z_den=this.z_den; /* provede se přepis Doplněné kopie Objektu obch načtených z localStorage - v oziv.js */
this.z_den=""; /* vymažou se dočasně uložená data */
obch.intr=this.intr; /* načte ionterval do obchůzky z klonu */
this.intr="";

};

uloz.o_zvuk=function(){
/* funkce oživí Volbu zvuku alarmu uživatelem + volbu zda chce Postupně zesilovat zvuk */

var volba=this.nacti(this.klice[10]); /* načte volbu zvuku uživatele uloženou na LocalStorage */

var zesilovani=this.nacti(this.klice[11]); /* načte volbu uživatele, zda chce postupně zvyšovat zvuk */

if(volba!="")
{
/* pokud byla načtena nějáká volba */
volba=parseInt(volba); /* převede textový řetězec na číslo */
zvuk.cislo=volba; /* provede změnu volby v objektu zvuk - ve vlk.js */
var typ=zvuk.cislo-1; /* ubere číslu 1, aby odpovídalo začátku pole this.alarm - ve vlk.js  */
zvuk.cesta=zvuk.alarm[typ]; /* změní cestu podle výběru - ve vlk.js  */
zvuk.nahraj(); /* nahraje mp3 do paměti - ve vlk.js  */
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
};

uloz.oziv=function(tlacitkem){

/* podmínky funkčnosti localstorage */
if(this.ok==null){ this.a(); /* aktivace - posouzení použitelnosti Local storage */ }
if(this.ok!=true){return; /* pokud pro zařízení nebude možné použití local storage - provede return */ }
/* KONEC podmínky funkčnosti localstorage */

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
var test=this.dead_time();
if(!test)
{
return; /* pokud bude test false - obnova nebude */
}  /* konec - KONTROLA - ABY NEDOŠLO K OŽIVENÍ VLKA po delším čase */

this.o_Tout(); /* oživí počátek času počítání TIME OUTU */
this.o_v_obchuz(); /* zjistí,zda nedošlo není oživení v obchůzce */


if(!tlacitkem)
{
/* pokud nedošlo k oživení nočního VLKa Tlačítkem Oživit v hlavním kontejneru */
var byl_vlk_zastaven=this.nacti(this.klice[9]); /* načte hodnotu z local storage */
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

};

uloz.akce=function(){

if(this.p.pruvodce==true&&this.p.autorun==true&&this.p.vlk==true&&this.p.ochrany==true&&this.p.kresly==true)
{
clearInterval(this.casovac);

if(autorun.lic!=true)
{
return; /* pokud nebude licence v pořádku ukončí funkci v autorun.js */
}

/* alert("knihovny jsou připraveny na oživení"); */

g_pos.aktivace(); /* aktivuje všechny posluchače události hlavního kontajneru */
tik.aktivace(); /* aktivuje SetInterval 500ms */
hlidac.aktivace(); /* aktivuje ochranu před uspáním - pouze kvůli VisualVievport API !!!!!  */

this.oziv(); /* oživení */

}
else
{
this.casovac=setInterval(this.akce.bind(this),this.TIME);
}

};


uloz.akce();
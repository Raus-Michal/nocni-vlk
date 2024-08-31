const uloz={
osoba_kopie:{},
ozivit_minutku:false, // proměnná určuje, zda dojde po spuštění aplikace k automatickému oživení funkce minutka
ozivit_vlka:false, // proměnná určuje, zda dojde po spuštění aplikace k automatickému oživení hlavní funkce Noční VLK
ozivit_planovac:false, // proměnná určuje, zda dojde po spuštění aplikace k automatickému oživení funkce Plánovač
z_den:"",
cas_T:"",
intr:"",
ok:null,
casovac_butt_oziv:null, // proměnná slouží pro časovač, který po určitém čase sníží opacity tlačítk Oživit na 50% a odebere mu posluchače, po zastavení nočního vlka
klice:[ // klíče pro ukládání do Local Storage
"osoba",
"cas_p",
"obchuz",
"cas_to",
"o15",
"o30",
"o60",
"o120",
"interval",
"vlk_zas",
"cas_pro_oziv",
"alarm_zv", // klíč volby zda chce užívatel postupné zesilování pro alarm Noční VLK
"poznamky", // klíč pro Poznámky
"alarm_min", // 13. klíč volbu alarmu minutky
"zes_min", // 14. klíč volby zda chce užívatel postupné zesilování pro alarm Minutky
"cas_min", // 15. klíč ukládá čas, kdy nastane timeout Minutky - počet milisekund od nulového data (1. ledna 1970 00:00:00 UTC)
"popis_m", // 16. klíč ukládá popisek minutky
"zap_min", // 17. klíč ukládá jesli byla minutka zapnuta=true anebo vypnuta=delete klíč
"opak_min", // 18. klíč ukládá jesli chtěl minutku uživatel opakovat
"int_min", // 19. klíč ukládá interval minutky, který byl zadán v minutách
"alarm_plan", // 20. klíč ukládá volbu alarmu plánovač
"zes_plan", // 21. klíč volby zda chce užívatel postupné zesilování pro alarm Plánovač
"plany", // 22. klíč který ukládá pole planovac.plany, toto pole má v sobě uloženo veškeré zadané plány uživatelem
"pl_alarm" // 23. klíč který ukládá pole planovac.v_alarmu, toto pole slouží k zjištění, zda některý z plánů není aktuálně v alarmu
],
max_obnova_ms:3600000, // maximální čas obnovy po plánovaném timeoutu - 3600000ms = 60 min
v_obchuzce:false,
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
plany(){
// funkce slouží k ukládání dat pole planovac.plany, k oživení všech plánů - v planovac.js

if(!uloz.ok){return;} // pokud nefunguje LocalStorage bude return - funkce v oziv.js

const data=planovac.plany; // pole je v planovac.js
let konverce=JSON.stringify(data); // provede konverzi pole na textový řetězec, která je následně připravena k použití
this.uloz(this.klice[22],konverce); // pošle data funkci, která se postará o uložení na localstorage
},
plany_v_alarmu(){
// funkce slouží k ukládání dat pole planovac.plany, k zjištění, zda nebyl nějáký z plánů aktuálně v alarmu - v planovac.js

if(!uloz.ok){return;} // pokud nefunguje LocalStorage bude return - funkce v oziv.js

const v_alarmu=planovac.data_v_alarmu; // funkce obsahuje pole pro data plánů v alarmu - v planovac.js

const data=v_alarmu; // příprava na zápis do local storage
let konverce=JSON.stringify(data); // provede konverzi pole na textový řetězec, která je následně připravena k použití
this.uloz(this.klice[23],konverce); // pošle data funkci, která se postará o uložení na localstorage
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


// volba alarmu a zesilování Noční VLK
let volba_vlk=this.nacti(this.klice[10]); /* načte volbu zvuku alarmu Noční VLK uživatele uloženou na LocalStorage */
let zesilovani_vlk=this.nacti(this.klice[11]); /* načte volbu uživatele, zda chce postupně zvyšovat zvuk alarmu Noční VLK */

if(volba_vlk!="")
{
/* pokud byla načtena nějáká volba */
volba_vlk=parseInt(volba_vlk); /* převede textový řetězec na číslo */
zvuk.cislo=volba_vlk; /* provede změnu volby alarmu Noční VLK v objektu zvuk - ve vlk.js */
}

if(zesilovani_vlk!="")
{
/* pokud byl uložen požadavek uživatele na zesilování */
if(zesilovani_vlk=="true")
{
/* pokud uživatel žádá postupnéí zesilování */
zvuk.zesilovat=true; /* nastaví proměnnou na Povolit postupné zesilování - ve vlk.js */
document.getElementById(p_nas.id_nas[3]).checked=true; /* nastaví Zatržení na Chckeboxu Postupně zesilovat alarm - id v centrum.js */
}
else if(zesilovani_vlk=="false")
{
/* pokud uživatel nechtěl postupnéí zesilování */
zvuk.zesilovat=false; /* nastaví proměnnou na Zakázat postupné zesilování - ve vlk.js */
document.getElementById(p_nas.id_nas[3]).checked=false; /* odstraní Zatržení na Chckeboxu Postupně zesilovat alarm - id v centrum.js */
}}


// volba alarmu a zesilování Minutka
let volba_min=this.nacti(this.klice[13]); /* načte volbu zvuku alarmu Minutka uživatele uloženou na LocalStorage */
let zesilovani_min=this.nacti(this.klice[14]); /* načte volbu uživatele, zda chce postupně zvyšovat zvuk alarmu Minutka */

if(volba_min!="")
{
/* pokud byla načtena nějáká volba */
volba_min=parseInt(volba_min); /* převede textový řetězec na číslo */
zvuk_min.cislo=volba_min; /* provede změnu volby alarmu Noční VLK v objektu zvuk - ve vlk.js */
}

if(zesilovani_min!="")
{
/* pokud byl uložen požadavek uživatele na zesilování */
if(zesilovani_min=="true")
{
/* pokud uživatel žádá postupnéí zesilování */
zvuk_min.zesilovat=true; /* nastaví proměnnou na Povolit postupné zesilování - ve vlk.js */
document.getElementById(p_nas.id_nas[4]).checked=true; /* nastaví Zatržení na Chckeboxu Postupně zesilovat alarm - id v centrum.js */
}
else if(zesilovani_min=="false")
{
/* pokud uživatel nechtěl postupnéí zesilování */
zvuk_min.zesilovat=false; /* nastaví proměnnou na Zakázat postupné zesilování - ve vlk.js */
document.getElementById(p_nas.id_nas[4]).checked=false; /* odstraní Zatržení na Chckeboxu Postupně zesilovat alarm - id v centrum.js */
}}


// volba alarmu a zesilování Plánovač
let volba_plan=this.nacti(this.klice[20]); /* načte volbu zvuku alarmu Plánovač uživatele uloženou na LocalStorage */
let zesilovani_plan=this.nacti(this.klice[21]); /* načte volbu uživatele, zda chce postupně zvyšovat zvuk alarmu Plánovač */

if(volba_plan!="")
{
/* pokud byla načtena nějáká volba */
volba_plan=parseInt(volba_plan); /* převede textový řetězec na číslo */
zvuk_plan.cislo=volba_plan; /* provede změnu volby alarmu Noční VLK v objektu zvuk - ve vlk.js */
}

if(zesilovani_plan!="")
{
/* pokud byl uložen požadavek uživatele na zesilování */
if(zesilovani_plan=="true")
{
/* pokud uživatel žádá postupnéí zesilování */
zvuk_plan.zesilovat=true; /* nastaví proměnnou na Povolit postupné zesilování - ve vlk.js */
document.getElementById(p_nas.id_nas[5]).checked=true; /* nastaví Zatržení na Chckeboxu Postupně zesilovat alarm - id v centrum.js */
}
else if(zesilovani_plan=="false")
{
/* pokud uživatel nechtěl postupnéí zesilování */
zvuk_plan.zesilovat=false; /* nastaví proměnnou na Zakázat postupné zesilování - ve vlk.js */
document.getElementById(p_nas.id_nas[5]).checked=false; /* odstraní Zatržení na Chckeboxu Postupně zesilovat alarm - id v centrum.js */
}}



},
o_poznamky(){
// funkce načte případné poznámky uživatele z LocalStorage a vloží je do textarea poznámky
let poznamky=this.nacti(this.klice[12]); // načte případné poznámky uživatele uložené na LocalStorage
document.getElementById(g_pos.poznamky[0]).value=poznamky; // poznámky uložené v LocalStorage vloží do textarea Poznámky - objekt g_pos je v centrum,js
},



obnovit_vlka(tlacitkem=false){
// funkce provede prvotní úkony k obnovení hlavní funkce aplikace Noční VLK, pokud jsou procesy v pořádku, její návratová hodnota je TRUE, pokud potřebná data pro oživení chybí, její návratová hodnota je FALSE

if(!uloz.ok){return false;} // pokud nefunguje LocalStorage bude return - funkce v oziv.js

this.osoba_kopie=Object.create(osoba); /* udělá věrnou kopii objektu osoba - v pruvodci.js */

this.o_osoba(); /* načte data pro objekt osoba - v pruvodce.js */
if(this.osoba_kopie=="")
{
return false; /* pokud nejsou data k objektu osoba - bude return a neprovede se oživení */
}

this.o_cas_P(); /* načte časy počátku počítání intervalu */
if(this.z_den=="")
{
return false; /* pokud nejsou minimální potřebná data načtena - bude return a neprovede se oživení */
}

this.intr=this.nacti(this.klice[8]); /* načte délku počítání intervalu */
if(this.intr=="")
{
return false; /* pokud není načtená délka intervalu */
}
else
{
this.intr=parseInt(this.intr); /* přebede text na číslo */
}


 /* KONTROLA - ABY NEDOŠLO K OŽIVENÍ VLKA po delším čase */
const test=this.dead_time();
if(!test)
{
return false; /* pokud bude test false - obnova nebude */
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
g_pos.ozivitOn(this.z_den+this.max_obnova_ms+this.intr*1000); /* aktivuje posluchače událostí a krytí tlačítka na 100% Oživit Nočního VLKa - v centrum.js */
}
else
{
g_pos.ozivitOn(this.z_den+this.max_obnova_ms+this.intr*1000); /* aktivuje posluchače událostí a krytí tlačítka na 100% Oživit Nočního VLKa - v centrum.js - pokub by uživatel dal v dialogovém okně ESCape, aby měl k dispozici tlačítko Oživit */
this.o_obch(); /* funkce oživí obchůzky do příslušných formulářů */
return true; // návratová hodnota bude true
}}
else
{
/* pokud bude noční VLK oživen pomočí tlačítka OŽIVIT */
this.o_obch(); /* funkce oživí obchůzky do příslušných formulářů */
vlk.ozivit(); /* spustí oživovací procesy Nočního VLKA - ve vlk.js */
}
},

oziv(){
// funkce zajišťuje vše potřebné k oživení Nočního VLKa

if(!uloz.ok){return;} // pokud nefunguje LocalStorage bude return - funkce v oziv.js

this.o_zvuk(); /* oživí volbu zvuku alarmu Noční VLK a funkce Minutky uloženou uživatelem */

this.o_poznamky(); // funkce načte z LocalStorage případné uložené poznámky

const dia_planovac=planovac.ma_se_ozivit(); // fukce provede pouze kontrolu, zda je možné plánovač oživit, jestli jsou nějáká data pro oživení, pokud ANO vrátí TRUE, pokud NE vrátí false
const dia_minutka=minutka.ozivit(); // funkce provede veškeré procesy pro oživení minutky a vrátí hodnotu TRUE, pokud je vše připraveno
const dia_vlk=this.obnovit_vlka(); // funkce provede oživovací procesy nočního VLKa, a jeho návratová hodnota bude TRUE, pokud je vše připraveno


if(dia_vlk||dia_minutka||dia_planovac)
{
// pokud nebyla funkce Noční VLK anebo Minutky zastavena a jedna z funkcí je připravena na oživení

if(dia_vlk)
{
this.ozivit_vlka=true; // změní proměnnou tak, aby aplikace věděla, že hlavní funkce aplikace Noční VLK se bude obnovovat
}

if(dia_minutka)
{
this.ozivit_minutku=true; // změní proměnnou tak, aby aplikace věděla, že funkce Minutka se bude obnovovat
}

if(dia_planovac)
{
this.ozivit_planovac=true; // změní proměnnou tak, aby aplikace věděla, že funkce Plánovač se bude obnovovat
}

dia.on("d-nezastaven"); /* zapne dialogové okno s informací - že Noční VLK nebyl zastaven, po kterém následuje Dialogové okna Obnovení funkcí 'Nočního VLKa - v centrum.js */
}
else
{
this.ozivit_minutku=""; // vynuluje proměnnou, aby ji prohlížeč mohl vymazat z paměti, již nebude potřeba
this.ozivit_vlka=""; // vynuluje proměnnou, aby ji prohlížeč mohl vymazat z paměti, již nebude potřeba
this.ozivit_planovac=""; // vynuluje proměnnou, aby ji prohlížeč mohl vymazat z paměti, již nebude potřeba
}


}
};


pripravenost.ozivit=true; /* MUSÍ BÝT NA POSLEDNÍM ŘÁDKU KNIHOVNY - v autorun.js - informuje o načtení této js knihovny */
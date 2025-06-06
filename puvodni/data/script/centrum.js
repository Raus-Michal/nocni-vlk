﻿"use strict";
window.tik={ // window.tik je schválně vložen do objektu window, aby se zvýšila jeho priorita, neboť tento objekt je zásadní pro fugování aplikace
cas:500,
a_obchuzka:false, // určuje zda je aktivní upozornění na obchůzku
a_odpocet:false, // určuje, zda je aktivní odpočet do obchůzky (tedy zda je zapnutý Noční VLK)
a_uspano:false, // proměnná určuje zda došlo k uspání aplikace
class_h:"uhr-h", // název class v CSS, která zruší pozůstatek stínu z animace stínování Wait...
cyklus_kon_platna:null, // proměnná hlídá počet ciklů, kdy se má kontrolovat jestli nedošlo k vymazání HLAVNÍHO plátna CANVAS se systémem obchůzek
tak(){ /* funkce je nekonečný interval zajišťující veškeré procesy, které je třeba hlídat v reálném čase */
hodiny.tik(); /* zápis hodin na hlavním kontejneru */

if(this.a_obchuzka)
{
/* pokud je výzva k obchůzce aktivní */
hodinyO.tik(); /* zápis hodin na výzvě k obchůzce */
zvuk.zesiluj(); /* bude postupně zesilovat hlasitost alarmu, pokud je postupné zesilování povoleno - ve vlk.js */
obch.pocitej_T_OUT(); /* počítání Timeout */
}

if(this.a_odpocet)
{
// pokud je odpočet - hlavní funkce Noční VLK je zapnutý
obch.odpocet(); /* funkce odpočítává konec Intervalu do obchůzky - ve vlk.js */
}

if(this.a_odpocet&&canvas_vymaz.hlidac)
{
// pokud se počítá odpočet do obchůzky hlavní funkce aplikace Noční VLK a je proměnná canvas_vymaz.hlidac=TREU, proměnná canvas_vymaz.hlidac určuje jestli se hlídá vymazání plátna CANVAS se systémem obchůzek - pokud TRUE=hlídání je zapnuté, FALSE=HLÍDÁNÍ JE VYPNUTÉ - kontrolovat výmaz plátna canvas v objektu TIK ve centrum.js 
this.cyklus_kon_platna++; // přidá k cyklu +1 každých 500ms
if(this.cyklus_kon_platna>=10)
{
// pokud je cyklus překročen, tedy za cca 5 sekund
canvas_vymaz.kontrola(); // funkce zkontroluje jestli nedošlo k vymazání HLAVNÍHO plátna CANVAS se systémem obchůzek - v ochrany.js
this.cyklus_kon_platna=null; // vynuluje počítání cyklu
}
}

if(this.a_uspano)
{
// pokud dojde k uspání aplikace, proměnná tik.a_uspano, je ovládána z ochrany.js
pinkani.zesiluj(); /* bude postupně zesilovat hlasitost pinkání - ve vlk.js */
}

if(minutka.aktivni)
{
// pokud bude minutka aktivní, začne se počítat její odpočet, vše v minutka.js
minutka.odpocet(); // aktivace odpočtu minutky, začne se odpočítávat
}

if(minutka.alarm)
{
// pokud bude minutka v timeoutu, vše v minutka.js
zvuk_min.zesiluj(); // bude postupně zesilovat hlasitost alarmu, pokud je postupné zesilování povoleno
}

if(planovac.hlidat_plany)
{
// pokud bude alespoň jeden plánovač zapnutý
planovac.hlidac(); // funkce hlídá, jestli už nastal čas pro aktivaci zadaného plánu anebo plánů - v planovac.js
}

if((planovac.v_alarmu[0]&&planovac.povoleni_zesilovat)||(planovac.v_alarmu[1]&&planovac.povoleni_zesilovat)||(planovac.v_alarmu[2]&&planovac.povoleni_zesilovat)||(planovac.v_alarmu[3]&&planovac.povoleni_zesilovat)||(planovac.v_alarmu[4]&&planovac.povoleni_zesilovat)||(planovac.v_alarmu[5]&&planovac.povoleni_zesilovat))
{
// pokud bude plánovač 1-6 v alarmu s současně bude mít plán 1-6 aktivovánu volbu Přehrávat zvuk upozornění dokola - vše v planovac.js
zvuk_plan.zesiluj(); // bude postupně zesilovat hlasitost alarmu, pokud je postupné zesilování povoleno
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


const mail={
id_butt:"zob-em", // id buttonu Zobrazit email - který bude následně po kliknutí upraven na Kopírovat email
id_inp:"inp-em", // input type="text" , kde bude samotný email zobrazen
id_kop:"zkopir", // id prvku s informací Zkopírováno
m:["..z.","xm@","@a",".c","ri","iu","mls","z","rt","sqhc","eaw"], // pole z kterého bude vytvořen email
zobrazen:false, // proměnná určuje, zda byl email již uživateli zobrazen
delka:null, // délka řetězce emailu
email:"", // proměnná pro dočasné zapsání emailu
T:500, // časové zpoždění
posluchac(){
document.getElementById(this.id_butt).addEventListener("click",this); // přidá buttonu posluchač klik
},
handleEvent(){
const t=document.getElementById(this.id_butt); /* button zobrazit email */
if(!this.zobrazen)
{
// pokud nebyl zatím email zobrazen bude proměnná this.zobrazen==false - ZOBRAZENÍ EMAILU
let x=this.m; /* kopie this.m pole  */
this.email=x[4][0]+x[2][1]+x[5][1]+x[9][0]+x[0][0]+x[6][0]+x[4][1]+x[9][3]+x[9][2]+x[10][1]+x[6][1]+x[1][2]+x[10][0]+x[6][0]+x[2][1]+x[4][1]+x[6][1]+x[0][1]+x[9][3]+x[0][2]; /* výsek emailu */
t.removeEventListener("click",this); // odebere posluchače buttonu pro zobrazení emailu
this.delka=0; // nastaví základní délku na 0
this.text_postupne(); // začne postupně vypisovat písmena emailu
// inp.value=k; do inputu pro email vloží email
t.style.opacity=0; // sníži vyditelnost tlačítka
setTimeout(()=>{
t.style.opacity=1; // zvýší vyditelnost tlačítka
t.title="Kopírovat"; // změní title buttonu
t.innerText="Kopírovat email"; // z,ění text buttonu
this.zobrazen=true; // změní proměnnou na true - tímto se určí, že email je zobrazen
t.addEventListener("click",this); // přidá posluchače buttonu pro zobrazení emailu
},this.T+100); // časové zpoždění pro transition opacity
}
else
{
// pokud byl již email zobrazen bude proměnná this.zobrazen==true - KOPÍROVÁNÍ EMAILU
const kop=document.getElementById(this.id_kop); // načtení do proměnné HTML element text ZKOPÍROVÁNO
kop.style.width=parseInt(document.getElementById(this.id_inp).offsetWidth)+"px"; // šířka textu ZKOPÍROVÁNO bude stejná jako inputu s textem emailu
kop.style.height=parseInt(document.getElementById(this.id_inp).offsetHeight)+"px"; // výška textu ZKOPÍROVÁNO bude stejná jako inputu s textem emailu
kop.style.opacity=1; // zvýší opacity textu ZKOPÍROVÁNO na 1
kop.style.zIndex=1; // zvýší z-index textu ZKOPÍROVÁNO na 1
t.removeEventListener("click",this); // odebere buttonu Kopírovat email, posluchač klik
this.k_do_schranky(); // funkce zajistí zkopírování obsahu in put type="text" do schránky
setTimeout(()=>{
kop.style.opacity=0; // sníží opacity textu ZKOPÍROVÁNO na 0
},this.T+500); // + 500 ms na přečtení
setTimeout(()=>{
t.addEventListener("click",this); // přidá buttonu Kopírovat email, posluchač klik
kop.style.zIndex=-1; // sníží z-index textu ZKOPÍROVÁNO na -1
},this.T+500+500); // 500 ms + 500 ms transmition opacity
}
},
text_postupne(){
// funkce postupně vypíše text emailu
const e_delka=this.email.length; // délka řetězce dočasného emailu
if(e_delka===this.delka)
{
// pokud bude délka emailu == delka ciklů
this.delka=null; // vynuluje proměnnou
this.email=""; // vynuluje proměnnou
return;
}
document.getElementById(this.id_inp).value+=this.email[this.delka]; // přidá do value znak emalu podle cyklu
this.delka++; // přičte jeden cyklus
setTimeout(this.text_postupne.bind(this),this.T/e_delka); // časové zpoždění pro výpis jednoho písmene = čas zpoždění transition opacity/počet písmen emailu
},
k_do_schranky(){
// funkce zajistí zkopírování obsahu in put type="text" do schránky navigator.clipboard API
const inp=document.getElementById(this.id_inp); // vloží do proměnné input type="text" se samotným emailem
if(navigator.clipboard){
// pokud bude v zařízení uživatele navigator.clipboard API
navigator.clipboard.writeText(inp.value); // do navigator.clipboard API vloží obasah inputu s emailem
}
else
{
// Náhradní řešení v případě, že nefunguje navigator.clipboard API
inp.select(); // udělá select textu v input
document.execCommand('copy'); // kopírování do paměti zařízení
setTimeout(()=>{
const anotherElement=document.getElementById(this.id_butt); // načte objekt button Kopírovat email
if(anotherElement){anotherElement.focus();}},200); // přehodí focus textu na button Kopírovat
}
}};

const dia={aktivni:"",
id:[ // pole s id všech dialogových oken používaných v aplikaci
"d-zas",
"d-obch",
"d-obchM",
"d-uspan",
"d-planovac", // 4. id dialogového okna k zadání Plánovače
"d-nezastaven",
"d-oziv", // 6. id dialogového okna S oznámením, že Noční VLK bude plně obnoven
"d-kon", // 7. id dialogového okna Kontakt na programátora
"d-dotaz-oziv",
"d-minutka", // 9. spouštěcí okno k minutce
"d-minutka-info", // 10. informační okno k minutce - nastavení
"d-dotaz-minutka", // 11. dotaz zda chcete zrušit minutku
"d-ozivM", // 12. id dialogového okna S oznámením, že funkce Minutka bude plně obnoven
"d-plan", // 13. id dialogového okna k informacím o konkrétním Plánu
"d-dotaz-plan", // 14. id dialogového okna k zrušení konkrétního Plánu
"d-max-plan", // 15. id dialogového okna oznamující, že již je zadán maximální počet plánů
"d-ozivP", // 16. id dialogového okna S oznámením, že funkce Plánovač a tedy Plány budou obnoveny
"d-chyba", // 17. id dialogového okna s chybovou informací - Problémy s místem na disku anebo s místem na paměťové kartě
"d-kolaps", // 18. id dialogového okna s chybovou informací - Kolaps aplikace
],
zas:["b-z-a","k-d-zas","b-z-n"],
obch:["b-obch-a","k-d-obch","b-obch-n"],
obchM:["b-obchM-a","k-d-obchM","b-obchM-n"],
usp:["k-usp","b-usp-ok"],
oziv:["b-nezastaven", // 0 - tlačítko Dialogového okna o tom, že některé funkce nebyly zastaveny
"b-oziv-ok",  // 1 - tlačítko Dialogového okna o tom, že funkce hlavní funkce aplikace Noční VLK bude obnovena
"b-oziv-min", // 2 - tlačítko Dialogového okna o tom, že funkce Minutka bude obnovena
"b-oziv-plan" // 3 - tlačítko Dialogového okna o tom, že funkce Plánovač bude obnovena
],
ozit_dotaz:["b-dotaz-oziv-a","k-d-dotaz-oziv","b-dotaz-oziv-n"], // tlačítka dialogového okna Oživit nočního VLKa: ANO-NE
minutka:["k-d-minutka","b-dotaz-minutka-z"], // tlačítka dialogového okna k Zadání minutky Křížek a Zrušit
minutka_info:["k-d-minutka-info","min-zrusit-info"], // tlačítka dialogového okna k informaci o minutce Křížek a Zrušit minutku
minutka_dotaz:["k-d-dotaz-minutka","b-dotaz-minutka-a","b-dotaz-minutka-n"], // tlačítka dialogového okna k dotazu o zrušení minutky Křížek, ANO,NE
planovac:["k-d-planovac","b-dotaz-planovac-z"], // tlačítka dialogového okna k Zadání plánovače Křížek a Zrušit
planovac_info:["k-d-plan","plan-zrusit"], // tlačítka dialogového okna info ke konkrétnímu Plánu - Křižek a Zrušit plán
planovac_dotaz:["k-d-dotaz-plan","b-dotaz-plan-a","b-dotaz-plan-n"], //  tlačítka dialogového okna dotazu ke zrušení konkrétního Plánu - Křížek , Ano-Ne
planovac_max:["k-max-plan","b-max-plan-ok"], // tlačítka dialogového okna oznamující, že již je zadán maximální počet plánů - Křížek a Rozumím
kont:"but-kon", // button pro zobrazení kontaktu na programátora, který se následně změní na kopírovat email
chyba_dia:["k-chyba","b-chyba-ok"], // id křížek a button k dialogovému oknu zobrazující chybovou hlášku Problémi s místem na disku anebo paměťové kartě
kolaps_dia:["k-kolaps","b-kolaps-ok"], // id křížek a button k dialogovému oknu zobrazující hlášku o Kolapsu zařízení
handleEvent(e){
const k=e.target.id; /* zjistí id prvku na který bylo kliknuto */

if(k===this.zas[0])
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
uloz.uloz(uloz.klice[9],true); /* uloží na local storage informaci, že byl Noční VLK zastaven - v oživit.js */
this.off(this.id[0]); /* vypne dialogové okno */
text.pis("Noční&nbsp;VLK byl zastaven"); // text pře celou obrazovku
gong.hraj(false); /* zahraje GONG.mp3 - FALSE = 1x */
poloha.reset(); /* vyresetuje hodnoty polohy v systému obchůzek - v kresly.js */

if(uloz.ok){ // pokud funguje LocalStorage bude return - funkce v oziv.js
g_pos.ozivitOn(obch.z_den+obch.intr*1000+uloz.max_obnova_ms); // aktivuje posluchače událostí a krytí tlačítka na 100% Oživit Nočního VLKa, čas závorce uvádí počet milisekund za které budou posluchače odebrány (zapnutí obchůzky v milisekundách od nulového data (1. ledna 1970 00:00:00 UTC) ve vlk.js + zadaný intreval v sekundách * 1000, aby byly milisekundy ve vlk.js + maximální čas pro obnovení v milisekundách v oziv.js ) - v centrum.js
}

kresly.obr=null; /* vymaže z paměti obrázek Tlapky nočního vlka - v kresly.js */
kresly.obr_nacten=false; /* hodnota určuje, že je vymazán z paměti obrázek tlapka Nočního VLKa - v kresly.js */
}


else if(k===this.zas[1]||k===this.zas[2])
{
/* Kliknuto na Křížek anebo Ne - Zastavit Nočního VLKa */
klik.hraj(false); // bude přehrávat zvuk 1x klik 
this.off(this.id[0]); /* vypne dialogové okno */
}


else if(k===this.obch[0])
{
/* Kliknuto na ANO - Provést obchůzku */
this.off(this.id[1]); /* vypne dialogové okno */
if(osoba.odloz_start!==0)
{
/* pokud se odložený start nebude rovnat nule - bude po první výžvě k obchůzce roven 0 */
osoba.odloz_start=0;
uloz.osoba(); /* uloží na localstorage data z objektu osoba (v pruvodce.js), tato funkce je v ozivit.js */
}
obch.aktivace(); /* aktivuje obchůzku */
}


else if(k===this.obch[1]||k===this.obch[2])
{
/* Kliknuto na Křížek anebo Ne -  Provést obchůzku */
klik.hraj(false); // bude přehrávat zvuk 1x klik 
this.off(this.id[1]); /* vypne dialogové okno */
}

else if(k===this.obchM[0])
{
/* Kliknuto na ANO - Provést obchůzku MAX */
this.off(this.id[2]); /* vypne dialogové okno */
if(osoba.odloz_start!==0)
{
/* pokud se odložený start nebude rovnat nule - bude po první výžvě k obchůzce roven 0 */
osoba.odloz_start=0;
}
osoba.okruh=11; /* default hodnota - největší obchůzka */
uloz.osoba(); /* uloží na localstorage data z objektu osoba (v pruvodce.js), tato funkce je v ozivit.js */
obch.aktivace(); /* aktivuje obchůzku */
}


else if(k===this.obchM[1]||k===this.obchM[2])
{
/* Kliknuto na Křížek anebo Ne -  Provést obchůzku MAX */
klik.hraj(false); // bude přehrávat zvuk 1x klik 
this.off(this.id[2]); /* vypne dialogové okno */
}

else if(k===this.ozit_dotaz[0])
{
/* Kliknuto na ANO - Oživit Nočního VLKa */
zvuk.zaloz(); // založí audio mp3 v globálním objektu windows, pokud nebyly již založeny (ve vlk.js)
window.hlidac.aktivace(); /* opětovně aktivuje ochranu před uspáním */
zamek.blok(); // aktivuje blokaci zámku obrazovky
window.onbeforeunload=()=>{return 'Chcete zavřít aplikaci Noční VLK?';}; // ochrana před náhodným uzavřením aplikace
uloz.obnovit_vlka(true); // spustí oživovací procesy Nočního VLKA spuštěné tlačítkem - hodnota TRUE - v ozivit.js
this.off(this.id[8]); /* vypne dialogové okno */
}


else if(k===this.ozit_dotaz[1]||k===this.ozit_dotaz[2])
{
/* Kliknuto na Křížek anebo Ne -  Oživit Nočního VLKa */
klik.hraj(false); // bude přehrávat zvuk 1x klik 
this.off(this.id[8]); /* vypne dialogové okno */
}

else if(k===this.usp[0]||k===this.usp[1])
{
/* Kliknuto na Rozumím anebo Kříž - Aplikace byla uspána  */
// window.hlidac.aktivace(); opětovně aktivuje ochranu před uspáním
zamek.blok(); /* aktivuje blokaci zámku obrazovky */
/* window.onbeforeunload=function(){return 'Chcete zavřít aplikaci Noční VLK?';};  ochrana před náhodným uzavřením aplikace */
uzamceni.jednou(); /* pokud bude aktivní zámek obrazovky - zobrazí, že je aplikace uzamčena */
klik.hraj(false); // bude přehrávat zvuk 1x klik 

if(window.tik.a_odpocet)
{
// pokud je zaplý odpočet intervalu do obchůzky hlavní funkce aplikace Noční VLK - proměnná v objektu TIK ve centrum.js
window.tik.cyklus_kon_platna=null; // vynuluje počítání cyklu kontroly výmazu plátna canvas v objektu TIK ve centrum.js
canvas_vymaz.hlidac=true;  // proměnná určuje jestli se hlídá vymazání plátna CANVAS se systémem obchůzek - pokud TRUE=hlídání je zapnuté, FALSE=HLÍDÁNÍ JE VYPNUTÉ - kontrolovat výmaz plátna canvas v objektu TIK ve centrum.js
}

this.off(this.id[3]); /* vypne dialogové okno */
}

else if(k===this.oziv[0])
{
/* Kliknuto na Rozumím - Některé fukce v aplikaci nebyly zastaveny  */
window.hlidac.aktivace(); /* opětovně aktivuje ochranu před uspáním */
zvuk.zaloz(); // založí audio mp3 v globálním objektu windows, pokud nebyly již založeny (ve vlk.js)
zamek.blok(); // aktivuje blokaci zámku obrazovky
window.onbeforeunload=()=>{return 'Chcete zavřít aplikaci Noční VLK?';}; // ochrana před náhodným uzavřením aplikace
pinkani.hraj(null); // přehraje zvuk pinkání 1 x - tento zvuk je kvůli inicializaci pinkání a jeho správnému fungování při uspání aplikace především pro systém iOS, parametr NULL slouží pro toto přehrávání
this.off(this.id[5]); // vypne dialogové okno


if(uloz.ozivit_planovac)
{
// pokud jsou dostupná data pro oživení Plánovače - ve oziv.js
this.on(this.id[16]); // zapne dialogové okno - Obnovení Plánovače
uloz.ozivit_planovac=""; // vynuluje proměnnou, již nebude potřeba, ať ji prohlížeč může vypustit z paměti
}
else if(uloz.ozivit_minutku)
{
// pokud jsou dostupná data pro oživení FUNKCE minutka  promněnná ve oziv.js
this.on(this.id[12]); // zapne dialogové okno - Obnovení funkce Minutka
uloz.ozivit_minutku=""; // vynuluje proměnnou, již nebude potřeba, ať ji prohlížeč může vypustit z paměti
}
else if(uloz.ozivit_vlka)
{
// pokud jsou dostupná data pro oživení hlavní fukce aplikace noční VLK promněnná ve oziv.js
this.on(this.id[6]); // zapne dialogové okno - Obnovení Nočního VLKa
uloz.ozivit_vlka=""; // vynuluje proměnnou, již nebude potřeba, ať ji prohlížeč může vypustit z paměti
}}

else if(k===this.oziv[3])
{
// Kliknuto na Obnovit - při spuštění aplikace - Funkce Plánovač
this.off(this.id[16]); /* vypne dialogové okno */
planovac.ozivit(); // zapne veškeré oživovací procesy k obnově plánů - v planovac.js
if(uloz.ozivit_minutku)
{
// pokud jsou dostupná data pro oživení FUNKCE minutka  promněnná ve oziv.js
this.on(this.id[12]); // zapne dialogové okno - Obnovení funkce Minutka
uloz.ozivit_minutku=""; // vynuluje proměnnou, již nebude potřeba, ať ji prohlížeč může vypustit z paměti
}
else if(uloz.ozivit_vlka)
{
// pokud jsou dostupná data pro oživení hlavní fukce aplikace noční VLK promněnná ve oziv.js
this.on(this.id[6]); // zapne dialogové okno - Obnovení Nočního VLKa
uloz.ozivit_vlka=""; // vynuluje proměnnou, již nebude potřeba, ať ji prohlížeč může vypustit z paměti
}}

else if(k===this.oziv[2])
{
// Kliknuto na Obnovit - při spuštění aplikace - Funkce MINUTKA

minutka.spustit(true); // spustí Funkci minutka, data pro obnovení již jsou nachystaná z minutka.ozivit v minutka.js

if(uloz.ozivit_vlka)
{
// pokud jsou dostupná data pro oživení hlavní fukce aplikace noční VLK promněnná ve oziv.js
this.on(this.id[6]); // zapne dialogové okno - Obnovení Nočního VLKa
uloz.ozivit_vlka=""; // vynuluje proměnnou, již nebude potřeba, ať ji prohlížeč může vypustit z paměti
}
this.off(this.id[12]); /* vypne dialogové okno */
}

else if(k===this.oziv[1])
{
/* Kliknuto na Obnovit - při spuštění aplikace - OŽIVENÍ NOČNÍHO VLKA  */
vlk.ozivit(); /* spustí oživovací procesy Nočního VLKA - ve vlk.js */
this.off(this.id[6]); /* vypne dialogové okno */
}

else if(k===this.kont)
{
/* Zavřít kontakt na programátora */
klik.hraj(false); // bude přehrávat zvuk 1x klik 
this.off(this.id[7]); /* vypne dialogové okno */
}

else if(k===this.minutka[0]||k===this.minutka[1])
{
/* Kliknuto na Křížek anebo Zrušit v Zadání Minutky  */
klik.hraj(false); // bude přehrávat zvuk 1x klik
this.off(this.id[9]); /* vypne dialogové okno a odebere posluchače */
}

else if(k===this.minutka_info[0])
{
// kliknuto na křížek dialogového okna informace o minutce
klik.hraj(false); // bude přehrávat zvuk 1x klik
this.off(this.id[10]); /* vypne dialogové okno informace o minutce a odebere posluchače */
}

else if(k===this.minutka_info[1])
{
// kliknuto na požadavek Zrušit minutku v informačním okně o minutce
klik.hraj(false); // bude přehrávat zvuk 1x klik
this.off(this.id[10]); /* vypne dialogové okno informace o minutce a odebere posluchače */
this.on(this.id[11]); /* zapne dialogové okno s dotazem, zda zrušit minutku a aktivuje posluchače */
}

else if(k===this.minutka_dotaz[0]||k===this.minutka_dotaz[2])
{
// kliknuto Křížek anebo NE dotazu Zrušit minutku
klik.hraj(false); // bude přehrávat zvuk 1x klik
this.off(this.id[11]); /* vypne dialogové okno s dotazem, zda zrušit minutku a aktivuje posluchače */
this.on(this.id[10]); /* zapne dialogové okno informace o minutce a odebere posluchače */
}

else if(k===this.minutka_dotaz[1])
{
// kliknuto na ANO dotazu Zrušit minutku
this.off(this.id[11]); /* vypne dialogové okno s dotazem, zda zrušit minutku a aktivuje posluchače */
minutka.zrusit(); // funkce vykoná veškeré procesy pro zrušení minutky, fnkce je v minutka.js
}


else if(k===minutka.id_check[1])
{
// klik na checked (zatrhávací políčko) Opakovat minutku po jejím ukončení - v Informačním dia okně minutky viz minutka.js
minutka.opakovat_zmena(e.target.checked); // funkce zajistí změny v proměnné a druhém checketu v informačním okně podle hodnoty, které v aktuálním checketu byla nastavena - v minutka.js
}

else if(k===this.planovac[0]||k===this.planovac[1])
{
/* Kliknuto na Zrušit anebo Kříž - Zadání Plánovač  */
klik.hraj(false); // bude přehrávat zvuk 1x klik 
this.off(this.id[4]); /* vypne dialogové okno se zadáním Plánovače */
}

else if(k===this.planovac_info[0])
{
// kliknuto na Křížek k informaci o konkrétním Plánu
klik.hraj(false); // bude přehrávat zvuk 1x klik 
this.off(this.id[13]); // zavře dialogové okno k informaci o konkrétním Plánu a odebere jeho posluchače
}

else if(k===this.planovac_info[1])
{
// kliknuto na Zrušit plán k informaci o konkrétním Plánu
klik.hraj(false); // bude přehrávat zvuk 1x klik 
this.off(this.id[13]); // zavře dialogové okno k informaci o konkrétním Plánu a odebere jeho posluchače
this.on(this.id[14]); // otevře dialogové okno s dotazem, zda chce uživatel zrušit konkrétní plán a přidá potřebné posluchače
}



else if(k===this.planovac_dotaz[0]||k===this.planovac_dotaz[2])
{
// kliknuto Křížek anebo Ne Zrušit konkrétní plán
klik.hraj(false); // bude přehrávat zvuk 1x klik 
this.off(this.id[14]); // zavře dialogové okno s dotazem, zda chce uživatel zrušit konkrétní plán a odebere posluchače událostí
this.on(this.id[13]); // otevře dialogové okno k informaci o konkrétním Plánu a přidá jeho posluchače
}

else if(k===this.planovac_dotaz[1])
{
// kliknuto na ANO - u dotazu zda si uživatel přeje zrušit konkrétní plán 
this.off(this.id[14]); // zavře dialogové okno s dotazem, zda chce uživatel zrušit konkrétní plán a odebere posluchače událostí
planovac.anuluj_plan(planovac.eduje_se); // funkce anuluje konkrétní plán, proměnná planovac.eduje_se určuje konkrétní plán, který byl editován viz panovac.js
planovac.ukoncit(planovac.eduje_se); // funkce zruší konkrétní plán, proměnná planovac.eduje_se určuje konkrétní plán, který byl editován viz panovac.js
gong.hraj(false); // zahraje GONG.mp3 - FALSE = 1x 
text.pis("Plán byl zrušen"); // text přes celou obrazovku
}

else if(k===this.planovac_max[0]||k===this.planovac_max[1])
{
// Kliknuto na Křížek anebo ROzumím u dialogového okna oznamující, že již byl zadán maximální počet Plánů
klik.hraj(false); // bude přehrávat zvuk 1x klik 
this.off(this.id[15]); // zavře dialogové okno s oznámením, že již byl zadán maximální počet Plánů a odebere posluchače událostí
}


else if(k===this.chyba_dia[0]||k===this.chyba_dia[1])
{
// Kliknuto na Křížek anebo ROzumím u dialogového okna oznamující, Problémy s místem na disku anebo paměťové kartě
klik.hraj(false); // bude přehrávat zvuk 1x klik 
this.off(this.id[17]); // zavře dialogové okno s oznámením, Problémy s místem na disku anebo paměťové kartě
}

else if(k===this.kolaps_dia[0]||k===this.kolaps_dia[1])
{
// Kliknuto na Křížek anebo ROzumím u dialogového okna: Kolaps aplikace
// pokud je zobrazena chyba o tom, že zařízení není v dostatečné kondici - canvas_vymaz.hlidac v ochrany.js
klik.hraj(false); // bude přehrávat zvuk 1x klik 
vlk.ozivit.kresly_system(obch.id_can); // znovu vykreslí HLAVNÍ plátno se systémem obchůzek v aktuálním stavu - funkce ve vlk.js
canvas_vymaz.hlidac=true;  // proměnná určuje jestli se hlídá vymazání plátna CANVAS se systémem obchůzek - pokud TRUE=hlídání je zapnuté, FALSE=HLÍDÁNÍ JE VYPNUTÉ - kontrolovat výmaz plátna canvas v objektu TIK ve centrum.js 
this.off(this.id[18]); // zavře dialogové okno s oznámením: Kolaps aplikace
}

},
posON(id){
// posluchače k tlačítkům Dialogových oken

if(id===this.id[0])
{
/* tlačítka dotazu: Zastavit Nočního VLKa */
let l=this.zas.length; /* délka řetězce */
for(let i=0;i<l;i++)
{
document.getElementById(this.zas[i]).addEventListener("click",this);
}}

else if(id===this.id[1])
{
/* tlačítka dotazu: Provést obchůzku teď ? */
let l=this.obch.length;
for(let i=0;i<l;i++)
{
document.getElementById(this.obch[i]).addEventListener("click",this);
}}

else if(id===this.id[2])
{
/* tlačítka dotazu: Provést obchůzku MAX ? */
let l=this.obchM.length;
for(let i=0;i<l;i++)
{
document.getElementById(this.obchM[i]).addEventListener("click",this);
}}

else if(id===this.id[3])
{
/* tlačítka upozornění : Aplikace byla uspána */
let l=this.usp.length;
for(let i=0;i<l;i++)
{
document.getElementById(this.usp[i]).addEventListener("click",this);
}}

else if(id===this.id[4])
{
/* tlačítka spustit Plánovač  */
let l=this.planovac.length; // délka pole
for(let i=0;i<l;i++)
{
document.getElementById(this.planovac[i]).addEventListener("click",this); // tlačítka Křížek a Zrušit
}
planovac.posON_spust(); // zapne posluchače událostí všech inputů a tlačítka Spustit v spouštění Plánovače - v planovac.js
}

else if(id===this.id[5])
{
// tlačítko Noční VLK nebyl zastaven
// důvodem tohoto dialogového okna je hlavně zvýšení interakce uživatele s aplikací po oživení obnovením okna aplikace
document.getElementById(this.oziv[0]).addEventListener("click",this);
}

else if(id===this.id[6])
{
/* tlačítko Noční VLK bude oživen */
document.getElementById(this.oziv[1]).addEventListener("click",this);
}

else if(id===this.id[7])
{
/* tlačítko Kontak na programátora */
mail.posluchac(); /* aktivuje posluchač emailu */
klik.hraj(false); // bude přehrávat zvuk 1x klik 
setTimeout("document.getElementById('nad-kon').scrollIntoView({behavior:'smooth'});",250); /* scrool k nadpisu */
document.getElementById(this.kont).addEventListener("click",this); /* aktivuje posluchač k buttonu v dia oknu Zavřít kontakt */
}

else if(id===this.id[8])
{
/* Dialogové okna s dotazem Oživit Nočního VLKa? ANO-NE */
let l=this.ozit_dotaz.length;
for(let i=0;i<l;i++)
{
document.getElementById(this.ozit_dotaz[i]).addEventListener("click",this); // přidání posluchačů událostí k dotazu dialogového okna
}}

else if(id===this.id[9])
{
/* posluchače událostí pro zadání minutky */
let l=this.minutka.length;
for(let i=0;i<l;i++)
{
document.getElementById(this.minutka[i]).addEventListener("click",this); // přidání posluchačů událostí k Zadání minutky, pouze Křížek a Zrušit minutku
}
minutka.posON_zadani(); // aktivace posluchačů pro zadání minutky v minutka.js
}


else if(id===this.id[10])
{
/* tlačítko odpočet minutky - vizuální zobrazení - button anebo klik na inkonku minutky, když už je spuštěna */
let l=this.minutka_info.length;
for(let i=0;i<l;i++)
{
document.getElementById(this.minutka_info[i]).addEventListener("click",this); // přidání posluchačů událostí k informacím minutky, pouze Křížek a Zrušit minutku
}
document.getElementById(minutka.id_check[1]).addEventListener("input",this); // pro checked (zatrhávací políčko) Opakovat minutku po jejím ukončení v informačním okně o minutce
}


else if(id===this.id[11])
{
// tlačítka dotaz na zrušení minutky - Křížek, ANO,NE
let l=this.minutka_dotaz.length;
for(let i=0;i<l;i++)
{
document.getElementById(this.minutka_dotaz[i]).addEventListener("click",this); // přidání posluchačů událostí k dotazu zrušení minutky
}
}

else if(id===this.id[12])
{
// tlačítka oznámení, že bude obnovena funkce Minutky
document.getElementById(this.oziv[2]).addEventListener("click",this);
}

else if(id===this.id[13])
{
// tlačítka Křížek a Zrušit Plán k dialogovému oknu informace o konkrétním Plánu
let l=this.planovac_info.length;
for(let i=0;i<l;i++)
{
document.getElementById(this.planovac_info[i]).addEventListener("click",this); // přidání posluchačů událostí k informaci o konkrétním plánu Křížek + button Zrušit plán
}
planovac.nas_posON(); // přidá posluchače pro nastavení konkrétního Plánu (checked boxi) - v planovac.js
}

else if(id===this.id[14])
{
// tlačítka Křížek, ANO-NE Dotaz zrušit konkrétní plán
let l=this.planovac_dotaz.length;
for(let i=0;i<l;i++)
{
document.getElementById(this.planovac_dotaz[i]).addEventListener("click",this); // přidání posluchačů událostí k dotazu zda chce uživatel zrušit konkrétní Plán - Křížek, ANO-NE
}}

else if(id===this.id[15])
{
// tlačítka Křížek, Rozumím - Oznámení, že již byl zadán maximální počet plánů
let l=this.planovac_max.length;
for(let i=0;i<l;i++)
{
document.getElementById(this.planovac_max[i]).addEventListener("click",this); // přidání posluchačů událostí k dotazu zda chce uživatel zrušit konkrétní Plán - Křížek, ANO-NE
}}

else if(id===this.id[16])
{
// tlačítko oznámení, že bude obnovena funkce Plánovač
document.getElementById(this.oziv[3]).addEventListener("click",this);
}

else if(id===this.id[17])
{
// tlačítka Křížek, Rozumím - Chybová hláška problémy s místem na disku anebo paměťové kartě
let l=this.chyba_dia.length;
for(let i=0;i<l;i++)
{
document.getElementById(this.chyba_dia[i]).addEventListener("click",this); // přidání posluchačů událostí: Křížek, Rozumím - Chybová hláška problémy s místem na disku anebo paměťové kartě
}}

else if(id===this.id[18])
{
// tlačítka Křížek, Rozumím - Chybová hláška: Kolaps aplikace
let l=this.kolaps_dia.length;
for(let i=0;i<l;i++)
{
document.getElementById(this.kolaps_dia[i]).addEventListener("click",this); // přidání posluchačů událostí: Křížek, Rozumím - Chybová hláška: Kolaps aplikace
}}

},
posOFF(id){
// odebírání posluchačů událostí k Dialogovým oknům


if(id===this.id[0])
{
/* tlačítka dotazu: Zastavit Nočního VLKa */
let l=this.zas.length;
for(let i=0;i<l;i++)
{
document.getElementById(this.zas[i]).removeEventListener("click",this);
}}

else if(id===this.id[1])
{
/* tlačítka dotazu: Provést obchůzku teď? */
let l=this.obch.length;
for(let i=0;i<l;i++)
{
document.getElementById(this.obch[i]).removeEventListener("click",this);
}}

else if(id===this.id[2])
{
/* tlačítka dotazu: Provést MAX obchůzku */
let l=this.obchM.length;
for(let i=0;i<l;i++)
{
document.getElementById(this.obchM[i]).removeEventListener("click",this);
}}

else if(id===this.id[3])
{
/* tlačítka upozornění : Aplikace byla uspána */
let l=this.usp.length;
for(let i=0;i<l;i++)
{
document.getElementById(this.usp[i]).removeEventListener("click",this);
}}

else if(id===this.id[4])
{
/* tlačítka dialogového okna Spustit Plánovač */
let l=this.planovac.length;
for(let i=0;i<l;i++)
{
document.getElementById(this.planovac[i]).removeEventListener("click",this); // odebere posluchače Křížek a Zrušit v dialogovém oknu
}
planovac.posOFF_spust(); // vypne posluchače událostí všech inputů a tlačítka Spustit v spouštění Plánovače - v planovac.js
}

else if(id===this.id[5])
{
/* tlačítko Noční VLK nebyl zastaven */
document.getElementById(this.oziv[0]).removeEventListener("click",this);
}

else if(id===this.id[6])
{
/* tlačítko Noční VLK bude oživen */
document.getElementById(this.oziv[1]).removeEventListener("click",this);
}

else if(id===this.id[7])
{
/* tlačítka Kontak  */
document.getElementById(this.kont).removeEventListener("click",this);
}

else if(id===this.id[8])
{
/* Dialogové okna s dotazem Oživit Nočního VLKa? ANO-NE */
let l=this.ozit_dotaz.length;
for(let i=0;i<l;i++)
{
document.getElementById(this.ozit_dotaz[i]).removeEventListener("click",this); // odebrání posluchačů událostí k dotazu dialogového okna
}}

else if(id===this.id[9])
{
/* tlačítko MINUTKA */
let l=this.minutka.length;
for(let i=0;i<l;i++)
{
document.getElementById(this.minutka[i]).removeEventListener("click",this); // odebrání posluchačů událostí k Zadání Minutka, pouze Křížek a Zrušit minutku
}
minutka.posOFF_zadani(); // DEaktivace posluchačů pro zadání minutky v minutka.js
}

else if(id===this.id[10])
{
/* posluchače událostí pro informace o minutce */
let l=this.minutka_info.length;
for(let i=0;i<l;i++)
{
document.getElementById(this.minutka_info[i]).removeEventListener("click",this); // odebrání posluchačů událostí k informacím minutky, pouze Křížek a Zrušit minutku
}
document.getElementById(minutka.id_check[1]).removeEventListener("input",this); // pro checked (zatrhávací políčko) Opakovat minutku po jejím ukončení v informačním okně o minutce
}

else if(id===this.id[11])
{
// tlačítka dotaz na zrušení minutky - Křížek, ANO,NE
let l=this.minutka_dotaz.length;
for(let i=0;i<l;i++)
{
document.getElementById(this.minutka_dotaz[i]).removeEventListener("click",this); // odebrání posluchačů událostí k dotazu zrušení minutky
}
}

else if(id===this.id[12])
{
// tlačítka oznámení, že bude obnovena funkce Minutky
document.getElementById(this.oziv[2]).removeEventListener("click",this);
}

else if(id===this.id[13])
{
// tlačítka Křížek a Zrušit Plán k dialogovému oknu informace o konkrétním Plánu
let l=this.planovac_info.length;
for(let i=0;i<l;i++)
{
document.getElementById(this.planovac_info[i]).removeEventListener("click",this); // odebere posluchačů událostí k informaci o konkrétním plánu Křížek + button Zrušit plán
}
planovac.nas_posOFF(); // odebere posluchače pro nastavení konkrétního Plánu (checked boxi) - v planovac.js
}

else if(id===this.id[14])
{
// tlačítka Křížek, ANO-NE Dotaz zrušit konkrétní plán
let l=this.planovac_dotaz.length;
for(let i=0;i<l;i++)
{
document.getElementById(this.planovac_dotaz[i]).removeEventListener("click",this); // odebere posluchačů událostí k dotazu zda chce uživatel zrušit konkrétní Plán - Křížek, ANO-NE
}}

else if(id===this.id[15])
{
// tlačítka Křížek, Rozumím - Oznámení, že již byl zadán maximální počet plánů
let l=this.planovac_max.length;
for(let i=0;i<l;i++)
{
document.getElementById(this.planovac_max[i]).removeEventListener("click",this); // odebrání posluchačů událostí k dotazu zda chce uživatel zrušit konkrétní Plán - Křížek, ANO-NE
}}

else if(id===this.id[16])
{
// tlačítko oznámení, že bude obnovena funkce Plánovač
document.getElementById(this.oziv[3]).removeEventListener("click",this);
}

else if(id===this.id[17])
{
// tlačítka Křížek, Rozumím - Chybová hláška problémy s místem na disku anebo paměťové kartě
let l=this.chyba_dia.length;
for(let i=0;i<l;i++)
{
document.getElementById(this.chyba_dia[i]).removeEventListener("click",this); // odebere posluchačů událostí: Křížek, Rozumím - Chybová hláška problémy s místem na disku anebo paměťové kartě
}}

else if(id===this.id[18])
{
// tlačítka Křížek, Rozumím - Chybová hláška: Kolaps aplikace
let l=this.kolaps_dia.length;
for(let i=0;i<l;i++)
{
document.getElementById(this.kolaps_dia[i]).removeEventListener("click",this); // odebrání posluchačů událostí: Křížek, Rozumím - Chybová hláška: Kolaps aplikace
}}

},
on(id){
/* otevření dialogového okna */

const okno=document.getElementById(id);
okno.showModal(); /* otevře dialogové okno */
this.posON(id); /* zapne posluchače k dialogovému oknu */
this.aktivni=id; /* zapíše do proměnné, aktivní dialogové okno */

},
off(id){
/* zavření dialogového okna */
dia.posOFF(id); /* vypne posluchače událostí k Dialogovému oknu */
const okno=document.getElementById(id);
okno.close(); /* zavře dialogové okno */
this.aktivni=""; /* vynuluje proměnnou, která udává aktivní dialogové okno */
},
vyp_akt(){
/* funkce vypne právě aktivní dialogové okno */

if(this.aktivni===this.id[6]||this.aktivni===this.id[12]||this.aktivni===this.id[16]||this.aktivni===this.id[18])
{
// pokud je právě aktivní okno this.id[6] - Oznámení o obnovení Nočního VLKa, this.id[12] - Oznámení o obnovení funkce Minutka anebo this.id[16] - Oznámení o obnovení funkce Minutka --- k vypnutí těchto dialogových oken nesmí nikdy dojít a tak bude následovat return - this.id[18] - Upozornění - Kolaps aplikace
return; // funkce bude v tomto místě ukončena
}


if(this.aktivni!=="")
{
/* pokud bude aktivní dialogové okno - zavře se! */
this.off(this.aktivni); // vypne posluchače dialogového okna
}

}};

const text={kon:"i-box",box_an:"i-an",p_id:"i-text",aktivni:false,TIME:4500,

pis(zobrazit_text){
/* funkce vytvoří text přes celou obrazovku s informací */
this.aktivni=true; /* informuje Visulawievport API o aktivaci okna */
v_port.prepocet(); // aktivuje přepočet velikosti okna podle Visual viewport - v centrum.js
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

const obrazovka={
zmen(jak){
// funkce zajišťuje změnu polohy aplikace

const min_vyska=590; // výška min-okno
const min_sirka=260; // šířka okna min-vlevo a min-vpravo a min-okno
const a_sirka=320; // šířka okna vlevo a vpravo
const cool=820; // výška a šířka cool okna
const d_vyska=parseInt(window.screen.availHeight); // Dostupná výška obrazovky
const d_sirka=parseInt(window.screen.availWidth); // Dostupná šířka obrazovky
const top=parseInt(window.screen.availTop); // Dostupné horní umístění na obrazovce
const left=parseInt(window.screen.availLeft); // Dostupné levé umístění na obrazovce
let kotva="hl-kon"; // id kotvy 1 pro scrool
let kotva2="k-h"; // id kotvy 2 pro scroll

klik.hraj(false); // bude přehrávat zvuk 1x klik

let [Nleft,Ntop,Nsirka,Nvyska]=[0,0,0,0]; // parametry okna, které se budou měnit podle volby uživatele

if(jak==="vl")
{
// okno vlevo
Nleft=left;
Ntop=top;
Nsirka=a_sirka;
Nvyska=d_vyska;
}
else if(jak==="vlm")
{
// vlevo mini
Nleft=left;
Ntop=top;
Nsirka=min_sirka;
Nvyska=d_vyska;
}
else if(jak==="min")
{
// mini okno
Nleft=left;
Ntop=top;
Nsirka=min_sirka;
Nvyska=min_vyska;
kotva=kotva2; // id kotva 2 pro scroll
}
else if(jak==="cool")
{
// cool okno
if(cool<d_vyska)
{
Nleft=(d_sirka-cool)/2;
Ntop=(d_vyska-cool)/2;
Nsirka=cool;
Nvyska=cool;
}
else
{
Nleft=(d_sirka-cool)/2;
Ntop=top;
Nsirka=cool;
Nvyska=d_vyska;
}}
else if(jak==="cel")
{
// celé okno
Nleft=left;
Ntop=top;
Nsirka=d_sirka;
Nvyska=d_vyska;
}
else if(jak==="pln")
{
// plné okno
document.documentElement.requestFullscreen(); // zapne režim full screen
setTimeout(`document.getElementById("${kotva}").scrollIntoView({behavior:"smooth"});`,this.TIME); // udělá scrool na kotvu
return;
}
else if(jak==="vpm")
{
// vpravo mini okno
Nleft=d_sirka-min_sirka;
Ntop=top;
Nsirka=min_sirka;
Nvyska=d_vyska;
}
else if(jak==="vp")
{
// vpravo okno
Nleft=d_sirka-a_sirka;
Ntop=top;
Nsirka=a_sirka;
Nvyska=d_vyska;
}
window.resizeTo(Nsirka,Nvyska); // změna velikosti okna
setTimeout(()=>{
window.moveTo(Nleft,Ntop); // posun okna
},50); // drobné zpoždění
setTimeout(`document.getElementById("${kotva}").scrollIntoView({behavior:"smooth"});`,200); // scroll na kotvu - drobné zpoždění
},
podpora_resizeTo_moveTo()
{
// funkce kontroleje jestli je aplikace spuštěna na mobilním zařízení a nebo není
return /Mobi|Android|iPad|iPhone/.test(navigator.userAgent); // pokud se jedná o mobilní zařízení anebo table vrací TRUE
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

const p_nas={id_blok:"n-i-blok",id:"nastaveni",
id_nas:["k-nas","in-plus1-n","in-minus1-n","vlk_z","minutka_z","planovac_z","poloha_z","vlk_rec"], // id tlačítek v nastavení
id_zvuk_vlk:["bns1","bns2","bns3","bns4"], // id tlačítek nastavení zvuku Nočního VLKa
id_zvuk_minutka:["bns1m","bns2m","bns3m","bns4m"], // id tlačítek nastavení zvuku Minutky
id_zvuk_planovac:["bns1p","bns2p","bns3p","bns4p","bns5p","bns6p"], // id tlačítek nastavení zvuku Plánovač
id_SVG:["in-plus2-n","in-minus2-n","s-nas"],
id_level:"i-l-n",
id_in:["i-15-n","i-30-n","i-60-n","i-120-n"],
id_in_r:["ir-15-n","ir-30-n","ir-60-n","ir-120-n"],
id_cast:["int-15-n","int-30-n","int-60-n","int-120-n"], /* posluchače událostí pro nastavení */

a(){
this.On(); /* aktivuje posluchače */
zvuk.barvy(this.id_zvuk_vlk); // obarví tlačítka Volba zvuku alarmu Noční VLK - podle toho jaký je zvolený - ve vlk.js
zvuk_min.barvy(this.id_zvuk_minutka); // obarví tlačítka Volba zvuku alarmu Minutka - podle toho jaký je zvolený - ve vlk.js
zvuk_plan.barvy(this.id_zvuk_planovac); // obarví tlačítka Volba zvuku alarmu Plánovač - podle toho jaký je zvolený - ve vlk.js
},
On(){
let l1=this.id_nas.length;
for(let i=0;i<l1;i++)
{
document.getElementById(this.id_nas[i]).addEventListener("click",this);
}

let l2=this.id_zvuk_vlk.length;
for(let i=0;i<l2;i++)
{
document.getElementById(this.id_zvuk_vlk[i]).addEventListener("click",this); // přidá posluchače k terčíkum 1-5 volby zvuku pro Nočního VLKa
}

let l3=this.id_zvuk_minutka.length;
for(let i=0;i<l3;i++)
{
document.getElementById(this.id_zvuk_minutka[i]).addEventListener("click",this); // přidá posluchače k terčíkum 1-5 volby zvuku pro Minutku
}

let l4=this.id_zvuk_planovac.length;
for(let i=0;i<l4;i++)
{
document.getElementById(this.id_zvuk_planovac[i]).addEventListener("click",this); // přidá posluchače k terčíkum 1-5 volby zvuku pro Plánovač
}

},

Off(){
// vypne posluchače k sekci Nastavení
let l1=this.id_nas.length;
for(let i=0;i<l1;i++)
{
document.getElementById(this.id_nas[i]).removeEventListener("click",this);
}

let l2=this.id_zvuk_vlk.length;
for(let i=0;i<l2;i++)
{
document.getElementById(this.id_zvuk_vlk[i]).removeEventListener("click",this); // odebere posluchače k terčíkum 1-5 volby zvuku pro Nočního VLKa
}

let l3=this.id_zvuk_minutka.length;
for(let i=0;i<l3;i++)
{
document.getElementById(this.id_zvuk_minutka[i]).removeEventListener("click",this); // odebere posluchače k terčíkum 1-5 volby zvuku pro Minutku
}

let l4=this.id_zvuk_planovac.length;
for(let i=0;i<l4;i++)
{
document.getElementById(this.id_zvuk_planovac[i]).removeEventListener("click",this); // odebere posluchače k terčíkum 1-5 volby zvuku pro Plánovač
}


},
handleEvent(e){
const k=e.target.id; /* zjistí ID prvku na který bylo kliknuto */

if(k===this.id_nas[0]||k===this.id_SVG[2])
{
// kliknuti na Křížek - zavřít Nastavení
klik.hraj(false); // bude přehrávat zvuk 1x klik 
hl_kon.otevri(this.id);
this.Off();
}
else if(k===this.id_nas[1]||k===this.id_SVG[0])
{
klik.hraj(false); // bude přehrávat zvuk 1x klik 
pruvodce.inter("plus"); // zvýší interval do obchůzky - průvodce.js
uloz.osoba(); /* uloží na localstorage data z objektu osoba (v pruvodce.js), tato funkce je v ozivit.js */
}
else if(k===this.id_nas[2]||k===this.id_SVG[1])
{
klik.hraj(false); // bude přehrávat zvuk 1x klik 
pruvodce.inter("minus"); // sníží interval do bchůzky
uloz.osoba(); /* uloží na localstorage data z objektu osoba (v pruvodce.js), tato funkce je v ozivit.js */
}
else if(k===this.id_zvuk_vlk[0])
{
/* klik - volba zvuk alarmu Noční VLK - 1 */
zvuk.volba(0,this.id_zvuk_vlk); // změna zvuku na zvuk 1 - ve vlk.js - jako parametr se posílá: číslo zvuku a pole s id prvky
uloz.uloz(uloz.klice[10],0); /* uloží volbu zvuku uživatele na LocalStorage - v ozivit.js */
}
else if(k===this.id_zvuk_vlk[1])
{
/* klik - volba zvuk alarmu Noční VLK - 2 */
zvuk.volba(1,this.id_zvuk_vlk); /* změna zvuku na zvuk 1 - ve vlk.js  */
uloz.uloz(uloz.klice[10],1); /* uloží volbu zvuku uživatele na LocalStorage - v ozivit.js */
}
else if(k===this.id_zvuk_vlk[2])
{
/* klik - volba zvuk alarmu Noční VLK - 3 */
zvuk.volba(2,this.id_zvuk_vlk);
uloz.uloz(uloz.klice[10],2); /* uloží volbu zvuku uživatele na LocalStorage - v ozivit.js */
}
else if(k===this.id_zvuk_vlk[3])
{
/* klik - volba zvuk alarmu Noční VLK - 4 */
zvuk.volba(3,this.id_zvuk_vlk);
uloz.uloz(uloz.klice[10],3); /* uloží volbu zvuku uživatele na LocalStorage - v ozivit.js */
}
else if(k===this.id_nas[3])
{
/* klik - Zesilovat zvuk alarmu Nočního VLKa */
klik.hraj(false); // bude přehrávat zvuk 1x klik 
if(document.getElementById(this.id_nas[3]).checked==true)
{
/* pokud bude Zašktnuto pole */
zvuk.zesilovat=true; /* nastaví proměnnou na postupné zesilování - ve vlk.js */
uloz.uloz(uloz.klice[11],"true"); /* uloží volbu zvuku uživatele na LocalStorage - v ozivit.js */
}
else if(document.getElementById(this.id_nas[3]).checked==false)
{
/* pokud NEbude Zašktnuto pole */
zvuk.zesilovat=false; /* nastaví proměnnou na Zakázat postupné zesilování - ve vlk.js */
uloz.uloz(uloz.klice[11],"false"); /* uloží volbu zvuku uživatele na LocalStorage - v ozivit.js */
}
}


else if(k===this.id_zvuk_minutka[0])
{
/* klik - volba zvuk alarmu Minutka - 1 */
zvuk_min.volba(0,this.id_zvuk_minutka); // změna zvuku na zvuk 1 - ve vlk.js - jako parametr se posílá: číslo zvuku a pole s id prvky
uloz.uloz(uloz.klice[13],0); /* uloží volbu zvuku uživatele na LocalStorage - v ozivit.js */
}
else if(k===this.id_zvuk_minutka[1])
{
/* klik - volba zvuk alarmu Minutka - 2 */
zvuk_min.volba(1,this.id_zvuk_minutka); /* změna zvuku na zvuk 1 - ve vlk.js  */
uloz.uloz(uloz.klice[13],1); /* uloží volbu zvuku uživatele na LocalStorage - v ozivit.js */
}
else if(k===this.id_zvuk_minutka[2])
{
/* klik - volba zvuk alarmu Minutka - 3 */
zvuk_min.volba(2,this.id_zvuk_minutka);
uloz.uloz(uloz.klice[13],2); /* uloží volbu zvuku uživatele na LocalStorage - v ozivit.js */
}
else if(k===this.id_zvuk_minutka[3])
{
/* klik - volba zvuk alarmu Minutka - 4 */
zvuk_min.volba(3,this.id_zvuk_minutka);
uloz.uloz(uloz.klice[13],3); /* uloží volbu zvuku uživatele na LocalStorage - v ozivit.js */
}
else if(k===this.id_nas[4])
{
/* klik - Zesilovat zvuk alarmu Minutka */
klik.hraj(false); // bude přehrávat zvuk 1x klik 
if(document.getElementById(this.id_nas[4]).checked===true)
{
/* pokud bude Zašktnuto pole */
zvuk_min.zesilovat=true; /* nastaví proměnnou na postupné zesilování - ve vlk.js */
uloz.uloz(uloz.klice[14],"true"); //  uloží volbu zesilování zvuku uživatele na LocalStorage - v ozivit.js
}
else if(document.getElementById(this.id_nas[4]).checked===false)
{
/* pokud NEbude Zašktnuto pole */
zvuk_min.zesilovat=false; /* nastaví proměnnou na Zakázat postupné zesilování - ve vlk.js */
uloz.uloz(uloz.klice[14],"false"); //  uloží volbu zesilování zvuku uživatele na LocalStorage - v ozivit.js
}
}


else if(k===this.id_zvuk_planovac[0])
{
/* klik - volba zvuk alarmu Plánovač - 1 */
zvuk_plan.volba(0,this.id_zvuk_planovac); // změna zvuku na zvuk 1 - ve vlk.js - jako parametr se posílá: číslo zvuku a pole s id prvky
uloz.uloz(uloz.klice[20],0); /* uloží volbu zvuku uživatele na LocalStorage - v ozivit.js */
}
else if(k===this.id_zvuk_planovac[1])
{
/* klik - volba zvuk alarmu Plánovač - 2 */
zvuk_plan.volba(1,this.id_zvuk_planovac); /* změna zvuku na zvuk 1 - ve vlk.js  */
uloz.uloz(uloz.klice[20],1); /* uloží volbu zvuku uživatele na LocalStorage - v ozivit.js */
}
else if(k===this.id_zvuk_planovac[2])
{
/* klik - volba zvuk alarmu Plánovač - 3 */
zvuk_plan.volba(2,this.id_zvuk_planovac);
uloz.uloz(uloz.klice[20],2); /* uloží volbu zvuku uživatele na LocalStorage - v ozivit.js */
}
else if(k===this.id_zvuk_planovac[3])
{
/* klik - volba zvuk alarmu Plánovač - 4 */
zvuk_plan.volba(3,this.id_zvuk_planovac);
uloz.uloz(uloz.klice[20],3); /* uloží volbu zvuku uživatele na LocalStorage - v ozivit.js */
}
else if(k===this.id_zvuk_planovac[4])
{
/* klik - volba zvuk alarmu Plánovač - 5 */
zvuk_plan.volba(4,this.id_zvuk_planovac);
uloz.uloz(uloz.klice[20],4); /* uloží volbu zvuku uživatele na LocalStorage - v ozivit.js */
}
else if(k===this.id_zvuk_planovac[5])
{
/* klik - volba zvuk alarmu Plánovač - 6 */
zvuk_plan.volba(5,this.id_zvuk_planovac);
uloz.uloz(uloz.klice[20],5); /* uloží volbu zvuku uživatele na LocalStorage - v ozivit.js */
}
else if(k===this.id_nas[5])
{
/* klik - Zesilovat zvuk alarmu Plánovač */
klik.hraj(false); // bude přehrávat zvuk 1x klik 
if(document.getElementById(this.id_nas[5]).checked===true)
{
/* pokud bude Zašktnuto pole */
zvuk_plan.zesilovat=true; /* nastaví proměnnou na postupné zesilování - ve vlk.js */
uloz.uloz(uloz.klice[21],"true"); //  uloží volbu zesilování zvuku uživatele na LocalStorage - v ozivit.js
}
else if(document.getElementById(this.id_nas[5]).checked===false)
{
/* pokud NEbude Zašktnuto pole */
zvuk_plan.zesilovat=false; /* nastaví proměnnou na Zakázat postupné zesilování - ve vlk.js */
uloz.uloz(uloz.klice[21],"false"); //  uloží volbu zesilování zvuku uživatele na LocalStorage - v ozivit.js
}
}
else if(k===this.id_nas[6])
{
// klik na checked Zobrazit sekci Poloha aplikace
klik.hraj(false); // bude přehrávat zvuk 1x klik 
if(e.target.checked)
{
// pokud bude po kliku Checkedbox - zatržen = bude true
document.getElementById(hl_kon.id_sek_poloha).style.display="block"; // zobrazí panel pro sekci Poloha aplikace 
}
else
{
// pokud NEbude po kliku Checkedbox - zatržen = bude false
document.getElementById(hl_kon.id_sek_poloha).style.display="none"; // schová panel pro sekci Poloha aplikace 
}
}
else if(k===this.id_nas[7])
{
// klik na checked Hlasové navádění na obchůzky pomocí řeči
klik.hraj(false); // bude přehrávat zvuk 1x klik 
if(document.getElementById(this.id_nas[7]).checked===true)
{
// pokud je checked zatržen
zvuk.hlasove_navadeni=true; // dá proměnou na true, což znamená, že bude při přehrávání zvuku alarmu pouštět hlasové navádění na konkrétní obchůzku (řeč), proměnná je v vlk.js
uloz.uloz(uloz.klice[24],"true");  //  uloží volbu Hlasového navádění na LocalStorage - v ozivit.js
}
else if (document.getElementById(this.id_nas[7]).checked===false)
{
// pokud není checked zatržen
zvuk.hlasove_navadeni=false; // dá proměnou na false, což znamená, že nebude při přehrávání zvuku alarmu pouštět hlasové navádění na konkrétní obchůzku (řeč), proměnná je v vlk.js
uloz.uloz(uloz.klice[24],"false");  //  uloží volbu Hlasového navádění na LocalStorage - v ozivit.js
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

if(k===this.id_ob[0]||k===this.id_svg[0])
{
/* kliknuti na Křížek - Zvařít Sekci Obchůzky */
klik.hraj(false); // bude přehrávat zvuk 1x klik 
hl_kon.otevri(this.id); // zavře sekci Obchůzky a otevře hlavní kontejner aplikace
this.Off(); // vypne posluchače událostí pro sekci Obchůzky
document.getElementById(this.id_but).style.opacity=0.5; /* tlačítko Obnovit obchůzky bude 50% krytí */
document.getElementById(this.id_but).disabled=true; /* zablokuje tlačítko Obnovit obchůzky */
}


else if(k===this.id_but)
{
/* kliknuti na Obnovit obchůzky uložené aplikací */

let test=this.kon(); /* kontrola, jestli data ve formulářích jsou stejná jako data uložená na localstorage */
if(test===false)
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

else if(k===obch.id_f[0]||k===obch.id_f[1]||k===obch.id_f[2]||k===obch.id_f[3])
{
/* pokud dojde k interakci formuláře a uživatele */
setTimeout(this.kon.bind(this),250); /* Provede kontrolu změny ve formulářích -  zpoždění musí být */
}},

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

if(ud15===""&&ud30===""&&ud60===""&&ud120==="")
{
/* pokud budou veškeré uložené obchůzky prázdné anebo nebudou žádné uložené obchůzky */
document.getElementById(this.id_but).style.opacity=0.5; /* tlačítko Obnovit obchůzky bude 50% */
document.getElementById(this.id_but).disabled=true; /* zablokuje tlačítko Obnovit obchůzky */
return false;
}

if(df15!==ud15||df30!==ud30||df60!==ud60||df120!==ud120)
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
this.zhasni();  /* nechá pouze tmavou obrazovku */
this.pON(); /* aktivuje posluchače událostí */
if(minutka.aktivni)
{
// pokud bude minutka aktivní, vše v minutka.js
document.getElementById(minutka.id_box_uk).style.opacity=0; // schová box pro odpočet minutky (box obsahuje: vizuální odpočet + prvky na ukončení), v minutka.js
}
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
if(minutka.aktivni)
{
// pokud bude minutka aktivní, vše v minutka.js
document.getElementById(minutka.id_box_uk).style.opacity=1; // zobrazí box pro odpočet minutky (box obsahuje: vizuální odpočet + prvky na ukončení), v minutka.js
}
},
zhasni(){
clearTimeout(this.casovac);
// filter: brightness(90%);
this.casovac=setTimeout(`document.getElementById("${this.id}").style.opacity=0;`,this.TIME);  /* nechá pouze tmavou obrazovku */
},
jednou(){
if(document.getElementById(this.id).style.display!=="flex")
{
return; /* pokud nebude zámek obrazovky na obrazovce, bude return */
}
document.getElementById(this.id).style.opacity=1;
uzamceni.zhasni();
}};


const pol_menu={
id:["navod","funkce","o-aplikaci"], // id jednotlivých oken menu: Návod, Funkce, O aplikaci
id_k:["k-nav","s-nav","k-fun","s-fun","k-o-ap","s-o-ap"], // id button a svg křížků jednotlivých oken menu: Návod, Funkce, O aplikaci
a(){
// funkce aktivuje posluchče událostí ke všem křížkům oken menu: Návod, Funkce, O aplikaci
klik.hraj(false); // bude přehrávat zvuk 1x klik

let l=this.id_k.length; // délka řetězce id, na který bude připnut posluchač
for(let i=0;i<l;i++)
{
// přiřazení posluchačů všem id pole 
document.getElementById(this.id_k[i]).addEventListener("click",this); // připojí posluchač události ke každému id prvku v poli
}},
deaktivace(){
// funkce DEaktivuje posluchče událostí ke všem křížkům oken menu: Návod, Funkce, O aplikaci

let l=this.id_k.length; // délka řetězce id, na který bude připnut posluchač
for(let i=0;i<l;i++)
{
// přiřazení posluchačů všem id pole 
document.getElementById(this.id_k[i]).removeEventListener("click",this); // připojí posluchač události ke každému id prvku v poli
}},
handleEvent(e){
// funkce reaguje na kliknutí na Křížek Zavřít okno u všech oken menu: Návod, Funkce, O aplikaci
this.deaktivace(); // vypne veškeré posluchače událostí u všech oken menu: Návod, Funkce, O aplikaci
klik.hraj(false); // bude přehrávat zvuk 1x klik 
const k=e.target.id; // zjistí id prvku na který bylo kliknuto
if(k===this.id_k[0]||k===this.id_k[1])
{
// kliknuto na křížek Zavřít Návod
hl_kon.otevri(this.id[0]); // otevře hlavní kontajner a zavře Návod - (ID okna, které má být zavřeno)
}
else if(k===this.id_k[2]||k===this.id_k[3])
{
// kliknuto na křížek Zavřít Funkce
hl_kon.otevri(this.id[1]); // otevře hlavní kontajner a zavře Funkce - (ID okna, které má být zavřeno)
}else if(k===this.id_k[4]||k===this.id_k[5])
{
// kliknuto na křížek Zavřít O aplikaci
hl_kon.otevri(this.id[2]); // otevře hlavní kontajner a zavře O aplikaci - (ID okna, které má být zavřeno)
g_pos.kon_o_aplikaci_off(); // funkce odebere posluchač událostí tlačítku Kontakt na programátora v sekci O aplikaci
}}};


const kon_pre=Object.create(pol_menu); // udělá kopii objektu pol_menu pro okno Přestávky a Kontakt
{
kon_pre.id=["prestavky","kontakt"]; // id jednotlivých oken menu: Přestávky , Kontakt
kon_pre.id_k=["k-pre","s-pre","k-kon","s-kon"] // id button a svg křížků jednotlivých oken Přestávky , Kontakt
} // změna id objektů jedinečných pro kontakt a přestávky

const g_pos={obj:[["spustit","spustit-svg"],["vl","vlm","min","cool","cel","pln","vpm","vp"],["ovl-zvuk","ovl-jas"],["but-nas","nas-svg"],["but-ob","ob-svg"],["but-oz","oz-svg"]],
menu:["a-navod","a-funkce","a-o-aplikaci"], // položky menu: Návod, Funkce , O aplikaci
zam:["zam","zam-svg"], // Zámek obrazovky
min:["m","m-svg"], // Minutka
pla:["pl","pl-svg"], // Plánovač
kon:["k","k-svg"], // kontakt
pre:["pr","pr-svg"], // přestávky
kontakt_programator:["kon-prog-1","kon-prog-2"], // id A kontakt na programátora
poznamky:["pozn","but-poz","but-poz-off"], // poznámky:[id textarea, id button Zavřít, class buttonu, aby nešel vidět] 
ozivitOn(interval=null){
/* aktivace posluchče Oživit Nočního VLKA */
document.getElementById(this.obj[5][0]).addEventListener("click",this); /* posluchač pro Oživit */
document.getElementById(this.obj[5][0]).style.opacity=1; /* zvýší krytí na 100% */

if(interval===null)
{
interval=uloz.max_obnova_ms; // pokud nebude zaslán do funkce interval po který má být vyblokováno tlačítko Oživit, bude se vycházet podle času uloz.max_obnova_ms v uloz.js
}
else
{
interval=parseInt(interval); // pokud byl zaslán požadovaný čas na blokaci funkce tlačítka Oživit, převede se na číslo pro jistotu
let akt_ms=Date.now(); // vrátí počet milisekund od nulového data (1. ledna 1970 00:00:00 UTC)
interval=interval-akt_ms; // interval je zaslán ve tvaru uloz.z_den (je počet milisekund, kdy byl interval do obchůzky zahájen od nulového data - 1. ledna 1970 00:00:00 UTC) + uloz.max_obnova_ms (maximální čas pro obnovu v milisekundách) + uloz.intr*1000 (interval do obchůzky v minutách * 1000, aby byl v milisekundách) , je tedy potřeba ho zmenšit o aktuální čas počítaný od nulového data (1. ledna 1970 00:00:00 UTC) - aktuálně počet milisekund od nulového data (1. ledna 1970 00:00:00 UTC)
}
clearTimeout(uloz.casovac_butt_oziv); // vynuluje časovač, který níže vypíná posluchače tlačítka Oživit
uloz.casovac_butt_oziv=setTimeout(()=>{
g_pos.ozivitOff(); // funkce vypne posluchač tlačítka Oživit a sníží jeho opacity na 50% - funkce je v teto JS knihovně, tedy v centrum.js
},interval); // od Zastavení Nočního VLKa bude moct použít ještě tlačítko oživit podle času uloz.max_obnova_ms v uloz.js
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

document.getElementById(this.min[0]).addEventListener("click",this); /* posluchač pro Minutku */

document.getElementById(this.pla[0]).addEventListener("click",this); /* posluchač pro Plánovač */

document.getElementById(this.pre[0]).addEventListener("click",this); /* posluchač pro Přestávky */

document.getElementById(this.kon[0]).addEventListener("click",this); /* posluchač pro Kontakt */

document.getElementById(this.kontakt_programator[0]).addEventListener("click",this); // posluchač pro Kontakt na prograátora v hlavním kontejneru aplikace

let l3=this.menu.length; // délka pole
for(let i=0;i<l3;i++)
{
document.getElementById(this.menu[i]).addEventListener("click",this); /* posluchače pro menu - Návod, Funkce , O aplikaci */
}

document.getElementById(this.poznamky[0]).addEventListener("focus",()=>
{
document.getElementById(this.poznamky[1]).classList.remove(this.poznamky[2]);  // odebere class třídu, která button zavřít zmenší na šířku 0px
}); // posluchač pro Poznámky, když je textarea s poznámkami Zaměřena uživatelem


document.getElementById(this.poznamky[0]).addEventListener("blur",()=>
{
document.getElementById(this.poznamky[1]).classList.add(this.poznamky[2]); // přidá class třídu, která button zavřít zmenší na šířku 0px
}); // posluchač pro Poznámky, když je textarea s poznámkami Blur uživatelem (byl jí odebrán focus)

document.getElementById(this.poznamky[0]).addEventListener("input",this); // posluchač pro poznámky, který sleduje psaní uživatele do této textarei
},
kon_o_aplikaci_off()
{
// funkce odebere posluchač událostí tlačítku Kontakt na programátora v sekci O aplikaci - fukce se spouští z funkce: pol_menu.a()
document.getElementById(this.kontakt_programator[1]).removeEventListener("click",this); // odebrání posluchače pro Kontakt na prograátora v sekci O aplikaci
},
handleEvent(e){
const k=e.target.id; /* zjistí ID prvku na který bylo kliknuto */

if(k===this.obj[0][0]||k===this.obj[0][1]) /* pokud se ID prvku anebo ID SVG prvku rovná */
{
/* Kliknuto na Spustit Nočního VLKA */
pinkani.hraj(null); // přehraje zvuk pinkání 1 x - tento zvuk je kvůli inicializaci pinkání a jeho správnému fungování při uspání aplikace především pro systém iOS, parametr NULL slouží pro toto přehrávání
pruvodce.a(); /* funkce, která má být kliknutím spuštěna - v pruvodce.js */
}

else if(k===this.obj[5][0]||k===this.obj[5][1]) /* pokud se ID prvku anebo ID SVG prvku rovná */
{
/* Kliknuto na Oživit Nočního VLKA na hlavním kontajneru */
window.hlidac.aktivace(); // opětovně aktivuje ochranu před uspáním
zvuk.zaloz(); // založí audio mp3 v globálním objektu windows, pokud nebyly již založeny (ve vlk.js)
window.onbeforeunload=()=>{return 'Chcete zavřít aplikaci Noční VLK?';}; // ochrana před náhodným uzavřením aplikace
pinkani.hraj(null); // přehraje zvuk pinkání 1 x - tento zvuk je kvůli inicializaci pinkání a jeho správnému fungování při uspání aplikace především pro systém iOS, parametr NULL slouží pro toto přehrávání
dia.on(dia.id[8]); // zapne dialogové okno - S dotazem, zda chce uživatel Obnovení Nočního VLKa
}


else if(k===this.obj[1][0])
{
obrazovka.zmen(this.obj[1][0]);
}

else if(k===this.obj[1][1])
{
obrazovka.zmen(this.obj[1][1]);
}

else if(k===this.obj[1][2])
{
obrazovka.zmen(this.obj[1][2]);
}

else if(k===this.obj[1][3])
{
obrazovka.zmen(this.obj[1][3]);
}

else if(k===this.obj[1][4])
{
obrazovka.zmen(this.obj[1][4]);
}

else if(k===this.obj[1][5])
{
obrazovka.zmen(this.obj[1][5]);
}

else if(k===this.obj[1][6])
{
obrazovka.zmen(this.obj[1][6]);
}

else if(k===this.obj[1][7])
{
obrazovka.zmen(this.obj[1][7]);
}

else if(k===this.obj[2][1])
{
jas.zmen(this.obj[2][1]);
}

else if(k===this.obj[2][0])
{
// kliknuto na změnu hlasitosti
zvuk.zastav(); // zastaví zvuk, pokud by byl přehráván - ve vlk.js
zvuk.zmen(this.obj[2][0]); // změní hlasitost zvuku alarmu - ve vlk.js
pinkani.zmen(this.obj[2][0]); // změní hlasitost pinkání pro hlídání uspání aplikace - ve vlk.js
gong.zmen(this.obj[2][0]); // změní hlasitost zvuku gong - ve vlk.js
zvuk.hraj(false); // přehraje zvuk alarmu 1x - ve vlk.js
}


else if(k===this.obj[3][0]||k===this.obj[3][1]) /* pokud se ID prvku anebo ID SVG prvku rovná */
{
// klik na tlačítko Nastavení
klik.hraj(false); // bude přehrávat zvuk 1x klik 
p_nas.a();  /* spustí potřební procesy a posluchače */
hl_kon.zavri(p_nas.id,"flex",p_nas.id); // zavře hlavní kontajner a otevře Nastavení - (IDnew,typ,id_scroll)
}
else if(k===this.obj[4][0]||k===this.obj[4][1]) /* pokud se ID prvku anebo ID SVG prvku rovná */
{
// kliknuto na tlačítko Obchůzky
klik.hraj(false); // bude přehrávat zvuk 1x klik
p_ob.a(); /* spustí potřební procesy a posluchače */
hl_kon.zavri(p_ob.id,"flex",p_ob.id);  // zavře hlavní kontajner a otevře Obchůzky - (IDnew,typ,id_scroll)
}
else if(k===this.zam[0]||k===this.zam[1])
{
// KLIKNUTÍ ZÁMEK OBRAZOVKY
klik.hraj(false); // bude přehrávat zvuk 1x klik 
uzamceni.a(); /* aktivuje potřebné funkce pro Zámek obrazovky */
}
else if(k===this.menu[0])
{
// Klik na menu - Návod
hl_kon.zavri(pol_menu.id[0],"flex",pol_menu.id[0]);  // zavře hlavní kontajner a otevře Obchůzky - (IDnew,typ,id_scroll)
pol_menu.a(); // aktivuje posluchače událostí ke křížku Zavřít okno
}
else if(k===this.menu[1])
{
// Klik na menu - Funkce
hl_kon.zavri(pol_menu.id[1],"flex",pol_menu.id[1]);  // zavře hlavní kontajner a otevře Obchůzky - (IDnew,typ,id_scroll)
pol_menu.a(); // aktivuje posluchače událostí ke křížku Zavřít okno
}
else if(k===this.menu[2])
{
// Klik na menu - O aplikaci
hl_kon.zavri(pol_menu.id[2],"flex",pol_menu.id[2]);  // zavře hlavní kontajner a otevře Obchůzky - (IDnew,typ,id_scroll)
pol_menu.a(); // aktivuje posluchače událostí ke křížku Zavřít okno
document.getElementById(this.kontakt_programator[1]).addEventListener("click",this); // aktivuje posluchač pro Kontakt na programátora v sekci O aplikaci
}
else if(k===this.pre[0]||k===this.pre[1])
{
// kliknuto na Přestávky
hl_kon.zavri(kon_pre.id[0],"flex",kon_pre.id[0]);  // zavře hlavní kontajner a otevře Přestávky - (IDnew,typ,id_scroll)
kon_pre.a(); // aktivuje posluchače událostí ke křížku Zavřít okno
}
else if(k===this.kon[0]||k===this.kon[1])
{
// kliknuto na Kontakt
hl_kon.zavri(kon_pre.id[1],"flex",kon_pre.id[1]);  // zavře hlavní kontajner a otevře Kontakt - (IDnew,typ,id_scroll)
kon_pre.a(); // aktivuje posluchače událostí ke křížku Zavřít okno
}
else if(k===this.poznamky[0])
{
/* KLIKNUTÍ POZNÁMKY - psaní textu v area poznámky */
let text=e.target.value; // zjistí value textarea poznámky
uloz.uloz(uloz.klice[12],text); // při každé změně textu v textarea poznámky, uloží její value do Local Strorage pod klíčem- funkce je v ozivit.js
}
else if(k===this.min[0]||k===this.min[1])
{
/* KLIKNUTÍ NA MINUTKA */
if(!minutka.aktivni)
{
// pokud není minutka aktivní
pinkani.hraj(null); // bude přehrávat zvuk 1x pinkání, aby bycha zachována první interakce s tímto audiem, aby fungovala ochrana před uspáním, pokud by nebyl zapnut Noční VLK, parametr NULL je určen pro toto přehrávání
dia.on(dia.id[9]); /* v centrum.js */
}
else
{
// pokud je minutka aktivní
klik.hraj(false); // bude přehrávat zvuk 1x klik
dia.on(dia.id[10]); /* zapne dialogové okno s informacemi o minutce a možností jejího zrušení, funkce v centrum.js */
minutka.odpocet(); // aby nedošlo k prodlevě kliku a odpočtu v informačním okně, spustí funkci odpočtu, aby okamžitě přepsala stav do konce intervalu Minutky - v minutka.js
}}
else if(k===this.pla[0]||k===this.pla[1])
{
/* KLIKNUTÍ na Plánovač */
if(planovac.plany[0].length!==0&&planovac.plany[1].length!==0&&planovac.plany[2].length!==0&&planovac.plany[3].length!==0&&planovac.plany[4].length!==0&&planovac.plany[5].length!==0){
// pokud se nebude délka pole this.plany[1-6]!==0, znamená to, že plán 1-6 je aktivní a byl zadán, tedy je zadán maximální počet plánů a bude dialogové okno s touto informací a následovat return - pole v planovac.js
klik.hraj(false); // bude přehrávat zvuk 1x klik
dia.on(dia.id[15]); // zapne dialogové okno s oznámením, že již je zadán maximální počet plánů
return;
}

if(planovac.v_alarmu[0]!==true&&planovac.v_alarmu[1]!==true&&planovac.v_alarmu[2]!==true&&planovac.v_alarmu[3]!==true&&planovac.v_alarmu[4]!==true&&planovac.v_alarmu[5]!==true)
{
// pokud není v alarmu žádný z 1-6 plánů - v planovac.js
pinkani.hraj(null); // bude přehrávat zvuk 1x pinkání, aby bycha zachována první interakce s tímto audiem, aby fungovala ochrana před uspáním, pokud by nebyl zapnut Noční VLK, parametr NULL je určen pro toto přehrávání
dia.on(dia.id[4]); /* otevře dialogové okno pro zadání Plánovač - v centrum.js */
window.hlidac.aktivace(); // opětovně aktivuje ochranu před uspáním
}
else
{
// pokud bude nějáký z plánu 1-6 v alarmu

if(planovac.v_alarmu[0]===true)
{
// pokud bude plán 1 v alarmu
planovac.sroll_na(1); // udělá scroll na plán 1 - v planovac.js
}
else if(planovac.v_alarmu[1]===true)
{
// pokud bude plán 2 v alarmu
planovac.sroll_na(2); // udělá scroll na plán 2 - v planovac.js
}
else if(planovac.v_alarmu[2]===true)
{
// pokud bude plán 3 v alarmu
planovac.sroll_na(3); // udělá scroll na plán 3 - v planovac.js
}
else if(planovac.v_alarmu[3]===true)
{
// pokud bude plán 4 v alarmu
planovac.sroll_na(4); // udělá scroll na plán 4 - v planovac.js
}
else if(planovac.v_alarmu[4]===true)
{
// pokud bude plán 5 v alarmu
planovac.sroll_na(5); // udělá scroll na plán 5 - v planovac.js
}
else if(planovac.v_alarmu[5]===true)
{
// pokud bude plán 6 v alarmu
planovac.sroll_na(6); // udělá scroll na plán 6 - v planovac.js
}}}
else if(k===this.kontakt_programator[0]||k===this.kontakt_programator[1])
{
dia.on(dia.id[7]); // zapne dialogové okno kontakt na programátora
}}};

const v_port={
id_o:"uz-obchuzka", // id - kontajner pro výzvu k obchůzce
id_t:"uz-i-box", // id - text přes celou obrazovku kontajner

handleEvent(){
// úprava velikosti oken podle velikosti visualViewport

document.getElementById(hl_kon.id_kon).style.minHeight=`${parseInt(window.screen.availHeight)}px`;  // přepsání hodnoty výšky, dostupnou výšky zařízení, pomůže lepšímu přepočtu výšky visualViewport

let v=parseInt(window.visualViewport.height); // výška visualViewport

document.getElementById(hl_kon.id_kon).style.minHeight=`${v}px`; // úprava minimální výšky hlavní kontejner aplikace


if(hl_kon.otevrene_okno!=="")
{
// pokud bude otevřené nějáké okno, bude proměnná hl_kon.otevrene_okno zaplněna proměnnou s názvem id tohoto okna
document.getElementById(hl_kon.otevrene_okno).style.minHeight=`${v}px`; // upraví minimální výšku okna
document.getElementById(hl_kon.otevrene_okno).style.height=`${v}px`; // upraví minimální výšku okna
}

if(tik.a_obchuzka)
{
// pokud je aktivní výzva k obchůzce, upraví velikost jejího okna
document.getElementById(this.id_o).style.height=`${v}px`;
document.getElementById(this.id_o).style.minHeight=`${v}px`;
}


if(text.aktivni)
{
// pokud je aktivní Text přes elou obrazovku, upraví velikost jejího okna
document.getElementById(this.id_t).style.height=`${v}px`;
document.getElementById(this.id_t).style.minHeight=`${v}px`; 
}

},
prepocet(){
// funkce slouží k přepočtu nově otevřených oken, který je spouštěn z funkce a nikoli posluchačem událostí, hlavním důvodem je blokace provedení funkce this.handleEvent, pokud není podpora Visual wievport API na zařízení a lepší čitelnost kódu

if(window&&window.visualViewport) // test - zda je visualViewport podporováno
{
// pokud je Visual viewport API podporováno
this.handleEvent(); // spustí funkci v posluchači pro přepočet velikosti okna
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
otevrene_okno:"", // proměnná v sobě uchovává id otevřeného okna, po dobu, kdy je hlavní kontejner nastaven na display=none
id_sek_poloha:"poloha", // id HTML kontejneru sekce Poloha aplikace
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

this.otevrene_okno=IDnew; // proměnná zaznamená, které okno je otevřené, když je hlavní kontajner nastaven na display=none

setTimeout(()=>{
document.getElementById(IDnew).style.display=typ; // nastaví display nového okna, které nahradí hlavní kontajner
document.getElementById(IDnew).style.zIndex=3; // nastaví z-index nového okna, které nahradí hlavní kontajner
v_port.prepocet(); // aktivuje přepočet velikosti okna podle Visual viewport - v centrum.js
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

this.otevrene_okno=""; // proměnná se nastaví na default, žádné okno není otevřené a hlavní kontajner je nastaven na display=grid

setTimeout(()=>{
document.getElementById(this.id_kon).style.display=this.display_con; // nastaví display hlavního kontajneru
document.getElementById(this.id_kon).style.zIndex=0; // nastaví z-index hlavního kontajneru
},this.TIME1); // zpoždění musí být vyšší než nastavení display=none na kontajneru, jinak dojde k nepříjemnému poskočení okna a neprojeví se transmition

setTimeout(()=>{
document.getElementById(this.id_kon).style.opacity=1; // opacity=1 pro hlavní kontejner
document.getElementById(this.id_kotva).scrollIntoView({behavior:"smooth"}); // scroll na kotvu hlavního kontejneru
},this.TIME2); // zpoždění musí být oněco vyšší než display=typ, jinak nemůže správně JS manipulovat s prvky, protože se nestihnou vytvořit
}};

const centrala={id_error:"div-error",id_but:"but-error",cesta:"../Nocni-VLK.html",lic:null,
posOn(){
document.getElementById(this.id_but).addEventListener("click",this); // přidání poschuchače na button Spustit aplikaci běžným způsobem
},
handleEvent(){
location.replace(this.cesta); /* dojde k href na this.cesta bez možnosti návratu na error stránku */
},
poloh(){
/* funkce ruší zobrazení polohy aplikace pro telefony, tablety atd. */
const test_podpory=obrazovka.podpora_resizeTo_moveTo(); // funkce kontroleje jestli je aplikace spuštěna na mobilním zařízení a nebo není
if(!test_podpory)
{
// pokud se nejedná o mobilní zařízení
document.getElementById(p_nas.id_nas[6]).checked=true; // zapne zatržení v Nastavení checketu Zobrazit sekci Poloha aplikace
document.getElementById(hl_kon.id_sek_poloha).style.display="block"; // zobrazí panel pro sekci Poloha aplikace 
}
else
{
// pokud se jedná o mobilní zařízení
document.getElementById(p_nas.id_nas[6]).checked=false; // vypne zatržení v Nastavení checketu Zobrazit sekci Poloha aplikace
document.getElementById(hl_kon.id_sek_poloha).style.display="none"; // schová panel pro sekci Poloha aplikace 
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
if((parseInt(over.celek[0])>=over.cas1&&parseInt(over.celek[0])<=over.cas2)&&(over.celek[1]===false||over.celek[2]===false||over.celek[3]===false||over.celek[1]===true||over.celek[2]===true||over.celek[3]===true))
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

window.setTimeout(()=>{
if(window.opener){
// pokud existuje rodičovské okno
window.opener.close(); // zavře rodičovské okno
}},250); // Krátké zpoždění

v_port.zahajit(); /* Aktivuje posluchče a parametry pro rozměry Kontejnerů s pomocí visualViewport API  */
/* funkce spouští veškeré potřebné procesy pro start aplikace */
this.licence(); // zkontroluje, zda byly uživatelem schváleny licenční podmínky
if(this.lic!==true)
{
return; /* pokud nebude licence v pořádku ukončí funkci */
}
this.poloh(); // zkontroluje velikost obrazovky uživatele, pokud neodpovídá požadovaným rozměrům, schová panel s možnostmi polohování aplikace
hl_kon.cisti_form(); /* vyčistí formuláře obchůzek, tak, aby tam nezůstala případná nežádoucí data */
window.onbeforeunload=()=>{return 'Chcete zavřít aplikaci Noční VLK?';}; /* ochrana před náhodným uzavřením aplikace */
window.hlidac.aktivace(); // aktivuje ochranu před uspáním
}};

pripravenost.centrum=true; /* MUSÍ BÝT NA POSLEDNÍM ŘÁDKU KNIHOVNY - v autorun.js - informuje o načtení této js knihovny */
const zamek={pripraven:null,
bA:null, /* proměnná, která drží blokaci zámku obrazovky */

pripravenost(){
const retezec=location.search.slice(1); /* odebere Otazník z řetězce - aby mohlo dojít ke konverci JSON */
let pole;
try
{
pole=JSON.parse(retezec);
}
catch(e)
{
return; /* něco se pokazilo a nepodařilo se dostat pomocí JSON z řetězce pole - funkce bude ukončena */
}
this.pripraven=pole[3]; /* třetí položka v poly je výsledek testu, zda funguje Blokace uzamykání obrazovky - viz start.js funkce over */
},

blok(){
// funkce zablokuje na zařízení uzamykání obrazovky

if(window.matchMedia('(display-mode:standalone)').matches){
// Aplikace je spuštěna jako PWA
f_video.pust(); // pustí fake video - které zabrání uzamčení obrazovky
}
else
{
// Aplikace je spuštěna v prohlížeči
if(this.pripraven===null)
{
this.pripravenost(); // pokud nebylo zjištěno, zda zařízení podporuje blokaci zámku obrazovky - wakeLock API, toto se provede
}
if(this.pripraven) // pokud je podporován zařízením blokace obrazovky - wakeLock API
{
this.bA=navigator.wakeLock.request('screen'); // aktivace blokace zámku obrazovky - vhodné dát do proměnné kvůli vypnutí a také kontrole
}
else
{
// pokud není podpora - wakeLock API
f_video.pust(); // pustí fake video - které zabrání uzamčení obrazovky
// this.posluchace_pro_kontrolu_videa(); - funkce aktivuje posluchače na kontrolu přehrávání videa, pouze pro potřebu kontroly
}}}

/*
,posluchace_pro_kontrolu_videa(){
// funkce aktivuje posluchače na kontrolu přehrávání videa - pouze v případě potřeby sledovat stav fake videa

const videoElement=document.getElementById(f_video.id); // načte HTML elemet videa do proměnné

// Přidání posluchačů událostí na video element
videoElement.addEventListener('play',()=>{
console.log('Video se přehrává.');
});

videoElement.addEventListener('pause',()=> {
console.log('Video bylo pauznuto.');
});

videoElement.addEventListener('ended',()=>{
console.log('Video skončilo.');
});

videoElement.addEventListener('timeupdate',()=>{
console.log('Video se přehrává a čas se aktualizuje.');
});
} */
};

const posuvnik={
TIME:15000, /* zajišťuje odstranění posuvníku při nehýbání myší déle jak 15sekund */
casovac:null, // časovač, pro schování posuvníku
_class:"no_bar", // název css třídy, která vipíná viditelnost posuvníku a kurzoru myši ve vlk.css

zahajeni(){
document.body.addEventListener("mousemove",posuvnik.viditelny);
document.body.addEventListener("mousewheel",posuvnik.viditelny);
},
off(){
clearTimeout(this.casovac);
document.body.classList.add(this._class); // HTMLobjekt.classList.add("název-třídy-css") zajistí přidání css třídy no_bar pokud není třída přítomna v objektu
document.body.addEventListener("mousemove",posuvnik.viditelny);
document.body.addEventListener("mousewheel",posuvnik.viditelny);
},
pause(){
clearTimeout(this.casovac);
document.body.removeEventListener("mousemove",posuvnik.pause);
document.body.removeEventListener("mousewheel",posuvnik.pause);
posuvnik.viditelny();
},
viditelny(){
document.body.classList.remove(this._class); // HTMLobjekt.classList.remove("název-třídy-css") zajistí odebrání css třídy no_bar pokud je třída přítomna v objektu
document.body.removeEventListener("mousemove",posuvnik.viditelny);
document.body.removeEventListener("mousewheel",posuvnik.viditelny);
clearTimeout(this.casovac);
this.casovac=setTimeout("posuvnik.off();",this.TIME);
document.body.addEventListener("mousemove",posuvnik.pause);
document.body.addEventListener("mousewheel",posuvnik.pause);
}};


window.hlidac={ // window.hlidac je schválně vložen do objektu window, aby určil nejvyšší prioritu pro fungování aplikace
aktivovan:false, // proměnná hlídá, zda je hlídač před uspáním aplikace aktivní
udalos_viditelnost:"", // proměnná slouží k určení, zda zařízení podporuje hlídání viditelnosti stránky a v jakém formátu
odpocet:false, // tato proměnná hlídá jestli je odpočet zapnutý, tedy zda je zapnutá hlavní funkce aplikace Noční VLK
minutka:false, // tato proměnná hlídá jestli je funkce minutky aktivní, pokud je odpočet minutky aktivní=true pokud ne=false
planovac:false, // tato proměnná hlídá jestli je funkce plánovač aktivní, pokud zapnutý alespoň jeden plán=true pokud ne=false
aktivace(){

if(this.aktivovan) // pokud je již posluchač aktivní, deaktivuje ho
{
return; // pokud již bude poluchač přidán - bude return;
// this.DEaktivace(); pokud bude aktivován posluchač, nejprve ho deaktivuje
}

let neviditelnost;
let udalos_viditelnost;

if(typeof document.hidden!=="undefined")
{
neviditelnost="hidden";
udalos_viditelnost="visibilitychange";
}
else if(typeof document.msHidden!=="undefined")
{
neviditelnost="msHidden";
udalos_viditelnost="msvisibilitychange";
}
else if(typeof document.webkitHidden!=="undefined")
{
neviditelnost="webkidHidden";
udalos_viditelnost="webkitvisibilitychange";
}
/* KONEC kontrola kompatibility */

this.udalos_viditelnost=udalos_viditelnost;


if(typeof document.addEventListener==="undefined"||neviditelnost===undefined)
{
console.log("API kontrola viditelnosti stránky nefunguje.");
return;
}
else
{
/* podpora API viditelnosti je v pořádku */
document.addEventListener(this.udalos_viditelnost,this,false); /* aktivuje posluchač události */
this.aktivovan=true; // proměnná zohledňuje, že posluchač pro viditelnost stránky, byl aktivován
}},
DEaktivace(){
document.removeEventListener(this.udalos_viditelnost,this,false); // odbrání posluchače pro viditelnost stránky
this.aktivovan=false; // proměnná zohledňuje, že posluchač pro viditelnost stránky, byl DEaktivován
},
handleEvent(){
if(document.visibilityState==="hidden") /* pokud není obrazovka s apllikací viditelná */
{
/* POKUD DOJDE K USPÁNÍ OKNA APLIKACE */

if(this.odpocet||this.minutka||this.planovac) /* proměnná, která z vlk.js dáva informaci o tom, že odpočet se počítá */
{
f_video.zvuk("ztlumit");  /* vypne zvuk videa aby nezasahovalo do alarmu - manualní nastavení způsobí shasnutí obrazovky */
pinkani.hraj(true); /* přehraje zvuk pinkání stále dokola */
tik.a_uspano=true; // proměnná určuje, v objektu TIK ve centrum.js, že se má postupně začít zesilovat zvuk pinkání
canvas_vymaz.hlidac=false; // přestane se hlídat vymazání plátna CANVAS se systémem obchůzek - proměnná určuje jestli se hlídá vymazání plátna CANVAS se systémem obchůzek - pokud TRUE=hlídání je zapnuté, FALSE=HLÍDÁNÍ JE VYPNUTÉ - kontrolovat výmaz plátna canvas v objektu TIK ve centrum.js 
}

}
else
{
/* POKUD DOJDE K OPĚTOVNÉMU ZBUZENÍ OKNA APLIKACE */

if(this.odpocet||this.minutka||this.planovac) /* proměnná, která z vlk.js dáva informaci o tom, že odpočet se počítá */
{
pinkani.zastav(); // zastaví přehrávání zvuku pinkání - ve vlk.js
tik.a_uspano=false; // proměnná určuje, v objektu TIK ve centrum.js, že se má postupně přestat zesilovat zvuk pinkání
f_video.zvuk("zesilit");  /* zapne zvuk videa aby nezasahovalo do alarmu - manualní nastavení způsobí shasnutí obrazovky */
dia.on(dia.id[3]); /* v centrum.js */
}
else
{
/* v případě, že by bylo okno opět aktivováno a přitom byla aktivní výzva k obchůzce včetně alarmu */
pinkani.zastav(); // zastaví přehrávání zvuku pinkání - ve vlk.js
tik.a_uspano=false; // proměnná určuje, v objektu TIK ve centrum.js, že se má postupně přestat zesilovat zvuk pinkání
}

if(!this.odpocet&&uloz.ok)
{
// pokud není aktivní odpočet intervalu do obchůzky a funguje local storage, dojde ke kontrole jestli je možné ještě oživit Nočního VLKa, toto se aktivuje většinou časovačem, kde po vypršení času se tlačítko Oživit vypne, pokud ovšem byla aplikace minimalizována v liště windows anebo přenuto do jiného okna u telefónu anebo tabletu, obvykle dojde k uspání aplikace a vypnutí tohoto časovače, následně při obnovení okna aplikace zpět není vypnuto tlačítko Obnovit, ipřesto, že obnova již není možná
const zobrazit_ozivit=uloz.dead_time(); // KONTROLA - ABY NEDOŠLO K OŽIVENÍ VLKA po více jak 60MINUTÁCH od plánovaného TIMEOUTU, pokud je oživení možné vrací TRUE, pokud možné není vrací FALSE - funkce v ozivit.js

if(!zobrazit_ozivit)
{
// pokud není oživení možné - vypne tlačítko Oživit
clearTimeout(uloz.casovac_butt_oziv); // vynuluje časovač, který vypíná posluchače tlačítka Oživit, za určitý požadovaný časový úsek
g_pos.ozivitOff(); // funkce vypne posluchač tlačítka Oživit a sníží jeho opacity na 50% - funkce je v teto JS knihovně, tedy v centrum.js
}}


v_port.prepocet(); // aktivuje přepočet velikosti okna podle Visual viewport - v centrum.js
uzamceni.jednou(); // pokud bude aktivní zámek obrazovky - zobrazí, že je aplikace uzamčena
}
}};

const f_video={aktivovano:false,
id:"f-v", // id fake videa které je skrytě přehráváno
id_butt:"", // id fake butonu na který je rováděn simulovaný klik uživatele
fake_video:"", // globální proměnná pro udržení vedea v paměti
TIME:20000, // délka smyčky přehrávání
casovac:null, // časovač pro video

zvuk(co){

if(this.aktivovano===false)
{
return; /* pokud nebylo fakevido aktivováno - ude return */
}

if(co==="ztlumit")
{
this.fake_video.muted=true; /* vypne zvuk videa aby nezasahovalo do alarmu - manualní nastavení způsobí shasnutí obrazovky */
}
else if(co==="zesilit")
{
this.fake_video.muted=false; /* zapne zvuk videa aby nezasahovalo do alarmu - manualní nastavení způsobí shasnutí obrazovky */
}
else
{
return; /* pokud nebylo vybráno jestli zesílit anebo zeslabit- bude return */
}},

pust(){
if(this.aktivovano===false)
{
this.aktivovano=true;
}

this.fake_video=document.getElementById(this.id); /* načte objekt fake video globální proměnné, jinak se to kouše v Safari */
this.fake_video.currentTime=0; // video posune na začátek přehrívání
this.fake_video.play();  // spustí fake video - globální proměnná objektu je ve stránce pod objektem video
document.getElementById(this.id).style.visibility="hidden"; // video zneviditelní

const touchStartEvent=new Event('touchstart',{bubbles:true,cancelable:true}); // vytvoření eventu pro simulaci dotyku 1
document.getElementById("f-b").dispatchEvent(touchStartEvent); // simulaci dotyku na fake button
const touchEndEvent=new Event('touchend',{bubbles:true,cancelable:true}); // vytvoření eventu pro simulaci dotyku 2
document.getElementById("f-b").dispatchEvent(touchEndEvent); // simulaci dotyku na fake button 2

clearTimeout(this.casovac); // vyčistí časovač
this.casovac=setTimeout(this.pust.bind(this),this.TIME); // zapne přehrávání videa za 20sekund
}};


const chyba_ukladani={
id_chyba_text:"chyba-text", // id prvku k dialogovému oknu zobrazující chybovou hlášku Problémi s místem na disku anebo paměťové kartě, kde se pomocí text innert zobrazí konkrétní chyba

zobrazit_chybu(chyba=""){
// funkce prostřednictvím dialogového okna zobrazí chybu s nedostatkem místa na disku anebo že nefunguje ukládání na Local storage
dia.on(dia.id[17]); // otevře dialogové okna s chybovou informací - Problémy s místem na disku anebo s místem na paměťové kartě - v centrum.js
document.getElementById(this.id_chyba_text).innerText=chyba; // přepíše v dialogovém okně text s chybou, která nastala
gong.hraj(false); // zahraje GONG.mp3 - FALSE = 1x - ve vlk.js
}};

const canvas_vymaz={
// objek slouží ke kontrole, zda nedošlo k vymazání plátna CANVAS se systémem obchůzek, to se může stát když dojde ke kolapsu zařízení například nedostatek místa na disku v počítači
hlidac:true, // proměnná určuje jestli se hlídá vymazání plátna CANVAS se systémem obchůzek - pokud TRUE=hlídání je zapnuté, FALSE=HLÍDÁNÍ JE VYPNUTÉ
empty(){
// funkce vytvoří imaginární prázdné plátno s rozměry HLAVNÍHO plátna CANVAS, kde se zobrazuje uživateli systém obchůzek a z tohoto data získá data URL (base64), tedy data URL (base64), jako by plátno bylo vymazáno
const emptyCanvas=document.createElement('canvas'); // vytvoří imaginární plátno canvas
emptyCanvas.width=document.getElementById(obch.id_can).width; // přidělí imaginárnímu plátnu canvas šířku HLAVNÍHO plátna canvas, kde je zobrazen systém obchůzek - obch.id_can je ve vlk.js
emptyCanvas.height=document.getElementById(obch.id_can).height; // přidělí imaginárnímu plátnu canvas výšku HLAVNÍHO plátna canvas, kde je zobrazen systém obchůzek - obch.id_can je ve vlk.js

return emptyCanvas.toDataURL(); // funkce vrátí data URL (base64) prázdného plátna, které velikostí odpovídá HLAVNÍMU plátnu, tedy data URL (base64) tohoto imaginárního plátna odpovídají datům URL (base64) fakticky prázdnému plátnu HLAVNÍHO plátna canvas kde se zobrazuje uživateli systém obchůzek
},
kontrola(){
// funkce kontroluje jestli nedošlo k vymazání HLAVNÍHO plátna CANVAS, kde je zobrazován uživateli systém obchůzek, k tomu dochází, pokud dojde například ke kolapsu aplikace vlivem nedostatku místa na disku anebo paměťové kartě zařízení
let data_full=null; // proměnná zjistí data URL (base64) plného plátna
let data_empty=this.empty(); // proměnná zjistí jaká jsou data URL (base64) má prázdné plátno

try{
// ochranné provedení načtení dat URL (base64) z hlaního plátna, funkce může selhat, pokud jsou na plátně CANVAS načteny externí obrázky, což je u okruhu SINGL a DABL obrázek tlapky, v takovém případě je plátno "znečištěné" a z bezpečnostních důvodů je zabráněno načtení data URL plátna CANVAS
data_full=document.getElementById(obch.id_can).toDataURL(); // do proměnné načte data URL (base64) plátna canvas 
}
catch(e)
{
// pokud bude plátno "znečištěno" = bude v něm nahrán obrázek tlapka.svg (to bývá na SINGL a DABL okruhu) - nastane tato podmínka, a plátno tedy není prázdné
}

if(data_full===data_empty)
{
// pokud se data URL plného plátna shoduji s daty URL prázdného plátna - plátno bylo vymazáno
dia.on(dia.id[18]); // zapne dialogové okno: Kolaps aplikace
gong.hraj(false); // zahraje GONG.mp3 - FALSE = 1x 
this.hlidac=false; // proměnná určuje jestli se hlídá vymazání plátna CANVAS se systémem obchůzek - pokud TRUE=hlídání je zapnuté, FALSE=HLÍDÁNÍ JE VYPNUTÉ
}}};

pripravenost.ochrany=true; /* MUSÍ BÝT NA POSLEDNÍM ŘÁDKU KNIHOVNY - v autorun.js - informuje o načtení této js knihovny */
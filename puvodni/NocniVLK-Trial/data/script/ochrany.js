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
if(this.pripraven==null)
{
this.pripravenost(); /* pokud nebylo zjištěno, zda zařízení podporuje blokaci zámku obrazovky, toto se provede */
}
if(this.pripraven==true)
{
this.bA=navigator.wakeLock.request('screen'); /* aktivace blokace zámku obrazovky - vhodné dát do proměnné kvůli vypnutí a také kontrole */
}
else
{
f_video.pust(); /* pustí fake video - které zabrání uzamčení obrazovky */
}
}};

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
aktivace(){

if(this.aktivovan==true)
{
this.DEaktivace(); /* pokud bude aktivován posluchač, nejprve ho deaktivuje */
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

if(this.odpocet) /* proměnná, která z vlk.js dáva informaci o tom, že odpočet se počítá */
{
f_video.zvuk("ztlumit");  /* vypne zvuk videa aby nezasahovalo do alarmu - manualní nastavení způsobí shasnutí obrazovky */
pinkani.hraj(true); /* přehraje zvuk pinkání stále dokola */
tik.a_uspano=true; // proměnná určuje, v objektu TIK ve autorun.js, že se má postupně začít zesilovat zvuk pinkání
}

}
else
{
/* POKUD DOJDE K OPĚTOVNÉMU ZBUZENÍ OKNA APLIKACE */

if(this.odpocet) /* proměnná, která z vlk.js dáva informaci o tom, že odpočet se počítá */
{
pinkani.zastav(); // zastaví přehrávání zvuku pinkání - ve vlk.js
tik.a_uspano=false; // proměnná určuje, v objektu TIK ve autorun.js, že se má postupně přestat zesilovat zvuk pinkání
f_video.zvuk("zesilit");  /* zapne zvuk videa aby nezasahovalo do alarmu - manualní nastavení způsobí shasnutí obrazovky */
dia.on(dia.id[3]); /* v autorun.js */
}
else
{
/* v případě, že by bylo okno opět aktivováno a přitom byla aktivní výzva k obchůzce včetně alarmu */
pinkani.zastav(); // zastaví přehrávání zvuku pinkání - ve vlk.js
tik.a_uspano=false; // proměnná určuje, v objektu TIK ve autorun.js, že se má postupně přestat zesilovat zvuk pinkání
}

v_port.handleEvent(); /* aktivuje propočet velikosti ona podle VisualViewport API - na některých zaříueních např. iPad dojde jinak ke "scvrknutí" okna aplikace */
uzamceni.jednou(); /* pokud bude aktivní zámek obrazovky - zobrazí, že je aplikace uzamčena */
}
}};

const f_video={aktivovano:false,id:"f-v",fake_video:"",TIME:20000,casovac:null,

zvuk(co){

if(this.aktivovano==false)
{
return; /* pokud nebylo fakevido aktivováno - ude return */
}

if(co=="ztlumit")
{
this.fake_video.muted=true; /* vypne zvuk videa aby nezasahovalo do alarmu - manualní nastavení způsobí shasnutí obrazovky */
}
else if(co=="zesilit")
{
this.fake_video.muted=false; /* zapne zvuk videa aby nezasahovalo do alarmu - manualní nastavení způsobí shasnutí obrazovky */
}
else
{
return; /* pokud nebylo vybráno jestli zesílit anebo zeslabit- bude return */
}},

pust(){

if(this.aktivovano==false)
{
this.aktivovano=true;
}

this.fake_video=document.getElementById(this.id); /* načte objekt fake video globální proměnné, jinak se to kouše v Safari */

this.fake_video.play();  /* spustí fake video - globální proměnná objektu je ve stránce pod objektem video */
document.getElementById(this.id).style.visibility="hidden";

clearTimeout(this.casovac);
this.casovac= setTimeout(this.pust.bind(this) , this.TIME); /* zapne přehrávání videa za 20sekund  */
}};

posuvnik.zahajeni(); /* funkce za určitý počet sekund schová posuvníky body, pokud nebude pohyb myši anebo kolečka myši */

uloz.p.ochrany=true; /* MUSÍ BÝT NA POSLEDNÍM ŘÁDKU KNIHOVNY - v oziv.js - informuje o načtení této js knihovny */
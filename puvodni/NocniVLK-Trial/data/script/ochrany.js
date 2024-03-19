var zamek={pripraven:null};
zamek.bA; /* proměnná, která drží blokaci zámku obrazovky */

zamek.pripravenost=function(){
var retezec=location.search.slice(1); /* odebere Otazník z řetězce - aby mohlo dojít ke konverci JSON */
try
{
var pole=JSON.parse(retezec);
}
catch(e)
{
return; /* něco se pokazilo a nepodařilo se dostat pomocí JSON z řetězce pole - funkce bude ukončena */
}
this.pripraven=pole[3]; /* třetí položka v poly je výsledek testu, zda funguje Blokace uzamykání obrazovky - viz start.js funkce over */
};

zamek.blok=function(){
if(this.pripraven==null)
{
this.pripravenost(); /* pokud nebylo zjištěno, zda zařízení podporuje blokaci zámku obrazovky, toto se provede */
}
if(this.pripraven==true)
{
this.bA = navigator.wakeLock.request('screen'); /* aktivace blokace zámku obrazovky - vhodné dát do proměnné kvůli vypnutí a také kontrole */
}
else
{
f_video.pust(); /* pustí fake video - které zabrání uzamčení obrazovky */
}
};

var posuvnik = {TIME:15000}; /* zajišťuje odstranění posuvníku při nehýbání myší déle jak 15sekund */
posuvnik.trida=document.body.className; /* načte případné třídy BODY */
posuvnik.casovac;

posuvnik.zahajeni=function(){
document.body.addEventListener("mousemove" , posuvnik.viditelny);
document.body.addEventListener("mousewheel" , posuvnik.viditelny);
};

posuvnik.off=function(){
clearTimeout(posuvnik.casovac);
posuvnik.trida = document.body.className; /* načte případné třídy BODY */
document.body.className += " no_bar"; /* přidá ke třídě BODY třídu, která odebere posuvník */
document.body.addEventListener("mousemove" , posuvnik.viditelny);
document.body.addEventListener("mousewheel" , posuvnik.viditelny);
};

posuvnik.pause=function(){
clearTimeout(posuvnik.casovac);
document.body.removeEventListener("mousemove" , posuvnik.pause);
document.body.removeEventListener("mousewheel" , posuvnik.pause);
posuvnik.viditelny();
};

posuvnik.viditelny=function(){
document.body.removeEventListener("mousemove" , posuvnik.viditelny);
document.body.removeEventListener("mousewheel" , posuvnik.viditelny);
document.body.className=posuvnik.trida; /* vrátí BODY původní třídu */
clearTimeout(posuvnik.casovac);
posuvnik.casovac=setTimeout("posuvnik.off();" , this.TIME);
document.body.addEventListener("mousemove" , posuvnik.pause);
document.body.addEventListener("mousewheel" , posuvnik.pause);
};


const hlidac={id:"audio-ochrana",zalozeno:false,aktivovan:false,mp3:null,cesta:"alarm/alarm5.mp3",volume_min:0.01,volume:1,udalos_viditelnost:"",odpocet:false,TIME:1000};
hlidac.casovac;

hlidac.zesiluj=function(){
/* funkce postupně zesiluje hlasitost alarmu */
this.mp3.volume=this.volume_min;

this.volume_min=this.volume_min+0.01; /* postupné zesilování */

if(this.volume_min>=this.volume)
{
this.volume_min=this.volume;
clearInterval(this.casovac); /* vypne časový interval pro zesilování */
}};

hlidac.zaloz=function(){
/* funkce založí Audio objekt */
this.mp3=document.getElementById(this.id); /* nahraje objekt audio do paměti */
this.mp3.load(); /* připraví mp3 na přehrátí */
this.mp3.volume=this.volume_min; /* nastaví hlasitost audia na minimum */
this.zalozeno=true;
};

hlidac.aktivace=function(){

if(this.aktivovan==true)
{
this.DEaktivace(); /* pokud bude aktivován posluchač, nejprve ho deaktivuje */
}

var neviditelnost;
var udalos_viditelnost;

if(typeof document.hidden !== "undefined")
{
neviditelnost = "hidden";
udalos_viditelnost = "visibilitychange";
}
else if(typeof document.msHidden !== "undefined")
{
neviditelnost = "msHidden";
udalos_viditelnost = "msvisibilitychange";
}
else if(typeof document.webkitHidden !== "undefined")
{
neviditelnost = "webkidHidden";
udalos_viditelnost = "webkitvisibilitychange";
}
/* KONEC kontrola kompatibility */

this.udalos_viditelnost=udalos_viditelnost;


if(typeof document.addEventListener === "undefined" || neviditelnost === undefined)
{
return;
/* alert("API kontrola viditelnosti stránky nefunguje."); */
}
else
{
/* API viditelnosti je v pořádku */

if(this.zalozeno!=true)
{
/* pokud nebude audio mp3 zalozeno - založí se */
this.zaloz(); /* založí audio mp3 */
}

document.addEventListener( this.udalos_viditelnost , this , false ); /* aktivuje posluchač události */
this.aktivovan=true;
}};

hlidac.DEaktivace=function(){
document.removeEventListener( this.udalos_viditelnost , this , false );
this.aktivovan=false;
};


hlidac.handleEvent = function(){

if(document.visibilityState === "hidden") /* pokud není obrazovka s apllikací viditelná */
{
/* POKUD DOJDE K USPÁNÍ OKNA APLIKACE */

if(this.odpocet==true) /* proměnná, která z vlk.js dáva informaci o tom, že odpočet se počítá */
{
f_video.zvuk("ztlumit");  /* vypne zvuk videa aby nezasahovalo do alarmu - manualní nastavení způsobí shasnutí obrazovky */
this.mp3.play(); /* přehraje zvuk */
this.casovac=setInterval(this.zesiluj.bind(this),this.TIME); /* začne postupně zesilovat zvuk */
}

}
else
{
/* POKUD DOJDE K OPĚTOVNÉMU ZBUZENÍ OKNA APLIKACE */

if(this.odpocet==true) /* proměnná, která z vlk.js dáva informaci o tom, že odpočet se počítá */
{
clearInterval(this.casovac); /* vypne interval, který postupně zesiloval zvuk */
this.mp3.pause();
this.volume_min=0.01; /* dá nejnižší hlasitost na default */
this.mp3.volume=this.volume_min; /* nastaví hlasitost audia na minimum */
f_video.zvuk("zesilit");  /* zapne zvuk videa aby nezasahovalo do alarmu - manualní nastavení způsobí shasnutí obrazovky */
dia.on(dia.id[3]); /* v autorun.js */
}
else
{
/* v případě, že by bylo okno opět aktivováno a přitom byla aktivní výzva k obchůzce včetně alarmu */
clearInterval(this.casovac); /* vypne interval, který postupně zesiloval zvuk */
this.mp3.pause();
this.volume_min=0.01; /* dá nejnižší hlasitost na default */
this.mp3.volume=this.volume_min; /* nastaví hlasitost audia na minimum */
}

v_port.handleEvent(); /* aktivuje propočet velikosti ona podle VisualViewport API - na některých zaříueních např. iPad dojde jinak ke "scvrknutí" okna aplikace */
uzamceni.jednou(); /* pokud bude aktivní zámek obrazovky - zobrazí, že je aplikace uzamčena */
}
};

var f_video={aktivovano:false,id:"f-v",fake_video:"",TIME:20000};
f_video.casovac;

f_video.zvuk=function(co){

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
}};

f_video.pust=function(){

if(this.aktivovano==false)
{
this.aktivovano=true;
}

this.fake_video=document.getElementById(this.id); /* načte objekt fake video globální proměnné, jinak se to kouše v Safari */

this.fake_video.play();  /* spustí fake video - globální proměnná objektu je ve stránce pod objektem video */
document.getElementById(this.id).style.visibility="hidden";

clearTimeout(this.casovac);
this.casovac= setTimeout(this.pust.bind(this) , this.TIME); /* zapne přehrávání videa za 20sekund  */
};

posuvnik.zahajeni(); /* funkce za určitý počet sekund schová posuvníky body, pokud nebude pohyb myši anebo kolečka myši */

uloz.p.ochrany=true; /* MUSÍ BÝT NA POSLEDNÍM ŘÁDKU KNIHOVNY - v oziv.js - informuje o načtení této js knihovny */
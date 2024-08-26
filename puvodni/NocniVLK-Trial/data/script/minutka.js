const minutka={
aktivni:false, // proměnná určuje zda je minutka aktivní
zapnuta:true, // proměnná slouží k potřebám oživení, aby bylo na Local storage uloženo, zda je minutka zapnuta=true anebo byla vypnuta=false
opakovat:false, // proměnná určuje, zda je zapnuté opakování minutky, ano=true, ne=false
id_check:["opak_min1","opak_min2"], // id checketů (zatrhávacích políček) pro možnost opakovat minutku 1=spuštění, 2=info dia okno
id_zadani:["m-p-10","m-m-10","m-p-1","m-m-1"], // id objektů, kterým má být přidělen posluchač v zadání minutky
int_zad:1, // defalt hodnota intervalu zadání minutky v minutách
id_box_uk:"box-min-odpocet", // id boxu v kterém je vizuální ukazatel a zároveň se v něm zobrazuje ukončení minutky
display:"flex", // proměnná určuje css style dysplay id boxu v kterém je vizuální ukazatel a zároveň se v něm zobrazuje ukončení minutky
id_viz_uk:["min-vizual","min-svg-vizual","uk-min-min","uk-min-sec1","uk-min-sec2","min-odp-box"], // id buttonu a obsažených prvků v tomto buttonu (svg minutky + text odpočtu), kde je vizuálně zobrazen odpočet
id_uk:"min-ukaz", // id prvku span pro ukazatel intervalu minutky
id_info_uk:["uk-min-min-info","uk-min-sec1-info","uk-min-sec2-info"], // id prvků informace minutka ukazatel minuty a sekundy
id_info_popisek:"min-inf-pop", // id prvku popisku minutky v informačním dialogu k minutce
id_popisek_input:"popis-m", // id input type text popisku v zadání minutky
popisek:"", // proměnná zachycuje popisek minutky nastavený uživatelem při jejím spouštění
spust:"spust-minutku", // id formulář Spustit v zadání Minutky
alarm:false, // proměnná určuje zda je minutka v timeoutu, tedy v alarmu, tru=ano, false=ne
konecny_cas:null,  // konečný čas v milisekundách v porovnání s počátečním časem v milisekundách od nulového data (1. ledna 1970 00:00:00 UTC)
id_timeout:["blok-timeout","popisek-timeout","but-timeout"], // id prvků, které se zobrazí, když nastane timeout minutky
css_timeout:["timeout-min","budik","zar","zar-nonstop"], // název css třídy, která se aplikuje na box vizuálního odpočtu pro zobrazení popisku a buttonu pro ukončení minutky, aplikuje css animaci blikání rámečku
max_obnova:3600000, // maximální čas obnovy (v ms) po plánovaném timeoutu - 3600000ms = 60 min
blikni(){
// blikne odpočtem, pokud někdo znovu klikne na ikonky minutka, a minutka je přitom již aktivní
document.getElementById(this.id_viz_uk[0]).classList.remove(this.css_timeout[2]); // odebere třídu class k buttonu odpočtu, která prvek dočasné rozzáří, pokud by byla již dříve přidána

setTimeout(()=>
{
// drobné zpoždění musí být, pokud dojde k dalšímu kliku, odebrání a přidání třídy s animací se nezvládne bez zpoždění provést
document.getElementById(this.id_viz_uk[0]).classList.add(this.css_timeout[2]); // přidá třídu class k buttonu odpočtu, která prvek dočasné rozzáří
}
,250);

},
pis_popisek(){
// funkce pomocí posluchače na input type text, v reálném čase zapisuje popisek minutky do promenné this.popisek
const a_popisek=document.getElementById(this.id_popisek_input).value; // zjistí value inputu s popiskem
this.popisek=a_popisek; // value input type text zapíše do proměnné this.popisek
uloz.uloz(uloz.klice[16],a_popisek); // uloží do Local Storage popisek Minutky - funkce v oziv.js
},

zmen_popisky(){
// funkce změní popisky v nastavení minutky a v textu timeoutu minutky podle proměnné this.popisek
const popisek_timeout=document.getElementById(this.id_timeout[1]); // HTML objekt - popisek minutky v timeoutu
const popisek_nastaveni=document.getElementById(this.id_info_popisek); // HTML objekt - popisek minutky v informačním dialogu k minutce, v dodatečném nastavení

popisek_timeout.innerText=this.popisek; // přepíše popisek hodnotou v proměnné this.popisek
popisek_nastaveni.innerText=this.popisek;  // přepíše popisek hodnotou v proměnné this.popisek
},

opakovat_zmena(checked)
{
const check1=document.getElementById(this.id_check[0]); // HTML objekt - checked (zatrhávací pole) v zadání minutky
const check2=document.getElementById(this.id_check[1]); // HTML objekt - checked (zatrhávací pole) v iformačním dia okně minutky

check1.checked=checked; // změní hodnotu checketu na takovou jaká byla zaslána do funkce
check2.checked=checked; // změní hodnotu checketu na takovou jaká byla zaslána do funkce

this.opakovat=checked; // změní proměnou this.opakovat na takovou jaká byla zaslána do funkce, true= ano opakovat, false= ne neopakovat minutku po jejím ukončení
uloz.uloz(uloz.klice[18],this.opakovat); // uloží do Local Storage, zda chce uživatel minutku opakovat - funkce v oziv.js
},


posON_zadani(){
// aktivace posluchačů událostí pro Zadání Minutky (mimo Křížek a Zrušit minutku, který je v const dia v centrum .js)

document.getElementById(this.spust).addEventListener("submit",this); // Pro formulář, který je spojen s buttonem Spustit Minutku, button nastaven na submit

document.getElementById(this.id_check[0]).addEventListener("input",this); // pro checked (zatrhávací políčko) Opakovat minutku po jejím ukončení

document.getElementById(this.id_popisek_input).addEventListener("input",this); // pro input type text - zadání popisku minutky

let d=this.id_zadani.length; // délka pole s id objektů, kterým má být přidělen posluchač v zadání minutky
for(let i=0;i<d;i++)
{
document.getElementById(this.id_zadani[i]).addEventListener("click",this); // přidání posluchače klik jednotlivým buttonům v poli this.id_zadani
}},

posOFF_zadani(){
// DEaktivace posluchačů událostí pro Zadání Minutky (mimo Křížek a Zrušit minutku, který je v const dia v centrum .js)

document.getElementById(this.spust).removeEventListener("submit",this); // odebrání Pro formulář, který je spojen s buttonem Spustit Minutku, button nastaven na submit

document.getElementById(this.id_check[0]).removeEventListener("input",this); // pro checked (zatrhávací políčko) Opakovat minutku po jejím ukončení

document.getElementById(this.id_popisek_input).removeEventListener("input",this); // pro input type text - zadání popisku minutky

let d=this.id_zadani.length; // délka pole s id objektů, kterým má být přidělen posluchač v zadání minutky
for(let i=0;i<d;i++)
{
document.getElementById(this.id_zadani[i]).removeEventListener("click",this); // odebrání posluchače klik jednotlivým buttonům v poli this.id_zadani
}

},

int_zad_zmen(pozadavek=""){
// funkce mění ukazatel zadání intervalu minutky

let p=pozadavek; // proměnná kopíruje zaslaný požadavek do funkce na změnu ukazatele zadání intervalu minutky
let z=this.int_zad; // načte aktuální interval zadání v minutách

if(p=="p10")
{
// pokud je požadavek + 10 min
z=z+10; // přidá + 10 k hodnotě
}
else if(p=="m10")
{
// pokud je požadavek - 10 min
z=z-10; // odečte - 10 k hodnotě
}
else if(p=="p1")
{
// pokud je požadavek + 1 min
z=z+1; // přidá + 1 k hodnotě
}
else if(p=="m1")
{
// pokud je požadavek - 1 min
z=z-1; // odečte - 1 k hodnotě
}

if(p=="p10"||p=="m10"||p=="p1"||p=="m1")
{
// pokud byl zaslán požadavek, došlo ke změně kliknutím na button a bude přehrán zvuk kliknutí
klik.hraj(false); // bude přehrávat zvuk 1x klik 
}




if(z<=1)
{
z=1; // pokud bude nastaven interval menší než 1 minuta - bude interval 1 minuta
document.getElementById(this.id_zadani[1]).disabled=true; // dá button -10min na disabled
document.getElementById(this.id_zadani[3]).disabled=true; // dá button -1min na disabled
}
else
{
document.getElementById(this.id_zadani[1]).disabled=false; // odstraní disabled na button -10min
document.getElementById(this.id_zadani[3]).disabled=false; // odstraní disabled na button -1min
}

if(z>=120)
{
z=120; // pokud bude nastaven interval větší než 120 minut - bude interval 120 minut
document.getElementById(this.id_zadani[0]).disabled=true; // dá button +10min na disabled
document.getElementById(this.id_zadani[2]).disabled=true; // dá button +1min na disabled
}
else
{
document.getElementById(this.id_zadani[0]).disabled=false; // odstraní disabled na button +10min
document.getElementById(this.id_zadani[2]).disabled=false; // odstraní disabled na button +1min
}

this.int_zad=z; // přepíše hodnotu intervalu zadání minutky v minutách

document.getElementById(this.id_uk).innerText=z; // přepíše ukazatel intervalu minutky ve spanu viditelném pro uživatele

uloz.uloz(uloz.klice[19],z); // uloží do Local Storage, 19. klíč ukládá interval minutky, který byl zadán v minutách

},
posON_odpocet(){
// funkce zapne veškeré posluchače událostí, ve vizuálním odpočtu minutky včetně posluchače pro její ukončení
document.getElementById(this.id_viz_uk[0]).addEventListener("click",this); // přidá posluchač události click na buttonu s odpočtem minutky
},
posOFF_odpocet(){
// funkce odebere veškeré posluchače událostí, ve vizuálním odpočtu minutky včetně posluchače pro její ukončení
document.getElementById(this.id_viz_uk[0]).removeEventListener("click",this); // přidá posluchač události click na buttonu s odpočtem minutky
},
spustit(oziveni=false){

zvuk_min.hraj(false); // bude přehrávat zvuk upozornění minutky 1x - ve vlk.js
document.getElementById(this.id_box_uk).style.zIndex=5; // dočasně zvýší Z-index kvůli případnému opakování minutky
document.getElementById(this.id_box_uk).style.display=this.display; // zobrazí box pro odpočet minutky (box obsahuje: vizuální odpočet + prvky na ukončení)
zamek.blok(); // aktivuje blokaci zámku obrazovky
window.hlidac.aktivace(); // aktivuje ochranu před uspáním v ochrany.js
hlidac.minutka=true; // ochana před uspáním aplikace - tato proměnná hlídá jestli je funkce minutky aktivní, pokud je odpočet minutky aktivní=true pokud ne=false
window.onbeforeunload=()=>{return "Chcete zavřít aplikaci Noční VLK?";}; // ochrana před náhodným uzavřením aplikace

if(oziveni)
{
// pokud byla minutka spuštěna tak, že došlo k jejímu oživení
}
else
{
// pokud byla minutka spuštěna běžně, bez jejího oživení

dia.off(dia.id[9]); // vypne dialogové okno spoutění Minutky a odebere všechny posluchače dialogového okna v centrum.js
this.cas_minutky(); // vypočítá počáteční a konečný čas intervalu minutky
}


this.zmen_popisky(); // funkce změní popisky v nastavení minutky a v textu timeoutu minutky podle proměnné this.popisek


setTimeout(()=>
{
// drobné zpoždění umožní postupné zviditelnění minutky
document.getElementById(this.id_box_uk).style.opacity=1; // postupně zneviditelní box pro odpočet minutky (box obsahuje: vizuální odpočet + prvky na ukončení)
}
,100);

setTimeout(()=>
{
// drobné zpoždění umožní blikání až po úplném zviditelnění boxu s minutkou
this.blikni(); // rozbliká odpočet minutky 2x
}
,350);

setTimeout(()=>
{
// drobné zpoždění odebrání z-indexu minutky v případě jejího opakování a spuštění jiného okna například nastavení, umožní provést efekt bliknutí minutky
document.getElementById(this.id_box_uk).style.zIndex=1; // dá z-index minutky na default
}
,2000);

this.posON_odpocet(); // funkce zapne veškeré posluchače událostí, ve vizuálním odpočtu minutky včetně posluchače pro její ukončení

this.aktivni=true; // nastaví proměnnou  na true, což signalizuje, že minutka je aktivní

uloz.uloz(uloz.klice[17],true); // uloží do Local Storage, že minutka byla zapnuta v oziv.js, smazání tohoto klíče je ve funkci this.ukoncit()

},

cas_minutky(){
// funkce vypočítá konečný čas minutky podle nastaveného intervalu uživatelem

const p=Date.now(); // vrátí počet milisekund od nulového data (1. ledna 1970 00:00:00 UTC)
const int=this.int_zad * 60 * 1000; // proměnná vypočítá čas v milisekundách z intervalu zadaným uživatelem
this.konecny_cas=p+int; // konečný čas v milisekundách v porovnání s počátečním časem v milisekundách od nulového data (1. ledna 1970 00:00:00 UTC)

uloz.uloz(uloz.klice[15],this.konecny_cas); // uloží konečný čas v milisekundách v porovnání s počátečním časem v milisekundách od nulového data (1. ledna 1970 00:00:00 UTC) na LocalStorage - v ozivit.js

},
odpocet(){
const uk_min=document.getElementById(this.id_viz_uk[2]); // HTML objekt ukazující minuty
const uk_sec1=document.getElementById(this.id_viz_uk[3]); // HTML objekt ukazující sekundy 1X, první znak
const uk_sec2=document.getElementById(this.id_viz_uk[4]); // HTML objekt ukazující sekundy X1, druhý znak

const a_cas=Date.now(); // aktuální čas - vrátí počet milisekund od nulového data (1. ledna 1970 00:00:00 UTC)
const k_cas=this.konecny_cas; // konečný čas minutky v milisekundách od nulového data (1. ledna 1970 00:00:00 UTC) viz funkce cas_minutky

let zbytek_cas=a_cas-k_cas; // zbytek času v minisekundách
zbytek_cas=parseInt(zbytek_cas/1000); // zbytek času v sekundách
zbytek_cas=zbytek_cas*(-1); // odstraní záporné číslo, kdyby bylo

let zbyva_sec=zbytek_cas%60; // zbývá sekund
let zbyva_min=(zbytek_cas-zbyva_sec)/60; // zbývá minut




if(zbyva_sec<10)
{
// pokud bude méně než 10 sekund doplní před zbývající sekundy 0-9 jednu 0
zbyva_sec=`0${zbyva_sec}`; // doplní 0 jako první číslici dvojčíslí, tímto vytvoří textový řetězec
}
else
{
zbyva_sec=zbyva_sec.toString(); // převede číslo na textový řetězec
}

uk_min.innerText=zbyva_min; // přepíše ukazatel zbývajících minut
uk_sec1.innerText=zbyva_sec[0]; // přepíše ukazatel zbývajících sekund, první číslo, 1X
uk_sec2.innerText=zbyva_sec[1]; // přepíše ukazatel zbývajících sekund, druhé číslo, X1

if(dia.aktivni==dia.id[10])
{
// pokud bude aktivní dialogové okno informace o minutce, začne přepisovat čas zbývajícího intervalu i v tomto dialogovém okně, porovnávací proměnné v centrum.js
document.getElementById(this.id_info_uk[0]).innerText=zbyva_min; // přepíše ukazatel zbývajících minut v dialogovém okně informace o minutce
document.getElementById(this.id_info_uk[1]).innerText=zbyva_sec[0]; // přepíše ukazatel zbývajících sekund, první číslo, 1X v dialogovém okně informace o minutce
document.getElementById(this.id_info_uk[2]).innerText=zbyva_sec[1]; // přepíše ukazatel zbývajících sekund, druhé číslo, X1 v dialogovém okně informace o minutce
}


if(a_cas>=k_cas)
{
// pokud dojde k tomu, že interval vypršel
uk_min.innerText=0; // přepíše ukazatel zbývajících minut na 0
uk_sec1.innerText=0; // přepíše ukazatel zbývajících sekund, první číslo, 1X na 0
uk_sec2.innerText=0; // přepíše ukazatel zbývajících sekund, druhé číslo, X1 na 0

this.timeout(); // funkce zajistí veškeré procesy spojené s ukončením minutky
}

},


timeout()
{
// veškeré procesy, které nastanou bezprostředně po uběhnutí intervalu minutky
hlidac.minutka=false; // ochana před uspáním aplikace - tato proměnná hlídá jestli je funkce minutky aktivní, pokud je odpočet minutky aktivní=true pokud ne=false
this.alarm=true; // proměnná určuje zda je minutka v timeoutu, tedy v alarmu, tru=ano, false=ne
f_video.zvuk("ztlumit");  // vypne zvuk videa aby nezasahovalo do alarmu - manualní nastavení způsobí shasnutí obrazovky
zvuk_min.hraj(true); // bude přehrávat zvuk upozornění minutky dokola ve vlk.js

dia.vyp_akt(); // vypne aktivní dialogové okno - pokud je - v centrum.js
document.getElementById(this.id_box_uk).style.zIndex=5; // zvýší Zindex celému ukazateli minuty, aby překryl všechny ostatní prvky
document.getElementById(this.id_box_uk).classList.add(this.css_timeout[0]); // přidá css třídu, která zobrazí popisek minutky a tlačítko na ukončení
document.getElementById(this.id_viz_uk[1]).classList.add(this.css_timeout[1]); // přidá css třídu, která spustí animaci budíku na svg minutky
document.getElementById(this.id_viz_uk[0]).classList.add(this.css_timeout[3]); // přidá třídu class k buttonu odpočtu, která prvek dočasné rozzáří
document.getElementById(this.id_timeout[0]).style.opacity=0; // nechá blok timeout (s popiskem a buttonem pro zrušení minutky) neviditelný
document.getElementById(this.id_timeout[0]).style.display="block"; // zviditelní blok timeout (s popiskem a buttonem pro zrušení minutky)


setTimeout(()=>{
// menší zpoždění umožní css vlastnosti transition, aby objekt blok timeout se pomalu objevil
document.getElementById(this.id_timeout[0]).style.opacity=1; // bude blok timeout (s popiskem a buttonem pro zrušení minutky) viditelný
document.getElementById(this.id_timeout[2]).focus(); // provede focus na buttonu OK - u timeoutu minutky
},100);

document.getElementById(this.id_timeout[2]).addEventListener("click",this); // přidá posluchač události click na buttonu OK - u timeoutu minutky

this.posOFF_odpocet(); // odebere posluchač událostí kliknutí na vizuální odpočet minutky
this.aktivni=false; // proměnná určuje, že minutka již není aktivní
document.getElementById(this.id_box_uk).style.opacity=1; // nastaví box s ukazatelem minutky na opacity 1, protože Zámek obrazovky ho nastavuje na 0 (aby se v době aktivace zámku nezobrazovala minutka na obrazovce) , více v "const zamek"

},
handleEvent(e){

const k=e.target.id; // zjistí id prvku na který bylo kliknuto

if(k==this.id_zadani[0])
{
// klik + 10 min
this.int_zad_zmen("p10"); // pošle do funce požadavek na zvýšení intervalu minutky o 10 minut
}

if(k==this.id_zadani[1])
{
// klik - 10 min
this.int_zad_zmen("m10"); // pošle do funce požadavek na snížení intervalu minutky o 10 minut
}

if(k==this.id_zadani[2])
{
// klik + 1 min
this.int_zad_zmen("p1"); // pošle do funce požadavek na zvýšení intervalu minutky o 1 minutu
}


if(k==this.id_zadani[3])
{
// klik - 1 min
this.int_zad_zmen("m1"); // pošle do funce požadavek na snížení intervalu minutky o 1 minut
}


if(k==this.spust)
{
// klik na Spustit Minutku
this.spustit(); // funkce zajistí potřebné kroky pro aktivaci minutky
}


if(k==this.id_viz_uk[0]||k==this.id_viz_uk[1]||k==this.id_viz_uk[2]||k==this.id_viz_uk[3]||k==this.id_viz_uk[4]||k==this.id_viz_uk[5])
{
// klik na vizuální box s odpočtem minutky (button s odpočtem) včetně prvků, které obsahuje
klik.hraj(false); // bude přehrávat zvuk 1x klik
dia.on(dia.id[10]); /* zapne dialogové okno s informacemi o minutce a možností jejího zrušení, funkce v centrum.js */
this.odpocet(); // aby nedošlo k prodlevě kliku a odpočtu v informačním okně, spustí funkci odpočtu, aby okamžitě přepsala stav do konce intervalu Minutky
}

if(k==this.id_timeout[2])
{
// klik na OK - ukončení Timeoutu minutky
this.ukoncit(); // funkce ukončí veškeré procesy, které nastanou po zmáčknutí OK timeoutu minutky
}

if(k==this.id_popisek_input)
{
// vepsán znak do input text popisek minutky
this.pis_popisek(); // funkce zajistí přepis z input type text popis minutky do proměnné this.popisek
}


if(k==this.id_check[0])
{
// klik na checked (zatrhávací políčko) Opakovat minutku po jejím ukončení - v Spuštění minutky 
this.opakovat_zmena(e.target.checked); // funkce zajistí změny v proměnné a druhém checketu v informačním okně podle hodnoty, které v aktuálním checketu byla nastavena
}



},
ukoncit(){
// funkce ukončí veškeré procesy, které nastanou po zmáčknutí OK timeoutu minutky
hlidac.minutka=false; // ochana před uspáním aplikace - tato proměnná hlídá jestli je funkce minutky aktivní, pokud je odpočet minutky aktivní=true pokud ne=false
this.alarm=false; // proměnná určuje zda je minutka v timeoutu, tedy v alarmu, tru=ano, false=ne
document.getElementById(this.id_timeout[2]).removeEventListener("click",this); // odebere posluchač události click na buttonu OK - u timeoutu minutky
zvuk_min.zastav(); /* zastaví zvuk upozornění na obchůzku ve vlk.js */
f_video.zvuk("zesilit");  /* zapne zvuk videa aby nezasahovalo do alarmu - manualní nastavení způsobí shasnutí obrazovky */
uzamceni.jednou(); /* pokud bude aktivní zámek obrazovky - zobrazí, že je aplikace uzamčena - v centrum.js */

setTimeout(()=>{
// zpoždění umožní css vlastnosti transition, aby objekt minutky pomalu vymyzel
document.getElementById(this.id_box_uk).style.opacity=0; // postupně zneviditelní box pro odpočet minutky (box obsahuje: vizuální odpočet + prvky na ukončení)
},250);

setTimeout(()=>{
// zpoždění umožní css vlastnosti transition, aby objekt minutky pomalu vymyzel
document.getElementById(this.id_box_uk).classList.remove(this.css_timeout[0]); // odebere css třídu, která zobrazí popisek minutky a tlačítko na ukončení
document.getElementById(this.id_viz_uk[1]).classList.remove(this.css_timeout[1]); // odebere css třídu, která spustí animaci budíku na svg minutky
document.getElementById(this.id_viz_uk[0]).classList.remove(this.css_timeout[3]); // odebere třídu class k buttonu odpočtu, která prvek dočasné rozzáří
document.getElementById(this.id_timeout[0]).style.display="none"; // vypne se blok timeout (s popiskem a buttonem pro zrušení minutky)
document.getElementById(this.id_box_uk).style.display="none"; // schová box pro odpočet minutky (box obsahuje: vizuální odpočet + prvky na ukončení)
document.getElementById(this.id_box_uk).style.zIndex=1; // vrátí na default Zindex, celé minutky, který byl zvýšen při timeoutu, viz funkce this.timeout

if(this.opakovat)
{
// pokud uživatel aktivoval opakování minutky
this.spustit(); // spustí opět minutku
}

},500);

uloz.smaz(uloz.klice[17]); /* smaže informaci z local storage, je minutka zapnuta */

},
zrusit(){
// funkce provede veškeré potřbné procesy pro zrušení minutky
hlidac.minutka=false; // ochana před uspáním aplikace - tato proměnná hlídá jestli je funkce minutky aktivní, pokud je odpočet minutky aktivní=true pokud ne=false
this.aktivni=false; // nastaví proměnnou tak, aby aplikace věděla, že minutka již není aktivní
this.konecny_cas=null; // vynuluje proměnnou určující konečný čas minutky
this.posOFF_odpocet(); // funkce vypne veškeré posluchače událostí, ve vizuálním odpočtu minutky včetně posluchače pro její zrušení
document.getElementById(this.id_box_uk).style.display="none"; // schová box pro odpočet minutky (box obsahuje: vizuální odpočet + prvky na ukončení)
text.pis("Minutka byla zrušena"); // text pře celou obrazovku, funkce v centrum.js
gong.hraj(false); /* zahraje GONG.mp3 - FALSE = 1x */
uloz.smaz(uloz.klice[17]); /* smaže informaci z local storage, je minutka zapnuta */
},
ozivit(){
// funkce provede veškeré procesy pro oživení minutky

if(!uloz.ok){return false;} // pokud nefunguje LocalStorage bude return - funkce v oziv.js

let opakovat_minutku=uloz.nacti(uloz.klice[18]); // načítání z LocalStorage (v ozivit.js) - 18. klíč ukládá jesli chtěl minutku uživatel opakovat

if(opakovat_minutku=="true"||opakovat_minutku=="false")
{
// pokud bude uživatelem uložena varianta opakovat minutku, anebo ji neopakovat
const check1=document.getElementById(this.id_check[0]); // načte input type=checked v zadání minutky pro volbu opakování minutky
const check2=document.getElementById(this.id_check[1]); // načte input type=checked v informačním okně pro minutku pro volbu opakování minutky

if(opakovat_minutku=="true")
{
// pokud uživatel měl zaškrklé pole opakovat minutku - zaškrknou se oba checkety - v nastavení Minutky a v informačním okně pro Minutku
check1.checked=true;
check2.checked=true;
this.opakovat=true; // změní proměnou , true= ano opakovat, false= ne neopakovat minutku po jejím ukončení
}
else
{
// pokud uživatel NEměl zaškrklé pole opakovat minutku - ODškrknou se oba checkety - v nastavení Minutky a v informačním okně pro Minutku
check1.checked=false;
check2.checked=false;
this.opakovat=false; // změní proměnou , true= ano opakovat, false= ne neopakovat minutku po jejím ukončení
}}

let interval_minutky=uloz.nacti(uloz.klice[19]); // načte z Local Storage, 19. klíč ukládá interval minutky, který byl zadán v minutách
if(interval_minutky!="")
{
// pokud byl načten interval minutky
interval_minutky=parseInt(interval_minutky); // převede textový řetězec na číslo
this.int_zad=interval_minutky; // přepíše hodnotu intervalu zadání minutky v minutách
this.int_zad_zmen(); // funkce provede změnu intervalu, změna je zaslána bez požadavku, tedy poze změní default hodnoty podle velikosti intervalu
}


let popisek=uloz.nacti(uloz.klice[16]); // načítání z LocalStorage (v ozivit.js) - 16. klíč ukládá popisek minutky

if(popisek=="")
{
// pokud nebude žádný popisek minutky načten, bude return a další kroky obnovy budou přerušeny
return false;
}
else
{
document.getElementById(this.id_popisek_input).value=popisek; // změní popisek minutky v input type=text pro zadání minutky
this.popisek=popisek; // změní proměnnou, která určuje popisek minutky
}

let minutka_zapnuta=uloz.nacti(uloz.klice[17]); // načítání z LocalStorage (v ozivit.js) - 17. klíč ukládá jesli byla minutka zapnuta=true anebo vypnuta=delete klíč

if(minutka_zapnuta!="true")
{
// pokud nebyla minutka zapnuta, což právě jednoznačně ukazuje parametr proměnné TRUE, bude return a další kroky obnovy budou přerušeny
return false;
}

let timeout=uloz.nacti(uloz.klice[15]); // načítání z LocalStorage (v ozivit.js) - 15. klíč ukládá čas, kdy nastane timeout Minutky - počet milisekund od nulového data (1. ledna 1970 00:00:00 UTC)
timeout=parseInt(timeout); // převede čas z textového řetětce na číslo
let navic_time=this.max_obnova; // načte maximální čas (v milisekundách) obnovy po plánovaném timeoutu
const cas_aktual=Date.now(); // vrátí počet milisekund od nulového data (1. ledna 1970 00:00:00 UTC)
cas_pro_oziveni=timeout+navic_time; // k času timeautu Minutky přičte maximální čas pro čas obnovy

if(cas_pro_oziveni<cas_aktual)
{
// pokud bude čas pro oživení menší než aktuální čas, bude return a další kroky obnovy budou přerušeny
return false;
}
else
{
this.konecny_cas=timeout; // do proměnné zapíše konečný čas minutky - počet milisekund od nulového data (1. ledna 1970 00:00:00 UTC)
}

return true; // vrátí hodnotu true - minutka je připravena k obnově
}


};

pripravenost.minutka=true; /* MUSÍ BÝT NA POSLEDNÍM ŘÁDKU KNIHOVNY - v autorun.js - informuje o načtení této js knihovny */
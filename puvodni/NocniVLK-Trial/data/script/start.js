const licence={
// objekt licence otevře dialogové okno s licenčními podmínkami
id_a:"licen", // id odkazu, který spouští dialogové okno
id_dia:"dia-lic", // id dialogového okna
id_dia_butt:"but-lic", // id buttonu pro zavření dialogového kona
id_dia_nad:"nad-l", // id nadpisu dialogového okna
id_dia_bottom:"bot-kot", // id kotvy na konci dialogového okna
t:600, // čas za který má proběhnout scroll na nadpis dialogového okna
tb:100, // čas za který se má provést scroll na konec dialogového okna

pust(funkce){
// změna href odkazu na funkci javascriptu
const odkaz=document.getElementById(this.id_a); // načte objekt odkazu
odkaz.href=`javascript:${funkce}.dia("${this.id_dia_nad}","${this.id_dia_bottom}");`; // změna hrev odkazu
},
dia(nad_id,bottom_id){
const okno=document.getElementById(this.id_dia); // načte objekt dialogového okna
this._posluchac(); // zpne posluchač buttonu pro zavření dialogového okna
okno.showModal(); // otevře dialogové okno
if(bottom_id)
{
// pokud je kotva na konci dialogového okna určena
setTimeout(`document.getElementById("${bottom_id}").scrollIntoView({behavior:"smooth"});`,this.tb); /* posun za čas T na kotvu, která je na konci dialogového okna */
}
setTimeout(`document.getElementById("${nad_id}").scrollIntoView({behavior:"smooth"});`,this.t); /* posun za čas T na nadpis dialogového okna */
},
_posluchac(){
const tl=document.getElementById(this.id_dia_butt), /* tlačítko */
o=document.getElementById(this.id_dia); /* dia okno */
tl.addEventListener("click",()=>{o.close();}); /* přidá posluchač click k buttonu dia okna na jeho zavření */
}};

const f=function(o){
document.getElementById(o).focus(); /* fokus na objekt */
};

const b=function(o){
document.getElementById(o).blur(); /* blur z objektu */
};


const kontakt=Object.create(licence); /* kopie objektu licence pro kontakt */
{kontakt.id_a="kont-1";kontakt.id_dia="dia-kon";kontakt.id_dia_butt="but-kon";kontakt.id_dia_nad="nad-kon";} /* změna id pro kontakt */


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
kop.style.opacity=1; // zvýší opacity textu ZKOPÍROVÁNO na 1
kop.style.zIndex=1; // zvýší z-index textu ZKOPÍROVÁNO na 1
t.removeEventListener("click",this); // odebere buttonu Kopírovat email, posluchač klik
this.k_do_schranky(); // funkce zajistí zkopírování obsahu in put type="text" do schránky
setTimeout(()=>{
t.addEventListener("click",this); // přidá buttonu Kopírovat email, posluchač klik
kop.style.opacity=0; // sníží opacity textu ZKOPÍROVÁNO na 0
kop.style.zIndex=-1; // sníží z-index textu ZKOPÍROVÁNO na -1
},this.T); // časové zpoždění pro transition opacity
}
},
text_postupne(){
// funkce postupně vypíše text emailu
const e_delka=this.email.length; // délka řetězce dočasného emailu
if(e_delka==this.delka)
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

const souhlas={id_ch:"souh",
posluchac(){
let check=document.getElementById(this.id_ch); /* checked souhlasu s licenčními podmínkami */
check.addEventListener("click",this);
},
handleEvent(){
const check=document.getElementById(this.id_ch);
if(check.checked==true)
{
pokr1.posluchac(); /* aktivuje posluchač k button Dále */
f(pokr1.id_but); /* fokus buttonu */
}
else if(check.checked==false)
{
pokr1.posluchacOff(); /* vypne posluchač k buttonu dále */
b(pokr1.id_but); /* blur buttonu */
}}};

const test={ready_ul:null,ready_usp:null,ready_bl:null,class_ok:" t-ok",class_ko:" t-ko",id_uspa:["img-uspa","b-usp-ch"],id_ukla:["img-ukla","b-data-ch"],
/* ready_ul == výsledek test localstorage , ready_bl == výsledek testu blokace uzamykání obrazovky , ready_usp == výsledek testu ochrany proti uspávání */

uloziste(){
/* detekce zda funguje localstorage */
try
{
return this.ready_ul="localStorage" in window && window["localStorage"] !== null; /* pokud funkce localstorage funguje vrátí hodnotu true - uloziste.ready == true */
}
catch(e)
{
return this.ready_ul=false; /* pokud funkce localstorage NEfunguje vrátí hodnotu false - uloziste.ready == false */
}},
blokace(){
/* test jesli je Blokace zámku obrazovky v pohlížeči povolena - pokud NE - NÁHRADNÍ ŘEŠENÍ - nefunguje na telefonech !!!! */
if('wakeLock' in navigator)
{
return this.ready_bl=true;
}
else
{
return this.ready_bl=false;
}},
uspani(){
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
if(typeof document.addEventListener==="undefined"||neviditelnost===undefined)
{
/* API viditelnosti nefunguje */
return this.ready_usp=false;
}
else
{
/* API viditelnosti funguje */
return this.ready_usp=true;
}},
vyhod(){
/* funkce provede všechny potřebné opatření podle výsledku testů */

/* opatření k testu ochrana před uspáním */
let c_us="",d_us="";
if(this.ready_usp==true)
{
c_us=this.class_ok;
d_us="none";
}
else
{
c_us=this.class_ko;
d_us="block";
}
document.getElementById(this.id_uspa[0]).className+=c_us; /* přidá třídu s patřičným obrázkem */
document.getElementById(this.id_uspa[1]).style.display=d_us; /* zobrazí anebo nezobrazí chybovou informaci */

/* opatření k testu ukládání dat - localstorage */
let c_ul="",d_ul="";
if(this.ready_ul==true)
{
c_ul=this.class_ok;
d_ul="none";
}
else
{
c_ul=this.class_ko;
d_ul="block";
}
document.getElementById(this.id_ukla[0]).className+=c_ul; /* přidá třídu s patřičným obrázkem */
document.getElementById(this.id_ukla[1]).style.display=d_ul;  /* zobrazí anebo nezobrazí chybovou informaci */
},
all(){
/* funkce provede všechny potřebné testy */
this.uloziste();
this.uspani();
this.blokace();
}};


const zvuk={mp3:null,cesta:"data/alarm/alarm1.mp3",id_animace:"tz_1",nahrano:null,smicka:2000,casovac:null,
nahraj(){
this.mp3=new Audio(this.cesta);
this.nahrano=true;
},
hrajSan(){
if(this.nahrano!=true)
{
this.nahraj(); /* pokud není mp3 nahraná do paměti - nahraje ji */
}
this.mp3.load();
this.mp3.loop=false; /* zajistí, že přehraje zvuk pouze 1x */
this.mp3.volume=0.75; /* nastavení defaul hlasitosi na 75% */
this.mp3.oncanplaythrough=function(){
document.getElementById(zvuk.id_animace).beginElement(); /* zapne animaci na SVG obrázku */
zvuk.mp3.play();
};
this.casovac=setTimeout(this.hrajSan.bind(this),this.smicka);
}};


const pokr1={id_but:"butt-1",okno1_id:"okno1",okno2_id:"okno2",id_kotva:"h1-logo",CAS:250,
posluchac(){
const tlacitko=document.getElementById(this.id_but);
tlacitko.disabled=false;
f(this.id_but);
tlacitko.title="Pokračovat ve spuštění";
tlacitko.addEventListener("click",this);
},
posluchacOff(){
const tlacitko=document.getElementById(this.id_but);
tlacitko.title="Chybí souhlas s Licenčními podmínkami";
tlacitko.removeEventListener("click",this);
},
handleEvent(){
test.all(); /* provede všechny potřebné testy: localstorage,blokace zámku obrazovky a test proti uspání okna */
test.vyhod(); /* vyhodnocení testu a přijetí opatření - zobrazení chybových hlášení včetně SVG ok anebo ko */
this.prechod();
setTimeout("pokr2.posluchac();",this.CAS+2000);
},
posunUP(){
document.getElementById(this.id_kotva).scrollIntoView({behavior:"smooth"});
},
prechod(){
document.getElementById(this.okno1_id).style.opacity=0;

setTimeout(`document.getElementById("${this.okno1_id}").style.display="none";document.getElementById("${this.okno2_id}").style.display='block';`,this.CAS);
setTimeout(`document.getElementById("${this.okno2_id}").style.opacity=1;`,this.CAS+100);
setTimeout(this.posunUP.bind(this),this.CAS+250); /* zajistí posun okna na hlavní kotvu - Nadpis Logo H1 */
document.getElementById(this.id_but).removeEventListener("click",this); /* odebere posluchač */
}};

const pokr2=Object.create(pokr1); /* udělá kopii objektu */
{pokr2.id_but="butt-2";pokr2.okno1_id="okno2";pokr2.okno2_id="okno3";
pokr2.handleEvent=function(){
zvuk.nahraj(); /* nahraje mp3 do paměti */
this.prechod();
setTimeout("zvuk.hrajSan();pokr3.posluchac();",this.CAS+1000);
};} /* úprava potřebných proměnných a funkcí z kopie objektu */

const obr={min_sirka_aplikace:320,max_sirka_aplikace:800,vyska_aplikace:800,vyska:null,sirka:null,d_vyska:null,d_sirka:null,top:null,left:null,
velikost(){
this.vyska=window.screen.height; /* výška obrazovky */
this.sirka=window.screen.width; /* šířka obrazovky */
this.d_vyska=window.screen.availHeight; /* Dostupná výška obrazovky */
this.d_sirka=window.screen.availWidth; /* Dostupná šířka obrazovky */
this.top=window.screen.availTop; /* Dostupné horní umístění na obrazovce */
this.left=window.screen.availLeft; /* Dostupné levé umístění na obrazovce */
}};

const volbaOkna={okna:[false,false,true,false],id:["o-vlevo","o-cel","o-celso","o-vpravo"],idSVG:["o-vlevoi","o-celi","o-celsoi","o-vpravoi"],barva:"rgba(137,157,120,0.5)",
aktivace(){
this.obarvit();
this.posluchace();
},
posluchace(){
let l=this.id.length;
for(let i=0;i<l;i++)
{
document.getElementById(this.id[i]).addEventListener("click",this);
}},
handleEvent(e){
const k=e.target.id; /* zjistí ID prvku na který bylo kliknuto */
let l=this.okna.length; /* délka pole this.okna */
for(let i=0;i<l;i++)
{
this.okna[i]=false; /* dá všechny tlačítka okna na false */
}

if(k==this.id[0]||k==this.idSVG[0]) /* pokud bylo kliknuto na ID button vlevo anebo SVG v buttonu */
{
this.okna[0]=true;
}
else if(k==this.id[1]||k==this.idSVG[1])
{
this.okna[1]=true;
}
else if(k==this.id[2]||k==this.idSVG[2])
{
this.okna[2]=true;
}
else if(k==this.id[3]||k==this.idSVG[3])
{
this.okna[3]=true;
}
this.obarvit(); /* zajistí správné obarvení tlačítek */
},
obarvit(){
/* obarvíá pozadí toho buttonu, který bude true */
let l=this.okna.length; /* délka pole this.okna */
for(let i=0;i<l;i++)
{
if(this.okna[i]==true)
{
document.getElementById(this.id[i]).style.background=this.barva;
}
else if(this.okna[i]==false)
{
document.getElementById(this.id[i]).style.background="transparent";
}}}};

const otevri={stranka:"",
okno(sirka,vyska,zleva,zhora){
let over={};
over.cas=Date.now(); /* vrátí počet milisekund od nulového data (1. ledna 1970 00:00:00 UTC) */
over.celkem=[over.cas,test.ready_ul,test.ready_usp,test.ready_bl]; /* pole s kontrolní sumou a výsledky testů */
try
{
const konverce=JSON.stringify(over.celkem);
over.kontrola=`?${konverce}`;
this.stranka=`data/index.html${over.kontrola}`;
window.open(this.stranka,"Noční VLK",`width=${sirka},height=${vyska},left=${zleva},top=${zhora}`);
}
catch(e)
{
alert(`Chyba: ${e} Kontaktujte programátora.`);
}
}};

const ende={id_div:"zaver",
uvod(div){
document.getElementById(div).style.display="none";
document.getElementById(this.id_div).style.display="block";
}};


const pokr3=Object.create(pokr1);
{pokr3.id_but="butt-3";
pokr3.okno1_id="okno3";
pokr3.okno2_id="okno4";

pokr3.handleEvent=function(){
clearTimeout(zvuk.casovac); /* vypne časovač přehrávání zvuku */
obr.velikost(); /* zjistí velikost obrazovky zařízení */

if(parseInt(obr.sirka)>1024)
{
/* pokud je obrazovka širší-rovna 1024px, což je rozměr obrazovky malého monitoru PC */
this.prechod();
setTimeout("pokr4.posluchac();",this.CAS+1000);
volbaOkna.aktivace();
}
else
{
otevri.okno(obr.d_sirka,obr.d_vyska,obr.left,obr.top);
ende.uvod(this.okno1_id); /* zavře průvodce spuštěním a zobrazí, že došlo ke spuštění aplikace v pracovním okně */
window.close();
}};} /* změna parametrů kopie objektu */

const pokr4=Object.create(pokr1);
{pokr4.id_but="butt-4";
pokr4.okno1_id="okno4";
pokr4.handleEvent=function(){
if(volbaOkna.okna[0])
{
/* Okno vlevo */
otevri.okno(obr.min_sirka_aplikace,obr.d_vyska,obr.left,obr.top);
}
else if(volbaOkna.okna[1])
{
/* Celé okno */
otevri.okno(obr.d_sirka,obr.d_vyska,obr.left,obr.top);
}
else if(volbaOkna.okna[2])
{
/* Cool okno */
if(obr.vyska_aplikace<obr.d_vyska)
{
otevri.okno(obr.max_sirka_aplikace,obr.vyska_aplikace,(obr.d_sirka-obr.max_sirka_aplikace)/2,(obr.d_vyska-obr.vyska_aplikace)/2);
}
else
{
otevri.okno(obr.max_sirka_aplikace,obr.d_vyska,(obr.d_sirka-obr.max_sirka_aplikace)/2,obr.top);
}}
else if(volbaOkna.okna[3])
{
/* Okno vpravo */
let vpravo=obr.left+obr.d_sirka-obr.min_sirka_aplikace;
otevri.okno(obr.min_sirka_aplikace,obr.d_vyska,vpravo,obr.top);
}
else
{
return alert("Něco se pokazilo - kontaktujte programátora!");
}
ende.uvod(this.okno1_id); /* zavře průvodce spuštěním a zobrazí, že došlo ke spuštění aplikace v pracovním okně */
window.close();
};} /* změna parametrů kopie objektu */


const v_port={
handleEvent(){
document.body.style.minHeight=parseInt(window.screen.availHeight)+"px";  // přepsání hodnoty výšky, dostupnou výšky zařízení, pomůže lepšímu přepočtu výšky visualViewport

let v=parseInt(window.visualViewport.height); // výška visualViewport
document.body.style.minHeight=`${v}px`;
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
this.aktivace(); /* aktivuje posluchače visualViewport API */
this.handleEvent(); /* zapne poprvé 1x posluchač visualViewport API */
setTimeout(this.handleEvent.bind(this),500); // aktivuje Visual View port API - pro pomalejší zařízení za 500ms
setTimeout(this.handleEvent.bind(this),1000); // aktivuje Visual View port API - pro ještě pomalejší zařízení za 1000ms
}}};

const akce=()=>{
v_port.zahajit(); /* aktivace visualViewport API */
souhlas.posluchac();
document.getElementById(souhlas.id_ch).disabled=false; // odstraní disabled na checked s Licenčními podmínkami - který je default, pro případ, že by uživatel neměl Javascript
document.getElementById(souhlas.id_ch).checked=false; // zajistí odškrknutí checked s licenčními podmínkami
f(souhlas.id_ch);
document.getElementById(pokr1.id_but).disabled=false; // odstraní disabled na tlačítku 1. Pkkračovat - který je default, pro případ, že by uživatel neměl Javascript
mail.posluchac();
kontakt.pust("kontakt");
licence.pust("licence");
};
akce();
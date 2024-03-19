const licence={id_a:"licen",id_dia:"dia-lic",id_dia_butt:"but-lic",id_dia_nad:"nad-l",t:250,
/* objekt licence otevře dialogové okno - kde id_a je ID a ; id_dia je ID dialogového okna ; id_dia_butt je ID button dialogového okna; id_dia_nad je ID nadpisu dialogovému oknu ke kterému se bude sroolovat */
pust(funkce){
const odkaz=document.getElementById(this.id_a);
odkaz.href=`javascript:${funkce}.dia("${this.id_dia_nad}");`;
},
dia(nad_id){
const okno=document.getElementById(this.id_dia);
this._posluchac();
okno.showModal();
setTimeout(`document.getElementById("${nad_id}").scrollIntoView({behavior:"smooth"});`,this.t); /* posun za čas T na objet ID */
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


const mail={id_butt:"zob-em",id_inp:"inp-em",m:["..z.","xm@","@a",".c","ri","iu","mls","z","rt","sqhc","eaw"],
posluchac(){
let t=document.getElementById(this.id_butt);
t.addEventListener("click",this);
},
posluchacOff(){
let t=document.getElementById(this.id_butt);
t.removeEventListener("click",this);
},
handleEvent(){
let x=this.m; /* kopie this.m pole  */
let k=x[4][0]+x[2][1]+x[5][1]+x[9][0]+x[0][0]+x[6][0]+x[4][1]+x[9][3]+x[9][2]+x[10][1]+x[6][1]+x[1][2]+x[10][0]+x[6][0]+x[2][1]+x[4][1]+x[6][1]+x[0][1]+x[9][3]+x[0][2]; /* výsek emailu */
let inp=document.getElementById(this.id_inp); /* input s emailem */
let t=document.getElementById(this.id_butt); /* button pro zobrazení emailu */
inp.value=k; /* hodnota inputu */
this.posluchacOff(); /* vypne posluchač k buttonu zobrazit email */
t.disabled=true; /* disablet button */
t.title="Již není možné použít - email zobrazen"; /* new title button */
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

const obr={min_sirka_aplikace:320,max_sirka_aplikace:790,vyska_aplikace:800,vyska:null,sirka:null,d_vyska:null,d_sirka:null,top:null,left:null,
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
if(volbaOkna.okna[0]==true)
{
/* Okno vlevo */
otevri.okno(obr.min_sirka_aplikace,obr.d_vyska,obr.left,obr.top);
}
else if(volbaOkna.okna[1]==true)
{
/* Celé okno */
otevri.okno(obr.d_sirka,obr.d_vyska,obr.left,obr.top);
}
else if(volbaOkna.okna[2]==true)
{
/* Okno max */
if(obr.vyska_aplikace<obr.d_vyska)
{
otevri.okno(obr.max_sirka_aplikace,obr.vyska_aplikace,(obr.d_sirka-obr.max_sirka_aplikace)/2,(obr.d_vyska-obr.vyska_aplikace)/2);
}
else
{
otevri.okno(obr.max_sirka_aplikace,obr.d_vyska,(obr.d_sirka-obr.max_sirka_aplikace)/2,obr.top);
}}
else if(volbaOkna.okna[3]==true)
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


const v_port={sirka:null,vyska:null,
parametry(){
/* vlastnosti */
this.sirka=window.visualViewport.width;
this.vyska=window.visualViewport.height;
},
handleEvent(){
this.parametry(); /* načte parametry visualViewport API */
document.body.style.width=`${this.sirka}px`;
document.body.style.minHeight=`${this.vyska}px`;
},
aktivace(){
/* Posluchače */
window.visualViewport.addEventListener("resize", this);
window.visualViewport.addEventListener("scroll",this);
addEventListener("scroll", this);
},
zahajit(){
if(window&&window.visualViewport) /* test - zda je visualViewport podporováno */
{
this.aktivace(); /* aktivuje posluchače visualViewport API */
this.handleEvent(); /* zapne poprvé 1x posluchač visualViewport API */
}}};

const akce=()=>{
v_port.aktivace(); /* aktivace visualViewport API */
souhlas.posluchac();
document.getElementById(souhlas.id_ch).disabled=false;
f(souhlas.id_ch);
document.getElementById(pokr1.id_but).disabled=false;
mail.posluchac();
kontakt.pust("kontakt");
licence.pust("licence");
};
akce();
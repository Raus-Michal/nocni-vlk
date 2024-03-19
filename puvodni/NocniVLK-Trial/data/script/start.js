var licence={id_a:"licen",id_dia:"dia-lic",id_dia_butt:"but-lic",id_dia_nad:"nad-l"};
/* objekt licence otevře dialogové okno - kde id_a je ID a ; id_dia je ID dialogového okna ; id_dia_butt je ID button dialogového okna; id_dia_nad je ID nadpisu dialogovému oknu ke kterému se bude sroolovat */
licence.pust=function(funkce){
var odkaz=document.getElementById(this.id_a);
odkaz.href="javascript:" + funkce +".dia('" + this.id_dia_nad + "');";
};

licence.dia=function(nad_id){
var okno=document.getElementById(this.id_dia);
this._posluchac();
okno.showModal();
setTimeout("document.getElementById('" + nad_id + "').scrollIntoView({behavior:'smooth'});",250);
};

licence._posluchac=function(){
var tlacitko=document.getElementById(this.id_dia_butt);
var okno=document.getElementById(this.id_dia);
tlacitko.addEventListener("click",function(){okno.close();});
};

var f=function(objekt){
document.getElementById(objekt).focus(); /* fokus buttonu */
};

var b=function(objekt){
document.getElementById(objekt).blur(); /* blur buttonu */
};


var kontakt=Object.create(licence);
kontakt.id_a="kont-1";
kontakt.id_dia="dia-kon";
kontakt.id_dia_butt="but-kon";
kontakt.id_dia_nad="nad-kon";

var mail={id_butt:"zob-em",id_inp:"inp-em", m:["..z.","xm@","@a",".c","ri","iu","mls","z","rt","sqh","ew"]};
mail.posluchac=function(){
var tlacitko=document.getElementById(this.id_butt);
tlacitko.addEventListener("click",this);
};
mail.posluchacOff=function(){
var tlacitko=document.getElementById(this.id_butt);
tlacitko.removeEventListener("click",this);
};
mail.handleEvent=function(){
var k = "";
k += this.m[4].slice(0,1);
k += this.m[2].slice(1,2);
k += this.m[5].slice(1,2);
k += this.m[9].slice(0,1);
k += this.m[0].slice(0,1);
k += this.m[6].slice(0,1);
k += this.m[4].slice(1,2);
k += this.m[3].slice(1,2);
k += this.m[9].slice(2,3);
k += this.m[2].slice(1,2);
k += this.m[6].slice(1,2);
k += this.m[2].slice(0,1);
k += this.m[10].slice(0,1);
k += this.m[6].slice(0,1);
k += this.m[2].slice(1,2);
k += this.m[4].slice(1,2);
k += this.m[6].slice(1,2);
k += this.m[0].slice(0,1);
k += this.m[3].slice(1,2);
k += this.m[0].slice(2,3);
var inp = document.getElementById(this.id_inp);
var tlacitko=document.getElementById(this.id_butt);
inp.value=k;
this.posluchacOff();
tlacitko.disabled=true;
tlacitko.title="Již není možné použít - email zobrazen";
};

var souhlas={id_ch:"souh"};

souhlas.posluchac=function(){
var check=document.getElementById(this.id_ch);
check.addEventListener("click",this);
};

souhlas.handleEvent=function(){
var check=document.getElementById(this.id_ch);
if(check.checked == true)
{
pokr1.posluchac();
f(pokr1.id_but); /* fokus buttonu */
}
else if(check.checked == false)
{
pokr1.posluchacOff();
b(pokr1.id_but); /* blur buttonu */
}};

var test={ready_ul:null,ready_usp:null,ready_bl:null,class_ok:" t-ok",class_ko:" t-ko",id_uspa:["img-uspa","b-usp-ch"],id_ukla:["img-ukla","b-data-ch"]};
/* ready_ul == výsledek test localstorage , ready_bl == výsledek testu blokace uzamykání obrazovky , ready_usp == výsledek testu ochrany proti uspávání */

test.uloziste=function(){
/* detekce zda funguje localstorage */
try
{
return this.ready_ul="localStorage" in window && window["localStorage"] !== null; /* pokud funkce localstorage funguje vrátí hodnotu true - uloziste.ready == true */
}
catch(e)
{
return this.ready_ul=false; /* pokud funkce localstorage NEfunguje vrátí hodnotu false - uloziste.ready == false */
}};


test.blokace = function(){
/* test jesli je Blokace zámku obrazovky v pohlížeči povolena - pokud NE - NÁHRADNÍ ŘEŠENÍ - nefunguje na telefonech !!!! */
if('wakeLock' in navigator)
{
return this.ready_bl=true;
}
else
{
return this.ready_bl=false;
}};

test.uspani=function(){
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
if(typeof document.addEventListener === "undefined" || neviditelnost === undefined)
{
/* API viditelnosti nefunguje */
return this.ready_usp=false;
}
else
{
/* API viditelnosti funguje */
return this.ready_usp=true;
}};

test.vyhod=function(){
/* funkce provede všechny potřebné opatření podle výsledku testů */

if(this.ready_usp==true) /* opatření k testu ochrana před uspáním */
{
document.getElementById(this.id_uspa[0]).className+=this.class_ok; /* přidá třídu s patřičným obrázkem */
document.getElementById(this.id_uspa[1]).style.display="none"; /* nezobrazí chybovou informaci */
}
else if(this.ready_usp==false)
{
document.getElementById(this.id_uspa[0]).className+=this.class_ko; /* přidá třídu s patřičným obrázkem */
document.getElementById(this.id_uspa[1]).style.display="block"; /* zobrazí chybovou informaci */
}

if(this.ready_ul==true) /* opatření k testu ukládání dat - localstorage */
{
document.getElementById(this.id_ukla[0]).className+=this.class_ok; /* přidá třídu s patřičným obrázkem */
document.getElementById(this.id_ukla[1]).style.display="none"; /* nzobrazí chybovou informaci */
}
else if(this.ready_ul==false)
{
document.getElementById(this.id_ukla[0]).className+=this.class_ko; /* přidá třídu s patřičným obrázkem */
document.getElementById(this.id_ukla[1]).style.display="block"; /* zobrazí chybovou informaci */
}};


test.all=function(){
/* funkce provede všechny potřebné testy */
this.uloziste();
this.uspani();
this.blokace();
};



var pokr1={id_but:"butt-1",okno1_id:"okno1",okno2_id:"okno2",id_kotva:"h1-logo",CAS:250};

pokr1.posluchac=function(){
var tlacitko=document.getElementById(this.id_but);
tlacitko.disabled=false;
f(this.id_but);
tlacitko.title="Pokračovat ve spuštění";
tlacitko.addEventListener("click",this);
};

pokr1.posluchacOff=function(){
var tlacitko=document.getElementById(this.id_but);
tlacitko.title="Chybí souhlas s Licenčními podmínkami";
tlacitko.removeEventListener("click",this);
};

pokr1.handleEvent=function(){
test.all(); /* provede všechny potřebné testy: localstorage,blokace zámku obrazovky a test proti uspání okna */
test.vyhod(); /* vyhodnocení testu a přijetí opatření - zobrazení chybových hlášení včetně SVG ok anebo ko */
this.prechod();
setTimeout("pokr2.posluchac();",this.CAS+2000);
};

pokr1.posunUP=function(){
document.getElementById(this.id_kotva).scrollIntoView({behavior:'smooth'});
};

pokr1.prechod=function(){
document.getElementById(this.okno1_id).style.opacity=0;
setTimeout("document.getElementById('" + this.okno1_id + "').style.display='none';document.getElementById('" + this.okno2_id + "').style.display='block';",this.CAS);
setTimeout("document.getElementById('" + this.okno2_id + "').style.opacity=1;",this.CAS+100);
setTimeout(this.posunUP.bind(this),this.CAS+250); /* zajistí posun okna na hlavní kotvu - Nadpis Logo H1 */
document.getElementById(this.id_but).removeEventListener("click",this); /* odebere posluchač */
};

var pokr2=Object.create(pokr1);
pokr2.id_but="butt-2";
pokr2.okno1_id="okno2";
pokr2.okno2_id="okno3";

pokr2.handleEvent=function(){
zvuk.nahraj(); /* nahraje mp3 do paměti */
this.prechod();
setTimeout("zvuk.hrajSan();pokr3.posluchac();",this.CAS+1000);
};

var zvuk={mp3:null,cesta:"data/alarm/alarm1.mp3",id_animace:"tz_1",nahrano:null,smicka:2000};
zvuk.casovac;

zvuk.nahraj=function(){
this.mp3=new Audio(this.cesta);
this.nahrano=true;
};

zvuk.hrajSan=function(){
if(this.nahrano!=true)
{
this.nahraj(); /* pokud není mp3 nahraná do paměti - nahraje ji */
}
this.mp3.load();
this.mp3.loop = false; /* zajistí, že přehraje zvuk pouze 1x */
this.mp3.volume = 0.75; /* nastavení defaul hlasitosi na 75% */
this.mp3.oncanplaythrough = function(){
document.getElementById(zvuk.id_animace).beginElement(); /* zapne animaci na SVG obrázku */
zvuk.mp3.play();
};
this.casovac=setTimeout(this.hrajSan.bind(this),this.smicka);
};

var obrazovka = {min_sirka_aplikace:320,max_sirka_aplikace:790,vyska_aplikace:800,vyska:null,sirka:null,d_vyska:null,d_sirka:null,top:null,left:null};

obrazovka.velikost=function(){
this.vyska=window.screen.height; /* výška obrazovky */
this.sirka=window.screen.width; /* šířka obrazovky */
this.d_vyska=window.screen.availHeight; /* Dostupná výška obrazovky */
this.d_sirka=window.screen.availWidth; /* Dostupná šířka obrazovky */
this.top=window.screen.availTop; /* Dostupné horní umístění na obrazovce */
this.left=window.screen.availLeft; /* Dostupné levé umístění na obrazovce */
};

var volbaOkna={okna:[false,false,true,false],id:["o-vlevo","o-cel","o-celso","o-vpravo"],idSVG:["o-vlevoi","o-celi","o-celsoi","o-vpravoi"],barva:"rgba(137,157,120,0.5)"};

volbaOkna.aktivace=function(){
this.obarvit();
this.posluchace();
};

volbaOkna.posluchace=function(){
for(var i=0;i<this.id.length;i++)
{
document.getElementById(this.id[i]).addEventListener("click",this);
}};

volbaOkna.handleEvent=function(e){
var klik = e.target.id; /* zjistí ID prvku na který bylo kliknuto */

/* dá všechny tlačítka na false */
this.okna[0]=false;
this.okna[1]=false;
this.okna[2]=false;
this.okna[3]=false;
/* KONEC dá všechny tlačítka na false */

if(klik==this.id[0]||klik==this.idSVG[0]) /* pokud bylo kliknuto na ID button vlevo anebo SVG v buttonu */
{
this.okna[0]=true;
}
else if(klik==this.id[1]||klik==this.idSVG[1])
{
this.okna[1]=true;
}
else if(klik==this.id[2]||klik==this.idSVG[2])
{
this.okna[2]=true;
}
else if(klik==this.id[3]||klik==this.idSVG[3])
{
this.okna[3]=true;
}
this.obarvit(); /* zajistí správné obarvení tlačítek */
};

volbaOkna.obarvit=function(){
/* obarvíá pozadí toho buttonu, který bude true */
for(var i=0;i<this.okna.length;i++)
{
if(this.okna[i] == true)
{
document.getElementById(this.id[i]).style.background=this.barva;
}
else if(this.okna[i] == false)
{
document.getElementById(this.id[i]).style.background="transparent";
}}};


var otevri={stranka:""};
otevri.okno=function(sirka,vyska,zleva,zhora){
var datum=new Date();
var over={};
over.cas=datum.getTime();
over.celkem=[over.cas,test.ready_ul,test.ready_usp,test.ready_bl]; /* pole s kontrolní sumou a výsledky testů */
try
{
var konverce = JSON.stringify(over.celkem);
over.kontrola="?"+konverce;
this.stranka = "data/index.html" + over.kontrola;
window.open(this.stranka , "Noční VLK" , 'width = ' + sirka + ' , height =' + vyska + '  , left = ' + zleva + ' , top = ' + zhora + ' ');
}
catch(e)
{
alert("Chyba"+e+"; Kontaktujte programátora.");
}
};

var ende={id_div:"zaver"};
ende.uvod=function(div){
document.getElementById(div).style.display="none";
document.getElementById(this.id_div).style.display="block";
};


var pokr3=Object.create(pokr1);
pokr3.id_but="butt-3";
pokr3.okno1_id="okno3";
pokr3.okno2_id="okno4";

pokr3.handleEvent=function(){
clearTimeout(zvuk.casovac); /* vypne časovač přehrávání zvuku */
obrazovka.velikost(); /* zjistí velikost obrazovky zařízení */

if(parseInt(obrazovka.sirka)>1024)
{
/* pokud je obrazovka širší-rovna 1024px, což je rozměr obrazovky malého monitoru PC */
this.prechod();
setTimeout("pokr4.posluchac();",this.CAS+1000);
volbaOkna.aktivace();
}
else
{
otevri.okno(obrazovka.d_sirka,obrazovka.d_vyska,obrazovka.left,obrazovka.top);
ende.uvod(this.okno1_id); /* zavře průvodce spuštěním a zobrazí, že došlo ke spuštění aplikace v pracovním okně */
window.close();
}};

var pokr4=Object.create(pokr1);
pokr4.id_but="butt-4";
pokr4.okno1_id="okno4";
pokr4.handleEvent=function(){
if(volbaOkna.okna[0] == true)
{
/* Okno vlevo */
otevri.okno(obrazovka.min_sirka_aplikace,obrazovka.d_vyska,obrazovka.left,obrazovka.top);
}
else if(volbaOkna.okna[1] == true)
{
/* Celé okno */
otevri.okno(obrazovka.d_sirka,obrazovka.d_vyska,obrazovka.left,obrazovka.top);
}
else if(volbaOkna.okna[2] == true)
{
/* Okno max */
if(obrazovka.vyska_aplikace<obrazovka.d_vyska)
{
otevri.okno(obrazovka.max_sirka_aplikace,obrazovka.vyska_aplikace,(obrazovka.d_sirka-obrazovka.max_sirka_aplikace)/2,(obrazovka.d_vyska-obrazovka.vyska_aplikace)/2);
}
else
{
otevri.okno(obrazovka.max_sirka_aplikace,obrazovka.d_vyska,(obrazovka.d_sirka-obrazovka.max_sirka_aplikace)/2,obrazovka.top);
}}
else if(volbaOkna.okna[3] == true)
{
/* Okno vpravo */
var vpravo = obrazovka.left + obrazovka.d_sirka - obrazovka.min_sirka_aplikace;
otevri.okno(obrazovka.min_sirka_aplikace,obrazovka.d_vyska,vpravo,obrazovka.top);
}
else
{
return alert("Něco se pokazilo - kontaktujte programátora!");
}
ende.uvod(this.okno1_id); /* zavře průvodce spuštěním a zobrazí, že došlo ke spuštění aplikace v pracovním okně */
window.close();
};

var v_port={h_scale:null,sirka:null,vyska:null,priblizeni:null,zleva:null,zhora:null,stranka_zleva:null,stranka_zhora:null};

v_port.handleEvent = function(){

if (window && window.visualViewport) /* test - zda je visualViewport podporováno */
{
this.parametry(); /* načte parametry visualViewport API */

document.body.style.width = this.sirka + "px";
document.body.style.minHeight = this.vyska + "px";

var dorovnat="";
if(visualViewport.scale<1 && visualViewport.scale!=this.h_scale)
{
/* alert(visualViewport.scale+" P1"); */ 
this.h_scale=visualViewport;
dorovnat=(visualViewport.scale-1)+1;
/* alert("dorovnat "+dorovnat+" P1"); */ 
document.body.style["-webkit-transform"]="scale("+dorovnat+")"; /* prefix css */
document.body.style["-ms-transform"]="scale("+dorovnat+")"; /* prefix css */
document.body.style.transform="scale("+dorovnat+")";
}
else if(visualViewport.scale>=1 && visualViewport.scale!=this.h_scale)
{
/* alert(visualViewport.scale+" P2"); */ 
this.h_scale=visualViewport;
dorovnat=(visualViewport.scale);
/* alert("dorovnat "+dorovnat+" P2"); */
document.body.style["-webkit-transform"]="scale("+dorovnat+")"; /* prefix css */
document.body.style["-ms-transform"]="scale("+dorovnat+")"; /* prefix css */
document.body.style.transform="scale("+dorovnat+")";
}

}};

v_port.parametry=function(){

if (window && window.visualViewport) /* test - zda je visualViewport podporováno */
{
/* vlastnosti */
this.sirka=window.visualViewport.width;
this.vyska=window.visualViewport.height;
this.priblizeni=window.visualViewport.scale;
this.zleva=window.visualViewport.offsetLeft;
this.zhora=window.visualViewport.offsetTop;
this.stranka_zleva=window.visualViewport.pageLeft;
this.stranka_zhora=window.visualViewport.pageTop;
}};

v_port.aktivace=function(){
if (window && window.visualViewport) /* test - zda je visualViewport podporováno */
{
/* Posluchače */
window.visualViewport.addEventListener("resize", this);
window.visualViewport.addEventListener("scroll",this);
addEventListener("scroll", this);
}};

v_port.zahajit=function(){
if (window && window.visualViewport) /* test - zda je visualViewport podporováno */
{
this.aktivace();
this.handleEvent();
}};

var akce=function(){
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
"use strict";
const vlk={id_sec:["sec-kruh","sec-odp"],id_but:["pl-ob","max-ob","zastav","t-max-o"],id_z_svg:"zastav-svg",id_t_max_obch:["t-max-o","t-max-o-dia"],id_li:["spu-li","zas-li"],max_obch:false,
zapni(){

g_pos.ozivitOff(); /* Deaktivuje posluchače událostí a krytí tlačítka na 50% Oživit Nočního VLKa - v centrum.js */
uloz.smaz(uloz.klice[9]); /* smaže informaci z local storage, že noční vlk byl zastaven */

let l1=this.id_sec.length;
for(let i=0;i<l1;i++)
{
/* zviditelní sektory Kruhu obchůzek a odpočtu */
document.getElementById(this.id_sec[i]).style.display="flex";
}

document.getElementById(p_nas.id_blok).style.display="flex"; /* zabrazí v Nastavení možnost úpravy délky intervalu */

this.obch_max(); /* funkce vyhodnotí zda bude tlačítko Provést obchůzku s maximálním OKRUHEM viditelné a zda bude mít poluchač události zapnutý */

this.posON(); /* zapne posluchač události na tlačítku Provést plánovanou obchůzku teď, Provést obchůzku MAX a Zastavit Nočního VLKa */

document.getElementById(this.id_li[0]).style.display="none"; /* schová tlačítko Spustit Nočního VLKa */
document.getElementById(this.id_li[1]).style.display="block"; /* zobrazí tlačítko Zastavit Nočního VLKa */

if(osoba.odloz_start===0)
{
obch.aktivace(); /* zapne výzvu k obchůzce - pokud nebude nastavený odložený start první obchůzky */
}
else
{
text.pis("Start první obchůzky byl&nbsp;odložen");
zvuk.hraj(null); // zahraje zvuk alarmu - NULL = 1x se sníženou hlasitostí  - tento zvuk je kvůli inicializaci zvuku alarmu a jeho správnému fungování při odloženém startu obzvlášť pro systém iOS
kresly.system(obch.id_can); /* vykreslí systém v hlavním kontejneru */
hlidac.odpocet=true;  /* proměnná, která funkci hlidac() ve ochrana.js dáva informaci o tom, že odpočet se počítá */
obch.pocitej(); // začne odpočítávat interval do obchůzky
}

uloz.osoba(); /* uloží na localstorage data z objektu osoba (v pruvodce.js), tato funkce je v ozivit.js */
uloz.s_obch(); /* smaže obchůzky uložené v localstorage - v oziv.js */
uloz.u_obch(); /* uloží případné obchůzky nacházenící se ve formulářích  - v oziv.js */
},
ozivit(){
/* funkce slouží pro oživení nočního VLKA */

uloz.klonKOPII(); /* přepis globálních proměnných z klonů a jejich vyčištění - v oziv.js */

g_pos.ozivitOff(); /* Deaktivuje posluchače událostí a krytí tlačítka na 50% Oživit Nočního VLKa - v centrum.js */

uloz.smaz(uloz.klice[9]); /* smaže informaci z local storage, že noční vlk byl zastaven  - v oziv.js */

let l1=this.id_sec.length;
for(let i=0;i<l1;i++)
{
/* zviditelní sektory Kruhu obchůzek a odpočtu */
document.getElementById(this.id_sec[i]).style.display="flex";
}

document.getElementById(p_nas.id_blok).style.display="flex"; /* zabrazí v Nastavení možnost úpravy délky intervalu */

this.obch_max(); /* funkce vyhodnotí zda bude tlačítko Provést obchůzku s maximálním OKRUHEM viditelné a zda bude mít poluchač události zapnutý */
this.posON(); /* zapne posluchač události na tlačítku Provést plánovanou obchůzku teď, Provést obchůzku MAX a Zastavit Nočního VLKa */

document.getElementById(this.id_li[0]).style.display="none"; /* schová tlačítko Spustit Nočního VLKa */
document.getElementById(this.id_li[1]).style.display="flex"; /* zobrazí tlačítko Zastavit Nočního VLKa */


_int.prepis(osoba.level); /* zajistí přepis intervalů, rezervy ... atd - v pruvodce.js */
pruvodce.box_int(); /* funkce určuje zda bude v průvodci a v nastavený viditelná volba konkrétního intervalu - pruvodce.js */


if(uloz.v_obchuzce!==true)
{ /* pokud nebyla obchůzka aktivní - v oziv.js */
zvuk.hraj(null); // zahraje zvuk alarmu - NULL = 1x se sníženou hlasitostí  - tento zvuk je kvůli inicializaci zvuku alarmu a jeho správnému fungování při odloženém startu obzvlášť pro systém iOS
text.pis("Noční&nbsp;VLK byl&nbsp;oživen");
this.ozivit.kresly_system(); /* funkce slouží k nestandartnímu vykreslení systému obchůzek na hlavní stránce po oživení */
tik.a_odpocet=true; /* proměnná, která funkci tik.tak() ve centrum.js dáva informaci o tom, že odpočet se počítá */
hlidac.odpocet=true;  /* proměnná, která funkci hlidac() ve ochrana.js dáva informaci o tom, že odpočet se počítá */
}
else
{
obch.aktivace(); /* aktivuje obchůzku */
}},

obch_max(){
 /* funkce vyhodnotí zda bude tlačítko Provést obchůzku s maximálním OKRUHEM */

let [hodnotic,text]=[0,null]; /* pomocné promněnné pro hodnocení obsahu a viditelnosti tlačítka Provést obchůzku do 15,60,30 a 120 minut */

if(osoba.o15===true)
{
hodnotic++;
text=15;
}

if(osoba.o30===true)
{
hodnotic++;
text=30;
}

if(osoba.o60===true)
{
hodnotic++;
text=60;
}

if(osoba.o120===true)
{
hodnotic++;
text=120;
}

if(hodnotic>1)
{
this.max_obch=true;
document.getElementById(this.id_but[1]).style.display="block"; /* Tlačítko provést obchůzku s MAX okruhem bude viditelné */
document.getElementById(this.id_t_max_obch[0]).innerHTML=text; /* přepíše Obchůzku na tlačítku provést obchůzku MAX okruh */
document.getElementById(this.id_t_max_obch[1]).innerHTML=text; /* přepíše Obchůzku na dotazu dialogového OKNA */
}
else
{
this.max_obch=false;
document.getElementById(this.id_but[1]).style.display="none"; /* Tlačítko provést obchůzku s MAX okruhem bude NEviditelné */
}},

posON(){
let l1=this.id_but.length;
for(let i=0;i<l1;i++)
{
document.getElementById(this.id_but[i]).addEventListener("click",this);
}
if(this.max_obch!==false||this.max_obch!==true)
{
this.obch_max(); /* pokud z neznámých příčin nedošlo k vyhodnocení zda má být MAX okruh umožněn opět se vyhodnotí */
}
if(this.max_obch===false)
{
document.getElementById(this.id_but[1]).removeEventListener("click",this); /* pokud nemá být tlačítko Provést MAX obchůzku použito - odebere se posluchač události */
}},
posOFF(){
let l1=this.id_but.length;
for(let i=0;i<l1;i++)
{
document.getElementById(this.id_but[i]).removeEventListener("click",this);
}},
handleEvent(e){

const k=e.target.id; /* id prvku na který bylo kliknuto */

klik.hraj(false); // bude přehrávat zvuk 1x klik

if(k===this.id_but[0])
{
/* zmáčknutí tlačítka Provést plánovanou obchůzku teď */
dia.on(dia.id[1]); /* v centrum.js */
}
else if(k===this.id_but[1]||k===this.id_but[3])
{
/* zmáčknutí tlačítka Provést plánovanou obchůzku MAXI */
dia.on(dia.id[2]); /* v centrum.js */
}
else if(k===this.id_but[2]||k===this.id_z_svg)
{
/* Kliknuto na tlačítko Zastavit Nočního VLKa */
dia.on(dia.id[0]); /* v centrum.js */
}
}};

vlk.ozivit.kresly_system=()=>{
/* funkce slouží k nestandartnímu vykreslení systému obchůzek na hlavní stránce po oživení */
let [okruh_puvodni,o15,o30,o60,o120,okruh]=[osoba.okruh,osoba.o15,osoba.o30,osoba.o60,osoba.o120,osoba.okruh]; /* načte do proměnných data od uživatele */

if(okruh===11)
{
/* pro systém SINGL obchůzek 15 minut nebo 30 minut nebo 60 minut nebo 120 minut */
if((o15===true&&o30===false&&o60===false&&o120===false)||(o15===false&&o30===true&&o60===false&&o120===false)||(o15===false&&o30===false&&o60===true&&o120===false)||(o15===false&&o30===false&&o60===false&&o120===true))
{
okruh=11;
}
/* pro systém DABL obchůzek 15 minut + 30 minut nebo 30 minut + 60 minut nebo 60 minut + 120 minut */
else if((o15===true&&o30===true&&o60===false&&o120===false)||(o15===false&&o30===true&&o60===true&&o120===false)||(o15===false&&o30===false&&o60===true&&o120===true))
{
okruh=22;
}
 /* pro systém QVATTRO obchůzek 15 minut + 30 minut + 60 min nebo 15 minut + 60 minut nebo 30 minut + 60 minut + 120 minut nebo 30 minut + 120 minut */
else if((o15===true&&o30===true&&o60===true&&o120===false)||(o15===true&&o30===false&&o60===true&&o120===false)||(o15===false&&o30===true&&o60===true&&o120===true)||(o15===false&&o30===true&&o60===false&&o120===true))
{
okruh=44;
}
/* pro systém OTTO obchůzek 15 minut + 30 minut + 60 min + 120 minut nebo 15 minut + 30 minut + 120 minut ... atd. */
else if((o15===true&&o30===true&&o60===true&&o120===true)||(o15===true&&o30===false&&o60===true&&o120===true)||(o15===true&&o30===true&&o60===false&&o120===true)||(o15===true&&o30===false&&o60===false&&o120===true))
{
okruh=88;
}
}
else
{
okruh=okruh-11;
if(okruh<11)
{
okruh=11;
}}
osoba.okruh=okruh; /* dočasně, kvůli vykreslení změní hodnotu */
kresly.system(obch.id_can); /* vykreslí systém v hlavním kontejneru */
obch.pl_obch(); // vypíše text plánované obchůzky
osoba.okruh=okruh_puvodni; /* po vykreslení systému obchůzek, vrátí okruh na původní stav */
};
window.audio = [];
window.audio_rec = [];
window.zalozeno = false;

const zvuk = {
    zesilovat: true,
    hlasove_navadeni: true,
    cislo_zvuku_hlasoveho_navadeni: 0,
    cislo: 0,
    alarm: ["alarm/alarm1.mp3", "alarm/alarm2.mp3", "alarm/alarm3.mp3", "alarm/alarm4.mp3", "alarm/alarm5.mp3", "alarm/alarm6.mp3", "alarm/klik.mp3"],
    rec: ["alarm/obchuzka-15min.mp3", "alarm/obchuzka-30min.mp3", "alarm/obchuzka-60min.mp3", "alarm/obchuzka-120min.mp3"],
    volume_min: 0.05,
    volume_inic: 0.1,
    volume: 0.75,
    bc: "rgb(218,65,103)",
    bcT: "rgb(137,157,120)",
    hraje: false,
    boundListeners: {}, // Slouží ke správě vázaných posluchačů

    // Založí všechny audio mp3 do globální proměnné window
    zaloz() {
        if (window.zalozeno) {
            return;
        }

        // Vytvoření objektů pro alarmy
        this.alarm.forEach(src => {
            let audio = new Audio(src);
            window.audio.push(audio);
        });

        // Vytvoření objektů pro hlasové navádění
        this.rec.forEach(src => {
            let audio = new Audio(src);
            window.audio_rec.push(audio);
        });

        window.zalozeno = true;
    },

    // Spustí přehrávání
    hraj(jak) {
        if (!window.zalozeno) {
            this.zaloz();
        }

        if (jak === true) {
            if (this.hlasove_navadeni) {
                this.nastav_rec();
            }

            if (this.zesilovat) {
                window.audio[this.cislo].volume = this.volume_min;
                window.audio_rec[this.cislo_zvuku_hlasoveho_navadeni].volume = this.volume_min;
            } else {
                window.audio[this.cislo].volume = this.volume;
                window.audio_rec[this.cislo_zvuku_hlasoveho_navadeni].volume = this.volume;
            }

            window.audio[this.cislo].play();

            // Vytvoření a uložení vázaného posluchače pro `prehravej_dokola`
            const boundPrehravejDokola = this.prehravej_dokola.bind(this);
            this.boundListeners["ended"] = boundPrehravejDokola;
            window.audio[this.cislo].addEventListener("ended", boundPrehravejDokola);

            this.hraje = true;
        } else if (jak === false) {
            window.audio[this.cislo].volume = this.volume;
            window.audio[this.cislo].play();
        }
        else if(jak===null)
        {
        // přehrávání zvuku pro inicializaci samotného zvuku, pro zvýšení interakce zvuku s aplikací
        if(this.volume>0.25)
        {
        // pokud je současná hlasitost větší jak 25%
        window.audio[this.cislo].volume=this.volume_inic; // nastavení hlasitosti na default inicializační hlasitost zvuku = 0.1 , tedy hlasitost 10%
        }
        else
        {
        // pokud je současná hlasitost nižší než 25%
        window.audio[this.cislo].volume=this.volume_min; // minimální hlasitost zvuku, která se používá jako výchozí pro postupné zesilování
        }

window.audio[this.cislo].play(); // pustí mp3
}
    },

    // Funkce pro přehrávání znovu dokola
    prehravej_dokola() {
        if (this.hlasove_navadeni) {
            window.audio_rec[this.cislo_zvuku_hlasoveho_navadeni].play();

            // Vytvoření a uložení vázaného posluchače pro `prehravej_rec`
            const boundPrehravejRec = this.prehravej_rec.bind(this);
            this.boundListeners["ended_rec"] = boundPrehravejRec;
            window.audio_rec[this.cislo_zvuku_hlasoveho_navadeni].addEventListener("ended", boundPrehravejRec);
        } else {
            window.audio[this.cislo].play();
        }
    },

    // Funkce pro zpracování přehrání hlasového navádění
    prehravej_rec() {
        // Odebere posluchače
        if (this.boundListeners["ended_rec"]) {
            window.audio_rec[this.cislo_zvuku_hlasoveho_navadeni].removeEventListener("ended", this.boundListeners["ended_rec"]);
            delete this.boundListeners["ended_rec"];
        }

        if (this.boundListeners["ended"]) {
            window.audio[this.cislo].removeEventListener("ended", this.boundListeners["ended"]);
            delete this.boundListeners["ended"];
        }

        setTimeout(() => {
            if (this.hraje) {
                this.hraj(true);
            }
        }, 500);
    },

    // Nastaví správnou řeč pro aktuální výzvu
    nastav_rec() {
        let aktualni_stav_obchuzky = obch.rozdelovac(); // Např. funkce vrací [aktuální obchůzka, následující]
        let alarm_obchuzky = aktualni_stav_obchuzky[0];

        if (alarm_obchuzky === 15) {
            this.cislo_zvuku_hlasoveho_navadeni = 0;
        } else if (alarm_obchuzky === 30) {
            this.cislo_zvuku_hlasoveho_navadeni = 1;
        } else if (alarm_obchuzky === 60) {
            this.cislo_zvuku_hlasoveho_navadeni = 2;
        } else if (alarm_obchuzky === 120) {
            this.cislo_zvuku_hlasoveho_navadeni = 3;
        }
    },

    zesiluj(){
        /* funkce postupně zesiluje hlasitost alarmu - použito v centrum.js - funkce TIK */
        
        if(this.zesilovat)
        {
        /* pokud bude aktivováno zesilování */
        window.audio[this.cislo].volume=this.volume_min; // nastaví minimální hlasitost alarmu
        
        let volume_rec=this.volume_min+0.25; // zesílení pro řeč, která je nahraná nižší hlasitostí než zvuk alarmu
        if(volume_rec>1)
        {
        // pokud je překročena maximální možné nastavení hlasitosti, které je 1.0
        volume_rec=1; // bude hlasitost na maximální přípustné hlasitosti
        }
        window.audio_rec[this.cislo_zvuku_hlasoveho_navadeni].volume=volume_rec; // nastavení minimální zvukového navádění na obchůzku
        /* rozdílné zvyšování hlasitosti podle současně nastavené hlasitosti */
        if(this.volume<0.5)
        {
        this.volume_min=this.volume_min+0.02;
        }
        else
        {
        this.volume_min=this.volume_min+0.03;
        }
        /* KONEC rozdílné zvyšování hlasitosti podle současně nastavené hlasitosti */
        
        if(this.volume_min>=this.volume)
        {
        this.volume_min=this.volume;
        }
        
        }},
        
        zmen(id){
        /* změna hlasitosti aplikace */
        let hodnota=parseInt(document.getElementById(id).value);
        if(hodnota<this.min){hodnota=this.min;}
        this.volume=hodnota/100;
        },
        barvy(pole_id){
        /* barvení tlačítek s volbou zvuku */
        const b=pole_id; // id buttonu 1,2,3,4,5,6 - volba zvuku alarm - zasláno z centrum.js - const p_nas
        let l1=b.length;
        for(let i=0;i<l1;i++)
        {
        if(document.getElementById(b[i]))
        {
        document.getElementById(b[i]).style.borderColor=this.bc; /* přebarví všechny tlačítka na default barvu */
        document.getElementById(b[i]).style.boxShadow="0px 0px 0px transparent"; /* odebere stín všem tlačítkům */
        }
        }
        
        if(document.getElementById(b[this.cislo]))
        {
        document.getElementById(b[this.cislo]).style.borderColor=this.bcT; // přebarvení tlačítka s volbou zvuku
        document.getElementById(b[this.cislo]).style.boxShadow=`0px 0px 10px ${this.bcT}`; /* přidá stín tlačítku, jehož zvuk byl vybrán */
        }
        

        // udělá disabled navzájem koridujícím zvukům alarmu noční VLK a Minutka
        const butt_id_min=p_nas.id_zvuk_minutka; // pole id buttonů volby zvuku minutka v centrum.js
        const butt_id_vlk=p_nas.id_zvuk_vlk; // pole id buttonů volby zvuku alarmu Noční VLK v centrum.js

// Pro "butt_id_min"
butt_id_min.forEach((id, index) => {
    const element = document.getElementById(id);
    if (element) {
        element.style.display = (zvuk.cislo === index) ? "none" : "flex";
    }
});

// Pro "butt_id_vlk"
butt_id_vlk.forEach((id, index) => {
    const element = document.getElementById(id);
    if (element) {
        element.style.display = (zvuk_min.cislo === index) ? "none" : "flex";
    }
});



        },
        volba(cislo,pole_id){
        /* volba zvuku */
        if(this.cislo===cislo)
        {
        /* pokud uživatel klikl na zvuk, který je zvolený - zvuk se pouze 1x přehraje a bude return */
        this.hraj(false); /* přehraje zvuk 1x */
        return;
        }
        
        this.cislo=cislo; /* zapíše změnu do proměnné objektu */
        
        this.hraj(false); /* přehraje zvuk 1x */
        this.barvy(pole_id); /* zajistí obarvení vybraného zvuku */
        },

    // Zastavení zvuku a odebrání posluchačů
    zastav() {
        if (this.boundListeners["ended"]) {
            window.audio[this.cislo].removeEventListener("ended", this.boundListeners["ended"]);
            delete this.boundListeners["ended"];
        }

        if (this.boundListeners["ended_rec"]) {
            window.audio_rec[this.cislo_zvuku_hlasoveho_navadeni].removeEventListener("ended", this.boundListeners["ended_rec"]);
            delete this.boundListeners["ended_rec"];
        }

        if (this.hraje) {
            window.audio[this.cislo].pause();
            this.volume_min = 0.05;
            window.audio[this.cislo].currentTime = 0;
            this.hraje = false;
        }
    }
};


const gong=Object.create(zvuk); /* udělá věrnou kopii objektu zvuk - pro GONG.mp3 */
{
gong.cislo=5; // označí číslo pro přehrávání stopy gongu
gong.zesilovat=false; // určuje zda bude zvuk přehráván postupným zesilováním, pokud true=ano , false=ne
gong.hlasove_navadeni=false; // zruší hlasové navádění (řeč) pro alarm noční vlk
gong.boundListeners={}; // Slouží ke správě vázaných posluchačů
}

const pinkani=Object.create(zvuk); /* udělá věrnou kopii objektu zvuk - pro GONG.mp3 */
{
pinkani.cislo=4; // označí číslo pro přehrávání stopy pinkání
pinkani.zesilovat=true; // určuje zda bude zvuk přehráván postupným zesilováním, pokud true=ano , false=ne
pinkani.hlasove_navadeni=false; // zruší hlasové navádění (řeč) pro alarm noční vlk
pinkani.boundListeners={}; // Slouží ke správě vázaných posluchačů
}

const klik=Object.create(zvuk); /* udělá věrnou kopii objektu zvuk - pro GONG.mp3 */
{
klik.cislo=6; // označí číslo pro přehrávání stopy klik
klik.zesilovat=false; // určuje zda bude zvuk přehráván postupným zesilováním, pokud true=ano , false=ne
klik.hlasove_navadeni=false; // zruší hlasové navádění (řeč) pro alarm noční vlk
klik.boundListeners={}; // Slouží ke správě vázaných posluchačů
}

const zvuk_min=Object.create(zvuk); /* udělá věrnou kopii objektu zvuk - pro minutku - minutka,js */
{
zvuk_min.cislo=2; // označí číslo pro přehrávání stopy klik
zvuk_min.zesilovat=true; // určuje zda bude zvuk přehráván postupným zesilováním, pokud true=ano , false=ne
zvuk_min.hlasove_navadeni=false; // zruší hlasové navádění (řeč) pro alarm noční vlk
zvuk_min.boundListeners={}; // Slouží ke správě vázaných posluchačů
}

const zvuk_plan=Object.create(zvuk); /* udělá věrnou kopii objektu zvuk - pro Plánovač */
{
zvuk_plan.cislo=4; // označí číslo pro přehrávání stopy alarmu Plánu
zvuk_plan.zesilovat=true; // určuje zda bude zvuk přehráván postupným zesilováním, pokud true=ano , false=ne
zvuk_plan.hlasove_navadeni=false; // zruší hlasové navádění (řeč) pro alarm noční vlk
zvuk_plan.boundListeners={}; // Slouží ke správě vázaných posluchačů
}

const obch={
id_can:"can-hl", // id canvas pro vykreslování okruhu obchůzek
id_bud_obch:"obch_bud", // id textu pro druh obchůzky, která bude následovat
id_tlapa:"tlapa",id_f:["obch15","obch30","obch60","obch120"],intr:null,id:"obchuzka",id_ob:"ob-t",id_b:["vz1","vz2","p-obch"],id_an:["ss1","ss2","ss3","ss4"],id_odp:["o-min","o-sec1","o-sec2"],id_t_out:["t-out-m","t-out-s1","t-out-s2"],id_t:"ob",z_den:null,cas_T:null,TIME:250,
TIME2:750,
casovac:null, // časovač k tranmision opacity img TLAPA, kdyby nebyl časovač a uživatel by neustále potvrzoval Provést obchůzku teď, došlo by ke konfliktu
tlapa(urci){
const [kruh,tlapa]=[document.getElementById(this.id_can),document.getElementById(this.id_tlapa)]; /* načte do promněnné objekty DOM */

if(urci==="tlapa")
{
/* tlapa půjde vidět a kruh se schová */
clearTimeout(this.casovac); // vynuluje časovač, kdyby nebyl časovač a uživatel by neustále potvrzoval Provést obchůzku teď, došlo by ke konfliktu
kruh.style.opacity=0;
tlapa.style.opacity=1;
tlapa.style.zIndex=1;
}
else if(urci==="kruh")
{
/* kruh půjde vidět a tlapa se schová */
kruh.style.opacity=1;
tlapa.style.opacity=0;
clearTimeout(this.casovac); // vynuluje časovač, kdyby nebyl časovač a uživatel by neustále potvrzoval Provést obchůzku teď, došlo by ke konfliktu
this.casovac=setTimeout(()=>{
tlapa.style.zIndex=-1; // změní zIndex - aby byla tlapa pod canvasem
},5000); // drobné zpoždění zajistí bezproblémový vykteslení transition opacity na 0
}},
zaz_casTO(zbyle_s){
/* funkce zapíše do proměnných aktivaci počátku počítání TIOMOUTU */
let c_T=Date.now(); /* vrátí počet milisekund od nulového data (1. ledna 1970 00:00:00 UTC) */
let z_s=0; /* zbylé sekundy přepočet */

if(zbyle_s)
{
z_s=parseInt(zbyle_s);
c_T=c_T+(z_s*1000); /* ubere od času počátku timeoutu záporné mili-sekundy */
}

this.cas_T=c_T;
uloz.uloz(uloz.klice[3],this.cas_T); /* uloží počátek timeoutu na LocalStorage */
},
zaz_casTO_vycisti(){
/* funkce VYCISTÍ proměnné aktivaci počátku počítání TIOMOUTU */
this.cas_T=null;
uloz.smaz(uloz.klice[3]); /* smažou se data o počátečním času timeoutu z localstorage */
},
pocitej_T_OUT(){
/* funkce počítá TIOMOUTU */
let cas_a=Date.now(); /* vrátí počet milisekund od nulového data (1. ledna 1970 00:00:00 UTC) */
let rozdil=parseInt(this.cas_T/1000)-parseInt(cas_a/1000); /* zjistí rozdíl v sekundách mezi časem počátku intervalu a aktuálním časem */
let sT=rozdil*(-1); /* odstraní záporné číslo rozdílu */
let sekundy=sT%60; /* počet sekund */
let minuty=(sT-sekundy)/60; /* počet minut */


if(sekundy<10)
{
sekundy=`0${sekundy}`;
}
sekundy=sekundy.toString();

let s1=sekundy[0]; /* první číslice sekund */
let s2=sekundy[1]; /* druhá číslice sekund */

document.getElementById(this.id_t_out[0]).innerText=minuty;  /* přepíše minuty */
document.getElementById(this.id_t_out[1]).innerText=s1; /* přepíše první číslici sekundy */
document.getElementById(this.id_t_out[2]).innerText=s2; /* přepíše druhou číslici sekundy */
},
zaz_cas(){
/* funkce zapíše do proměnných aktivaci počátku Intervalu */
this.z_den=Date.now(); /* vrátí počet milisekund od nulového data (1. ledna 1970 00:00:00 UTC) */
uloz.uloz(uloz.klice[1],this.z_den); /* čas počátku timeautu zaznamená do localstorage */
},
interval(){
/* funkce slouží k přepočtu nejmenšího intervalu do obchůzky */

if(osoba.o15===true)
{
this.intr=osoba.i15;
}
else if(osoba.o30===true)
{
this.intr=osoba.i30;
}
else if(osoba.o60===true)
{
this.intr=osoba.i60;
}
else if(osoba.o120===true)
{
this.intr=osoba.i120;
}

uloz.uloz(uloz.klice[8],this.intr); /* ukládání dat z proměnné obch.intr, funkce zajišťuje ukládání dat na local storage - v oziv.js */

},
display_odp(zbyle_s){

/* funkce zajišťuje odpočet času do obchůzky */

if(zbyle_s<0)
{
zbyle_s=0;
}

let sekundy=zbyle_s%60;
const minuty=(zbyle_s-sekundy)/60;


if(sekundy<10)
{
sekundy=`0${sekundy}`;
}
sekundy=sekundy.toString(); /* převede případné číslo na textový řetězec */

const s1=sekundy[0]; /* první číslice sekund */
const s2=sekundy[1]; /* druhá číslice sekund */

document.getElementById(this.id_odp[0]).innerText=minuty; /* přepíše minuty */
document.getElementById(this.id_odp[1]).innerText=s1; /* přepíše první číslici sekund */
document.getElementById(this.id_odp[2]).innerText=s2; /* přepíše druhou číslici sekund */

},
pocitej(){
this.zaz_cas(); /* zaznamená aktuální čas */
this.interval(); /* funkce slouží k přepočtu nejmenšího intervalu do obchůzky */
tik.a_odpocet=true; /* proměnná, která funkci tik.tak() ve centrum.js dáva informaci o tom, že odpočet se počítá */
hlidac.odpocet=true;  /* proměnná, která funkci hlidac() ve ochrana.js dáva informaci o tom, že odpočet se počítá */
},
odpocet(){
/* funkce zajišťuje odpočet intervalu do obchůzky a aktivaci výzvy */

let c_a=Date.now(); /* vrátí počet milisekund od nulového data (1. ledna 1970 00:00:00 UTC) */
let c_aS=parseInt(c_a/1000); /* čas v sekundách */
let c_zS=parseInt(this.z_den/1000); /* čas počátku intervalu v sekundách od roku cca 1970 */
let rozdil=c_aS-c_zS; /* rozdíl v časech */

let zbyle_s=0;
if(osoba.odloz_start===0)
{
/* pokud není zadán uživatelem odložený start */
zbyle_s=this.intr-rozdil;
}
else
{
zbyle_s=(osoba.odloz_start*60)-rozdil; /* pokud bude odložený start zadán užívatelem - tento je v minutách a * 60 se převede na sekundy */
}

this.display_odp(zbyle_s); /* funkce zajistí zobrazení zbylého času do intervalu resp. do obchůzky */

if(zbyle_s<=0)
{
this.aktivace(zbyle_s); /* zapne výzvu k obchůzce a funkce s tím související */
}

poloha.kontrola(zbyle_s); /* funkce kontroluje polohu uživatele v kruhu systému obchůzek a příjmá opatření pro vykrewslení polohy - v kresly.js */

},
handleEvent(e){

const k=e.target.id; /* zjistí ID prvku na který bylo kliknuto */

if(k===this.id_b[0]||k===this.id_b[1])
{
/* kliknuto na vypni zvuk */
zvuk.zastav(); /* zastaví přehrávání zvuku */
hlidac.odpocet=true;  /* proměnná, která funkci hlidac() ve ochrana.js dáva informaci o tom, že odpočet se počítá - musí to tak být jinak při vypnutí zvuku a následné minimalizaci okna se ochrana před uspáním nespustí */
document.getElementById(this.id_b[2]).focus(); /* zafokusuje tlačítko Provedu obchůzku */
}
else if(k===this.id_b[2])
{
/* kliknuto na Provedu obchůzku */
// hlidac.aktivace(); opětovně aktivuje ochranu před uspáním
zamek.blok(); /* aktivuje blokaci zámku obrazovky */
window.onbeforeunload=()=>{return "Chcete zavřít aplikaci Noční VLK?";}; /* ochrana před náhodným uzavřením aplikace */
this.DEaktivace();
this.pocitej(); /* aktivace potřebných funkcí pro začátek odpočítávání do obchůzky */
}

},
posON(){
/* zapne posluchače pro Výzvu k obchůzce */
let l1=this.id_b.length;
for(let i=0;i<l1;i++)
{
document.getElementById(this.id_b[i]).addEventListener("click",this);
}},
posOFF(){
/* VYzapne posluchače pro Výzvu k obchůzce */
let l1=this.id_b.length;
for(let i=0;i<l1;i++)
{
document.getElementById(this.id_b[i]).removeEventListener("click",this);
}},
rozdelovac(){
 /* funkce vrací hodnotu konkrétní obchůzky podle systému obchůzek v aktuální chvíly */
 const [o15,o30,o60,o120,o]=[osoba.o15,osoba.o30,osoba.o60,osoba.o120,osoba.okruh]; /* načte data uživatele do proměnných */

let t=null; /* proměnná určuje která obchůzka je právě teď aktuální */
let b=null; /* proměnná určuje, která obchůzka bude následovat */

/* pro systém SINGL obchůzek 15 minut nebo 30 minut nebo 60 minut nebo 120 minut */
if((o15===true&&o30===false&&o60===false&&o120===false)||(o15===false&&o30===true&&o60===false&&o120===false)||(o15===false&&o30===false&&o60===true&&o120===false)||(o15===false&&o30===false&&o60===false&&o120===true))
{
if(o15===true)
{
t=b=15;
}
else if(o30===true)
{
t=b=30;
}
else if(o60===true)
{
t=b=60;
}
else if(o120===true)
{
t=b=120;
}}
/* pro systém DABL obchůzek 15 minut + 30 minut nebo 30 minut + 60 minut nebo 60 minut + 120 minut */
else if((o15===true&&o30===true&&o60===false&&o120===false)||(o15===false&&o30===true&&o60===true&&o120===false)||(o15===false&&o30===false&&o60===true&&o120===true))
{if(o15===true&&o30===true&&o60===false&&o120===false)
{
if(o===11)
{
t=30;
b=15;
}
else if(o===22)
{
t=15;
b=30;
}}
else if(o15===false&&o30===true&&o60===true&&o120===false)
{
if(o===11)
{
t=60;
b=30;
}
else if(o===22)
{
t=30;
b=60;
}}
else if(o15===false&&o30===false&&o60===true&&o120===true)
{
if(o===11)
{
t=120;
b=60;
}
else if(o===22)
{
t=60;
b=120;
}}}
/* pro systém QVATTRO obchůzek 15 minut + 30 minut + 60 min nebo 15 minut + 60 minut nebo 30 minut + 60 minut + 120 minut nebo 30 minut + 120 minut */
else if((o15===true&&o30===true&&o60===true&&o120===false)||(o15===true&&o30===false&&o60===true&&o120===false)||(o15===false&&o30===true&&o60===true&&o120===true)||(o15===false&&o30===true&&o60===false&&o120===true))
{
if(o15===true&&o30===true&&o60===true&&o120===false)
{
if(o===11)
{
t=60;
b=15;
}
else if(o===22)
{
t=15;
b=30;
}
else if(o===33)
{
t=30;
b=15;
}
else if(o===44)
{
t=15;
b=60;
}}
else if(o15===true&&o30===false&&o60===true&&o120===false)
{
if(o===11)
{
t=60;
b=15;
}
else if(o===22)
{
t=15;
b=15;
}
else if(o===33)
{
t=15;
b=15;
}
else if(o===44)
{
t=15;
b=60;
}}
else if(o15===false&&o30===true&&o60===true&&o120===true)
{
if(o===11)
{
t=120;
b=30;
}
else if(o===22)
{
t=30;
b=60;
}
else if(o===33)
{
t=60;
b=30;
}
else if(o===44)
{
t=30;
b=120;
}}
else if(o15===false&&o30===true&&o60===false&&o120===true)
{
if(o===11)
{
t=120;
b=30;
}
else if(o===22)
{
t=30;
b=30;
}
else if(o===33)
{
t=30;
b=30;
}
else if(o===44)
{
t=30;
b=120;
}}}
/* pro systém OTTO obchůzek 15 minut + 30 minut + 60 min + 120 minut nebo 15 minut + 30 minut + 120 minut ... atd. */
else if((o15===true&&o30===true&&o60===true&&o120===true)||(o15===true&&o30===false&&o60===true&&o120===true)||(o15===true&&o30===true&&o60===false&&o120===true)||(o15===true&&o30===false&&o60===false&&o120===true))
{
if(o15===true&&o30===true&&o60===true&&o120===true)
{
if(o===11)
{
t=120;
b=15;
}
else if(o===22)
{
t=15;
b=30;
}
else if(o===33)
{
t=30;
b=15;
}
else if(o===44)
{
t=15;
b=60;
}
else if(o===55)
{
t=60;
b=15;
}
else if(o===66)
{
t=15;
b=30;
}
else if(o===77)
{
t=30;
b=15;
}
else if(o===88)
{
t=15;
b=120;
}}
else if(o15===true&&o30===false&&o60===true&&o120===true)
{
if(o===11)
{
t=120;
b=15;
}
else if(o===22)
{
t=15;
b=15;
}
else if(o===33)
{
t=15;
b=15;
}
else if(o===44)
{
t=15;
b=60;
}
else if(o===55)
{
t=60;
b=15;
}
else if(o===66)
{
t=15;
b=15;
}
else if(o===77)
{
t=15;
b=15;
}
else if(o===88)
{
t=15;
b=120;
}}
else if(o15===true&&o30===true&&o60===false&&o120===true)
{
if(o===11)
{
t=120;
b=15;
}
else if(o===22)
{
t=15;
b=30;
}
else if(o===33)
{
t=30;
b=15;
}
else if(o===44)
{
t=15;
b=30;
}
else if(o===55)
{
t=30;
b=15;
}
else if(o===66)
{
t=15;
b=30;
}
else if(o===77)
{
t=30;
b=15;
}
else if(o===88)
{
t=15;
b=120;
}}
else if(o15===true&&o30===false&&o60===false&&o120===true)
{if(o===11)
{
t=120;
b=15;
}
else if(o===22)
{
t=15;
b=15;
}
else if(o===33)
{
t=15;
b=15;
}
else if(o===44)
{
t=15;
b=15;
}
else if(o===55)
{
t=15;
b=15;
}
else if(o===66)
{
t=15;
b=15;
}
else if(o===77)
{
t=15;
b=15;
}
else if(o===88)
{
t=15;
b=120;
}}}
return [t,b]; /* t - vrací hodnotu konkrétní obchůzky podle systému obchůzek v aktuální chvíly, tedy obchůzka teď; b - vrací obchůzku, která bude následovat */
},
text(){
/* funkce zajišťuje správný zápis konkrétní obchůzky (15min,30min,60,min ...) ve výzvě k obchůzce */
const t=this.rozdelovac()[0]; /* funkce vrací hodnotu konkrétní obchůzky podle systému obchůzek v aktuální chvíly */
const obj=document.getElementById(this.id_t); /* načte objekt DOM, kterým je text výzvy k obchůzce */
obj.innerText=t; /* přepíše text obchůzky ve výzvě k obchůzce */
},
pl_obch(){
const text=this.rozdelovac()[1]; // funkce vrátí obchůzku, která bude následovat
document.getElementById(this.id_bud_obch).innerText=text; // přepíše hodnotu obchůzka Obchůzka do "text" minut za
},
zapis(){
/* funkce zajišťuje správný zápis konkrétní obchůzky (15min,30min,60,min ...) v Zápisu obchůzek */
const t=this.rozdelovac()[0]; /* funkce vrací hodnotu konkrétní obchůzky podle systému obchůzek v aktuální chvíly */

const [o15,o30,o60]=[osoba.o15,osoba.o30,osoba.o60]; /* načte hodnoty od uživatele */

let [z15,z30,z60,z120]=[false,false,false,false]; /* porovnávací hodnoty */

const [f15,f30,f60,f120]=[document.getElementById(this.id_f[0]),document.getElementById(this.id_f[1]),document.getElementById(this.id_f[2]),document.getElementById(this.id_f[3])]; /* DOM formuláře obchůzky do 15,30,60,120 minut */

let cas_aktual=hodiny.cas(); /* pošle aktuální čas */
let h=parseInt(cas_aktual[0]); /* aktuální hodina */
let m=parseInt(cas_aktual[1]); /* aktuální minuta */
let s=parseInt(cas_aktual[2]); /* aktuální sekunda */


if(s>45) /* pokud je sekund více jak 45 přičte o jednu minutu navíc */
{
m++; /* přičte se 1minuta */
if(m===60) /* pokud přičtením 1minuta vznikne 60min - usí dojít k redukci */
{
m=0; /* minut bude 0 */
h++; /* k hodině se přičte 1hodina */
if(h===24) /* pokud by přičtením hodiny vzniklo 24hodin - bude hodin 0 */
{
h=0; /* hodin 0 = půlnoc */
}}}

if(m<10) /* pokud minut bude méně jak 10 - přidá pře číslo nulu */
{
m=m.toString();
m=`0${m}`; /* přidá 0 před jednu číslovku např 02s */
}
else
{
m=m.toString();
}

h=h.toString();


const t_c=`${h}:${m}`; /* celkový zápis času */
const z=`${t_c}, `; /* faktický zápis do formuláře */


if(t===15)
{
/* zapis obchůzky do 15 min */
z15=true;
}
else if(t===30&&o15===true)
{
/* zapis obchůzky do 30 min + do 15minut */
z15=true;
z30=true;
}
else if(t===30&&o15===false)
{
/* zapis obchůzky do 30 min */
z30=true;
}
else if(t===60&&o15===false&&o30===false)
{
/* zapis obchůzky do 60 min */
z60=true;
}
else if(t===60&&o15===true&&o30===false)
{
/* zapis obchůzky do 60 min a do 15 minut */
z60=true;
z15=true;
}
else if(t===60&&o15===false&&o30===true)
{
/* zapis obchůzky do 60 min a do 30 minut */
z60=true;
z30=true;
}
else if(t===60&&o15===true&&o30===true)
{
/* zapis obchůzky do 60 min , do 30 minut a do 15 minut */
z60=true;
z30=true;
z15=true;
}
else if(t===120&&o15===false&&o30===false&&o60===false)
{
/* zapis obchůzky do 120minut */
z120=true;
}
else if(t===120&&o15===true&&o30===false&&o60===false)
{
/* zapis obchůzky do 120minut a 15 minut */
z120=true;
z15=true;
}
else if(t===120&&o15===false&&o30===true&&o60===false)
{
/* zapis obchůzky do 120minut a 30minut */
z120=true;
z30=true;
}
else if(t===120&&o15===false&&o30===false&&o60===true)
{
/* zapis obchůzky do 120minut a do 60minut */
z120=true;
z60=true;
}
else if(t===120&&o15===true&&o30===true&&o60===false)
{
/* zapis obchůzky do 120minut , do 15minu a do 30 minut */
z120=true;
z30=true;
z15=true;
}
else if(t===120&&o15===false&&o30===true&&o60===true)
{
/* zapis obchůzky do 120minut, 30 minut a 60minut */
z120=true;
z60=true;
z30=true;
}
else if(t===120&&o15===true&&o30===false&&o60===true)
{
/* zapis obchůzky do 120minut, 15 minut a 60minut */
z120=true;
z60=true;
z15=true;
}
else if(t===120&&o15===true&&o30===true&&o60===true)
{
/* zapis obchůzky do 120minut, 15minut, 30minut, 60minut */
z15=true;
z30=true;
z60=true;
z120=true;
}

if(z15===true)
{
/* zápis obchůzky do 15 minut */
f15.value=f15.value+z; /* připíše novou obchůzku do formuláře s obchůzkami */
let o15old=uloz.nacti(uloz.klice[4]); /* načte data z localstorage */
let o15new=o15old+z; /* ke starým datům připíše novou obchůzku */
uloz.uloz(uloz.klice[4],o15new); /* uloží na local storage obchůzky do 15minut v oziv.js */
}

if(z30===true)
{
/* zápis obchůzky do 30 minut */
f30.value=f30.value+z; /* připíše novou obchůzku do formuláře s obchůzkami */
let o30old=uloz.nacti(uloz.klice[5]); /* načte data z localstorage */
let o30new=o30old+z; /* ke starým datům připíše novou obchůzku */
uloz.uloz(uloz.klice[5],o30new); /* uloží na local storage obchůzky do 30minut v oziv.js */
}

if(z60===true)
{
/* zápis obchůzky do 60 minut */
f60.value=f60.value+z;
let o60old=uloz.nacti(uloz.klice[6]);
let o60new=o60old+z;
uloz.uloz(uloz.klice[6],o60new);
}

if(z120===true)
{
/* zápis obchůzky do 120 minut */
f120.value=f120.value+z;
let o120old=uloz.nacti(uloz.klice[7]);
let o120new=o120old+z;
uloz.uloz(uloz.klice[7],o120new);
}},
aktivace(zbyle_s){ /* funkce, která aktivuje výzvu k obchůzce */
zvuk.hraj(true); /* bude přehrávat zvuk obchůzky dokola */
tik.a_odpocet=false; /* proměnná, která funkci tik.tak() ve centrum.js dáva informaci o tom, že odpočet se NEmůže počítat */
hlidac.odpocet=false;  /* proměnná, která funkci hlidac() ve ochrana.js dáva informaci o tom, že odpočet se NEpočítá */

if(uloz.v_obchuzce===false)
{ /* běžný stav když nastane obchůzka anebo pokud nebyla obchůzka v době ukončení aplikace aktivní, jinak by při oživení v obchůzce došlo k znovu zapsání nového času TIMEOUTU - v oziv.js */
this.zaz_casTO(zbyle_s); /* funkce zapíše do proměnných aktivaci počátku počítání TIOMOUTU + zbylé sekundy */
}

tik.a_obchuzka=true; /* proměnná informuje, že výzva k obchůzce je aktivní - v centrum.js */
uloz.v_obchuzce=true; /* informuje že obchůzka je aktivní v oziv.js */
uloz.uloz(uloz.klice[2],true); /* informuje funkci ozivit() že obchůzka je aktivní v oziv.js */
dia.vyp_akt(); /* vypne aktivní dialogové okna - pokud jsou - v centrum.js */
this.tlapa("tlapa"); /* zobrazí tlapu namísto systému obchůzek nočního VLKa */
this.text(); /* Zajistí aktuální text obchůzky ve výzvě k obchůzce */
v_port.prepocet(); // aktivuje přepočet velikosti okna podle Visual viewport - v centrum.js
if(osoba.odloz_start!==0)
{
/* pokud se odložený start nebude rovnat nule - bude po první výžvě k obchůzce roven 0 */
osoba.odloz_start=0;
uloz.osoba(); /* uloží na localstorage data z objektu osoba (v pruvodce.js), tato funkce je v ozivit.js */
}
/* vynulování ukazatele odpočtu */
document.getElementById(this.id_odp[0]).innerText="0"; /* odpočet minuty */
document.getElementById(this.id_odp[1]).innerText="0"; /* odpočet první číslice sekund */
document.getElementById(this.id_odp[2]).innerText="0"; /* odpočet druhé číslice sekund */
/* Konec vynulování ukazatele odpočtu */
document.getElementById(this.id_bud_obch).innerText="??"; // přepíše hodnotu obchůzka Obchůzka do ?? minut za
document.getElementById(this.id).style.display="block";
setTimeout(this.zp.bind(this),this.TIME); /* focus na BUTTON + pomalé zobrazení opacity z 0 na 1 -- musí být zpoždění pomocí timeout jinak se změna v opacity neprojeví - je to vyzkoušené!!!! */
setTimeout(this.foc.bind(this),this.TIME2); /* fokus z BUTTON na text obchůzky s vyšším zpožděním - jinak se neprovede */
let l1=this.id_an.length;
for(let i=0;i<l1;i++)
{
document.getElementById(this.id_an[i]).style.animationPlayState="running"; /* zapne animaci blikání semaforů */
}
this.posON(); /* zapne posluchače pro Výzvu k obchůzce */
},
DEaktivace(){ /* funkce, která DEaktivuje výzvu k obchůzce */
zvuk.zastav(); /* zastaví zvuk upozornění na obchůzku */
uzamceni.jednou(); /* pokud bude aktivní zámek obrazovky - zobrazí, že je aplikace uzamčena - v centrum.js */
this.posOFF(); /* VYpne posluchače pro Výzvu k obchůzce */
tik.a_obchuzka=false; /* proměnná informuje, že výzva k obchůzce je DEaktivní v centrum.js */
this.zaz_casTO_vycisti(); /* funkce VYCISTÍ proměnné aktivaci počátku počítání TIOMOUTU */
uloz.uloz(uloz.klice[2],false); /* informuje funkci ozivit() že obchůzka NENÍ aktivní v oziv.js */
uloz.v_obchuzce=false; /* informuje že obchůzka NENÍ aktivní v oziv.js */
this.tlapa("kruh"); /* zobrazí kruh obchůzek namísto tlapy nočního VLKa */
let l1=this.id_an.length;
for(let i=0;i<l1;i++)
{
document.getElementById(this.id_an[i]).style.animationPlayState="paused"; /* VYpne animaci blikání semaforů */
}
document.getElementById(this.id).style.opacity=0; /* pomalé vymyzení opacity z 1 na 0 */
setTimeout(this.non.bind(this),this.TIME); /* pomalé vymyzení opacity z 1 na 0 -- vystřídá vymazání okna na Display=none za TIME 250ms */
poloha.reset(); /* vymaže údaje o poloze - v kresly.js */
kresly.system(this.id_can); /* vykreslí systém v hlavním kontejneru */
this.zapis(); /* funkce zajistí zápis potvrzené obchůzky do Formulářů s obchůzkama */
this.pl_obch(); // funkce zobrazí obchůzku, která bude následovat jko další obchůzka
pruvodce.o_posun(); /* posunu obchůzky v systému obchůzek +11 v pruvodce js */
uloz.osoba(); /* uloží data na localstorage globální objekt osoba - kvůli posunu obchůzky +11 */
},
zp(){
/* funkce slouží k focus na BUTTON + pomalému zobrazení Výzvy k obchůzce: opacity z 1 na 0 -- musí být zpoždění pomocí timeout jinak se změna v opacity neprojeví - je to vyzkoušené!!!! */
document.getElementById(this.id).style.opacity=1;
document.getElementById(this.id_b[1]).focus();
},
foc(){
/* funkce slouží k focus na Obchůzku ve Výzvě -- musí být zpoždění pomocí timeout jinak se změna v opacity neprojeví - je to vyzkoušené!!!! */
document.getElementById(this.id_ob).scrollIntoView({block:"center",behavior:"smooth"});
},
non(){
/* při ukončení Výzvy k obchůzce, musí dojít k pozdějšímu zrušení okna,aby se projevil efekt opacity z 1 na 0 */
document.getElementById(this.id).style.display="none";
}};

pripravenost.vlk=true; /* MUSÍ BÝT NA POSLEDNÍM ŘÁDKU KNIHOVNY - v autorun.js - informuje o načtení této js knihovny */

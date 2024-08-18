const poloha={m_s:30,p1:0,p2:0,p3:0,p4:0,p5:0,p6:0,p7:0,p8:0,p9:0,p10:0,p11:0,p12:0,
a_css:"a-b", // název CSS class, pro animaci rozšíření textu ve vlk.css

anim_pl_obch(){
// funkce spustí animaci rozšíření textu 15,30,60 anebo 120 PLÁNOVANÉ OBCHŮZKY
const cislo=document.getElementById(obch.id_bud_obch); // id textu pro druh obchůzky, která bude následovat - ve vlk.js

cislo.classList.remove(this.a_css); // odebere css třídu s animací, pokud ji objekt obsahuje

setTimeout(()=>
{
cislo.classList.add(this.a_css); // přidá css třídu s animací, pokud ji objekt neobsahuje
},250); // zpoždění musí být, jinak by odebrání a následné okamžité odebrání css třídy animaci nespustilo!


},
kontrola(zbyle_s){
let zs=zbyle_s; /* zbylé sekundy z intervalu do obchůzky */

let i=obch.intr; /* interval do obchůzky v sekundách - objekt je ve vlk.js */
let min=i-this.m_s; /* minimální čas v sekundách, kdy bude možné první polohu v okruhu zobrazit */

if(osoba.odloz_start!=0)
{
/* pokud bude zvolen odložený start - bude délka intervalu odpovídat délce odloženého startu */
i=osoba.odloz_start*60; /* přepočet intervalu odloženého startu v minutách na sekundy */
min=i+1; /* minimální čas v sekundách, kdy bude možné první polohu v okruhu zobrazit */
}

let dil=i/12; /* 1/12 je dílek každého posunu polohy */
let zmena=null; // proměnná kontroluje zda došlo ke změně polohy

if((zs<min)&&(zs>(i-dil))&&this.p1==0)
{
/* poloha 1. */
this.p1=1;
zmena=true; // změna proměnné na true informuje, že došlo ke změně polohy
vlk.ozivit.kresly_system(obch.id_can); /* vykreslý systém obchůzek s novou polohou  - nestandartně jako při oživení dojde k dočasnému posunu okruhu! ve vlk.js - objekt id je ve vlk.js */
}
else if((zs<(i-dil))&&(zs>(i-(dil*2)))&&this.p2==0)
{
/* poloha 2. */
this.p2=1;
zmena=true; // změna proměnné na true informuje, že došlo ke změně polohy
vlk.ozivit.kresly_system(obch.id_can);
}
else if((zs<(i-(dil*2)))&&(zs>(i-(dil*3)))&&this.p3==0)
{
/* poloha 3. */
this.p3=1;
zmena=true; // změna proměnné na true informuje, že došlo ke změně polohy
vlk.ozivit.kresly_system(obch.id_can);
}
else if((zs<(i-(dil*3)))&&(zs>(i-(dil*4)))&&this.p4==0)
{
this.p4=1;
zmena=true; // změna proměnné na true informuje, že došlo ke změně polohy
vlk.ozivit.kresly_system(obch.id_can);
}
else if((zs<(i-(dil*4)))&&(zs>(i-(dil*5)))&&this.p5==0)
{
this.p5=1;
zmena=true; // změna proměnné na true informuje, že došlo ke změně polohy
vlk.ozivit.kresly_system(obch.id_can);
}
else if((zs<(i-(dil*5)))&&(zs>(i-(dil*6)))&&this.p6==0)
{
this.p6=1;
zmena=true; // změna proměnné na true informuje, že došlo ke změně polohy
vlk.ozivit.kresly_system(obch.id_can);
}
else if((zs<(i-(dil*6)))&&(zs>(i-(dil*7)))&&this.p7==0)
{
this.p7=1;
zmena=true; // změna proměnné na true informuje, že došlo ke změně polohy
vlk.ozivit.kresly_system(obch.id_can);
}
else if((zs<(i-(dil*7)))&&(zs>(i-(dil*8)))&&this.p8==0)
{
this.p8=1;
zmena=true; // změna proměnné na true informuje, že došlo ke změně polohy
vlk.ozivit.kresly_system(obch.id_can);
}
else if((zs<(i-(dil*8)))&&(zs>(i-(dil*9)))&&this.p9==0)
{
this.p9=1;
zmena=true; // změna proměnné na true informuje, že došlo ke změně polohy
vlk.ozivit.kresly_system(obch.id_can);
}
else if((zs<(i-(dil*9)))&&(zs>(i-(dil*10)))&&this.p10==0)
{
this.p10=1;
zmena=true; // změna proměnné na true informuje, že došlo ke změně polohy
vlk.ozivit.kresly_system(obch.id_can);
}
else if((zs<(i-(dil*10)))&&(zs>(i-(dil*11)))&&this.p11==0)
{
this.p11=1;
zmena=true; // změna proměnné na true informuje, že došlo ke změně polohy
vlk.ozivit.kresly_system(obch.id_can);
}
else if((zs<(i-(dil*11)))&&(zs>=(i-(dil*12)))&&this.p12==0)
{
this.p12=1;
zmena=true; // změna proměnné na true informuje, že došlo ke změně polohy
vlk.ozivit.kresly_system(obch.id_can);
}

if(zmena==true)
{
// pokud došlo ke změně polohy

this.anim_pl_obch(); // pokud došlo ke změně polohy, zapne se funkce, která spustí animaci rozšíření textu Obchůzka do 15,30,60,120 za ...

}

},
reset(){
/* vyresetuje hodnoty a vykreslené poloze */
this.p1=0; /* dá hodnotu na default */
this.p2=0;
this.p3=0;
this.p4=0;
this.p5=0;
this.p6=0;
this.p7=0;
this.p8=0;
this.p9=0;
this.p10=0;
this.p11=0;
this.p12=0;
}};


const kresly={obr_nacten:false,obr:null,
smaz(nazev_platna){
const objekt_platno=document.getElementById(nazev_platna); /* načte plátno do promněnné */
objekt_platno.width=objekt_platno.width; /* změna šířky anebo výšky plátna (nebo použití stejné hodnoty šířky jako v tomto případě) způsobí jeho vymazání a nastavení všech prvků na výchozí, tedy barev a šířky čar */
},

system(nazev_platna){
/* funkce, která vykreslí systém obchůzek */

this.smaz(nazev_platna); /* nejprve se plátno vymaže */

const objekt_platno=document.getElementById(nazev_platna); /* načte objekt plátna do promněnné */
const p=objekt_platno.getContext("2d"); /* určí 2d vykreslování v plátnu */

const f1="bold 25px/25px Verda,Helvetica,sans-serif";
const f2="bold 20px/20px Verda,Helvetica,sans-serif";

const b1="rgb(218,65,103)"; /* červená */
const b2="rgb(137,157,120)"; /* zelená */
const b3="rgb(240,188,212)"; /* světle růžová */
const b4="rgb(138,28,124)";  /* křiklavě fialová */

p.lineWidth="5"; /* šířka čáry */
p.lineCap="round"; /* kulaté zakončení čar */
p.fillStyle=b2; /* barva výplně */
p.strokeStyle=b1; /* nastaví aktuální barvu čáry */
p.font=f1; /* font plátna */
p.textAlign="start"; /* řídí zarovnání textu , je to podobné jako CSS, ale ne identické, možné hodnoty: start, end , left , right , center */

let t1="",t2="",t3="",t4="",t5="",t6="",t7="",t8="",o="Obchůzka",m=" minut",d="do ";

let zo=osoba.okruh; /* obchůzkový okruh v systému obchůzek */

let o15=osoba.o15,o30=osoba.o30,o60=osoba.o60,o120=osoba.o120; /* načte data z globálního objektu */

let os=osoba.odloz_start; /* načte hodnotu odloženehó startu zadaného uživatelem */
let pr=v_port.pruvodce; /* zjistí, zda je aktivní průvodce pro spuštění nočního vlka */

let p1=poloha.p1,p2=poloha.p2,p3=poloha.p3,p4=poloha.p4,p5=poloha.p5,p6=poloha.p6,p7=poloha.p7,p8=poloha.p8,p9=poloha.p9,p10=poloha.p10,p11=poloha.p11,p12=poloha.p12; /* načte data z globálního objektu o poloze */


/* S */
/* I */
/* N */
/* G */
/* L */

/* pro systém SINGL obchůzek 15 minut nebo 30 minut nebo 60 minut nebo 120 minut */
if((o15==true&&o30==false&&o60==false&&o120==false)||(o15==false&&o30==true&&o60==false&&o120==false)||(o15==false&&o30==false&&o60==true&&o120==false)||(o15==false&&o30==false&&o60==false&&o120==true))
{

p.beginPath(); /* kruh obchůzky */
p.arc(200,30,25,0,2*Math.PI,false);
if(os==0||(pr==true&&os!=0))
{
p.fill();
}
p.stroke();
p.closePath(); /* KONEC kruh obchůzky */

if(o15==true)
{
t1="15";
}
else if(o30==true)
{
t1="30";
}
else if(o60==true)
{
t1="60";
}
else if(o120==true)
{
t1="120";
}

/* vykreslí text obchůzky */
p.fillStyle=b3;
p.fillText(o,140,85);
p.fillText(d+t1+m,128,112);
/* KONEC vykreslí tekt obchůzky */

p.strokeStyle=b4; /* nastaví aktuální barvu čáry */

p.lineWidth="10"; /* šířka čáry */

p.beginPath(); /* kruh intervalu */
p.arc(200,200,175,Math.PI/180*282,Math.PI/180*250,false);
p.stroke();
p.closePath(); /* KONEC kruh intervalu */


/* poloha okruhu */

if(p1==1||p2==1||p3==1||p4==1||p5==1||p6==1||p7==1||p8==1||p9==1||p10==1||p11==1||p12==1)
{
let u=0; /* konečný úhel půlkruhu */

if(p1==1&&p2==0&&p3==0&&p4==0&&p5==0&&p6==0&&p7==0&&p8==0&&p9==0&&p10==0&&p11==0&&p12==0)
{
/* vykreslí polohu 1. v 1. půlkruhu */
u=308;
}
else if(p2==1&&p3==0&&p4==0&&p5==0&&p6==0&&p7==0&&p8==0&&p9==0&&p10==0&&p11==0&&p12==0)
{
/* vykreslí polohu 2. v 1. půlkruhu */
u=336;
}
else if(p3==1&&p4==0&&p5==0&&p6==0&&p7==0&&p8==0&&p9==0&&p10==0&&p11==0&&p12==0)
{
/* vykreslí polohu 3. v 1. půlkruhu */
u=4;
}
else if(p4==1&&p5==0&&p6==0&&p7==0&&p8==0&&p9==0&&p10==0&&p11==0&&p12==0)
{
u=32;
}
else if(p5==1&&p6==0&&p7==0&&p8==0&&p9==0&&p10==0&&p11==0&&p12==0)
{
u=60;
}
else if(p6==1&&p7==0&&p8==0&&p9==0&&p10==0&&p11==0&&p12==0)
{
u=88;
}
else if(p7==1&&p8==0&&p9==0&&p10==0&&p11==0&&p12==0)
{
u=116;
}
else if(p8==1&&p9==0&&p10==0&&p11==0&&p12==0)
{
u=144;
}
else if(p9==1&&p10==0&&p11==0&&p12==0)
{
u=172;
}
else if(p10==1&&p11==0&&p12==0)
{
u=200;
}
else if(p11==1&&p12==0)
{
u=228;
}
else if(p12==1)
{
u=250;
}


/* vykreslí půlkruh s polohou */
p.strokeStyle=b2;
p.beginPath();
p.arc(200,200,175,Math.PI/180*282,Math.PI/180*u,false);
p.stroke();
p.closePath();
/* KONEC vykreslí půlkruh s polohou */

} /* KONEC poloha okruhu */


p.lineWidth="5"; /* šířka čáry */
p.strokeStyle=b4;
p.fillStyle=b4;
 /* vykreslí šipku konce intervalu */
p.beginPath();
p.moveTo(167,30);
p.lineTo(129,49);
p.lineTo(123,35);
p.lineTo(167,30);
p.stroke();
p.fill();
p.closePath(); /* Konec vykreslí šipku konce intervalu */


if(this.obr_nacten!=true)
{
/* pokud není načten do globální proměnné obrázek tlapky Nočního Vlka - načte ji a vykreslí */
this.obr=new Image();
this.obr.src="svg/tlapka.svg";
this.obr.onload=function(){p.drawImage(kresly.obr,125,130,150,200);};
this.obr_nacten=true;
}
else
{
/* pokud je v globální proměnné načten obrázek tlapky Nočního VLKa - vykreslí ji */
p.drawImage(this.obr,125,130,150,200); /* vykreslí obrázek (promněnná obrázku , x , y , šířka obrázku , výška obrázku ), možno takto bezpečně vykreslit obrázek, který není načten dopředu jako globální promněnná */
}
return;
} /* KONEC pro systém SINGL obchůzek 15 minut nebo 30 minut nebo 60 minut nebo 120 minut */


/* D */
/* A */
/* B */
/* L */

/* pro systém DABL obchůzek 15 minut + 30 minut nebo 30 minut + 60 minut nebo 60 minut + 120 minut */
if((o15==true&&o30==true&&o60==false&&o120==false)||(o15==false&&o30==true&&o60==true&&o120==false)||(o15==false&&o30==false&&o60==true&&o120==true))
{

if(this.obr_nacten!=true)
{
/* pokud není načten do globální proměnné obrázek tlapky Nočního Vlka - načte ji a vykreslí */
this.obr=new Image();
this.obr.src="svg/tlapka.svg";
this.obr.onload=function(){p.drawImage(kresly.obr,139.25,120,121.5,162);};
this.obr_nacten=true;
}
else
{
/* pokud je v globální proměnné načten obrázek tlapky Nočního VLKa - vykreslí ji */
p.drawImage(this.obr,139.25,120,121.5,162); /* vykreslí obrázek (promněnná obrázku , x , y , šířka obrázku , výška obrázku ), možno takto bezpečně vykreslit obrázek, který není načten dopředu jako globální promněnná */
}

p.beginPath(); /* kruh obchůzky 1. */
p.arc(200,30,25,0,2*Math.PI,false);
if((zo==11&&os==0)||(zo==11&&os!=0&&pr==true))
{
p.fill();
}
p.stroke();
p.closePath(); /* KONEC kruh obchůzky 1. */

p.beginPath(); /* kruh obchůzky 2. */
p.arc(200,370,25,0,2*Math.PI,false);
if((zo==22&&os==0)||(zo==22&&os!=0&&pr==true))
{
p.fill();
}
p.stroke();
p.closePath(); /* KONEC kruh obchůzky 2. */

if(o15==true&&o30==true)
{
t1="30";
t2="15";
}
else if(o30==true&&o60==true)
{
t1="60";
t2="30";
}
else if(o60==true&&o120==true)
{
t1="120";
t2="60";
}



/* vykreslí text obchůzky */
p.fillStyle=b3;
p.fillText(o,140,85);
p.fillText(d+t1+m,128,108);
p.fillText(o,140,310);
p.fillText(d+t2+m,128,335);
/* KONEC vykreslí tekt obchůzky */

p.lineWidth="10"; /* šířka čáry */

p.strokeStyle=b4;
/* 1. půlkruh intervalu */
p.beginPath();
p.arc(200,200,175,Math.PI/180*282,Math.PI/180*75,false);
p.stroke();
p.closePath(); /* KONEC 1. půlkruh intervalu */

/* 2. půlkruh intervalu */
p.beginPath();
p.arc(200,200,175,Math.PI/180*102,Math.PI/180*250,false);
p.stroke();
p.closePath(); /* KONEC 2. půlkruh intervalu */


/* poloha okruhu */

if(p1==1||p2==1||p3==1||p4==1||p5==1||p6==1||p7==1||p8==1||p9==1||p10==1||p11==1||p12==1)
{
let uz=0; /* počáteční úhel půlkruhu */
let u=0; /* konečný úhel půlkruhu */

if(zo==11)
{

uz=282;  /* počáteční úhel půlkruhu */

if(p1==1&&p2==0&&p3==0&&p4==0&&p5==0&&p6==0&&p7==0&&p8==0&&p9==0&&p10==0&&p11==0&&p12==0)
{
/* vykreslí polohu 1. v 1. půlkruhu */
u=292;
}
else if(p2==1&&p3==0&&p4==0&&p5==0&&p6==0&&p7==0&&p8==0&&p9==0&&p10==0&&p11==0&&p12==0)
{
/* vykreslí polohu 2. v 1. půlkruhu */
u=306;
}
else if(p3==1&&p4==0&&p5==0&&p6==0&&p7==0&&p8==0&&p9==0&&p10==0&&p11==0&&p12==0)
{
/* vykreslí polohu 3. v 1. půlkruhu */
u=320;
}
else if(p4==1&&p5==0&&p6==0&&p7==0&&p8==0&&p9==0&&p10==0&&p11==0&&p12==0)
{
u=334;
}
else if(p5==1&&p6==0&&p7==0&&p8==0&&p9==0&&p10==0&&p11==0&&p12==0)
{
u=348;
}
else if(p6==1&&p7==0&&p8==0&&p9==0&&p10==0&&p11==0&&p12==0)
{
u=1;
}
else if(p7==1&&p8==0&&p9==0&&p10==0&&p11==0&&p12==0)
{
u=12;
}
else if(p8==1&&p9==0&&p10==0&&p11==0&&p12==0)
{
u=23;
}
else if(p9==1&&p10==0&&p11==0&&p12==0)
{
u=33;
}
else if(p10==1&&p11==0&&p12==0)
{
u=43;
}
else if(p11==1&&p12==0)
{
u=52;
}
else if(p12==1)
{
u=64;
}}
else if(zo==22)
{

uz=102;  /* počáteční úhel půlkruhu */

if(p1==1&&p2==0&&p3==0&&p4==0&&p5==0&&p6==0&&p7==0&&p8==0&&p9==0&&p10==0&&p11==0&&p12==0)
{
/* vykreslí polohu 1. v 2. půlkruhu */
u=112;
}
else if(p2==1&&p3==0&&p4==0&&p5==0&&p6==0&&p7==0&&p8==0&&p9==0&&p10==0&&p11==0&&p12==0)
{
/* vykreslí polohu 2. v 2. půlkruhu */
u=126;
}
else if(p3==1&&p4==0&&p5==0&&p6==0&&p7==0&&p8==0&&p9==0&&p10==0&&p11==0&&p12==0)
{
/* vykreslí polohu 3. v 2. půlkruhu */
u=140;
}
else if(p4==1&&p5==0&&p6==0&&p7==0&&p8==0&&p9==0&&p10==0&&p11==0&&p12==0)
{
u=154;
}
else if(p5==1&&p6==0&&p7==0&&p8==0&&p9==0&&p10==0&&p11==0&&p12==0)
{
u=168;
}
else if(p6==1&&p7==0&&p8==0&&p9==0&&p10==0&&p11==0&&p12==0)
{
u=180;
}
else if(p7==1&&p8==0&&p9==0&&p10==0&&p11==0&&p12==0)
{
u=189;
}
else if(p8==1&&p9==0&&p10==0&&p11==0&&p12==0)
{
u=208;
}
else if(p9==1&&p10==0&&p11==0&&p12==0)
{
u=217;
}
else if(p10==1&&p11==0&&p12==0)
{
u=226;
}
else if(p11==1&&p12==0)
{
u=235;
}
else if(p12==1)
{
u=244;
}}

/* vykreslí půlkruh s polohou */
p.strokeStyle=b2;
p.beginPath();
p.arc(200,200,175,Math.PI/180*uz,Math.PI/180*u,false);
p.stroke();
p.closePath();
/* KONEC vykreslí půlkruh s polohou */

} /* KONEC poloha okruhu */


p.lineWidth="5"; /* šířka čáry */
p.strokeStyle=b4;
p.fillStyle=b4;
/* vykreslí šipku konce 1. intervalu */
p.beginPath();
p.moveTo(232,374);
p.lineTo(269,352);
p.lineTo(275,366);
p.lineTo(232,374);
p.stroke();
p.fill();
p.closePath(); /* Konec vykreslí šipku konce 1. intervalu */

/* vykreslí šipku konce 2. intervalu */
p.beginPath();
p.moveTo(167,28);
p.lineTo(129,49);
p.lineTo(123,35);
p.lineTo(167,28);
p.stroke();
p.fill();
p.closePath(); /* Konec vykreslí šipku konce 2. intervalu */


return;
} /* KONEC pro systém DABL obchůzek 15 minut + 30 minut nebo 30 minut + 60 minut nebo 60 minut + 120 minut */



/* Q */
/* A */
/* T */
/* T */
/* R */
/* O */

/* pro systém QVATTRO obchůzek 15 minut + 30 minut + 60 min nebo 15 minut + 60 minut nebo 30 minut + 60 minut + 120 minut nebo 30 minut + 120 minut */
if((o15==true&&o30==true&&o60==true&&o120==false)||(o15==true&&o30==false&&o60==true&&o120==false)||(o15==false&&o30==true&&o60==true&&o120==true)||(o15==false&&o30==true&&o60==false&&o120==true))
{


p.beginPath(); /* kruh obchůzky 1. */
p.arc(200,30,25,0,2*Math.PI,false);
if((zo==11&&os==0)||(zo==11&&os!=0&&pr==true))
{
p.fill();
}
p.stroke();
p.closePath(); /* KONEC kruh obchůzky 1. */


p.beginPath(); /* kruh obchůzky 2. */
p.arc(370,200,25,0,2*Math.PI,false);
if((zo==22&&os==0)||(zo==22&&os!=0&&pr==true))
{
p.fill();
}
p.stroke();
p.closePath(); /* KONEC kruh obchůzky 2. */

p.beginPath(); /* kruh obchůzky 3. */
p.arc(200,370,25,0,2*Math.PI,false);
if((zo==33&&os==0)||(zo==33&&os!=0&&pr==true))
{
p.fill();
}
p.stroke();
p.closePath(); /* KONEC kruh obchůzky 3. */

p.beginPath(); /* kruh obchůzky 4. */
p.arc(30,200,25,0,2*Math.PI,false);
if((zo==44&&os==0)||(zo==44&&os!=0&&pr==true))
{
p.fill();
}
p.stroke();
p.closePath(); /* KONEC kruh obchůzky 4. */

/* vykreslí text obchůzky */

if(o15==true&&o30==true&&o60==true&&o120==false)
{
t1="60";
t2="15";
t3="30";
t4="15";
}
else if(o15==true&&o30==false&&o60==true&&o120==false)
{
t1="60";
t2="15";
t3="15";
t4="15";
}
if(o15==false&&o30==true&&o60==true&&o120==true)
{
t1="120";
t2="30";
t3="60";
t4="30";
}
if(o15==false&&o30==true&&o60==false&&o120==true)
{
t1="120";
t2="30";
t3="30";
t4="30";
}

p.fillStyle=b3;

p.fillText(o,150,80);
p.fillText(d+t1+m,143,105);

p.fillText(o,215,165);
p.fillText(d+t2+m,202,190);

p.fillText(o,150,310);
p.fillText(d+t3+m,143,335);

p.fillText(o,66,215);
p.fillText(d+t4+m,58,240);

/* KONEC vykreslí text obchůzky */

p.strokeStyle=b4;

p.lineWidth="10"; /* šířka čáry */

/* 1. čtvrt-kruh intervalu */
p.beginPath();
p.arc(200,200,175,Math.PI/180*282,Math.PI/180*337,false);
p.stroke();
p.closePath(); /* KONEC 1. čtvrt-kruh intervalu */

/* 2. čtvrt-kruh intervalu */
p.beginPath();
p.arc(200,200,175,Math.PI/180*12,Math.PI/180*67,false);
p.stroke();
p.closePath(); /* KONEC 2. čtvrt-kruh intervalu */

/* 3. čtvrt-kruh intervalu */
p.beginPath();
p.arc(200,200,175,Math.PI/180*102,Math.PI/180*157,false);
p.stroke();
p.closePath(); /* KONEC 3. čtvrt-kruh intervalu */

/* 4. čtvrt-kruh intervalu */
p.beginPath();
p.arc(200,200,175,Math.PI/180*192,Math.PI/180*245,false);
p.stroke();
p.closePath(); /* KONEC 4. čtvrt-kruh intervalu */


/* poloha okruhu */

if(p1==1||p2==1||p3==1||p4==1||p5==1||p6==1||p7==1||p8==1||p9==1||p10==1||p11==1||p12==1)
{
let uz=0; /* počáteční úhel půlkruhu */
let u=0; /* konečný úhel půlkruhu */

if(zo==11)
{

uz=282;  /* počáteční úhel půlkruhu */

if(p1==1&&p2==0&&p3==0&&p4==0&&p5==0&&p6==0&&p7==0&&p8==0&&p9==0&&p10==0&&p11==0&&p12==0)
{
/* vykreslí polohu 1. v 1. půlkruhu */
u=287;
}
else if(p2==1&&p3==0&&p4==0&&p5==0&&p6==0&&p7==0&&p8==0&&p9==0&&p10==0&&p11==0&&p12==0)
{
/* vykreslí polohu 2. v 1. půlkruhu */
u=291.5;
}
else if(p3==1&&p4==0&&p5==0&&p6==0&&p7==0&&p8==0&&p9==0&&p10==0&&p11==0&&p12==0)
{
/* vykreslí polohu 3. v 1. půlkruhu */
u=296;
}
else if(p4==1&&p5==0&&p6==0&&p7==0&&p8==0&&p9==0&&p10==0&&p11==0&&p12==0)
{
u=300.5;
}
else if(p5==1&&p6==0&&p7==0&&p8==0&&p9==0&&p10==0&&p11==0&&p12==0)
{
u=305;
}
else if(p6==1&&p7==0&&p8==0&&p9==0&&p10==0&&p11==0&&p12==0)
{
u=309.5;
}
else if(p7==1&&p8==0&&p9==0&&p10==0&&p11==0&&p12==0)
{
u=314;
}
else if(p8==1&&p9==0&&p10==0&&p11==0&&p12==0)
{
u=318.5;
}
else if(p9==1&&p10==0&&p11==0&&p12==0)
{
u=323;
}
else if(p10==1&&p11==0&&p12==0)
{
u=327.5;
}
else if(p11==1&&p12==0)
{
u=332;
}
else if(p12==1)
{
u=337;
}}
else if(zo==22)
{

uz=12;  /* počáteční úhel půlkruhu */

if(p1==1&&p2==0&&p3==0&&p4==0&&p5==0&&p6==0&&p7==0&&p8==0&&p9==0&&p10==0&&p11==0&&p12==0)
{
/* vykreslí polohu 1. v 2. půlkruhu */
u=17;
}
else if(p2==1&&p3==0&&p4==0&&p5==0&&p6==0&&p7==0&&p8==0&&p9==0&&p10==0&&p11==0&&p12==0)
{
/* vykreslí polohu 2. v 2. půlkruhu */
u=21.5;
}
else if(p3==1&&p4==0&&p5==0&&p6==0&&p7==0&&p8==0&&p9==0&&p10==0&&p11==0&&p12==0)
{
/* vykreslí polohu 3. v 2. půlkruhu */
u=26;
}
else if(p4==1&&p5==0&&p6==0&&p7==0&&p8==0&&p9==0&&p10==0&&p11==0&&p12==0)
{
u=30.5;
}
else if(p5==1&&p6==0&&p7==0&&p8==0&&p9==0&&p10==0&&p11==0&&p12==0)
{
u=35;
}
else if(p6==1&&p7==0&&p8==0&&p9==0&&p10==0&&p11==0&&p12==0)
{
u=39.5;
}
else if(p7==1&&p8==0&&p9==0&&p10==0&&p11==0&&p12==0)
{
u=44;
}
else if(p8==1&&p9==0&&p10==0&&p11==0&&p12==0)
{
u=48.5;
}
else if(p9==1&&p10==0&&p11==0&&p12==0)
{
u=53;
}
else if(p10==1&&p11==0&&p12==0)
{
u=57.5;
}
else if(p11==1&&p12==0)
{
u=62;
}
else if(p12==1)
{
u=67;
}}

else if(zo==33)
{

uz=102;  /* počáteční úhel půlkruhu */

if(p1==1&&p2==0&&p3==0&&p4==0&&p5==0&&p6==0&&p7==0&&p8==0&&p9==0&&p10==0&&p11==0&&p12==0)
{
/* vykreslí polohu 1. v 2. půlkruhu */
u=107;
}
else if(p2==1&&p3==0&&p4==0&&p5==0&&p6==0&&p7==0&&p8==0&&p9==0&&p10==0&&p11==0&&p12==0)
{
/* vykreslí polohu 2. v 2. půlkruhu */
u=111.5;
}
else if(p3==1&&p4==0&&p5==0&&p6==0&&p7==0&&p8==0&&p9==0&&p10==0&&p11==0&&p12==0)
{
/* vykreslí polohu 3. v 2. půlkruhu */
u=116;
}
else if(p4==1&&p5==0&&p6==0&&p7==0&&p8==0&&p9==0&&p10==0&&p11==0&&p12==0)
{
u=120.5;
}
else if(p5==1&&p6==0&&p7==0&&p8==0&&p9==0&&p10==0&&p11==0&&p12==0)
{
u=125;
}
else if(p6==1&&p7==0&&p8==0&&p9==0&&p10==0&&p11==0&&p12==0)
{
u=129.5;
}
else if(p7==1&&p8==0&&p9==0&&p10==0&&p11==0&&p12==0)
{
u=134;
}
else if(p8==1&&p9==0&&p10==0&&p11==0&&p12==0)
{
u=138.5;
}
else if(p9==1&&p10==0&&p11==0&&p12==0)
{
u=143;
}
else if(p10==1&&p11==0&&p12==0)
{
u=147.5;
}
else if(p11==1&&p12==0)
{
u=152;
}
else if(p12==1)
{
u=157;
}}


else if(zo==44)
{

uz=192;  /* počáteční úhel půlkruhu */

if(p1==1&&p2==0&&p3==0&&p4==0&&p5==0&&p6==0&&p7==0&&p8==0&&p9==0&&p10==0&&p11==0&&p12==0)
{
/* vykreslí polohu 1. v 2. půlkruhu */
u=196;
}
else if(p2==1&&p3==0&&p4==0&&p5==0&&p6==0&&p7==0&&p8==0&&p9==0&&p10==0&&p11==0&&p12==0)
{
/* vykreslí polohu 2. v 2. půlkruhu */
u=200.5;
}
else if(p3==1&&p4==0&&p5==0&&p6==0&&p7==0&&p8==0&&p9==0&&p10==0&&p11==0&&p12==0)
{
/* vykreslí polohu 3. v 2. půlkruhu */
u=205;
}
else if(p4==1&&p5==0&&p6==0&&p7==0&&p8==0&&p9==0&&p10==0&&p11==0&&p12==0)
{
u=209.5;
}
else if(p5==1&&p6==0&&p7==0&&p8==0&&p9==0&&p10==0&&p11==0&&p12==0)
{
u=214;
}
else if(p6==1&&p7==0&&p8==0&&p9==0&&p10==0&&p11==0&&p12==0)
{
u=218.5;
}
else if(p7==1&&p8==0&&p9==0&&p10==0&&p11==0&&p12==0)
{
u=223;
}
else if(p8==1&&p9==0&&p10==0&&p11==0&&p12==0)
{
u=227.5;
}
else if(p9==1&&p10==0&&p11==0&&p12==0)
{
u=232;
}
else if(p10==1&&p11==0&&p12==0)
{
u=236.5;
}
else if(p11==1&&p12==0)
{
u=241;
}
else if(p12==1)
{
u=245;
}}

/* vykreslí půlkruh s polohou */
p.strokeStyle=b2;
p.beginPath();
p.arc(200,200,175,Math.PI/180*uz,Math.PI/180*u,false);
p.stroke();
p.closePath();
/* KONEC vykreslí půlkruh s polohou */

} /* KONEC poloha okruhu */



p.lineWidth="5"; /* šířka čáry */
p.fillStyle=b4;
p.strokeStyle=b4;

p.beginPath(); /* vykreslí šipku konce 1. intervalu */
p.moveTo(373,168);
p.lineTo(372,133);
p.lineTo(354,139);
p.lineTo(373,168);
p.stroke();
p.fill();
p.closePath(); /* Konec vykreslí šipku konce 1. intervalu */

p.beginPath(); /* vykreslí šipku konce 2. intervalu */
p.moveTo(232,372);
p.lineTo(261,354);
p.lineTo(267,373);
p.lineTo(232,372);
p.stroke();
p.fill();
p.closePath(); /* Konec vykreslí šipku konce 2. intervalu */

p.beginPath(); /* vykreslí šipku konce 3. intervalu */
p.moveTo(28,234);
p.lineTo(47,263);
p.lineTo(28,267);
p.lineTo(28,234);
p.stroke();
p.fill();
p.closePath(); /* Konec vykreslí šipku konce 3. intervalu */

p.beginPath(); /* vykreslí šipku konce 4. intervalu */
p.moveTo(166,29);
p.lineTo(126,29);
p.lineTo(133,49);
p.lineTo(166,29);
p.stroke();
p.fill();
p.closePath(); /* Konec vykreslí šipku konce 4. intervalu */
return;
} /* KONEC pro systém QVATTRO obchůzek 15 minut + 30 minut + 60 min nebo 15 minut + 60 minut nebo 30 minut + 60 minut + 120 minut nebo 30 minut + 120 minut */

/* O */
/* T */
/* T */
/* O */

/* pro systém OTTO obchůzek 15 minut + 30 minut + 60 min + 120 minut nebo 15 minut + 30 minut + 120 minut ... atd. */
if((o15==true&&o30==true&&o60==true&&o120==true)||(o15==true&&o30==false&&o60==true&&o120==true)||(o15==true&&o30==true&&o60==false&&o120==true)||(o15==true&&o30==false&&o60==false&&o120==true))
{
p.beginPath(); /* kruh obchůzky 1. */
p.arc(200,100,25,0,2*Math.PI,false);
if((zo==11&&os==0)||(zo==11&&os!=0&&pr==true))
{
p.fill();
}
p.stroke();
p.closePath(); /* KONEC kruh obchůzky 1. */

p.beginPath(); /* kruh obchůzky 2. */
p.arc(370,30,25,0,2*Math.PI,false); /* kruh obchůzky */
if((zo==22&&os==0)||(zo==22&&os!=0&&pr==true))
{
p.fill();
}
p.stroke();
p.closePath(); /* KONEC kruh obchůzky 2. */


p.strokeStyle=b3;
p.beginPath(); /* kruh obchůzky 3. */
p.arc(370,200,25,0,2*Math.PI,false);
if((zo==33&&os==0)||(zo==33&&os!=0&&pr==true))
{
p.fill();
}
p.stroke();
p.closePath(); /* KONEC kruh obchůzky 3. */

p.strokeStyle=b1;
p.beginPath(); /* kruh obchůzky 4. */
p.arc(370,370,25,0,2*Math.PI,false);
if((zo==44&&os==0)||(zo==44&&os!=0&&pr==true))
{
p.fill();
}
p.stroke();
p.closePath(); /* KONEC kruh obchůzky 4. */

p.beginPath(); /* kruh obchůzky 5. */
p.arc(200,320,25,0,2*Math.PI,false);
if((zo==55&&os==0)||(zo==55&&os!=0&&pr==true))
{
p.fill();
}
p.stroke();
p.closePath(); /* KONEC kruh obchůzky 5. */

p.beginPath(); /* kruh obchůzky 6. */
p.arc(30,370,25,0,2*Math.PI,false);
if((zo==66&&os==0)||(zo==66&&os!=0&&pr==true))
{
p.fill();
}
p.stroke();
p.closePath(); /* KONEC kruh obchůzky 6. */


p.strokeStyle=b3;
p.beginPath(); /* kruh obchůzky 7. */
p.arc(30,200,25,0,2*Math.PI,false);
if((zo==77&&os==0)||(zo==77&&os!=0&&pr==true))
{
p.fill();
}
p.stroke();
p.closePath(); /* KONEC kruh obchůzky 7. */

p.strokeStyle=b1;

p.beginPath(); /* kruh obchůzky 8. */
p.arc(30,30,25,0,2*Math.PI,false);
if((zo==88&&os==0)||(zo==88&&os!=0&&pr==true))
{
p.fill();
}
p.stroke();
p.closePath(); /* KONEC kruh obchůzky 8. */


/* text k obchůzkám */
p.font=f2;

if(o15==true&&o30==true&&o60==true&&o120==true)
{
t1="120";
t2="15";
t3="30";
t4="15";
t5="60";
t6="15";
t7="30";
t8="15";
}
else if(o15==true&&o30==false&&o60==true&&o120==true)
{
t1="120";
t2="15";
t3="15";
t4="15";
t5="60";
t6="15";
t7="15";
t8="15";
}
if(o15==true&&o30==true&&o60==false&&o120==true)
{
t1="120";
t2="15";
t3="30";
t4="15";
t5="30";
t6="15";
t7="30";
t8="15";
}

if(o15==true&&o30==false&&o60==false&&o120==true)
{
t1="120";
t2="15";
t3="15";
t4="15";
t5="15";
t6="15";
t7="15";
t8="15";
}


p.fillStyle=b1;

p.fillText(o,150,145);
p.fillText(d+t1+m,135,170);

p.fillText(o,230,25);
p.fillText(d+t2+m,220,50);

p.fillStyle=b3;
p.fillText(o ,240,220);
p.fillText(d+t3+m,230,245);

p.fillStyle=b1;
p.fillText(o,228,375);
p.fillText(d+t4+m,217,395);

p.fillText(o,63,275);
p.fillText(d+t5+m,53,298);

p.fillText(o,68,375);
p.fillText(d+t6+m,60,395);

p.fillStyle=b3;

p.fillText(o,60,200);
p.fillText(d+t7+m,60,225);

p.fillStyle=b1;

p.fillText(o,70,25);
p.fillText(d+t8+m,60,50);

/* KONEC text k obchůzkám */

p.strokeStyle=b4;
p.lineWidth="10"; /* šířka čáry */

/* 1. interval (oblouk) */
p.beginPath();
/* p.arc(200,-180,280,Math.PI/180*62,Math.PI/180*82,false); */
p.arc(200,-180,280,Math.PI/180*82,Math.PI/180*62,true);
p.stroke();
p.closePath(); /* KONEC 1. interval (oblouk) */

/* 2. interval (přímka) */
p.beginPath();
p.moveTo(370,65);
p.lineTo(370,135);
p.stroke();
p.closePath(); /* KONEC 2. interval (přímka) */

/* 3. interval (přímka) */
p.beginPath();
p.moveTo(370,235);
p.lineTo(370,305);
p.stroke();
p.closePath(); /* KONEC 3. interval (přímka) */

/* 4. interval (oblouk) */
p.beginPath();
p.arc(200,595,280,Math.PI/180*300,Math.PI/180*282,true);
p.stroke();
p.closePath(); /* KONEC 4. interval (oblouk) */

/* 5. interval (oblouk) */
p.beginPath();
p.arc(200,595,280,Math.PI/180*263,Math.PI/180*246,true);
p.stroke();
p.closePath(); /* KONEC 5. interval (oblouk) */

/* 6. interval (přímka) */
p.beginPath();
p.moveTo(30,334);
p.lineTo(30,264);
p.stroke();
p.closePath(); /* KONEC 6. interval (přímka) */

/* 7. interval (přímka) */
p.beginPath();
p.moveTo(30,165);
p.lineTo(30,95);
p.stroke();
p.closePath(); /* KONEC 7. interval (přímka) */

/* 8. interval (oblouk) */
p.beginPath();
p.arc(200,-180,280,Math.PI/180*121,Math.PI/180*102.5,true);
p.stroke();
p.closePath(); /* KONEC 8. interval (oblouk) */

/* poloha okruhu */

if(p1==1||p2==1||p3==1||p4==1||p5==1||p6==1||p7==1||p8==1||p9==1||p10==1||p11==1||p12==1)
{
let uz=0; /* počáteční úhel půlkruhu */
let u=0; /* konečný úhel půlkruhu */
p.strokeStyle=b2;

if(zo==11)
{

uz=82;  /* počáteční úhel půlkruhu */

if(p1==1&&p2==0&&p3==0&&p4==0&&p5==0&&p6==0&&p7==0&&p8==0&&p9==0&&p10==0&&p11==0&&p12==0)
{
/* vykreslí polohu 1. */
u=78.5;
}
else if(p2==1&&p3==0&&p4==0&&p5==0&&p6==0&&p7==0&&p8==0&&p9==0&&p10==0&&p11==0&&p12==0)
{
/* vykreslí polohu 2. */
u=77;
}
else if(p3==1&&p4==0&&p5==0&&p6==0&&p7==0&&p8==0&&p9==0&&p10==0&&p11==0&&p12==0)
{
/* vykreslí polohu 3. */
u=75.5;
}
else if(p4==1&&p5==0&&p6==0&&p7==0&&p8==0&&p9==0&&p10==0&&p11==0&&p12==0)
{
u=74;
}
else if(p5==1&&p6==0&&p7==0&&p8==0&&p9==0&&p10==0&&p11==0&&p12==0)
{
u=72.5;
}
else if(p6==1&&p7==0&&p8==0&&p9==0&&p10==0&&p11==0&&p12==0)
{
u=71;
}
else if(p7==1&&p8==0&&p9==0&&p10==0&&p11==0&&p12==0)
{
u=69.5;
}
else if(p8==1&&p9==0&&p10==0&&p11==0&&p12==0)
{
u=68;
}
else if(p9==1&&p10==0&&p11==0&&p12==0)
{
u=66.5;
}
else if(p10==1&&p11==0&&p12==0)
{
u=65;
}
else if(p11==1&&p12==0)
{
u=63.5;
}
else if(p12==1)
{
u=62;
}
p.beginPath(); 
p.arc(200,-180,280,Math.PI/180*uz,Math.PI/180*u,true);
p.stroke();
p.closePath();
}
else if(zo==22)
{

uz=65;  /* počáteční bod přímky */

if(p1==1&&p2==0&&p3==0&&p4==0&&p5==0&&p6==0&&p7==0&&p8==0&&p9==0&&p10==0&&p11==0&&p12==0)
{
/* vykreslí polohu 1. */
u=69;
}
else if(p2==1&&p3==0&&p4==0&&p5==0&&p6==0&&p7==0&&p8==0&&p9==0&&p10==0&&p11==0&&p12==0)
{
/* vykreslí polohu 2. */
u=75;
}
else if(p3==1&&p4==0&&p5==0&&p6==0&&p7==0&&p8==0&&p9==0&&p10==0&&p11==0&&p12==0)
{
/* vykreslí polohu 3. */
u=81;
}
else if(p4==1&&p5==0&&p6==0&&p7==0&&p8==0&&p9==0&&p10==0&&p11==0&&p12==0)
{
u=87;
}
else if(p5==1&&p6==0&&p7==0&&p8==0&&p9==0&&p10==0&&p11==0&&p12==0)
{
u=93;
}
else if(p6==1&&p7==0&&p8==0&&p9==0&&p10==0&&p11==0&&p12==0)
{
u=99;
}
else if(p7==1&&p8==0&&p9==0&&p10==0&&p11==0&&p12==0)
{
u=105;
}
else if(p8==1&&p9==0&&p10==0&&p11==0&&p12==0)
{
u=111;
}
else if(p9==1&&p10==0&&p11==0&&p12==0)
{
u=118;
}
else if(p10==1&&p11==0&&p12==0)
{
u=124;
}
else if(p11==1&&p12==0)
{
u=130;
}
else if(p12==1)
{
u=135;
}
p.beginPath();
p.moveTo(370,uz);
p.lineTo(370,u);
p.stroke();
p.closePath();
}
else if(zo==33)
{

uz=235;  /* počáteční bod přímky */

if(p1==1&&p2==0&&p3==0&&p4==0&&p5==0&&p6==0&&p7==0&&p8==0&&p9==0&&p10==0&&p11==0&&p12==0)
{
/* vykreslí polohu 1. */
u=239;
}
else if(p2==1&&p3==0&&p4==0&&p5==0&&p6==0&&p7==0&&p8==0&&p9==0&&p10==0&&p11==0&&p12==0)
{
/* vykreslí polohu 2. */
u=245;
}
else if(p3==1&&p4==0&&p5==0&&p6==0&&p7==0&&p8==0&&p9==0&&p10==0&&p11==0&&p12==0)
{
/* vykreslí polohu 3. */
u=251;
}
else if(p4==1&&p5==0&&p6==0&&p7==0&&p8==0&&p9==0&&p10==0&&p11==0&&p12==0)
{
u=257;
}
else if(p5==1&&p6==0&&p7==0&&p8==0&&p9==0&&p10==0&&p11==0&&p12==0)
{
u=263;
}
else if(p6==1&&p7==0&&p8==0&&p9==0&&p10==0&&p11==0&&p12==0)
{
u=269;
}
else if(p7==1&&p8==0&&p9==0&&p10==0&&p11==0&&p12==0)
{
u=275;
}
else if(p8==1&&p9==0&&p10==0&&p11==0&&p12==0)
{
u=281;
}
else if(p9==1&&p10==0&&p11==0&&p12==0)
{
u=287;
}
else if(p10==1&&p11==0&&p12==0)
{
u=293;
}
else if(p11==1&&p12==0)
{
u=299;
}
else if(p12==1)
{
u=305;
}
p.beginPath();
p.moveTo(370,uz);
p.lineTo(370,u);
p.stroke();
p.closePath();
}
else if(zo==44)
{

uz=300;  /* počáteční úhel půlkruhu */

if(p1==1&&p2==0&&p3==0&&p4==0&&p5==0&&p6==0&&p7==0&&p8==0&&p9==0&&p10==0&&p11==0&&p12==0)
{
/* vykreslí polohu 1 */
u=298.5;
}
else if(p2==1&&p3==0&&p4==0&&p5==0&&p6==0&&p7==0&&p8==0&&p9==0&&p10==0&&p11==0&&p12==0)
{
/* vykreslí polohu 2 .*/
u=297;
}
else if(p3==1&&p4==0&&p5==0&&p6==0&&p7==0&&p8==0&&p9==0&&p10==0&&p11==0&&p12==0)
{
/* vykreslí polohu 3. */
u=295.5;
}
else if(p4==1&&p5==0&&p6==0&&p7==0&&p8==0&&p9==0&&p10==0&&p11==0&&p12==0)
{
u=294;
}
else if(p5==1&&p6==0&&p7==0&&p8==0&&p9==0&&p10==0&&p11==0&&p12==0)
{
u=292.5;
}
else if(p6==1&&p7==0&&p8==0&&p9==0&&p10==0&&p11==0&&p12==0)
{
u=291;
}
else if(p7==1&&p8==0&&p9==0&&p10==0&&p11==0&&p12==0)
{
u=289.5;
}
else if(p8==1&&p9==0&&p10==0&&p11==0&&p12==0)
{
u=288;
}
else if(p9==1&&p10==0&&p11==0&&p12==0)
{
u=286.5;
}
else if(p10==1&&p11==0&&p12==0)
{
u=285;
}
else if(p11==1&&p12==0)
{
u=283.5;
}
else if(p12==1)
{
u=282;
}
p.beginPath();
p.arc(200,595,280,Math.PI/180*uz,Math.PI/180*u,true);
p.stroke();
p.closePath();
}

else if(zo==55)
{

uz=263;  /* počáteční úhel půlkruhu */

if(p1==1&&p2==0&&p3==0&&p4==0&&p5==0&&p6==0&&p7==0&&p8==0&&p9==0&&p10==0&&p11==0&&p12==0)
{
/* vykreslí polohu 1 */
u=261.5;
}
else if(p2==1&&p3==0&&p4==0&&p5==0&&p6==0&&p7==0&&p8==0&&p9==0&&p10==0&&p11==0&&p12==0)
{
/* vykreslí polohu 2 .*/
u=260;
}
else if(p3==1&&p4==0&&p5==0&&p6==0&&p7==0&&p8==0&&p9==0&&p10==0&&p11==0&&p12==0)
{
/* vykreslí polohu 3. */
u=258.5;
}
else if(p4==1&&p5==0&&p6==0&&p7==0&&p8==0&&p9==0&&p10==0&&p11==0&&p12==0)
{
u=257;
}
else if(p5==1&&p6==0&&p7==0&&p8==0&&p9==0&&p10==0&&p11==0&&p12==0)
{
u=255.5;
}
else if(p6==1&&p7==0&&p8==0&&p9==0&&p10==0&&p11==0&&p12==0)
{
u=254;
}
else if(p7==1&&p8==0&&p9==0&&p10==0&&p11==0&&p12==0)
{
u=252.5;
}
else if(p8==1&&p9==0&&p10==0&&p11==0&&p12==0)
{
u=251;
}
else if(p9==1&&p10==0&&p11==0&&p12==0)
{
u=249.5;
}
else if(p10==1&&p11==0&&p12==0)
{
u=248;
}
else if(p11==1&&p12==0)
{
u=246.5;
}
else if(p12==1)
{
u=246;
}
p.beginPath();
p.arc(200,595,280,Math.PI/180*uz,Math.PI/180*u,true);
p.stroke();
p.closePath();
}
else if(zo==66)
{

uz=334;  /* počáteční bod přímky */

if(p1==1&&p2==0&&p3==0&&p4==0&&p5==0&&p6==0&&p7==0&&p8==0&&p9==0&&p10==0&&p11==0&&p12==0)
{
/* vykreslí polohu 1. */
u=329;
}
else if(p2==1&&p3==0&&p4==0&&p5==0&&p6==0&&p7==0&&p8==0&&p9==0&&p10==0&&p11==0&&p12==0)
{
/* vykreslí polohu 2. */
u=323;
}
else if(p3==1&&p4==0&&p5==0&&p6==0&&p7==0&&p8==0&&p9==0&&p10==0&&p11==0&&p12==0)
{
/* vykreslí polohu 3. */
u=317;
}
else if(p4==1&&p5==0&&p6==0&&p7==0&&p8==0&&p9==0&&p10==0&&p11==0&&p12==0)
{
u=311;
}
else if(p5==1&&p6==0&&p7==0&&p8==0&&p9==0&&p10==0&&p11==0&&p12==0)
{
u=305;
}
else if(p6==1&&p7==0&&p8==0&&p9==0&&p10==0&&p11==0&&p12==0)
{
u=299;
}
else if(p7==1&&p8==0&&p9==0&&p10==0&&p11==0&&p12==0)
{
u=293;
}
else if(p8==1&&p9==0&&p10==0&&p11==0&&p12==0)
{
u=287;
}
else if(p9==1&&p10==0&&p11==0&&p12==0)
{
u=281;
}
else if(p10==1&&p11==0&&p12==0)
{
u=275;
}
else if(p11==1&&p12==0)
{
u=269;
}
else if(p12==1)
{
u=264;
}
p.beginPath();
p.moveTo(30,uz);
p.lineTo(30,u);
p.stroke();
p.closePath();
}
else if(zo==77)
{

uz=165;  /* počáteční bod přímky */

if(p1==1&&p2==0&&p3==0&&p4==0&&p5==0&&p6==0&&p7==0&&p8==0&&p9==0&&p10==0&&p11==0&&p12==0)
{
/* vykreslí polohu 1. */
u=160;
}
else if(p2==1&&p3==0&&p4==0&&p5==0&&p6==0&&p7==0&&p8==0&&p9==0&&p10==0&&p11==0&&p12==0)
{
/* vykreslí polohu 2. */
u=154;
}
else if(p3==1&&p4==0&&p5==0&&p6==0&&p7==0&&p8==0&&p9==0&&p10==0&&p11==0&&p12==0)
{
/* vykreslí polohu 3. */
u=148;
}
else if(p4==1&&p5==0&&p6==0&&p7==0&&p8==0&&p9==0&&p10==0&&p11==0&&p12==0)
{
u=142;
}
else if(p5==1&&p6==0&&p7==0&&p8==0&&p9==0&&p10==0&&p11==0&&p12==0)
{
u=136;
}
else if(p6==1&&p7==0&&p8==0&&p9==0&&p10==0&&p11==0&&p12==0)
{
u=130;
}
else if(p7==1&&p8==0&&p9==0&&p10==0&&p11==0&&p12==0)
{
u=124;
}
else if(p8==1&&p9==0&&p10==0&&p11==0&&p12==0)
{
u=118;
}
else if(p9==1&&p10==0&&p11==0&&p12==0)
{
u=112;
}
else if(p10==1&&p11==0&&p12==0)
{
u=106;
}
else if(p11==1&&p12==0)
{
u=100;
}
else if(p12==1)
{
u=95;
}
p.beginPath();
p.moveTo(30,uz);
p.lineTo(30,u);
p.stroke();
p.closePath();
}
else if(zo==88)
{

uz=121;  /* počáteční úhel půlkruhu */

if(p1==1&&p2==0&&p3==0&&p4==0&&p5==0&&p6==0&&p7==0&&p8==0&&p9==0&&p10==0&&p11==0&&p12==0)
{
/* vykreslí polohu 1 */
u=119;
}
else if(p2==1&&p3==0&&p4==0&&p5==0&&p6==0&&p7==0&&p8==0&&p9==0&&p10==0&&p11==0&&p12==0)
{
/* vykreslí polohu 2 .*/
u=117.5;
}
else if(p3==1&&p4==0&&p5==0&&p6==0&&p7==0&&p8==0&&p9==0&&p10==0&&p11==0&&p12==0)
{
/* vykreslí polohu 3. */
u=116;
}
else if(p4==1&&p5==0&&p6==0&&p7==0&&p8==0&&p9==0&&p10==0&&p11==0&&p12==0)
{
u=114.5;
}
else if(p5==1&&p6==0&&p7==0&&p8==0&&p9==0&&p10==0&&p11==0&&p12==0)
{
u=113;
}
else if(p6==1&&p7==0&&p8==0&&p9==0&&p10==0&&p11==0&&p12==0)
{
u=111.5;
}
else if(p7==1&&p8==0&&p9==0&&p10==0&&p11==0&&p12==0)
{
u=110;
}
else if(p8==1&&p9==0&&p10==0&&p11==0&&p12==0)
{
u=108.5;
}
else if(p9==1&&p10==0&&p11==0&&p12==0)
{
u=107;
}
else if(p10==1&&p11==0&&p12==0)
{
u=105.5;
}
else if(p11==1&&p12==0)
{
u=104;
}
else if(p12==1)
{
u=102.5;
}
p.beginPath();
p.arc(200,-180,280,Math.PI/180*uz,Math.PI/180*u,true);
p.stroke();
p.closePath();
}
} /* KONEC poloha okruhu */


p.lineWidth="5"; /* šířka čáry */
p.strokeStyle=b4;
p.fillStyle=b4;

/* 1. šipka */
p.beginPath();
p.moveTo(350,57);
p.lineTo(324,62);
p.lineTo(330,76);
p.lineTo(350,57);
p.stroke();
p.fill();
p.closePath(); /* KONEC  1. šipka */

/* 2. šipka */
p.beginPath();
p.moveTo(370,167);
p.lineTo(360,140);
p.lineTo(380,140);
p.lineTo(370,167);
p.stroke();
p.fill();
p.closePath(); /* KONEC  2. šipka */

/* 3. šipka */
p.beginPath();
p.moveTo(370,338);
p.lineTo(360,311);
p.lineTo(380,311);
p.lineTo(370,338);
p.stroke();
p.fill();
p.closePath(); /* KONEC 3. šipka */


/* 4. šipka */
p.beginPath();
p.moveTo(232,315);
p.lineTo(259,311);
p.lineTo(255,330);
p.lineTo(232,315);
p.stroke();
p.fill();
p.closePath(); /* KONEC  4. šipka */

/* 5. šipka */
p.beginPath();
p.moveTo(57,354);
p.lineTo(78,334);
p.lineTo(85,349);
p.lineTo(57,354);
p.stroke();
p.fill();
p.closePath(); /* KONEC 5. šipka */


/* 6. šipka */
p.beginPath();
p.moveTo(30,234);
p.lineTo(38,259);
p.lineTo(22,259);
p.lineTo(30,234);
p.stroke();
p.fill();
p.closePath(); /* KONEC 6. šipka */

/* 7. šipka */
p.beginPath();
p.moveTo(30,63);
p.lineTo(38,90);
p.lineTo(22,90);
p.lineTo(30,63);
p.stroke();
p.fill();
p.closePath(); /* KONEC 7. šipka */

/* 8. šipka */
p.beginPath();
p.moveTo(168,99);
p.lineTo(143,87);
p.lineTo(143,103);
p.lineTo(168,99);
p.stroke();
p.fill();
p.closePath(); /* KONEC 8. šipka */
} /* KONEC pro systém OTTO obchůzek 15 minut + 30 minut + 60 min + 120 minut nebo 15 minut + 30 minut + 120 minut ... atd. */
}};


pripravenost.kresly=true; /* MUSÍ BÝT NA POSLEDNÍM ŘÁDKU KNIHOVNY - v autorun.js - informuje o načtení této js knihovny */
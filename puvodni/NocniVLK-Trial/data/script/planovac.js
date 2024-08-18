const planovac={
id_spust:[
"cas-ulohy", // input type=time - čas zadání úlohy respektive v jakém čase má být úloha spuštěna
"popis-plan", // input type=text - popisek úlohy
"ch-bz", // checked box - Bez zvukového upozornění
"ch-1x", // checked box - Zvuk upozornění přehrát 1x
"ch-rep" // checked box - Zvuk upozornění přehrávat do ukončení
], // id input prvků v dialogovém okně spustit Plánovač
butt_spust:"form-plan", // id formuláře - protože je button - Spustit (Plánovač) je SUBMIT!

posON_spust(){
// funkce přidá posluchače pro Spustit Plánovač, mimo Křížek a Zrušit, tyto posluchače se spouštějí vrámci objektu const dia v centrum.js
let d=this.id_spust.length; // délka pole

for(let i=0;i<d;i++)
{
document.getElementById(this.id_spust[i]).addEventListener("input",this); // přidá posluchač všem inputům v Spustit Plánovač
console.log(this.id_spust[i]);
}

document.getElementById(this.butt_spust).addEventListener("submit",this); // přidá posluchač submit, který se spustí po kliknutí na button Spustit plánovač, který je button type=submit

},

posOFF_spust(){
// funkce odebere posluchače pro Spustit Plánovač, mimo Křížek a Zrušit, tyto posluchače se spouštějí vrámci objektu const dia v centrum.js

let d=this.id_spust.length; // délka pole

for(let i=0;i<d;i++)
{
document.getElementById(this.id_spust[i]).removeEventListener("input",this); // odebere posluchač všem inputům v Spustit Plánovač
console.log(this.id_spust[i]);
}

document.getElementById(this.butt_spust).removeEventListener("submit",this); // odebere posluchač submit, který se spustí po kliknutí na button Spustit plánovač, který je button type=submit



},

handleEvent(e){
const k=e.target.id; // zjistí id prvku, na který bylo kliknuto

if(k==this.id_spust[0])
{
// zadání času úlohy

const hodin=parseInt(e.target.value[0]+e.target.value[1]); // převede zadané hodiny na číslo
const minut=parseInt(e.target.value[3]+e.target.value[4]); // převede zadané minuty na číslo

console.log("hodin: "+hodin+" minut: "+minut);

}


if(k==this.id_spust[1])
{
// popisek Plánovače

const popisek=e.target.value; // převede text popisku na proměnnou
console.log("popisek: "+popisek);
}

if(k==this.id_spust[2]||k==this.id_spust[3]||k==this.id_spust[4])
{
// kliknuto na checked 1 - 3
const ch1=document.getElementById(this.id_spust[2]); // checked-1
const ch2=document.getElementById(this.id_spust[3]); // checked-2
const ch3=document.getElementById(this.id_spust[4]); // checked-3

// řešení zaškrkávání checketů - aby byl stále zaškrklý pouze jeden checked ze tří
if(k==this.id_spust[2])
{
ch1.checked=true;
ch2.checked=false;
ch3.checked=false;
}
else if(k==this.id_spust[3])
{
ch1.checked=false;
ch2.checked=true;
ch3.checked=false;
}
else if(k==this.id_spust[4])
{
ch1.checked=false;
ch2.checked=false;
ch3.checked=true;
}}

if(k==this.butt_spust)
{
// kliknuto na Spustit Plánovač s tím, že jsou splněné validace vyplnění potřebných inputů (čas a popisek), funkce je type SUBMIT z formuláře

console.log("Plánovač spuštěn");

}

}

};


pripravenost.planovac=true; /* MUSÍ BÝT NA POSLEDNÍM ŘÁDKU KNIHOVNY - v autorun.js - informuje o načtení této js knihovny */
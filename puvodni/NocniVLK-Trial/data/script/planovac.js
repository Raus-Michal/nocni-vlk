const planovac={
id_spust:[
"cas-ulohy", // input type=time - čas zadání úlohy respektive v jakém čase má být úloha spuštěna
"popis-plan", // input type=text - popisek úlohy
"ch-bz", // checked box - Bez zvukového upozornění
"ch-1x", // checked box - Zvuk upozornění přehrát 1x
"ch-rep" // checked box - Zvuk upozornění přehrávat do ukončení
], // id input prvků v dialogovém okně spustit Plánovač
id_hl_kon:"div-plany", // id hlavního kontejneru s plánama
id_box_hl:"box-p", // id hlavních boxů plánů + "1-6"
id_butt_box:"butt-edit-p", // id buttonu boxu s plánem - klik slouží pro jeho editaci + "1-6"
id_kryt:"kryt-p", // span krytu, který překrývá SVG a čas zadání plánu tak, aby při kliknutí na tyto prvky bylo e.target.id pouze tohoto krycího prvku + "1-6"
id_text:"p-p", // id HTML prvku v kterém je text plánů + "1-6"
id_box_up:"box-uk-p", // id boxů s upozorněním plánů, že plán nastal - button OK a případně tlačítko na vypnutí zvuku + "1-6"
id_butt_uk:"butt-p", // id buttonu OK pro ukončení plánů + "1-6"
id_butt_zvuk:"zvuk-p", // id buttonu pro ukončení zvukového upozornění plánů + "1-6"
id_hod:"hod-p", // id span prvku s zadanými hodinami + "1-6"
id_min:"min-p", // id span prvku se zadanými minutami + "1-6"
id_bud:"bud-p", // id prvku SVG obrázku budíku u času k plánu + "1-6"
butt_spust:"form-plan", // id formuláře - protože je button - Spustit (Plánovač) je SUBMIT!
plany:[[],[],[],[],[],[]], // pole k datům o jednotlivých plánech 1-6. plán, plany[0-5]=[0:hodina plánu,1:minuta plánu,2:text plánu,3:zvuk plánu (false=bez zvuku;null=zvuk přehrát 1x;true=zvuk přehrávat do ukončení)];
hlidat_plany:false, // proměnná určuje, zda je zapnutý nějáký plán a následně ve funkci window.tik.tak v centrum.js časovač hlídá čas, kdy má být plán aktiviván
v_alarmu:["","","","","",""], // proměnná určuje, zda je nějáký plán aktuálně v alarmu, pokud bude pole naplněno true, pole jsou pro plány rozděleny následovně:["plán1","plán2","plán3","plán4","plán5","plán6"]
povoleni_zesilovat:false, // tato proměnná se mění v návaznosti na druhu spuštěného alarmu, pokud je zvuk alarmu minutky pouštěn pouze 1x je hodnota false, pokud Pořád dokola je hodnota true, tato proměnná nepovoluje volbu zesilovat v přehrávání zvuku, ale dočasně ji umožňuje ve funkci tik.tak() v centrum.js, pokud však chce uživatel vypnout zesilování, tak je nutní změnit proměnnou zvuk_plan.zesilovat, která určuje zda bude zvuk přehráván postupným zesilováním, pokud true=ano , false=ne - ve vlk.js, TATO PROMĚNNÁ JE JEN DOPOVOLENÍ V ALARMU ve funkci this.alarm
id_nas_plan:["hod-p-n","min-p-n","plan-pop-n","ch-bz-n","ch-1x-n","ch-rep-n"], // id prvky pro nastavení konkrétního plánu v dialogovém okně [0:hodina plánu,1:minuta plán,2:popisek plánu,3:checked - Bez zvukového upozornění,4:checked - Zvuk upozornění přehrát 1x,5:checked - Zvuk upozornění přehrávat do ukončení]
eduje_se:null, // proměnná slouží k zachycení plánu, který se právě edituje v dialogovém oknu nastavení konkrétního Plánu, proměnná v sobě uchovává konkrétní číslo plánu 1-6
posON_spust(){
// funkce přidá posluchače pro Spustit Plánovač, mimo Křížek a Zrušit, tyto posluchače se spouštějí vrámci objektu const dia v centrum.js

document.getElementById(this.id_spust[2]).addEventListener("input",this); // přidá posluchač k checked box - Bez zvukového upozornění

document.getElementById(this.id_spust[3]).addEventListener("input",this); // přidá posluchač k checked box - Zvuk upozornění přehrát 1x

document.getElementById(this.id_spust[4]).addEventListener("input",this); // přidá posluchač k checked box - Zvuk upozornění přehrávat do ukončení


document.getElementById(this.butt_spust).addEventListener("submit",this); // přidá posluchač submit, který se spustí po kliknutí na button Spustit plánovač, který je button type=submit

},

posOFF_spust(){
// funkce odebere posluchače pro Spustit Plánovač, mimo Křížek a Zrušit, tyto posluchače se spouštějí vrámci objektu const dia v centrum.js

document.getElementById(this.id_spust[2]).removeEventListener("input",this); // odebere posluchač k checked box - Bez zvukového upozornění

document.getElementById(this.id_spust[3]).removeEventListener("input",this); // odebere posluchač k checked box - Zvuk upozornění přehrát 1x

document.getElementById(this.id_spust[4]).removeEventListener("input",this); // odebere posluchač k checked box - Zvuk upozornění přehrávat do ukončení

document.getElementById(this.butt_spust).removeEventListener("submit",this); // odebere posluchač submit, který se spustí po kliknutí na button Spustit plánovač, který je button type=submit

},

handleEvent(e){
const k=e.target.id; // zjistí id prvku, na který bylo kliknuto


if(k==this.id_spust[2]||k==this.id_spust[3]||k==this.id_spust[4])
{
// kliknuto na checked 1 - 3 v zadání plánovače
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

else if(k==this.id_nas_plan[3]||k==this.id_nas_plan[4]||k==this.id_nas_plan[5])
{
// kliknuto na checked 1 - 3 v informací o Plánu (nastavení konkrétního plánu)
const ch1=document.getElementById(this.id_nas_plan[3]); // načte HTML objekt checked - Bez zvukového upozornění
const ch2=document.getElementById(this.id_nas_plan[4]); // načte HTML objekt checked - Zvuk upozornění přehrát 1x
const ch3=document.getElementById(this.id_nas_plan[5]); // načte HTML objekt checked - Zvuk upozornění přehrávat do ukončení

const plan=this.eduje_se; // podle této proměnné se zjistí který plán se edituje
const cislo_pole=plan-1; // odečtem -1 získáme konkrétní umístění plánu v poli
let zmena=""; // proměnná určuje změnu podle zaškrknutí konkrétního checketu

// (false=bez zvuku;null=zvuk přehrát 1x;true=zvuk přehrávat do ukončení)

// řešení zaškrkávání checketů - aby byl stále zaškrklý pouze jeden checked ze tří
if(k==this.id_nas_plan[3])
{
// Bez zvukového upozornění
ch1.checked=true;
ch2.checked=false;
ch3.checked=false;
zmena=false; // Bez zvukového upozornění
}
else if(k==this.id_nas_plan[4])
{
// Zvuk upozornění přehrát 1x
ch1.checked=false;
ch2.checked=true;
ch3.checked=false;
zmena=null; // Zvuk upozornění přehrát 1x
}
else if(k==this.id_nas_plan[5])
{
// Zvuk upozornění přehrávat do ukončení
ch1.checked=false;
ch2.checked=false;
ch3.checked=true;
zmena=true; // Zvuk upozornění přehrávat do ukončení
}

this.plany[cislo_pole][3]=zmena; // provede změnu nastavení uživatele konkrétního plánu, kde podpole [3] určuje volbu zvuku uživatele

console.log(this.plany[cislo_pole]);

}
else if(k==this.butt_spust)
{
// kliknuto na Spustit Plánovač s tím, že jsou splněné validace vyplnění potřebných inputů (čas a popisek), funkce je type SUBMIT z formuláře

// console.log("Plánovač spuštěn");

if(this.plany[0].length==0){
// pokud bude délka pole this.plany[0]==0, znamená to, že plán 1 není aktivní a nebyl zadán
zamek.blok(); // aktivuje blokaci zámku obrazovky
window.onbeforeunload=()=>{return "Chcete zavřít aplikaci Noční VLK?";}; // ochrana před náhodným uzavřením aplikace
this.zaloz(1); // požadavek na založení úlohy 1
}
else if(this.plany[1].length==0){
// pokud bude délka pole this.plany[1]==0, znamená to, že plán 2 není aktivní a nebyl zadán
this.zaloz(2); // požadavek na založení úlohy 2
}
else if(this.plany[2].length==0){
// pokud bude délka pole this.plany[2]==0, znamená to, že plán 3 není aktivní a nebyl zadán
this.zaloz(3); // požadavek na založení úlohy 3
}
else if(this.plany[3].length==0){
// pokud bude délka pole this.plany[3]==0, znamená to, že plán 4 není aktivní a nebyl zadán
this.zaloz(4); // požadavek na založení úlohy 4
}
else if(this.plany[4].length==0){
// pokud bude délka pole this.plany[4]==0, znamená to, že plán 5 není aktivní a nebyl zadán
this.zaloz(5); // požadavek na založení úlohy 4
}
else if(this.plany[5].length==0){
// pokud bude délka pole this.plany[5]==0, znamená to, že plán 6 není aktivní a nebyl zadán
this.zaloz(6); // požadavek na založení úlohy 4
}
}



else if(k==`${this.id_butt_uk}1`)
{
// kliknutí na button OK - ukončit plán 1
this.ukoncit(1); // funkce udělá veškeré procesy k ukončení plánu 1
}

else if(k==`${this.id_butt_uk}2`)
{
// kliknutí na button OK - ukončit plán 2
this.ukoncit(2); // funkce udělá veškeré procesy k ukončení plánu 2
}

else if(k==`${this.id_butt_uk}3`)
{
// kliknutí na button OK - ukončit plán 3
this.ukoncit(3); // funkce udělá veškeré procesy k ukončení plánu 3
}

else if(k==`${this.id_butt_uk}4`)
{
// kliknutí na button OK - ukončit plán 4
this.ukoncit(4); // funkce udělá veškeré procesy k ukončení plánu 4
}

else if(k==`${this.id_butt_uk}5`)
{
// kliknutí na button OK - ukončit plán 5
this.ukoncit(5); // funkce udělá veškeré procesy k ukončení plánu 2
}

else if(k==`${this.id_butt_uk}6`)
{
// kliknutí na button OK - ukončit plán 6
this.ukoncit(6); // funkce udělá veškeré procesy k ukončení plánu 6
}

else if(k==`${this.id_butt_zvuk}1`||k==`${this.id_butt_zvuk}2`||k==`${this.id_butt_zvuk}3`||k==`${this.id_butt_zvuk}4`||k==`${this.id_butt_zvuk}5`||k==`${this.id_butt_zvuk}6`)
{
// kliknuto na button Vypni zvuk v alarmu plánu 1-6
zvuk_plan.zastav(); // zastaví zvuk upozornění Plánovače - funkce ve vlk.js
this.povoleni_zesilovat=false; // dočasný zákaz zesilování, tento zákaz je však jen sekundární, díky tomuto zákazu se o zesilování nemůže vůbec pokusit ve funkci tik.tak v centrum.js, rozhodující pro zesilování je však proměnná zvuk_plan.zesilovat, která určuje zda bude zvuk přehráván postupným zesilováním, pokud true=ano , false=ne - ve vlk.js
}
else if(k==`${this.id_butt_box}1`||k==`${this.id_text}1`||k==`${this.id_kryt}1`)
{
// kliknuto na Plán 1 - editace Plánu 1 (samotný button, text plánu + jeho kryt, který překrývá ostatní prvky, tak aby bylo pouze na identifikaci jedno ID kliknutí)
dia.on(dia.id[13]); // zapne dialogové okno s informací o plánu a možnosti jeho zrušení + zapne posluchče ke Křížku a tlačítku Zrušit plán - v centrum.js
this.eduje_se=1; // nastaví proměnnou na to, že se edituje plán 2
this.editovat(1); // funkce zajistí změnu parametrů dialogového okna, aby byla editace Plánu pro konkrétní plán 1
}
else if(k==`${this.id_butt_box}2`||k==`${this.id_text}2`||k==`${this.id_kryt}2`)
{
// kliknuto na Plán 2 - editace Plánu 2 (samotný button, text plánu + jeho kryt, který překrývá ostatní prvky, tak aby bylo pouze na identifikaci jedno ID kliknutí)
dia.on(dia.id[13]); // zapne dialogové okno s informací o plánu a možnosti jeho zrušení + zapne posluchče ke Křížku a tlačítku Zrušit plán - v centrum.js
this.eduje_se=2; // nastaví proměnnou na to, že se edituje plán 2
this.editovat(2); // funkce zajistí změnu parametrů dialogového okna, aby byla editace Plánu pro konkrétní plán 2
}
else if(k==`${this.id_butt_box}3`||k==`${this.id_text}3`||k==`${this.id_kryt}3`)
{
// kliknuto na Plán 3 - editace Plánu 3 (samotný button, text plánu + jeho kryt, který překrývá ostatní prvky, tak aby bylo pouze na identifikaci jedno ID kliknutí)
dia.on(dia.id[13]); // zapne dialogové okno s informací o plánu a možnosti jeho zrušení + zapne posluchče ke Křížku a tlačítku Zrušit plán - v centrum.js
this.eduje_se=3; // nastaví proměnnou na to, že se edituje plán 3
this.editovat(3); // funkce zajistí změnu parametrů dialogového okna, aby byla editace Plánu pro konkrétní plán 3
}
else if(k==`${this.id_butt_box}4`||k==`${this.id_text}4`||k==`${this.id_kryt}4`)
{
// kliknuto na Plán 4 - editace Plánu 4 (samotný button, text plánu + jeho kryt, který překrývá ostatní prvky, tak aby bylo pouze na identifikaci jedno ID kliknutí)
dia.on(dia.id[13]); // zapne dialogové okno s informací o plánu a možnosti jeho zrušení + zapne posluchče ke Křížku a tlačítku Zrušit plán - v centrum.js
this.eduje_se=4; // nastaví proměnnou na to, že se edituje plán 4
this.editovat(4); // funkce zajistí změnu parametrů dialogového okna, aby byla editace Plánu pro konkrétní plán 4
}
else if(k==`${this.id_butt_box}5`||k==`${this.id_text}5`||k==`${this.id_kryt}5`)
{
// kliknuto na Plán 5 - editace Plánu 5 (samotný button, text plánu + jeho kryt, který překrývá ostatní prvky, tak aby bylo pouze na identifikaci jedno ID kliknutí)
dia.on(dia.id[13]); // zapne dialogové okno s informací o plánu a možnosti jeho zrušení + zapne posluchče ke Křížku a tlačítku Zrušit plán - v centrum.js
this.eduje_se=5; // nastaví proměnnou na to, že se edituje plán 5
this.editovat(5); // funkce zajistí změnu parametrů dialogového okna, aby byla editace Plánu pro konkrétní plán 5
}
else if(k==`${this.id_butt_box}6`||k==`${this.id_text}6`||k==`${this.id_kryt}6`)
{
// kliknuto na Plán 6 - editace Plánu 6 (samotný button, text plánu + jeho kryt, který překrývá ostatní prvky, tak aby bylo pouze na identifikaci jedno ID kliknutí)
dia.on(dia.id[13]); // zapne dialogové okno s informací o plánu a možnosti jeho zrušení + zapne posluchče ke Křížku a tlačítku Zrušit plán - v centrum.js
this.eduje_se=6; // nastaví proměnnou na to, že se edituje plán 6
this.editovat(6); // funkce zajistí změnu parametrů dialogového okna, aby byla editace Plánu pro konkrétní plán 6
}


},

zaloz(plan=0){

if(plan==0){
// pokud nebyl poslán požadavek na založení plánu - bude funkce ukončena == return
return;
}

hlidac.planovac=true; // tato proměnná hlídá jestli je funkce plánovač aktivní, pokud zapnutý alespoň jeden plán=true pokud ne=false, pokud bude proměnná na true - bude aktivovat zvukou ochranu před uspáním - v ochrany.js

const hodin=parseInt(document.getElementById(this.id_spust[0]).value[0]+document.getElementById(this.id_spust[0]).value[1]); // převede zadané hodiny na číslo
const minut=parseInt(document.getElementById(this.id_spust[0]).value[3]+document.getElementById(this.id_spust[0]).value[4]); // převede zadané minuty na číslo

const duplicita=this.duplicitni_cas(hodin,minut); // funkce zkontroluje jestli čas zadané minutky již nebyl v jiné minutce zadán, pokud ano bude návratová hodnota této funkce true (jinak false), tato funkce vypne dialogové okno se zadáním minutky a provede scroll na minutku, která již v tomto čase byla zadána a rozbliká ji 2x

if(duplicita)
{
// pokud byl čas zadané minutky již v jiné minutce zadán - bude return
return;
}

let minut_text=minut; // do proměnné zapíše minuty

if(minut_text<10)
{
minut_text=`0${minut_text}`; // pokud budou minuty menší než 10 - přidá 0 na začátek, tato proměnná slouží pouze k innerText
}

const text=document.getElementById(this.id_spust[1]).value; // opíše text z value formuláře pro zadání Plánovače

document.getElementById(`${this.id_box_hl}${plan}`).style.opacity=1; // nastaví hlavní kontajner plánu opacity na 1, protože jeho ukončení nastavuje opacity na 0, tedy kdyby tento plán byl znovu spuštěn, měl by bez tohoto opacity=0 viz funkce this.ukoncit()

document.getElementById(`${this.id_hl_kon}`).classList.remove("d-n"); // odebere class třídu (pokud jí HTML objekt má), která hlavní kontajner všech plánů nastavuje na display="none" , čímž tento hlavní kontejner "zviditelní"
document.getElementById(`${this.id_box_hl}${plan}`).classList.remove("d-n"); // odebere class třídu (pokud jí HTML objekt má), která box plánu podle požadavku 1 - 6 odebere css třídu nastavující tento box na display="none"

document.getElementById(`${this.id_hod}${plan}`).innerText=hodin; // zapíše do spanu hodinu plánu
document.getElementById(`${this.id_min}${plan}`).innerText=minut_text; // zapíše do spanu minutu plánu
document.getElementById(`${this.id_text}${plan}`).innerText=text; // zapíše do spanu text plánu

this.sroll_na(plan); // scrool na plán
setTimeout(()=>{
this.sroll_na(plan); // opět scrool na plán
},500); // opět scroll na plán pro zařízení, které mají problém zvládnout scollTo na poprvé dobře

setTimeout(()=>{
document.getElementById(`${this.id_box_hl}${plan}`).classList.add("zar"); // přidá class třídu (pokud jí HTML objekt nemá), která box plánu podle požadavku 1 - 6 přidá css třídu nastavující bliknutí boxu 2x za sebou
},1000);

const ch1=document.getElementById(this.id_spust[2]).checked; // zjistí hodnotu checked box - Bez zvukového upozornění
const ch2=document.getElementById(this.id_spust[3]).checked; // zjistí hodnotu checked box - Zvuk upozornění přehrát 1x
const ch3=document.getElementById(this.id_spust[4]).checked; // zjistí hodnotu checked box - Zvuk upozornění přehrávat do ukončení

let zvuk=null;

if(ch1==true)
{
zvuk=false;
}
else if(ch2==true)
{
zvuk=null;
}
else if(ch3==true)
{
zvuk=true;
}

const cislo_pole_planu=plan-1; // určuje konkrétní plán v poli plánů, proto musí dojít k snížení o -1


this.plany[cislo_pole_planu].push(hodin); // vloží na první pořadí pole hodinu plánu
this.plany[cislo_pole_planu].push(minut); // vloží na druhé pořadí pole minut plánu
this.plany[cislo_pole_planu].push(text); // vloží na třetí pořadí pole text plánu
this.plany[cislo_pole_planu].push(zvuk); // vloží na čtvrté pořadí pole volbu přehrávání zvuku (false=bez zvuku;null=zvuk přehrát 1x;true=zvuk přehrávat do ukončení)

// console.log(this.plany[cislo_pole_planu]);


document.getElementById(`${this.id_butt_box}${plan}`).addEventListener("click",this); // přidá posluchač k buttonu, který je hlaví box plánu - kliknutí na něj otevře dialogové okno s informací o konkrétním plánu a možnosti jeho zrušení

dia.off(dia.id[4]); /* zavře dialogové okno pro zadání Plánovač a odebere posluchače - v centrum.js */
this.hlidat_plany=true; // proměnná určuje, zda je zapnutý nějáký plán a následně ve funkci window.tik.tak v centrum.js časovač hlídá čas, kdy má být plán aktiviván, true=nějáký plán je zapnutý, false=žádný plán není zapnutý

zvuk_plan.hraj(false); // bude přehrávat zvuk upozornění Plánovače - true=dokola , false=1x - funkce ve vlk.js
},
duplicitni_cas(hod,min){

const kontrolor=[null,null,null,null,null,null]; // proměnná bude kontrolovat, zda a který plán není časově shodný s plánem, který má být nově zadán
const d=kontrolor.length; // lékla pole = 6 stejně jako počet plánů

for(let i=0;i<d;i++)
{
// smyčka zkontroluje veškeré plány, které byly zadány a jejich zadaný čas v hodinách a minutách
if(this.plany[i].length!=0){
// pokud se nebude délka pole this.plany[0]!=0, znamená to, že plán 1 je aktivní a byl zadán
if(this.plany[i][0]==hod&&this.plany[i][1]==min)
{
// pokud bude čas zadání == čas již zadaného plánu 
kontrolor[i]=true; // kontrolol v tomto poli bude true
}}}

if(kontrolor[0]==true||kontrolor[1]==true||kontrolor[2]==true||kontrolor[3]==true||kontrolor[4]==true||kontrolor[5]==true)
{
// pokud některý ze zadaných plánů má stejný čas zadaní jako ten, který se právě snaží přidat
dia.off(dia.id[4]); /* zavře dialogové okno pro zadání Plánovač a odebere posluchače - v centrum.js */

let plan=null;

if(kontrolor[0]==true)
{
// pokud 1. zadaný plán má stejný čas
plan=1; // číslo plánu
}
else if(kontrolor[1]==true)
{
// pokud 2. zadaný plán má stejný čas
plan=2; // číslo plánu
}
else if(kontrolor[2]==true)
{
// pokud 3. zadaný plán má stejný čas
plan=3; // číslo plánu
}
else if(kontrolor[3]==true)
{
// pokud 4. zadaný plán má stejný čas
plan=4; // číslo plánu
}
else if(kontrolor[4]==true)
{
// pokud 5. zadaný plán má stejný čas
plan=5; // číslo plánu
}
else if(kontrolor[5]==true)
{
// pokud 6. zadaný plán má stejný čas
plan=6; // číslo plánu
}

document.getElementById(`${this.id_box_hl}${plan}`).classList.remove("zar"); // odebere class třídu (pokud jí HTML objekt má), která box plánu podle požadavku 1 - 6 odebere css třídu nastavující bliknutí boxu 2x za sebou

this.sroll_na(plan); // bude scroll na plán, který je v alarmu

setTimeout(()=>{
this.sroll_na(plan); // opět scrool na plán
},500); // opět scroll na plán pro zařízení, které mají problém zvládnout scollTo na poprvé dobře

setTimeout(()=>{
document.getElementById(`${this.id_box_hl}${plan}`).classList.add("zar"); // přidá class třídu (pokud jí HTML objekt nemá), která box plánu podle požadavku 1 - 6 přidá css třídu nastavující bliknutí boxu 2x za sebou
zvuk_plan.hraj(false); // bude přehrávat zvuk upozornění Plánovače - true=dokola , false=1x - funkce ve vlk.js
},750); // menší zpoždění 1. umožní animaci pokud dojde výše k odebráníí class css s nanimací, 2. alespoň už proběhne scroll na html objekt

return true; // duplicitní čas byl zjištěn
}
else
{
return false; // duplicitní čas nebyl zjištěn
}

},
editovat(plan)
{
// funkce slouží ke změně parametrů dialogového okna k editaci konkrétního plánu
const plan_pole=plan-1; // pole plánu je o jedno menší než konrétní plán
const hodina_planu=this.plany[plan_pole][0]; // HODINA konkétního plánu - pole k datům o jednotlivých plánech 1-6. plán, plany[0-5]=[hodina plánu,minuta plánu, text plánu, zvuk plánu (false=bez zvuku;null=zvuk přehrát 1x;true=zvuk přehrávat do ukončení)];
let minuta_planu=this.plany[plan_pole][1]; // MINUTA konkétního plánu - pole k datům o jednotlivých plánech 1-6. plán, plany[0-5]=[hodina plánu,minuta plánu, text plánu, zvuk plánu (false=bez zvuku;null=zvuk přehrát 1x;true=zvuk přehrávat do ukončení)];
const text_planu=this.plany[plan_pole][2]; // TEXT konkétního plánu - pole k datům o jednotlivých plánech 1-6. plán, plany[0-5]=[hodina plánu,minuta plánu, text plánu, zvuk plánu (false=bez zvuku;null=zvuk přehrát 1x;true=zvuk přehrávat do ukončení)];
const volba_zvuku=this.plany[plan_pole][3]; // VOLBA ZVUKU konkétního plánu - pole k datům o jednotlivých plánech 1-6. plán, plany[0-5]=[hodina plánu,minuta plánu, text plánu, zvuk plánu (false=bez zvuku;null=zvuk přehrát 1x;true=zvuk přehrávat do ukončení)];

if(minuta_planu<10)
{
minuta_planu=`0${minuta_planu}`; // pokud bude minuta plánu menší jak 10 - přidá 0 před minutu plánu
}

const dia_hodina=document.getElementById(this.id_nas_plan[0]); // načte HTML objekt pro hodinu plánu
dia_hodina.innerText=hodina_planu; // přepíše text HTML objektu na hodinu plánu

const dia_minuta=document.getElementById(this.id_nas_plan[1]); // načte HTML objekt pro minutu plánu
dia_minuta.innerText=minuta_planu; // přepíše text HTML objektu na minutu plánu

const dia_text=document.getElementById(this.id_nas_plan[2]); // načte HTML objekt pro text plánu
dia_text.innerText=text_planu; // přepíše text HTML objektu na text plánu

const dia_ch1=document.getElementById(this.id_nas_plan[3]); // načte HTML objekt checked - Bez zvukového upozornění
const dia_ch2=document.getElementById(this.id_nas_plan[4]); // načte HTML objekt checked - Zvuk upozornění přehrát 1x
const dia_ch3=document.getElementById(this.id_nas_plan[5]); // načte HTML objekt checked - Zvuk upozornění přehrávat do ukončení

if(volba_zvuku)
{
// uživatel zvolil u tohoto plánu - Zvuk upozornění přehrávat do ukončení
dia_ch1.checked=false;
dia_ch2.checked=false;
dia_ch3.checked=true;
}
else if(volba_zvuku==false)
{
// uživatel zvolil u tohoto plánu - Bez zvukového upozornění
dia_ch1.checked=true;
dia_ch2.checked=false;
dia_ch3.checked=false;
}
else if(volba_zvuku==null)
{
// uživatel zvolil u tohoto plánu - Zvuk upozornění přehrát 1x
dia_ch1.checked=false;
dia_ch2.checked=true;
dia_ch3.checked=false;
}

},
nas_posON(){
// funkce aktivuje posluchače událostí k nastavení konkrétního plánu (info dialogové okno k Plánu) - checked tlačítka + Zrušit Plán

document.getElementById(this.id_nas_plan[3]).addEventListener("click",this); // checked - Bez zvukového upozornění
document.getElementById(this.id_nas_plan[4]).addEventListener("click",this); // checked - Zvuk upozornění přehrát 1x
document.getElementById(this.id_nas_plan[5]).addEventListener("click",this); // checked - Zvuk upozornění přehrávat do ukončení

},
nas_posOFF(){
// funkce odbere posluchače událostí k nastavení konkrétního plánu (info dialogové okno k Plánu) - checked tlačítka + Zrušit Plán

document.getElementById(this.id_nas_plan[3]).removeEventListener("click",this); // checked - Bez zvukového upozornění
document.getElementById(this.id_nas_plan[4]).removeEventListener("click",this); // checked - Zvuk upozornění přehrát 1x
document.getElementById(this.id_nas_plan[5]).removeEventListener("click",this); // checked - Zvuk upozornění přehrávat do ukončení

},
hlidac(){
// funkce hlídá, jestli už nastal čas pro aktivaci zadaného plánu anebo plánů, je spuštěná funkcí window.tik.tak v centrum.js

console.log("hlidac");

const plan=[null,null,null,null,null,null]; // rozhodne, který plán je aktivní
const plany_ke_kontrole=[];

if(this.plany[0].length!=0){
// pokud se nebude délka pole this.plany[0]!=0, znamená to, že plán 1 je aktivní a byl zadán
plan[0]=true; // proměnná určí jako aktivní plán 1
plany_ke_kontrole.push(1); // připne plán 1 ke kontrole času
}

if(this.plany[1].length!=0){
// pokud se nebude délka pole this.plany[1]!=0, znamená to, že plán 2 je aktivní a byl zadán
plan[1]=true; // proměnná určí jako aktivní plán 2
plany_ke_kontrole.push(2); // připne plán 2 ke kontrole času
}

if(this.plany[2].length!=0){
// pokud se nebude délka pole this.plany[2]!=0, znamená to, že plán 3 je aktivní a byl zadán
plan[2]=true; // proměnná určí jako aktivní plán 3
plany_ke_kontrole.push(3); // připne plán 3 ke kontrole času
}

if(this.plany[3].length!=0){
// pokud se nebude délka pole this.plany[3]!=0, znamená to, že plán 4 je aktivní a byl zadán
plan[3]=true; // proměnná určí jako aktivní plán 4
plany_ke_kontrole.push(4); // připne plán 4 ke kontrole času
}

if(this.plany[4].length!=0){
// pokud se nebude délka pole this.plany[4]!=0, znamená to, že plán 5 je aktivní a byl zadán
plan[4]=true; // proměnná určí jako aktivní plán 5
plany_ke_kontrole.push(5); // připne plán 5 ke kontrole času
}

if(this.plany[5].length!=0){
// pokud se nebude délka pole this.plany[5]!=0, znamená to, že plán 6 je aktivní a byl zadán
plan[5]=true; // proměnná určí jako aktivní plán 6
plany_ke_kontrole.push(6); // připne plán 6 ke kontrole času
}



// console.log(plan);
// console.log(plany_ke_kontrole);


if(plan[0]==null&&plan[1]==null&&plan[2]==null&&plan[3]==null&&plan[4]==null&&plan[5]==null)
{
// pokud se plan[0-5]==null, není aktivován žádný plán, vypne se časový hlídač a fukce se ukončí - return
this.hlidat_plany=false; // proměnná určuje, zda je zapnutý nějáký plán a následně ve funkci window.tik.tak v centrum.js časovač hlídá čas, kdy má být plán aktiviván, true=nějáký plán je zapnutý, false=žádný plán není zapnutý
hlidac.planovac=false; // tato proměnná hlídá jestli je funkce plánovač aktivní, pokud zapnutý alespoň jeden plán=true pokud ne=false, pokud bude proměnná na true - bude aktivovat zvukou ochranu před uspáním - v ochrany.js
return;
}

const delka=plany_ke_kontrole.length; // délka pole plánů ke kontrole

for(let i=0;i<delka;i++)
{
// smička pro kontrolu označených plánů
const cas=new Date(); // vytvoří objekt Date
const hod=cas.getHours(); // zjistí kolik je hodin
const min=cas.getMinutes(); // zjistí kolik je minut

const z_hod=this.plany[plany_ke_kontrole[i]-1][0]; // zjistí v kolik hodin má být plán aktivován (plan-1)=číslo pole konkrétního plánu
const z_min=this.plany[plany_ke_kontrole[i]-1][1]; // zjistí v kolik minu má být plán aktivován (plan-1)=číslo pole konkrétního plánu

if(hod==z_hod&&min==z_min)
{
// pokud se aktuální hodina a aktuální minuta == zadané hodině a zadané minutě v plánu

if(hl_kon.otevrene_okno!="")
{
// pokud hl_kon.otevrene_okno!="" znamená to, že hlavní kontajner je nastaven na display=none a jiné okno je otevřené, tato proměnná v sobě má id okna, které je otevřené - centrum.js

planovac.hlidat_plany=false; // zastaví hlídání plánů, přestanou se hlídat ve funkci tik.tak v centrum.js

hl_kon.otevri(hl_kon.otevrene_okno); // funkce otevře hlavní kontejner a zavře okno, které je právě otevřené - v centrum.js

setTimeout(()=>{
 this.alarm(plany_ke_kontrole[i]); // spustí funkci se zpožděním, během toho dojde k uzavření okna a otevření kontejneru a proměnná hl_kon.otevrene_okno nabyde nově hodnoty "" viz funkce hl_kon.otevri v centrum.js
},500); // protože celý proces uzavírání okna a otvírání hlavního chvilku trvá a následně tato funkce používá scrool a animační prvky, zpoždění je namíste

setTimeout(()=>{
planovac.hlidat_plany=true; // zapne hlídání plánů, začnou se zase hlídat ve funkci tik.tak v centrum.js
},1000); // zpoždějí, je na místě, než se dokončí veškeré procesy, aby nedošlo k zaciklování

}
else
{
// pokud je hlavní kontajner display=grid - funkce bude běžet dál do alarmu, jako kdyby se nechumelilo
this.alarm(plany_ke_kontrole[i]); // aktivuje alarm u konkétního plánu
}

}}
},
alarm(plan){
// funkce aktivuje alarm ke konkrétnímu plánu

dia.vyp_akt(); // funkce vypne aktuálně otevřené dialogové okno, krom výjimek - v centrum.js

this.sroll_na(plan); // bude scroll na plán, který je v alarmu
setTimeout(()=>{
this.sroll_na(plan); // opět scrool na plán
},500); // opět scroll na plán pro zařízení, které mají problém zvládnout scollTo na poprvé dobře

document.getElementById(`${this.id_butt_box}${plan}`).removeEventListener("click",this); // odebere posluchač k buttonu, který je hlaví box plánu - kliknutí na něj otevře dialogové okno s informací o konkrétním plánu a možnosti jeho zrušení

document.getElementById(`${this.id_box_hl}${plan}`).classList.remove("zar"); // odebere class třídu (pokud jí HTML objekt má), která box plánu podle požadavku 1 - 6 odebere css třídu nastavující bliknutí boxu 2x za sebou, tato třída byla přidána při založení plánu viz funkce this.zaloz

document.getElementById(`${this.id_bud}${plan}`).classList.add("budik"); // přidá css třídu, která spustí animaci pohybujícího se budíku
document.getElementById(`${this.id_box_hl}${plan}`).classList.add("zar-nonstop"); // přidá třídu class k boxu plánu, která prvek dočasné rozzáří
document.getElementById(`${this.id_box_up}${plan}`).classList.remove("d-n"); // odebere css třídu, která blok s buttonem ok, případně vypni zvuk dávala na display=none

/*
console.log(plan);
console.log(this.plany);
console.log(this.plany[plan-1]);

console.log(this.plany[plan-1][3]);
*/

if(this.plany[plan-1][3]==true)
{
// pokud tomuto konkrétnímu plánu byl zadán požadavek Přehrát zvuk upozornění dokola - this.plany[plan-1][3]=(false=bez zvuku;null=zvuk přehrát 1x;true=zvuk přehrávat do ukončení)
document.getElementById(`${this.id_butt_zvuk}${plan}`).classList.remove("d-n"); // pokud byla třída CSS přidána, bude odebrána, class nastavuje objekt HTML display=none
document.getElementById(`${this.id_butt_zvuk}${plan}`).addEventListener("click",this); // přidá posluchač události k buttonu Vypni zvuk

zvuk_plan.hraj(true); // bude přehrávat zvuk upozornění Plánovače - true=dokola , false=1x - funkce ve vlk.js
this.povoleni_zesilovat=true; // dočasné povolení zesilování, toto povolení je však jen sekundární, díky tomuto povolení se o zesilování může pokusit ve funkci tik.tak v centrum.js, rozhodující pro zesilování je však proměnná zvuk_plan.zesilovat, která určuje zda bude zvuk přehráván postupným zesilováním, pokud true=ano , false=ne - ve vlk.js
}
else
{
document.getElementById(`${this.id_butt_zvuk}${plan}`).classList.add("d-n"); // pokud nebyla třída CSS přidána, bude přidána, class nastavuje objekt HTML display=none
if(this.plany[plan-1][3]==null)
{
// pokud tomuto konkrétnímu plánu byl zadán požadavek Přehrát zvuk upozornění 1x - this.plany[plan-1][3]=(false=bez zvuku;null=zvuk přehrát 1x;true=zvuk přehrávat do ukončení)
this.povoleni_zesilovat=false; // dočasný zákaz zesilování, tento zákaz je však jen sekundární, díky tomuto zákazu se o zesilování nemůže vůbec pokusit ve funkci tik.tak v centrum.js, rozhodující pro zesilování je však proměnná zvuk_plan.zesilovat, která určuje zda bude zvuk přehráván postupným zesilováním, pokud true=ano , false=ne - ve vlk.js
zvuk_plan.hraj(false); // bude přehrávat zvuk upozornění Plánovače - true=dokola , false=1x - funkce ve vlk.js
}}




document.getElementById(`${this.id_butt_uk}${plan}`).addEventListener("click",this); // přidá posluchač události k buttonu OK - ukončení Plánu

this.v_alarmu[plan-1]=true; // proměnná určuje, zda je nějáký plán aktuálně v alarmu, pokud bude pole naplněno true, -1 odebírá pro správné zařazení plánu do jeho pole, pole jsou pro plány rozděleny následovně:[plán1,plán2,plán3,plán4,plán5,plán6]

this.anuluj_plan(plan); // funkce anuluje konkrétní plán

},
anuluj_plan(plan){
// funkce anuluje konkrétní plán - vymaže veškeré hodnoty jeho pole 
const cislo_pole_planu=plan-1; // -1 aby odpovídal plán jeho pozici v poli, kde plány jsou od 1 a pole je číslované od 0
this.plany[cislo_pole_planu]=[]; // vynuluje konkrétní plán
},
ukoncit(plan){

document.getElementById(`${this.id_butt_uk}${plan}`).removeEventListener("click",this); // odebere posluchač události k buttonu OK - ukončení Plánu

document.getElementById(`${this.id_butt_zvuk}${plan}`).removeEventListener("click",this); // odebere posluchač události k buttonu Vypni zvuk
zvuk_plan.zastav(); // zastaví zvuk upozornění Plánovače - funkce ve vlk.js

document.getElementById(`${this.id_box_hl}${plan}`).style.opacity=0; // nechá pomalu vymyzet ukončený plán

setTimeout(()=>{
document.getElementById(`${this.id_bud}${plan}`).classList.remove("budik"); // odebere css třídu, která spustí animaci pohybujícího se budíku
document.getElementById(`${this.id_box_hl}${plan}`).classList.remove("zar-nonstop"); // odebere třídu class k boxu plánu, která prvek dočasné rozzáří
document.getElementById(`${this.id_box_up}${plan}`).classList.add("d-n"); // přidá css třídu, která blok s buttonem ok, případně vypni zvuk dávala na display=none
document.getElementById(`${this.id_box_hl}${plan}`).classList.add("d-n"); // přidá css třídu, která celý blok s plánem dá na display=none
}
,300); // zpoždění 300ms dá prostor transition opacity=0


this.v_alarmu[plan-1]=""; // proměnná určuje, zda je nějáký plán aktuálně v alarmu, pokud bude pole naplněno true, -1 odebírá pro správné zařazení plánu do jeho pole, pole jsou pro plány rozděleny následovně:[plán1,plán2,plán3,plán4,plán5,plán6]

if(this.plany[0].length==0&&this.plany[1].length==0&&this.plany[2].length==0&&this.plany[3].length==0&&this.plany[4].length==0&&this.plany[5].length==0&&this.v_alarmu[0]!=true&&this.v_alarmu[1]!=true&&this.v_alarmu[2]!=true&&this.v_alarmu[3]!=true&&this.v_alarmu[4]!=true&&this.v_alarmu[5]!=true)
{
// pokud všechny pole plánů (this.plany) budou mít délku 0, znamená to, že není aktivní žádný plán + pokud v šechna pole v alarmu (this.v_alarmu) nebudou mít hodnotu true, znamená to, že žádný plán není v alarmu
setTimeout(()=>{
document.getElementById(`${this.id_hl_kon}`).classList.add("d-n"); // přidá class třídu (pokud jí HTML objekt nemá), která hlavní kontajner všech plánů nastavuje na display="none" , čímž tento hlavní kontejner "zneviditelní"
console.log("d-n");
}
,500); // zpoždění 300ms dá prostor transition opacity=0, na tuto animaci ukončenému Plánu
}

},
sroll_na(plan=0){
// funkce zajistí scroll na konrétní plán

if(plan==0)
{
return; // pokud do funkce nebyl zaslán požadavek na scrool na konkrétní plán - bude return
}

document.getElementById(`${this.id_box_hl}${plan}`).scrollIntoView({behavior:"smooth",block:"center"}); // provede scroll na konkrétní plán
}



};

pripravenost.planovac=true; /* MUSÍ BÝT NA POSLEDNÍM ŘÁDKU KNIHOVNY - v autorun.js - informuje o načtení této js knihovny */
"use strict";
const pripravenost={casovac:null, // časovač pro interval, který kontroluje připravenost všech JS knihoven
TIME:500, // prodleva v ms do kontroly, zda jsou všechny knihovny asynchronně načteny
pruvodce:null, // proměnná informuje, že byla načtena knihovna pruvodce.js
centrum:null, // proměnná informuje, že byla načtena knihovna centrum.js
vlk:null, // proměnná informuje, že byla načtena knihovna vlk.js
ochrany:null,  // proměnná informuje, že byla načtena knihovna ochrany.js
kresly:null, // proměnná informuje, že byla načtena knihovna kresly.js
ozivit:null, // proměnná informuje, že byla načtena knihovna ozivit.js
minutka:null, // proměnná informuje, že byla načtena knihovna minutka.js
planovac:null, // proměnná informuje, že byla načtena knihovna planovac.js
akce(){
// funkce slouží ke kontrole, zda byly všechny JS knihovny potřebné pro chod aplikace načteny a pokud ano, spustí postupně všechny procesy
if(this.pruvodce===true&&this.centrum===true&&this.vlk===true&&this.ochrany===true&&this.kresly===true&&this.ozivit===true&&this.minutka===true&&this.planovac===true)
{
clearTimeout(this.casovac); // zastaví časovač
uloz.a(); // kontrola jestli funguje uživateli LocalStorage v ozivit.js
centrala.komplet(); // spustí základní procesy aplikace - ověření licence, VisualView port ... v centrum.js
if(!centrala.lic){return; /* pokud nebude licence v pořádku ukončí funkci v centrum.js */}
zvuk.zaloz(); // založí všechny audio mp3 do globální proměnné window ve vlk.js
posuvnik.zahajeni(); /* funkce za určitý počet sekund schová posuvníky body, pokud nebude pohyb myši anebo kolečka myši v ochrany.js */
g_pos.aktivace(); /* aktivuje všechny posluchače události hlavního kontajneru */
tik.aktivace(); // funkce vypne WAIT a zapne hodiny, aktivuje SetInterval 500ms pro hlídání základních procesů aplikace hodiny ...
uloz.oziv(); /* oživení hlavní funkce aplikace Noční VLK v ozivit.js */
// nulování nepotřebných proměnných
this.TIME=""; // vynuluje promnnou, aby mohla být vyřazena z paměti, již nebude potřeba
this.pruvodce=""; // vynuluje promnnou, aby mohla být vyřazena z paměti, již nebude potřeba
this.centrum=""; // vynuluje promnnou, aby mohla být vyřazena z paměti, již nebude potřeba
this.vlk=""; // vynuluje promnnou, aby mohla být vyřazena z paměti, již nebude potřeba
this.ochrany=""; // vynuluje promnnou, aby mohla být vyřazena z paměti, již nebude potřeba
this.kresly=""; // vynuluje promnnou, aby mohla být vyřazena z paměti, již nebude potřeba
this.ozivit=""; // vynuluje promnnou, aby mohla být vyřazena z paměti, již nebude potřeba
this.minutka=""; // vynuluje promnnou, aby mohla být vyřazena z paměti, již nebude potřeba
this.planovac=""; // vynuluje promnnou, aby mohla být vyřazena z paměti, již nebude potřeba
}
else
{
clearTimeout(this.casovac); // pro sichr zastaví časovač
this.casovac=setTimeout(this.akce.bind(this),this.TIME); // zapne časovač, který bude kontrolovat splnění podmínek
}

}}; // objekt shromažďuje data o připravenosti jednotlivých js knihoven, aby po jejich připravenosti bylo možné vše spustit

pripravenost.akce(); // funkce spustí ověřování, zda byly načteny všechny JS knihovny a pokud byly, zapne postupně všechny potřebné procesy k aktivaci všech funkcí v aplikaci
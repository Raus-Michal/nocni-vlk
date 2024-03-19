

/* registrace servisního pracovníka - CACHE - MEZIPAMĚŤ */


var serviceWorker_reg=async function(){

if("serviceWorker" in navigator)
{
console.log("ServiceWorker je podporován");
try
{
const reg=await navigator.serviceWorker.register("pracant.js"); /* registrace servisního pracovníka pro mezipaměť */

if(reg.installing)
{
console.log("serviceWorker installing");
}
else if(reg.waiting)
{
console.log("serviceWorker waiting");
}
else if(reg.active)
{
console.log("serviceWorker active");
}

}
catch(error)
{
console.error('Registrace s chybou:'+error);
}}
else
{
console.log("serviceWorker NENÍ podporován");
}};

serviceWorker_reg(); /* spustit registraci servistního pracovníka - v ochrany.js */
/* KONEC registrace servisního pracovníka - CACHE - MEZIPAMĚŤ */

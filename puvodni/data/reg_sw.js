/* registrace servisního pracovníka - CACHE - MEZIPAMĚŤ */

// Kontrola, zda prohlížeč podporuje Service Workery
if('serviceWorker' in navigator){

console.log("serviceWorker je podporován");

// Asynchronní registrace Service Workeru
window.addEventListener('load',async()=>{
try{
const reg=await navigator.serviceWorker.register('sw.js',{scope:'/nocni-vlk/data/'}); // registrace servisního pracovníka pro mezipaměť
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
console.log('Pracovník servisu zaregistrován s rozsahem:',reg.scope);
}
catch(error){
console.error('Service Worker registrován s chybou:',error);
}});
}
else
{
console.log("serviceWorker NENÍ podporován");
}

/* KONEC registrace servisního pracovníka - CACHE - MEZIPAMĚŤ */
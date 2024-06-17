﻿
self.addEventListener("install",(event)=>{

const o_soubory=[
"/nocni-vlk/data/index.html"
,"/nocni-vlk/data/pracant.js"
,"/nocni-vlk/data/reg_ser.js"
,"/nocni-vlk/data/styl/optimal.css"
,"/nocni-vlk/data/styl/start.css"
,"/nocni-vlk/data/styl/vlk.css"
,"/nocni-vlk/data/alarm/alarm1.mp3"
,"/nocni-vlk/data/alarm/alarm2.mp3"
,"/nocni-vlk/data/alarm/alarm3.mp3"
,"/nocni-vlk/data/alarm/alarm4.mp3"
,"/nocni-vlk/data/alarm/alarm5.mp3"
,"/nocni-vlk/data/alarm/alarm6.mp3"
,"/nocni-vlk/data/svg/intro.mp4"
,"/nocni-vlk/data/script/autorun.js"
,"/nocni-vlk/data/script/centrum.js"
,"/nocni-vlk/data/script/kresly.js"
,"/nocni-vlk/data/script/ochrany.js"
,"/nocni-vlk/data/script/ozivit.js"
,"/nocni-vlk/data/script/pruvodce.js"
,"/nocni-vlk/data/script/start.js"
,"/nocni-vlk/data/script/vlk.js"
,"/nocni-vlk/data/font/nadpis.ttf"
,"/nocni-vlk/data/font/text.ttf"
,"/nocni-vlk/data/nahled/nahled.gif"
,"/nocni-vlk/data/svg/hlas.svg"
,"/nocni-vlk/data/svg/hodiny.svg"
,"/nocni-vlk/data/svg/jas.svg"
,"/nocni-vlk/data/svg/ko.svg"
,"/nocni-vlk/data/svg/kontakt.svg"
,"/nocni-vlk/data/svg/krizek.svg"
,"/nocni-vlk/data/svg/logo.svg"
,"/nocni-vlk/data/svg/logo-an.svg"
,"/nocni-vlk/data/svg/minus.svg"
,"/nocni-vlk/data/svg/minutka.svg"
,"/nocni-vlk/data/svg/nastav.svg"
,"/nocni-vlk/data/svg/no-zvuk.svg"
,"/nocni-vlk/data/svg/obchuzky.svg"
,"/nocni-vlk/data/svg/o-cele.svg"
,"/nocni-vlk/data/svg/o-full.svg"
,"/nocni-vlk/data/svg/ok.svg"
,"/nocni-vlk/data/svg/o-left.svg"
,"/nocni-vlk/data/svg/o-max.svg"
,"/nocni-vlk/data/svg/o-right.svg"
,"/nocni-vlk/data/svg/ozivit.svg"
,"/nocni-vlk/data/svg/p_cela.svg"
,"/nocni-vlk/data/svg/p_full.svg"
,"/nocni-vlk/data/svg/p_max.svg"
,"/nocni-vlk/data/svg/p_min.svg"
,"/nocni-vlk/data/svg/p_vlevo.svg"
,"/nocni-vlk/data/svg/p_vpravo.svg"
,"/nocni-vlk/data/svg/planovac.svg"
,"/nocni-vlk/data/svg/plus.svg"
,"/nocni-vlk/data/svg/prestav.svg"
,"/nocni-vlk/data/svg/tlapka.svg"
,"/nocni-vlk/data/svg/zamek.svg"
,"/nocni-vlk/data/favicon/android-chrome-192x192.png"
,"/nocni-vlk/data/favicon/android-chrome-512x512.png"
,"/nocni-vlk/data/favicon/apple-touch-icon.png"
,"/nocni-vlk/data/favicon/browserconfig.xml"
,"/nocni-vlk/data/favicon/favicon.ico"
,"/nocni-vlk/data/favicon/favicon-16x16.png"
,"/nocni-vlk/data/favicon/favicon-32x32.png"
,"/nocni-vlk/data/favicon/mstile-70x70.png"
,"/nocni-vlk/data/favicon/mstile-144x144.png"
,"/nocni-vlk/data/favicon/mstile-150x150.png"
,"/nocni-vlk/data/favicon/mstile-310x150.png"
,"/nocni-vlk/data/favicon/mstile-310x310.png"
,"/nocni-vlk/data/favicon/safari-pinned-tab.svg"
,"/nocni-vlk/data/favicon/site.webmanifest"
];

event.waitUntil(
caches.open("vlk1").then(function(cache){
cache.addAll(o_soubory);
console.log("soubory nahrány do cache");
}));});


self.addEventListener("fetch",(event)=>{
event.respondWith(

caches.match(event.request).then((response)=>{
if(response){
return response;
}

return fetch(event.request.clone()).then((response)=>{
if(response&&response.status===200&&response.type==="basic")
{return response;}

caches.open("vlk2").then((cache)=>{
cache.put(event.request, response.clone());});
return response;});
}

));
});
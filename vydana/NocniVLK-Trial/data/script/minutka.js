const minutka={aktivni:false,zapnuta:true,opakovat:false,id_check:["opak_min1","opak_min2"],id_zadani:["m-p-10","m-m-10","m-p-1","m-m-1"],int_zad:1,id_box_uk:"box-min-odpocet",display:"flex",id_viz_uk:["min-vizual","min-svg-vizual","uk-min-min","uk-min-sec1","uk-min-sec2","min-odp-box"],id_uk:"min-ukaz",id_info_uk:["uk-min-min-info","uk-min-sec1-info","uk-min-sec2-info"],id_info_popisek:"min-inf-pop",id_popisek_input:"popis-m",popisek:"",spust:"spust-minutku",alarm:false,konecny_cas:null,id_timeout:["blok-timeout","popisek-timeout","but-timeout"],css_timeout:["timeout-min","budik","zar","zar-nonstop"],max_obnova:3600000,blikni(){document.getElementById(this.id_viz_uk[0]).classList.remove(this.css_timeout[2]);setTimeout(()=>{document.getElementById(this.id_viz_uk[0]).classList.add(this.css_timeout[2]);},250);},pis_popisek(){const a_popisek=document.getElementById(this.id_popisek_input).value;this.popisek=a_popisek;uloz.uloz(uloz.klice[16],a_popisek);},zmen_popisky(){const popisek_timeout=document.getElementById(this.id_timeout[1]);const popisek_nastaveni=document.getElementById(this.id_info_popisek);popisek_timeout.innerText=this.popisek;popisek_nastaveni.innerText=this.popisek;},opakovat_zmena(checked){const check1=document.getElementById(this.id_check[0]);const check2=document.getElementById(this.id_check[1]);check1.checked=checked;check2.checked=checked;this.opakovat=checked;uloz.uloz(uloz.klice[18],this.opakovat);},posON_zadani(){document.getElementById(this.spust).addEventListener("submit",this);document.getElementById(this.id_check[0]).addEventListener("input",this);document.getElementById(this.id_popisek_input).addEventListener("input",this);let d=this.id_zadani.length;for(let i=0;i<d;i++){document.getElementById(this.id_zadani[i]).addEventListener("click",this);}},posOFF_zadani(){document.getElementById(this.spust).removeEventListener("submit",this);document.getElementById(this.id_check[0]).removeEventListener("input",this);document.getElementById(this.id_popisek_input).removeEventListener("input",this);let d=this.id_zadani.length;for(let i=0;i<d;i++){document.getElementById(this.id_zadani[i]).removeEventListener("click",this);}},int_zad_zmen(pozadavek=""){let p=pozadavek;let z=this.int_zad;if(p=="p10"){z=z+10;}else if(p=="m10"){z=z-10;}else if(p=="p1"){z=z+1;}else if(p=="m1"){z=z-1;}if(p=="p10"||p=="m10"||p=="p1"||p=="m1"){klik.hraj(false);}if(z<=1){z=1;document.getElementById(this.id_zadani[1]).disabled=true;document.getElementById(this.id_zadani[3]).disabled=true;}else{document.getElementById(this.id_zadani[1]).disabled=false;document.getElementById(this.id_zadani[3]).disabled=false;}if(z>=120){z=120;document.getElementById(this.id_zadani[0]).disabled=true;document.getElementById(this.id_zadani[2]).disabled=true;}else{document.getElementById(this.id_zadani[0]).disabled=false;document.getElementById(this.id_zadani[2]).disabled=false;}this.int_zad=z;document.getElementById(this.id_uk).innerText=z;uloz.uloz(uloz.klice[19],z);},posON_odpocet(){document.getElementById(this.id_viz_uk[0]).addEventListener("click",this);},posOFF_odpocet(){document.getElementById(this.id_viz_uk[0]).removeEventListener("click",this);},spustit(oziveni=false){zvuk_min.hraj(false);document.getElementById(this.id_box_uk).style.zIndex=5;document.getElementById(this.id_box_uk).style.display=this.display;window.hlidac.aktivace();hlidac.minutka=true;window.onbeforeunload=()=>{return "Chcete zavřít aplikaci Noční VLK?";};if(oziveni){}else{dia.off(dia.id[9]);this.cas_minutky();}this.zmen_popisky();setTimeout(()=>{document.getElementById(this.id_box_uk).style.opacity=1;},100);setTimeout(()=>{this.blikni();},350);setTimeout(()=>{document.getElementById(this.id_box_uk).style.zIndex=1;},2000);this.posON_odpocet();this.aktivni=true;uloz.uloz(uloz.klice[17],true);},cas_minutky(){const p=Date.now();const int=this.int_zad * 60 * 1000;this.konecny_cas=p+int;uloz.uloz(uloz.klice[15],this.konecny_cas);},odpocet(){const uk_min=document.getElementById(this.id_viz_uk[2]);const uk_sec1=document.getElementById(this.id_viz_uk[3]);const uk_sec2=document.getElementById(this.id_viz_uk[4]);const a_cas=Date.now();const k_cas=this.konecny_cas;let zbytek_cas=a_cas-k_cas;zbytek_cas=parseInt(zbytek_cas/1000);zbytek_cas=zbytek_cas*(-1);let zbyva_sec=zbytek_cas%60;let zbyva_min=(zbytek_cas-zbyva_sec)/60;if(zbyva_sec<10){zbyva_sec=`0${zbyva_sec}`;}else{zbyva_sec=zbyva_sec.toString();}uk_min.innerText=zbyva_min;uk_sec1.innerText=zbyva_sec[0];uk_sec2.innerText=zbyva_sec[1];if(dia.aktivni==dia.id[10]){document.getElementById(this.id_info_uk[0]).innerText=zbyva_min;document.getElementById(this.id_info_uk[1]).innerText=zbyva_sec[0];document.getElementById(this.id_info_uk[2]).innerText=zbyva_sec[1];}if(a_cas>=k_cas){uk_min.innerText=0;uk_sec1.innerText=0;uk_sec2.innerText=0;this.timeout();}},timeout(){hlidac.minutka=false;this.alarm=true;f_video.zvuk("ztlumit");zvuk_min.hraj(true);dia.vyp_akt();document.getElementById(this.id_box_uk).style.zIndex=5;document.getElementById(this.id_box_uk).classList.add(this.css_timeout[0]);document.getElementById(this.id_viz_uk[1]).classList.add(this.css_timeout[1]);document.getElementById(this.id_viz_uk[0]).classList.add(this.css_timeout[3]);document.getElementById(this.id_timeout[0]).style.opacity=0;document.getElementById(this.id_timeout[0]).style.display="block";setTimeout(()=>{document.getElementById(this.id_timeout[0]).style.opacity=1;document.getElementById(this.id_timeout[2]).focus();},100);document.getElementById(this.id_timeout[2]).addEventListener("click",this);this.posOFF_odpocet();this.aktivni=false;document.getElementById(this.id_box_uk).style.opacity=1;},handleEvent(e){const k=e.target.id;if(k==this.id_zadani[0]){this.int_zad_zmen("p10");}if(k==this.id_zadani[1]){this.int_zad_zmen("m10");}if(k==this.id_zadani[2]){this.int_zad_zmen("p1");}if(k==this.id_zadani[3]){this.int_zad_zmen("m1");}if(k==this.spust){this.spustit();}if(k==this.id_viz_uk[0]||k==this.id_viz_uk[1]||k==this.id_viz_uk[2]||k==this.id_viz_uk[3]||k==this.id_viz_uk[4]||k==this.id_viz_uk[5]){klik.hraj(false);dia.on(dia.id[10]);this.odpocet();}if(k==this.id_timeout[2]){this.ukoncit();}if(k==this.id_popisek_input){this.pis_popisek();}if(k==this.id_check[0]){this.opakovat_zmena(e.target.checked);}},ukoncit(){hlidac.minutka=false;this.alarm=false;document.getElementById(this.id_timeout[2]).removeEventListener("click",this);zvuk_min.zastav();f_video.zvuk("zesilit");uzamceni.jednou();setTimeout(()=>{document.getElementById(this.id_box_uk).style.opacity=0;},250);setTimeout(()=>{document.getElementById(this.id_box_uk).classList.remove(this.css_timeout[0]);document.getElementById(this.id_viz_uk[1]).classList.remove(this.css_timeout[1]);document.getElementById(this.id_viz_uk[0]).classList.remove(this.css_timeout[3]);document.getElementById(this.id_timeout[0]).style.display="none";document.getElementById(this.id_box_uk).style.display="none";document.getElementById(this.id_box_uk).style.zIndex=1;if(this.opakovat){this.spustit();}},500);uloz.smaz(uloz.klice[17]);},zrusit(){hlidac.minutka=false;this.aktivni=false;this.konecny_cas=null;this.posOFF_odpocet();document.getElementById(this.id_box_uk).style.display="none";text.pis("Minutka byla zrušena");gong.hraj(false);uloz.smaz(uloz.klice[17]);},ozivit(){if(!uloz.ok){return false;}let opakovat_minutku=uloz.nacti(uloz.klice[18]);if(opakovat_minutku=="true"||opakovat_minutku=="false"){const check1=document.getElementById(this.id_check[0]);const check2=document.getElementById(this.id_check[1]);if(opakovat_minutku=="true"){check1.checked=true;check2.checked=true;this.opakovat=true;}else{check1.checked=false;check2.checked=false;this.opakovat=false;}}let interval_minutky=uloz.nacti(uloz.klice[19]);if(interval_minutky!=""){interval_minutky=parseInt(interval_minutky);this.int_zad=interval_minutky;this.int_zad_zmen();}let popisek=uloz.nacti(uloz.klice[16]);if(popisek==""){return false;}else{document.getElementById(this.id_popisek_input).value=popisek;this.popisek=popisek;}let minutka_zapnuta=uloz.nacti(uloz.klice[17]);if(minutka_zapnuta!="true"){return false;}let timeout=uloz.nacti(uloz.klice[15]);timeout=parseInt(timeout);let navic_time=this.max_obnova;const cas_aktual=Date.now();cas_pro_oziveni=timeout+navic_time;if(cas_pro_oziveni<cas_aktual){return false;}else{this.konecny_cas=timeout;}return true;}};pripravenost.minutka=true;
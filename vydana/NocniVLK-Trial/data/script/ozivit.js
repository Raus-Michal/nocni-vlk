﻿var uloz={osoba_kopie:{},z_den:"",cas_T:"",intr:"",ok:null,klice:["osoba","cas_p","obchuz","cas_to","o15","o30","o60","o120","interval","vlk_zas","alarm_v","alarm_zv"],max_obnova_ms:3600000,v_obchuzce:false,TIME:1000};uloz.casovac;uloz.p={pruvodce:null,autorun:null,vlk:null,ochrany:null,kresly:null};uloz.a=function(){if(this.ok==null){var retezec=location.search.slice(1);try{var pole=JSON.parse(retezec);}catch(e){return;}this.ok=pole[1];}};uloz.uloz=function(klic,data){if(this.ok==null){this.a();}if(this.ok!=true){return;}localStorage.removeItem(klic);localStorage.setItem(klic,data);};uloz.nacti=function(klic){if(this.ok==null){this.a();}if(this.ok!=true){return;}var data=localStorage.getItem(klic);if(data==null){data="";}return data;};uloz.smaz=function(klic){if(this.ok==null){this.a();}if(this.ok!=true){return;}localStorage.removeItem(klic);};uloz.osoba=function(){if(this.ok==null){this.a();}if(this.ok!=true){return;}var data=osoba;var konverce=JSON.stringify(data);this.uloz(this.klice[0],konverce);};uloz.s_obch=function(){if(this.ok==null){this.a();}if(this.ok!=true){return;}localStorage.removeItem(this.klice[4]);localStorage.removeItem(this.klice[5]);localStorage.removeItem(this.klice[6]);localStorage.removeItem(this.klice[7]);};uloz.u_obch=function(){if(this.ok==null){this.a();}if(this.ok!=true){return;}var df15=document.getElementById(obch.id_f[0]).value;var df30=document.getElementById(obch.id_f[1]).value;var df60=document.getElementById(obch.id_f[2]).value;var df120=document.getElementById(obch.id_f[3]).value;this.uloz(this.klice[4],df15);this.uloz(this.klice[5],df30);this.uloz(this.klice[6],df60);this.uloz(this.klice[7],df120);};uloz.o_obch=function(){if(this.ok==null){this.a();}if(this.ok!=true){return;}var f15=document.getElementById(obch.id_f[0]);var f30=document.getElementById(obch.id_f[1]);var f60=document.getElementById(obch.id_f[2]);var f120=document.getElementById(obch.id_f[3]);var o15=this.nacti(this.klice[4]);var o30=this.nacti(this.klice[5]);var o60=this.nacti(this.klice[6]);var o120=this.nacti(this.klice[7]);f15.value=o15;f30.value=o30;f60.value=o60;f120.value=o120;};uloz.o_Tout=function(){if(this.ok==null){this.a();}if(this.ok!=true){return;}var cas_T=this.nacti(this.klice[3]);if(cas_T==""){this.cas_T=null;}else{cas_T=parseInt(cas_T);this.cas_T=cas_T;}};uloz.o_osoba=function(){if(this.ok==null){this.a();}if(this.ok!=true){return;}var data_osoba=this.nacti(this.klice[0]);if(data_osoba==""){this.osoba_kopie=""; return;}try{this.osoba_kopie=JSON.parse(data_osoba);}catch(e){this.osoba_kopie="";alert("data Osoby jsou poškozena!");return;}};uloz.o_cas_P=function(){if(this.ok==null){this.a();}if(this.ok!=true){return;}var cas_P=localStorage.getItem(this.klice[1]);if(cas_P==null){this.z_den="";return;}this.z_den=parseInt(cas_P);};uloz.o_v_obchuz=function(){if(this.ok==null){this.a();}if(this.ok!=true){return;}var v_obchuzce=this.nacti(this.klice[2]);if(v_obchuzce=="true"){this.v_obchuzce=true;}else{this.v_obchuzce=false;}};uloz.dead_time=function(){var datum=new Date();var akt_ms=datum.getTime();var interval=this.intr*1000;if(akt_ms<(this.z_den+this.max_obnova_ms+interval)){return true;}else{return false;}};uloz.klonKOPII=function(){osoba=this.osoba_kopie;this.osoba_kopie="";obch.cas_T=this.cas_T;this.cas_T="";obch.z_den=this.z_den;this.z_den="";obch.intr=this.intr;this.intr="";};uloz.o_zvuk=function(){var volba=this.nacti(this.klice[10]);var zesilovani=this.nacti(this.klice[11]);if(volba!=""){volba=parseInt(volba);zvuk.cislo=volba;var typ=zvuk.cislo-1;zvuk.cesta=zvuk.alarm[typ];zvuk.nahraj();}if(zesilovani!=""){if(zesilovani=="true"){zvuk.zesilovat=true;document.getElementById(p_nas.id_nas[9]).checked=true;}else if(zesilovani=="false"){zvuk.zesilovat=false;document.getElementById(p_nas.id_nas[9]).checked=false;}}};uloz.oziv=function(tlacitkem){if(this.ok==null){this.a();}if(this.ok!=true){return;}this.o_zvuk();this.osoba_kopie=Object.create(osoba);this.o_osoba();if(this.osoba_kopie==""){return;}this.o_cas_P();if(this.z_den==""){return;}this.intr=this.nacti(this.klice[8]);if(this.intr==""){return;}else{this.intr=parseInt(this.intr);}var test=this.dead_time();if(!test){return;}this.o_Tout();this.o_v_obchuz();if(!tlacitkem){var byl_vlk_zastaven=this.nacti(this.klice[9]);if(byl_vlk_zastaven=="true"){g_pos.ozivitOn();}else{g_pos.ozivitOn();this.o_obch();dia.on("d-oziv");}}else{this.o_obch();vlk.ozivit();}};uloz.akce=function(){if(this.p.pruvodce==true&&this.p.autorun==true&&this.p.vlk==true&&this.p.ochrany==true&&this.p.kresly==true){clearInterval(this.casovac);if(autorun.lic!=true){return;}g_pos.aktivace();tik.aktivace();hlidac.aktivace();this.oziv();}else{this.casovac=setInterval(this.akce.bind(this), this.TIME);}};uloz.akce();
﻿const uloz={osoba_kopie:{},z_den:"",cas_T:"",intr:"",ok:null,klice:["osoba","cas_p","obchuz","cas_to","o15","o30","o60","o120","interval","vlk_zas","alarm_v","alarm_zv","poznamky"],max_obnova_ms:3600000,v_obchuzce:false,a(){if(this.ok==null){let retezec=location.search.slice(1);let pole="";try{pole=JSON.parse(retezec);}catch(e){return;}this.ok=pole[1];}},uloz(klic,data){if(!uloz.ok){return;}localStorage.removeItem(klic);localStorage.setItem(klic,data);},nacti(klic){if(!uloz.ok){return;}let data=localStorage.getItem(klic);if(data==null){data="";}return data;},smaz(klic){if(!uloz.ok){return;}localStorage.removeItem(klic);},osoba(){if(!uloz.ok){return;}const data=osoba;let konverce=JSON.stringify(data);this.uloz(this.klice[0],konverce);},s_obch(){if(!uloz.ok){return;}localStorage.removeItem(this.klice[4]);localStorage.removeItem(this.klice[5]);localStorage.removeItem(this.klice[6]);localStorage.removeItem(this.klice[7]);},u_obch(){if(!uloz.ok){return;}const [df15,df30,df60,df120]=[document.getElementById(obch.id_f[0]).value,document.getElementById(obch.id_f[1]).value,document.getElementById(obch.id_f[2]).value,document.getElementById(obch.id_f[3]).value];this.uloz(this.klice[4],df15);this.uloz(this.klice[5],df30);this.uloz(this.klice[6],df60);this.uloz(this.klice[7],df120);},o_obch(){if(!uloz.ok){return;}let o15=this.nacti(this.klice[4]);let o30=this.nacti(this.klice[5]);let o60=this.nacti(this.klice[6]);let o120=this.nacti(this.klice[7]);document.getElementById(obch.id_f[0]).value=o15;document.getElementById(obch.id_f[1]).value=o30;document.getElementById(obch.id_f[2]).value=o60;document.getElementById(obch.id_f[3]).value=o120;},o_Tout(){if(!uloz.ok){return;}let cas_T_n=this.nacti(this.klice[3]);if(cas_T_n==""){this.cas_T=null;}else{cas_T_n=parseInt(cas_T_n);this.cas_T=cas_T_n;}},o_osoba(){if(!uloz.ok){return;}let data_osoba=this.nacti(this.klice[0]);if(data_osoba==""){this.osoba_kopie=""; return;}try{this.osoba_kopie=JSON.parse(data_osoba);}catch(e){this.osoba_kopie="";return;}},o_cas_P(){if(!uloz.ok){return;}let cas_P=localStorage.getItem(this.klice[1]);if(cas_P==null){this.z_den="";return;}this.z_den=parseInt(cas_P);},o_v_obchuz(){if(!uloz.ok){return;}let v_obch=this.nacti(this.klice[2]);if(v_obch=="true"){this.v_obchuzce=true;}else{this.v_obchuzce=false;}},dead_time(){let akt_ms=Date.now();let interval=this.intr*1000;if(akt_ms<(this.z_den+this.max_obnova_ms+interval)){return true;}else{return false;}},klonKOPII(){osoba=this.osoba_kopie;this.osoba_kopie="";obch.cas_T=this.cas_T;this.cas_T="";obch.z_den=this.z_den;this.z_den="";obch.intr=this.intr;this.intr="";},o_zvuk(){let volba=this.nacti(this.klice[10]);let zesilovani=this.nacti(this.klice[11]);if(volba!=""){volba=parseInt(volba);zvuk.cislo=volba;}if(zesilovani!=""){if(zesilovani=="true"){zvuk.zesilovat=true;document.getElementById(p_nas.id_nas[3]).checked=true;}else if(zesilovani=="false"){zvuk.zesilovat=false;document.getElementById(p_nas.id_nas[3]).checked=false;}}},o_poznamky(){let poznamky=this.nacti(this.klice[12]);document.getElementById(g_pos.poznamky[0]).value=poznamky;},oziv(tlacitkem){if(!uloz.ok){return;}this.o_zvuk();this.o_poznamky();this.osoba_kopie=Object.create(osoba);this.o_osoba();if(this.osoba_kopie==""){return;}this.o_cas_P();if(this.z_den==""){return;}this.intr=this.nacti(this.klice[8]);if(this.intr==""){return;}else{this.intr=parseInt(this.intr);}const test=this.dead_time();if(!test){return;}this.o_Tout();this.o_v_obchuz();if(!tlacitkem){const byl_vlk_zastaven=this.nacti(this.klice[9]);if(byl_vlk_zastaven=="true"){g_pos.ozivitOn();}else{g_pos.ozivitOn();this.o_obch();dia.on("d-nezastaven");}}else{this.o_obch();vlk.ozivit();}}};pripravenost.ozivit=true;
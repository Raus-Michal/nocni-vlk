﻿const vlk={id_sec:["sec-kruh","sec-odp"],id_but:["pl-ob","max-ob","zastav","t-max-o"],id_z_svg:"zastav-svg",id_t_max_obch:["t-max-o","t-max-o-dia"],id_li:["spu-li","zas-li"],max_obch:false,zapni(){g_pos.ozivitOff();uloz.smaz(uloz.klice[9]);let l1=this.id_sec.length;for(let i=0;i<l1;i++){document.getElementById(this.id_sec[i]).style.display="flex";}document.getElementById(p_nas.id_blok).style.display="flex";this.obch_max();this.posON();document.getElementById(this.id_li[0]).style.display="none";document.getElementById(this.id_li[1]).style.display="block";if(osoba.odloz_start==0){obch.aktivace();}else{text.pis("Start první obchůzky byl&nbsp;odložen");zvuk.hraj(false);kresly.system(obch.id_can);hlidac.odpocet=true;obch.pocitej();}uloz.osoba();uloz.s_obch();uloz.u_obch();},ozivit(){uloz.klonKOPII();g_pos.ozivitOff();uloz.smaz(uloz.klice[9]);let l1=this.id_sec.length;for(let i=0;i<l1;i++){document.getElementById(this.id_sec[i]).style.display="flex";}document.getElementById(p_nas.id_blok).style.display="flex";this.obch_max();this.posON();document.getElementById(this.id_li[0]).style.display="none";document.getElementById(this.id_li[1]).style.display="flex";_int.prepis(osoba.level);pruvodce.box_int();if(uloz.v_obchuzce!=true){zvuk.hraj(false);text.pis("Noční&nbsp;VLK byl&nbsp;oživen");this.ozivit.kresly_system();tik.a_odpocet=true;hlidac.odpocet=true;}else{obch.aktivace();}},obch_max(){let [hodnotic,text]=[0,null];if(osoba.o15==true){hodnotic++;text=15;}if(osoba.o30==true){hodnotic++;text=30;}if(osoba.o60==true){hodnotic++;text=60;}if(osoba.o120==true){hodnotic++;text=120;}if(hodnotic>1){this.max_obch=true;document.getElementById(this.id_but[1]).style.display="block";document.getElementById(this.id_t_max_obch[0]).innerHTML=text;document.getElementById(this.id_t_max_obch[1]).innerHTML=text;}else{this.max_obch=false;document.getElementById(this.id_but[1]).style.display="none";}},posON(){let l1=this.id_but.length;for(let i=0;i<l1;i++){document.getElementById(this.id_but[i]).addEventListener("click",this);}if(this.max_obch!=false||this.max_obch!=true){this.obch_max();}if(this.max_obch==false){document.getElementById(this.id_but[1]).removeEventListener("click",this);}},posOFF(){let l1=this.id_but.length;for(let i=0;i<l1;i++){document.getElementById(this.id_but[i]).removeEventListener("click",this);}},handleEvent(e){const k=e.target.id;klik.hraj(false);if(k==this.id_but[0]){dia.on(dia.id[1]);}else if(k==this.id_but[1]||k==this.id_but[3]){dia.on(dia.id[2]);}else if(k==this.id_but[2]||k==this.id_z_svg){dia.on(dia.id[0]);}}};vlk.ozivit.kresly_system=()=>{let [okruh_puvodni,o15,o30,o60,o120,okruh]=[osoba.okruh,osoba.o15,osoba.o30,osoba.o60,osoba.o120,osoba.okruh];if(okruh==11){if((o15==true&&o30==false&&o60==false&&o120==false)||(o15==false&&o30==true&&o60==false&&o120==false)||(o15==false&&o30==false&&o60==true&&o120==false)||(o15==false&&o30==false&&o60==false&&o120==true)){okruh=11;}else if((o15==true&&o30==true&&o60==false&&o120==false)||(o15==false&&o30==true&&o60==true&&o120==false)||(o15==false&&o30==false&&o60==true&&o120==true)){okruh=22;}else if((o15==true&&o30==true&&o60==true&&o120==false)||(o15==true&&o30==false&&o60==true&&o120==false)||(o15==false&&o30==true&&o60==true&&o120==true)||(o15==false&&o30==true&&o60==false&&o120==true)){okruh=44;}else if((o15==true&&o30==true&&o60==true&&o120==true)||(o15==true&&o30==false&&o60==true&&o120==true)||(o15==true&&o30==true&&o60==false&&o120==true)||(o15==true&&o30==false&&o60==false&&o120==true)){okruh=88;}}else{okruh=okruh-11;if(okruh<11){okruh=11;}}osoba.okruh=okruh;kresly.system(obch.id_can);obch.pl_obch();osoba.okruh=okruh_puvodni;};window.audio =[];window.zalozeno=false;const zvuk={zesilovat:true,cislo:0,alarm:["alarm/alarm1.mp3","alarm/alarm2.mp3","alarm/alarm3.mp3","alarm/alarm4.mp3","alarm/alarm5.mp3","alarm/alarm6.mp3","alarm/klik.mp3"],volume_min:0.05,volume:0.75,bc:"rgb(218,65,103)",bcT:"rgb(137,157,120)",zaloz(){if(window.zalozeno){return;}let delka=this.alarm.length;for(let i=0;i<delka;i++){let audio=new Audio(this.alarm[i]);window.audio.push(audio);}window.zalozeno=true;},hraj(jak){if(!window.zalozeno){this.zaloz();}window.audio[this.cislo].loop=jak;this.volume_min=0.05;if(jak==true){if(this.zesilovat){window.audio[this.cislo].volume=this.volume_min;}else if(!this.zesilovat){window.audio[this.cislo].volume=this.volume;}window.audio[this.cislo].play();}else if(jak==false){window.audio[this.cislo].volume=this.volume;window.audio[this.cislo].play();}},zesiluj(){if(this.zesilovat){window.audio[this.cislo].volume=this.volume_min;if(this.volume<0.5){this.volume_min=this.volume_min+0.02;}else{this.volume_min=this.volume_min+0.03;}if(this.volume_min>=this.volume){this.volume_min=this.volume;}}},zmen(id){let hodnota=parseInt(document.getElementById(id).value);if(hodnota<this.min){hodnota=this.min;}this.volume=hodnota/100;},barvy(){const b=[document.getElementById(p_nas.id_nas[3]),document.getElementById(p_nas.id_nas[4]),document.getElementById(p_nas.id_nas[5]),document.getElementById(p_nas.id_nas[6]),document.getElementById(p_nas.id_nas[7]),document.getElementById(p_nas.id_nas[8])];let l1=b.length;for(let i=0;i<l1;i++){b[i].style.borderColor=this.bc;b[i].style.boxShadow="0px 0px 0px transparent";}b[this.cislo].style.borderColor=this.bcT;b[this.cislo].style.boxShadow=`0px 0px 10px ${this.bcT}`;},volba(cislo){if(this.cislo==cislo){this.hraj(false);return;}this.cislo=cislo;uloz.uloz(uloz.klice[10],this.cislo);this.hraj(false);this.barvy();},zastav(){window.audio[this.cislo].pause();window.audio[this.cislo].currentTime=0;}};const gong=Object.create(zvuk);{gong.cislo=5;gong.zesilovat=false;}const pinkani=Object.create(zvuk);{pinkani.cislo=4;pinkani.zesilovat=true;}const klik=Object.create(zvuk);{klik.cislo=6;klik.zesilovat=false;}const obch={id_can:"can-hl",id_bud_obch:"obch_bud",id_tlapa:"tlapa",id_f:["obch15","obch30","obch60","obch120"],intr:null,id:"obchuzka",id_ob:"ob-t",id_b:["vz1","vz2","p-obch"],id_an:["ss1","ss2","ss3","ss4"],id_odp:["o-min","o-sec1","o-sec2"],id_t_out:["t-out-m","t-out-s1","t-out-s2"],id_t:"ob",z_den:null,cas_T:null,TIME:250,TIME2:750,tlapa(urci){const [kruh,tlapa]=[document.getElementById(this.id_can),document.getElementById(this.id_tlapa)];if(urci=="tlapa"){kruh.style.opacity=0;tlapa.style.opacity=1;}else if(urci=="kruh"){kruh.style.opacity=1;tlapa.style.opacity=0;}},zaz_casTO(zbyle_s){let c_T=Date.now();let z_s=0;if(zbyle_s){z_s=parseInt(zbyle_s);c_T=c_T+(z_s*1000);}this.cas_T=c_T;uloz.uloz(uloz.klice[3],this.cas_T);},zaz_casTO_vycisti(){this.cas_T=null;uloz.smaz(uloz.klice[3]);},pocitej_T_OUT(){let cas_a=Date.now();let rozdil=parseInt(this.cas_T/1000)-parseInt(cas_a/1000);let sT=rozdil*(-1);let sekundy=sT%60;let minuty=(sT-sekundy)/60;if(sekundy<10){sekundy=`0${sekundy}`;}sekundy=sekundy.toString();let s1=sekundy[0];let s2=sekundy[1];document.getElementById(this.id_t_out[0]).innerText=minuty;document.getElementById(this.id_t_out[1]).innerText=s1;document.getElementById(this.id_t_out[2]).innerText=s2;},zaz_cas(){this.z_den=Date.now();uloz.uloz(uloz.klice[1],this.z_den);},interval(){if(osoba.o15==true){this.intr=osoba.i15;}else if(osoba.o30==true){this.intr=osoba.i30;}else if(osoba.o60==true){this.intr=osoba.i60;}else if(osoba.o120==true){this.intr=osoba.i120;}uloz.uloz(uloz.klice[8],this.intr);},display_odp(zbyle_s){if(zbyle_s<0){zbyle_s=0;}let sekundy=zbyle_s%60;const minuty=(zbyle_s-sekundy)/60;if(sekundy<10){sekundy=`0${sekundy}`;}sekundy=sekundy.toString();const s1=sekundy[0];const s2=sekundy[1];document.getElementById(this.id_odp[0]).innerText=minuty;document.getElementById(this.id_odp[1]).innerText=s1;document.getElementById(this.id_odp[2]).innerText=s2;},pocitej(){this.zaz_cas();this.interval();tik.a_odpocet=true;hlidac.odpocet=true;},odpocet(){let c_a=Date.now();let c_aS=parseInt(c_a/1000);let c_zS=parseInt(this.z_den/1000);let rozdil=c_aS-c_zS;let zbyle_s=0;if(osoba.odloz_start==0){zbyle_s=this.intr-rozdil;}else{zbyle_s=(osoba.odloz_start*60)-rozdil;}this.display_odp(zbyle_s);if(zbyle_s<=0){this.aktivace(zbyle_s);}poloha.kontrola(zbyle_s);},handleEvent(e){const k=e.target.id;if(k==this.id_b[0]||k==this.id_b[1]){zvuk.zastav();f_video.zvuk("zesilit");hlidac.odpocet=true;document.getElementById(this.id_b[2]).focus();}else if(k==this.id_b[2]){zamek.blok();window.onbeforeunload=()=>{return "Chcete zavřít aplikaci Noční VLK?";};this.DEaktivace();this.pocitej();}},posON(){let l1=this.id_b.length;for(let i=0;i<l1;i++){document.getElementById(this.id_b[i]).addEventListener("click",this);}},posOFF(){let l1=this.id_b.length;for(let i=0;i<l1;i++){document.getElementById(this.id_b[i]).removeEventListener("click",this);}},rozdelovac(){const [o15,o30,o60,o120,o]=[osoba.o15,osoba.o30,osoba.o60,osoba.o120,osoba.okruh];let t=null;let b=null;if((o15==true&&o30==false&&o60==false&&o120==false)||(o15==false&&o30==true&&o60==false&&o120==false)||(o15==false&&o30==false&&o60==true&&o120==false)||(o15==false&&o30==false&&o60==false&&o120==true)){if(o15==true){t=b=15;}else if(o30==true){t=b=30;}else if(o60==true){t=b=60;}else if(o120==true){t=b=120;}}else if((o15==true&&o30==true&&o60==false&&o120==false)||(o15==false&&o30==true&&o60==true&&o120==false)||(o15==false&&o30==false&&o60==true&&o120==true)){if(o15==true&&o30==true&&o60==false&&o120==false){if(o==11){t=30;b=15;}else if(o==22){t=15;b=30;}}else if(o15==false&&o30==true&&o60==true&&o120==false){if(o==11){t=60;b=30;}else if(o==22){t=30;b=60;}}else if(o15==false&&o30==false&&o60==true&&o120==true){if(o==11){t=120;b=60;}else if(o==22){t=60;b=120;}}}else if((o15==true&&o30==true&&o60==true&&o120==false)||(o15==true&&o30==false&&o60==true&&o120==false)||(o15==false&&o30==true&&o60==true&&o120==true)||(o15==false&&o30==true&&o60==false&&o120==true)){if(o15==true&&o30==true&&o60==true&&o120==false){if(o==11){t=60;b=15;}else if(o==22){t=15;b=30;}else if(o==33){t=30;b=15;}else if(o==44){t=15;b=60;}}else if(o15==true&&o30==false&&o60==true&&o120==false){if(o==11){t=60;b=15;}else if(o==22){t=15;b=15;}else if(o==33){t=15;b=15;}else if(o==44){t=15;b=60;}}else if(o15==false&&o30==true&&o60==true&&o120==true){if(o==11){t=120;b=30;}else if(o==22){t=30;b=60;}else if(o==33){t=60;b=30;}else if(o==44){t=30;b=120;}}else if(o15==false&&o30==true&&o60==false&&o120==true){if(o==11){t=120;b=30;}else if(o==22){t=30;b=30;}else if(o==33){t=30;b=30;}else if(o==44){t=30;b=120;}}}else if((o15==true&&o30==true&&o60==true&&o120==true)||(o15==true&&o30==false&&o60==true&&o120==true)||(o15==true&&o30==true&&o60==false&&o120==true)||(o15==true&&o30==false&&o60==false&&o120==true)){if(o15==true&&o30==true&&o60==true&&o120==true){if(o==11){t=120;b=15;}else if(o==22){t=15;b=30;}else if(o==33){t=30;b=15;}else if(o==44){t=15;b=60;}else if(o==55){t=60;b=15;}else if(o==66){t=15;b=30;}else if(o==77){t=30;b=15;}else if(o==88){t=15;b=120;}}else if(o15==true&&o30==false&&o60==true&&o120==true){if(o==11){t=120;b=15;}else if(o==22){t=15;b=15;}else if(o==33){t=15;b=15;}else if(o==44){t=15;b=60;}else if(o==55){t=60;b=15;}else if(o==66){t=15;b=15;}else if(o==77){t=15;b=15;}else if(o==88){t=15;b=120;}}else if(o15==true&&o30==true&&o60==false&&o120==true){if(o==11){t=120;b=15;}else if(o==22){t=15;b=30;}else if(o==33){t=30;b=15;}else if(o==44){t=15;b=30;}else if(o==55){t=30;b=15;}else if(o==66){t=15;b=30;}else if(o==77){t=30;b=15;}else if(o==88){t=15;b=120;}}else if(o15==true&&o30==false&&o60==false&&o120==true){if(o==11){t=120;b=15;}else if(o==22){t=15;b=15;}else if(o==33){t=15;b=15;}else if(o==44){t=15;b=15;}else if(o==55){t=15;b=15;}else if(o==66){t=15;b=15;}else if(o==77){t=15;b=15;}else if(o==88){t=15;b=120;}}}return [t,b];},text(){const t=this.rozdelovac()[0];const obj=document.getElementById(this.id_t);obj.innerText=t;},pl_obch(){const text=this.rozdelovac()[1];document.getElementById(this.id_bud_obch).innerText=text;},zapis(){const t=this.rozdelovac()[0];const [o15,o30,o60]=[osoba.o15,osoba.o30,osoba.o60];let [z15,z30,z60,z120]=[false,false,false,false];const [f15,f30,f60,f120]=[document.getElementById(this.id_f[0]),document.getElementById(this.id_f[1]),document.getElementById(this.id_f[2]),document.getElementById(this.id_f[3])];let cas_aktual=hodiny.cas();let h=parseInt(cas_aktual[0]);let m=parseInt(cas_aktual[1]);let s=parseInt(cas_aktual[2]);if(s>45){m++;if(m==60){m=0;h++;if(h==24){h=0;}}}if(m<10){m=m.toString();m=`0${m}`;}else{m=m.toString();}h=h.toString();const t_c=`${h}:${m}`;const z=`${t_c}, `;if(t==15){z15=true;}else if(t==30&&o15==true){z15=true;z30=true;}else if(t==30&&o15==false){z30=true;}else if(t==60&&o15==false&&o30==false){z60=true;}else if(t==60&&o15==true&&o30==false){z60=true;z15=true;}else if(t==60&&o15==false&&o30==true){z60=true;z30=true;}else if(t==60&&o15==true&&o30==true){z60=true;z30=true;z15=true;}else if(t==120&&o15==false&&o30==false&&o60==false){z120=true;}else if(t==120&&o15==true&&o30==false&&o60==false){z120=true;z15=true;}else if(t==120&&o15==false&&o30==true&&o60==false){z120=true;z30=true;}else if(t==120&&o15==false&&o30==false&&o60==true){z120=true;z60=true;}else if(t==120&&o15==true&&o30==true&&o60==false){z120=true;z30=true;z15=true;}else if(t==120&&o15==false&&o30==true&&o60==true){z120=true;z60=true;z30=true;}else if(t==120&&o15==true&&o30==false&&o60==true){z120=true;z60=true;z15=true;}else if(t==120&&o15==true&&o30==true&&o60==true){z15=true;z30=true;z60=true;z120=true;}if(z15==true){f15.value=f15.value+z;let o15old=uloz.nacti(uloz.klice[4]);let o15new=o15old+z;uloz.uloz(uloz.klice[4],o15new);}if(z30==true){f30.value=f30.value+z;let o30old=uloz.nacti(uloz.klice[5]);let o30new=o30old+z;uloz.uloz(uloz.klice[5],o30new);}if(z60==true){f60.value=f60.value+z;let o60old=uloz.nacti(uloz.klice[6]);let o60new=o60old+z;uloz.uloz(uloz.klice[6],o60new);}if(z120==true){f120.value=f120.value+z;let o120old=uloz.nacti(uloz.klice[7]);let o120new=o120old+z;uloz.uloz(uloz.klice[7],o120new);}},aktivace(zbyle_s){f_video.zvuk("ztlumit");zvuk.hraj(true);tik.a_odpocet=false;hlidac.odpocet=false;if(uloz.v_obchuzce==false){this.zaz_casTO(zbyle_s);}tik.a_obchuzka=true;uloz.v_obchuzce=true;uloz.uloz(uloz.klice[2],true);dia.vyp_akt();this.tlapa("tlapa");this.text();v_port.handleEvent();if(osoba.odloz_start!=0){osoba.odloz_start=0;uloz.osoba();}document.getElementById(this.id_odp[0]).innerText="0";document.getElementById(this.id_odp[1]).innerText="0";document.getElementById(this.id_odp[2]).innerText="0";document.getElementById(this.id_bud_obch).innerText="??";document.getElementById(this.id).style.display="block";setTimeout(this.zp.bind(this),this.TIME);setTimeout(this.foc.bind(this),this.TIME2);let l1=this.id_an.length;for(let i=0;i<l1;i++){document.getElementById(this.id_an[i]).style.animationPlayState="running";}this.posON();},DEaktivace(){zvuk.zastav();f_video.zvuk("zesilit");uzamceni.jednou();this.posOFF();tik.a_obchuzka=false;this.zaz_casTO_vycisti();uloz.uloz(uloz.klice[2],false);uloz.v_obchuzce=false;this.tlapa("kruh");let l1=this.id_an.length;for(let i=0;i<l1;i++){document.getElementById(this.id_an[i]).style.animationPlayState="paused";}document.getElementById(this.id).style.opacity=0;setTimeout(this.non.bind(this),this.TIME);poloha.reset();kresly.system(this.id_can);this.zapis();this.pl_obch();pruvodce.o_posun();uloz.osoba();},zp(){document.getElementById(this.id).style.opacity=1;document.getElementById(this.id_b[1]).focus();},foc(){document.getElementById(this.id_ob).scrollIntoView({block:"center",behavior:"smooth"});},non(){document.getElementById(this.id).style.display="none";}};pripravenost.vlk=true;
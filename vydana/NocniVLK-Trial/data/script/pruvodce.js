﻿const posun={id_okna:"spust",typ:"flex",id_nadpis:"n",TIME1:100,TIME2:150,TIME3:250,TIME4:500,okna(stare,nove){const zavrit=this.id_okna+stare;const otevrit=this.id_okna+nove;const kotva=this.id_nadpis+nove;document.getElementById(zavrit).style.zIndex=-1;document.getElementById(zavrit).style.opacity=0;document.getElementById(zavrit).style.display="none";hl_kon.otevrene_okno=otevrit;setTimeout(()=>{document.getElementById(otevrit).style.display=this.typ;},this.TIME1);setTimeout(()=>{document.getElementById(otevrit).style.opacity=1;document.getElementById(otevrit).style.zIndex=2;document.getElementById(kotva).scrollIntoView({behavior:"smooth"});},this.TIME2);if(minutka.aktivni){document.getElementById(minutka.id_box_uk).style.display="none";setTimeout(()=>{document.getElementById(minutka.id_box_uk).style.display=minutka.display;},this.TIME4);}}};let osoba={o15:false,o30:false,o60:false,o120:false,i15:810,i30:1620,i60:3240,i120:6480,okruh:11,odloz_start:0,level:3};const _int={id_in:["i-15","i-30","i-60","i-120"],id_in_r:["i-15r","i-30r","i-60r","i-120r"],id_r:["ir-15","ir-30","ir-60","ir-120"],id_r_r:["ir-15r","ir-30r","ir-60r","ir-120r"],id_lev:["i-l","i-l-r"],do15:[750,780,810,825,840,855,870],do15T:["12&#8239;min 30&#8239;s","13&#8239;min","13&#8239;min 30&#8239;s","13&#8239;min 45&#8239;s","14&#8239;min","14&#8239;min 15&#8239;s","14&#8239;min 30&#8239;s"],do15R:["2&#8239;min 30&#8239;s","2&#8239;min","1&#8239;min 30&#8239;s","1&#8239;min 15&#8239;s","1&#8239;min","0&#8239;min 45&#8239;s","0&#8239;min 30&#8239;s"],do30:[1500,1560,1620,1650,1680,1710,1740],do30T:["25&#8239;min","26&#8239;min","27&#8239;min","27&#8239;min 30&#8239;s","28&#8239;min","28&#8239;min 30&#8239;s","29&#8239;min"],do30R:["5&#8239;min","4&#8239;min","3&#8239;min","2&#8239;min 30&#8239;s","2&#8239;min","1&#8239;min 30&#8239;s","1&#8239;min"],do60:[3000,3120,3240,3300,3360,3420,3480],do60T:["50&#8239;min","52&#8239;min","54&#8239;min","55&#8239;min","56&#8239;min","57&#8239;min","58&#8239;min"],do60R:["10&#8239;min","8&#8239;min","6&#8239;min","5&#8239;min","4&#8239;min","3&#8239;min","2&#8239;min"],do120:[6000,6240,6480,6600,6720,6840,6960],do120T:["100&#8239;min","104&#8239;min","108&#8239;min","110&#8239;min","112&#8239;min","114&#8239;min","116&#8239;min"],do120R:["20&#8239;min","16&#8239;min","12&#8239;min","10&#8239;min","8&#8239;min","6&#8239;min","4&#8239;min"],prepis(level){document.getElementById(this.id_lev[0]).innerText=level;document.getElementById(this.id_lev[1]).innerText=level;document.getElementById(p_nas.id_level).innerText=level;--level;const o=[this.do15T[level],this.do30T[level],this.do60T[level],this.do120T[level]];const oR=[this.do15R[level],this.do30R[level],this.do60R[level],this.do120R[level]];let l1=o.length;for(let i=0;i<l1;i++){document.getElementById(this.id_in[i]).innerHTML=o[i];document.getElementById(this.id_in_r[i]).innerHTML=o[i];document.getElementById(p_nas.id_in[i]).innerHTML=o[i];}let l2=oR.length;for(let i=0;i<l2;i++){document.getElementById(this.id_r[i]).innerHTML=oR[i];document.getElementById(this.id_r_r[i]).innerHTML=oR[i];document.getElementById(p_nas.id_in_r[i]).innerHTML=oR[i];}osoba.i15=this.do15[level];osoba.i30=this.do30[level];osoba.i60=this.do60[level];osoba.i120=this.do120[level];}};const pruvodce={id_okno:["spust1","spust2","spust3","spust4","spust5"],tl_kriz:["k1","k2","k3","k4","k5"],svg_kriz:["s-k1","s-k2","s-k3","s-k4","s-k5"],tl_dal:["dal1","dal2","dal3","dal4","spustVLK"],tl_zpet:["zpet1","zpet2","zpet3","zpet4"],id_terc:["kr15","kr30","kr60","kr120"],id_obch:["o15a","o15b","o30a","o30b","o60a","o60b","o120a","o120b"],class_an:"krAN",int_id:["int-15","int-30","int-60","int-120"],int_id_r:["int-15r","int-30r","int-60r","int-120r"],id_ter:["kr15","kr30","kr60","kr120"],id_ter_r:["o15_r","o30_r","o60_r","o120_r"],intBUTid:["in-plus1","in-plus2","in-minus1","in-minus2"],volba:null,id_but_z:"but-zme",id_can_v:"can-v-o",id_can_r:"can-rek",id_odl:[["o10P",10],["o10M",-10],["o1P",1],["o1M",-1]],id_odl_u:["o-start","o-start-r"],a(){v_port.pruvodce=true;v_port.handleEvent();hl_kon.zavri("spust1","flex","n1");this.trep();this.terc_barvy();this.box_int();this.enab_tl();this.v_ochuz();this.posluchaceOn();window.onbeforeunload=()=>{return "Chcete zavřít aplikaci Noční VLK?";};},posluchaceOn(){let l1=this.tl_kriz.length;for(let i=0;i<l1;i++){document.getElementById(this.tl_kriz[i]).addEventListener("click",this);}let l2=this.tl_dal.length;for(let i=0;i<l2;i++){document.getElementById(this.tl_dal[i]).addEventListener("click",this);}let l3=this.tl_zpet.length;for(let i=0;i<l3;i++){document.getElementById(this.tl_zpet[i]).addEventListener("click",this);}let l4=this.id_terc.length;for(let i=0;i<l4;i++){document.getElementById(this.id_terc[i]).addEventListener("click",this);}document.getElementById(this.intBUTid[0]).addEventListener("click",this);document.getElementById(this.intBUTid[2]).addEventListener("click",this);document.getElementById(this.id_but_z).addEventListener("click",this);let l5=this.id_odl.length;for(let i=0;i<l5;i++){document.getElementById(this.id_odl[i][0]).addEventListener("click",this);}},posluchaceOff(){let l1=this.tl_kriz.length;for(let i=0;i<l1;i++){document.getElementById(this.tl_kriz[i]).removeEventListener("click",this);}let l2=this.tl_dal.length;for(let i=0;i<l2;i++){document.getElementById(this.tl_dal[i]).removeEventListener("click",this);}let l3=this.tl_zpet.length;for(let i=0;i<l3;i++){document.getElementById(this.tl_zpet[i]).removeEventListener("click",this);}let l4=this.id_terc.length;for(let i=0;i<l4;i++){document.getElementById(this.id_terc[i]).removeEventListener("click",this);}document.getElementById(this.intBUTid[0]).removeEventListener("click",this);document.getElementById(this.intBUTid[2]).removeEventListener("click",this);document.getElementById(this.id_but_z).removeEventListener("click",this);let l5=this.id_odl.length;for(let i=0;i<l5;i++){document.getElementById(this.id_odl[i][0]).removeEventListener("click",this);}},handleEvent(e){const k=e.target.id;switch(k){case this.tl_dal[0]:window.hlidac.aktivace();zvuk.zaloz();posun.okna(1,2);pruvodce.odloz(0);klik.hraj(false);break;case this.tl_dal[1]:window.onbeforeunload=()=>{return "Chcete zavřít aplikaci Noční VLK?";};klik.hraj(false);if(this.volba){posun.okna(2,3);kresly.system(this.id_can_v);}else{posun.okna(2,4);}break;case this.tl_dal[2]:klik.hraj(false);posun.okna(3,4);break;case this.tl_dal[3]:klik.hraj(false);posun.okna(4,5);kresly.system(this.id_can_r);break;case this.tl_dal[4]:zamek.blok();hl_kon.otevri(this.id_okno[4]);v_port.pruvodce=false;vlk.zapni();break;case this.tl_zpet[0]:klik.hraj(false);posun.okna(2,1);break;case this.tl_zpet[1]:klik.hraj(false);posun.okna(3,2);break;case this.tl_zpet[2]:klik.hraj(false);if(this.volba){posun.okna(4,3);}else{posun.okna(4,2);}break;case this.tl_zpet[3]:klik.hraj(false);posun.okna(5,4);break;}if(k==this.tl_kriz[0]||k==this.svg_kriz[0]||k==this.tl_kriz[1]||k==this.svg_kriz[1]||k==this.tl_kriz[2]||k==this.svg_kriz[2]||k==this.tl_kriz[3]||k==this.svg_kriz[3]||k==this.tl_kriz[4]||k==this.svg_kriz[4]){this.kriz();}if(k==this.id_terc[0]||k==this.id_obch[0]||k==this.id_obch[1]){this.obch(15);}else if(k==this.id_terc[1]||k==this.id_obch[2]||k==this.id_obch[3]){this.obch(30);}else if(k==this.id_terc[2]||k==this.id_obch[4]||k==this.id_obch[5]){this.obch(60);}else if(k==this.id_terc[3]||k==this.id_obch[6]||k==this.id_obch[7]){this.obch(120);}if(k==this.intBUTid[0]||k==this.intBUTid[1]){klik.hraj(false);this.inter("plus");}else if(k==this.intBUTid[2]||k==this.intBUTid[3]){klik.hraj(false);this.inter("minus");}if(k==this.id_but_z){klik.hraj(false);this.o_posun();kresly.system(this.id_can_v);kresly.system(this.id_can_r);}switch(k){case this.id_odl[0][0]:this.odloz(this.id_odl[0][1]);break;case this.id_odl[1][0]:this.odloz(this.id_odl[1][1]);break;case this.id_odl[2][0]:this.odloz(this.id_odl[2][1]);break;case this.id_odl[3][0]:this.odloz(this.id_odl[3][1]);break;}},odloz(hodnota){let odl=osoba.odloz_start;odl=odl+hodnota;if(odl<=0){odl=0;document.getElementById(this.id_odl[1][0]).style.opacity="0.5";document.getElementById(this.id_odl[3][0]).style.opacity="0.5";}else if(odl>=120){odl=120;document.getElementById(this.id_odl[0][0]).style.opacity="0.5";document.getElementById(this.id_odl[2][0]).style.opacity="0.5";}else{klik.hraj(false);let l1=this.id_odl.length;for(let i=0;i<l1;i++){document.getElementById(this.id_odl[i][0]).style.opacity="1";}}osoba.odloz_start=odl;document.getElementById(this.id_odl_u[0]).innerText=odl;document.getElementById(this.id_odl_u[1]).innerText=odl;},o_posun(){const [o15,o30,o60,o120]=[osoba.o15,osoba.o30,osoba.o60,osoba.o120];let max=null;let okr=osoba.okruh;if((o15==true&&o30==false&&o60==false&&o120==false)||(o15==false&&o30==true&&o60==false&&o120==false)||(o15==false&&o30==false&&o60==true&&o120==false)||(o15==false&&o30==false&&o60==false&&o120==true)){max=11;}else if((o15==true&&o30==true&&o60==false&&o120==false)||(o15==false&&o30==true&&o60==true&&o120==false)||(o15==false&&o30==false&&o60==true&&o120==true)){max=22;}else if((o15==true&&o30==true&&o60==true&&o120==false)||(o15==true&&o30==false&&o60==true&&o120==false)||(o15==false&&o30==true&&o60==true&&o120==true)||(o15==false&&o30==true&&o60==false&&o120==true)){max=44;}else if((o15==true&&o30==true&&o60==true&&o120==true)||(o15==true&&o30==false&&o60==true&&o120==true)||(o15==true&&o30==true&&o60==false&&o120==true)||(o15==true&&o30==false&&o60==false&&o120==true)){max=88;}okr=okr+11;if(okr>max){okr=11;}osoba.okruh=okr;},inter(metoda){let level=osoba.level;if(metoda){if(metoda=="plus"){level++;if(level>7){level=7;}}else if(metoda=="minus"){level--;if(level<1){level=1;}}osoba.level=level;}this.buttFULL();_int.prepis(level);},buttFULL(){const level=osoba.level;if(level==1){document.getElementById(this.intBUTid[2]).style.opacity=0.5;document.getElementById(p_nas.id_nas[2]).style.opacity=0.5;}else if(level==7){document.getElementById(this.intBUTid[0]).style.opacity=0.5;document.getElementById(p_nas.id_nas[1]).style.opacity=0.5;}else{document.getElementById(this.intBUTid[0]).style.opacity=1;document.getElementById(this.intBUTid[2]).style.opacity=1;document.getElementById(p_nas.id_nas[2]).style.opacity=1;document.getElementById(p_nas.id_nas[1]).style.opacity=1;}},obch(ktera){let [o15,o30,o60,o120]=[osoba.o15,osoba.o30,osoba.o60,osoba.o120];let terc="";klik.hraj(false);if(ktera==15){if(o15==false){o15=true;}else if(o15==true){o15=false;}terc=this.id_ter[0];}else if(ktera==30){if(o30==false){o30=true;}else if(o30==true){o30=false;}terc=this.id_ter[1];}else if(ktera==60){if(o60==false){o60=true;}else if(o60==true){o60=false;}terc=this.id_ter[2];}else if(ktera==120){if(o120==false){o120=true;}else if(o120==true){o120=false;}terc=this.id_ter[3];}osoba.o15=o15;osoba.o30=o30;osoba.o60=o60;osoba.o120=o120;osoba.okruh=11;this.trep();this.terc_barvy();this.box_int();this.enab_tl();this.v_ochuz();},trep(){const obch=[osoba.o15,osoba.o30,osoba.o60,osoba.o120];for(let i=0;i<obch.length;i++){if(obch[i]){document.getElementById(this.id_ter[i]).classList.add(this.class_an);document.getElementById(this.id_ter[i]).style.animationPlayState="running";}else{document.getElementById(this.id_ter[i]).classList.remove(this.class_an);}}},v_ochuz(){const [o15,o30,o60,o120]=[osoba.o15,osoba.o30,osoba.o60,osoba.o120];let h=0;if(o15==true){h++;}if(o30==true){h++;}if(o60==true){h++;}if(o120==true){h++;}if(h>1){this.volba=true;}else{this.volba=false;}},enab_tl(){const [o15,o30,o60,o120]=[osoba.o15,osoba.o30,osoba.o60,osoba.o120];if(o15==true||o30==true||o60==true||o120==true){document.getElementById(this.tl_dal[0]).disabled=false;document.getElementById(this.tl_dal[0]).title="Dále";}else{document.getElementById(this.tl_dal[0]).disabled=true;document.getElementById(this.tl_dal[0]).title="Označte obchůzky";}},box_int(){const [o15,o30,o60,o120]=[osoba.o15,osoba.o30,osoba.o60,osoba.o120];let h=[];if(o15==true){h.push([0,"block"]);}else{h.push([0,"none"]);}if(o30==true){h.push([1,"block"]);}else{h.push([1,"none"]);}if(o60==true){h.push([2,"block"]);}else{h.push([2,"none"]);}if(o120==true){h.push([3,"block"]);}else{h.push([3,"none"]);}let l1=h.length;for(let i=0;i<l1;i++){document.getElementById(this.int_id[h[i][0]]).style.display=h[i][1];document.getElementById(this.int_id_r[h[i][0]]).style.display=h[i][1];document.getElementById(this.id_ter_r[h[i][0]]).style.display=h[i][1];document.getElementById(p_nas.id_cast[h[i][0]]).style.display=h[i][1];}},terc_barvy(){const [z,c]=["rgb(137,157,120)","rgb(218,65,103)"];const [o15,o30,o60,o120]=[osoba.o15,osoba.o30,osoba.o60,osoba.o120];const t15=[document.getElementById(this.id_ter[0]),document.getElementById(this.id_ter_r[0])];const t30=[document.getElementById(this.id_ter[1]),document.getElementById(this.id_ter_r[1])];const t60=[document.getElementById(this.id_ter[2]),document.getElementById(this.id_ter_r[2])];const t120=[document.getElementById(this.id_ter[3]),document.getElementById(this.id_ter_r[3])];if(o15==true){t15[0].style.borderColor=z;t15[1].style.borderColor=z;t15[0].style.boxShadow=`0px 0px 10px ${z}`;t15[1].style.boxShadow=`0px 0px 10px ${z}`;}else{t15[0].style.borderColor=c;t15[1].style.borderColor=c;t15[0].style.boxShadow="0px 0px 0px transparent";t15[1].style.boxShadow="0px 0px 0px transparent";}if(o30==true){t30[0].style.borderColor=z;t30[1].style.borderColor=z;t30[0].style.boxShadow=`0px 0px 10px ${z}`;t30[1].style.boxShadow=`0px 0px 10px ${z}`;}else{t30[0].style.borderColor=c;t30[1].style.borderColor=c;t30[0].style.boxShadow="0px 0px 0px transparent";t30[1].style.boxShadow="0px 0px 0px transparent";}if(o60==true){t60[0].style.borderColor=z;t60[1].style.borderColor=z;t60[0].style.boxShadow=`0px 0px 10px ${z}`;t60[1].style.boxShadow=`0px 0px 10px ${z}`;}else{t60[0].style.borderColor=c;t60[1].style.borderColor=c;t60[0].style.boxShadow="0px 0px 0px transparent";t60[1].style.boxShadow="0px 0px 0px transparent";}if(o120==true){t120[0].style.borderColor=z;t120[1].style.borderColor=z;t120[0].style.boxShadow=`0px 0px 10px ${z}`;t120[1].style.boxShadow=`0px 0px 10px ${z}`;}else{t120[0].style.borderColor=c;t120[1].style.borderColor=c;t120[0].style.boxShadow="0px 0px 0px transparent";t120[1].style.boxShadow="0px 0px 0px transparent";}},kriz(){klik.hraj(false);let l1=this.id_okno.length;for(let i=0;i<l1;i++){if(document.getElementById(this.id_okno[i]).style.display=="flex"){let cislo=i+1;let id=`spust${cislo}`;hl_kon.otevri(id);this.posluchaceOff();v_port.pruvodce=false;hlidac.DEaktivace();kresly.obr=null;kresly.obr_nacten=false;}}}};const zpet={a1(){posun.okna(2,1);},a2(){posun.okna(3,2);},a3(){posun.okna(4,3);},a4(){posun.okna(5,4);}};const dalsi={a1(){posun.okna(1,2);},a2(){posun.okna(2,3);},a3(){posun.okna(3,4);},a4(){posun.okna(4,5);}};pripravenost.pruvodce=true;
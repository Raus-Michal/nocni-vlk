﻿window.tik={cas:500,a_obchuzka:false,a_odpocet:false,a_uspano:false,class_h:"uhr-h",tak(){hodiny.tik();if(this.a_obchuzka){hodinyO.tik();zvuk.zesiluj();obch.pocitej_T_OUT();}if(this.a_odpocet){obch.odpocet();}if(this.a_uspano){pinkani.zesiluj();}},aktivace(){const h=document.getElementById(hodiny.id[0]);h.style.animationPlayState="paused";h.className=this.class_h;setInterval(this.tak.bind(this),this.cas);}};const hodiny={id:["hod","sec1","sec2"],cas(){const c=new Date();let hod=c.getHours();let min=c.getMinutes();let sec=c.getSeconds();if(min<10){min=`0${min}`;}if(sec<10){sec=`0${sec}`;}return [hod,min,sec];},tik(){let h=this.cas();let h_c=`${h[0]}:${h[1]}`;let s=h[2].toString();let s1=s[0];let s2=s[1];document.getElementById(this.id[0]).innerText=h_c;document.getElementById(this.id[1]).innerText=s1;document.getElementById(this.id[2]).innerText=s2;}};const hodinyO=Object.create(hodiny);{hodinyO.id=["o-h","o-s1","o-s2"];}const mail={id_butt:"zob-em",id_inp:"inp-em", m:["..z.","xm@","@a",".c","ri","iu","mls","z","rt","sqhc","eaw"],posluchac(){document.getElementById(this.id_butt).addEventListener("click",this);},handleEvent(){let x=this.m;let k=x[4][0]+x[2][1]+x[5][1]+x[9][0]+x[0][0]+x[6][0]+x[4][1]+x[9][3]+x[9][2]+x[10][1]+x[6][1]+x[1][2]+x[10][0]+x[6][0]+x[2][1]+x[4][1]+x[6][1]+x[0][1]+x[9][3]+x[0][2];const inp=document.getElementById(this.id_inp);const t=document.getElementById(this.id_butt);inp.value=k;t.removeEventListener("click",this);t.disabled=true;t.title="Již není možné použít - email zobrazen";}};const dia={aktivni:"",id:["d-zas","d-obch","d-obchM","d-uspan","d-neni","d-oziv","d-kon"],zas:["b-z-a","k-d-zas","b-z-n"],obch:["b-obch-a","k-d-obch","b-obch-n"],obchM:["b-obchM-a","k-d-obchM","b-obchM-n"],usp:["k-usp","b-usp-ok"],neni:["k-neni","b-neni-ok"],oziv:["b-oziv-ok"],kont:"but-kon",handleEvent(e){const k=e.target.id;if(k==this.zas[0]){let l1=vlk.id_sec.length;for(let i=0;i<l1;i++){document.getElementById(vlk.id_sec[i]).style.display="none";}document.getElementById(p_nas.id_blok).style.display="none";document.getElementById(vlk.id_li[0]).style.display="block";document.getElementById(vlk.id_li[1]).style.display="none";tik.a_odpocet=false;hlidac.odpocet=false;hlidac.DEaktivace();uloz.uloz(uloz.klice[9],true);dia.off(this.id[0]);text.pis("Noční&nbsp;VLK byl zastaven");gong.hraj(false);poloha.reset();if(uloz.ok){g_pos.ozivitOn();}kresly.obr=null;kresly.obr_nacten=false;}else if(k==this.zas[1]||k==this.zas[2]){dia.off(this.id[0]);}if(k==this.obch[0]){dia.off(this.id[1]);if(osoba.odloz_start!=0){osoba.odloz_start=0;uloz.osoba();}obch.aktivace();}else if(k==this.obch[1]||k==this.obch[2]){dia.off(this.id[1]);}if(k==this.obchM[0]){dia.off(this.id[2]);if(osoba.odloz_start!=0){osoba.odloz_start=0;}osoba.okruh=11;uloz.osoba();obch.aktivace();}else if(k==this.obchM[1]||k==this.obchM[2]){dia.off(this.id[2]);}if(k==this.usp[0]||k==this.usp[1]){hlidac.aktivace();zamek.blok();uzamceni.jednou();dia.off(this.id[3]);}if(k==this.neni[0]||k==this.neni[1]){dia.off(this.id[4]);}if(k==this.oziv[0]){zamek.blok();window.onbeforeunload=()=>{return 'Chcete zavřít aplikaci Noční VLK?';};vlk.ozivit();hlidac.aktivace();zvuk.zaloz();dia.off(this.id[5]);}if(k==this.kont){dia.off(this.id[6]);}},posON(id){if(id==this.id[0]){let l1=this.zas.length;for(let i=0;i<l1;i++){document.getElementById(this.zas[i]).addEventListener("click",this);}}if(id==this.id[1]){let l2=this.obch.length;for(let i=0;i<l2;i++){document.getElementById(this.obch[i]).addEventListener("click",this);}}if(id==this.id[2]){let l3=this.obchM.length;for(let i=0;i<l3;i++){document.getElementById(this.obchM[i]).addEventListener("click",this);}}if(id==this.id[3]){let l4=this.usp.length;for(let i=0;i<l4;i++){document.getElementById(this.usp[i]).addEventListener("click",this);}}if(id==this.id[4]){let l5=this.neni.length;for(let i=0;i<l5;i++){document.getElementById(this.neni[i]).addEventListener("click",this);}}if(id==this.id[5]){document.getElementById(this.oziv).addEventListener("click",this);}if(id==this.id[6]){mail.posluchac();setTimeout("document.getElementById('nad-kon').scrollIntoView({behavior:'smooth'});",250);document.getElementById(this.kont).addEventListener("click",this);}},posOFF(id){if(id==this.id[0]){let l1=this.zas.length;for(let i=0;i<l1;i++){document.getElementById(this.zas[i]).removeEventListener("click",this);}}if(id==this.id[1]){let l2=this.obch.length;for(let i=0;i<l2;i++){document.getElementById(this.obch[i]).removeEventListener("click",this);}}if(id==this.id[2]){let l3=this.obchM.length;for(let i=0;i<l3;i++){document.getElementById(this.obchM[i]).removeEventListener("click",this);}}if(id==this.id[3]){let l4=this.usp.length;for(let i=0;i<l4;i++){document.getElementById(this.usp[i]).removeEventListener("click",this);}}if(id==this.id[4]){let l5=this.oziv.length;for(let i=0;i<l5;i++){document.getElementById(this.oziv[i]).removeEventListener("click",this);}}if(id==this.id[5]){document.getElementById(this.oziv).removeEventListener("click",this);}if(id==this.id[6]){document.getElementById(this.kont).removeEventListener("click",this);}},on(id){const okno=document.getElementById(id);this.posON(id);okno.showModal();this.aktivni=id;},off(id){const okno=document.getElementById(id);dia.posOFF(id);okno.close();this.aktivni="";},vyp_akt(){if(this.aktivni!=""){const okno=document.getElementById(this.aktivni);okno.close();this.aktivni="";}}};const text={kon:"i-box",box_an:"i-an",p_id:"i-text",aktivni:false,TIME:4500,pis(zobrazit_text){this.aktivni=true;v_port.handleEvent();document.getElementById(this.kon).style.display="block";document.getElementById(this.kon).style.opacity=1;document.getElementById(this.box_an).style.animationPlayState="running";document.getElementById(this.p_id).innerHTML=zobrazit_text;setTimeout(this.off.bind(this),this.TIME);},off(){const o=document.getElementById(this.box_an);o.style.animationPlayState="paused";o.style.transform="scale(1.25)";o.style.opacity=0;document.getElementById(this.kon).style.display="none";this.aktivni=false;}};const obrazovka={max:1024,min_vyska:530,min_sirka:260,a_sirka:320,cool:800,id_kotva:"hl-kon",id_kotva2:"k-h",TIME:200,vyska:null,sirka:null,d_vyska:null,d_sirka:null,top:null,left:null,velikost(){this.vyska=window.screen.height;this.sirka=window.screen.width;this.d_vyska=window.screen.availHeight;this.d_sirka=window.screen.availWidth;this.top=window.screen.availTop;this.left=window.screen.availLeft;},zmen(jak){let [Nleft,Ntop,Nsirka,Nvyska,kotva]=[this.top,this.left,this.min_sirka,this.min_vyska,this.id_kotva];if(jak=="vl"){Nleft=this.left;Ntop=this.top;Nsirka=this.a_sirka;Nvyska=this.d_vyska;}else if(jak=="vlm"){Nleft=this.left;Ntop=this.top;Nsirka=this.min_sirka;Nvyska=this.d_vyska;}else if(jak=="min"){Nleft=0;Ntop=0;Nsirka=this.min_sirka;Nvyska=this.min_vyska;kotva=this.id_kotva2;}else if(jak=="cool"){if(this.cool<this.d_vyska){Nleft=(this.d_sirka-this.cool)/2;Ntop=(this.d_vyska-this.cool)/2;Nsirka=this.cool;Nvyska=this.cool;}else{Nleft=(this.d_sirka-this.cool)/2;Ntop=this.top;Nsirka=this.cool;Nvyska=this.d_vyska;}}else if(jak=="cel"){Nleft=this.left;Ntop=this.top;Nsirka=this.d_sirka;Nvyska=this.d_vyska;}else if(jak=="pln"){document.documentElement.requestFullscreen();setTimeout(`document.getElementById("${kotva}").scrollIntoView({behavior:"smooth"});`,this.TIME);return;}else if(jak=="vpm"){Nleft=this.d_sirka-this.min_sirka;Ntop=this.top;Nsirka=this.min_sirka;Nvyska=this.d_vyska;}else if(jak=="vp"){Nleft=this.d_sirka-this.a_sirka;Ntop=this.top;Nsirka=this.a_sirka;Nvyska=this.d_vyska;}window.resizeTo(Nsirka,Nvyska);window.moveTo(Nleft,Ntop);setTimeout(`document.getElementById("${kotva}").scrollIntoView({behavior:"smooth"});`,this.TIME);}};const jas={id_zmen:"telo",min:20,zmen(id){let hodnota=parseInt(document.getElementById(id).value);if(hodnota<this.min){hodnota=this.min;}document.getElementById(this.id_zmen).style.filter=`brightness(${hodnota}%)`;let l1=dia.id.length;for(let i=0;i<l1;i++){document.getElementById(dia.id[i]).style.filter=`brightness(${hodnota}%)`;}}};const p_nas={id_blok:"n-i-blok",id:"nastaveni",id_nas:["k-nas","in-plus1-n","in-minus1-n","bns1","bns2","bns3","bns4","bns5","bns6","vlk_z"],id_SVG:["in-plus2-n","in-minus2-n","s-nas"],id_level:"i-l-n",id_in:["i-15-n","i-30-n","i-60-n","i-120-n"],id_in_r:["ir-15-n","ir-30-n","ir-60-n","ir-120-n"],id_cast:["int-15-n","int-30-n","int-60-n","int-120-n"],a(){this.On();zvuk.barvy();},On(){let l1=this.id_nas.length;for(let i=0;i<l1;i++){document.getElementById(this.id_nas[i]).addEventListener("click",this);}},Off(){let l1=this.id_nas.length;for(let i=0;i<l1;i++){document.getElementById(this.id_nas[i]).removeEventListener("click",this);}},handleEvent(e){const k=e.target.id;if(k==this.id_nas[0]||k==this.id_SVG[2]){hl_kon.otevri(this.id);this.Off();v_port.other=false;}else if(k==this.id_nas[1]||k==this.id_SVG[0]){pruvodce.inter("plus");uloz.osoba();}else if(k==this.id_nas[2]||k==this.id_SVG[1]){pruvodce.inter("minus");uloz.osoba();}else if(k==this.id_nas[3]){zvuk.volba(0);}else if(k==this.id_nas[4]){zvuk.volba(1);}else if(k==this.id_nas[5]){zvuk.volba(2);}else if(k==this.id_nas[6]){zvuk.volba(3);}else if(k==this.id_nas[7]){zvuk.volba(4);}else if(k==this.id_nas[8]){zvuk.volba(5);}else if(k==this.id_nas[9]){if(document.getElementById(this.id_nas[9]).checked==true){zvuk.zesilovat=true;uloz.uloz(uloz.klice[11],"true");}else if(document.getElementById(this.id_nas[9]).checked==false){zvuk.zesilovat=false;uloz.uloz(uloz.klice[11],"false");}}}};const p_ob={id:"obchuzky",id_ob:["k-ob"],id_but:"ob-obch",id_svg:["s-ob"],On(){let l1=this.id_ob.length;for(let i=0;i<l1;i++){document.getElementById(this.id_ob[i]).addEventListener("click",this);}if(!uloz.ok){return;}document.getElementById(this.id_but).addEventListener("click",this);let l2=obch.id_f.length;for(let i=0;i<l2;i++){document.getElementById(obch.id_f[i]).addEventListener("input",this);}},Off(){let l3=this.id_ob.length;for(let i=0;i<l3;i++){document.getElementById(this.id_ob[i]).removeEventListener("click",this);}if(!uloz.ok){return;}document.getElementById(this.id_but).removeEventListener("click",this);let l4=obch.id_f.length;for(let i=0;i<l4;i++){document.getElementById(obch.id_f[i]).removeEventListener("input",this);}},handleEvent(e){const k=e.target.id;if(k==this.id_ob[0]||k==this.id_svg[0]){hl_kon.otevri(this.id);this.Off();document.getElementById(this.id_but).style.opacity=0.5;document.getElementById(this.id_but).disabled=true;v_port.other=false;}if(k==this.id_but){let test=this.kon();if(test==false){return;}else{const f15=document.getElementById(obch.id_f[0]);const f30=document.getElementById(obch.id_f[1]);const f60=document.getElementById(obch.id_f[2]);const f120=document.getElementById(obch.id_f[3]);let ud15=uloz.nacti(uloz.klice[4]);let ud30=uloz.nacti(uloz.klice[5]);let ud60=uloz.nacti(uloz.klice[6]);let ud120=uloz.nacti(uloz.klice[7]);f15.value=ud15;f30.value=ud30;f60.value=ud60;f120.value=ud120;text.pis("Obchůzky byly obnoveny");gong.hraj(false);}this.kon();}if(k==obch.id_f[0]||k==obch.id_f[1]||k==obch.id_f[2]||k==obch.id_f[3]){setTimeout(this.kon.bind(this),250);}},kon(){if(!uloz.ok){document.getElementById(this.id_but).style.opacity=0.5;document.getElementById(this.id_but).disabled=true;return false;}const df15=document.getElementById(obch.id_f[0]).value;const df30=document.getElementById(obch.id_f[1]).value;const df60=document.getElementById(obch.id_f[2]).value;const df120=document.getElementById(obch.id_f[3]).value;let ud15=uloz.nacti(uloz.klice[4]);let ud30=uloz.nacti(uloz.klice[5]);let ud60=uloz.nacti(uloz.klice[6]);let ud120=uloz.nacti(uloz.klice[7]);if(ud15==""&&ud30==""&&ud60==""&&ud120==""){document.getElementById(this.id_but).style.opacity=0.5;document.getElementById(this.id_but).disabled=true;return false;}if(df15!=ud15||df30!=ud30||df60!=ud60||df120!=ud120){document.getElementById(this.id_but).style.opacity=1;document.getElementById(this.id_but).disabled=false;return true;}else{document.getElementById(this.id_but).style.opacity=0.5;document.getElementById(this.id_but).disabled=true;return false;}},a(){this.kon();this.On();}};const uzamceni={id:"zamek",aktivni:false,TIME:5000,casovac:null,a(){this.aktivni=true;hl_kon.zavri(uzamceni.id,"flex",uzamceni.id);v_port.handleEvent();this.zhasni();this.pON();},pON(){const o=document.getElementById(this.id);o.addEventListener("click",uzamceni.jednou);o.addEventListener("mousemove",uzamceni.jednou);o.addEventListener("dblclick",this);},oOFF(){const o=document.getElementById(this.id);o.removeEventListener("click",uzamceni.jednou);o.removeEventListener("mousemove",uzamceni.jednou);o.removeEventListener("dblclick",this);this.aktivni=false;},handleEvent(){clearTimeout(this.casovac);document.getElementById(this.id).style.opacity=1;hl_kon.otevri(this.id);this.oOFF();},zhasni(){clearTimeout(this.casovac);this.casovac=setTimeout(`document.getElementById("${this.id}").style.opacity=0;`,this.TIME);},jednou(){if(document.getElementById(this.id).style.display!="flex"){return;}document.getElementById(this.id).style.opacity=1;uzamceni.zhasni();}};const g_pos={obj:[["spustit","spustit-svg"],["vl","vlm","min","cool","cel","pln","vpm","vp"],["ovl-zvuk","ovl-jas"],["but-nas","nas-svg"],["but-ob","ob-svg"],["but-oz","oz-svg"]],neni:["navod","funkce","o-aplikaci","m","pl","k","pr"],zam:["zam","zam-svg"],min:["m","m-svg","m-p"],pla:["pl","pl-svg","pl-p"],kon:["k","k-svg","k-p"],pre:["pr","pr-svg","pr-p"],ozivitOn(){document.getElementById(this.obj[5][0]).addEventListener("click",this);document.getElementById(this.obj[5][0]).style.opacity=1;},ozivitOff(){document.getElementById(this.obj[5][0]).removeEventListener("click",this);document.getElementById(this.obj[5][0]).style.opacity=0.5;},aktivace(){document.getElementById(this.obj[0][0]).addEventListener("click",this);let l1=this.obj[1].length;for(let i=0;i<l1;i++){document.getElementById(this.obj[1][i]).addEventListener("click",this);}let l2=this.obj[2].length;for(let i=0;i<l2;i++){document.getElementById(this.obj[2][i]).addEventListener("change",this);}document.getElementById(this.obj[3][0]).addEventListener("click",this);document.getElementById(this.obj[4][0]).addEventListener("click",this);document.getElementById(this.zam[0]).addEventListener("click",this);let l3=this.neni.length;for(let i=0;i<l3;i++){document.getElementById(this.neni[i]).addEventListener("click",this);}},handleEvent(e){const k=e.target.id;if(k==this.obj[0][0]||k==this.obj[0][1]){pruvodce.a();}if(k==this.obj[5][0]||k==this.obj[5][1]){hlidac.aktivace();zamek.blok();window.onbeforeunload=()=>{return 'Chcete zavřít aplikaci Noční VLK?';};uloz.oziv(true);this.ozivitOff();}if(k==this.obj[1][0]){obrazovka.zmen(this.obj[1][0]);}if(k==this.obj[1][1]){obrazovka.zmen(this.obj[1][1]);}if(k==this.obj[1][2]){obrazovka.zmen(this.obj[1][2]);}if(k==this.obj[1][3]){obrazovka.zmen(this.obj[1][3]);}if(k==this.obj[1][4]){obrazovka.zmen(this.obj[1][4]);}if(k==this.obj[1][5]){obrazovka.zmen(this.obj[1][5]);}if(k==this.obj[1][6]){obrazovka.zmen(this.obj[1][6]);}if(k==this.obj[1][7]){obrazovka.zmen(this.obj[1][7]);}if(k==this.obj[2][1]){jas.zmen(this.obj[2][1]);}if(k==this.obj[2][0]){zvuk.zastav();zvuk.zmen(this.obj[2][0]);pinkani.zmen(this.obj[2][0]);gong.zmen(this.obj[2][0]);zvuk.hraj(false);}if(k==this.obj[3][0]||k==this.obj[3][1]){p_nas.a();hl_kon.zavri(p_nas.id,"flex",p_nas.id);v_port.other=true;v_port.handleEvent();}if(k==this.obj[4][0]||k==this.obj[4][1]){p_ob.a();hl_kon.zavri(p_ob.id,"flex",p_ob.id);v_port.other=true;v_port.handleEvent();}if(k==this.zam[0]||k==this.zam[1]){uzamceni.a();}if(k==this.neni[0]||k==this.neni[1]||k==this.neni[2]||k==this.min[0]||k==this.min[1]||k==this.min[2]||k==this.pla[0]||k==this.pla[1]||k==this.pla[2]||k==this.kon[0]||k==this.kon[1]||k==this.kon[2]||k==this.pre[0]||k==this.pre[1]||k==this.pre[2]){dia.on(dia.id[4]);}}};const v_port={id_o:"uz-obchuzka",id_t:"uz-i-box",id:["spust1","spust2","spust3","spust4","spust5"],id_other:["nastaveni","obchuzky"],other:false,pruvodce:false,handleEvent(){document.getElementById(hl_kon.id_kon).style.minHeight=parseInt(window.screen.availHeight)+"px";let v=parseInt(window.visualViewport.height);document.getElementById(hl_kon.id_kon).style.minHeight=`${v}px`;if(tik.a_obchuzka){document.getElementById(this.id_o).style.height=`${v}px`;document.getElementById(this.id_o).style.minHeight=`${v}px`;}if(text.aktivni){document.getElementById(this.id_t).style.height=`${v}px`;document.getElementById(this.id_t).style.minHeight=`${v}px`;}if(this.pruvodce){let l1=this.id.length;for(let i=0;i<l1;i++){document.getElementById(this.id[i]).style.height=`${v}px`;document.getElementById(this.id[i]).style.minHeight=`${v}px`;}}if(this.other){let l2=this.id_other.length;for(let i=0;i<l2;i++){document.getElementById(this.id_other[i]).style.minHeight=`${v}px`;}}if(uzamceni.aktivni){document.getElementById(uzamceni.id).style.height=`${v}px`;document.getElementById(uzamceni.id).style.minHeight=`${v}px`;}},aktivace(){window.visualViewport.addEventListener("resize",this);window.visualViewport.addEventListener("scroll",this);addEventListener("scroll",this);},zahajit(){if(window&&window.visualViewport){this.aktivace();this.handleEvent();setTimeout(this.handleEvent.bind(this),500);setTimeout(this.handleEvent.bind(this),1000);}}};const hl_kon={id_kon:"hl-kon",display_con:"flex",id_kotva:"hlavicka",TIME1:100,TIME2:150,f_id_cisti:["obch15","obch30","obch60","obch120"],cisti_form(){let l1=this.f_id_cisti.lenght;for(let i=0;i<l1;i++){document.getElementById(this.f_id_cisti[i]).value="";}},zavri(IDnew,typ,id_scroll){document.getElementById(this.id_kon).style.zIndex=-1;document.getElementById(this.id_kon).style.opacity=0;document.getElementById(this.id_kon).style.display="none";setTimeout(()=>{document.getElementById(IDnew).style.display=typ;document.getElementById(IDnew).style.zIndex=0;},this.TIME1);setTimeout(()=>{document.getElementById(IDnew).style.opacity=1;if(id_scroll){document.getElementById(id_scroll).scrollIntoView({behavior:"smooth"});}},this.TIME2);},otevri(ID_old){document.getElementById(ID_old).style.zIndex=-1;document.getElementById(ID_old).style.opacity=0;document.getElementById(ID_old).style.display="none";setTimeout(()=>{document.getElementById(this.id_kon).style.display=this.display_con;document.getElementById(this.id_kon).style.zIndex=0;},this.TIME1);setTimeout(()=>{document.getElementById(this.id_kon).style.opacity=1;document.getElementById(this.id_kon).style.zIndex=0;document.getElementById(this.id_kotva).scrollIntoView({behavior:"smooth"});},this.TIME2);}};const centrala={id_error:"div-error",id_but:"but-error",cesta:"../NocniVLK.html",lic:null,posOn(){document.getElementById(this.id_but).addEventListener("click",this);},handleEvent(){location.replace(this.cesta);},poloh(){obrazovka.velikost();if(parseInt(obrazovka.sirka)<=obrazovka.max){document.getElementById("poloha").style.display="none";}},licence(){let over={};over.cas1=Date.now()-(24*60*60*1000);over.cas2=Date.now()+(10*60*1000);over.retezec=location.search.slice(1);try{over.celek=JSON.parse(over.retezec);if((parseInt(over.celek[0])>=over.cas1&&parseInt(over.celek[0])<=over.cas2)&&(over.celek[1]==false||over.celek[2]==false||over.celek[3]==false||over.celek[1]==true||over.celek[2]==true||over.celek[3]==true)){this.lic=true;}else{hl_kon.zavri(this.id_error,"flex",this.id_error);this.posOn();}}catch(e){hl_kon.zavri(this.id_error,"flex",this.id_error);this.posOn();}},komplet(){v_port.zahajit();this.licence();if(this.lic!=true){return;}this.poloh();hl_kon.cisti_form();window.onbeforeunload=()=>{return 'Chcete zavřít aplikaci Noční VLK?';};}};pripravenost.centrum=true;
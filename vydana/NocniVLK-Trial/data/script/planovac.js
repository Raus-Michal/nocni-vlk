const planovac={id_spust:["cas-ulohy","popis-plan","ch-bz","ch-1x","ch-rep"],id_hl_kon:"div-plany",id_box_hl:"box-p",id_butt_box:"butt-edit-p",id_kryt:"kryt-p",id_text:"p-p",id_box_up:"box-uk-p",id_butt_uk:"butt-p",id_butt_zvuk:"zvuk-p",id_hod:"hod-p",id_min:"min-p",id_bud:"bud-p",butt_spust:"form-plan",plany:[[],[],[],[],[],[]],hlidat_plany:false,v_alarmu:["","","","","",""],povoleni_zesilovat:false,id_nas_plan:["hod-p-n","min-p-n","plan-pop-n","ch-bz-n","ch-1x-n","ch-rep-n"],eduje_se:null,posON_spust(){document.getElementById(this.id_spust[2]).addEventListener("input",this);document.getElementById(this.id_spust[3]).addEventListener("input",this);document.getElementById(this.id_spust[4]).addEventListener("input",this);document.getElementById(this.butt_spust).addEventListener("submit",this);},posOFF_spust(){document.getElementById(this.id_spust[2]).removeEventListener("input",this);document.getElementById(this.id_spust[3]).removeEventListener("input",this);document.getElementById(this.id_spust[4]).removeEventListener("input",this);document.getElementById(this.butt_spust).removeEventListener("submit",this);},handleEvent(e){const k=e.target.id;if(k==this.id_spust[2]||k==this.id_spust[3]||k==this.id_spust[4]){const ch1=document.getElementById(this.id_spust[2]);const ch2=document.getElementById(this.id_spust[3]);const ch3=document.getElementById(this.id_spust[4]);if(k==this.id_spust[2]){ch1.checked=true;ch2.checked=false;ch3.checked=false;}else if(k==this.id_spust[3]){ch1.checked=false;ch2.checked=true;ch3.checked=false;}else if(k==this.id_spust[4]){ch1.checked=false;ch2.checked=false;ch3.checked=true;}}else if(k==this.id_nas_plan[3]||k==this.id_nas_plan[4]||k==this.id_nas_plan[5]){const ch1=document.getElementById(this.id_nas_plan[3]);const ch2=document.getElementById(this.id_nas_plan[4]);const ch3=document.getElementById(this.id_nas_plan[5]);const plan=this.eduje_se;const cislo_pole=plan-1;let zmena="";if(k==this.id_nas_plan[3]){ch1.checked=true;ch2.checked=false;ch3.checked=false;zmena=false;}else if(k==this.id_nas_plan[4]){ch1.checked=false;ch2.checked=true;ch3.checked=false;zmena=null;}else if(k==this.id_nas_plan[5]){ch1.checked=false;ch2.checked=false;ch3.checked=true;zmena=true;}this.plany[cislo_pole][3]=zmena;console.log(this.plany[cislo_pole]);}else if(k==this.butt_spust){if(this.plany[0].length==0){zamek.blok();window.onbeforeunload=()=>{return "Chcete zavřít aplikaci Noční VLK?";};this.zaloz(1);}else if(this.plany[1].length==0){this.zaloz(2);}else if(this.plany[2].length==0){this.zaloz(3);}else if(this.plany[3].length==0){this.zaloz(4);}else if(this.plany[4].length==0){this.zaloz(5);}else if(this.plany[5].length==0){this.zaloz(6);}}else if(k==`${this.id_butt_uk}1`){this.ukoncit(1);}else if(k==`${this.id_butt_uk}2`){this.ukoncit(2);}else if(k==`${this.id_butt_uk}3`){this.ukoncit(3);}else if(k==`${this.id_butt_uk}4`){this.ukoncit(4);}else if(k==`${this.id_butt_uk}5`){this.ukoncit(5);}else if(k==`${this.id_butt_uk}6`){this.ukoncit(6);}else if(k==`${this.id_butt_zvuk}1`||k==`${this.id_butt_zvuk}2`||k==`${this.id_butt_zvuk}3`||k==`${this.id_butt_zvuk}4`||k==`${this.id_butt_zvuk}5`||k==`${this.id_butt_zvuk}6`){zvuk_plan.zastav();this.povoleni_zesilovat=false;}else if(k==`${this.id_butt_box}1`||k==`${this.id_text}1`||k==`${this.id_kryt}1`){dia.on(dia.id[13]);this.eduje_se=1;this.editovat(1);}else if(k==`${this.id_butt_box}2`||k==`${this.id_text}2`||k==`${this.id_kryt}2`){dia.on(dia.id[13]);this.eduje_se=2;this.editovat(2);}else if(k==`${this.id_butt_box}3`||k==`${this.id_text}3`||k==`${this.id_kryt}3`){dia.on(dia.id[13]);this.eduje_se=3;this.editovat(3);}else if(k==`${this.id_butt_box}4`||k==`${this.id_text}4`||k==`${this.id_kryt}4`){dia.on(dia.id[13]);this.eduje_se=4;this.editovat(4);}else if(k==`${this.id_butt_box}5`||k==`${this.id_text}5`||k==`${this.id_kryt}5`){dia.on(dia.id[13]);this.eduje_se=5;this.editovat(5);}else if(k==`${this.id_butt_box}6`||k==`${this.id_text}6`||k==`${this.id_kryt}6`){dia.on(dia.id[13]);this.eduje_se=6;this.editovat(6);}},zaloz(plan=0){if(plan==0){return;}hlidac.planovac=true;const hodin=parseInt(document.getElementById(this.id_spust[0]).value[0]+document.getElementById(this.id_spust[0]).value[1]);const minut=parseInt(document.getElementById(this.id_spust[0]).value[3]+document.getElementById(this.id_spust[0]).value[4]);const duplicita=this.duplicitni_cas(hodin,minut);if(duplicita){return;}let minut_text=minut;if(minut_text<10){minut_text=`0${minut_text}`;}const text=document.getElementById(this.id_spust[1]).value;document.getElementById(`${this.id_box_hl}${plan}`).style.opacity=1;document.getElementById(`${this.id_hl_kon}`).classList.remove("d-n");document.getElementById(`${this.id_box_hl}${plan}`).classList.remove("d-n");document.getElementById(`${this.id_hod}${plan}`).innerText=hodin;document.getElementById(`${this.id_min}${plan}`).innerText=minut_text;document.getElementById(`${this.id_text}${plan}`).innerText=text;this.sroll_na(plan);setTimeout(()=>{this.sroll_na(plan);},500);setTimeout(()=>{document.getElementById(`${this.id_box_hl}${plan}`).classList.add("zar");},1000);const ch1=document.getElementById(this.id_spust[2]).checked;const ch2=document.getElementById(this.id_spust[3]).checked;const ch3=document.getElementById(this.id_spust[4]).checked;let zvuk=null;if(ch1==true){zvuk=false;}else if(ch2==true){zvuk=null;}else if(ch3==true){zvuk=true;}const cislo_pole_planu=plan-1;this.plany[cislo_pole_planu].push(hodin);this.plany[cislo_pole_planu].push(minut);this.plany[cislo_pole_planu].push(text);this.plany[cislo_pole_planu].push(zvuk);document.getElementById(`${this.id_butt_box}${plan}`).addEventListener("click",this);dia.off(dia.id[4]);this.hlidat_plany=true;zvuk_plan.hraj(false);},duplicitni_cas(hod,min){const kontrolor=[null,null,null,null,null,null];const d=kontrolor.length;for(let i=0;i<d;i++){if(this.plany[i].length!=0){if(this.plany[i][0]==hod&&this.plany[i][1]==min){kontrolor[i]=true;}}}if(kontrolor[0]==true||kontrolor[1]==true||kontrolor[2]==true||kontrolor[3]==true||kontrolor[4]==true||kontrolor[5]==true){dia.off(dia.id[4]);let plan=null;if(kontrolor[0]==true){plan=1;}else if(kontrolor[1]==true){plan=2;}else if(kontrolor[2]==true){plan=3;}else if(kontrolor[3]==true){plan=4;}else if(kontrolor[4]==true){plan=5;}else if(kontrolor[5]==true){plan=6;}document.getElementById(`${this.id_box_hl}${plan}`).classList.remove("zar");this.sroll_na(plan);setTimeout(()=>{this.sroll_na(plan);},500);setTimeout(()=>{document.getElementById(`${this.id_box_hl}${plan}`).classList.add("zar");zvuk_plan.hraj(false);},750);return true;}else{return false;}},editovat(plan){const plan_pole=plan-1;const hodina_planu=this.plany[plan_pole][0];let minuta_planu=this.plany[plan_pole][1];const text_planu=this.plany[plan_pole][2];const volba_zvuku=this.plany[plan_pole][3];if(minuta_planu<10){minuta_planu=`0${minuta_planu}`;}const dia_hodina=document.getElementById(this.id_nas_plan[0]);dia_hodina.innerText=hodina_planu;const dia_minuta=document.getElementById(this.id_nas_plan[1]);dia_minuta.innerText=minuta_planu;const dia_text=document.getElementById(this.id_nas_plan[2]);dia_text.innerText=text_planu;const dia_ch1=document.getElementById(this.id_nas_plan[3]);const dia_ch2=document.getElementById(this.id_nas_plan[4]);const dia_ch3=document.getElementById(this.id_nas_plan[5]);if(volba_zvuku){dia_ch1.checked=false;dia_ch2.checked=false;dia_ch3.checked=true;}else if(volba_zvuku==false){dia_ch1.checked=true;dia_ch2.checked=false;dia_ch3.checked=false;}else if(volba_zvuku==null){dia_ch1.checked=false;dia_ch2.checked=true;dia_ch3.checked=false;}},nas_posON(){document.getElementById(this.id_nas_plan[3]).addEventListener("click",this);document.getElementById(this.id_nas_plan[4]).addEventListener("click",this);document.getElementById(this.id_nas_plan[5]).addEventListener("click",this);},nas_posOFF(){document.getElementById(this.id_nas_plan[3]).removeEventListener("click",this);document.getElementById(this.id_nas_plan[4]).removeEventListener("click",this);document.getElementById(this.id_nas_plan[5]).removeEventListener("click",this);},hlidac(){console.log("hlidac");const plan=[null,null,null,null,null,null];const plany_ke_kontrole=[];if(this.plany[0].length!=0){plan[0]=true;plany_ke_kontrole.push(1);}if(this.plany[1].length!=0){plan[1]=true;plany_ke_kontrole.push(2);}if(this.plany[2].length!=0){plan[2]=true;plany_ke_kontrole.push(3);}if(this.plany[3].length!=0){plan[3]=true;plany_ke_kontrole.push(4);}if(this.plany[4].length!=0){plan[4]=true;plany_ke_kontrole.push(5);}if(this.plany[5].length!=0){plan[5]=true;plany_ke_kontrole.push(6);}if(plan[0]==null&&plan[1]==null&&plan[2]==null&&plan[3]==null&&plan[4]==null&&plan[5]==null){this.hlidat_plany=false;hlidac.planovac=false;return;}const delka=plany_ke_kontrole.length;for(let i=0;i<delka;i++){const cas=new Date();const hod=cas.getHours();const min=cas.getMinutes();const z_hod=this.plany[plany_ke_kontrole[i]-1][0];const z_min=this.plany[plany_ke_kontrole[i]-1][1];if(hod==z_hod&&min==z_min){if(hl_kon.otevrene_okno!=""){planovac.hlidat_plany=false;hl_kon.otevri(hl_kon.otevrene_okno);setTimeout(()=>{this.alarm(plany_ke_kontrole[i]);},500);setTimeout(()=>{planovac.hlidat_plany=true;},1000);}else{this.alarm(plany_ke_kontrole[i]);}}}},alarm(plan){dia.vyp_akt();this.sroll_na(plan);setTimeout(()=>{this.sroll_na(plan);},500);document.getElementById(`${this.id_butt_box}${plan}`).removeEventListener("click",this);document.getElementById(`${this.id_box_hl}${plan}`).classList.remove("zar");document.getElementById(`${this.id_bud}${plan}`).classList.add("budik");document.getElementById(`${this.id_box_hl}${plan}`).classList.add("zar-nonstop");document.getElementById(`${this.id_box_up}${plan}`).classList.remove("d-n");if(this.plany[plan-1][3]==true){document.getElementById(`${this.id_butt_zvuk}${plan}`).classList.remove("d-n");document.getElementById(`${this.id_butt_zvuk}${plan}`).addEventListener("click",this);zvuk_plan.hraj(true);this.povoleni_zesilovat=true;}else{document.getElementById(`${this.id_butt_zvuk}${plan}`).classList.add("d-n");if(this.plany[plan-1][3]==null){this.povoleni_zesilovat=false;zvuk_plan.hraj(false);}}document.getElementById(`${this.id_butt_uk}${plan}`).addEventListener("click",this);this.v_alarmu[plan-1]=true;this.anuluj_plan(plan);},anuluj_plan(plan){const cislo_pole_planu=plan-1;this.plany[cislo_pole_planu]=[];},ukoncit(plan){document.getElementById(`${this.id_butt_uk}${plan}`).removeEventListener("click",this);document.getElementById(`${this.id_butt_zvuk}${plan}`).removeEventListener("click",this);zvuk_plan.zastav();document.getElementById(`${this.id_box_hl}${plan}`).style.opacity=0;setTimeout(()=>{document.getElementById(`${this.id_bud}${plan}`).classList.remove("budik");document.getElementById(`${this.id_box_hl}${plan}`).classList.remove("zar-nonstop");document.getElementById(`${this.id_box_up}${plan}`).classList.add("d-n");document.getElementById(`${this.id_box_hl}${plan}`).classList.add("d-n");},300);this.v_alarmu[plan-1]="";if(this.plany[0].length==0&&this.plany[1].length==0&&this.plany[2].length==0&&this.plany[3].length==0&&this.plany[4].length==0&&this.plany[5].length==0&&this.v_alarmu[0]!=true&&this.v_alarmu[1]!=true&&this.v_alarmu[2]!=true&&this.v_alarmu[3]!=true&&this.v_alarmu[4]!=true&&this.v_alarmu[5]!=true){setTimeout(()=>{document.getElementById(`${this.id_hl_kon}`).classList.add("d-n");console.log("d-n");},500);}},sroll_na(plan=0){if(plan==0){return;}document.getElementById(`${this.id_box_hl}${plan}`).scrollIntoView({behavior:"smooth",block:"center"});}};pripravenost.planovac=true;
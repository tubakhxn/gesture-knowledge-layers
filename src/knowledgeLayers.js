// dev/creator=tubakhxn
import * as THREE from 'three';
import {LAYERS} from './knowledgeData.js';
export const SPACING=9;
const INK='#151a6e',BLUE=0x2b2fa0;
function rng(s){return()=>(s=(s*16807)%2147483647)/2147483647}
function wrap(ctx,text,x,y,w,lh){const words=text.split(' ');let l='';for(const wd of words){const t=l+wd+' ';if(ctx.measureText(t).width>w&&l){ctx.fillText(l,x,y);y+=lh;l=wd+' '}else l=t}ctx.fillText(l,x,y);return y+lh}
function tex(c){const t=new THREE.CanvasTexture(c);t.anisotropy=4;t.colorSpace=THREE.SRGBColorSpace;return t}
function textPanel(i){const L=LAYERS[i],c=document.createElement('canvas');c.width=560;c.height=700;const x=c.getContext('2d');
  x.fillStyle=INK;x.font='bold 21px monospace';x.fillText('LAYER '+String(i+1).padStart(2,'0')+': '+L.t.toUpperCase(),20,38);
  x.font='24px monospace';let y=wrap(x,L.d,20,84,520,33);y+=14;
  x.fillStyle='#ff7a1a';x.font='bold 17px monospace';x.fillText('RELATED CONCEPTS',20,y);y+=30;x.fillStyle=INK;x.font='23px monospace';
  L.c.forEach(k=>{x.fillText('• '+k,20,y);y+=32});return tex(c)}
function titleTex(i){const c=document.createElement('canvas');c.width=640;c.height=260;const x=c.getContext('2d');x.fillStyle=INK;x.font='bold 46px "Arial Narrow",Impact,sans-serif';
  x.fillText('Layer '+(i+1)+':',20,60);wrap(x,LAYERS[i].t,20,115,600,52);return tex(c)}
function icon(i){const c=document.createElement('canvas');c.width=768;c.height=600;const x=c.getContext('2d'),r=rng(i*977+13);x.scale(1.5,1.5);
  const gr=x.createLinearGradient(0,0,512,400);gr.addColorStop(0,'hsl('+(18+i*34)+',92%,58%)');gr.addColorStop(1,'hsl('+(200+i*34)+',80%,26%)');x.fillStyle=gr;x.fillRect(0,0,512,400);
  for(let g=0;g<3;g++){const cx=r()*512,cy=r()*400,rg=x.createRadialGradient(cx,cy,0,cx,cy,170);rg.addColorStop(0,'hsla('+((40+i*50+g*80)%360)+',100%,65%,.75)');rg.addColorStop(1,'hsla(0,0%,0%,0)');x.fillStyle=rg;x.fillRect(0,0,512,400)}
  x.fillStyle='rgba(255,255,255,.1)';for(let a=0;a<512;a+=12)for(let b=0;b<400;b+=12){x.beginPath();x.arc(a,b,2,0,7);x.fill()}
  x.strokeStyle='#fff4d6';x.fillStyle='#ffd23f';x.lineWidth=5;
  const P=()=>[40+r()*430,40+r()*320];
  if(i==0){const p=[...Array(12)].map(P);p.forEach((a,j)=>{x.beginPath();x.moveTo(...a);x.lineTo(...p[(j*5+3)%12]);x.stroke();x.beginPath();x.arc(...a,9,0,7);x.fill()})}
  else if(i==1){x.font='22px monospace';x.fillStyle='#fff4d6';['function sort(a){','  for(i of a)','    if(i<min)','      swap(i)','  return a','}','O(n log n)'].forEach((t,j)=>x.fillText(t,40,60+j*46))}
  else if(i==2){x.beginPath();for(let k=0;k<=440;k++){const X=36+k,Y=200-Math.sin(k/28)*Math.exp(-k/300)*120;k?x.lineTo(X,Y):x.moveTo(X,Y)}x.stroke();x.strokeRect(120,260,150,100);x.beginPath();x.moveTo(120,260);x.lineTo(270,360);x.stroke()}
  else if(i==3){for(let k=1;k<6;k++){x.beginPath();x.ellipse(256,200,k*45,k*18,k*.5,0,7);x.stroke()}for(let k=0;k<30;k++){x.beginPath();x.arc(...P(),5,0,7);x.fill()}}
  else if(i==4||i==5&&0){const cols=[3,5,5,2];cols.forEach((n,a)=>{for(let b=0;b<n;b++){const X=80+a*120,Y=200+(b-(n-1)/2)*58;if(a<3)for(let d=0;d<cols[a+1];d++){x.beginPath();x.moveTo(X,Y);x.lineTo(X+120,200+(d-(cols[a+1]-1)/2)*58);x.stroke()}x.beginPath();x.arc(X,Y,11,0,7);x.fill()}})}
  else if(i==5){x.beginPath();for(let k=0;k<=440;k++){const X=36+k,Y=60+260*Math.exp(-k/110)+r()*8;k?x.lineTo(X,Y):x.moveTo(X,Y)}x.stroke();x.strokeRect(36,40,440,320)}
  else if(i==6){x.strokeRect(60,60,390,280);x.strokeRect(120,120,150,170);x.strokeRect(290,180,110,120);x.fillRect(120,100,70,20);x.fillRect(290,160,60,20)}
  else if(i==7){x.lineWidth=14;x.beginPath();x.moveTo(110,340);x.lineTo(180,200);x.lineTo(330,120);x.lineTo(410,190);x.stroke();[[110,340],[180,200],[330,120]].forEach(p=>{x.beginPath();x.arc(...p,18,0,7);x.fill()});x.strokeRect(60,340,100,24)}
  else if(i==8){x.fillStyle='#fff4d6';for(let k=0;k<10;k++)x.fillRect(60,60+k*18,k%3?260:200,6);x.fillStyle='#ff7a1a';[90,150,110,220,180].forEach((h,k)=>x.fillRect(330+k*30,360-h,20,h))}
  else{for(let k=1;k<8;k++){x.beginPath();x.arc(256,200,k*24,0,7);x.stroke()}for(let k=0;k<12;k++){x.beginPath();x.arc(256+Math.cos(k)*k*14,200+Math.sin(k)*k*14,8,0,7);x.fill()}}
  x.strokeStyle='#fff';x.lineWidth=12;x.strokeRect(0,0,512,400);x.fillStyle='#10145a';x.fillRect(6,362,500,32);x.fillStyle='#fff4d6';x.font='bold 16px monospace';x.fillText('FIG.'+String(i+1).padStart(2,'0')+'  '+LAYERS[i].t.toUpperCase(),16,383);
  return tex(c)}
const PAL=['#c8620a','#ff4a0a','#ff5a0a','#ff6a10','#ff7f1a','#ff9a1f','#ffbd2a','#ffe14a','#d4f26b','#b8f58c'];
function blob(r,R,n=34,k=1,holes=0){const sh=new THREE.Shape(),ph=[r()*6,r()*6,r()*6];
  for(let a=0;a<=n;a++){const t=a/n*Math.PI*2,rad=R*(.72+.2*Math.sin(t*3+ph[0])+.12*Math.sin(t*5+ph[1])+.08*Math.sin(t*9+ph[2]))*(.85+.15*r());
    const X=Math.cos(t)*rad*k,Y=Math.sin(t)*rad;a?sh.lineTo(X,Y):sh.moveTo(X,Y)}
  for(let h=0;h<holes;h++){const hp=new THREE.Path(),cx=(r()-.5)*R*1.1,cy=(r()-.5)*R*1.1,hr=R*(.09+.12*r()),q=r()*6;for(let a=0;a<=14;a++){const t=a/14*Math.PI*2,rr=hr*(.8+.25*Math.sin(t*3+q));a?hp.lineTo(cx+Math.cos(t)*rr,cy+Math.sin(t)*rr):hp.moveTo(cx+Math.cos(t)*rr,cy+Math.sin(t)*rr)}sh.holes.push(hp)}
  return new THREE.ShapeGeometry(sh)}
const USER=import.meta.glob('./images/*.{jpg,jpeg,png,webp}',{eager:true,query:'?url',import:'default'});
function userTex(i){const key=Object.keys(USER).find(k=>k.includes('layer-'+String(i+1).padStart(2,'0')));if(!key)return null;const t=new THREE.TextureLoader().load(USER[key]);t.colorSpace=THREE.SRGBColorSpace;return t}
const cl=(v,a=0,b=1)=>Math.max(a,Math.min(b,v));
const easeOut=x=>1-Math.pow(1-cl(x),3);
const pop=x=>{x=cl(x);const c=1.4;return 1+(c+1)*Math.pow(x-1,3)+c*Math.pow(x-1,2)};
const HW=3.6,HH=2.9;
export class KnowledgeLayers{
  constructor(scene){
    const R=this.R=new THREE.Group();R.rotation.y=-.45;R.scale.setScalar(.86);R.position.x=-.6;scene.add(R);const r=rng(11);
    this.born=null;
    const M=(c,o=1)=>new THREE.MeshBasicMaterial({color:c,side:THREE.DoubleSide,transparent:true,opacity:o});
    this.sed=new THREE.Group();this.sed.position.set(-2.2,0,.8);R.add(this.sed);this.sheets=[];
    for(let k=0;k<10;k++){const rad=k<6?2.9:2.9-(k-5)*.42;const m=new THREE.Mesh(blob(r,rad,40,1.1,k<7?3:1),M(PAL[k],.97));m.rotation.x=-Math.PI/2+(k>=6?(r()-.5)*.28:0);m.position.y=k*.13;m.rotation.z=r()*.5;m.userData.rz=m.rotation.z;this.sed.add(m);this.sheets.push(m)}
    this.blobs=[];[[3.4,1.7,2.3,'#ff5a0a',5],[5.7,.5,.8,'#ffb21f',1],[1.3,2.9,.7,'#ffc21f',1],[4.2,3.2,.6,'#ff8a14',1]].forEach(([x,z,rad,c,h],j)=>{const m=new THREE.Mesh(blob(r,rad,40,1.1,h),M(c,.97));m.rotation.x=-Math.PI/2;m.userData.x=x;m.userData.rz=0;m.userData.j=j;m.position.set(x-.4,-.05,z);R.add(m);this.blobs.push(m)});
    const pg=new THREE.BufferGeometry(),pa=[];for(let k=0;k<80;k++)pa.push(-2.2+(r()-.5)*6,r()*5,(r()-.5)*5);pg.setAttribute('position',new THREE.Float32BufferAttribute(pa,3));
    this.pts=new THREE.Points(pg,new THREE.PointsMaterial({color:0xe8730a,size:.13,transparent:true,opacity:0}));R.add(this.pts);
    this.links=[];this.dots=[];
    [[-3.9,1.8,-3.3,1.4],[-1.0,-1.2,-1.1,1.2]].forEach(([x,z,x2,y2],j)=>{const l=new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(x,.3,z),new THREE.Vector3(x2,y2+.9,0)]),new THREE.LineDashedMaterial({color:0x555588,dashSize:.12,gapSize:.12,transparent:true,opacity:0}));l.computeLineDistances();R.add(l);this.links.push(l);
      [[x,.3,z],[x2,y2+.9,0]].forEach(p=>{const d=new THREE.Mesh(new THREE.SphereGeometry(.1,10,10),new THREE.MeshBasicMaterial({color:0xd9700a}));d.position.set(...p);d.userData.y=p[1];d.userData.k=this.dots.length;R.add(d);this.dots.push(d)})});
    this.edges=[];
    const edge=(w,h,d,x,y,z,delay)=>{const e=new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(w,h,d)),new THREE.LineBasicMaterial({color:BLUE}));e.position.set(x,y,z);e.userData.delay=delay;R.add(e);this.edges.push(e)};
    const CX=this.CX=3.1,CY=this.CYc=2.6;
    edge(4.3,5.2,.4,-1.1,3.5,0,.25);edge(4.5,1.2,.4,CX+.55,5.65,0,.45);edge(4.9,4.1,.9,CX+.58,CY+.4,.1,.35);
    const imgs=this.imgs=LAYERS.map((_,i)=>userTex(i)||icon(i));
    const geo=new THREE.PlaneGeometry(HW,HH);
    this.pile=[];for(let p=1;p<=9;p++){const m=new THREE.Mesh(geo,new THREE.MeshBasicMaterial({map:imgs[p%10],transparent:true}));m.position.set(CX+p*.1,CY+p*.08,.45-p*.1);m.material.color.setScalar(Math.max(.6,1-p*.04));R.add(m);this.pile.push(m)}
    this.act=-1;
    this.L=LAYERS.map((Ld,i)=>{
      const txt=new THREE.Mesh(new THREE.PlaneGeometry(4.1,5.12),new THREE.MeshBasicMaterial({map:textPanel(i),transparent:true,opacity:0,depthWrite:false}));txt.position.set(-1.1,3.5,.22);R.add(txt);
      const tt=new THREE.Mesh(new THREE.PlaneGeometry(4.3,1.45),new THREE.MeshBasicMaterial({map:titleTex(i),transparent:true,opacity:0,depthWrite:false}));tt.position.set(CX+.55,5.7,.22);R.add(tt);
      const hero=new THREE.Mesh(geo,new THREE.MeshBasicMaterial({map:imgs[i],transparent:true}));R.add(hero);
      const cg=new THREE.Group();cg.position.set(-2.2,1.4,.8);R.add(cg);const cons=[];
      Ld.c.forEach((k,j)=>{const c=document.createElement('canvas');c.width=360;c.height=56;const x=c.getContext('2d');x.fillStyle='#ff7a1a';x.beginPath();x.arc(14,28,9,0,7);x.fill();x.fillStyle=INK;x.font='bold 24px monospace';x.fillText(k,32,36);
        const sp=new THREE.Sprite(new THREE.SpriteMaterial({map:tex(c),transparent:true,opacity:0,depthTest:false}));sp.scale.set(2.6,.4,1);
        const a=j/Ld.c.length*Math.PI*2+i,tgt=new THREE.Vector3(Math.cos(a)*2.7,.4+Math.sin(a*2)*.9,Math.sin(a)*2.2);
        const ln=new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(),tgt]),new THREE.LineDashedMaterial({color:0x2b2fa0,dashSize:.1,gapSize:.1,transparent:true,opacity:0}));
        cg.add(ln);cg.add(sp);cons.push({sp,ln,tgt})});
      return {txt,tt,hero,cons};
    });
  }
  restart(){this.born=null}
  update(t,dt,s,open,pinch){
    if(this.born===null)this.born=t;const age=t-this.born;
    const CX=this.CX,CY=this.CYc,a=Math.round(s.pos),fr=s.pos-a;
    const I=(d,du=.7)=>easeOut((age-d)/du);
    this.sheets.forEach((m,k)=>{
      const dd=k-s.pos,g=Math.exp(-dd*dd*.6),e=pop((age-k*.07)/.8);
      m.position.y=k*.13*e+Math.sign(dd)*.38*(1-Math.exp(-Math.abs(dd)*1.4))*e+.45*g*e-(1-e)*2.4;
      m.scale.setScalar(Math.max(.001,e)*(1+.06*g));
      m.rotation.z=m.userData.rz+Math.sin(t*.3+k)*.04+(1-e)*.6;
    });
    this.blobs.forEach((m,j)=>{const e=pop((age-.5-j*.12)/.8);
      m.scale.setScalar(Math.max(.001,e)*(1+Math.sin(t*.7+j*1.7)*.03));m.rotation.z=Math.sin(t*.25+j)*.08;
      m.position.x=m.userData.x-.4+Math.sin(t*.35+j*2)*.12+(1-e)*1.5});
    this.pts.material.opacity=.85*I(.9,.8);this.pts.rotation.y=t*.08;this.pts.position.y=Math.sin(t*.6)*.1;
    this.links.forEach(l=>l.material.opacity=.9*I(.9,.6));
    this.dots.forEach(d=>{const e=pop((age-.85)/.6);d.scale.setScalar(Math.max(.001,e)*(1+Math.sin(t*2+d.userData.k)*.15))});
    this.edges.forEach(e=>{const v=pop((age-e.userData.delay)/.8);e.scale.setScalar(Math.max(.001,v))});
    if(a!==this.act){this.act=a;this.pile.forEach((m,j)=>{m.material.map=this.imgs[(a+j+1)%10]})}
    this.pile.forEach((m,j)=>{const o=j+1-fr,e=I(.55+j*.06,.75);
      m.position.set(CX+o*.1+(1-e)*7,CY+o*.08,.45-o*.1);
      m.material.opacity=cl(o)*e;m.material.color.setScalar(Math.max(.6,1-o*.04))});
    const heroIn=I(1,.7);
    this.L.forEach((o,i)=>{
      const d=i-s.pos,f=Math.max(0,1-Math.abs(d)*1.6);
      const tin=I(.7,.8);
      o.txt.material.opacity=f*tin;o.tt.material.opacity=f*tin;
      o.txt.position.x=-1.1-cl(d,-1,1)*.45;o.tt.position.x=CX+.55-cl(d,-1,1)*.35;
      const m=o.hero.material;
      if(d<0){o.hero.position.set(CX-d*3.8,CY-d*.5,.5+(-d)*.3);o.hero.rotation.z=d*.3;m.opacity=Math.max(0,1+d*1.1)*heroIn}
      else{o.hero.rotation.z=0;const q=Math.min(d,1);o.hero.position.set(CX+q*.1+(1-heroIn)*7*(d<.5?1:0),CY+q*.08,.5-q*.1);m.opacity=(d>1?0:1)*heroIn}
      o.hero.scale.setScalar(Math.abs(d)<.5?1+pinch*.05:1);
      const ex=open*f;
      o.cons.forEach((c,j)=>{c.sp.material.opacity=ex;c.ln.material.opacity=ex*.8;
        if(ex>.01){c.sp.position.copy(c.tgt).multiplyScalar(.2+.8*ex);c.sp.position.y+=Math.sin(t*1.3+j)*.06;
          const p=c.ln.geometry.attributes.position;p.setXYZ(1,c.sp.position.x,c.sp.position.y,c.sp.position.z);p.needsUpdate=true;c.ln.computeLineDistances()}});
    });
  }
}

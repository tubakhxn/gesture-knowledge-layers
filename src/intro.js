// dev/creator=tubakhxn
import * as THREE from 'three';
import {Line2} from 'three/examples/jsm/lines/Line2.js';
import {LineGeometry} from 'three/examples/jsm/lines/LineGeometry.js';
import {LineMaterial} from 'three/examples/jsm/lines/LineMaterial.js';
import {LAYERS} from './knowledgeData.js';

const N=LAYERS.length,SP=.85,HW=1.5,SX=-1.3,CW=2.5,CH=2.03,FITW=7.6,CAMX=.5;
export const T={start:.35,step:.5,fillA:5.2,fillB:6.4,flyA:6.4,flyStep:.13,flyDur:1.1,hand:9.6,end:10.5};
const cl=(v,a=0,b=1)=>Math.max(a,Math.min(b,v));
const eo=x=>1-Math.pow(1-cl(x),3);
const io=x=>{x=cl(x);return x<.5?4*x*x*x:1-Math.pow(-2*x+2,3)/2};
const back=x=>{x=cl(x);const c=1.6;return 1+(c+1)*Math.pow(x-1,3)+c*Math.pow(x-1,2)};
const mono='"Courier New",Courier,monospace';

function labelTex(text){
  const c=document.createElement('canvas');c.width=760;c.height=64;const x=c.getContext('2d');
  x.fillStyle='#fff';x.font='bold 40px '+mono;x.textBaseline='middle';x.fillText(text,6,34);
  const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;return t}

export class Intro{
  constructor(el,imgs,onHandoff){
    this.el=el;this.imgs=imgs;this.onHandoff=onHandoff||(()=>{});this.active=false;this.t0=0;this.handed=false;
    this.renderer=new THREE.WebGLRenderer({antialias:true});this.renderer.setClearColor(0x000000,1);
    this.renderer.setPixelRatio(Math.min(2,devicePixelRatio));el.appendChild(this.renderer.domElement);
    this.scene=new THREE.Scene();this.camera=new THREE.PerspectiveCamera(35,1,.1,200);
    this.mats=[];
    const loopPts=[HW,0,0, 0,0,HW, -HW,0,0, 0,0,-HW, HW,0,0];
    this.layers=LAYERS.map((L,i)=>{
      const g=new THREE.Group();g.position.set(SX,i*SP,0);this.scene.add(g);
      const lg=new LineGeometry();lg.setPositions(loopPts);
      const lm=new LineMaterial({color:0xffffff,linewidth:2,transparent:true,opacity:1});this.mats.push(lm);
      const line=new Line2(lg,lm);line.computeLineDistances();g.add(line);
      const fg=new THREE.BufferGeometry();
      fg.setAttribute('position',new THREE.Float32BufferAttribute([-HW,0,0, HW,0,0, 0,0,-HW, 0,0,HW],3));
      fg.setAttribute('uv',new THREE.Float32BufferAttribute([0,.5, 1,.5, .5,1, .5,0],2));
      fg.setIndex([0,1,2, 0,3,1]);
      const fm=new THREE.MeshBasicMaterial({map:imgs[i],transparent:true,opacity:0,side:THREE.DoubleSide,depthWrite:false});
      const fill=new THREE.Mesh(fg,fm);g.add(fill);
      const sp=new THREE.Sprite(new THREE.SpriteMaterial({map:labelTex(L.t),transparent:true,opacity:0,depthTest:false}));
      sp.center.set(0,.5);sp.scale.set(4,.337,1);sp.position.set(SX+HW+.1,i*SP-.12,0);this.scene.add(sp);
      return {g,line,lm,fill,fm,sp};
    });
    this.cards=LAYERS.map((L,i)=>{
      const g=new THREE.Group();this.scene.add(g);
      const bd=new THREE.Mesh(new THREE.PlaneGeometry(CW+.1,CH+.1),new THREE.MeshBasicMaterial({color:0xffffff,transparent:true,opacity:0}));bd.position.z=-.004;g.add(bd);
      const im=new THREE.Mesh(new THREE.PlaneGeometry(CW,CH),new THREE.MeshBasicMaterial({map:imgs[i],transparent:true,opacity:0}));g.add(im);
      const row=Math.floor(i/3),col=i%3,single=i===9;
      const tx=CAMX+(single?0:(col-1)*2.3)+Math.sin(i*12.9)*.22,ty=2.6+row*1.75+Math.cos(i*7.3)*.18;
      g.visible=false;
      return {g,bd,im,tx,ty,rz:Math.sin(i*5.1)*.07,z:i*.03};
    });
    addEventListener('resize',()=>this.resize());this.resize();
    el.addEventListener('pointerdown',()=>this.skip());
    addEventListener('keydown',e=>{if(this.active&&(e.key===' '||e.key==='Escape'||e.key==='Enter'))this.skip()});
  }
  resize(){const w=this.el.clientWidth||1,h=this.el.clientHeight||1,pr=this.renderer.getPixelRatio();
    this.renderer.setSize(w,h,false);this.camera.aspect=w/h;this.camera.updateProjectionMatrix();
    this.mats.forEach(m=>{m.resolution.set(w*pr,h*pr);m.linewidth=Math.max(2.2*pr,w*pr/300)})}
  start(now){this.t0=now;this.active=true;this.handed=false;this.el.style.display='block';this.el.style.opacity=1;this.el.style.pointerEvents='auto';this.resize()}
  skip(){if(!this.active)return;const t=(performance.now()-this.t0)/1000;if(t<T.hand)this.t0=performance.now()-T.hand*1000}
  update(now){
    if(!this.active)return false;
    const t=(now-this.t0)/1000;
    if(t>=T.hand&&!this.handed){this.handed=true;this.onHandoff()}
    if(t>=T.end){this.active=false;this.el.style.display='none';this.el.style.pointerEvents='none';return false}
    this.el.style.opacity=1-eo((t-T.hand)/(T.end-T.hand));
    const lv=io((t-T.flyA)/1.8),pitch=.3-.26*lv,lookY=4.3+lv*.9;
    const tn=Math.tan(THREE.MathUtils.degToRad(this.camera.fov/2)),d=(FITW+lv*.9)/(2*tn*this.camera.aspect);
    const sway=Math.sin(t*.5)*.25*(1-lv);
    this.camera.position.set(CAMX+sway,lookY+d*Math.sin(pitch),d*Math.cos(pitch));this.camera.lookAt(CAMX,lookY,0);
    const nw=Math.min(N-1,Math.max(0,(t-T.start)/T.step)),fill=io((t-T.fillA)/(T.fillB-T.fillA)),fade=1-io((t-T.fillB)/1.2);
    this.layers.forEach((o,i)=>{
      const ap=T.start+i*T.step,s=back((t-ap)/.5);
      const focus=Math.max(Math.exp(-i*i*.35),Math.exp(-(i-nw)*(i-nw)*.5));
      let flat=.12+.88*focus;flat=flat+(.16+.4*Math.max(Math.exp(-i*i*.5),Math.exp(-(N-1-i)*(N-1-i)*.5))-flat)*fill;
      o.g.visible=t>ap&&fade>.002;o.sp.visible=o.g.visible;
      o.g.scale.set(Math.max(.001,s),1,Math.max(.001,s*flat));
      o.g.position.y=i*SP-(1-Math.min(1,s))*.7;
      const isNew=cl(1-(t-ap)/.9);o.lm.color.setRGB(1,1-.35*isNew,1-.75*isNew);
      o.lm.opacity=fade;o.fm.opacity=.62*fill*fade;
      o.sp.material.opacity=eo((t-ap-.2)/.35)*fade;
      o.sp.position.y=o.g.position.y-.12;
    });
    this.cards.forEach((c,i)=>{
      const st=T.flyA+i*T.flyStep,p=eo((t-st)/T.flyDur),pp=io((t-st)/T.flyDur);
      c.g.visible=t>st;if(!c.g.visible)return;
      const sy=i*SP;
      c.g.position.set(SX+(c.tx-SX)*pp,sy+(c.ty-sy)*pp+Math.sin(t*.8+i)*.04*pp,c.z*pp);
      c.g.rotation.set(-Math.PI/2*(1-pp),0,c.rz*pp);
      const sc=.45+.55*pp;c.g.scale.set(sc,sc,1);
      const o=cl((t-st)/.35);c.bd.material.opacity=o;c.im.material.opacity=o;
    });
    this.renderer.render(this.scene,this.camera);return true}
}

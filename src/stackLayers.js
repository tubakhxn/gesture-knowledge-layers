// dev/creator=tubakhxn
import * as THREE from 'three';
import {LAYERS} from './knowledgeData.js';
export const GAP=1.15, CY=(LAYERS.length-1)*GAP/2;
const mono='"Courier New",Courier,monospace';
function tex(c){const t=new THREE.CanvasTexture(c);t.anisotropy=4;t.colorSpace=THREE.SRGBColorSpace;return t}
function wrap(x,text,px,y,w,lh){let l='';for(const wd of text.split(' ')){const t=l+wd+' ';if(x.measureText(t).width>w&&l){x.fillText(l,px,y);y+=lh;l=wd+' '}else l=t}x.fillText(l,px,y);return y+lh}
function label(t){const c=document.createElement('canvas');c.width=560;c.height=64;const x=c.getContext('2d');x.fillStyle='#fff';x.font='bold 34px '+mono;x.textBaseline='middle';x.fillText(t,6,34);return tex(c)}
function panel(i,mode){const L=LAYERS[i],c=document.createElement('canvas');c.width=560;c.height=420;const x=c.getContext('2d');
  x.fillStyle='#fff';x.font='bold 22px '+mono;x.fillText('LAYER '+String(i+1).padStart(2,'0')+': '+L.t.toUpperCase(),10,30);
  x.font='21px '+mono;
  if(mode==='d')wrap(x,L.d,10,72,540,30);
  else{x.fillStyle='#ffb21f';x.font='bold 18px '+mono;x.fillText('RELATED CONCEPTS',10,70);x.fillStyle='#fff';x.font='22px '+mono;L.c.forEach((k,j)=>x.fillText('+ '+k,10,108+j*34))}
  return tex(c)}
export class StackLayers{
  constructor(scene){
    scene.background=new THREE.Color(0x000000);
    this.root=new THREE.Group();this.root.position.x=-4.2;scene.add(this.root);
    this.items=LAYERS.map((L,i)=>{
      const g=new THREE.Group();this.root.add(g);
      const geo=new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-2,0,0),new THREE.Vector3(0,.75,0),new THREE.Vector3(2,0,0),new THREE.Vector3(0,-.75,0)]);
      const line=new THREE.LineLoop(geo,new THREE.LineBasicMaterial({color:0xffffff,transparent:true}));g.add(line);
      const lab=new THREE.Sprite(new THREE.SpriteMaterial({map:label(L.t),transparent:true,depthTest:false}));lab.scale.set(4.4,.5,1);lab.position.set(2.45+2.2,-.35,0);g.add(lab);
      const mk=m=>{const s=new THREE.Sprite(new THREE.SpriteMaterial({map:panel(i,m),transparent:true,opacity:0,depthTest:false}));s.scale.set(3.9,2.92,1);s.position.set(10.2,CY,0);scene.add(s);s.parent.remove(s);this.root.add(s);return s};
      return {g,line,lab,d:mk('d'),c:mk('c')};
    });
    const pa=[];for(let k=0;k<50;k++)pa.push((Math.random()-.5)*6,Math.random()*CY*2,(Math.random()-.5)*3);
    const pg=new THREE.BufferGeometry();pg.setAttribute('position',new THREE.Float32BufferAttribute(pa,3));
    this.pts=new THREE.Points(pg,new THREE.PointsMaterial({color:0xff7a1a,size:.09,transparent:true,opacity:.8}));this.root.add(this.pts);
    this.cA=new THREE.Color(0xffffff);this.cB=new THREE.Color(0xff9a1f);this.cY=new THREE.Color(0xffd23f);
  }
  update(t,dt,s,open,pinch){
    this.items.forEach((o,i)=>{
      const dd=i-s.pos,f=Math.exp(-dd*dd*1.3),ad=Math.abs(dd);
      const flat=.1+.9*Math.exp(-dd*dd*.3)+Math.sin(t*.5+i)*.02;
      o.line.scale.y=flat;
      o.g.position.y=i*GAP+Math.sign(dd)*open*1.1*(1-Math.exp(-ad*2))+Math.sin(t*.4+i*.7)*.04;
      o.g.position.z=f*pinch*1.6;o.g.scale.setScalar(1+pinch*f*.1);
      o.line.material.color.copy(this.cA).lerp(this.cB,f);
      o.line.material.opacity=.4+.6*f;
      o.lab.material.color.copy(this.cA).lerp(this.cY,f);o.lab.material.opacity=.55+.45*f;
      o.d.material.opacity=Math.max(0,pinch*f);o.c.material.opacity=Math.max(0,open*f);
      o.d.position.y=o.c.position.y=s.pos*GAP+ (o.d.position.y*0); 
    });
    this.pts.rotation.y=t*.05;
  }
}

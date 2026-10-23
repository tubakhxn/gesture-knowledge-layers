// dev/creator=tubakhxn
import './style.css';
import * as THREE from 'three';
import {createScene} from './scene.js';
import {KnowledgeLayers,SPACING} from './knowledgeLayers.js';
import {LAYERS} from './knowledgeData.js';
import {startCamera} from './camera.js';
import {HandTracker} from './handTracker.js';
import {GestureEngine} from './gestureEngine.js';
import {Interaction} from './interaction.js';
import {Intro} from './intro.js';
const $=id=>document.getElementById(id);
const {renderer,scene,camera}=createScene($('stage'));
const kl=new KnowledgeLayers(scene);
const intro=new Intro($('intro'),kl.imgs,()=>kl.restart());
const engine=new GestureEngine(LAYERS.length),inter=new Interaction(engine);
const list=$('list');LAYERS.forEach(L=>{const li=document.createElement('li');li.textContent=L.t;list.appendChild(li)});
const items=[...list.children];let activeIdx=-1;
const tracker=new HandTracker(),video=$('video'),status=$('status'),tip=$('tip');
const LABEL={point:'up / down',pinch:'select',open:'expand',relaxed:'relaxed',none:''};
(async()=>{
  try{await startCamera(video);status.textContent='loading hand model…';await tracker.init();status.textContent='show your hand';}
  catch(e){console.warn(e);status.textContent='no camera: use ↑ ↓ / wheel, hold O or P'}
})();
const FITW=10,CAMX=.15,LOOKY=3.0;
let last=performance.now();
intro.start(performance.now());
$('replay').addEventListener('click',()=>intro.start(performance.now()));
addEventListener('keydown',e=>{if(e.key==='r'||e.key==='R')intro.start(performance.now())});
function frame(now){
  const dt=Math.min(.05,(now-last)/1000);last=now;const t=now/1000;
  const raw=tracker.detect(video,now);
  const s=engine.update(raw,now);
  inter.update(s,dt);
  if(s.present&&s.pose!=='none'){tip.style.opacity=1;tip.style.left=(1-s.tip.x)*100+'%';tip.style.top=(6.5+s.tip.y*93.5)+'%';tip.querySelector('span').textContent=LABEL[s.pose]}else tip.style.opacity=0;
  if(s.present)status.textContent=s.pose;
  const tn=Math.tan(THREE.MathUtils.degToRad(camera.fov/2)),d=FITW/(2*tn*camera.aspect);
  camera.position.set(CAMX,2.7+d*.17,d);camera.lookAt(CAMX,LOOKY,0);
  kl.update(t,dt,s,inter.open,inter.pinch);
  const a=Math.round(s.pos);if(a!==activeIdx){activeIdx=a;items.forEach((el,i)=>el.classList.toggle('on',i===a))}
  if(intro.active)intro.update(now);
  renderer.render(scene,camera);requestAnimationFrame(frame);
}
requestAnimationFrame(frame);

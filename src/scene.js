// dev/creator=tubakhxn
import * as THREE from 'three';
export function createScene(el){
  const renderer=new THREE.WebGLRenderer({antialias:true,alpha:true});
  renderer.setPixelRatio(Math.min(2,devicePixelRatio));renderer.setClearColor(0x000000,0);
  el.appendChild(renderer.domElement);
  const scene=new THREE.Scene();
  const camera=new THREE.PerspectiveCamera(35,1,.1,200);
  const resize=()=>{const w=el.clientWidth,h=el.clientHeight;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix()};
  addEventListener('resize',resize);resize();
  return {renderer,scene,camera};
}

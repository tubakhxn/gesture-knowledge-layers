// dev/creator=tubakhxn
class OneEuro{constructor(mc=3,beta=3){this.mc=mc;this.b=beta;this.x=null;this.dx=0}
  a(c,dt){const r=2*Math.PI*c*dt;return r/(r+1)}
  f(v,dt){if(this.x===null){this.x=v;return v}
    const d=(v-this.x)/dt;this.dx+=this.a(1,dt)*(d-this.dx);
    this.x+=this.a(this.mc+this.b*Math.abs(this.dx),dt)*(v-this.x);return this.x}}
const D=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y);
const GAIN=9;
const clampN=(v,a,b)=>Math.max(a,Math.min(b,v));
export class GestureEngine{
  constructor(n=10){this.n=n;this.fl=Array.from({length:63},()=>new OneEuro());
    this.s={present:false,pose:'none',pos:0,nv:0,px:0,zoom:0,tip:{x:.5,y:.5}};
    this.cand='none';this.candT=0;this.pose='none';this.lostT=0;this.tm=0;this.pinchOn=false;
    this.anchorY=null;this.anchorIdx=0;this.idx=0;this.cool=0;this.vx=0;this.pmx=null;this.detTm=0;
    this.vy=0;this.prevIdx=0;this.wasPoint=false;this.sv=0}
  nudge(dl){this.idx=clampN(Math.round(this.idx)+Math.sign(dl),0,this.n-1)}
  update(raw,now){
    const dt=Math.max(.001,Math.min(.1,(now-(this.tm||now-16))/1000));this.tm=now;const s=this.s;
    if(raw===null){this.lostT+=dt;if(this.lostT>.5){s.present=false;this.pose='none';this.cand='none';s.pose='none';this.anchorY=null}}
    else if(raw){
      const ddt=Math.max(.008,Math.min(.1,(now-(this.detTm||now-33))/1000));this.detTm=now;
      this.lostT=0;s.present=true;
      const lm=raw.map((p,i)=>({x:this.fl[i*3].f(p.x,ddt),y:this.fl[i*3+1].f(p.y,ddt),z:this.fl[i*3+2].f(p.z,ddt)}));
      const size=D(lm[0],lm[9])||.1,pr=D(lm[4],lm[8])/size;
      this.pinchOn=this.pinchOn?pr<.5:pr<.32;
      const ext=[[8,6],[12,10],[16,14],[20,18]].map(([t,p])=>D(lm[t],lm[0])>D(lm[p],lm[0])*1.1);
      let rp='relaxed';
      if(this.pinchOn)rp='pinch';
      else if(ext.every(Boolean))rp='open';
      else if(ext[0]&&!ext[2]&&!ext[3])rp='point';
      if(rp!==this.cand){this.cand=rp;this.candT=0}else this.candT+=ddt;
      if(this.cand!==this.pose&&this.candT>=(this.cand==='point'?.06:.25))this.pose=this.cand;
      s.pose=this.pose;s.tip={x:lm[8].x,y:lm[8].y};
      s.px+=((1-lm[9].x-.5)*2-s.px)*Math.min(1,ddt*4);
      s.zoom+=(Math.max(-1,Math.min(1,(size-.16)*8))-s.zoom)*Math.min(1,ddt*3);
      if(this.pose==='point'){
        this.cool=Math.max(0,this.cool-ddt);
        const mx=1-raw[8].x;if(this.pmx===null)this.pmx=mx;
        this.vx+=(((mx-this.pmx)/ddt)-this.vx)*Math.min(1,ddt*12);this.pmx=mx;
        if(this.anchorY===null){this.anchorY=lm[8].y;this.anchorIdx=this.idx}
        if(this.cool===0&&Math.abs(this.vx)>1.1){
          this.idx=clampN(Math.round(this.idx)+Math.sign(this.vx),0,this.n-1);this.cool=.35;this.vx=0;this.anchorY=lm[8].y;this.anchorIdx=this.idx;
        }else if(this.cool>0){this.anchorY=lm[8].y;this.anchorIdx=this.idx}
        else{
          this.idx=clampN(this.anchorIdx+(this.anchorY-lm[8].y)*GAIN,0,this.n-1)}
        this.vy+=(((this.idx-this.prevIdx)/ddt)-this.vy)*Math.min(1,ddt*10);this.prevIdx=this.idx;
        if(Math.abs(this.vy)<.5)this.still=(this.still||0)+ddt;else this.still=0;
        if(this.still>.25&&Math.abs(this.idx-Math.round(this.idx))>.001){this.idx=Math.round(this.idx);this.anchorY=lm[8].y;this.anchorIdx=this.idx;this.prevIdx=this.idx}
        this.wasPoint=true;
      }else{
        this.anchorY=null;this.pmx=null;this.vx=0;
      }
    }
    if(this.pose!=='point'){
      if(this.wasPoint){this.idx=clampN(Math.round(this.idx+this.vy*.14),0,this.n-1);this.wasPoint=false;this.vy=0;this.prevIdx=this.idx}
      else this.idx=clampN(Math.round(this.idx),0,this.n-1);
    }
    const st=this.pose==='point'?.07:.16,om=2/st,x=om*dt,e=1/(1+x+.48*x*x+.235*x*x*x);
    const ch=s.pos-this.idx,tmp=(this.sv+om*ch)*dt;this.sv=(this.sv-om*tmp)*e;
    s.pos=clampN(this.idx+(ch+tmp)*e,0,this.n-1);s.nv=this.sv;
    if(Math.abs(this.idx-s.pos)<.0005&&Math.abs(this.sv)<.005){s.pos=this.idx;this.sv=0}
    return s}
}

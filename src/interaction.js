// dev/creator=tubakhxn
export class Interaction{
  constructor(engine){this.e=engine;this.open=0;this.pinch=0;this.keyOpen=false;this.keyPinch=false;
    addEventListener('keydown',ev=>{if(ev.key==='ArrowUp')engine.nudge(1.2);if(ev.key==='ArrowDown')engine.nudge(-1.2);if(ev.key==='ArrowRight')engine.nudge(1);if(ev.key==='ArrowLeft')engine.nudge(-1);if(ev.key==='o')this.keyOpen=true;if(ev.key==='p')this.keyPinch=true});
    addEventListener('keyup',ev=>{if(ev.key==='o')this.keyOpen=false;if(ev.key==='p')this.keyPinch=false});
    addEventListener('wheel',ev=>engine.nudge(-Math.sign(ev.deltaY)*.9),{passive:true});}
  update(s,dt){
    const to=(s.pose==='open'||this.keyOpen)?1:0,tp=(s.pose==='pinch'||this.keyPinch)?1:0;
    const k=1-Math.exp(-dt*3.2);this.open+=(to-this.open)*k;this.pinch+=(tp-this.pinch)*k;}
}

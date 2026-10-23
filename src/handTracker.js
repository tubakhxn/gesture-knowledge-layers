// dev/creator=tubakhxn
import {FilesetResolver,HandLandmarker} from '@mediapipe/tasks-vision';
export class HandTracker{
  async init(){
    const fs=await FilesetResolver.forVisionTasks('https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/wasm');
    const model='https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task';
    const mk=d=>HandLandmarker.createFromOptions(fs,{baseOptions:{modelAssetPath:model,delegate:d},runningMode:'VIDEO',numHands:1,minHandDetectionConfidence:.6,minTrackingConfidence:.6});
    try{this.lm=await mk('GPU')}catch(e){this.lm=await mk('CPU')}
    this.last=-1;}
  detect(video,now){
    if(!this.lm||video.readyState<2||video.currentTime===this.last)return undefined;
    this.last=video.currentTime;
    const r=this.lm.detectForVideo(video,now);
    return r.landmarks&&r.landmarks[0]||null;}
}

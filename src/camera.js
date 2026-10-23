// dev/creator=tubakhxn
export async function startCamera(video){
  const s=await navigator.mediaDevices.getUserMedia({video:{width:{ideal:640},height:{ideal:480},frameRate:{ideal:60},facingMode:"user"},audio:false});
  video.srcObject=s;await video.play();return s;}

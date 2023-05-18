const previewEle = document.getElementById('preview');
const btn = document.getElementById('start');
const chunks = [];

async function startRecord() {
  previewEle.srcObject = await navigator.mediaDevices.getDisplayMedia({
    video: true,
    audio: true,
  });

  const mediaRecorder = new MediaRecorder(previewEle.srcObject);
  mediaRecorder.ondataavailable = function (event) {
    chunks.push(event.data);
  };
  mediaRecorder.onstop = function () {
    const blob = new Blob(chunks, { type: 'video/mp4' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'recorded-video.mp4';
    document.body.appendChild(a);
    a.click();
  };
  mediaRecorder.start();
  setTimeout(() => {
    mediaRecorder.stop();
  }, 5000000000000); //stop recording after 5 seconds
  console.log("the record is started");
}

btn.addEventListener('click', startRecord);
// hello all thi


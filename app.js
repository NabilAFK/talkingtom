let mic,
  recorder,
  soundFile,
  recording = false,
  sensitivity = 0.5;
window.onload = function(){
  swal(
    "To use Talking Tom Web, you need to allow microphone to record your voice."
  ).then((e) => {
    mic = new p5.AudioIn();
    mic.start();
    recorder = new p5.SoundRecorder();
    recorder.setInput(mic);
    soundFile = new p5.SoundFile();
    
  });
}
function setup() {
  frameRate(10);
}
function draw() {
  if (!soundFile.isPlaying() && !recording) {
    document.querySelector(".mouth").style.animation = "";
    document.querySelector(".stat").innerHTML = "Say something...";
  }
  if (mic.getLevel() * 100 > sensitivity) {
    if (!soundFile.isPlaying() && !recording) {
      document.querySelector(".stat").innerHTML = "Listening...";
      recorder.record(soundFile);
      recording = true;
      document.querySelector(".mouth").style.animation = "";
    }
  } else {
    if (!soundFile.isPlaying() && recording) {
      recorder.stop();
      setTimeout(() => {
        soundFile.amp(1);
        soundFile.rate(1.4);
        soundFile.play();
        document.querySelector(".mouth").style.animation =
          "mouthanime .3s infinite";
        document.querySelector(".stat").innerHTML = "Speaking...";
      }, 0);
      recording = false;
    }
  }
  console.log(recording);
}

document.querySelector(".sensitivity").addEventListener("input", (e) => {
  console.log(document.querySelector(".sensitivity").value);
  sensitivity = document.querySelector(".sensitivity").value;
});

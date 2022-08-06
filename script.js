const myAudio = document.getElementById("myAudio");
const musicSpan = document.querySelector(".music");
const timeSpan = document.querySelector(".time");
const btnPlay = document.getElementById("btnPlay");

btnPlay.addEventListener("click", audioPlayPause);

function audioPlayPause() {
    if (btnPlay.innerText === "Play") {
        myAudio.play();
        btnPlay.innerText = "Pause";
    }
    else {
        myAudio.pause();
        btnPlay.innerText = "Play";
    }
}


let interval_id;
let pauseTime = getRandomInt(20, 30);

myAudio.onplay = ()=> {
    musicSpan.style.visibility = "visible";

    interval_id = setInterval(() => {
        if (Math.floor(myAudio.currentTime) === pauseTime){
            myAudio.pause();
            pauseTime += getRandomInt(20, 30);
            btnPlay.innerText = "Play";
        }
        if (Math.floor(myAudio.currentTime) === Math.floor(myAudio.duration) -1){
            pauseTime = getRandomInt(20, 30);
        }
        
        
        
        timeSpan.innerText = TimeAsSecs(myAudio.currentTime);
        
    }, 1000);
    
}


myAudio.onpause = ()=> {
    clearInterval(interval_id);
    musicSpan.style.visibility = "hidden";
}

function TimeAsSecs(secs) {
    var hr = Math.floor(secs / 3600);
    var min = Math.floor((secs - hr * 3600) / 60);
    var sec = Math.floor(secs - hr * 3600 - min * 60);

    if (min < 10){
        min = "0" + min;
    }
    if (sec < 10) {
        sec = "0" + sec;
    }
    return min + ":" + sec;

}

// Random number generate 
function getRandomInt(min, max){
    return Math.floor(Math.random() * (max - min)) + min;
}
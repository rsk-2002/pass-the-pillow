const myAudio = document.getElementById("myAudio");
const musicSpan = document.querySelector(".music");
const timeSpan = document.querySelector(".time");
const btnPlay = document.getElementById("btnPlay");
const radios = document.querySelectorAll(".lang-choice");
const autoPauseCheck = document.getElementById("autoPauseInput");

btnPlay.addEventListener("click", audioPlayPause);

autoPauseCheck.addEventListener("change", ()=> {
    if(autoPauseCheck.checked){
        pauseTime = Math.floor(audioFile.currentTime) + getRandomInt(25, 35);
    }
})

myAudio.src = `english.mp3`;

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


// 
radios.forEach((radio) => {
    radio.addEventListener("click", (e) => {
        timeSpan.innerText = "00:00";
        myAudio.src = `${e.target.value}.mp3`;
        pauseTime = getRandomInt(25, 35);
    })
})


let interval_id;
let pauseTime = getRandomInt(25, 35);

myAudio.onplay = ()=> {
    myAudio.volume = 0.6;
    autoPauseCheck.setAttribute("disabled", "true");
    radios.forEach((radio) => {
        radio.setAttribute("disabled", "true");
    })
    musicSpan.style.visibility = "visible";

    interval_id = setInterval(() => {
        if (autoPauseCheck.checked) {
            if (Math.floor(myAudio.currentTime) === pauseTime) {
                myAudio.pause();
                pauseTime += getRandomInt(25, 35);
                btnPlay.innerText = "Play";
            }
            if (Math.floor(myAudio.currentTime) === Math.floor(myAudio.duration) - 1) {
                pauseTime = getRndInteger(25, 35);
            }
        }


        timeSpan.innerText = TimeAsSecs(myAudio.currentTime);
        
    }, 1000);
    
}


myAudio.onpause = ()=> {
    clearInterval(interval_id);
    musicSpan.style.visibility = "hidden";
    
    autoPauseCheck.removeAttribute("disabled");
    radios.forEach((radio) => {
        radio.removeAttribute("disabled");
    })
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
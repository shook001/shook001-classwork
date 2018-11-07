var timeLimit, timerStart, currentDot;
var timer = document.getElementById('timer');
var playingField = document.getElementById('playingField');
const maxTimeLimit = 10;
const initialState = "Start";
const restartState = "Quit";
const second_interval = 1000;
const dotsPerLevel = 10;

function play(playButton){
    if(playButton.innerHTML === initialState){
        playButton.innerHTML = restartState;
        timeLimit = maxTimeLimit;
        currentDot = 1;
        removeDots();
        addDots();
        timerStart = setInterval(time, second_interval);
    }
    else{
        playButton.innerHTML = initialState;
        clearInterval(timerStart);
        setTimeLimit();
    }
}

function time(){
    timeLimit--;
    if(timeLimit >= 0){
        timer.innerHTML = timeLimit;
    }
    else{
        alert("You Lost!");
        clearInterval(timerStart);
    }
}

function setTimeLimit(){
    timer.innerHTML = maxTimeLimit;
}

function addDots(){
    for(var num = 1; num <= dotsPerLevel; num++){
        var dot = document.createElement('div');
        dot.className="dot";
        dot.id = "dot"+num;
        dot.innerHTML = num;
        dot.onclick = verify;
        playingField.append(dot);
    }
}

function removeDots(){
    if(playingField.children.length > 0){
        for(var num = 1; num <= dotsPerLevel; num++){
            var dot = document.getElementById("dot"+num);
            playingField.removeChild(dot);
        }
    }
}

function verify(element){
    if(currentDot == element.srcElement.innerHTML){
        element.srcElement.className = "correct-dot";
        if(currentDot === dotsPerLevel && timer.innerHTML !== "0" )
            alert("You Won!");
        currentDot++;
    }
    else
    {
        if(element.srcElement.className !== "correct-dot")
            element.srcElement.className = "incorrect-dot";
    }
}
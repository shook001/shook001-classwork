var timeLimit, timerStart, currentDot, progress;
var timer = document.getElementById('timer');
var playingField = document.getElementById('playingField');
const maxTimeLimit = 10;
const second_interval = 1000;
const dotsPerLevel = 10;
var stateDefault = { level: 1 };
var localStore = JSON.parse(localStorage.getItem('state'));

var state = ( localStore === null) ? stateDefault : localStore; 

function play(){
    $('#level').html(state.level);
    currentDot = 1;
    timeLimit = maxTimeLimit;
    progress = 100;
    addDots();
    timerStart = setInterval(time, second_interval);
}

function time(){
    timeLimit--;
    if(timeLimit >= 0){
        //updating the progress bar 
        $( "#gameBarProgress" ).css('width',(progress+'%'));
        if(progress <= 66 && progress > 33 ){
            $( "#gameBarProgress" ).removeClass('bg-success');
            $( "#gameBarProgress" ).addClass('bg-warning');
        }
        else if( progress <= 33 ){
            $( "#gameBarProgress" ).removeClass('bg-warning');
            $( "#gameBarProgress" ).addClass('bg-danger');
        }
        else if(progress === 100)
        {
            $( "#gameBarProgress" ).removeClass('bg-warning');
            $( "#gameBarProgress" ).removeClass('bg-danger');
            $( "#gameBarProgress" ).addClass('bg-success');
        }
        progress = progress - maxTimeLimit;
    }
    else{
        alert("You Lost!");
        clearInterval(timerStart);
    }
}

function addDots(){
    for(var num = 1; num <= dotsPerLevel; num++){
        var dot = document.createElement('div');
        var random = Math.random( ); 
        dot.className="dot";
        dot.id = "dot"+num + random;
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
    if(timeLimit > 0)
    {
        if(currentDot == element.srcElement.innerHTML){
            element.srcElement.className = "correct-dot";
            if(currentDot === dotsPerLevel && timeLimit !== 0 )
            {
                setTimeout(function() { 
                    alert("Go to next level!");
                    play(); 
                }, 500);
                state.level++;
                localStorage.setItem('state', JSON.stringify(state));
                clearInterval(timerStart);
                removeDots();
                timeLimit = maxTimeLimit;
                progress = 100;
                time();
            }
            currentDot++;
        }
        else
        {
            if(element.srcElement.className !== "correct-dot")
                element.srcElement.className = "incorrect-dot";
        }
    }
}

/*
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
*/
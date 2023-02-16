let countdown;

const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

function timer(seconds){
    // clear any existing timer 
    clearInterval(countdown)


    const now = Date.now();
    const then = now + seconds * 1000
    displayTimeLeft(seconds)
    displayEndTime(then)
    countdown = setInterval(()=>{
        const secondsLeft = Math.round((then - Date.now())/1000);
        //check if we should stop it
        if(secondsLeft < 0){
            clearInterval(countdown);
            return;
        }
        //display it
        displayTimeLeft(secondsLeft);
    },1000)
}

function displayTimeLeft(seconds){
    const minutes = Math.floor(seconds/60);
    const remaindersSeconds = seconds %60;
    const display = `${minutes}:${remaindersSeconds < 10 ? '0' : ''}${remaindersSeconds}`
    timerDisplay.textContent = display;
    document.title = display;
}

function displayEndTime(timeStamp){
    const end = new Date(timeStamp);
    const hour = end.getHours();
    
    const minutes = end.getMinutes();

    endTime.textContent = `Be back at ${hour}:${minutes}`

    // ------------- Can be use if u dont want 24h display at clock ---------------
    //const adjustedHours = hour > 10 ? hour - 12 : hour;
    //endTime.textContent = `Be back at ${adjustedHours}:${minutes < 10 ? '0':''}${minutes}`
}

function startTimer(){
    const seconds = parseInt(this.dataset.time)
    timer(seconds);
}

buttons.forEach(button => button.addEventListener('click', startTimer));
document.customForm.addEventListener('submit', function(e){
    e.preventDefault();
    const mins = this.minutes.value;
    timer(mins * 60);
    this.reset();
})
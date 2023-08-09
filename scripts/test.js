function checkTime(i){
    if (i < 10) {i = "0"+ i };
    return i;
}
function countTo(timeObject){
    let endTime = new Date(timeObject).getTime();   
    let now = new Date().getTime();
    let timeleft = endTime - now;

    if (timeleft < 0){
        throw new RangeError("Time has already passed");
    }


    let days = Math.floor(timeleft / (1000*60*60*24));
    let hours = Math.floor((timeleft % (1000*60*60*24)) / (1000*60*60));
    let minutes = Math.floor((timeleft % (1000*60*60)) / (1000*60));
    let seconds = Math.floor((timeleft % (1000*60)) / 1000);


    return[days, hours, minutes, seconds];
}
const now = new Date();
const todayDate = now.getDate(); //day as a numeric value ex. the 8th of x month
const todayYear = now.getFullYear();
const todayMonth = now.getMonth();

const schedule = [
    {period:"0",periodStart: new Date(todayYear,todayMonth,todayDate,6,55,0,0).getTime(),periodEnd: new Date(todayYear,todayMonth,todayDate,7,45,0,0).getTime()},
    {period:"1",periodStart: new Date(todayYear,todayMonth,todayDate,7,50,0,0).getTime(),periodEnd: new Date(todayYear,todayMonth,todayDate,8,40,0,0).getTime()},
    {period:"2",periodStart: new Date(todayYear,todayMonth,todayDate,8,44,0,0).getTime(),periodEnd: new Date(todayYear,todayMonth,todayDate,9,34,0,0).getTime()},
    {period:"3",periodStart: new Date(todayYear,todayMonth,todayDate,9,38,0,0).getTime(),periodEnd: new Date(todayYear,todayMonth,todayDate,10,28,0,0).getTime()},
    {period:"4",periodStart: new Date(todayYear,todayMonth,todayDate,10,32,0,0).getTime(),periodEnd: new Date(todayYear,todayMonth,todayDate,11,22,0,0).getTime()},
    {period:"5",periodStart: new Date(todayYear,todayMonth,todayDate,11,26,0,0).getTime(),periodEnd: new Date(todayYear,todayMonth,todayDate,12,20,0,0).getTime()}, 
    {period:"C",periodStart: new Date(todayYear,todayMonth,todayDate,12,24,0,0).getTime(),periodEnd: new Date(todayYear,todayMonth,todayDate,12,49,0,0).getTime()},
    {period:"6",periodStart: new Date(todayYear,todayMonth,todayDate,12,53,0,0).getTime(),periodEnd: new Date(todayYear,todayMonth,todayDate,13,43,0,0).getTime()},
    {period:"7",periodStart: new Date(todayYear,todayMonth,todayDate,13,47,0,0).getTime(),periodEnd: new Date(todayYear,todayMonth,todayDate,14,37,0,0).getTime()}
]
function countdown() {
    try {
        let [days, hours, minutes, seconds] = countTo(schedule[1].periodEnd);
        hours = checkTime(hours);
        minutes = checkTime(minutes);
        seconds = checkTime(seconds);
        console.log(hours + ":" + minutes + ":" + seconds);
        setTimeout(countdown, 1000);
    } catch (error) {
        if (error instanceof RangeError) {
            console.log("Reached Range Error");
            setTimeout(countdown, 1000);
        } else {
            throw error;
        }
    }
}

countdown();


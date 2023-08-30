//initalize date
function startTime() {
    const today = new Date();
    let h = today.getHours();
    let m = today.getMinutes();
    let s = today.getSeconds();
    h = tweleveHour(h);
    m = checkTime(m);
    s = checkTime(s);

    document.getElementById('time').innerHTML = h + ":" + m + ":" + s;
    setTimeout(startTime, 1000);
}
function checkTime(i){
    if (i < 10) {i = "0"+ i };
    return i;
}
function tweleveHour(h){
    if (h > 12) {h = h-12};
    return h
}


//background customization functions
function backgroundColorChange(){
    if (!localStorage.getItem("bgColor")){
        inheritColorSelectionBg();
    }
    else {
        document.body.style.backgroundColor = localStorage.getItem("bgColor");
        document.getElementById("backgroundColorInput").setAttribute("value",localStorage.getItem("bgColor"));
        updateNotepads();
    }
}
function inheritColorSelectionBg(){
    localStorage.setItem("bgColor", document.getElementById("backgroundColorInput").value);
    document.body.style.backgroundColor = localStorage.getItem("bgColor");
    updateNotepads();
}


//text color customization functions
function textColorChange(){
    if (!localStorage.getItem("txtColor")){
        inheritColorSelectionTxt();
    }
    else {
        updateText();
        document.getElementById("textColorInput").setAttribute("value",localStorage.getItem("txtColor"));
        updateNotepads();
    }
}
function inheritColorSelectionTxt(){
    localStorage.setItem("txtColor", document.getElementById("textColorInput").value);
    updateText();
    updateNotepads(); 
}
function updateText(){
    color = localStorage.getItem("txtColor")
    const textElements = document.getElementsByClassName("content");
    for (var i = 0; i < textElements.length; i++){
        textElements[i].style.color = color;
    }
}


//misc functions
function faviconSelector(){
    let today = new Date();
    let date = String(today.getDate());
    const favicon = document.getElementById("favicon");
    favicon.setAttribute("href",`/assets/img/date_icons/${date}.png`);
}
function settingsClick(){
    const settingsList = document.getElementsByClassName("options");
    for (let i = 0; i < settingsList.length; i++){
    
        if (settingsList[i].style.visibility === "hidden" || settingsList[i].style.visibility === ""){

            settingsList[i].style.visibility = "visible";
            
        }
        else{
            (settingsList[i].style.visibility = "hidden")
            if ((i+1) == (settingsList.length)){
            }
    }

    }
}
function saveLunch(){
    localStorage.setItem("lunchPeriod",document.getElementById("lunchSelect").value);
    countdown();
}
function loadLunch(){
    document.getElementById("lunchSelect").value = localStorage.getItem("lunchPeriod");
}
function updateNotepads(){
    let notepads = document.getElementsByTagName("textarea");
    for (let i = 0; i < notepads.length; i++){
        notepads[i].style.background = localStorage.getItem("bgColor");
        notepads[i].style.color = localStorage.getItem("txtColor");
    }
}
function saveNotepad(notepadNumber){
    localStorage.setItem(`notepadData${notepadNumber}`, document.getElementById(`notepad${notepadNumber}`).value);
}
function loadNotepads(){
    for (let i = 0; i < 7; i++){
        document.getElementById(`notepad${i}`).value = localStorage.getItem(`notepadData${i}`);
    }
}


//countdown
function countdown(){
    const now = new Date();
    const todayDate = now.getDate(); //day as a numeric value ex. the 8th of x month
    const todayYear = now.getFullYear();
    const todayMonth = now.getMonth(); /* date format = year, month (0 = jan, 11 = dec), day (ex. 8th), hour, minute, second, millisecond*/

    const oneprideDates = ["7/30","8/13","8/20","8/27","9/18","9/25","10/8","10/15","10/29","11/13","0/17","0/24","0/31","1/14","1/21","1/28","2/13","2/20","3/17","3/24","4/8","4/15"];
    const plcDates = ["8/6","9/4","9/12","10/1","11/6","0/10","1/7","2/6","3/3","4/1"];
    let date = `${todayMonth}/${todayDate}`

    if (localStorage.getItem("lunchPeriod") == "a"){
        if (oneprideDates.includes(date)){
            window.schedule = [
                {period:"0",periodStart: new Date(todayYear,todayMonth,todayDate,6,55,4,0).getTime(),periodEnd: new Date(todayYear,todayMonth,todayDate,7,45,4,0).getTime()},
                {period:"1",periodStart: new Date(todayYear,todayMonth,todayDate,7,50,4,0).getTime(),periodEnd: new Date(todayYear,todayMonth,todayDate,8,31,4,0).getTime()},
                {period:"2",periodStart: new Date(todayYear,todayMonth,todayDate,8,35,4,0).getTime(),periodEnd: new Date(todayYear,todayMonth,todayDate,9,16,4,0).getTime()},
                {period:"3",periodStart: new Date(todayYear,todayMonth,todayDate,9,20,4,0).getTime(),periodEnd: new Date(todayYear,todayMonth,todayDate,10,1,4,0).getTime()},
                {period:"4",periodStart: new Date(todayYear,todayMonth,todayDate,10,5,4,0).getTime(),periodEnd: new Date(todayYear,todayMonth,todayDate,10,46,4,0).getTime()},
                {period:"OnePride",periodStart: new Date(todayYear,todayMonth,todayDate,10,50,4,0).getTime(),periodEnd: new Date(todayYear,todayMonth,todayDate,11,40,4,0).getTime()},
                {period:"A",periodStart: new Date(todayYear,todayMonth,todayDate,11,44,4,0).getTime(),periodEnd: new Date(todayYear,todayMonth,todayDate,12,11,4,0).getTime()},
                {period:"5",periodStart: new Date(todayYear,todayMonth,todayDate,12,15,4,0).getTime(),periodEnd: new Date(todayYear,todayMonth,todayDate,13,7,4,0).getTime()},
                {period:"6",periodStart: new Date(todayYear,todayMonth,todayDate,13,11,4,0).getTime(),periodEnd: new Date(todayYear,todayMonth,todayDate,13,52,4,0).getTime()},
                {period:"7",periodStart: new Date(todayYear,todayMonth,todayDate,13,56,4,0).getTime(),periodEnd: new Date(todayYear,todayMonth,todayDate,14,37,4,0).getTime()}
            ]
        }
        else if (plcDates.includes(date)){
            window.schedule = [
                {period:"0",periodStart: new Date(todayYear,todayMonth,todayDate,6,55,4,0).getTime(),periodEnd: new Date(todayYear,todayMonth,todayDate,7,45,4,0).getTime()},
                {period:"1",periodStart: new Date(todayYear,todayMonth,todayDate,7,50,4,0).getTime(),periodEnd: new Date(todayYear,todayMonth,todayDate,8,33,4,0).getTime()},
                {period:"2",periodStart: new Date(todayYear,todayMonth,todayDate,8,37,4,0).getTime(),periodEnd: new Date(todayYear,todayMonth,todayDate,9,20,4,0).getTime()},
                {period:"3",periodStart: new Date(todayYear,todayMonth,todayDate,9,24,4,0).getTime(),periodEnd: new Date(todayYear,todayMonth,todayDate,10,7,4,0).getTime()},
                {period:"4",periodStart: new Date(todayYear,todayMonth,todayDate,10,11,4,0).getTime(),periodEnd: new Date(todayYear,todayMonth,todayDate,10,54,4,0).getTime()},
                {period:"A",periodStart: new Date(todayYear,todayMonth,todayDate,10,58,4,0).getTime(),periodEnd: new Date(todayYear,todayMonth,todayDate,11,23,4,0).getTime()},
                {period:"5",periodStart: new Date(todayYear,todayMonth,todayDate,11,27,4,0).getTime(),periodEnd: new Date(todayYear,todayMonth,todayDate,12,21,4,0).getTime()},
                {period:"6",periodStart: new Date(todayYear,todayMonth,todayDate,12,25,4,0).getTime(),periodEnd: new Date(todayYear,todayMonth,todayDate,13,8,4,0).getTime()},
                {period:"7",periodStart: new Date(todayYear,todayMonth,todayDate,13,12,4,0).getTime(),periodEnd: new Date(todayYear,todayMonth,todayDate,13,55,4,0).getTime()}
            ]
            }
        else{
        window.schedule = [
                {period:"0",periodStart: new Date(todayYear,todayMonth,todayDate,6,55,4,0).getTime(),periodEnd: new Date(todayYear,todayMonth,todayDate,7,45,4,0).getTime()},
                {period:"1",periodStart: new Date(todayYear,todayMonth,todayDate,7,50,4,0).getTime(),periodEnd: new Date(todayYear,todayMonth,todayDate,8,40,4,0).getTime()},
                {period:"2",periodStart: new Date(todayYear,todayMonth,todayDate,8,44,4,0).getTime(),periodEnd: new Date(todayYear,todayMonth,todayDate,9,34,4,0).getTime()},
                {period:"3",periodStart: new Date(todayYear,todayMonth,todayDate,9,38,4,0).getTime(),periodEnd: new Date(todayYear,todayMonth,todayDate,10,28,4,0).getTime()},
                {period:"4",periodStart: new Date(todayYear,todayMonth,todayDate,10,32,4,0).getTime(),periodEnd: new Date(todayYear,todayMonth,todayDate,11,22,4,0).getTime()},
                {period:"A",periodStart: new Date(todayYear,todayMonth,todayDate,11,26,4,0).getTime(),periodEnd: new Date(todayYear,todayMonth,todayDate,11,51,4,0).getTime()},
                {period:"5",periodStart: new Date(todayYear,todayMonth,todayDate,11,55,4,0).getTime(),periodEnd: new Date(todayYear,todayMonth,todayDate,12,49,4,0).getTime()},
                {period:"6",periodStart: new Date(todayYear,todayMonth,todayDate,12,53,4,0).getTime(),periodEnd: new Date(todayYear,todayMonth,todayDate,13,43,4,0).getTime()},
                {period:"7",periodStart: new Date(todayYear,todayMonth,todayDate,13,47,4,0).getTime(),periodEnd: new Date(todayYear,todayMonth,todayDate,14,37,4,0).getTime()}
    ]
        }
    }
    else if(localStorage.getItem("lunchPeriod") == "c"){
        if (oneprideDates.includes(date)){
            window.schedule = [
                {period:"0",periodStart: new Date(todayYear,todayMonth,todayDate,6,55,4,0).getTime(),periodEnd: new Date(todayYear,todayMonth,todayDate,7,45,4,0).getTime()},
                {period:"1",periodStart: new Date(todayYear,todayMonth,todayDate,7,50,4,0).getTime(),periodEnd: new Date(todayYear,todayMonth,todayDate,8,31,4,0).getTime()},
                {period:"2",periodStart: new Date(todayYear,todayMonth,todayDate,8,35,4,0).getTime(),periodEnd: new Date(todayYear,todayMonth,todayDate,9,16,4,0).getTime()},
                {period:"3",periodStart: new Date(todayYear,todayMonth,todayDate,9,20,4,0).getTime(),periodEnd: new Date(todayYear,todayMonth,todayDate,10,1,4,0).getTime()},
                {period:"4",periodStart: new Date(todayYear,todayMonth,todayDate,10,5,4,0).getTime(),periodEnd: new Date(todayYear,todayMonth,todayDate,10,46,4,0).getTime()},
                {period:"OnePride",periodStart: new Date(todayYear,todayMonth,todayDate,10,50,4,0).getTime(),periodEnd: new Date(todayYear,todayMonth,todayDate,11,40,4,0).getTime()},
                {period:"5",periodStart: new Date(todayYear,todayMonth,todayDate,11,44,4,0).getTime(),periodEnd: new Date(todayYear,todayMonth,todayDate,12,36,4,0).getTime()},
                {period:"C",periodStart: new Date(todayYear,todayMonth,todayDate,12,40,4,0).getTime(),periodEnd: new Date(todayYear,todayMonth,todayDate,13,7,4,0).getTime()},
                {period:"6",periodStart: new Date(todayYear,todayMonth,todayDate,13,11,4,0).getTime(),periodEnd: new Date(todayYear,todayMonth,todayDate,13,52,4,0).getTime()},
                {period:"7",periodStart: new Date(todayYear,todayMonth,todayDate,13,56,4,0).getTime(),periodEnd: new Date(todayYear,todayMonth,todayDate,14,37,4,0).getTime()}
            ]
        }
        else if (plcDates.includes(date)){
            window.schedule = [
                {period:"0",periodStart: new Date(todayYear,todayMonth,todayDate,6,55,4,0).getTime(),periodEnd: new Date(todayYear,todayMonth,todayDate,7,45,4,0).getTime()},
                {period:"1",periodStart: new Date(todayYear,todayMonth,todayDate,7,50,4,0).getTime(),periodEnd: new Date(todayYear,todayMonth,todayDate,8,33,4,0).getTime()},
                {period:"2",periodStart: new Date(todayYear,todayMonth,todayDate,8,37,4,0).getTime(),periodEnd: new Date(todayYear,todayMonth,todayDate,9,20,4,0).getTime()},
                {period:"3",periodStart: new Date(todayYear,todayMonth,todayDate,9,24,4,0).getTime(),periodEnd: new Date(todayYear,todayMonth,todayDate,10,7,4,0).getTime()},
                {period:"4",periodStart: new Date(todayYear,todayMonth,todayDate,10,11,4,0).getTime(),periodEnd: new Date(todayYear,todayMonth,todayDate,10,54,4,0).getTime()},
                {period:"5",periodStart: new Date(todayYear,todayMonth,todayDate,10,58,4,0).getTime(),periodEnd: new Date(todayYear,todayMonth,todayDate,11,52,4,0).getTime()},
                {period:"C",periodStart: new Date(todayYear,todayMonth,todayDate,11,56,4,0).getTime(),periodEnd: new Date(todayYear,todayMonth,todayDate,12,21,4,0).getTime()},
                {period:"6",periodStart: new Date(todayYear,todayMonth,todayDate,12,25,4,0).getTime(),periodEnd: new Date(todayYear,todayMonth,todayDate,13,8,4,0).getTime()},
                {period:"7",periodStart: new Date(todayYear,todayMonth,todayDate,13,12,4,0).getTime(),periodEnd: new Date(todayYear,todayMonth,todayDate,13,55,4,0).getTime()}
            ]
            }
        window.schedule = [
                {period:"0",periodStart: new Date(todayYear,todayMonth,todayDate,6,55,4,0).getTime(),periodEnd: new Date(todayYear,todayMonth,todayDate,7,45,4,0).getTime()},
                {period:"1",periodStart: new Date(todayYear,todayMonth,todayDate,7,50,4,0).getTime(),periodEnd: new Date(todayYear,todayMonth,todayDate,8,40,4,0).getTime()},
                {period:"2",periodStart: new Date(todayYear,todayMonth,todayDate,8,44,4,0).getTime(),periodEnd: new Date(todayYear,todayMonth,todayDate,9,34,4,0).getTime()},
                {period:"3",periodStart: new Date(todayYear,todayMonth,todayDate,9,38,4,0).getTime(),periodEnd: new Date(todayYear,todayMonth,todayDate,10,28,4,0).getTime()},
                {period:"4",periodStart: new Date(todayYear,todayMonth,todayDate,10,32,4,0).getTime(),periodEnd: new Date(todayYear,todayMonth,todayDate,11,22,4,0).getTime()},
                {period:"5",periodStart: new Date(todayYear,todayMonth,todayDate,11,26,4,0).getTime(),periodEnd: new Date(todayYear,todayMonth,todayDate,12,20,4,0).getTime()}, 
                {period:"C",periodStart: new Date(todayYear,todayMonth,todayDate,12,24,4,0).getTime(),periodEnd: new Date(todayYear,todayMonth,todayDate,12,49,4,0).getTime()},
                {period:"6",periodStart: new Date(todayYear,todayMonth,todayDate,12,53,4,0).getTime(),periodEnd: new Date(todayYear,todayMonth,todayDate,13,43,4,0).getTime()},
                {period:"7",periodStart: new Date(todayYear,todayMonth,todayDate,13,47,4,0).getTime(),periodEnd: new Date(todayYear,todayMonth,todayDate,14,37,4,0).getTime()}
        ]
    }
    if (877 < (now.getHours()*60) + now.getMinutes()){
        let tommrrowStart = new Date(todayYear,todayMonth,todayDate+1,6,55,0,0)
        let [days, hours, minutes, seconds] = countTo(tommrrowStart);
            if (minutes < 0 && seconds < 0){
                clearInterval(countTo);
            }
            else{
                hours = checkTime(hours);
                minutes = checkTime(minutes);
                seconds = checkTime(seconds);
                document.getElementById('countdown').innerHTML = hours + ":"+ minutes + ":"+ seconds;
                document.getElementById('pageTitle').innerHTML = "LHSCD | " + hours+":"+minutes+":"+seconds;
                setTimeout(countdown, 1000);
            }
        }
    else if((now.getHours()*60)+now.getMinutes() < 415){
        let todayStart = new Date(todayYear,todayMonth,todayDate,6,55,0,0)
        let [days, hours, minutes, seconds] = countTo(todayStart);
            if (minutes < 0 && seconds < 0){
                clearInterval(countTo);
            }
            else{
                hours = checkTime(hours);
                minutes = checkTime(minutes);
                seconds = checkTime(seconds);
                document.getElementById('countdown').innerHTML = hours + ":"+ minutes + ":"+ seconds;
                document.getElementById('pageTitle').innerHTML = "LHSCD | " + hours+":"+minutes+":"+seconds;
                setTimeout(countdown, 1000);
            }
        }

    else if (new Date(schedule[Number(sessionStorage.getItem("period"))].periodEnd).getTime() < new Date(now).getTime() && new Date(now).getTime() < new Date(schedule[Number(sessionStorage.getItem("period")) + 1].periodStart).getTime()){
        try{
        let [days, hours, minutes, seconds] = countTo(schedule[Number(sessionStorage.getItem("period"))+1].periodStart);
            hours = checkTime(hours);
            minutes = checkTime(minutes);
            seconds = checkTime(seconds);
            document.getElementById('countdown').innerHTML = hours + ":"+ minutes + ":"+ seconds;
            document.getElementById('pageTitle').innerHTML = "LHSCD | " + hours+":"+minutes+":"+seconds;
            setTimeout(countdown, 1000);
        } catch (error){
            if (error instanceof RangeError) {
                sessionStorage.setItem("period", Number((Number(period))+1))
                setTimeout(countdown, 0);
            }
            else if (error instanceof ReferenceError){
                isWithinPeriod(schedule[0].periodStart,schedule[0].periodEnd,0);
            } 
            else if (error instanceof TypeError){
                location.reload();
                }
            else {
                throw error;
            }

        }
    }
    else{
        let period = sessionStorage.getItem("period")
        try {
            let [days, hours, minutes, seconds] = countTo(schedule[sessionStorage.getItem("period")].periodEnd);
            hours = checkTime(hours);
            minutes = checkTime(minutes);
            seconds = checkTime(seconds);
            document.getElementById('countdown').innerHTML = hours + ":"+ minutes + ":"+ seconds;
            document.getElementById('pageTitle').innerHTML = "LHSCD | " + hours+":"+minutes+":"+seconds;
            setTimeout(countdown, 1000);
        } catch (error) {
            if (error instanceof RangeError) {
                sessionStorage.setItem("period", Number((Number(period))+1));
                setTimeout(countdown, 0);
            }
            else if (error instanceof ReferenceError){
                isWithinPeriod(schedule[0].periodStart,schedule[0].periodEnd,0);
            } 
            else if (error instanceof TypeError){
                location.reload();
                }
            else {
                throw error;
            }
        }
      }
}


function isWithinPeriod(startTime,endTime, periodNumber){

    dateStartTime = new Date(startTime).getTime();
    dateEndTime = new Date(endTime).getTime();
    now = new Date();
    if(dateStartTime < now && dateEndTime > now){
        sessionStorage.setItem("period",Number(periodNumber));
        return
    }
    else{
        sessionStorage.setItem("period",Number(periodNumber+1));
        return;
    }

}
function countTo(timeObject) {
    let endTime = new Date(timeObject).getTime();
    let now = new Date().getTime();
    let timeleft = endTime - now;

    if (timeleft < 0) {
        throw new RangeError("Time has already passed");
    }

    let days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
    let hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((timeleft % (1000 * 60)) / 1000);

    return [days, hours, minutes, seconds];
}


//Starts all needed "start" functions
function initalize(){
    sessionStorage.setItem("period",0);
    startTime();
    faviconSelector();
    backgroundColorChange();
    textColorChange();
    loadNotepads();
    loadLunch();
    countdown();
}

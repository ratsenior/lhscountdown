//initalize date
function startTime() {
    const today = new Date();
    let h = today.getHours();
    let m = today.getMinutes();
    let s = today.getSeconds();
    h = tweleveHour(h);
    m = checkTime(m);
    s = checkTime(s);

    document.getElementById('Time').innerHTML = h + ":" + m + ":" + s;
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
    const textElements = document.getElementsByClassName("content");
    for (var i = 0; i < textElements.length; i++){
        textElements[i].style.color = localStorage.getItem("txtColor");
    }
    const iconElements = document.getElementsByClassName("material-icons");
    for (var i = 0; i < iconElements.length; i++){
        iconElements[i].style.color = localStorage.getItem("txtColor");
    }
    document.getElementById("settings").style.outline = `1px solid ${localStorage.getItem("txtColor")}`;
}


//misc functions
function faviconSelector(){
    let today = new Date();
    let date = String(today.getDate());
    const favicon = document.getElementById("favicon");
    favicon.setAttribute("href",`images/date_icons/${date}.png`);
}
function settingsClick(){
    const settingsList = document.getElementsByClassName("options");
    for (let i = 0; i < settingsList.length; i++){
    
        if (settingsList[i].style.visibility === "hidden" || settingsList[i].style.visibility === ""){

            settingsList[i].style.visibility = "visible";
            document.getElementById("settings").style.outline = `1px solid ${localStorage.getItem("txtColor")}`;
            
        }
        else{
            (settingsList[i].style.visibility = "hidden")
            if ((i+1) == (settingsList.length)){
                document.getElementById("settings").style.outline = "none";
            }
    }

    }
}
function saveLunch(){
    localStorage.setItem("lunchPeriod",document.getElementById("lunchSelect").value)
    countdown();
}
function loadLunch(){
    document.getElementById("lunchSelect").value = localStorage.getItem("lunchPeriod");
}
function updateNotepads(){
    let notepads = document.getElementsByTagName("textarea");
    for (let i = 0; i < notepads.length; i++){
        notepads[i].style.background = localStorage.getItem("bgColor");
        notepads[i].style.outline = `1px solid ${localStorage.getItem("txtColor")}`;
        notepads[i].style.color = localStorage.getItem("txtColor");
    }
}
function saveNotepad(notepadNumber){
    localStorage.setItem(`notepadData${notepadNumber}`, document.getElementById(`notepad${notepadNumber}`).value)
}
function loadNotepads(){
    for (let i = 0; i < 8; i++){
        document.getElementById(`notepad${i}`).value = localStorage.getItem(`notepadData${i}`);
    }
}


//countdown
function countdown(){
    const now = new Date();
    const todayDate = now.getDate(); //day as a numeric value ex. the 8th of x month
    const todayYear = now.getFullYear();
    const todayMonth = now.getMonth(); /* date format = year, month (0 = jan, 11 = dec), day (ex. 8th), hour, minute, second, millisecond*/
    
    if (document.getElementById("lunchSelect").value == "a"){
        window.schedule = [
        {period:"0",periodStart: new Date(todayYear,todayMonth,todayDate,6,55,0,0).getTime(),periodEnd: new Date(todayYear,todayMonth,todayDate,7,45,0,0).getTime()},
        {period:"1",periodStart: new Date(todayYear,todayMonth,todayDate,7,50,0,0).getTime(),periodEnd: new Date(todayYear,todayMonth,todayDate,8,40,0,0).getTime()},
        {period:"2",periodStart: new Date(todayYear,todayMonth,todayDate,8,44,0,0).getTime(),periodEnd: new Date(todayYear,todayMonth,todayDate,9,34,0,0).getTime()},
        {period:"3",periodStart: new Date(todayYear,todayMonth,todayDate,9,38,0,0).getTime(),periodEnd: new Date(todayYear,todayMonth,todayDate,10,28,0,0).getTime()},
        {period:"4",periodStart: new Date(todayYear,todayMonth,todayDate,10,32,0,0).getTime(),periodEnd: new Date(todayYear,todayMonth,todayDate,11,22,0,0).getTime()},
        {period:"A",periodStart: new Date(todayYear,todayMonth,todayDate,11,26,0,0).getTime(),periodEnd: new Date(todayYear,todayMonth,todayDate,11,51,0,0).getTime()},
        {period:"5",periodStart: new Date(todayYear,todayMonth,todayDate,11,55,0,0).getTime(),periodEnd: new Date(todayYear,todayMonth,todayDate,12,49,0,0).getTime()},
        {period:"6",periodStart: new Date(todayYear,todayMonth,todayDate,12,53,0,0).getTime(),periodEnd: new Date(todayYear,todayMonth,todayDate,13,43,0,0).getTime()},
        {period:"7",periodStart: new Date(todayYear,todayMonth,todayDate,13,47,0,0).getTime(),periodEnd: new Date(todayYear,todayMonth,todayDate,14,37,0,0).getTime()}
    ]
    }
    else if(document.getElementById("lunchSelect").value == "c"){
        window.schedule = [
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
    }
    let thisPeriod = sessionStorage.getItem("period");
    let nextPeriod = Number(sessionStorage.getItem("period")) + 1;
    if (877 < (now.getHours()*60) + now.getMinutes()){
        let tommrrowStart = new Date(todayYear,todayMonth,todayDate+1,6,55,0,0)
        let [days, hours, minutes, seconds] = countTo(tommrrowStart);
            if (minutes < 0 && seconds < 0){
                clearInterval(countTo)
            }
            else{
                hours = checkTime(hours);
                minutes = checkTime(minutes);
                seconds = checkTime(seconds);
                document.getElementById('countdown').innerHTML = hours + ":"+ minutes + ":"+ seconds;
                document.getElementById('pageTitle').innerHTML = "LHSCD | " + hours+":"+minutes+":"+seconds;
                setTimeout(countdown, 1000)
            }
        }
    else if((now.getHours()*60)+now.getMinutes() < 415){
        let todayStart = new Date(todayYear,todayMonth,todayDate,6,55,0,0)
        let [days, hours, minutes, seconds] = countTo(todayStart);
            if (minutes < 0 && seconds < 0){
                clearInterval(countTo)
            }
            else{
                hours = checkTime(hours);
                minutes = checkTime(minutes);
                seconds = checkTime(seconds);
                document.getElementById('countdown').innerHTML = hours + ":"+ minutes + ":"+ seconds;
                document.getElementById('pageTitle').innerHTML = "LHSCD | " + hours+":"+minutes+":"+seconds;
                setTimeout(countdown, 1000)
            }
        }

    else if (new Date(schedule[Number(thisPeriod)].periodEnd).getTime() < new Date(now).getTime() && new Date(now).getTime() < new Date(schedule[nextPeriod].periodStart).getTime()){
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
                sessionStorage.setItem("period", Number((Number(period))+1))
                setTimeout(countdown, 0);
            }
            else if (error instanceof ReferenceError){
                isWithinPeriod(schedule[0].periodStart,schedule[0].periodEnd,0)
            } 
            else if (error instanceof TypeError){
                location.reload()
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
        sessionStorage.setItem("period",Number(periodNumber))
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
    saveLunch();
    startTime();
    faviconSelector();
    backgroundColorChange();
    textColorChange();
    loadNotepads();
    loadLunch();
    countdown();
    document.getElementById("settings").style.outline = "none";
}
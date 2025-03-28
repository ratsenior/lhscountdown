//-=-=-=-=-=-=-=-=-=-=-=- Time Setup & Page Title -=-=-=-=-=-=-=-=-=-=-=-

function startTime() {
    const delay = localStorage.getItem("timeDelay")
    let today = new Date().getTime();

    delay ? today = new Date(today + (1000*delay)) : today = new Date(today) 
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

function setDate(){
    const today = new Date();
    const date = today.getDate();

    const weekdays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    let weekday = weekdays[today.getDay()];

    const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    let month = months[today.getMonth()];

    let dateString = `${weekday}, ${month} ${date}`

    document.getElementById("date").innerHTML = dateString
}


//-=-=-=-=-=-=-=-=-=-=-=- Customization Functions: Background -=-=-=-=-=-=-=-=-=-=-=-
function backgroundColorChange(){
    if (!localStorage.getItem("bgColor")){
        inheritColorSelectionBg();
    }
    else {
        const color = localStorage.getItem("bgColor")
        document.body.style.backgroundColor = color;
        document.getElementById("backgroundColorInput").setAttribute("value",color);
        document.getElementById("todoInput").style.backgroundColor = color;
        document.getElementById("delayInput").style.backgroundColor = color;
        const todoSubmitElements = document.getElementsByClassName("todoButton")
        for (let i = 0; i < todoSubmitElements.length; i++){
            todoSubmitElements[i].style.backgroundColor = color;
        }
        updateNotepads();
    }
}
function inheritColorSelectionBg(){
    const color = document.getElementById("backgroundColorInput").value
    localStorage.setItem("bgColor", color);
    document.body.style.backgroundColor = color;
    document.getElementById("todoInput").style.backgroundColor = color;
    document.getElementById("delayInput").style.backgroundColor = color;
    document.getElementById("todoSubmit").style.backgroundColor = color;
    updateNotepads();
}

//-=-=-=-=-=-=-=-=-=-=-=- Customization Functions: Text -=-=-=-=-=-=-=-=-=-=-=-
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
    const color = document.getElementById("textColorInput").value
    localStorage.setItem("txtColor", color);
    updateText();
}
function updateText(){
    color = localStorage.getItem("txtColor")
    const textElements = document.getElementsByClassName("content");
    for (let i = 0; i < textElements.length; i++){
        textElements[i].style.color = color;
    }
    document.getElementById("todoInput").style.color = color;
    document.getElementById("delayInput").style.color = color;
    document.getElementById("todoSubmit").style.color = color;
    
}

//-=-=-=-=-=-=-=-=-=-=-=- Customization Functions: Accents -=-=-=-=-=-=-=-=-=-=-=-

function inheritColorSelectionAccents(){
    let color = document.getElementById("accentColorInput").value
    localStorage.setItem("accentColor", color);
    document.getElementById("mainframe").style.color = color;
    const mainshadow = document.getElementsByClassName("mainshadow");
    for (let i= 0; i < mainshadow.length; i++){
        mainshadow[i].style.boxShadow = `0px 0px 10px 0px ${color}`;
    }
    const settingsDivs = document.getElementsByClassName("settingsdiv")
    for (let i= 0; i <settingsDivs.length; i++){
        settingsDivs[i].style.boxShadow = `0px 0px 4px 1px ${color}`
    }
    document.getElementById("todoForm").style.boxShadow = `0px 0px 4px 1px ${color}`
    document.getElementById("delayInput").style.borderColor = color;
    document.getElementById("todoInput").style.borderColor = color;
    const todoSubmitElements = document.getElementsByClassName("todoButton");
    for (let i = 0; i < todoSubmitElements.length; i++){
        todoSubmitElements[i].style.borderColor = color;
    }
    document.getElementById("scheduleTable").style.borderColor = color;
    for (let tableData of document.getElementsByTagName("td")){
        tableData.style.borderColor = color;
    }
    for (let tableHeader of document.getElementsByTagName("th")){
        tableHeader.style.borderColor = color;
    }

    updateNotepads();
}

function accentsColorChange(){
    if (!localStorage.getItem("accentColor")){
        inheritColorSelectionAccents();
    }
    else {
        const color = localStorage.getItem("accentColor")
        document.getElementById("mainframe").style.color = color;
        document.getElementById("accentColorInput").setAttribute("value",color);
        const todoTextInput = document.getElementById("todoInput");
        todoTextInput.style.borderColor = color;
        document.getElementById("todoInput").style.backgroundColor = color;
        document.getElementById("delayInput").style.backgroundColor = color;
        const todoSubmitElements = document.getElementsByClassName("todoButton");
        for (let i = 0; i < todoSubmitElements.length; i++){
            todoSubmitElements[i].style.borderColor = color;
        }
        document.getElementById("scheduleTable").style.borderColor = color;
        for (let tableData of document.getElementsByTagName("td")){
            tableData.style.borderColor = color;
        }
        for (let tableHeader of document.getElementsByTagName("th")){
            tableHeader.style.borderColor = color;
        }

        updateNotepads();
    }
}

//-=-=-=-=-=-=-=-=-=-=-=- Favicon Settings -=-=-=-=-=-=-=-=-=-=-=-

function faviconSelector(){
    let today = new Date();
    let date = String(today.getDate());
    const favicon = document.getElementById("favicon");
    favicon.setAttribute("href",`/assets/img/date_icons/${date}.png`);
}


//-=-=-=-=-=-=-=-=-=-=-=- Lunch Functions -=-=-=-=-=-=-=-=-=-=-=-

function saveLunch(){
    localStorage.setItem("lunchPeriod",document.getElementById("lunchSelect").value);
    assignSchedule();
    countdown();
}
function loadLunch(){
    assignSchedule();
    document.getElementById("lunchSelect").value = localStorage.getItem("lunchPeriod");
}


//-=-=-=-=-=-=-=-=-=-=-=- Todo List Functions -=-=-=-=-=-=-=-=-=-=-=-

function createTaskElement(taskString){
    const list = document.getElementById("todoList");
    const listItem = document.createElement("li");
    const listItemText = document.createElement("h4");
    const listItemClose = document.createElement("button");
    const backgroundColor = localStorage.getItem("bgColor");
    const textColor = localStorage.getItem("txtColor");
    const accentColor = localStorage.getItem("accentColor")
    
    listItemText.innerHTML = taskString;
    listItemText.style.color = textColor;
    listItemText.className = "content";

    listItemClose.className = "close todoButton content";
    listItemClose.textContent = "X";
    listItemClose.style.color = textColor;
    listItemClose.style.backgroundColor = backgroundColor;
    listItemClose.style.borderColor = accentColor;
    

    listItemClose.onclick = function(){
        parent = this.parentElement;
        parent.remove();
        taskList = JSON.parse(localStorage.getItem("todoTasks"));
        const index = taskList.indexOf(listItemText);
        taskList.splice(index, 1);
        localStorage.setItem("todoTasks",JSON.stringify(taskList))
    }

    listItem.appendChild(listItemClose);
    listItem.appendChild(listItemText);
    list.appendChild(listItem);

}

function newTask(){
    const task = document.getElementById("todoInput").value;
    let taskList = localStorage.getItem("todoTasks");
    if (taskList == null){
        const newTasksArray = [task]
        localStorage.setItem("todoTasks",JSON.stringify(newTasksArray))
    }
    else{
        taskList = JSON.parse(taskList);
        if(task.trim() == ""){
            return false
        }
        taskList.push(task)
        localStorage.setItem("todoTasks",JSON.stringify(taskList))
    }
    createTaskElement(task)
}

function loadTodoList(){
    let taskList = localStorage.getItem("todoTasks");
    if (taskList && taskList.length > 0){
        taskList = JSON.parse(taskList)
        for(let i=0; i < taskList.length; i++){
            createTaskElement(taskList[i])
        }
    }
}


//-=-=-=-=-=-=-=-=-=-=-=- Notepad Settings -=-=-=-=-=-=-=-=-=-=-=-

function updateNotepads(){
    let notepads = document.getElementsByTagName("textarea");
    for (let i = 0; i < notepads.length; i++){
        notepads[i].style.background = localStorage.getItem("bgColor");
        notepads[i].style.color = localStorage.getItem("accentColor");
    }
}
function saveNotepad(notepadNumber){
    localStorage.setItem(`notepadData${notepadNumber}`, document.getElementById(`notepad${notepadNumber}`).value);
}
function loadNotepads(){
    for (let i = 0; i < 8; i++){
        document.getElementById(`notepad${i}`).value = localStorage.getItem(`notepadData${i}`);
    }
}

//-=-=-=-=-=-=-=-=-=-=-=- Countdown -=-=-=-=-=-=-=-=-=-=-=-

function countdown(){
    const now = new Date();
    const todayDate = now.getDate(); //day as a numeric value ex. the 8th of x month
    const todayYear = now.getFullYear();
    const todayMonth = now.getMonth(); /* date format = year, month (0 = jan, 11 = dec), day (ex. 8th), hour, minute, second, millisecond*/

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


function assignSchedule() {
    let now = new Date();
    let todayMonth = now.getMonth();
    let todayDate = now.getDate();
    let todayYear = now.getFullYear();
    
    const oneprideDates = ["0/22","0/29","1/19","1/26","2/12","2/19","2/26","3/9","3/16","3/23","3/30","4/14","4/21"];
    const plcDates = ["1/5","2/5","3/2","4/7"];
    const assemblyDates = ["2/28"];
    const vetAssemblyDate = [];
    const fiveEssentialsDates = ["2/4"];
    const halfDays = ["8/13", "9/4", "1/14", "3/25"];
    let date = `${todayMonth}/${todayDate}`;

    let lunchPeriod = ""

    localStorage.getItem("lunchPeriod") ? lunchPeriod = localStorage.getItem("lunchPeriod") : lunchPeriod = "a"

    if (lunchPeriod == "a") {
        if (oneprideDates.includes(date)) {
            window.schedule = [
                { period: "0", periodStart: new Date(todayYear, todayMonth, todayDate, 6, 55, 0, 0).getTime(), periodEnd: new Date(todayYear, todayMonth, todayDate, 7, 45, 0, 0).getTime() },
                { period: "1", periodStart: new Date(todayYear, todayMonth, todayDate, 7, 50, 0, 0).getTime(), periodEnd: new Date(todayYear, todayMonth, todayDate, 8, 31, 0, 0).getTime() },
                { period: "2", periodStart: new Date(todayYear, todayMonth, todayDate, 8, 35, 0, 0).getTime(), periodEnd: new Date(todayYear, todayMonth, todayDate, 9, 16, 0, 0).getTime() },
                { period: "3", periodStart: new Date(todayYear, todayMonth, todayDate, 9, 20, 0, 0).getTime(), periodEnd: new Date(todayYear, todayMonth, todayDate, 10, 1, 0, 0).getTime() },
                { period: "4", periodStart: new Date(todayYear, todayMonth, todayDate, 10, 5, 0, 0).getTime(), periodEnd: new Date(todayYear, todayMonth, todayDate, 10, 46, 0, 0).getTime() },
                { period: "OnePride", periodStart: new Date(todayYear, todayMonth, todayDate, 10, 50, 0, 0).getTime(), periodEnd: new Date(todayYear, todayMonth, todayDate, 11, 40, 0, 0).getTime() },
                { period: "A", periodStart: new Date(todayYear, todayMonth, todayDate, 11, 44, 0, 0).getTime(), periodEnd: new Date(todayYear, todayMonth, todayDate, 12, 11, 0, 0).getTime() },
                { period: "5", periodStart: new Date(todayYear, todayMonth, todayDate, 12, 15, 0, 0).getTime(), periodEnd: new Date(todayYear, todayMonth, todayDate, 13, 7, 0, 0).getTime() },
                { period: "6", periodStart: new Date(todayYear, todayMonth, todayDate, 13, 11, 0, 0).getTime(), periodEnd: new Date(todayYear, todayMonth, todayDate, 13, 52, 0, 0).getTime() },
                { period: "7", periodStart: new Date(todayYear, todayMonth, todayDate, 13, 56, 0, 0).getTime(), periodEnd: new Date(todayYear, todayMonth, todayDate, 14, 37, 0, 0).getTime() }
            ];
        }
        else if (plcDates.includes(date)) {
            window.schedule = [
                { period: "0", periodStart: new Date(todayYear, todayMonth, todayDate, 6, 55, 0, 0).getTime(), periodEnd: new Date(todayYear, todayMonth, todayDate, 7, 45, 0, 0).getTime() },
                { period: "1", periodStart: new Date(todayYear, todayMonth, todayDate, 7, 50, 0, 0).getTime(), periodEnd: new Date(todayYear, todayMonth, todayDate, 8, 33, 0, 0).getTime() },
                { period: "2", periodStart: new Date(todayYear, todayMonth, todayDate, 8, 37, 0, 0).getTime(), periodEnd: new Date(todayYear, todayMonth, todayDate, 9, 20, 0, 0).getTime() },
                { period: "3", periodStart: new Date(todayYear, todayMonth, todayDate, 9, 24, 0, 0).getTime(), periodEnd: new Date(todayYear, todayMonth, todayDate, 10, 7, 0, 0).getTime() },
                { period: "4", periodStart: new Date(todayYear, todayMonth, todayDate, 10, 11, 0, 0).getTime(), periodEnd: new Date(todayYear, todayMonth, todayDate, 10, 54, 0, 0).getTime() },
                { period: "A", periodStart: new Date(todayYear, todayMonth, todayDate, 10, 58, 0, 0).getTime(), periodEnd: new Date(todayYear, todayMonth, todayDate, 11, 23, 0, 0).getTime() },
                { period: "5", periodStart: new Date(todayYear, todayMonth, todayDate, 11, 27, 0, 0).getTime(), periodEnd: new Date(todayYear, todayMonth, todayDate, 12, 21, 0, 0).getTime() },
                { period: "6", periodStart: new Date(todayYear, todayMonth, todayDate, 12, 25, 0, 0).getTime(), periodEnd: new Date(todayYear, todayMonth, todayDate, 13, 8, 0, 0).getTime() },
                { period: "7", periodStart: new Date(todayYear, todayMonth, todayDate, 13, 12, 0, 0).getTime(), periodEnd: new Date(todayYear, todayMonth, todayDate, 13, 55, 0, 0).getTime() }
            ];
        }
        else if (assemblyDates.includes(date)) {
            window.schedule = [
                { period: "0", periodStart: new Date(todayYear, todayMonth, todayDate, 6, 55, 0, 0).getTime(), periodEnd: new Date(todayYear, todayMonth, todayDate, 7, 45, 0, 0).getTime() },
                { period: "1", periodStart: new Date(todayYear, todayMonth, todayDate, 7, 50, 0, 0).getTime(), periodEnd: new Date(todayYear, todayMonth, todayDate, 8, 30, 0, 0).getTime() },
                { period: "2", periodStart: new Date(todayYear, todayMonth, todayDate, 8, 34, 0, 0).getTime(), periodEnd: new Date(todayYear, todayMonth, todayDate, 9, 14, 0, 0).getTime() },
                { period: "3", periodStart: new Date(todayYear, todayMonth, todayDate, 9, 18, 0, 0).getTime(), periodEnd: new Date(todayYear, todayMonth, todayDate, 9, 58, 0, 0).getTime() },
                { period: "4", periodStart: new Date(todayYear, todayMonth, todayDate, 10, 2, 0, 0).getTime(), periodEnd: new Date(todayYear, todayMonth, todayDate, 10, 42, 0, 0).getTime() },
                { period: "A", periodStart: new Date(todayYear, todayMonth, todayDate, 10, 46, 0, 0).getTime(), periodEnd: new Date(todayYear, todayMonth, todayDate, 11, 11, 0, 0).getTime() },
                { period: "5", periodStart: new Date(todayYear, todayMonth, todayDate, 11, 15, 0, 0).getTime(), periodEnd: new Date(todayYear, todayMonth, todayDate, 12, 9, 0, 0).getTime() },
                { period: "6", periodStart: new Date(todayYear, todayMonth, todayDate, 12, 13, 0, 0).getTime(), periodEnd: new Date(todayYear, todayMonth, todayDate, 12, 53, 0, 0).getTime() },
                { period: "7", periodStart: new Date(todayYear, todayMonth, todayDate, 13, 57, 0, 0).getTime(), periodEnd: new Date(todayYear, todayMonth, todayDate, 13, 37, 0, 0).getTime() }
            ];
        }
        else if (fiveEssentialsDates.includes(date)) {
            window.schedule = [
                { period: "0", periodStart: new Date(todayYear, todayMonth, todayDate, 6, 55, 0, 0).getTime(), periodEnd: new Date(todayYear, todayMonth, todayDate, 7, 45, 0, 0).getTime() },
                { period: "1", periodStart: new Date(todayYear, todayMonth, todayDate, 7, 50, 0, 0).getTime(), periodEnd: new Date(todayYear, todayMonth, todayDate, 8, 35, 0, 0).getTime() },
                { period: "2", periodStart: new Date(todayYear, todayMonth, todayDate, 8, 39, 0, 0).getTime(), periodEnd: new Date(todayYear, todayMonth, todayDate, 9, 24, 0, 0).getTime() },
                { period: "3", periodStart: new Date(todayYear, todayMonth, todayDate, 9, 28, 0, 0).getTime(), periodEnd: new Date(todayYear, todayMonth, todayDate, 10, 13, 0, 0).getTime() },
                { period: "Survey", periodStart: new Date(todayYear, todayMonth, todayDate, 10, 15, 0, 0).getTime(), periodEnd: new Date(todayYear, todayMonth, todayDate, 10, 43, 0, 0).getTime() },
                { period: "4", periodStart: new Date(todayYear, todayMonth, todayDate, 10, 47, 0, 0).getTime(), periodEnd: new Date(todayYear, todayMonth, todayDate, 11, 32, 0, 0).getTime() },
                { period: "A", periodStart: new Date(todayYear, todayMonth, todayDate, 11, 36, 0, 0).getTime(), periodEnd: new Date(todayYear, todayMonth, todayDate, 12, 1, 0, 0).getTime() },
                { period: "5", periodStart: new Date(todayYear, todayMonth, todayDate, 12, 5, 0, 0).getTime(), periodEnd: new Date(todayYear, todayMonth, todayDate, 12, 59, 0, 0).getTime() },
                { period: "6", periodStart: new Date(todayYear, todayMonth, todayDate, 13, 3, 0, 0).getTime(), periodEnd: new Date(todayYear, todayMonth, todayDate, 13, 48, 0, 0).getTime() },
                { period: "7", periodStart: new Date(todayYear, todayMonth, todayDate, 13, 52, 0, 0).getTime(), periodEnd: new Date(todayYear, todayMonth, todayDate, 14, 37, 0, 0).getTime() }
            ];
        }

        else if (vetAssemblyDate.includes(date)) {
            window.schedule = [
                { period: "0", periodStart: new Date(todayYear, todayMonth, todayDate, 6, 55, 0, 0).getTime(), periodEnd: new Date(todayYear, todayMonth, todayDate, 7, 45, 0, 0).getTime() },
                { period: "1", periodStart: new Date(todayYear, todayMonth, todayDate, 7, 50, 0, 0).getTime(), periodEnd: new Date(todayYear, todayMonth, todayDate, 8, 34, 0, 0).getTime() },
                { period: "Assembly", periodStart: new Date(todayYear, todayMonth, todayDate, 8, 40, 0 ,0).getTime(), periodEnd: new Date(todayYear, todayMonth, todayDate, 9, 8, 0,0).getTime()},
                { period: "2", periodStart: new Date(todayYear, todayMonth, todayDate, 9, 14, 0, 0).getTime(), periodEnd: new Date(todayYear, todayMonth, todayDate, 9, 58, 0, 0).getTime() },
                { period: "3", periodStart: new Date(todayYear, todayMonth, todayDate, 10, 2, 0, 0).getTime(), periodEnd: new Date(todayYear, todayMonth, todayDate, 10, 46, 0, 0).getTime() },
                { period: "4", periodStart: new Date(todayYear, todayMonth, todayDate, 10, 50, 0, 0).getTime(), periodEnd: new Date(todayYear, todayMonth, todayDate, 11, 34, 0, 0).getTime() },
                { period: "A", periodStart: new Date(todayYear, todayMonth, todayDate, 11, 38, 0, 0).getTime(), periodEnd: new Date(todayYear, todayMonth, todayDate, 12, 3, 0, 0).getTime() },
                { period: "5", periodStart: new Date(todayYear, todayMonth, todayDate, 12, 7, 0, 0).getTime(), periodEnd: new Date(todayYear, todayMonth, todayDate, 13, 1, 0, 0).getTime() },
                { period: "6", periodStart: new Date(todayYear, todayMonth, todayDate, 13, 5, 0, 0).getTime(), periodEnd: new Date(todayYear, todayMonth, todayDate, 13, 49, 0, 0).getTime() },
                { period: "7", periodStart: new Date(todayYear, todayMonth, todayDate, 13, 53, 0, 0).getTime(), periodEnd: new Date(todayYear, todayMonth, todayDate, 14, 37, 0, 0).getTime() }
            ]
        }

        else {
            window.schedule = [
                { period: "0", periodStart: new Date(todayYear, todayMonth, todayDate, 6, 55, 0, 0).getTime(), periodEnd: new Date(todayYear, todayMonth, todayDate, 7, 45, 0, 0).getTime() },
                { period: "1", periodStart: new Date(todayYear, todayMonth, todayDate, 7, 50, 0, 0).getTime(), periodEnd: new Date(todayYear, todayMonth, todayDate, 8, 40, 0, 0).getTime() },
                { period: "2", periodStart: new Date(todayYear, todayMonth, todayDate, 8, 44, 0, 0).getTime(), periodEnd: new Date(todayYear, todayMonth, todayDate, 9, 34, 0, 0).getTime() },
                { period: "3", periodStart: new Date(todayYear, todayMonth, todayDate, 9, 38, 0, 0).getTime(), periodEnd: new Date(todayYear, todayMonth, todayDate, 10, 28, 0, 0).getTime() },
                { period: "4", periodStart: new Date(todayYear, todayMonth, todayDate, 10, 32, 0, 0).getTime(), periodEnd: new Date(todayYear, todayMonth, todayDate, 11, 22, 0, 0).getTime() },
                { period: "A", periodStart: new Date(todayYear, todayMonth, todayDate, 11, 26, 0, 0).getTime(), periodEnd: new Date(todayYear, todayMonth, todayDate, 11, 51, 0, 0).getTime() },
                { period: "5", periodStart: new Date(todayYear, todayMonth, todayDate, 11, 55, 0, 0).getTime(), periodEnd: new Date(todayYear, todayMonth, todayDate, 12, 49, 0, 0).getTime() },
                { period: "6", periodStart: new Date(todayYear, todayMonth, todayDate, 12, 53, 0, 0).getTime(), periodEnd: new Date(todayYear, todayMonth, todayDate, 13, 43, 0, 0).getTime() },
                { period: "7", periodStart: new Date(todayYear, todayMonth, todayDate, 13, 47, 0, 0).getTime(), periodEnd: new Date(todayYear, todayMonth, todayDate, 14, 37, 0, 0).getTime() }
            ];
        }
    }
    else if (lunchPeriod == "c") {
        if (oneprideDates.includes(date)) {
            window.schedule = [
                { period: "0", periodStart: new Date(todayYear, todayMonth, todayDate, 6, 55, 0, 0).getTime(), periodEnd: new Date(todayYear, todayMonth, todayDate, 7, 45, 0, 0).getTime() },
                { period: "1", periodStart: new Date(todayYear, todayMonth, todayDate, 7, 50, 0, 0).getTime(), periodEnd: new Date(todayYear, todayMonth, todayDate, 8, 31, 0, 0).getTime() },
                { period: "2", periodStart: new Date(todayYear, todayMonth, todayDate, 8, 35, 0, 0).getTime(), periodEnd: new Date(todayYear, todayMonth, todayDate, 9, 16, 0, 0).getTime() },
                { period: "3", periodStart: new Date(todayYear, todayMonth, todayDate, 9, 20, 0, 0).getTime(), periodEnd: new Date(todayYear, todayMonth, todayDate, 10, 1, 0, 0).getTime() },
                { period: "4", periodStart: new Date(todayYear, todayMonth, todayDate, 10, 5, 0, 0).getTime(), periodEnd: new Date(todayYear, todayMonth, todayDate, 10, 46, 0, 0).getTime() },
                { period: "OnePride", periodStart: new Date(todayYear, todayMonth, todayDate, 10, 50, 0, 0).getTime(), periodEnd: new Date(todayYear, todayMonth, todayDate, 11, 40, 0, 0).getTime() },
                { period: "5", periodStart: new Date(todayYear, todayMonth, todayDate, 11, 44, 0, 0).getTime(), periodEnd: new Date(todayYear, todayMonth, todayDate, 12, 36, 0, 0).getTime() },
                { period: "C", periodStart: new Date(todayYear, todayMonth, todayDate, 12, 40, 0, 0).getTime(), periodEnd: new Date(todayYear, todayMonth, todayDate, 13, 7, 0, 0).getTime() },
                { period: "6", periodStart: new Date(todayYear, todayMonth, todayDate, 13, 11, 0, 0).getTime(), periodEnd: new Date(todayYear, todayMonth, todayDate, 13, 52, 0, 0).getTime() },
                { period: "7", periodStart: new Date(todayYear, todayMonth, todayDate, 13, 56, 0, 0).getTime(), periodEnd: new Date(todayYear, todayMonth, todayDate, 14, 37, 0, 0).getTime() }
            ];
        }
        else if (plcDates.includes(date)) {
            window.schedule = [
                { period: "0", periodStart: new Date(todayYear, todayMonth, todayDate, 6, 55, 0, 0).getTime(), periodEnd: new Date(todayYear, todayMonth, todayDate, 7, 45, 0, 0).getTime() },
                { period: "1", periodStart: new Date(todayYear, todayMonth, todayDate, 7, 50, 0, 0).getTime(), periodEnd: new Date(todayYear, todayMonth, todayDate, 8, 33, 0, 0).getTime() },
                { period: "2", periodStart: new Date(todayYear, todayMonth, todayDate, 8, 37, 0, 0).getTime(), periodEnd: new Date(todayYear, todayMonth, todayDate, 9, 20, 0, 0).getTime() },
                { period: "3", periodStart: new Date(todayYear, todayMonth, todayDate, 9, 24, 0, 0).getTime(), periodEnd: new Date(todayYear, todayMonth, todayDate, 10, 7, 0, 0).getTime() },
                { period: "4", periodStart: new Date(todayYear, todayMonth, todayDate, 10, 11, 0, 0).getTime(), periodEnd: new Date(todayYear, todayMonth, todayDate, 10, 54, 0, 0).getTime() },
                { period: "5", periodStart: new Date(todayYear, todayMonth, todayDate, 10, 58, 0, 0).getTime(), periodEnd: new Date(todayYear, todayMonth, todayDate, 11, 52, 0, 0).getTime() },
                { period: "C", periodStart: new Date(todayYear, todayMonth, todayDate, 11, 56, 0, 0).getTime(), periodEnd: new Date(todayYear, todayMonth, todayDate, 12, 21, 0, 0).getTime() },
                { period: "6", periodStart: new Date(todayYear, todayMonth, todayDate, 12, 25, 0, 0).getTime(), periodEnd: new Date(todayYear, todayMonth, todayDate, 13, 8, 0, 0).getTime() },
                { period: "7", periodStart: new Date(todayYear, todayMonth, todayDate, 13, 12, 0, 0).getTime(), periodEnd: new Date(todayYear, todayMonth, todayDate, 13, 55, 0, 0).getTime() }
            ];
        }
        else if (assemblyDates.includes(date)) {
            window.schedule = [
                { period: "0", periodStart: new Date(todayYear, todayMonth, todayDate, 6, 55, 0, 0).getTime(), periodEnd: new Date(todayYear, todayMonth, todayDate, 7, 45, 0, 0).getTime() },
                { period: "1", periodStart: new Date(todayYear, todayMonth, todayDate, 7, 50, 0, 0).getTime(), periodEnd: new Date(todayYear, todayMonth, todayDate, 8, 30, 0, 0).getTime() },
                { period: "2", periodStart: new Date(todayYear, todayMonth, todayDate, 8, 34, 0, 0).getTime(), periodEnd: new Date(todayYear, todayMonth, todayDate, 9, 14, 0, 0).getTime() },
                { period: "3", periodStart: new Date(todayYear, todayMonth, todayDate, 9, 18, 0, 0).getTime(), periodEnd: new Date(todayYear, todayMonth, todayDate, 9, 58, 0, 0).getTime() },
                { period: "4", periodStart: new Date(todayYear, todayMonth, todayDate, 10, 2, 0, 0).getTime(), periodEnd: new Date(todayYear, todayMonth, todayDate, 10, 42, 0, 0).getTime() },
                { period: "5", periodStart: new Date(todayYear, todayMonth, todayDate, 10, 46, 0, 0).getTime(), periodEnd: new Date(todayYear, todayMonth, todayDate, 11, 40, 0, 0).getTime() },
                { period: "C", periodStart: new Date(todayYear, todayMonth, todayDate, 11, 44, 0, 0).getTime(), periodEnd: new Date(todayYear, todayMonth, todayDate, 12, 9, 0, 0).getTime() },
                { period: "6", periodStart: new Date(todayYear, todayMonth, todayDate, 12, 13, 0, 0).getTime(), periodEnd: new Date(todayYear, todayMonth, todayDate, 12, 53, 0, 0).getTime() },
                { period: "7", periodStart: new Date(todayYear, todayMonth, todayDate, 13, 57, 0, 0).getTime(), periodEnd: new Date(todayYear, todayMonth, todayDate, 13, 37, 0, 0).getTime() }
            ];
        }
        else if (vetAssemblyDate.includes(date)) {
            window.schedule = [
                { period: "0", periodStart: new Date(todayYear, todayMonth, todayDate, 6, 55, 0, 0).getTime(), periodEnd: new Date(todayYear, todayMonth, todayDate, 7, 45, 0, 0).getTime() },
                { period: "1", periodStart: new Date(todayYear, todayMonth, todayDate, 7, 50, 0, 0).getTime(), periodEnd: new Date(todayYear, todayMonth, todayDate, 8, 34, 0, 0).getTime() },
                { period: "Assembly", periodStart: new Date(todayYear, todayMonth, todayDate, 8, 40, 0 ,0).getTime(), periodEnd: new Date(todayYear, todayMonth, todayDate, 9, 8, 0,0).getTime()},
                { period: "2", periodStart: new Date(todayYear, todayMonth, todayDate, 9, 14, 0, 0).getTime(), periodEnd: new Date(todayYear, todayMonth, todayDate, 9, 58, 0, 0).getTime() },
                { period: "3", periodStart: new Date(todayYear, todayMonth, todayDate, 10, 2, 0, 0).getTime(), periodEnd: new Date(todayYear, todayMonth, todayDate, 10, 46, 0, 0).getTime() },
                { period: "4", periodStart: new Date(todayYear, todayMonth, todayDate, 10, 50, 0, 0).getTime(), periodEnd: new Date(todayYear, todayMonth, todayDate, 11, 34, 0, 0).getTime() },
                { period: "5", periodStart: new Date(todayYear, todayMonth, todayDate, 11, 38, 0, 0).getTime(), periodEnd: new Date(todayYear, todayMonth, todayDate, 12, 32, 0, 0).getTime() },
                { period: "C", periodStart: new Date(todayYear, todayMonth, todayDate, 12, 36, 0, 0).getTime(), periodEnd: new Date(todayYear, todayMonth, todayDate, 13, 1, 0, 0).getTime() },
                { period: "6", periodStart: new Date(todayYear, todayMonth, todayDate, 13, 5, 0, 0).getTime(), periodEnd: new Date(todayYear, todayMonth, todayDate, 13, 49, 0, 0).getTime() },
                { period: "7", periodStart: new Date(todayYear, todayMonth, todayDate, 13, 53, 0, 0).getTime(), periodEnd: new Date(todayYear, todayMonth, todayDate, 14, 37, 0, 0).getTime() }
            ]
        }
        else if (fiveEssentialsDates.includes(date)) {
            window.schedule = [
                { period: "0", periodStart: new Date(todayYear, todayMonth, todayDate, 6, 55, 0, 0).getTime(), periodEnd: new Date(todayYear, todayMonth, todayDate, 7, 45, 0, 0).getTime() },
                { period: "1", periodStart: new Date(todayYear, todayMonth, todayDate, 7, 50, 0, 0).getTime(), periodEnd: new Date(todayYear, todayMonth, todayDate, 8, 33, 0, 0).getTime() },
                { period: "2", periodStart: new Date(todayYear, todayMonth, todayDate, 8, 39, 0, 0).getTime(), periodEnd: new Date(todayYear, todayMonth, todayDate, 9, 20, 0, 0).getTime() },
                { period: "3", periodStart: new Date(todayYear, todayMonth, todayDate, 9, 28, 0, 0).getTime(), periodEnd: new Date(todayYear, todayMonth, todayDate, 10, 13, 0, 0).getTime() },
                { period: "Survey", periodStart: new Date(todayYear, todayMonth, todayDate, 10, 15, 0, 0).getTime(), periodEnd: new Date(todayYear, todayMonth, todayDate, 10, 43, 0, 0).getTime() },
                { period: "4", periodStart: new Date(todayYear, todayMonth, todayDate, 10, 47, 0, 0).getTime(), periodEnd: new Date(todayYear, todayMonth, todayDate, 11, 32, 0, 0).getTime() },
                { period: "5", periodStart: new Date(todayYear, todayMonth, todayDate, 11, 36, 0, 0).getTime(), periodEnd: new Date(todayYear, todayMonth, todayDate, 12, 30, 0, 0).getTime() },
                { period: "C", periodStart: new Date(todayYear, todayMonth, todayDate, 12, 34, 0, 0).getTime(), periodEnd: new Date(todayYear, todayMonth, todayDate, 12, 59, 0, 0).getTime() },
                { period: "6", periodStart: new Date(todayYear, todayMonth, todayDate, 13, 3, 0, 0).getTime(), periodEnd: new Date(todayYear, todayMonth, todayDate, 13, 48, 0, 0).getTime() },
                { period: "7", periodStart: new Date(todayYear, todayMonth, todayDate, 13, 52, 0, 0).getTime(), periodEnd: new Date(todayYear, todayMonth, todayDate, 14, 37, 0, 0).getTime() }
            ];
        }
        else {
            window.schedule = [
                { period: "0", periodStart: new Date(todayYear, todayMonth, todayDate, 6, 55, 0, 0).getTime(), periodEnd: new Date(todayYear, todayMonth, todayDate, 7, 45, 0, 0).getTime() },
                { period: "1", periodStart: new Date(todayYear, todayMonth, todayDate, 7, 50, 0, 0).getTime(), periodEnd: new Date(todayYear, todayMonth, todayDate, 8, 40, 0, 0).getTime() },
                { period: "2", periodStart: new Date(todayYear, todayMonth, todayDate, 8, 44, 0, 0).getTime(), periodEnd: new Date(todayYear, todayMonth, todayDate, 9, 34, 0, 0).getTime() },
                { period: "3", periodStart: new Date(todayYear, todayMonth, todayDate, 9, 38, 0, 0).getTime(), periodEnd: new Date(todayYear, todayMonth, todayDate, 10, 28, 0, 0).getTime() },
                { period: "4", periodStart: new Date(todayYear, todayMonth, todayDate, 10, 32, 0, 0).getTime(), periodEnd: new Date(todayYear, todayMonth, todayDate, 11, 22, 0, 0).getTime() },
                { period: "5", periodStart: new Date(todayYear, todayMonth, todayDate, 11, 26, 0, 0).getTime(), periodEnd: new Date(todayYear, todayMonth, todayDate, 12, 20, 0, 0).getTime() },
                { period: "C", periodStart: new Date(todayYear, todayMonth, todayDate, 12, 24, 0, 0).getTime(), periodEnd: new Date(todayYear, todayMonth, todayDate, 12, 49, 0, 0).getTime() },
                { period: "6", periodStart: new Date(todayYear, todayMonth, todayDate, 12, 53, 0, 0).getTime(), periodEnd: new Date(todayYear, todayMonth, todayDate, 13, 43, 0, 0).getTime() },
                { period: "7", periodStart: new Date(todayYear, todayMonth, todayDate, 13, 47, 0, 0).getTime(), periodEnd: new Date(todayYear, todayMonth, todayDate, 14, 37, 0, 0).getTime() }
            ];
        }
    }

    if (halfDays.includes(date)) {
        window.schedule = [
            { period: "0", periodStart: new Date(todayYear, todayMonth, todayDate, 6, 55, 0, 0).getTime(), periodEnd: new Date(todayYear, todayMonth, todayDate, 7, 45, 0, 0).getTime() },
            { period: "1", periodStart: new Date(todayYear, todayMonth, todayDate, 7, 50, 0, 0).getTime(), periodEnd: new Date(todayYear, todayMonth, todayDate, 8, 17, 0, 0).getTime() },
            { period: "2", periodStart: new Date(todayYear, todayMonth, todayDate, 8, 21, 0, 0).getTime(), periodEnd: new Date(todayYear, todayMonth, todayDate, 8, 48, 0, 0).getTime() },
            { period: "3", periodStart: new Date(todayYear, todayMonth, todayDate, 8, 52, 0, 0).getTime(), periodEnd: new Date(todayYear, todayMonth, todayDate, 9, 19, 0, 0).getTime() },
            { period: "4", periodStart: new Date(todayYear, todayMonth, todayDate, 9, 23, 0, 0).getTime(), periodEnd: new Date(todayYear, todayMonth, todayDate, 9, 50, 0, 0).getTime() },
            { period: "5", periodStart: new Date(todayYear, todayMonth, todayDate, 9, 54, 0, 0).getTime(), periodEnd: new Date(todayYear, todayMonth, todayDate, 10, 21, 0, 0).getTime() },
            { period: "6", periodStart: new Date(todayYear, todayMonth, todayDate, 10, 25, 0, 0).getTime(), periodEnd: new Date(todayYear, todayMonth, todayDate, 10, 52, 0, 0).getTime() },
            { period: "7", periodStart: new Date(todayYear, todayMonth, todayDate, 10, 56, 0, 0).getTime(), periodEnd: new Date(todayYear, todayMonth, todayDate, 11, 22, 0, 0).getTime() }
        ];
    }
    scheduleBuilder();
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

function setDelay(){
    const delay = document.getElementById("delayInput").value;
    localStorage.setItem("timerDelay",delay);
    countdown();
    startTime();
}

function loadDelay(){
    const delay = localStorage.getItem("timerDelay");
    if (delay){
        document.getElementById("delayInput").value = delay;
    }
    countdown();
    startTime();
}

function countTo(timeObject) {
    let endTime = new Date(timeObject).getTime();
    let now = new Date().getTime();
    let timeleft = endTime - now;

    delay = localStorage.getItem("timerDelay")
    delay ? timeleft = timeleft + (delay*1000) : timeleft 

    if (timeleft < 0) {
        throw new RangeError("Time has already passed");
    }

    let days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
    let hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((timeleft % (1000 * 60)) / 1000);

    return [days, hours, minutes, seconds];
}

//-=-=-=-=-=-=-=-=-=-=-=- Schedule Builder -=-=-=-=-=-=-=-=-=-=-=-

function clearSchedule(){
    const scheduleGeneratedContent = document.getElementsByClassName("scheduleGen");
    while (scheduleGeneratedContent.length > 0){
        for(let i = 0; i < scheduleGeneratedContent.length; i++){
            scheduleGeneratedContent[i].remove()
        }
        i = 0;
    }
}


function scheduleBuilder(){
    clearSchedule();
    const schedule = window.schedule
    const scheduleTable = document.getElementById("scheduleTable");
    for(let i = 0; i < schedule.length; i++ ){
        const newRow = document.createElement("tr");
        newRow.className = "scheduleGen";
        const periodNumber = document.createElement("td");
        const startTime = document.createElement("td");
        const endTime = document.createElement("td");

        newRow.appendChild(periodNumber);
        newRow.appendChild(startTime);
        newRow.appendChild(endTime);

        const periodNumberText = document.createElement("h2");
        periodNumberText.className = "content";
        periodNumberText.innerHTML = schedule[i].period;
        periodNumber.appendChild(periodNumberText);

        const periodStartText = document.createElement("h2");
        periodStartText.className = "content";
        const periodStart = new Date(schedule[i].periodStart);
        let periodStartHour = periodStart.getHours();
        periodStartHour > 12 ? periodStartHour = periodStartHour-12 : periodStartHour = periodStartHour;
        let periodStartMinutes = periodStart.getMinutes();
        periodStartMinutes < 10 ? periodStartMinutes = `0${periodStartMinutes}` : periodStartMinutes = periodStartMinutes;
        periodStartText.innerHTML = `${periodStartHour}:${periodStartMinutes}`;
        startTime.appendChild(periodStartText);

        const periodEndText = document.createElement("h2");
        periodEndText.className = "content";
        const periodEnd = new Date(schedule[i].periodEnd);
        let periodEndHour = periodEnd.getHours();
        periodEndHour > 12 ? periodEndHour = periodEndHour-12 : periodEndHour = periodEndHour;
        let periodEndMinutes = periodEnd.getMinutes();
        periodEndMinutes < 10 ? periodEndMinutes = `0${periodEndMinutes}` : periodEndMinutes = periodEndMinutes;

        periodEndText.innerHTML = `${periodEndHour}:${periodEndMinutes}`
        endTime.appendChild(periodEndText);
        
        scheduleTable.appendChild(newRow);

    };
}




//-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-



//-=-=-=-=-=-=-=-=-=-=-=- Initalize Function -=-=-=-=-=-=-=-=-=-=-=-
function initalize(){
    sessionStorage.setItem("period",0);
    setDate();
    loadLunch();
    assignSchedule();
    faviconSelector();
    loadNotepads();
    loadDelay();
    loadTodoList();
    textColorChange();
    accentsColorChange();
    backgroundColorChange();
    
}

//Should not be deleted unless better solution is found. If this is deleted the whole website no work :(
//The function is called in index.html in the body tag.

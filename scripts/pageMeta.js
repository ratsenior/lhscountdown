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
}

function updateNotepads(){
    let notepads = document.getElementsByTagName("textarea");
    for (let i = 0; i < notepads.length; i++){
        notepads[i].style.background = localStorage.getItem("bgColor");
        notepads[i].style.outline = `1px solid ${localStorage.getItem("txtColor")}`;
        notepads[i].style.color = localStorage.getItem("txtColor");
    }
}

//Starts all needed "start" functions
function initalize(){
    startTime();
    faviconSelector();
    backgroundColorChange();
    textColorChange();
    document.getElementById("settings").style.outline = "none";
}

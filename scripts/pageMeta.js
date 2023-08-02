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
//end of date formating

//user customization functions
function backgroundColorChange(){
    let bgColor = document.getElementById('backgroundColorInput').value;
    document.body.style.backgroundColor = bgColor;
}

//text color change to come
//function textColorChange(){
    //let h1Color = document.getElementById("textColorInput").value;
    //document.body.style.h1 = h1Color;
//}

function faviconSelector(){
    let today = new Date();
    let date = String(today.getDate());
    const favicon = document.getElementById("favicon");
    favicon.setAttribute("href","images/date_icons/"+date+".png");
}

//Starts all needed "start" functions
function initalize(){
    startTime();
    faviconSelector();
}

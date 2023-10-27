function schedulePull(lunch,type){
    const now = new Date();
    const todayDate = now.getDate(); //day as a numeric value ex. the 8th of x month
    const todayYear = now.getFullYear();
    const todayMonth = now.getMonth();
    schedule = JSON.parse(JSON.stringify(require(`./schedules/schedules${lunch}/${type}.json`)));
    let timeArr = [];
    for(let i = 0; i < Object.keys(schedule).length; i++){
        let indexI = Object.keys(schedule)[i];
        const startPathI = `schedule.${indexI}.periodStart`;
        const endPathI = `schedule.${indexI}.periodEnd`;
        startI = (eval(eval(startPathI)));
        endI = (eval(eval(endPathI)));
        timeArr.push(startI,endI);
};
return timeArr;
}

function isWithinPeriod(startTime,endTime){

    dateStartTime = new Date(startTime).getTime();
    console.log(`start time is: ${dateStartTime}`)
    dateEndTime = new Date(endTime).getTime();
    console.log(`end time is ${dateEndTime}`)
    now = new Date().getTime();
    console.log(`now is ${now}`);
    console.log(Number(now-dateEndTime))
    console.log(Number(now-dateStartTime))
    if(dateStartTime < now && dateEndTime > now){
        //sessionStorage.setItem("period",Number(periodNumber));
        console.log("startTime<now<endTime");
        return
    }
    else{
        //sessionStorage.setItem("period",Number(periodNumber+1));
        console.log("non");
        return;
    }
}

schedule = schedulePull("A","regular");
console.log(schedule);
async function schedulePull(lunch,type){
    return ((await fetch(`https://lhscountdown.com/schedules/schedules${lunch}/${type}.json`)).json()).then(
        response => {return response}
    );
    
}

async function scheduleConstruct(lunch,type){
    baseSchedule = await schedulePull(lunch,type);
    console.log(baseSchedule);
}
    /*
    const now = new Date();
    const todayDate = now.getDate(); //day as a numeric value ex. the 8th of x month
    const todayYear = now.getFullYear();
    const todayMonth = now.getMonth();
    let timeArr = [];
    let schedule = fetch(`https://lhscountdown.com/schedules/schedules${lunch}/${type}.json`).then(
        response => response.json()).then(data => {return data});
    let timeArr = [];
    console.log(Number(Object.keys(schedule).length * 0.5));
    for(let i = 0; i < Number(Object.keys(schedule).length * 0.5); i+2){
        const startPathI = schedule[i];
        const endPathI = schedule[i+1]
        startI = (eval(eval(startPathI)));
        endI = (eval(eval(endPathI)));
        timeArr.push(startI,endI); 
};
return timeArr; */


scheduleConstruct("A","regular");
function taskToStorage() {
    const newTaskInfo = document.getElementById("missionDetails");
    const newTaskDl = document.getElementsByTagName("input");
    const newData = {
        task: newTaskInfo.value,
        date: newTaskDl[0].value,
        time: newTaskDl[1].value,
    }
    if (localStorage.getItem("taskData") === null) {
        localStorage.setItem("taskData", "[]");
    }
    const oldData = JSON.parse(localStorage.getItem("taskData"));
    oldData.push(newData);
    localStorage.setItem("taskData", JSON.stringify(oldData));
}

function loadTasks(indicateFade) {
    const localData = JSON.parse(localStorage.getItem("taskData"));             
    if (localData === null) {                                                         //בדיקת זיכרון
        return
    }
    document.getElementById("classDiv").innerHTML = "";
    
    let btnIndex = 0;
    for (objects of localData) {
        const element = document.createElement("div");
        element.className = "noteDiv";
        let clearGlyph = `<button onClick="clearBtn(${btnIndex})" class="glyphicon glyphicon-remove-sign"></button>`;//אינדקס לכפתור מחיקה
        let note = "";
        for (dataObj in objects) {
            note += "<p>" + objects[dataObj]+ "</p>";
        }
        element.innerHTML = note + clearGlyph;
        document.getElementById("classDiv").appendChild(element);
        btnIndex++;
    }
    currentDate();
    
    function fx() {indicateFade};fx()
}

function clearBtn(index) {
    let oldData = JSON.parse(localStorage.getItem("taskData"));
    oldData.splice(index, 1);
    localStorage.setItem("taskData", JSON.stringify(oldData));
    // location.reload();
    loadTasks();
}

function clearMemory() {
    localStorage.clear("taskData");
    document.getElementById("classDiv").innerHTML = JSON.parse(localStorage.getItem("taskData"));
    document.getElementById("classDiv").blur();
    
}

function currentDate() {
    const today = new Date;

    let month= today.getMonth()
    let day= today.getDate()
    if (month < 10) {month = "0" + month}
    if (day < 10) {day = "0" + day}
    
    let hour= today.getHours()
    let minute= today.getMinutes()
    if (hour < 10) {hour = "0" + hour}
    if (minute < 10) {minute = "0" + minute}
    
    const date = today.getFullYear() + "-" + month + "-" + day;
    const time = hour + ":" + minute;
    document.getElementById("dlDate").value = date;
    document.getElementById("dlTime").value = time;
}

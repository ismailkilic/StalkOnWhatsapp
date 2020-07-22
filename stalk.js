var refreshRate = 3000
var timeOuts = 1000

var previousKnownStatus = {};
var csvContent = "data:text/csv;charset=utf-8,Date,Time,Status,Name\n";
var buttonAdded = false;

var UNKNOWN = "UNKNOWN";
var userCounter=0

function print_to_log(name2, status) {
    currentTimeObj = new Date();
    output =   currentTimeObj.toLocaleString()  +"," + status+","+name2   + "\n"
    console.log(output);
    csvContent += output

}

function check_if_print_required_and_print(currentKnownStatus, currentPerson) {

    if (currentKnownStatus === previousKnownStatus[currentPerson]) {
        return;
    }
    if (currentKnownStatus === "ONLINE")
        print_to_log(currentPerson, 1);
    else
        print_to_log(currentPerson, 0);
    previousKnownStatus[currentPerson] = currentKnownStatus;
}

function check_statuses(name1) {
    try {

        name = document.querySelectorAll('#main > header > div>div>div>span')[1].textContent;
        if (!name || name !== name1) {
            setTimeout(function () {
                check_statuses(name1);
            }, timeOuts);
            return;
        }

        status = document.querySelector('#main > header > div>div>span').textContent;
        if (status === "typing…" || status === "online") {
            check_if_print_required_and_print("ONLINE", name);

        } else {
            check_if_print_required_and_print("OFFLINE", name);
        }
    } catch (TypeError) {
        check_if_print_required_and_print("OFFLINE", name);
        return;
    }
}


function withTimeouts(j) {
    
    find_contact_and_click_it(j);
    
    setTimeout(function () {

        check_statuses(j);
    }, timeOuts);
}

function stalk() {
    users = prompt("Enter the ,(comma) separated users you would like to monitor(No spaces)", "");
    if (!users || !users.length) {
        alert("Invalid users selected!");
        return;
    }
    if (!buttonAdded)
        putCSVLink();
    var userList = users.split(",");
    var arrayLength = userList.length;
    for (var i = 0; i < arrayLength; i++) {
        previousKnownStatus[userList[i]] = UNKNOWN;

    }

    interval = setInterval(function () {
        
            withTimeouts(userList[userCounter]);
            userCounter = (userCounter+1)%arrayLength;

        
    }, refreshRate);
    return interval;


}

function getCSV(data) {
    data = encodeURI(data);
    var link = document.createElement("a");
    link.setAttribute("href", data);
    link.setAttribute("download", "stalk_data" + users + ".csv");
    document.body.appendChild(link);
    link.click();
}

function getStalkData() {
    getCSV(csvContent);
}

function putCSVLink() {
    var button = document.createElement("button");
    button.textContent = "GetStalkCSV";
    button.onclick = getStalkData;
    var sideBar = document.querySelector("#side > header");
    sideBar.appendChild(button);
}

function find_contact_and_click_it(contact_name) {
    var mouse_evt = document.createEvent('MouseEvents');
    mouse_evt.initEvent('mousedown', true, true);
    document.querySelector('span[dir="auto"][title="' + contact_name + '"]').dispatchEvent(mouse_evt);


}

stalk();
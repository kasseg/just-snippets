(function($){
SERVICEDESK_REGISTER_JAVASCRIPT( {
onLocationChange: function(location) {
//my code here
//window.localStorage.clear();
var currentURL= window.location.href;
substring = "https://jira.r4.madm.net/servicedesk/customer/portals";
if (currentURL == substring){
var somedata=null;
var metas = document.getElementsByTagName('meta');
for (var i=0; i<metas.length; i++) {
    if (metas[i].getAttribute("name") == "loggedInUser") {
        var username=metas[i].getAttribute("content"); //Находим логин текущего пользователя
    }
}
//console.log(username);
var scriptRunner=runSIL("General_get_delegetes.sil",username); //запускаем скрипт вычисления списка делегирующих
var somedata2=getResultSil(scriptRunner); //получаем результат вычислений скрипта выше
somedata2=somedata2.substring(somedata2.indexOf("[")+2,somedata2.indexOf("]")-1); //спарсили резалт
var ulNav=document.getElementsByClassName("aui-nav")[0];
var fisrtLi=ulNav.getElementsByTagName("li")[0];
var newLi=document.createElement("li");
var delegateButton = document.createElement("a");
delegateButton.className="aui-button aui-button-primary";
delegateButton.innerText="Делегирование";
newLi.appendChild(delegateButton);
ulNav.insertBefore(newLi,fisrtLi);
if (!document.getElementById("myModal")) {
    var modalBox = document.createElement("div");//модальное окошечко Делегирования
    modalBox.id = "myModal";
    modalBox.className = "modal";
    modalBox.style.display = "none";
    modalBox.style.position = "fixed";
    modalBox.style.zIndex = "1";
    modalBox.style.left = "0";
    modalBox.style.top = "0";
    modalBox.style.width = "100%";
    modalBox.style.height = "100%";
    modalBox.style.overflow = "auto";
    modalBox.style.backgroundColor = "rgb(0,0,0)";
    modalBox.style.backgroundColor = "rgba(0,0,0,0.4)";//немного стилей для красоты
//modalBox.innerHTML="<div class=\"modal-content\" style=\"background-color: rgb(254, 254, 254); margin: 15% auto; padding: 20px; border: 1px solid rgb(136, 136, 136); width: 60%;\"><span id=\"modalClose\" class=\"close\" style=\"color: rgb(170, 170, 170); float: right; font-size: 28px; font-weight: bold; cursor: pointer;\">×</span><span id=\"spanContent\"><h2>Делегирование</h2><br><p>В данном меню можно добавить или удалить делегатов - лиц, уполномоченных рассматривать/подтверждать заявки вместе с Вами.</p></span></div>";
    modalBox.innerHTML = "<div class=\"modal-content\" style=\"background-color: rgb(254, 254, 254); margin: 15% auto; padding: 20px; border: 1px solid rgb(136, 136, 136); width: 60%;\"><span id=\"spanContent\"><h2>Делегирование</h2><br><p>В данном меню можно добавить или удалить делегатов - лиц, уполномоченных рассматривать/подтверждать заявки вместе с Вами.</p></span></div>";
    document.body.appendChild(modalBox);

    var modalClose = document.getElementById("modalClose");
    var spanContent = document.getElementById("spanContent");
    var contentDiv = spanContent.parentElement;


    var splitDelegates = somedata2.split(","); //массив юзернейм+дата
    var people = [];
    var dates = [];
    //console.log(people);
    ///console.log(dates);
    var contentik = "<p>Отредактировать Ваш список уполномоченных лиц:</p><br>";
    contentDiv.innerHTML += contentik;
    var myTable = document.createElement("table");
    myTable.className = "confluenceTable";
    var tr = document.createElement('tr'); // Создание шапки
    var th1 = document.createElement('th');
    th1.className = "confluenceTh";
    th1.style.textAlign = "Left";
    th1.innerText = "Логин";
    tr.appendChild(th1);
    var th2 = document.createElement('th');
    th2.className = "confluenceTh";
    th2.style.textAlign = "Left";
    th2.innerText = "До даты";
    tr.appendChild(th2);
    myTable.appendChild(tr);
    if (somedata2 && somedata2 != "null" && somedata2 != "Null") {
        for (var i = 0; i < splitDelegates.length; i++) {
            var splitPeopleAndDates = splitDelegates[i].split("=");//Разбиваем записи на логины и даты
            addRow(splitPeopleAndDates[0], splitPeopleAndDates[1]);
        }
    }

    var addNameLabel = document.createElement("label");
    addNameLabel.innerText = "Логин или почта:";
    var addNameInput = document.createElement("input");
    addNameInput.className = "text";
    addNameInput.setAttribute("type", "text");
    addNameInput.style.marginLeft = "5px";
    addNameLabel.appendChild(addNameInput);
    contentDiv.appendChild(addNameLabel);

    var addDateLabel = document.createElement("label");
    addDateLabel.innerText = "До даты:";
    addDateLabel.style.marginLeft = "10px";
    var addDateInput = document.createElement("input");
    addDateInput.setAttribute("type", "text");
    addDateInput.style.marginLeft = "5px";
    addDateInput.id = "calendar";
    addDateLabel.appendChild(addDateInput);
    contentDiv.appendChild(addDateLabel);
    $("#calendar").datepicker({'overrideBrowserDefault': true, 'firstDay': 1, 'dateFormat': 'yy-mm-dd'});
    addCSSforCalendar();

    var addBtn = document.createElement("span");
    addBtn.style.color = "green";
    addBtn.style.marginLeft = "5px";
    addBtn.style.cursor = "pointer";
    addBtn.innerHTML = "<i class=\"aui-icon aui-icon-small aui-iconfont-list-add\"></i>";
    addBtn.onclick = function () {
        addDateInput.style.backgroundColor = "white";
        addNameInput.style.backgroundColor = "white";
        var nameAndDate = username + "*" + addNameInput.value + "=" + addDateInput.value;
        scriptRunner = runSIL("General_add_delegate_by_Login.sil", nameAndDate); //запускаем скрипт вычисления списка делегирующих
        somedata2 = getResultSil(scriptRunner); //получаем результат вычислений скрипта выше
        somedata2 = somedata2.substring(somedata2.indexOf("[") + 2, somedata2.indexOf("]") - 1); //спарсили резалт
        //console.log(somedata2);
        if (somedata2.indexOf("AlreadyWas") !== -1) {
            var addedUser = somedata2.substring(somedata2.indexOf("*") + 1); //спарсили резалт
            //console.log(addedUser);
            //console.log(somedata2);
            somedata2 = "AlreadyWas";
        } else if (somedata2.indexOf("Added") !== -1) {
            var addedUser = somedata2.substring(somedata2.indexOf("*") + 1); //спарсили резалт
            somedata2 = "Added";
        }
        switch (somedata2) {//проверка диапазона и введенного лимита
            case "AlreadyWas":
                document.getElementById(addedUser).parentElement.parentElement.getElementsByClassName("untilDate")[0].innerHTML = addDateInput.value;
                addNameInput.value = "";
                addDateInput.value = "";
                break;
            case "Added":
                var names=username + "=" + addNameInput.value;
                scriptRunner = runSIL("General_new_delegate_to_old_issues.sil", names); //запускаем скрипт вычисления списка делегирующих
                addRow(addedUser, addDateInput.value);
                addNameInput.value = "";
                addDateInput.value = "";
                break;
            case "WrongDate":
                //Неверная дата
                addDateInput.style.backgroundColor = "red";
                break;
            case "WrongLogin":
                addNameInput.style.backgroundColor = "red";
                break;
        }
    }

    contentDiv.appendChild(addBtn);
    contentDiv.appendChild(myTable);
    //console.log(contentDiv.innerHTML);
    //console.log(myTable.innerHTML);
} else {
    var modalBox=document.getElementById("myModal");
}
    delegateButton.onclick = function () {
        modalBox.style.display = "block";
    }
    window.onclick = function (event) {
        if (event.target == modalBox) {
            modalBox.style.display = "none";
        }
    }
    function addCSSforCalendar() {//Добавяляем css для календарика jquery. В функции, просто чтобы не мешалось посреди кода
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".ui-datepicker {\n" +
        "background: #fff; /* Old browsers */\n" +
        "background: #fff -moz-linear-gradient(top, #fcfcfc 0%, #fff 100%); /* FF3.6+ */\n" +
        "background: #fff -webkit-gradient(linear, left top, left bottom, color-stop(0%,#fcfcfc)), color-stop(100%,#fff)); /* Chrome,Safari4+ */\n" +
        "background: #fff -webkit-linear-gradient(top, #fcfcfc 0%, #fff 100%); /* Chrome10+,Safari5.1+ */\n" +
        "background: #fff -o-linear-gradient(top, #fcfcfc 0%, #fff 100%); /* Opera11.10+ */\n" +
        "background: #fff -ms-linear-gradient(top, #fcfcfc 0%, #fff 100%); /* IE10+ */\n" +
        "background: #fff linear-gradient(top, #fcfcfc 0%, #fff 100%); /* W3C */\n" +
        "font-size:11px;\n" +
        "padding:10px;\n" +
        "border:1px solid #ccc;\n" +
        "}\n" +
        " \n" +
        ".ui-datepicker table {\n" +
        "width:278px;\n" +
        "}\n" +
        " \n" +
        ".ui-datepicker table td {\n" +
        "text-align:center;\n" +
        "}\n" +
        " \n" +
        ".ui-datepicker a {\n" +
        "cursor:pointer;\n" +
        "text-decoration:none;\n" +
        "}\n" +
        " \n" +
        ".ui-datepicker-prev {\n" +
        "}\n" +
        " \n" +
        ".ui-datepicker-next {\n" +
        "float:right;\n" +
        "}\n" +
        " \n" +
        ".ui-datepicker-title {\n" +
        "text-align: center;\n" +
        "font-weight:bold;\n" +
        "}";
    document.body.appendChild(css);
}
function runSIL(filename,arguments){
    var somedata;
    $.ajax({
        type: 'POST',
        async:false,
        cache : false,
        contentType: "application/json",
        url : "https://jira.r4.madm.net/rest/keplerrominfo/refapp/latest/async-script/runScript",
        data : JSON.stringify({
            source: {
                type: "FILE",
                code: filename
            },
            args: [arguments]
        }),
        success : function(data) {
            //console.log(data);
            somedata=data;
        },
        beforeSend: function (xhr){
        }
    });
    return somedata;
}

function getResultSil(somedata) {
    var somedata2;
    /*var CheckResult = setInterval(function(){
        $.ajax({
            type: 'POST',
            async:false,
            cache : false,
            contentType: "application/json",
            url : "https://jira.r4.madm.net/rest/keplerrominfo/refapp/latest/async/getResult",
            data : JSON.stringify(somedata),
            success : function(data) {
                //console.log(data);
                if (data["running"]) {
                }
                else {
                    somedata2=JSON.stringify(data);
                    clearInterval(CheckResult);
                };
            },
        });
    },350);*/
    $.ajax({
        type: 'POST',
        async:false,
        cache : false,
        contentType: "application/json",
        url : "https://jira.r4.madm.net/rest/keplerrominfo/refapp/latest/async/getResult",
        data : JSON.stringify(somedata),
        success : function(data) {
            //console.log(data);
            somedata2=JSON.stringify(data);
        },
        beforeSend: function (xhr){
        }
    });
    return somedata2;
}

function addRow(name,date) {//добавляет строку в таблицу пользователей
    var tr = document.createElement("tr");
    myTable.appendChild(tr);
    var tdName=document.createElement("td");
    tdName.className="confluenceTd";
    var span = document.createElement('span');
    span.innerText=name;
    var removeBtn=document.createElement("span");
    removeBtn.style.color="red";
    removeBtn.style.marginRight="5px";
    removeBtn.style.cursor="pointer";
    removeBtn.innerHTML="<i class=\"aui-icon aui-icon-small aui-iconfont-list-remove\"></i>";
    removeBtn.id=name;
    removeBtn.onclick=function() { //function(splitPeopleAndDates[0]){...} ??? :) вместо айди выше
        scriptRunner=runSIL("General_delete_delegate_by_login.sil", username+"*"+this.id); //запускаем скрипт вычисления списка делегирующих
        somedata2=getResultSil(scriptRunner); //получаем результат вычислений скрипта выше
        somedata2=somedata2.substring(somedata2.indexOf("[")+2,somedata2.indexOf("]")-1); //спарсили резалт
        //console.log(somedata2);
        this.parentElement.parentElement.parentElement.removeChild(this.parentElement.parentElement);
    }
    tdName.appendChild(removeBtn);
    tdName.appendChild(span);
    tr.appendChild(tdName);

    var tdDate=document.createElement("td");
    tdDate.className="confluenceTd";
    var span = document.createElement('span');
    span.innerText=date;
    span.className="untilDate";
    tdDate.appendChild(span);
    tr.appendChild(tdDate);
}
}
}
} )
})(jQuery);
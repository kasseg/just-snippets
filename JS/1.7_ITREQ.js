(function($){
SERVICEDESK_REGISTER_JAVASCRIPT( {
onLocationChange: function(location) {
//window.localStorage.clear();
var currentURL = window.location.href;
substring = "customer/portal/281/create/642";
if (currentURL.indexOf(substring) !== -1) {
//------------------------Начало Phone Request-------------------------------------------

var fatherForm = document.getElementsByClassName("aui vp-form top-label vp-request-form")[0]; //родитель, форма
var issueDescription = document.getElementById("description");
issueDescription.parentElement.parentElement.style.display="none";

var typeGroup = addGroupAndContainer("Тип заявки:", "");
var typeSelect = document.createElement("select");//выпадающий список типов заявки Phone
typeSelect.className = "text clientType";//выпадающий список типов
var types = ["Создание нового номера телефона", "Смена фамилии/имени сотрудника на телефоне", "Смена уровня доступа на телефоне (для исходящих звонков)", "Замена сломанного телефонного аппарата"];
fulfillSelect2(typeSelect, types);
typeGroup[1].appendChild(typeSelect);
fatherForm.insertBefore(typeGroup[0], issueDescription.parentElement.parentElement);
// Поля для New phone
var forWhoGroup = addGroupAndContainer("Для кого предназначается телефон:", "");
var forWho1 = addRadioInput("forWho", "Для меня", "Для меня", forWhoGroup[1], true);
var forWho2 = addRadioInput("forWho", "Для другого сотруднка", "Для другого сотруднка", forWhoGroup[1]);
fatherForm.insertBefore(forWhoGroup[0], issueDescription.parentElement.parentElement);
var name = addInputAndLabelAndDescr("Фамилия, имя:", "Укажите имя английскими буквами, оно будет отображаться на экране телефона."); // массив: 0 - вся группа, 1 - инпут
fatherForm.insertBefore(name[0], document.getElementById("description").parentElement.parentElement);
var department = addInputAndLabelAndDescr("Отдел:", ""); // массив: 0 - вся группа, 1 - инпут
fatherForm.insertBefore(department[0], document.getElementById("description").parentElement.parentElement);
var room = addInputAndLabelAndDescr("Комната:", ""); // массив: 0 - вся группа, 1 - инпут
fatherForm.insertBefore(room[0], document.getElementById("description").parentElement.parentElement);
var phone = addInputAndLabelAndDescr("Номер телефона:", "Введите последние 4 цифры изменяемого номера"); // массив: 0 - вся группа, 1 - инпут
fatherForm.insertBefore(phone[0], document.getElementById("description").parentElement.parentElement);
var numberTypeGroup = addGroupAndContainer("Тип телефонного номера (для входящих звонков):", "");
var numberType1 = addRadioInput("numberType", "Прямой городской номер", "Прямой городской номер", numberTypeGroup[1], true);
var numberType2 = addRadioInput("numberType", "Внутренний номер (нет внешних вызовов)", "Внутренний номер (нет внешних вызовов)", numberTypeGroup[1]);
fatherForm.insertBefore(numberTypeGroup[0], issueDescription.parentElement.parentElement);
// Поля для Change level
var accessLevelGroup = addGroupAndContainer("Уровень доступа (для исходящих звонков):", "");
var accessLevel1 = addRadioInput("accessLevel", "Внутренний (только внутренние вызовы)", "Внутренний (только внутренние вызовы)", accessLevelGroup[1], true);
var accessLevel2 = addRadioInput("accessLevel", "Вызовы на городские номера/местные мобильные", "Вызовы на городские номера/местные мобильные", accessLevelGroup[1]);
var accessLevel3 = addRadioInput("accessLevel", "Междугородние вызовы", "Междугородние вызовы", accessLevelGroup[1]);
var accessLevel4 = addRadioInput("accessLevel", "Международные вызовы", "Международные вызовы", accessLevelGroup[1]);
fatherForm.insertBefore(accessLevelGroup[0], issueDescription.parentElement.parentElement);
var commentbox=addTextareaAndLabelAndDescr("Комментарий", "Если у Вас в наличии имеется свободный аппарат (в комнате/на столе), просьба указать его инвентарный номер - это ускорит время выполнения заявки");// массив: 0 - вся группа, 1 - текстареа
fatherForm.insertBefore(commentbox[0], issueDescription.parentElement.parentElement);
typeGroup[1].onclick = handlerType;
forWhoGroup[1].onclick = handlerNew;
handlerType();
var btnPost = document.getElementsByClassName("buttons-container")[0];
btnPost = btnPost.getElementsByClassName("aui-button aui-button-primary")[0];
btnPost.addEventListener("click", compileTogether, false);	//обработчик клика на кнопку "Создать"
btnPost.addEventListener("keydown", compileTogether, false);//обработчик нажатия клавиатурой на кнопку "Создать"

function handlerNew() {
//Если новый телефон себе, то прячет поля с отделом/комнатой/именем.
if (forWho1.checked) {
name[0].style.display="none";
department[0].style.display="none";
} else{
name[0].style.display="";
department[0].style.display="";
}
}
function handlerType() {
switch (typeSelect.value) {//выбор типа реквеста (новый, замена, перенастройка)
case "1":
forWhoGroup[0].style.display="";
numberTypeGroup[0].style.display="";
accessLevelGroup[0].style.display="none";
phone[0].style.display="none";
handlerNew();
break;
case "2":
forWhoGroup[0].style.display="none";
numberTypeGroup[0].style.display="none";
accessLevelGroup[0].style.display="none";
name[0].style.display="";
department[0].style.display="none";
phone[0].style.display="";
break;
case "3":
forWhoGroup[0].style.display="none";
numberTypeGroup[0].style.display="none";
accessLevelGroup[0].style.display="";
name[0].style.display="none";
department[0].style.display="none";
phone[0].style.display="";
break;
case "4":
forWhoGroup[0].style.display="none";
numberTypeGroup[0].style.display="none";
accessLevelGroup[0].style.display="none";
name[0].style.display="none";
department[0].style.display="none";
phone[0].style.display="none";
break;
}
}

function compileTogether() {
var okform = "true";
if (typeSelect.value==1 && forWho2.checked && (name[1].value=="" || department[1].value=="" || room[1].value=="")){
issueDescription.value="errorNoData";
okform=false;
}
if (okform && typeSelect.value==2 && name[1].value==""){
issueDescription.value="errorNoName";
okform=false;
}
if (okform && room[1].value==""){
issueDescription.value="errorNoRoom";
okform=false;
}
if (okform && typeSelect.value==4 && commentbox[1].value==""){
issueDescription.value="errorNoComment";
okform=false;
}

if (okform && (typeSelect.value==2 || typeSelect.value==3) && phone[1].value==""){
issueDescription.value="errorNoPhone";
okform=false;
}

if (okform){//все проверки прошли успешно
issueDescription.value="*Тип заявки:* "+typeSelect.options[typeSelect.selectedIndex].innerHTML;
switch (typeSelect.value) {//выбор типа реквеста (новый, замена, перенастройка)
case "1":
if (forWho1.checked){
    issueDescription.value+="\r\n*Фамилия, имя:* FINDNAMEINLDAP\r\n*Отдел:* FINDDEPARTMENTINLDAP\r\n*Комната:* "+room[1].value;
} else {
    issueDescription.value+="\r\n*Фамилия, имя:* "+name[1].value
    + "\r\n*Отдел:* "+department[1].value+ "\r\n*Комната:* "+room[1].value;
}
if (numberType1.checked) {
    issueDescription.value += "\r\n*Тип телефонного номера (для входящих звонков):* " + numberType1.value;
} else{
    issueDescription.value += "\r\n*Тип телефонного номера (для входящих звонков):* " + numberType2.value;
}
break;
case "2":
issueDescription.value+="\r\n*Фамилия, имя:* "+name[1].value+"\r\n*Комната:* "+room[1].value+"\r\n*Номер телефона:* "+phone[1].value;
break;
case "3":
if (accessLevel1.checked){
    issueDescription.value+="\r\n*Комната:* "+room[1].value+"\r\n*Номер телефона:* "+phone[1].value+"\r\n*Уровень доступа (для исходящих звонков):* "+accessLevel1.value;
} else if (accessLevel2.checked){
    issueDescription.value+="\r\n*Комната:* "+room[1].value+"\r\n*Номер телефона:* "+phone[1].value+"\r\n*Уровень доступа (для исходящих звонков):* "+accessLevel2.value;
} else if (accessLevel3.checked){
    issueDescription.value+="\r\n*Комната:* "+room[1].value+"\r\n*Номер телефона:* "+phone[1].value+"\r\n*Уровень доступа (для исходящих звонков):* "+accessLevel3.value;
} else {
    issueDescription.value+="\r\n*Комната:* "+room[1].value+"\r\n*Номер телефона:* "+phone[1].value+"\r\n*Уровень доступа (для исходящих звонков):* "+accessLevel4.value;
}
break;
case "4":
issueDescription.value+="\r\n*Комната:* "+room[1].value;
break;
}
if (commentbox[1].value) {
issueDescription.value +="\r\n*Комментарий автора:* " + commentbox[1].value;
}
}

}
//------------------------Конец Phone Request-------------------------------------------
} else {
substring = "customer/portal/281/create/681";
if (currentURL.indexOf(substring) !== -1) {
//------------------------Начало HW/SW Request-------------------------------------------
var fatherForm = document.getElementsByClassName("aui vp-form top-label vp-request-form")[0]; //родитель, форма
var issueDescription = document.getElementById("description");
issueDescription.parentElement.parentElement.style.display="none";

var otherHW = addInputAndLabelAndDescr("Other Hardware (Другое оборудование):", ""); // массив: 0 - вся группа, 1 - инпут
otherHW[0].className += " HWOptions";
otherHW[0].style.display = "none";
fatherForm.insertBefore(otherHW[0], document.getElementById("customfield_128010").parentElement.parentElement.parentElement);

var otherSW = addInputAndLabelAndDescr("Other Software:", "Другое программное обеспечение"); // массив: 0 - вся группа, 1 - инпут
otherSW[0].className += " SWOptions";
otherSW[0].style.display = "none";
fatherForm.insertBefore(otherSW[0], document.getElementById("customfield_128020").parentElement.parentElement.parentElement);

var otherSWfree = addInputAndLabelAndDescr("Other Free Software:", "Другое бесплатное программное обеспечение"); // массив: 0 - вся группа, 1 - инпут
otherSWfree[0].className += " SWfreeOptions";
otherSWfree[0].style.display = "none";
fatherForm.insertBefore(otherSWfree[0], document.getElementById("customfield_128030").parentElement.parentElement.parentElement);

var reason = addInputAndLabelAndDescr("Reason:", "Укажите причину"); // массив: 0 - вся группа, 1 - инпут
fatherForm.insertBefore(reason[0], document.getElementById("description").parentElement.parentElement);
var btnPost = document.getElementsByClassName("buttons-container")[0];
btnPost = btnPost.getElementsByClassName("aui-button aui-button-primary")[0];
btnPost.addEventListener("click", compileTogether, false);	//обработчик клика на кнопку "Создать"
btnPost.addEventListener("keydown", compileTogether, false);//обработчик нажатия клавиатурой на кнопку "Создать"

function getCheckedBoxes(chkboxName) {
var checkboxes = document.getElementsByName(chkboxName);
var checkboxesChecked = [];
var checkedItems = "";
// loop over them all
for (var i = 0; i < checkboxes.length; i++) {
// And stick the checked ones onto an array...
if (checkboxes[i].checked) {
var currentString = getLabel(checkboxes[i].id);
if (currentString.indexOf("<br>") != -1) {
checkedItems += "| |" + currentString.substring(0, currentString.indexOf("<br>")) + "|\r\n";
} else checkedItems += "| |" + currentString + "|\r\n";
}
}

return checkedItems;
}

function getLabel(id) {
return $("#" + id).next("label").html();
}

function compileTogether() {
var resultString = "";
var somethingChecked=false;
if (reason[1].value==""){
document.getElementById("description").value = "errorNoReason";
} else {
if (getCheckedBoxes("customfield_12800")) {//Заполненение выбранных железок
resultString += "|*Selected Hardware*| |\r\n" + getCheckedBoxes("customfield_12800");
somethingChecked = true;
}
if (otherHW[1].value) {
resultString += "|*Other Hardware*|" + otherHW[1].value + "|\r\n"; //если указаны другие железки, то дописывает их
somethingChecked = true;
}
if (getCheckedBoxes("customfield_12801")) {//Заполненение выбранных железок и из поля other hw
resultString += "|*Selected Software*| |\r\n" + getCheckedBoxes("customfield_12801");
somethingChecked = true;
}
if (otherSW[1].value) {
resultString += "|*Other Software*|" + otherSW[1].value + "|\r\n"; //если указаны другие железки, то дописывает их
somethingChecked = true;
}

if (getCheckedBoxes("customfield_12802")) {//Заполненение выбранных железок и из поля other hw
resultString += "|*Selected Free Software*| |\r\n" + getCheckedBoxes("customfield_12802");
somethingChecked = true;
}
if (otherSWfree[1].value) {
resultString += "|*Other Free Software*|" + otherSWfree[1].value + "|\r\n"; //если указаны другие железки, то дописывает их
somethingChecked = true;
}

if (getCheckedBoxes("customfield_12803")) {//Заполненение выбранных железок и из поля other hw
resultString += "|*Selected Remote Access*| |\r\n" + getCheckedBoxes("customfield_12803");
somethingChecked = true;
}
if (somethingChecked) {
resultString += "|*Reason*|" + reason[1].value + "|\r\n";
}
/*for (i=0;i<allHW.length;i=i+1){
if (allHW[i].indexOf("<br>")!=-1){
endStr=allHW[i].indexOf("<br>");
} else endStr=allHW[i].length;
resultString+="|hw|"+allHW[i].substring(0,endStr)+"|\r\n";
}*/

//alert(allHW);
document.getElementById("description").value = resultString;
}
}


//------------------------Конец HW/SW Request-------------------------------------------
} else {
substring = "customer/portal/281/create/841";

if (currentURL.indexOf(substring) !== -1) {
//------------------------Начало Заявка в инженерную службу MGL-------------------------------------------
var fatherForm = document.getElementsByClassName("aui vp-form top-label vp-request-form")[0];
var issueDescription = document.getElementById("description");
issueDescription.parentElement.parentElement.style.display = "none";

var typeGroup = addGroupAndContainer("Тип оборудования", "");
var typeSelect = document.createElement("select");//выпадающий список причин
typeSelect.className = "text clientType";//выпадающий список причин
var types = ["Освещение, розетки", "Двери, замки", "Лифты", "Стеллажи", "Отбойники", "Протечки", "Другое"];
fulfillSelect2(typeSelect, types);
typeGroup[1].appendChild(typeSelect);
fatherForm.insertBefore(typeGroup[0], issueDescription.parentElement.parentElement);

var skladGroup = addGroupAndContainer("Склад", "");
var skladSelect = document.createElement("select");//выпадающий список причин
skladSelect.className = "text clientType";//выпадающий список причин
var sklads = ["Другое", "Кросс Док", "Фреш", "Импорт", "Заморозка", "Рыба", "Алкоголь", "ВВХД", "Офисы", "Раздевалки"];
fulfillSelect2(skladSelect, sklads);
skladGroup[1].appendChild(skladSelect);
fatherForm.insertBefore(skladGroup[0], issueDescription.parentElement.parentElement);

var rampa = addInputAndLabelAndDescr("Рампа:", ""); // массив: 0 - вся группа, 1 - инпут
fatherForm.insertBefore(rampa[0], document.getElementById("description").parentElement.parentElement);

var details = addTextareaAndLabelAndDescr("Опишите проблему подробнее:", ""); // массив: 0 - вся группа, 1 - текстареа
fatherForm.insertBefore(details[0], document.getElementById("description").parentElement.parentElement);

var importanceGroup = addGroupAndContainer("Важность заявки", "");
var importanceSelect = document.createElement("select");//выпадающий список причин
importanceSelect.className = "text clientType";//выпадающий список причин
var importances = ["Очень важно, необходимо решение как можно быстрее", "Важно, нужно решить в течение дня", "Средняя важность, нужно решить в течение недели", "Обычная, возможно решить в будущем"];
fulfillSelect2(importanceSelect, importances);
importanceGroup[1].appendChild(importanceSelect);
fatherForm.insertBefore(importanceGroup[0], issueDescription.parentElement.parentElement);

var name = addInputAndLabelAndDescr("Фамилия, имя:", ""); // массив: 0 - вся группа, 1 - инпут
fatherForm.insertBefore(name[0], document.getElementById("description").parentElement.parentElement);

var department = addInputAndLabelAndDescr("Отдел:", ""); // массив: 0 - вся группа, 1 - инпут
fatherForm.insertBefore(department[0], document.getElementById("description").parentElement.parentElement);

var phone = addInputAndLabelAndDescr("Телефон:", ""); // массив: 0 - вся группа, 1 - инпут
fatherForm.insertBefore(phone[0], document.getElementById("description").parentElement.parentElement);

var btnPost = document.getElementsByClassName("buttons-container")[0];
btnPost = btnPost.getElementsByClassName("aui-button aui-button-primary")[0];
btnPost.addEventListener("click", compileTogether, false);	//обработчик клика на кнопку "Создать"
btnPost.addEventListener("keydown", compileTogether, false);//обработчик нажатия клавиатурой на кнопку "Создать"

function compileTogether() {
if (details[1].value != "" && name[1].value != "" && department[1].value != "" && phone[1].value != "") {
document.getElementById("description").value = "*Тип оборудования:* " + typeSelect.options[typeSelect.selectedIndex].innerHTML
+ "\r\n*Склад:* " + skladSelect.options[skladSelect.selectedIndex].innerHTML + "\r\n";
if (rampa[1].value != "") {
document.getElementById("description").value += "*Рампа:* " + rampa[1].value + "\r\n";
}
document.getElementById("description").value += "*Подробное описание проблемы:* " + details[1].value + "\r\n*Важность заявки:* "
+ importanceSelect.options[importanceSelect.selectedIndex].innerHTML + "\r\n\r\n*Контактное лицо:*\r\n" + name[1].value
+ ", " + department[1].value + ", тел: " + phone[1].value;
} else {
document.getElementById("description").value = "error";
}
}

//------------------------Конец Заявка в инженерную службу MGL-------------------------------------------
} else {
//substring = "customer/portal/24/create/524";
//substring = "customer/portal/281/create/961";

if (currentURL.indexOf(substring) !== -1) {
//------------------------Начало MULTI Request-------------------------------------------

var fatherForm = document.getElementsByClassName("aui vp-form top-label vp-request-form")[0];
var placeToAdd = document.getElementById("description").parentElement.parentElement;//вставлять элементы буду рядом с полем Description
var issueDescription = document.getElementById("description");//поле для ввода деталей (description)
placeToAdd.style.display = "none";

var mainDivOfThePage=document.createElement("div");
mainDivOfThePage.className="aui-tabs horizontal-tabs";
//fatherForm.appendChild(mainDivOfThePage);
fatherForm.insertBefore(mainDivOfThePage, placeToAdd);

var tabsList=document.createElement("ul");
tabsList.className="tabs-menu";
mainDivOfThePage.appendChild(tabsList);

var tab1=document.createElement("li");
tab1.className="menu-item active-tab";
tabsList.appendChild(tab1);

var tab1anchor=document.createElement("a");
tab1anchor.setAttribute("href", "#tabs-user-info");
    tab1anchor.innerText="User Info";
    tab1.appendChild(tab1anchor);

var tab2=document.createElement("li");
tab2.className="menu-item";
tabsList.appendChild(tab2);

var tab2anchor=document.createElement("a");
tab2anchor.setAttribute("href", "#tabs-hardware");
tab2anchor.innerText="Hardware & Remote Access";
tab2.appendChild(tab2anchor);

var tab3=document.createElement("li");
tab3.className="menu-item";
tabsList.appendChild(tab3);

var tab3anchor=document.createElement("a");
tab3anchor.setAttribute("href", "#tabs-folders");
tab3anchor.innerText="Folders";
tab3.appendChild(tab3anchor);

    var tab4=document.createElement("li");
    tab4.className="menu-item";
    tabsList.appendChild(tab4);

    var tab4anchor=document.createElement("a");
    tab4anchor.setAttribute("href", "#tabs-apps");
    tab4anchor.innerText="Applications";
    tab4.appendChild(tab4anchor);

var userInfoTabDiv=document.createElement("div");
userInfoTabDiv.className="tabs-pane active-pane";
userInfoTabDiv.id="tabs-user-info";
mainDivOfThePage.appendChild(userInfoTabDiv);
var hardwareTabDiv=document.createElement("div");
hardwareTabDiv.className="tabs-pane";
hardwareTabDiv.id="tabs-hardware";
mainDivOfThePage.appendChild(hardwareTabDiv);
var folderTabDiv=document.createElement("div");
folderTabDiv.className="tabs-pane";
folderTabDiv.id="tabs-folders";
mainDivOfThePage.appendChild(folderTabDiv);
var appsTabDiv=document.createElement("div");
appsTabDiv.className="tabs-pane";
appsTabDiv.id="tabs-apps";
mainDivOfThePage.appendChild(appsTabDiv);
//--------------------------------

var firstName = addInputAndLabelAndDescr("Имя:", "Укажите имя английскими буквами, оно будет отображаться на экране телефона."); // массив: 0 - вся группа, 1 - инпут
//fatherForm.insertBefore(firstName[0], placeToAdd);
    userInfoTabDiv.appendChild(firstName[0]);
var lastName = addInputAndLabelAndDescr("Фамилия:", "Укажите фамилию английскими буквами, она будет отображаться на экране телефона."); // массив: 0 - вся группа, 1 - инпут
//fatherForm.insertBefore(lastName[0], placeToAdd);
    userInfoTabDiv.appendChild(lastName[0]);
var room = addInputAndLabelAndDescr("Комната","Комната, где будет сидеть сотрудник, например, 1А-21");
//fatherForm.insertBefore(room[0], placeToAdd);
    userInfoTabDiv.appendChild(room[0]);

var hwExistsGroup = addGroupAndContainer("Компьютерное оборудование уже есть?", "");
var hwExists1 = addRadioInput("hwExists", "hwYes", "Да", hwExistsGroup[1], true);
var hwExists2 = addRadioInput("hwExists", "hwNo", "Нет", hwExistsGroup[1]);
//fatherForm.insertBefore(hwExistsGroup[0], placeToAdd);
    hardwareTabDiv.appendChild(hwExistsGroup[0]);
hwExistsGroup[1].onclick = handlerHW;


var hwCheckGroup = addGroupAndContainer("Необходимо компьютерное оборудование:", "");//массив: 0=группа, 1=контейнер
var hwCheck1 = addCheckbox("hwCheck", "Notebook Standard 15”", hwCheckGroup[1]);
var hwCheck2 = addCheckbox("hwCheck", "Notebook Travel 13”", hwCheckGroup[1]);
var hwCheck3 = addCheckbox("hwCheck", "PC Standard", hwCheckGroup[1]);
var hwCheck4 = addCheckbox("hwCheck", "PC Hi-End", hwCheckGroup[1]);
var hwCheck5 = addCheckbox("hwCheck", "Monitor standard", hwCheckGroup[1]);
var hwCheck6 = addCheckbox("hwCheck", "Monitor 24”", hwCheckGroup[1]);
var hwCheck7 = addCheckbox("hwCheck", "Workplace (PC+Monitor)", hwCheckGroup[1]);
var hwCheck8 = addCheckbox("hwCheck", "Thin Client", hwCheckGroup[1]);
var hwCheck9 = addCheckbox("hwCheck", "iPad", hwCheckGroup[1]);
var hwCheck10 = addCheckbox("hwCheck", "Mobile Phone", hwCheckGroup[1]);
//fatherForm.insertBefore(hwCheckGroup[0], placeToAdd);
    hardwareTabDiv.appendChild(hwCheckGroup[0]);
hwCheckGroup[0].style.display = "none";

var phExistsGroup = addGroupAndContainer("Телефон уже есть?", "");
var phExists1 = addRadioInput("phExists", "phoneYes", "Да", phExistsGroup[1], true);
    phExists1.id
var phExists2 = addRadioInput("phExists", "phoneNo", "Нет", phExistsGroup[1]);
//fatherForm.insertBefore(phExistsGroup[0], placeToAdd);
    hardwareTabDiv.appendChild(phExistsGroup[0]);

var remoteCheckGroup = addGroupAndContainer("Удаленная работа", "");//массив: 0=группа, 1=контейнер
var remoteCheck1 = addCheckbox("remoteCheck", "Mail Access on iPhone", remoteCheckGroup[1]);
var remoteCheck1 = addCheckbox("remoteCheck", "Mail Access on iPad", remoteCheckGroup[1]);
var remoteCheck2 = addCheckbox("remoteCheck", "Mail Access on Android device", remoteCheckGroup[1]);
var remoteCheck3 = addCheckbox("remoteCheck", "RSA Software for Apple", remoteCheckGroup[1]);
var remoteCheck4 = addCheckbox("remoteCheck", "RSA Software for Android", remoteCheckGroup[1]);
//fatherForm.insertBefore(remoteCheckGroup[0], placeToAdd);
    hardwareTabDiv.appendChild(remoteCheckGroup[0]);

var copyAccess=addInputAndLabelAndDescr("Скопировать доступ", "Введите логин или почту сотрудника, с которого можно скопировать доступы в папки");
//fatherForm.insertBefore(copyAccess[0], placeToAdd);
folderTabDiv.appendChild(copyAccess[0]);

var folderAccess = addGroupAndContainer("");
var addFolderHref = document.createElement("a"); // ссылка на добавление папки
addFolderHref.id = "AddRow";
addFolderHref.setAttribute("href", "javascript:void(0);");
addFolderHref.setAttribute("onclick", "return false;");
addFolderHref.innerHTML = "<i class=\"aui-icon aui-icon-small aui-iconfont-list-add\"></i>&nbsp;Добавить доступ в папку";
    folderAccess[0].appendChild(addFolderHref);
//fatherForm.insertBefore(folderAccess[0], placeToAdd);
    folderTabDiv.appendChild(folderAccess[0]);
addFolderHref.addEventListener("click", function () {
    addFolderInput();
}, false);

var applicationToGroup=document.getElementById("customfield_12602").parentElement.parentElement;
    appsTabDiv.appendChild(applicationToGroup);
    var accessTo = document.getElementById("customfield_12602");
    accessTo.onclick = handlerAccess;
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
    var attachGroup=document.getElementById("attachment-label").parentElement.parentElement.parentElement.parentElement;
    //--------Поля для MMS Store-----------------------------------------------------
    var mmsFieldGroup = addGroupAndContainer("", "");
    var mmsRolesGroup = document.createElement("div");//Роль+лейбл
    var mmsLabelRole = document.createElement("label");
    mmsLabelRole.className = "field-label";
    mmsLabelRole.innerHTML = "Укажите роль:";
    var mmsSelectRole = document.createElement("select");
    mmsSelectRole.className = "text";
    var mmsRoles = ["Audit", "HO_Operations", "Logistics", "LIM", "Работаю в ТЦ", "Не знаю роль"];
    var mmsRegionGroup = document.createElement("div");//Регион+лейбл
    var mmsLabelRegion = document.createElement("label");
    mmsLabelRegion.className = "field-label";
    mmsLabelRegion.innerHTML = "Укажите регион:<br>";
    var mmsSelectRegion = document.createElement("select");
    mmsSelectRegion.id = "mmsRegion";
    mmsSelectRegion.className = "text";
    var mmsRegions = ["Moscow 1 (12, 13, 19, 48, 49, 67, 1444, 1073)", "Moscow 2 (10, 11, 14, 17, 18, 61, 1307, 1308)", "SPB (15, 16, 20, 68, 21, 50)", "South (24, 26, 42, 53, 72, 86, 1094)", "Center 1 (22, 36, 59, 63, 1202, 1317, 1320)", "Center 2 (25, 39, 51, 55, 56, 69, 37, 1310)", "Volga 1 (23, 40, 41, 43, 70, 71, 74)", "Volga 2 (28, 32, 34, 38, 52, 58, 64, 1309)", "Ural (27, 29, 30, 31, 33, 35, 47, 65, 78, 1088)", "SIB (44, 45, 46, 54, 57, 60, 66, 76, 83, 1095, 1304, 1306, 1311)"];
    //заполнение выпдающих списков
    fulfillSelect(mmsSelectRole, mmsRoles);
    fulfillSelect(mmsSelectRegion, mmsRegions);
    var radio1 = addRadioInput("mmsRadio", "Access to one store", "Access to one store", mmsFieldGroup[1], true);
    var radio2 = addRadioInput("mmsRadio", "Access to stores district", "Access to stores district", mmsFieldGroup[1]);
    mmsFieldGroup[1].onclick = handlerRadios;
    //сборка всех полей воедино
    addInputAndLabel("Укажите номер ТЦ:", mmsFieldGroup[1], "mms_store");
    mmsRegionGroup.appendChild(mmsLabelRegion);//Регион + лейбл
    mmsRegionGroup.appendChild(mmsSelectRegion);//Регион + лейбл
    mmsFieldGroup[1].appendChild(mmsRegionGroup);//Регион + лейбл
    mmsRolesGroup.appendChild(mmsLabelRole);//Роль + лейбл
    mmsRolesGroup.appendChild(mmsSelectRole);//Роль + лейбл
    mmsFieldGroup[1].appendChild(mmsRolesGroup);//Роль + лейбл
    appsTabDiv.appendChild(mmsFieldGroup[0]);
    //attachGroup.parentElement.insertBefore(mmsFieldGroup[0], attachGroup);
    var mmsStoreGroup = mmsFieldGroup[0].getElementsByTagName('input');
    for (var i = 0; i < mmsStoreGroup.length; i++) {
        if (mmsStoreGroup[i].type.toLowerCase() == 'text') {
            mmsStoreGroup = mmsStoreGroup[i].parentElement;
            break;
        }
    }
    //---------Поля для MMS Store END------------------------------------------

    //---------Поля для Listing----------------------------------------------
    var listingRoles = addGroupAndContainer("Роль для Listing:<font size=\"4\" color=\"red\">*</font>", "Укажите необходимые роли в Listing");
    var listingRole1 = addCheckbox("listingRoles", "Закупки", listingRoles[1]);
    var listingRole2 = addCheckbox("listingRoles", "Администратор", listingRoles[1]);
    var listingRole3 = addCheckbox("listingRoles", "MD Department", listingRoles[1]);
    var listingRole4 = addCheckbox("listingRoles", "MD Department GLN", listingRoles[1]);
    var listingRole5 = addCheckbox("listingRoles", "SCM GLN", listingRoles[1]);
    appsTabDiv.appendChild(listingRoles[0]);
    //attachGroup.parentElement.insertBefore(listingRoles[0], attachGroup);
    //---------Поля для Listing END------------------------------------------

    //---------Поля для MMS BS-------------------------------------------------
    var mmsBS_RolesGroup = addGroupAndContainer("Укажите роль:<font size=\"4\" color=\"red\">*</font>", "");
    var mmsBS_SelectRole = document.createElement("select");//выпадающий список ролей
    mmsBS_SelectRole.className = "text";//выпадающий список ролей
    var mmsBS_Roles = ["Read Only", "Invoice Control", "IM"];//выпадающий список ролей
    fulfillSelect(mmsBS_SelectRole, mmsBS_Roles);//выпадающий список ролей
    mmsBS_RolesGroup[1].appendChild(mmsBS_SelectRole);
    var mmsBS_checkbox = addCheckbox("mmsBS", "TECH_READ", mmsBS_RolesGroup[1]);
    appsTabDiv.appendChild(mmsBS_RolesGroup[0]);
    //attachGroup.parentElement.insertBefore(mmsBS_RolesGroup[0], attachGroup);
    //---------Поля для MMS BS END------------------------------------------
    //---------Поля для MDLS------------------------------------------------
    var mdls_ClientGroup = document.createElement("div");//действия+лейбл
    var mdls_LabelClient = document.createElement("label");
    mdls_LabelClient.className = "field-label";
    mdls_LabelClient.innerHTML = "В какой клиент нужен доступ:<font size=\"4\" color=\"red\">*</font>";
    var mdls_SelectClient = document.createElement("select");//выпадающий список действия
    mdls_SelectClient.className = "text";//выпадающий список действия
    var mdls_Clients = ["331 client", "333 client (alcohol import)"];//выпадающий список действия
    fulfillSelect(mdls_SelectClient, mdls_Clients);//выпадающий список действия
    mdls_ClientGroup.appendChild(mdls_LabelClient);
    mdls_ClientGroup.appendChild(mdls_SelectClient);
    var mdlsFieldGroup = addGroupAndContainer("", "");
    mdlsFieldGroup[1].appendChild(mdls_ClientGroup);
    var radio3 = addRadioInput("mdlsRadio", "New user", "New user", mdlsFieldGroup[1], true);
    var radio4 = addRadioInput("mdlsRadio", "Change user access", "Change user access", mdlsFieldGroup[1]);
    mdlsFieldGroup[1].onclick = handlerRadios2;
    addInputAndLabel("Copy access from / Скопировать доступ (если возможно):", mdlsFieldGroup[1], "MDLS_copy");
    addInputAndLabel("MDLS Login:<font size=\"4\" color=\"red\">*</font>", mdlsFieldGroup[1], "MDLS_login");
    addInputAndLabel("Add necessary roles from matrix / Указать необходимые роли для работы (если возможно):", mdlsFieldGroup[1], "MDLS_ROLES");
    appsTabDiv.appendChild(mdlsFieldGroup[0]);
    //attachGroup.parentElement.insertBefore(mdlsFieldGroup[0], attachGroup);
    //---------Поля для MDLS END------------------------------------------

    //---------Поля для MMS MD+ BEGIN------------------------------------------
    var mmsMDplus_FieldGroup = addGroupAndContainer("", "");
    var mmsMDplus_ActionGroup = document.createElement("div");//действия+лейбл
    var mmsMDplus_LabelAction = document.createElement("label");
    mmsMDplus_LabelAction.className = "field-label";
    mmsMDplus_LabelAction.innerHTML = "Necessary action:<font size=\"4\" color=\"red\">*</font>";
    var mmsMDplus_SelectAction = document.createElement("select");//выпадающий список действия
    mmsMDplus_SelectAction.className = "text";//выпадающий список действия
    var mmsMDplus_Actions = ["Create new account", "Add new CMA (PUAR) for existing account (without deletion existing accesses)", "Add new CMA (PUAR) for existing account with deletion of old accesses"];//выпадающий список действия
    fulfillSelect(mmsMDplus_SelectAction, mmsMDplus_Actions);//выпадающий список действия
    var mmsMDplus_RolesGroup = document.createElement("div");//Роль+лейбл
    var mmsMDplus_LabelRole = document.createElement("label");
    mmsMDplus_LabelRole.className = "field-label";
    mmsMDplus_LabelRole.innerHTML = "Role:<font size=\"4\" color=\"red\">*</font>";
    var mmsMDplus_SelectRole = document.createElement("select");//выпадающий список ролей
    mmsMDplus_SelectRole.className = "text";//выпадающий список ролей
    var mmsMDplus_Roles = ["OPERATIONS_ORD", "DNR OPERATOR", "DNR OPERATOR LIMITED", "MGL", "CM_FULL", "MGA", "Promotion Coordinator", "Quality Insurance", "IM", "IM + User Admin", "Store", "Read only", "Controlling", "MGI", "Rel_Pay_ADDR", "Listing", "UFM", "Supply Chain", "CM W/O ACTIVATION", "CM W/O ACTIVATION&PROCUREMENT", "LISTING+MASS DATA", "MERCH01_ACT&BLOCK", "MERCH02_ACT&BLOCK&PROC", "TAHD", "PRICING", "MERCH03_ACT&MASSDATA", "MEDIA_MARKT_COORDINATOR"];//выпадающий список ролей
    fulfillSelect(mmsMDplus_SelectRole, mmsMDplus_Roles);//выпадающий список ролей
    var mmsMDplus_LabelMatrix = document.createElement("label");//ссылка на матрицу
    mmsMDplus_LabelMatrix.className = "field-label";//ссылка на матрицу
    mmsMDplus_LabelMatrix.innerHTML = "Link to MD+ role matrix / Ссылка на ролевую матрицу MD+: <br><b>N:\\MCC\Public Data\\Common Templates\\IT Issues\\MD_Positions-Functions_new.xls</b>";
    mmsMDplus_ActionGroup.appendChild(mmsMDplus_LabelAction);//действие + лейбл
    mmsMDplus_ActionGroup.appendChild(mmsMDplus_SelectAction);//действие + лейбл
    mmsMDplus_RolesGroup.appendChild(mmsMDplus_LabelRole);//Роль + лейбл
    mmsMDplus_RolesGroup.appendChild(mmsMDplus_SelectRole);//Роль + лейбл
    mmsMDplus_FieldGroup[1].appendChild(mmsMDplus_ActionGroup);//Роль + лейбл
    mmsMDplus_FieldGroup[1].appendChild(mmsMDplus_RolesGroup);//Роль + лейбл
    addInputAndLabel("Necessary CMA (<i>If you need more than one CMA, please attach e-mail approval of Division Manager. Add \"-\" symbol for adding more than one CMA<\i>):", mmsMDplus_FieldGroup[1], "MD_CMA");
    addInputAndLabel("Necessary PUAR (<i>Add \"-\" symbol for adding more than one PUAR<\i>):", mmsMDplus_FieldGroup[1], "MD_PUAR");
    mmsMDplus_FieldGroup[1].appendChild(mmsMDplus_LabelMatrix);//ссылка на матрицу
    appsTabDiv.appendChild(mmsMDplus_FieldGroup[0]);
    //attachGroup.parentElement.insertBefore(mmsMDplus_FieldGroup[0], attachGroup);
    //---------Поля для MMS MD+ END--------------------------------------------




    handlerAccess();
    var appDiv = addGroupAndContainer("");
    var addApplication = document.createElement("a"); // ссылка на добавление папки
    addApplication.id = "AddApp";
    addApplication.setAttribute("href", "javascript:void(0);");
    addApplication.setAttribute("onclick", "return false;");
    addApplication.innerHTML = "<i class=\"aui-icon aui-icon-small aui-iconfont-list-add\"></i>&nbsp;Добавить выбранное приложение";
    appDiv[0].appendChild(addApplication);
    appsTabDiv.appendChild(appDiv[0]);
    //fatherForm.insertBefore(appDiv[0], attachGroup);
    addApplication.addEventListener("click", addApp, false);

// vvvvvvvvvvvvvvv Общее поле причины vvvvvvvvvvvvvvvvvvvv

    /*var reasonTextGroup = addGroupAndContainer("Комментарий", "Опишите для кого создается данная заявка");
    var reasonTextArea = document.createElement("textarea");//
    reasonTextArea.className = "textarea";
    reasonTextArea.setAttribute("rows", "6");
    reasonTextArea.setAttribute("cols", "10");
    reasonTextArea.style.overflow = "hidden";
    reasonTextArea.style.height = "165px;";
    reasonTextGroup[1].appendChild(reasonTextArea);*/
    var addLine = document.createElement("HR");
    attachGroup.parentElement.insertBefore(addLine, attachGroup);
    var reasonTextArea=addTextareaAndLabelAndDescr("Комментарий","Опишите для кого создается данная заявка")
    //appsTabDiv.appendChild(reasonTextArea[0]);
    attachGroup.parentElement.insertBefore(reasonTextArea[0], attachGroup);
    // ^^^^^^^^^^^^^ Общее поле причины ^^^^^^^^^^^^^^^^^^^^^^
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////

AJS.tabs.setup();
var btnPost = document.getElementsByClassName("buttons-container")[0];
btnPost = btnPost.getElementsByClassName("aui-button aui-button-primary")[0];
btnPost.addEventListener("click", compileTogether, false);	//обработчик клика на кнопку "Создать"
btnPost.addEventListener("keydown", compileTogether, false);//обработчик нажатия клавиатурой на кнопку "Создать"

function addFolderInput() {
    var folderGroup=addInputAndLabelAndDescr("Доступ в папку:", "Укажите путь к папке, в которую необходим доступ");
    folderGroup[1].className+=" folderAccess";
    folderAccess[0].insertBefore(folderGroup[0], addFolderHref);
}

function handlerHW() {
    if (hwExists1.checked) {
        hwCheckGroup[0].style.display = "none";
    } else {
        hwCheckGroup[0].style.display = "";
    }
}

    function addApp() {
        alert(accessTo.options[accessTo.selectedIndex].innerHTML);
    }

function compileTogether() {
    issueDescription.value = "|*Имя*|" + firstName[1].value + "|\r\n|*Фамилия*|" + lastNameame[1].value + "|\r\n|*Комната*|" + room[1].value + "|\r\n|*Компьютерное оборудование уже есть?*|";
    if (hwExists1.checked){
        issueDescription.value +=hwExists1.value+"|";
    } else {
        issueDescription.value +=hwExists2.value+"|\r\n|*Необходимое оборудование*|";
        if (hwCheck1.checked){issueDescription.value +="* "+hwCheck1.value+"\r\n";}
        if (hwCheck2.checked){issueDescription.value +="* "+hwCheck2.value+"\r\n";}
        if (hwCheck3.checked){issueDescription.value +="* "+hwCheck3.value+"\r\n";}
        if (hwCheck4.checked){issueDescription.value +="* "+hwCheck4.value+"\r\n";}
        if (hwCheck5.checked){issueDescription.value +="* "+hwCheck5.value+"\r\n";}
        if (hwCheck6.checked){issueDescription.value +="* "+hwCheck6.value+"\r\n";}
        if (hwCheck7.checked){issueDescription.value +="* "+hwCheck7.value+"\r\n";}
        if (hwCheck8.checked){issueDescription.value +="* "+hwCheck8.value+"\r\n";}
        if (hwCheck9.checked){issueDescription.value +="* "+hwCheck9.value+"\r\n";}
        if (hwCheck10.checked){issueDescription.value +="* "+hwCheck10.value;}
        issueDescription.value +="|";
    }
    issueDescription.value +="\r\n|*Телефон уже есть?*|";
    if (phExists1.checked){
        issueDescription.value +=phExists1.value+"|";
    } else {
        issueDescription.value +=phExists2.value+"|";
    }
    var allFolders=document.getElementsByClassName("folderAccess");
    if (allFolders.length>0) {
        issueDescription.value +="\r\n|*Запрошен доступ в папки*|";
        for (i = 0; i < allFolders.length; i++) {
            if (allFolders[i].value){
                issueDescription.value +="* "+allFolders[i].value+"\r\n"
            }
        }
        issueDescription.value +="|";
    }
    if (copyAccess[1].value){
        issueDescription.value +="\r\n|*Скопировать доступ*|"+copyAccess[1].value+"|";
    }

//if (Assortment1.checked) checkedAssortment += "* " + Assortment1.value + "\r\n";
}

    function handlerAccess() {
        switch (accessTo.value) {
            //MDLS:
            case "13744":
                mdlsFieldGroup[0].style.display = '';
                mmsFieldGroup[0].style.display = 'none';
                mmsBS_RolesGroup[0].style.display = 'none';
                mmsMDplus_FieldGroup[0].style.display = 'none';
                handlerRadios2();
                listingRoles[0].style.display = 'none';
                break;
            //MMS MD+:
            case "13747":
                mdlsFieldGroup[0].style.display = 'none';
                mmsFieldGroup[0].style.display = 'none';
                mmsBS_RolesGroup[0].style.display = 'none';
                mmsMDplus_FieldGroup[0].style.display = '';
                listingRoles[0].style.display = 'none';
                break;
            //MMS BS:
            case "13748":
                mdlsFieldGroup[0].style.display = 'none';
                mmsFieldGroup[0].style.display = 'none';
                mmsBS_RolesGroup[0].style.display = '';
                mmsMDplus_FieldGroup[0].style.display = 'none';
                listingRoles[0].style.display = 'none';
                break;
            //MMS STORE:
            case "13749":
                mdlsFieldGroup[0].style.display = 'none';
                mmsBS_RolesGroup[0].style.display = 'none';
                mmsFieldGroup[0].style.display = '';
                radio1.checked = true;
                mmsRegionGroup.style.display = 'none';
                mmsStoreGroup.style.display = '';
                mmsMDplus_FieldGroup[0].style.display = 'none';
                listingRoles[0].style.display = 'none';
                break;
            //Listing
            case "14204":
                mdlsFieldGroup[0].style.display = 'none';
                mmsFieldGroup[0].style.display = 'none';
                mmsBS_RolesGroup[0].style.display = 'none';
                mmsMDplus_FieldGroup[0].style.display = 'none';
                listingRoles[0].style.display = '';
                break;
            default:
                mdlsFieldGroup[0].style.display = 'none';
                mmsFieldGroup[0].style.display = 'none';
                mmsBS_RolesGroup[0].style.display = 'none';
                mmsMDplus_FieldGroup[0].style.display = 'none';
                listingRoles[0].style.display = 'none';
        }
    }

    function handlerRadios() { //для MMS Store
        if (radio1.checked) {
            mmsRegionGroup.style.display = 'none';
            mmsStoreGroup.style.display = '';
        } else {
            mmsRegionGroup.style.display = '';
            mmsStoreGroup.style.display = 'none';
        }
    }

    function handlerRadios2() { //для MDLS
        if (radio3.checked) {
            document.getElementById("MDLS_login").style.display = 'none';
        } else {
            document.getElementById("MDLS_login").style.display = '';

        }
    }

//------------------------Конец MULTI Request-------------------------------------------
} else {
substring = "customer/portal/281/create/641";

if (currentURL.indexOf(substring) !== -1) {
//------------------------Начало EMAIL Request-------------------------------------------
var fatherForm = document.getElementsByClassName("aui vp-form top-label vp-request-form")[0];
var issueDescription = document.getElementById("description");//поле для ввода деталей (description)
issueDescription.parentElement.parentElement.style.display = "none";

var otherTipGroup = document.createElement("div");
otherTipGroup.className = "field-group";
var otherTipLabel = document.createElement("label");
otherTipLabel.innerHTML = "<p style=\"padding: 7px; border-radius: 7px; border: 3px /*#99A5FF*/red double; margin: 0\"><i><b>Внимание!</b><br>Доступ к корпоративной почте с мобильных устройств по <a target=\"_blank\" href='https://jira.r4.madm.net/servicedesk/customer/portal/281/create/681'>заявкам Hardware/Software (Remote access).</a></i></p>";
otherTipGroup.appendChild(otherTipLabel);
fatherForm.insertBefore(otherTipGroup, issueDescription.parentElement.parentElement);

var emailGroup = addGroupAndContainer("Reason of request", "Укажите причину заявки");
var emailSelect = document.createElement("select");//выпадающий список причин
emailSelect.className = "text clientType";//выпадающий список причин
var emailTypes = ["Access to group mailbox", "Create new distribution list", "Add to/Remove from distribution list", "Create new group mailbox", "Access to mailbox of fired user"];
fulfillSelect2(emailSelect, emailTypes);
emailGroup[1].appendChild(emailSelect);

fatherForm.insertBefore(emailGroup[0], issueDescription.parentElement.parentElement);
var reason = addTextareaAndLabelAndDescr("Details:", "Детали заявки");
fatherForm.insertBefore(reason[0], issueDescription.parentElement.parentElement);
var btnPost = document.getElementsByClassName("buttons-container")[0];
btnPost = btnPost.getElementsByClassName("aui-button aui-button-primary")[0];
btnPost.addEventListener("click", compileTogether, false);	//обработчик клика на кнопку "Создать"
btnPost.addEventListener("keydown", compileTogether, false);//обработчик нажатия клавиатурой на кнопку "Создать"

function compileTogether() {
if (reason[1].value != "") {
    issueDescription.value = "|*Reason of request*|" + emailSelect.options[emailSelect.selectedIndex].innerHTML + "|\r\n|*Details*|" + reason[1].value+"|";
} else {
    issueDescription.value = "error";
}
}

//------------------------Конец EMAIL Request-------------------------------------------
} else {
substring = "customer/portal/281/create/621";
if (currentURL.indexOf(substring) !== -1) {
//------------------------Начало Reset Password-------------------------------------------
var placeToAdd = document.getElementById("description").parentElement.parentElement; // Место  рядом с которым будут добавляться поля
var fatherForm = document.getElementsByClassName("aui vp-form top-label vp-request-form")[0]; //родитель, форма
var otherApp = addInputAndLabelAndDescr("Приложение:", "Укажите приложение, для которого необходимо сбросить пароль, если его нет в списке"); // массив: 0 - вся гурппа, 1 - инпут
fatherForm.insertBefore(otherApp[0], placeToAdd);
var loginGroup = addInputAndLabelAndDescr("Login:", "Логин для входа в приложение"); // массив: 0 - вся гурппа, 1 - инпут
var sapMandatGroup = addInputAndLabelAndDescr("SAP мандат:", "Выберите SAP мандант, для которо надо сбросить пароль (например, 100)"); // массив: 0 - вся гурппа, 1 - инпут
fatherForm.insertBefore(loginGroup[0], placeToAdd);
fatherForm.insertBefore(sapMandatGroup[0], placeToAdd);
var appClient = addInputAndLabelAndDescr("Клиент:", "Номер ТЦ или клиента для выбранного приложения"); // массив: 0 - вся гурппа, 1 - инпут
fatherForm.insertBefore(appClient[0], placeToAdd);
var sapComment = addInputAndLabelAndDescr("Комментарий:", "Укажите ошибку, если не удалось сбросить пароль самостоятельно по ссылке выше."); // массив: 0 - вся гурппа, 1 - инпут
fatherForm.insertBefore(sapComment[0], placeToAdd);
var appChooser = document.getElementById("customfield_12402");
appChooser.onclick = handlerApp;
sapMandatGroup[0].style.display = "none";
sapComment[0].style.display = "none";
otherApp[0].style.display = "none";
var btnPost = document.getElementsByClassName("buttons-container")[0];
btnPost = btnPost.getElementsByClassName("aui-button aui-button-primary")[0];
var descrOfIssue = document.getElementById("description");
descrOfIssue.parentElement.parentElement.style.display = "none";
btnPost.addEventListener("click", compileTogetherRPW, false);	//обработчик клика на кнопку "Создать"
btnPost.addEventListener("keydown", compileTogetherRPW, false);//обработчик нажатия клавиатурой на кнопку "Создать"

var selfResetGroup = document.createElement("div");
selfResetGroup.className = "field-group";
var selfResetLabel = document.createElement("label");
selfResetLabel.innerHTML = "";
selfResetLabel.style.display = "none";
selfResetGroup.appendChild(selfResetLabel);
fatherForm.insertBefore(selfResetGroup, loginGroup[0]);
var mmsStoreTip = "<p style=\"padding: 7px; border-radius: 7px; border: 3px #99A5FF double; margin: 0\"><i>При наличии личного почтового ящика, пароль можно сбросить самостоятельно по инструкции: <br><a target=\"_blank\" href='https://confluence.r4.madm.net/pages/viewpage.action?pageId=41583551'>https://confluence.r4.madm.net/...</a></i></p>";
var MedaliaTip = "<p style=\"padding: 7px; border-radius: 7px; border: 3px #99A5FF double; margin: 0\"><i>Пароль для незаблокированного аккаунта можно сбросить самостоятельно по инструкции: <br><a target=\"_blank\" href='https://confluence.r4.madm.net/pages/viewpage.action?pageId=41583804'>https://confluence.r4.madm.net/...</a></i></p>";
var SapTip = "<p style=\"padding: 7px; border-radius: 7px; border: 3px #99A5FF double; margin: 0\"><i>При наличии личного почтового ящика и аккаунта формата 3466хххххххх, пароль можно сбросить самостоятельно по инструкции: <br><a target=\"_blank\" href='https://confluence.r4.madm.net/pages/viewpage.action?pageId=28901664'>https://confluence.r4.madm.net/...</a><br>При невозможности самостоятельного сброса пароля через портал - укажите ошибку в поле комментарий.</i></p>";

function handlerApp() {//выбор приложения для сброса пароля
    switch (appChooser.value) {//выбор типа реквеста (новый, замена, перенастройка)
        case "13512":
            sapMandatGroup[0].style.display = "none";
            sapComment[0].style.display = "none";
            selfResetLabel.innerHTML = mmsStoreTip;
            selfResetLabel.style.display = "";
            otherApp[0].style.display = "none";
            break;
        case "13522":
            sapMandatGroup[0].style.display = "none";
            sapComment[0].style.display = "none";
            selfResetLabel.innerHTML = MedaliaTip;
            selfResetLabel.style.display = "";
            otherApp[0].style.display = "none";
            break;
        case "13515":
        case "13516":
        case "13517":
            sapMandatGroup[0].style.display = "none";
            sapComment[0].style.display = "";
            selfResetLabel.innerHTML = SapTip;
            selfResetLabel.style.display = "";
            otherApp[0].style.display = "none";
            break;
        case "13514":
            sapMandatGroup[0].style.display = "";
            sapComment[0].style.display = "";
            selfResetLabel.innerHTML = SapTip;
            selfResetLabel.style.display = "";
            otherApp[0].style.display = "none";
            break;
        case "15607":
            otherApp[0].style.display = "";
            sapMandatGroup[0].style.display = "none";
            sapComment[0].style.display = "none";
            selfResetLabel.style.display = "none";
            break;
        default:
            sapMandatGroup[0].style.display = "none";
            sapComment[0].style.display = "none";
            selfResetLabel.style.display = "none";
            otherApp[0].style.display = "none";
    }
}

function compileTogetherRPW() {
    var alltogether;
    alltogether = "*Application*: " + appChooser.options[appChooser.selectedIndex].innerHTML + "\r\n*Login*: " + loginGroup[1].value;
    if (appChooser.value == "13514") {
        if (sapMandatGroup[1].value == "") {
            alltogether = "ERROR_REQUIRED_FIELDS";
        } else {
            alltogether += "\r\n*Sap Мандат*: " + sapMandatGroup[1].value;
        }
    }
    if ((appChooser.value == "13514" || appChooser.value == "13515" || appChooser.value == "13516" || appChooser.value == "13517") && alltogether!="ERROR_REQUIRED_FIELDS") {
        alltogether += "\r\n*Комментарий*: " + sapComment[1].value;
    }
    if (otherApp[1].value != "" && appChooser.value == "15607" && alltogether!="ERROR_REQUIRED_FIELDS") {
        alltogether += "\r\n*Приложение*: " + otherApp[1].value;
    }
    if (appClient[1].value != "" && alltogether!="ERROR_REQUIRED_FIELDS") {
        alltogether += "\r\n*Клиент*: " + appClient[1].value;
    }

    descrOfIssue.value = alltogether;
}

//------------------------Конец Reset Password--------------------------------------------
} else {
substring = "customer/portal/281/create/622";
if (currentURL.indexOf(substring) !== -1) {
    //------------------------Начало Folder Request--------------------------------------------
    var placeToAdd = document.getElementById("attachment-label").parentElement.parentElement.parentElement.parentElement; // Место  рядом с которым будут добавляться поля
    var fatherForm = document.getElementsByClassName("aui vp-form top-label vp-request-form")[0]; //родитель, форма
    var folderGlobalType = addGroupAndContainer("Type of Request:", "Создание новой папки или предоставление доступа в существующую папку");//массив, 0=группа, 1=контейнер
    var folderRadio1 = addRadioInput("folderType", "New folder request", "New folder request", folderGlobalType[1]);
    var folderRadio2 = addRadioInput("folderType", "Access to existing folder", "Access to existing folder", folderGlobalType[1],true);
    folderGlobalType[1].onclick = handlerFolderRadios;
    fatherForm.insertBefore(folderGlobalType[0], placeToAdd);

    var folderPath = addGroupAndContainer("Path of folder:", "Укажите путь до папки");//массив, 0=группа, 1=контейнер
    var folderPathSelect = document.createElement("select");
    folderPathSelect.className = "text";
    var folderPaths = ["Department Data", "Project Data", "Public Data", "Archives Storage", "Reports Storage"];
    fulfillSelect(folderPathSelect, folderPaths);
    folderPath[1].appendChild(folderPathSelect);
    fatherForm.insertBefore(folderPath[0], placeToAdd);

    var folderName = addInputAndLabelAndDescr("Folder name:", "Имя папки"); // массив: 0 - вся группа, 1 - инпут
    fatherForm.insertBefore(folderName[0], placeToAdd);

    var ROorRW = addGroupAndContainer("Access level:", "Доступ только на чтение (RO) или на чтение и запись (RW)");
    var ROorRWRadio1 = addRadioInput("ROorRW", "RO (только чтение)", "RO (только чтение)", ROorRW[1], true);
    var ROorRWRadio2 = addRadioInput("ROorRW", "RW (полный доступ)", "RW (полный доступ)", ROorRW[1]);
    fatherForm.insertBefore(ROorRW[0], placeToAdd);
    ROorRW[0].style.display = 'none';

    var folderAccess = addGroupAndContainer("Access:", "Доступ к папке (ограниченный или общий)");
    var folderAccessRadio1 = addRadioInput("folderAccess", "Specialized folder", "Specialized folder", folderAccess[1], true);
    var folderAccessRadio2 = addRadioInput("folderAccess", "For all users", "For all users", folderAccess[1]);
    folderAccess[1].onclick = handlerFolderAccessRadios;
    fatherForm.insertBefore(folderAccess[0], placeToAdd);

    var folderReason = addInputAndLabelAndDescr("Purpose of future folder:", "Назначение создаваемой папки"); // массив: 0 - вся группа, 1 - инпут
    fatherForm.insertBefore(folderReason[0], placeToAdd);
    var folderManager = addInputAndLabelAndDescr("Folder Manager:", "Владелец папки (не более двух)"); // массив: 0 - вся группа, 1 - инпут
    fatherForm.insertBefore(folderManager[0], placeToAdd);
    var folderListRO = addInputAndLabelAndDescr("List of Read Only Users:", "Список пользователей с правами на чтение"); // массив: 0 - вся группа, 1 - инпут
    fatherForm.insertBefore(folderListRO[0], placeToAdd);
    var folderListRW = addInputAndLabelAndDescr("List of Read/Write Users:", "Список пользователей с правами на чтение и запись"); // массив: 0 - вся группа, 1 - инпут
    fatherForm.insertBefore(folderListRW[0], placeToAdd);

    var btnPost = document.getElementsByClassName("buttons-container")[0];
    btnPost = btnPost.getElementsByClassName("aui-button aui-button-primary")[0];
    btnPost.addEventListener("click", compileTogetherFolder, false);	//обработчик клика на кнопку "Создать"
    btnPost.addEventListener("keydown", compileTogetherFolder, false);//обработчик нажатия клавиатурой на кнопку "Создать"
    var descrOfIssue = document.getElementById("description");
    descrOfIssue.parentElement.parentElement.style.display = "none";
    handlerFolderRadios();

    function handlerFolderRadios() { //обработчик выбора новая папка или существующая
        if (folderRadio1.checked) {
            folderAccess[0].style.display = '';
            ROorRW[0].style.display = 'none';
            folderManager[0].style.display = '';
            folderListRO[0].style.display = '';
            folderListRW[0].style.display = '';
            folderReason[0].getElementsByClassName("field-label")[0].innerHTML = "Purpose of future folder:";
            folderReason[0].getElementsByTagName("p")[0].innerHTML = "Назначение будущей папки";
        } else {
            folderAccess[0].style.display = 'none';
            ROorRW[0].style.display = '';
            folderManager[0].style.display = 'none';
            folderListRO[0].style.display = 'none';
            folderListRW[0].style.display = 'none';
            folderReason[0].getElementsByClassName("field-label")[0].innerHTML = "Reason for access to folder:";
            folderReason[0].getElementsByTagName("p")[0].innerHTML = "Причина для доступа в папку";
        }
    }

    function handlerFolderAccessRadios() { //обработчик выбора доступ в папку для всех или ограничен
        if (folderAccessRadio1.checked) {
            folderListRO[1].value = "";
            folderListRO[1].disabled = false;
        } else {
            folderListRO[1].value = "For all users";
            folderListRO[1].disabled = true;
        }
    }

    function compileTogetherFolder() {
        var alltogether;
        if (folderReason[1].value == "") {
            folderReason[1].value = " ";
        }
        if (folderRadio1.checked) {
            if (folderPathSelect.value != "-0" && folderName[1].value != "" && folderManager[1].value != "" && folderListRO[1].value != "" && folderListRW[1].value != "") {
                alltogether = "|*Type of Request*|New folder request|\r\n|*Path of folder*|" + folderPathSelect.options[folderPathSelect.selectedIndex].innerHTML + "|\r\n|*Folder name*|" + folderName[1].value
                    + "|\r\n|*Purpose*|" + folderReason[1].value + "|\r\n|*Folder Manager*|" + folderManager[1].value + "|\r\n|*List of Read Only Users*|" + folderListRO[1].value
                    + "|\r\n|*List of Read/Write Users*|" + folderListRW[1].value + "|";
            } else {
                alltogether = "ERROR_REQUIRED_FIELDS";
            }

        } else {
            if (folderPathSelect.value != "-0" && folderName[1].value != "") {
                var roORrwString="\r\n\|*Access level*|";
                if (ROorRWRadio1.checked){
                    roORrwString+="RO (только чтение)";
                } else {
                    roORrwString+="RW (полный доступ)";
                }
                alltogether = "|*Type of Request*|Access to existing folder|\r\n|*Path of folder*|" + folderPathSelect.options[folderPathSelect.selectedIndex].innerHTML + "|\r\n|*Folder name*|" + folderName[1].value
                    + roORrwString+"|\r\n|*Reason*|" + folderReason[1].value + "|";
            } else {
                alltogether = "ERROR_REQUIRED_FIELDS";
            }

        }
        descrOfIssue.value = alltogether;
    }

    //------------------------Конец Folder Request--------------------------------------------

} else {
    substring = "customer/portal/281/create/662";
    if (currentURL.indexOf(substring) !== -1) {
        //------------------------Начало Access Request-------------------------------------------
        var accessTo = document.getElementById("customfield_12602");
        accessTo.onclick = handlerAccess;
        var placeToAdd = document.getElementById("description").parentElement.parentElement;//вставлять элементы буду рядом с полем Description
        //--------Поля для MMS Store-----------------------------------------------------
        var mmsFieldGroup = addGroupAndContainer("", "");
        var mmsRolesGroup = document.createElement("div");//Роль+лейбл
        var mmsLabelRole = document.createElement("label");
        mmsLabelRole.className = "field-label";
        mmsLabelRole.innerHTML = "Укажите роль:";
        var mmsSelectRole = document.createElement("select");
        mmsSelectRole.className = "text";
        var mmsRoles = ["Audit", "HO_Operations", "Logistics", "LIM", "Работаю в ТЦ", "Не знаю роль"];
        var mmsRegionGroup = document.createElement("div");//Регион+лейбл
        var mmsLabelRegion = document.createElement("label");
        mmsLabelRegion.className = "field-label";
        mmsLabelRegion.innerHTML = "Укажите регион:<br>";
        var mmsSelectRegion = document.createElement("select");
        mmsSelectRegion.id = "mmsRegion";
        mmsSelectRegion.className = "text";
        var mmsRegions = ["Moscow 1 (12, 13, 19, 48, 49, 67, 1444, 1073)", "Moscow 2 (10, 11, 14, 17, 18, 61, 1307, 1308)", "SPB (15, 16, 20, 68, 21, 50)", "South (24, 26, 42, 53, 72, 86, 1094)", "Center 1 (22, 36, 59, 63, 1202, 1317, 1320)", "Center 2 (25, 39, 51, 55, 56, 69, 37, 1310)", "Volga 1 (23, 40, 41, 43, 70, 71, 74)", "Volga 2 (28, 32, 34, 38, 52, 58, 64, 1309)", "Ural (27, 29, 30, 31, 33, 35, 47, 65, 78, 1088)", "SIB (44, 45, 46, 54, 57, 60, 66, 76, 83, 1095, 1304, 1306, 1311)"];
        //заполнение выпдающих списков
        fulfillSelect(mmsSelectRole, mmsRoles);
        fulfillSelect(mmsSelectRegion, mmsRegions);
        var radio1 = addRadioInput("mmsRadio", "Access to one store", "Access to one store", mmsFieldGroup[1], true);
        var radio2 = addRadioInput("mmsRadio", "Access to stores district", "Access to stores district", mmsFieldGroup[1]);
        mmsFieldGroup[1].onclick = handlerRadios;
        //сборка всех полей воедино
        addInputAndLabel("Укажите номер ТЦ:", mmsFieldGroup[1], "mms_store");
        mmsRegionGroup.appendChild(mmsLabelRegion);//Регион + лейбл
        mmsRegionGroup.appendChild(mmsSelectRegion);//Регион + лейбл
        mmsFieldGroup[1].appendChild(mmsRegionGroup);//Регион + лейбл
        mmsRolesGroup.appendChild(mmsLabelRole);//Роль + лейбл
        mmsRolesGroup.appendChild(mmsSelectRole);//Роль + лейбл
        mmsFieldGroup[1].appendChild(mmsRolesGroup);//Роль + лейбл
        placeToAdd.parentElement.insertBefore(mmsFieldGroup[0], placeToAdd);
        var mmsStoreGroup = mmsFieldGroup[0].getElementsByTagName('input');
        for (var i = 0; i < mmsStoreGroup.length; i++) {
            if (mmsStoreGroup[i].type.toLowerCase() == 'text') {
                mmsStoreGroup = mmsStoreGroup[i].parentElement;
                break;
            }
        }
        //---------Поля для MMS Store END------------------------------------------

        //---------Поля для Listing----------------------------------------------
        var listingRoles = addGroupAndContainer("Роль для Listing:<font size=\"4\" color=\"red\">*</font>", "Укажите необходимые роли в Listing");
        var listingRole1 = addCheckbox("listingRoles", "Закупки", listingRoles[1]);
        var listingRole2 = addCheckbox("listingRoles", "Администратор", listingRoles[1]);
        var listingRole3 = addCheckbox("listingRoles", "MD Department", listingRoles[1]);
        var listingRole4 = addCheckbox("listingRoles", "MD Department GLN", listingRoles[1]);
        var listingRole5 = addCheckbox("listingRoles", "SCM GLN", listingRoles[1]);
        placeToAdd.parentElement.insertBefore(listingRoles[0], placeToAdd);
        //---------Поля для Listing END------------------------------------------

        //---------Поля для MMS BS-------------------------------------------------
        var mmsBS_RolesGroup = addGroupAndContainer("Укажите роль:<font size=\"4\" color=\"red\">*</font>", "");
        var mmsBS_SelectRole = document.createElement("select");//выпадающий список ролей
        mmsBS_SelectRole.className = "text";//выпадающий список ролей
        var mmsBS_Roles = ["Read Only", "Invoice Control", "IM"];//выпадающий список ролей
        fulfillSelect(mmsBS_SelectRole, mmsBS_Roles);//выпадающий список ролей
        mmsBS_RolesGroup[1].appendChild(mmsBS_SelectRole);
        var mmsBS_checkbox = addCheckbox("mmsBS", "TECH_READ", mmsBS_RolesGroup[1]);
        placeToAdd.parentElement.insertBefore(mmsBS_RolesGroup[0], placeToAdd);
        //---------Поля для MMS BS END------------------------------------------
        //---------Поля для MDLS------------------------------------------------
        var mdls_ClientGroup = document.createElement("div");//действия+лейбл
        var mdls_LabelClient = document.createElement("label");
        mdls_LabelClient.className = "field-label";
        mdls_LabelClient.innerHTML = "В какой клиент нужен доступ:<font size=\"4\" color=\"red\">*</font>";
        var mdls_SelectClient = document.createElement("select");//выпадающий список действия
        mdls_SelectClient.className = "text";//выпадающий список действия
        var mdls_Clients = ["331 client", "333 client (alcohol import)"];//выпадающий список действия
        fulfillSelect(mdls_SelectClient, mdls_Clients);//выпадающий список действия
        mdls_ClientGroup.appendChild(mdls_LabelClient);
        mdls_ClientGroup.appendChild(mdls_SelectClient);
        var mdlsFieldGroup = addGroupAndContainer("", "");
        mdlsFieldGroup[1].appendChild(mdls_ClientGroup);
        var radio3 = addRadioInput("mdlsRadio", "New user", "New user", mdlsFieldGroup[1], true);
        var radio4 = addRadioInput("mdlsRadio", "Change user access", "Change user access", mdlsFieldGroup[1]);
        mdlsFieldGroup[1].onclick = handlerRadios2;
        addInputAndLabel("Copy access from / Скопировать доступ (если возможно):", mdlsFieldGroup[1], "MDLS_copy");
        addInputAndLabel("MDLS Login:<font size=\"4\" color=\"red\">*</font>", mdlsFieldGroup[1], "MDLS_login");
        addInputAndLabel("Add necessary roles from matrix / Указать необходимые роли для работы (если возможно):", mdlsFieldGroup[1], "MDLS_ROLES");
        placeToAdd.parentElement.insertBefore(mdlsFieldGroup[0], placeToAdd);
        //---------Поля для MDLS END------------------------------------------

        //---------Поля для MMS MD+ BEGIN------------------------------------------
        var mmsMDplus_FieldGroup = addGroupAndContainer("", "");
        var mmsMDplus_ActionGroup = document.createElement("div");//действия+лейбл
        var mmsMDplus_LabelAction = document.createElement("label");
        mmsMDplus_LabelAction.className = "field-label";
        mmsMDplus_LabelAction.innerHTML = "Necessary action:<font size=\"4\" color=\"red\">*</font>";
        var mmsMDplus_SelectAction = document.createElement("select");//выпадающий список действия
        mmsMDplus_SelectAction.className = "text";//выпадающий список действия
        var mmsMDplus_Actions = ["Create new account", "Add new CMA (PUAR) for existing account (without deletion existing accesses)", "Add new CMA (PUAR) for existing account with deletion of old accesses"];//выпадающий список действия
        fulfillSelect(mmsMDplus_SelectAction, mmsMDplus_Actions);//выпадающий список действия
        var mmsMDplus_RolesGroup = document.createElement("div");//Роль+лейбл
        var mmsMDplus_LabelRole = document.createElement("label");
        mmsMDplus_LabelRole.className = "field-label";
        mmsMDplus_LabelRole.innerHTML = "Role:<font size=\"4\" color=\"red\">*</font>";
        var mmsMDplus_SelectRole = document.createElement("select");//выпадающий список ролей
        mmsMDplus_SelectRole.className = "text";//выпадающий список ролей
        var mmsMDplus_Roles = ["OPERATIONS_ORD", "DNR OPERATOR", "DNR OPERATOR LIMITED", "MGL", "CM_FULL", "MGA", "Promotion Coordinator", "Quality Insurance", "IM", "IM + User Admin", "Store", "Read only", "Controlling", "MGI", "Rel_Pay_ADDR", "Listing", "UFM", "Supply Chain", "CM W/O ACTIVATION", "CM W/O ACTIVATION&PROCUREMENT", "LISTING+MASS DATA", "MERCH01_ACT&BLOCK", "MERCH02_ACT&BLOCK&PROC", "TAHD", "PRICING", "MERCH03_ACT&MASSDATA", "MEDIA_MARKT_COORDINATOR"];//выпадающий список ролей
        fulfillSelect(mmsMDplus_SelectRole, mmsMDplus_Roles);//выпадающий список ролей
        var mmsMDplus_LabelMatrix = document.createElement("label");//ссылка на матрицу
        mmsMDplus_LabelMatrix.className = "field-label";//ссылка на матрицу
        mmsMDplus_LabelMatrix.innerHTML = "Link to MD+ role matrix / Ссылка на ролевую матрицу MD+: <br><b>N:\\MCC\Public Data\\Common Templates\\IT Issues\\MD_Positions-Functions_new.xls</b>";
        mmsMDplus_ActionGroup.appendChild(mmsMDplus_LabelAction);//действие + лейбл
        mmsMDplus_ActionGroup.appendChild(mmsMDplus_SelectAction);//действие + лейбл
        mmsMDplus_RolesGroup.appendChild(mmsMDplus_LabelRole);//Роль + лейбл
        mmsMDplus_RolesGroup.appendChild(mmsMDplus_SelectRole);//Роль + лейбл
        mmsMDplus_FieldGroup[1].appendChild(mmsMDplus_ActionGroup);//Роль + лейбл
        mmsMDplus_FieldGroup[1].appendChild(mmsMDplus_RolesGroup);//Роль + лейбл
        addInputAndLabel("Necessary CMA (<i>If you need more than one CMA, please attach e-mail approval of Division Manager. Add \"-\" symbol for adding more than one CMA<\i>):", mmsMDplus_FieldGroup[1], "MD_CMA");
        addInputAndLabel("Necessary PUAR (<i>Add \"-\" symbol for adding more than one PUAR<\i>):", mmsMDplus_FieldGroup[1], "MD_PUAR");
        mmsMDplus_FieldGroup[1].appendChild(mmsMDplus_LabelMatrix);//ссылка на матрицу
        placeToAdd.parentElement.insertBefore(mmsMDplus_FieldGroup[0], placeToAdd);
        //---------Поля для MMS MD+ END--------------------------------------------
		
		//---------Поля для SAM----------------------------------------------
        var SAMoptions = addGroupAndContainer("Выберите тип доступа:", "");
		var SAMr1 = addRadioInput("SAMoption", "SAM Navigator (SAM+CIP)", "SAM Navigator (SAM+CIP)", SAMoptions[1], true);
		var SAMr2 = addRadioInput("SAMoption", "MDB (SAM management dashboard)", "MDB (SAM management dashboard)", SAMoptions[1]);
		//fatherForm.insertBefore(forWhoGroup[0], issueDescription.parentElement.parentElement);
        placeToAdd.parentElement.insertBefore(SAMoptions[0], placeToAdd);
		var SAMTipGroup = document.createElement("div");
        SAMTipGroup.className = "field-group";
        var SAMTipLabel = document.createElement("label");
        SAMTipLabel.innerHTML = "<p style=\"padding: 7px; border-radius: 7px; border: 3px /*#99A5FF*/red double; margin: 0\"><i><b>Доступ для сотрудников отделов по работе с клиентами в приложение SAM и загрузка портфеля</i></b></p>";
        //SAMTipLabel.style.display = "none";
        SAMoptions[1].appendChild(SAMTipLabel);
        //placeToAdd.parentElement.insertBefore(SAMTipGroup, SAMoptions[0]);
		SAMoptions[1].onclick = handlerRadios3;
		var SAMPortfolio = addInputAndLabelAndDescr("Номер портфеля:", "Номер ID (портфеля). Например, 463"); // массив: 0 - вся группа, 1 - инпут
		placeToAdd.parentElement.insertBefore(SAMPortfolio[0], placeToAdd);		
		var SAMemails = addTextareaAndLabelAndDescr("Электронные адреса вашей команды*:", "Список электронных адресов вашей команды через запятую"); // массив: 0 - вся группа, 1 - инпут
		placeToAdd.parentElement.insertBefore(SAMemails[0], placeToAdd);
		var SAMstores = addInputAndLabelAndDescr("Номер(а) ТЦ*:", ""); // массив: 0 - вся группа, 1 - инпут
		placeToAdd.parentElement.insertBefore(SAMstores[0], placeToAdd);
		SAMPortfolio[0].style.display = 'none';
		SAMemails[0].style.display = 'none';
		SAMstores[0].style.display = 'none';
        //---------Поля для SAM------------------------------------------
		
        // vvvvvvvvvvvvvvv Общее поле причины vvvvvvvvvvvvvvvvvvvv
        var reasonTextGroup = addGroupAndContainer("Why you need access to application?", "Опишите причину либо иные комментарии к заявке");
        var reasonTextArea = document.createElement("textarea");//
        reasonTextArea.className = "textarea";
        reasonTextArea.setAttribute("rows", "6");
        reasonTextArea.setAttribute("cols", "10");
        reasonTextArea.style.overflow = "hidden";
        reasonTextArea.style.height = "165px;";
        reasonTextGroup[1].appendChild(reasonTextArea);
        placeToAdd.parentElement.insertBefore(reasonTextGroup[0], placeToAdd);
        // ^^^^^^^^^^^^^ Общее поле причины ^^^^^^^^^^^^^^^^^^^^^^

        var otherTipGroup = document.createElement("div");
        otherTipGroup.className = "field-group";
        var otherTipLabel = document.createElement("label");
        otherTipLabel.innerHTML = "<p style=\"padding: 7px; border-radius: 7px; border: 3px /*#99A5FF*/red double; margin: 0\"><i><b>Внимание!</b><br>Установка дополнительного ПО по <a target=\"_blank\" href='https://jira.r4.madm.net/servicedesk/customer/portal/281/create/681'>заявкам Hardware/Software.</a><br>Доступ в Webex запрашивается через портал <a target=\"_blank\" href='https://confluence.r4.madm.net/pages/viewpage.action?pageId=18251798'>по инструкции.</a></i></p>";
        otherTipLabel.style.display = "none";
        otherTipGroup.appendChild(otherTipLabel);
        placeToAdd.parentElement.insertBefore(otherTipGroup, reasonTextGroup[0]);

        handlerAccess();
        var btnPost = document.getElementsByClassName("buttons-container")[0];
        btnPost = btnPost.getElementsByClassName("aui-button aui-button-primary")[0];
        var descrOfIssue = document.getElementById("description");
        descrOfIssue.parentElement.parentElement.style.display = "none";
        btnPost.addEventListener("click", compileTogether, false);	//обработчик клика на кнопку "Создать"
        btnPost.addEventListener("keydown", compileTogether, false);//обработчик нажатия клавиатурой на кнопку "Создать"

        function compileTogether() {
            var alltogether="\r\n";
            switch (accessTo.value) {
                //MDLS:
                case "13744":
                    if (mdls_SelectClient.value != "-0") {
                        alltogether = "\r\n|*Client*|" + mdls_SelectClient.options[mdls_SelectClient.selectedIndex].innerHTML + "|\r\n";
                        if (radio3.checked) {
                            alltogether = "|\r\n|*Copy from*|" + document.getElementById("inp_MDLS_copy").value + "|\r\n|*Roles*|" + document.getElementById("inp_MDLS_ROLES").value + "|";

                        } else if (radio4.checked) {
                            if (document.getElementById("inp_MDLS_login").value != "") {
                                alltogether = "|\r\n|*Copy from*|" + document.getElementById("inp_MDLS_copy").value + "|\r\n|*MDLS login*|" + document.getElementById("inp_MDLS_login").value + "|\r\n|*Roles*|" + document.getElementById("inp_MDLS_ROLES").value + "|";
                            } else {
                                alltogether = "ERROR_REQUIRED_FIELDS";
                            }
                        }
                    } else {
                        alltogether = "ERROR_REQUIRED_FIELDS";
                    }
                    break;
                //MMS MD+:
                case "13747":
                    if (mmsMDplus_SelectRole.value != "-0" && mmsMDplus_SelectAction.value != "-0") {
                        alltogether = "\r\n|*Necessary action*|" + mmsMDplus_SelectAction.options[mmsMDplus_SelectAction.selectedIndex].innerHTML + "|\r\n|*Role*|" + mmsMDplus_SelectRole.options[mmsMDplus_SelectRole.selectedIndex].innerHTML + "|\r\n|*Necessary CMA*|" + document.getElementById("inp_MD_CMA").value + "|\r\n|*Necessary PUAR*|" + document.getElementById("inp_MD_PUAR").value + "|";
                    } else {
                        alltogether = "ERROR_REQUIRED_FIELDS";
                    }
                    break;
                //MMS BS:
                case "13748":
                    if (mmsBS_SelectRole.value != "-0") {
                        alltogether = "\r\n|*Role*|" + mmsBS_SelectRole.options[mmsBS_SelectRole.selectedIndex].innerHTML + "|";
                        if (mmsBS_checkbox.checked) alltogether += "\r\n|*TECH_READ*|Yes|"; else alltogether += "\r\n|*TECH_READ*|No|";
                    } else {
                        alltogether = "ERROR_REQUIRED_FIELDS";

                    }
                    break;
                //MMS STORE:
                case "13749":
                    if (radio1.checked) {
                        alltogether = "\r\n|*Access to one store*|" + document.getElementById("inp_mms_store").value + "|";
                    } else if (radio2.checked) {
                        alltogether = "\r\n|*Access to stores district*|" + mmsSelectRegion.options[mmsSelectRegion.selectedIndex].innerHTML + "|";
                    }
                    alltogether += "\r\n|*Role*|" + mmsSelectRole.options[mmsSelectRole.selectedIndex].innerHTML + "|";
                    break;
				//Listing
                case "14204":
                    var checkedlistingRole = "";
                    if (listingRole1.checked) checkedlistingRole += "* " + listingRole1.value + "\r\n";
                    if (listingRole2.checked) checkedlistingRole += "* " + listingRole2.value + "\r\n";
                    if (listingRole3.checked) checkedlistingRole += "* " + listingRole3.value + "\r\n";
                    if (listingRole4.checked) checkedlistingRole += "* " + listingRole4.value + "\r\n";
                    if (listingRole5.checked) checkedlistingRole += "* " + listingRole5.value + "\r\n";
                    if (checkedlistingRole) {
                        alltogether = "\r\n|*Роли для Listing*|" + checkedlistingRole + "|";
                    } else {
                        alltogether = "ERROR_REQUIRED_FIELDS";
                    }
                    break;
				//SAM
                case "14822":
					if (SAMstores[1].value!=''){
					 if (SAMr1.checked) {
						 alltogether = "\r\n|*Адрес(а) ТЦ*|"+SAMstores[1].value+"|\r\n|*Тип доступа SAM*|SAM Navigator (SAM+CIP)|";
						if (SAMPortfolio[1].value!=''){
							alltogether+="\r\n|*Номер портфеля*|"+SAMPortfolio[1].value+"|";						
						}
                    } else{
						if (SAMemails[1].value!=''){
							alltogether = "\r\n|*Номер(а) ТЦ*|"+SAMstores[1].value+"|\r\n|*Тип доступа SAM*|MDB (SAM management dashboard)|\r\n|*Электронные адреса команды*|"+SAMemails[1].value+"|";
						} else {
							alltogether = "ERROR_REQUIRED_FIELDS";
						}
                     }    
					} else {
						alltogether = "ERROR_REQUIRED_FIELDS";
					}					
				break;
                default:
                    alltogether = "";
            }
            if (alltogether !== "ERROR_REQUIRED_FIELDS") {

                descrOfIssue.value = alltogether + "\r\n|*Reason*|" + reasonTextArea.value+"|";
            } else descrOfIssue.value = alltogether;
        }

        function handlerAccess() {
            switch (accessTo.value) {
                //MDLS:
                case "13744":
					SAMoptions[0].style.display = 'none';
                    mdlsFieldGroup[0].style.display = '';
                    mmsFieldGroup[0].style.display = 'none';
                    mmsBS_RolesGroup[0].style.display = 'none';
                    mmsMDplus_FieldGroup[0].style.display = 'none';
                    handlerRadios2();
                    listingRoles[0].style.display = 'none';
                    otherTipLabel.style.display = 'none';
					SAMPortfolio[0].style.display = 'none';
					SAMemails[0].style.display = 'none';
                    break;
                //MMS MD+:
                case "13747":
					SAMoptions[0].style.display = 'none';
                    mdlsFieldGroup[0].style.display = 'none';
                    mmsFieldGroup[0].style.display = 'none';
                    mmsBS_RolesGroup[0].style.display = 'none';
                    mmsMDplus_FieldGroup[0].style.display = '';
                    listingRoles[0].style.display = 'none';
                    otherTipLabel.style.display = 'none';
					SAMPortfolio[0].style.display = 'none';
					SAMemails[0].style.display = 'none';
					SAMstores[0].style.display = 'none';
                    break;
                //MMS BS:
                case "13748":
					SAMoptions[0].style.display = 'none';
                    mdlsFieldGroup[0].style.display = 'none';
                    mmsFieldGroup[0].style.display = 'none';
                    mmsBS_RolesGroup[0].style.display = '';
                    mmsMDplus_FieldGroup[0].style.display = 'none';
                    listingRoles[0].style.display = 'none';
                    otherTipLabel.style.display = 'none';
					SAMPortfolio[0].style.display = 'none';
					SAMemails[0].style.display = 'none';
					SAMstores[0].style.display = 'none';
                    break;
                //MMS STORE:
                case "13749":
					SAMoptions[0].style.display = 'none';
                    mdlsFieldGroup[0].style.display = 'none';
                    mmsBS_RolesGroup[0].style.display = 'none';
                    mmsFieldGroup[0].style.display = '';
                    radio1.checked = true;
                    mmsRegionGroup.style.display = 'none';
                    mmsStoreGroup.style.display = '';
                    mmsMDplus_FieldGroup[0].style.display = 'none';
                    listingRoles[0].style.display = 'none';
                    otherTipLabel.style.display = 'none';
					SAMPortfolio[0].style.display = 'none';
					SAMemails[0].style.display = 'none';
					SAMstores[0].style.display = 'none';
                    break;
                //Listing
                case "14204":
					SAMoptions[0].style.display = 'none';
                    mdlsFieldGroup[0].style.display = 'none';
                    mmsFieldGroup[0].style.display = 'none';
                    mmsBS_RolesGroup[0].style.display = 'none';
                    mmsMDplus_FieldGroup[0].style.display = 'none';
                    listingRoles[0].style.display = '';
                    otherTipLabel.style.display = 'none';
					SAMPortfolio[0].style.display = 'none';
					SAMemails[0].style.display = 'none';
					SAMstores[0].style.display = 'none';
                    break;
				//SAM
                case "14822":
					SAMoptions[0].style.display = '';
                    mdlsFieldGroup[0].style.display = 'none';
                    mmsFieldGroup[0].style.display = 'none';
                    mmsBS_RolesGroup[0].style.display = 'none';
                    mmsMDplus_FieldGroup[0].style.display = 'none';
                    listingRoles[0].style.display = 'none';
                    otherTipLabel.style.display = 'none';
					SAMr1.checked = true;
					SAMPortfolio[0].style.display = '';
					SAMemails[0].style.display = 'none';
					SAMstores[0].style.display = '';
                    break;
				//Прочее ПО
                case "14505":
					SAMoptions[0].style.display = 'none';
                    mdlsFieldGroup[0].style.display = 'none';
                    mmsFieldGroup[0].style.display = 'none';
                    mmsBS_RolesGroup[0].style.display = 'none';
                    mmsMDplus_FieldGroup[0].style.display = 'none';
                    listingRoles[0].style.display = 'none';
                    otherTipLabel.style.display = '';
					SAMPortfolio[0].style.display = 'none';
					SAMemails[0].style.display = 'none';
					SAMstores[0].style.display = 'none';
                    break;
                default:
					SAMoptions[0].style.display = 'none';
                    mdlsFieldGroup[0].style.display = 'none';
                    mmsFieldGroup[0].style.display = 'none';
                    mmsBS_RolesGroup[0].style.display = 'none';
                    mmsMDplus_FieldGroup[0].style.display = 'none';
                    listingRoles[0].style.display = 'none';
                    otherTipLabel.style.display = 'none';
					SAMPortfolio[0].style.display = 'none';
					SAMemails[0].style.display = 'none';
					SAMstores[0].style.display = 'none';
            }
        }

        function handlerRadios() { //для MMS Store
            if (radio1.checked) {
                mmsRegionGroup.style.display = 'none';
                mmsStoreGroup.style.display = '';
            } else {
                mmsRegionGroup.style.display = '';
                mmsStoreGroup.style.display = 'none';
            }
        }

        function handlerRadios2() { //для MDLS
            if (radio3.checked) {
                document.getElementById("MDLS_login").style.display = 'none';
            } else {
                document.getElementById("MDLS_login").style.display = '';

            }
        }
		
		function handlerRadios3() { //для SAM
            if (SAMr1.checked) {
                SAMTipLabel.innerHTML = "<p style=\"padding: 7px; border-radius: 7px; border: 3px /*#99A5FF*/red double; margin: 0\"><i><b>Доступ для сотрудников отделов по работе с клиентами в приложение SAM и загрузка портфеля</b></i></p>";
				SAMPortfolio[0].style.display = '';
				SAMemails[0].style.display = 'none';
            } else {
                SAMTipLabel.innerHTML = "<p style=\"padding: 7px; border-radius: 7px; border: 3px /*#99A5FF*/red double; margin: 0\"><i><b>Доступ только для руководящих должностей отделов по работе с клиентами для просмотра аналитики SAM</b></i></p>";
				SAMPortfolio[0].style.display = 'none';
				SAMemails[0].style.display = '';

            }
        }

        //------------------------Конец Access Request-------------------------------------------
    }
}
}
}
}
}
}
}

//ниже общаг
function fulfillSelect2(selectElem, array) {
selectElem.style.display = 'inline-block';
for (var i = 0; i < array.length; i++) {// заполнение вариантов выбора в селект
var option = document.createElement("option");
option.value = (i + 1);
option.text = array[i];
selectElem.appendChild(option);
}
}

function fulfillSelect(selectElem, array) {
selectElem.style.display = 'inline-block';
var option0 = document.createElement("option");
option0.value = selectElem.id + "-0";
option0.text = "";
selectElem.appendChild(option0);
for (var i = 0; i < array.length; i++) {// заполнение вариантов выбора в селект
var option = document.createElement("option");
option.value = selectElem.id + "-" + (i + 1);
option.text = array[i];
selectElem.appendChild(option);
}
}

function addInputAndLabel(labelString, parent, targetID) {
var fieldGroup = document.createElement("div");
var fieldLabel = document.createElement("label");
fieldLabel.className = "field-label";
fieldLabel.innerHTML = labelString;
fieldInput = document.createElement("input");
fieldInput.className = "text";
fieldInput.setAttribute("type", "text");
fieldGroup.appendChild(fieldLabel);
fieldGroup.appendChild(fieldInput);
if (targetID !== undefined) {
fieldGroup.id = targetID;
fieldInput.id = "inp_" + targetID;
}
parent.appendChild(fieldGroup);
}

function addInputAndLabelAndDescr(labelString, description, targetID) {
var dynamicFieldGroup = document.createElement("div");
dynamicFieldGroup.className = "field-group";
if (targetID) {
dynamicFieldGroup.id = targetID;
}
var dynamicLabel = document.createElement("label");
dynamicLabel.className = "field-label";
dynamicLabel.innerHTML = labelString;
var dynamicFieldContainer = document.createElement("div");
dynamicFieldContainer.className = "field-container";
var dynamicInput = document.createElement("input");
dynamicInput.className = "text";
dynamicInput.setAttribute("type", "text");
dynamicFieldContainer.appendChild(dynamicInput);
var dynamicDescription = document.createElement("div");
dynamicDescription.className = "description";
var dynamicP = document.createElement("p");
dynamicP.innerHTML = description;
dynamicDescription.appendChild(dynamicP);
dynamicFieldGroup.appendChild(dynamicLabel);
dynamicFieldGroup.appendChild(dynamicFieldContainer);
dynamicFieldGroup.appendChild(dynamicDescription);
return [dynamicFieldGroup, dynamicInput];
}

function addGroupAndContainer(labelString, description) {
var dynamicFieldGroup = document.createElement("div");
dynamicFieldGroup.className = "field-group";
var dynamicFieldContainer = document.createElement("div");
dynamicFieldContainer.className = "field-container";
var dynamicLabel = document.createElement("label");
dynamicLabel.className = "field-label";
dynamicLabel.innerHTML = labelString;
dynamicFieldGroup.appendChild(dynamicLabel);
dynamicFieldGroup.appendChild(dynamicFieldContainer);
if (description) {
var dynamicDescription = document.createElement("div");
dynamicDescription.className = "description";
var dynamicP = document.createElement("p");
dynamicP.innerHTML = description;
dynamicDescription.appendChild(dynamicP);
dynamicFieldGroup.appendChild(dynamicDescription);
}
return [dynamicFieldGroup, dynamicFieldContainer];
}

function addCheckbox(nameChkbx, labelOption, father) {
var chkboxDiv = document.createElement('div');
chkboxDiv.className = "checkbox";
chkboxDiv.style.display = "inline-block";
chkboxDiv.style.margin = "3px";
var chkbox_option = document.createElement('input');
chkbox_option.className = "checkbox";
chkbox_option.setAttribute("name", nameChkbx);
chkbox_option.id = labelOption;
chkbox_option.type = "checkbox";
chkbox_option.value = labelOption;
var chkbox_label = document.createElement('label');
chkbox_label.setAttribute("for", labelOption);
chkbox_label.innerHTML = labelOption;
father.appendChild(chkboxDiv);
chkboxDiv.appendChild(chkbox_option);
chkboxDiv.appendChild(chkbox_label);
return chkbox_option;
}

function addRadioInput(nameRadio, targetID, labelOption, father,checked) {
var radioDiv = document.createElement('div');
radioDiv.className = "radio";
radioDiv.style.display = "inline-block";
radioDiv.style.margin = "3px";
var radio_option = document.createElement('input');
radio_option.className = "radio";
radio_option.setAttribute("name", nameRadio);
radio_option.id = targetID;
radio_option.type = "radio";
radio_option.value = labelOption;
if (checked){
radio_option.checked=true;
}
var radio_label = document.createElement('label');
radio_label.setAttribute("for", targetID);
radio_label.innerHTML = labelOption;
father.appendChild(radioDiv);
radioDiv.appendChild(radio_option);
radioDiv.appendChild(radio_label);
return radio_option;
}

function addTextareaAndLabelAndDescr(labelString, description, targetID) {
var dynamicFieldGroup = document.createElement("div");
dynamicFieldGroup.className="field-group";
if (targetID){
dynamicFieldGroup.id=targetID;
}
var dynamicLabel = document.createElement("label");
dynamicLabel.className="field-label";
dynamicLabel.innerHTML=labelString;
var dynamicFieldContainer = document.createElement("div");
dynamicFieldContainer.className="field-container";
var dynamicTextarea=document.createElement("textarea");
dynamicTextarea.className="textarea";
dynamicTextarea.setAttribute("rows", "6");
dynamicTextarea.setAttribute("cols", "10");
dynamicTextarea.style.overflow="hidden";
dynamicTextarea.style.height="165px";
dynamicFieldContainer.appendChild(dynamicTextarea);
var dynamicDescription = document.createElement("div");
dynamicDescription.className="description";
var dynamicP = document.createElement("p");
dynamicP.innerHTML=description;
dynamicDescription.appendChild(dynamicP);
dynamicFieldGroup.appendChild(dynamicLabel);
dynamicFieldGroup.appendChild(dynamicFieldContainer);
dynamicFieldGroup.appendChild(dynamicDescription);
return [dynamicFieldGroup,dynamicTextarea];
}
}
} )
})(jQuery);
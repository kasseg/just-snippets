(function($){
    SERVICEDESK_REGISTER_JAVASCRIPT( {
        onLocationChange: function(location) {
//window.localStorage.clear();
            var currentURL= window.location.href;
            substring = "customer/portal/261/create/703";
            substring2 = "customer/portal/261/create/1181";
            if (currentURL.indexOf(substring) !== -1 || currentURL.indexOf(substring2) !== -1){
//------------------------Начало CARDS-------------------------------------------
                var placeToAdd = document.getElementById("description").parentElement.parentElement; // раздел поля Description
                placeToAdd.style.display="none";
                var fatherForm = document.getElementsByClassName("aui vp-form top-label vp-request-form")[0]; //родитель, форма
                var findOptionalLabel=document.getElementsByClassName("vp-optional");
                for (var i=findOptionalLabel.length-1;i>=0;i--){
                    findOptionalLabel[i].parentElement.removeChild(findOptionalLabel[i]);
                }
                var clientStore = addInputAndLabelAndDescr("Магазин клиента:", "Введите номер ТЦ"); // массив: 0 - вся группа, 1 - инпут
                fatherForm.insertBefore(clientStore[0], placeToAdd);
                var clientNumber = addInputAndLabelAndDescr("Номер клиента:", "Введите номер клиента"); // массив: 0 - вся группа, 1 - инпут
                fatherForm.insertBefore(clientNumber[0], placeToAdd);
                if (currentURL.indexOf(substring) !== -1) {
                    var clientAdditionalCard = addInputAndLabelAndDescr("Номер дополнительной карты:", "Введите дополнительной карты клиента"); // массив: 0 - вся группа, 1 - инпут
                    fatherForm.insertBefore(clientAdditionalCard[0], placeToAdd);
                } else {
                    var clientName = addInputAndLabelAndDescr("Название клиента:", "Введите название клиента"); // массив: 0 - вся группа, 1 - инпут
                    fatherForm.insertBefore(clientName[0], placeToAdd);
                }
                var clientBirtday = addInputAndLabelAndDescr("Дата создания клиента:", ""); // массив: 0 - вся группа, 1 - инпут
                fatherForm.insertBefore(clientBirtday[0], placeToAdd);
                if (currentURL.indexOf(substring) !== -1) {
                    var typeBefore = addGroupAndContainer("Тип клиента до:", "");//массив: 0=группа, 1=контейнер
                    var typeBeforeSelect = document.createElement("select");
                    typeBeforeSelect.className = "text";
                    var clientTypes = ["Blue card", "Gold card", "VIP card"];
                    fulfillSelect2(typeBeforeSelect, clientTypes);
                    typeBefore[1].appendChild(typeBeforeSelect);
                    fatherForm.insertBefore(typeBefore[0], placeToAdd);

                    var typeAfter = addGroupAndContainer("Тип клиента после:", "");//массив: 0=группа, 1=контейнер
                    var typeAfterSelect = document.createElement("select");
                    typeAfterSelect.className = "text";
                    fulfillSelect2(typeAfterSelect, clientTypes);
                    typeAfter[1].appendChild(typeAfterSelect);
                    fatherForm.insertBefore(typeAfter[0], placeToAdd);
                } else {
                    var approver = addGroupAndContainer("Согласующий:", "");//массив: 0=группа, 1=контейнер
                    var approverSelect = document.createElement("select");
                    approverSelect.className = "text";
                    var approvers = ["Sulimov, Dmitry (dmitry.sulimov@metro-cc.ru)", "Burlyaeva, Yana (yana.burlyaeva@metro-cc.ru)", "Ryzhova, Kristina (kristina.ryzhova@metro-cc.ru)","Gutsalov, Vladimir (vladimir.gutsalov@metro-cc.ru)"];
                    fulfillSelect2(approverSelect, approvers);
                    approver[1].appendChild(approverSelect);
                    fatherForm.insertBefore(approver[0], placeToAdd);
                }
                clientBirtday[1].className+=" aui-date-picker";
                clientBirtday[1].id="calendarik";
                AJS.$('#calendarik').datePicker({'overrideBrowserDefault': true, 'firstDay':1, 'dateFormat': 'dd.mm.yy'});

                var btnPost = document.getElementsByClassName("buttons-container")[0];
                btnPost = btnPost.getElementsByClassName("aui-button aui-button-primary")[0];
                btnPost.addEventListener("click", compileTogether, false);	//обработчик клика на кнопку "Создать"
                btnPost.addEventListener("keydown", compileTogether, false);//обработчик нажатия клавиатурой на кнопку "Создать"

                function compileTogether() {
                    if (currentURL.indexOf(substring) !== -1) {
                        if (clientStore[1].value != "" && clientNumber[1].value != "" && clientBirtday[1].value != "" && clientAdditionalCard[1].value != "") {
                            if (clientAdditionalCard[1].value.length < 10 || clientNumber[1].value.length < 10) {
                                document.getElementById("description").value = "errorNubmers";
                            } else {
                                document.getElementById("description").value = "*Магазин клиента:* "
                                    + clientStore[1].value + "\r\n*Номер клиента:* "
                                    + clientNumber[1].value + "\r\n*Номер дополнительной карты:* "
                                    + clientAdditionalCard[1].value + "\r\n*Дата создания клиента:* "
                                    + clientBirtday[1].value + "\r\n*Тип клиента до:* "
                                    + typeBeforeSelect.options[typeBeforeSelect.selectedIndex].innerHTML + "\r\n*Тип клиента после:* "
                                    + typeAfterSelect.options[typeAfterSelect.selectedIndex].innerHTML;
                            }
                        } else {
                            document.getElementById("description").value = "error";
                        }
                    } else {
                        if (clientStore[1].value != "" && clientNumber[1].value != "" && clientBirtday[1].value != "" && clientName[1].value != "") {
                            document.getElementById("description").value = "*Магазин клиента:* "
                                + clientStore[1].value + "\r\n*Номер клиента:* "
                                + clientNumber[1].value + "\r\n*Название клиента:* "
                                + clientName[1].value + "\r\n*Дата создания клиента:* "
                                + clientBirtday[1].value + "\r\n*Тип клиента до:* Blue\r\n*Тип клиента после:* Gold\r\n"+approverSelect.options[approverSelect.selectedIndex].innerHTML;
                        } else {
                            document.getElementById("description").value = "error";
                        }
                    }
                }
//------------------------Конец CARDS-------------------------------------------
            } else {
                substring = "customer/portal/261/create/1101";
                if (currentURL.indexOf(substring) !== -1) {
//------------------------Начало Вторсырья-------------------------------------------
                    var placeToAdd = document.getElementById("description").parentElement.parentElement; // раздел поля Description
                    placeToAdd.style.display = "none";
                    var fatherForm = document.getElementsByClassName("aui vp-form top-label vp-request-form")[0]; //родитель, форма

                    var reqType = addGroupAndContainer("Тип запроса*:", "");//массив: 0=группа, 1=контейнер
                    var reqTypeSelect = document.createElement("select");
                    reqTypeSelect.className = "text";
                    var reqTypes = ["Новый покупатель", "Расторжение договора"];
                    fulfillSelect2(reqTypeSelect, reqTypes);
                    reqType[1].appendChild(reqTypeSelect);
                    fatherForm.insertBefore(reqType[0], placeToAdd);
                    var clientStore = addInputAndLabelAndDescr("Торговый центр*:", "Введите 4-значный номер ТЦ. Пример: 1012"); // массив: 0 - вся группа, 1 - инпут
                    fatherForm.insertBefore(clientStore[0], placeToAdd);
                    var clientNumber = addInputAndLabelAndDescr("Номер карты клиента*:", "Вводите в формате: № магазина_6 знаков. Пример: 1064_111111"); // массив: 0 - вся группа, 1 - инпут
                    fatherForm.insertBefore(clientNumber[0], placeToAdd);
                    var clientName = addInputAndLabelAndDescr("Наименование организации*:", ""); // массив: 0 - вся группа, 1 - инпут
                    fatherForm.insertBefore(clientName[0], placeToAdd);
                    var clientEmail = addInputAndLabelAndDescr("Электронная почта*:", "Действующий электронный адрес клиента в формате _@_._:  metro@metro.ru"); // массив: 0 - вся группа, 1 - инпут
                    fatherForm.insertBefore(clientEmail[0], placeToAdd);
                    var clientINN = addInputAndLabelAndDescr("INN/ИНН*:", "ИНН 10 знаков / Для ИП ИНН 12 знаков"); // массив: 0 - вся группа, 1 - инпут
                    fatherForm.insertBefore(clientINN[0], placeToAdd);
                    var clientKPP = addInputAndLabelAndDescr("KPP/КПП:", "КПП 9 знаков / Для ИП КПП отсутствует"); // массив: 0 - вся группа, 1 - инпут
                    fatherForm.insertBefore(clientKPP[0], placeToAdd);
                    var reporterComment = addTextareaAndLabelAndDescr("Комментарий автора:", "При необходимости, оставьте свой комментарий"); // массив: 0 - вся группа, 1 - текстареа
                    fatherForm.insertBefore(reporterComment[0], placeToAdd);

                    var btnPost = document.getElementsByClassName("buttons-container")[0];
                    btnPost = btnPost.getElementsByClassName("aui-button aui-button-primary")[0];
                    btnPost.addEventListener("click", compileTogether, false);	//обработчик клика на кнопку "Создать"
                    btnPost.addEventListener("keydown", compileTogether, false);//обработчик нажатия клавиатурой на кнопку "Создать"

                    function compileTogether() {
                        var federalType = "";
                        var letsCheck = checkForm();
                        if (letsCheck) {
                            document.getElementById("description").value = "|*Тип запроса*|" + reqTypeSelect.options[reqTypeSelect.selectedIndex].innerHTML
                                + "|\r\n|*Торговый центр*|" + clientStore[1].value + "|\r\n|*Номер карты клиента*|" + clientNumber[1].value + "|\r\n|*Наименование организации*|"
                                + clientName[1].value + "|\r\n|*Электронная почта*|" + clientEmail[1].value + "|\r\n|*INN/ИНН*|"
                                + clientINN[1].value + "|\r\n|*KPP/КПП*|" + clientKPP[1].value
                                + "\r\n|*Запрашиваемый кредитный лимит, RUR*|3|\r\n|*Запрашиваемое кол-во каледарных дней отсрочки платежа*|0|";
                            if (reporterComment[1].value) {
                                document.getElementById("description").value += "\r\n *Комментарий автора:*\r\n" + reporterComment[1].value;
                            }
                        }
                    }

                    function checkForm() { //проверка формы на ошибки. Возвращает true если всё ок
                        var formvalid = false;
                        if (clientStore[1].value != "" && clientNumber[1].value != "" && clientName[1].value != "" && clientEmail[1].value != ""
                            && clientINN[1].value != "") {
                            formvalid = true;
                        } else {
                            document.getElementById("description").value = "error";
                        }
                        if (clientStore[1].value.length != 4 && formvalid) { //№ ТЦ в формате 4 символов
                            document.getElementById("description").value = "errorStorelength";
                            formvalid = false;
                        }
                        if (clientNumber[1].value.length != 11 && formvalid) { //№ клиента в формате 11 символов
                            document.getElementById("description").value = "errorClientlength";
                            formvalid = false;
                        }
                        if (clientINN[1].value.length != 10 && clientINN[1].value.length != 12 && formvalid) { //проверка ИНН
                            document.getElementById("description").value = "errorINN";
                            formvalid = false;
                        }
                        if (clientKPP[1].value.length != 0 && clientKPP[1].value.length != 9 && formvalid) { //проверка КПП
                            document.getElementById("description").value = "errorKPP";
                            formvalid = false;
                        }
                        return formvalid;
                    }

//------------------------Конец Вторсырья-------------------------------------------
                } else {
                    substring = "customer/portal/261/create/1141";
                    if (currentURL.indexOf(substring) !== -1){
//------------------------Начало MRC-------------------------------------------
                        var placeToAdd = document.getElementById("description").parentElement.parentElement; // раздел поля Description
                        placeToAdd.style.display = "none";
                        var fatherForm = document.getElementsByClassName("aui vp-form top-label vp-request-form")[0]; //родитель, форма
                        var btnPost = document.getElementsByClassName("buttons-container")[0];
                        btnPost = btnPost.getElementsByClassName("aui-button aui-button-primary")[0];
                        btnPost.addEventListener("click", compileTogether, false);	//обработчик клика на кнопку "Создать"
                        btnPost.addEventListener("keydown", compileTogether, false);//обработчик нажатия клавиатурой на кнопку "Создать"

                        var clientStore = addInputAndLabelAndDescr("Торговый центр*:", "Введите 4-значный номер ТЦ. Пример: 1012"); // массив: 0 - вся группа, 1 - инпут
                        fatherForm.insertBefore(clientStore[0], placeToAdd);
                        var clientNumber = addInputAndLabelAndDescr("Номер карты клиента*:", "Вводите в формате: № магазина_6 знаков. Пример: 1064_111111"); // массив: 0 - вся группа, 1 - инпут
                        fatherForm.insertBefore(clientNumber[0], placeToAdd);
                        var clientLimit = addInputAndLabelAndDescr("Кредитный лимит*:", ""); // массив: 0 - вся группа, 1 - инпут
                        fatherForm.insertBefore(clientLimit[0], placeToAdd);
                        var clientDelay = addInputAndLabelAndDescr("Отсрочка*:", ""); // массив: 0 - вся группа, 1 - инпут
                        fatherForm.insertBefore(clientDelay[0], placeToAdd);
                        var commentBox = addTextareaAndLabelAndDescr("Комментарий","При необходимости, оставьте комментарий");
                        fatherForm.insertBefore(commentBox[0], placeToAdd);

                        function checkForm() { //проверка формы на ошибки. Возвращает true если всё ок
                            var formvalid = false;
                            if (clientStore[1].value != "" && clientNumber[1].value != "" && clientLimit[1].value != "" && clientDelay[1].value != "") {
                                formvalid = true;
                            } else {
                                document.getElementById("description").value = "error";
                            }
                            /*if (clientStore[1].value.length != 4 && formvalid) { //№ ТЦ в формате 4 символов
                                document.getElementById("description").value = "errorStorelength";
                                formvalid = false;
                            }
                            if (clientNumber[1].value.length != 11 && formvalid) { //№ клиента в формате 11 символов
                                document.getElementById("description").value = "errorClientlength";
                                formvalid = false;
                            }
                            if (clientINN[1].value.length != 10 && clientINN[1].value.length != 12 && formvalid) { //проверка ИНН
                                document.getElementById("description").value = "errorINN";
                                formvalid = false;
                            }
                            if (clientKPP[1].value.length != 0 && clientKPP[1].value.length != 9 && formvalid) { //проверка КПП
                                document.getElementById("description").value = "errorKPP";
                                formvalid = false;
                            }*/
                            return formvalid;
                        }

                        function compileTogether() {
                            var letsCheck = checkForm();
                            if (letsCheck) {
                                document.getElementById("description").value = "|*Торговый центр*|" + clientStore[1].value + "|\r\n|*Номер карты клиента*|"
                                    + clientNumber[1].value + "|\r\n|*Кредитный лимит*|"
                                    + clientLimit[1].value + "|\r\n|*Отсрочка*|" + clientDelay[1].value + "|";
                                if (commentBox[1].value) {
                                    document.getElementById("description").value += "\r\n *Комментарий автора:*\r\n" + commentBox[1].value;
                                }
                            }
                        }
//------------------------Конец MRC-----------------------------------------------
//------------------------Начало CENSUS-------------------------------------------
                    } else {
                        substring = "customer/portal/261/create/1362";
                        if (currentURL.indexOf(substring) !== -1) {
                            /*var placeToAdd = document.getElementById("description").parentElement.parentElement; // раздел поля Description
                            placeToAdd.style.display = "none";
                            var fatherForm = document.getElementsByClassName("aui vp-form top-label vp-request-form")[0]; //родитель, форма
                            var clientStore = addInputAndLabelAndDescr("ТЦ клиента*:", ""); // массив: 0 - вся группа, 1 - инпут
                            fatherForm.insertBefore(clientStore[0], placeToAdd);
                            var visitDate = addInputAndLabelAndDescr("Дата визита*:", ""); // массив: 0 - вся группа, 1 - инпут
                            fatherForm.insertBefore(visitDate[0], placeToAdd);
                            visitDate[1].className += " aui-date-picker";
                            visitDate[1].id = "calendarik";
                            AJS.$('#calendarik').datePicker({
                                'overrideBrowserDefault': true,
                                'firstDay': 1,
                                'dateFormat': 'dd.mm.yy'
                            });
                            var legalName = addInputAndLabelAndDescr("Юридическое наименование*:", ""); // массив: 0 - вся группа, 1 - инпут
                            fatherForm.insertBefore(legalName[0], placeToAdd);
                            var clientName = addInputAndLabelAndDescr("Название клиента – вывеска*:", ""); // массив: 0 - вся группа, 1 - инпут
                            fatherForm.insertBefore(clientName[0], placeToAdd);
                            var INN = addInputAndLabelAndDescr("ИНН*:", ""); // массив: 0 - вся группа, 1 - инпут
                            fatherForm.insertBefore(INN[0], placeToAdd);
                            var adress = addInputAndLabelAndDescr("Фактический адрес*:", ""); // массив: 0 - вся группа, 1 - инпут
                            fatherForm.insertBefore(adress[0], placeToAdd);*/
//------------------------Конец CENSUS---------------------------------------------
                        } else {
                        substring = "customer/portal/261/create/1381";
                        if (currentURL.indexOf(substring) !== -1) {
//------------------------Начало Расторжение контракта-------------------------------------------
                            var placeToAdd = document.getElementById("description").parentElement.parentElement; // раздел поля Description
                            placeToAdd.style.display = "none";
                            var fatherForm = document.getElementsByClassName("aui vp-form top-label vp-request-form")[0]; //родитель, форма
                            var clientNumber = addInputAndLabelAndDescr("Номер карты:", ""); // массив: 0 - вся группа, 1 - инпут
                            fatherForm.insertBefore(clientNumber[0], placeToAdd);
                            var clientName = addInputAndLabelAndDescr("Название клиента:", ""); // массив: 0 - вся группа, 1 - инпут
                            fatherForm.insertBefore(clientName[0], placeToAdd);
                            var turnover = addInputAndLabelAndDescr("Товарооборот за период контракта:", ""); // массив: 0 - вся группа, 1 - инпут
                            fatherForm.insertBefore(turnover[0], placeToAdd);
                            var debt = addInputAndLabelAndDescr("Задолженность перед МСС:", ""); // массив: 0 - вся группа, 1 - инпут
                            fatherForm.insertBefore(debt[0], placeToAdd);
                            var reason = addInputAndLabelAndDescr("Причина расторжения:", ""); // массив: 0 - вся группа, 1 - инпут
                            fatherForm.insertBefore(reason[0], placeToAdd);

                            var btnPost = document.getElementsByClassName("buttons-container")[0];
                            btnPost = btnPost.getElementsByClassName("aui-button aui-button-primary")[0];
                            btnPost.addEventListener("click", compileTogether, false);	//обработчик клика на кнопку "Создать"
                            btnPost.addEventListener("keydown", compileTogether, false);//обработчик нажатия клавиатурой на кнопку "Создать"

                            function compileTogether() {
                                if (clientNumber[1].value != "" && clientName[1].value != "" && turnover[1].value != "" && debt[1].value != "" && reason[1].value != "") {
                                    document.getElementById("description").value = "|*Номер карты*|" + clientNumber[1].value
                                        + "|\r\n|*Название клиента*|" + clientName[1].value + "|\r\n|*Товарооборот за период контракта*|" + turnover[1].value
                                        + "|\r\n|*Задолженность перед МСС*|" + debt[1].value
                                        + "|\r\n|*Причина расторжения*|" + reason[1].value;
                                } else {
                                    document.getElementById("description").value = "error";
                                }
                            }
//------------------------Конец Расторжение контракта---------------------------------------------
                        } else {
                        substring = "customer/portal/261/create/882";
                        if (currentURL.indexOf(substring) !== -1) {

//------------------------Начало IP Form-------------------------------------------
                            var placeToAdd = document.getElementById("description").parentElement.parentElement; // раздел поля Description
                            placeToAdd.style.display = "none";
                            var fatherForm = document.getElementsByClassName("aui vp-form top-label vp-request-form")[0]; //родитель, форма

                            var storeGroup = addGroupAndContainer("Выбор ТЦ*:", "");//массив: 0=группа, 1=контейнер
                            var storeSelect = document.createElement("select");
                            storeSelect.className = "text";
                            var stores = ["1010", "1011", "1012", "1013", "1014", "1015", "1016", "1017", "1018", "1019", "1020", "1021", "1022", "1023", "1024", "1025", "1026", "1027", "1028", "1029",
                                "1030", "1031", "1032", "1033", "1034", "1035", "1036", "1037", "1038", "1039", "1040", "1041", "1042", "1043", "1044", "1045", "1046", "1047", "1048", "1049",
                                "1050", "1051", "1052", "1053", "1054", "1055", "1056", "1057", "1058", "1059", "1060", "1061", "1062", "1063", "1064", "1065", "1066", "1067", "1068", "1069", "1070",
                                "1071", "1072", "1073", "1074", "1076", "1078", "1082", "1083", "1086", "1088", "1094", "1095", "1303", "1304", "1306", "1307", "1308", "1309", "1310", "1311", "1317",
                                "1318", "1320", "1336", "1337", "1340", "1342", "1356", "1357", "1444", "1491", "1492", "ЦО"];
                            fulfillSelect2(storeSelect, stores);
                            storeGroup[1].appendChild(storeSelect);
                            fatherForm.insertBefore(storeGroup[0], placeToAdd);

                            var summaGroup = addGroupAndContainer("Сумма*:", "");//массив: 0=группа, 1=контейнер
                            var summaSelect = document.createElement("select");
                            summaSelect.className = "text";
                            var summas = ["до 84 000 руб", "от 84 001 руб до 8,4 млн руб", "от 8,4 млн руб до 21 млн руб"];
                            fulfillSelect2(summaSelect, summas);
                            summaGroup[1].appendChild(summaSelect);
                            fatherForm.insertBefore(summaGroup[0], placeToAdd);
                            var specification = addInputAndLabelAndDescr("Описание / Specification*:", "Описание работ или оборудования"); // массив: 0 - вся группа, 1 - инпут
                            fatherForm.insertBefore(specification[0], placeToAdd);
                            var reason = addTextareaAndLabelAndDescr("Подробное обоснование / Reason*:", "Обоснование необходимости"); // массив: 0 - вся группа, 1 - инпут
                            fatherForm.insertBefore(reason[0], placeToAdd);
                            var costOfWork = addInputAndLabelAndDescr("Стоимость работ, оборудования в руб. без НДС / Cost of works, equipment in RUR without VAT*:", "Стоимость работ, оборудования в руб. без НДС, в формате: 100 000,00"); // массив: 0 - вся группа, 1 - инпут
                            fatherForm.insertBefore(costOfWork[0], placeToAdd);

                            var budgetGroup = addGroupAndContainer("Было предусмотренно в бюджете текущего года / Included in current year budget*:", "");
                            var budget1 = addRadioInput("budget", "Нет", budgetGroup[1], true);
                            var budget2 = addRadioInput("budget", "Да", budgetGroup[1]);
                            fatherForm.insertBefore(budgetGroup[0], placeToAdd);

                            var expansionGroup = addGroupAndContainer("Вид затрат / Type of expansion*:", "");
                            var expansion1 = addRadioInput("expansion", "CAPEX", expansionGroup[1], true);
                            var expansion2 = addRadioInput("expansion", "OPEX", expansionGroup[1]);
                            fatherForm.insertBefore(expansionGroup[0], placeToAdd);

                            var investmentID = addInputAndLabelAndDescr("Номер инвестиционного проекта / Investment ID (в случае CAPEX):", "ID проекта (после согласования на Capital Committee"); // массив: 0 - вся группа, 1 - инпут
                            fatherForm.insertBefore(investmentID[0], placeToAdd);

                            var vidZakupkiGroup = addGroupAndContainer("Вид закупки*:", "");//массив: 0=группа, 1=контейнер
                            var vidZakupkiSelect = document.createElement("select");
                            vidZakupkiSelect.className = "text";
                            var vidi = ["Первичная закупка", "Ремонт (<50%)", "Ремонт (>50%)", "Модернизация (с изменением первоначальных качеств)"];
                            fulfillSelect2(vidZakupkiSelect, vidi);
                            vidZakupkiGroup[1].appendChild(vidZakupkiSelect);
                            fatherForm.insertBefore(vidZakupkiGroup[0], placeToAdd);

                            var reasonRequestGroup = addGroupAndContainer("Причина заявки*:", "");//массив: 0=группа, 1=контейнер
                            var reasonRequestSelect = document.createElement("select");
                            reasonRequestSelect.className = "text";
                            var reasonRequests = ["Необходимость ТЦ", "Поломка", "Требование внутреннего аудита", "Требование  гос. органов"];
                            fulfillSelect2(reasonRequestSelect, reasonRequests);
                            reasonRequestGroup[1].appendChild(reasonRequestSelect);
                            fatherForm.insertBefore(reasonRequestGroup[0], placeToAdd);

                            var oldEquipGroup = addGroupAndContainer("При закупке нового оборудования старое:", "");//массив: 0=группа, 1=контейнер
                            var oldEquipSelect = document.createElement("select");
                            oldEquipSelect.className = "text";
                            var oldEquips = ["", "Останется в ТЦ", "Утилизируется", "Отсутствует(новый заказ)"];
                            fulfillSelect2(oldEquipSelect, oldEquips);
                            oldEquipGroup[1].appendChild(oldEquipSelect);
                            fatherForm.insertBefore(oldEquipGroup[0], placeToAdd);

                            var ownerGroup = addGroupAndContainer("В чьей собственности находится оборудование:", "");//массив: 0=группа, 1=контейнер
                            var ownerSelect = document.createElement("select");
                            ownerSelect.className = "text";
                            var ownerы = ["", "ТЦ", "Утилизируется", "Третьи лица"];
                            fulfillSelect2(ownerSelect, ownerы);
                            ownerGroup[1].appendChild(ownerSelect);
                            fatherForm.insertBefore(ownerGroup[0], placeToAdd);

                            var lifeForecastGroup = addGroupAndContainer("Предполагаемый срок использования:", "Вопрос касается работ по гидроизоляции, установки тентов на территории ТЦ");//массив: 0=группа, 1=контейнер
                            var lifeForecastSelect = document.createElement("select");
                            lifeForecastSelect.className = "text";
                            var lifeForecasts = ["", "До года", "От года до трех", "Больше трех"];
                            fulfillSelect2(lifeForecastSelect, lifeForecasts);
                            lifeForecastGroup[1].appendChild(lifeForecastSelect);
                            fatherForm.insertBefore(lifeForecastGroup[0], placeToAdd);

                            var workTypeGroup = addGroupAndContainer("Вид работ:", "");
                            var workType1 = addRadioInput("workType", "IT", workTypeGroup[1], true);
                            var workType2 = addRadioInput("workType", "Equipment", workTypeGroup[1]);
                            var workType3 = addRadioInput("workType", "Facility", workTypeGroup[1]);
                            var workType4 = addRadioInput("workType", "Construction", workTypeGroup[1]);
                            var workType5 = addRadioInput("workType", "Property", workTypeGroup[1]);
                            fatherForm.insertBefore(workTypeGroup[0], placeToAdd);
                            workTypeGroup[1].onclick = handlerType;

                            var priorityGroup = addGroupAndContainer("Приоритет работ для работ Facility и Property:", "");//массив: 0=группа, 1=контейнер
                            var prioritySelect = document.createElement("select");
                            prioritySelect.className = "text";
                            var priorities = ["1", "2", "3"];
                            fulfillSelect2(prioritySelect, priorities);
                            priorityGroup[1].appendChild(prioritySelect);
                            fatherForm.insertBefore(priorityGroup[0], placeToAdd);
                            priorityGroup[0].style.display = "none";

                            var tableGroup = addGroupAndContainer("Сравнительная таблица / Comparison table:");
                            var tableClients = createTable(["Компания / Company name", "Цена в руб. без НДС"]);
                            tableClients.id = "Table-clients";
                            tableGroup[0].appendChild(tableClients);
                            fatherForm.insertBefore(tableGroup[0], placeToAdd);
                            addRow(tableClients);
                            addRow(tableClients);
                            addRow(tableClients);


                            var btnPost = document.getElementsByClassName("buttons-container")[0];
                            btnPost = btnPost.getElementsByClassName("aui-button aui-button-primary")[0];
                            btnPost.addEventListener("click", compileTogether, false);	//обработчик клика на кнопку "Создать"
                            btnPost.addEventListener("keydown", compileTogether, false);//обработчик нажатия клавиатурой на кнопку "Создать"

                            function compileTogether() {
                                if (specification[1].value != "" && reason[1].value != "" && costOfWork[1].value != "") {
                                    document.getElementById("description").value = "|*№ ТЦ*|" + storeSelect.options[storeSelect.selectedIndex].innerHTML
                                        + "|\r\n|*Сумма*|" + summaSelect.options[summaSelect.selectedIndex].innerHTML + "|\r\n|*Описание / Specification*|" + specification[1].value
                                        + "|\r\n|*Подробное обоснование / Reason*|" + reason[1].value
                                        + "|\r\n|*Стоимость работ, оборудования в руб. без НДС / Cost of works, equipment in RUR without VAT*|" + costOfWork[1].value;
                                    var tempValue;
                                    if (budget1.checked) {
                                        tempValue = "Нет";
                                    } else {
                                        tempValue = "Да";
                                    }
                                    document.getElementById("description").value += "|\r\n|*Было предусмотренно в бюджете текущего года / Included in current year budget*|" + tempValue;
                                    if (expansion1.checked) {
                                        tempValue = "CAPEX|";
                                    } else {
                                        tempValue = "OPEX|";
                                    }
                                    var anotherTemp = "\r\n|*Номер инвестиционного проекта / Investment ID (в случае CAPEX)*";
                                    if (investmentID[1].value) {
                                        anotherTemp += investmentID[1].value + "|";
                                    } else {
                                        anotherTemp += " |";
                                    }
                                    document.getElementById("description").value += "|\r\n|*Вид затрат / Type of expansion*|" + tempValue + anotherTemp
                                        + "|\r\n|*Вид закупки*| " + vidZakupkiSelect.options[vidZakupkiSelect.selectedIndex].innerHTML
                                        + "|\r\n|*Причина заявки*| " + reasonRequestSelect.options[reasonRequestSelect.selectedIndex].innerHTML;
                                    if (oldEquipSelect.value != "1") {
                                        document.getElementById("description").value += "|\r\n|*При закупке нового оборудования старое*|" + oldEquipSelect.options[oldEquipSelect.selectedIndex].innerHTML;
                                    }
                                    if (ownerSelect.value != "1") {
                                        document.getElementById("description").value += "|\r\n|*В чьей собственности находится оборудование*|" + ownerSelect.options[ownerSelect.selectedIndex].innerHTML;
                                    }
                                    if (lifeForecastSelect.value != "1") {
                                        document.getElementById("description").value += "|\r\n|*Предполагаемый срок использования*|" + lifeForecastSelect.options[lifeForecastSelect.selectedIndex].innerHTML;
                                    }
                                    if (workType1.checked) {
                                        tempValue = "IT"
                                    } else if (workType2.checked) {
                                        tempValue = "Equipment"
                                    } else if (workType3.checked) {
                                        tempValue = "Facility|\r\n|*Приоритет работ для работ Facility и Property*|" + prioritySelect.options[prioritySelect.selectedIndex].innerHTML;
                                    } else if (workType4.checked) {
                                        tempValue = "Construction"
                                    } else tempValue = "Property|\r\n|*Приоритет работ для работ Facility и Property*|" + prioritySelect.options[prioritySelect.selectedIndex].innerHTML;

                                    document.getElementById("description").value += "|\r\n|*Вид работ*|" + tempValue + "|";

                                    var tabledata = "";
                                    $("#Table-clients tr").each(function (index) {
                                        if (index != 0) tabledata += "\r\n|";
                                        $('td', this).each(function () {
                                            var value = $(this).find(":input").val();
                                            if (!value) {
                                                value = " ";
                                            }
                                            tabledata += value + "|";
                                        })
                                    })
                                    document.getElementById("description").value += "\r\n\r\n||Компания / Company name||Цена в руб. без НДС||" + tabledata;

                                } else {
                                    document.getElementById("description").value = "error";
                                }

                            }

                            function handlerType() {
                                if (workType3.checked || workType5.checked) {
                                    priorityGroup[0].style.display = "";
                                } else {
                                    priorityGroup[0].style.display = "none";
                                }
                            }

//------------------------Конец IP Form--------------------------------------------
                        } else {
                            substring = "customer/portal/261/create/862";
                            if (currentURL.indexOf(substring) !== -1) {
//------------------------Начало STRETCH FILM-------------------------------------------
                                var placeToAdd = document.getElementById("description").parentElement.parentElement; // раздел поля Description
                                placeToAdd.style.display = "none";
                                var fatherForm = document.getElementsByClassName("aui vp-form top-label vp-request-form")[0]; //родитель, форма

                                var costCenter = addInputAndLabelAndDescr("Cost Center*:", ""); // массив: 0 - вся группа, 1 - инпут
                                fatherForm.insertBefore(costCenter[0], placeToAdd);
                                var stretchType = addGroupAndContainer("Наименование товара:", "");//массив: 0=группа, 1=контейнер
                                var stretchTypeSelect = document.createElement("select");
                                stretchTypeSelect.className = "text";
                                var stratches = ["Вторичная стретч-пленка ширина 450-500 мм, толщина 20 мкм, вес рулона (netto) 2,2 кг",
                                    "Стретч-пленка РЕ ширина 450-500 мм, толщина 17 мкм, вес рулона (netto) 2,4 кг", "Стретч-пленка 500*300 17 мкм 2,5 кг",
                                    "Пленка 450*360 17 мкм 2,5 кг", "Первичная пленка 500*160 , 17 мм", "Стретч-пленка Manuli Stretch 9 мкм 1,86 кг", "Стретч-пленка Manuli Stretch 9 мкм 2,24 кг"];
                                fulfillSelect2(stretchTypeSelect, stratches);
                                stretchType[1].appendChild(stretchTypeSelect);
                                fatherForm.insertBefore(stretchType[0], placeToAdd);
                                var orderType = addGroupAndContainer("Тип заказа:", "");
                                var order1 = addRadioInput("orderType", "Регулярный ежемесячный заказ", orderType[1], true);
                                var order2 = addRadioInput("orderType", "Дополнительный заказ", orderType[1]);
                                fatherForm.insertBefore(orderType[0], placeToAdd);
                                orderType[1].onclick = handlerOrderType;
                                var orderReason = addTextareaAndLabelAndDescr("Причина дополнительного заказа*:", "");//массив: 0=группа, 1=textarea
                                fatherForm.insertBefore(orderReason[0], placeToAdd);
                                orderReason[0].style.display = "none";
                                var price = addInputAndLabelAndDescr("Цена рулона с НДС*:", ""); // массив: 0 - вся группа, 1 - инпут
                                fatherForm.insertBefore(price[0], placeToAdd);
                                var count = addInputAndLabelAndDescr("Кол-во*:", ""); // массив: 0 - вся группа, 1 - инпут
                                fatherForm.insertBefore(count[0], placeToAdd);
                                var itogo = addInputAndLabelAndDescr("Сумма*:", ""); // массив: 0 - вся группа, 1 - инпут
                                fatherForm.insertBefore(itogo[0], placeToAdd);

                                var btnPost = document.getElementsByClassName("buttons-container")[0];
                                btnPost = btnPost.getElementsByClassName("aui-button aui-button-primary")[0];
                                btnPost.addEventListener("click", compileTogether, false);	//обработчик клика на кнопку "Создать"
                                btnPost.addEventListener("keydown", compileTogether, false);//обработчик нажатия клавиатурой на кнопку "Создать"
                                function compileTogether() {
                                    if (costCenter[1].value == "" || price[1].value == "" || count[1].value == "" || itogo[1].value == "") {
                                        document.getElementById("description").value = "error";
                                    } else if (order2.checked && orderReason[1].value == "") {
                                        document.getElementById("description").value = "errorReason";
                                    } else {
                                        document.getElementById("description").value = "*Cost center:* " + costCenter[1].value + "\r\n*Наименование товара:* "
                                            + stretchTypeSelect.options[stretchTypeSelect.selectedIndex].innerHTML;
                                        if (order1.checked) {
                                            document.getElementById("description").value += "\r\n*Тип заказа:* " + order1.value;
                                        } else {
                                            document.getElementById("description").value += "\r\n*Тип заказа:* " + order2.value + "\r\n*Причина доп. заказа:* " + orderReason[1].value;
                                        }
                                        document.getElementById("description").value += "\r\n*Цена рулона с НДС:* " + price[1].value + "\r\n*Кол-во:* " + count[1].value
                                            + "\r\n*Сумма:* " + itogo[1].value;
                                    }
                                }

                                function handlerOrderType() {
                                    if (order1.checked) {
                                        orderReason[0].style.display = "none";
                                    } else {
                                        orderReason[0].style.display = "";
                                    }
                                }

//------------------------Конец STRETCH FILM-------------------------------------------|
                            } else {
                                substring = "customer/portal/261/create/741";//регулярные клиенты
                                substring2 = "customer/portal/261/create/761";//федеральные клиенты
                                substring3 = "customer/portal/261/create/762";//фасоль
                                substring4 = "customer/portal/261/create/763";//FSD
                                substring5 = "customer/portal/261/create/764";//регулярные клиенты seasonal
                                substring6 = "customer/portal/261/create/765";//федеральные клиенты seasonal
                                substring7 = "customer/portal/261/create/767";//кредитный коммитет
                                substring8 = "customer/portal/261/create/768";//тендерные клиенты
                                substring88 = "customer/portal/261/create/1102";//тендерные клиенты MGB
                                substring9 = "customer/portal/261/create/1103";//тендерный коммитет MGB
                                substring99 = "customer/portal/261/create/769";//тендерный коммитет
                                substring10 = "customer/portal/261/create/781";//E-commerce
                                substring11 = "customer/portal/261/create/801";//СЭНСУС
                                if (currentURL.indexOf(substring) !== -1 || currentURL.indexOf(substring2) !== -1 || currentURL.indexOf(substring3) !== -1 || currentURL.indexOf(substring4) !== -1 || currentURL.indexOf(substring5) !== -1 || currentURL.indexOf(substring6) !== -1 || currentURL.indexOf(substring7) !== -1 || currentURL.indexOf(substring8) !== -1 || currentURL.indexOf(substring9) !== -1 || currentURL.indexOf(substring10) !== -1 || currentURL.indexOf(substring11) !== -1 || currentURL.indexOf(substring88) !== -1 || currentURL.indexOf(substring99) !== -1) {
//---------------------------------------------------------------------------------------------------------------
//-----------------------------------CREDIT LIMITS BEGIN---------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------
                                    var placeToAdd = document.getElementById("description").parentElement.parentElement; // раздел поля Description
                                    placeToAdd.style.display = "none";
                                    var fatherForm = document.getElementsByClassName("aui vp-form top-label vp-request-form")[0]; //родитель, форма

                                    if (currentURL.indexOf(substring) !== -1 || currentURL.indexOf(substring2) !== -1 || currentURL.indexOf(substring3) !== -1 || currentURL.indexOf(substring4) !== -1 || currentURL.indexOf(substring7) !== -1 || currentURL.indexOf(substring10) !== -1) {
                                        var seasons = ["Постоянный лимит", "Временный лимит"];
                                        var seasonalGroup = addGroupAndContainer("Тип кредитного лимита:", "");//массив: 0=группа, 1=контейнер
                                        var seasonalSelect = document.createElement("select");
                                        seasonalSelect.className = "text";
                                        fulfillSelect2(seasonalSelect, seasons);
                                        seasonalGroup[1].appendChild(seasonalSelect);
                                        fatherForm.insertBefore(seasonalGroup[0], placeToAdd);
                                        seasonalSelect.onclick = handlerSeasons;//обработчик выбора типа лимита
                                    }


                                    if (currentURL.indexOf(substring4) !== -1) { //Для клиентов FSD доп выбор региона
                                        var fsdTypes = ["FSD Moscow", "FSD Spb", "FSD South"];
                                        var fsdType = addGroupAndContainer("Выбор FSD:", "");//массив: 0=группа, 1=контейнер
                                        var fsdTypeSelect = document.createElement("select");
                                        fsdTypeSelect.className = "text";
                                        fulfillSelect2(fsdTypeSelect, fsdTypes);
                                        fsdType[1].appendChild(fsdTypeSelect);
                                        fatherForm.insertBefore(fsdType[0], placeToAdd);
                                    }
                                    if (currentURL.indexOf(substring2) !== -1 || currentURL.indexOf(substring6) !== -1) { //Для федеральных клиентов доп выбор типа клиента
                                        var federalCustomerTypes = ["Federal Traders, SCO", "Federal HoReCa"];
                                        var federalclientType = addGroupAndContainer("Тип федерального клиента:", "");//массив: 0=группа, 1=контейнер
                                        var federalclientTypeSelect = document.createElement("select");
                                        federalclientTypeSelect.className = "text";
                                        fulfillSelect2(federalclientTypeSelect, federalCustomerTypes);
                                        federalclientType[1].appendChild(federalclientTypeSelect);
                                        fatherForm.insertBefore(federalclientType[0], placeToAdd);
                                    }
                                    if (!(currentURL.indexOf(substring7) !== -1 || currentURL.indexOf(substring9) !== -1 || currentURL.indexOf(substring99) !== -1 || currentURL.indexOf(substring11) !== -1)) {
                                        var Ranges = ["", "до 50 000", "от 50 001 до 200 000", "от 200 001 до 500 000", "от 500 001 до 999 999"];
                                        var RangesFederal = ["", "до 500 000", "от 500 001 до 999 999"];
                                        var RangesFasol = ["", "до 200 000", "от 200 001 до 500 000", "от 500 001 до 999 999"]; // FSD Same
                                        var RangesTenders = ["", "до 100 000", "от 100 001 до 499 999"];
                                        var clientRange = addGroupAndContainer("Запрашиваемый диапазон кредитного лимита:", "");//массив: 0=группа, 1=контейнер
                                        var clientRangeSelect = document.createElement("select");
                                        clientRangeSelect.className = "text";
                                        if (currentURL.indexOf(substring) !== -1 || currentURL.indexOf(substring5) !== -1 || currentURL.indexOf(substring4) !== -1) {
                                            fulfillSelect2(clientRangeSelect, Ranges);
                                        } else if (currentURL.indexOf(substring2) !== -1 || currentURL.indexOf(substring6) !== -1) {
                                            fulfillSelect2(clientRangeSelect, RangesFederal);
                                        } else if (currentURL.indexOf(substring3) !== -1 || currentURL.indexOf(substring10) !== -1) {
                                            fulfillSelect2(clientRangeSelect, RangesFasol);
                                        } else if (currentURL.indexOf(substring8) !== -1 || currentURL.indexOf(substring88) !== -1) {
                                            fulfillSelect2(clientRangeSelect, RangesTenders);
                                        }
                                        clientRange[1].appendChild(clientRangeSelect);
                                        fatherForm.insertBefore(clientRange[0], placeToAdd);
                                    }

                                    var customerTypes = ["", "Новый", "Действующий"];
                                    var clientType = addGroupAndContainer("Client/Клиент:", "");//массив: 0=группа, 1=контейнер
                                    var clientTypeSelect = document.createElement("select");
                                    clientTypeSelect.className = "text";
                                    fulfillSelect2(clientTypeSelect, customerTypes);
                                    clientType[1].appendChild(clientTypeSelect);
                                    fatherForm.insertBefore(clientType[0], placeToAdd);
                                    clientTypeSelect.onclick = handlerClientType;//обработчик выбора типа клиента
                                    if (currentURL.indexOf(substring2) !== -1 || currentURL.indexOf(substring3) !== -1 || currentURL.indexOf(substring6) !== -1 || currentURL.indexOf(substring7) !== -1 || currentURL.indexOf(substring8) !== -1 || currentURL.indexOf(substring88) !== -1 || currentURL.indexOf(substring9) !== -1 || currentURL.indexOf(substring99) !== -1) {
                                        var clientStore = addInputAndLabelAndDescr("GM#/ТЦ №:", "Введите 4-значный номер ТЦ. Пример: 1012. Если несколько ТЦ внесите «0000» и укажите их в таблице ниже"); // массив: 0 - вся группа, 1 - инпут
                                    } else {
                                        var clientStore = addInputAndLabelAndDescr("GM#/ТЦ №:", "Введите 4-значный номер ТЦ. Пример: 1012"); // массив: 0 - вся группа, 1 - инпут
                                    }

                                    fatherForm.insertBefore(clientStore[0], placeToAdd);
                                    if (currentURL.indexOf(substring2) !== -1 || currentURL.indexOf(substring3) !== -1 || currentURL.indexOf(substring6) !== -1 || currentURL.indexOf(substring7) !== -1 || currentURL.indexOf(substring8) !== -1 || currentURL.indexOf(substring88) !== -1 || currentURL.indexOf(substring9) !== -1 || currentURL.indexOf(substring99) !== -1) {
                                        var clientNumber = addInputAndLabelAndDescr("CFM Cu_No (номер карты клиента):", "Вводите в формате: № магазина_6 знаков. Пример: 1064_111111. Если несколько ТЦ внесите «0000_000000» и укажите их в таблице ниже"); // массив: 0 - вся группа, 1 - инпут
                                    } else {
                                        var clientNumber = addInputAndLabelAndDescr("CFM Cu_No (номер карты клиента):", "Вводите в формате: № магазина_6 знаков. Пример: 1064_111111"); // массив: 0 - вся группа, 1 - инпут
                                    }
                                    fatherForm.insertBefore(clientNumber[0], placeToAdd);
                                    var clientLegalName = addInputAndLabelAndDescr("Legal customer name / Юр название компании:", "Обязательно к указанию организационно-правовая форма компании: ООО/АО/ЗАО и тд."); // массив: 0 - вся группа, 1 - инпут
                                    fatherForm.insertBefore(clientLegalName[0], placeToAdd);
                                    var clientLogoName = addInputAndLabelAndDescr("Logo name / Фактическое название:", "Фактическое наименование организации"); // массив: 0 - вся группа, 1 - инпут
                                    fatherForm.insertBefore(clientLogoName[0], placeToAdd);
                                    var clientEmail = addInputAndLabelAndDescr("E-mail address/Электронная почта:", "Действующий электронный адрес клиента в формате _@_._:  metro@metro.ru"); // массив: 0 - вся группа, 1 - инпут
                                    fatherForm.insertBefore(clientEmail[0], placeToAdd);
                                    var clientINN = addInputAndLabelAndDescr("INN/ИНН:", "ИНН 10 знаков / Для ИП ИНН 12 знаков"); // массив: 0 - вся группа, 1 - инпут
                                    fatherForm.insertBefore(clientINN[0], placeToAdd);
                                    var clientKPP = addInputAndLabelAndDescr("KPP/КПП:", "КПП 9 знаков / Для ИП КПП отсутствует"); // массив: 0 - вся группа, 1 - инпут
                                    fatherForm.insertBefore(clientKPP[0], placeToAdd);
                                    var brunchTypes = ["", "Horeca", "Trader", "SCO"];
                                    var clientMainBranch = addGroupAndContainer("Main branch / Тип деятельности:", "");//массив: 0=группа, 1=контейнер
                                    var brunchSelect = document.createElement("select");
                                    brunchSelect.className = "text";
                                    fulfillSelect2(brunchSelect, brunchTypes);
                                    clientMainBranch[1].appendChild(brunchSelect);
                                    fatherForm.insertBefore(clientMainBranch[0], placeToAdd);
                                    var clientDescription = addInputAndLabelAndDescr("Customer information / Описание клиента:", ""); // массив: 0 - вся группа, 1 - инпут
                                    fatherForm.insertBefore(clientDescription[0], placeToAdd);
                                    var clientAreaSeats = addInputAndLabelAndDescr("Area /Tорговая площадь (Traiders)/ No. of seats/ Кол-во посадочных мест (Horeca)/No. of FTE/ Кол-во сотрудников (SCO):", ""); // массив: 0 - вся группа, 1 - инпут
                                    fatherForm.insertBefore(clientAreaSeats[0], placeToAdd);
                                    var clientOpenHours = addInputAndLabelAndDescr("Open hours/Время работы:", ""); // массив: 0 - вся группа, 1 - инпут
                                    fatherForm.insertBefore(clientOpenHours[0], placeToAdd);
                                    var clientAverageCheck = addInputAndLabelAndDescr("Average Check (кроме SCO)/Средний чек:", ""); // массив: 0 - вся группа, 1 - инпут
                                    fatherForm.insertBefore(clientAverageCheck[0], placeToAdd);
                                    var clientLocation = addInputAndLabelAndDescr("Location for customers/Расположение для потребителей:", ""); // массив: 0 - вся группа, 1 - инпут
                                    fatherForm.insertBefore(clientLocation[0], placeToAdd);

                                    var estates = ["", "Да", "Нет", "Клиент не предоставил информацию"];
                                    var clientRealEstate = addGroupAndContainer("Real estate in the property/Помещение в собственности:", "");//массив: 0=группа, 1=контейнер
                                    var clientRealEstateSelect = document.createElement("select");
                                    clientRealEstateSelect.className = "text";
                                    fulfillSelect2(clientRealEstateSelect, estates);
                                    clientRealEstate[1].appendChild(clientRealEstateSelect);
                                    fatherForm.insertBefore(clientRealEstate[0], placeToAdd);

                                    var clientRegDate = addInputAndLabelAndDescr("Registration date in METRO/Дата регистрации в МЕТРО и дата первой покупки:", ""); // массив: 0 - вся группа, 1 - инпут
                                    fatherForm.insertBefore(clientRegDate[0], placeToAdd);
                                    clientRegDate[1].className += " aui-date-picker";
                                    clientRegDate[1].id = "calendarik";
                                    AJS.$('#calendarik').datePicker({
                                        'overrideBrowserDefault': true,
                                        'firstDay': 1,
                                        'dateFormat': 'dd.mm.yy'
                                    });

                                    var clientTotalTurnover = addInputAndLabelAndDescr("Total Customer Turnover/Оборот клиента за все время работы с МЕТРО:", "Указать оборот по всем картам клиента за весь период сотрудничества, без учета месяца создания запроса, без НДС"); // массив: 0 - вся группа, 1 - инпут
                                    fatherForm.insertBefore(clientTotalTurnover[0], placeToAdd);
                                    var client3mTurnover = addInputAndLabelAndDescr("Customer Turnover last 3 month/Оборот клиента за последние 3 месяца:", "Указать оборот по всем картам клиента за 3 месяца, без учета месяца создания запроса, без НДС"); // массив: 0 - вся группа, 1 - инпут
                                    fatherForm.insertBefore(client3mTurnover[0], placeToAdd);

                                    var clientAssortment = addGroupAndContainer("Assortment orientation/Ассортиментная направленность закупок клиента:", "");//массив: 0=группа, 1=контейнер
                                    var Assortment1 = addCheckbox("clientAssortment", "Ultra-fresh", clientAssortment[1]);
                                    var Assortment2 = addCheckbox("clientAssortment", "Alcohol-Tabaco", clientAssortment[1]);
                                    var Assortment3 = addCheckbox("clientAssortment", "Non-food", clientAssortment[1]);
                                    var Assortment4 = addCheckbox("clientAssortment", "Dry", clientAssortment[1]);
                                    var Assortment5 = addCheckbox("clientAssortment", "Fresh", clientAssortment[1]);
                                    fatherForm.insertBefore(clientAssortment[0], placeToAdd);

                                    var clientPotential = addInputAndLabelAndDescr("Total monthly potential RUR / Общий месячный потенциал РУБ:", "Указать прогнозируемый объем продаж"); // массив: 0 - вся группа, 1 - инпут
                                    fatherForm.insertBefore(clientPotential[0], placeToAdd);
                                    var clientTiPercent = addInputAndLabelAndDescr("TI,%:", "Указать текущий Total Income клиента, или прогнозируемое значение, если клиент новый, %, например, 20%"); // массив: 0 - вся группа, 1 - инпут
                                    fatherForm.insertBefore(clientTiPercent[0], placeToAdd);

                                    if (currentURL.indexOf(substring8) !== -1 || currentURL.indexOf(substring88) !== -1 || currentURL.indexOf(substring9) !== -1 || currentURL.indexOf(substring99) !== -1) {
                                        var totalContract = addInputAndLabelAndDescr("Total ammount of the contract purchase, RUR/Общая сумма закупки по договору, RUR:", "Указать общую сумму закупки по договору, РУБ: \"800000 руб\", например"); // массив: 0 - вся группа, 1 - инпут
                                        fatherForm.insertBefore(totalContract[0], placeToAdd);
                                        var cotractTime = addInputAndLabelAndDescr("Contract time, month/Срок действия договора, мес:", "Указать срок действия договора в месяцах: \"12 мес.\" например"); // массив: 0 - вся группа, 1 - инпут
                                        fatherForm.insertBefore(cotractTime[0], placeToAdd);
                                    }
                                    if (!(currentURL.indexOf(substring7) !== -1)) {
                                        if (!(currentURL.indexOf(substring8) !== -1) && !(currentURL.indexOf(substring9) !== -1) && !(currentURL.indexOf(substring88) !== -1) && !(currentURL.indexOf(substring99) !== -1)) {
                                            var clientCurrentCreditLimit = addInputAndLabelAndDescr("Current Credit Limit, RUR / Текущий кредитный лимит, RUR:", "Указать действующий кредитный лимит в рублях ( для группы клиентов указать суммарный лимит по всем  юр.лицам): 100000, например"); // массив: 0 - вся группа, 1 - инпут
                                            fatherForm.insertBefore(clientCurrentCreditLimit[0], placeToAdd);
                                            clientCurrentCreditLimit[0].style.display = "none";
                                        }
                                        var clientCreditLimit = addInputAndLabelAndDescr("Requested Credit Limit, RUR/Запрашиваемый кредитный лимит, RUR:", "Указать запрашиваемый кредитный лимит в рублях, \"100000\", например"); // массив: 0 - вся группа, 1 - инпут
                                        fatherForm.insertBefore(clientCreditLimit[0], placeToAdd);
                                        var clientDelay = addInputAndLabelAndDescr("Requested number of days delay/Запрашиваемое  кол-во каледарных дней отсрочки платежа:", "Указать запрашиваемое количество календарных дней отсрочки платежа, например \"14\""); // массив: 0 - вся группа, 1 - инпут
                                        fatherForm.insertBefore(clientDelay[0], placeToAdd);

                                    } else {
                                        var clientCurrentCreditLimit = addInputAndLabelAndDescr("Current Credit Limit, RUR / Текущий кредитный лимит, RUR:", "Указать действующий кредитный лимит в рублях ( для группы клиентов указать суммарный лимит по всем  юр.лицам): 100000, например"); // массив: 0 - вся группа, 1 - инпут
                                        fatherForm.insertBefore(clientCurrentCreditLimit[0], placeToAdd);
                                        var clientCurrentDelay = addInputAndLabelAndDescr("Current number of days delay / Текущее кол-во дней отсрочки платежа:", "Указать действующее количество календарных дней отсрочки платежа (для группы  клиентов указать в приложении по каждому юр.лицу) : 14"); // массив: 0 - вся группа, 1 - инпут
                                        fatherForm.insertBefore(clientCurrentDelay[0], placeToAdd);
                                        var clientCreditLimit = addInputAndLabelAndDescr("Requested Credit Limit, RUR/Запрашиваемый кредитный лимит, RUR:", "Указать запрашиваемый кредитный лимит в рублях ( для группы клиентов указать суммарный лимит по всем  юр.лицам): 100000, например"); // массив: 0 - вся группа, 1 - инпут
                                        fatherForm.insertBefore(clientCreditLimit[0], placeToAdd);
                                        var clientDelay = addInputAndLabelAndDescr("Requested number of days delay/Запрашиваемое  кол-во каледарных дней отсрочки платежа:", "Указать запрашиваемое количество календарных дней отсрочки платежа (для группы  клиентов указать в приложении по каждому юр.лицу) : 14"); // массив: 0 - вся группа, 1 - инпут
                                        fatherForm.insertBefore(clientDelay[0], placeToAdd);
                                    }

                                    if (currentURL.indexOf(substring) !== -1 || currentURL.indexOf(substring2) !== -1 || currentURL.indexOf(substring3) !== -1 || currentURL.indexOf(substring4) !== -1 || currentURL.indexOf(substring7) !== -1 || currentURL.indexOf(substring10) !== -1) {
                                        var seasonDate = addInputAndLabelAndDescr("Valid date / Действие лимита до:", ""); // массив: 0 - вся группа, 1 - инпут
                                        fatherForm.insertBefore(seasonDate[0], placeToAdd);
                                        seasonDate[0].style.display = "none";
                                        seasonDate[1].className += " aui-date-picker";
                                        seasonDate[1].id = "calendarikSeason";
                                        AJS.$('#calendarikSeason').datePicker({
                                            'overrideBrowserDefault': true,
                                            'firstDay': 1,
                                            'dateFormat': 'dd.mm.yy'
                                        });
                                    }

                                    var reporterComment = addTextareaAndLabelAndDescr("Комментарий автора:", "При необходимости, оставьте свой комментарий"); // массив: 0 - вся группа, 1 - текстареа
                                    fatherForm.insertBefore(reporterComment[0], placeToAdd);
//Таблица для некоторых реквестов
                                    var isThereAtable = false;
                                    if (currentURL.indexOf(substring2) !== -1 || currentURL.indexOf(substring3) !== -1 || currentURL.indexOf(substring6) !== -1 || currentURL.indexOf(substring7) !== -1 || currentURL.indexOf(substring8) !== -1 || currentURL.indexOf(substring88) !== -1 || currentURL.indexOf(substring9) !== -1 || currentURL.indexOf(substring99) !== -1) {
                                        var tableRowCount = addInputAndLabelAndDescr("Добавить таблицу с количеством строк:", "При необходимости, добавьте таблицу клиентов"); // массив: 0 - вся группа, 1 - инпут
                                        var tableCreateA = document.createElement("a"); // ссылка на создание таблицы
                                        tableCreateA.id = "createTable";
                                        tableCreateA.setAttribute("href", "javascript:void(0);");
                                        tableCreateA.setAttribute("onclick", "return false;");
                                        tableCreateA.innerHTML = "<i class=\"aui-icon aui-icon-small aui-iconfont-list-add\"></i>&nbsp;Создать таблицу";
                                        fatherForm.insertBefore(tableCreateA, placeToAdd);
                                        fatherForm.insertBefore(tableRowCount[0], placeToAdd);
                                        tableCreateA.addEventListener("click", function () {
                                            if (tableRowCount[1].value && !isNaN(tableRowCount[1].value) && tableRowCount[1].value < 100 && tableRowCount[1].value > 0) {
                                                var tableClients = createTable(["№", "ТЦ", "№ карты в CFM", "Текущий лимит", "Текущая отсрочка", "Запрашиваемый лимит", "Запрашиваемая отсрочка"]);
                                                tableClients.id = "Table-clients";
                                                fatherForm.insertBefore(tableClients, placeToAdd);
                                                for (var i = 0; i < tableRowCount[1].value; i++) {
                                                    addRow(tableClients);
                                                }
                                                var itogi = document.createElement("div");
                                                var itogiWasLabel = document.createElement("span");
                                                itogiWasLabel.innerHTML = "Итого текущий лимит: "
                                                itogiWasLabel.style.marginLeft = "20px";
                                                var itogiWas = document.createElement("span");
                                                itogiWas.style.fontWeight = "700";
                                                itogiWas.innerHTML = "0";
                                                itogiWas.id = "itogiWas";
                                                var itogiNeedLabel = document.createElement("span");
                                                itogiNeedLabel.innerHTML = "Итого запрашиваемый лимит: "
                                                itogiNeedLabel.style.marginLeft = "20px";
                                                var itogiNeed = document.createElement("span");
                                                itogiNeed.style.fontWeight = "700";
                                                itogiNeed.innerHTML = "0";
                                                itogiNeed.id = "itogiNeed";
                                                itogi.appendChild(itogiWasLabel);
                                                itogi.appendChild(itogiWas);
                                                itogi.appendChild(itogiNeedLabel);
                                                itogi.appendChild(itogiNeed);
                                                fatherForm.insertBefore(itogi, placeToAdd);

                                                $('#Table-clients').on('change', 'input', function () {
                                                    var total1 = 0;
                                                    var total2 = 0;
                                                    $("#Table-clients tr").each(function (index) {
                                                        if (index != 0) {
                                                            $('td', this).each(function (indexTD) {
                                                                if (indexTD == 3) {
                                                                    if (!isNaN(parseInt($(this).find(":input").val()))) {
                                                                        total1 += parseInt($(this).find(":input").val());
                                                                    } else total1 += 0;
                                                                } else if (indexTD == 5) {
                                                                    if (!isNaN(parseInt($(this).find(":input").val()))) {
                                                                        total2 += parseInt($(this).find(":input").val());
                                                                    } else total2 += 0;
                                                                } else if (indexTD == 1) {
                                                                    if (($.isNumeric($(this).find(":input").val()) && $(this).find(":input").val().length == 4) || $(this).find(":input").val().length == 0) {
                                                                        $(this).find(":input").css({'background-color': '#FFFFFF'});
                                                                    } else $(this).find(":input").css({'background-color': '#FF1919'});
                                                                } else if (indexTD == 2) {
                                                                    if (($.isNumeric($(this).find(":input").val()) && $(this).find(":input").val().length == 6) || $(this).find(":input").val().length == 0) {
                                                                        $(this).find(":input").css({'background-color': '#FFFFFF'});
                                                                    } else $(this).find(":input").css({'background-color': '#FF1919'});
                                                                }
                                                            })
                                                        }

                                                    })
                                                    itogiWas.innerText = total1;
                                                    itogiNeed.innerText = total2;
                                                });
                                                isThereAtable = true;
                                                var addRowHref = document.createElement("a"); // ссылка на добавление клиента
                                                addRowHref.id = "AddRow";
                                                addRowHref.setAttribute("href", "javascript:void(0);");
                                                addRowHref.setAttribute("onclick", "return false;");
                                                addRowHref.innerHTML = "<i class=\"aui-icon aui-icon-small aui-iconfont-list-add\"></i>&nbsp;Добавить строку";
                                                fatherForm.insertBefore(addRowHref, placeToAdd);
                                                tableRowCount[0].style.display = "none";
                                                tableCreateA.style.display = "none";

                                                addRowHref.addEventListener("click", function () {
                                                    addRow(tableClients);
                                                }, false);

                                                var delRowHref = document.createElement("a"); // ссылка на добавление клиента
                                                delRowHref.id = "DelRow";
                                                delRowHref.setAttribute("href", "javascript:void(0);");
                                                delRowHref.setAttribute("onclick", "return false;");
                                                delRowHref.style.color = "red";
                                                delRowHref.style.marginLeft = "10px";
                                                delRowHref.innerHTML = "<i class=\"aui-icon aui-icon-small aui-iconfont-list-remove\"></i>&nbsp;Удалить строку";
                                                fatherForm.insertBefore(delRowHref, placeToAdd);

                                                delRowHref.addEventListener("click", function () {
                                                    if (document.getElementById("Table-clients").rows.length > 2) document.getElementById("Table-clients").deleteRow(-1);
                                                }, false);

                                                var delTableHref = document.createElement("a"); // ссылка на добавление клиента
                                                delTableHref.id = "DelTable";
                                                delTableHref.setAttribute("href", "javascript:void(0);");
                                                delTableHref.setAttribute("onclick", "return false;");
                                                delTableHref.style.color = "black";
                                                delTableHref.style.marginLeft = "10px";
                                                delTableHref.innerHTML = "<br><i class=\"aui-icon aui-icon-small aui-iconfont-remove\"></i>&nbsp;Удалить таблицу";
                                                fatherForm.insertBefore(delTableHref, placeToAdd);

                                                delTableHref.addEventListener("click", function () {
                                                    tableClients.parentElement.removeChild(tableClients);
                                                    itogi.parentElement.removeChild(itogi);
                                                    addRowHref.parentElement.removeChild(addRowHref);
                                                    delRowHref.parentElement.removeChild(delRowHref);
                                                    delTableHref.parentElement.removeChild(delTableHref);
                                                    tableRowCount[0].style.display = "";
                                                    tableCreateA.style.display = "";
                                                    isThereAtable = false;
                                                }, false);


                                            } else {
                                                /*alert("Не указано сколько строк создать или введено не число");*/
                                            }
                                        }, false);

                                    }

//конец таблицы


                                    var btnPost = document.getElementsByClassName("buttons-container")[0];
                                    btnPost = btnPost.getElementsByClassName("aui-button aui-button-primary")[0];
                                    btnPost.addEventListener("click", compileTogether, false);	//обработчик клика на кнопку "Создать"
                                    btnPost.addEventListener("keydown", compileTogether, false);//обработчик нажатия клавиатурой на кнопку "Создать"

                                    function compileTogether() {
                                        var federalType = "";
                                        var letsCheck = checkForm();
                                        if (letsCheck) {
                                            var checkedAssortment = "";
                                            document.getElementById("description").value = "";
                                            var commitetCurrent = "";
                                            var currentLimit = "";
                                            var clientRangeValue = "";
//var forecast="";
                                            var contracts = "";
                                            if (Assortment1.checked) checkedAssortment += "* " + Assortment1.value + "\r\n";
                                            if (Assortment2.checked) checkedAssortment += "* " + Assortment2.value + "\r\n";
                                            if (Assortment3.checked) checkedAssortment += "* " + Assortment3.value + "\r\n";
                                            if (Assortment4.checked) checkedAssortment += "* " + Assortment4.value + "\r\n";
                                            if (Assortment5.checked) checkedAssortment += "* " + Assortment5.value + "\r\n";
                                            if (currentURL.indexOf(substring2) !== -1) {
                                                document.getElementById("description").value += "|*Тип федерального клиента*|" + federalclientTypeSelect.options[federalclientTypeSelect.selectedIndex].innerHTML + "|\r\n";
                                            }
                                            if (currentURL.indexOf(substring4) !== -1) {
                                                document.getElementById("description").value += "|*FSD*|" + fsdTypeSelect.options[fsdTypeSelect.selectedIndex].innerHTML + "|\r\n";
                                            }
                                            if ((!(currentURL.indexOf(substring8) !== -1) && !(currentURL.indexOf(substring9) !== -1) && !(currentURL.indexOf(substring88) !== -1) && !(currentURL.indexOf(substring99) !== -1) && clientTypeSelect.value == "3") || currentURL.indexOf(substring7) !== -1) {
                                                currentLimit = "|\r\n|*Current Credit Limit, RUR / Текущий кредитный лимит, RUR*|" + clientCurrentCreditLimit[1].value;
                                            }

                                            if (currentURL.indexOf(substring7) !== -1) {
                                                commitetCurrent = "|\r\n|*Current number of days delay / Текущее кол-во дней отсрочки платежа*|" + clientCurrentDelay[1].value;
                                            }
                                            if (!(currentURL.indexOf(substring7) !== -1 || currentURL.indexOf(substring9) !== -1 || currentURL.indexOf(substring11) !== -1)) {
                                                clientRangeValue = "|*Запрашиваемый диапазон кредитного лимита*|" + clientRangeSelect.options[clientRangeSelect.selectedIndex].innerHTML + "|\r\n";
                                            }

                                            if (currentURL.indexOf(substring8) !== -1 || currentURL.indexOf(substring9) !== -1 || currentURL.indexOf(substring88) !== -1 || currentURL.indexOf(substring99) !== -1) {
                                                contracts = "|\r\n|*Total ammount of the contract purchase, RUR/Общая сумма закупки по договору, RUR*|" + totalContract[1].value
                                                    + "|\r\n|*Contract time, month/Срок действия договора, мес*|" + cotractTime[1].value;
                                            }
                                            document.getElementById("description").value += clientRangeValue + "|*Client/Клиент*|"
                                                + clientTypeSelect.options[clientTypeSelect.selectedIndex].innerHTML + "|\r\n|*GM#/ТЦ №*|"
                                                + clientStore[1].value + "|\r\n|*CFM Cu_No (номер карты клиента)*|" + clientNumber[1].value + "|\r\n|*Legal customer name / Юр название компании*|"
                                                + clientLegalName[1].value + "|\r\n|*Logo name / Фактическое название*|" + clientLogoName[1].value + "|\r\n|*E-mail address/Электронная почта*|"
                                                + clientEmail[1].value + "|\r\n|*INN/ИНН*|" + clientINN[1].value + "|\r\n|*KPP/КПП*|" + clientKPP[1].value + "|\r\n|*Main branch / Тип деятельности*|"
                                                + brunchSelect.options[brunchSelect.selectedIndex].innerHTML + "|\r\n|*Customer information / Описание клиента*|"
                                                + clientDescription[1].value + "|\r\n|*Area /Tорговая площадь (Traiders)/ No. of seats/ Кол-во посадочных мест (Horeca)/No. of FTE/ Кол-во сотрудников (SCO)*|"
                                                + clientAreaSeats[1].value + "|\r\n|*Open hours/Время работы*|"
                                                + clientOpenHours[1].value + "|\r\n|*Average Check (кроме SCO)/Средний чек*|"
                                                + clientAverageCheck[1].value + "|\r\n|*Location for customers/Расположение для потребителей*|"
                                                + clientLocation[1].value + "|\r\n|*Real estate in the property/Помещение в собственности*|"
                                                + clientRealEstateSelect.options[clientRealEstateSelect.selectedIndex].innerHTML
                                                + "|\r\n|*Registration date in METRO/Дата регистрации в МЕТРО и дата первой покупки*|"
                                                + clientRegDate[1].value + "|\r\n|*Total Customer Turnover/Оборот клиента за все время работы с МЕТРО*|"
                                                + clientTotalTurnover[1].value + "|\r\n|*Customer Turnover last 3 month/Оборот клиента за последние 3 месяца*|"
                                                + client3mTurnover[1].value + "|\r\n|*Assortment orientation/Ассортиментная направленность закупок клиента*|"
                                                + checkedAssortment + "|\r\n|*Total monthly potential RUR / Общий месячный потенциал РУБ*|"
                                                + clientPotential[1].value + "|\r\n|*TI,%*|"
                                                + clientTiPercent[1].value + contracts + currentLimit + commitetCurrent + "|\r\n|*Requested Credit Limit, RUR/Запрашиваемый кредитный лимит, RUR*|"
                                                + clientCreditLimit[1].value + "|\r\n|*Requested number of days delay/Запрашиваемое кол-во каледарных дней отсрочки платежа*|"
                                                + clientDelay[1].value + "|";
                                            if (currentURL.indexOf(substring) !== -1 || currentURL.indexOf(substring2) !== -1 || currentURL.indexOf(substring3) !== -1 || currentURL.indexOf(substring4) !== -1 || currentURL.indexOf(substring7) !== -1 || currentURL.indexOf(substring10) !== -1) {
                                                if (seasonalSelect.value == "2") {
                                                    document.getElementById("description").value += "\r\n|*Valid date / Действие лимита до*|" + seasonDate[1].value + "|";
                                                }
                                            }
                                            if (isThereAtable) {
                                                var tabledata = "";
                                                $("#Table-clients tr").each(function (index) {
                                                    if (index != 0) tabledata += "\r\n|";
                                                    $('td', this).each(function () {
                                                        var value = $(this).find(":input").val();
                                                        tabledata += value + "|";
                                                    })
                                                })
                                                document.getElementById("description").value += "\r\n\r\n||№||ТЦ||№ карты в CFM||Текущий лимит||Текущая отсрочка||Запрашиваемый лимит||Запрашиваемая отсрочка||" + tabledata + "\r\n*Итого текущий лимит:* "
                                                    + document.getElementById("itogiWas").innerText + "\r\n*Итого запрашиваемый лимит:* " + document.getElementById("itogiNeed").innerText + "\r\n";
                                            }
                                            if (reporterComment[1].value) {
                                                document.getElementById("description").value += "\r\n *Комментарий автора:*\r\n" + reporterComment[1].value;
                                            }
                                        }
                                    }

                                    function checkForm() { //проверка формы на ошибки. Возвращает true если всё ок
                                        var formvalid = false;
                                        if (clientStore[1].value != "" && clientNumber[1].value != "" && clientLegalName[1].value != "" && clientLogoName[1].value != ""
                                            && clientEmail[1].value != "" && clientINN[1].value != "" && brunchSelect.value != "1" && clientDescription[1].value != ""
                                            && clientAreaSeats[1].value != "" && clientOpenHours[1].value != "" && clientAverageCheck[1].value != "" && clientLocation[1].value != ""
                                            && clientRealEstateSelect.value != "1" && clientRegDate[1].value != "" && clientTotalTurnover[1].value != ""
                                            && client3mTurnover[1].value != "" && clientPotential[1].value != "" && clientTiPercent[1].value != "" && clientCreditLimit[1].value != ""
                                            && clientDelay[1].value != "" && clientTypeSelect.value != "1") {
                                            formvalid = true;
                                        } else {
                                            document.getElementById("description").value = "error";
                                        }

                                        if (currentURL.indexOf(substring) !== -1 || currentURL.indexOf(substring2) !== -1 || currentURL.indexOf(substring3) !== -1 || currentURL.indexOf(substring4) !== -1 || currentURL.indexOf(substring7) !== -1 || currentURL.indexOf(substring10) !== -1) {
                                            if (seasonalSelect.value == "2" && seasonDate[1].value == "") {
                                                document.getElementById("description").value = "error";
                                                formvalid = false;
                                            }
                                        }

                                        if (!(currentURL.indexOf(substring7) !== -1 || currentURL.indexOf(substring9) !== -1 || currentURL.indexOf(substring99) !== -1 || currentURL.indexOf(substring11) !== -1) && formvalid && clientRangeSelect.value == "1") {
                                            document.getElementById("description").value = "error";
                                            formvalid = false;
                                        }

                                        if (clientStore[1].value.length != 4 && formvalid) { //№ ТЦ в формате 4 символов
                                            document.getElementById("description").value = "errorStorelength";
                                            formvalid = false;
                                        }
                                        if (clientNumber[1].value.length != 11 && formvalid) { //№ клиента в формате 11 символов
                                            document.getElementById("description").value = "errorClientlength";
                                            formvalid = false;
                                        }

                                        /*if (clientNumber[1].value.substring(0, 4) != clientStore[1].value && formvalid && !(currentURL.indexOf(substring3)!== -1)) { //№ ТЦ и клиента совпадает
                                        document.getElementById("description").value = "errorClientAndStore";
                                        formvalid = false;
                                        }*/
                                        if (clientINN[1].value.length != 10 && clientINN[1].value.length != 12 && formvalid) { //проверка ИНН
                                            document.getElementById("description").value = "errorINN";
                                            formvalid = false;
                                        }
                                        if (clientKPP[1].value.length != 0 && clientKPP[1].value.length != 9 && formvalid) { //проверка КПП
                                            document.getElementById("description").value = "errorKPP";
                                            formvalid = false;
                                        }
                                        if (((parseInt(clientDelay[1].value) < 2 || parseInt(clientDelay[1].value) > 99) || isNaN(clientDelay[1].value)) && formvalid) { //Отсрочка более 1 символа
                                            document.getElementById("description").value = "errorDelaylength";
                                            formvalid = false;
                                        }

                                        if (formvalid && (currentURL.indexOf(substring) !== -1 || currentURL.indexOf(substring4) !== -1 || currentURL.indexOf(substring5) !== -1)) {
                                            switch (clientRangeSelect.value) {//проверка диапазона и введенного лимита
                                                case "2":
                                                    if (parseInt(clientCreditLimit[1].value) <= 50000) {
                                                        if (parseInt(clientCreditLimit[1].value) < 10000) {
                                                            formvalid = false;
                                                            document.getElementById("description").value = "errorLowLimit";
                                                        } else formvalid = true;
                                                    } else {
                                                        formvalid = false;
                                                        document.getElementById("description").value = "errorwrongRange";
                                                    }
                                                    break;
                                                case "3":
                                                    if (parseInt(clientCreditLimit[1].value) > 50000 && parseInt(clientCreditLimit[1].value) <= 200000) {
                                                        formvalid = true;
                                                    } else {
                                                        formvalid = false;
                                                        document.getElementById("description").value = "errorwrongRange";
                                                    }
                                                    break;
                                                case "4":
                                                    if (parseInt(clientCreditLimit[1].value) > 200000 && parseInt(clientCreditLimit[1].value) <= 500000) {
                                                        formvalid = true;
                                                    } else {
                                                        formvalid = false;
                                                        document.getElementById("description").value = "errorwrongRange";
                                                    }
                                                    break;
                                                case "5":
                                                    if (parseInt(clientCreditLimit[1].value) > 500000 && parseInt(clientCreditLimit[1].value) <= 999999) {
                                                        formvalid = true;
                                                    } else {
                                                        formvalid = false;
                                                        document.getElementById("description").value = "errorwrongRange";
                                                    }
                                                    break;
                                            }
                                        }
                                        if (formvalid && (currentURL.indexOf(substring10) !== -1 || currentURL.indexOf(substring3) !== -1)) {
                                            switch (clientRangeSelect.value) {//проверка диапазона и введенного лимита
                                                case "2":
                                                    if (parseInt(clientCreditLimit[1].value) <= 200000) {
                                                        if (parseInt(clientCreditLimit[1].value) < 10000) {
                                                            formvalid = false;
                                                            document.getElementById("description").value = "errorLowLimit";
                                                        } else formvalid = true;
                                                    } else {
                                                        formvalid = false;
                                                        document.getElementById("description").value = "errorwrongRange";
                                                    }
                                                    break;
                                                case "3":
                                                    if (parseInt(clientCreditLimit[1].value) > 200000 && parseInt(clientCreditLimit[1].value) <= 500000) {
                                                        formvalid = true;
                                                    } else {
                                                        formvalid = false;
                                                        document.getElementById("description").value = "errorwrongRange";
                                                    }
                                                    break;
                                                case "4":
                                                    if (parseInt(clientCreditLimit[1].value) > 500000 && parseInt(clientCreditLimit[1].value) <= 999999) {
                                                        formvalid = true;
                                                    } else {
                                                        formvalid = false;
                                                        document.getElementById("description").value = "errorwrongRange";
                                                    }
                                                    break;
                                            }
                                        }
                                        if (formvalid && currentURL.indexOf(substring2) !== -1) {
                                            switch (clientRangeSelect.value) {//проверка диапазона и введенного лимита
                                                case "2":
                                                    if (parseInt(clientCreditLimit[1].value) <= 500000) {
                                                        if (parseInt(clientCreditLimit[1].value) < 10000) {
                                                            formvalid = false;
                                                            document.getElementById("description").value = "errorLowLimit";
                                                        } else formvalid = true;
                                                    } else {
                                                        formvalid = false;
                                                        document.getElementById("description").value = "errorwrongRange";
                                                    }
                                                    break;
                                                case "3":
                                                    if (parseInt(clientCreditLimit[1].value) > 500000 && parseInt(clientCreditLimit[1].value) <= 999999) {
                                                        formvalid = true;
                                                    } else {
                                                        formvalid = false;
                                                        document.getElementById("description").value = "errorwrongRange";
                                                    }
                                                    break;
                                            }
                                        }
                                        if (formvalid && (currentURL.indexOf(substring8) !== -1 || currentURL.indexOf(substring88) !== -1)) {
                                            switch (clientRangeSelect.value) {//проверка диапазона и введенного лимита
                                                case "2":
                                                    if (parseInt(clientCreditLimit[1].value) <= 100000) {
                                                        if (parseInt(clientCreditLimit[1].value) < 10000) {
                                                            formvalid = false;
                                                            document.getElementById("description").value = "errorLowLimit";
                                                        } else formvalid = true;
                                                    } else {
                                                        formvalid = false;
                                                        document.getElementById("description").value = "errorwrongRange";
                                                    }
                                                    break;
                                                case "3":
                                                    if (parseInt(clientCreditLimit[1].value) > 100000 && parseInt(clientCreditLimit[1].value) <= 499999) {
                                                        formvalid = true;
                                                    } else {
                                                        formvalid = false;
                                                        document.getElementById("description").value = "errorwrongRange";
                                                    }
                                                    break;
                                            }
                                        }

                                        if (formvalid && (currentURL.indexOf(substring5) !== -1 || currentURL.indexOf(substring6) !== -1) && seasonDate[1].value == "") {
                                            document.getElementById("description").value = "errorNoSeason";
                                            formvalid = false;
                                        }

                                        if (!checkTableInputs("Table-clients") && isThereAtable) {
                                            document.getElementById("description").value = "errorTable";
                                            formvalid = false;
                                        }

                                        return formvalid;
                                    }

                                    function handlerSeasons() {
                                        switch (seasonalSelect.value) {
//Другая причина:
                                            case "1":
                                                seasonDate[0].style.display = "none";
                                                break;
                                            default:
                                                seasonDate[0].style.display = "";
                                        }
                                    }

                                    function handlerClientType() {
                                        switch (clientTypeSelect.value) {
//Другая причина:
                                            case "3":
                                                clientCurrentCreditLimit[0].style.display = "";
                                                break;
                                            default:
                                                clientCurrentCreditLimit[0].style.display = "none";
                                        }
                                    }


                                } else {
                                    substring = "customer/portal/261/create/766";//Предоплата
                                    substring2 = "customer/portal/261/create/770";//Перенос
                                    substring3 = "customer/portal/261/create/939";//Предоплата Cash&Carry
                                    substring4 = "customer/portal/261/create/981";//Предоплата HVS
//substring3 = "customer/portal/24/create/524";//ЛЖЕПредоплата Cash&Carry
                                    if (currentURL.indexOf(substring) !== -1 || currentURL.indexOf(substring2) !== -1 || currentURL.indexOf(substring3) !== -1 || currentURL.indexOf(substring4) !== -1) {
                                        var placeToAdd = document.getElementById("description").parentElement.parentElement; // раздел поля Description
                                        placeToAdd.style.display = "none";
                                        var fatherForm = document.getElementsByClassName("aui vp-form top-label vp-request-form")[0]; //родитель, форма
                                        var customerCCTypes = ["", "Новый клиент C&C - предоплата", "Изменения в составе ДК"];
                                        var customerHVSTypes = ["", "Новый клиент HVS - предоплата", "Изменения в составе ДК"];
                                        var customerTypes = ["", "Новый предоплатный клиент", "Перевод клиента на предоплатные условия"];
                                        var transferTypes = ["", "Перенос с расторжением договора", "Перенос с переводом на предоплату", "Перераспределение условий между ТЦ в рамках одного договора", "Уменьшение суммы кредитного лимита", "Расторжение договора", "Перевод на предоплату"];
                                        var clientType = addGroupAndContainer("Type of Request/Тип запроса:", "");//массив: 0=группа, 1=контейнер
                                        var clientTypeSelect = document.createElement("select");
                                        clientTypeSelect.className = "text";
                                        if (currentURL.indexOf(substring) !== -1) {
                                            fulfillSelect2(clientTypeSelect, customerTypes);
                                        } else if (currentURL.indexOf(substring2) !== -1) {
                                            fulfillSelect2(clientTypeSelect, transferTypes);
                                        } else if (currentURL.indexOf(substring3) !== -1) {
                                            fulfillSelect2(clientTypeSelect, customerCCTypes);
                                        } else {
                                            fulfillSelect2(clientTypeSelect, customerHVSTypes);
                                        }

                                        clientType[1].appendChild(clientTypeSelect);
                                        fatherForm.insertBefore(clientType[0], placeToAdd);
                                        if (!(currentURL.indexOf(substring3) !== -1) && !(currentURL.indexOf(substring4) !== -1)) {
                                            var clientStore = addInputAndLabelAndDescr("GM#/ТЦ №:", "Введите 4-значный номер ТЦ. Пример: 1012. Если несколько ТЦ внесите «0000» и укажите их в таблице ниже"); // массив: 0 - вся группа, 1 - инпут
                                        } else {
                                            var clientStore = addInputAndLabelAndDescr("GM#/ТЦ №:", "Введите 4-значный номер ТЦ. Пример: 1012."); // массив: 0 - вся группа, 1 - инпут
                                        }

                                        fatherForm.insertBefore(clientStore[0], placeToAdd);
                                        var clientNumber = addInputAndLabelAndDescr("CFM Cu_No (номер карты клиента):", "Вводите в формате: № магазина_6 знаков. Пример: 1064_111111"); // массив: 0 - вся группа, 1 - инпут
                                        fatherForm.insertBefore(clientNumber[0], placeToAdd);


                                        var clientLegalName = addInputAndLabelAndDescr("Legal customer name / Юр название компании:", "Обязательно к указанию организационно-правовая форма компании: ООО/АО/ЗАО и тд."); // массив: 0 - вся группа, 1 - инпут
                                        fatherForm.insertBefore(clientLegalName[0], placeToAdd);
                                        var clientLogoName = addInputAndLabelAndDescr("Logo name / Фактическое название:", "Фактическое наименование организации"); // массив: 0 - вся группа, 1 - инпут
                                        fatherForm.insertBefore(clientLogoName[0], placeToAdd);
                                        var clientEmail = addInputAndLabelAndDescr("E-mail address/Электронная почта:", "Действующий электронный адрес клиента в формате _@_._:  metro@metro.ru"); // массив: 0 - вся группа, 1 - инпут
                                        fatherForm.insertBefore(clientEmail[0], placeToAdd);
                                        var clientINN = addInputAndLabelAndDescr("INN/ИНН:", "ИНН 10 знаков / Для ИП ИНН 12 знаков"); // массив: 0 - вся группа, 1 - инпут
                                        fatherForm.insertBefore(clientINN[0], placeToAdd);
                                        var clientKPP = addInputAndLabelAndDescr("KPP/КПП:", "КПП 9 знаков / Для ИП КПП отсутствует"); // массив: 0 - вся группа, 1 - инпут
                                        fatherForm.insertBefore(clientKPP[0], placeToAdd);
                                        var reporterComment = addTextareaAndLabelAndDescr("Комментарий автора:", "При необходимости, оставьте свой комментарий"); // массив: 0 - вся группа, 1 - текстареа
                                        fatherForm.insertBefore(reporterComment[0], placeToAdd);

                                        if (!(currentURL.indexOf(substring3) !== -1) && !(currentURL.indexOf(substring4) !== -1)) { //Таблица для 2 типов
                                            var tableRowCount = addInputAndLabelAndDescr("Количество строк:", "С каким количеством строк создать таблицу"); // массив: 0 - вся группа, 1 - инпут
                                            var tableCreateA = document.createElement("a"); // ссылка на создание таблицы
                                            tableCreateA.id = "createTable";
                                            tableCreateA.setAttribute("href", "javascript:void(0);");
                                            tableCreateA.setAttribute("onclick", "return false;");
                                            tableCreateA.innerHTML = "<i class=\"aui-icon aui-icon-small aui-iconfont-list-add\"></i>&nbsp;Создать таблицу";
                                            fatherForm.insertBefore(tableCreateA, placeToAdd);
                                            fatherForm.insertBefore(tableRowCount[0], placeToAdd);
                                            tableCreateA.addEventListener("click", function () {
                                                if (tableRowCount[1].value && !isNaN(tableRowCount[1].value) && tableRowCount[1].value < 100 && tableRowCount[1].value > 0) {
                                                    var tableClients = createTable(["№", "ТЦ", "№ карты в CFM", "Текущий лимит", "Текущая отсрочка", "Запрашиваемый лимит", "Запрашиваемая отсрочка"]);
                                                    tableClients.id = "Table-clients";
                                                    fatherForm.insertBefore(tableClients, placeToAdd);
                                                    for (var i = 0; i < tableRowCount[1].value; i++) {
                                                        addRow(tableClients);
                                                    }
                                                    var itogi = document.createElement("div");
                                                    var itogiWasLabel = document.createElement("span");
                                                    itogiWasLabel.innerHTML = "Итого текущий лимит: "
                                                    itogiWasLabel.style.marginLeft = "20px";
                                                    var itogiWas = document.createElement("span");
                                                    itogiWas.style.fontWeight = "700";
                                                    itogiWas.innerHTML = "0";
                                                    itogiWas.id = "itogiWas";
                                                    var itogiNeedLabel = document.createElement("span");
                                                    itogiNeedLabel.innerHTML = "Итого запрашиваемый лимит: "
                                                    itogiNeedLabel.style.marginLeft = "20px";
                                                    var itogiNeed = document.createElement("span");
                                                    itogiNeed.style.fontWeight = "700";
                                                    itogiNeed.innerHTML = "0";
                                                    itogiNeed.id = "itogiNeed";
                                                    itogi.appendChild(itogiWasLabel);
                                                    itogi.appendChild(itogiWas);
                                                    itogi.appendChild(itogiNeedLabel);
                                                    itogi.appendChild(itogiNeed);
                                                    fatherForm.insertBefore(itogi, placeToAdd);

                                                    $('#Table-clients').on('change', 'input', function () {
                                                        var total1 = 0;
                                                        var total2 = 0;
                                                        $("#Table-clients tr").each(function (index) {
                                                            if (index != 0) {
                                                                $('td', this).each(function (indexTD) {
                                                                    if (indexTD == 3) {
                                                                        if (!isNaN(parseInt($(this).find(":input").val()))) {
                                                                            total1 += parseInt($(this).find(":input").val());
                                                                        } else total1 += 0;
                                                                    } else if (indexTD == 5) {
                                                                        if (!isNaN(parseInt($(this).find(":input").val()))) {
                                                                            total2 += parseInt($(this).find(":input").val());
                                                                        } else total2 += 0;
                                                                    } else if (indexTD == 1) {
                                                                        if (($.isNumeric($(this).find(":input").val()) && $(this).find(":input").val().length == 4) || $(this).find(":input").val().length == 0) {
                                                                            $(this).find(":input").css({'background-color': '#FFFFFF'});
                                                                        } else $(this).find(":input").css({'background-color': '#FF1919'});
                                                                    } else if (indexTD == 2) {
                                                                        if (($.isNumeric($(this).find(":input").val()) && $(this).find(":input").val().length == 6) || $(this).find(":input").val().length == 0) {
                                                                            $(this).find(":input").css({'background-color': '#FFFFFF'});
                                                                        } else $(this).find(":input").css({'background-color': '#FF1919'});
                                                                    }
                                                                })
                                                            }

                                                        })
                                                        itogiWas.innerText = total1;
                                                        itogiNeed.innerText = total2;
                                                    });

                                                    var addRowHref = document.createElement("a"); // ссылка на добавление клиента
                                                    addRowHref.id = "AddRow";
                                                    addRowHref.setAttribute("href", "javascript:void(0);");
                                                    addRowHref.setAttribute("onclick", "return false;");
                                                    addRowHref.innerHTML = "<i class=\"aui-icon aui-icon-small aui-iconfont-list-add\"></i>&nbsp;Добавить строку";
                                                    fatherForm.insertBefore(addRowHref, placeToAdd);
                                                    tableRowCount[0].style.display = "none";
                                                    tableCreateA.style.display = "none";

                                                    addRowHref.addEventListener("click", function () {
                                                        addRow(tableClients);
                                                    }, false);

                                                    var delRowHref = document.createElement("a"); // ссылка на добавление клиента
                                                    delRowHref.id = "DelRow";
                                                    delRowHref.setAttribute("href", "javascript:void(0);");
                                                    delRowHref.setAttribute("onclick", "return false;");
                                                    delRowHref.style.color = "red";
                                                    delRowHref.style.marginLeft = "10px";
                                                    delRowHref.innerHTML = "<i class=\"aui-icon aui-icon-small aui-iconfont-list-remove\"></i>&nbsp;Удалить строку";
                                                    fatherForm.insertBefore(delRowHref, placeToAdd);

                                                    delRowHref.addEventListener("click", function () {
                                                        if (document.getElementById("Table-clients").rows.length > 2) document.getElementById("Table-clients").deleteRow(-1);
                                                    }, false);
                                                    var delTableHref = document.createElement("a"); // ссылка на добавление клиента
                                                    delTableHref.id = "DelTable";
                                                    delTableHref.setAttribute("href", "javascript:void(0);");
                                                    delTableHref.setAttribute("onclick", "return false;");
                                                    delTableHref.style.color = "black";
                                                    delTableHref.style.marginLeft = "10px";
                                                    delTableHref.innerHTML = "<br><i class=\"aui-icon aui-icon-small aui-iconfont-remove\"></i>&nbsp;Удалить таблицу";
                                                    fatherForm.insertBefore(delTableHref, placeToAdd);

                                                    delTableHref.addEventListener("click", function () {
                                                        tableClients.parentElement.removeChild(tableClients);
                                                        itogi.parentElement.removeChild(itogi);
                                                        addRowHref.parentElement.removeChild(addRowHref);
                                                        delRowHref.parentElement.removeChild(delRowHref);
                                                        delTableHref.parentElement.removeChild(delTableHref);
                                                        tableRowCount[0].style.display = "";
                                                        tableCreateA.style.display = "";
                                                    }, false);

                                                } else {
                                                    /*alert("Не указано сколько строк создать или введено не число");*/
                                                }
                                            }, false);

                                        } else { //простые инпуты для остальных
                                            if (currentURL.indexOf(substring3) !== -1) {
                                                var addCardholder = document.createElement("a"); // ссылка на создание таблицы
                                                addCardholder.id = "addCardholder";
                                                addCardholder.setAttribute("href", "javascript:void(0);");
                                                addCardholder.setAttribute("onclick", "return false;");
                                                addCardholder.innerHTML = "<i class=\"aui-icon aui-icon-small aui-iconfont-list-add\"></i>&nbsp;Добавить держателя";
                                                fatherForm.insertBefore(addCardholder, reporterComment[0]);
                                                var dynamicField = addInputAndLabelAndDescr("Держатель карты:", "Порядковый номер держателя карты, допущенного к отгрузке товара в счет внесенного аванса");
                                                dynamicField[1].className += " cardHolder";
                                                fatherForm.insertBefore(dynamicField[0], addCardholder);
                                                addCardholder.addEventListener("click", function () {
                                                    if (document.getElementsByClassName("cardHolder").length < 5) {
                                                        var dynamicField = addInputAndLabelAndDescr("Держатель карты:", "Порядковый номер держателя карты, допущенного к отгрузке товара в счет внесенного аванса");
                                                        dynamicField[1].className += " cardHolder";
                                                        fatherForm.insertBefore(dynamicField[0], addCardholder);
                                                    }
                                                });
                                            } else {
                                                var addCardholder = document.createElement("a");
                                                fatherForm.insertBefore(addCardholder, reporterComment[0]);
                                                var dynamicField = addInputAndLabelAndDescr("Держатель карты:", "Порядковый номер держателя карты Генерального директора организации или уполномоченного сотрудника");
                                                dynamicField[1].className += " cardHolder";
                                                fatherForm.insertBefore(dynamicField[0], addCardholder);
                                            }
                                            var tableCardholders = createTable(["№", "Текущие порядковые номера держателей карт, имеющих доступ к отгрузкам в счет аванса", "Запрашиваемые порядковые номера держателей карт, имеющих доступ к отгрузкам в счет аванса"]);
                                            tableCardholders.id = "table-cardholders";
                                            addRow(tableCardholders);
                                            if (currentURL.indexOf(substring3) !== -1) {
                                                addRow(tableCardholders);
                                                addRow(tableCardholders);
                                                addRow(tableCardholders);
                                                addRow(tableCardholders);
                                            }
                                            fatherForm.insertBefore(tableCardholders, reporterComment[0]);

                                            $("#table-cardholders tr").each(function (index) {
                                                $('td', this).each(function (indexTD) {
                                                    if (indexTD == 0) {
                                                        $(this).find(":input").val(index);
                                                        $(this).find(":input").prop('disabled', true);
                                                    }
                                                })
                                            });
                                            tableCardholders.style.display = "none";
                                            addCardholder.style.display = "none";
                                            dynamicField[0].style.display = "none";
                                            clientTypeSelect.onclick = handlerTypeCC;

                                        }

                                        var btnPost = document.getElementsByClassName("buttons-container")[0];
                                        btnPost = btnPost.getElementsByClassName("aui-button aui-button-primary")[0];
                                        btnPost.addEventListener("click", compileTogether, false);	//обработчик клика на кнопку "Создать"
                                        btnPost.addEventListener("keydown", compileTogether, false);//обработчик нажатия клавиатурой на кнопку "Создать"

                                        function compileTogether() {
                                            var letsCheck = checkForm();
                                            if (letsCheck) {
                                                document.getElementById("description").value = "|*Type of Request/Тип запроса*|"
                                                    + clientTypeSelect.options[clientTypeSelect.selectedIndex].innerHTML + "|\r\n|*GM#/ТЦ №*|"
                                                    + clientStore[1].value + "|\r\n|*CFM Cu_No (номер карты клиента)*|" + clientNumber[1].value + "|\r\n|*Legal customer name / Юр название компании*|"
                                                    + clientLegalName[1].value + "|\r\n|*Logo name / Фактическое название*|" + clientLogoName[1].value + "|\r\n|*E-mail address/Электронная почта*|"
                                                    + clientEmail[1].value + "|\r\n|*INN/ИНН*|" + clientINN[1].value + "|\r\n|*KPP/КПП*|" + clientKPP[1].value + "|";
                                                if (currentURL.indexOf(substring) !== -1) {
                                                    document.getElementById("description").value += "\r\n|*Requested Credit Limit, RUR/Запрашиваемый кредитный лимит, RUR*|1|\r\n|*Requested number of days delay/Запрашиваемое кол-во каледарных дней отсрочки платежа*|0|";
                                                }
                                                if (!(currentURL.indexOf(substring3) !== -1) && !(currentURL.indexOf(substring4) !== -1)) {
                                                    var tabledata = "";
                                                    $("#Table-clients tr").each(function (index) {
                                                        if (index != 0) tabledata += "\r\n|";
                                                        $('td', this).each(function () {
                                                            var value = $(this).find(":input").val();
                                                            tabledata += value + "|";
                                                        })
                                                    });
                                                    document.getElementById("description").value += "\r\n\r\n||№||ТЦ||№ карты в CFM||Текущий лимит||Текущая отсрочка||Запрашиваемый лимит||Запрашиваемая отсрочка||" + tabledata + "\r\n*Итого текущий лимит:* "
                                                        + document.getElementById("itogiWas").innerText + "\r\n*Итого запрашиваемый лимит:* " + document.getElementById("itogiNeed").innerText + "\r\n";

                                                } else {
                                                    var constLimit;
                                                    if (currentURL.indexOf(substring3) !== -1) {
                                                        constLimit = "2";
                                                    } else if (currentURL.indexOf(substring4) !== -1) {
                                                        constLimit = "4";
                                                    }
                                                    document.getElementById("description").value += "\r\n|*Requested Credit Limit, RUR/Запрашиваемый кредитный лимит, RUR*|" + constLimit + "|\r\n|*Requested number of days delay/Запрашиваемое кол-во каледарных дней отсрочки платежа*|0|";
                                                    if (clientTypeSelect.value == "2") {
                                                        for (var i = 0; i < document.getElementsByClassName("cardHolder").length; i++) {
                                                            if (document.getElementsByClassName("cardHolder")[i].value != "") {
                                                                document.getElementById("description").value += "\r\n|*Порядковый номер держателя карты " + (i + 1) + "*|" + document.getElementsByClassName("cardHolder")[i].value + "|";
                                                            }
                                                        }
                                                    } else {
                                                        var tabledata = "";
                                                        $("#table-cardholders tr").each(function (index) {
                                                            if (index != 0) tabledata += "\r\n|";
                                                            $('td', this).each(function () {
                                                                var value = $(this).find(":input").val();
                                                                if (!value) value = "-";
                                                                tabledata += value + "|";
                                                            })
                                                        });
                                                        document.getElementById("description").value += "\r\n\r\n||№||Текущие порядковые номера держателей карт, имеющих доступ к отгрузкам в счет аванса||Запрашиваемые порядковые номера держателей карт, имеющих доступ к отгрузкам в счет аванса||" + tabledata;
                                                    }
                                                }
                                                if (reporterComment[1].value) {
                                                    document.getElementById("description").value += "\r\n *Комментарий автора:*\r\n" + reporterComment[1].value;
                                                }
                                            }
                                        }

                                        function checkForm() { //проверка формы на ошибки. Возвращает true если всё ок
                                            var formvalid = false;
                                            if (clientNumber[1].value != "" && clientStore[1].value != "" && clientLegalName[1].value != "" && clientLogoName[1].value != ""
                                                && clientEmail[1].value != "" && clientINN[1].value != "" && clientTypeSelect.value != "1") {
                                                formvalid = true;
                                            } else {
                                                document.getElementById("description").value = "error";
                                            }
                                            if (currentURL.indexOf(substring2) !== -1 && !document.getElementById("Table-clients") && formvalid) {
                                                document.getElementById("description").value = "errorNoTable";
                                                formvalid = false;
                                            }

                                            if (clientNumber[1].value.length != 11 && formvalid) { //№ клиента в формате 11 символов
                                                document.getElementById("description").value = "errorClientlength";
                                                formvalid = false;
                                            }

                                            /*if (clientNumber[1].value.substring(0, 4) != clientStore[1].value && formvalid) { //№ ТЦ и клиента совпадает
                                                document.getElementById("description").value = "errorClientAndStore";
                                                formvalid = false;
                                            }*/

                                            if (clientStore[1].value.length != 4 && formvalid) { //№ ТЦ в формате 4 символов
                                                document.getElementById("description").value = "errorStorelength";
                                                formvalid = false;
                                            }
                                            if (clientINN[1].value.length != 10 && clientINN[1].value.length != 12 && formvalid) { //проверка ИНН
                                                document.getElementById("description").value = "errorINN";
                                                formvalid = false;
                                            }
                                            if (clientKPP[1].value.length != 0 && clientKPP[1].value.length != 9 && formvalid) { //проверка КПП
                                                document.getElementById("description").value = "errorKPP";
                                                formvalid = false;
                                            }
                                            if (!checkTableInputs("Table-clients") && formvalid && !(currentURL.indexOf(substring3) !== -1) && !(currentURL.indexOf(substring4) !== -1)) {
                                                document.getElementById("description").value = "errorTable";
                                                formvalid = false;
                                            }

                                            if ((currentURL.indexOf(substring4) !== -1 || currentURL.indexOf(substring3) !== -1) && formvalid) {
                                                if (clientTypeSelect.value == "2" && (document.getElementsByClassName("cardHolder")[0].value == "" || isNaN(document.getElementsByClassName("cardHolder")[0].value))) {
                                                    document.getElementById("description").value = "errorCardholder";
                                                    formvalid = false;
                                                } else if (clientTypeSelect.value == "3" && (!tableCardholders.rows[1].cells[1].getElementsByTagName("input")[0].value || !tableCardholders.rows[1].cells[2].getElementsByTagName("input")[0].value)) {
                                                    document.getElementById("description").value = "errorCardholder";
                                                    formvalid = false;
                                                    /*$("#table-cardholders tr").each(function (index) {
                                                        $('td', this).each(function (indexTD) {
                                                            var td1;
                                                            var td2;
                                                            if (indexTD == 2 && index==1){
                                                                td1 = $(this).find(":input").val();
                                                            } else if (indexTD == 2 && index==1){
                                                                td2 = $(this).find(":input").val();
                                                            }
                                                        });

                                                    });*/
                                                }
                                            }
                                            return formvalid;
                                        }

                                        function handlerTypeCC() {
                                            if (clientTypeSelect.value == "2") {
                                                tableCardholders.style.display = "none";
                                                addCardholder.style.display = "";
                                                for (var i = 0; i < document.getElementsByClassName("text cardHolder").length; i++) {
                                                    document.getElementsByClassName("text cardHolder")[i].parentElement.parentElement.style.display = "";
                                                }
                                            } else if (clientTypeSelect.value == "3") {
                                                tableCardholders.style.display = "";
                                                addCardholder.style.display = "none";
                                                for (var i = 0; i < document.getElementsByClassName("text cardHolder").length; i++) {
                                                    document.getElementsByClassName("text cardHolder")[i].parentElement.parentElement.style.display = "none";
                                                }
                                            } else {//выбрана пустота
                                                tableCardholders.style.display = "none";
                                                addCardholder.style.display = "none";
                                                for (var i = 0; i < document.getElementsByClassName("text cardHolder").length; i++) {
                                                    document.getElementsByClassName("text cardHolder")[i].parentElement.parentElement.style.display = "none";
                                                }
                                            }
                                        }
                                    }
//---------------------------------------------------------------------------------------------------------------
//-----------------------------------CREDIT LIMITS END-----------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------
                                     }
                                    }
                                }
                            }
                        }
                    }
                }
            }
// ОБШИЕ фунцкии

            function checkTableInputs(myTableID) {
                var $elements=$('#'+myTableID).find('.tableInput');
                var $filledElements = $elements.filter(function(index) {
                    return $(this).val() || this.checked;
                });
                if ($filledElements.length===$elements.length) {
                    return true;
                } else return false;
            }

            function addRow(mytable) {
                var tr = document.createElement("tr");
                mytable.appendChild(tr);
                for (i=0; i<mytable.rows[0].cells.length;i++) {
                    var td=document.createElement("td");
                    var input = document.createElement('input');
                    input.className="text tableInput";
                    input.setAttribute("type", "text");
                    td.appendChild(input);
                    tr.appendChild(td);
                }
            }

            function createTable(headers) {
                var myTable = document.createElement("table");
                myTable.className="aui";
                var tr = document.createElement('tr'); // Создание шапки
                for (var i=0; i<headers.length; i++) {
                    var th = document.createElement('th');
                    th.innerText = headers[i];
                    tr.appendChild(th);
                }
                myTable.appendChild(tr);
                return myTable;
            }

            function addCheckbox(nameChkbx, labelOption, father) {
                var chkboxDiv=document.createElement('div');
                chkboxDiv.className="checkbox";
                chkboxDiv.style.display="inline-block";
                chkboxDiv.style.margin="3px";
                var chkbox_option=document.createElement('input');
                chkbox_option.className="checkbox";
                chkbox_option.setAttribute("name", nameChkbx);
                chkbox_option.id=labelOption;
                chkbox_option.type="checkbox";
                chkbox_option.value=labelOption;
                var chkbox_label=document.createElement('label');
                chkbox_label.setAttribute("for",labelOption);
                chkbox_label.innerHTML=labelOption;
                father.appendChild(chkboxDiv);
                chkboxDiv.appendChild(chkbox_option);
                chkboxDiv.appendChild(chkbox_label);
                return chkbox_option;
            }


            function addInputAndLabelAndDescr(labelString, description, targetID) {
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
                var dynamicInput=document.createElement("input");
                dynamicInput.className="text";
                dynamicInput.setAttribute("type", "text");
                dynamicFieldContainer.appendChild(dynamicInput);
                var dynamicDescription = document.createElement("div");
                dynamicDescription.className="description";
                var dynamicP = document.createElement("p");
                dynamicP.innerHTML=description;
                dynamicDescription.appendChild(dynamicP);
                dynamicFieldGroup.appendChild(dynamicLabel);
                dynamicFieldGroup.appendChild(dynamicFieldContainer);
                dynamicFieldGroup.appendChild(dynamicDescription);
                return [dynamicFieldGroup,dynamicInput];
            }

            function addRadioInput(nameRadio, labelOption, father,checked) {
                var radioDiv = document.createElement('div');
                radioDiv.className = "radio";
                radioDiv.style.display = "inline-block";
                radioDiv.style.margin = "3px";
                var radio_option = document.createElement('input');
                radio_option.className = "radio";
                radio_option.setAttribute("name", nameRadio);
                radio_option.id = labelOption;
                radio_option.type = "radio";
                radio_option.value = labelOption;
                if (checked){
                    radio_option.checked=true;
                }
                var radio_label = document.createElement('label');
                radio_label.setAttribute("for", labelOption);
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

            function fulfillSelect2(selectElem,array){
                selectElem.style.display='inline-block';
                for (var i = 0; i < array.length; i++) {// заполнение вариантов выбора в селект
                    var option = document.createElement("option");
                    option.value =(i+1);
                    option.text = array[i];
                    selectElem.appendChild(option);
                }
            }

            function addGroupAndContainer(labelString,description){
                var dynamicFieldGroup = document.createElement("div");
                dynamicFieldGroup.className="field-group";
                var dynamicFieldContainer = document.createElement("div");
                dynamicFieldContainer.className="field-container";
                var dynamicLabel = document.createElement("label");
                dynamicLabel.className="field-label";
                dynamicLabel.innerHTML=labelString;
                dynamicFieldGroup.appendChild(dynamicLabel);
                dynamicFieldGroup.appendChild(dynamicFieldContainer);
                if (description){
                    var dynamicDescription = document.createElement("div");
                    dynamicDescription.className="description";
                    var dynamicP = document.createElement("p");
                    dynamicP.innerHTML=description;
                    dynamicDescription.appendChild(dynamicP);
                    dynamicFieldGroup.appendChild(dynamicDescription);
                }
                return [dynamicFieldGroup,dynamicFieldContainer];
            }
// конец общих функций
        }
    } )
})(jQuery);
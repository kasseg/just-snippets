(function(){
        SERVICEDESK_REGISTER_JAVASCRIPT( {
            onLocationChange: function(location) {
				var currentURL= window.location.href;
				substring = "customer/portal/261/create/861";
				if (currentURL.indexOf(substring) !== -1){	 
				//------------------------Начало -------------------------------------------
				function addOneInputName(counter) {				//создает поле Фактическое наименование организации
					var dynamicFieldGroup = document.createElement("div");
					dynamicFieldGroup.className="field-group client-"+i;
					var dynamicLabel = document.createElement("label"); //РАЗ!
					dynamicLabel.className="field-label";
					dynamicLabel.innerHTML="Фактическое наименование организации "; 
					var dynamicFieldContainer = document.createElement("div");//ДВА!
					dynamicFieldContainer.className="field-container";
					var dynamicInput=document.createElement("input");
					dynamicInput.className="text clientName";
					dynamicInput.setAttribute("type", "text");
					dynamicFieldContainer.appendChild(dynamicInput);
					var dynamicDescription = document.createElement("div");//ТРИ!
					dynamicDescription.className="description";
					var dynamicP = document.createElement("p");
					dynamicP.innerHTML="";
					dynamicDescription.appendChild(dynamicP);
					dynamicFieldGroup.appendChild(dynamicLabel);
					dynamicFieldGroup.appendChild(dynamicFieldContainer);
					dynamicFieldGroup.appendChild(dynamicDescription);
					papa.insertBefore(dynamicFieldGroup,placeToAddInputs);
					if (i>2){ //у первых двух нет ссылок на удаление клиента.
						var delClientBtn = document.createElement("a");
						delClientBtn.id="client-"+i;
						delClientBtn.setAttribute("href", "javascript:void(0);");
						delClientBtn.setAttribute("onclick", "return false;");
						delClientBtn.innerHTML="<i class=\"aui-icon aui-icon-small aui-iconfont-remove\"></i>&nbsp;Удалить этого клиента";
						delClientBtn.style.width="200px";
						delClientBtn.style.color= "#B22222"; 
						delClientBtn.style.marginTop="10px"; 
						delClientBtn.style.textAlign="center";
						delClientBtn.addEventListener("click", function(){
							 delClient(this.id);
						});
						dynamicFieldContainer.appendChild(delClientBtn);
					}
					var addLine = document.createElement("HR");
					addLine.className="client-"+i;
					dynamicFieldGroup.parentElement.insertBefore(addLine,dynamicFieldGroup.nextSibling);
				
				}
				
				function addOneInputType(counter) { //создает поле тип бизнеса/бранч
					var dynamicFieldGroup = document.createElement("div");
					dynamicFieldGroup.className="field-group client-"+i;
					var dynamicLabel = document.createElement("label"); //РАЗ!
					dynamicLabel.className="field-label";
					dynamicLabel.innerHTML="Тип бизнеса/бранч "; 
					var dynamicFieldContainer = document.createElement("div");//ДВА!
					dynamicFieldContainer.className="field-container";					
					var dynamicSelectType=document.createElement("select");//выпадающий список ролей
					dynamicSelectType.className="text clientType";//выпадающий список ролей
					fulfillSelect(dynamicSelectType,typesBranches);					
					dynamicFieldContainer.appendChild(dynamicSelectType);
					var dynamicDescription = document.createElement("div");//ТРИ!
					dynamicDescription.className="description";
					var dynamicP = document.createElement("p");
					dynamicP.innerHTML="";				
					dynamicDescription.appendChild(dynamicP);
					dynamicFieldGroup.appendChild(dynamicLabel);
					dynamicFieldGroup.appendChild(dynamicFieldContainer);
					dynamicFieldGroup.appendChild(dynamicDescription);
					papa.insertBefore(dynamicFieldGroup,placeToAddInputs);
				}
				
				function addOneInputNumber(counter) { //создает поле № клиента
					var dynamicFieldGroup = document.createElement("div");
					dynamicFieldGroup.className="field-group client-"+i;
					var dynamicLabel = document.createElement("label"); //РАЗ!
					dynamicLabel.className="field-label";
					dynamicLabel.innerHTML="№ клиента "; 
					var dynamicFieldContainer = document.createElement("div");//ДВА!
					dynamicFieldContainer.className="field-container";
					var dynamicInput=document.createElement("input");
					dynamicInput.className="text clientNumber";
					dynamicInput.setAttribute("type", "text");
					dynamicFieldContainer.appendChild(dynamicInput);
					var dynamicDescription = document.createElement("div");//ТРИ!
					dynamicDescription.className="description";
					var dynamicP = document.createElement("p");
					dynamicP.innerHTML="";
					dynamicDescription.appendChild(dynamicP);
					dynamicFieldGroup.appendChild(dynamicLabel);
					dynamicFieldGroup.appendChild(dynamicFieldContainer);
					dynamicFieldGroup.appendChild(dynamicDescription);
					papa.insertBefore(dynamicFieldGroup,placeToAddInputs);
				}
				
				function fulfillSelect(selectElem,array){
					selectElem.style.display='inline-block';
					var option0 = document.createElement("option");
					option0.value = "0";
					option0.text = "";
					selectElem.appendChild(option0);
					for (var i = 0; i < array.length; i++) {// заполнение вариантов выбора в селект
						var option = document.createElement("option");
						option.value =(i+1);
						option.text = array[i];
						selectElem.appendChild(option);
					}
				}
				
				function addClient() { // добавляет 3 поля для нового клиента
					addOneInputNumber(i);
					addOneInputType(i);
					addOneInputName(i);
					i+=1;
				return false;
				}
								
				function delClient(targetClient) { // удаление клиента
					var toDel = document.getElementsByClassName(targetClient);
					var elemcount=toDel.length;
					for (var j=0;j<elemcount;j+=1){
						toDel[0].parentElement.removeChild(toDel[0]);
					}
				}
				
				function compileTogether(){		//сбор всего вместе. Создание таблицы из всех полей клиентов
					var allNames = document.getElementsByClassName("text clientName");
					var allTypes = document.getElementsByClassName("text clientType");
					var allNumbers = document.getElementsByClassName("text clientNumber");
					var clientString = "||Номер клиента||Тип бизнеса/бранч||Наименование организации||\r\n"; 
					for (var i=0;i<allNames.length;i=i+1){
						if (allNumbers[i].value!="" && allTypes[i].options[allTypes[i].selectedIndex].innerHTML!="" && allNames[i].value!=""){
							clientString+="|"+allNumbers[i].value+"|"+allTypes[i].options[allTypes[i].selectedIndex].innerHTML+"|"+allNames[i].value+"|\r\n";							
						} else { clientString="error"; break;}
						}
					descrOfIssue.value=clientString;					
					return false;
				}
				//////////////////
				var typesBranches = ["100. 3* и ниже сетевой отель с рестораном","101. 4 5* несетевой отель с рестораном","102. 3* и ниже несетевой отель с рестораном","103. Несетевой мотель / гостиница на трассе с рестораном/кафе","104. Пансионат/ Санаторий/ Спортивная база","105. Несетевой отель без ресторана / Гостевой дом","106. Сетевой отель без ресторана","107. 4 5* сетевой отель с рестораном","201. Ресторан русской кухни (Россия, Украина. Белоруссия)","202. Французский ресторан","203. Итальянский ресторан/ Пиццерия","204. Другой европейский ресторан (венгерская, сербская, хорватская, албанская)","205. Азиатский ресторан (Китай, Япония, Индия, Корея, Индонезия)","208. Кавказский ресторан (Грузия, Армения, Азербайджан)","209. Мексиканский ресторан","210. Американсий ресторан (США, Канада)","211. Ресторан смешанных кухонь/ Фьюжин Ресторан (Fusion)","212. Среднеазиатский ресторан (Узбекский, Казахский, Туркменский и т.д.)","213. Средиземноморский ресторан (Испанский, Греческий, Турецкий, Ливанский и т.д.)","214. Пивной ресторан (немецкая, чешская, английская, ирландская, австрийская кухня)","215. Стейк хаус, мясной/рыбный ресторан","300. Бары, пабы, пивные бары","301. Клубы/ Дискотеки/ Караоке бар/ Казино/ Боулинг/ Бильярд","302. Несетевое предприятие быстрого обслуживания (ПБО)/ Закусочная","303. Сетевое предприятие быстрого обслуживания (Fast Food)/ Закусочная","304. Кафе","305. Кофейня/Чайная/Мороженое","400. Банкетные залы и службы, событийный кейтеринг, доставка готовых обедов","401. Организация питания на предприятиях, бизнес центрах, на транспорте","402. Коммерческие, корпоративные столовые (частные или в составе предприятия)","403. Бюджетные (социальные) столовые (государственные, муниципальные)","500. Супермаркет","501. Продуктовый магазин \"У дома\" (самообслуживание)","502. Продуктовый магазин \"У дома\" (через прилавок)","504. Заправочная станция","507. Гипермаркет","508. Продуктовый магазин \"Трафик\" (самообслуживание)","509. Продуктовый магазин \"Трафик\" (через прилавок)","510. Продуктовый интернет магазин","600. Магазин/Киоск   Фрукты и Овощи","601. Магазин/Киоск   Рыба и Морепродукты","602. Пекарня/ Кондитерский цех (мини производство)","603. Магазин/Киоск   Хлеб и кондитерские изделия","604. Магазин/Киоск   Молочные продукты","605. Магазин/Киоск   Мясные продукты","606. Магазин/Киоск   Алкогольные и б/алк напитки","607. Магазин/Киоск   Табак","608. Магазин/Киоск   Бытовая химия и Косметика","609. Магазин/Киоск   Бакалея/консервы","610. Магазин/Киоск   Товары для животных","611. Аптека","700. Открытый рынок   Другие скоропортящиеся продукты","701. Открытый рынок   Мясо и Птица","702. Открытый рынок   Рыба и Морепродукты","703. Открытый рынок   Молочные продукты","704. Открытый рынок   Бытовая химия и Косметика","705. Открытый рынок   Продукты длительного срока хранения","707. Вендинговые аппараты","710. Киоск   Продукты (без специализации)","721. Опт/Дистрибуция   Продукты длительного срока хранения","722. Опт/Дистрибуция   Скоропортящиеся продукты","723. Опт/Дистрибуция   Бытовая химия и Косметика","724. Опт/Дистрибуция   Алкогольные и б/алк напитки","725. Опт/Дистрибуция   Табак","751. Магазин Фасоль \"У дома\"","752. Магазин Фасоль \"Трафик\"","802. Телекоммуникационные/Компьютерные/Интернет услуги","803. Почта/Курьерские услуги","804. Прокат автомобилей/Парковка","805. Мойка автомобилей","806. Пассажирские перевозки","807. Логистика/Складские услуги/Грузоперевозки/Вывоз мусора","808. Туристические агентства, туроператоры, турбюро","809. Копировально множительные услуги/Фотомагазин/Фотостудия","811. Учреждения культуры и отдыха","812. Свадебный салон","813. Банк/Сберегательная касса/ Обменный пункт/Лизинг/Ломбард","814. Страховая компания","815. Охранное агентство","816. Похоронное бюро/Ритуальные услуги/Кладбища","818. Услуги по уборке дома/офиса/Прачечная/Химчистка","820. Маркетинговые услуги/Рекламное агентство/Дизайн студия","821. Кадровое агентство","826. Агентство недвижимости","827. Юридическая консультация/ Нотариус / Экспертиза /Агентство по переводу","828. Бухгалтерские, Аудиторские услуги","829. Ателье одежды/ремонт обуви","830. Уход за животными","831. Ремесленники","832. Организация праздников/мероприятий","833. Салон красоты/Парикмахерская/Маникюр/Солярий","834. Фитнес/Спорт клуб/Бассейн/Йога/Пилатес","836. Ремонт/установка бытовой и электротехники","837. Ремонт автомобилей/мотоциклов, шиномонтаж","838. СПА салон/Баня/Сауна/Массаж","839. Персональные услуги","900. Органы власти и силовые структуры","901. Гос. образовательное и научное учреждение","902. Коммерческое образовательное учреждение","903. СМИ и информационные агентства","904. Коммунальные услуги / ТСЖ","905. Посольство/ Консульство","906. Некоммерческие и негосударственные организации","907. Аудио/Видео/TV/ Фото/Музыкальное/Компьютерное оборудование/Бытовая техника","908. Салон сотовой связи/Телефонное оборудование","909. Офисное оборудование","910. Канцелярские товары","911. Поставщики FOOD в METRO","912. Поставщики NON FOOD в METRO","913. Оптика","914. Ювелирный магазин/Часы","915. Сувенирный магазин/Игрушки/Подарки/Религиозные аттрибуты/Интим","916. Книжный магазин/ Газетный киоск / Лотерея","917. Магазин цветов","918. Религиозные организации","919. Магазин Одежды/Обуви/Ткани/Кожгалантерея/Рукоделие","920. Спортивный магазин/Охота Рыбалка/Оружие","921. Универмаг / Универбыт / Хозяйственный / Детский мир / Магазин непрод.товаров","922. Товары для дома/Посуда","923. Магазин Мебель/Интерьер/Свет","925. Магазин стройматериалов/Инструментов/Электрическое оборуд./Садовых товаров","926. Гос. Поликлиника / Стоматология","928. Продажа автомобилей и мототехники","929. Автозапчасти и аксессуары","930. Нетрадиционная медицина","931. Производство продуктов","932. Производство непродовольственных товаров","933. Индустриальное домостроение, девелоперские компании","934. Промышленные предприятия","935. Сельскохозяйственное предприятие","936. Коммерч. Поликлиника / Стоматология / Ветеринария / Частная практика","937. Больницы","980. Независимые специалисты","981. Бранч не используется","983. Ремонт/отделка квартир, индивидуальное строительство, ландшафтный дизайн","985. МЕТРО ресторан","987. Оформление по распоряжению руководства METRO","988. Специально зарезервированный номер","991. Ваучер","992. Резервный номер (технический бранч)","993. Внутренние расходы METRO","997. Онлайн регистрация новых клиентов","999. Персонал METRO"];// Возможные значения типов/бранчей				
				var placeToAdd=document.getElementById("description").parentElement.parentElement; // Место (невидимый блок Description) рядом с которым будут добавляться поля
				var papa=document.getElementsByClassName("aui vp-form top-label vp-request-form")[0]; //родитель, форма
				var i=1;//счетчик кол-ва клиентов
				var addClientBtn = document.createElement("a"); // ссылка на добавление клиента
				addClientBtn.id="clickToAddClient";
				addClientBtn.setAttribute("href", "javascript:void(0);");
				addClientBtn.setAttribute("onclick", "return false;");
				addClientBtn.innerHTML="<i class=\"aui-icon aui-icon-small aui-iconfont-list-add\"></i>&nbsp;Добавить клиента";
				var addLine = document.createElement("HR"); //линия для визуального разгарничения, для удобства читаемости
				papa.insertBefore(addClientBtn,placeToAdd);
				papa.insertBefore(addLine,addClientBtn);
				var placeToAddInputs=document.getElementById("clickToAddClient");
				placeToAddInputs.addEventListener("click", addClient, false); // обработчик кликов ссылки добавление клиента
				addClient(i);
				addClient(i); //первые 2 клиента создаются сразу при загрузке формы
				var btnPost=document.getElementsByClassName("buttons-container")[0];
				btnPost=btnPost.getElementsByClassName("aui-button aui-button-primary")[0];
				var descrOfIssue=document.getElementById("description");
				btnPost.addEventListener("click", compileTogether, false);	//обработчик клика на кнопку "Создать"
				btnPost.addEventListener("keydown", compileTogether, false);//обработчик нажатия клавиатурой на кнопку "Создать"
				document.getElementById("description").parentElement.parentElement.style.display = 'none';
				
				//------------------------Конец-------------------------------------------
				}
            }
        } )
    }())
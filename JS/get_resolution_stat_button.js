(function(){
	
        SERVICEDESK_REGISTER_JAVASCRIPT( {
            onLocationChange: function(location) {
			
			jQuery(".cv-request-actions,.customer-request-actions").after("<br><button class='aui-button aui-button-compact' id='StatRequestButton' title='Показывает время решения похожих заявок за предыдущие 30 дней' onclick='getstat()'>Статистика времени решения</button>&nbsp;<span id='statspinner' class='aui-icon aui-icon-wait' style='display:none'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>");
            }
        } )
    }()	)

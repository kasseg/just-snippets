// Версия с запуском sil скрипта через его rest api

function getstat() {
			var currentURL= window.location.href;
			var getKey = currentURL.substring(currentURL.lastIndexOf('/')+1,currentURL.length);
			var currentusername;
			var taskID ;
			document.getElementById("StatRequestButton").disabled=true;
			document.getElementById("statspinner").style.display="inline";
									
			AJS.$.ajax({
				type: 'POST',
				cache : false,
				contentType: "application/json",
				url : "https://jira.r4.madm.net/rest/keplerrominfo/refapp/latest/async-script/runScript",
				data : JSON.stringify({
				source: {
					type: "FILE",
					code: "IT/request_resolution_time_statistics.sil"
				},
				properties: [{
					"key": "sil.issue.key",
					"value": getKey
				}],
			
				}),
				error : function (xhr) {
					AJS.$.get("/rest/auth/1/session", function (data) {
					alert(data.name+", произошла ошибка " + xhr.status + " " + xhr.statusText+"\n"+ "Попробуйте выйти из JIRA, зайти снова и повторить запрос.");
					});
				},
				success : function(data) {
					console.log(data);
					taskID = data;

	// check result ---- start
				var CheckResult = setInterval(function(){
					AJS.$.ajax({
						type: 'POST',
						cache : false,
						contentType: "application/json",
						url : "https://jira.r4.madm.net/rest/keplerrominfo/refapp/latest/async/getResult",
						data : JSON.stringify(taskID),
						success : function(data) {
							console.log(data);
							if (data["running"]) {
							}
							else {
								
								AJS.messages.info("#comment-form", {
									title: 'Статистика времени решения',
									body: data["outcome"].results[0]
								});
							
								clearInterval(CheckResult);
								document.getElementById("StatRequestButton").disabled=false;
								document.getElementById("statspinner").style.display="none";
							};
						},
					});
				},500);
	// check result ---- end
				},					
		});		
		
};


	
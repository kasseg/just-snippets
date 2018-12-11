(function($){
SERVICEDESK_REGISTER_JAVASCRIPT( {
onLocationChange: function(location) {
cleaningPage();
var observer = new MutationObserver(function(mutations) {
	mutations.forEach(function(mutation) {
		console.log(mutation)
		if (mutation.addedNodes && mutation.addedNodes.length > 0) {
			// element added to DOM
			cleaningPage();
		}
	});
});
var config = {
	attributes: true,
	childList: true,
	characterData: true
};

observer.observe(document.body, config);
$( "#approveBtn" ).click(function(e) {
	e.stopPropagation();
	if (document.getElementById("comment-on-request").value) {
		$( "#addBtn" ).trigger( "click" );
		setTimeout(function() {
			$("#approveBtn").off("click");
			$("#approveBtn").trigger("click");
		}, 1000);
	} else {
		$("#approveBtn").off("click");
		$("#approveBtn").trigger("click");
	}
});

    $( "#declineBtn" ).click(function(e) {
        e.stopPropagation();
        if (document.getElementById("comment-on-request").value) {
            $( "#addBtn" ).trigger( "click" );
            setTimeout(function() {
                $("#declineBtn").off("click");
                $("#declineBtn").trigger("click");
            }, 1000);
        } else {
            $("#declineBtn").off("click");
            $("#declineBtn").trigger("click");
        }
    });


function cleaningPage() {
var toclean = document.getElementsByClassName("content");
for (i=toclean.length-1;i>=0;i=i-1){
	var bruceLi=toclean[i].parentElement.parentElement;
	if (toclean[i].innerText.indexOf("Your request status changed to")!== -1 || toclean[i].innerText.indexOf("Request requires approval")!== -1 || toclean[i].innerText.indexOf("Статус Вашего запроса изменён на")!== -1 || toclean[i].innerText.indexOf("Требуется одобрение запроса")!== -1) {
		bruceLi.parentElement.removeChild(bruceLi);
	}
}
    var approveButton=document.getElementsByClassName("aui-button aui-button-primary js-approve-approval")[0];
    if (approveButton) {
    	var declineButton=document.getElementsByClassName("aui-button js-decline-approval")[0];
        declineButton.id="declineBtn";
        approveButton.id="approveBtn";
        var addButton;
        for (i = 0; i < document.getElementsByClassName("aui-button aui-button-primary").length; i++) {
            if (document.getElementsByClassName("aui-button aui-button-primary")[i].value == "Add" || document.getElementsByClassName("aui-button aui-button-primary")[i].value == "Добавить") {
                addButton = document.getElementsByClassName("aui-button aui-button-primary")[i];
                addButton.id = "addBtn";
            }
        }
    }
	var allApprovals = document.getElementsByClassName("cv-approval-status cv-request-options-section");
	for (i=allApprovals.length-1;i>=0;i-=1){
		var decision=allApprovals[i].getElementsByClassName("cv-final-decision");
		if (decision[0].innerText=="Утверждено" || decision[0].innerText=="Approved"){
			var userLIs=allApprovals[i].getElementsByTagName("LI");
			for (j=userLIs.length-1;j>=0;j-=1){
				if (!userLIs[j].getElementsByClassName("sd-user sd-user-tagged").length){
					userLIs[j].parentElement.removeChild(userLIs[j]);
				} //else userLIs[j].parentElement.removeChild(userLIs[j]);
			}
		}
	}
	var allUsers=document.getElementsByClassName("cv-user-list")[0].getElementsByClassName("sd-user");
	for (i=allUsers.length-1;i>=0;i-=1){
		if (!allUsers[i].classList.contains("sd-user-tagged")) {
            allUsers[i].parentElement.parentElement.removeChild(allUsers[i].parentElement);
		}
	}
}
}
} )
})(jQuery);
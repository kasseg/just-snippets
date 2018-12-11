(function($){
SERVICEDESK_REGISTER_JAVASCRIPT( {
onLocationChange: function(location) {
var currentURL= window.location.href;
substring = "customer/portal/281/create/681";
if (currentURL.indexOf(substring) !== -1) {
    //document.getElementById("s2id_customfield_10702").getElementsByClassName("select2-choices")[0].removeChild(document.getElementById("s2id_customfield_10702").getElementsByClassName("select2-search-choice")[0]);
    //document.getElementById("customfield_10702").value="";
    pasrselabels("customfield_128000");
    pasrselabels("customfield_128010");
    var hwLabel=document.getElementById("customfield_128000").parentElement.parentElement.parentElement.getElementsByTagName("label")[0];
    hwLabel.className+=" expandHW";
    var hwContent=document.getElementById("customfield_128000").parentElement.parentElement;
    hwContent.className+=" HWOptions";
    $('.HWOptions').hide();
    var arrowForHW = document.createElement("span");
    arrowForHW.className = "aui-icon aui-icon-small aui-iconfont-arrows-down";
    hwLabel.appendChild(arrowForHW);
    $('.expandHW').click(function(){
        $('.HWOptions').slideToggle( "slow" );
        if (arrowForHW.className.indexOf("arrows-down")!== -1){
            arrowForHW.className = "aui-icon aui-icon-small aui-iconfont-arrows-up";
        } else {
            arrowForHW.className = "aui-icon aui-icon-small aui-iconfont-arrows-down";
        }
    });

    var swLabel=document.getElementById("customfield_128010").parentElement.parentElement.parentElement.getElementsByTagName("label")[0];
    swLabel.className+=" expandSW";
    var swContent=document.getElementById("customfield_128010").parentElement.parentElement;
    swContent.className+=" SWOptions";
    $('.SWOptions').hide();
    var arrowForSW = document.createElement("span");
    arrowForSW.className = "aui-icon aui-icon-small aui-iconfont-arrows-down";
    swLabel.appendChild(arrowForSW);
    $('.expandSW').click(function(){
        $('.SWOptions').slideToggle( "slow" );
        if (arrowForSW.className.indexOf("arrows-down")!== -1){
            arrowForSW.className = "aui-icon aui-icon-small aui-iconfont-arrows-up";
        } else {
            arrowForSW.className = "aui-icon aui-icon-small aui-iconfont-arrows-down";
        }
    });

    var swFreeLabel=document.getElementById("customfield_128020").parentElement.parentElement.parentElement.getElementsByTagName("label")[0];
    swFreeLabel.className+=" expandSWfree";
    var swFreeContent=document.getElementById("customfield_128020").parentElement.parentElement;
    swFreeContent.className+=" SWfreeOptions";
    $('.SWfreeOptions').hide();
    var arrowForSWfree = document.createElement("span");
    arrowForSWfree.className = "aui-icon aui-icon-small aui-iconfont-arrows-down";
    swFreeLabel.appendChild(arrowForSWfree);
    $('.expandSWfree').click(function(){
        $('.SWfreeOptions').slideToggle( "slow" );
        if (arrowForSWfree.className.indexOf("arrows-down")!== -1){
            arrowForSWfree.className = "aui-icon aui-icon-small aui-iconfont-arrows-up";
        } else {
            arrowForSWfree.className = "aui-icon aui-icon-small aui-iconfont-arrows-down";
        }
    });

    var remoteLabel=document.getElementById("customfield_128030").parentElement.parentElement.parentElement.getElementsByTagName("label")[0];
    remoteLabel.className+=" expandRemote";
    var remoteContent=document.getElementById("customfield_128030").parentElement.parentElement;
    remoteContent.className+=" remoteOptions";
    $('.remoteOptions').hide();
    var arrowForRemote = document.createElement("span");
    arrowForRemote.className = "aui-icon aui-icon-small aui-iconfont-arrows-down";
    remoteLabel.appendChild(arrowForRemote);
    $('.expandRemote').click(function(){
        $('.remoteOptions').slideToggle( "slow" );
        if (arrowForRemote.className.indexOf("arrows-down")!== -1){
            arrowForRemote.className = "aui-icon aui-icon-small aui-iconfont-arrows-up";
        } else {
            arrowForRemote.className = "aui-icon aui-icon-small aui-iconfont-arrows-down";
        }
    });

    $(".expandHW, .expandSW, .expandSWfree, .expandRemote").hover(function() {
        // get rid of the text decoration on all 4 thumbnails
        $(this).css('text-decoration','underline');
    }, function() {
        $(this).css('text-decoration','none');
    });

    function pasrselabels(cf_id) {
        var allLabels= document.getElementById(cf_id).parentElement.parentElement.getElementsByTagName("label");
        for (i=0;i<allLabels.length;i=i+1){
            if (allLabels[i].innerHTML.indexOf("/")!=-1){
                var restLabel=allLabels[i].innerHTML.substring(allLabels[i].innerHTML.indexOf("/")+1,allLabels[i].innerHTML.length);
                allLabels[i].innerHTML=allLabels[i].innerHTML.substring(0,allLabels[i].innerHTML.indexOf("/"))+"<br><p style=\"font-size:12px;color:gray;margin:0px\">"+restLabel+"</p>";
            }
        }
        //alert(allLabels.length);
    }
}
}
} )
})(jQuery);
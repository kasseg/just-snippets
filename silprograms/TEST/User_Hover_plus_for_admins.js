var observer = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    if ( mutation.type == 'childList' ) {
      if (mutation.addedNodes.length >= 1) {
            var userHoverDiv = document.getElementById("user-hover-email");
            if (userHoverDiv){
                observer.disconnect();
                if (userHoverDiv.children.length<2) {
                    var urlJira=document.getElementById("avatar-full-name-link").href;
                    var el = document.createElement("span");
                    el.id="some-stuff";
                    el.innerHTML = "<br>"+getProperties(urlJira);
                    userHoverDiv.appendChild(el);
                }
            observer.observe(targetNode, observerConfig);
            }
        }

    }

  });   
});
  
var observerConfig = {
        attributes: true,
        childList: true,
        characterData: true,
        subtree: true
};
  
var targetNode = document.body;
observer.observe(targetNode, observerConfig);


function getProperties(userlink){
var xhr = new XMLHttpRequest();

xhr.open('GET', userlink, false);
xhr.send();

if (xhr.status != 200) {

  alert( xhr.status + ': ' + xhr.statusText ); 
} else {
    var div = document.createElement('div');
    div.innerHTML = xhr.responseText;

    var ddTags = div.getElementsByTagName("dd");
    var userInfo;
    var foundStore;
    var foundDepart;
    var foundJob;
    var foundCity;
    for (var i = 0; i < ddTags.length; i++) {
        if (ddTags[i].innerHTML.indexOf('metroStoreNumber') != -1) {
        var posStart=ddTags[i].innerHTML.indexOf('metroStoreNumber');
        var posEnd=ddTags[i].innerHTML.length;
        foundStore = ddTags[i].innerHTML.substring(posStart,posEnd);
        foundStore = foundStore.substring(0,foundStore.indexOf('<br>'));
        foundStore = foundStore.substring(foundStore.length-4,foundStore.length);
        
        posStart=ddTags[i].innerHTML.indexOf('department');
        posEnd=ddTags[i].innerHTML.indexOf('<br>');
        foundDepart=ddTags[i].innerHTML.substring(posStart,posEnd);
        foundDepart=foundDepart.substring(foundDepart.indexOf(':')+1,foundDepart.length);
        
        posStart=ddTags[i].innerHTML.indexOf('metroJobTitle');
        posEnd=ddTags[i].innerHTML.indexOf('metroStoreNumber');
        foundJob=ddTags[i].innerHTML.substring(posStart,posEnd);
        foundJob=foundJob.substring(foundJob.indexOf(':')+1,foundJob.length);
        
        if (ddTags[i].innerHTML.indexOf('l:') != -1) {
        posStart=ddTags[i].innerHTML.indexOf('l:');
        posEnd=ddTags[i].innerHTML.indexOf('metroJobTitle');
        foundCity=ddTags[i].innerHTML.substring(posStart,posEnd);
        foundCity = foundCity.substring(0,foundCity.indexOf('<br>'));
        foundCity=" - "+foundCity.substring(foundCity.indexOf(':')+1,foundCity.length);
        } else {
            foundCity="";
            }
            
        if (foundStore=="1990"){
            foundCity=" - HO Regional"
        } else {
            if (foundStore=="1090"){
            foundCity=" - HQ Leningr.sh."
                }
            }
        break;
        }
    }
    if (foundDepart==null){
        userinfo="";
    }else{
    userinfo="<font size=-1>"+foundStore+foundCity+"<br>"+foundDepart+"<br>"+foundJob+"</font>";
    }
    return userinfo;
}
}
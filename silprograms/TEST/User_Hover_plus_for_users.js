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
                    el.innerHTML = getProperties(urlJira);
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
    if (typeof div.getElementsByClassName("mod-content item-details")[0]!= 'undefined'){
    var ddTags = div.getElementsByClassName("mod-content item-details")[0].innerHTML;
    var userInfo;
    var foundStore;
    var foundDepart;
    var foundJob;
    var foundCity;
    var posStart=ddTags.indexOf('metroStoreNumber');
    var posEnd=ddTags.length;
    
    foundStore=ddTags.substring(posStart,posEnd);
    foundStore=foundStore.substring(foundStore.indexOf('</span>')-4,foundStore.indexOf('</span>'));
    
    posStart=ddTags.indexOf('department:');
    foundDepart=ddTags.substring(posStart,posEnd);
    foundDepart=foundDepart.substring(foundDepart.indexOf('<span>')+6,foundDepart.indexOf('</span>'));
    
    posStart=ddTags.indexOf('metroJobTitle:');
    foundJob=ddTags.substring(posStart,posEnd);
    foundJob=foundJob.substring(foundJob.indexOf('<span>')+6,foundJob.indexOf('</span>'));
    
    if (ddTags.indexOf('l:') != -1) {
    posStart=ddTags.indexOf('l:');
    foundCity=ddTags.substring(posStart,posEnd);
    foundCity=" - "+foundCity.substring(foundCity.indexOf('<span>')+6,foundCity.indexOf('</span>'));
    }
    if (foundStore=="1990"){
            foundCity=" - HO Regional"
        } else {
            if (foundStore=="1090"){
            foundCity=" - HQ Leningr.sh."
                }
            }
    userinfo="<br><font size=-1>"+foundStore+foundCity+"<br>"+foundDepart+"<br>"+foundJob+"</font>";
    } else {userinfo="";}
    
    return userinfo;
}
}
/*if (!document.getElementById("footballdiv")) {
        var football=document.createElement("div");
        football.id="footballdiv";
        football.style.background= "url('/images/football2.jpg') no-repeat center center";
        football.style.height="100%";
        football.style.width="100%";
        football.style.zIndex="100";
        football.style.top="0";
        football.style.left="0";
        football.style.position="fixed";
        football.style.display="none";
        document.body.appendChild(football);
        $("#footballdiv").fadeIn(1000).promise().done(function(){
            $("#footballdiv").fadeOut(1000);
        });
    }*/
var btn=document.getElementById("issue-workflow-transition-submit");
btn.addEventListener("click", doStuff, false);


function doStuff() {
$("#issue-workflow-transition").on("remove", function () {
    if (!document.getElementById("footballdiv")) {
        var football=document.createElement("div");
        football.id="footballdiv";
        football.className="jira-dialog box-shadow jira-dialog-open popup-width-large jira-dialog-content-ready";
        football.style.background= "url('/images/football2.jpg') no-repeat center center";
        football.style.height="100%";
        football.style.width="100%";
        football.style.zIndex="100";
        football.style.top="0";
        football.style.left="0";
        football.style.position="fixed";
        football.style.display="none";
        document.body.appendChild(football);
        
        var sound      = document.createElement('audio');
        sound.id       = 'audio-player';
        sound.controls = 'controls';
        sound.src      = '/images/ura.mp3';
        sound.type     = 'audio/mpeg';
        document.body.appendChild(sound);
        sound.play();
        
        $("#footballdiv").fadeIn(2000).promise().done(function(){
            $("#footballdiv").fadeOut(2500);
        });
    }
})
    
}
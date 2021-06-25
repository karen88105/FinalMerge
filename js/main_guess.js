let first = document.getElementById("first");
let second = document.getElementById("second");
let third = document.getElementById("third");

let timer = document.getElementById("timer");
let hint = document.getElementById("hint");
let restart = document.getElementById("restart");
let allPoint = document.getElementById("allPoint");
let count = 30, yourPoint = 0;
let now = 1;
let myVar;
timer.innerHTML = count;
allPoint.innerHTML = yourPoint;
//restart.addEventListener("click", restart);

let player; //YouTube Player
let currentPlay = 0; //記錄目前撥到第幾首歌
let alreadySong = [-1,-1,-1,-1,-1,-1,-1,-1];
let Case = 0, change = 0;

//YouTube API Ready
function onYouTubeIframeAPIReady(){
    for(var i=0; i<8; i++){
        var a = parseInt(Math.random()*8);
        while(alreadySong[a] != -1) a = parseInt(Math.random()*8);
        alreadySong[a] = i;
    }
    currentPlay = alreadySong[Case++];

    player = new YT.Player("player",{
        height:"390",
        width:"640",
        videoId:playList[currentPlay][0],
        playerVars:{
        autoplay:0, //是否自動撥放
        controls:0, //是否顯示控制項
        start:playTime[currentPlay][0],//開始秒數
        end:playTime[currentPlay][1],//結束秒數
        iv_load_policy:3
    },
    events:{
        onReady:onPlayerReady,
        onStateChange:onPlayerStateChange
        }
    });

    ns = [-1,-1,-1];
    ns[parseInt(Math.random()*3)] = currentPlay;
    var a = -1, b = -1;
    
    for(var i=0; i<3; i++){
        if(ns[i] == -1){
            if(a == -1){
                a = parseInt(Math.random()*8);
                while(a == currentPlay) a = parseInt(Math.random()*8);
                ns[i] = a;
            }
            else if(b == -1){
                b = parseInt(Math.random()*8);
                while(b == currentPlay || b == a) b = parseInt(Math.random()*8);
                ns[i] = b;
            }
        }
        $("#options").append(`<input class='song_option' name='options0' type='radio' value='${i}'><label class='radio_label'>${playList[ns[i]][1]}</label>`);
    }
}
//YouTube Player Ready
function onPlayerReady(event){
    $("#second").remove();
    $("#third").remove();

    $("#playButton").unbind('click').click(function(){
        $("#first").remove();
        $("#coverDiv").append(`<div id="second"></div><div id="third"></div>`);

        if(now == 1){
            myVar = setInterval(myTimer, 1000);
            now = 0;
        }
        player.playVideo();
    });
}
//Player State Change
function onPlayerStateChange(event){
    if(Math.floor(player.getCurrentTime())==playTime[currentPlay][1] || change == 1){
        if(Case < playList.length){
            //currentPlay++;
            currentPlay = alreadySong[Case++];
            player.loadVideoById({
                videoId:playList[currentPlay][0],
                startSeconds:playTime[currentPlay][0],
                endSeconds:playTime[currentPlay][1],
                suggestedQuality:"large"
            });

            $("#options").empty();

            ns = [-1,-1,-1];
            ns[parseInt(Math.random()*3)] = currentPlay;
            var buf = -1;
            
            for(var i=0; i<3; i++){
                if(ns[i] == -1){
                    ns[i] = parseInt(Math.random()*8);
                    while(ns[i] == currentPlay || buf == ns[i]) ns[i] = parseInt(Math.random()*8);
                    buf == ns[i];
                }
                $("#options").append(`<input class='song_option' name='options0' type='radio' value='${i}'><label class='radio_label'>${playList[ns[i]][1]}</label>`);
            }
            change = 0;
        }
    }

    
}

function myTimer(){
    count--;
    timer.innerHTML = count;

    if(count==0){
        hint.innerHTML="遊戲結束!"

        clearInterval(myVar);
        player.destroy();

        $("#second").remove();
        $("#third").remove();
        $('#options').empty();

        now = 1;

        alert("得分"+yourPoint);
        //restart();
    }

    $('input:radio[name="options0"]').unbind('click').click(function(){
        var checkValue = $('input:radio[name="options0"]:checked').val(); 

        //player.stopVideo();
    
        $("#options").empty();
    
        if(ns[checkValue] == currentPlay){
            yourPoint++;
            //alert("You got it!");
            allPoint.innerHTML=yourPoint;
            hint.innerHTML="恭喜答對囉!";
        }
        else{
            hint.innerHTML="答錯囉!";
        }
        change = 1;

        player.stopVideo();
    }); 
}

$("#restart").unbind('click').click(function(){
    player.destroy();

    $('#options').empty();

    clearInterval(myVar);
    now = 1;
    count = 30;
    change = yourPoint = Case = 0;
    hint.innerHTML = null;
    timer.innerHTML = count;
    allPoint.innerHTML = yourPoint;

    alreadySong = [-1,-1,-1,-1,-1,-1,-1,-1];
    for(var i=0; i<8; i++){
        var a = parseInt(Math.random()*8);
        while(alreadySong[a] != -1) a = parseInt(Math.random()*8);
        alreadySong[a] = i;
    }

    ns = [-1,-1,-1];
    ns[parseInt(Math.random()*3)] = currentPlay;
    var a = -1, b = -1;
    
    for(var i=0; i<3; i++){
        if(ns[i] == -1){
            if(a == -1){
                a = parseInt(Math.random()*8);
                while(a == currentPlay) a = parseInt(Math.random()*8);
                ns[i] = a;
            }
            else if(b == -1){
                b = parseInt(Math.random()*8);
                while(b == currentPlay || b == a) b = parseInt(Math.random()*8);
                ns[i] = b;
            }
        }
        $("#options").append(`<input class='song_option' name='options0' type='radio' value='${i}'><label class='radio_label'>${playList[ns[i]][1]}</label>`);
    }

    currentPlay = alreadySong[Case++];
    player = new YT.Player("player",{
        height:"390",
        width:"640",
        videoId:playList[currentPlay][0],
        playerVars:{
        autoplay:0, //是否自動撥放
        controls:0, //是否顯示控制項
        start:playTime[currentPlay][0],//開始秒數
        end:playTime[currentPlay][1],//結束秒數
        iv_load_policy:3
    },
    events:{
        onReady:onPlayerReady,
        onStateChange:onPlayerStateChange
        }
    });

    $("#coverDiv").append(`<div id="first"><div id="firstText">限時猜歌遊戲</div></div>`);
});
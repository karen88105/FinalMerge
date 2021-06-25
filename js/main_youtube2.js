let player; //YouTube Player
let currentPlay = 0; //記錄目前撥到第幾首歌

//YouTube API Ready
function onYouTubeIframeAPIReady(){
    player = new YT.Player("player",{
        height:"390",
        width:"640",
        videoId:playList[currentPlay][0],
        playerVars:{
            autoplay:0, //是否自動撥放
            controls:0, //是否顯示控制項
            showinfo: 0,
            rel: 0,
            //start:playTime[currentPlay][0],//開始秒數
            //end:playTime[currentPlay][1],//結束秒數
            iv_load_policy:3
        },
        events:{
            onReady:onPlayerReady,
            onStateChange:onPlayerStateChange
        }
    });
}
//YouTube Player Ready
function onPlayerReady(event){
    $("#playButton").on("click",function(){
        $("h2").text(player.getVideoData().title);
        player.playVideo();
    });
}

//Player State Change
function onPlayerStateChange(event){
    if (event.data == YT.PlayerState.ENDED) {
        if(currentPlay < playList.length-1)
            currentPlay++;
        else currentPlay = 0;
        player.loadVideoById({
            videoId:playList[currentPlay][0],
            suggestedQuality:"large"
        });
        //player.playVideo();
    }

    $("#nextButton").unbind('click').click(function(){
        currentPlay++;
        if(currentPlay >= playList.length)
            currentPlay = 0;
        player.loadVideoById({
            videoId:playList[currentPlay][0],
            suggestedQuality:"large"
        });
    });

    $("h2").text(player.getVideoData().title);
}

$(function(){
    for(var i=0; i<playList.length; i++){
        $('#songList').append(`<li>${playList[i][1]}</li>`);
    }
});

$('#submitButton').on('click', function() {
    var newId = $("#yid").val();
    var newTitle = $("#ytitle").val();
    $("#yid").val("");
    $("#ytitle").val("");

    if(newId!="" && newTitle!=""){
        playList[playList.length] = [newId, newTitle];
        $('#songList').append(`<li>${playList[playList.length-1][1]}</li>`);
    }
    else
        alert("輸入資訊不完整");
    //player.playVideo();
});

$("#deleteButton").on('click', function(){
    var num = $("#ydelete").val();
    $("#ydelete").val("");

    if(num <= playList.length && num > 0){
        playList.splice(num-1,1);

        $('#songList').empty();
        for(var i=0; i<playList.length; i++)
            $('#songList').append(`<li>${playList[i][1]}</li>`);
    }
})
let mapArray, ctx, currentImgMain, bufferMapArray, nowMap;  //0:原始,1:shop,2:好結局,3:壞結局 4:youtube
let imgMountain, imgMain, imgEnemy;   // imgShop, imgCrystal, imgSoil, imgDoor;
//mapArray - 決定地圖中每個格子的元素
//ctx - HTML5 Canvas用
//currentImgMainX, currentImgMainY - 決定主角所在座標
//imgMountain, imgMain, imgEnemy - 障礙物, 主角, 敵人的圖片物件

const gridLength = 100;  //畫面中要移動的距離
let myMoney = 0, myPotato = 0, mySword = 0, myBomb = 0, myCrystal = 0;

function drawMap(){
    console.log(0);
    var material0 = new Image();
    material0.src = "img/material.png";
    var material3 = new Image();
    material3.src = "img/material3.jpg";
    var sword = new Image();
    sword.src = "img/sword.png";
    var bomb = new Image();  //還沒onload
    bomb.src = "img/bomb.png";
    var box = new Image();  //還沒onload
    box.src = "img/box.jpg";
    imgEnemy = new Image();
    imgEnemy.src = "img/Enemy.png";

    var imgM = $("#imgM")[0].getContext('2d');
    var imgF = $("#imgF")[0].getContext('2d');
    var imgS = $("#imgS")[0].getContext('2d');
    var imgB = $("#imgB")[0].getContext('2d');
    var imgC = $("#imgC")[0].getContext('2d');

    imgEnemy.onload = function(){
        for(var x in mapArray)
            for(var y in mapArray[x])
                if(mapArray[x][y]==3)
                    ctx.drawImage(imgEnemy, 7,40,104,135,y*gridLength,x*gridLength,gridLength,gridLength);
    }

    sword.onload = function(){
        for(var x in mapArray)
            for(var y in mapArray[x])
                if(mapArray[x][y]==10)
                    ctx.drawImage(sword, 0,0,150,150,y*gridLength,x*gridLength,gridLength,gridLength);
        
        imgS.drawImage(sword, 0,0,150,150,0,0,70,70);
    }

    bomb.onload = function(){
        imgB.drawImage(bomb, 0,0,510,510,0,0,70,70);
    }

    box.onload = function(){
        for(var x in mapArray)
            for(var y in mapArray[x])
                if(mapArray[x][y]==11)
                    ctx.drawImage(box, 60,45,470,470,y*gridLength,x*gridLength,gridLength,gridLength);
    }

    material0.onload = function(){
        for(var x in mapArray)
            for(var y in mapArray[x])
                //地圖
                if(mapArray[x][y]==1)
                    ctx.drawImage(material0, 32,65,32,32,y*gridLength,x*gridLength,gridLength,gridLength);
                else if(mapArray[x][y]==4)
                    ctx.drawImage(material0, 0,0,32,32,y*gridLength,x*gridLength,gridLength,gridLength);
                else if(mapArray[x][y]==5)
                    ctx.drawImage(material0, 223,160,32,32,y*gridLength,x*gridLength,gridLength,gridLength);
                else if(mapArray[x][y]==7)
                    ctx.drawImage(material0, 257,0,32,32,y*gridLength,x*gridLength,gridLength,gridLength);
                else if(mapArray[x][y]==8)
                    ctx.drawImage(material0, 64,65,32,32,y*gridLength,x*gridLength,gridLength,gridLength);
                else if(mapArray[x][y]==9)
                    ctx.drawImage(material0, 352,0,32,32,y*gridLength,x*gridLength,gridLength,gridLength);
                
        //道具數量
        imgM.drawImage(material0, 257,0,32,32,0,0,70,70);
        imgF.drawImage(material0, 64,65,32,32,0,0,70,70);
        imgC.drawImage(material0, 223,160,32,32,0,0,70,70);
    }

    material3.onload = function(){
        for(var x in mapArray)
            for(var y in mapArray[x])
                if(mapArray[x][y]==6)
                    ctx.drawImage(material3, 170,680,80,80,y*gridLength,x*gridLength,gridLength,gridLength);
                else if(mapArray[x][y]==2)
                    ctx.drawImage(material3, 640,128,64,96,y*gridLength,x*gridLength,gridLength,gridLength);
    }
    return;
}

//網頁載入完成後初始化動作
$(function(){
    mapArray = [[0,1,1,6,0,1,5,1,1,2],
                [0,0,0,1,0,0,1,0,1,0],
                [1,1,0,1,1,0,1,0,3,0],
                [4,3,0,3,0,0,1,1,1,2]];  
                //地圖 0-可走,1-障礙,2-終點(門),3-敵人,4-店1,5-水晶,6-土堆,7-錢,8-番茄,9-書,10-劍,11-寶箱

    nowMap = myMoney = 0;
    ctx = $("#myCanvas")[0].getContext("2d");

    //主角照片
    imgMain = new Image();
    imgMain.src = "img/spriteSheet.png";
    currentImgMain = {
        "x":0,
        "y":0
    };
    imgMain.onload = function(){
        //drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
        ctx.drawImage(imgMain, 0,0,80,130,currentImgMain.x,currentImgMain.y,gridLength,gridLength);
    }
    drawMap();

    $("#numM").text(myMoney);
    $("#numF").text(myPotato);
    $("#numS").text(mySword);
    $("#numB").text(myBomb);
    $("#numC").text(myCrystal);
});

//處理使用者按下按鍵
$(document).on("keydown",function(event){
    let targetImg, targetBlock, cutImagePositionX;
    //cutImagePositionX - 決定主角臉朝向哪個方向

    targetImg = { //主角的目標座標
        "x":-1,
        "y":-1
    };
    targetBlock = { //主角的目標(對應2維陣列)
        "x":-1,
        "y":-1
    }

    event.preventDefault();
    //避免鍵盤預設行為發生，如捲動/放大/換頁...
    //判斷使用者按下什麼並推算目標座標

    switch(event.code){
        case "ArrowLeft":
            targetImg.x = currentImgMain.x - gridLength;
            targetImg.y = currentImgMain.y;
            cutImagePositionX = 175;//臉朝左
            break;
        case "ArrowUp":
            targetImg.x = currentImgMain.x;
            targetImg.y = currentImgMain.y - gridLength;
            cutImagePositionX = 355;//臉朝上
            break;
        case "ArrowRight":
            targetImg.x = currentImgMain.x + gridLength;
            targetImg.y = currentImgMain.y;
            cutImagePositionX = 540;//臉朝右
            break;
        case "ArrowDown":
            targetImg.x = currentImgMain.x;
            targetImg.y = currentImgMain.y + gridLength;
            cutImagePositionX = 0;//臉朝下
            break;
        default://其他按鍵不處理
            return;
    }

    //確認目標位置不會超過地圖
    if(targetImg.x<=900 && targetImg.x>=0 && targetImg.y<=300 && targetImg.y>=0){
        targetBlock.x = targetImg.y / gridLength;
        targetBlock.y = targetImg.x / gridLength;
    }
    else{
        targetBlock.x = -1;
        targetBlock.y = -1;
    }
    
    //清空主角原本所在的位置
    ctx.clearRect(currentImgMain.x, currentImgMain.y, gridLength, gridLength);

    if(targetBlock.x!=-1 && targetBlock.y!=-1){
        switch(mapArray[targetBlock.x][targetBlock.y]){
            case 0: // 一般道路(可移動)
                $("#talkBox").text("");
                $("#options").empty();
                currentImgMain.x = targetImg.x;
                currentImgMain.y = targetImg.y;
                break;
            case 1: // 有障礙物(不可移動)
                if(myBomb > 0){  // && (targetBlock.x==1 && targetBlock.y==6)
                    $("#talkBox").text(questions[5].question);
                
                    $("#options").empty();
                    questions[5].answers.forEach(function(element,index,array){  //將選項逐個加入
                        $("#options").append(`<div class='shop_div'>
                                                <input class='shop_option' name='options5' type='radio' value='${index}'><label class='radio_label'>${element[0]}</label>
                                                </div>`);
                    });
                }
                else{
                    $("#talkBox").text("有山");
                    $("#options").empty();
                }
                break;
            case 2: // 終點(可移動)
                if(nowMap == 0){
                    if(targetBlock.x==0 && targetBlock.y==9)  //good end
                        questions[7].question[1] = 1;
                    else if(targetBlock.x==3 && targetBlock.y==9)  //bad end
                        questions[7].question[1] = 2;

                    $("#talkBox").text("進入洞窟");

                    bufferMapArray = mapArray;
                    mapArray = [[1,0,1],
                                [1,11,1],
                                [1,1,1]];
                    nowMap = 2;
                    ctx.clearRect(0,0,10*gridLength,4*gridLength);
                    $("#myCanvas").attr('height', 3*gridLength);
                    $("#myCanvas").attr('width', 3*gridLength);
                    drawMap();

                    currentImgMain.x = 1*gridLength;
                    currentImgMain.y = 0*gridLength;
                    cutImagePositionX = 0;

                    ctx.drawImage(imgMain, cutImagePositionX,0,80,130,currentImgMain.x,currentImgMain.y,gridLength,gridLength);

                    /*$("#talkBox").text("抵達終點");
                    $("#options").empty();
                    currentImgMain.x = targetImg.x;
                    currentImgMain.y = targetImg.y;*/
                }
                else if(nowMap == 1){
                    mapArray = bufferMapArray;
                    nowMap = 0;
                    ctx.clearRect(0,0,4*gridLength,4*gridLength);
                    $("#myCanvas").attr('height', 4*gridLength);
                    $("#myCanvas").attr('width', 10*gridLength);
                    drawMap();

                    currentImgMain.x = 1*gridLength;
                    currentImgMain.y = 3*gridLength;
                    cutImagePositionX = 540;

                    ctx.drawImage(imgMain, cutImagePositionX,0,80,130,currentImgMain.x,currentImgMain.y,gridLength,gridLength);
                }
                break;
            case 3: // 敵人(不可移動)
                $("#options").empty();
                if(nowMap == 0){  //原地圖
                    if(targetBlock.x==3 && targetBlock.y==1){  //左士兵
                        $("#talkBox").text(questions[0].question);

                        $("#options").empty();
                        questions[0].answers.forEach(function(element,index,array){  //將選項逐個加入
                            $("#options").append(`<div class='enemy_div'>
                                                    <input class='enemy_option' name='options0' type='radio' value='${index}'><label class='radio_label'>${element[0]}</label>
                                                </div>`);
                        });
                    }
                    else if(targetBlock.x==3 && targetBlock.y==3){  //中士兵
                        $("#talkBox").text(questions[1].question);

                        if(myMoney > 0) questions[1].answers[2] = ["我:一點小意思 請收下(賄絡)",4];
                        else questions[1].answers[2] = ["我:好狗不擋路",3];

                        $("#options").empty();
                        questions[1].answers.forEach(function(element,index,array){  //將選項逐個加入
                            $("#options").append(`<div class='enemy_div'>
                                                    <input class='enemy_option' name='options1' type='radio' value='${index}'><label class='radio_label'>${element[0]}</label>
                                                </div>`);
                        });
                    }
                    else if(targetBlock.x==2 && targetBlock.y==8){  //右士兵
                        $("#talkBox").text(questions[6].question[0]);
                        $("#talkBox").append(`<br><div>${questions[6].question[1]}</div><br>`);

                        $("#options").empty();
                        $("#options").append(`<br>`);
                        questions[6].answers.forEach(function(element,index,array){  //將選項逐個加入
                            $("#options").append(`<div class='enemy_div'>
                                                    <input class='enemy_option' name='options6' type='radio' value='${index}'><label class='radio_label'>${element[0]}</label>
                                                </div>`);
                        });
                    }
                }
                else if(nowMap == 1){  //shop內地圖
                    if(targetBlock.x==1 && targetBlock.y==1){
                        $("#talkBox").text(questions[4].question);

                        if(myPotato > 0) questions[4].answers[2] = ["我:請問要吃番茄嗎?(需有番茄)",4];
                        else questions[4].answers[2] = ["我:今天天氣很好!",3];

                        $("#options").empty();
                        questions[4].answers.forEach(function(element,index,array){  //將選項逐個加入
                            $("#options").append(`<div class='enemy_div'>
                                                    <input class='enemy_option' name='options4' type='radio' value='${index}'><label class='radio_label'>${element[0]}</label>
                                                </div>`);
                        });
                    }
                }

                break;
            case 4:  // 店
                $("#options").empty();
                if(targetBlock.x==3 && targetBlock.y==0){
                    $("#talkBox").text(questions[2].question);

                    $("#options").empty();
                    questions[2].answers.forEach(function(element,index,array){  //將選項逐個加入
                        $("#options").append(`<div class='shop_div'>
                                                <input class='shop_option' name='options2' type='radio' value='${index}'><label class='radio_label'>${element[0]}</label>
                                              </div>`);
                    });
                }

                break;
            case 5:  //水晶
                $("#talkBox").text("獲得水晶");
                $("#options").empty();
                myCrystal++;
                $("#numC").text(myCrystal);

                mapArray[targetBlock.x][targetBlock.y] = 0;
                ctx.clearRect((targetBlock.y)*gridLength,(targetBlock.x)*gridLength,gridLength,gridLength);
                break;
            case 6:  //土堆
                $("#talkBox").text(questions[3].question);

                $("#options").empty();
                questions[3].answers.forEach(function(element,index,array){  //將選項逐個加入
                    $("#options").append(`<div class='shop_div'>
                                            <input class='shop_option' name='options3' type='radio' value='${index}'><label class='radio_label'>${element[0]}</label>
                                            </div>`);
                });

                break;
            case 7:  //錢
                $("#talkBox").text("$恭喜獲得錢幣$");
                $("#options").empty();
                myMoney++;
                $("#numM").text(myMoney);

                mapArray[targetBlock.x][targetBlock.y] = 0;
                ctx.clearRect((targetBlock.y)*gridLength,(targetBlock.x)*gridLength,gridLength,gridLength);
                break;
            case 8:  //番茄
                $("#talkBox").text("恭喜獲得番茄!");
                $("#options").empty();
                myPotato++;
                $("#numF").text(myPotato);

                mapArray[targetBlock.x][targetBlock.y] = 0;
                ctx.clearRect((targetBlock.y)*gridLength,(targetBlock.x)*gridLength,gridLength,gridLength);
                break;
            case 9:  //書
                $("#talkBox").text("提示:這裡有武器喔! 去找吧! 我都放在那裏了!");
                $("#options").empty();
                break;
            case 10:  //劍
                $("#talkBox").text("恭喜獲得劍!");
                $("#options").empty();
                mySword++;
                $("#numS").text(mySword);

                mapArray[targetBlock.x][targetBlock.y] = 0;
                ctx.clearRect((targetBlock.y)*gridLength,(targetBlock.x)*gridLength,gridLength,gridLength);
                break;
            case 11:  //寶箱
                $("#talkBox").text(questions[7].question[0]);

                $("#options").empty();
                questions[7].answers.forEach(function(element,index,array){  //將選項逐個加入
                    $("#options").append(`<div class='shop_div'>
                                            <input class='shop_option' name='options7' type='radio' value='${index}'><label class='radio_label'>${element[0]}</label>
                                            </div>`);
                });

                break;
        }
    }
    else{
        $("#talkBox").text("邊界");
    }

    //option0--enemy左士兵
    $('input:radio[name="options0"]').click(function(){
        var checkValue = $('input:radio[name="options0"]:checked').val(); 

        $("#talkBox").empty();
        $("#options").empty();

        if(checkValue == 0) $("#talkBox").text("士兵:兇甚麼兇啦!");
        else if(checkValue == 1) $("#talkBox").text("士兵:好喔");
        else if(checkValue == 2) {
            $("#talkBox").text(questions[8].question);
            bufferMapArray = mapArray;

            $("#myCanvas").remove();
            $("#mainMap").append(`<div id="player"></div>`);
            youtubePlay();
        }
    }); 

    //option1--enemy中士兵
    $('input:radio[name="options1"]').click(function(){
        var checkValue = $('input:radio[name="options1"]:checked').val(); 
 
        $("#talkBox").empty();
        $("#options").empty();

        if(checkValue == 0) $("#talkBox").text("士兵:有路");
        else if(checkValue == 1) $("#talkBox").text("");
        else if(checkValue == 2){
            if(questions[1].answers[2][1] == 3)
                $("#talkBox").text("士兵:那你還擋在這!!");
            else if(questions[1].answers[2][1] == 4){
                $("#talkBox").text("算你識相!");
                mapArray[3][3] = 0;
                myMoney--;
                $("#numM").text(myMoney);
                ctx.clearRect(3*gridLength,3*gridLength,gridLength,gridLength);
            }
        }
    }); 

    //option2--shop進入
    $('input:radio[name="options2"]').click(function(){
        var checkValue = $('input:radio[name="options2"]:checked').val(); 

        $("#talkBox").empty();
        $("#options").empty();

        if(checkValue == 0){
            $("#talkBox").text("進入商店");

            bufferMapArray = mapArray;
            mapArray = [[2,1,7,8],
                        [0,3,0,0],
                        [0,0,0,0],
                        [9,0,0,1]];
            nowMap = 1;
            ctx.clearRect(0,0,10*gridLength,4*gridLength);
            $("#myCanvas").attr('height', 4*gridLength);
            $("#myCanvas").attr('width', 4*gridLength);
            drawMap();

            currentImgMain.x = 0*gridLength;
            currentImgMain.y = 1*gridLength;
            cutImagePositionX = 0;

            ctx.drawImage(imgMain, cutImagePositionX,0,80,130,currentImgMain.x,currentImgMain.y,gridLength,gridLength);
        }
        else if(checkValue == 1) $("#talkBox").text("商店:掰掰");
    });

    //option3--挖土
    $('input:radio[name="options3"]').click(function(){
        var checkValue = $('input:radio[name="options3"]:checked').val(); 

        $("#talkBox").empty();
        $("#options").empty();

        if(checkValue == 0){
            $("#talkBox").text("恭喜挖到了炸彈!");
            $("#options").empty();
            myBomb++;
            $("#numB").text(myBomb);
        }
        else if(checkValue == 1) $("#talkBox").text("");
    }); 

    //option4--enemy--shop內士兵
    $('input:radio[name="options4"]').click(function(){
        var checkValue = $('input:radio[name="options4"]:checked').val(); 

        $("#talkBox").empty();
        $("#options").empty();

        if(checkValue == 0) $("#talkBox").text("");
        else if(checkValue == 1) $("#talkBox").text("士兵:你可以自己找找看");
        else if(checkValue == 2){
            if(questions[4].answers[2][1] == 3)
                $("#talkBox").text("士兵:今天天氣不錯");
            else if(questions[4].answers[2][1] == 4){
                $("#talkBox").text("士兵:好啊");
                myPotato--;
                $("#numF").text(myPotato);

                mapArray[3][3] = 10;
                ctx.clearRect(0,0,4*gridLength,4*gridLength);
                drawMap();

                ctx.drawImage(imgMain, cutImagePositionX,0,80,130,currentImgMain.x,currentImgMain.y,gridLength,gridLength);
            }
        }
    }); 

    //option5--炸彈炸開水晶前的山
    $('input:radio[name="options5"]').click(function(){
        var checkValue = $('input:radio[name="options5"]:checked').val(); 

        $("#talkBox").empty();
        $("#options").empty();

        if(checkValue == 0){
            $("#talkBox").text("炸開了一條路")
            myBomb--;
            $("#numB").text(myBomb);
            mapArray[targetBlock.x][targetBlock.y] = 0;
            ctx.clearRect((targetBlock.y)*gridLength,(targetBlock.x)*gridLength,gridLength,gridLength);
        }
        else if(checkValue == 1) $("#talkBox").text("");
    }); 

    //option6--enemy--右士兵
    $('input:radio[name="options6"]').click(function(){
        var checkValue = $('input:radio[name="options6"]:checked').val(); 

        $("#talkBox").empty();
        $("#options").empty();

        if(checkValue == 0){
            if(mySword > 0){
                $("#talkBox").text("成功做掉士兵!");
                
                mapArray[targetBlock.x][targetBlock.y] = 0;
                ctx.clearRect((targetBlock.y)*gridLength,(targetBlock.x)*gridLength,gridLength,gridLength);
            }
            else{
                $("#talkBox").text("你沒有武器= =");
            }
        }
        else if(checkValue == 1){
            if(myMoney > 0){
                $("#talkBox").text("提示:上面")  //提示?
                myMoney--;
                $("#numM").text(myMoney);
            
                mapArray[targetBlock.x][targetBlock.y] = 0;
                ctx.clearRect((targetBlock.y)*gridLength,(targetBlock.x)*gridLength,gridLength,gridLength);
            }
            else{
                $("#talkBox").text("你沒有錢賄絡= =");
            }
        }
    }); 

    //option7--end結局--寶箱
    $('input:radio[name="options7"]').click(function(){
        var checkValue = $('input:radio[name="options7"]:checked').val(); 

        $("#talkBox").empty();
        $("#options").empty();

        if(checkValue == 0 && myCrystal > 0){
            myCrystal--;
            $("#numC").text(myCrystal);

            if(questions[7].question[1] == 1){
                $("#talkBox").text("恭喜成功破關!");
            }
            else if(questions[7].question[1] == 2){
                $("#talkBox").text("走錯路...失敗結局");
            }

            $("#myCanvas").remove();
            $("#mainMap").append(`<div id="player"></div>`);
            youtubePlay();
        }
        else if(checkValue == 0 && myCrystal == 0){
            $("#talkBox").text("無水晶...破關失敗!!");
            questions[7].question[1] = 2;

            $("#myCanvas").remove();
            $("#mainMap").append(`<div id="player"></div>`);
            youtubePlay();
        }
    }); 

    $("#numM").text(myMoney);
    $("#numF").text(myPotato);
    $("#numS").text(mySword);
    $("#numB").text(myBomb);
    $("#numC").text(myCrystal);

     //重新繪製主角
    ctx.drawImage(imgMain, cutImagePositionX,0,80,130,currentImgMain.x,currentImgMain.y,gridLength,gridLength);
});

function youtubePlay(){
    let player; //YouTube Player
    let currentPlay = 2; //記錄目前撥到第幾首歌  //0:成功破關 1:失敗破關 2:進入商店

    //YouTube API Ready
    if(questions[7].question[1] == 1)
        currentPlay = 0;
    else if(questions[7].question[1] == 2)
        currentPlay = 1;

    player = new YT.Player("player",{
        height:"390",
        width:"640",
        videoId:playList[currentPlay][0],
        playerVars:{
            autoplay:1, //是否自動撥放
            controls:0, //是否顯示控制項
            showinfo: 0,
            rel: 0,
            start:playList[currentPlay][1],//開始秒數
            end:playList[currentPlay][2],//結束秒數
            iv_load_policy:3
        },
        events:{
            onReady:onPlayerReady,
            onStateChange:onPlayerStateChange
        }
    });

    function onPlayerReady(event){
        player.playVideo();
    }

    //Player State Change
    function onPlayerStateChange(event){
        if(Math.floor(player.getCurrentTime())==playList[currentPlay][2]){
            player.stopVideo();

            if(currentPlay == 2){
                $("#options").empty();
                questions[8].answers.forEach(function(element,index,array){  //將選項逐個加入
                    $("#options").append(`<div class='shop_div'>
                                            <input class='shop_option' name='options8' type='radio' value='${index}'><label class='radio_label'>${element[0]}</label>
                                            </div>`);
                });

                $('input:radio[name="options8"]').click(function(){
                    var checkValue = $('input:radio[name="options8"]:checked').val(); 
            
                    $("#options").empty();
            
                    if(checkValue == 0) $("#talkBox").text("猜錯了");
                    else if(checkValue == 1) {
                        $("#talkBox").text("答對了");
                        bufferMapArray[3][1] = 0;
                    }
                    else if(checkValue == 2) $("#talkBox").text("猜錯了");

                    $("#mainMap").append(`<canvas id="myCanvas" width="1000" height="400"></canvas>`);
                    $("#player").remove();                

                    mapArray = bufferMapArray;
                    nowMap = 0;

                    ctx = $("#myCanvas")[0].getContext("2d");
                    drawMap();

                    currentImgMain.x = 2*gridLength;
                    currentImgMain.y = 3*gridLength;
                    cutImagePositionX = 175;

                    ctx.drawImage(imgMain, cutImagePositionX,0,80,130,currentImgMain.x,currentImgMain.y,gridLength,gridLength);

                    console.log(1);
                }); 
            }
        }
    }
}
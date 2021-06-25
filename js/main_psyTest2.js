$(function(){
    //儲存目前作答到第幾題
    var currentQuiz = null;
    var inputAns=[30];

    //當按鈕按下後，要做的事情
    $("#startButton").on("click",function(){
        $("#midBody").addClass("midBodyStart");

        if(currentQuiz == null){  //未曾作答
            $("#allAns").empty();
            currentQuiz=0;
            
            $("#question").text(questions[0].question);  //顯示題目
            $("#options").empty();  //將選項區清空
            
            $("#options").append(`<hr color='black'>5分為最符合、1分為最不符合<br>`);
            questions[0].answers.forEach(function(element,index,array){  //將選項逐個加入
                $("#options").append(`<div class='radio_div'>
                                        <input class='radio_option' name='options' type='radio' value='${index}'><label class='radio_label'>${element[0]}</label>
                                      </div>`);
                //$("#options").append(`<input class='chooses' id='choose${index}' type='button' value='${element[0]}'>`);
            });

            $('input:radio[name="options"]').unbind('click').click(function(){
                var checkValue = $('input:radio[name="options"]:checked').val(); 
                console.log(checkValue);
                inputAns[currentQuiz] = 5-checkValue;
            });
            
            $("#startButton").attr("value","Next");  //將按鈕上的文字換成Next
        }
        else{  //繼續作答
            $.each($(":radio"),function(i,val){  //巡訪哪一個選項有被選取
                if(val.checked){  //最終結果
                    //inputAns[currentQuiz]=val.checked;

                    if(currentQuiz == 29){ 
                        var scoreForTiger = inputAns[4]+inputAns[9]+inputAns[13]+inputAns[17]+inputAns[23]+inputAns[29];
                        var scoreForPeacock = inputAns[2]+inputAns[5]+inputAns[12]+inputAns[19]+inputAns[21]+inputAns[28];
                        var scoreForKoala = inputAns[1]+inputAns[7]+inputAns[14]+inputAns[16]+inputAns[24]+inputAns[27];
                        var scoreForOwl = inputAns[0]+inputAns[6]+inputAns[10]+inputAns[15]+inputAns[20]+inputAns[25];
                        var scoreForChameleon = inputAns[3]+inputAns[8]+inputAns[11]+inputAns[18]+inputAns[22]+inputAns[26];

                        // let allScores={
                        //     "老虎":scoreForTiger,
                        //     "孔雀":scoreForPeacock,
                        //     "無尾熊":scoreForKoala,
                        //     "貓頭鷹":scoreForOwl,
                        //     "變色龍":scoreForChameleon
                        // };

                        $("#question").text("測驗結果");  //標題
                        $("#options").empty()
                        
                        $("#allAns").append(`<table> <tr width='950' height='200'>
                                                <td width='50' background-color='skyblue'> <div align='center'>動物</div> </td>
                                                <td width='180'> <div align='center'> <a href="tiger.html"><img src='img/tiger.jpg' alt='老虎'> </div> </td>
                                                <td width='180'> <div align='center'> <a href="peacock.html"><img src='img/peacock.jpg' alt='孔雀'> </div> </td>
                                                <td width='180'> <div align='center'> <a href="koala.html"><img src='img/koala.jpg' alt='無尾熊'> </div> </td>
                                                <td width='180'> <div align='center'> <a href="owl.html"><img src='img/owl.jpg' alt='貓頭鷹'> </div> </td>
                                                <td width='180'> <div align='center'> <a href="chameleon.html"><img src='img/chameleon.jpg' alt='變色龍'> </div> </td> </tr>
                                            <tr height='100'>
                                                <td background-color='skyblue'> <div align='center' >特質</div> </td>
                                                <td> <p>老虎型 (支配型Dominance)</p> <p>有自信，夠權威，決斷力高，競爭性強，胸懷大志，喜歡評估。(<a href="tiger.html">詳細說明...</a>)</p> </td>
                                                <td> <p>孔雀型 (表達型Extroversion)</p> <p>很熱心，夠樂觀，口才流暢，好交朋友，風度翩翩，誠懇熱心。(<a href="peacock.html">詳細說明...</a>)</p> </td>
                                                <td> <p>無尾熊型 (耐心型Patience)</p> <p>很穩定，夠敦厚，溫和規律，不好衝突。(<a href="koala.html">詳細說明...</a>)</p> </td>
                                                <td> <p>貓頭鷹型 (精確型Conformity)</p> <p>很傳統，注重細節，條理分明，責任感強，重視紀律。(<a href="owl.html">詳細說明...</a>)</p> </td>
                                                <td> <p>變色龍型 (整合型1/2 Sigma)</p> <p>善於在工作中調整自己的角色去適應環境，具有很好的溝通能力。(<a href="chameleon.html">詳細說明...</a>)</p> </td> </tr>
                                            <tr height='70'>
                                                <td background-color='skyblue'> <div>得分</div> </td>
                                                <td> <div font-size='50px'>${scoreForTiger}</div> </td>
                                                <td> <div font-size='50px'>${scoreForPeacock}</div> </td>
                                                <td> <div font-size='50px'>${scoreForKoala}</div> </td>
                                                <td> <div font-size='50px'>${scoreForOwl}</div> </td>
                                                <td> <div font-size='50px'>${scoreForChameleon}</div> </td> </tr> </table><br><br>`)

                        currentQuiz = null;  //歸0
                        $("#startButton").attr("value", "重新開始");
                    }
                    else{
                        currentQuiz++;  //下一題 資料從0開始 --> -1

                        $("#question").text(questions[currentQuiz].question);
                        $("#options").empty();

                        $("#options").append(`<hr color='black'>5分為最符合、1分為最不符合<br>`);
                        questions[currentQuiz].answers.forEach(function(element, index, array){
                            $("#options").append(`<div class='radio_div'>
                                                    <input class='radio_option' name='options' type='radio' value='${index}'><label class='radio_label'>${element[0]}</label>
                                                  </div>`);
                        })
                        $("#allAns").empty();

                        $('input:radio[name="options"]').unbind('click').click(function(){
                            var checkValue = $('input:radio[name="options"]:checked').val(); 
                            console.log(checkValue);
                            inputAns[currentQuiz] = 5-checkValue;
                        });
                    }
                    return false;
                }
                else if(currentQuiz != 29 && currentQuiz != null){
                    $("#allAns").text("請選擇一個選項 ＼(^ v ^)／");
                    $("#allAns").append(`<br>`)
                    //window.alert("*********");
                }
            });   
        }
    });
});
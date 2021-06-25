$(function(){
    //儲存目前作答到第幾題
    var currentQuiz = null;

    //當按鈕按下後，要做的事情
    $("#startButton").on("click",function(){
        if(currentQuiz == null){  //未曾作答
            currentQuiz=0;
            
            $("#question").text(questions[0].question);  //顯示題目
            $("#options").empty();  //將選項區清空
            
            questions[0].answers.forEach(function(element,index,array){  //將選項逐個加入
                $("#options").append(`<input name='options' type='radio' value='${index}'><label>${element[0]}</label><br><br>`);
            });
            
            $("#startButton").attr("value","Next");  //將按鈕上的文字換成Next

        }
        else{  //繼續作答
            $.each($(":radio"),function(i,val){  //巡訪哪一個選項有被選取
                if(val.checked){  //最終結果
                    if(isNaN(questions[currentQuiz].answers[i][1])){
                        var finalResult = questions[currentQuiz].answers[i][1];  //最終結果
                        $("#question").text(finalAnswers[finalResult][0]);  //標題
                        $("#options").empty()
                        $("#options").append(`${finalAnswers[finalResult][1]}<br><br>`)  //結果內容

                        currentQuiz = null;  //歸0
                        $("#startButton").attr("value", "重新開始");
                    }
                    else{
                        currentQuiz = questions[currentQuiz].answers[i][1]-1;  //下一題 資料從0開始 --> -1

                        $("#question").text(questions[currentQuiz].question);
                        $("#options").empty();
                        questions[currentQuiz].answers.forEach(function(element, index, array){
                            $("#options").append(`<input name='option' type='radio' value='${index}'>
                            <label>${element[0]}</label><br><br>`);
                        })
                    }
                    return false;
                }
            });    
        }
    });
});
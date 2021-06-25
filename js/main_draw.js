let thisH1 = document.getElementsByTagName("h3")[0];
let thisP = document.getElementsByTagName("p")[0];
//let thisDiv = document.getElementsByTagName("div")[0];(""(
let thisDiv = document.getElementById("paintDiv");

function mouseIn(){
    thisH1.innerHTML="你進來了";
}

function mouseOut(){
    thisH1.innerHTML="你出去了";
    thisP.innerHTML="";
}

function mouseMove(e){
    thisP.innerHTML="你在裡面走來走去。位置 : "+e.clientX+","+e.clientY;

    var c = document.getElementById('color').value;
    if ( e.ctrlKey ){  //erase
        e.target.style.background = "white";
    }
    if ( e.shiftKey ){ //draw
        e.target.style.background = c;
    }
}
thisDiv.addEventListener("mouseover", mouseIn);
thisDiv.addEventListener("mouseout", mouseOut);
thisDiv.addEventListener("mousemove", mouseMove);

function createCanvas(){
    var t2 = document.getElementById( "drawBlock" );
    //var side = 100;
    for ( var i = 0; i < 100; ++i ){
        var row = document.createElement( "tr" );
        for ( var j = 0; j < 260; ++j ){
            var cell = document.createElement( "td" );
            row.appendChild( cell );
        }
        t2.appendChild( row );
    }
}
window.addEventListener( "load", createCanvas, false );
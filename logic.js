let textArr = ["A paragraph is a series of related sentences that develop a central idea, called the topic. It is a group of sentences that support one central, unified idea and add one idea at a time to the broader argument.",
"Hello World.",
"Gaming has evolved into a multifaceted cultural phenomenon that transcends mere entertainment. It encompasses a vast array of platforms, from traditional video games to mobile apps, virtual reality, and online communities."];
let TAindex = TAVindex = 0;
let textArrVerify = textArr[TAindex].split(" ");
let typedChars = typedWords = correctWords = wrongWords = accuracy = grossWPM = netWPM = 0;
totalWords = textArrVerify.length, 
totalChars = textArr[TAindex].length;
var timeStart = timeEnd = 0;
let textDom, text, i, firstHalfText, secondHalfText, lastWordCheck = 0;

$("#resultBackground").hide();
$(".results").hide(); 
$("input");
//$("#text").hide();
//$("#inputText").hide();
function paragraphDetails(){
    typedChars = correctWords = wrongWords = grossWPM = netWPM = 0;
    totalWords = textArrVerify.length, totalChars = textArr[TAindex].length, typedWords = 0;
}
// This is testing section --------------------------------------------------------------------------



//----------------------------------------------------------------------------------------------------
function afterTyping(){
    $("#text").hide();
    $("#inputText").hide();
    $(".results").show();
    $("#hoverGrossWpm").hide();
    $("#hoverAcc").hide();
    $("#hoverCorrect").hide();
    $("#hoverWrong").hide();
    $("#netWpmScore").html(netWPM);
    $("#grossWpmScore").html(grossWPM);
    $("#accScore").html(accuracy + "%");
    $("#correctWord").html(correctWords);
    $("#wrongWord").html(wrongWords);
}

function nextText() {
    TAindex++;
    textArrVerify = textArr[TAindex].split(" ");
    $("#text").html(textArr[TAindex]);
    $("#resultBackground").hide();
    $(".results").hide(); 
    $("#text").show();
    $("#inputText").show();
    TAVindex = 0;
    $("#inputText").html("");
    $("input").focus();
    textDom = document.getElementById("text");
    text = textDom.textContent;
    i = 0;
}

function verifyWords(evt, flagLastElement){
    //console.log(evt.target.value);
    typedWords++;
    //console.log(typedWords);
    let curWord = evt.target.value;
    if(flagLastElement == 0) {
        curWord = curWord.substring(0, curWord.length-1);
    }
    //console.log(flagLastElement);
    //console.log(curWord + textArrVerify[typedWords-1]);
    if(curWord === textArrVerify[TAVindex]) {
        correctWords++;
    }
    else {
        //console.log("Wrong");
        wrongWords++;
    }
    TAVindex++;
    evt.target.value = "";
    evt.target.placeholder = "";
}


$("#beforeHover1").hover(function() {
    $("#hoverGrossWpm").fadeIn(400);},
    function() {
        $("#hoverGrossWpm").fadeOut(400);
    }
);
$("#beforeHover2").hover(function() {
    $("#hoverAcc").fadeIn(400);},
    function() {
        $("#hoverAcc").fadeOut(400);
    }
);
$("#beforeHover3").hover(function() {
    $("#hoverCorrect").fadeIn(400);},
    function() {
        $("#hoverCorrect").fadeOut(400);
    }
);
$("#beforeHover4").hover(function() {
    $("#hoverWrong").fadeIn(400);},
    function() {
        $("#hoverWrong").fadeOut(400);
    }
);


$(document).ready(function(){
    $("#nextInputText").click(function(){
        nextText();
        paragraphDetails();
    });
    $("#text").html(textArr[TAindex]);
    var keys = new Howl({
        src: ['sounds/keyboard1.mp3'],
    })
    var spacebar = new Howl({
        src: ['sounds/backspace.mp3'],
        volume: 5,
    });
    
    i = 0;
    textDom = document.getElementById("text");
    text = textDom.textContent;

    $("#inputText").keyup(function(evt){
        if(TAVindex == 0) {
            timeStart = performance.now();
        }


        const tracKeyCodes = new Set([9,13,12,16,17,18,20,27,34,33,35,36,37,38,39,40,45,46,116,144]);
        if(i == 0 && evt.keyCode == 8)i = i;
        else if(evt.keyCode == 8 && i > lastWordCheck)i--;
        else if(evt.keyCode != 8){
            let flag = true;
            if(tracKeyCodes.has(evt.keyCode))flag = false;  
            if(flag === true)i++;
        } 


        let len = evt.target.value.length-1;
        firstHalfText = text.substr(0, i);
        secondHalfText = text.substr(i, text.length-1);
        console.log(len + "  " + i);
        console.log(evt.target.value + "  " + textArr[TAindex][i-1]);
        //console.log(i);
        /*if(evt.target.value[len] !== textArr[TAindex][i-1] && evt.target.value !== "") {
            let temp = firstHalfText.substr(i-1, 1);
            firstHalfText = firstHalfText.substr(0, i-1);
            textDom.innerHTML = '<u style = "color:#fff371">'+firstHalfText +'</u>' +  '<u style = "color: red">'+ temp +'</u>' + secondHalfText;
        }
        else {*/
            textDom.innerHTML = '<u style = "color:#fff371">'+firstHalfText +'</u>' + secondHalfText;
        // }


        if((typedWords == totalWords-1 && evt.target.value.slice(-1) == '.') || typedWords == totalWords-1 && evt.target.value.slice(-1) == ' ') {
            timeEnd = performance.now();
            verifyWords(evt, 1);
            timeTaken = ((timeEnd-timeStart)/1000)/60;
            //console.log(timeTaken);
            netWPM = Math.ceil((typedWords-wrongWords)/timeTaken);
            grossWPM = Math.ceil((typedWords)/timeTaken);
            accuracy = Math.ceil((netWPM/grossWPM)*100);
            afterTyping();
        }
        else if(evt.keyCode == 32) {
            verifyWords(evt, 0);
            let len1 = textArrVerify[TAVindex-1].length - len;
            lastWordCheck = i += len1;
            firstHalfText = text.substr(0, i);
            secondHalfText = text.substr(i, text.length-1);
            textDom.innerHTML = '<u style = "color:#fff371">'+firstHalfText +'</u>' + secondHalfText;
            spacebar.play();
        }
        else if(evt.keyCode > 45 && evt.keyCode < 91 || evt.keyCode > 95 && evt.keyCode < 112 || evt.keyCode > 185 && evt.keyCode < 192 || evt.keyCode > 218 && evt.keyCode < 223 || evt.keyCode == 8 || evt.keyCode == 46) {
            keys.play();
        }
    });
});
let mode = 1;
function changeMode(){
    if(mode == 1) {
        $("#lightMode").attr('id', 'darkMode');
        mode = 0;
        $('body').css("background-color", "#001724");
        $('#inputText').css("background-color", "#001724");

    }
    else if(mode == 0) {
        $("#darkMode").attr('id', 'lightMode');
        $('body').css("background-color", "#659DBD");
        $('#inputText').css("background-color", "#659DBD");
        mode = 1;
    }
}

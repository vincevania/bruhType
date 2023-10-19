let textArr = ["A paragraph is a series of related sentences that develop a central idea, called the topic. It is a group of sentences that support one central, unified idea and add one idea at a time to the broader argument.","Hello World."];
let TAindex = TAVindex = 0;
let textArrVerify = textArr[TAindex].split(" ");
let typedChars = typedWords = correctWords = wrongWords = accuracy = grossWPM = netWPM = 0;
totalWords = textArrVerify.length, 
totalChars = textArr[TAindex].length;
var timeStart = timeEnd = 0;

$("#resultBackground").hide();
$(".results").hide(); 
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
    $("#resultBackground").show();
    $(".results").show();
    $("#netWpmScore").html(netWPM);
    $("#grossWpmScore").html(grossWPM);
    $("#accScore").html(accuracy);
    $("#correctWord").html(correctWords);
    $("#wrongWord").html(wrongWords);
};

function nextText() {
    TAindex++;
    // console.log(TAindex);
    // console.log(textArr[TAindex]);
    textArrVerify = textArr[TAindex].split(" ");
    $("#text").show();
    $("#inputText").show();
    $("#text").html(textArr[TAindex]);
    TAVindex = 0;
    $("#inputText").html("");
    $("input").focus();
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
        //console.log("Right");
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
$(document).ready(function(){
    
    $("body").css({"background-color": "#659DBD", "color": "#ffffff"});
    $("#nextInputText").click(function(){
        nextText();
        paragraphDetails();
    });
    $("#text").html(textArr[TAindex]);
    $("#inputText").keyup(function(evt){
        if(TAVindex == 0) {
            timeStart = performance.now();
        }
        if((typedWords == totalWords-1 && evt.target.value.slice(-1) == '.') || typedWords == totalWords-1 && evt.target.value.slice(-1) == ' ') {
            timeEnd = performance.now();
            verifyWords(evt, 1);
            timeTaken = ((timeEnd-timeStart)/1000)/60;
            console.log(timeTaken);
            netWPM = Math.ceil((typedWords-wrongWords)/timeTaken);
            grossWPM = Math.ceil((typedWords)/timeTaken);
            accuracy = Math.ceil((netWPM/grossWPM)*100);
            afterTyping();
        }
        else if(evt.keyCode == 32) {
            verifyWords(evt, 0);
        }
    });
})

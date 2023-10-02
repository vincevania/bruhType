let textArr = ["A paragraph is a series of related sentences that develop a central idea, called the topic. It is a group of sentences that support one central, unified idea and add one idea at a time to the broader argument.","Hello World."];
let TAindex = TAVindex = 0;
let textArrVerify = textArr[TAindex].split(" ");
let typedChars = correctWords = wrongWords = grossWPM = netWPM = 0;
totalWords = textArrVerify.length, totalChars = textArr[TAindex].length, typedWords = 0;
var timeStart = timeEnd = 0;

$("#typingInfo").hide(); 

function paragraphDetails(){
    typedChars = correctWords = wrongWords = grossWPM = netWPM = 0;
    totalWords = textArrVerify.length, totalChars = textArr[TAindex].length, typedWords = 0;
}
function afterTyping(){
    $("#text").hide();
    $("#inputText").hide();
    $("#typingInfo").show();
    $("#typingInfo").html("WPM: " + grossWPM);
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
        if((typedWords == totalWords-1 && evt.target.value.slice(-1) == '.') || typedWords == totalWords) {
            timeEnd = performance.now();
            // console.log((timeEnd-timeStart)/1000);
            timeTaken = (timeEnd-timeStart)/1000;
            grossWPM = Math.ceil((typedWords+1)/timeTaken);
            afterTyping();

        }
        else if(evt.keyCode == 32) {
            typedWords++;
            console.log(typedWords);
            const curWord = evt.target.value.substring(0, evt.target.value.length-1);
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
        }
    });
})

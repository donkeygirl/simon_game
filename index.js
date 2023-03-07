var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

$(document).one("keydown", function () {
    $("#level-title").text("level " + level);
    nextSequence();
});


function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    playSound(randomChosenColour);
}

//$(".btn").click(function(event){
//var userChosenColour = event.target.id;
$(".btn").click(function () {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    if (checkAnswer(userClickedPattern.length - 1)) {
        playSound(userChosenColour);
        animatePress(userChosenColour);
        if (level == 0 || gamePattern.length == userClickedPattern.length) {
            userClickedPattern.length = 0;
            setTimeout(nextSequence, 1000);
            $("#level-title").text("level " + (++level));
        }
    } else {
        console.log("wrong button");
        $("#level-title").text("Game Over, Press Any Key to Restart");
        var myaudio = new Audio("sounds/wrong.mp3").play();
        $("body").addClass("game-over");
        setTimeout(removeAnimateOver, 200);

        function removeAnimateOver() {
            $("body").removeClass("game-over");
        }
        level = 0;
        gamePattern.length = 0;
        userClickedPattern.length = 0;
        $(document).one("keydown", function () {
            $("#level-title").text("level " + level);
            nextSequence();
        });
    }
});


function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
        return true;
    } else {
        return false;
    }
}

function playSound(name) {
    $("#" + name).fadeOut(100).fadeIn(100);
    var myaudio = new Audio("sounds/" + name + ".mp3");
    myaudio.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(removeAnimate, 100);

    function removeAnimate() {
        $("#" + currentColour).removeClass("pressed");
    }
}

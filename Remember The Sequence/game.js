//Our 4 buttons which will create a pattern
var buttonColours = ["red", "blue", "green", "yellow"];

//Array to store the sequence of colors randomly chosen by the Game
var gamePattern = [];

//Array to store the colors clicked on by the user (player)
var userClickedPattern = [];

//initialise started and level variables
var started = false;
var level = 0;

//After key is pressed, start the game
$(document).keydown(function () {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

//When you click a button, perform the following tasks
$(".btn").click(function () {

    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    }
    else {
        playSound("wrong");
        //when it is wrong, we restart the game to level 1 and add game over class
        $("body").addClass("game-over");
        $("#level-title").text("Game Over! Press Any Key to Restart");

        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        startOver();
    }
}


function nextSequence() {

    //Array to keep track of color sequence chosen by the user (player) 
    userClickedPattern = [];

    level++;

    $("#level-title").text("Level " + level);
    //Pick a random number from list {0,1,2,3} to determine game sequence
    var randomNumber = Math.floor(Math.random() * 4);
    //Give its corresponding color and add that to the game sequence array
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    //jQuery for Flash Animation and Sound effects  
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}
//Play corresponding sound of clicked button from sounds/ file 
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

//if wrong button is pressed, reset level to 0 and sequence to 0
function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}

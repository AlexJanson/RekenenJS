const head = document.getElementById("head");
const sum = document.getElementById("sum");
const body = document.getElementById("body");
const answer = document.getElementById("answer");
const footer = document.getElementById("footer");

var output, correct, right = 0, wrong = 0, time = 0;
var running = false;

var sound = new Audio();

function randomSum() {
    var a = Math.floor(Math.random() * 9 + 1);
    var b = Math.floor(Math.random() * 9 + 1);
    output = a + " * " + b;
    correct = a * b;
    sum.innerHTML = "<h3>" + output + "</h3>";
    answer.focus();
}

function waiting() {
    time = 0;
    answer.value = "";
    footer.style.background = "none";
    footer.innerHTML = "<p>Goed: " + right + "</p><p>Fout: " + wrong + "</p>";
    running = false;
    randomSum();
}

randomSum();
answer.addEventListener("keyup", function(e) {
    e.preventDefault();
    if(e.keyCode === 13 && !running) {
        if(correct.toString() === answer.value) {
            footer.style.background = "green";
            footer.innerHTML = "<p>CORRECT</p><p>Het duurde jou: " + time + " seconde(n)</p>";
            right++;
            sound.src = "sounds/correct.wav";
            sound.play();
        } else {
            footer.style.background = "red";
            footer.innerHTML = "<p>INCORRECT</p><p>Het duurde jou: " + time + " seconde(n)</p>";
            wrong++;
            sound.src = "sounds/wrong.wav";
            sound.play();
        }
        running = true;
        window.setTimeout(waiting, 2000);
    }
});

window.setInterval(function() {
        time++;
        if(time >= 10) {
            footer.style.background = "red";
            footer.innerHTML = "<p>INCORRECT</p><p>Het duurde jou: " + time + " seconde(n)</p>";
            wrong++;
            sound.src = "sounds/wrong.wav";
            sound.play();
            time = 0;
            window.setTimeout(waiting, 2000);
        }
    }, 1000);

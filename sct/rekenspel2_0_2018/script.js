const myAssignment = document.getElementById('myAssignment');
const myInput = document.getElementById('myInput');
const feedback = document.getElementById('feedback');

let assignments = [];
let counter = 0;
let goed = 0;
let started = false;

function start() {
  init();
  started = true;
  let startBtn = document.getElementById("startBtn");
  startBtn.parentNode.removeChild(startBtn);
}

function restart() {
  myInput.disabled = false;
  assignments = [];
  goed = 0;
  counter = 0;
  feedback.innerHTML = "";
  document.getElementById("restartBtn").style.display = "none";
  init();
}

function init() {
  myInput.style.display = "inline";
  for(let i = 0; i < 10; i++) {
    assignments.push(makeSum());
  }
  myAssignment.innerHTML = assignments[counter].numA + " * " + assignments[counter].numB;
}

function inputHandler(evt) {
  if (evt.keyCode == 13) {
    assignments[counter].sow = myInput.value;
    myInput.value = "";
    counter++;
    update();
  }
}

function makeSum() {
  let mySum = {};
  mySum.numA = getNumber();
  mySum.numB = getNumber();
  mySum.ans = (mySum.numA * mySum.numB).toString();
  return mySum;
}

function update() {
  if(counter >= 10) {
    myInput.disabled = true;
    feedback.innerHTML= "<table id='myTable'><thead><tr><th>Som</th><th>Antwoord</th><th>Jouw antwoord</th></tr></thead><tbody id='tableBody'>";
    for (let i = 0; i < assignments.length; i++) {
      const myTable = document.getElementById("tableBody");
      if(eval(assignments[i].sow) !== assignments[i].numA * assignments[i].numB) {
        styles = "wrong";
      } else {
        styles = "right";
        goed++;
      }
      myTable.innerHTML += "<tr class=" + styles + "><td>" + assignments[i].numA + " * " + assignments[i].numB + "</td><td>" + assignments[i].ans + "</td><td>" + assignments[i].sow + "</td></tr>";
    }
    feedback.innerHTML+= "</tbody></table>";
    myAssignment.innerHTML = "<p>Goed: " + goed + " / 10 </p>";
    myInput.style.display = "none";
    document.getElementById("restartBtn").style.display = "inline-block";
  } else {
    myAssignment.innerHTML = assignments[counter].numA + " * " + assignments[counter].numB;
  }
}

function getNumber() {
  let number = Math.floor(Math.random() * 9) + 1;
  return number;
}

myInput.addEventListener('keydown',inputHandler,false);

if(started)
  init();
// select Elements

let countSpan = document.querySelector(".count span");
let spansBullets = document.querySelector(".bullets .spans");
let quizArea = document.querySelector(".quiz-area");
let answersArea = document.querySelector(".answers");
let submitButton = document.querySelector(".submit");
let results = document.querySelector(".results");
let countDownSpan = document.querySelector(".count-down");

// set Options for the quiz

let currentIndex = 0; // Current question index
let rightAnswers = 0; // Counter for correct answers
let countDown;

// let Data = fetch("questions.json")
//   .then((response) => {
//     console.log(response);
//     return response.json();
//   })
//   .then((data) => {
//     console.log(data);
//     return data;
//   })
//   .catch((error) => {
//     console.error("Error fetching data:", error);
//   });

//   console.log(( Data));

// load data from json file using async/await
async function loadData() {
  try {
    const response = await fetch("questions.json");
    // console.log(response); // HTTP response object

    const data = await response.json();
    // console.log("Data:", data); // here it's available
    let length = data.length; // Get the length of the data array
    CreatBullets(length); // Call the function to create bullets with the length of the data array
    countDownn(6,length)
    addQuestions(data[currentIndex], length); // Call the function to add questions
    submitButton.onclick = () => {
      if (currentIndex < length - 1) {
        //get the right answer
        let theRighrAnswer = data[currentIndex].right_answer;
        // console.log("Right Answer:", theRighrAnswer); // Log the right answer to the console
        //INCRESE THE CURRENT INDEX
        currentIndex++;
        checkAnswer(theRighrAnswer, length);
        quizArea.innerHTML = ""; // Clear the quiz area
        answersArea.innerHTML = ""; // Clear the answers area
        addQuestions(data[currentIndex], length); // Call the function to add questions
        // handle bullets class
        blueBullets();

        clearInterval(countDown); // Clear the countdown interval
        countDownn(5,length); // Reset the countdown for the next question
        showResults(length);
      }
    };
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

loadData();

function CreatBullets(num) {
  countSpan.innerHTML = num; // Update the count in the HTML
  // Create bullets based on the number of questions
  for (let i = 0; i < num; i++) {
    const theBullet = document.createElement("span");
    if (i === 0) {
      theBullet.className = "on"; // Set the first bullet as active
    }
    spansBullets.appendChild(theBullet);
  }
}

// Call the function to load data when the script runs
function addQuestions(data, length) {
  if (currentIndex < length) {
    let questionTitle = `
<h2>${data.title}</h2>
`;
    quizArea.innerHTML = questionTitle; // Set the question title in the quiz area

    let answers = ``;

    for (let index = 1; index <= 4; index++) {
      let answerText = data[`answer_${index}`];
      let isChecked = index === 1 ? "checked" : "";

      answers += `
    <div class="answer">
        <input type="radio" name="question" id="answer-${index}" value="${answerText}" ${isChecked} >
            <label for="answer-${index}">${answerText}</label>
    </div>
    `;
      // Log the inputs to the console
    }
    answersArea.innerHTML = answers; // Set the answers in the answers area
  }
}

function checkAnswer(theRighrAnswer, length) {
  // console.log("Current Index:", theRighrAnswer); // Log the current index to the console
  // console.log("Length:", length); // Log the length of the data array to the console
  let answers = document.getElementsByName("question"); // Get all radio inputs with the name "question"
  // console.log("Answers:", answers); // Log the answers to the console
  let theChoosenAnswer;
  for (let i = 0; i < answers.length; i++) {
    if (answers[i].checked) {
      theChoosenAnswer = answers[i].value; // Get the value of the checked radio input
      // console.log("Choosen Answer:", theChoosenAnswer); // Log the chosen answer to the console
    }
  }

  if (theChoosenAnswer === theRighrAnswer) {
    rightAnswers++; // Increment the counter for correct answers
  }
  console.log("Right Answers:", theRighrAnswer); // Log the number of right answers to the console
  console.log("Current Index:", currentIndex); // Log the current index to the console
  console.log("Choosen Answer:", theChoosenAnswer); // Log the chosen answer to the console
}

function blueBullets() {
  //
  // Remove the "on" class from all bullets
  let bullets = document.querySelectorAll(".bullets .spans span");

  // Add the "on" class to the current bullet
  bullets[currentIndex].classList.add("on");
}

function showResults(length) {
  let theResults;
  if (currentIndex === length - 1) {
    quizArea.remove(); // Remove the quiz area
    answersArea.remove(); // Remove the answers area
    submitButton.remove(); // Remove the submit button
    spansBullets.remove(); // Remove the bullets
    countDownSpan.remove(); // Remove the countdown display

    if (rightAnswers > length / 2 && rightAnswers < length) {
      theResults = `<span class="good">Good</span>, ${rightAnswers} From ${length}`;
    } else if (rightAnswers === length) {
      theResults = `<span class="perfect"> Perfect</span>, ${rightAnswers} From ${length}`;
    } else {
      theResults = `<span class="bad">Bad</span>, ${rightAnswers} From ${length}`;
    }
    results.innerHTML = theResults; // Set the results in the results area
  }
}
// <span class="minuts"> 02 </span> : <span class="sec">45</span>

function countDownn(duration, length) {
  if (currentIndex < length - 1) {
    let min, sec;
    countDown = setInterval(() => {
      min = parseInt(duration / 60);
      sec = parseInt(duration % 60);
        sec =  sec < 10 ?`0${sec}`:sec; // Add leading zero to seconds if less than 10
        min = min <10?`0${min}`:sec; // Add leading zero to minutes if less than 10
      
      countDownSpan.innerHTML = `${min}:${sec}`; // Update the countdown display

      if (--duration < 0) {
        clearInterval(countDown); // Stop the countdown when it reaches zero
        console.log("Time's up!"); // Log a message when time is up
        // Show results when time is up
        submitButton.click(); // Simulate a click on the submit button to show results
      }
    }, 1000); // Update every second
  }
}

const questions = [
    {
    question:"How many days make a week?",
    answers: [
        {text:"Seven", correct:true},
        {text:"Six", correct:false},
        {text:"five", correct:false},
        {text:"four", correct:false},
    ]
},
{
    question:"How many weeks make a year?",
    answers: [
        {text:"52", correct:true},
        {text:"42", correct:false},
        {text:"32", correct:false},
        {text:"60", correct:false},
    ]
},
{
    question:"How many months make a year?",
    answers: [
        {text:"13", correct:false},
        {text:"12", correct: true},
        {text:"11", correct:false},
        {text:"10", correct:false},
    ]
},
{
    question:"How many days make a leap year?",
    answers: [
        {text:"365", correct:false},
        {text:"366", correct:true},
        {text:"360", correct:false},
        {text:"300", correct:false},
    ]
},
{
    question:"How many days make a year?",
    answers: [
        {text:"365", correct:true},
        {text:"366", correct:false},
        {text:"360", correct:false},
        {text:"300", correct:false},
    ]
},
{
    question:"How many days are in January?",
    answers: [
        {text:"30", correct:false},
        {text:"31", correct:true},
        {text:"29", correct:false},
        {text:"28", correct:false},
    ]
},
{
    question:"How many days are in February?",
    answers: [
        {text:"30", correct:false},
        {text:"31", correct:false},
        {text:"29", correct:false},
        {text:"28", correct:true},
    ]
},
{
    question:"How many days are in March?",
    answers: [
        {text:"30", correct:false},
        {text:"31", correct:true},
        {text:"29", correct:false},
        {text:"28", correct:false},
    ]
},
{
    question:"How many days are in April?",
    answers: [
        {text:"30", correct:true},
        {text:"31", correct:false},
        {text:"29", correct:false},
        {text:"28", correct:false},
    ]
},
{
    question:"How many days are in May?",
    answers: [
        {text:"30", correct:false},
        {text:"31", correct:true},
        {text:"29", correct:false},
        {text:"28", correct:false},
    ]
},
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

const timerElement = document.getElementById("timer");
let timer;
let countdown = 60; 

function startTimer() {
    timer = setInterval(function () {
        countdown--;
        timerElement.innerHTML = `Time left: ${countdown} seconds`;

        if (countdown <= 0) {
            clearInterval(timer);
            showScore();
        }
    }, 1000);
}

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
    startTimer();
}

function showQuestion () {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach (answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button)
        if(answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);

    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}
function showScore() {
    clearInterval(timer); 
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    clearInterval(timer);
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion ();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if(currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();



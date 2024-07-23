const questions = [
    {
        question: `What does HTML stand for?`,
        answers: [
            { text: `Hyper Text Markup Language`, correct: true },
            { text: `High Tech Markup Language`, correct: false },
            { text: `Hyperlinks and Text Markup Language`, correct: false },
            { text: `Hyperlinks Missing Language`, correct: false },
        ]
    },
   {
        question: `Which CSS property changes text color?`,
        answers: [
            { text: `text-color`, correct: false },
            { text: `font-color`, correct: false },
            { text: `color`, correct: true },
            { text: `fgcolor`, correct: false },
        ]
    },
    {

        question: `How to alert "Hello World" in JavaScript?`,
        answers: [
            {text:`msgBox("Hello World)`, correct:false},
            {text:`alert("Hello World")`, correct:true},
            {text:`msg("Hello World)`, correct:false},
            {text:`alertBox("Hello World)`, correct:false},
        ]
    },
    {
        question: `How to create a new React project?`,
        answers: [
            {text:`npm create-react-app myReactApp`, correct:false},
            {text:`npm create-react-app`, correct:false},
            {text:`npx create-react-app myReactApp`, correct:true},
            {text:`npx create-react-app`, correct:false},
        ]
    },
    {
        question: `Which HTTP method is valid?`,
        answers: [
            {text:`get`, correct:false},
            {text:`put`, correct:false},
            {text:`post`, correc0t:false},
            {text:`All of the above`, correct:true},
        ]
    },
]

const questionElement = document.querySelector("#question");
const answerButtonsElement = document.querySelector("#answer-buttons");
const nextButton = document.querySelector("#next-btn");
const trophyElement = document.querySelector("#trophy");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    trophyElement.style.display = "none";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;

    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtonsElement.appendChild(button);

        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }

        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(event) {
    const selectedButton = event.target;
    const isCorrect = selectedButton.dataset.correct === "true";

    if (isCorrect) {
        selectedButton.classList.add("correct");
        score++;
    } else {
        selectedButton.classList.add("incorrect");
    }

    Array.from(answerButtonsElement.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });

    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `Your score is ${score} out of ${questions.length}`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
    if (score === questions.length) {
        trophyElement.style.display = "block";
    }
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();

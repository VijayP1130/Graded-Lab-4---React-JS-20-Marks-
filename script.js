const quizData = [
    {
        question: "What does 'DOM' stand for in JavaScript?",
        options: ["Document Object Model", "Data Object Management", "Dynamic Object Method", "Document Oriented Model"],
        correct: 0
    },
    {
        question: "Which method is used to add an element to the end of an array?",
        options: ["append()", "push()", "add()", "insert()"],
        correct: 1
    },
    {
        question: "What is the correct way to declare a variable in JavaScript?",
        options: ["variable x = 5;", "var x = 5;", "declare x = 5;", "x := 5;"],
        correct: 1
    },
    {
        question: "Which of the following is NOT a JavaScript data type?",
        options: ["String", "Boolean", "Float", "Number"],
        correct: 2
    },
    {
        question: "What does the '===' operator do in JavaScript?",
        options: ["Assigns a value", "Compares values only", "Compares values and types", "Declares a variable"],
        correct: 2
    }
];

let currentQuestion = 0;
let score = 0;
let selectedOption = null;
let answered = false;

const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const questionProgress = document.getElementById('question-progress');
const nextBtn = document.getElementById('next-btn');
const quizContent = document.getElementById('quiz-content');
const resultContainer = document.getElementById('result-container');
const finalScore = document.getElementById('final-score');
const finalPercentage = document.getElementById('final-percentage');
const feedback = document.getElementById('feedback');

function initQuiz() {
    currentQuestion = 0;
    score = 0;
    selectedOption = null;
    answered = false;
    showQuestion();
}

function showQuestion() {
    const question = quizData[currentQuestion];
    questionText.textContent = question.question;
    questionProgress.textContent = `Question ${currentQuestion + 1} of ${quizData.length}`;
    optionsContainer.innerHTML = '';

    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'option-btn';
        button.textContent = option;
        button.onclick = () => selectOption(index);
        optionsContainer.appendChild(button);
    });

    nextBtn.disabled = true;
    nextBtn.textContent = currentQuestion === quizData.length - 1 ? 'Show Results' : 'Next Question';
    feedback.style.display = 'none';
    selectedOption = null;
    answered = false;
}

function selectOption(optionIndex) {
    if (answered) return;

    selectedOption = optionIndex;
    const buttons = optionsContainer.querySelectorAll('.option-btn');
    const correctAnswer = quizData[currentQuestion].correct;

    buttons.forEach(btn => btn.classList.remove('selected', 'correct', 'incorrect'));
    buttons[optionIndex].classList.add('selected');

    setTimeout(() => {
        answered = true;
        buttons[correctAnswer].classList.add('correct');

        if (optionIndex !== correctAnswer) {
            buttons[optionIndex].classList.add('incorrect');
            feedback.textContent = `Incorrect! The correct answer is: ${quizData[currentQuestion].options[correctAnswer]}`;
            feedback.className = 'feedback incorrect';
        } else {
            score++;
            feedback.textContent = 'Correct! Well done!';
            feedback.className = 'feedback correct';
        }

        feedback.style.display = 'block';
        nextBtn.disabled = false;
    }, 500);
}

function nextQuestion() {
    if (currentQuestion < quizData.length - 1) {
        currentQuestion++;
        showQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    const percentage = Math.round((score / quizData.length) * 100);
    quizContent.style.display = 'none';
    resultContainer.style.display = 'block';
    finalScore.textContent = `Your Score: ${score}/${quizData.length}`;
    finalPercentage.textContent = `Percentage: ${percentage}%`;

    const messageDiv = document.createElement('div');
    messageDiv.style.fontSize = '1.2em';
    messageDiv.style.marginTop = '20px';
    messageDiv.style.color = '#666';

    if (percentage >= 80) {
        messageDiv.textContent = 'Excellent work! 🎉';
    } else if (percentage >= 60) {
        messageDiv.textContent = 'Good job! 👍';
    } else {
        messageDiv.textContent = 'Keep practicing! 📚';
    }

    finalPercentage.appendChild(messageDiv);
}

function restartQuiz() {
    quizContent.style.display = 'block';
    resultContainer.style.display = 'none';
    initQuiz();
}

initQuiz();

const questions = [
    {
        question: 'Javascript is an _______ language?',
        answers:  [
            { text: 'Object-Oriented', correct: true},
            { text: 'Object-Based', correct: false},
            { text: 'Procedural', correct: false},
            { text: 'None of the above', correct: false},  
        ] 
    },
    {
        question: 'Which of the following keywords is used to define a variable in Javascript?',
        answers:  [
            { text: 'var', correct: false},
            { text: 'let', correct: false},
            { text: 'Both A & B', correct: true},
            { text: 'None of the above', correct: false},  
        ] 
    },
    {
        question: 'Which of the following methods is used to access HTML elements using Javascript?',
        answers:  [
            { text: 'getElementById', correct: false},
            { text: 'getElementByClassName', correct: false},
            { text: 'Both A & B', correct: true},
            { text: 'None of the above', correct: false},  
        ] 
    },
    {
        question: 'Upon encountering empty statements, what does the Javascript Interpreter do?',
        answers:  [
            { text: 'Throws an error ', correct: false},
            { text: 'Ignore the statement', correct: true},
            { text: 'Give warning!', correct: false},
            { text: 'None of the above', correct: false},  
        ] 
    },
    {
        question: 'Which of the following methods can be used to display data in some form using Javascript?',
        answers:  [
            { text: 'document.write() ', correct: false},
            { text: 'console.log()', correct: false},
            { text: 'Window.alert()', correct: false},
            { text: 'All of the above', correct: true},  
        ] 
    },
    {
        question: 'How can a datatype be declared to be a constant type?',
        answers:  [
            { text: 'const', correct: true},
            { text: 'var', correct: false},
            { text: 'let', correct: false},
            { text: 'const', correct: false},  
        ] 
    },

]

// Select Elements
const questionElement = document.querySelector('#question');
const answersButtons = document.querySelector('.answer-buttons');
const answerBtn = document.querySelector('.btn');
const nextButton = document.querySelector('#next-btn');


let currentQuestionIndex = 0;
let score = 0;

// Start Quiz on UI 
const startQuiz = () => {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = 'Next';
    showQuestion();
}

const showQuestion = () => {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + '. ' + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerHTML = answer.text;
        button.classList.add('btn');
        answersButtons.appendChild(button)
        if(answer.correct){
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
    });
}


const resetState = () => {
    nextButton.style.display = 'none';
    while(answersButtons.firstChild){
        answersButtons.removeChild(answersButtons.firstChild);
    }
}

//Select Answer 
const selectAnswer = (e) => {
    const selectButton = e.target;
    const isCorrect = selectButton.dataset.correct === 'true';
    if(isCorrect){
        selectButton.classList.add('correct');
        score++
    } else{
        selectButton.classList.add('incorrect');
    }
    Array.from(answersButtons.children).forEach(button => {
        if(button.dataset.correct === 'true'){
            button.classList.add("correct");
        }
        button.disabled = true;
    })
    nextButton.style.display = 'block';
}

const showScore = () => {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`
}

const handleNextButton = () => {
    currentQuestionIndex++;
    if(currentQuestionIndex <questions.length){
        showQuestion();
    } else{
        showScore();
    }
}
nextButton.addEventListener('click', () => {
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})
startQuiz();



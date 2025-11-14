console.log("🎮 Math Battle Arena се зарежда...");

let playerScore = 0
let timeRemaining = 60
let currentLevel = 1
let questionsAnswered = 0
let correctAnswers = 0
let gameActive = false
let gamePaused = false
let currentQuestion = ""
let correctAnswer = 0

console.log("✅ Променливите са създадени!");

const GAME_DURATION = 60
const POINTS_PER_CORRECT = 10
const QUESTIONS_FOR_LEVEL_UP = 5
const MAX_LEVEL = 10

console.log("⚙️ Константите са заредени!");

const questionDisplay = document.getElementById('question-display');
const scoreDisplay = document.getElementById('score-display');
const timerDisplay = document.getElementById('timer-display');
const levelDisplay = document.getElementById('level-display');
const feedbackDisplay = document.getElementById('feedback-display');
const startButton = document.getElementById('start-game');
const pauseButton = document.getElementById('pause-game');
const newGameButton = document.getElementById('new-game');
const submitButton = document.getElementById('submit-answer');
const answerInput = document.getElementById('answer-input');

console.log("🔗 DOM елементите са свързани!");

let gameTimer = null;

// ============================================
// СЕДМИЦА 9: TODO - ТАЙМЕР ФУНКЦИИ (РЕДЖЕБ)
// ============================================

function updateTimer() {
    if (!gamePaused) {
        timeRemaining--;
        timerDisplay.textContent = timeRemaining + "s";
        if (timeRemaining <= 0) endGame();
    }
}

function startGameTimer() {
    if (!gameTimer) {
        gameTimer = setInterval(updateTimer, 1000);
    }
}

function stopGameTimer() {
    if (gameTimer) {
        clearInterval(gameTimer);
        gameTimer = null;
    }
}

// ============================================
// СЕДМИЦА 7: TODO - ПОМОЩНИ ФУНКЦИИ (РЕДЖЕБ)
// ============================================

function generateMathQuestion() {
    console.log("🧮 Генерирам нов въпрос...");

    const operations = ['addition', 'subtraction', 'multiplication'];
    const randomIndex = Math.floor(Math.random() * 3);
    const operation = operations[randomIndex];

    let num1, num2, answer, questionText;

    switch (operation) {
        case 'addition':
            num1 = Math.floor(Math.random() * 50) + 1;
            num2 = Math.floor(Math.random() * 50) + 1;
            answer = num1 + num2;
            questionText = num1 + " + " + num2;
            break;

        case 'subtraction':
            num1 = Math.floor(Math.random() * 50) + 25;
            num2 = Math.floor(Math.random() * 25) + 1;
            answer = num1 - num2;
            questionText = num1 + " - " + num2;
            break;

        case 'multiplication':
            num1 = Math.floor(Math.random() * 12) + 1;
            num2 = Math.floor(Math.random() * 12) + 1;
            answer = num1 * num2;
            questionText = num1 + " × " + num2;
            break;
    }

    currentQuestion = questionText;
    correctAnswer = answer;

    questionDisplay.textContent = currentQuestion + " = ?";
    answerInput.value = '';
    answerInput.focus();

    console.log("✅ Нов въпрос:", currentQuestion, "Правилен отговор:", correctAnswer);
}

function checkAnswer() {
    console.log("🔍 Проверявам отговора...");
    
    let input = answerInput.value
    let userAnswer = Number(input)
    
    questionsAnswered++;
    
    if (userAnswer === correctAnswer) {
        playerScore += POINTS_PER_CORRECT
        correctAnswers++
        showFeedback("✅ Отлично!", "correct")
    } else {
        showFeedback("❌ Опа! Правилният отговор е " + correctAnswer, "wrong")
    }
    
    updateDisplay();
    
    setTimeout(() => {
        if (gameActive) generateMathQuestion();
    }, 1500);
}

function showFeedback(message, type) {
    feedbackDisplay.textContent = message
    
    if (type === 'correct'){
        feedbackDisplay.className = 'feedback-zone correct-feedback'
    } else if (type === 'wrong'){
        feedbackDisplay.className = 'feedback-zone wrong-feedback'
    }

    setTimeout(() => {
        feedbackDisplay.textContent = '';
        feedbackDisplay.className = 'feedback-zone';
    }, 2000);
}

function updateDisplay() {
    scoreDisplay.textContent = playerScore
    levelDisplay.textContent = currentLevel
    timerDisplay.textContent = timeRemaining + "s"
}

// ============================================
// СЕДМИЦА 9: TODO - ГЛАВНИ ИГРОВИ ФУНКЦИИ (РЕДЖЕБ)
// ============================================

function startGame() {
    console.log("🚀 Стартиране на нова игра...");
    
    playerScore = 0;
    timeRemaining = GAME_DURATION;
    currentLevel = 1;
    questionsAnswered = 0;
    correctAnswers = 0;
    gameActive = true;
    gamePaused = false;
    
    answerInput.disabled = false;
    submitButton.disabled = false;
    pauseButton.disabled = false;
    startButton.disabled = true;
    
    updateDisplay();
    startGameTimer();
    generateMathQuestion();
    answerInput.focus();
    showFeedback("🎮 Играта започна! Успех!", "correct");
    
    console.log("✅ Играта започна!");
}

function endGame() {
    console.log("🏁 Играта приключва...");
    
    gameActive = false;
    stopGameTimer();
    
    answerInput.disabled = true;
    submitButton.disabled = true;
    pauseButton.disabled = true;
    startButton.disabled = false;
    
    alert("🎯 Игра завършена!\n\nТочки: " + playerScore + "\nОтговори: " + correctAnswers + "/" + questionsAnswered);
}

function resetGame() {
    console.log("🔄 Рестартиране...");
    
    gameActive = false;
    gamePaused = false;
    stopGameTimer();
    
    playerScore = 0;
    timeRemaining = GAME_DURATION;
    currentLevel = 1;
    questionsAnswered = 0;
    correctAnswers = 0;
    
    questionDisplay.textContent = "Натисни 'Старт' за да започнеш! 🎮";
    answerInput.value = '';
    
    answerInput.disabled = true;
    submitButton.disabled = true;
    pauseButton.disabled = true;
    startButton.disabled = false;
    
    updateDisplay();
    console.log("✅ Играта е рестартирана!");
}

// ============================================
// СЕДМИЦА 7: TODO - LOCALSTORAGE ФУНКЦИИ
// ============================================

function saveHighScore() {
    try {
        const savedHighScore = localStorage.getItem('mathGameHighScore');
        const currentHighScore = savedHighScore ? parseInt(savedHighScore) : 0;
        
        if (playerScore > currentHighScore) {
            localStorage.setItem('mathGameHighScore', playerScore.toString());
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error("❌ Грешка при запазване:", error);
        return false;
    }
}

function loadHighScore() {
    try {
        const savedHighScore = localStorage.getItem('mathGameHighScore');
        
        if (savedHighScore) {
            const score = parseInt(savedHighScore);
            return score;
        } else {
            return 0;
        }
    } catch (error) {
        console.error("❌ Грешка при зареждане:", error);
        return 0;
    }
}

loadHighScore();

console.log("✅ LocalStorage функциите са готови!");

// ============================================
// СЕДМИЦА 8: TODO - EVENT LISTENERS (РЕДЖЕБ)
// ============================================

startButton.addEventListener('click', function() {
    if (!gameActive) startGame();
});

submitButton.addEventListener('click', function(){
    if(gameActive && !gamePaused) checkAnswer();
});

answerInput.addEventListener('keypress', function(event){
    if (event.key === 'Enter' && gameActive && !gamePaused){
        event.preventDefault();
        checkAnswer();
    }
});

pauseButton.addEventListener('click', function(){
    if (!gameActive) return;

    if (gamePaused){
        gamePaused = false;
        pauseButton.textContent = "⏸️ Пауза";
        answerInput.disabled = false;
        submitButton.disabled = false;
        startGameTimer();
    } else {
        gamePaused = true;
        pauseButton.textContent = "▶️ Продължи";
        answerInput.disabled = true;
        submitButton.disabled = true;
        stopGameTimer();
    }
});

newGameButton.addEventListener('click', function() {
    if (gameActive) {
        const confirmed = confirm("Сигурен ли си? Прогресът ще се загуби.");
        if (!confirmed) return;
    }
    resetGame();
    startGame();
});

console.log("✅ Event listeners са настроени!");

// ============================================
// ФИНАЛНА ИНИЦИАЛИЗАЦИЯ
// ============================================

window.addEventListener('load', function() {
    console.log("🎮 Math Battle Arena е заредена!");
    console.log("📚 Готови сте да започнете!");
    console.log("💡 Проверете TODO коментарите и започнете да програмирате!");
});

console.log("🎉 Скелетът е готов за попълване!");

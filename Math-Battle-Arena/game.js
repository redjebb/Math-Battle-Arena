console.log("🎮 Math Battle Arena се зарежда...");

let playerScore = 0
let timeRemaining = 90
let currentLevel = 1
let questionsAnswered = 0
let correctAnswers = 0
let gameActive = false
let gamePaused = false
let currentQuestion = ""
let correctAnswer = 0

console.log("✅ Променливите са създадени!");

const GAME_DURATION = 60
const MAX_LEVEL = 10

const LEVEL_CONFIG = [
    { level: 1, pointsNeeded: 50, timeBonus: 0 }, 
    { level: 2, pointsNeeded: 120, timeBonus: 10 },
    { level: 3, pointsNeeded: 250, timeBonus: 12 }, 
    { level: 4, pointsNeeded: 450, timeBonus: 15 },  
    { level: 5, pointsNeeded: 700, timeBonus: 18 },  
    { level: 6, pointsNeeded: 1000, timeBonus: 20 }
];  

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
const customModal = document.getElementById('custom-modal');
const modalTitle = document.getElementById('modal-title');
const modalMessage = document.getElementById('modal-message');
const modalIcon = document.getElementById('modal-icon');
const modalConfirmBtn = document.getElementById('modal-confirm');
const modalCancelBtn = document.getElementById('modal-cancel');

console.log("🔗 DOM елементите са свързани!");

let gameTimer = null;
let modalCallback = null; 

function showCustomModal(title, message, icon, confirmText, showCancel, onConfirm) {
    modalTitle.textContent = title;
    modalMessage.textContent = message;
    modalIcon.textContent = icon;
    modalConfirmBtn.textContent = confirmText;
    
    if (showCancel) {
        modalCancelBtn.classList.remove('hidden');
    } else {
        modalCancelBtn.classList.add('hidden');
    }

    customModal.classList.remove('hidden');
    modalCallback = onConfirm;
}

modalConfirmBtn.addEventListener('click', () => {
    customModal.classList.add('hidden');
    if (typeof modalCallback === 'function') modalCallback();
});

modalCancelBtn.addEventListener('click', () => {
    customModal.classList.add('hidden');
    modalCallback = null;
});

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

    questionsAnswered++;

    const operations = ['addition', 'subtraction', 'multiplication'];
    const randomIndex = Math.floor(Math.random() * 3);
    const operation = operations[randomIndex];

    let num1, num2, answer, questionText;

    // Динамични максимални стойности базирани на нивото
    // Базови стойности за Ниво 1
   let maxAddSub = 10 + (currentLevel - 1) * 15;
    let maxMul = 5 + currentLevel * 2;

    // Увеличаване на обхвата след Ниво 1
    if (currentLevel > 1) {
        // Добавяне/Изваждане: Расте с 10-20 на ниво след 1-во
        maxAddSub = 10 + (currentLevel - 1) * 20; 
        // Умножение: Максималният множител расте с 5 на ниво
        maxMul = 10 + (currentLevel - 1) * 5; 
    }
    
    // Ограничение: За да не станат числата прекалено огромни
    if (maxAddSub > 500) maxAddSub = 500;
    if (maxMul > 50) maxMul = 50;
    //  КРАЙ НА НОВОТО

    switch (operation) {
        case 'addition':
            // Числа в обхвата [1, maxAddSub]
            num1 = Math.floor(Math.random() * maxAddSub) + 1;
            num2 = Math.floor(Math.random() * maxAddSub) + 1;
            answer = num1 + num2;
            questionText = num1 + " + " + num2;
            break;

        case 'subtraction':
            // За да избегнем отрицателни числа: num1 > num2
            num2 = Math.floor(Math.random() * maxAddSub) + 1;
            num1 = Math.floor(Math.random() * (maxAddSub - num2 + 1)) + num2; 
            answer = num1 - num2;
            questionText = num1 + " - " + num2;
            break;

        case 'multiplication':
            // Числа в обхвата [1, maxMul]
            num1 = Math.floor(Math.random() * maxMul) + 1;
            num2 = Math.floor(Math.random() * maxMul) + 1;
            answer = num1 * num2;
            questionText = num1 + " × " + num2;
            break;
    }

    currentQuestion = questionText;
    correctAnswer = answer;

    questionDisplay.textContent = currentQuestion + " = ?";
    answerInput.value = '';
    answerInput.focus();

    console.log(`✅ Нов въпрос (Ниво ${currentLevel}): ${currentQuestion}. Обхват: ${maxAddSub}/${maxMul}`);
}

function checkAnswer() {
    if(!gameActive || gamePaused){
        return;
    }
    
    let input = answerInput.value;
    let userAnswer = Number(input);
    
    if (userAnswer === correctAnswer) {
        const levelPoints = 10 + (currentLevel - 1) * 5;
        playerScore += levelPoints;
        correctAnswers++;

        // Участникът получава бонус равен на нивото + 1
        // Ниво 1: +2 сек | Ниво 5: +6 сек
        // Това компенсира времето за мислене при по-трудните нива.
        const timeBonusPerAnswer = currentLevel + 1;
        timeRemaining += timeBonusPerAnswer; 

        showFeedback(`✅ +${levelPoints} т. | +${timeBonusPerAnswer}с`, "correct");
        checkLevelUp();
    } else {
        // При грешен отговор се отнема малко време (3 сек)
        // Това създава риск и прави играта по-истинска.
        timeRemaining = Math.max(0, timeRemaining - 3); 
        showFeedback(`❌ Грешно! -3 сек`, "wrong");
    }
    
    updateDisplay();
    
    // 1.2 секунди пауза (достатъчно да видиш грешката, но не бавно)
    setTimeout(() => {
        if (gameActive) generateMathQuestion();
    }, 1200); 
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
    
    showCustomModal(
    "🎯 Играта приключи!", 
    `Точки: ${playerScore}\nОтговори: ${correctAnswers}/${questionsAnswered}`, 
    "🏆", 
    "Супер!", 
    false, 
    null
);
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
    showCustomModal(
        "Нова игра?", 
        "Сигурен ли си? Прогресът ти ще бъде загубен.", 
        "🔄", 
        "Да, започни!", 
        true, 
        () => { resetGame(); startGame(); }
    );
} else {
    resetGame();
    startGame();
}
});

console.log("✅ Event listeners са настроени!");

// ============================================
// СЕДМИЦА 12: TODO - АЛГОРИТЪМ ЗА НИВАТА
// ============================================

function checkLevelUp() {
    // Търсим следващото ниво
    const nextLevelConfig = LEVEL_CONFIG.find(config => config.level === currentLevel + 1);

    // 1. Проверка дали има следващо ниво и дали сме достигнали нужните точки
    if (nextLevelConfig && playerScore >= nextLevelConfig.pointsNeeded) {
        
        // Смяна на нивото
        currentLevel = nextLevelConfig.level;
        
        // Добавяне на време
        timeRemaining += nextLevelConfig.timeBonus;

        // Показване на фийдбек
        showFeedback(
            `🚀 Ниво ${currentLevel} Отключено! (+${nextLevelConfig.timeBonus}s)`,
            "correct"
        );
        
        // Актуализиране на дисплея за време и ниво
        updateDisplay();
        
        console.log(`✅ Преминато на ниво ${currentLevel}. Точки: ${playerScore}, Време: ${nextLevelConfig.timeBonus}s`);
    }
}

// ============================================
// ФИНАЛНА ИНИЦИАЛИЗАЦИЯ
// ============================================

window.addEventListener('load', function() {
    console.log("🎮 Math Battle Arena е заредена!");
    console.log("📚 Готови сте да започнете!");
    console.log("💡 Проверете TODO коментарите и започнете да програмирате!");
});

console.log("🎉 Скелетът е готов за попълване!");
  
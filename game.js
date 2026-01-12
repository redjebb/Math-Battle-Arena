/* ============================================================
   ГЛОБАЛНИ ПРОМЕНЛИВИ И КОНФИГУРАЦИЯ
   Инициализиране на състоянието на играта и нивата.
   ============================================================ */
console.log("🎮 Math Battle Arena се зарежда...");

let playerScore = 0;
let timeRemaining = 90;
let currentLevel = 1;
let questionsAnswered = 0;
let correctAnswers = 0;
let gameActive = false;
let gamePaused = false;
let currentQuestion = "";
let correctAnswer = 0;

const GAME_DURATION = 60;
const LEVEL_CONFIG = [
    { level: 1, pointsNeeded: 50, timeBonus: 0 }, 
    { level: 2, pointsNeeded: 120, timeBonus: 10 },
    { level: 3, pointsNeeded: 250, timeBonus: 12 }, 
    { level: 4, pointsNeeded: 450, timeBonus: 15 },  
    { level: 5, pointsNeeded: 700, timeBonus: 18 },  
    { level: 6, pointsNeeded: 1000, timeBonus: 20 }
];  

/* КЕШИРАНЕ НА DOM ЕЛЕМЕНТИ */
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

let gameTimer = null;
let modalCallback = null; 

/* ============================================================
   УНИВЕРСАЛНА МОДАЛНА СИСТЕМА
   ============================================================ */
function showCustomModal(title, message, icon, confirmText, showCancel, onConfirm, isDemo = false) {
    modalTitle.textContent = title;
    modalMessage.textContent = message;
    modalIcon.textContent = icon;
    modalConfirmBtn.textContent = confirmText;
    
    const modalInput = document.getElementById('modal-input');
    const demoFeedback = document.getElementById('demo-feedback');

    if (isDemo) {
        modalInput.classList.remove('hidden');
        if (demoFeedback) demoFeedback.classList.add('hidden');
        modalInput.value = "";
        setTimeout(() => modalInput.focus(), 100);
    } else {
        if (modalInput) modalInput.classList.add('hidden');
        if (demoFeedback) demoFeedback.classList.add('hidden');
    }

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

/* ============================================================
   УПРАВЛЕНИЕ НА ВРЕМЕТО (ТАЙМЕР)
   ============================================================ */
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

/* ============================================================
   МАТЕМАТИЧЕСКО ЯДРО
   ============================================================ */
function generateMathQuestion() {
    questionsAnswered++;
    const operations = ['addition', 'subtraction', 'multiplication'];
    const operation = operations[Math.floor(Math.random() * 3)];

    let maxAddSub = 10 + (currentLevel - 1) * 15;
    let maxMul = 5 + currentLevel * 2;

    if (currentLevel > 1) {
        maxAddSub = 10 + (currentLevel - 1) * 20; 
        maxMul = 10 + (currentLevel - 1) * 5; 
    }
    
    if (maxAddSub > 500) maxAddSub = 500;
    if (maxMul > 50) maxMul = 50;

    let num1, num2, answer, questionText;

    switch (operation) {
        case 'addition':
            num1 = Math.floor(Math.random() * maxAddSub) + 1;
            num2 = Math.floor(Math.random() * maxAddSub) + 1;
            answer = num1 + num2;
            questionText = num1 + " + " + num2;
            break;
        case 'subtraction':
            num2 = Math.floor(Math.random() * maxAddSub) + 1;
            num1 = Math.floor(Math.random() * (maxAddSub - num2 + 1)) + num2; 
            answer = num1 - num2;
            questionText = num1 + " - " + num2;
            break;
        case 'multiplication':
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
}

function checkAnswer() {
    if(!gameActive || gamePaused) return;
    
    let userAnswer = Number(answerInput.value);
    
    if (userAnswer === correctAnswer) {
        const levelPoints = 10 + (currentLevel - 1) * 5;
        playerScore += levelPoints;
        correctAnswers++;
        const timeBonus = currentLevel + 1;
        timeRemaining += timeBonus; 

        showFeedback(`✅ +${levelPoints} т. | +${timeBonus}с`, "correct");
        checkLevelUp();
    } else {
        timeRemaining = Math.max(0, timeRemaining - 3); 
        showFeedback(`❌ Грешно! -3 сек`, "wrong");
    }
    
    updateDisplay();
    setTimeout(() => { if (gameActive) generateMathQuestion(); }, 1200); 
}

/* ============================================================
   ГЛАВНИ ИГРОВИ ФУНКЦИИ
   ============================================================ */
function startGame() {
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
}

function endGame() {
    gameActive = false;
    stopGameTimer();
    
    answerInput.disabled = true;
    submitButton.disabled = true;
    pauseButton.disabled = true;
    startButton.disabled = false;
    
    showCustomModal(
        "🎯 Играта приключи!", 
        `Ниво: ${currentLevel}\nТочки: ${playerScore}\nОтговори: ${correctAnswers}/${questionsAnswered}`, 
        "🏆", 
        "Супер!", 
        false, 
        null
    );
}

function resetGame() {
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
}

function updateDisplay() {
    scoreDisplay.textContent = playerScore;
    levelDisplay.textContent = currentLevel;
    timerDisplay.textContent = timeRemaining + "s";
}

function showFeedback(message, type) {
    feedbackDisplay.textContent = message;
    feedbackDisplay.className = (type === 'correct') ? 'feedback-zone correct-feedback' : 'feedback-zone wrong-feedback';
    setTimeout(() => {
        feedbackDisplay.textContent = '';
        feedbackDisplay.className = 'feedback-zone';
    }, 2000);
}

function checkLevelUp() {
    const nextLevelConfig = LEVEL_CONFIG.find(config => config.level === currentLevel + 1);
    if (nextLevelConfig && playerScore >= nextLevelConfig.pointsNeeded) {
        currentLevel = nextLevelConfig.level;
        timeRemaining += nextLevelConfig.timeBonus;
        showFeedback(`🚀 Ниво ${currentLevel} Отключено! (+${nextLevelConfig.timeBonus}s)`, "correct");
        updateDisplay();
    }
}

/* ============================================================
   БОНУС МОДУЛ: ПРОФЕСИОНАЛНО ДЕМО
   ============================================================ */
let demoQuestionCount = 0;
let demoCorrectAnswers = 0;
let currentDemoAnswer = 0;

function generateBracketQuestion() {
    const a = Math.floor(Math.random() * 9) + 4; 
    const b = Math.floor(Math.random() * 8) + 6;
    const c = Math.floor(Math.random() * 8) + 6;
    const isFirstBracket = Math.random() > 0.5;
    
    let text = isFirstBracket ? `${a} × (${b} + ${c})` : `(${b} + ${c}) × ${a}`;
    let ans = a * (b + c);
    return { text: text, answer: ans };
}

function showNextDemoQuestion() {
    const feedback = document.getElementById('demo-feedback');
    if (feedback) feedback.classList.add('hidden');

    if (demoQuestionCount < 4) {
        demoQuestionCount++;
        const quest = generateBracketQuestion(); 
        currentDemoAnswer = quest.answer;

        showCustomModal(
            `Задача ${demoQuestionCount}/4`,
            `Пресметни: ${quest.text}`,
            "🧠",
            "Провери",
            true, 
            submitDemoAnswer,
            true 
        );

        modalCancelBtn.textContent = "Пропусни";
        modalCancelBtn.onclick = function() {
            modalCallback = null; 
            customModal.classList.add('hidden');
            setTimeout(showNextDemoQuestion, 100); 
        };
    } else {
        let finalTitle = (demoCorrectAnswers === 0) ? "Упс... 😕" : "📊 Резултат";
        let finalMsg = (demoCorrectAnswers === 0) ? "Ти не реши правилно нито една задача!" : `Ти реши правилно ${demoCorrectAnswers} от 4 задачи!`;
        let finalIcon = (demoCorrectAnswers === 0) ? "❌" : "🏆";

        showCustomModal(finalTitle, finalMsg, finalIcon, "Към играта", false, () => { window.location.reload(); });
        modalConfirmBtn.onclick = () => { window.location.reload(); };
    }
}

function submitDemoAnswer() {
    const inputField = document.getElementById('modal-input');
    const feedback = document.getElementById('demo-feedback');
    const userVal = parseInt(inputField.value);
    
    if (feedback) feedback.classList.remove('hidden');
    
    if (!isNaN(userVal) && userVal === currentDemoAnswer) {
        demoCorrectAnswers++;
        if (feedback) {
            feedback.textContent = "✅ Вярно!";
            feedback.style.color = "#38ef7d";
        }
    } else {
        if (feedback) {
            feedback.textContent = `❌ Грешно! (Отговор: ${currentDemoAnswer})`;
            feedback.style.color = "#f5576c";
        }
    }
    inputField.value = "";
    setTimeout(showNextDemoQuestion, 1500);
}

/* ============================================================
   EVENT LISTENERS
   ============================================================ */
startButton.addEventListener('click', () => { if (!gameActive) startGame(); });
submitButton.addEventListener('click', () => { if(gameActive && !gamePaused) checkAnswer(); });
answerInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && gameActive && !gamePaused) {
        e.preventDefault();
        checkAnswer();
    }
});

pauseButton.addEventListener('click', () => {
    if (!gameActive) return;
    gamePaused = !gamePaused;
    pauseButton.textContent = gamePaused ? "▶️ Продължи" : "⏸️ Пауза";
    answerInput.disabled = gamePaused;
    submitButton.disabled = gamePaused;
    if (!gamePaused) startGameTimer(); else stopGameTimer();
});

newGameButton.addEventListener('click', () => {
    if (gameActive) {
        showCustomModal("Нова игра?", "Сигурен ли си? Прогресът ти ще бъде загубен.", "🔄", "Да, започни!", true, () => { resetGame(); startGame(); });
    } else { resetGame(); startGame(); }
});

document.getElementById('start-demo').addEventListener('click', () => {
    demoQuestionCount = 0;
    demoCorrectAnswers = 0;
    showNextDemoQuestion();
});

document.getElementById('modal-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') submitDemoAnswer();
});

window.addEventListener('load', () => { console.log("🎮 Math Battle Arena е готова!"); });
console.log("🎮 Math Battle Arena се зарежда...");

/* Дефиниране на глобални променливи за играта */
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

/* Дефиниране на константи за продължителността на играта и максималното ниво */
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

/* Дефиниране на DOM елементите за играта */
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

/* Дефиниране на променливи за таймера и callback функцията за модалния прозорец */
let gameTimer = null;
let modalCallback = null; 

/* Функция за показване на модалния прозорец */
function showCustomModal(title, message, icon, confirmText, showCancel, onConfirm, isDemo = false) {
    // 1. Попълваме текста
    modalTitle.textContent = title;
    modalMessage.textContent = message;
    modalIcon.textContent = icon;
    modalConfirmBtn.textContent = confirmText;
    
    // 2. Управление на полето за писане и фийдбека
    const modalInput = document.getElementById('modal-input');
    const demoFeedback = document.getElementById('demo-feedback');

    if (isDemo) {
        modalInput.classList.remove('hidden');
        demoFeedback.classList.add('hidden'); // Скриваме стария фийдбек
        modalInput.value = ""; // Чистим полето
        setTimeout(() => modalInput.focus(), 100); // Автоматичен фокус
    } else {
        modalInput.classList.add('hidden');
        demoFeedback.classList.add('hidden');
    }

    // 3. Показваме/скриваме бутона за отказ
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

/* Функция за обновяване на таймера */
function updateTimer() {
    if (!gamePaused) {
        timeRemaining--;
        timerDisplay.textContent = timeRemaining + "s";
        if (timeRemaining <= 0) endGame();
    }
}

/* Функция за стартиране на таймера */
function startGameTimer() {
    if (!gameTimer) {
        gameTimer = setInterval(updateTimer, 1000);
    }
}

/* Функция за спиране на таймера */
function stopGameTimer() {
    if (gameTimer) {
        clearInterval(gameTimer);
        gameTimer = null;
    }
}

/* Функция за генериране на нов математически въпрос */
function generateMathQuestion() {
    console.log("🧮 Генерирам нов въпрос...");

    /* Увеличаване броя на зададените въпроси */
    questionsAnswered++;

    const operations = ['addition', 'subtraction', 'multiplication'];
    /* Генериране на случаен оператор */
    const randomIndex = Math.floor(Math.random() * 3);
    const operation = operations[randomIndex];

    /* Дефиниране на променливи за числата и текста на въпроса */
    let num1, num2, answer, questionText;

    // Динамични максимални стойности базирани на нивото
    // Базови стойности за Ниво 1
    /* Дефиниране на максималните стойности за добавяне/изваждане и умножение */
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

    /* Генериране на нов математически въпрос */
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

/* Функция за проверка на отговора на играча */
function checkAnswer() {
    /* Проверка дали играта е активна и не е на пауза */
    if(!gameActive || gamePaused){
        /* Ако не е активна или на пауза, връщаме се назад */
        return;
    }
    
    /* Дефиниране на променливи за входния отговор и преобразуването му в число */
    let input = answerInput.value;
    let userAnswer = Number(input);
    
    /* Проверка дали отговорът на играча е верен */
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

/* Функция за показване на фийдбек */
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

/* Функция за обновяване на дисплея */
function updateDisplay() {
    scoreDisplay.textContent = playerScore
    levelDisplay.textContent = currentLevel
    timerDisplay.textContent = timeRemaining + "s"
}

/* Функция за стартиране на играта */
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

/* Функция за приключване на играта */
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
    `Ниво: ${currentLevel}\nТочки: ${playerScore}\nОтговори: ${correctAnswers}/${questionsAnswered}`, 
    "🏆", 
    "Супер!", 
    false, 
    null
);
}

/* Функция за рестартиране на играта */
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

/* Функция за запазване на рекорда */
function saveHighScore() {
    try {
        const savedHighScore = localStorage.getItem('mathGameHighScore');
        const currentHighScore = savedHighScore ? parseInt(savedHighScore) : 0;
        
        /* Проверка дали текущият резултат е по-голям от текущият рекорд */
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

/* Функция за зареждане на рекорда */
function loadHighScore() {
    try {
        const savedHighScore = localStorage.getItem('mathGameHighScore');
        
        /* Проверка дали има SavedHighScore */
        if (savedHighScore) {
            /* Превръщаме SavedHighScore в число */
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

/* Добавяне на event listeners за бутоните */
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

/* Функция за алгоритъм на нивата */
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

/* ============================================================
   ФИНАЛЕН БОНУС МОДУЛ: ПРОФЕСИОНАЛНО ДЕМО
   ============================================================ */
let currentDemoAnswer = 0;
// Променливи за демото
let demoQuestionCount = 0;
let demoCorrectAnswers = 0;

document.getElementById('start-demo').addEventListener('click', function() {
    demoQuestionCount = 0;
    demoCorrectAnswers = 0;
    showNextDemoQuestion(); // Стартираме първия въпрос
});

// Слушател за ENTER клавиш в модалното поле
document.getElementById('modal-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        submitDemoAnswer();
    }
});

/* Генериране на балансирани задачи със скоби (Демо) */
function generateBracketQuestion() {
    // Множител извън скобите (4 до 12) - не е твърде голям, но не е и 2 или 3
    const a = Math.floor(Math.random() * 9) + 4; 
    
    // Числа вътре в скобите (сборът им ще е между 12 и 25)
    const b = Math.floor(Math.random() * 8) + 6;  // 6 до 13
    const c = Math.floor(Math.random() * 8) + 6;  // 6 до 13
    
    const isFirstBracket = Math.random() > 0.5;
    let questionText, answer;

    if (isFirstBracket) {
        // Тип: 7 × (8 + 9)
        questionText = `${a} × (${b} + ${c})`;
        answer = a * (b + c);
    } else {
        // Тип: (9 + 7) × 8
        questionText = `(${b} + ${c}) × ${a}`;
        answer = (b + c) * a;
    }
    
    return { text: questionText, answer: answer };
}

function showNextDemoQuestion() {
    // Изчистване на съобщенията от предния въпрос
    const feedback = document.getElementById('demo-feedback');
    if (feedback) feedback.classList.add('hidden');

    if (demoQuestionCount < 4) {
        demoQuestionCount++;
        const quest = generateBracketQuestion(); 
        currentDemoAnswer = quest.answer;

        showCustomModal(
            `Задача ${demoQuestionCount}/4`, // Заглавие без думата "Демо"
            `Пресметни: ${quest.text}`,
            "🧠",
            "Провери",
            true, 
            submitDemoAnswer,
            true 
        );

        // Настройка на бутона за пропускане
        modalCancelBtn.textContent = "Пропусни";
        modalCancelBtn.onclick = function() {
            modalCallback = null; 
            customModal.classList.add('hidden');
            setTimeout(showNextDemoQuestion, 100); 
        };
    } else {
        // Логика за финалното съобщение според резултата
        let finalTitle = "📊 Резултат";
        let finalMessage = "";
        let finalIcon = "🏆";

        if (demoCorrectAnswers === 0) {
            // Ако няма нито един верен отговор
            finalTitle = "Упс... 😕";
            finalMessage = "Ти не реши правилно нито една задача!";
            finalIcon = "❌";
        } else {
            // Ако има поне един верен отговор
            finalMessage = `Ти реши правилно ${demoCorrectAnswers} от 4 задачи!`;
            finalIcon = "🏆";
        }

        showCustomModal(
            finalTitle,
            finalMessage,
            finalIcon, 
            "Към играта",
            false,
            function() {
                window.location.reload();
            }
        );
        
        modalConfirmBtn.onclick = function() {
            window.location.reload();
        };
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
    
    inputField.value = ""; // Чистим полето за следващия въпрос
    
    // Пауза за показване на резултата преди следващата задача
    setTimeout(showNextDemoQuestion, 1500);
}

/* Добавяне на event listener за зареждането на страницата */
window.addEventListener('load', function() {
    console.log("🎮 Math Battle Arena е заредена!");
    console.log("📚 Готови сте да започнете!");
    console.log("💡 Проверете TODO коментарите и започнете да програмирате!");
});
  
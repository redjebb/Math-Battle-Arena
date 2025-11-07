// ============================================
// MATH BATTLE ARENA - СКЕЛЕТЕН JAVASCRIPT ФАЙЛ
// ============================================
// 
// Този файл съдържа основната структура.
// Вашата задача е да попълните липсващите части
// според инструкциите за всяка седмица.

console.log("🎮 Math Battle Arena се зарежда...");

// ============================================
// СЕДМИЦА 4: TODO - ОСНОВНИ ПРОМЕНЛИВИ
// ============================================

/*
Инструкции:
Създайте следните променливи с let:

1. playerScore = 0           (точките на играча)
2. timeRemaining = 60        (оставащи секунди)
3. currentLevel = 1          (текущо ниво)
4. questionsAnswered = 0     (общо отговорени въпроси)
5. correctAnswers = 0        (правилни отговори)
6. gameActive = false        (дали играта е активна)
7. gamePaused = false        (дали играта е на пауза)
8. currentQuestion = ""      (текст на въпроса)
9. correctAnswer = 0         (правилният отговор)
*/

// TODO: Създайте игралните променливи тук
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

// ============================================
// СЕДМИЦА 4: TODO - КОНСТАНТИ ЗА ИГРАТА
// ============================================

/*
Инструкции:
Създайте следните константи с const:

1. GAME_DURATION = 60              (секунди за игра)
2. POINTS_PER_CORRECT = 10         (точки за правилен отговор)
3. QUESTIONS_FOR_LEVEL_UP = 5      (въпроси за ново ниво)
4. MAX_LEVEL = 10                  (максимално ниво)
*/

// TODO: Създайте константите тук
const GAME_DURATION = 60
const POINTS_PER_CORRECT = 10
const QUESTIONS_FOR_LEVEL_UP = 5
const MAX_LEVEL = 10




console.log("⚙️ Константите са заредени!");

// ============================================
// СЕДМИЦА 4: TODO - DOM ЕЛЕМЕНТИ
// ============================================

/*
Инструкции:
Свържете променливите с HTML елементите използвайки document.getElementById():

const questionDisplay = document.getElementById('question-display');
const scoreDisplay = document.getElementById('score-display');
const timerDisplay = document.getElementById('timer-display');
const levelDisplay = document.getElementById('level-display');
const feedbackDisplay = document.getElementById('feedback-display');
const answerInput = document.getElementById('answer-input');
const submitButton = document.getElementById('submit-answer');
const startButton = document.getElementById('start-game');
const pauseButton = document.getElementById('pause-game');
const newGameButton = document.getElementById('new-game');
*/

// TODO: Свържете DOM елементите тук
const questionDisplay = document.getElementById('question-display');
const scoreDisplay = document.getElementById('score-display');
const timerDisplay = document.getElementById('timer-display');
const levelDisplay = document.getElementById('level-display');
const feedbackDisplay = document.getElementById('feedback-display');
const answerInput = document.getElementById('answer-input');
const submitButton = document.getElementById('submit-answer');
const startButton = document.getElementById('start-game');
const pauseButton = document.getElementById('pause-game');
const newGameButton = document.getElementById('new-game');










console.log("🔗 DOM елементите са свързани!");

// ============================================
// СЕДМИЦА 5: TODO - ГЕНЕРИРАНЕ НА ВЪПРОСИ
// ============================================

/*
Инструкции за функция generateMathQuestion():

1. Създайте масив operations с 3 операции: 'addition', 'subtraction', 'multiplication'
2. Генерирайте случайно число от 0 до 2: Math.floor(Math.random() * 3)
3. Изберете операция от масива
4. Създайте променливи: num1, num2, answer, questionText
5. Използвайте switch statement за различните операции:
   
   case 'addition':
     - num1 = Math.floor(Math.random() * 50) + 1
     - num2 = Math.floor(Math.random() * 50) + 1
     - answer = num1 + num2
     - questionText = num1 + " + " + num2
     
   case 'subtraction':
     - num1 = Math.floor(Math.random() * 50) + 25
     - num2 = Math.floor(Math.random() * 25) + 1
     - answer = num1 - num2
     - questionText = num1 + " - " + num2
     
   case 'multiplication':
     - num1 = Math.floor(Math.random() * 12) + 1
     - num2 = Math.floor(Math.random() * 12) + 1
     - answer = num1 * num2
     - questionText = num1 + " × " + num2

6. Запазете в глобални променливи:
   - currentQuestion = questionText
   - correctAnswer = answer

7. Покажете въпроса:
   - questionDisplay.textContent = currentQuestion + " = ?"

8. Изчистете полето за отговор:
   - answerInput.value = ''

9. Дайте фокус на полето:
   - answerInput.focus()
*/

function generateMathQuestion() {
    console.log("🧮 Генерирам нов въпрос...");
    
    // TODO: Създайте масив operations
    
    
    // TODO: Генерирайте случаен индекс
    
    
    // TODO: Изберете операция
    
    
    // TODO: Декларирайте променливи
    
    
    // TODO: Създайте switch statement
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    // TODO: Запазете в глобални променливи
    
    
    
    // TODO: Покажете въпроса на екрана
    
    
    // TODO: Изчистете input полето
    
    
    // TODO: Дайте фокус
    
    
    console.log(`✅ Въпрос: ${currentQuestion} = ? (Отговор: ${correctAnswer})`);
}

console.log("✅ Функцията за генериране е готова!");

// ============================================
// СЕДМИЦА 7: TODO - ПРОВЕРКА НА ОТГОВОРИ
// ============================================

/*
Инструкции за функция checkAnswer():

1. Вземете стойността от answerInput.value
2. Преобразувайте я в число: Number(userInput)
3. Увеличете questionsAnswered с 1
4. Проверете с if-else:
   
   if (userAnswer === correctAnswer):
     - Увеличете playerScore с POINTS_PER_CORRECT
     - Увеличете correctAnswers с 1
     - Покажете feedback: showFeedback("✅ Отлично!", "correct")
   else:
     - Покажете feedback: showFeedback("❌ Опа! Правилният отговор е " + correctAnswer, "wrong")

5. Обновете дисплея: updateDisplay()
6. След 1.5 секунди генерирайте нов въпрос:
   setTimeout(() => {
       if (gameActive) generateMathQuestion();
   }, 1500);
*/

function checkAnswer() {
    console.log("🔍 Проверявам отговора...");
    
    // TODO: Вземете стойността от input
    
    
    // TODO: Преобразувайте в число
    
    
    // TODO: Увеличете questionsAnswered
    
    
    // TODO: Проверете с if-else
    
    
    
    
    
    
    
    
    
    
    // TODO: Обновете дисплея
    
    
    // TODO: Генерирайте нов въпрос след 1.5 сек
    
    
    
    
}

// ============================================
// СЕДМИЦА 7: TODO - ПОМОЩНИ ФУНКЦИИ
// ============================================

/*
Инструкции за функция showFeedback(message, type):

1. Задайте текст: feedbackDisplay.textContent = message
2. Проверете типа с if-else:
   if (type === 'correct'):
     - feedbackDisplay.className = 'feedback-zone correct-feedback'
   else if (type === 'wrong'):
     - feedbackDisplay.className = 'feedback-zone wrong-feedback'
3. След 2 секунди изчистете:
   setTimeout(() => {
       feedbackDisplay.textContent = '';
       feedbackDisplay.className = 'feedback-zone';
   }, 2000);
*/

function showFeedback(message, type) {
    // TODO: Задайте текст
    
    
    // TODO: Задайте клас според типа
    
    
    
    
    
    
    // TODO: Изчистете след 2 секунди
    
    
    
    
}

/*
Инструкции за функция updateDisplay():

Обновете всички display елементи:
1. scoreDisplay.textContent = playerScore
2. levelDisplay.textContent = currentLevel
3. timerDisplay.textContent = timeRemaining + "s"
*/

function updateDisplay() {
    // TODO: Обновете score
    
    // TODO: Обновете level
    
    // TODO: Обновете timer
    
}

console.log("✅ Функциите за проверка са готови!");

// ============================================
// СЕДМИЦА 8: TODO - EVENT LISTENERS
// ============================================

/*
Инструкции:

1. Start бутон:
   startButton.addEventListener('click', function() {
       if (!gameActive) startGame();
   });

2. Submit бутон:
   submitButton.addEventListener('click', function() {
       if (gameActive && !gamePaused) checkAnswer();
   });

3. Enter key:
   answerInput.addEventListener('keypress', function(event) {
       if (event.key === 'Enter' && gameActive && !gamePaused) {
           event.preventDefault();
           checkAnswer();
       }
   });

4. Pause бутон:
   pauseButton.addEventListener('click', function() {
       if (!gameActive) return;
       
       if (gamePaused) {
           gamePaused = false;
           pauseButton.textContent = "⏸️ Пауза";
           // Активирайте контролите
           // Рестартирайте таймера
       } else {
           gamePaused = true;
           pauseButton.textContent = "▶️ Продължи";
           // Деактивирайте контролите
           // Спрете таймера
       }
   });

5. New Game бутон:
   newGameButton.addEventListener('click', function() {
       if (gameActive) {
           const confirmed = confirm("Сигурен ли си? Прогресът ще се загуби.");
           if (!confirmed) return;
       }
       resetGame();
       startGame();
   });
*/

// TODO: Добавете event listener за Start бутон





// TODO: Добавете event listener за Submit бутон





// TODO: Добавете event listener за Enter key








// TODO: Добавете event listener за Pause бутон















// TODO: Добавете event listener за New Game бутон









console.log("✅ Event listeners са настроени!");

// ============================================
// СЕДМИЦА 9: TODO - ТАЙМЕР ФУНКЦИИ
// ============================================

/*
Инструкции:

1. Създайте глобална променлива:
   let gameTimer = null;

2. Функция updateTimer():
   - Намалете timeRemaining с 1
   - Обновете timerDisplay.textContent = timeRemaining + "s"
   - Ако timeRemaining <= 0, извикайте endGame()

3. Функция startGameTimer():
   - gameTimer = setInterval(updateTimer, 1000)

4. Функция stopGameTimer():
   - if (gameTimer) {
       clearInterval(gameTimer);
       gameTimer = null;
     }
*/

// TODO: Създайте променлива gameTimer


// TODO: Функция updateTimer






// TODO: Функция startGameTimer



// TODO: Функция stopGameTimer





console.log("✅ Таймер функциите са готови!");

// ============================================
// СЕДМИЦА 9: TODO - ГЛАВНИ ИГРОВИ ФУНКЦИИ
// ============================================

/*
Инструкции за функция startGame():

1. Нулирайте всички променливи:
   - playerScore = 0
   - timeRemaining = GAME_DURATION
   - currentLevel = 1
   - questionsAnswered = 0
   - correctAnswers = 0
   - gameActive = true
   - gamePaused = false

2. Активирайте контролите:
   - answerInput.disabled = false
   - submitButton.disabled = false
   - pauseButton.disabled = false
   - startButton.disabled = true

3. Обновете дисплея: updateDisplay()

4. Стартирайте таймера: startGameTimer()

5. Генерирайте въпрос: generateMathQuestion()

6. Дайте фокус: answerInput.focus()

7. Покажете съобщение: showFeedback("🎮 Играта започна! Успех!", "correct")
*/

function startGame() {
    console.log("🚀 Стартиране на нова игра...");
    
    // TODO: Нулирайте променливите
    
    
    
    
    
    
    
    
    // TODO: Активирайте контролите
    
    
    
    
    
    // TODO: Обновете дисплея
    
    
    // TODO: Стартирайте таймера
    
    
    // TODO: Генерирайте въпрос
    
    
    // TODO: Дайте фокус
    
    
    // TODO: Покажете съобщение
    
    
    console.log("✅ Играта започна!");
}

/*
Инструкции за функция endGame():

1. Спрете играта:
   - gameActive = false
   - stopGameTimer()

2. Деактивирайте контролите:
   - answerInput.disabled = true
   - submitButton.disabled = true
   - pauseButton.disabled = true
   - startButton.disabled = false

3. Покажете резултат:
   alert("🎯 Игра завършена!\n\nТочки: " + playerScore + "\nОтговори: " + correctAnswers + "/" + questionsAnswered);
*/

function endGame() {
    console.log("🏁 Играта приключва...");
    
    // TODO: Спрете играта
    
    
    
    // TODO: Деактивирайте контролите
    
    
    
    
    
    // TODO: Покажете резултат
    
}

/*
Инструкции за функция resetGame():

1. Спрете играта:
   - gameActive = false
   - gamePaused = false
   - stopGameTimer()

2. Нулирайте променливите (като в startGame)

3. Нулирайте дисплея:
   - questionDisplay.textContent = "Натисни 'Старт' за да започнеш! 🎮"
   - answerInput.value = ''

4. Деактивирайте контролите:
   - answerInput.disabled = true
   - submitButton.disabled = true
   - pauseButton.disabled = true
   - startButton.disabled = false

5. Обновете дисплея: updateDisplay()
*/

function resetGame() {
    console.log("🔄 Рестартиране...");
    
    // TODO: Спрете играта
    
    
    
    
    // TODO: Нулирайте променливите
    
    
    
    
    
    
    
    // TODO: Нулирайте дисплея
    
    
    
    // TODO: Деактивирайте контролите
    
    
    
    
    
    // TODO: Обновете дисплея
    
    
    console.log("✅ Играта е рестартирана!");
}

console.log("✅ Главните функции са готови!");

// ============================================
// СЕДМИЦА 11: TODO - LOCALSTORAGE
// ============================================

/*
Инструкции за функция saveHighScore():

1. Вземете текущия рекорд:
   const savedHighScore = localStorage.getItem('mathGameHighScore');
   const currentHighScore = savedHighScore ? parseInt(savedHighScore) : 0;

2. Ако playerScore > currentHighScore:
   - localStorage.setItem('mathGameHighScore', playerScore.toString());
   - return true;

3. Иначе:
   - return false;
*/

function saveHighScore() {
    try {
        // TODO: Вземете текущия рекорд
        
        
        
        // TODO: Сравнете и запазете
        
        
        
        
        
        
    } catch (error) {
        console.error("❌ Грешка при запазване:", error);
        return false;
    }
}

/*
Инструкции за функция loadHighScore():

1. Вземете рекорда:
   const savedHighScore = localStorage.getItem('mathGameHighScore');

2. Ако има запазен рекорд:
   - const score = parseInt(savedHighScore);
   - Покажете го на екрана (ако имате highScoreDisplay елемент)
   - return score;

3. Иначе:
   - return 0;
*/

function loadHighScore() {
    try {
        // TODO: Вземете рекорда
        
        
        // TODO: Проверете и покажете
        
        
        
        
        
        
    } catch (error) {
        console.error("❌ Грешка при зареждане:", error);
        return 0;
    }
}

// Заредете рекорда при стартиране
loadHighScore();

console.log("✅ LocalStorage функциите са готови!");

// ============================================
// ФИНАЛНА ИНИЦИАЛИЗАЦИЯ
// ============================================

window.addEventListener('load', function() {
    console.log("🎮 Math Battle Arena е заредена!");
    console.log("📚 Готови сте да започнете!");
    console.log("💡 Проверете TODO коментарите и започнете да програмирате!");
});

console.log("🎉 Скелетът е готов за попълване!");

// Код для сейфа (8 символов) - СНЕЖИНКА
const SECRET_CODE = 'СНЕЖИНКА';
let currentGame = 1;
let gamesCompleted = [false, false, false, false, false, false, false, false];

// Игра 1: Найди пары ёлочных шаров (усложнённая - 8 пар)
function startGame1() {
    const container = document.getElementById('game-container');
    const colors = ['#e74c3c', '#27ae60', '#3498db', '#f39c12', '#9b59b6', '#1abc9c', '#e91e63', '#ff5722'];
    let balls = [];
    
    colors.forEach(color => {
        balls.push({ color, matched: false });
        balls.push({ color, matched: false });
    });
    
    balls = balls.sort(() => Math.random() - 0.5);
    
    let selectedBalls = [];
    let matchedPairs = 0;
    let attempts = 0;
    
    container.innerHTML = `
        <h2>🎄 Найди пары ёлочных шаров</h2>
        <p>Найди все пары одинаковых шаров!</p>
        <p class="attempts-counter">Попытки: <span id="attempts">0</span></p>
        <div class="game-area" id="balls-area"></div>
    `;
    
    const area = document.getElementById('balls-area');
    
    balls.forEach((ball, index) => {
        const ballEl = document.createElement('div');
        ballEl.className = 'ornament-ball';
        ballEl.style.background = `radial-gradient(circle at 30% 30%, ${lightenColor(ball.color)}, ${ball.color})`;
        ballEl.dataset.index = index;
        ballEl.dataset.color = ball.color;
        ballEl.style.animationDelay = `${Math.random() * 2}s`;
        
        ballEl.addEventListener('click', () => {
            if (ballEl.classList.contains('matched') || selectedBalls.length >= 2) return;
            if (selectedBalls.find(b => b.index === index)) return;
            
            ballEl.style.transform = 'scale(1.2)';
            ballEl.style.boxShadow = '0 0 25px ' + ball.color;
            selectedBalls.push({ el: ballEl, color: ball.color, index });
            
            if (selectedBalls.length === 2) {
                attempts++;
                document.getElementById('attempts').textContent = attempts;
                
                setTimeout(() => {
                    if (selectedBalls[0].color === selectedBalls[1].color) {
                        selectedBalls[0].el.classList.add('matched');
                        selectedBalls[1].el.classList.add('matched');
                        matchedPairs++;
                        
                        if (matchedPairs === colors.length) {
                            setTimeout(() => completeGame(1, 'С'), 500);
                        }
                    } else {
                        selectedBalls.forEach(b => {
                            b.el.style.transform = '';
                            b.el.style.boxShadow = '';
                        });
                    }
                    selectedBalls = [];
                }, 600);
            }
        });
        
        area.appendChild(ballEl);
    });
}

// Игра 2: Викторина по воспоминаниям
function startGame2() {
    const container = document.getElementById('game-container');
    
    const questions = [
        {
            question: "Какие сладости из Ярче мы с тобой любим больше всего?",
            options: ["Пончики", "Шоколадные палочки", "Эклеры", "Круассаны"],
            correct: 1
        },
        {
            question: "Где мы с тобой впервые поцеловались?",
            options: ["В парке", "В кино", "На эскалаторе в метро", "В кафе"],
            correct: 2
        },
        {
            question: "Какой мультик мы впервые посмотрели вместе?",
            options: ["Тоторо", "Рыбка Поньо на утёсе", "Унесённые призраками", "Ходячий замок"],
            correct: 1
        },
        {
            question: "Куда мы с тобой впервые пошли гулять?",
            options: ["В парк Горького", "На набережную", "Хлебозавод", "В торговый центр"],
            correct: 2
        },
        {
            question: "Что мне больше всего в тебе нравится?",
            options: ["Твоя улыбка", "Твой смех", "Твои глаза", "Всё, что в тебе есть я люблю очень сильно"],
            correct: 3
        }
    ];
    
    let currentQuestion = 0;
    let correctAnswers = 0;
    
    function showQuestion() {
        const q = questions[currentQuestion];
        
        let dotsHtml = questions.map((_, i) => {
            let cls = 'quiz-dot';
            if (i < currentQuestion) cls += ' completed';
            if (i === currentQuestion) cls += ' active';
            return `<div class="${cls}"></div>`;
        }).join('');
        
        container.innerHTML = `
            <h2>💝 Наши воспоминания</h2>
            <div class="quiz-progress">${dotsHtml}</div>
            <p class="quiz-question">${q.question}</p>
            <div class="quiz-options" id="quiz-options"></div>
        `;
        
        const optionsContainer = document.getElementById('quiz-options');
        
        q.options.forEach((option, index) => {
            const optionEl = document.createElement('button');
            optionEl.className = 'quiz-option';
            optionEl.textContent = option;
            
            optionEl.addEventListener('click', () => {
                const allOptions = optionsContainer.querySelectorAll('.quiz-option');
                allOptions.forEach(opt => opt.style.pointerEvents = 'none');
                
                if (index === q.correct) {
                    optionEl.classList.add('correct');
                    correctAnswers++;
                    showCatMessage("Правильно! Ты всё помнишь!");
                } else {
                    optionEl.classList.add('wrong');
                    allOptions[q.correct].classList.add('correct');
                    showCatMessage("Ничего страшного, главное что мы вместе!");
                }
                
                setTimeout(() => {
                    currentQuestion++;
                    if (currentQuestion < questions.length) {
                        showQuestion();
                    } else {
                        completeGame(2, 'Н');
                    }
                }, 1500);
            });
            
            optionsContainer.appendChild(optionEl);
        });
    }
    
    showQuestion();
}

// Игра 3: Открой все подарки (больше подарков)
function startGame3() {
    const container = document.getElementById('game-container');
    const giftColors = ['#e74c3c', '#27ae60', '#3498db', '#f39c12', '#9b59b6', '#e91e63', '#00bcd4', '#ff5722', '#8bc34a', '#ff9800'];
    const surprises = ['💖', '⭐', '🌟', '💝', '✨', '🎉', '💕', '🎊', '💫', '🌈'];
    let opened = 0;
    let correctOrder = [];
    let clickedOrder = [];
    
    // Генерируем случайный порядок открытия
    for (let i = 0; i < giftColors.length; i++) {
        correctOrder.push(i);
    }
    correctOrder = correctOrder.sort(() => Math.random() - 0.5).slice(0, 5);
    
    container.innerHTML = `
        <h2>🎁 Открой все подарки!</h2>
        <p>Нажимай на подарки и открывай сюрпризы</p>
        <div class="game-area" id="gifts-area"></div>
    `;
    
    const area = document.getElementById('gifts-area');
    
    giftColors.forEach((color, index) => {
        const gift = document.createElement('div');
        gift.className = 'gift-box';
        gift.innerHTML = `
            <div class="gift-bow">🎀</div>
            <div class="gift-body" style="background: linear-gradient(145deg, ${color}, ${darkenColor(color)});">
                <div class="gift-ribbon-v"></div>
                <div class="gift-ribbon-h"></div>
            </div>
        `;
        
        gift.addEventListener('click', () => {
            if (gift.classList.contains('opened')) return;
            
            gift.classList.add('opened');
            opened++;
            
            setTimeout(() => {
                gift.innerHTML = `<span style="font-size: 2.2rem;">${surprises[index]}</span>`;
                gift.style.animation = 'none';
                gift.style.display = 'flex';
                gift.style.alignItems = 'center';
                gift.style.justifyContent = 'center';
            }, 300);
            
            if (opened === giftColors.length) {
                setTimeout(() => completeGame(3, 'Е'), 1000);
            }
        });
        
        area.appendChild(gift);
    });
}

// Игра 4: Слова о любви (усложнённая)
function startGame4() {
    const container = document.getElementById('game-container');
    
    const targetWords = ['ЛЮБОВЬ', 'НЕЖНОСТЬ', 'СЧАСТЬЕ', 'РАДОСТЬ', 'ТЕПЛО'];
    const allLetters = 'ЛЮБОВЬНЕЖНОСТЬСЧАЕРАДИТЕПЛ'.split('');
    
    let foundWords = [];
    let currentWord = [];
    let usedIndices = [];
    
    const shuffledLetters = allLetters.sort(() => Math.random() - 0.5);
    
    container.innerHTML = `
        <h2>💌 Слова любви</h2>
        <p>Составь слова о любви из букв</p>
        <p class="word-hint">Найди: ЛЮБОВЬ, НЕЖНОСТЬ, СЧАСТЬЕ, РАДОСТЬ, ТЕПЛО</p>
        <div class="word-input-area" id="word-input"></div>
        <div class="word-letters" id="word-letters"></div>
        <div class="word-controls">
            <button class="word-btn" id="clear-word">Очистить</button>
            <button class="word-btn" id="check-word">Проверить</button>
        </div>
        <div class="found-words">
            <h4>Найденные слова</h4>
            <div class="found-words-list" id="found-list"></div>
        </div>
    `;
    
    const lettersContainer = document.getElementById('word-letters');
    const inputContainer = document.getElementById('word-input');
    const foundList = document.getElementById('found-list');
    
    function renderLetters() {
        lettersContainer.innerHTML = '';
        shuffledLetters.forEach((letter, index) => {
            const tile = document.createElement('div');
            tile.className = 'letter-tile';
            if (usedIndices.includes(index)) tile.classList.add('used');
            tile.textContent = letter;
            tile.dataset.index = index;
            
            tile.addEventListener('click', () => {
                if (usedIndices.includes(index)) return;
                currentWord.push({ letter, index });
                usedIndices.push(index);
                renderWord();
                renderLetters();
            });
            
            lettersContainer.appendChild(tile);
        });
    }
    
    function renderWord() {
        inputContainer.innerHTML = '';
        currentWord.forEach((item, i) => {
            const slot = document.createElement('div');
            slot.className = 'word-slot';
            slot.textContent = item.letter;
            slot.style.borderStyle = 'solid';
            slot.addEventListener('click', () => {
                usedIndices = usedIndices.filter(idx => idx !== item.index);
                currentWord.splice(i, 1);
                renderWord();
                renderLetters();
            });
            inputContainer.appendChild(slot);
        });
    }
    
    document.getElementById('clear-word').addEventListener('click', () => {
        currentWord = [];
        usedIndices = [];
        renderWord();
        renderLetters();
    });
    
    document.getElementById('check-word').addEventListener('click', () => {
        const word = currentWord.map(item => item.letter).join('');
        
        if (targetWords.includes(word) && !foundWords.includes(word)) {
            foundWords.push(word);
            
            const wordEl = document.createElement('span');
            wordEl.className = 'found-word';
            wordEl.textContent = word;
            foundList.appendChild(wordEl);
            
            currentWord = [];
            usedIndices = [];
            renderWord();
            renderLetters();
            
            showCatMessage("Отлично! Красивое слово! 💕");
            
            if (foundWords.length >= 3) {
                setTimeout(() => completeGame(4, 'Ж'), 1000);
            }
        } else if (foundWords.includes(word)) {
            showCatMessage("Это слово уже найдено!");
            currentWord = [];
            usedIndices = [];
            renderWord();
            renderLetters();
        } else {
            showCatMessage("Попробуй другое слово!");
        }
    });
    
    renderLetters();
}

// Игра 5: Память со звёздами (больше карточек)
function startGame5() {
    const container = document.getElementById('game-container');
    const symbols = ['⭐', '🌟', '✨', '💫', '🌙', '☀️', '🌈', '💎'];
    let cards = [];
    
    symbols.forEach(symbol => {
        cards.push({ symbol, matched: false });
        cards.push({ symbol, matched: false });
    });
    
    cards = cards.sort(() => Math.random() - 0.5);
    
    let flippedCards = [];
    let matchedPairs = 0;
    let canFlip = true;
    let moves = 0;
    
    container.innerHTML = `
        <h2>⭐ Звёздная память</h2>
        <p>Найди все пары звёзд!</p>
        <p class="attempts-counter">Ходы: <span id="moves">0</span></p>
        <div class="game-area" id="memory-area"></div>
    `;
    
    const area = document.getElementById('memory-area');
    
    cards.forEach((card, index) => {
        const cardEl = document.createElement('div');
        cardEl.className = 'memory-card';
        cardEl.innerHTML = `
            <div class="memory-card-inner">
                <div class="memory-card-front">❓</div>
                <div class="memory-card-back">${card.symbol}</div>
            </div>
        `;
        cardEl.dataset.index = index;
        
        cardEl.addEventListener('click', () => {
            if (!canFlip || cardEl.classList.contains('flipped') || cardEl.classList.contains('matched')) return;
            
            cardEl.classList.add('flipped');
            flippedCards.push({ el: cardEl, symbol: card.symbol, index });
            
            if (flippedCards.length === 2) {
                canFlip = false;
                moves++;
                document.getElementById('moves').textContent = moves;
                
                setTimeout(() => {
                    if (flippedCards[0].symbol === flippedCards[1].symbol) {
                        flippedCards[0].el.classList.add('matched');
                        flippedCards[1].el.classList.add('matched');
                        matchedPairs++;
                        
                        if (matchedPairs === symbols.length) {
                            setTimeout(() => completeGame(5, 'И'), 500);
                        }
                    } else {
                        flippedCards[0].el.classList.remove('flipped');
                        flippedCards[1].el.classList.remove('flipped');
                    }
                    
                    flippedCards = [];
                    canFlip = true;
                }, 1000);
            }
        });
        
        area.appendChild(cardEl);
    });
}

// Игра 6: Повтори мелодию колокольчиков (усложнённая)
function startGame6() {
    const container = document.getElementById('game-container');
    const bells = ['🔔', '🛎️', '🎐', '🔕', '🎵'];
    let sequence = [];
    let playerSequence = [];
    let level = 1;
    const maxLevel = 6;
    let isShowingSequence = false;
    
    container.innerHTML = `
        <h2>🔔 Повтори мелодию!</h2>
        <p>Запомни последовательность и повтори</p>
        <div class="sequence-display" id="sequence-display">Уровень: ${level}</div>
        <div class="game-area" id="bells-area"></div>
    `;
    
    const area = document.getElementById('bells-area');
    const display = document.getElementById('sequence-display');
    
    bells.forEach((bell, index) => {
        const bellEl = document.createElement('div');
        bellEl.className = 'bell';
        bellEl.textContent = bell;
        bellEl.dataset.index = index;
        
        bellEl.addEventListener('click', () => {
            if (isShowingSequence) return;
            
            bellEl.classList.add('ring');
            setTimeout(() => bellEl.classList.remove('ring'), 500);
            
            playerSequence.push(index);
            
            const currentIndex = playerSequence.length - 1;
            if (playerSequence[currentIndex] !== sequence[currentIndex]) {
                display.textContent = 'Ой! Попробуй снова...';
                display.style.color = '#ff6b6b';
                playerSequence = [];
                setTimeout(() => {
                    display.style.color = '';
                    showSequence();
                }, 1500);
                return;
            }
            
            if (playerSequence.length === sequence.length) {
                if (level === maxLevel) {
                    display.textContent = 'Отлично! 🎉';
                    setTimeout(() => completeGame(6, 'Н'), 1000);
                } else {
                    level++;
                    display.textContent = `Уровень: ${level}`;
                    playerSequence = [];
                    setTimeout(showSequence, 1000);
                }
            }
        });
        
        area.appendChild(bellEl);
    });
    
    function showSequence() {
        isShowingSequence = true;
        sequence.push(Math.floor(Math.random() * bells.length));
        display.textContent = 'Смотри внимательно...';
        
        let i = 0;
        const interval = setInterval(() => {
            const bellEls = area.querySelectorAll('.bell');
            bellEls[sequence[i]].classList.add('ring');
            bellEls[sequence[i]].style.transform = 'scale(1.3)';
            
            setTimeout(() => {
                bellEls[sequence[i]].classList.remove('ring');
                bellEls[sequence[i]].style.transform = '';
                i++;
                
                if (i >= sequence.length) {
                    clearInterval(interval);
                    isShowingSequence = false;
                    display.textContent = 'Твоя очередь!';
                    playerSequence = [];
                }
            }, 400);
        }, 700);
    }
    
    setTimeout(showSequence, 1000);
}

// Игра 7: Собери снежинку (пазл)
function startGame7() {
    const container = document.getElementById('game-container');
    
    container.innerHTML = `
        <h2>❄ Собери снежинку</h2>
        <p>Перетащи части снежинки на свои места или просто нажимай на них</p>
        <div class="snowflake-puzzle">
            <div class="puzzle-target" id="puzzle-target">
                <div class="puzzle-slot" data-slot="1"></div>
                <div class="puzzle-slot" data-slot="2"></div>
                <div class="puzzle-slot" data-slot="3"></div>
                <div class="puzzle-slot" data-slot="4"></div>
                <div class="puzzle-slot" data-slot="5"></div>
                <div class="puzzle-slot" data-slot="6"></div>
            </div>
            <div class="puzzle-pieces" id="puzzle-pieces"></div>
        </div>
    `;
    
    const pieces = ['❄', '❅', '❆', '✻', '✼', '❉'];
    const piecesContainer = document.getElementById('puzzle-pieces');
    const slots = document.querySelectorAll('.puzzle-slot');
    
    let placedPieces = 0;
    let currentSlot = 0;
    
    const shuffledPieces = [...pieces].sort(() => Math.random() - 0.5);
    
    shuffledPieces.forEach((piece, index) => {
        const pieceEl = document.createElement('div');
        pieceEl.className = 'puzzle-piece';
        pieceEl.textContent = piece;
        pieceEl.draggable = true;
        pieceEl.dataset.piece = index + 1;
        
        pieceEl.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', JSON.stringify({ index: index + 1, piece }));
            pieceEl.classList.add('dragging');
        });
        
        pieceEl.addEventListener('dragend', () => {
            pieceEl.classList.remove('dragging');
        });
        
        // Для мобильных устройств и простоты
        pieceEl.addEventListener('click', () => {
            if (pieceEl.classList.contains('placed')) return;
            
            const emptySlot = slots[currentSlot];
            if (emptySlot && currentSlot < 6) {
                emptySlot.textContent = piece;
                emptySlot.classList.add('filled');
                pieceEl.classList.add('placed');
                placedPieces++;
                currentSlot++;
                
                if (placedPieces === 6) {
                    setTimeout(() => completeGame(7, 'К'), 1000);
                }
            }
        });
        
        piecesContainer.appendChild(pieceEl);
    });
    
    slots.forEach((slot, slotIndex) => {
        slot.addEventListener('dragover', (e) => {
            e.preventDefault();
            slot.classList.add('drag-over');
        });
        
        slot.addEventListener('dragleave', () => {
            slot.classList.remove('drag-over');
        });
        
        slot.addEventListener('drop', (e) => {
            e.preventDefault();
            slot.classList.remove('drag-over');
            
            if (slot.classList.contains('filled')) return;
            
            try {
                const data = JSON.parse(e.dataTransfer.getData('text/plain'));
                const pieceEl = document.querySelector(`.puzzle-piece[data-piece="${data.index}"]`);
                
                if (pieceEl && !pieceEl.classList.contains('placed')) {
                    slot.textContent = data.piece;
                    slot.classList.add('filled');
                    pieceEl.classList.add('placed');
                    placedPieces++;
                    
                    if (placedPieces === 6) {
                        setTimeout(() => completeGame(7, 'К'), 1000);
                    }
                }
            } catch (err) {}
        });
    });
}

// Игра 8: Наша история (хронология)
function startGame8() {
    const container = document.getElementById('game-container');
    
    const events = [
        { id: 1, text: "Наша первая прогулка на Хлебозаводе", order: 1 },
        { id: 2, text: "Наш первый совместный мультик", order: 2 },
        { id: 3, text: "Наш первый поцелуй в метро", order: 3 },
        { id: 4, text: "Сладости из Ярче вместе", order: 4 }
    ];
    
    const shuffledEvents = [...events].sort(() => Math.random() - 0.5);
    let selectedOrder = [];
    
    container.innerHTML = `
        <h2>💑 Наша история</h2>
        <p>Расставь события нашей истории в правильном порядке</p>
        <div class="timeline-game">
            <div class="timeline-events" id="timeline-events"></div>
            <div class="timeline-order" id="timeline-order">
                <p>Твой порядок</p>
                <div class="order-slots" id="order-slots"></div>
            </div>
            <div class="word-controls">
                <button class="word-btn" id="reset-timeline">Сбросить</button>
                <button class="word-btn" id="check-timeline">Проверить</button>
            </div>
        </div>
    `;
    
    const eventsContainer = document.getElementById('timeline-events');
    const orderSlots = document.getElementById('order-slots');
    
    function renderEvents() {
        eventsContainer.innerHTML = '';
        shuffledEvents.forEach(event => {
            if (selectedOrder.find(e => e.id === event.id)) return;
            
            const eventEl = document.createElement('div');
            eventEl.className = 'timeline-event';
            eventEl.textContent = event.text;
            eventEl.dataset.id = event.id;
            eventEl.dataset.order = event.order;
            
            eventEl.addEventListener('click', () => {
                if (selectedOrder.length < 5) {
                    selectedOrder.push(event);
                    renderEvents();
                    renderOrder();
                }
            });
            
            eventsContainer.appendChild(eventEl);
        });
    }
    
    function renderOrder() {
        orderSlots.innerHTML = '';
        for (let i = 0; i < 4; i++) {
            const slot = document.createElement('div');
            slot.className = 'order-slot';
            slot.textContent = selectedOrder[i] ? `${i + 1}. ${selectedOrder[i].text}` : `${i + 1}. ...`;
            
            if (selectedOrder[i]) {
                slot.addEventListener('click', () => {
                    selectedOrder.splice(i, 1);
                    renderEvents();
                    renderOrder();
                });
            }
            
            orderSlots.appendChild(slot);
        }
    }
    
    document.getElementById('reset-timeline').addEventListener('click', () => {
        selectedOrder = [];
        renderEvents();
        renderOrder();
    });
    
    document.getElementById('check-timeline').addEventListener('click', () => {
        if (selectedOrder.length < 4) {
            showCatMessage("Расставь все события!");
            return;
        }
        
        let correct = true;
        selectedOrder.forEach((event, index) => {
            if (event.order !== index + 1) correct = false;
        });
        
        if (correct) {
            showCatMessage("Ты помнишь нашу историю! 💖");
            setTimeout(() => completeGame(8, 'А'), 1000);
        } else {
            showCatMessage("Попробуй ещё раз, вспомни как всё было! 💕");
            selectedOrder = [];
            renderEvents();
            renderOrder();
        }
    });
    
    renderEvents();
    renderOrder();
}

// Завершение игры
function completeGame(gameNumber, codeDigit) {
    gamesCompleted[gameNumber - 1] = true;
    
    const container = document.getElementById('game-container');
    container.innerHTML = `
        <h2>🎉 Отлично!</h2>
        <p style="font-size: 1.2rem; margin: 18px 0;">Ты получаешь часть кода</p>
        <div style="font-size: 3.5rem; color: var(--gold); margin: 18px 0; text-shadow: 0 0 20px rgba(212,175,55,0.5);">${codeDigit}</div>
        <p style="font-size: 0.95rem; color: var(--cream); margin-bottom: 22px;">Запиши её в блокнот! 📝</p>
        <button class="magic-btn" onclick="closeGameModal()"><span>Продолжить</span></button>
    `;
    
    const node = document.querySelector(`.game-node[data-game="${gameNumber}"]`);
    node.classList.add('completed');
    
    if (gameNumber < 8) {
        const nextNode = document.querySelector(`.game-node[data-game="${gameNumber + 1}"]`);
        nextNode.classList.remove('locked');
        currentGame = gameNumber + 1;
    }
    
    if (gamesCompleted.every(g => g)) {
        document.getElementById('safe-node').classList.remove('locked');
        showCatMessage("Все игры пройдены! Теперь открой сейф! 🎁");
    } else {
        showCatMessage(getRandomCongrats());
    }
}

function closeGameModal() {
    document.getElementById('game-modal').classList.remove('active');
}

// Вспомогательные функции
function lightenColor(color) {
    const num = parseInt(color.replace('#', ''), 16);
    const amt = 60;
    const R = Math.min(255, (num >> 16) + amt);
    const G = Math.min(255, ((num >> 8) & 0x00FF) + amt);
    const B = Math.min(255, (num & 0x0000FF) + amt);
    return '#' + (0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1);
}

function darkenColor(color) {
    const num = parseInt(color.replace('#', ''), 16);
    const amt = 40;
    const R = Math.max(0, (num >> 16) - amt);
    const G = Math.max(0, ((num >> 8) & 0x00FF) - amt);
    const B = Math.max(0, (num & 0x0000FF) - amt);
    return '#' + (0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1);
}

function getRandomCongrats() {
    const messages = [
        "Умничка! Так держать! 💖",
        "Ты просто звезда! ⭐",
        "Отлично! Продолжай! 🎉",
        "Браво! Ты лучшая! 👏",
        "Супер! Я в тебя верю! 💕",
        "Ты восхитительна! ✨",
        "Так держать, родная! 🌟"
    ];
    return messages[Math.floor(Math.random() * messages.length)];
}

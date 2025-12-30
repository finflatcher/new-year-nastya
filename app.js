// Инициализация приложения
document.addEventListener('DOMContentLoaded', () => {
    createStars();
    createGarlands();
    createSnowflakes();
    createDecorations();
    createSparkles();
    initWelcomeScreen();
    initHelperCat();
    initNotebook();
});

// Письма для почтового ящика
const mailLetters = [
    {
        id: 1,
        title: "Письмо с любовью",
        content: `<h3>💕 Моя любимая!</h3>
            <p>Ты знаешь, я так счастлив, что ты есть в моей жизни.</p>
            <p>Каждый раз, когда я вижу тебя, моё сердце начинает биться быстрее.</p>
            <p>Спасибо, что ты такая замечательная!</p>
            <p style="margin-top: 15px;">Твой Даня 💖</p>`,
        read: false
    },
    {
        id: 2,
        title: "Письмо с благодарностью",
        content: `<h3>🌟 Спасибо тебе!</h3>
            <p>Спасибо за твою улыбку, которая освещает мой день.</p>
            <p>Спасибо за твой смех, который делает меня счастливым.</p>
            <p>Спасибо за то, что ты просто есть рядом.</p>
            <p style="margin-top: 15px;">Люблю тебя! 💕</p>`,
        read: false
    },
    {
        id: 3,
        title: "Письмо с мечтами",
        content: `<h3>✨ Наши мечты</h3>
            <p>Я мечтаю о том, как мы будем вместе...</p>
            <p>Гулять под звёздами, смотреть любимые фильмы, просто быть рядом.</p>
            <p>С тобой любая мечта кажется реальной!</p>
            <p style="margin-top: 15px;">Навсегда твой 🌙</p>`,
        read: false
    },
    {
        id: 4,
        title: "Письмо с комплиментами",
        content: `<h3>💝 Ты прекрасна!</h3>
            <p>Твои глаза сияют ярче всех звёзд на небе.</p>
            <p>Твоя улыбка теплее солнечного луча.</p>
            <p>Ты самая красивая девушка на свете!</p>
            <p style="margin-top: 15px;">Обожаю тебя! 🌹</p>`,
        read: false
    },
    {
        id: 5,
        title: "Письмо с обещанием",
        content: `<h3>💍 Моё обещание</h3>
            <p>Обещаю всегда быть рядом с тобой.</p>
            <p>Обещаю заботиться о тебе и любить тебя.</p>
            <p>Обещаю делать тебя счастливой каждый день!</p>
            <p style="margin-top: 15px;">Твой и только твой 💑</p>`,
        read: false
    }
];

// Фразы Карамельки
const catMessages = {
    general: [
        "С Новым Годом, Настенька! 🎄",
        "Ты самая лучшая! 💖",
        "У тебя всё получится! ⭐",
        "Верю в тебя! 🌟",
        "Ты умничка! 😊",
        "Люблю тебя! ❤️",
        "Пусть этот год будет счастливым! 🎉",
        "Ты прекрасна! 💕",
        "Мур-мур! 🐱",
        "Ты справишься! 💪",
        "Счастья тебе! 🎊",
        "Ты моя звёздочка! ⭐",
        "Обнимаю! 🤗",
        "Ты лучший подарок! 🎁",
        "Не забудь записать код! 📝",
        "Карамелька тебя любит! 🧡",
        "Ты такая милая! 🥰",
        "Удачи в прохождении! 🍀",
        "Я рядом, если что! 😸",
        "Ты очень талантливая! ✨"
    ],
    hints: {
        1: "Подсказка: ищи шары одинакового цвета! Они рядом не всегда 🎄",
        2: "Подсказка: вспомни ваши первые моменты вместе 💝",
        3: "Подсказка: просто нажимай на все подарки по очереди! 🎁",
        4: "Подсказка: составь слово ЛЮБОВЬ для начала 💌",
        5: "Подсказка: запоминай где какие символы! Они парами ⭐",
        6: "Подсказка: внимательно смотри последовательность и повторяй 🔔",
        7: "Подсказка: просто нажимай на кусочки снежинки по порядку ❄",
        8: "Подсказка: подумай, что было раньше, а что позже 💑"
    }
};

// Создание звёздного неба
function createStars() {
    const container = document.getElementById('stars-container');
    const starCount = 100;
    
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        const sizes = ['small', 'medium', 'large'];
        const sizeClass = sizes[Math.floor(Math.random() * sizes.length)];
        star.classList.add(sizeClass);
        
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDuration = (2 + Math.random() * 3) + 's';
        star.style.animationDelay = Math.random() * 3 + 's';
        
        container.appendChild(star);
    }
}

// Создание гирлянд
function createGarlands() {
    const colors = ['red', 'gold', 'green', 'blue', 'pink', 'orange'];
    
    const topGarland = document.getElementById('garland-top');
    for (let i = 0; i < 25; i++) {
        const light = document.createElement('div');
        light.className = 'garland-light ' + colors[i % colors.length];
        light.style.animationDelay = (i * 0.1) + 's';
        topGarland.appendChild(light);
    }
    
    const leftGarland = document.getElementById('garland-left');
    for (let i = 0; i < 15; i++) {
        const light = document.createElement('div');
        light.className = 'garland-light ' + colors[i % colors.length];
        light.style.animationDelay = (i * 0.15) + 's';
        leftGarland.appendChild(light);
    }
    
    const rightGarland = document.getElementById('garland-right');
    for (let i = 0; i < 15; i++) {
        const light = document.createElement('div');
        light.className = 'garland-light ' + colors[(i + 3) % colors.length];
        light.style.animationDelay = (i * 0.15 + 0.5) + 's';
        rightGarland.appendChild(light);
    }
}

// Создание искр
function createSparkles() {
    const container = document.getElementById('sparkles-container');
    
    function addSparkle() {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = Math.random() * 100 + '%';
        sparkle.style.top = (50 + Math.random() * 50) + '%';
        sparkle.style.animationDuration = (2 + Math.random() * 2) + 's';
        
        container.appendChild(sparkle);
        
        setTimeout(() => sparkle.remove(), 4000);
    }
    
    setInterval(addSparkle, 500);
    for (let i = 0; i < 10; i++) {
        setTimeout(addSparkle, i * 200);
    }
}

// Создание снежинок
function createSnowflakes() {
    const container = document.getElementById('snowflakes-container');
    const snowflakeSymbols = ['❄', '❅', '❆', '✻', '✼'];
    
    for (let i = 0; i < 40; i++) {
        const snowflake = document.createElement('div');
        snowflake.className = 'snowflake';
        snowflake.textContent = snowflakeSymbols[Math.floor(Math.random() * snowflakeSymbols.length)];
        snowflake.style.left = Math.random() * 100 + 'vw';
        snowflake.style.animationDuration = (8 + Math.random() * 12) + 's';
        snowflake.style.animationDelay = Math.random() * 10 + 's';
        snowflake.style.fontSize = (0.5 + Math.random() * 0.8) + 'rem';
        snowflake.style.opacity = 0.3 + Math.random() * 0.5;
        container.appendChild(snowflake);
    }
}

// Создание праздничной атрибутики
function createDecorations() {
    const container = document.getElementById('decorations');
    const decorations = [
        { emoji: '🎄', glow: true },
        { emoji: '🎁', glow: true },
        { emoji: '⭐', glow: true },
        { emoji: '🔔', glow: false },
        { emoji: '🎀', glow: false },
        { emoji: '🍬', glow: false },
        { emoji: '🧦', glow: false },
        { emoji: '🕯️', glow: true },
        { emoji: '❄', glow: false },
        { emoji: '☃️', glow: false },
        { emoji: '🌟', glow: true },
        { emoji: '🎅', glow: false },
        { emoji: '✨', glow: true },
        { emoji: '🎊', glow: false },
        { emoji: '🎉', glow: false },
        { emoji: '💫', glow: true },
        { emoji: '🌙', glow: true },
        { emoji: '❤️', glow: true }
    ];
    
    for (let i = 0; i < 35; i++) {
        const deco = document.createElement('div');
        const item = decorations[Math.floor(Math.random() * decorations.length)];
        deco.className = 'decoration' + (item.glow ? ' glow' : '');
        deco.textContent = item.emoji;
        deco.style.left = Math.random() * 100 + '%';
        deco.style.top = Math.random() * 100 + '%';
        deco.style.animationDelay = Math.random() * 8 + 's';
        deco.style.animationDuration = (6 + Math.random() * 4) + 's';
        deco.style.fontSize = (1.2 + Math.random() * 1.8) + 'rem';
        container.appendChild(deco);
    }
}

// Приветственный экран
function initWelcomeScreen() {
    const startBtn = document.getElementById('start-adventure');
    
    startBtn.addEventListener('click', () => {
        showScreen('letter-screen');
        setTimeout(startLetterAnimation, 500);
    });
}

// Переключение экранов
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
}

// Анимация письма
function startLetterAnimation() {
    const envelope = document.getElementById('letter-envelope');
    envelope.classList.remove('hidden');
    envelope.classList.add('fly-in');
    
    setTimeout(() => {
        envelope.classList.remove('fly-in');
        envelope.classList.add('shake');
        
        envelope.addEventListener('click', openEnvelope, { once: true });
    }, 2000);
}

function openEnvelope() {
    const envelope = document.getElementById('letter-envelope');
    const paper = document.getElementById('letter-paper');
    const readBtn = document.getElementById('letter-read-btn');
    const flipHint = document.getElementById('flip-hint');
    
    envelope.classList.remove('shake');
    envelope.classList.add('open');
    
    setTimeout(() => {
        envelope.style.transition = 'all 1s ease';
        envelope.style.transform = 'translateY(-100px) scale(0.8)';
        envelope.style.opacity = '0';
        
        setTimeout(() => {
            envelope.classList.add('hidden');
            paper.classList.remove('hidden');
            paper.style.animation = 'fadeIn 1s ease forwards';
            
            setTimeout(() => {
                flipHint.classList.remove('hidden');
                readBtn.classList.remove('hidden');
            }, 1000);
        }, 500);
    }, 500);
    
    paper.addEventListener('click', () => {
        paper.classList.toggle('flipped');
    });
    
    readBtn.addEventListener('click', () => {
        showScreen('main-screen');
        initMainScreen();
        setTimeout(() => {
            showCatMessage("Привет, Настенька! Я Карамелька! Пройди все игры, чтобы открыть сейф с сюрпризом! 🎁");
        }, 500);
    });
}

// Блокнот
function initNotebook() {
    const toggle = document.getElementById('notebook-toggle');
    const notebook = document.getElementById('notebook');
    const closeBtn = document.getElementById('notebook-close');
    const textarea = document.getElementById('notebook-text');
    
    const savedNotes = localStorage.getItem('nastya-notes');
    if (savedNotes) {
        textarea.value = savedNotes;
    }
    
    toggle.addEventListener('click', () => {
        notebook.classList.toggle('hidden');
    });
    
    closeBtn.addEventListener('click', () => {
        notebook.classList.add('hidden');
    });
    
    textarea.addEventListener('input', () => {
        localStorage.setItem('nastya-notes', textarea.value);
    });
}

// Основной экран
function initMainScreen() {
    const gameNodes = document.querySelectorAll('.game-node');
    
    gameNodes.forEach(node => {
        node.addEventListener('click', () => {
            if (node.classList.contains('locked') || node.classList.contains('completed')) return;
            
            const gameNumber = parseInt(node.dataset.game);
            openGame(gameNumber);
        });
    });
    
    // Почтовый ящик
    document.getElementById('mailbox').addEventListener('click', openMailbox);
    
    // Сейф
    document.getElementById('safe-node').addEventListener('click', () => {
        if (document.getElementById('safe-node').classList.contains('locked')) return;
        openSafeModal();
    });
    
    // Закрытие модальных окон
    document.querySelectorAll('.close-modal').forEach(btn => {
        btn.addEventListener('click', () => {
            btn.closest('.modal').classList.remove('active');
        });
    });
    
    // Открытие сейфа
    document.getElementById('open-safe-btn').addEventListener('click', tryOpenSafe);
}

// Почтовый ящик
function openMailbox() {
    const modal = document.getElementById('mail-modal');
    const mailList = document.getElementById('mail-list');
    
    mailList.innerHTML = '';
    
    mailLetters.forEach(letter => {
        const mailItem = document.createElement('div');
        mailItem.className = 'mail-item' + (letter.read ? ' read' : '');
        mailItem.innerHTML = `
            <span class="mail-item-icon">${letter.read ? '📭' : '💌'}</span>
            <span class="mail-item-text">${letter.title}</span>
        `;
        
        mailItem.addEventListener('click', () => {
            letter.read = true;
            updateMailCount();
            openMailLetter(letter);
        });
        
        mailList.appendChild(mailItem);
    });
    
    modal.classList.add('active');
}

function openMailLetter(letter) {
    document.getElementById('mail-modal').classList.remove('active');
    
    const modal = document.getElementById('read-mail-modal');
    const content = document.getElementById('mail-paper-content');
    
    content.innerHTML = letter.content;
    modal.classList.add('active');
}

function updateMailCount() {
    const unread = mailLetters.filter(l => !l.read).length;
    const countEl = document.getElementById('mail-count');
    
    if (unread > 0) {
        countEl.textContent = unread;
        countEl.style.display = 'flex';
    } else {
        countEl.style.display = 'none';
    }
}

function openGame(gameNumber) {
    const modal = document.getElementById('game-modal');
    modal.classList.add('active');
    
    switch(gameNumber) {
        case 1: startGame1(); break;
        case 2: startGame2(); break;
        case 3: startGame3(); break;
        case 4: startGame4(); break;
        case 5: startGame5(); break;
        case 6: startGame6(); break;
        case 7: startGame7(); break;
        case 8: startGame8(); break;
    }
}

function openSafeModal() {
    document.getElementById('safe-modal').classList.add('active');
    document.getElementById('safe-input').value = '';
    document.getElementById('safe-result').textContent = '';
}

function tryOpenSafe() {
    const input = document.getElementById('safe-input').value.toUpperCase();
    const result = document.getElementById('safe-result');
    
    if (input === SECRET_CODE) {
        result.innerHTML = '<span style="color: #90ee90;">Код верный! 🎉</span>';
        setTimeout(() => {
            document.getElementById('safe-modal').classList.remove('active');
            showFinalScreen();
        }, 1500);
    } else {
        result.innerHTML = '<span style="color: #ff6b6b;">Неверный код. Попробуй ещё!</span>';
        document.getElementById('safe-input').value = '';
    }
}

function showFinalScreen() {
    const modal = document.getElementById('final-modal');
    modal.classList.add('active');
    createConfetti();
    createFireworks();
    showCatMessage("Ура! Ты справилась! С Новым Годом! 🎄❤️");
}

function createConfetti() {
    const container = document.querySelector('.confetti-container');
    const colors = ['#e74c3c', '#27ae60', '#3498db', '#f39c12', '#9b59b6', '#e91e63', '#d4af37'];
    
    for (let i = 0; i < 80; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = Math.random() * 3 + 's';
        confetti.style.animationDuration = (2 + Math.random() * 2) + 's';
        
        if (Math.random() > 0.5) {
            confetti.style.borderRadius = '50%';
        }
        
        container.appendChild(confetti);
    }
}

function createFireworks() {
    const container = document.querySelector('.fireworks');
    container.innerHTML = '🎆 🎇 🎆';
}

// Помощник Карамелька
function initHelperCat() {
    const cat = document.getElementById('helper-cat');
    let lastGameHint = 0;
    
    cat.addEventListener('click', () => {
        // С шансом 30% даём подсказку по текущей игре
        if (currentGame && currentGame <= 8 && Math.random() < 0.3 && !gamesCompleted[currentGame - 1]) {
            showCatMessage(catMessages.hints[currentGame]);
            lastGameHint = currentGame;
        } else {
            const randomMessage = catMessages.general[Math.floor(Math.random() * catMessages.general.length)];
            showCatMessage(randomMessage);
        }
    });
    
    // Периодические сообщения
    setInterval(() => {
        if (Math.random() > 0.75) {
            const randomMessage = catMessages.general[Math.floor(Math.random() * catMessages.general.length)];
            showCatMessage(randomMessage);
        }
    }, 25000);
}

function showCatMessage(message) {
    const bubble = document.getElementById('cat-bubble');
    const messageEl = document.getElementById('cat-message');
    
    messageEl.textContent = message;
    bubble.classList.add('show');
    
    setTimeout(() => {
        bubble.classList.remove('show');
    }, 4000);
}

// Добавляем стиль fadeIn
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
    .attempts-counter {
        color: var(--gold);
        font-size: 0.9rem;
        margin-bottom: 10px;
    }
`;
document.head.appendChild(style);

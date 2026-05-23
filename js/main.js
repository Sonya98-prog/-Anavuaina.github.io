// Получаем настроение из URL
const urlParams = new URLSearchParams(window.location.search);
const mood = urlParams.get('mood');

if (mood && (mood === 'pupsya' || mood === 'suchka')) {
    // Применяем тихий час
    window.quietHourAPI.check();
    window.quietHourAPI.applyToBody();
    window.quietHourAPI.setupGhostWhisper();
    
    // Устанавливаем класс body
    document.body.className = mood + (window.quietHourAPI.isActive ? ' quiet-hour' : '');
    
    // Инициализируем игру
    window.gameAPI.init(mood);
    window.roomAPI.update(mood);
    window.gameAPI.generate();
    
    // Навешиваем кнопку
    document.getElementById('magicBtn').addEventListener('click', () => {
        window.gameAPI.generate();
    });
} else {
    // Если нет настроения в URL — редирект на выбор
    window.location.href = 'index.html';
}

// Если тихий час и нет предсказаний — показываем заглушку
if (window.quietHourAPI && window.quietHourAPI.isActive && mood) {
    if (!document.getElementById('nickname').innerHTML || document.getElementById('nickname').innerHTML === '—') {
        document.getElementById('nickname').innerHTML = '🤫 Тсс... сейчас тихий час';
        document.getElementById('fortune').innerHTML = 'Призрак советует выпить тёплого молока и лечь спать 🌙';
        document.getElementById('quote').innerHTML = '«Сладких снов, маленькая булочка»';
        document.getElementById('emojiIllustration').innerHTML = '👻🌙✨🛌💤';
        document.getElementById('emojiCaption').innerHTML = 'Ночной режим... баю-бай';
    }
}
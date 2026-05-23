window.gameAPI = {
    currentMood: null,
    data: null,
    
    init(mood) {
        this.currentMood = mood;
        this.data = mood === 'pupsya' ? PUPSYA_DATA : SUCHKA_DATA;
        
        // Обновляем заголовки
        if (mood === 'pupsya') {
            document.getElementById('gameTitle').innerHTML = '🐣 ПУПСЯ ДНЯ 🐣';
            document.getElementById('nicknameLabel').innerHTML = '🐽 ТВОЁ ПРОЗВИЩЕ';
            document.getElementById('fortuneLabel').innerHTML = '🔮 ПРЕДСКАЗАНИЕ ДЛЯ ТЕБЯ';
            document.getElementById('quoteLabel').innerHTML = '📜 ТЕПЛАЯ ЦИТАТА';
            document.getElementById('emojiLabel').innerHTML = '🎨 НАСТРОЕНИЕ ДНЯ';
        } else {
            document.getElementById('gameTitle').innerHTML = '🔥 ДЕРЗКАЯ СУЧКА 🔥';
            document.getElementById('nicknameLabel').innerHTML = '🐽 КЛИЧКА НА СЕГОДНЯ';
            document.getElementById('fortuneLabel').innerHTML = '🔮 ПРЕДСКАЗАНИЕ';
            document.getElementById('quoteLabel').innerHTML = '📜 ЦИТАТА';
            document.getElementById('emojiLabel').innerHTML = '🎨 НАСТРОЕНИЕ ДНЯ';
        }
    },
    
    randomItem(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    },
    
    generate() {
        if (!this.data) return;
        
        let nickname = this.randomItem(this.data.nicknames);
        let fortune = this.randomItem(this.data.fortunes);
        let quote = this.randomItem(this.data.quotes);
        let emojiData = this.randomItem(this.data.emojis);
        
        if (window.quietHourAPI && window.quietHourAPI.isActive) {
            nickname = window.quietHourAPI.softenText(nickname, this.currentMood === 'pupsya');
            fortune = window.quietHourAPI.softenText(fortune, this.currentMood === 'pupsya');
            quote = window.quietHourAPI.softenText(quote, this.currentMood === 'pupsya');
            emojiData.emoji = this.currentMood === 'pupsya' ? '🌙✨💤😴🛌' : '🛌😴💤🌙👻';
            emojiData.caption = this.currentMood === 'pupsya' ? 'Сонный режим... баиньки' : 'Даже сучки спят...';
        }
        
        document.getElementById('nickname').innerHTML = nickname;
        document.getElementById('fortune').innerHTML = fortune;
        document.getElementById('quote').innerHTML = quote;
        document.getElementById('emojiIllustration').innerHTML = emojiData.emoji;
        document.getElementById('emojiCaption').innerHTML = emojiData.caption;
        
        if (navigator.vibrate) navigator.vibrate(50);
    }
};
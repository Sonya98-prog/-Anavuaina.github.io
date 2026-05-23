window.quietHourAPI = {
    isActive: false,
    
    check() {
        const now = new Date();
        const hours = now.getHours();
        // ДЛЯ ТЕСТА: верни true, потом поменяй на hours >= 0 && hours < 6
        const active = hours >= 0 && hours < 6;
        this.isActive = active;
        return active;
    },
    
    softenText(text, isPupsyaMode) {
        if (!this.isActive) return text;
        
        const replacements = {
            'нахуй': 'спатки', 'блядь': 'баиньки', 'сука': 'кисонька',
            'пиздец': 'мимими', 'говно': 'печеньки', 'мразь': 'заинька',
            'ёбаный': 'сонный', 'ебучий': 'дремучий', 'хуёвая': 'сонная',
            'депрессивная': 'дремучая', 'террористка': 'сонька'
        };
        
        let softened = text;
        for (let [bad, good] of Object.entries(replacements)) {
            softened = softened.replaceAll(bad, good);
        }
        
        if (isPupsyaMode) {
            softened += ' 🌙✨ Пора укутываться в одеялко.';
        } else {
            softened += ' 😴💤 Даже сучки иногда спят. Укутайся.';
        }
        return softened;
    },
    
    applyToBody() {
        const ghostDiv = document.getElementById('ghost');
        if (this.isActive) {
            if (ghostDiv) ghostDiv.style.display = 'block';
            document.body.classList.add('quiet-hour');
        } else {
            if (ghostDiv) ghostDiv.style.display = 'none';
            document.body.classList.remove('quiet-hour');
        }
    },
    
    setupGhostWhisper() {
        if (!this.isActive) return;
        const magicBtn = document.getElementById('magicBtn');
        const ghostSpeech = document.getElementById('ghostSpeech');
        if (magicBtn && ghostSpeech) {
            magicBtn.addEventListener('click', () => {
                ghostSpeech.style.opacity = '1';
                setTimeout(() => { ghostSpeech.style.opacity = '0.6'; }, 800);
            });
        }
    }
};
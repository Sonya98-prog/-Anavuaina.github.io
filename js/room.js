window.roomAPI = {
    currentMood: null,
    
    update(mood) {
        this.currentMood = mood;
        const container = document.getElementById('roomDecor');
        if (!container) return;
        
        const data = mood === 'pupsya' ? PUPSYA_DATA : SUCHKA_DATA;
        const items = data.roomItems;
        if (!items) return;
        
        container.innerHTML = '';
        items.forEach((item) => {
            const div = document.createElement('div');
            div.className = 'room-item';
            div.innerHTML = `${item.emoji}<span>${item.name}</span>`;
            div.onclick = () => {
                const randomFortune = item.extraFortunes[Math.floor(Math.random() * item.extraFortunes.length)];
                let displayFortune = randomFortune;
                if (window.quietHourAPI && window.quietHourAPI.isActive) {
                    displayFortune = window.quietHourAPI.softenText(displayFortune, mood === 'pupsya');
                }
                window.modalAPI.show(item.emoji, displayFortune);
            };
            container.appendChild(div);
        });
    }
};
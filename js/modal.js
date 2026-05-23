window.modalAPI = {
    show(emoji, text) {
        const modal = document.getElementById('modal');
        const modalEmoji = document.getElementById('modalEmoji');
        const modalText = document.getElementById('modalText');
        modalEmoji.textContent = emoji;
        modalText.textContent = text;
        modal.style.display = 'flex';
        if (navigator.vibrate) navigator.vibrate(50);
    },
    close() {
        document.getElementById('modal').style.display = 'none';
    }
};

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') window.modalAPI.close();
});
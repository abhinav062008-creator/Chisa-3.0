// Wait for avatar states to load
if (typeof AVATAR_STATES === 'undefined') {
    console.error('❌ AVATAR_STATES not loaded - check file path');
    // Show a fallback circle
} else {
    console.log('✅ AVATAR_STATES loaded with:', Object.keys(AVATAR_STATES));
}
document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const messagesArea = document.getElementById('messagesArea');
    const userInput = document.getElementById('userInput');
    const sendBtn = document.getElementById('sendBtn');
    const resetBtn = document.getElementById('resetBtn');
    const typingIndicator = document.getElementById('typingIndicator');
    const voiceIndicator = document.getElementById('voiceIndicator');
    const chisaAvatar = document.getElementById('chisaAvatar');
    const emotionTag = document.getElementById('emotionTag');
    const avatarGlow = document.getElementById('avatarGlow');

    console.log('🌊 Chisa AI - Wuthering Waves Edition');

    // State
    let sessionId = 'session_' + Date.now();
    let voiceEnabled = true;
    let currentEmotion = 'serene';

    // Emotion colors for glow
    const emotionColors = {
        joyful: '#ffd966',
        playful: '#ffaa66',
        concerned: '#6699cc',
        curious: '#88ddff',
        serene: '#aaccff',
        grateful: '#ffaaff',
        welcoming: '#99ccff',
        waving: '#99ccff'
    };

    // Initialize avatar with serene emotion
    function updateAvatar(emotion) {
        if (window.AVATAR_STATES && window.AVATAR_STATES[emotion]) {
            chisaAvatar.innerHTML = window.AVATAR_STATES[emotion].svg;
            emotionTag.textContent = emotion;
            
            // Update glow
            const color = emotionColors[emotion] || emotionColors.serene;
            avatarGlow.style.background = `radial-gradient(circle, ${color}40 0%, transparent 70%)`;
            
            currentEmotion = emotion;
            console.log('🎭 Emotion:', emotion);
        }
    }

    // Load serene initially
    setTimeout(() => updateAvatar('serene'), 100);

    // Event Listeners
    sendBtn.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });
    resetBtn.addEventListener('click', resetChat);

    // Send message
    async function sendMessage() {
        const message = userInput.value.trim();
        if (!message) return;

        // Add user message
        addMessage(message, 'You');
        userInput.value = '';
        typingIndicator.classList.add('active');

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message, sessionId })
            });

            const data = await response.json();
            
            typingIndicator.classList.remove('active');
            addMessage(data.response, 'Chisa');
            
            // Update emotion
            if (data.emotion) {
                updateAvatar(data.emotion);
            }
            
            // Speak response
            if (voiceEnabled) {
                speakText(data.response);
            }

        } catch (error) {
            typingIndicator.classList.remove('active');
            addMessage('The waves are turbulent... ask me again, tidetamer~ 🌊', 'Chisa');
            updateAvatar('concerned');
        }
    }

    // Add message to UI
    function addMessage(text, sender) {
        const msgDiv = document.createElement('div');
        msgDiv.classList.add('message', 'received');
        
        const senderDiv = document.createElement('div');
        senderDiv.classList.add('message-sender');
        senderDiv.textContent = sender;
        
        const bubbleDiv = document.createElement('div');
        bubbleDiv.classList.add('message-bubble');
        bubbleDiv.textContent = text;
        
        msgDiv.appendChild(senderDiv);
        msgDiv.appendChild(bubbleDiv);
        
        messagesArea.appendChild(msgDiv);
        messagesArea.scrollTop = messagesArea.scrollHeight;
    }

    // Anime English voice
    function speakText(text) {
        if (!window.speechSynthesis) return;
        
        window.speechSynthesis.cancel();
        
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US';
        utterance.pitch = 1.5;
        utterance.rate = 0.9;
        utterance.volume = 1;
        
        const voices = window.speechSynthesis.getVoices();
        let voice = voices.find(v => v.name.includes('Samantha'));
        if (!voice) voice = voices.find(v => v.name.includes('Google UK') && v.name.includes('Female'));
        if (!voice) voice = voices.find(v => v.name.includes('Female'));
        
        if (voice) utterance.voice = voice;
        
        utterance.onstart = () => voiceIndicator.classList.add('active');
        utterance.onend = () => voiceIndicator.classList.remove('active');
        utterance.onerror = () => voiceIndicator.classList.remove('active');
        
        window.speechSynthesis.speak(utterance);
    }

    // Reset conversation
    async function resetChat() {
        await fetch('/api/reset', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ sessionId })
        });
        
        messagesArea.innerHTML = '';
        addMessage('🌊 The tide whispers your name... I\'ve been waiting, tidetamer. What mysteries shall we explore?', 'Chisa');
        updateAvatar('serene');
    }

    // Load voices
    window.speechSynthesis.onvoiceschanged = () => {
        console.log('🎤 Voices ready');
    };
});

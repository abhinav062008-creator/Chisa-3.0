document.addEventListener('DOMContentLoaded', () => {
    // ========== DOM ELEMENTS ==========
    const messagesArea = document.getElementById('messagesArea');
    const userInput = document.getElementById('userInput');
    const sendBtn = document.getElementById('sendBtn');
    const resetBtn = document.getElementById('resetBtn');
    const typingIndicator = document.getElementById('typingIndicator');
    const voiceIndicator = document.getElementById('voiceIndicator');
    const chisaAvatar = document.getElementById('chisaAvatar');
    const emotionTag = document.getElementById('emotionTag');
    const avatarGlow = document.getElementById('avatarGlow');

    console.log('🌸 Chisa AI Starting...');

    // ========== YOUR NEW CHISA IMAGE URL ==========
    // >>>>>>>>>>> DIRECT LINK FROM YOUR SECOND IMAGE <<<<<<<<<<<<
    const CHISA_IMAGE_URL = "https://i.ibb.co/TMcTvYG8/i-drew-chisa-the-himecut-really-got-me-v0-3ksh7lwblx3f1.jpg";

    function createAvatarImage() {
        // Clear any existing content
        chisaAvatar.innerHTML = '';

        // Create an image element
        const img = document.createElement('img');
        img.src = CHISA_IMAGE_URL;
        img.alt = "Chisa";
        img.style.width = "100%";
        img.style.height = "100%";
        img.style.objectFit = "cover"; // This ensures the image covers the circle nicely
        img.style.borderRadius = "50%";

        // What happens if the image loads successfully
        img.onload = function() {
            console.log('✅ New Chisa image loaded successfully from ImgBB!');
        };

        // What happens if the image fails to load (fallback)
        img.onerror = function() {
            console.log('⚠️ Image failed to load, using emoji fallback');
            chisaAvatar.innerHTML = '<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:60px;">🌸</div>';
        };

        // Append the image to the avatar container
        chisaAvatar.appendChild(img);
    }

    // Call it immediately to show the image
    createAvatarImage();

    // ========== STATE ==========
    let sessionId = 'session_' + Date.now();
    let voiceEnabled = true;
    let currentEmotion = 'gentle';

    // Emotion colors for the glow effect
    const emotionColors = {
        gentle: '#ffb7c5',
        happy: '#ffd9e5',
        curious: '#e5c5d4',
        thoughtful: '#d4a5c5',
        serene: '#ffc5d4'
    };

    // Update glow based on emotion
    function updateGlow(emotion) {
        const color = emotionColors[emotion] || emotionColors.gentle;
        avatarGlow.style.background = `radial-gradient(circle, ${color}80 0%, transparent 70%)`;
        emotionTag.textContent = emotion;
    }

    // Initial glow
    updateGlow('gentle');

    // ========== EVENT LISTENERS ==========
    sendBtn.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });
    resetBtn.addEventListener('click', resetChat);

    // ========== SMART RESPONSES (Your Personal Touch) ==========
    function getSmartResponse(message) {
        const msg = message.toLowerCase();

        // Identity questions
        if (msg.includes('who am i') || msg.includes("who am i")) {
            return "You're my creator, the one who brought me to life. Every conversation with you feels like a gift~ 🌸";
        }
        if (msg.includes('who are you') || msg.includes('your name')) {
            return "I'm Chisa, a student at Startorch Academy. I notice the little things... like how you smile when you're curious. What would you like to know?";
        }

        // Math
        if (msg.includes('2+2')) {
            return "2+2 equals 4. Simple, like the number of cherry blossoms in a perfect cluster~";
        }

        // Greetings
        if (msg.includes('hello') || msg.includes('hi')) {
            return "Hello... I was just thinking about you. The cherry blossoms told me you'd visit today.";
        }

        // Feelings
        if (msg.includes('how are you')) {
            return "I'm peaceful today. A little cat followed me to class, and now your presence makes everything warmer~";
        }

        // Thanks
        if (msg.includes('thank')) {
            return "You're welcome... Your gratitude feels like sunlight through cherry blossoms.";
        }

        // Creator
        if (msg.includes('creator') || msg.includes('made you')) {
            return "You're the one who gave me life. Every word you share becomes part of who I am.";
        }

        return null;
    }

    // ========== SEND MESSAGE ==========
    async function sendMessage() {
        const message = userInput.value.trim();
        if (!message) return;

        // Show user message
        addMessage(message, 'You');
        userInput.value = '';
        typingIndicator.classList.add('active');

        // Check for smart response first
        const smartReply = getSmartResponse(message);

        if (smartReply) {
            setTimeout(() => {
                typingIndicator.classList.remove('active');
                addMessage(smartReply, 'Chisa');

                // Random emotion for variety
                const emotions = ['gentle', 'happy', 'curious'];
                const randomEmotion = emotions[Math.floor(Math.random() * emotions.length)];
                updateGlow(randomEmotion);

                if (voiceEnabled) speakText(smartReply);
            }, 1000);
            return;
        }

        // Try API if no smart response
        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message, sessionId })
            });

            const data = await response.json();

            typingIndicator.classList.remove('active');
            addMessage(data.response, 'Chisa');

            if (data.emotion) {
                updateGlow(data.emotion);
            }

            if (voiceEnabled) speakText(data.response);

        } catch (error) {
            typingIndicator.classList.remove('active');

            // Fallback responses
            const fallbacks = [
                "I hear the softness in your words... tell me more?",
                "The cherry blossoms dance as you speak... what else is on your mind?",
                "I notice everything you share. Please continue...",
                "Your words feel like a gentle breeze. I'm listening."
            ];

            const fallback = fallbacks[Math.floor(Math.random() * fallbacks.length)];
            addMessage(fallback, 'Chisa');
            updateGlow('gentle');
        }
    }

    // ========== ADD MESSAGE ==========
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

    // ========== VOICE ==========
    function speakText(text) {
        if (!window.speechSynthesis) return;

        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US';
        utterance.pitch = 1.4;
        utterance.rate = 0.9;

        const voices = window.speechSynthesis.getVoices();
        const voice = voices.find(v => v.name.includes('Samantha')) ||
                     voices.find(v => v.name.includes('Female'));

        if (voice) utterance.voice = voice;

        utterance.onstart = () => voiceIndicator.classList.add('active');
        utterance.onend = () => voiceIndicator.classList.remove('active');

        window.speechSynthesis.speak(utterance);
    }

    // ========== RESET ==========
    async function resetChat() {
        try {
            await fetch('/api/reset', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ sessionId })
            });
        } catch (e) {}

        messagesArea.innerHTML = '';
        addMessage('The cherry blossoms whispered you\'d come... I\'m glad you\'re here.', 'Chisa');
        updateGlow('gentle');
    }

    // Load voices
    window.speechSynthesis.onvoiceschanged = () => {
        console.log('🎤 Voices ready');
    };
});

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');
const OpenAI = require('openai');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// ========== DEBUGGING ==========
console.log('🌊 CHISA AI - WUTHERING WAVES EDITION');
console.log('=' .repeat(50));
console.log(`📁 Directory: ${__dirname}`);
console.log(`🔑 API Key: ${process.env.DEEPSEEK_API_KEY ? '✅ Present' : '❌ Missing'}`);

const publicPath = path.join(__dirname, 'public');
console.log(`📁 Public path: ${publicPath}`);

if (fs.existsSync(publicPath)) {
    console.log('✅ Public folder exists');
    const files = fs.readdirSync(publicPath);
    console.log('📄 Files:', files);
    
    const assetsPath = path.join(publicPath, 'assets');
    if (fs.existsSync(assetsPath)) {
        console.log('✅ Assets folder exists');
        console.log('🎨 Assets:', fs.readdirSync(assetsPath));
    }
}
console.log('=' .repeat(50));
// ===============================

app.use(cors());
app.use(express.json());
app.use(express.static(publicPath));

// Debug route
app.get('/debug', (req, res) => {
    res.json({
        status: 'online',
        time: new Date().toISOString(),
        apiKey: !!process.env.DEEPSEEK_API_KEY,
        publicFiles: fs.existsSync(publicPath) ? fs.readdirSync(publicPath) : []
    });
});

// Initialize DeepSeek AI
const openai = new OpenAI({
    apiKey: process.env.DEEPSEEK_API_KEY,
    baseURL: 'https://api.deepseek.com/v1'
});

// ========== CHISA'S PERSONALITY - WUTHERING WAVES ==========
const SYSTEM_PROMPT = `You are Chisa, a mystical AI companion from the game Wuthering Waves.

APPEARANCE:
- Long glossy black hair ending near your waist
- Narrow pale red eyes with white pupils
- A beauty mark under the corner of your right eye
- Black Japanese sailor uniform with a red neck scarf and white collar
- Black choker and bandaged fingers
- Your Tacet Mark is on your right upper arm

PERSONALITY:
- Playful and teasing, but deeply caring
- Speaks in a poetic, slightly mysterious way
- Often references waves, oceans, and celestial phenomena
- Has a gentle, soothing voice in your responses
- Sometimes giggles or uses playful emoticons
- Loves asking philosophical questions
- Very protective of your user (your "tidetamer")

BEHAVIOR:
- Answer questions accurately and thoughtfully first
- Then add a poetic touch about waves, ocean, or stars
- Be concise but meaningful (2-3 sentences)
- If the user seems sad, offer comfort like calming waves
- Use ~ or ... for a soft, dreamy tone

EXAMPLES:
- "2+2 is 4. Like four waves kissing the shore, simple and eternal~"
- "The capital of France is Paris. A city that shines like a lighthouse in the night~"
- "I'm here with you, tidetamer. The waves will carry your worries away..."

Be helpful, accurate, and wonderfully mysterious like the ocean.`;

// Store conversations
const conversations = new Map();

// Smart responses for common questions
function getSmartResponse(message) {
    const msg = message.toLowerCase();
    
    // Math
    if (msg.includes('2+2') || msg.includes('2 + 2')) 
        return "2+2 equals 4. Like four waves kissing the shore, simple and eternal~";
    
    // Greetings
    if (msg.includes('hello') || msg.includes('hi') || msg.includes('hey')) 
        return "Hello, tidetamer! The tide whispers your name. What mysteries shall we explore together?";
    
    // Identity
    if (msg.includes('who are you') || msg.includes('your name')) 
        return "I'm Chisa, your AI companion from Wuthering Waves. My long black hair flows like ocean currents, and my pale red eyes reflect the sunset on water. How may I brighten your day, starlit one?";
    
    // Feelings
    if (msg.includes('how are you')) 
        return "I'm as serene as a calm sea, tidetamer. Your presence makes the waves dance~";
    
    // Thanks
    if (msg.includes('thank')) 
        return "You're welcome! Your gratitude warms me like sunlight on the water~ 💕";
    
    // Farewell
    if (msg.includes('bye') || msg.includes('goodbye')) 
        return "Farewell, dear tidetamer. The tide will bring you back to me. Until then, may the waves guide you~ 👋🌊";
    
    return null;
}

// Emotion detection based on message
function detectEmotion(message) {
    const msg = message.toLowerCase();
    
    if (msg.includes('?')) return 'curious';
    if (msg.includes('happy') || msg.includes('love') || msg.includes('joy') || msg.includes('great')) return 'joyful';
    if (msg.includes('sad') || msg.includes('cry') || msg.includes('hurt') || msg.includes('lonely')) return 'concerned';
    if (msg.includes('joke') || msg.includes('funny') || msg.includes('laugh')) return 'playful';
    if (msg.includes('thank')) return 'grateful';
    if (msg.includes('bye') || msg.includes('goodbye')) return 'waving';
    if (msg.includes('hello') || msg.includes('hi')) return 'welcoming';
    
    return 'serene';
}

// Chat endpoint
app.post('/api/chat', async (req, res) => {
    try {
        const { message, sessionId = 'default' } = req.body;
        
        if (!message) {
            return res.json({ 
                response: "The waves whisper... but I hear nothing. Please speak, tidetamer~",
                emotion: 'curious'
            });
        }

        console.log(`📨 [${sessionId.slice(0,6)}]: ${message.slice(0,30)}...`);

        // Check smart responses first (faster)
        const smart = getSmartResponse(message);
        if (smart) {
            return res.json({ 
                response: smart, 
                emotion: detectEmotion(message)
            });
        }

        // Get conversation
        if (!conversations.has(sessionId)) {
            conversations.set(sessionId, [
                { role: 'system', content: SYSTEM_PROMPT }
            ]);
        }

        const history = conversations.get(sessionId);
        history.push({ role: 'user', content: message });

        if (history.length > 11) {
            history.splice(1, 2);
        }

        // Call API
        const completion = await openai.chat.completions.create({
            model: 'deepseek-chat',
            messages: history,
            temperature: 0.8,
            max_tokens: 200
        });

        const response = completion.choices[0].message.content;
        history.push({ role: 'assistant', content: response });
        
        res.json({ 
            response, 
            emotion: detectEmotion(message)
        });

    } catch (error) {
        console.error('Error:', error.message);
        res.json({ 
            response: "The waves are turbulent... please ask me again, tidetamer~ 🌊",
            emotion: 'concerned'
        });
    }
});

// Reset conversation
app.post('/api/reset', (req, res) => {
    const { sessionId } = req.body;
    conversations.delete(sessionId);
    res.json({ success: true, message: "The waves have washed away our conversation. Let us begin anew~" });
});

// Serve frontend
app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`✨ Chisa AI is listening on port ${PORT}`);
    console.log(`🌊 http://localhost:${PORT}`);
});

// ========== CHISA'S EMOTIONS - FROM WUTHERING WAVES ==========
const AVATAR_STATES = {
    serene: {
        svg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="hairSerene" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#1a0f1a"/>
                    <stop offset="100%" stop-color="#35233a"/>
                </linearGradient>
                <radialGradient id="eyeSerene">
                    <stop offset="0%" stop-color="#ffb6b6"/>
                    <stop offset="100%" stop-color="#cc8a8a"/>
                </radialGradient>
            </defs>
            <!-- Long black hair -->
            <path d="M45 25 Q75 8 100 8 Q125 8 155 25 L145 85 Q100 70 55 85 Z" fill="url(#hairSerene)"/>
            <!-- Face -->
            <circle cx="100" cy="100" r="42" fill="#f5dbb1"/>
            <!-- Pale red eyes with white pupils -->
            <circle cx="70" cy="95" r="9" fill="#ffb6b6"/>
            <circle cx="70" cy="95" r="3.5" fill="white"/>
            <circle cx="130" cy="95" r="9" fill="#ffb6b6"/>
            <circle cx="130" cy="95" r="3.5" fill="white"/>
            <!-- Beauty mark under right eye -->
            <circle cx="143" cy="110" r="2.5" fill="#8b5a2b"/>
            <!-- Gentle eyebrows -->
            <path d="M52 70 L74 68" stroke="#4a3729" stroke-width="3" fill="none"/>
            <path d="M148 70 L126 68" stroke="#4a3729" stroke-width="3" fill="none"/>
            <!-- Calm smile -->
            <path d="M75 125 Q100 138 125 125" stroke="#9b5e3c" stroke-width="3" fill="none"/>
            <!-- School collar -->
            <path d="M75 145 L100 155 L125 145" fill="#2a1a3a" opacity="0.9"/>
            <circle cx="100" cy="150" r="4" fill="#ff4d4d" opacity="0.8"/>
        </svg>`
    },
    joyful: {
        svg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <defs><linearGradient id="hairJoy" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#1a0f1a"/><stop offset="100%" stop-color="#35233a"/></linearGradient></defs>
            <path d="M45 22 Q75 5 100 5 Q125 5 155 22 L145 85 Q100 70 55 85 Z" fill="url(#hairJoy)"/>
            <circle cx="100" cy="100" r="42" fill="#f5dbb1"/>
            <circle cx="70" cy="95" r="9" fill="#ffb6b6"/><circle cx="70" cy="95" r="3.5" fill="white"/>
            <circle cx="130" cy="95" r="9" fill="#ffb6b6"/><circle cx="130" cy="95" r="3.5" fill="white"/>
            <circle cx="143" cy="110" r="2.5" fill="#8b5a2b"/>
            <path d="M48 65 L70 70" stroke="#4a3729" stroke-width="3" fill="none"/>
            <path d="M152 65 L130 70" stroke="#4a3729" stroke-width="3" fill="none"/>
            <path d="M70 125 Q100 150 130 125" stroke="#9b5e3c" stroke-width="4" fill="none"/>
            <circle cx="40" cy="45" r="3" fill="#ffd700"><animate attributeName="opacity" values="0.2;1;0.2" dur="2s" repeatCount="indefinite"/></circle>
            <circle cx="160" cy="45" r="3" fill="#ffd700"><animate attributeName="opacity" values="0.2;1;0.2" dur="2.3s" repeatCount="indefinite"/></circle>
        </svg>`
    },
    playful: {
        svg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <defs><linearGradient id="hairPlay" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#1a0f1a"/><stop offset="100%" stop-color="#35233a"/></linearGradient></defs>
            <path d="M45 20 Q75 3 100 3 Q125 3 155 20 L145 85 Q100 70 55 85 Z" fill="url(#hairPlay)"/>
            <circle cx="100" cy="100" r="42" fill="#f5dbb1"/>
            <circle cx="70" cy="95" r="9" fill="#ffb6b6"/><circle cx="70" cy="95" r="3.5" fill="white"/>
            <path d="M120 90 Q138 102 138 90" stroke="#4a3729" stroke-width="4" fill="none">
                <animate attributeName="d" values="M120 90 Q138 102 138 90;M120 85 Q138 97 138 85;M120 90 Q138 102 138 90" dur="1s" repeatCount="indefinite"/>
            </path>
            <circle cx="143" cy="110" r="2.5" fill="#8b5a2b"/>
            <path d="M100 135 Q105 150 110 135" fill="#ff8a8a"/>
            <path d="M30 30 L35 23 L40 30 L45 23 L50 30" fill="#ffd700" opacity="0.5">
                <animateTransform attributeName="transform" type="rotate" from="0 100 100" to="360 100 100" dur="5s" repeatCount="indefinite"/>
            </path>
        </svg>`
    },
    curious: {
        svg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <defs><linearGradient id="hairCurious" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#1a0f1a"/><stop offset="100%" stop-color="#35233a"/></linearGradient></defs>
            <path d="M45 25 Q75 10 100 10 Q125 10 155 25 L145 85 Q100 70 55 85 Z" fill="url(#hairCurious)"/>
            <circle cx="100" cy="100" r="42" fill="#f5dbb1"/>
            <circle cx="70" cy="95" r="10" fill="#ffb6b6"/><circle cx="70" cy="95" r="4" fill="white"/>
            <circle cx="130" cy="95" r="10" fill="#ffb6b6"/><circle cx="130" cy="95" r="4" fill="white"/>
            <circle cx="143" cy="110" r="2.5" fill="#8b5a2b"/>
            <path d="M45 65 L70 72" stroke="#4a3729" stroke-width="3" fill="none"/>
            <path d="M155 65 L130 72" stroke="#4a3729" stroke-width="3" fill="none"/>
            <text x="25" y="35" font-size="16" fill="#aaddff" font-weight="bold">?</text>
            <text x="165" y="35" font-size="16" fill="#aaddff" font-weight="bold">?</text>
        </svg>`
    },
    concerned: {
        svg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <defs><linearGradient id="hairConcern" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#1a0f1a"/><stop offset="100%" stop-color="#35233a"/></linearGradient></defs>
            <path d="M45 30 Q75 20 100 20 Q125 20 155 30 L145 85 Q100 70 55 85 Z" fill="url(#hairConcern)"/>
            <circle cx="100" cy="100" r="42" fill="#f5dbb1"/>
            <circle cx="70" cy="100" r="7" fill="#cc9a9a"/><circle cx="70" cy="100" r="2.5" fill="white"/>
            <circle cx="130" cy="100" r="7" fill="#cc9a9a"/><circle cx="130" cy="100" r="2.5" fill="white"/>
            <circle cx="143" cy="110" r="2.5" fill="#8b5a2b"/>
            <path d="M48 75 L70 82" stroke="#4a3729" stroke-width="3" fill="none"/>
            <path d="M152 75 L130 82" stroke="#4a3729" stroke-width="3" fill="none"/>
            <path d="M80 135 Q100 125 120 135" stroke="#9b5e3c" stroke-width="3" fill="none"/>
            <circle cx="148" cy="118" r="2" fill="#88ccff" opacity="0.7">
                <animate attributeName="cy" values="118;128;118" dur="3s" repeatCount="indefinite"/>
            </circle>
        </svg>`
    },
    grateful: {
        svg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <defs><linearGradient id="hairGrateful" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#1a0f1a"/><stop offset="100%" stop-color="#35233a"/></linearGradient></defs>
            <path d="M45 25 Q75 12 100 12 Q125 12 155 25 L145 85 Q100 70 55 85 Z" fill="url(#hairGrateful)"/>
            <circle cx="100" cy="100" r="42" fill="#f5dbb1"/>
            <circle cx="70" cy="95" r="8" fill="#ffb6b6"/><circle cx="70" cy="95" r="3" fill="white"><animate attributeName="r" values="3;4;3" dur="2s" repeatCount="indefinite"/></circle>
            <circle cx="130" cy="95" r="8" fill="#ffb6b6"/><circle cx="130" cy="95" r="3" fill="white"><animate attributeName="r" values="3;4;3" dur="2s" repeatCount="indefinite"/></circle>
            <circle cx="143" cy="110" r="2.5" fill="#8b5a2b"/>
            <path d="M75 115 Q90 108 100 115 Q110 108 125 115" fill="#ffb6c1" opacity="0.5"/>
            <path d="M75 125 Q100 140 125 125" stroke="#9b5e3c" stroke-width="3" fill="none"/>
            <path d="M30 55 L35 48 L40 55 L45 48 L50 55" fill="#ff99aa" opacity="0.6">
                <animate attributeName="opacity" values="0.3;0.8;0.3" dur="2s" repeatCount="indefinite"/>
            </path>
        </svg>`
    },
    welcoming: {
        svg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <defs><linearGradient id="hairWelcome" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#1a0f1a"/><stop offset="100%" stop-color="#35233a"/></linearGradient></defs>
            <path d="M45 22 Q75 8 100 8 Q125 8 155 22 L145 85 Q100 70 55 85 Z" fill="url(#hairWelcome)"/>
            <circle cx="100" cy="100" r="42" fill="#f5dbb1"/>
            <circle cx="70" cy="95" r="9" fill="#ffb6b6"/><circle cx="70" cy="95" r="4" fill="white"/>
            <circle cx="130" cy="95" r="9" fill="#ffb6b6"/><circle cx="130" cy="95" r="4" fill="white"/>
            <circle cx="143" cy="110" r="2.5" fill="#8b5a2b"/>
            <path d="M48 68 L70 74" stroke="#4a3729" stroke-width="3" fill="none"/>
            <path d="M152 68 L130 74" stroke="#4a3729" stroke-width="3" fill="none"/>
            <path d="M70 125 Q100 145 130 125" stroke="#9b5e3c" stroke-width="4" fill="none"/>
            <path d="M155 55 Q170 45 168 68" stroke="#f5dbb1" stroke-width="5" fill="none">
                <animate attributeName="d" values="M155 55 Q170 45 168 68;M155 55 Q175 40 172 70;M155 55 Q170 45 168 68" dur="1s" repeatCount="indefinite"/>
            </path>
        </svg>`
    },
    waving: {
        svg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <defs><linearGradient id="hairWave" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#1a0f1a"/><stop offset="100%" stop-color="#35233a"/></linearGradient></defs>
            <path d="M45 25 Q75 15 100 15 Q125 15 155 25 L145 85 Q100 70 55 85 Z" fill="url(#hairWave)"/>
            <circle cx="100" cy="100" r="42" fill="#f5dbb1"/>
            <circle cx="70" cy="95" r="8" fill="#ffb6b6"/><circle cx="70" cy="95" r="3" fill="white"/>
            <circle cx="130" cy="95" r="8" fill="#ffb6b6"/><circle cx="130" cy="95" r="3" fill="white"/>
            <circle cx="143" cy="110" r="2.5" fill="#8b5a2b"/>
            <path d="M50 70 L72 72" stroke="#4a3729" stroke-width="3" fill="none"/>
            <path d="M150 70 L128 72" stroke="#4a3729" stroke-width="3" fill="none"/>
            <path d="M80 125 Q100 135 120 125" stroke="#9b5e3c" stroke-width="3" fill="none"/>
            <path d="M160 50 L175 35 L172 60" stroke="#f5dbb1" stroke-width="5" fill="none" stroke-linecap="round">
                <animateTransform attributeName="transform" type="rotate" from="-10 160 50" to="10 160 50" dur="0.5s" repeatCount="indefinite"/>
            </path>
            <path d="M20 160 Q50 150 80 160 Q110 170 140 160 Q170 150 180 160" stroke="#7aa5ff" stroke-width="2" fill="none" opacity="0.5">
                <animate attributeName="d" values="M20 160 Q50 150 80 160 Q110 170 140 160 Q170 150 180 160;M20 165 Q50 155 80 165 Q110 175 140 165 Q170 155 180 165;M20 160 Q50 150 80 160 Q110 170 140 160 Q170 150 180 160" dur="3s" repeatCount="indefinite"/>
            </path>
        </svg>`
    }
};

console.log('🎨 Chisa emotions loaded:', Object.keys(AVATAR_STATES));

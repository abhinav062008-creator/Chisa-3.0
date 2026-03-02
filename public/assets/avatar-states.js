// ========== CHISA AVATAR STATES - USING YOUR REAL IMAGE ==========
// This file now provides a simple structure and uses your image URL.

const AVATAR_STATES = {
    // The 'serene' state will be the default look for your image.
    // Since it's a real photo, the expression won't change with code,
    // but this setup keeps the emotion system working for the UI.
    serene: {
        // The imageUrl will be used by script.js to display your drawing.
        imageUrl: "https://i.ibb.co/TMcTvYG8/i-drew-chisa-the-himecut-really-got-me-v0-3ksh7lwblx3f1.jpg",
        // We keep a simple SVG fallback, but your image is the star.
        svg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <circle cx="100" cy="100" r="95" fill="#ffb7c5"/>
            <text x="100" y="120" font-size="30" text-anchor="middle" fill="white" font-weight="bold">🌸</text>
            <text x="100" y="150" font-size="20" text-anchor="middle" fill="white">CHISA</text>
        </svg>`
    },
    // For simplicity, all emotions will use the same image.
    // This is perfect because your drawing is the definitive Chisa.
    gentle: {
        imageUrl: "https://i.ibb.co/TMcTvYG8/i-drew-chisa-the-himecut-really-got-me-v0-3ksh7lwblx3f1.jpg",
        svg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <circle cx="100" cy="100" r="95" fill="#ffb7c5"/>
            <text x="100" y="120" font-size="30" text-anchor="middle" fill="white" font-weight="bold">🌸</text>
            <text x="100" y="150" font-size="20" text-anchor="middle" fill="white">CHISA</text>
        </svg>`
    },
    happy: {
        imageUrl: "https://i.ibb.co/TMcTvYG8/i-drew-chisa-the-himecut-really-got-me-v0-3ksh7lwblx3f1.jpg",
        svg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <circle cx="100" cy="100" r="95" fill="#ffb7c5"/>
            <text x="100" y="120" font-size="30" text-anchor="middle" fill="white" font-weight="bold">🌸</text>
            <text x="100" y="150" font-size="20" text-anchor="middle" fill="white">CHISA</text>
        </svg>`
    },
    curious: {
        imageUrl: "https://i.ibb.co/TMcTvYG8/i-drew-chisa-the-himecut-really-got-me-v0-3ksh7lwblx3f1.jpg",
        svg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <circle cx="100" cy="100" r="95" fill="#ffb7c5"/>
            <text x="100" y="120" font-size="30" text-anchor="middle" fill="white" font-weight="bold">🌸</text>
            <text x="100" y="150" font-size="20" text-anchor="middle" fill="white">CHISA</text>
        </svg>`
    },
    thoughtful: {
        imageUrl: "https://i.ibb.co/TMcTvYG8/i-drew-chisa-the-himecut-really-got-me-v0-3ksh7lwblx3f1.jpg",
        svg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <circle cx="100" cy="100" r="95" fill="#ffb7c5"/>
            <text x="100" y="120" font-size="30" text-anchor="middle" fill="white" font-weight="bold">🌸</text>
            <text x="100" y="150" font-size="20" text-anchor="middle" fill="white">CHISA</text>
        </svg>`
    }
};

console.log('✅ Avatar states updated with your new Chisa drawing!');

// DOM Elements
const navbar = document.querySelector('.navbar');
const searchInput = document.querySelector('.search-input');
const contentCards = document.querySelectorAll('.content-card');
const playButtons = document.querySelectorAll('.play-btn');
const infoButtons = document.querySelectorAll('.info-btn');
const likeButtons = document.querySelectorAll('.like-btn');
const heroButtons = document.querySelectorAll('.btn');

// Navbar scroll effect
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    
    if (currentScrollY > 100) {
        navbar.style.background = 'rgba(0, 0, 0, 0.98)';
        navbar.style.backdropFilter = 'blur(20px)';
    } else {
        navbar.style.background = 'rgba(0, 0, 0, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    }
    
    if (currentScrollY > lastScrollY && currentScrollY > 300) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    
    lastScrollY = currentScrollY;
});

// Search functionality
searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    
    contentCards.forEach(card => {
        const title = card.dataset.title?.toLowerCase() || '';
        const genre = card.dataset.genre?.toLowerCase() || '';
        const year = card.dataset.year?.toLowerCase() || '';
        
        const isMatch = title.includes(searchTerm) || 
                       genre.includes(searchTerm) || 
                       year.includes(searchTerm);
        
        if (isMatch || searchTerm === '') {
            card.style.display = 'block';
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
        } else {
            card.style.opacity = '0.3';
            card.style.transform = 'scale(0.9)';
        }
    });
});

// Search input focus effects
searchInput.addEventListener('focus', () => {
    searchInput.parentElement.style.transform = 'scale(1.05)';
});

searchInput.addEventListener('blur', () => {
    searchInput.parentElement.style.transform = 'scale(1)';
});

// Content card interactions
contentCards.forEach((card, index) => {
    // Add hover sound effect simulation
    card.addEventListener('mouseenter', () => {
        // Simulate futuristic hover sound
        playHoverSound();
        
        // Add subtle glow effect
        card.style.filter = 'brightness(1.1)';
        
        // Animate other cards
        contentCards.forEach((otherCard, otherIndex) => {
            if (otherIndex !== index) {
                otherCard.style.opacity = '0.7';
                otherCard.style.transform = 'scale(0.95)';
            }
        });
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.filter = 'brightness(1)';
        
        // Reset other cards
        contentCards.forEach(otherCard => {
            otherCard.style.opacity = '1';
            otherCard.style.transform = 'scale(1)';
        });
    });
    
    // Add click animation
    card.addEventListener('click', (e) => {
        if (!e.target.closest('button')) {
            playClickSound();
            showContentPreview(card);
        }
    });
});

// Button interactions
playButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.stopPropagation();
        playClickSound();
        playContent(e.target.closest('.content-card'));
    });
});

infoButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.stopPropagation();
        playClickSound();
        showContentInfo(e.target.closest('.content-card'));
    });
});

likeButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.stopPropagation();
        playClickSound();
        toggleLike(button);
    });
});

// Hero button interactions
heroButtons.forEach(button => {
    button.addEventListener('click', () => {
        playClickSound();
        
        if (button.textContent.includes('Start Watching')) {
            startWatching();
        } else {
            showMoreInfo();
        }
    });
});

// Navigation link smooth scrolling
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Functions
function playHoverSound() {
    // Simulate futuristic hover sound effect
    console.log('🎵 Hover sound effect');
}

function playClickSound() {
    // Simulate futuristic click sound effect
    console.log('🔊 Click sound effect');
    
    // Visual feedback
    document.body.style.transform = 'scale(0.999)';
    setTimeout(() => {
        document.body.style.transform = 'scale(1)';
    }, 100);
}

function playContent(card) {
    const title = card.dataset.title;
    const genre = card.dataset.genre;
    const year = card.dataset.year;
    
    showNotification(`🎬 Playing: ${title}`, 'success');
    
    // Create fullscreen overlay
    createVideoPlayer(title, genre, year);
}

function showContentInfo(card) {
    const title = card.dataset.title;
    const genre = card.dataset.genre;
    const year = card.dataset.year;
    
    showModal({
        title: title,
        year: year,
        genre: genre,
        description: `Experience the future of ${genre.toLowerCase()} entertainment with ${title}. This ${year} production features cutting-edge storytelling and immersive visuals that will transport you to another dimension.`,
        rating: '★★★★☆',
        duration: '2h 15m',
        quality: '4K Ultra HD'
    });
}

function showContentPreview(card) {
    const title = card.dataset.title;
    showNotification(`📺 Preview: ${title}`, 'info');
    
    // Add preview animation
    card.style.animation = 'pulse 0.5s ease-in-out';
    setTimeout(() => {
        card.style.animation = '';
    }, 500);
}

function toggleLike(button) {
    const isLiked = button.classList.contains('liked');
    
    if (isLiked) {
        button.classList.remove('liked');
        button.innerHTML = '<i class="fas fa-heart"></i>';
        button.style.color = '#00ffff';
        showNotification('💔 Removed from favorites', 'info');
    } else {
        button.classList.add('liked');
        button.innerHTML = '<i class="fas fa-heart"></i>';
        button.style.color = '#ff0066';
        showNotification('❤️ Added to favorites', 'success');
        
        // Heart animation
        button.style.animation = 'pulse 0.3s ease-in-out';
        setTimeout(() => {
            button.style.animation = '';
        }, 300);
    }
}

function startWatching() {
    showNotification('🚀 Welcome to the future of streaming!', 'success');
    
    // Scroll to trending section
    document.querySelector('#trending').scrollIntoView({
        behavior: 'smooth'
    });
}

function showMoreInfo() {
    showModal({
        title: 'VYNIX - Future of Entertainment',
        description: 'Step into tomorrow with our revolutionary streaming platform. Experience movies and series like never before with our cutting-edge technology, featuring 4K streaming, HDR support, and AI-powered recommendations that adapt to your preferences.',
        features: [
            '🎯 AI-Powered Recommendations',
            '📺 4K Ultra HD Streaming',
            '🌈 HDR & Dolby Vision Support',
            '🎵 Immersive Audio Experience',
            '📱 Multi-Device Synchronization',
            '🚀 Future-Ready Technology'
        ]
    });
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Styling
    Object.assign(notification.style, {
        position: 'fixed',
        top: '100px',
        right: '20px',
        background: type === 'success' ? 'linear-gradient(45deg, #00ff88, #004422)' : 
                   type === 'error' ? 'linear-gradient(45deg, #ff0066, #660033)' : 
                   'linear-gradient(45deg, #00ffff, #0066ff)',
        color: '#ffffff',
        padding: '1rem 1.5rem',
        borderRadius: '10px',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
        zIndex: '10000',
        fontFamily: 'Exo 2, sans-serif',
        fontWeight: '600',
        transform: 'translateX(400px)',
        transition: 'all 0.3s ease',
        backdropFilter: 'blur(10px)'
    });
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

function showModal(content) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>${content.title}</h2>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                ${content.year ? `<p><strong>Year:</strong> ${content.year}</p>` : ''}
                ${content.genre ? `<p><strong>Genre:</strong> ${content.genre}</p>` : ''}
                ${content.rating ? `<p><strong>Rating:</strong> ${content.rating}</p>` : ''}
                ${content.duration ? `<p><strong>Duration:</strong> ${content.duration}</p>` : ''}
                ${content.quality ? `<p><strong>Quality:</strong> ${content.quality}</p>` : ''}
                <p>${content.description}</p>
                ${content.features ? `
                    <div class="features">
                        <h3>Features:</h3>
                        <ul>
                            ${content.features.map(feature => `<li>${feature}</li>`).join('')}
                        </ul>
                    </div>
                ` : ''}
            </div>
            <div class="modal-footer">
                <button class="btn btn-primary modal-play">
                    <i class="fas fa-play"></i> Play Now
                </button>
                <button class="btn btn-secondary modal-close-btn">Close</button>
            </div>
        </div>
    `;
    
    // Styling
    const style = document.createElement('style');
    style.textContent = `
        .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            backdrop-filter: blur(10px);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        
        .modal-content {
            background: linear-gradient(135deg, rgba(0, 17, 34, 0.95), rgba(0, 34, 68, 0.95));
            border: 1px solid rgba(0, 255, 255, 0.3);
            border-radius: 15px;
            max-width: 600px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
            transform: scale(0.7);
            transition: transform 0.3s ease;
        }
        
        .modal-header {
            padding: 1.5rem;
            border-bottom: 1px solid rgba(0, 255, 255, 0.2);
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .modal-header h2 {
            font-family: 'Orbitron', monospace;
            color: #00ffff;
            margin: 0;
        }
        
        .modal-close {
            background: none;
            border: none;
            color: #ffffff;
            font-size: 2rem;
            cursor: pointer;
            transition: color 0.3s ease;
        }
        
        .modal-close:hover {
            color: #00ffff;
        }
        
        .modal-body {
            padding: 1.5rem;
            color: #ffffff;
        }
        
        .modal-body p {
            margin-bottom: 1rem;
            line-height: 1.6;
        }
        
        .modal-body strong {
            color: #00ffff;
        }
        
        .features ul {
            list-style: none;
            padding: 0;
        }
        
        .features li {
            padding: 0.5rem 0;
            border-bottom: 1px solid rgba(0, 255, 255, 0.1);
        }
        
        .modal-footer {
            padding: 1.5rem;
            border-top: 1px solid rgba(0, 255, 255, 0.2);
            display: flex;
            gap: 1rem;
            justify-content: flex-end;
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(modal);
    
    // Animate in
    setTimeout(() => {
        modal.style.opacity = '1';
        modal.querySelector('.modal-content').style.transform = 'scale(1)';
    }, 10);
    
    // Close handlers
    modal.querySelector('.modal-close').addEventListener('click', closeModal);
    modal.querySelector('.modal-close-btn').addEventListener('click', closeModal);
    modal.querySelector('.modal-play').addEventListener('click', () => {
        showNotification('🎬 Starting playback...', 'success');
        closeModal();
    });
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    
    function closeModal() {
        modal.style.opacity = '0';
        modal.querySelector('.modal-content').style.transform = 'scale(0.7)';
        setTimeout(() => {
            if (modal.parentNode) {
                modal.parentNode.removeChild(modal);
                document.head.removeChild(style);
            }
        }, 300);
    }
}

function createVideoPlayer(title, genre, year) {
    const player = document.createElement('div');
    player.className = 'video-player-overlay';
    
    player.innerHTML = `
        <div class="video-player">
            <div class="player-header">
                <h3>${title} (${year})</h3>
                <button class="player-close">&times;</button>
            </div>
            <div class="player-content">
                <div class="fake-video">
                    <div class="video-placeholder">
                        <i class="fas fa-play-circle"></i>
                        <p>Streaming ${title}...</p>
                        <div class="loading-bar">
                            <div class="loading-progress"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="player-controls">
                <button class="control-btn"><i class="fas fa-play"></i></button>
                <button class="control-btn"><i class="fas fa-pause"></i></button>
                <button class="control-btn"><i class="fas fa-volume-up"></i></button>
                <div class="progress-bar">
                    <div class="progress"></div>
                </div>
                <button class="control-btn"><i class="fas fa-expand"></i></button>
            </div>
        </div>
    `;
    
    // Styling
    const style = document.createElement('style');
    style.textContent = `
        .video-player-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.95);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .video-player {
            width: 90%;
            max-width: 1200px;
            background: #000000;
            border: 2px solid #00ffff;
            border-radius: 10px;
            overflow: hidden;
        }
        
        .player-header {
            background: linear-gradient(45deg, #001122, #002244);
            padding: 1rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid #00ffff;
        }
        
        .player-header h3 {
            color: #00ffff;
            font-family: 'Orbitron', monospace;
        }
        
        .player-close {
            background: none;
            border: none;
            color: #ffffff;
            font-size: 1.5rem;
            cursor: pointer;
        }
        
        .player-content {
            height: 60vh;
            background: #000000;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .fake-video {
            text-align: center;
            color: #ffffff;
        }
        
        .video-placeholder i {
            font-size: 4rem;
            color: #00ffff;
            margin-bottom: 1rem;
        }
        
        .loading-bar {
            width: 300px;
            height: 4px;
            background: rgba(255, 255, 255, 0.2);
            border-radius: 2px;
            margin: 1rem auto;
            overflow: hidden;
        }
        
        .loading-progress {
            height: 100%;
            background: linear-gradient(90deg, #00ffff, #0066ff);
            width: 0%;
            animation: loading 3s ease-in-out infinite;
        }
        
        @keyframes loading {
            0% { width: 0%; }
            50% { width: 100%; }
            100% { width: 0%; }
        }
        
        .player-controls {
            background: rgba(0, 17, 34, 0.9);
            padding: 1rem;
            display: flex;
            align-items: center;
            gap: 1rem;
        }
        
        .control-btn {
            background: none;
            border: none;
            color: #00ffff;
            font-size: 1.2rem;
            cursor: pointer;
            transition: color 0.3s ease;
        }
        
        .control-btn:hover {
            color: #ffffff;
        }
        
        .progress-bar {
            flex: 1;
            height: 4px;
            background: rgba(255, 255, 255, 0.2);
            border-radius: 2px;
            overflow: hidden;
        }
        
        .progress {
            height: 100%;
            background: linear-gradient(90deg, #00ffff, #0066ff);
            width: 30%;
            transition: width 0.3s ease;
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(player);
    
    // Close handler
    player.querySelector('.player-close').addEventListener('click', () => {
        document.body.removeChild(player);
        document.head.removeChild(style);
    });
    
    // Escape key handler
    const escapeHandler = (e) => {
        if (e.key === 'Escape') {
            document.body.removeChild(player);
            document.head.removeChild(style);
            document.removeEventListener('keydown', escapeHandler);
        }
    };
    document.addEventListener('keydown', escapeHandler);
}

// Add floating particles effect
function createFloatingParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'floating-particles';
    particlesContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
        overflow: hidden;
    `;
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: #00ffff;
            border-radius: 50%;
            opacity: ${Math.random() * 0.5 + 0.2};
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${Math.random() * 20 + 10}s linear infinite;
        `;
        particlesContainer.appendChild(particle);
    }
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0% { transform: translateY(0) rotate(0deg); }
            100% { transform: translateY(-100vh) rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
    document.body.appendChild(particlesContainer);
}

// Initialize floating particles
createFloatingParticles();

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.key === '/') {
        e.preventDefault();
        searchInput.focus();
    }
    
    if (e.key === 'Escape') {
        searchInput.blur();
        searchInput.value = '';
        searchInput.dispatchEvent(new Event('input'));
    }
});

// Add smooth loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
    
    showNotification('🚀 Welcome to VYNIX - The Future of Streaming!', 'success');
});

// Performance optimization: Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
        }
    });
}, observerOptions);

// Observe content sections
document.querySelectorAll('.content-section').forEach(section => {
    observer.observe(section);
});

// Add fadeInUp animation
const fadeInStyle = document.createElement('style');
fadeInStyle.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(fadeInStyle);
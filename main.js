// Header scroll effect
window.addEventListener('scroll', () => {
  const header = document.querySelector('.header');
  if (window.scrollY > 100) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// Movie card hover effects
document.addEventListener('DOMContentLoaded', () => {
  const movieCards = document.querySelectorAll('.movie-card');
  
  movieCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'scale(1.05)';
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'scale(1)';
    });
    
    // Add click event for movie cards
    card.addEventListener('click', () => {
      const movieTitle = card.querySelector('h3').textContent;
      showMovieModal(movieTitle);
    });
  });
});

// Movie modal functionality
function showMovieModal(title) {
  // Create modal overlay
  const modalOverlay = document.createElement('div');
  modalOverlay.className = 'modal-overlay';
  modalOverlay.innerHTML = `
    <div class="modal-content">
      <div class="modal-header">
        <h2>${title}</h2>
        <button class="modal-close">&times;</button>
      </div>
      <div class="modal-body">
        <div class="video-placeholder">
          <div class="play-button">
            <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5,3 19,12 5,21"></polygon>
            </svg>
          </div>
        </div>
        <div class="movie-details">
          <p class="movie-description">
            Experience the thrill and excitement in this amazing ${title}. 
            A captivating story that will keep you on the edge of your seat.
          </p>
          <div class="movie-meta">
            <span class="rating">★ 8.5</span>
            <span class="year">2023</span>
            <span class="duration">2h 15m</span>
          </div>
          <div class="movie-actions">
            <button class="btn btn-primary">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="5,3 19,12 5,21"></polygon>
              </svg>
              Play Now
            </button>
            <button class="btn btn-secondary">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7Z"></path>
              </svg>
              Add to List
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
  
  // Add modal styles
  const modalStyles = `
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.9);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 2000;
      animation: fadeIn 0.3s ease;
    }
    
    .modal-content {
      background-color: #1a1a1a;
      border-radius: 12px;
      max-width: 800px;
      width: 90%;
      max-height: 90vh;
      overflow-y: auto;
      position: relative;
    }
    
    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px;
      border-bottom: 1px solid #333;
    }
    
    .modal-header h2 {
      color: #ffffff;
      font-size: 24px;
      font-weight: 600;
    }
    
    .modal-close {
      background: none;
      border: none;
      color: #ffffff;
      font-size: 24px;
      cursor: pointer;
      padding: 5px;
      border-radius: 4px;
      transition: background-color 0.3s ease;
    }
    
    .modal-close:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }
    
    .modal-body {
      padding: 20px;
    }
    
    .video-placeholder {
      width: 100%;
      height: 300px;
      background: linear-gradient(135deg, #333 0%, #555 100%);
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 20px;
      cursor: pointer;
      transition: transform 0.3s ease;
    }
    
    .video-placeholder:hover {
      transform: scale(1.02);
    }
    
    .play-button {
      color: #ffffff;
      opacity: 0.8;
      transition: opacity 0.3s ease;
    }
    
    .video-placeholder:hover .play-button {
      opacity: 1;
    }
    
    .movie-details {
      color: #ffffff;
    }
    
    .movie-description {
      font-size: 16px;
      line-height: 1.6;
      margin-bottom: 15px;
      color: #e5e5e5;
    }
    
    .movie-meta {
      display: flex;
      gap: 20px;
      margin-bottom: 20px;
      font-size: 14px;
      color: #b3b3b3;
    }
    
    .rating {
      color: #ffd700;
    }
    
    .movie-actions {
      display: flex;
      gap: 15px;
    }
    
    @media (max-width: 768px) {
      .modal-content {
        width: 95%;
        margin: 20px;
      }
      
      .movie-actions {
        flex-direction: column;
      }
      
      .video-placeholder {
        height: 200px;
      }
    }
  `;
  
  // Add styles to head if not already added
  if (!document.querySelector('#modal-styles')) {
    const styleSheet = document.createElement('style');
    styleSheet.id = 'modal-styles';
    styleSheet.textContent = modalStyles;
    document.head.appendChild(styleSheet);
  }
  
  // Add modal to body
  document.body.appendChild(modalOverlay);
  
  // Close modal functionality
  const closeModal = () => {
    modalOverlay.remove();
  };
  
  modalOverlay.querySelector('.modal-close').addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      closeModal();
    }
  });
  
  // Play button functionality
  modalOverlay.querySelector('.video-placeholder').addEventListener('click', () => {
    alert(`Playing ${title}... (This would start the video player)`);
  });
  
  // Action buttons
  modalOverlay.querySelector('.btn-primary').addEventListener('click', () => {
    alert(`Starting ${title}...`);
    closeModal();
  });
  
  modalOverlay.querySelector('.btn-secondary').addEventListener('click', () => {
    alert(`${title} added to your list!`);
  });
}

// Search functionality
document.querySelector('.search-btn').addEventListener('click', () => {
  const searchTerm = prompt('Search for movies or TV shows:');
  if (searchTerm) {
    alert(`Searching for: ${searchTerm}`);
    // Here you would implement actual search functionality
  }
});

// Smooth scrolling for movie rows
document.querySelectorAll('.movie-row').forEach(row => {
  let isDown = false;
  let startX;
  let scrollLeft;
  
  row.addEventListener('mousedown', (e) => {
    isDown = true;
    startX = e.pageX - row.offsetLeft;
    scrollLeft = row.scrollLeft;
    row.style.cursor = 'grabbing';
  });
  
  row.addEventListener('mouseleave', () => {
    isDown = false;
    row.style.cursor = 'grab';
  });
  
  row.addEventListener('mouseup', () => {
    isDown = false;
    row.style.cursor = 'grab';
  });
  
  row.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - row.offsetLeft;
    const walk = (x - startX) * 2;
    row.scrollLeft = scrollLeft - walk;
  });
});

// Add loading animation for movie cards
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe all movie cards
document.querySelectorAll('.movie-card').forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(20px)';
  card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(card);
});

// Navigation functionality
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    
    // Remove active class from all links
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    
    // Add active class to clicked link
    link.classList.add('active');
    
    // Here you would implement navigation logic
    const section = link.textContent.toLowerCase();
    console.log(`Navigating to: ${section}`);
  });
});

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    // Close any open modals
    const modal = document.querySelector('.modal-overlay');
    if (modal) {
      modal.remove();
    }
  }
});

console.log('Vynix streaming platform loaded successfully!');
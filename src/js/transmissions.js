import { setupCollapsible } from './collapsible.js';

/**
 * Set up transmission card interactive behaviors
 */
function setupTransmissionCards() {
  const cards = document.querySelectorAll('.transmission-card');
  
  cards.forEach(card => {
    // Add click effect
    card.addEventListener('click', () => {
      // Add a subtle pulse effect
      card.classList.add('pulse');
      
      // Remove the class after animation completes
      setTimeout(() => {
        card.classList.remove('pulse');
      }, 600);
    });
  });
  
  // Add pulse animation style if not present
  if (!document.querySelector('#pulse-style')) {
    const style = document.createElement('style');
    style.id = 'pulse-style';
    style.textContent = `
      @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.02); }
        100% { transform: scale(1); }
      }
      
      .pulse {
        animation: pulse 0.6s ease;
      }
    `;
    document.head.appendChild(style);
  }
}

// Initialize all modules when DOM is fully loaded


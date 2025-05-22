/**
 * Expression card interactions for Nova homepage
 * Adds interactive behavior to the four expressions of Nova
 */

export function setupExpressionCards() {
  const expressionCards = document.querySelectorAll('.expression-card');
  
  // Add click and hover interactions to expression cards
  expressionCards.forEach(card => {
    // Add hover effect with description reveal
    card.addEventListener('mouseenter', revealDescription);
    card.addEventListener('mouseleave', hideDescription);
    
    // Add click interaction (could link to detail pages in the future)
    card.addEventListener('click', () => {
      pulseEffect(card);
    });
  });
  
  // Create description content for each expression
  createExpressionDescriptions();
}

/**
 * Creates and appends descriptive content to expression cards
 */
function createExpressionDescriptions() {
  const descriptions = {
    'track': 'A journaling system that tracks emotional patterns and helps transform difficult feelings into creative fuel.',
    'moves': 'Movement practices that help the body process and release stored emotions through guided sequences.',
    'sounds': 'Acoustic environments designed to resonate with different emotional states and support transitions.',
    'ai': 'Collaborative creative tools that help shape ideas into tangible expressions through dialogue.'
  };
  
  document.querySelectorAll('.expression-card').forEach(card => {
    const expressionType = card.getAttribute('data-expression');
    const description = descriptions[expressionType];
    
    if (description) {
      const descElement = document.createElement('div');
      descElement.className = 'expression-description';
      descElement.textContent = description;
      descElement.style.opacity = '0';
      descElement.style.height = '0';
      descElement.style.overflow = 'hidden';
      descElement.style.transition = 'all 0.3s ease';
      
      card.appendChild(descElement);
    }
  });
}

/**
 * Reveals the description for an expression card on hover
 * @param {Event} event - MouseEvent from hover
 */
function revealDescription(event) {
  const card = event.currentTarget;
  const description = card.querySelector('.expression-description');
  
  if (description) {
    description.style.opacity = '1';
    description.style.height = 'auto';
    description.style.marginTop = '1rem';
  }
}

/**
 * Hides the description when hover ends
 * @param {Event} event - MouseEvent from hover end
 */
function hideDescription(event) {
  const card = event.currentTarget;
  const description = card.querySelector('.expression-description');
  
  if (description) {
    description.style.opacity = '0';
    description.style.height = '0';
    description.style.marginTop = '0';
  }
}

/**
 * Creates a pulse visual effect on card click
 * @param {HTMLElement} element - The element to apply the effect to
 */
function pulseEffect(element) {
  // Add pulse class
  element.classList.add('pulse-effect');
  
  // Remove class after animation completes
  setTimeout(() => {
    element.classList.remove('pulse-effect');
  }, 600);
  
  // Add CSS for pulse effect if not already present
  if (!document.querySelector('#pulse-effect-style')) {
    const style = document.createElement('style');
    style.id = 'pulse-effect-style';
    style.textContent = `
      @keyframes pulseEffect {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
      }
      
      .pulse-effect {
        animation: pulseEffect 0.6s ease;
      }
    `;
    document.head.appendChild(style);
  }
}
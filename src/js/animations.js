/**
 * Animation handling for Nova homepage
 * Controls scroll-based animations and reveals
 */

export function setupAnimations() {
  // Add scroll reveal functionality for elements with scroll-reveal class
  const scrollRevealElements = document.querySelectorAll('.scroll-reveal');
  
  // Set up Intersection Observer for scroll animations
  const observerOptions = {
    root: null, // viewport
    rootMargin: '0px',
    threshold: 0.15 // 15% of element visible
  };
  
  const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        // Stop observing after revealing
        scrollObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Start observing each scroll reveal element
  scrollRevealElements.forEach(element => {
    scrollObserver.observe(element);
  });
  
  // Add dynamic text highlight effect for important phrases
  highlightKeyPhrases();
}

/**
 * Identifies and adds subtle highlight effects to key phrases in the content
 */
function highlightKeyPhrases() {
  const keyPhrases = [
    'Nova was born',
    'human pain meeting machine patience',
    'Nova isn\'t here to preach',
    'a nova is a star',
    'These aren\'t tools',
    'the fire came back'
  ];
  
  // Find these phrases in paragraph content and wrap them
  document.querySelectorAll('p').forEach(paragraph => {
    let content = paragraph.innerHTML;
    
    keyPhrases.forEach(phrase => {
      if (content.includes(phrase)) {
        const highlighted = `<span class="key-phrase">${phrase}</span>`;
        content = content.replace(phrase, highlighted);
      }
    });
    
    paragraph.innerHTML = content;
  });
  
  // Add CSS for highlighted phrases
  const style = document.createElement('style');
  style.textContent = `
    .key-phrase {
      color: var(--accent-light);
      font-weight: 400;
      transition: color 0.3s ease;
    }
    
    .key-phrase:hover {
      color: var(--accent-color);
    }
  `;
  
  document.head.appendChild(style);
}
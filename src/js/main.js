import { setupAudio } from './audio.js';
import { setupAnimations } from './animations.js';
import { setupExpressionCards } from './expressions.js';

// Initialize all modules when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  setupAudio();
  setupAnimations();
  setupExpressionCards();
});
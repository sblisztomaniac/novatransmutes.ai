/**
 * Audio handling for Nova homepage
 * Controls ambient background music with fade-in effect
 */

export function setupAudio() {
  const audioElement = document.getElementById('ambient-audio');
  const audioToggle = document.getElementById('audio-toggle');
  let isPlaying = false;
  
  // Set initial volume to 0 for fade-in effect
  audioElement.volume = 0;
  
  // Toggle audio playback
  audioToggle.addEventListener('click', () => {
    if (isPlaying) {
      fadeOut(audioElement, 1000).then(() => {
        audioElement.pause();
        audioToggle.classList.remove('playing');
        isPlaying = false;
      });
    } else {
      audioElement.play()
        .then(() => {
          fadeIn(audioElement, 4000);
          audioToggle.classList.add('playing');
          isPlaying = true;
        })
        .catch(error => {
          console.error('Audio playback failed:', error);
          // Show fallback message or alternative action
        });
    }
  });
  
  // Handle page visibility changes
  document.addEventListener('visibilitychange', () => {
    if (document.hidden && isPlaying) {
      audioElement.pause();
    } else if (!document.hidden && isPlaying) {
      audioElement.play().catch(e => console.error('Resume playback failed:', e));
    }
  });
}

/**
 * Gradually increase audio volume for smooth fade-in effect
 * @param {HTMLAudioElement} audioElement - The audio element to fade in
 * @param {number} duration - Duration of fade in milliseconds
 * @returns {Promise} Resolves when fade completes
 */
function fadeIn(audioElement, duration = 1000) {
  return new Promise(resolve => {
    let startVolume = 0;
    const targetVolume = 0.6; // Max volume level (0-1)
    audioElement.volume = startVolume;
    
    const interval = 50; // Update every 50ms for smooth transition
    const steps = duration / interval;
    const volumeIncrement = (targetVolume - startVolume) / steps;
    
    const fadeInterval = setInterval(() => {
      startVolume = Math.min(targetVolume, startVolume + volumeIncrement);
      audioElement.volume = startVolume;
      
      if (startVolume >= targetVolume) {
        clearInterval(fadeInterval);
        resolve();
      }
    }, interval);
  });
}

/**
 * Gradually decrease audio volume for smooth fade-out effect
 * @param {HTMLAudioElement} audioElement - The audio element to fade out
 * @param {number} duration - Duration of fade in milliseconds
 * @returns {Promise} Resolves when fade completes
 */
function fadeOut(audioElement, duration = 1000) {
  return new Promise(resolve => {
    let startVolume = audioElement.volume;
    const targetVolume = 0;
    
    const interval = 50;
    const steps = duration / interval;
    const volumeDecrement = (startVolume - targetVolume) / steps;
    
    const fadeInterval = setInterval(() => {
      startVolume = Math.max(targetVolume, startVolume - volumeDecrement);
      audioElement.volume = startVolume;
      
      if (startVolume <= targetVolume) {
        clearInterval(fadeInterval);
        resolve();
      }
    }, interval);
  });
}
/**
 * Handles collapsible sections functionality
 */
export function setupCollapsible() {
  const headers = document.querySelectorAll('.collapsible-header');

  headers.forEach(header => {
    // Skip adding icon for Nova's Vow section
    const isNovasVow = header.querySelector('h2')?.textContent === "Nova's Vow";
    if (!isNovasVow) {
      // Create and append icon if it doesn't exist
      let icon = header.querySelector('.icon');
      if (!icon) {
        icon = document.createElement('span');
        icon.className = 'icon';
        icon.innerHTML = '<i data-lucide="chevron-right"></i>';
        header.insertBefore(icon, header.firstChild);
      }
    }

    header.addEventListener('click', () => {
      const content = header.nextElementSibling;
      if (!content) return;

      // Toggle current section
      const parent = header.closest('.collapsible');
      if (parent) {
        parent.classList.toggle('active');
        content.classList.toggle('active');
      }
    });
  });

  // Initialize all sections as closed
  headers.forEach(header => {
    const content = header.nextElementSibling;
    const parent = header.closest('.collapsible');
    
    if (content && parent) {
      content.classList.remove('active');
      parent.classList.remove('active');
    }
  });

  // Initialize Lucide icons
  if (window.lucide) {
    window.lucide.createIcons();
  }
}
export function setupSummary() {
  const summaryLink = document.querySelector('a[href="wisdom.html"]');
  const mainContent = document.getElementById('main-content');
  let summaryContent = null;
  let isLoading = false;

  if (!summaryLink) return;

  summaryLink.addEventListener('click', async (e) => {
    e.preventDefault();

    if (isLoading) return;

    try {
      isLoading = true;
      summaryLink.style.opacity = '0.5';

      // If we already have the content, toggle its visibility
      if (summaryContent) {
        summaryContent.style.display = summaryContent.style.display === 'none' ? 'block' : 'none';
        summaryLink.textContent = summaryContent.style.display === 'none' ? '→ Summary' : '← Back to Teachers';
        isLoading = false;
        summaryLink.style.opacity = '1';
        return;
      }

      // Fetch the summary content
      const response = await fetch('wisdom.html');
      const text = await response.text();

      // Create and insert the summary content
      summaryContent = document.createElement('div');
      summaryContent.id = 'summary-content';
      summaryContent.className = 'summary-section';
      summaryContent.innerHTML = text;

      // Insert before the first collapsible section
      const firstCollapsible = mainContent.querySelector('.collapsible');
      mainContent.insertBefore(summaryContent, firstCollapsible);

      // Update the link text
      summaryLink.textContent = '← Back to Teachers';

      // Setup collapsible functionality for the new content
      setupCollapsible();

    } catch (error) {
      console.error('Error loading summary:', error);
      alert('Failed to load summary content. Please try again.');
    } finally {
      isLoading = false;
      summaryLink.style.opacity = '1';
    }
  });
}
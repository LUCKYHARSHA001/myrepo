const accordionItems = document.querySelectorAll('.accordion-item');

    // Loop through each accordion item to set up its functionality
    accordionItems.forEach(item => {
      const header = item.querySelector('.accordion-header');
      const content = item.querySelector('.accordion-content');
      const icon = item.querySelector('.chevron-icon');
      const counterElement = item.querySelector('.accordion-counter');
      const progressBar = item.querySelector('.progress-bar');
      const checkboxes = item.querySelectorAll('.custom-checkbox');
      const totalProblems = checkboxes.length;

      /**
       * Updates the counter and progress bar for this specific accordion item.
       */
      function updateProgress() {
        const checkedCount = item.querySelectorAll('.custom-checkbox:checked').length;

        // Calculate the completion percentage
        const percentage = totalProblems > 0 ? (checkedCount / totalProblems) * 100 : 0;

        // Update the counter text
        if (counterElement) {
          counterElement.textContent = `${checkedCount} / ${totalProblems}`;
        }

        // Update the progress bar width
        if (progressBar) {
          progressBar.style.width = percentage + '%';
        }
      }

      // Add a click event listener to the header for the dropdown toggle
      if (header) {
        header.addEventListener('click', () => {
          if (content) content.classList.toggle('hidden');
          if (icon) icon.classList.toggle('rotate-180');
        });
      }

      // Add a 'change' event listener to each checkbox to update the progress
      checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateProgress);
      });

      // Initialize the counter and progress bar on page load
      updateProgress();
    });
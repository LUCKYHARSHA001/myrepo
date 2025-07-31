document.addEventListener("DOMContentLoaded", () => {
  // Function to check if an element is in the viewport
  const isInViewport = (element) => {
    const rect = element.getBoundingClientRect();
    return (
      rect.top <=
        (window.innerHeight || document.documentElement.clientHeight) * 0.8 && // 80% of viewport height
      rect.bottom >= 0
    );
  };

  // --- Scroll-Triggered Section Reveal ---
  const countrySections = document.querySelectorAll(".reveal-on-scroll");

  const checkCountrySections = () => {
    countrySections.forEach((section) => {
      if (isInViewport(section) && !section.classList.contains("visible")) {
        section.classList.add("visible");
        // Trigger nested animations if applicable
        revealNestedContent(section);
        highlightKeywords(section);
      }
    });
  };

  // --- Reveal nested content (Entryway/Cost) ---
  const revealNestedContent = (parentSection) => {
    const infoBlocks = parentSection.querySelectorAll(
      ".info-block.reveal-content"
    );
    infoBlocks.forEach((block, index) => {
      setTimeout(() => {
        block.classList.add("visible");
      }, 300 * (index + 1)); // Stagger delay
    });

    // Stagger list items
    const listItems = parentSection.querySelectorAll(".list-item-reveal");
    listItems.forEach((item, index) => {
      setTimeout(() => {
        item.classList.add("visible");
      }, 100 * (index + 1)); // Stagger delay
    });
  };

  // --- Highlighting Keywords ---
  const highlightKeywords = (parentSection) => {
    const highlightElements = parentSection.querySelectorAll(".highlight-text");
    highlightElements.forEach((element) => {
      if (!element.classList.contains("highlighted")) {
        element.classList.add("highlighted");
      }
    });
  };

  // Initial check on load
  checkCountrySections();

  // Check on scroll
  window.addEventListener("scroll", checkCountrySections);
});

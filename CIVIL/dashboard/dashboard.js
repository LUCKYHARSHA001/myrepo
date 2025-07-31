document.addEventListener("DOMContentLoaded", function() {
    const sidebarButtons = document.querySelectorAll('.sidebar-button');
    const dashboardSections = document.querySelectorAll('.dashboard-section');

    // Function to show the correct content section
    function showSection(sectionId) {
        dashboardSections.forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(sectionId).classList.add('active');
    }

    // Add click event listeners to sidebar buttons
    sidebarButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove 'active' from all buttons
            sidebarButtons.forEach(btn => btn.classList.remove('active'));
            // Add 'active' to the clicked button
            this.classList.add('active');

            // Get the content ID from the data-content attribute
            const contentId = this.dataset.content + '-content';
            showSection(contentId);
        });
    });

    // Initial load: ensure the first section is active
    if (sidebarButtons.length > 0) {
        sidebarButtons[0].click(); // Simulate a click on the first button
    }

    // Cheat Sheet Progress Update (Dummy functionality)
    const updateProgressBtn = document.querySelector('.update-progress-btn');
    if (updateProgressBtn) {
        updateProgressBtn.addEventListener('click', function() {
            alert("Progress update feature under development! (This is just a dummy button)");
            // You would add actual logic here to update progress in a backend or local storage
            // For example, generating new random progress:
            // document.querySelectorAll('.progress-bar').forEach(bar => {
            //     const newWidth = Math.floor(Math.random() * 100);
            //     bar.style.width = newWidth + '%';
            //     const parent = bar.closest('.progress-item');
            //     const total = parseInt(parent.querySelector('.progress-text').textContent.split('/')[1]);
            //     const completed = Math.round(total * (newWidth / 100));
            //     parent.querySelector('.progress-text').textContent = `${completed}/${total} Sums Completed (${newWidth}%)`;
            // });
        });
    }
});
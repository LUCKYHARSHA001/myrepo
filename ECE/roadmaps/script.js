document.addEventListener('DOMContentLoaded', () => {
    const timelineOl = document.querySelector('.timeline ol');

    if (timelineOl) {
        timelineOl.addEventListener('wheel', (event) => {
            event.preventDefault();
            timelineOl.scrollLeft += event.deltaY;
        });
    }
});
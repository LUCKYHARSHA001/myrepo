// --- Navigation Logic ---
const navLinks = document.querySelectorAll('.nav-link');
const pageContents = document.querySelectorAll('.page-content');

navLinks.forEach(link => {
    if (link.dataset.page) {
        link.addEventListener('click', function (event) {
            event.preventDefault();
            const pageId = this.dataset.page;

            navLinks.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');

            pageContents.forEach(page => {
                if (page.id === pageId) {
                    page.classList.remove('hidden');
                } else {
                    page.classList.add('hidden');
                }
            });
        });
    }
});


// --- Static Chart Logic ---
const charts = [
    { id: 'chart1', value: 80, color: 'var(--progress-red)' },
    { id: 'chart2', value: 65, color: 'var(--progress-red)' },
    { id: 'chart3', value: 75, color: 'var(--progress-red)' },
    { id: 'chart4', value: 50, color: 'var(--progress-blue)' }
];

function updateChart(chartInfo) {
    const chartElement = document.getElementById(chartInfo.id);
    if (chartElement) {
        const valueContainer = chartElement.querySelector('.value-container');
        const value = chartInfo.value;

        valueContainer.textContent = `${value}%`;
        chartElement.style.background = `conic-gradient(${chartInfo.color} ${value}%, var(--main-bg) 0)`;
        valueContainer.style.color = chartInfo.color;
    }
}
charts.forEach(updateChart);


// --- Heatmap Logic ---
const monthYearEl = document.getElementById('current-month-year');
const grid = document.getElementById('heatmap-grid-container');
const labelsGrid = document.getElementById('heatmap-days-labels');
const prevMonthBtn = document.getElementById('prev-month');
const nextMonthBtn = document.getElementById('next-month');

if (monthYearEl && grid && labelsGrid && prevMonthBtn && nextMonthBtn) {
    let currentDate = new Date(2025, 6, 21); // July is month 6 (0-based index)

    // Sample data: key is 'YYYY-MM-DD', value is activity level (1-4)
    const activityData = {
        '2025-07-01': 2, '2025-07-02': 3, '2025-07-03': 1, '2025-07-05': 4,
        '2025-07-07': 2, '2025-07-08': 1, '2025-07-10': 3, '2025-07-11': 2,
        '2025-07-12': 4, '2025-07-14': 1, '2025-07-15': 3, '2025-07-18': 2,
        '2025-07-20': 4, '2025-07-21': 3,
        '2025-06-25': 2, '2025-06-28': 4,
    };

    const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    labelsGrid.innerHTML = dayLabels.map(day => `<div class="heatmap-day-label">${day}</div>`).join('');

    function renderHeatmap() {
        grid.innerHTML = '';
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        monthYearEl.textContent = `${currentDate.toLocaleString('default', { month: 'long' })} ${year}`;

        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        // Empty cells before the first day of the month
        for (let i = 0; i < firstDay; i++) {
            grid.insertAdjacentHTML('beforeend', '<div class="heatmap-day"></div>');
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const level = activityData[dateStr] || 0;
            grid.insertAdjacentHTML(
                'beforeend',
                `<div class="heatmap-day${level ? ` level-${level}` : ''}" title="${dateStr}: Level ${level}"></div>`
            );
        }
    }

    prevMonthBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderHeatmap();
    });

    nextMonthBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderHeatmap();
    });

    renderHeatmap(); // Initial render
}

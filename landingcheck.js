
    //  Particle Canvas Animation Script 
    const canvas = document.getElementById('particle-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particlesArray;

    class Particle {
        constructor(x, y, directionX, directionY, size, color) {
            this.x = x; this.y = y; this.directionX = directionX; this.directionY = directionY; this.size = size; this.color = color;
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
        update() {
            if (this.x > canvas.width || this.x < 0) { this.directionX = -this.directionX; }
            if (this.y > canvas.height || this.y < 0) { this.directionY = -this.directionY; }
            this.x += this.directionX;
            this.y += this.directionY;
            this.draw();
        }
    }

    function init() {
        particlesArray = [];
        let numberOfParticles = (canvas.height * canvas.width) / 9000;
        for (let i = 0; i < numberOfParticles; i++) {
            let size = (Math.random() * 2) + 1;
            let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
            let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
            let directionX = (Math.random() * .4) - .2;
            let directionY = (Math.random() * .4) - .2;
            let color = 'rgba(110, 211, 207, 0.5)';
            particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
        }
    }

    function connect() {
        let opacityValue = 1;
        for (let a = 0; a < particlesArray.length; a++) {
            for (let b = a; b < particlesArray.length; b++) {
                let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x)) + ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
                if (distance < (canvas.width / 7) * (canvas.height / 7)) {
                    opacityValue = 1 - (distance / 20000);
                    ctx.strokeStyle = `rgba(110, 211, 207, ${opacityValue})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                    ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, innerWidth, innerHeight);
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
        }
        connect();
    }

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        init();
    });

    init();
    animate();


    //  Section Visibility Animation 
    const sections = document.querySelectorAll('.section');

    const observerOptions = {
        root: null, 
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } 
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });


    document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const themeIcon = document.getElementById('theme-icon');
    const currentTheme = localStorage.getItem('theme');

    function setThemeAndIcon(theme) {
    if (theme === 'dark-theme') {
        body.classList.remove('light-theme');
        body.classList.add('dark-theme');
        themeToggle.checked = true;
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    } else {
        body.classList.remove('dark-theme');
        body.classList.add('light-theme');
        themeToggle.checked = false;
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }
    localStorage.setItem('theme', theme);
    }

    if (currentTheme) {
    setThemeAndIcon(currentTheme);
    } else {
    setThemeAndIcon('light-theme');
    }

    themeToggle.addEventListener('change', function() {
    if (themeToggle.checked) {
        setThemeAndIcon('dark-theme');
    } else {
        setThemeAndIcon('light-theme');
    }
    });
    });

        const heroImage = document.querySelector('.hero-image');
        if (heroImage) {
            heroImage.addEventListener('click', function() {

                this.classList.add('clicked');
                this.addEventListener('animationend', () => {
                    this.classList.remove('clicked');
                }, { once: true }); 
            });
        }

    // --- International Pathways Dynamic Content ---
    document.addEventListener('DOMContentLoaded', () => {
        const branchSelect = document.getElementById('branch-select');
        const pathwaysResults = document.getElementById('pathways-results');

        const pathwaysData = {
            cse: [
                { country: 'USA', icon: 'fas fa-flag-usa' },
                { country: 'Germany', icon: 'fas fa-flag' },
                { country: 'Canada', icon: 'fab fa-canadian-maple-leaf' },
                { country: 'UK', icon: 'fas fa-flag' },
                { country: 'Australia', icon: 'fas fa-flag' }
            ],
            ece: [
                { country: 'USA', icon: 'fas fa-flag-usa' },
                { country: 'Germany', icon: 'fas fa-flag' },
                { country: 'S. Korea', icon: 'fas fa-flag' },
                { country: 'Japan', icon: 'fas fa-flag' },
                { country: 'Singapore', icon: 'fas fa-flag' }
            ],
            mech: [
                { country: 'Germany', icon: 'fas fa-flag' },
                { country: 'USA', icon: 'fas fa-flag-usa' },
                { country: 'UK', icon: 'fas fa-flag' },
                { country: 'Japan', icon: 'fas fa-flag' },
                { country: 'Canada', icon: 'fab fa-canadian-maple-leaf' }
            ],
            eee: [
                { country: 'USA', icon: 'fas fa-flag-usa' },
                { country: 'Germany', icon: 'fas fa-flag' },
                { country: 'China', icon: 'fas fa-flag' },
                { country: 'UK', icon: 'fas fa-flag' },
                { country: 'Switzerland', icon: 'fas fa-flag' }
            ],
            civil: [
                { country: 'USA', icon: 'fas fa-flag-usa' },
                { country: 'Netherlands', icon: 'fas fa-flag' },
                { country: 'UK', icon: 'fas fa-flag' },
                { country: 'Canada', icon: 'fab fa-canadian-maple-leaf' },
                { country: 'Australia', icon: 'fas fa-flag' }
            ]
        };

        function updatePathways() {
            const selectedBranch = branchSelect.value;
            const countries = pathwaysData[selectedBranch];
            pathwaysResults.innerHTML = '';

            if (countries) {
                countries.forEach(data => {
                    const card = document.createElement('div');
                    card.classList.add('country-advert-card', 'animated-card'); 
                    card.innerHTML = `
                        <i class="${data.icon}"></i>
                        <h3>${data.country}</h3>
                    `;
                    pathwaysResults.appendChild(card);
                });
            }
        }

        updatePathways();

        branchSelect.addEventListener('change', updatePathways);
    });



        document.addEventListener('DOMContentLoaded', () => {
    const heroImage = document.querySelector('.hero-image');
    const heroImageContainer = document.querySelector('.hero-image-container');

    if (heroImage && heroImageContainer) {
        heroImageContainer.addEventListener('mousemove', (e) => {
            const rect = heroImageContainer.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const mouseX = e.clientX;
            const mouseY = e.clientY;

            const tiltX = (mouseY - centerY) / 20;
            const tiltY = (mouseX - centerX) / 20;

            heroImage.style.transform = `
                perspective(1000px)
                rotateX(${tiltX}deg)
                rotateY(${tiltY}deg)
                scale(1.02) /* Slight scale on hover for extra pop */
            `;
        });

        heroImageContainer.addEventListener('mouseleave', () => {
            heroImage.style.transform = `
                perspective(1000px)
                rotateX(0deg)
                rotateY(0deg)
                scale(1)
            `;
        });
    }
    });
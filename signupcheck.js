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
        canvas.width = innerWidth;
        canvas.height = innerHeight;
        init();
    });

    init();
    animate();

    // --- Side-by-Side Input Animation Logic ---
    const passwordInput = document.getElementById("password");
    const repasswordInput = document.getElementById("repassword");
    const passwordWrapper = document.getElementById("password-wrapper");
    const repasswordWrapper = document.getElementById("repassword-wrapper");
    const passwordGroup = document.getElementById("password-group");

    function updatePasswordStyles(focusedElementId) {
        passwordWrapper.classList.remove("expanded-width", "shrunk-width", "default-width");
        repasswordWrapper.classList.remove("expanded-width", "shrunk-width", "default-width");

        if (focusedElementId === "password") {
            passwordWrapper.classList.add("expanded-width");
            repasswordWrapper.classList.add("shrunk-width");
        } else if (focusedElementId === "repassword") {
            repasswordWrapper.classList.add("expanded-width");
            passwordWrapper.classList.add("shrunk-width");
        } else {
            passwordWrapper.classList.add("default-width");
            repasswordWrapper.classList.add("default-width");
        }
    }

    updatePasswordStyles(null);

    passwordInput.addEventListener("focus", () => updatePasswordStyles("password"));
    repasswordInput.addEventListener("focus", () => updatePasswordStyles("repassword"));

    passwordGroup.addEventListener('focusout', (e) => {
        if (!passwordGroup.contains(e.relatedTarget)) {
            updatePasswordStyles(null);
        }
    });

    document.getElementById('registerform').addEventListener('submit', function(e) {
        e.preventDefault();
        const password = document.getElementById('password').value;
        const repassword = document.getElementById('repassword').value;

        if (password !== repassword) {
            alert("Passwords do not match!");
            return;
        }
        
        console.log('Registration form submitted!');
        window.location.href = "logincheck.html";
    });
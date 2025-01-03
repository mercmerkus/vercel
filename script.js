const canvas = document.getElementById('background');
const ctx = canvas.getContext('2d');

// Setze die Größe des Canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particlesArray = [];
const numberOfParticles = 50;

// Hintergrund mit weichem Glow erstellen
function createSmootherGlow() {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const gradient = ctx.createRadialGradient(
        centerX, centerY, 0, 
        centerX, centerY, Math.max(canvas.width, canvas.height)
    );

    gradient.addColorStop(0, 'rgba(0, 50, 255, 0.2)');
    gradient.addColorStop(0.3, 'rgba(0, 50, 255, 0.15)');
    gradient.addColorStop(0.6, 'rgba(0, 50, 255, 0.1)');
    gradient.addColorStop(1, 'rgba(0, 50, 255, 0.05)');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// Klasse für die Partikel
class Particle {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 0.3 - 0.15;
        this.speedY = Math.random() * 0.3 - 0.15;
        this.opacity = Math.random() * 0.5 + 0.2;
        this.growthRate = Math.random() * 0.02 + 0.01;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < -50 || this.x > canvas.width + 50 || 
            this.y < -50 || this.y > canvas.height + 50) {
            this.reset();
        }

        this.size += Math.sin(Date.now() * 0.001) * this.growthRate;
    }

    draw() {
        ctx.fillStyle = `rgba(51, 153, 255, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.shadowBlur = 10;
        ctx.shadowColor = 'rgba(51, 153, 255, 0.5)';
        ctx.fill();
        ctx.shadowBlur = 0;
    }
}

// Initialisiere die Partikel
function init() {
    for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
    }
}

// Animationsschleife
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    createSmootherGlow();
    particlesArray.forEach(particle => {
        particle.update();
        particle.draw();
    });
    requestAnimationFrame(animate); // Animations-Loop
}

// Canvas-Größe bei Fensteränderung anpassen
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    // Hintergrund neu zeichnen, um Artefakte zu vermeiden
    createSmootherGlow();
}

window.addEventListener('resize', resizeCanvas);

// Animation starten
init();
animate();

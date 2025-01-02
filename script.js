const canvas = document.getElementById('background');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const particlesArray = [];
const numberOfParticles = 50;

function createGlow() {
    // Mehrere überlappende Gradienten für einen weicheren Effekt
    for(let i = 0; i < 3; i++) {
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height * 0.7);
        
        // Hauptgradient mit sehr feinen Abstufungen
        gradient.addColorStop(0, 'rgba(0, 50, 255, 0.03)');
        gradient.addColorStop(0.1, 'rgba(0, 50, 255, 0.025)');
        gradient.addColorStop(0.2, 'rgba(0, 50, 255, 0.02)');
        gradient.addColorStop(0.3, 'rgba(0, 50, 255, 0.015)');
        gradient.addColorStop(0.4, 'rgba(0, 50, 255, 0.01)');
        gradient.addColorStop(0.5, 'rgba(0, 50, 255, 0.005)');
        gradient.addColorStop(0.6, 'rgba(0, 50, 255, 0.002)');
        gradient.addColorStop(0.7, 'rgba(0, 50, 255, 0.001)');
        gradient.addColorStop(1, 'rgba(0, 50, 255, 0)');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, i * 20, canvas.width, canvas.height);
    }
}

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        if (this.x < 0 || this.x > canvas.width) {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
        }
        if (this.y < 0 || this.y > canvas.height) {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
        }
    }

    draw() {
        ctx.fillStyle = 'rgba(51, 153, 255, 0.5)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }
}

function init() {
    for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    createGlow();
    particlesArray.forEach(particle => {
        particle.update();
        particle.draw();
    });
    requestAnimationFrame(animate);
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

init();
animate();

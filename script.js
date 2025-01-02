const canvas = document.getElementById('background');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const particlesArray = [];
const numberOfParticles = 50;

function createVerticalGlow() {
    // Linearer Gradient von oben nach unten
    const gradient = ctx.createLinearGradient(
        0, 0, 
        0, canvas.height * 0.7 // Gradient erstreckt sich nur bis 70% der Höhe
    );
    
    // Weichere Farbübergänge von oben nach unten
    gradient.addColorStop(0, 'rgba(0, 50, 255, 0.3)');
    gradient.addColorStop(0.3, 'rgba(0, 50, 255, 0.2)');
    gradient.addColorStop(0.6, 'rgba(0, 50, 255, 0.1)');
    gradient.addColorStop(1, 'rgba(0, 50, 255, 0.05)');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height * 0.7);
}

class Particle {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * (canvas.height * 0.7); // Nur im oberen Bereich
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 0.3 - 0.15;
        this.speedY = Math.random() * 0.3 - 0.15;
        this.opacity = Math.random() * 0.5 + 0.2;
        this.growthRate = Math.random() * 0.02 + 0.01;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        // Sanfteres Zurücksetzen im oberen Bereich
        if (this.x < -50 || this.x > canvas.width + 50 || 
            this.y < -50 || this.y > canvas.height * 0.7 + 50) {
            this.reset();
        }

        // Leichtes Pulsieren der Partikel
        this.size += Math.sin(Date.now() * 0.001) * this.growthRate;
    }

    draw() {
        // Weicherer Farbverlauf mit variabler Deckkraft
        ctx.fillStyle = `rgba(51, 153, 255, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        
        // Schatten für zusätzlichen Glanz
        ctx.shadowBlur = 10;
        ctx.shadowColor = 'rgba(51, 153, 255, 0.5)';
        
        ctx.fill();
        
        // Schatten zurücksetzen
        ctx.shadowBlur = 0;
    }
}

function init() {
    for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    createVerticalGlow();
    particlesArray.forEach(particle => {
        particle.update();
        particle.draw();
    });
    requestAnimationFrame(animate);
}

// Responsive Resize
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);

init();
animate();

document.getElementById('fireworksButton').addEventListener('click', function() {
    const sound = document.getElementById('fireworksSound');
    sound.volume = 0.1;
    sound.play();
    launchFireworks();
});

document.getElementById('gameButton').addEventListener('click', function() {
    window.location.href = 'minigame.html';
});

function launchFireworks() {
    const canvas = document.getElementById('fireworksCanvas');
    const ctx = canvas.getContext('2d');
    const fireworks = [];
    const particles = [];

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    class Firework {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.explode();
        }

        explode() {
            const particleCount = 100; // Increase the number of particles
            const angleIncrement = (Math.PI * 2) / particleCount;
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle(this.x, this.y, i * angleIncrement));
            }
        }

        draw() {
            ctx.fillStyle = 'white';
            ctx.fillRect(this.x, this.y, 2, 2);
        }
    }

    class Particle {
        constructor(x, y, angle) {
            this.x = x;
            this.y = y;
            this.angle = angle;
            this.speed = Math.random() * 5 + 5; // Increase speed
            this.gravity = 0.05;
            this.alpha = 1;
            this.size = Math.random() * 4 + 2; // Increase size
            this.colors = ['#ff0000', '#ff8000', '#ffff00', '#80ff00', '#00ff00', '#00ff80', '#00ffff', '#0080ff', '#0000ff', '#8000ff', '#ff00ff', '#ff0080']; // Add more vibrant colors
            this.color = this.colors[Math.floor(Math.random() * this.colors.length)];
        }

        update() {
            this.speed *= 0.98;
            this.x += Math.cos(this.angle) * this.speed;
            this.y += Math.sin(this.angle) * this.speed + this.gravity;
            this.alpha -= 0.02;
        }

        draw() {
            ctx.save();
            ctx.globalAlpha = this.alpha;
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
    }

    let animationId;
    const duration = 11200; // Duration of the fireworks effect in milliseconds
    const startTime = Date.now();

    function animate() {
        const currentTime = Date.now();
        const elapsedTime = currentTime - startTime;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (Math.random() < 0.05) {
            fireworks.push(new Firework(Math.random() * canvas.width, Math.random() * canvas.height / 2));
        }

        fireworks.forEach((firework, index) => {
            firework.draw();
            if (firework.y < canvas.height / 2) {
                fireworks.splice(index, 1);
            }
        });

        particles.forEach((particle, index) => {
            particle.update();
            particle.draw();
            if (particle.alpha <= 0) {
                particles.splice(index, 1);
            }
        });

        if (elapsedTime < duration) {
            animationId = requestAnimationFrame(animate);
        } else {
            cancelAnimationFrame(animationId);
            ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas after animation ends
        }
    }

    animate();
}

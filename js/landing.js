const damian = document.getElementById('ascii-damian');
const handle = document.getElementById('ascii-handle');
const wrapper = document.getElementById('asciiWrapper');
const canvas = document.getElementById('rain');
const ctx = canvas.getContext('2d');
const CHARS = '|/\\!:;.,`\'"-_~^'.split('');
const FONT_SIZE = 14;
const SPEED_MIN = 0.3;
const SPEED_MAX = 0.7;
let drops = [];

let showingDamian = true;

function createDrop(columnHeight, startInView = false) {
    return {
        y: startInView
            ? Math.random() * columnHeight
            : Math.random() * -columnHeight,
        speed: SPEED_MIN + Math.random() * (SPEED_MAX - SPEED_MIN),
        length: 4 + Math.floor(Math.random() * 10),
        chars: [],
        pause: Math.floor(Math.random() * 120),
    };
}

function updateHeight() {
    const active = showingDamian ? damian : handle;
    wrapper.style.height = active.offsetHeight + 'px';
}

function toggle() {
    if (showingDamian) {
        damian.classList.remove('visible'); damian.classList.add('hidden');
        handle.classList.remove('hidden'); handle.classList.add('visible');
    } else {
        handle.classList.remove('visible'); handle.classList.add('hidden');
        damian.classList.remove('hidden'); damian.classList.add('visible');
    }
    showingDamian = !showingDamian;
    setTimeout(updateHeight, 50);
}

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const cols = Math.floor(canvas.width / FONT_SIZE);
    const rows = canvas.height / FONT_SIZE;
    drops = Array.from({ length: cols }, () => createDrop(rows, true));
}

function draw() {
    ctx.fillStyle = 'rgba(10,10,10,0.55)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = `${FONT_SIZE}px "Share Tech Mono", monospace`;
    for (let i = 0; i < drops.length; i++) {
        const drop = drops[i];
        if (drop.pause > 0) {
            drop.pause--;
            continue;
        }

        const headY = Math.floor(drop.y);
        for (let t = 0; t < drop.length; t++) {
            const row = headY - t;
            if (row < 0 || row > canvas.height / FONT_SIZE) continue;
            const progress = t / drop.length;
            const alpha = 0.8 * (1 - progress) + 0.2 * progress;
            const brightness = Math.round(150 + (1 - progress) * 105);
            ctx.fillStyle = `rgba(${brightness},${brightness},${brightness},${alpha})`;
            const ch = t === 0
                ? CHARS[Math.floor(Math.random() * CHARS.length)]
                : (drop.chars[t] || CHARS[Math.floor(Math.random() * CHARS.length)]);
            drop.chars[t] = ch;
            ctx.fillText(ch, i * FONT_SIZE, row * FONT_SIZE);
        }
        drop.y += drop.speed;
        if (drop.y * FONT_SIZE > canvas.height + drop.length * FONT_SIZE) {
            drops[i] = createDrop(canvas.height / FONT_SIZE);
        }
    }

    requestAnimationFrame(draw);
}

updateHeight();
setTimeout(() => { updateHeight(); setInterval(toggle, 3000); }, 500);
window.addEventListener('resize', resize);
resize();
draw();

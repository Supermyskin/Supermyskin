const damian = document.getElementById('ascii-damian');
const handle = document.getElementById('ascii-handle');
const wrapper = document.getElementById('asciiWrapper');

let showingDamian = true;

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

updateHeight();
setTimeout(() => { updateHeight(); setInterval(toggle, 3000); }, 500);
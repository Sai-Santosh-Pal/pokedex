const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

function redOn() {
    document.getElementById("red-light").classList.replace("bg-[#DD092D]/60", "bg-[#DD092D]")
}

function redOff() {
    document.getElementById("red-light").classList.replace("bg-[#DD092D]", "bg-[#DD092D]/60")
}

function yellowOn() {
    document.getElementById("yellow-light").classList.replace("bg-[#F5E851]/60", "bg-[#F5E851]")
}

function yellowOff() {
    document.getElementById("yellow-light").classList.replace("bg-[#F5E851]", "bg-[#F5E851]/60")
}

function greenOn() {
    document.getElementById("green-light").classList.replace("bg-[#5AA861]/60", "bg-[#5AA861]")
}

function greenOff() {
    document.getElementById("green-light").classList.replace("bg-[#5AA861]", "bg-[#5AA861]/60")
}

function blueOn() {
    document.getElementById("blue-light").classList.replace("bg-[#23abfa]", "bg-white")
}

function blueOff() {
    document.getElementById("blue-light").classList.replace("bg-white","bg-[#23abfa]")
}

async function blueClick(rep) {
    for (let k = 0; k < rep; k++){
        blueOn()
        await sleep(250)
        blueOff()
        await sleep(250)
    }
}

async function redFlicker(rep){ 
    for (let k = 0; k < rep; k++) {
        redOn()
        await sleep(250)
        redOff()
        await sleep(250)
        yellowOn()
        await sleep(250)
        yellowOff()
        await sleep(250)
        greenOn()
        await sleep(250)
        greenOff()
        await sleep(250)
    }
}

async function yellowFlicker(rep){ 
    for (let k = 0; k < rep; k++) {
        yellowOn()
        await sleep(250)
        yellowOff()
        await sleep(250)
        greenOn()
        await sleep(250)
        greenOff()
        await sleep(250)
        redOn()
        await sleep(250)
        redOff()
        await sleep(250)
    }
}

async function greenFlicker(rep){ 
    for (let k = 0; k < rep; k++) {
        greenOn()
        await sleep(250)
        greenOff()
        await sleep(250)
        redOn()
        await sleep(250)
        redOff()
        await sleep(250)
        yellowOn()
        await sleep(250)
        yellowOff()
        await sleep(250)
    }
}

function addCard() {
    blueClick(3)
    redFlicker(1)
    showModal()
}

function nextCard() {
    alert('next card')
}

function prevCard() {
    alert('prev card')
}

function showModal() {
    document.getElementById('modal').classList.replace('hidden', 'absolute')
    document.getElementById('pokedex').classList.add('opacity-60')
}

function hideModal()  {
    blueClick(3)
    redFlicker(1)
    document.getElementById('modal').classList.replace('absolute', 'hidden')
    document.getElementById('pokedex').classList.remove('opacity-60')
}

function pixelate(el, p = 3) {
  const cs = getComputedStyle(el), w = el.offsetWidth, h = el.offsetHeight;
  const bw = Math.round(parseFloat(cs.borderTopWidth) / p) * p, col = cs.borderTopColor;
  const rad = cs.borderTopLeftRadius;
  const r = rad.endsWith('%') ? Math.min(w, h) * parseFloat(rad) / 100 : parseFloat(rad);

  const c = document.createElement('canvas');
  c.width = Math.round(w / p); c.height = Math.round(h / p);
  const x = c.getContext('2d'), k = bw / p;
  const shape = (i, R) => { x.beginPath(); x.roundRect(i, i, c.width - 2 * i, c.height - 2 * i, R / p); x.fill(); };

  x.fillStyle = '#000'; shape(0, r);
  const mask = `url(${c.toDataURL()})`;

  x.clearRect(0, 0, c.width, c.height);
  x.fillStyle = col; shape(0, r);
  x.globalCompositeOperation = 'destination-out'; shape(k, Math.max(0, r - bw));
  const ring = `url(${c.toDataURL()})`;

  const s = el.style;
  s.border = s.borderRadius = '0';
  s.webkitMaskImage = s.maskImage = mask;
  s.webkitMaskSize = s.maskSize = '100% 100%';
  s.backgroundImage = ring;            // border ring on top
  s.backgroundSize = '100% 100%';
  s.backgroundRepeat = 'no-repeat';    // background-color from your classes still shows underneath
  s.imageRendering = 'pixelated';
}

document.querySelectorAll('.pixel').forEach(el => pixelate(el, 5));

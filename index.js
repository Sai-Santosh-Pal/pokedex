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
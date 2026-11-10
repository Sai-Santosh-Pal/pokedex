import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { onValue, getDatabase, ref, push, set } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyAGBAne-X3pwCXN_yoUijBiGZIBaaMfQTI",
    authDomain: "friend-dex-5c427.firebaseapp.com",
    projectId: "friend-dex-5c427",
    databaseURL: "https://friend-dex-5c427-default-rtdb.firebaseio.com",
    storageBucket: "friend-dex-5c427.firebasestorage.app",
    messagingSenderId: "1042619963341",
    appId: "1:1042619963341:web:2385c7b73d777e3e229684",
    measurementId: "G-BCZMY9QXQL"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app)

const IMGBB_API = "f89a0083ad71840a3a3e8e55b51c3e88"

document.getElementById("form").addEventListener("submit", async(e)=>{
    e.preventDefault()
    const btn = document.getElementById("submitBtn")
    btn.innerHTML = "Uploading..."
    document.getElementById("form").reset()
    try {
        const image = document.getElementById("image").files[0]
        const formData = new FormData()
        formData.append("image", image)
        const upload = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API}`,
            {
                method: "POST",
                body: formData
            }
        )
        const uploadData = await upload.json()
        if (!uploadData.success) {
            throw new Error("img upload failed")
        }
        const url = uploadData.data.url
        const allData = {
            url,
            name: document.getElementById('name').value.trim(),
            type: document.getElementById('type').value.trim(),
            age: document.getElementById('evolution').value.trim(),
            funfact: document.getElementById('funfact').value.trim()
        }

        const dataRef = push(ref(db, "friend-dex"))
        await set(dataRef, allData)
        alert('done')
        btn.innerHTML = "Submit"
        hideModal()
    }
    catch (error) {
        alert(error)
        btn.innerHTML = "Submit"
    }
})

let cards = []
let current = 0

onValue(ref(db, "friend-dex"), (snapshot) => {
    const data = snapshot.val() || {}
    cards = Object.entries(data).map(([id, v]) => ({id, ...v}))
    if (current >= cards.length) current = 0
    console.log(data)
    console.log(cards[0])
    showCard()
}, (error) => {
    console.log(error)
})

function showCard() {
    const img = document.getElementById("img")
    if (!cards.length) {
        document.getElementById("name").innerHTML = "no cards found"
        document.getElementById("which-type").innerHTML = "add a card to view it!"
        img.src = "https://cdn-icons-png.flaticon.com/512/755/755014.png"
        return
    }
    const c = cards[current]
    img.src = c.url
    document.getElementById("name").innerHTML = c.name
    document.getElementById("which-type").innerHTML = c.type
    document.getElementById("type").innerHTML = c.type
    document.getElementById("age").innerHTML = c.age
    document.getElementById("funfact").innerHTML = c.funfact
}

function nextCard() {
    if (!cards.length) return
    current = (current + 1) % cards.length
    showCard()
}

function prevCard() {
    if (!cards.length) return
    current = (current - 1 + cards.length) % cards.length
    showCard()
}

Object.assign(window, { nextCard, prevCard, addCard, hideModal, blueClick, redFlicker, yellowFlicker, greenFlicker })
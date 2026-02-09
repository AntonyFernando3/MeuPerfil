import { auth, db } from "./firebase-config.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const nomeDisplay = document.getElementById("nome-usuario");
const linkSair = document.getElementById("btn-sair-link");

onAuthStateChanged(auth, async (user) => {
    if (user) {
        const docRef = doc(db, "usuarios", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists() && nomeDisplay) {
            nomeDisplay.textContent = docSnap.data().nome;
        }
    } else {
        window.location.href = "login.html";
    }
});

if (linkSair) {
    linkSair.addEventListener("click", (e) => {
        e.preventDefault();
        signOut(auth).then(() => { window.location.href = "index.html"; });
    });
}

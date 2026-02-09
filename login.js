import { auth } from "./firebase-config.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

document.getElementById("form-autenticacao").addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;
    const feedback = document.getElementById("mensagem-feedback");

    try {
        await signInWithEmailAndPassword(auth, email, senha);
        window.location.href = "bemvindo.html";
    } catch (error) {
        feedback.textContent = "E-mail ou senha incorretos.";
        feedback.style.color = "#d9534f";
        feedback.classList.remove("hidden");
    }
});

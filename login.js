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














import { auth } from "./firebase-config.js";
import { sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

const btnEsqueciSenha = document.getElementById("btn-esqueci-senha");

btnEsqueciSenha.addEventListener("click", async (e) => {
    e.preventDefault();
    
    const email = document.getElementById("email").value;
    const feedback = document.getElementById("mensagem-feedback");

    if (!email) {
        feedback.textContent = "Por favor, digite seu e-mail acima primeiro.";
        feedback.style.color = "orange";
        feedback.classList.remove("hidden");
        return;
    }

    try {
        await sendPasswordResetEmail(auth, email);
        feedback.textContent = "E-mail de redefinição enviado! Verifique sua caixa de entrada.";
        feedback.style.color = "green";
        feedback.classList.remove("hidden");
    } catch (error) {
        feedback.textContent = "Erro ao enviar e-mail: " + error.message;
        feedback.style.color = "#d9534f";
        feedback.classList.remove("hidden");
    }
});

import { auth } from "./firebase-config.js";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("form-autenticacao");
    const feedback = document.getElementById("mensagem-feedback");

    // Lógica de Login
    form.addEventListener("submit", async function(e) {
        e.preventDefault();
        const email = document.getElementById("email").value;
        const senha = document.getElementById("senha").value;

        feedback.classList.remove("hidden");
        feedback.textContent = "Autenticando...";
        feedback.style.color = "#0046c0";

        try {
            await signInWithEmailAndPassword(auth, email, senha);
            feedback.textContent = "Login bem-sucedido! Bem-vindo.";
            feedback.style.color = "green";
            setTimeout(() => { window.location.href = "bemvindo.html"; }, 1500);
        } catch (error) {
            feedback.style.color = "#d9534f";
            feedback.textContent = "E-mail ou senha incorretos.";
        }
    });

    // --- LÓGICA DO MODAL (REDEFINIÇÃO) ---
    const modal = document.getElementById("modal-esqueci-senha");
    const btnAbrirModal = document.getElementById("btn-esqueci-senha");
    const btnFecharModal = document.getElementById("fechar-modal");
    const btnEnviarEmail = document.getElementById("confirmar-envio");
    const feedbackModal = document.getElementById("feedback-modal");

    btnAbrirModal.addEventListener("click", (e) => {
        e.preventDefault();
        modal.classList.remove("hidden");
    });

    btnFecharModal.addEventListener("click", () => modal.classList.add("hidden"));

    btnEnviarEmail.addEventListener("click", async () => {
        const emailRecup = document.getElementById("email-recuperacao").value;
        if (!emailRecup) {
            feedbackModal.textContent = "Digite seu e-mail.";
            feedbackModal.classList.remove("hidden");
            return;
        }

        try {
            await sendPasswordResetEmail(auth, emailRecup);
            feedbackModal.textContent = "Link enviado! Verifique seu e-mail.";
            feedbackModal.style.color = "green";
            feedbackModal.classList.remove("hidden");
            setTimeout(() => { modal.classList.add("hidden"); }, 3000);
        } catch (error) {
            feedbackModal.textContent = "Erro ao enviar link.";
            feedbackModal.style.color = "#d9534f";
            feedbackModal.classList.remove("hidden");
        }
    });
});
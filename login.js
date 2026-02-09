import { auth } from "./firebase-config.js";
import { 
    signInWithEmailAndPassword, 
    sendPasswordResetEmail 
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("form-autenticacao");
    const feedback = document.getElementById("mensagem-feedback");

    // --- LÓGICA DE LOGIN ---
    if (form) {
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
                const card = document.querySelector(".card-acessar");
                if (card) {
                    card.style.animation = "shake 0.5s";
                    setTimeout(() => card.style.animation = "", 500);
                }
            }
        });
    }

    // --- LÓGICA DO MODAL (REDEFINIÇÃO DE SENHA) ---
    const modal = document.getElementById("modal-esqueci-senha");
    const btnAbrirModal = document.getElementById("btn-esqueci-senha");
    const btnFecharModal = document.getElementById("fechar-modal");
    const btnEnviarEmail = document.getElementById("confirmar-envio");
    const feedbackModal = document.getElementById("feedback-modal");

    if (btnAbrirModal && modal) {
        btnAbrirModal.addEventListener("click", (e) => {
            e.preventDefault();
            modal.classList.remove("hidden");
        });
    }

    if (btnFecharModal) {
        btnFecharModal.addEventListener("click", () => {
            modal.classList.add("hidden");
            if (feedbackModal) feedbackModal.classList.add("hidden");
        });
    }

    if (btnEnviarEmail) {
        btnEnviarEmail.addEventListener("click", async () => {
            const emailRecuperacao = document.getElementById("email-recuperacao").value;

            if (!emailRecuperacao) {
                feedbackModal.textContent = "Por favor, digite seu e-mail.";
                feedbackModal.style.color = "orange";
                feedbackModal.classList.remove("hidden");
                return;
            }

            try {
                await sendPasswordResetEmail(auth, emailRecuperacao);
                feedbackModal.textContent = "Link enviado! Verifique sua caixa.";
                feedbackModal.style.color = "green";
                feedbackModal.classList.remove("hidden");
                setTimeout(() => { modal.classList.add("hidden"); }, 3000);
            } catch (error) {
                feedbackModal.style.color = "#d9534f";
                feedbackModal.textContent = "Erro ao enviar. Tente novamente.";
                feedbackModal.classList.remove("hidden");
            }
        });
    }
});

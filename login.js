import { auth } from "./firebase-config.js";
import { 
    signInWithEmailAndPassword, 
    sendPasswordResetEmail // Adicionamos esta função para a redefinição
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("form-autenticacao");
    const feedback = document.getElementById("mensagem-feedback");

    // --- LÓGICA DE LOGIN ---
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
            if (error.code === 'auth/invalid-credential') {
                feedback.textContent = "E-mail ou senha incorretos.";
            } else {
                feedback.textContent = "Erro ao entrar: Verifique sua conexão.";
            }
            const card = document.querySelector(".card-acessar");
            card.style.animation = "shake 0.5s";
            setTimeout(() => card.style.animation = "", 500);
        }
    });

    // --- LÓGICA DO MODAL (REDEFINIÇÃO DE SENHA) ---
    const modal = document.getElementById("modal-esqueci-senha");
    const btnAbrirModal = document.getElementById("btn-esqueci-senha");
    const btnFecharModal = document.getElementById("fechar-modal");
    const btnEnviarEmail = document.getElementById("confirmar-envio");
    const feedbackModal = document.getElementById("feedback-modal");

    // Abrir Modal
    btnAbrirModal.addEventListener("click", (e) => {
        e.preventDefault();
        modal.classList.remove("hidden");
    });

    // Fechar Modal
    btnFecharModal.addEventListener("click", () => {
        modal.classList.add("hidden");
        feedbackModal.classList.add("hidden");
    });

    // Enviar E-mail de Recuperação
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
            feedbackModal.textContent = "Link enviado! Verifique sua caixa de entrada.";
            feedbackModal.style.color = "green";
            feedbackModal.classList.remove("hidden");

            // Fecha o modal automaticamente após 3 segundos
            setTimeout(() => {
                modal.classList.add("hidden");
                feedbackModal.classList.add("hidden");
            }, 3000);

        } catch (error) {
            feedbackModal.style.color = "#d9534f";
            feedbackModal.classList.remove("hidden");
            if (error.code === 'auth/user-not-found') {
                feedbackModal.textContent = "Este e-mail não está cadastrado.";
            } else {
                feedbackModal.textContent = "Erro ao enviar. Tente novamente mais tarde.";
            }
        }
    });
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


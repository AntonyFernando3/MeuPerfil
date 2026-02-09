import { auth } from "./firebase-config.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("form-autenticacao");
    const feedback = document.getElementById("mensagem-feedback");

    form.addEventListener("submit", async function(e) {
        e.preventDefault();

        const email = document.getElementById("email").value;
        const senha = document.getElementById("senha").value;

        // Feedback de carregamento
        feedback.classList.remove("hidden");
        feedback.textContent = "Autenticando...";
        feedback.style.color = "#0046c0";

        try {
            // Tenta realizar o login
            await signInWithEmailAndPassword(auth, email, senha);

            feedback.textContent = "Login bem-sucedido! Bem-vindo.";
            feedback.style.color = "green";

            // Redireciona para a página de destino após sucesso
            setTimeout(() => {
                window.location.href = "bemvindo.html";
            }, 1500);

        } catch (error) {
            feedback.style.color = "#d9534f";
            
            // Tratamento de erros de login
            if (error.code === 'auth/invalid-credential') {
                feedback.textContent = "E-mail ou senha incorretos.";
            } else if (error.code === 'auth/user-not-found') {
                feedback.textContent = "Usuário não encontrado.";
            } else {
                feedback.textContent = "Erro ao entrar: Verifique sua conexão.";
            }

            // Efeito visual de erro no card (opcional)
            const card = document.querySelector(".card-acessar");
            card.style.animation = "shake 0.5s";
            setTimeout(() => card.style.animation = "", 500);
        }
    });
});
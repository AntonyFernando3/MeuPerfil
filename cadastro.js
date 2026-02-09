import { auth, db } from "./firebase-config.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

document.getElementById("form-cadastro").addEventListener("submit", async function(e) {
    e.preventDefault();
    
    // Captura dos dados dos campos com as classes que criamos
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;
    const confirmaSenha = document.getElementById("confirmar-senha").value;
    const feedback = document.getElementById("mensagem-feedback");

    // Validação básica de segurança (UX)
    if (senha !== confirmaSenha) {
        feedback.textContent = "As senhas não coincidem!";
        feedback.style.color = "#d9534f"; // Vermelho
        feedback.classList.remove("hidden");
        return;
    }

    try {
        // 1. Cria o usuário no Firebase Authentication
        const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
        const user = userCredential.user;

        // 2. Salva o Nome no Firestore usando o UID (ID único) do usuário
        // Criamos uma coleção chamada "usuarios" e um documento com o ID do usuário
        await setDoc(doc(db, "usuarios", user.uid), {
            nome: nome,
            email: email,
            dataCadastro: new Date()
        });

        feedback.textContent = "Conta criada com sucesso! Redirecionando...";
        feedback.style.color = "green";
        feedback.classList.remove("hidden");

        // Redireciona após 2 segundos para o login
        setTimeout(() => {
            window.location.href = "login.html";
        }, 2000);

    } catch (error) {
        feedback.style.color = "#d9534f";
        feedback.classList.remove("hidden");
        
        // Tratamento de erros comuns
        if (error.code === 'auth/email-already-in-use') {
            feedback.textContent = "Este e-mail já está em uso.";
        } else if (error.code === 'auth/weak-password') {
            feedback.textContent = "A senha deve ter pelo menos 6 caracteres.";
        } else {
            feedback.textContent = "Erro: " + error.message;
        }
    }
});
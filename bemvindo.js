import { auth, db } from "./firebase-config.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// Seleção dos elementos do HTML
const nomeDisplay = document.getElementById("nome-usuario");
const linkSair = document.getElementById("btn-sair-link");

/**
 * 1. Monitoramento do Estado de Autenticação
 * Este observador verifica se há um usuário conectado assim que a página carrega.
 */
onAuthStateChanged(auth, async (user) => {
    if (user) {
        // O usuário está logado. Vamos buscar o Nome no Firestore usando o UID único.
        try {
            const docRef = doc(db, "usuarios", user.uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                // Insere o nome salvo durante o cadastro no elemento span do seu HTML
                if (nomeDisplay) {
                    nomeDisplay.textContent = docSnap.data().nome;
                }
            } else {
                console.log("Nenhum dado encontrado no Firestore para este UID.");
                if (nomeDisplay) nomeDisplay.textContent = "Usuário";
            }
        } catch (error) {
            console.error("Erro ao buscar dados do usuário:", error);
            if (nomeDisplay) nomeDisplay.textContent = "Visitante";
        }
    } else {
        // SEGURANÇA: Se não houver usuário logado, redireciona para a página de login.
        // Isso impede que alguém acesse a área logada apenas digitando a URL.
        window.location.href = "login.html";
    }
});

/**
 * 2. Lógica de Logout (Sair)
 * Configura o evento de clique no link que você adicionou à sua lista <ul>.
 */
if (linkSair) {
    linkSair.addEventListener("click", (e) => {
        e.preventDefault(); // Impede o comportamento padrão do link (#)

        // Comando oficial do Firebase para encerrar a sessão
        signOut(auth).then(() => {
            console.log("Usuário deslogado com sucesso.");
            // Redireciona para a página inicial após sair
            window.location.href = "index.html";
        }).catch((error) => {
            alert("Erro ao tentar sair: " + error.message);
        });
    });
}
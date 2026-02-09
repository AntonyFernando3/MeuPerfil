import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// Suas chaves do Console do Firebase
const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "antonytechnology.firebaseapp.com",
  projectId: "antonytechnology",
  storageBucket: "antonytechnology.appspot.com",
  messagingSenderId: "SEU_ID",
  appId: "SEU_APP_ID"
};

// Inicialização
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); // Exporta para usar no login/cadastro
export const db = getFirestore(app); // Exporta para usar no banco de dados
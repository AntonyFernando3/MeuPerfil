import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// Suas chaves do Console do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDB3xuL_s5GslT60J3YKHCwFipo7pDl6L8",
  authDomain: "antonytechnology.firebaseapp.com",
  projectId: "antonytechnology",
  storageBucket: "antonytechnology.appspot.com",
  messagingSenderId: "1005968563727",
  appId: "1:1005968563727:web:f0a2cf91b463b0f9684d7a"
};

// Inicialização
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); // Exporta para usar no login/cadastro
export const db = getFirestore(app); // Exporta para usar no banco de dados
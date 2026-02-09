// REDIRECIONAMENTO.HTML -----------------------------------------------

let countdownElement = document.getElementById('countdown');
let countdownValue = 5;

function updateCountdown() {
    countdownValue--;
    countdownElement.textContent = countdownValue;
    
    if (countdownValue <= 0) {
        clearInterval(timer);
        window.location.href = 'https://wa.me/5511939064011';
    }
}

let timer = setInterval(updateCountdown, 1000);

// CURRICULO.HTML -----------------------------------------------

document.addEventListener("DOMContentLoaded", function() {
    
    // Seleção dos elementos via ID
    const botao = document.getElementById("btn-acessar");
    const input = document.getElementById("input-codigo");
    const msgErro = document.getElementById("mensagem-erro");
    const pdfContainer = document.getElementById("pdf-container");

    // Código de acesso 
    const CODIGO_CORRETO = "ANTONY23"; 

    // Função que valida o código
    botao.addEventListener("click", function() {
        const valorDigitado = input.value.trim();

        // Verifica se o código está correto (Ignora maiúsculas/minúsculas com toUpperCase)
        if (valorDigitado.toUpperCase() === CODIGO_CORRETO) {
            // Caso Sucesso: Mostra o PDF e esconde erro
            pdfContainer.classList.remove("hidden");
            msgErro.classList.add("hidden");
            
            // Rola a tela suavemente até o currículo
            pdfContainer.scrollIntoView({ behavior: 'smooth' });
        } else {
            // Caso Erro: Mostra mensagem e garante que o PDF suma
            msgErro.classList.remove("hidden");
            pdfContainer.classList.add("hidden");
            
            // Limpa o campo para o usuário tentar de novo
            input.value = "";
            input.focus();
        }
    });

    // Atalho: Permite que o recrutador aperte "Enter" no teclado para validar
    input.addEventListener("keypress", function(e) {
        if (e.key === "Enter") {
            botao.click();
        }
    });
});

// btoão solicitar código de acesso

document.addEventListener("DOMContentLoaded", function() {
    // ... seu código anterior do botão acessar ...

    const btnSolicitar = document.getElementById("btn-solicitar");

    btnSolicitar.addEventListener("click", function() {
        const numeroTelefone = "5511939064011"; // Coloque seu número real aqui
        const mensagem = encodeURIComponent("Olá! Gostaria de solicitar o código de acesso para visualizar seu currículo.");
        const urlWhatsApp = `https://wa.me/${numeroTelefone}?text=${mensagem}`;
        
        // Abre o WhatsApp em uma nova aba
        window.open(urlWhatsApp, "_blank");
    });
});
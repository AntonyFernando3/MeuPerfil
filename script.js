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
    
    // 1. Seleção dos elementos via ID
    const botao = document.getElementById("btn-acessar");
    const input = document.getElementById("input-codigo");
    const msgErro = document.getElementById("mensagem-erro");
    const pdfContainer = document.getElementById("pdf-container");
    const meuIframe = document.getElementById("meu-pdf");
    const btnSolicitar = document.getElementById("btn-solicitar");

    // 2. Configurações (Código de acesso e Caminho do PDF)
    const CODIGO_CORRETO = "ANTONY23"; 
    const CAMINHO_PDF = "pdf/Curriculo - Modelo Padrão João.pdf"; 

    // 3. Função que valida o código e libera o acesso
    botao.addEventListener("click", function() {
        const valorDigitado = input.value.trim();

        // Verifica se o código está correto (Ignora maiúsculas/minúsculas)
        if (valorDigitado.toUpperCase() === CODIGO_CORRETO) {
            
            // SEGURANÇA: Injeta o link do PDF apenas no momento do acerto
            meuIframe.src = CAMINHO_PDF; 

            // Caso Sucesso: Mostra o container e esconde mensagens de erro
            pdfContainer.classList.remove("hidden");
            msgErro.classList.add("hidden");
            
            // Rola a tela suavemente até o currículo para facilitar a visualização no S23
            pdfContainer.scrollIntoView({ behavior: 'smooth' });

        } else {
            // Caso Erro: Mostra mensagem e garante que o PDF e o link sumam
            msgErro.classList.remove("hidden");
            pdfContainer.classList.add("hidden");
            meuIframe.src = ""; // Remove o link por segurança
            
            // Limpa o campo para o usuário tentar de novo
            input.value = "";
            input.focus();
        }
    });

    // 4. Atalho: Permite que o recrutador aperte "Enter" no teclado
    input.addEventListener("keypress", function(e) {
        if (e.key === "Enter") {
            botao.click();
        }
    });

    // 5. Botão Solicitar Código via WhatsApp
    if (btnSolicitar) {
        btnSolicitar.addEventListener("click", function() {
            const numeroTelefone = "5511939064011"; 
            const mensagem = encodeURIComponent("Olá! Gostaria de solicitar o código de acesso para visualizar seu currículo.");
            const urlWhatsApp = `https://wa.me/${numeroTelefone}?text=${mensagem}`;
            
            window.open(urlWhatsApp, "_blank");
        });
    }

    // 6. Bloqueio preventivo de botão direito sobre o iframe (Opcional)
    document.addEventListener('contextmenu', event => {
        if (event.target.tagName === 'IFRAME') {
            event.preventDefault();
        }
    });
});
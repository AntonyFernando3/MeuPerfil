let countdownElement = document.getElementById('countdown');
let countdownValue = 5;

function updateCountdown() {
    countdownValue--;
    countdownElement.textContent = countdownValue;
    
    if (countdownValue <= 0) {
        clearInterval(timer);
        window.location.href = 'https://wa.me/5511939064011?text=Oi!%20Estou%20entrando%20em%20contato%20por%20meio%20do%20seu%20portfolio.%20';
    }
}

let timer = setInterval(updateCountdown, 1000);

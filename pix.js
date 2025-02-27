// Inicializar o Mercado Pago
const mp = new MercadoPago('TEST-ed288066-ff52-4aa4-b486-c281db189ee9');

async function gerarQRCodePix(valor, pacote) {
    try {
        const response = await fetch('/criar-pix', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                valor: valor,
                descricao: `Pacote ${pacote} - 100 Quedas Web`
            })
        });

        const data = await response.json();

        // Exibir QR Code
        document.getElementById('qr-code').innerHTML = `
            <img src="${data.qr_code_base64}" alt="QR Code PIX" class="img-fluid">
        `;

        // Adicionar código PIX para copiar e colar
        document.getElementById('pixCopyPaste').value = data.qr_code;

        // Iniciar verificação de status
        verificarStatusPagamento(data.id);
    } catch (error) {
        console.error('Erro ao gerar PIX:', error);
        alert('Erro ao gerar QR Code. Por favor, tente novamente.');
    }
}

function copyPixCode() {
    const pixInput = document.getElementById('pixCopyPaste');
    pixInput.select();
    document.execCommand('copy');
    alert('Código PIX copiado!');
}

async function verificarStatusPagamento(pixId) {
    const statusElement = document.getElementById('statusPagamento');
    statusElement.classList.remove('d-none');

    while (true) {
        try {
            const response = await fetch(`/verificar-pix/${pixId}`);
            const data = await response.json();

            if (data.status === 'approved') {
                statusElement.classList.remove('alert-info');
                statusElement.classList.add('alert-success');
                statusElement.innerHTML = 'Pagamento confirmado! Redirecionando...';

                // Redirecionar após confirmação
                setTimeout(() => {
                    window.location.href = 'confirmacao.html';
                }, 2000);

                break;
            }

            // Verificar novamente em 5 segundos
            await new Promise(resolve => setTimeout(resolve, 5000));
        } catch (error) {
            console.error('Erro ao verificar status:', error);
        }
    }
}

// Quando a página carregar, gerar o QR Code
document.addEventListener('DOMContentLoaded', function () {
    const params = new URLSearchParams(window.location.search);
    const pacote = params.get('pacote');
    const valores = {
        basico: 699,
        profissional: 1499,
        premium: 2499
    };

    if (pacote && valores[pacote]) {
        gerarQRCodePix(valores[pacote], pacote);
    }
});

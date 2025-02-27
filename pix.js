// Inicializar o Mercado Pago com a Public Key de produção
const mp = new MercadoPago('APP_USR-d2dff723-1894-4110-a5c9-8d02b557918b');

async function gerarQRCodePix(pacote) {
    try {
        const response = await fetch('/criar-pix', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ pacote })
        });

        const data = await response.json();

        // Exibir QR Code
        document.getElementById('qr-code').innerHTML = `
            <img src="${data.qr_code_base64}" alt="QR Code PIX" class="img-fluid mb-3">
            <p class="mb-2">Valor a pagar: R$ ${data.valor.toFixed(2)}</p>
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

    if (pacote) {
        gerarQRCodePix(pacote);
    }
});

document.addEventListener('DOMContentLoaded', function () {
    // Carregar dados do pacote selecionado
    const urlParams = new URLSearchParams(window.location.search);
    const pacote = urlParams.get('pacote');

    if (pacote) {
        loadPackageDetails(pacote);
    } else {
        window.location.href = 'index.html'; // Redirecionar se não houver pacote selecionado
    }

    // Ativar tabs de pagamento
    const triggerTabList = [].slice.call(document.querySelectorAll('#paymentTabs button'));
    triggerTabList.forEach(function (triggerEl) {
        const tabTrigger = new bootstrap.Tab(triggerEl);
        triggerEl.addEventListener('click', function (event) {
            event.preventDefault();
            tabTrigger.show();
            document.querySelectorAll('.payment-form').forEach(form => {
                form.classList.add('show');
            });
        });
    });

    // Inicializar validação de formulários
    const forms = document.querySelectorAll('.needs-validation');
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            } else {
                event.preventDefault();
                showSuccessModal();
            }
            form.classList.add('was-validated');
        }, false);
    });

    // Mostrar a tab apropriada com base na URL
    const hash = window.location.hash;
    if (hash) {
        const tab = document.querySelector(`#paymentTabs button[data-bs-target="${hash}"]`);
        if (tab) tab.click();
    }

    // Atualizar QR code com base no pacote selecionado
    const qrCodeImg = document.querySelector('.qr-code-img');
    if (qrCodeImg && pacote) {
        switch (pacote) {
            case 'basico':
                qrCodeImg.src = 'imgs/qr-pix.png';
                break;
            case 'profissional':
                qrCodeImg.src = 'imgs/qr-profissional-pix.png';
                break;
            case 'premium':
                qrCodeImg.src = 'imgs/qr-premium-pix.png';
                break;
            default:
                qrCodeImg.src = 'imgs/qr-pix.png';
                break;
        }
    }

    // Configurar dados de PIX
    const pixInfo = {
        chave: '14751922408',
        tipo: 'CPF',
        nome: 'Joel Melo da Silva'
    };

    // Atualizar informações de PIX se os elementos existirem
    const pixKeyInput = document.getElementById('pixKey');
    if (pixKeyInput) {
        pixKeyInput.value = pixInfo.chave;
    }
});

// Função para carregar detalhes do pacote
function loadPackageDetails(pacote) {
    const pacoteInfo = {
        basico: {
            nome: "Pacote Básico",
            preco: "R$ 100,00",
            detalhes: [
                "Site de 3 a 5 páginas",
                "Design responsivo",
                "Formulário de contato",
                "Otimização para SEO básica",
                "Entrega em até 7 dias"
            ]
        },
        profissional: {
            nome: "Pacote Profissional",
            preco: "R$ 200,00",
            detalhes: [
                "Site de 5 a 10 páginas",
                "Design personalizado e responsivo",
                "Blog integrado",
                "Formulários avançados",
                "SEO otimizado",
                "Integração com redes sociais",
                "Entrega em até 15 dias"
            ]
        },
        premium: {
            nome: "Pacote Premium",
            preco: "R$ 300,00",
            detalhes: [
                "Site completo com até 20 páginas",
                "Design premium exclusivo",
                "Sistema de blog avançado",
                "Área de membros",
                "Otimização SEO avançada",
                "Integração com sistemas de pagamento",
                "Treinamento de administração do site",
                "Suporte prioritário por 30 dias",
                "Entrega em até 30 dias"
            ]
        }
    };

    // Verificar se o pacote existe
    if (pacoteInfo[pacote]) {
        const info = pacoteInfo[pacote];
        document.getElementById('pacoteNome').textContent = info.nome;
        document.getElementById('pacotePreco').textContent = info.preco;

        // Limpar e preencher detalhes
        const detalhesElement = document.getElementById('pacoteDetalhes');
        detalhesElement.innerHTML = '';

        const ul = document.createElement('ul');
        ul.className = 'list-unstyled';

        info.detalhes.forEach(detalhe => {
            const li = document.createElement('li');
            li.className = 'mb-2';
            li.innerHTML = `<i class="bi bi-check-lg text-primary me-2"></i>${detalhe}`;
            ul.appendChild(li);
        });

        detalhesElement.appendChild(ul);

        // Ajustar link do WhatsApp
        const whatsappLinks = document.querySelectorAll('a[href^="https://wa.me"]');
        whatsappLinks.forEach(link => {
            if (link.href.includes('?text=')) {
                link.href += ` ${info.nome} (${info.preco})`;
            }
        });

    } else {
        // Pacote não encontrado, redirecionar
        window.location.href = 'index.html';
    }
}

// Função para formatar número do cartão
function formatCardNumber(input) {
    // Remover caracteres não numéricos
    let value = input.value.replace(/\D/g, '');

    // Adicionar espaços a cada 4 dígitos
    let formattedValue = '';
    for (let i = 0; i < value.length; i++) {
        if (i > 0 && i % 4 === 0) {
            formattedValue += ' ';
        }
        formattedValue += value[i];
    }

    input.value = formattedValue;
}

// Função para formatar data de validade
function formatCardExpiry(input) {
    let value = input.value.replace(/\D/g, '');

    // Limitar a 4 dígitos (MMAA)
    if (value.length > 4) {
        value = value.slice(0, 4);
    }

    // Adicionar barra após o mês
    if (value.length > 2) {
        input.value = value.slice(0, 2) + '/' + value.slice(2);
    } else {
        input.value = value;
    }
}

// Função para atualizar o visual do cartão
function updateCardDisplay() {
    const cardNumber = document.getElementById('cardNumber').value;
    const cardName = document.getElementById('cardName').value;
    const cardExpiry = document.getElementById('cardExpiry').value;

    // Atualizar número do cartão
    if (cardNumber) {
        document.getElementById('cardDisplayNumber').textContent = cardNumber;
    } else {
        document.getElementById('cardDisplayNumber').textContent = '•••• •••• •••• ••••';
    }

    // Atualizar nome do titular
    if (cardName) {
        document.getElementById('cardDisplayName').textContent = cardName.toUpperCase();
    } else {
        document.getElementById('cardDisplayName').textContent = 'Seu Nome';
    }

    // Atualizar data de validade
    if (cardExpiry) {
        document.getElementById('cardDisplayExpiry').textContent = cardExpiry;
    } else {
        document.getElementById('cardDisplayExpiry').textContent = 'MM/AA';
    }
}

// Função para copiar chave PIX para o clipboard
function copyToClipboard(elementId) {
    const copyText = document.getElementById(elementId);
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(copyText.value)
        .then(() => {
            const successAlert = document.getElementById('copySuccess');
            successAlert.classList.remove('d-none');
            setTimeout(() => {
                successAlert.classList.add('d-none');
            }, 2000);
        })
        .catch(err => {
            console.error('Erro ao copiar texto: ', err);
            alert('Não foi possível copiar automaticamente. Por favor, copie manualmente.');
        });
}

// Função para mostrar modal de sucesso após envio do formulário
function showSuccessModal() {
    // Criar modal dinamicamente
    const modalHtml = `
    <div class="modal fade" id="successModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header bg-success text-white">
                    <h5 class="modal-title">Pagamento Processado</h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body text-center py-4">
                    <i class="bi bi-check-circle-fill text-success display-1 mb-3"></i>
                    <h4>Pagamento Recebido!</h4>
                    <p class="mb-4">Agradecemos sua confiança. Entraremos em contato em breve para dar início ao seu projeto.</p>
                    <div class="d-grid">
                        <a href="index.html" class="btn btn-primary">Voltar para a Página Inicial</a>
                    </div>
                </div>
            </div>
        </div>
    </div>`;

    // Adicionar modal ao corpo do documento
    document.body.insertAdjacentHTML('beforeend', modalHtml);

    // Mostrar modal
    const successModal = new bootstrap.Modal(document.getElementById('successModal'));
    successModal.show();

    // Remover modal do DOM quando for fechado
    document.getElementById('successModal').addEventListener('hidden.bs.modal', function () {
        this.remove();
        window.location.href = 'index.html';
    });
}

// Detectar se é dispositivo móvel para melhorar experiência
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || window.innerWidth < 768;
if (isMobile) {
    document.addEventListener('DOMContentLoaded', function () {
        // Ajustar tamanho das fontes para melhor legibilidade em telas pequenas
        document.querySelectorAll('.card-body h3, .card-title').forEach(element => {
            element.style.fontSize = '1.25rem';
        });

        // Melhorar tamanho de toque em elementos interativos
        document.querySelectorAll('.nav-tabs .nav-link').forEach(tab => {
            tab.style.padding = '0.75rem 0.5rem';
        });
    });
}

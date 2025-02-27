document.addEventListener('DOMContentLoaded', function () {
    // Bootstrap form validation
    const forms = document.querySelectorAll('.needs-validation');

    forms.forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            } else {
                event.preventDefault();
                // Aqui você pode adicionar o código para enviar o formulário
                alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
                form.reset();
            }
            form.classList.add('was-validated');
        });
    });

    // Navbar scroll behavior
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('navbar-scrolled', 'shadow-sm');
        } else {
            navbar.classList.remove('navbar-scrolled', 'shadow-sm');
        }
    });

    // Smooth scroll para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const elementPosition = target.offsetTop;
            const offsetPosition = elementPosition - navbarHeight;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        });
    });

    // Animação de reveal ao scroll com Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el));
});

// Função para pegar o pacote selecionado da URL
function getPacoteFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const pacote = urlParams.get('pacote');
    if (pacote) {
        const whatsappLink = document.querySelector('.btn-success');
        if (whatsappLink) {
            whatsappLink.href += ` ${pacote.charAt(0).toUpperCase() + pacote.slice(1)}`;
        }
    }
}

// Executar quando estiver na página de pagamento
if (window.location.pathname.includes('pagamento.html')) {
    getPacoteFromURL();
}

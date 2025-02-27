document.addEventListener('DOMContentLoaded', function () {
    // Bootstrap form validation
    const forms = document.querySelectorAll('.needs-validation');
    if (forms.length > 0) {
        forms.forEach(form => {
            form.addEventListener('submit', event => {
                if (!form.checkValidity()) {
                    event.preventDefault();
                    event.stopPropagation();
                } else {
                    event.preventDefault();
                    alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
                    form.reset();
                }
                form.classList.add('was-validated');
            });
        });
    }

    // Navbar scroll behavior
    const navbar = document.querySelector('.navbar');
    if (navbar) { // Verificar se o navbar existe na página atual
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                navbar.classList.add('navbar-scrolled', 'shadow-sm');
            } else {
                navbar.classList.remove('navbar-scrolled', 'shadow-sm');
            }
        });
    }

    // Melhorar o comportamento de scroll para links internos
    /*
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    */

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

    // Observar elementos fade-in apenas se existirem
    const fadeElements = document.querySelectorAll('.fade-in');
    if (fadeElements.length > 0) {
        fadeElements.forEach((el) => observer.observe(el));
    }

    // Animação ao scroll
    const observer2 = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-up');

                // Efeito cascata para cards
                if (entry.target.children.length > 0) {
                    Array.from(entry.target.children).forEach((child, index) => {
                        setTimeout(() => {
                            child.classList.add('animate-fade-up');
                        }, index * 200);
                    });
                }
            }
        });
    }, {
        threshold: 0.1
    });

    // Observar seções apenas se existirem
    const sections = document.querySelectorAll('section');
    if (sections.length > 0) {
        sections.forEach(section => observer2.observe(section));
    }

    // Observar cards apenas se existirem
    const cards = document.querySelectorAll('.service-card, .portfolio-card, .card');
    if (cards.length > 0) {
        cards.forEach(card => observer2.observe(card));

        // Hover effects para cards
        cards.forEach(card => {
            card.addEventListener('mouseenter', function () {
                this.style.transform = 'translateY(-10px) scale(1.02)';
            });

            card.addEventListener('mouseleave', function () {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
    }

    // Efeito de partículas no hero (opcional)
    const hero = document.querySelector('.custom-hero');
    if (hero) {
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 5 + 's';
            hero.appendChild(particle);
        }
    }
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
    document.addEventListener('DOMContentLoaded', getPacoteFromURL);
}

// Função para revelar elementos gradualmente
function revealOnScroll() {
    const elements = document.querySelectorAll('.fade-in');
    if (elements.length > 0) {
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            const isVisible = (elementTop >= 0) && (elementBottom <= window.innerHeight);

            if (isVisible) {
                element.classList.add('visible');
            }
        });
    }
}

// Listener para scroll apenas se houver elementos fade-in
if (document.querySelectorAll('.fade-in').length > 0) {
    window.addEventListener('scroll', revealOnScroll);
    window.addEventListener('load', revealOnScroll);
}

// Função simplificada para scroll suave (usar com os botões onclick)
function scrollToElement(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
}

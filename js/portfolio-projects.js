// Portfolio projects data management

// Array of project objects
const portfolioProjects = [
    {
        id: 'lava-rapido',
        title: 'Lava Rápido',
        description: 'Site completo para serviço de lava rápido com sistema de agendamento online, catálogo de serviços e avaliações de clientes.',
        imagePath: 'imgs/lava-rapido.png',
        demoUrl: 'https://lava-rapido.vercel.app/',
        tags: ['React', 'CSS Avançado', 'Sistema de Agendamento', 'Responsivo']
    },
    // Outros projetos existentes podem ser adicionados aqui
];

// Função para renderizar os projetos no portfólio - DESATIVADA PARA USAR HTML ESTÁTICO
function renderPortfolioProjects() {
    // Não fazer nada - usar HTML estático em vez disso
    console.log("Usando projetos HTML estáticos em vez de renderização dinâmica");
    return;

    // Código original comentado
    /*
    const portfolioContainer = document.getElementById('portfolio-container');
    
    // Se o container não existir, não fazer nada
    if (!portfolioContainer) return;
    
    // Limpar o container antes de adicionar novos projetos
    portfolioContainer.innerHTML = '';
    
    // Adicionar cada projeto ao container
    portfolioProjects.forEach(project => {
        // Código de renderização...
    });
    */
}

// Função para exibir detalhes do projeto
function showProjectDetails(projectId) {
    const project = portfolioProjects.find(p => p.id === projectId);
    if (!project) return;

    // Aqui você pode implementar um modal ou navegação para uma página de detalhes
    alert(`Detalhes do projeto ${project.title} serão implementados em breve.`);
}

// Exportando as funções para uso global - modificada para não substituir o HTML
window.PortfolioManager = {
    renderProjects: function () {
        console.log("Portfolio manager: usando HTML estático");
    },
    getProjects: () => portfolioProjects
};

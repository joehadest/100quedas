const { MercadoPagoConfig, Preference } = require('mercadopago');

const client = new MercadoPagoConfig({
    accessToken: 'APP_USR-977854537663691-022713-268317c91d12368473bfd74ab450d580-277080573'
});

async function criarPreference() {
    const preference = new Preference(client);

    const dados = {
        title: "Pacote Completo - 100 Quedas",
        price: 1200.00
    };

    try {
        const result = await preference.create({
            body: {
                items: [
                    {
                        title: dados.title,
                        quantity: 1,
                        currency_id: 'BRL',
                        unit_price: dados.price
                    }
                ],
                back_urls: {
                    success: "https://seusite.com/confirmacao.html",
                    failure: "https://seusite.com/pagamento.html",
                    pending: "https://seusite.com/processando.html"
                },
                auto_return: "approved"
            }
        });

        console.log(`Preference ID criada:`, result.id);
        return result.id;
    } catch (error) {
        console.error('Erro ao criar preference:', error);
    }
}

// Criar preference única
criarPreference();

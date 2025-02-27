const { MercadoPagoConfig, Preference } = require('mercadopago');

const client = new MercadoPagoConfig({
    accessToken: 'APP_USR-977854537663691-022713-268317c91d12368473bfd74ab450d580-277080573'
});

async function criarPreference(pacote) {
    const preference = new Preference(client);

    const preferencesData = {
        basico: {
            title: "Pacote Básico - 100 Quedas",
            price: 699.00
        },
        profissional: {
            title: "Pacote Profissional - 100 Quedas",
            price: 1499.00
        },
        premium: {
            title: "Pacote Premium - 100 Quedas",
            price: 2499.00
        }
    };

    const dados = preferencesData[pacote];

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

        console.log(`Preference ID para ${pacote}:`, result.id);
        return result.id;
    } catch (error) {
        console.error('Erro ao criar preference:', error);
    }
}

// Criar preference para cada pacote
async function criarTodasPreferences() {
    const pacotes = ['basico', 'profissional', 'premium'];
    for (const pacote of pacotes) {
        await criarPreference(pacote);
    }
}

criarTodasPreferences();

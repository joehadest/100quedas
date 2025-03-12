require('dotenv').config();
const express = require('express');
const { MercadoPagoConfig, Payment } = require('mercadopago');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// Configurar Mercado Pago com credenciais de produção
const client = new MercadoPagoConfig({
    accessToken: 'APP_USR-977854537663691-022713-268317c91d12368473bfd74ab450d580-277080573'
});

const payment = new Payment(client);

// Mapeamento simplificado para único pacote
const PACOTE_INFO = {
    valor: 1200,
    nome: "Pacote Completo"
};

// Log para debug
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Rota para criar pagamento PIX
app.post('/criar-pix', async (req, res) => {
    try {
        console.log('Criando PIX para:', PACOTE_INFO);

        const paymentData = {
            transaction_amount: PACOTE_INFO.valor,
            description: `${PACOTE_INFO.nome} - 100 Quedas Web`,
            payment_method_id: 'pix',
            payer: {
                email: 'cliente@email.com',
                first_name: 'Cliente',
                last_name: 'Teste',
                identification: {
                    type: 'CPF',
                    number: '19119119100'
                }
            }
        };

        const result = await payment.create({ body: paymentData });
        console.log('Resposta MP:', result);

        res.json({
            id: result.id,
            qr_code: result.point_of_interaction.transaction_data.qr_code,
            qr_code_base64: result.point_of_interaction.transaction_data.qr_code_base64,
            valor: PACOTE_INFO.valor
        });
    } catch (error) {
        console.error('Erro:', error);
        res.status(500).json({ error: 'Erro ao gerar PIX' });
    }
});

// Rota para verificar status
app.get('/verificar-pix/:id', async (req, res) => {
    try {
        const result = await payment.get({ id: req.params.id });
        console.log('Status do pagamento:', result.status);
        res.json({ status: result.status });
    } catch (error) {
        console.error('Erro ao verificar PIX:', error);
        res.status(500).json({ error: 'Erro ao verificar pagamento' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    console.log('Access Token configurado:', client.accessToken);
});

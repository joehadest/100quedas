const express = require('express');
const { MercadoPagoConfig, Payment } = require('mercadopago');
const cors = require('cors');
const app = express();

// Configurar CORS e JSON
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// Configurar o Mercado Pago
const client = new MercadoPagoConfig({
    accessToken: 'TEST-6010629592504101-022709-648b176c25ac390a39085fd6832a225f-277080573'
});
const payment = new Payment(client);

// Rota para criar pagamento PIX
app.post('/criar-pix', async (req, res) => {
    try {
        const { valor, descricao } = req.body;

        const paymentData = {
            transaction_amount: valor,
            description: descricao,
            payment_method_id: 'pix',
            payer: {
                email: 'teste@email.com'
            }
        };

        const result = await payment.create({ body: paymentData });

        res.json({
            id: result.id,
            qr_code: result.point_of_interaction.transaction_data.qr_code,
            qr_code_base64: result.point_of_interaction.transaction_data.qr_code_base64
        });
    } catch (error) {
        console.error('Erro ao criar PIX:', error);
        res.status(500).json({ error: 'Erro ao gerar PIX' });
    }
});

// Rota para verificar status do pagamento
app.get('/verificar-pix/:id', async (req, res) => {
    try {
        const result = await payment.get({ id: req.params.id });
        res.json({ status: result.status });
    } catch (error) {
        console.error('Erro ao verificar PIX:', error);
        res.status(500).json({ error: 'Erro ao verificar pagamento' });
    }
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});

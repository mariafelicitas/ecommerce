// SDK de Mercado Pago
import mercadopago from "mercadopago"

// Agrega credenciales
mercadopago.configure({
    access_token: "APP_USR-3682034063108053-021615-02cf050bdcc4578d098f956e2ce0f20e-141194529",
});


console.log(`
********************************************
Configuración del SDK de Mercado Pago
********************************************
`)



const feedBack = (req, res) => {
	let info = ({
		Payment: req.query.payment_id,
		Status: req.query.status,
		MerchantOrder: req.query.merchant_order_id
    })

    console.log(info)
    res.redirect('/')
}

export default {
    feedBack
}
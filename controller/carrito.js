import mercadopago from "mercadopago"
import config from '../config.js'

import api from "../api/carrito.js"

/* ------------ CONTROLADOR POST ------------- */
const postCarrito = async (req, res) => {
    let carrito = req.body

    //Items de compra
    let carritoGuardado = await api.guardarCarrito(carrito)
    console.log(carritoGuardado)
    
    let items = []
    for (let item of carritoGuardado) {
        items.push (
            {
                title: item.nombre,
                unit_price: Number(item.precio),
                quantity: Number(item.cantidad),
            }
        )
    }

    let preference = {
        items: items,
        back_urls: {
            "success": `http://localhost:${config.PORT}/api/carrito/feedback`,
            "failure": `http://localhost:${config.PORT}/api/carrito/feedback`,
            "pending": `http://localhost:${config.PORT}/api/carrito/feedback`
        },
        auto_return: "approved",
    };

    mercadopago.preferences.create(preference)
        .then(function (response) {
            res.json({
                id: response.body.id, items
            });
        }).catch(function (error) {
            console.log(error);
        });
}

export default {
    postCarrito
}
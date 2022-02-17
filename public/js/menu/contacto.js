inputs = null
form = null
button = null

const regExpContacto = [
    // Nombre 
    /^[A-ZÑÁÉÍÓÚ][a-zñáéíóú]{3,20}$/, 
    // Correo electrónico 
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/, // mail OJO
    // Mensaje
    /^[A-ZÑÁÉÍÓÚ][a-zñáéíóú]{3,100}$/, 
]


const otrosCamposValidos = [ false, false, false ]

const otrosCamposNoValidos = () => {
    let valido = 
        otrosCamposValidos[0] &&
        otrosCamposValidos[1] &&
        otrosCamposValidos[2]

    return !valido        
}

function validar(valor, validador, index) {

    if (!validador.test(valor)) {
        setCustomValidity('¡Hola! El dato ingresado no es válido', index)
        otrosCamposValidos[index] = false
        button.disabled = true
        return null
    }

    otrosCamposValidos[index] = true
    button.disabled = otrosCamposNoValidos()
    setCustomValidity('', index)
    return valor
}

function renderMensaje(mensajes) {

    fetch('vistas/contacto.hbs')
    .then(r => r.text())
    .then( plantilla => {
        // compile the template
        var template = Handlebars.compile(plantilla);
        // execute the compiled template and print the output to the console
        let html = template({ mensajes: mensajes });

        document.querySelector('.listado-mensajes').innerHTML = html
    })
}

function leerMensajeIngresado() {
    return {
        nombre: inputs[0].value,
        email: inputs[1].value,
        mensaje: inputs[2].value,
        informacion: inputs[3].checked,
    }
}

function limpiarFormulario() {
    inputs.forEach(input => {
        input.type == 'checkbox'? input.checked = false : input.value = ''
    })

    button.disabled = true
    for(let i=0; i<otrosCamposValidos.length; i++) {
        otrosCamposValidos[i] = false
    }
}

async function initContacto() {
    console.warn('initContacto')

    inputs = document.querySelectorAll('.contacto-form input')
    form = document.querySelector('.contacto-form')
    button = document.querySelector('button')
    
    button.disabled = true

    mensajeModel.inicializar(await mensajeController.obtenerMensajes())
    renderMensaje(mensajeModel.obtener())

    let mensajeLength = mensaje.length
    document.querySelector('.listado-mensajes').innerHTML = mensajeLength? `Se encontraron ${mensajeLength} mensajes` : ''

    inputs.forEach((input, index) => {
        if(input.type != 'checkbox') {
            input.addEventListener('input', () => {
                validar(input.value, regExpContacto[index], index)
            })
        }
    })

    form.addEventListener('submit', async e => {
        e.preventDefault()
    
        let mensaje = leerMensajeIngresado()
        limpiarFormulario()

        await mensajeController.guardarMensaje(mensaje)
    })
}
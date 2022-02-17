let inputs = null
let form = null
let button = null
let dropArea = null
let progressBar = null
let URLImagenSubida = ''

const regExpValidar = [
    /^.+$/, // regexp nombre
    /^[0-9]+$/, // regexp precio
    /^[0-9]+$/, // regexp stock
    /^.+$/, // regexp marca
    /^.+$/, // regexp categoría
    /^.+$/, // regexp detalles
    // /^.+$/  // regexp foto
]

const camposValidos = [ false, false, false, false, false, false]//, false ]
const algunCampoNoValido = () => {
    let valido = 
        camposValidos[0] &&
        camposValidos[1] &&
        camposValidos[2] &&
        camposValidos[3] &&
        camposValidos[4] &&
        camposValidos[5]/*  &&
        camposValidos[6] */

    return !valido        
}



const setCustomValidity = function (mensaje, index) {
    const errorDivs = document.querySelectorAll('div.error-detail')
    errorDivs[index].innerHTML = mensaje
    errorDivs[index].parentNode.classList.toggle('input-group--error', !!mensaje)
}

function validar(valor, validador, index) {

    if (!validador.test(valor)) {
        setCustomValidity('Este campo no es válido', index)
        camposValidos[index] = false
        button.disabled = true
        return null
    }

    camposValidos[index] = true
    button.disabled = algunCampoNoValido()
    setCustomValidity('', index)
    return valor
}


function renderProds(productos) {

    fetch('vistas/alta.hbs')
    .then(r => r.text())
    .then( plantilla => {
        // compile the template
        var template = Handlebars.compile(plantilla);
        // execute the compiled template and print the output to the console
        let html = template({ productos: productos });

        document.querySelector('.listado-productos').innerHTML = html
    })
}

function leerProductoIngresado() {
    return {
        nombre: inputs[0].value,
        precio: inputs[1].value,
        stock: inputs[2].value,
        marca: inputs[3].value,
        categoria: inputs[4].value,
        detalles: inputs[5].value,
        foto: URLImagenSubida,//inputs[6].value,
        // envio: inputs[7].value,
        envio: inputs[6].checked,
    }
}

function limpiarFormulario() {
    // inicializo los campos del formulario
    inputs.forEach(input => {
        input.type == 'checkbox'? input.checked = false : input.value = ''
    })

    button.disabled = true
    for(let i=0; i<camposValidos.length; i++) {
        camposValidos[i] = false
    }

    let img = document.querySelector('#gallery img')
    img.src = ''

    inicializarProgress()
    URLImagenSubida = ''

}

/* ----------------- funciones de drag and drop y file dialog (upload) ---------------------- */
function inicializarProgress() {
    progressBar.value = 0
}

function actualizarProgress(porcentaje) {
    progressBar.value = porcentaje      // 0 a 100
}

function previewFile(file) {
    let reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = function() {
        let img = document.querySelector('#gallery img')
        img.src = reader.result
    }
}

function handleFiles(files) {
    //console.log(files)
    let file = files[0]
    inicializarProgress()
    previewFile(file)
    uploadFile(file)
}

function uploadFile(file) {
    var url = '/upload'

    var xhr = new XMLHttpRequest()
    xhr.open('POST',url)

    xhr.upload.addEventListener('progress', e => {
        let porcentaje = (e.loaded * 100) / e.total
        actualizarProgress(porcentaje)
    })

    xhr.addEventListener('load', () => {
        if(xhr.status == 200) {
            let nombreImagenSubida = JSON.parse(xhr.response).nombre
            URLImagenSubida = nombreImagenSubida? ('/uploads/' + nombreImagenSubida) : ''
        }
    })

    var formData = new FormData()
    formData.append('foto', file)

    xhr.send(formData)
}


async function initAlta() {
    console.warn('initAlta')

    inputs = document.querySelectorAll('.alta-form .input-group input')
    //console.log(inputs)
    form = document.querySelector('.alta-form')
    button = document.querySelector('button')
    
    button.disabled = true

    productosModel.inicializar(await productosController.obtenerProductos())
    renderProds(productosModel.obtener())

    inputs.forEach((input, index) => {
        if(input.type != 'checkbox') {
            input.addEventListener('input', () => {
                validar(input.value, regExpValidar[index], index)
            })
        }
    })
    
    form.addEventListener('submit', async e => {
        e.preventDefault()
    
        let producto = leerProductoIngresado()
        limpiarFormulario()

        await productosController.guardarProducto(producto)
    })

    /* ------------- inicialización drag and drop ---------------- */
    dropArea = document.getElementById('drop-area')
    progressBar = document.getElementById('progress-bar')
   

    ;['dragenter','dragover','dragleave','drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, e => e.preventDefault())
        document.body.addEventListener(eventName, e => e.preventDefault())
    })

    ;['dragenter','dragover'].forEach(eventName => {
        dropArea.addEventListener(eventName, () => {
            dropArea.classList.add('highlight')
        })
    })

    ;['dragleave','drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, () => {
            dropArea.classList.remove('highlight')
        })
    })

    dropArea.addEventListener('drop', e => {
        //console.log(e)
        var dt = e.dataTransfer
        var files = dt.files
        //console.log(files)
        handleFiles(files)
    })

}
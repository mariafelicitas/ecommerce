// Interactúa con servicios 

class MensajeController {

    async obtenerMensajes() {
        let mensajes = await mensajeService.obtenerMensajes()
        return mensajes
    }

    async guardarMensaje(mensaje) {
        let mensajeGuardado = await mensajeService.guardarMensaje(mensaje)

        mensajeModel.guardar(mensajeGuardado)

        renderMensaje(mensajeModel.obtener())
        
        return mensajeGuardado
    }


    async actualizarMensaje(id) {

        let mensaje = leerMensajeIngresado()
        limpiarFormulario()

        let mensajeActualizado = await mensajeService.actualizarMensaje(id, mensaje)

        mensajeModel.actualizar(id, mensajeActualizado)

        renderMensaje(mensajeModel.obtener())

        return mensajeActualizado
    }


    async borrarMensaje(id) {

        let mensajeBorrado = await mensajeService.borrarMensaje(id)

        mensajeModel.borrar(id)

        renderMensaje(mensajeModel.obtener())

        return mensajeBorrado
    }
}

const mensajeController = new MensajeController()
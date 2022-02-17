class MensajeService {
    URL_MENSAJES = 'https://61dd865df60e8f00176688bd.mockapi.io/contacto/' //VER!!!!

    async obtenerMensajes() {
        let mensajes = await http.get(this.URL_MENSAJES)
        return mensajes
    }

    async guardarMensaje(mensaje) {
        let mensajeGuardado = await http.post(this.URL_MENSAJES, mensaje)
        return mensajeGuardado
    }

    async actualizarMensaje(id, mensaje) {
        let mensajeActualizado = await http.put(this.URL_MENSAJES, id, mensaje)
        return mensajeActualizado
    }

    async borrarMensaje(id) {
        let mensajeBorrado = await http.delete(this.URL_MENSAJES, id)
        return mensajeBorrado
    }
}

const mensajeService = new MensajeService()

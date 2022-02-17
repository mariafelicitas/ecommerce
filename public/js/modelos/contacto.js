// Concentra el hecho de poder acceder a nuestros datos e interactúa con éstos.

class MensajeModel {
    mensajes = []

    inicializar(mensajes) {
        this.mensajes = mensajes
    }

    obtener(id) {
        if(id) {
            let mensaje = this.mensajes.find(mensaje => mensaje.id == id)
            return mensaje
        }
        else {
            return this.mensajes
        }
    }

    guardar(mensaje) {
        this.mensajes.push(mensaje)
    }

    actualizar(id, mensaje) {
        let index = this.mensajes.findIndex(msj => msj.id == id)
        this.mensajes.splice(index, 1, mensaje)
    }

    borrar(id) {
        let index = this.mensajes.findIndex(msj => msj.id == id)
        this.mensajes.splice(index, 1)
    }
}

const mensajeModel = new MensajeModel()
// Variables
const presupuestoUsuario = prompt('Cuál es tu presupuesto semanal?');
const formulario = document.getElementById('agregar-gasto');
let cantidadPresupuesto;

// Clases
// Clase de presupuesto
class Presupuesto {
    constructor(presupuesto){
        this.presupuesto = Number(presupuesto);
        this.restante = Number(presupuesto);
    }
    // Método para ir restando el presupuesto
    presupuestoRestante(cantidad = 0){
        return this.restante -= Number(cantidad);
    }
}

// Clase de interfaz
class Interfaz {
    insertarPresupuesto(cantidad){
        const presupuestoSpan = document.querySelector('span#total');
        const restanteSpan = document.querySelector('span#restante');

        // Insertar al html
        presupuestoSpan.innerHTML = `${cantidad}`;
        restanteSpan.innerHTML = `${cantidad}`;
    }

    imprimirMensaje(mensaje,tipo){
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center','alert');

        if(tipo === 'error'){
            divMensaje.classList.add('alert-danger');
        }else{
            divMensaje.classList.add('alert-success');
        }

        divMensaje.appendChild(document.createTextNode(mensaje));

        // Insertar en el dom 
        document.querySelector('.primario').insertBefore(divMensaje,formulario);

        // Quitar el alert después de 3 segundos
        setTimeout(() => {
            document.querySelector('.primario .alert').remove();
            formulario.reset();
        }, 3000);
    }

    // Inserta los gastos en la lista
    agregarGastoListado(nombre,cantidad){
        const gastosListado = document.querySelector('#gastos ul');

        // Crear Li
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        
        // Insertar el gasto
        li.innerHTML = `${nombre} <span class="badge badge-primary badge-pill"> $ ${cantidad}</span>`;

        // Insertar al html
        gastosListado.appendChild(li);
    }

    // Comprueba el presupuesto restante
    presupuestoRestante(cantidad){
        const restante = document.querySelector('span#restante');
        
        // Actualizamos el presupuesto restante
        const presupuestoRestanteUsuario = cantidadPresupuesto.presupuestoRestante(cantidad);

        restante.innerHTML = `${presupuestoRestanteUsuario}`;

        this.comprobarPresupuesto();
    }

    // Cambia de color el presupuesto restante
    comprobarPresupuesto(){
        const presupuestoTotal = cantidadPresupuesto.presupuesto;
        const presupuestoRestante = cantidadPresupuesto.restante;

        // comprobar el 25% del gasto
        if((presupuestoTotal / 4) > presupuestoRestante) {
            const restante = document.querySelector('.restante');
            restante.classList.remove('alert-success','alert-warning');
            restante.classList.add('alert-danger');
        }else if((presupuestoTotal / 2) > presupuestoRestante){
            const restante = document.querySelector('.restante');
            restante.classList.remove('alert-success');
            restante.classList.add('alert-warning');
        }

    }
}


// Event Listeners
document.addEventListener('DOMContentLoaded',() =>{
    if(presupuestoUsuario === null || presupuestoUsuario === '' ){
        window.location.reload();
    }else{
        // Instanciar un presupuesto
        cantidadPresupuesto = new Presupuesto(presupuestoUsuario);

        // Instanciar la clase de interfaz
        const ui = new Interfaz();
        ui.insertarPresupuesto(cantidadPresupuesto.presupuesto);
    }
});

formulario.addEventListener('submit',(e)=>{
    e.preventDefault();
    
    // Leer del formulario de gastos
    const nombreGasto = document.querySelector('#gasto').value;
    const cantidadGasto = document.querySelector('#cantidad').value;

    // Instanciar la interfaz
    const ui = new Interfaz();

    // Comprobar que los campos no esten vacíos
    if(nombreGasto === '' || cantidadGasto === ''){
        // 2 parametros, mensaje y tipo
        ui.imprimirMensaje('Hubo un error','error');
    }else{
        // Insertar en el HTML
        ui.imprimirMensaje('Se agrego correctamente','correcto');

        // Agregar los gastos al listado
        ui.agregarGastoListado(nombreGasto,cantidadGasto);

        // Imprimir el presupuesto restante 
        ui.presupuestoRestante(cantidadGasto);
    }
});

require('colors');
const { guardarDB, leerDB } = require('./helpers/gestionArchivo');
const { inquirerMenu, pausa, leerInput, listadoTareasBorrar, confirmar, mostrarListadoChecklist } = require('./helpers/inquirer');
const Tarea = require('./models/tarea');
const Tareas = require('./models/tareas');

console.clear();

const main = async() => {
    let opt = '';
    const tareas = new Tareas();
    const tareasDB = leerDB();
    if(tareasDB){ // cargar tareas
        tareas.cargarTareasFromArray(tareasDB);
        tareas.listadoCompleto();
    }
    do {
        //imprimir el menú
        opt = await inquirerMenu();
        switch (opt) {
            case '1':  //crear tareas
                const desc = await leerInput('Descripción: ');
                tareas.crearTarea(desc);
            break;
            case '2': //listar tareas
                tareas.listadoCompleto();
            break;
            case '3': //listar completadas
                tareas.listarPendientesCompletadas(true);
            break;
            case '4': //listar pendientes
                tareas.listarPendientesCompletadas(false);
            break;
            case '5': //maracar pendientes completadas
                const ids = await mostrarListadoChecklist(tareas.listadoArr);
                tareas.toggleCompletadas(ids);
            break;
            case '6':
                const id = await listadoTareasBorrar(tareas.listadoArr);
                if(id !== '0'){
                    const ok = await confirmar('¿Está seguro?');
                    if(ok){
                        tareas.borrarTarea(id);
                        console.log('Tarea borrada');
                    }
                }
            break;
            case '0': //salir
                console.clear();
            break;
        }

        guardarDB(tareas.listadoArr);

        if( opt !== '0') { 
            await pausa();
        }
    } while(opt !== '0');
    
}

main();
const Tarea = require("./tarea");

class Tareas {
    _listado = {};

    get listadoArr() {
        const listado = [];
        Object.keys(this._listado).forEach(key => listado.push(this._listado[key]));
        return listado;
        // es lo mismo que escribirlo de esta forma
        // const listado = [];
        // Object.keys(this._listado).forEach(key => {
        //     const tarea = this._listado[key];
        //     listado.push(tarea);
        // });
        // return listado;
    }

    constructor(){
        this._listado = {};
    }

    borrarTarea(id = ''){
        if(this._listado[id]){
            delete this._listado[id];
        }
    }

    cargarTareasFromArray(tareas = []) {
        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea;
        });
    }

    crearTarea(desc = ''){
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

    listadoCompleto(){
        console.log();
        this.listadoArr.forEach((tarea, i) => {
            const idx = `${i + 1}. `.green.bold;
            const {desc, completadoEn} = tarea;
            const estado = (completadoEn) ? completadoEn.toString().brightGreen.italic : 'Pendiente'.brightRed.bold;
            console.log(`${ idx } ${ desc.brightWhite } :: ${ estado }`);
        });
    }

    listarPendientesCompletadas(completadas = true){
        console.log();
        let contador = 0;
        this.listadoArr.forEach(tarea => {
            const {desc, completadoEn} = tarea;
            const estado = (completadoEn) ? completadoEn.toString().brightGreen.italic : 'Pendiente'.brightRed.bold;
            if(completadas && tarea.completadoEn !== null || !completadas && tarea.completadoEn === null){
                contador += 1;
                console.log(`${ (contador+'. ').green.bold } ${ desc.brightWhite } :: ${ estado }`);
            }
            
        });
    }

    toggleCompletadas(ids = []){
        ids.forEach(id => {
            const tarea = this._listado[id];
            if(!tarea.completadoEn){
                tarea.completadoEn = new Date().toISOString();
            }
        });
        this.listadoArr.forEach(tarea => {
            if(!ids.includes(tarea.id)){
                this._listado[tarea.id].completadoEn = null;
            }
        });
    }

}

module.exports = Tareas;
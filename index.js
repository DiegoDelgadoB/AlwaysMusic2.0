const { Pool } = require('pg');
const { demand } = require('yargs');
const yargs = require('yargs');
const mensajeErrores = require('./errores.js');

const config = {
    user: "postgres",
    host: "localhost",
    password: "postgresql",
    database: 'alwaysmusic',
    port: 5432
};

const pool = new Pool(config);

yargs.command("registrar", "Insertar registro de estudiante", { 
    rut: {
        describe: 'Identificación única del estudiante',
        demand: true,
        alias: 'r'
    },
    nombre: {
        describe:'Nombre del estudiante'
        demand: true,
        alias: 'n'
    },
    curso: {
        describe: 'Curso al que se inscribe el estudiante',
        demand: true,
        alias:: 'c'
    },
    nivel: {
        describe: 'Nivel del estudiante',
        demand: true,
        alias: 'nv'
    }
}, async (argumentos) => {
    let {rut, nombre, curso, nivel } = argumentos;
    const config = {
        text: "INSERT INTO estudiantes(rut, nombre, curso, nivel) VALUES($1, $2, $3, $4) RETURNING *", // Agregar estudiante.
        values: [rut, nombre, curso, nivel],
        rowMode: 'array'
    }
    try {
        const res = await pool.query(config);
        console.log(res.rows);
    } catch (error) {
        console.log(mensajesErrores(error.code));
    }
}).command("consultar","Obtener lista de todos los estudiantes y estudiante por rut", {
    rut: {
        describe: 'Identificación única del estudiante',
        demand: false,
        alias: 'r'
    }
}, async (argumentos) => {
    try {
        if(argumentos.rut){
            const config = {
                text: "SELECT * FROM estudiantes WHERE rut=$1", // Consultar estudiante por rut.
                values: [argumentos.rut]
            };
            let res = await pool.query(config);
            if (res.rows.length == 0){
                console.log("Rut incorrecto, por favor verifique la lista");
            }else{
                console.table(res.rows);
            }
        }else{
            let sql = "SELECT * FROM estudiantes"; // Consultar los estudiantes registrados.
            let res = await pool.query(sql);
            console.table(res.rows);
        }
    } catch (error) {
        console.log(mensajesErrores(error.code));
    }
}).command("editar", "Actualizar registro de estudiante", {
    rut: {
        describe: 'Identificación única del estudiante',
        demand: true,
        alias: 'r'
    },
    nombre: {
        describe: 'Nombre del estudiante',
        demand: true,
        alias: 'n'
    },
    curso: {
        describe: 'Curso al que se inscribe el estudiante',
        demand: true,
        alias: 'c'
    },
    nivel: {
        describe: 'Nivel del estudiante',
        demand: true,
        alias: 'nv'
    }
}, async(argumentos) => {
    let { rut, nombre, curso, nivel } = argumentos;
    const config = {
        text: "UPDATE estudiantes SET nombre=$1, curso=$2, nivel=$3 WHERE rut=$4 RETURNING *", // Actualizar la información de un estudiante.
    } 
})
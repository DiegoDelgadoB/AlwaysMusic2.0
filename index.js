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
})
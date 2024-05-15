const express = require("express");
const pg = require("pg");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const pool = new pg.Pool({
    host: "35.223.222.189",
    user: "root",
    password: "1234",
    database: "estudiantes"
});

pool.on('connect', () => {
    console.log("Conexión a la base de datos establecida");
});

app.post("/create", (req, res) => {
    const { nombre, curso, rut,fecha,hora_de_ingreso } = req.body;

    if (!nombre || !curso || !rut   || !fecha || !hora_de_ingreso) {
        console.error("Faltan campos requeridos:", req.body);
        return res.status(400).send("Faltan campos requeridos");
    }

    pool.query('INSERT INTO estudiantes(nombre, curso, rut,fecha,hora_de_ingreso VALUES($1, $2, $3)', [nombre, curso, rut], (err, result) => {
        if (err) {
            console.error("Error al insertar estudiante:", err);
            return res.status(500).send("Error al registrar estudiante");
        }

        console.log("Estudiante registrado con éxito:", result);
        res.status(201).send("Estudiante registrado con éxito");
    });
});

app.put("/update", (req, res) => {
    const { id, nombre, curso, rut,fecha, hora_de_ingreso } = req.body;

    if (!id || !nombre || !curso || !rut  || !fecha || !hora_de_ingreso ) {
        console.error("Faltan campos requeridos:", req.body);
        return res.status(400).send("Faltan campos requeridos");
    }

    console.log("Datos recibidos para actualizar:", req.body);

    pool.query('UPDATE estudiantes SET nombre=$1, rut=$2, curso=$3, fecha=$4, hora_de_ingreso=$5 WHERE id=$6', [nombre, rut, curso,fecha,hora_de_ingreso, id], (err, result) => {
        if (err) {
            console.error("Error al actualizar estudiante:", err);
            return res.status(500).send("Error al actualizar estudiante");
        }

        console.log("Estudiante actualizado con éxito:", result);
        res.send("Estudiante actualizado con éxito");
    });
});

app.get("/estudiantes", (req, res) => {
    pool.query('SELECT * FROM estudiantes', (err, result) => {
        if (err) {
            console.error("Error al obtener estudiantes:", err);
            return res.status(500).send("Error al obtener estudiantes");
        }

        res.send(result.rows);
    });
});

app.delete("/delete/:id", (req, res) => {
    const id = req.params.id;

    pool.query('DELETE FROM estudiantes WHERE id=$1', [id], (err, result) => {
        if (err) {
            console.error("Error al eliminar estudiante:", err);
            return res.status(500).send("Error al eliminar estudiante");
        }

        console.log("Estudiante eliminado con éxito:", result);
        res.send("Estudiante eliminado con éxito");
    });
});

app.listen(42069, () => {
    console.log("Servidor escuchando en el puerto 42069");
});



app.listen(42069, () => {
    console.log("Servidor escuchando en el puerto 42069");
});


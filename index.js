// index.js (backend)
const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "estudiantes"
});

db.connect((err) => {
    if (err) {
        console.error("Error de conexión a la base de datos:", err);
        return res.status(500).send("Error de conexión a la base de datos");
    }
    console.log("Conexión a la base de datos establecida");
});

const corsOptions = {
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
};

app.post("/create", (req, res) => {
    const { nombre, curso, rut } = req.body;

    if (!nombre || !curso || !rut) {
        return res.status(400).send("Faltan campos requeridos");
    }

    db.query('INSERT INTO estudiantes(nombre, curso, rut) VALUES(?, ?, ?)', [nombre, curso, rut], (err, result) => {
        if (err) {
            console.error("Error al insertar estudiante:", err);
            return res.status(500).send("Error al registrar estudiante");
        }

        console.log("Estudiante registrado con éxito");
        res.status(200).send("Estudiante registrado con éxito");
    });
});

app.put("/update", (req, res) => {
    const { id, nombre, curso, rut } = req.body;

    if (!id || !nombre || !curso || !rut) {
        return res.status(400).send("Faltan campos requeridos");
    }

    db.query('UPDATE estudiantes SET nombre=?, rut=?, curso=? WHERE id=?', [nombre, rut, curso, id], (err, result) => {    
        if (err) {
            console.error(err);
            return res.status(500).send("Error al actualizar estudiante");
        } else {
            console.log("Estudiante actualizado con éxito!!");
            res.send("Estudiante actualizado con éxito!!");
        }
    });
});

app.get("/estudiantes", (req, res) => {
    db.query('SELECT * FROM estudiantes', (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send("Error al obtener estudiantes");
        } else {
            res.send(result);
        }
    });
});

app.delete("/delete/:id", (req, res) => {
    const id = req.params.id;

    db.query('DELETE FROM estudiantes WHERE id=?', id, (err, result) => {    
        if (err) {
            console.error(err);
            return res.status(500).send("Error al eliminar estudiante");
        } else {
            console.log("Estudiante eliminado con éxito!!");
            res.send("Estudiante eliminado con éxito!!");
        }
    });
});

// Iniciar el servidor
app.listen(3006, () => {
    console.log("Servidor escuchando en el puerto 3006");
});

app.post("/login", (req, res) => {
    const { username, password } = req.body;

    if (username === "admin" && password === "password") {
        res.status(200).send("Login successful");
    } else {
        res.status(401).send("Invalid credentials");
    }
});


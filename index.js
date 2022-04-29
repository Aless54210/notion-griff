const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const mysql = require("mysql2");

dotenv.config({ path: './.env' });

// Open the connection to MySQL
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
});
// Run create database statement
connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME};`);

const app = express();
const PORT = process.env.PORT || 8080;
const db = require("./api/models/index");

// cors implementation
app.use(cors({ origin: "http://localhost:8081", credentials: true }));

// bodyParser implementation
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// cookieParser implementation
app.use(cookieParser());

// static files
app.use(express.static('dist/griff-notion', { extensions: ['html'] }));

// api routes
app.use("/api/notes", require("./api/routes/note.route"));
app.use("/api/user", require("./api/routes/user.route"));
app.use("/api", require("./api/routes/index.route"));

// initialize sequelize/database
const init = async () => {
    try {
        await db.sequelize.sync({ force: true });
    } catch (err) {
        console.log(err);
    }
}
init()
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
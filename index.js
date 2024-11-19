require('dotenv').config();

const express = require('express');
const cors = require('cors')

const { dbConnection } = require('./database/config');

// crear el servidor de express
const app = express();

// Configurar CORS
app.use(cors());

// lectura y parseo del body
app.use(express.json());


// base de datos
dbConnection();

// rutas 
app.use('/api/usuarios', require('./routes/usuarios.routes'));
app.use('/api/login', require('./routes/auth.routes'));


app.listen( process.env.PORT, () => {
    console.log('Servidor funcionando en el puerto ' + 3005);
});



const express = require('express')
const {urlencoded, json} = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const userRoutes = require('./src/routes/routes.js')
const app = require("./src/app")
require("dotenv").config();


app.use(urlencoded({extended: true}))


app.use(cors())
app.use(express.json())
app.use('/v1/restaurante', userRoutes);


const port = process.env.PORT || 9000;




mongoose
.connect(process.env.MONGOdb_URI)
.then(() => console.log("conectado a la base de datos Atlas"))
.catch((error) => console.error(error))


app.listen(port, () => console.log('server listening port', port))
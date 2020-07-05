//express
const express = require('express');
const app = express();
//rutas
const routeHome = require('./routes/home');
const routeMarcas = require('./routes/marcas');
const routeSucursales = require('./routes/sucursales');
const routeAutos = require('./routes/autos');
//servidor
app.listen(3030,()=>console.log("El servidor esta funcionando en el puerto 3030"));
//uso los modulos de rutas
app.use('/',routeHome);
app.use('/sucursales',routeSucursales)
app.use('/marcas',routeMarcas);
app.use("/autos",routeAutos)


app.get("*", (req, res) => {
	res.status(404).send("404 not found")})

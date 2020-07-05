let fs = require('fs');
let dbConcesionaria = JSON.parse(fs.readFileSync('./data/concesionarias.json','utf-8'))

const sucursales = {
    todasLasSucursales:function(req,res){
        res.set({'content-type':'text/plain;charset=utf-8'})
        res.write("***************\n")
        res.write("Bienvenidos!!!"+"\n")
        res.write("***************\n")
        res.write("Estas son nuestras sucursales: " +"\n"+"\n")
        dbConcesionaria.forEach(concesionaria => {  
            res.write(
                `
-Nombre: ${concesionaria.sucursal} 
-Dirección: ${concesionaria.direccion}
-Telefono: ${concesionaria.telefono}
`)
        });
        res.end()
    },
    detalle:function (req,res) {
        res.set({'content-type':'text/plain;charset=utf-8'})
        let idSucursal = req.params.id;
        dbConcesionaria.forEach(function(concesionaria){
            if (concesionaria.sucursal == idSucursal){
                res.write("**************************************\n")
                res.write("BIENVENIDOS A LA SUCURSAL "+ idSucursal.toUpperCase() + "\n")
                res.write("**************************************\n\n")
                res.write(
                    `
-Nombre: ${concesionaria.sucursal} 
-Dirección: ${concesionaria.direccion}
-Telefono: ${concesionaria.telefono}
-Autos en stock: ${concesionaria.autos.length}
-------
LISTADO:
-------
                    `)
                concesionaria.autos.forEach(function (auto){
                res.write(
                            `
-------------------
-Marca ${auto.marca} 
-Modelo: ${auto.modelo}
-Año: ${auto.anio}
                                    `)
                    })
                    res.end()
        }

        
    })
res.end("No existe la sucursal solicitada")
}}

module.exports = sucursales;

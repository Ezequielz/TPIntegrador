let fs = require('fs');
let dbConcesionaria = JSON.parse(fs.readFileSync('./data/concesionarias.json','utf-8'))

let autos = []
let marcasTotales = []
dbConcesionaria.forEach((concesionaria)=>{
concesionaria.autos.forEach((auto)=>{
marcasTotales.push(auto.marca)
autos.push(auto)
  })
})

const marcasdb = {
        marcas:function(req,res){
            res.write("********************************\n")
            res.write("NUESTRAS MARCAS DISPONIBLES SON:"+ "\n")
            res.write("********************************\n\n")

            let marcasFiltradas = marcasTotales.filter(function(value, index, self) { 
                 return self.indexOf(value) === index;});
       
            marcasFiltradas.forEach(element => {
                res.write("-" +element + "\n")
        
            });
            res.end()
        
        },

        detalle: function(req,res){
            res.set({'content-type':'text/plain;charset=utf-8'})
            let idMarca = req.params.id; 
            if (marcasTotales.indexOf(idMarca)>=0){
                res.write("**********************************************\n")
                res.write("ESTOS SON NUESTROS AUTOS DE LA MARCA "+ idMarca.toUpperCase() + "\n")
                res.write("**********************************************\n\n")}else{
                res.write("No hemos encontrado la marca solicitada")
            }
            
            autos.forEach(function (auto){
               if (idMarca == auto.marca){                  
                     res.write(
`
-------------------
Marca ${auto.marca} 
Modelo: ${auto.modelo}
Año: ${auto.anio}
             `)}
            }) 

            res.end()
        }
    }
    
module.exports = marcasdb;
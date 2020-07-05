let fs = require('fs');
let dbConcesionaria = JSON.parse(fs.readFileSync('./data/concesionarias.json','utf-8'))

let anio=[]
let modeloTotales=[]
let autoDB=[]
let colores = []
let marcasTotales = []
dbConcesionaria.forEach((concesionaria)=>{
    concesionaria.autos.forEach((auto)=>{
    modeloTotales.push(auto.modelo)
    marcasTotales.push(auto.marca)
    colores.push(auto.color)
    anio.push(String(auto.anio))  
    autoDB.push(auto)
      })
    })
 const autos = {
    index:function(req,res){
        res.write("----------------------------------"+"\n")
        res.write("BIENVENIDO A LA CONCESIONARIA:"+"\n")
        res.write("----------------------------------"+"\n")
        res.write("El stock total de todas nuestras sucursales actualmente es de " + autoDB.length+" unidades."+"\n\n") 
        res.write("LISTADO:"+"\n")
        autoDB.forEach(function (auto){
                  res.write(
`
-----------------------------
-${auto.marca} ${auto.modelo} ${auto.color} ${auto.anio}`)
         })   
        
                
},

autoMarca:function (req,res) {
    res.set({'content-type':'text/plain;charset=utf-8'})
    let idMarca = req.params.marca;
    if (marcasTotales.indexOf(idMarca)>=0){
        res.write("**********************************************\n")
        res.write("ESTOS SON NUESTROS AUTOS DE LA MARCA "+ idMarca.toUpperCase() + "\n")
        res.write("**********************************************\n\n")}else{
        res.write("No hemos encontrado la marca de auto solicitada")
    }
    dbConcesionaria.forEach((concesionaria)=>{
    concesionaria.autos.forEach((auto)=>{
       if (idMarca == auto.marca){                  
             res.write(
`
-------------------
Marca: ${auto.marca} 
Modelo: ${auto.modelo}
Año: ${auto.anio}
Color: ${auto.color}
Disponible en la Sucursal : ${concesionaria.sucursal}
     `)}
    })  })
    res.end()
},
dato:function (req,res) {
    res.set({'content-type':'text/plain;charset=utf-8'})
    let idMarca = req.params.marca;
    let idDato = req.params.dato;
    let idDato2 = req.params.dato2;

   
    if (marcasTotales.indexOf(idMarca)>=0 && colores.indexOf(idDato)>=0 ){ 
    res.write("******************************************************* \n")
    res.write("ESTOS SON TODOS NUESTROS AUTOS " + idMarca.toUpperCase()+" DE COLOR " + idDato.toUpperCase()+": \n")
    res.write("******************************************************* \n")}
    else if(marcasTotales.indexOf(idMarca)>=0 && anio.indexOf(idDato)>=0 ) {
    res.write("******************************************************** \n")
    res.write("ESTOS SON TODOS NUESTROS AUTOS " + idMarca.toUpperCase()+" DEL AÑO " + idDato+": \n")
    res.write("******************************************************** \n")}
    else{res.write("No hemos encontrado el año o color solicitado")} 

    dbConcesionaria.forEach((concesionaria)=>{
        concesionaria.autos.forEach((auto)=>{
    if (auto.marca==idMarca && auto.color == idDato&& idDato2==undefined){
        res.write(
            `
            -------------------
            Marca: ${auto.marca} 
            Modelo: ${auto.modelo}
            Año: ${auto.anio}
            Color: ${auto.color}
            Disponible en la Sucursal : ${concesionaria.sucursal}
                 `)}
    if(auto.marca==idMarca && auto.color == idDato && auto.anio == idDato2){
        res.write(
            `
            -------------------
            Marca: ${auto.marca} 
            Modelo: ${auto.modelo}
            Año: ${auto.anio}
            Color: ${auto.color}
            Disponible en la Sucursal : ${concesionaria.sucursal}
                 `)}
    if (auto.marca==idMarca  && auto.anio == idDato && idDato2 == undefined){
        res.write(
            `
            -------------------
            Marca: ${auto.marca} 
            Modelo: ${auto.modelo}
            Año: ${auto.anio}
            Color: ${auto.color}
            Disponible en la Sucursal : ${concesionaria.sucursal}
                 `)
    }
}
                 
                )
            })
            res.end()       
    },
    

}

module.exports = autos;
let fs = require('fs');
let dbConcesionaria = JSON.parse(fs.readFileSync('./data/concesionarias.json','utf-8'))

const home = {
    index:function(req,res){
        res.write("************** \n")
        res.write("Bienvenidos!!!"+"\n")
        res.write("************** \n\n")
        res.write("Estas son nuestras sucursales: "+"\n"+"\n")
        dbConcesionaria.forEach(concesionaria => {  
            res.write("-Sucursal: " + concesionaria.sucursal + "\n")
        });
        res.end()
    }
}

module.exports = home;
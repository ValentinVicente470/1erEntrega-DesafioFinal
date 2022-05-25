const express = require("express");
const { Router } = express;
const app = express();
const router = new Router();
const ContenedorProductos = require("../contenedorProductos");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

let administrador = true; 

const msjErr = {
    error: 401 ,
    mensaje: "Acceso Denegado",
};

let Autorizacion = (res) =>{
    if(!administrador){
        res.send(msjErr);
    }
};

//Endpoints------------------------------------------------------------------

router.get("/:id?", async(req, res) =>{
    try{
        if(req.params.id){
            res.send(await ContenedorProductos.getbyID(parseInt(req.params.id)));
        }
        res.send(await ContenedorProductos.getall());
    }
    catch(err){
        console.log(`${err} Error en el router.get`)
    }
});    

router.post("/", async(req, res) =>{
    if(administrador){ 
        try{
            await ContenedorProductos.save(req.body);
            res.send(`Producto guardado correctamente`)
        }
        catch(err){
            res.send(`${err} Error en el router.post`);
        }
    }
    Autorizacion(res);
})

router.put("/:id", async(req, res) =>{
    if(administrador){
        try{
            console.log(req.params.id);
            console.log(req.body);
            await ContenedorProductos.updatebyID(req.params.id, req.body);
            res.send("Producto actualizado correctamente")
        }
        catch(err){
            res.send(`${err} Error en el router.put`)
        }
    }
    Autorizacion(res);
})

router.delete("/:id", async(req, res) =>{
    if(administrador){
        try{
            await ContenedorProductos.deletebyID(req.params.id);
            res.send("Producto eliminado exitosamente");
        }
        catch(err){
            res.send(`${err} Error en el router.delete`)
        }
    }
    Autorizacion(res);
})    

module.exports = router
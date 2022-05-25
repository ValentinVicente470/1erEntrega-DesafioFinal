const express = require("express");
const { Router } = express;
const app = express();
const router = new Router();
const ContenedorCarrito = require("../contenedorCarritos");
const ContenedorProducto = require("../contenedorProductos")

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


//Endpoint------------------------------------------------------

router.post('/', async(req, res) =>{
    try{
        await ContenedorCarrito.saveCarrito(req.body);
        res.send(`Carrito creado`)
    }
    catch(err){
        res.send(`${err} Error en el router.post-carrito`)
    }
})

router.delete('/:id', async(req, res) =>{
    try{
        await ContenedorCarrito.deleteCarrito(req.params.id);
        res.send(`Carrito ${req.params.id} borrado`)
    }
    catch(err){
        res.send(`${err} Error en el router.delete-carrito`)
    }
})

router.get('/:id/productos', async(req, res) =>{
    try{
        res.send( await ContenedorCarrito.getCarritoProds(req.params.id))
    }
    catch(err){

    }
})

router.post('/:id/productos', async(req, res) =>{
    try{
        await ContenedorCarrito.updateCarrito(req.params.id, req.body);
        res.send(`Producto ${req.body.id} agregado al carrito`)
    }
    catch(err){
        res.send(`${err} Error en el router.post-producto`)
    }
})

router.delete('/:id/productos/:id_prod', async(req, res) =>{
    try{
        await ContenedorCarrito.deleteCarritoProds(req.params.id, req.params.id_prod);
        res.send(`Producto ${req.params.id_prod} borrado del carrito ${req.params.id} correctamente`)
    }
    catch(err){
        res.send(`${err} Error en el delete-carrito-prod`)
    }
})

module.exports = router
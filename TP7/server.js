const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;

const productosRouter = require("./routers/productos");
const carritosRouter = require("./routers/carritos");

app.use(express.static('./public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/productos", productosRouter);
app.use("/api/carritos", carritosRouter);


const server = app.listen(PORT, () => {
    console.log ('server HTTP escuchando en el puerto' + PORT)
})
server.on ('error', error => console.log (`error en el server ${error}`))


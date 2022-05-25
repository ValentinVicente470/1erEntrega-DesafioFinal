const { promises: fs} = require ('fs');
const ContenedorProducto = require("./contenedorProductos")

const today = new Date(Date.now());

class Contenedor{
    constructor(archivo){
        this.archivo = archivo
    }

    async getallCarritos(){
        try{
            let fileExist = await fs.readFile(this.archivo, "utf-8");

            if(fileExist && fileExist.length > 0){
                let objs = JSON.parse(fileExist)
                return objs
            }
            else{
                console.log("No hay carritos")
                return (err + "No hay carritos")
            }
        }
        catch(err){
            console.log(`${err}Error en la funcion getall`)
        }
    }

    async saveCarrito({productos}){
        try{
            let objs = await this.getallCarritos();

            let newID = 1

            if(objs.length > 0){
                newID = objs[objs.length -1].id +1;
            }

            const newCarrito = {
                id: newID, 
                timestamp: today, 
                productos: [],
            }
            objs.push(newCarrito)

            const carritonuevo = objs[objs.length -1].id;
            console.log(`Carrito ${carritonuevo} creado exitosamente`);

            await  fs.writeFile(this.archivo, JSON.stringify(objs, null, 2) );
        }
        catch(err){
            console.log(`${err} Error en la funcion save`)
        }
    }

    async getCarritoProds(numCarrito){
        try{
            const objs = await this.getallCarritos();
            if(objs && objs.length > 0){
                let pos;
                objs.find((carrito, index) =>{
                    if(carrito.id == numCarrito){
                        pos = index;
                        return pos;
                    }
                })
                const prods = objs[pos].productos
                return prods
            }
            else{
                console.log(`${err}No se pudieron obtener los productos del carrito ${numCarrito}`)
            }
        }
        catch(err){
            console.log(`${err} Error en la funcion getCarritoProds`)
        }
    }

    async deleteCarrito(numCarrito){
        try{
            const objs = await this.getallCarritos();
            if(objs && objs.length > 0){
                const arr = [];
                objs.find(carrito =>{
                    if(carrito.id != numCarrito){
                        arr.push(carrito)
                    }
                    fs.writeFile(this.archivo, JSON.stringify(arr, null, 2))
                });
            }
            else{
                console.log(`${err} No se pudo borrar el carrito ${numCarrito}`)
            }
        }
        catch(err){
            console.log(`${err} Error en la funcion deleteCarrito`)
        }
    }

    async updateCarrito(numCarrito, array){
        try{

            const objs = await this.getallCarritos();

            if(objs && objs.length > 0){

                let pos;
                objs.find((carrito, index) =>{
                    if(carrito.id == numCarrito){
                        pos = index;
                        return pos;
                    }
                });

                const prodAlcarrito = await ContenedorProducto.getbyID(array.id);

                objs[pos].productos.push(prodAlcarrito);
                fs.writeFile(this.archivo, JSON.stringify(objs, null, 2));
                return objs;
            }
            else{
                console.log(`${err} Error no se pudo actualizar el carrito ${numCarrito}`)
            }
        }
        catch(err){
            console.log(`${err} Error en la funcion updateCarrito`)
        }
    }

    async deleteCarritoProds(numCarrito, numProd){
        try{

            const objs = await this.getallCarritos();

            if(objs && objs.length > 0){

                let pos;
                objs.find((carrito, index) =>{
                    if(carrito.id == numCarrito){
                        pos = index;
                        return pos;
                    }
                });

                let posProd;
                objs[pos].productos.find((prod, index) =>{
                    if(prod.id == numProd){
                        posProd = index;
                    }
                })

                objs[pos].productos.splice(posProd, 1);
                fs.writeFile(this.archivo, JSON.stringify(objs, null, 2));
                return objs;
            }
        }
        catch(err){

        }
    }

}

const Archivo2 = new Contenedor("./data/carritos.txt")
module.exports = Archivo2
const { promises: fs} = require ('fs')

const today = new Date(Date.now())

class Contenedor{
    constructor(archivo){
        this.archivo = archivo
    }

    async getall(){
        try{
            let fileExist = await fs.readFile(this.archivo, "utf-8");

            if(fileExist && fileExist.length > 0){
                let objs = JSON.parse(fileExist)
                return objs
            }
            else{
                console.log("No hay productos")
                return (err + "No hay productos")
            }
        }
        catch(err){
            console.log(`${err}Error en la funcion getall`)
        }
    }

    async save({name, description, code, thumbnail, price}){
        try{
            let objs = await this.getall();

            let newID = 1

            if(objs.length > 0){
                newID = objs[objs.length -1].id +1;
            }

            const newProducto = {
                id: newID, 
                timestamp: today, 
                name: name, 
                description: description, 
                code: code, 
                thumbnail: thumbnail, 
                price: price,  
            }
            objs.push(newProducto)

           await  fs.writeFile(this.archivo, JSON.stringify(objs, null, 2) );
        }
        catch(err){
            console.log(`${err} Error en la funcion save`)
        }
    }

    async getbyID(num){
        try{
            const objs = await this.getall();
            if(objs && objs.length > 0){
                const objBuscado = await objs.find(producto =>producto.id === num)
                return objBuscado
            }
            else{
                console.log(`${err}No se pudo obtener el producto ${num}`)
            }
        }
        catch(err){
            console.log(`${err} Error en la funcion getbyID`)
        }
    }

    async deletebyID(num){
        try{
            const objs = await this.getall();
            if(objs && objs.length > 0){
                const arr = [];
                objs.find(producto =>{
                    if(producto.id != num){
                        arr.push(producto)
                    }
                    fs.writeFile(this.archivo, JSON.stringify(arr, null, 2))
                });
            }
            else{
                console.log(`${err} No se pudo borrar el producto ${num}`)
            }
        }
        catch(err){
            console.log(`${err} Error en la funcion deletebyID`)
        }
    }

    async updatebyID(num, arr){
        try{
            const objs = await this.getall();
            if(objs && objs.length > 0){
                let pos;
                objs.find((producto, index) =>{
                    if(producto.id == num){
                        pos = index;
                        return pos;
                    }
                });

                objs[pos].name = arr.name;
                objs[pos].description = arr.description;
                objs[pos].code = arr.code;
                objs[pos].thumbnail = arr.thumbnail;
                objs[pos].price = arr.price;
                fs.writeFile(this.archivo, JSON.stringify(objs, null, 2));
            }
            else{
                console.log(`${err} Error no se pudo actualizar el producto`)
            }
        }
        catch(err){
            console.log(`${err} Error en la funcion udatebyID`)
        }
    }

}

const Archivo1 = new Contenedor("./data/productos.txt")
module.exports = Archivo1
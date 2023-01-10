const fs = require("node:fs");

class ProductManager {
    products;
    id;

    constructor(path) {
        this.path = path;
        this.loadFile();
    }

    loadFile() {
        try {
            this.products = JSON.parse(fs.readFileSync(this.path, "utf-8"));
        } catch (err) {
            throw new Error(err);
        }
        this.controlID()
    }

    updateProduct() {
        try {
            fs.writeFileSync(this.path, JSON.stringify(this.products));
        } catch (err) {
            throw new Error(err);
        }
    }

    controlID() {
        this.id = this.products.length;
    }

    deleteProduct(id) {
        let productVoid = { description: "Producto eliminado", id: id };
        this.products[id - 1] = productVoid;
        this.updateProduct();
    }

    addProducts(product) {
        if (!product.stock && !product.title && !product.description && !product.price) {
            console.log("Cuidado! Campos de un producto incompleto");
        } else {
            let searchCode = this.products.find((prod) => prod.code === product.code);
            if (searchCode) {
                console.log("ERROR, codigo del producto " + product.title + " ya existe");
            } else {
                this.id++;
                product = { ...product, id: this.id };
                this.products.push(product);
                this.updateProduct();
            }
        }
    }

    getProducts() {
        console.log("PRODUCTOS: ", this.products);
    }

    getProductsById(id) {
        let prodForId = null;
        this.products.findIndex((prod) => {
            if (prod.id === id) {
                prodForId = prod;
            }
        });
        if (prodForId) {
            console.log("El producto con id " + id + " es " + prodForId.title);
        } else {
            console.log("Id not found");
        }
    }

    returnProducts() {
        return this.products;
    }
}

const manager = new ProductManager("./products.json");

//----- Desarollo de los productos -----//
// const product1 = { title: "Fanta", description: "Gaseosa", price: 400, thumbnail: "link", code: "ABC128", stock: 80 };
// manager.addProducts(product1);

//manager.deleteProduct(5);
//manager.getProducts();
//manager.getProductsById(6);

module.exports = {
    productManager: manager
}
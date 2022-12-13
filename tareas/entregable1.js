class ProductManager {
    static products;
    static id = 0;

    constructor() {
        this.products = [];
    }

    addProducts(product) {
        if (!product.stock && !product.title && !product.title && !product.description && !product.price) {
            console.log("Cuidado! Campos de un producto incompleto");
        } else {
            let searchCode = this.products.find((prod) => prod.code === product.code);
            if (searchCode) {
                console.log("ERROR, codigo del producto " + product.title + " ya existe");
            } else {
                ProductManager.id++;
                product = { ...product, id: ProductManager.id };
                this.products.push(product);
            }
        }
    }

    getProducts() {
        console.log("PRODUCTOS: ", this.products);
    }

    getProductsById(id) {
        let prodForId = null;
        this.products.findIndex((prod) => {
            if (prod.id == id) {
                prodForId = prod;
            }
        });
        if (prodForId) {
            console.log("El producto con id " + id + " es " + prodForId.title);
        } else {
            console.log("Id not found");
        }
    }
}

const manager = new ProductManager();

//----- Desarollo de los productos -----//
const product1 = { title: "Pepsi", description: "Gaseosa", price: 400, thumbnail: "link", code: "ABC123", stock: 80 };
manager.addProducts(product1);

const product2 = { title: "Coca-Cola", description: "Gaseosa", price: 500, thumbnail: "link", code: "ABC124", stock: 50 };
manager.addProducts(product2);

const product3 = { title: "Goliat", description: "Gaseosa", price: 100, thumbnail: "link", code: "ABC125", stock: 50 };
manager.addProducts(product3);

// Producto 4 codigo repetido //
const product4 = { title: "Manaos", description: "Gaseosa", price: 100, thumbnail: "link", code: "ABC125", stock: 100 };
manager.addProducts(product4);

// Producto 5 incompleto //
const product5 = { thumbnail: "link", code: "ABC" };
manager.addProducts(product5);
// ----- ----- //

manager.getProducts();
manager.getProductsById(1);

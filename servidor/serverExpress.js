const express = require('express')
const app = express()
const { productManager } = require("./productManager");

const products = productManager.returnProducts();

//endpoints
app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.get("/products", (req, res) => {
    const limit = req.query.limit;
    let respuesta = products;
    //si mandaron un limite y es un numero
    if(limit && !isNaN(Number(limit))) {
        respuesta = products.slice(0, limit);
    }
    res.send(respuesta);
})

app.get("/products/:id", (req, res) => {
    const respuesta = products.find((e) => e.id === Number(req.params.id));
    res.send(respuesta);
})

app.get('/bienvenida/:nombre', function (req, res) {
    const nombre = req.params.nombre;
    const respuesta = `
    <html>
        <body>
            <h1 style="color: blue;">Bienvenido ${nombre}!</h1>
        </body>
    </html>`
    res.send(respuesta)
})

//levata el server
app.listen(3000)
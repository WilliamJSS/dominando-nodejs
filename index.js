const express = require("express")
const server = express()

server.use(express.json())

let customers = [
    { id: 1, name: "Dev Samurai", site: "http://devsamurai.com.br" },
    { id: 2, name: "Google", site: "http://google.com" },
    { id: 3, name: "UOL", site: "http://uol.com.br" },
]

server.post("/customers", (req, res) => {
    const { name, site } = req.body
    const id = customers[customers.length - 1].id + 1

    const customer = { id, name, site }
    customers.push(customer)

    return res.json(customer)
})

server.get("/customers", (req, res) => {
    return res.json(customers)
})

server.get("/customers/:id", (req, res) => {
    const { id } = req.params
    const customer = customers.find(customer => customer.id == id)
    const status = customer ? 201 : 404

    return res.status(status).json(customer)
})

server.put("/customers/:id", (req, res) => {
    const { id } = req.params
    const { name, site } = req.body

    const customer = customers.find(customer => customer.id == id)

    if(customer){
        customer.name = name
        customer.site = site
    }

    const status = customer ? 201 : 404

    return res.status(status).json(customer)
})

server.delete("/customers/:id", (req, res) => {
    const { id } = req.params
    const customer = customers.find(customer => customer.id == id)

    if (customer) {
        let index = customers.indexOf(customer)
        customers.splice(index, 1)
    }

    const status = customer ? 200 : 404

    return res.status(status).json(customer)
})

server.listen(3000)
let customers = [
    { id: 1, name: "Dev Samurai", site: "http://devsamurai.com.br" },
    { id: 2, name: "Google", site: "http://google.com" },
    { id: 3, name: "UOL", site: "http://uol.com.br" },
]

class CustomersController {

    // Lista todos os Customers
    index(req, res) {
        return res.json(customers)

    }

    // Recupera um Customer
    show(req, res) {
        const { id } = req.params
        const customer = customers.find(customer => customer.id == id)
        const status = customer ? 201 : 404

        return res.status(status).json(customer)
    }

    // Cria um novo Customer
    create(req, res) {
        const { name, site } = req.body
        const id = customers[customers.length - 1].id + 1

        const customer = { id, name, site }
        customers.push(customer)

        return res.json(customer)
    }

    // Atualiza um Customer
    update(req, res) {
        const { id } = req.params
        const { name, site } = req.body

        const customer = customers.find(customer => customer.id == id)

        if (customer) {
            customer.name = name
            customer.site = site
        }

        const status = customer ? 201 : 404

        return res.status(status).json(customer)
    }

    // Exclui um Customer
    destroy(req, res) {
        const { id } = req.params
        const customer = customers.find(customer => customer.id == id)

        if (customer) {
            let index = customers.indexOf(customer)
            customers.splice(index, 1)
        }

        const status = customer ? 200 : 404

        return res.status(status).json(customer)
    }
}

export default new CustomersController()

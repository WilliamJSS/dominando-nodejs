import { Op } from "sequelize";

import { parseISO } from "date-fns";

import Customer from "../models/Customer";
import Contact from "../models/Contact";

const customers = [
  { id: 1, name: "Dev Samurai", site: "http://devsamurai.com.br" },
  { id: 2, name: "Google", site: "http://google.com" },
  { id: 3, name: "UOL", site: "http://uol.com.br" },
];

class CustomersController {
  // Lista todos os Customers
  async index(req, res) {
    const {
      name,
      email,
      status,
      createdBefore,
      createdAfter,
      updatedBefore,
      updatedAfter,
      sort,
    } = req.query;

    const page = req.query.page || 1;
    const limit = req.query.limit || 25;

    let where = {};
    let order = [];

    if (name) {
      where = {
        ...where,
        name: {
          [Op.iLike]: name,
        },
      };
    }

    if (email) {
      where = {
        ...where,
        email: {
          [Op.iLike]: email,
        },
      };
    }

    if (status) {
      where = {
        ...where,
        status: {
          [Op.in]: status.split(",").map((item) => item.toUpperCase()),
        },
      };
    }

    if (createdBefore) {
      where = {
        ...where,
        createdAt: {
          [Op.lte]: parseISO(createdBefore),
        },
      };
    }

    if (createdAfter) {
      where = {
        ...where,
        createdAt: {
          [Op.gte]: parseISO(createdAfter),
        },
      };
    }

    if (updatedBefore) {
      where = {
        ...where,
        updatedAt: {
          [Op.lte]: parseISO(updatedBefore),
        },
      };
    }

    if (updatedAfter) {
      where = {
        ...where,
        updatedAt: {
          [Op.gte]: parseISO(updatedAfter),
        },
      };
    }

    if (sort) {
      order = sort.split(",").map((item) => item.split(":"));
    }

    const data = await Customer.findAll({
      where,
      include: [
        {
          model: Contact,
          attributes: ["id", "status"],
        },
      ],
      order,
      limit,
      offset: limit * page - limit,
    });

    return res.json(data);
  }

  // Recupera um Customer
  show(req, res) {
    const { id } = req.params;
    const customer = customers.find((c) => c.id === id);
    const status = customer ? 201 : 404;

    return res.status(status).json(customer);
  }

  // Cria um novo Customer
  create(req, res) {
    const { name, site } = req.body;
    const id = customers[customers.length - 1].id + 1;

    const customer = { id, name, site };
    customers.push(customer);

    return res.json(customer);
  }

  // Atualiza um Customer
  update(req, res) {
    const { id } = req.params;
    const { name, site } = req.body;

    const customer = customers.find((c) => c.id === id);

    if (customer) {
      customer.name = name;
      customer.site = site;
    }

    const status = customer ? 201 : 404;

    return res.status(status).json(customer);
  }

  // Exclui um Customer
  destroy(req, res) {
    const { id } = req.params;
    const customer = customers.find((c) => c.id === id);

    if (customer) {
      const index = customers.indexOf(customer);
      customers.splice(index, 1);
    }

    const status = customer ? 200 : 404;

    return res.status(status).json(customer);
  }
}

export default new CustomersController();

import * as Yup from "yup";
import { Op } from "sequelize";
import { parseISO } from "date-fns";

import Contact from "../models/Contact";

class ContactsController {
  // Lista todos os Contacts de um Customer
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

    let where = { customerId: req.params.customerId };
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

    const data = await Contact.findAll({
      where,
      attributes: { exclude: ["customer_id", "customerId"] },
      order,
      limit,
      offset: limit * page - limit,
    });

    return res.json(data);
  }

  // Recupera um unico Contact de um Customer
  async show(req, res) {
    const contact = await Contact.findOne({
      where: {
        customerId: req.params.customerId,
        id: req.params.id,
      },
      attributes: { exclude: ["customer_id", "customerId"] },
    });

    if (!contact) {
      return res.status(404).json();
    }

    return res.json(contact);
  }

  // Cria um novo Contact de um Customer
  async create(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      status: Yup.string().uppercase(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "Error on validate schema." });
    }

    const contact = await Contact.create({
      customerId: req.params.customerId,
      ...req.body,
    });

    return res.json(contact);
  }

  // Atualiza o Contact de um Customer
  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      status: Yup.string().uppercase(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "Error on validate schema." });
    }

    const contact = await Contact.findOne({
      where: {
        customer_id: req.params.customerId,
        id: req.params.id,
      },
      attributes: { exclude: ["customer_id", "customerId"] },
    });

    if (!contact) {
      return res.status(404).json();
    }

    await contact.update(req.body);

    return res.json(contact);
  }

  // Exclui o Contact de um Customer
  async destroy(req, res) {
    const contact = await Contact.findOne({
      where: {
        customer_id: req.params.customerId,
        id: req.params.id,
      },
    });

    if (!contact) {
      return res.status(404).json();
    }

    await contact.destroy();

    return res.json();
  }
}

export default new ContactsController();

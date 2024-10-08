require("dotenv").config();
const jwt = require("jsonwebtoken");
const Customer = require("../models/Customer");
const bcrypt = require("bcrypt");

exports.getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.findAll();
    res.status(200).json(customers);
  } catch (err) {
    res.status(500).json({ message: "Error fetching customers", error: err });
  }
};

exports.createCustomer = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "Please provide valid customer data" });
  }

  try {
    const newCustomer = await Customer.create({ name, email, password });

    const token = jwt.sign({ authenticated: true }, process.env.SECRET_KEY, {
      expiresIn: "2h",
    });

    res.cookie("bookTicket", token);
    res.status(201).json(newCustomer);
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ message: "Email is already in use" });
    }
    res.status(500).json({ message: "Error creating customer", error: err });
  }
};

exports.getCustomerById = async (req, res) => {
  const { id } = req.params;
  try {
    const customer = await Customer.findByPk(id);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    res.status(200).json(customer);
  } catch (err) {
    res.status(500).json({ message: "Error fetching customer", error: err });
  }
};

exports.updateCustomer = async (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;

  try {
    const customer = await Customer.findByPk(id);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    if (name) customer.name = name;
    if (email) customer.email = email;
    if (password) customer.password = password;

    await customer.save();
    res.status(200).json(customer);
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ message: "Email is already in use" });
    }
    res.status(500).json({ message: "Error updating customer", error: err });
  }
};

exports.deleteCustomer = async (req, res) => {
  const { id } = req.params;

  try {
    const customer = await Customer.findByPk(id);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    await customer.destroy();
    res.status(200).json({ message: "Customer deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting customer", error: err });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(403).json("Please enter an email and password");
  }

  try {
    const customer = await Customer.findOne({ where: { email } });
    if (!customer) {
      return res.status(403).json("Invalid email or password");
    }

    const match = await bcrypt.compare(password, customer.password);
    if (!match) {
      return res.status(403).json("Invalid email or password");
    }

    const token = jwt.sign({ authenticated: true }, process.env.SECRET_KEY, {
      expiresIn: "2h",
    });

    res.cookie("bookTicket", token, { httpOnly: true });
    res.status(200).json("Token created, you can continue");
  } catch (err) {
    res.status(500).json({ message: "Login error", error: err });
  }
};

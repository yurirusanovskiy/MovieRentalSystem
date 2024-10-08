const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const { sequelize } = require('../config/db');

class Customer extends Model {
  static async hashPassword(password) {
    const saltRounds = process.env.SALT_ROUNDS;
    return await bcrypt.hash(password, saltRounds);
  }

  // Check passwd
  static async verifyPassword(password, hash) {
    return await bcrypt.compare(password, hash);
  }
}

// Customer model
Customer.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Customer',
  hooks: {
    beforeCreate: async (customer) => {
      if (customer.password) {
        customer.password = await Customer.hashPassword(customer.password);
      }
    },
    beforeUpdate: async (customer) => {
      if (customer.password) {
        customer.password = await Customer.hashPassword(customer.password);
      }
    },
  },
});

module.exports = Customer;

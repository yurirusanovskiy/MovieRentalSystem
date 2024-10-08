const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Movie = sequelize.define('Movie', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT
  },
  releaseYear: {
    type: DataTypes.INTEGER
  },
  genreIds: {
    type: DataTypes.ARRAY(DataTypes.INTEGER)
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'movies',
  timestamps: true
});

module.exports = Movie;


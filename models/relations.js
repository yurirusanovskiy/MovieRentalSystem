const Customer = require('./models/Customer');
const Movie = require('./models/Movies');
const Genre = require('./models/Genre');
const Rental = require('./models/Rental');

// Relationship

// Customer ↔ Movie (Many to many model Rental)
Customer.belongsToMany(Movie, { through: Rental, foreignKey: 'customerId' });
Movie.belongsToMany(Customer, { through: Rental, foreignKey: 'movieId' });

// Movie ↔ Genre (Many to many model MovieGenres)
Movie.belongsToMany(Genre, { through: 'MovieGenres', foreignKey: 'movieId' });
Genre.belongsToMany(Movie, { through: 'MovieGenres', foreignKey: 'genreId' });

module.exports = function associateModels() {
  console.log('Models are associated successfully.');
};

const Rental = require('../models/Rental');

// Получить все аренды
exports.getAllRentals = async (req, res) => {
  try {
    const rentals = await Rental.findAll();
    res.status(200).json(rentals);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при получении аренд' });
  }
};

// Получить аренду по ID
exports.getRentalById = async (req, res) => {
  try {
    const rental = await Rental.findByPk(req.params.id);
    if (!rental) {
      return res.status(404).json({ error: 'Аренда не найдена' });
    }
    res.status(200).json(rental);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при получении аренды' });
  }
};

// Создать новую аренду
exports.createRental = async (req, res) => {
  try {
    const newRental = await Rental.create(req.body);
    res.status(201).json(newRental);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при создании аренды' });
  }
};

// Обновить аренду по ID
exports.updateRental = async (req, res) => {
  try {
    const rental = await Rental.findByPk(req.params.id);
    if (!rental) {
      return res.status(404).json({ error: 'Аренда не найдена' });
    }
    await rental.update(req.body);
    res.status(200).json(rental);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при обновлении аренды' });
  }
};

// Удалить аренду по ID
exports.deleteRental = async (req, res) => {
  try {
    const rental = await Rental.findByPk(req.params.id);
    if (!rental) {
      return res.status(404).json({ error: 'Аренда не найдена' });
    }
    await rental.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при удалении аренды' });
  }
};

const Genre = require('../models/Genre');

// Получить все жанры
exports.getAllGenres = async (req, res) => {
  try {
    const genres = await Genre.findAll();
    res.status(200).json(genres);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при получении жанров' });
  }
};

// Получить жанр по ID
exports.getGenreById = async (req, res) => {
  try {
    const genre = await Genre.findByPk(req.params.id);
    if (!genre) {
      return res.status(404).json({ error: 'Жанр не найден' });
    }
    res.status(200).json(genre);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при получении жанра' });
  }
};

// Создать новый жанр
exports.createGenre = async (req, res) => {
  try {
    const newGenre = await Genre.create(req.body);
    res.status(201).json(newGenre);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при создании жанра' });
  }
};

// Обновить жанр по ID
exports.updateGenre = async (req, res) => {
  try {
    const genre = await Genre.findByPk(req.params.id);
    if (!genre) {
      return res.status(404).json({ error: 'Жанр не найден' });
    }
    await genre.update(req.body);
    res.status(200).json(genre);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при обновлении жанра' });
  }
};

// Удалить жанр по ID
exports.deleteGenre = async (req, res) => {
  try {
    const genre = await Genre.findByPk(req.params.id);
    if (!genre) {
      return res.status(404).json({ error: 'Жанр не найден' });
    }
    await genre.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при удалении жанра' });
  }
};


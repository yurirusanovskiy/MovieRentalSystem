const Movie = require('../models/Movie');

// Получить все фильмы
exports.getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.findAll();
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при получении фильмов' });
  }
};

// Получить фильм по ID
exports.getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findByPk(req.params.id);
    if (!movie) {
      return res.status(404).json({ error: 'Фильм не найден' });
    }
    res.status(200).json(movie);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при получении фильма' });
  }
};

// Создать новый фильм
exports.createMovie = async (req, res) => {
  try {
    const newMovie = await Movie.create(req.body);
    res.status(201).json(newMovie);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при создании фильма' });
  }
};

// Обновить фильм по ID
exports.updateMovie = async (req, res) => {
  try {
    const movie = await Movie.findByPk(req.params.id);
    if (!movie) {
      return res.status(404).json({ error: 'Фильм не найден' });
    }
    await movie.update(req.body);
    res.status(200).json(movie);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при обновлении фильма' });
  }
};

// Удалить фильм по ID
exports.deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findByPk(req.params.id);
    if (!movie) {
      return res.status(404).json({ error: 'Фильм не найден' });
    }
    await movie.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при удалении фильма' });
  }
};

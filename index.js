require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const routes = require('./routes/routes');
const { sequelize, connectDB, disconnectDB } = require('./config/db');
const Customer = require('./models/Customer');

const app = express();
app.use(express.json());
app.use(cookieParser());


connectDB();


sequelize.sync({ alter: true })
  .then(() => {
    console.log('All models were synchronized successfully.');
  })
  .catch(error => {
    console.error('Error syncing models:', error);
  });


app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Please provide valid customer data' });
  }

  try {
    const customerExists = await Customer.findOne({ where: { email } });
    if (customerExists) {
      return res.status(400).json({ message: 'Email is already in use' });
    }

    const newCustomer = await Customer.create({ name, email, password });
    res.status(201).json({ message: 'Customer created successfully', customer: newCustomer });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Please provide both email and password' });
  }

  try {

    const customer = await Customer.findOne({ where: { email } });
    if (!customer) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isPasswordValid = await Customer.verifyPassword(password, customer.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Gen JWT token
    const token = jwt.sign({ id: customer.id }, process.env.SECRET_KEY, { expiresIn: '1h' });
    
    // Send token cookie
    res.cookie('movieRentalToken', token, { httpOnly: true });
    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Middleware check JWT 
const authenticateJWT = (req, res, next) => {
  const token = req.cookies.movieRentalToken;
  if (!token) {
    return res.status(403).json({ message: 'Unauthorized, no token' });
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Unauthorized token' });
    }
    req.customerId = decoded.id;
    next();
  });
};

app.use('/api', authenticateJWT, routes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// disconnect from DB
process.on('SIGINT', async () => {
  await disconnectDB();
  process.exit();
});

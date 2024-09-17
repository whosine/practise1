// const express = require ('express');

// const app = express ();

// app.get('/', (req,res) =>{
//     res.send('hello world')

// })


// app.listen (5000, ()=>{
//     console.log('server runnin .....')
// })


// this is the code

const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors');
const User = require('./model'); // Import the User model
const { authenticateToken } = require('./middleware'); // Import the middleware

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Update your MongoDB URI with correct credentials and database name
const mongoURI = 'mongodb+srv://user:test@cluster0.m7a62wj.mongodb.net/';
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('MongoDB connected');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

app.post('/signup', async (req, res) => {
  const { username, email, password, reenterPassword } = req.body;
  
  // Check if passwords match
  if (password !== reenterPassword) {
    return res.status(400).send('Passwords do not match');
  }
  
  try {
    // Check if username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).send('Username already exists');
    }
    
    // Hash the password before saving to database
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create a new user document
    const newUser = new User({ username, email, password: hashedPassword });
    
    // Save the new user to the database
    await newUser.save();
    
    res.status(201).send('User registered');
  } catch (err) {
    // Handle MongoDB duplicate key error
    if (err.code === 11000 && err.keyPattern && err.keyValue) {
      return res.status(400).send('Username or email already exists');
    }
    
    console.error(err);
    res.status(500).send('Error registering user');
  }
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).send('User not found');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send('Invalid password');
    }
    const token = jwt.sign({ id: user._id }, 'your-secret-key', { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error logging in');
  }
});

// app.get('/', (req, res) => {
//   res.send('Hello world');
// });

// Example of a protected route
app.get('/protected', authenticateToken, (req, res) => {
  res.send('This is a protected route');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

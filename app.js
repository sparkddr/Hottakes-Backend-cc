const express = require('express')
const mongoose = require('mongoose')

const dotenv = require("dotenv");
dotenv.config();

const userRoutes = require('./routes/user')

const MY_APP_SECRET = process.env.APP_SECRET;

const app = express () ;
app.use(express.json())

mongoose.connect(`mongodb+srv://admin:${MY_APP_SECRET}@hottest0.jnpzq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });


app.use('/api/auth', userRoutes);

module.exports = app ;
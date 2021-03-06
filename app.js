const express = require('express')
const helmet = require('helmet')
const mongoose = require('mongoose')

const mongoSanitize = require('express-mongo-sanitize');

const dotenv = require("dotenv");
dotenv.config();

const rateLimit = require('express-rate-limit')
const apiLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, 
	max: 100, 
	standardHeaders: true, 
	legacyHeaders: false,
})


const userRoutes = require('./routes/user')
const saucesRoutes = require('./routes/sauces')

const path = require('path');

const MY_APP_SECRET = process.env.APP_SECRET;

const app = express () ;
app.use(express.json())


mongoose.connect(`mongodb+srv://admin:${MY_APP_SECRET}@hottest0.jnpzq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use(helmet({ 
  crossOriginResourcePolicy: { policy: "same-site" } 
}))
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });


app.use(mongoSanitize());

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/auth', userRoutes, apiLimiter);
app.use('/api/sauces', saucesRoutes)

module.exports = app ;
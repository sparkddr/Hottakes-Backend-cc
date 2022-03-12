const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const passwordValidator = require('password-validator');
const schemaPassword = new passwordValidator();

schemaPassword.is().min(8)                                    
.is().max(100)                                  
.has().uppercase()                              
.has().lowercase()                             
.has().digits(1)                               
.has().not().spaces() ; 

const dotenv = require("dotenv");
dotenv.config();
const RANDOM_TOKEN_SECRET = process.env.RANDOM_TOKEN_SECRET

const User = require("../models/user");


exports.signup = (req, res, next) => {
  if (schemaPassword.validate(req.body.password)){
    bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        email: req.body.email,
        password: hash,
      });
      user
        .save()
        .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
  }else{
    let response = schemaPassword.validate(req.body.password, {details:true});
    return res.status(400).send(response)
  }
  
};

exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
    
      if (!user) {
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      } else {
        bcrypt
          .compare(req.body.password, user.password)
          .then((valid) => {
            if (!valid) {
              return res.status(401).send("Mot de passe incorrect !");
            } else {
              res.status(200).json({
                userId: user._id,
                token: jwt.sign({ userId: user._id }, RANDOM_TOKEN_SECRET, {expiresIn: "24h",}),
              });
            }
          })
          .catch((error) => res.status(500).json({ error }));
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

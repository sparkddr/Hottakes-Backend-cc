const Sauce = require("../models/sauces")

exports.createSauce = (req,res,next)=>{
    const sauceObject = JSON.parse(req.body.sauce)
    const sauce = new Sauce({
       ...sauceObject,
       imageUrl : `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
      });
    sauce.save()
      .then(()=> res.status(201).json( {message : 'Objet enregistré'}))
      .catch((error)=> res.status(400).json({error}))
}

exports.getSauces = (req,res,next)=>{
    Sauce.find()
        .then((sauces)=> res.status(200).json(sauces))
        .catch((error)=> res.status(400).json({error}))
}
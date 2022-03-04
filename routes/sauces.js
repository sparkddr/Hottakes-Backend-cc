const express = require('express') ; 
const router = express.Router() ; 

const auth = require("../middleware/auth")
const multer = require("../middleware/muter-config")

const sauceCtrl = require('../controllers/sauces') ; 

router.post('/' ,auth , multer, sauceCtrl.createSauce)
router.get('/' , sauceCtrl.getSauces)
router.get('/:id' , sauceCtrl.getOneSauce)
router.put('/:id' ,auth, multer, sauceCtrl.modifySauce)
/*
router.delete('/:id' , sauceCtrl.deleteSauce)
router.post('/:id/like' , sauceCtrl.deleteSauce)*/

module.exports = router
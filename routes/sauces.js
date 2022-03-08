const express = require('express') ; 
const router = express.Router() ; 

const auth = require("../middleware/auth")
const multer = require("../middleware/muter-config")

const sauceCtrl = require('../controllers/sauces') ; 

router.post('/' ,auth , multer, sauceCtrl.createSauce)
router.get('/' , auth, sauceCtrl.getSauces)
router.get('/:id' , sauceCtrl.getOneSauce)
router.put('/:id' ,auth, multer, sauceCtrl.modifySauce)
router.delete('/:id' , auth, sauceCtrl.deleteSauce)
router.post('/:id/like' ,auth,  sauceCtrl.likeSauce)

module.exports = router
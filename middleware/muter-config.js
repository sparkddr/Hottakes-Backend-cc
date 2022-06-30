const multer = require('multer')
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
  };
const fs = require('fs')
const path = require ('path')

fs.mkdir( path.join(__dirname, '/../images'), (err)=>{
  if (err){
    return console.log(err)
  }
  console.log('Directory created successfully!') 
})

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, 'images');
    },
    filename: (req, file, callback) => {
      const name = file.originalname.split(' ').join('_');
      const nameTwo = name.split('.')[0]
      const extension = MIME_TYPES[file.mimetype];
      callback(null, nameTwo + Date.now() + '.' + extension);
    }
  });

  module.exports = multer({storage: storage}).single('image');
  
const multer = require('multer');
const path = require ('path');

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
      callback(null, 'public/img/detalle')
  },
  filename: function (req, file, callback) {
    callback(null,`img-${Date.now()}${path.extname(file.originalname)}`)
      
  }
})

const uploadFile = multer({
  storage
})



module.exports= uploadFile;
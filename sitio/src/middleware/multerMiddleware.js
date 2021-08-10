const multer = require('multer');
const path = require ('path');

const storage = multer.diskStorage({
  destination: (req, file, cb)=>{
  cb (null, path.join(__dirname, '../public/img/detalle') )

  },
filename: (req, file, cb)=>{
let filename= 'images[]'+ Date.now()+ path.extname(file.originalfilename);
  cb (null, filename);
  }
});

const uploadFile = multer({ storage:storage });


module.exports= uploadFile;
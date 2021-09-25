module.exports = (req,res,next) => {
    if(req.cookies.iocusForever){
        req.session.usuario = req.cookies.iocusForever;
    }
    next()
}
/* const path = require('path');
let db= require(path.join(__dirname,'../../database/models'));

module.exports = async(req,res,next)=>{
    let usuario = await db.User.findOne()
    if(req.cookies.iocusForever){
             usuario = req.cookies.iocusForever
             req.session.usuario =usuario
    }       
    next()
}  */
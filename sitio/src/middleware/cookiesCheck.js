module.exports = (req,res,next) => {
    if(req.cookies.iocusForever){
        req.session.usuario = req.cookies.iocusForever;
    }
    next()
}

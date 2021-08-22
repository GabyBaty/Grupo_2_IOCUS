module.exports = (req,res,next) => {
    if(req.session.usuario){
        res.locals.usuario= req.session.usuario
    }
    next()
}

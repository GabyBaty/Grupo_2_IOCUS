module.exports = (req,res,next) => {
    if(req.session.usuario && req.session.usuario.role === "Administrador"){
        next()
    }else{
        res.redirect('/')
    }
}
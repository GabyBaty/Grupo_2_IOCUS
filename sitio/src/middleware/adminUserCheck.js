module.exports = (req,res,next) => {
    if(req.session.usuario && req.session.usuario.role === "admin"){
        next()
    }else{
        res.redirect('/')
    }
}
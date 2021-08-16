module.exports = {
    login: (req,res) => {
        return res.render('users/login', { title: 'IOCUS-LOGIN' });
    },
    profile: (req,res) => {
        return res.render('users/profile', {
            title: 'Mi perfil'
        })
    }
}
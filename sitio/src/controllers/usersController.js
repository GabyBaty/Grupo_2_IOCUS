module.exports = {
    login: (req,res) => {
        return res.render('users/login', { title: 'Express' });
    }
}
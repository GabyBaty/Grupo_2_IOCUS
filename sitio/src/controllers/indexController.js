module.exports = {
    index: (req,res) => {
        return res.render('index', { title: 'IOCUS-INDEX' });
    },
    about: (req,res) => {
        return res.render('about', { title: 'IOCUS-ABOUT'});
    },  
    
}
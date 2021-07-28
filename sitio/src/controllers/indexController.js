module.exports = {
    index: (req,res) => {
        return res.render('index', { title: 'IOCUS-INDEX' });
    },
    contacto: (req,res) => {
        return res.render('contacto', { title: 'IOCUS-CONTACTO' });
    },
    about: (req,res) => {
        return res.render('about', { title: 'IOCUS-ABOUT'});
    },  
    
}
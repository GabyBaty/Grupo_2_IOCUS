module.exports = {
    detail: (req,res) => {
        return res.render('products/detail', { title: 'IOCUS-DETALLE' });
    },
    cart: (req,res) => {
        return res.render('products/cart', { title: 'IOCUS-CARRITO' });
    },
    editor: (req,res) => {
        return res.render('products/editor', { title: 'Editor de Prodcutos' });
    },
    filter: (req,res) => {
        return res.render('products/filter', { title: 'Lista de productos' });
    },
    
}
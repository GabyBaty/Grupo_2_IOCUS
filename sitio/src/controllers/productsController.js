module.exports = {
    detail: (req,res) => {
        return res.render('products/detail', { title: 'IOCUS-DETALLE' });
    },
    cart: (req,res) => {
        return res.render('products/cart', { title: 'IOCUS-CARRITO' });
    },
    add: (req,res) => {
        return res.render('products/add', { title: 'Agregar prodcuto' });
    },
    
    edit: (req,res) => {
        return res.render('products/edit', { title: 'Editar prodcuto' });
    },
    filter: (req,res) => {
        return res.render('products/filter', { title: 'IOCUS-LISTA' });
    },
}
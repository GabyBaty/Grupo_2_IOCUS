module.exports = {
    detail: (req,res) => {
        return res.render('products/detail', { title: 'Detalle de producto' });
    },
    cart: (req,res) => {
        return res.render('products/cart', { title: 'Carrito' });
    }
}
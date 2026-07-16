const obtenerProductos = async(req, res) => {
    try {
        const productos = await Producto.find().populate()
                res.json({ usuarios, timestamp: new Date().toISOString() });
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: "Error al consultar los productos" });
    }
}
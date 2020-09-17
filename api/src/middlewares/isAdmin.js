module.exports = (req, res, next) => {    
    if (req.user.rol == 'admin') {
        return next();
    }
    res.status(401).json({ msg: "Acceso no autorizado para usuarios" });
}
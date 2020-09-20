const server = require('express').Router();
const { User } = require('../db.js');
const bcrypt = require('bcrypt');
const authentication = require('../jwt');
const isAdmin = require('../middlewares/isAdmin');

server.post('/login', async (req, res) => {
    const { email, password } = req.body;
    if (email && password) {
        let user = await User.findOne({
            where: {
                email: email,
                otherAuth: 'no'
            }
        })
        if (!user) {
            return res.status(401).json({ message: 'No se encontró el mail: ', email: email });
        }
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
                console.log(err);
            }
            if (isMatch) {
                let payload = { id: user.id };
                let token = authentication.jwt.sign(payload, authentication.jwtOptions.secretOrKey, { expiresIn: 9000 })
                return res.json({ message: 'ok', token: token })
            } else {
                //password is incorrect
                return res.status(401).json({ message: 'Password is incorrect!' })
            }
        });
    }
})

server.get('/me', authentication.passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({ message: "Usted está autorizado correctamente!", user: req.user });
});

server.get('/logout', (req, res) => {
    req.logout();
    // res.redirect('http://google.com');
    res.send('usted hizo logout correctamente')
});

server.post("/promote/:id", authentication.passport.authenticate('jwt', { session: false }), isAdmin, (req, res) => {
    const { id } = req.params;
    User.update(
        { rol: "admin" },
        { where: { id: id } }
    )
        .then(() => {
            res.status(200).json({ message: "se pudo promover al usuario a admin" })
        })
        .catch(err => res.status(404).json(err))
});

server.get('/google', authentication.passport.authenticate('google', { scope : ['profile', 'email'] }));

server.get('/google/callback', authentication.passport.authenticate('google'), (req, res) => {
    if (req.user) {
        let payload = { id: req.user.id };
        let token = authentication.jwt.sign(payload, authentication.jwtOptions.secretOrKey, { expiresIn: 9000 });   
        return res.redirect(`http://localhost:3000/checkuser/auth/${req.user.id}/${token}`);
    } else {
        return res.redirect('http://localhost:3000/login/loginuser');
    }
});

server.get('/github', authentication.passport.authenticate('github', { scope: ['user:email', 'read:user']}));

server.get('/github/callback', authentication.passport.authenticate('github', { failureRedirect: 'http://localhost:3000/login/loginuser' }), (req, res) => {
    let payload = { id: req.user.id };
    let token = authentication.jwt.sign(payload, authentication.jwtOptions.secretOrKey, { expiresIn: 9000 });   
    res.redirect(`http://localhost:3000/checkuser/auth/${req.user.id}/${token}`);
});

module.exports = server;
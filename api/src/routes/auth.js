
const server = require('express').Router();
const { User } = require('../db.js');
const bcrypt = require('bcrypt');
const authentication = require('../jwt');




server.post('/login', async (req, res) => {
    const { email, password } = req.body;
    if (email && password) {
        let user = await User.findOne({
            where: {
                email: email
            }
        })
        if (!user) {
            return res.status(401).json({message: 'No se encontró el mail: ', email: email});
        }
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
              console.log(err);
            }
            if (isMatch) {
              let payload = { id: user.id };
              let token = authentication.jwt.sign(payload, authentication.jwtOptions.secretOrKey)
              return res.json({message: 'ok', token: token})
            } else {
              //password is incorrect
              return res.status(401).json({message:'Password is incorrect!'})
            }
        });
    }
})

server.get('/me',authentication.passport.authenticate('jwt',{session:false}),(req,res)=>{
  console.log(req)
  res.json({message:"Usted está autorizado correctamente!",user:req.user});
});

server.get('/logout', (req, res) => {
    req.logout();
    res.redirect('http://google.com');
});

module.exports = server;


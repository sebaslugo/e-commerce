const server = require('express').Router();
const { User } = require('../db.js');


server.post('/', (req, res) => {
    const { name, email, password, birthday } = req.body;
    console.log(req.body)
    if(name && email && password && birthday){
        User.create({
            name: name,
            email: email,
            Password: password,
            birthday: birthday
        })
        .then(user => {
            console.log(User)
            return res.status(201).json(user)
        })
        .catch(error => {
            console.log(error)
            return res.status(400).send(error)
        })
    }
})

module.exports = server;
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
server.put('/:id', (req, res) => {
    const { id } = req.params;
    const { name, email, password, birthday } = req.body;
    User.update(
		{ name, email, password, birthday},
        {where: { id: id },
        returning: true,
    })
    .then(user => {
        return res.status(200).json(user)
    })
    .catch(error => {
        return res.status(400).send(error)
    })
})

server.get('/', (req, res) => {
    console.log(req.body)
    User.findAll()
    .then(users => {
        res.status(200).json(users)
    })
})

server.delete('/:id', (req, res) => {
	const { id } = req.params;
	User.destroy({
		where: {
			id: id
		}
	})
	.then(usuario => {
        console.log(usuario, "se borro")
		if (usuario > 0) {
			return res.status(200).json({message: 'the ID user: ' + id + ', has been deleted.'});
		} else {
			return res.json({message: 'the ID: ' + id + ', does not correspond to any user.'});
		}
	})
	.catch(err => res.send(400).json(err.message));	
});


module.exports = server;
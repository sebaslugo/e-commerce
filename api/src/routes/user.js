const server = require('express').Router();
const { User,Product, Order, OrderList } = require('../db.js');


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


server
    .route('/:id/orders')
    .get((req,res)=>{
        const {id} = req.params
        OrderList.findAll({where:{userId:id},
        }).then((orders)=>{
            res.json(orders)
        }).catch((err) => {
            res.json({ err: "Usuario no existente" });
        })
    })



    //S38:Crear Ruta para agregar Item al Carrito
server.post("/:userId/cart", (req, res) => {
   
    const { userId, status, total } = req.body;
  
    Order.create({
      status: status,
      userId: userId,
      total: total,
    })
      .then((created) => {
        res.status(200).send(created);
      })
      .catch((err) => res.status(400).json(err.message));
  });


  //S40:Crear Ruta para vaciar el carrito

server.delete("/:idUser/cart", (req, res) => {
    const id = req.params.id;
    Order.destroy({
      where: { id: id },
    })
      .then(() => {
        res.send("Orden eliminada");
      })
      .catch(res.send);
  });
  
module.exports = server;
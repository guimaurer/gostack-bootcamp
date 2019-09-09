const { Router } = require('express');

const routes = new Router();

routes.get('/', (req,res) => {
  return res.json({ Messege: 'Hello Guilherme'})
})

module.exports = routes;
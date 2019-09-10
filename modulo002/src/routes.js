import { Router } from 'express';

const routes = new Router();

routes.get('/', (req,res) => {
  return res.json({ Messege: 'Hello Super'})
})

export default routes;
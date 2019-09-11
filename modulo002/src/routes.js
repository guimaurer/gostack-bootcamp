import { Router } from 'express';

const routes = new Router();

routes.get('/', (req, res) => res.json({ Messege: 'Hello Super' }));

export default routes;

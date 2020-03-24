import { Router } from 'express';

const routes = Router();

routes.post('/users', (req, res) => {
  return res.json('ok');
});

export default routes;

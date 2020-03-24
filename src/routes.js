import { Router } from 'express';

import Ongs from './controllers/Ongs';

const routes = Router();

routes.get('/ongs', Ongs.index);
routes.post('/ongs', Ongs.store);

export default routes;

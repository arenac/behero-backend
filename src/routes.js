import { Router } from 'express';

import {
  validatePostOngs,
  validateGetProfile,
  validateDeleteIncidents,
  validateGetIncidents,
  validatePostIncidents,
  validatePostSession,
} from './validators';

import SessionControlles from './controllers/SessionController';
import OngController from './controllers/OngController';
import IncidentController from './controllers/IncidentController';
import ProfileController from './controllers/ProfileController';

const routes = Router();

routes.post('/session', validatePostSession(), SessionControlles.store);

routes.get('/ongs', OngController.index);
routes.post('/ongs', validatePostOngs(), OngController.store);

routes.get('/incidents', validateGetIncidents(), IncidentController.index);
routes.post('/incidents', validatePostIncidents(), IncidentController.store);
routes.delete(
  '/incidents/:id',
  validateDeleteIncidents(),
  IncidentController.delete
);

routes.get('/profile', validateGetProfile(), ProfileController.index);

export default routes;

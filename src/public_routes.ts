
/**
 * Public Routes are those API url's that anyone can request
 * whout having to be logged in, for example:
 * 
 * POST /user is the endpoint to create a new user or "sign up".
 * POST /token can be the endpoint to "log in" (generate a token)
 */
import { Router } from 'express';
import { safe } from './utils';
import * as actions from './actions';

const router = Router();

// signup route, creates a new user in the DB
router.post('/user', safe(actions.createUser));
router.get('/user/:id', safe(actions.getUser));
router.post('/tareas/:id', safe(actions.createTarea));
router.get('/tareas/:id', safe(actions.getUserTareas));
router.delete('/user/:id', safe(actions.deleteUser));
router.put('/tareas/:id', safe(actions.updateTarea));


export default router;

import { Router } from 'express';
import { CreateTagController } from './controllers/CreateTagController';
import { CreateUserController } from './controllers/CreateUserController';
import { AuthenticateUserController } from './controllers/AuthenticateUserController';
import { CreateComplimentController } from './controllers/CreateComplimentController';


import { ensureAdmin } from './middlewares/ensureAdmin';
import { ensureAuthenticated } from './middlewares/ensureAuthenticated';
import { ListUserSendComplimentsController } from './controllers/ListUserSendComplimentsController';
import { ListUserReceiveComplimentsController } from './controllers/ListUserReceiveComplimentsController';
import { ListTagsController } from './controllers/ListTagsController';
import { ListUsersController } from './controllers/ListUsersController';

const router = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const authenticateUserController = new AuthenticateUserController();
const createComplimentController = new CreateComplimentController();
const listUserSendComplimentsController = new ListUserSendComplimentsController();
const listUserReceiveComplimentsController = new ListUserReceiveComplimentsController();
const listTagsController = new ListTagsController();
const listUsersController = new ListUsersController();


router.post("/users", createUserController.handle);
router.get("/users", ensureAuthenticated, listUsersController.handle);

// router.use(ensureAdmin); //se aplicar middleware assim, todas rotas abaixo passarão por ele.

//pode ter tantos middlewares que quiser, antes do controllers
// ensureAuthenticated deve vir antes do  ensureAdmin, pois admin precisa antes estar autenticado
router.post("/tags", ensureAuthenticated, ensureAdmin, createTagController.handle); 
router.get("/tags", ensureAuthenticated, listTagsController.handle);


router.post("/login", authenticateUserController.handle);
router.post("/compliments", ensureAuthenticated, createComplimentController.handle);

//rotas de elogios enviados e recebidos pelo usuario
router.get("/users/compliments/send",  ensureAuthenticated, listUserSendComplimentsController.handle);
router.get("/users/compliments/receive", ensureAuthenticated, listUserReceiveComplimentsController.handle);


export { router };
import checkAuth from '@shared/http/middlewares/checkAuth';
import { Router } from 'express';
import CustomersController from '../controllers/CustomersControllers';

const customerRouter = Router();
const customerController = new CustomersController();

customerRouter.use(checkAuth);

customerRouter.get('/', customerController.show);

customerRouter.get('/:id', customerController.index);

customerRouter.post('/', customerController.create);

customerRouter.put('/:id', customerController.update);

customerRouter.delete('/:id', customerController.delete);

export default customerRouter;

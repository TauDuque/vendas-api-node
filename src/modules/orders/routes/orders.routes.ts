import checkAuth from '@shared/http/middlewares/checkAuth';
import { Router } from 'express';
import OrdersController from '../controllers/OrdersController';
import { celebrate, Joi, Segments } from 'celebrate';

const orderRouter = Router();
const ordersController = new OrdersController();

orderRouter.use(checkAuth);

orderRouter.get(
    '/:id',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        },
    }),
    ordersController.index,
);

orderRouter.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            customer_id: Joi.string().uuid().required(),
            products: Joi.required(),
        },
    }),
    ordersController.create,
);

export default orderRouter;

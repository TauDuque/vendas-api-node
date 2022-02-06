import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import multer from 'multer';
import uploadConfig from '@config/upload';
import UsersController from '../controllers/UsersController';
import checkAuth from '../../../shared/http/middlewares/checkAuth';
import AvatarController from '../controllers/AvatarController';

const usersRouter = Router();
const usersController = new UsersController();
const avatarController = new AvatarController();

const upload = multer(uploadConfig);

usersRouter.get('/', checkAuth, usersController.index);

usersRouter.get(
    '/:user_id',
    celebrate({
        [Segments.PARAMS]: {
            user_id: Joi.string().uuid().required(),
        },
    }),
    usersController.getUser,
);

usersRouter.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required(),
        },
    }),
    usersController.create,
);


usersRouter.patch(
    '/avatar',
    checkAuth,
    upload.single('avatar'),
    avatarController.update,
);

usersRouter.delete(
    '/:id',
    checkAuth,
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        },
    }),
    usersController.delete,
);

export default usersRouter;

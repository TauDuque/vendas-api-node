import { Request, Response } from 'express';
import SendForgothenPasswordEmailService from '../services/SendForgothenPasswordEmailService';

export default class ForgotPasswordController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { email } = request.body;

        const sendForgothenPasswordEmail =
            new SendForgothenPasswordEmailService();

        await sendForgothenPasswordEmail.execute({
            email,
        });

        return response.status(204).json('E-mail sent successfully.');
    }
}

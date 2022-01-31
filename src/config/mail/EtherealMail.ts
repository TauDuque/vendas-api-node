import nodemailer from 'nodemailer';
import { ITemplate } from './HandlebarsMailTemplate';
import HandlebarsMailTemplate from './HandlebarsMailTemplate';

interface IMailContact {
    name: string;
    email: string;
}

interface ImailProps {
    from?: IMailContact;
    to: IMailContact;
    subject: string;
    templateData: ITemplate;
}

export default class EtherealMail {
    static async sendMail({
        to,
        from,
        subject,
        templateData,
    }: ImailProps): Promise<void> {
        const account = await nodemailer.createTestAccount();

        const mailTemplate = new HandlebarsMailTemplate();

        const transporter = nodemailer.createTransport({
            host: account.smtp.host,
            port: account.smtp.port,
            secure: account.smtp.secure,
            auth: {
                user: account.user,
                pass: account.pass,
            },
        });
        const message = await transporter.sendMail({
            from: {
                name: from?.name || 'VendasApi',
                address: from?.email || 'equipe@api-vendas.com',
            },
            to: {
                name: to.name,
                address: to.email,
            },
            subject,
            html: await mailTemplate.parse(templateData),
        });

        console.log('Message sent: %s', message.messageId);
        console.log('Preview URL: %S', nodemailer.getTestMessageUrl(message));
    }
}

import SMTPTransport from 'nodemailer/lib/smtp-transport';
import * as nodemailer from 'nodemailer';
export declare class MailService {
    transporter(): nodemailer.Transporter<SMTPTransport.SentMessageInfo>;
    sendMail(email: string, subject: string, html: string): Promise<SMTPTransport.SentMessageInfo>;
}

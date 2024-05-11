import { revalidatePath } from 'next/cache';
import nodemailer from 'nodemailer';



export const sendEmail = async ({ email, mobile, message, color, data }) => {
    try {

        var transport = nodemailer.createTransport({
            host: process.env.MAIL_SERVICE_HOST,
            port: process.env.MAIL_SERVICE_PORT,
            secure: false,
            auth: {
                user: process.env.MAIL_SERVICE_USERNAME,
                pass: process.env.MAIL_SERVICE_PASSWORD
            }
        });

        let mailOptions = {}




        mailOptions = {
            from: {
                name: process.env.MAIL_SERVICE_NAME,
                address: process.env.MAIL_SERVER_ADDRESS
            },
            to: process.env.MAIL_RECIVER_MAILL_ID,
            bcc: process.env.MAIL_BCC_MAILL_ID,
            subject: "BreakdealMobiles :: New Inquiry is received",
            html: `<>
                        <p>New inquiry recived</p>
                        <p>Mobile Number: ${mobile}</p>
                        <p>Email: ${email}</p>
                        <p>Message: ${message}</p>
                        <p>COlor: ${color}</p>
                        <p>Model: ${data?.model}</p>
                        <p>Storage: ${data?.storage}</p>
                  </>`
        }




        const mailresponse = await transport.sendMail
            (mailOptions);
        return mailresponse;

        revalidatePath('/')

    } catch (error) {
        throw new Error(error.message);
    }
}
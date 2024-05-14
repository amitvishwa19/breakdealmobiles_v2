import { contentfulClient } from "@/utils/contentfull"
import { sendEmail } from "@/utils/mailer";
import { NextResponse } from "next/server"
const contentful = require('contentful-management')
import nodemailer from 'nodemailer';

export async function POST(req) {
    try {
        let data
        const payload = await req.json();
        console.log('checkout api', payload)
        const { name, email, mobile, address, model, storage, color } = payload

        const client = contentful.createClient({
            accessToken: process.env.CONTENTFULL_PERSONAL_ACCESS_TOKEN
        })

        client.getSpace(process.env.CONTENTFUL_SPACE)
            .then((space) => space.getEnvironment(process.env.CONTENTFUL_ENVIOREMENT))
            .then((environment) => environment.createEntry('orders', {
                fields: {
                    email: { 'en-US': email },
                    name: { 'en-US': name },
                    mobile: { 'en-US': mobile },
                    address: { 'en-US': address },
                    model: { 'en-US': model },
                    storage: { 'en-US': storage },
                    color: { 'en-US': color }
                }
            }))
            .then((entry) => data = entry)
            .catch(console.error)


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
            //to: process.env.MAIL_BCC_MAILL_ID,
            bcc: process.env.MAIL_BCC_MAILL_ID,
            subject: "BreakdealMobiles :: New Inquiry is received",
            html: `<>
                        <p>New Order recived</p>
                        <p>Name: ${name}</p>
                        <p>Mobile Number: ${mobile}</p>
                        <p>Email: ${email}</p>
                        <p>Email: ${address}</p>
                        <p>Color: ${color === "undefined" ? "Black" : color}</p>
                        <p>Model: ${model}</p>
                        <p>Storage: ${storage}</p>
                  </>`
        }




        const mailresponse = await transport.sendMail
            (mailOptions);

        return NextResponse.json({ message: "success", data, mailresponse: mailresponse })

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
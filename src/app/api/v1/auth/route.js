import { contentfulClient } from "@/utils/contentfull"
import { sendEmail } from "@/utils/mailer";
import { NextResponse } from "next/server"
const contentful = require('contentful-management')
import nodemailer from 'nodemailer';

export async function POST(req) {
    try {
        const payload = await req.json()
        console.log('userData', payload)
        // let data
        // const payload = await req.json();
        // console.log('checkout api', payload)
        const { given_name, email, picture, } = payload

        const client = contentful.createClient({
            accessToken: process.env.CONTENTFULL_PERSONAL_ACCESS_TOKEN
        })

        client.getSpace(process.env.CONTENTFUL_SPACE)
            .then((space) => space.getEnvironment(process.env.CONTENTFUL_ENVIOREMENT))
            .then((environment) => environment.createEntry('users', {
                fields: {
                    email: { 'en-US': email },
                    name: { 'en-US': given_name },
                    avatar: { 'en-US': picture },
                }
            }))
            .then((entry) => data = entry)
            .catch(console.error)



        return NextResponse.json({ message: "success", data: 'data' })

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
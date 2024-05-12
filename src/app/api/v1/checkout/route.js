import { contentfulClient } from "@/utils/contentfull"
import { NextResponse } from "next/server"
const contentful = require('contentful-management')


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


        return NextResponse.json({ message: "success", data })

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
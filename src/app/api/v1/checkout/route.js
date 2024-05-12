import { contentfulClient } from "@/utils/contentfull"
import { NextResponse } from "next/server"


export async function POST(req) {
    try {

        const payload = await req.json();
        console.log('checkout api', payload)

        // const res = await contentfulClient.getEntries({ 'content_type': 'products' })
        // const products = res.items


        return NextResponse.json({ message: "success", data: 'products' })

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
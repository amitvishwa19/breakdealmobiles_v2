import { contentfulClient } from "@/utils/contentfull"
import { NextResponse } from "next/server"


export async function GET(request) {
    try {

        //const res = await contentfulClient.getEntries({ 'content_type': 'address' })
        //const address = res.items
        console.log('products api')

        const res = await contentfulClient.getEntries({ 'content_type': 'offerModal' })
        const offer = res.items


        return NextResponse.json({ message: "success", data: offer })

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
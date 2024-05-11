import { contentfulClient } from "@/utils/contentfull"
import { NextResponse } from "next/server"


export async function GET(request) {
    try {

        //const res = await contentfulClient.getEntries({ 'content_type': 'address' })
        //const address = res.items
        // console.log('products api')

        const res = await contentfulClient.getEntries({ 'content_type': 'products' })
        const products = res.items


        return NextResponse.json({ message: "success", data: products })

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
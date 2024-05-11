import { contentfulClient } from "@/utils/contentfull"
import { NextResponse } from "next/server"


export async function GET({ params }) {
    try {

        //const res = await contentfulClient.getEntries({ 'content_type': 'address' })
        //const address = res.items
        // console.log('products id api')

        const res = await contentfulClient.getEntries({ 'content_type': 'variants' })
        const products = res.items


        return NextResponse.json({ message: "success", data: { product: products } })

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
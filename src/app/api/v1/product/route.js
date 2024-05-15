import { contentfulClient } from "@/utils/contentfull"
import { revalidatePath } from "next/cache"
import { NextResponse } from "next/server"


export async function GET(request) {
    try {

        //const res = await contentfulClient.getEntries({ 'content_type': 'address' })
        //const address = res.items
        // console.log('products api')

        const res = await contentfulClient.getEntries({ 'content_type': 'products', order: "fields.order", })
        const products = res.items

        revalidatePath("/product")


        return NextResponse.json({ message: "success", data: products })

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
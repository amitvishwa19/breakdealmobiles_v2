import { contentfulClient } from "@/utils/contentfull"
import { NextResponse } from "next/server"


export async function GET(request, { params }) {
    try {

        //const res = await contentfulClient.getEntries({ 'content_type': 'address' })
        //const address = res.items


        const { productId } = params
        //console.log('products id api', params)

        const resp = await contentfulClient.getEntries({ 'content_type': 'variants' })
        const data = resp.items

        const colors = await contentfulClient.getEntries({ 'content_type': 'colors' })
        const storages = await contentfulClient.getEntries({ 'content_type': 'storage' })

        const res = data.filter((i) => i?.fields?.slug === productId)
        const product = res[0]?.fields

        const coverImage = product?.cover?.fields?.file?.url
        const subvariant = product?.subvariant?.map((i) => i.fields)



        return NextResponse.json({ message: "success", data: { variants: data, coverImage: coverImage, subvariant: subvariant, colors: colors, storages: storages, product: product } })

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
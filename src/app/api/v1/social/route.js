import { contentfulClient } from "@/utils/contentfull"
import { revalidatePath } from "next/cache"
import { NextResponse } from "next/server"


export async function GET(request) {
    try {

        const res = await contentfulClient.getEntries({ 'content_type': 'social' })
        const social = res.items

        revalidatePath('/api/v1/social')

        return NextResponse.json({ message: "success", data: social })

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
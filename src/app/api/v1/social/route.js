import { contentfulClient } from "@/utils/contentfull"
import { NextResponse } from "next/server"


export async function GET(request) {
    try {

        const res = await contentfulClient.getEntries({ 'content_type': 'social' })
        const social = res.items



        return NextResponse.json({ message: "success", data: social })

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
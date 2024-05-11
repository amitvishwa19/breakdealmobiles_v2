import { sendEmail } from "@/utils/mailer"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"



export async function POST(request) {
    try {
        const payload = await request.json()
        const { mobile, email, message, color, data } = payload



        //console.log(userCookie.value)

        cookies().set('email', email)
        cookies().set('mobile', mobile)

        const userCookieEmail = cookies().get('email')
        const userCookieMobile = cookies().get('mobile')

        const mail = await sendEmail({ email, mobile, message, color, data })




        return NextResponse.json({ message: "inquiry sent successfully", data: mail })

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
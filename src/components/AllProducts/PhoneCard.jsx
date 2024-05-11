'use client'
import React from 'react'
import { useRouter } from 'next/navigation'

export default function PhoneCard({ data }) {
    const router = useRouter()
    const model = data?.fields.model
    const image_title = data?.fields?.coverImage?.fields?.title
    const image_url = data?.fields?.coverImage?.fields?.file?.url



    return (
        <div className="flex flex-col items-center justify-center cursor-pointer " onClick={() => {
            // router.push(`/product/${data?.fields?.slug}`)
            router.push(`/product/`)
        }}>
            <img src={image_url} alt={data.model} style={{ height: 500, widows: 600 }} />
            {/* <Image fill src={{ url: image_url }} alt={image_title} /> */}
            <span className="text-2xl font-bold">
                {model}
            </span>
        </div>
    )
}

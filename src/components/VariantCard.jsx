'use client'
import { useRouter } from 'next/navigation'
import React from 'react'



export default function VariantCard({ variant }) {
    const router = useRouter()
    const image_url = variant?.fields?.cover?.fields?.file?.url
    return (
        <div onClick={() => { router.push(`/product/${variant?.fields?.slug}`) }} className=' cursor-pointer'>
            <div className='flex flex-col items-center justify-center  p-4 rounded ' >
                <img src={image_url} alt={'cover image'} style={{ height: 300, widows: 300 }} />
                <span className='font-semibold text-md'>{variant?.fields?.title}</span>
            </div>
        </div>
    )
}

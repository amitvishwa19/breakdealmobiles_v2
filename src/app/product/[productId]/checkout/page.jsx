import CheckoutForm from '@/components/CheckoutForm'
import { Input } from '@/components/ui/input'
import { contentfulClient } from '@/utils/contentfull'
import React from 'react'


export async function fetchProductData() {
    const res = await contentfulClient.getEntries({ 'content_type': 'variants' })
    return res.items
}


export default async function Checkout({ params }) {
    const { productId } = params
    const data = await fetchProductData()

    console.log(params)

    const res = data.filter((i) => i?.fields?.slug === productId)
    const product = res[0]?.fields

    const coverImage = product?.cover?.fields?.file?.url
    return (
        <div className='p-10'>
            <div className='text-2xl text-slate-800 font-bold flex flex-col w-full text-center mb-10'>
                Please fill out the details and we will connect you soon
            </div>
            <div className='flex mt-10'>
                <div className='flex flex-col items-center gap-4 w-[50%]'>

                    <img src={coverImage} alt="" style={{ width: 400 }} />
                    <span className='text-xl font-bold mb-10 text-slate-600'>{product?.title}</span>
                </div>

                <div className='flex-1 pt-4'>
                    <CheckoutForm />
                </div>
            </div>
        </div>
    )
}

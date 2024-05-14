'use client'
import CheckoutForm from '@/components/CheckoutForm'
import { Input } from '@/components/ui/input'
import axios from 'axios'
import { useParams, useSearchParams } from 'next/navigation'
//import { contentfulClient } from '@/utils/contentfull'
import React, { useEffect, useState } from 'react'


// export async function fetchProductData() {
//     const res = await contentfulClient.getEntries({ 'content_type': 'variants' })
//     return res.items
// }


export default function Checkout() {
    const [data, setData] = useState({})
    const { colors, storages, coverImage, subvariant, product, images } = data
    const params = useParams()
    const { productId } = params
    const par = useSearchParams()
    const storage = par.get('storage')
    const color = par.get('color')
    const model = params.productId

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        await axios.get(`/api/v1/product/${productId}`)
            .then((res) => {
                //console.log(res.data.data);
                setData(res?.data?.data)
            })
    }

    //const res = data.filter((i) => i?.fields?.slug === productId)
    //const product = res[0]?.fields

    //const coverImage = product?.cover?.fields?.file?.url
    return (
        <div className='p-10'>
            <div className='text-2xl text-slate-800 font-bold flex flex-col w-full text-center mb-10'>
                Please fill out the details and we will connect you soon
            </div>
            <div className='flex flex-col md:flex-row mt-10 '>
                <div className='flex flex-col items-center gap-4 md:w-[50%] justify-center w-full'>

                    <img src={coverImage} alt="" className='md:w-80 w-40' />
                    <span className='text-xl font-bold mb-10 text-slate-600'>{product?.title} ({storage} - {color === "undefined" ? "Black" : color})</span>

                </div>

                <div className='flex-1 pt-4'>
                    <CheckoutForm />
                </div>
            </div>
        </div>
    )
}

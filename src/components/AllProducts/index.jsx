'use client'
import React, { useEffect, useState } from 'react'
import PhoneCard from './PhoneCard'
import axios from 'axios'
import { Skeleton } from '../ui/skeleton'





// export async function fetchProductData() {
//     const res = await contentfulClient.getEntries({ 'content_type': 'products' })
//     return res.items
// }


export default function AllProducts() {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchProducts()
    }, [])


    const fetchProducts = async () => {
        await axios.get('/api/v1/product')
            .then((res) => {
                setLoading(false)
                setProducts(res.data.data)
            })
    }



    return (

        <div>
            {
                loading ? <Loader /> :
                    <div className={`grid sm:grid-cols-2 md:grid-cols-4 gap-4 p-2`}>
                        {

                            products?.map((item, index) => {
                                const model = item.fields.model
                                const image_title = item?.fields?.coverImage?.fields?.title
                                const image_url = item?.fields?.coverImage?.fields?.file?.url
                                //console.log(item.sys.id)
                                return (
                                    <PhoneCard key={index} data={item} />
                                )
                            })
                        }
                    </div>
            }
        </div>

    )
}

const Loader = () => {
    return (
        <div className='grid sm:grid-cols-2 md:grid-cols-4 gap-4 p-2 '>
            <Skeleton className=" aspect-video h-60 w-full " />
            <Skeleton className=" aspect-video h-60 w-full" />
            <Skeleton className=" aspect-video h-60 w-full" />
            <Skeleton className=" aspect-video h-60 w-full" />
        </div>
    )
}

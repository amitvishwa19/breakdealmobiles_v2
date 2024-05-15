
'use client'
import React, { useEffect, useState } from 'react'
import FeatureInfo from '@/components/FeatureInfo'
import CTA from '@/components/CTA'
//import { contentfulClient } from '@/utils/contentfull'
import VariantCard from '@/components/VariantCard'
import axios from 'axios'


// export async function fetchProductData() {
//     const res = await contentfulClient.getEntries({ 'content_type': 'products' }, { order: "fields.order" })
//     //console.log(res.sys)
//     return res.items
// }


export default function ProductPage() {
    const [data, setData] = useState([])
    //const data = await fetchProductData()

    useEffect(() => {
        fetchProducts()
    }, [])

    const fetchProducts = async () => {
        await axios.get('/api/v1/product')
            .then((res) => {
                //console.log(res)
                setData(res.data.data)
            })
    }

    return (
        <div className='flex flex-col p-6'>
            <div className=''>
                <FeatureInfo />
            </div>


            <div className='    '>
                {
                    data?.map((item, index) => {
                        const model = item?.fields
                        //console.log(model)
                        return (
                            <div key={index} className='my-10'>
                                <div>
                                    <span className='font-bold text-slate-600 text-2xl'>{item?.fields?.model}</span>
                                    <span className='font-semibold text-slate-600'>( {item?.fields?.priceRange})</span>
                                </div>

                                <div className=' grid sm:grid-cols-2 md:grid-cols-4 gap-4 p-2'>

                                    {
                                        model.varants?.map((variant, index) => {
                                            //console.log(variant.fields)
                                            const image_url = variant?.fields?.cover?.fields?.file?.url
                                            //console.log(variant?.fields?.title)
                                            return (
                                                <VariantCard key={index} variant={variant} />

                                            )
                                        })
                                    }
                                </div>
                            </div>
                        )
                    })
                }
            </div>


            <div>
                <CTA />
            </div>
        </div>
    )
}



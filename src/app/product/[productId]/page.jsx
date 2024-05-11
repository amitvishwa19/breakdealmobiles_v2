'use client'
import ColorPallete from '@/components/ColorPallete'
import ProductBuy from '@/components/ProductBuy'
import StorageSelector from '@/components/StorageSelector'
import VariantSelector from '@/components/VariantSelector'
import { Button } from '@/components/ui/button'
// import { contentfulClient } from '@/utils/contentfull'
import axios from 'axios'
import { redirect } from 'next/navigation'
import React, { useEffect, useState } from 'react'

// export async function fetchProductData() {
//     const res = await contentfulClient.getEntries({ 'content_type': 'variants' })
//     return res.items
// }




export default function page({ params }) {
    const { productId } = params
    //const data = await fetchProductData()
    const [avaliableStorage, setAvaliableStorage] = useState([])
    const [data, setData] = useState({})

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

    const { colors, storages, coverImage, subvariant, product } = data


    return (
        <div className='flex h-full  p-10'>
            <div className='bg-slate-200 p-4'>
                <img src={coverImage} alt="" style={{ width: 400 }} />
            </div>
            <div className='flex flex-col p-4  mx-20'>
                <span className='text-2xl font-bold mb-10'>{product?.title}</span>
                <span className='text-xl font-bold text-slate-600 '>{product?.priceRange}</span>

                <div>
                    {
                        // !avaliableStorage?.length === 0 ?
                        <div>
                            <div className='flex gap-2 items-center my-10'>
                                <span className='font-bold'>Storage: </span>
                                <StorageSelector storage={storages?.items} subvariant={subvariant} setAvaliableStorage={setAvaliableStorage} avaliableStorage={avaliableStorage} />
                            </div>

                            <div className='flex gap-4 items-center my-5'>
                                <span className='font-bold'>Colors: </span>

                                <ColorPallete lcolors={colors?.items} />
                            </div>

                            <div className='my-10 w-full'>
                                <ProductBuy productId={productId} data={data} subvariant={subvariant} />
                            </div>
                        </div>
                        // :
                        // <div className='text-xl font-bold text-orange-600 p-4 bg-gray-200 rounded-md'>
                        //     Out of Stock
                        // </div>
                    }


                </div>



            </div >
        </div >
    )
}


import ColorPallete from '@/components/ColorPallete'
import ProductBuy from '@/components/ProductBuy'
import StorageSelector from '@/components/StorageSelector'
import VariantSelector from '@/components/VariantSelector'
import { Button } from '@/components/ui/button'
import { contentfulClient } from '@/utils/contentfull'
import { redirect } from 'next/navigation'
import React from 'react'

export async function fetchProductData() {
    const res = await contentfulClient.getEntries({ 'content_type': 'variants' })
    return res.items
}



export default async function page({ params }) {
    const { productId } = params
    const data = await fetchProductData()


    const colors = await contentfulClient.getEntries({ 'content_type': 'colors' })
    const storages = await contentfulClient.getEntries({ 'content_type': 'storage' })

    const res = data.filter((i) => i?.fields?.slug === productId)
    const product = res[0]?.fields

    const coverImage = product?.cover?.fields?.file?.url

    //console.log(product)
    // console.log(product)
    return (
        <div className='flex h-full  p-10'>
            <div className='bg-slate-200 p-4'>
                <img src={coverImage} alt="" style={{ width: 400 }} />
            </div>
            <div className='flex flex-col p-4  mx-20'>
                <span className='text-2xl font-bold mb-10'>{product?.title}</span>
                <span className='text-xl font-bold text-slate-600 '>{product?.priceRange}</span>



                <div className='flex gap-4 items-center my-5'>
                    <span className='font-bold'>Colors: </span>

                    <ColorPallete lcolors={colors.items} />
                </div>

                <div className='flex gap-2 items-center my-10'>
                    <span className='font-bold'>Storage: </span>

                    <StorageSelector storage={storages.items} />
                </div>

                <div className='my-10 w-full'>
                    <ProductBuy productId={productId} data={data} />
                </div>

                {/* <div>
                    {
                        product?.varants?.map((item, index) => {
                            console.log(item.fields)
                            return (
                                <div key={index}>
                                    item
                                </div>
                            )
                        })
                    }
                </div> */}

            </div >
        </div >
    )
}

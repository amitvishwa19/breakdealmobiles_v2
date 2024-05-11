
import ColorPallete from '@/components/ColorPallete'
import StorageSelector from '@/components/StorageSelector'
import VariantSelector from '@/components/VariantSelector'
import { contentfulClient } from '@/utils/contentfull'
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

    console.log(product)
    // console.log(product)
    return (
        <div className='flex h-full  p-10'>
            <div className='bg-slate-200 p-4'>
                <img src={coverImage} alt="" style={{ width: 400 }} />
            </div>
            <div className='flex flex-col p-4  mx-20'>
                <span className='text-2xl font-bold '>{product?.title}</span>
                <span className='text-xl font-bold text-slate-600 '>{product?.priceRange}</span>

                <div className='flex gap-4 items-center mt-4'>
                    <span className='font-bold'>Variant: </span>

                    <VariantSelector />
                </div>

                <div className='flex gap-4 items-center mt-4'>
                    <span className='font-bold'>Colors: </span>

                    <ColorPallete lcolors={colors.items} />
                </div>

                <div className='flex gap-2 items-center mt-4'>
                    <span className='font-bold'>Storage: </span>

                    <StorageSelector storage={storages.items} />
                </div>

                <div>
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
                </div>

            </div >
        </div >
    )
}

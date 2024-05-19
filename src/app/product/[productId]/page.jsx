'use client'
import ColorPallete from '@/components/ColorPallete'
import ProductBuy from '@/components/ProductBuy'
import StorageSelector from '@/components/StorageSelector'
import VariantSelector from '@/components/VariantSelector'
import { Button } from '@/components/ui/button'
// import { contentfulClient } from '@/utils/contentfull'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Skeleton } from '@/components/ui/skeleton'
import UspInfo from '@/components/UspInfo'




export default function ProductIdPage({ params }) {
    const router = useRouter()
    const { productId } = params
    //const data = await fetchProductData()
    const [avaliableStorage, setAvaliableStorage] = useState([])
    const [data, setData] = useState({})
    const [selectedImage, setSelectedImage] = useState('')
    const [selectedPrise, setSelectedPrice] = useState({ orignal: '', offer: '' })
    const [storage, setStorage] = useState('')
    const [selectedColor, setSelectedColor] = useState('#DAC1C')
    const [error, setError] = useState('Select Color')
    const [loading, setLoading] = useState(true)
    const [avaliable, setAvaliable] = useState(false)

    useEffect(() => {
        getData()
        //console.log(productId)
    }, [])

    const getData = async () => {
        await axios.get(`/api/v1/product/${productId}`)
            .then((res) => {
                //console.log(res.data.data);
                setLoading(false)
                setData(res?.data?.data)
            })
    }

    const { colors, storages, coverImage, subvariant, product, images } = data
    //console.log(subvariant)

    useEffect(() => {
        setSelectedImage(coverImage)
    }, [coverImage])

    useEffect(() => {
        const item = subvariant?.find((i) => i.storage2 === storage)
        setSelectedPrice({ orignal: item?.orignalPrice, offer: item?.price })
        //console.log('storage', storage)
    }, [storage])

    const handleBuy = () => {
        if (!selectedColor) {

            return toast.error('Please select a color to proceed')
        }
        console.log('storage', storage)

        router.push(`/product/${productId}/checkout?storage=${storage}&color=${selectedColor?.color}`)
    }


    return (
        <div className='mb-10'>
            <div className='flex flex-col md:flex-row h-full  p-10 items-center'>

                <div>

                    {
                        loading ?
                            <CoverLoader /> :
                            <div className='flex h-[440px] w-[300px] items-center justify-center'>
                                <img src={selectedImage} alt="" style={{ width: 600, height: 400 }} />
                            </div>

                    }

                    {
                        loading ?
                            <ArrayLoader /> :
                            <div className='flex gap-2 my-4 items-center'>
                                {
                                    images?.map((image, index) => {
                                        return (
                                            <div
                                                key={index}
                                                className=' cursor-pointer flex items-center justify-center'
                                                onClick={() => { setSelectedImage(image?.file?.url) }}
                                            >
                                                <img src={image?.file?.url} alt={image.title} height={80} width={80} />
                                            </div>
                                        )
                                    })
                                }
                            </div>
                    }
                </div>

                <div className='flex flex-col p-4  md:mx-20'>
                    <span className='text-2xl font-bold mb-10'>{product?.title}</span>
                    <span className='text-xl font-bold text-slate-600 '>{product?.priceRange}</span>

                    <div>
                        {
                            // !avaliableStorage?.length === 0 ?
                            <div>
                                <div className='flex gap-2 items-center my-10'>
                                    <span className='font-bold'>Storage: </span>
                                    <StorageSelector
                                        storage={storages?.items}
                                        subvariant={subvariant}
                                        setAvaliableStorage={setAvaliableStorage}
                                        avaliableStorage={avaliableStorage}
                                        setSelectedPrice={setSelectedPrice}
                                        setStorage={setStorage}
                                        setAvaliable={setAvaliable}
                                    />
                                </div>

                                <div className='flex gap-4 items-center my-5'>
                                    <span className='font-bold'>Colors: </span>

                                    <ColorPallete lcolors={colors?.items} selectedColor={selectedColor} setSelectedColor={setSelectedColor} />
                                </div>

                                <div className='flex gap-4'>
                                    <span className='font-bold'>Offer Price: </span>
                                    <span className='font-bold text-slate-800 text-2xl line-through'> ₹ {selectedPrise?.orignal}</span>
                                    <span className='font-bold text-slate-800 text-2xl'> ₹ {selectedPrise?.offer}</span>
                                </div>

                                {
                                    avaliable ?
                                        (
                                            <div className='my-10 w-full'>

                                                <Button
                                                    variant='primary'
                                                    className='bg-slate-800 text-gray-200 font-semibold'
                                                    onClick={handleBuy}
                                                >
                                                    Buy Now
                                                </Button>
                                            </div>
                                        ) :

                                        <div className='p-4 bg-orange-400 font-semibold mt-8 text-center rounded'>
                                            Out of Stock
                                        </div>

                                }

                                {/* <div className='flex p-4 items-center justify-center bg-red-400 text-xl font-bold'>
                                {error}
                            </div> */}
                            </div>


                        }


                    </div>



                </div >


            </div >

            <UspInfo />
        </div>
    )
}


const ArrayLoader = () => {
    return (
        <div className=' flex md:grid sm:grid-cols-2 md:grid-cols-4 gap-4 p-2 '>
            <Skeleton className=" aspect-video h-[80px] w-[80px] " />
            <Skeleton className=" aspect-video h-[80px] w-[80px] " />
            <Skeleton className=" aspect-video h-[80px] w-[80px] " />
        </div>
    )
}

const CoverLoader = () => {
    return (
        <div>
            <Skeleton className=" aspect-video h-[440px] w-[300px] " />
        </div>
    )
}
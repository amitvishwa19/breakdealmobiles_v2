'use client'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import Autoplay from "embla-carousel-autoplay"
import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import styles, { layout } from "@/app/style";
import Link from "next/link";
import GetStarted from "./GetStarted";
import axios from 'axios'

export default function AppBanner() {
    const [products, setProducts] = useState([])

    useEffect(() => {
        product_res()
    }, [])



    const product_res = async () => {
        await axios.get('/api/v1/product')
            .then((res) => {
                setProducts(res?.data?.data)
            })
    }

    const plugin = useRef(
        Autoplay({ delay: 4000, stopOnInteraction: false })
    )



    return (
        <Carousel
            plugins={[plugin.current]}
            className='bg-orange-400'
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}

        >
            <CarouselPrevious className='z-20' />
            <CarouselContent className=''>
                {
                    products?.map((product, index) => {
                        const item = product?.fields
                        const image = item?.coverImage?.fields?.file?.url

                        return (
                            <CarouselItem key={index} className=''>
                                <div className="flex h-full p-10">


                                    <div className='hidden md:flex w-[60%] items-center justify-center'>

                                        <div className={`${styles.flexStart} flex-col xl:px-0 sm:px-16  hidden md:flex`}>

                                            <div className=" flex-row justify-between items-center w-full flex">

                                                <h1 className="flex-1 font-poppins font-semibold ss:text-[72px] text-[52px]  ss:leading-[100.8px] leading-[75px]">
                                                    {item?.bannerTag}
                                                </h1>
                                                <div className="ss:flex hidden md:mr-4 mr-0">
                                                    <Link href={'/product'}><GetStarted /></Link>
                                                </div>
                                            </div>


                                            <p className={`max-w-[470px] mt-5 font-semibold`}>
                                                {item?.bannerSubtag}
                                            </p>
                                            <div className='p-6 mt-10 bg-sky-800 rounded text-white text-xl font-bold flex flex-col'>
                                                <span className='text-4xl'>
                                                    {item?.offer}
                                                </span>
                                                <span className='text-sm'>
                                                    {item?.subOffer}
                                                </span>
                                            </div>
                                        </div>
                                    </div>


                                    <div className='flex-1 p-1 flex flex-col items-center justify-center'>

                                        <img src={image} alt="" height={200} width={300} />
                                        <span className='text-2xl font-bold'>
                                            {item?.model}
                                        </span>
                                        <div className='font-bold text-2xl mt-4  text-slate-800'>
                                            {item?.priceRange}
                                        </div>
                                    </div>


                                </div >
                            </CarouselItem >
                        )
                    })
                }

            </CarouselContent >

            <CarouselNext />
        </Carousel >
    )
}

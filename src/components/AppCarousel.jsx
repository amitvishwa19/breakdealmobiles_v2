'use client'
import React from 'react'
import Autoplay from "embla-carousel-autoplay"
import Image from 'next/image'


import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { mobiles } from '@/constants'
import { BackgroundGradient } from './ui/background-gradient'
//import { BackgroundGradient } from './ui/BackgroundGradient'



export function AppCarousel() {

    const plugin = React.useRef(
        Autoplay({ delay: 4000, stopOnInteraction: true })
    )


    return (
        <Carousel
            className='min-h-screen text-slate-800'
            plugins={[plugin.current]}
        >
            <CarouselContent className='h-screen'>
                {
                    mobiles.map((item, index) => {
                        console.log(item)
                        return (
                            <CarouselItem key={index} className='bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-200 to-sky-600 items-center'>

                                <div className='p-20 bg-red-400 flex flex-col h-full'>
                                    <div className='flex items-center justify-between'>
                                        <div className='text-6xl font-bold'>
                                            {item.model}
                                        </div>
                                        <div className=''>
                                            <img src={item.image.src} alt="" />
                                        </div>
                                    </div>

                                </div>
                                {/* <CarousalScreen data={item} /> */}

                            </CarouselItem  >
                        )
                    })
                }
                {/* <CarouselItem>..ssdsdfsdf.</CarouselItem>
                <CarouselItem>..sdfsdfsfd.</CarouselItem>
                <CarouselItem>..sdfsdfdf.</CarouselItem> */}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    )
}

const CarousalScreen = ({ data }) => {

    console.log(data)
    return (

        <div className='p-20 flex h-full'>
            <div className='flex flex-col justify-between pb-20'>
                <div className='flex max-w-screen'>
                    <div className='text-6xl font-bold flex items-center'>
                        {data.model}
                    </div>
                    <div className='flex justify-end'>

                        <img src={data.image.src} alt="" />

                    </div>
                </div>
                <div className=' max-w-screen hidden md:flex md:justify-center'>
                    {
                        data.variant.map((item, index) => {
                            return (
                                <div key={index} className='w-10 h-10'>

                                    <img src={item.image.src} alt="" />
                                    {item.model}
                                </div>
                            )
                        })
                    }
                </div>
            </div>


        </div>
    )
}

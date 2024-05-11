'use client'

import Link from "next/link";
import { features } from "@/constants";
import { mobiles } from '@/constants'
import styles, { layout } from "@/app/style";
import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image";
import { Button } from "./ui/button";
import BuyCheckout from "./BuyCheckout";
import axios from 'axios';
import Autoplay from "embla-carousel-autoplay"
import { useRef } from "react";
import { useRouter } from 'next/navigation'

export default function AllProdCarousel() {

    const plugin = useRef(
        Autoplay({ delay: 4000, stopOnInteraction: true })
    )
    const router = useRouter()


    return (
        <section id="features" className="flex flex-col gap-10">

            {/* <div className={`md:flex w-full  gap-10 mx-10 justify-center mb-10`}>
                {
                    mobiles.map((item, index) => {
                        return (
                            <div key={index} className="flex flex-col items-center justify-center cursor-pointer " onClick={() => { router.replace('/product') }}>
                                <img src={item.image.src} alt={item.model} style={{ height: 500, widows: 600 }} />
                                <span className="text-2xl font-bold">
                                    {item.model}
                                </span>
                            </div>
                        )
                    })
                }
            </div> */}
            <div className="flex flex-col justify-center items-center mt-10">
                {
                    mobiles.map((item, index) => {
                        return (
                            <Carousel
                                key={index}
                                opts={{ align: "start", }}
                                className="w-full "
                                plugins={[plugin.current]}
                                onMouseEnter={plugin.current.stop}
                                onMouseLeave={plugin.current.reset}
                            >
                                <div className="text-2l  flex justify-center items-center text-sky-800 mb-2 flex-1 font-poppins font-semibold ss:text-[72px] text-[52px]  ss:leading-[100.8px] leading-[75px]">
                                    {item.model}
                                </div>
                                <CarouselContent className='flex w-full  justify-center my-10'>

                                    {item.variant.map((variant, index) => (
                                        <CarouselItem key={index} className="basis-1/2 lg:basis-1/6 flex">
                                            <div className="p-1">
                                                <Card>
                                                    <CardContent className="flex flex-col aspect-square items-center justify-center p-6 shadow-sm gap-2">
                                                        <img src={variant.image.src} alt={variant.model} style={{ color: 'red' }} />
                                                        <span className='font-semibold  text-md md:text-sm'>
                                                            {variant.model}({variant.storage})
                                                        </span>
                                                        <span className=" font-semibold text-xs md:text-sm">
                                                            ₹ {variant.price}
                                                        </span>
                                                        <BuyCheckout data={variant} />
                                                    </CardContent>
                                                </Card>
                                            </div>
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                                {/* <CarouselPrevious />
                                <CarouselNext /> */}
                            </Carousel>
                        )
                    })
                }
            </div>
        </section>
    )
}

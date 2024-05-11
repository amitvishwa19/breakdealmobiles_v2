'use client'
import React, { useRef } from 'react'
import Autoplay from "embla-carousel-autoplay"
import styles, { layout } from "@/app/style";
import GetStarted from "./GetStarted";
import Link from "next/link";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, } from "@/components/ui/carousel"
import { mobiles } from '@/constants'
import FeatureInfo from './FeatureInfo';




const Hero = () => {

  const plugin = useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  )



  return (
    <section id="home" className={`flex md:flex-col flex-col ${styles.paddingY} `}>

      <div className='flex'>
        <div className={`${styles.flexStart} flex-col xl:px-0 sm:px-16  hidden md:flex`}>

          <div className=" flex-row justify-between items-center w-full flex">

            <h1 className="flex-1 font-poppins font-semibold ss:text-[72px] text-[52px]  ss:leading-[100.8px] leading-[75px]">
              The Next <br className="sm:block hidden" />{" "}
              <span className="text-gradient">Generation</span>{" "}
            </h1>
            <div className="ss:flex hidden md:mr-4 mr-0">
              <Link href={'/product'}><GetStarted /></Link>
            </div>
          </div>

          <h1 className="font-poppins font-semibold ss:text-[68px] text-[52px]  ss:leading-[100.8px] leading-[75px] w-full">
            Refubrished Mobiles.
          </h1>
          <p className={`max-w-[470px] mt-5 font-semibold`}>
            Our team of experts uses a methodology to identify the best refubrished mobile for you
          </p>
          <div className='p-6 mt-10 bg-sky-800 rounded text-white text-xl font-bold flex flex-col'>
            <span className='text-4xl'>
              Free Cash on delivery*
            </span>
            <span className='text-sm'>
              Cash on delivery available in Vadodara & Rajkot
            </span>
          </div>
        </div>

        <div className={`flex-1 flex ${styles.flexCenter} md:my-0 my-10 relative`}>
          {/* <img src={pro_max.src} alt="billing" className="w-[100%] h-[80%] relative z-[5]" /> */}

          <Carousel
            className="w-full max-w-xs z-10"
            plugins={[plugin.current]}
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
          >
            <CarouselContent >
              {mobiles.map((item, index) => {
                var firstItem = item.variant[0].price;
                var lastItem = item.variant[item.variant.length - 1].price;


                return (
                  <CarouselItem key={index} className=''>
                    <Link href={'/product'}>
                      <div className="p-1 flex flex-col items-center">
                        <img src={item.image.src} alt="" />
                        <span className='text-2xl font-bold'>
                          {item.model}
                        </span>
                        <div className='font-bold text-2xl mt-4  text-orange-500'>
                          ₹ {firstItem} - ₹ {lastItem}
                        </div>
                      </div>
                    </Link>
                  </CarouselItem>
                )
              })}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>


          {/* gradient start */}
          <div className="absolute z-[0] w-[40%] h-[35%] top-0 pink__gradient" />
          <div className="absolute z-[1] w-[80%] h-[80%] rounded-full white__gradient bottom-40" />
          <div className="absolute z-[0] w-[50%] h-[50%] right-20 bottom-20 blue__gradient" />
          {/* gradient end */}
        </div>

      </div >
      {/* <div className={`ss:hidden ${styles.flexCenter}`}>
        <Link href={'/product'}><GetStarted /></Link>
      </div> */}


    </section >
  );
};

export default Hero;

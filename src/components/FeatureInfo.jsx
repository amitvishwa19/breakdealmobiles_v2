import React from 'react'
import { discount, robot, pro_max, replacements, warrenty, emi, quality, response, delivery } from "@/assets";


export default function FeatureInfo() {
    const usp = [

        {
            title: 'Upto 12 months warranty',
            img: warrenty
        },
        {
            title: 'EMI Available',
            img: emi
        },
        {
            title: '55+ Quality Checks',
            img: quality
        },
        {
            title: 'Quick Response',
            img: response
        },
        {
            title: 'Fast & Free Delivery',
            img: delivery
        }
    ]
    return (
        <div className='hidden md:flex w-full  items-center justify-center gap-16 my-4'>
            {
                usp?.map((item, index) => {
                    const title = item?.fields



                    return (
                        <div key={index} className='flex flex-col items-center justify-center '>
                            <img src={item?.img.src} alt="" className='h-6 md:h-16' />
                            <span className='font-semibold text-sm'>{item?.title}</span>
                        </div>
                    )
                })
            }
        </div>
    )
}

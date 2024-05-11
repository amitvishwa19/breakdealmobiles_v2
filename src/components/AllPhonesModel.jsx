'use client'
import Image from 'next/image'
import React from 'react'
import { useRouter } from 'next/navigation'



export function AllPhonesModel({ data }) {
    const router = useRouter()

    return (
        <div className={`md:flex w-full  gap-10 mx-10 justify-center mb-10`}>
            {
                data.map((item, index) => {
                    const model = item.fields.model
                    const image_title = item?.fields?.coverImage?.fields?.title
                    const image_url = item?.fields?.coverImage?.fields?.file?.url
                    //console.log(item.sys.id)
                    return (
                        <div key={index} className="flex flex-col items-center justify-center cursor-pointer " onClick={() => {
                            router.push(`/product/${item?.sys?.id}`)
                        }}>
                            <img src={image_url} alt={item.model} style={{ height: 500, widows: 600 }} />
                            {/* <Image fill src={{ url: image_url }} alt={image_title} /> */}
                            <span className="text-2xl font-bold">
                                {model}
                            </span>
                        </div>
                    )
                })
            }
        </div >
    )
}

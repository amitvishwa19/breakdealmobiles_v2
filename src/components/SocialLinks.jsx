'use client'
import axios from 'axios'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'



export default function SocialLinks() {
    useEffect(() => {
        getData()
    }, [])


    const [socialLinks, seetSocialLinks] = useState([])

    const getData = async () => {
        await axios.get('/api/v1/social')
            .then((res) => {
                console.log(res?.data?.data)
                seetSocialLinks(res?.data?.data)
            })
    }




    return (
        <div className='flex items-center gap-4'>
            {
                socialLinks.map((link, index) => {
                    const target = link?.fields?.link
                    const image = link?.fields?.image?.fields?.file?.url
                    //console.log(target)
                    return (
                        <div key={index}>
                            <Link href={target} target='_blank'>
                                <img src={image} height={25} width={25} alt=" title" />
                            </Link>
                        </div>
                    )
                })
            }
        </div>
    )
}

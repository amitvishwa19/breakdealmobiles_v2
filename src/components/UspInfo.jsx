

import axios from 'axios'
import React, { useEffect, useState } from 'react'



export default function UspInfo() {
    const [usp, setUsp] = useState([])

    useEffect(() => {
        getUsp()
    }, [])

    const getUsp = async () => {
        await axios.get('/api/v1/usp')
            .then((res) => {
                console.log(res)
                setUsp(res.data.data)
            })
    }



    return (
        <div className='hidden md:flex w-full  items-center justify-center gap-16 mt-20 '>
            {
                usp.map((item, index) => {
                    const title = item?.fields?.title
                    const image = item?.fields?.image?.fields?.file?.url
                    return (
                        <div key={index} className='flex flex-col items-center justify-center ' >
                            <img src={image} alt="" className='h-6 md:h-16' />
                            <span className='font-semibold text-sm'>{title}</span>
                        </div>
                    )
                })
            }
        </div>
    )
}

'use client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'



export default function Address() {
    useEffect(() => {
        getData()
    }, [])


    const [address, setAddress] = useState({})

    const getData = async () => {
        await axios.get('/api/v1/address')
            .then((res) => {
                //console.log(res?.data?.data[0]?.fields)
                setAddress(res?.data?.data[0]?.fields)
            })
    }



    return (
        <div>
            <h1 className='font-bold text-xl mb-2'>{address?.title}</h1>
            <div className='text-sm'>{address?.address}</div>
            <div className='text-sm'>{address.email}</div>
            <div className='text-sm'>{address.mobile}</div>
        </div>
    )
}

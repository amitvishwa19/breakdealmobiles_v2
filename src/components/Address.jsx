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
        <div className='w-60'>

            <h1 className='font-bold text-xl mb-2'>{address?.title}</h1>
            <div className='text-sm'>{address?.add1}</div>
            <div className='text-sm'>{address?.add2}</div>
            <div className='text-sm'>{address?.add3}</div>
            <div className='text-sm'>{address?.city}, {address?.state}, {address?.pin}</div>

            <div className='text-sm'>{address.email}</div>
            <div className='text-sm'>{address.mobile}</div>
        </div>
    )
}

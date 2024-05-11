'use client'
import React from 'react'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'


export default function ProductBuy({ productId, data }) {
    const router = useRouter()

    const handleBuy = () => {
        console.log('Buy', productId)
        router.push(`/product/${productId}/checkout`)
    }
    return (
        <Button
            variant='primary'
            className='bg-slate-800 text-gray-200 font-semibold'
            onClick={handleBuy}
        >
            Buy Now
        </Button>
    )
}

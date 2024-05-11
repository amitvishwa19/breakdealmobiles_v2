'use client'
import React from 'react'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'
import { toast } from "sonner";
import { useRouter } from 'next/navigation'


export default function CheckoutForm() {
    const router = useRouter()

    const onSubmitClick = (e) => {
        e.preventDefault()
        router.replace('/')
        toast.success('Congratulations')
    }

    return (
        <div className='flex flex-col gap-4'>
            <Input placeholder='Name' />
            <Input placeholder='Email' />
            <Input placeholder='Mobile' />
            <Textarea rows='10' placeholder="Delivery Address" />
            <Button className='bg-slate-800 text-gray-200 p-4' onClick={(e) => { onSubmitClick(e) }}>
                <span className='p-4'>
                    Buy Now
                </span>
            </Button>
        </div>
    )
}

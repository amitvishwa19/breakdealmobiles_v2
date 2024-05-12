'use client'
import React, { useState } from 'react'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'
import { toast } from "sonner";
import { useSearchParams, useRouter } from 'next/navigation'
import axios from 'axios'
import { Loader } from 'lucide-react'



export default function CheckoutForm() {
    const router = useRouter()
    const params = useSearchParams()
    const [data, setData] = useState({ name: '', email: '', mobile: '', address: '' })
    const [processing, setProcessing] = useState(false)

    const onSubmitClick = async (e) => {
        e.preventDefault()

        const storage = params.get('storage')
        const color = params.get('color')

        if (data.name.length === 0) { return toast.error('Please provide your mail') }
        if (data.email.length === 0) { return toast.error('Please provide your email') }
        if (data.mobile.length === 0) { return toast.error('Please provide your mobile') }
        if (data.address.length === 0) { return toast.error('Please provide your address') }

        try {
            setProcessing(true)
            await axios.post(`/api/v1/checkout`, { ...data, storage, color })
                .then((res) => {
                    toast.success('Order placed successfully')
                    router.replace('/')
                })
        } catch (error) {

        } finally {
            setProcessing(false)
        }


    }

    return (
        <div className='flex flex-col gap-4'>
            <Input disabled={processing} placeholder='Name' value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} />
            <Input disabled={processing} placeholder='Email' value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} />
            <Input disabled={processing} placeholder='Mobile' value={data.mobile} onChange={(e) => setData({ ...data, mobile: e.target.value })} />
            <Textarea disabled={processing} rows='10' placeholder="Delivery Address" value={data.address} onChange={(e) => setData({ ...data, address: e.target.value })} />
            <Button
                disabled={processing}
                className='bg-slate-800 text-gray-200 p-4'
                onClick={(e) => { onSubmitClick(e) }}
            >
                <span className='flex  gap-4 p-4 items-center'>
                    {
                        processing && <Loader size={16} className=' animate-spin' />
                    }
                    Buy Now
                </span>
            </Button>
        </div>
    )
}

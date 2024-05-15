'use client'
import AppGoogleLogin from '@/components/AppGoogleLogin'
import CheckoutForm from '@/components/CheckoutForm'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import axios from 'axios'
import { Loader } from 'lucide-react'
import { useParams, useSearchParams } from 'next/navigation'
//import { contentfulClient } from '@/utils/contentfull'
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';

// export async function fetchProductData() {
//     const res = await contentfulClient.getEntries({ 'content_type': 'variants' })
//     return res.items
// }


export default function Checkout() {
    const [data, setData] = useState({})
    const { colors, storages, coverImage, subvariant, product, images } = data
    const params = useParams()
    const { productId } = params
    const par = useSearchParams()
    const storage = par.get('storage')
    const color = par.get('color')
    const model = params.productId
    const [formData, setFormData] = useState({ name: '', email: '', mobile: '', address: '' })
    const [processing, setProcessing] = useState(false)
    const [showGoogle, setShowGoogle] = useState(false)

    useEffect(() => {
        getData()

        const auth = localStorage.getItem('auth')
        if (!auth) {
            setShowGoogle(true)
        }


    }, [])

    const getData = async () => {
        await axios.get(`/api/v1/product/${productId}`)
            .then((res) => {
                //console.log(res.data.data);
                setData(res?.data?.data)
            })
    }

    const onSubmitClick = async (e) => {
        e.preventDefault()

        console.log(params)

        const storage = par.get('storage')
        const color = par.get('color')
        const model = params.productId

        if (formData.name.length === 0) { return toast("Please provide your name !"); return toast.error('Please provide your mail') }
        if (formData.email.length === 0) { return toast("Please provide your email!"); return toast.error('Please provide your email') }
        if (formData.mobile.length === 0) { return toast("Please provide your mobile"); return toast.error('Please provide your mobile') }
        if (formData.address.length === 0) { return toast("Please provide your address!"); return toast.error('Please provide your address') }

        try {
            setProcessing(true)
            await axios.post(`/api/v1/checkout`, { ...formData, model, storage, color })
                .then((res) => {
                    setData({ name: '', email: '', mobile: '', address: '' })
                    toast('Order placed successfully')
                    router.replace('/')
                })
        } catch (error) {

        } finally {
            setProcessing(false)
        }


    }

    return (
        <div className='p-10'>
            {
                showGoogle && <AppGoogleLogin />
            }

            <div className='text-2xl text-slate-800 font-bold flex flex-col w-full text-center mb-10'>
                Please fill out the details and we will connect you soon
            </div>
            <div className='flex flex-col md:flex-row mt-10 '>
                <div className='flex flex-col items-center gap-4 md:w-[50%] justify-center w-full'>

                    <img src={coverImage} alt="" className='md:w-80 w-40' />
                    <span className='text-xl font-bold mb-10 text-slate-600'>{product?.title} ({storage} - {color === "undefined" ? "Black" : color})</span>

                </div>

                <div className='flex-1 pt-4'>
                    <div className='flex flex-col gap-4'>
                        <Input disabled={processing} className='border-slate-600' placeholder='Name' value={data.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                        <Input disabled={processing} className='border-slate-600' placeholder='Email' value={data.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                        <Input disabled={processing} className='border-slate-600' placeholder='Mobile' value={data.mobile} onChange={(e) => setFormData({ ...formData, mobile: e.target.value })} />
                        <Textarea disabled={processing} className='border-slate-600' rows='10' placeholder="Delivery Address" value={data.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} />
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
                </div>
            </div>
        </div>
    )
}

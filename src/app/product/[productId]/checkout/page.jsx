'use client'
import AppGoogleLogin from '@/components/AppGoogleLogin'
import CheckoutForm from '@/components/CheckoutForm'
import UspInfo from '@/components/UspInfo'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import { Textarea } from '@/components/ui/textarea'
import { useGoogleLogin } from '@react-oauth/google'
import axios from 'axios'
import { Loader } from 'lucide-react'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
//import { contentfulClient } from '@/utils/contentfull'
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { resolve } from 'styled-jsx/css'

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
    const [showGoogle, setShowGoogle] = useState(true)
    const [loading, setLoading] = useState(true)
    const [auth, setAuth] = useState(false)
    const router = useRouter()

    useEffect(() => {
        getData()

        const data = localStorage.getItem('auth')
        const email = localStorage.getItem('email')
        if (!data) {
            setShowGoogle(true)
        } else {
            setFormData({ ...formData, email: email })
        }


    }, [auth])

    useEffect(() => {
        const data = localStorage.getItem('auth')
        if (data) {
            setAuth(true)
        } else {
            setShowGoogle(true)
            setAuth(false)
        }
    }, [auth])

    const getData = async () => {
        await axios.get(`/api/v1/product/${productId}`)
            .then((res) => {
                setLoading(false)
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
            console.log(error)
        } finally {
            setProcessing(false)
        }


    }

    const googleLogin = useGoogleLogin({

        onSuccess: async tokenResponse => {
            await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
                headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
            })
                .then((res) => {
                    console.log(res.data)
                    localStorage.setItem('auth', true)
                    localStorage.setItem('name', res?.data?.given_name)
                    localStorage.setItem('email', res?.data?.email)
                    localStorage.setItem('picture', res?.data?.picture)
                    setAuth(true)
                })




            // localStorage.setItem('auth', true)
            // localStorage.setItem('name', response?.given_name)
            // localStorage.setItem('email', response?.email)
            // localStorage.setItem('picture', response?.picture)
            //userLoginWithGoogle(user)
        }

    });



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

                    {
                        loading ? <CoverLoader /> : <img src={coverImage} alt="" className='md:w-80 w-40' />
                    }
                    <span className='text-xl font-bold mb-10 text-slate-600'>{product?.title} ({storage} - {color === "undefined" ? "Black" : color})</span>

                </div>

                <div className='flex-1 pt-4'>
                    <div className='flex flex-col gap-4'>
                        <Input disabled className='border-slate-600' placeholder='Email' value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                        <Input disabled={processing || !auth} className='border-slate-600' placeholder='Name' value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                        <Input disabled={processing || !auth} className='border-slate-600' placeholder='Mobile' value={formData.mobile} onChange={(e) => setFormData({ ...formData, mobile: e.target.value })} />
                        <Textarea disabled={processing || !auth} className='border-slate-600' rows='10' placeholder="Delivery Address" value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} />
                        {
                            auth ?
                                (
                                    <Button
                                        disabled={processing || !auth}
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
                                ) :
                                (
                                    <Button

                                        className='bg-slate-800 text-gray-200 p-4'
                                        onClick={googleLogin}
                                    >
                                        <span className='flex  gap-4 p-4 items-center'>
                                            {
                                                processing && <Loader size={16} className=' animate-spin' />
                                            }
                                            Login to Continue
                                        </span>
                                    </Button>
                                )
                        }
                    </div>
                </div>
            </div>
            <UspInfo />
        </div>
    )
}


const CoverLoader = () => {
    return (
        <div>
            <Skeleton className=" aspect-video h-[440px] w-[300px] " />
        </div>
    )
}
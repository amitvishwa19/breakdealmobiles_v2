'useClient'
import React, { useEffect, useRef, useState } from 'react'
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Check, Loader } from 'lucide-react'
import { toast } from 'sonner'
import axios from 'axios'
import { getCookie, setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation'



export default function BuyCheckout({ data, children, group }) {
    const [processing, setProcessing] = useState(false)
    const [open, setOpen] = useState(false)
    const [userCookies, setuserCookies] = useState(null)
    const [formData, setFormData] = useState({ mobile: '', email: '', message: '', color: 'Black' })
    const [showform, setShowform] = useState(true)
    const router = useRouter()
    const mobileRef = useRef(null)
    const emailRef = useRef(null)
    const [selectedColor, setSelectedColor] = useState('Black')

    useEffect(() => {
        setuserCookies({ email: getCookie('email'), mobile: getCookie('mobile') })
        setFormData({ mobile: getCookie('mobile'), email: getCookie('email'), message: '' })
        if (getCookie('email') && getCookie('mobile')) {
            setShowform(false)
        }
    }, [])


    const handleBuyClick = async (variant) => {

        if (formData.mobile?.length > 12 || formData.mobile?.length < 10) {
            mobileRef.current?.focus()
            return toast.error('Please  enter a valid  mobile number')
        }
        if (!formData.email) {
            emailRef.current?.focus()
            return toast.error('Email is missing')

        }
        if (!formData.mobile) {
            emailRef.current?.focus()
            return toast.error('Contact number is missing')
        }




        try {
            setProcessing(true)


            await axios.post('/api/v1/mail', { email: formData.email, mobile: formData.mobile, data: data, color: formData.color })
                .then((res) => {
                    setShowform(false)
                    router.refresh()
                    setOpen(!open)
                    toast.success('Your Inquiry submited , we will connect you shortly')
                })
        } catch (error) {
            console.log(error)
            toast.success('Oops something went wrong, Please try again later')
        } finally {

            setProcessing(false)
        }
    }


    const hAndleOnOpenChange = () => {
        setOpen(!open)
        setProcessing(false)
    }

    const handleColourSelection = (color) => {
        setSelectedColor(color)
        setFormData({ ...formData, color: color })
    }


    return (
        <Dialog open={open} onOpenChange={() => { hAndleOnOpenChange() }}>
            <DialogTrigger asChild>
                <Button className='bg-slate-800 hover:bg-slate-800/60 text-gray-200 rounded' >Buy Now</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-white rounded overflow-hidden">
                <DialogHeader>
                    <DialogTitle className='font-bold text-2xl flex justify-center'>
                        {data.model} ({data.storage})
                    </DialogTitle>

                </DialogHeader>
                <div className=" gap-4 py-4  mx-auto flex">
                    <div>
                        <img src={data.image.src} alt="" className='h-80' />



                        <span className='font-bold md:text-xl flex justify-center text-orange-600'>
                            ₹{data.price}
                        </span>
                    </div>
                    <div>
                        <div className='flex flex-col items-center justify-center h-full gap-2'>
                            {
                                group?.colors?.map((data, index) => {
                                    return (
                                        <div key={index} className='flex flex-col justify-center items-center'>
                                            <span className=' font-semibold text-xs'>{data.color}</span>
                                            <div
                                                key={index}
                                                style={{ height: 40, width: 40, backgroundColor: data.code }}
                                                className='rounded-full  cursor-pointer flex items-center justify-center'
                                                onClick={() => { handleColourSelection(data.color) }}
                                            >
                                                {
                                                    selectedColor === data.color && <Check height={20} width={20} color='#fff' />
                                                }

                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>

                </div>

                {
                    showform &&
                    <div className='flex flex-col gap-2'>
                        <Input ref={mobileRef} value={formData.mobile} type="number" placeholder="Contact Number" className='rounded w-full' onChange={(e) => setFormData({ ...formData, mobile: e.target.value })} />
                        <Input ref={emailRef} value={formData.email} type="email" placeholder="Email" className='rounded w-full' onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                    </div>
                }

                <DialogFooter className=''>
                    <Button type="submit" disabled={processing}
                        className='bg-slate-800 hover:bg-slate-800/80 text-white rounded flex justify-center w-full'
                        onClick={() => { handleBuyClick() }}
                    >
                        {
                            processing && <Loader className='h-4 w-4 animate-spin mr-2' />
                        }
                        Submit Inquiry
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

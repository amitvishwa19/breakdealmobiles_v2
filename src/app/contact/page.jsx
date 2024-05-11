'use client'
import { Loader } from 'lucide-react'
import React, { useState } from 'react'
import styles, { layout } from "@/app/style";
import Business from '@/components/Business';
import { toast } from 'sonner';
import axios from 'axios';
import { Button } from '@/components/ui/button';


export default function ContactPage() {
    const [formData, setFormData] = useState({ mobile: '', email: '', message: '' })
    const [processing, setProcessing] = useState(false)


    const handleFormSubmit = async () => {


        if (formData.mobile.length > 12 || formData.mobile.length < 10) return toast.error('Please  enter a valid mobile number')
        if (!formData.email) return toast.error('Email is missing')

        if (!formData.mobile) return toast.error('Contact number is missing')



        try {
            setProcessing(true)


            await axios.post('/api/v1/mail', { email: formData.email, mobile: formData.mobile, message: formData.message })
                .then((res) => {
                    setFormData({ mobile: '', email: '', message: '' })
                    toast.success('Your Inquiry submited , we will connect you shortly')
                })
        } catch (error) {
            console.log(error)
            toast.success('Oops something went wrong, Please try again later')
        } finally {
            setProcessing(false)
        }

        //if (formData.mobile.length > 12 || formData.mobile.length < 12) return toast.error('Please  enter a valid mobile number')
        //if (!formData.email) return toast.error('Email is missing')

        // sendEmail(formData.email, 'inquiry')

        //setProcessing(true)
        //console.log(formData)
        //toast.success('Your Inquiry submited , we will connect you shortly')
    }
    return (
        <div className="bg-primary w-full overflow-hidden min-h-screen">


            <div>
                <div className='p-8'>
                    <div className={`bg-primary ${styles.flexStart}`}>
                        <div className={`${styles.boxWidth}`}>
                            <Business />
                        </div>
                    </div>
                </div>

                <div className="bg-gray-900 dark:bg-gray-900 rounded-xl ">
                    <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md flex flex-col gap-4">
                        <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">Contact Us</h2>
                        <p className="mb-8 lg:mb-16 font-light text-center text-gray-200 dark:text-gray-400 sm:text-xl">Intrested to Buy one, Just drop us a inquiry and we will eagerly help you </p>

                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your Mobile (with country code)</label>
                            <input
                                disabled={processing}
                                value={formData.mobile}
                                type="number"
                                id="mobile"
                                className="shadow-sm bg-gray-50 border rounded-md border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                                placeholder="Mobile numbe with country code"
                                onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                            />
                        </div>

                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your email</label>
                            <input
                                disabled={processing}
                                type="email"
                                id="email"
                                value={formData.email}
                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                                placeholder="name@flowbite.com"
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>

                        <div className="sm:col-span-2" >
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Your message</label>
                            <textarea
                                disabled={processing}
                                value={formData.message}
                                id="message" rows="6"
                                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="Leave a inquiry..."
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            />

                        </div>

                        <Button onClick={() => { handleFormSubmit() }} disabled={processing} variant='primary' className='border rounded text-gray-200' >
                            {processing && <Loader className='h-4 w-4 mt-0.5 mr-2 animate-spin' />}
                            Submit Inquiry
                        </Button>

                    </div>
                </div>
            </div>


        </div>
    )
}

'use client'
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

export default function OfferModal({ offer }) {
    const [loading, setLoading] = useState(true)
    const [open, setOpen] = useState(true)
    const openref = useRef(null)

    const title = offer?.title
    const info = offer?.info
    const image = offer?.image?.fields?.file?.url

    console.log(image)

    useEffect(() => {
        console.log('load modal')
        setLoading(false)
    }, [])


    if (loading) {
        return null
    }

    return (
        <Dialog open={open} onOpenChange={() => { setOpen(false) }}>
            {/* <DialogTrigger asChild>
                <Button variant="outline">Edit Profile</Button>
            </DialogTrigger> */}
            <DialogContent className=" bg-white rounded flex flex-col items-center justify-center" style={{ borderRadius: 20 }}>
                <div className='text-orange-600 font-extrabold text-center text-3xl' >
                    {title}
                </div>

                <div>
                    <img src={image} alt="" height={200} width={200} />
                </div>

                <div className='text-orange-600 font-extrabold text-center text-3xl' >
                    {info}
                </div>

            </DialogContent>
        </Dialog>
    )
}

'use client'
import { Check } from 'lucide-react'
import React, { useState } from 'react'


export default function ColorPallete({ colorCode, lcolors }) {
    const [selectedColor, setSelectedColor] = useState('')
    return (

        <>
            {
                lcolors?.map((color, index) => {

                    return (
                        <div key={index}
                            className={`p-6 rounded-full cursor-pointer bg-[${color.fields.code}] border flex items-center justify-center`}
                            style={{ backgroundColor: color.fields.code }}
                            onClick={() => { setSelectedColor(color.fields.code) }}
                        >
                            {selectedColor === color.fields.code && <Check size={14} />}
                        </div>

                    )
                })
            }
        </>
    )
}

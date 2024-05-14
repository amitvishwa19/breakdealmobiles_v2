'use client'
import { Check } from 'lucide-react'
import React, { useState } from 'react'


export default function ColorPallete({ colorCode, lcolors, selectedColor, setSelectedColor }) {
    //const [selectedColor, setSelectedColor] = useState('')
    return (

        <>
            {
                lcolors?.map((color, index) => {
                    console.log(selectedColor?.code)
                    return (
                        <div key={index}
                            className={`p-6 rounded-full cursor-pointer bg-[${color.fields.code}] border border-slate-400 flex items-center justify-center`}
                            style={{ backgroundColor: color.fields.code }}
                            onClick={() => { setSelectedColor(color.fields) }}
                        >
                            {selectedColor?.code === color.fields.code && <Check size={14} />}
                        </div>

                    )
                })
            }
        </>
    )
}

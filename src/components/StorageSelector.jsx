'use client'
import { Check } from 'lucide-react'
import React, { useState } from 'react'


export default function StorageSelector({ storage }) {
    const [selectedStorage, setSelectedStorage] = useState('')
    return (
        // <div className={`p-6 rounded-full cursor-pointer bg-[${colorCode}] border`} style={{ backgroundColor: colorCode }} onClick={() => { setSelectedColor(colorCode) }}>
        //     {
        //         selectedColor === colorCode && <Check size={14} className='text-red-800' />
        //     }

        // </div>
        <>
            {
                storage?.map((ram, index) => {
                    return (
                        <div
                            key={index}
                            className={`p-6 font-semibold cursor-pointer border`}
                            style={{ borderWidth: 2, borderColor: ram.fields.storage === selectedStorage ? 'green' : '' }}
                            onClick={() => { setSelectedStorage(ram.fields.storage) }}
                        >
                            {ram.fields.storage}
                        </div>
                    )
                })
            }
        </>
    )
}




// storage.map((storage, index) => {
//     return (
//         <div key={index} className={`p-6 font-semibold cursor-pointer border`} style={{ borderWidth: 2, borderColor: 'green' }}>
//             {storage.fields.storage}
//         </div>
//     )
// })
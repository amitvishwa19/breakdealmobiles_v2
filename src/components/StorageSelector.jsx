'use client'
import { Check } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'


export default function StorageSelector({ storage, data, subvariant, avaliableStorage, setAvaliableStorage }) {
    const [selectedStorage, setSelectedStorage] = useState('')
    const [avaliable, setavaliable] = useState(false)

    const storageArray = storage?.map((i) => i.fields)

    const handleOnSelect = (value) => {
        setSelectedStorage(value)
    }
    return (

        <>
            {
                storage?.map((ram, index) => {

                    const avaliable = subvariant?.some((i => i.storage2 === ram.fields.storage))
                    //console.log(ram.fields)
                    //console.log(subvariant)

                    // if (avaliable) {
                    //     //setAvaliableStorage([...avaliableStorage, { storage: ram?.fields?.storage }])
                    //     //setavaliable(true)
                    //     //console.log(avaliable)
                    //     return (
                    //         <Button
                    //             role='button'
                    //             disabled
                    //             key={index}
                    //             className={`p-6 font-semibold cursor-pointer border`}
                    //             style={{ borderWidth: 2, borderColor: ram.fields.storage === selectedStorage ? 'green' : '' }}
                    //             onClick={() => { handleOnSelect(ram.fields.storage) }}
                    //         >
                    //             {ram.fields.storage}
                    //         </Button>
                    //     )
                    // } else {
                    //     return 'NOt Avaliable'
                    // }

                    if (avaliable) {
                        //setAvaliableStorage([...avaliableStorage, { storage: ram?.fields?.storage }])
                    }


                    return (
                        <Button
                            role='button'
                            disabled={!avaliable}
                            key={index}
                            className={`p-6 font-semibold cursor-pointer border`}
                            style={{ borderWidth: 2, borderColor: ram.fields.storage === selectedStorage ? 'green' : '' }}
                            onClick={() => { handleOnSelect(ram.fields.storage) }}
                        >
                            {ram?.fields?.storage}
                        </Button>
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
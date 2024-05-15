'use client'
import { Check } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'


export default function StorageSelector({ storage, data, subvariant, avaliableStorage, setAvaliableStorage, setSelectedPrice, setStorage }) {
    const [selectedStorage, setSelectedStorage] = useState('')
    const [avaliable, setavaliable] = useState(false)

    const storageArray = storage?.map((i) => i.fields)

    const handleOnSelect = (value) => {
        setSelectedStorage(value.storage)
        setStorage(value.storage)
    }



    useEffect(() => {
        if (subvariant?.length > 0) {
            //console.log('subvariant[0]?.storag', subvariant[0])
            setSelectedStorage(subvariant[0]?.storage2)
            setStorage(subvariant[0]?.storage2)
            setSelectedPrice({ orignal: subvariant[0]?.orignalPrice, offer: subvariant[0]?.price })
        }
        //setSelectedStorage(subvariant[0]?.storage)
    }, [subvariant])



    return (

        <div className='flex gap-2 flex-wrap'>
            {
                storage?.map((ram, index) => {

                    const avaliable = subvariant?.some((i => i.storage2 === ram.fields.storage))

                    if (avaliable) {
                        //setAvaliableStorage([...avaliableStorage, { storage: ram?.fields?.storage }])
                    }

                    //console.log('ram.fields.storage', ram)
                    return (
                        <Button
                            role='button'
                            disabled={!avaliable}
                            key={index}
                            className={`p-2 md:p-6 font-semibold cursor-pointer border`}
                            style={{ borderWidth: 2, borderColor: ram.fields.storage === selectedStorage ? 'green' : '' }}
                            onClick={() => { handleOnSelect(ram.fields) }}
                        >
                            {ram?.fields?.storage}
                        </Button>
                    )
                })
            }
        </div>
    )
}




// storage.map((storage, index) => {
//     return (
//         <div key={index} className={`p-6 font-semibold cursor-pointer border`} style={{ borderWidth: 2, borderColor: 'green' }}>
//             {storage.fields.storage}
//         </div>
//     )
// })
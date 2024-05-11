'use client'
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";



export default function Home() {
  const [products, setProducts] = useState([])



  useEffect(() => {
    product_res()

  }, [])

  const product_res = async () => {
    await axios('/api/v1/product')
      .then((res) => {
        setProducts(res?.data?.data)
      })
  }

  return (
    <main className='bg-red-400'>

      This is page
    </main>
  );
}

'use client'
import AppBanner from "@/components/AppBanner";
import UspInfo from "@/components/UspInfo";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles, { layout } from "@/app/style";
import Business from "@/components/Business";
import Billing from "@/components/Billing";
import CardDeal from "@/components/CardDeal";
import Testimonials from "@/components/Testimonials";
import Clients from "@/components/Clients";
import CTA from "@/components/CTA";
import AllProducts from "@/components/AllProducts";


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
    <div className=''>
      <AppBanner products={products} />

      <div className="mt-10 mb-20">
        <UspInfo />
      </div>

      <div className={` ${styles.paddingX} ${styles.flexCenter}`}>
        <div >

          {/* <AllProdCarousel /> */}



          <AllProducts />

          <Business />
          <Billing />
          <CardDeal />
          <Testimonials />
          <Clients />
          <CTA />


        </div>
      </div>


    </div>
  );
}

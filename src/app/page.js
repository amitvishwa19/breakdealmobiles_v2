'use client'
import AppBanner from "@/components/AppBanner";
import UspInfo from "@/components/UspInfo";
import styles, { layout } from "@/app/style";
import Business from "@/components/Business";
import Billing from "@/components/Billing";
import CardDeal from "@/components/CardDeal";
import Testimonials from "@/components/Testimonials";
import Clients from "@/components/Clients";
import CTA from "@/components/CTA";
import AllProducts from "@/components/AllProducts";
import OfferModal from "@/components/OfferModal";
import { useGoogleOneTapLogin } from 'react-google-one-tap-login';
import { useEffect, useState } from "react";
import AppGoogleLogin from "@/components/AppGoogleLogin";
//import { useGoogleOneTapLogin } from '@react-oauth/google';


export default function Home() {
  const [showGoogle, setShowGoogle] = useState(false)

  useEffect(() => {

    const auth = localStorage.getItem('auth')
    if (!auth) {
      setShowGoogle(true)
    }
  }, [])



  return (
    <div className=''>

      {
        showGoogle && <AppGoogleLogin />
      }


      {/* <OfferModal /> */}

      <AppBanner />

      <div className="mt-10 mb-20">
        <UspInfo />
      </div>

      <div className={` ${styles.paddingX} ${styles.flexCenter}`}>
        <div >

          {/* <AllProdCarousel /> */}

          {/* grid sm:grid-cols-2 md:grid-cols-4 gap-4 p-2 */}

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

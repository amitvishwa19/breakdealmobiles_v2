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


export default function Home() {


  return (
    <div className=''>

      {/* <OfferModal /> */}

      <AppBanner />

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

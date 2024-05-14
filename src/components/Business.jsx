'use client'

import Link from "next/link";
import { features } from "@/constants";

import Button from "./Button";
import styles, { layout } from "@/app/style";





const Business = () => (
  <section id="features" className={`${layout.section} p-4`}>
    <div className={layout.sectionInfo}>
      <h2 className={styles.heading2}>

        Trusted by 10 K + Happy Users and, <br className="sm:block hidden" /> Major Brands since 2015.
      </h2>
      <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
        Purana phone use karke ho gaye ho pareshan? Exchange offer ke liye idhar udhar mat jao. Check BreakdealsMobile and get the best price for your old phone
      </p>


      <Link href={'/product'}><Button styles={`mt-10 text-slate-800 font-bold`} /></Link>
    </div>

    <div className={`${layout.sectionImg} flex-col`}>
      {features.map((feature, index) => (
        <FeatureCard key={feature.id} {...feature} index={index} />
      ))}
    </div>
  </section>
);

const FeatureCard = ({ icon, title, content, index }) => (
  <div className={`flex flex-row p-6 rounded-[20px] ${index !== features.length - 1 ? "mb-6" : "mb-0"} feature-card`}>
    <div className={`w-[64px] h-[64px] rounded-full ${styles.flexCenter} bg-dimBlue`}>
      <img src={icon.src} alt="star" className="w-[50%] h-[50%] object-contain" />
    </div>
    <div className="flex-1 flex flex-col ml-3">
      <h4 className="font-poppins font-semibold text-[18px] leading-[23.4px] mb-1">
        {title}
      </h4>
      <p className="font-poppins font-normal  text-[16px] leading-[24px]">
        {content}
      </p>
    </div>
  </div>
);

export default Business;

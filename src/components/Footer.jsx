'use client'
import styles, { layout } from "@/app/style";
import { logo, logo_dark, logo_light } from "@/assets";
import { footerLinks, socialMedia } from "@/constants";
import Address from "./Address";
import SocialLinks from "./SocialLinks";

const Footer = () => (
  <div className={` ${styles.paddingX} ${styles.flexCenter} `}>
    <div className={`${styles.boxWidth}`}>
      <section className={`${styles.flexCenter} ${styles.paddingY} flex-col`}>
        <div className={`${styles.flexStart} md:flex-row flex-col mb-8 w-full`}>
          <div className="md:flex-[1] flex flex-col justify-center md:justify-start mr-10 items-center">
            <img
              src={logo_light.src}
              alt="breakdealmobiles"
              className="w-[266px] h-[72.14px] object-contain"
            />
            <Address />
            {/* <SocialLinks /> */}
          </div>

          <div className="flex-[1.5] w-full flex flex-row justify-between flex-wrap md:mt-0 mt-10">
            {footerLinks.map((footerlink) => (
              <div key={footerlink.title} className={`flex flex-col ss:my-0 my-4 min-w-[150px]`}>
                <h4 className="font-poppins font-bold text-[18px] leading-[27px] text-slate-700 ">
                  {footerlink.title}
                </h4>
                <ul className="list-none mt-4">
                  {footerlink.links.map((link, index) => (
                    <li
                      key={link.name}
                      className={`font-poppins text-slate-500  text-[16px] leading-[24px] font-semibold hover:text-secondary cursor-pointer ${index !== footerlink.links.length - 1 ? "mb-4" : "mb-0"
                        }`}
                    >
                      {link.name}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full flex justify-between items-center md:flex-row flex-col pt-6 border-t-[1px] border-t-[#3F3E45]">
          <p className="font-poppins font-semibold text-center text-[18px] leading-[27px] text-slate-800 text-sm">
            Copyright Ⓒ 2022 BreakdealMobiles. All Rights Reserved.
          </p>

          <div className="flex flex-row md:mt-0 mt-6">

            {/* {socialMedia.map((social, index) => (
              <img
                key={social.id}
                src={social.icon.src}
                alt={social.id}
                className={`w-[21px] h-[21px] object-contain cursor-pointer ${index !== socialMedia.length - 1 ? "mr-6" : "mr-0"
                  }`}
                onClick={() => window.open(social.link)}
              />
            ))} */}
            <SocialLinks />
          </div>
        </div>
      </section>
    </div>
  </div>
);

export default Footer;

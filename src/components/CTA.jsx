
import styles from "@/app/style";
import Button from "./Button";
import Link from "next/link";

const CTA = () => (
  <section className={`${styles.flexCenter} ${styles.marginY} ${styles.padding} sm:flex-row flex-col bg-black-gradient-2 rounded-[20px] box-shadow`}>
    <div className="flex-1 flex flex-col">
      <h2 className='font-poppins font-semibold xs:text-[48px] text-[40px] text-gray-200 xs:leading-[76.8px] leading-[66.8px] w-full'>Let’s try BreakdealMobiles now!</h2>

      <p className={`font-poppins font-semibold text-gray-400 text-[18px] leading-[30.8px] max-w-[470px] mt-5`}>
        Everything you need to have Genuine refubrished mobiles.
      </p>
    </div>



    <Link href={'/product'}>
      <div className={`${styles.flexCenter} sm:ml-10 ml-0 sm:mt-0 mt-10`}>
        <Button />
      </div>
    </Link>
  </section>
);

export default CTA;

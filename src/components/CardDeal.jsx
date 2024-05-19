
import { card, ph_3 } from "../assets";
import styles, { layout } from "@/app/style";
import Button from "./Button";
import Link from "next/link";

const CardDeal = () => (
  <section className={`${layout.section} p-4`}>
    <div className={layout.sectionInfo}>
      <h2 className={styles.heading2}>
        Find a better Mobile deal <br className="sm:block hidden" /> with BreakdealsMobile.
      </h2>
      <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
        With BreakdealsMoble you can trust on Quality and Genuine product
      </p>


      <Link href={'/product'}><Button styles={`mt-10 text-slate-800 font-bold`} /></Link>
    </div>

    <div className={layout.sectionImg}>
      <img src={ph_3.src} alt="billing" className="w-[400px] h-[400px]" />
    </div>
  </section>
);

export default CardDeal;

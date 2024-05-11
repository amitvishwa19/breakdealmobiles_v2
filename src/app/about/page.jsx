
import React from 'react'
import styles, { layout } from "@/app/style";
import CardDeal from '@/components/CardDeal';
import CTA from '@/components/CTA';

export default function AboutPage() {



    return (
        <div className="bg-primary w-full overflow-hidden min-h-screen">


            <div className='p-8'>
                <div className={`bg-primary ${styles.flexStart}`}>
                    <div className={`${styles.boxWidth}`}>
                        <CardDeal />
                        <CTA />
                    </div>
                </div>

                <div>

                </div>
            </div>


        </div>
    )
}

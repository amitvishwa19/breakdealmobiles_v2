import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "sonner";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "BreakdealMobiles",
  description: "Refubrished mobile phones in affordable price",
};



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>

        <div className="flex flex-col min-h-screen overflow-hidden">
          <div>
            <Navbar />
          </div>
          <div className="flex-1 ">
            {children}
          </div>
          <div>
            <Footer />
          </div>
          <Toaster />
        </div>
      </body>
    </html>
  );
}

import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "BreakdealMobiles",
  description: "Refubrished mobile phones in affordable price",
};



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>

        <div className="flex flex-col min-h-screen">
          <div>
            <Navbar />
          </div>
          <div className="flex-1 bg-red-200">
            {children}
          </div>
          <div>
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}

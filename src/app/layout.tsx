import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

import "./globals.css";

import Image from "next/image";
import Link from "next/link";

const archivo = Archivo({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Gamer Shop",
  description: "Frontend development test for Apply Digital",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const HeaderLogo = (
    <Link href="/">
      <Image
        width="0"
        height="0"
        sizes="100vw"
        className="w-full h-auto"
        alt="gamer shop"
        src={"gamer-shop.svg"}
        title="Gamer shop logo"
      />
    </Link>
  );

  const FooterLogo = (
    <Link href="/">
      <Image
        width="0"
        height="0"
        sizes="100vw"
        className="w-full h-auto"
        alt="apply digital"
        src={"apply-digital.svg"}
        title="apply digital logo"
      />
    </Link>
  );

  const CartIcon = (
    <Link title="cart" href="/cart">
      <ShoppingCartIcon className="h-6 w-6 text-icon-active" />
    </Link>
  );

  return (
    <html lang="en">
      <body className={archivo.className}>
        <Header logo={HeaderLogo} navItems={[CartIcon]} />
        {children}
        <Footer>{FooterLogo}</Footer>
      </body>
    </html>
  );
}

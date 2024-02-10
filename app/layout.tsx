import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/components/layout/Nav";
import CategoriesList from "@/components/CategoriesList";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Nav />
        <div className="mx-72 my-14 grid grid-cols-7 gap-16">
          <div className="col-span-5">{children}</div>
          <CategoriesList />
        </div>
      </body>
    </html>
  );
}

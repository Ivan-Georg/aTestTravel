import type { Metadata } from "next";
import "./globals.css";
import Header from "../components/layout/Header/Header";
import Footer from "../components/layout/Footer/Footer";
import React from "react";


export const metadata: Metadata = {
  title: "Travelplanner",
  description: "Plan your next trip with Travelplanner",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en">
          <body className="flex flex-col min-h-screen mx-auto p-2 sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg font-indie-flower">
              <Header/>
              <main className="flex justify-center items-center w-full">
                  {children}
              </main>
              <Footer/>
          </body>
      </html>
  );
}

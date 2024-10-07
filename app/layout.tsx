import type { Metadata } from "next";
import { manrope } from "./fonts";
import "./globals.css";
export const metadata: Metadata = {
  title: "Druk 3d - zamówienia",
  description: "Twoje zamówienia",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${manrope.className} bg-greenDark text-white`}>
        {children}
      </body>
    </html>
  );
}

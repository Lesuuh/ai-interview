import type { Metadata } from "next";
import { Mona_sans} from "next/font/google";
import "./globals.css";

const monaSans = Mona_sans({
  variable: "--font-mona-sans",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "PrepWise",
  description: "Ai powered platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${monaSans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

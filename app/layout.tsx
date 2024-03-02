import type { Metadata } from "next";
import "./globals.css";
import { poppins } from "./ui/fonts";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: {
    template: "%s | Coinly",
    default: "Coinly | The best money manager"
  },
  description: "The best money manager",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Toaster position="bottom-left" />
        {children}
      </body>
    </html>
  );
}

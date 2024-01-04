import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/navbar/Navbar";
import RegisterModal from "@/components/modals/RegisterModal";
import { Toaster } from "@/components/ui/toaster";
import LoginModal from "@/components/modals/LoginModal";
import { getCurrentUser } from "./actions/getCurrentUser";
import RentModal from "@/components/modals/RentModal";
import SearchModal from "@/components/modals/SearchModal";
import ResetModal from "@/components/modals/ResetModal";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Homie",
  description: "",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <RegisterModal />
        <LoginModal />
        <RentModal />
        <SearchModal />
        <ResetModal />
        <Navbar currentUser={currentUser} />
        <div className="pb-20 pt-28">{children}</div>
        <Toaster />
      </body>
    </html>
  );
}

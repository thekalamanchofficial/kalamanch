import "~/styles/globals.css";
import Provider from "./_components/Provider";
import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Metadata } from "next";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kalamanach",
  description: "A Platform for Writers and Poets",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${inter.className}`}>
        <body className="h-screen w-full">
          <ToastContainer
            position="top-right"
            autoClose={2500}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
          <Provider>{children}</Provider>
        </body>
      </html>
    </ClerkProvider>
  );
}

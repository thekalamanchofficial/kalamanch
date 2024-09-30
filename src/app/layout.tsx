import "~/styles/globals.css";
import Provider from "./_components/Provider";
import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${inter.className}`}>
        <body className="h-screen w-full">
          <Provider>{children}</Provider>
        </body>
      </html>
    </ClerkProvider>
  );
}

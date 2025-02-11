import "~/styles/globals.css";
import { ToastContainer } from "react-toastify";
import { ClerkProvider } from "@clerk/nextjs";
import { TRPCProvider } from "./_trpc/client";
import "react-toastify/dist/ReactToastify.css";
import { type Metadata } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import { UserProvider } from "~/context/userContext";
import theme from "../theme";
import Analytics from "./_components/analytics/Analytics";

export const metadata: Metadata = {
  title: "Kalamanach",
  description: "A platform for artists",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider signInForceRedirectUrl="/" signUpForceRedirectUrl="/">
      <html lang="en">
        <body>
          <AppRouterCacheProvider options={{ key: "css" }}>
            <ThemeProvider theme={theme}>
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
              <TRPCProvider>
                <UserProvider>
                  <Analytics />
                  {children}
                </UserProvider>
              </TRPCProvider>
            </ThemeProvider>
          </AppRouterCacheProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}

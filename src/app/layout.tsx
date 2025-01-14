import "~/styles/globals.css";
import Provider from "./_components/Provider";
import { ClerkProvider } from "@clerk/nextjs";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { type Metadata } from "next";
import { ThemeProvider } from "@mui/material/styles";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import theme from "../theme";
import { UserProvider } from "~/context/userContext";

export const metadata: Metadata = {
  title: "Kalamanach",
  description: "A platform for artists",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
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
              <Provider>
                <UserProvider>
                  {children}
                </UserProvider>
              </Provider>
            
            </ThemeProvider>
          </AppRouterCacheProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}

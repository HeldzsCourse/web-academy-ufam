"use client";

import BootstrapClient from "./components/BootstrapClient/BootstrapClient";
import Navbar from "./components/Navbar/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import { ReactQueryClientProvider } from "./components/ReactQueryClient/ReactQueryClient";
import { ToastContainer } from "react-toastify";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  return (
    <html lang="pt-br">
      <body>
        <ReactQueryClientProvider>
          {pathname === "/login" || pathname === "/cadastro" ? null : (
            <Navbar />
          )}
          {children}
          <BootstrapClient />
          <ToastContainer />
        </ReactQueryClientProvider>
      </body>
    </html>
  );
}

"use client";

import "bootstrap/dist/css/bootstrap.min.css";
import BootstrapClient from "./components/BootstrapClient";
import Navbar from "./components/Navbar/Navbar";
import FavoritosProvider from "./state/FavoritosProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body>
        <FavoritosProvider>
          <Navbar />
          {children}
          <BootstrapClient />
        </FavoritosProvider>
      </body>
    </html>
  );
}

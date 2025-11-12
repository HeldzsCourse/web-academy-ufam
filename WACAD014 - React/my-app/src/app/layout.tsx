import BootstrapClient from "./components/BootstrapClient/BootstrapClient";
import Navbar from "./components/Navbar/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import { ReactQueryClientProvider } from "./components/ReactQueryClient/ReactQueryClient";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body>
        <ReactQueryClientProvider>
          <Navbar />
          {children}
          <BootstrapClient />
        </ReactQueryClientProvider>
      </body>
    </html>
  );
}

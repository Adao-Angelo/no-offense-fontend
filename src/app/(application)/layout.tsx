import type { Metadata } from "next";
import Header from "@/components/Header";
import { EdgeStoreProvider } from "@/lib/edgestore";

export const metadata: Metadata = {
  title: "NoOffense | Authenticated",
  description:
    "This project consists of a web application designed to identify and censor offensive words or phrases in comments on publications.",
};

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <EdgeStoreProvider>
          <Header />
          {children}
        </EdgeStoreProvider>
      </body>
    </html>
  );
}

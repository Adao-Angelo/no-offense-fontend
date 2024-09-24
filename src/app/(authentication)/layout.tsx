import type { Metadata } from "next";
import { ThemeProvider } from "../providers/ThemeProvider";

export const metadata: Metadata = {
  title: "NoOffense | Authentication",
  description:
    "This project consists of a web application designed to identify and censor offensive words or phrases in comments on publications.",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

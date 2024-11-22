import type { Metadata } from "next";
import { RiskProvider } from "./admin/riskContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "Demo",
  description: "Map Demo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <RiskProvider>
        <body className={`h-screen w-screen`}>{children}</body>
      </RiskProvider>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Love NEET — Premium NTA NEET Test Series & Medical Question Engine",
  description:
    "Production-grade NEET test platform featuring AI-powered PDF extraction, authentic NTA test simulator, real-time negative marking, and in-depth clinical explanations for future doctors."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
          {children}
        </div>
      </body>
    </html>
  );
}

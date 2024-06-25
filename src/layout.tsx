import { SiteHeader } from "./components/site-header";
import { SiteFooter } from "./components/site-footer";
import React from "react";

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <div>
      <SiteHeader />
      <main>
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold">{children}</h1>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

import React from 'react';

import { AppProviders } from '../layouts/AppProviders';

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  return (
    <html>
      <body className="min-h-screen antialiased font-sans">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}

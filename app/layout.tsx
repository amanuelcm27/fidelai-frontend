import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/context/theme-context";
import { AuthProvider } from "@/context/auth-context";
import { RoleProvider } from "@/context/role-context";
import { NotificationProvider } from "@/context/notification-context";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "FidelAI – Amharic AI Data Marketplace",
  description:
    "AI-powered crowdsourcing platform for Amharic dataset collection, annotation, quality control, and selling.",
  keywords: [
    "Amharic",
    "AI",
    "dataset",
    "marketplace",
    "annotation",
    "NLP",
    "crowdsourcing",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen antialiased">
        <ThemeProvider>
          <AuthProvider>
            <RoleProvider>
              <NotificationProvider>
                {children}
                <Toaster richColors position="top-right" />
              </NotificationProvider>
            </RoleProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

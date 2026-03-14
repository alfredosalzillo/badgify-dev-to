import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import theme from "./theme";
import Footer from "../components/Footer";
import { Box } from "@mui/material";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Dev.to Badgify - Dynamic Profile Badges",
  description:
    "Create dynamic profile badges for your Dev.to account to show off your posts, followers, and profile details in your GitHub README or website.",
  keywords: [
    "Dev.to",
    "badges",
    "developer",
    "profile",
    "github-readme",
    "markdown-badges",
  ],
  authors: [{ name: "Badgify" }],
  openGraph: {
    title: "Dev.to Badgify - Dynamic Profile Badges",
    description: "Generate beautiful, dynamic badges for your Dev.to profile.",
    type: "website",
    siteName: "Dev.to Badgify",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dev.to Badgify - Dynamic Profile Badges",
    description: "Generate beautiful, dynamic badges for your Dev.to profile.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
              }}
            >
              <Box component="main" sx={{ flexGrow: 1 }}>
                {children}
              </Box>
              <Footer />
            </Box>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}

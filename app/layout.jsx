import Header from "@/components/Header";
import PremiumTransition from "@/components/PremiumTransition";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const JetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-JetBrainsMono",
});

export const metadata = {
  title: "Shah Alam",
  description: "This is shah alam's portfolio ",
  icons: {
    icon: '/assets/photo.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={JetBrainsMono.className}>
        <Header />
        <PremiumTransition>{children}</PremiumTransition>
      </body>
    </html>
  );
}

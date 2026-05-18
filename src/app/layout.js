import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Mini Lead Distribution System",
  description: "Full Stack Internship Assignment",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
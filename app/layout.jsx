import "../styles/globals.css";
import Navbar from "../components/Navbar";

export const metadata = {
  title: "Store",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="container mx-auto p-4">{children}</main>
      </body>
    </html>
  );
}

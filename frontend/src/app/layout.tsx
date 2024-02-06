"use client";
import Navbar from "./components/Navbar";
import "./globals.css";
import CustomProvider from "../redux/Provider";
import Form from "./sign-in/page";
interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <CustomProvider>
          <Navbar />
          {children}
        </CustomProvider>
      </body>
    </html>
  );
};

export default RootLayout;

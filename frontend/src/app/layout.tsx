// RootLayout.tsx

import './globals.css';
import CustomProvider from '../redux/Provider';
import { Inter } from 'next/font/google'
interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <body >
        <CustomProvider>
         
          {children}
        </CustomProvider>
      </body>
    </html>
  );
};

export default RootLayout;

import { AppBar, Button, Container, Toolbar, Typography } from '@mui/material';
import { Geist, Geist_Mono } from "next/font/google";
import Link from 'next/link';
import ThemeRegistry from './ThemeRegistry';
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: '다움청년부 토크 질문',
  description: '토크를 위한 질문 뽑기',
  openGraph: {
    title: '다움청년부 토크 질문',
    description: '토크를 위한 질문 뽑기',
    // You can add an image URL here if you have one
    // images: ['https://example.com/og-image.png'], 
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ThemeRegistry>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                다움청년부 토크질문 뽑기
              </Typography>
              <Button color="inherit" component={Link} href="/">질문 뽑기</Button>
              <Button color="inherit" component={Link} href="/edit">질문 편집</Button>
            </Toolbar>
          </AppBar>
          <Container component="main" sx={{ mt: 4, mb: 4 }}>
            {children}
          </Container>
        </ThemeRegistry>
      </body>
    </html>
  );
}

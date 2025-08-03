'use client'

import { AppBar, Button, Container, CssBaseline, ThemeProvider, Toolbar, Typography, createTheme } from '@mui/material'
import { Geist, Geist_Mono } from "next/font/google";
import Link from 'next/link';
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
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
        </ThemeProvider>
      </body>
    </html>
  );
}
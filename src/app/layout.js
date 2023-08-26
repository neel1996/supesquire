import { Inter } from 'next/font/google';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Just a doc QA bot!',
  description: 'App to chat with docs'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script
          type="text/javascript"
          id="MathJax-script"
          async
          src="https://oeyeaxgpzmvdexggplem.supabase.co/storage/v1/object/public/mathjax-cdn/cdn.jsdelivr.net_npm_mathjax@3.0.0_es5_tex-chtml.js"
        ></script>
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}

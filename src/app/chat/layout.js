import { Inter } from 'next/font/google';
import { Suspense } from 'react';

import Loading from '../loading';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Chat with your docs',
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
          src="https://cdn.jsdelivr.net/npm/mathjax@3.2.1/es5/tex-mml-chtml.js"
        ></script>
      </head>
      <body className={inter.className}>
        <div>
          <Suspense fallback={<Loading />}>{children}</Suspense>
        </div>
      </body>
    </html>
  );
}

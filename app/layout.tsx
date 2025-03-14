import type { Metadata } from 'next';
import '@/styles/global.scss';

export const metadata: Metadata = {
  title: '都道府県別の総人口推移グラフ',
  description: 'ゆめみフロントエンドコーディング試験',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

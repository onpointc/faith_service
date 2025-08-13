import Header from '@/components/Header';
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900"><div id="__app"><header></header>{children}<Header />{children}</div></body>
    </html>
  );
}

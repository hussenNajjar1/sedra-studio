import "./globals.css";
export const metadata = {
  title: "استديو سدرة - الصفحة الرئيسية",
  description: "استديو سدرة هو المكان المثالي لابتكار وتجربة الأفكار المبدعة في عالم التصميم والجرافيك.",
  keywords: "تصميم، جرافيك، استديو، أفكار إبداعية",
  openGraph: {
    title: "استديو سدرة - الصفحة الرئيسية",
    description: "تصفح أفضل الأعمال الفنية والإبداعية في استديو سدرة.",
    images: ["https://www.sedra-studio.com/images/og-image.jpg"],
    url: "https://www.sedra-studio.com",
  },

  icons: {
    icon: "/images/png/img4.png",
  },
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body >{children}</body>
    </html>
  );
}

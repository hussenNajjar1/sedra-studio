
export default function Head({ title }) {
  const metadata = generateMetadata(title);
  return (
    <>
      <title>{metadata.title}</title>
      <meta name="description" content={metadata.description} />
      <meta name="keywords" content={metadata.keywords} />
      <meta property="og:title" content={metadata.openGraph.title} />
      <meta property="og:description" content={metadata.openGraph.description} />
      <meta property="og:image" content={metadata.openGraph.images[0]} />
      <link rel="icon" href={metadata.icons.icon} />
    </>
  );
}
export const generateMetadata = (title) => ({
  title: title || "استديو سدرة - لوحة التحكم",
  description: "استديو سدرة هو المكان المثالي لابتكار وتجربة الأفكار المبدعة في عالم التصميم والجرافيك.",
  keywords: "تصميم، جرافيك، استديو، أفكار إبداعية",
  openGraph: {
    title: title || "استديو سدرة - لوحة التحكم",
    description: "تصفح أفضل الأعمال الفنية والإبداعية في استديو سدرة.",
    images: ["https://www.sedra-studio.com/images/og-image.jpg"],
    url: "https://www.sedra-studio.com",
  },
  icons: {
    icon: "/images/png/img4.png",
  },
});

// components/MetaHead.js
import Head from 'next/head';

const MetaHead = ({
  title = 'استديو سدرة',
  description = 'استديو سدرة هو المكان المثالي لابتكار وتجربة الأفكار المبدعة في عالم التصميم والجرافيك.',
  keywords = 'تصميم, جرافيك, استديو',
  openGraphImage = '/images/og-image.jpg',
  url = 'https://www.sedra-studio.com',
}) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={openGraphImage} />
      <meta property="og:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={openGraphImage} />
      <meta name="twitter:card" content="summary_large_image" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};

export default MetaHead;

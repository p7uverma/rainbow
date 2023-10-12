import Script from "next/script";

export default function Adsense() {
  return (
    <>
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2353171007280857"
        crossOrigin="anonymous"
      />
    </>
  );
}

'use client'

import Script from 'next/script'

export default function Instana() {
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-before-interactive-script-outside-document */}
      <Script id="instana-inline" strategy="beforeInteractive">
        {`
          (function(s,t,a,n){s[t]||(s[t]=a,n=s[a]=function(){n.q.push(arguments)},
          n.q=[],n.v=2,n.l=1*new Date)})(window,"InstanaEumObject","ineum");

          ineum('reportingUrl', '${process.env.NEXT_PUBLIC_INSTANA_REPORT_URL}');
          ineum('key', '${process.env.NEXT_PUBLIC_INSTANA_EUM_KEY}');
          ineum('trackSessions');
          ineum('autoPageDetection', true);
        `}
      </Script>

      {/* eslint-disable-next-line @next/next/no-before-interactive-script-outside-document */}
      <Script
        src="https://eum.instana.io/1.8.1/eum.min.js"
        strategy="beforeInteractive"
        crossOrigin="anonymous"
        integrity="sha384-qFzHZ5BC7HOPEBSYkbYSv+DBWrG34P1QW9mIaCR41db6yOJNYmH4antW6KLkc6v1"
      />
    </>
  )
}

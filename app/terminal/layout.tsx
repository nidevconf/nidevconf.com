/* eslint-disable @next/next/no-page-custom-font */
export default function TerminalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=VT323&display=swap"
        rel="stylesheet"
      />
      {/* Hide the standard navbar and footer for terminal mode */}
      <style>{`
        header, nav, footer[role="contentinfo"], .skip-link {
          display: none !important;
        }
        main {
          padding: 0 !important;
          margin: 0 !important;
        }
      `}</style>
      {children}
    </>
  );
}

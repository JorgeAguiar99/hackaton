import 'bootstrap/dist/css/bootstrap.min.css'
import './../styles/global.css'
import Script from 'next/script'

export const metadata = {
  title: 'BookFlow',
  description: 'Se a vida te der limões faça uma feijoada!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br">
      <body suppressHydrationWarning={true} >
        {children}
        <Script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-ENjdO4Dr2bkBIFxQpeoTz1HIcje39Wm4jDKdf19U8gI4ddQ3GYNS7NTKfAdVQSZe"
          crossOrigin="anonymous"
        />
      </body>
    </html>
  )
}
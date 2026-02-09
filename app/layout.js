export const metadata = {
  title: 'Clean Dashboard',
  description: 'Simple dashboard that works'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{
        margin: 0,
        padding: 0,
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#f3f4f6',
        minHeight: '100vh'
      }}>
        {children}
      </body>
    </html>
  )
}
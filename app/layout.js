export const metadata = {
  title: 'Interactive Dashboard',
  description: 'Fully working dashboard'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <style dangerouslySetInnerHTML={{
          __html: `
            * { box-sizing: border-box; }
            body {
              margin: 0;
              padding: 0;
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              min-height: 100vh;
              animation: backgroundShift 10s ease-in-out infinite;
            }
            @keyframes backgroundShift {
              0%, 100% { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
              50% { background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); }
            }
            .pulse {
              animation: pulse 2s ease-in-out infinite;
            }
            @keyframes pulse {
              0%, 100% { transform: scale(1); }
              50% { transform: scale(1.05); }
            }
            .button {
              background: linear-gradient(45deg, #4facfe 0%, #00f2fe 100%);
              border: none;
              padding: 12px 24px;
              border-radius: 8px;
              color: white;
              font-weight: bold;
              cursor: pointer;
              transition: all 0.3s ease;
              box-shadow: 0 4px 15px rgba(79, 172, 254, 0.3);
            }
            .button:hover {
              transform: translateY(-2px);
              box-shadow: 0 8px 25px rgba(79, 172, 254, 0.4);
            }
            .card {
              background: rgba(255, 255, 255, 0.95);
              border-radius: 20px;
              box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
              backdrop-filter: blur(10px);
            }
          `
        }} />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}
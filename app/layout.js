export const metadata = {
  title: 'Functional Team Dashboard',
  description: 'Real collaborative workspace with working functionality'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <style dangerouslySetInnerHTML={{
          __html: `
            * { box-sizing: border-box; margin: 0; padding: 0; }
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
              background: #f8fafc;
              color: #334155;
              line-height: 1.6;
            }
            .container { max-width: 1200px; margin: 0 auto; padding: 20px; }
            .header { 
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
              color: white; 
              padding: 20px 0; 
              margin-bottom: 30px;
              box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            }
            .nav { 
              display: flex; 
              justify-content: space-between; 
              align-items: center; 
              max-width: 1200px; 
              margin: 0 auto; 
              padding: 0 20px; 
            }
            .nav h1 { font-size: 1.8rem; font-weight: bold; }
            .nav-links { display: flex; gap: 20px; }
            .nav-link { 
              color: rgba(255,255,255,0.9); 
              text-decoration: none; 
              padding: 8px 16px; 
              border-radius: 6px; 
              transition: all 0.2s; 
              cursor: pointer;
              border: none;
              background: none;
              font-size: inherit;
            }
            .nav-link:hover, .nav-link.active { background: rgba(255,255,255,0.2); color: white; }
            .grid { display: grid; gap: 20px; margin-bottom: 30px; }
            .grid-2 { grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); }
            .grid-3 { grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); }
            .card { 
              background: white; 
              border-radius: 12px; 
              padding: 20px; 
              box-shadow: 0 4px 6px rgba(0,0,0,0.05); 
              border: 1px solid #e2e8f0;
              transition: all 0.2s;
            }
            .card:hover { transform: translateY(-2px); box-shadow: 0 8px 15px rgba(0,0,0,0.1); }
            .card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; }
            .card-title { font-size: 1.1rem; font-weight: 600; color: #1e293b; }
            .btn { 
              padding: 8px 16px; 
              border-radius: 6px; 
              border: none; 
              font-weight: 500; 
              cursor: pointer; 
              transition: all 0.2s; 
              text-decoration: none; 
              display: inline-block; 
              text-align: center;
              font-size: 0.9rem;
            }
            .btn-primary { background: #3b82f6; color: white; }
            .btn-primary:hover { background: #2563eb; transform: translateY(-1px); }
            .btn-success { background: #10b981; color: white; }
            .btn-success:hover { background: #059669; transform: translateY(-1px); }
            .btn-warning { background: #f59e0b; color: white; }
            .btn-warning:hover { background: #d97706; transform: translateY(-1px); }
            .btn-sm { padding: 6px 12px; font-size: 0.8rem; }
            .status { 
              padding: 4px 8px; 
              border-radius: 4px; 
              font-size: 0.75rem; 
              font-weight: 600; 
              text-transform: uppercase; 
            }
            .status-online { background: #d1fae5; color: #065f46; }
            .status-offline { background: #fecaca; color: #991b1b; }
            .team-member { 
              display: flex; 
              align-items: center; 
              gap: 12px; 
              padding: 12px; 
              border: 1px solid #e5e7eb; 
              border-radius: 8px; 
              margin-bottom: 8px;
              transition: all 0.2s;
            }
            .team-member:hover { background: #f8fafc; }
            .avatar { 
              width: 48px; 
              height: 48px; 
              border-radius: 50%; 
              background: linear-gradient(45deg, #667eea, #764ba2); 
              display: flex; 
              align-items: center; 
              justify-content: center; 
              color: white; 
              font-weight: bold; 
              font-size: 1.2rem;
            }
            .metric { text-align: center; }
            .metric-value { font-size: 2rem; font-weight: bold; color: #1e293b; }
            .metric-label { font-size: 0.875rem; color: #6b7280; }
            .task-item { 
              padding: 12px; 
              border: 1px solid #e5e7eb; 
              border-radius: 8px; 
              margin-bottom: 8px; 
              background: #fafafa;
              transition: all 0.2s;
            }
            .task-item:hover { background: #f1f5f9; transform: translateX(5px); }
            .file-item { 
              display: flex; 
              justify-content: space-between; 
              align-items: center; 
              padding: 8px 0; 
              border-bottom: 1px solid #f1f5f9;
              transition: all 0.2s;
            }
            .file-item:hover { background: #f8fafc; padding: 8px 12px; margin: 0 -12px; border-radius: 6px; }
            .loading { 
              display: inline-block; 
              width: 20px; 
              height: 20px; 
              border: 2px solid #f3f3f3; 
              border-top: 2px solid #3498db; 
              border-radius: 50%; 
              animation: spin 1s linear infinite; 
            }
            @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
            .pulse { animation: pulse 2s infinite; }
            @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
            .command-output { 
              background: #1e293b; 
              color: #e2e8f0; 
              padding: 15px; 
              border-radius: 8px; 
              font-family: 'Courier New', monospace; 
              font-size: 0.875rem; 
              white-space: pre-wrap; 
              margin-top: 10px;
              max-height: 200px;
              overflow-y: auto;
            }
            .chat-bubble { 
              background: #e0f2fe; 
              border-radius: 18px; 
              padding: 12px 16px; 
              margin: 8px 0; 
              max-width: 80%; 
            }
            .chat-bubble.agent { 
              background: #f3e8ff; 
              margin-left: auto; 
            }
            input, textarea, select { 
              width: 100%; 
              padding: 8px 12px; 
              border: 1px solid #d1d5db; 
              border-radius: 6px; 
              transition: all 0.2s; 
            }
            input:focus, textarea:focus, select:focus { 
              outline: none; 
              border-color: #3b82f6; 
              box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1); 
            }
            .flex { display: flex; }
            .items-center { align-items: center; }
            .justify-between { justify-content: space-between; }
            .space-x-2 > * + * { margin-left: 8px; }
            .space-y-2 > * + * { margin-top: 8px; }
            .text-sm { font-size: 0.875rem; }
            .font-semibold { font-weight: 600; }
            .text-gray-600 { color: #4b5563; }
            .text-green-600 { color: #059669; }
            .text-blue-600 { color: #2563eb; }
            .mb-2 { margin-bottom: 8px; }
            .mb-4 { margin-bottom: 16px; }
            .mt-4 { margin-top: 16px; }
          `
        }} />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}
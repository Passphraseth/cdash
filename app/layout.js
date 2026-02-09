export const metadata = {
  title: 'Team Dashboard - Collaborative Workspace',
  description: 'Team management, workload tracking, and collaborative tools'
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
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px 0; margin-bottom: 30px; }
            .nav { display: flex; justify-content: space-between; align-items: center; max-width: 1200px; margin: 0 auto; padding: 0 20px; }
            .nav h1 { font-size: 1.8rem; font-weight: bold; }
            .nav-links { display: flex; gap: 20px; }
            .nav-link { color: rgba(255,255,255,0.9); text-decoration: none; padding: 8px 16px; border-radius: 6px; transition: all 0.2s; }
            .nav-link:hover, .nav-link.active { background: rgba(255,255,255,0.2); color: white; }
            .grid { display: grid; gap: 20px; margin-bottom: 30px; }
            .grid-2 { grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); }
            .grid-3 { grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); }
            .card { background: white; border-radius: 12px; padding: 20px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); border: 1px solid #e2e8f0; }
            .card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; }
            .card-title { font-size: 1.1rem; font-weight: 600; color: #1e293b; }
            .btn { padding: 8px 16px; border-radius: 6px; border: none; font-weight: 500; cursor: pointer; transition: all 0.2s; text-decoration: none; display: inline-block; text-align: center; }
            .btn-primary { background: #3b82f6; color: white; }
            .btn-primary:hover { background: #2563eb; }
            .btn-success { background: #10b981; color: white; }
            .btn-success:hover { background: #059669; }
            .btn-warning { background: #f59e0b; color: white; }
            .btn-warning:hover { background: #d97706; }
            .btn-sm { padding: 4px 12px; font-size: 0.875rem; }
            .status { padding: 4px 8px; border-radius: 4px; font-size: 0.75rem; font-weight: 600; text-transform: uppercase; }
            .status-online { background: #d1fae5; color: #065f46; }
            .status-away { background: #fef3c7; color: #92400e; }
            .status-busy { background: #fecaca; color: #991b1b; }
            .progress-bar { background: #e5e7eb; border-radius: 4px; height: 8px; overflow: hidden; }
            .progress-fill { height: 100%; transition: width 0.3s ease; }
            .progress-fill.low { background: #ef4444; }
            .progress-fill.medium { background: #f59e0b; }
            .progress-fill.high { background: #10b981; }
            .task-item { padding: 12px; border: 1px solid #e5e7eb; border-radius: 8px; margin-bottom: 8px; background: #fafafa; }
            .task-item:hover { background: #f1f5f9; }
            .task-meta { display: flex; justify-content: between; align-items: center; font-size: 0.875rem; color: #6b7280; margin-top: 5px; }
            .avatar { width: 32px; height: 32px; border-radius: 50%; background: linear-gradient(45deg, #667eea, #764ba2); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; }
            .team-member { display: flex; align-items: center; gap: 12px; padding: 12px; border: 1px solid #e5e7eb; border-radius: 8px; margin-bottom: 8px; }
            .metric { text-align: center; }
            .metric-value { font-size: 2rem; font-weight: bold; color: #1e293b; }
            .metric-label { font-size: 0.875rem; color: #6b7280; }
            .tabs { display: flex; border-bottom: 1px solid #e5e7eb; margin-bottom: 20px; }
            .tab { padding: 12px 20px; border: none; background: none; cursor: pointer; border-bottom: 2px solid transparent; }
            .tab.active { border-bottom-color: #3b82f6; color: #3b82f6; font-weight: 600; }
            .file-item { display: flex; justify-content: space-between; align-items: center; padding: 8px 0; border-bottom: 1px solid #f1f5f9; }
          `
        }} />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}
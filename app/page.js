export default function HomePage() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '40px',
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
        maxWidth: '500px',
        width: '100%'
      }}>
        <h1 style={{
          fontSize: '2.5rem',
          color: '#111827',
          marginBottom: '16px',
          fontWeight: 'bold'
        }}>
          🚀 Dashboard
        </h1>
        
        <p style={{
          fontSize: '1.1rem',
          color: '#6b7280',
          marginBottom: '32px'
        }}>
          Successfully deployed to Vercel!
        </p>

        <div style={{
          backgroundColor: '#f0fdf4',
          border: '1px solid #bbf7d0',
          borderRadius: '8px',
          padding: '16px',
          marginBottom: '24px'
        }}>
          <h3 style={{
            color: '#15803d',
            margin: '0 0 8px 0',
            fontSize: '1.1rem'
          }}>
            ✅ Build Successful
          </h3>
          <p style={{
            color: '#16a34a',
            margin: 0,
            fontSize: '0.9rem'
          }}>
            No errors, ready for development
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '16px'
        }}>
          <div style={{
            backgroundColor: '#fef3c7',
            padding: '16px',
            borderRadius: '8px',
            border: '1px solid #fcd34d'
          }}>
            <h4 style={{
              color: '#92400e',
              margin: '0 0 8px 0'
            }}>
              Next Steps
            </h4>
            <p style={{
              color: '#a16207',
              fontSize: '0.85rem',
              margin: 0
            }}>
              Add features
            </p>
          </div>

          <div style={{
            backgroundColor: '#e0e7ff',
            padding: '16px',
            borderRadius: '8px',
            border: '1px solid #c7d2fe'
          }}>
            <h4 style={{
              color: '#3730a3',
              margin: '0 0 8px 0'
            }}>
              Ready
            </h4>
            <p style={{
              color: '#4f46e5',
              fontSize: '0.85rem',
              margin: 0
            }}>
              Start building
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
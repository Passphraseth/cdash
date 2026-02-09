'use client'

import { useState, useEffect } from 'react'

export default function InteractivePage() {
  const [clicks, setClicks] = useState(0)
  const [time, setTime] = useState(new Date())
  const [status, setStatus] = useState('🟢 Online')
  const [tasks, setTasks] = useState(['Dashboard deployed', 'Team ready', 'Features pending'])

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const addTask = () => {
    const newTasks = [
      'File system integration',
      'Agent workspace setup', 
      'Team collaboration tools',
      'Real-time notifications',
      'Security implementation',
      'Performance optimization'
    ]
    const randomTask = newTasks[Math.floor(Math.random() * newTasks.length)]
    setTasks(prev => [...prev, randomTask])
  }

  const toggleStatus = () => {
    setStatus(prev => prev.includes('🟢') ? '🔴 Offline' : '🟢 Online')
  }

  return (
    <div style={{
      minHeight: '100vh',
      padding: '20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div className="card" style={{
        padding: '40px',
        maxWidth: '800px',
        width: '100%',
        textAlign: 'center'
      }}>
        <div className="pulse" style={{ marginBottom: '30px' }}>
          <h1 style={{
            fontSize: '4rem',
            background: 'linear-gradient(45deg, #667eea, #764ba2)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            margin: '0 0 10px 0',
            fontWeight: 'bold'
          }}>
            🚀 Dashboard
          </h1>
          <p style={{
            fontSize: '1.2rem',
            color: '#666',
            margin: '0 0 20px 0'
          }}>
            Fully Interactive • Live on Vercel
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px',
          marginBottom: '30px'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            padding: '20px',
            borderRadius: '15px',
            textAlign: 'center'
          }}>
            <h3 style={{ margin: '0 0 10px 0' }}>Live Clock</h3>
            <p style={{ 
              margin: 0, 
              fontSize: '1.1rem',
              fontFamily: 'monospace' 
            }}>
              {time.toLocaleTimeString()}
            </p>
          </div>

          <div style={{
            background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            color: 'white',
            padding: '20px',
            borderRadius: '15px',
            textAlign: 'center'
          }}>
            <h3 style={{ margin: '0 0 10px 0' }}>Status</h3>
            <button 
              className="button"
              onClick={toggleStatus}
              style={{
                background: 'rgba(255,255,255,0.2)',
                border: '1px solid rgba(255,255,255,0.3)'
              }}
            >
              {status}
            </button>
          </div>

          <div style={{
            background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
            color: 'white',
            padding: '20px',
            borderRadius: '15px',
            textAlign: 'center'
          }}>
            <h3 style={{ margin: '0 0 10px 0' }}>Interactions</h3>
            <button 
              className="button"
              onClick={() => setClicks(clicks + 1)}
              style={{
                background: 'rgba(255,255,255,0.2)',
                border: '1px solid rgba(255,255,255,0.3)'
              }}
            >
              Clicked {clicks} times
            </button>
          </div>
        </div>

        <div style={{
          background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
          borderRadius: '15px',
          padding: '25px',
          marginBottom: '30px',
          textAlign: 'left'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '15px'
          }}>
            <h3 style={{ 
              margin: 0, 
              color: '#333',
              fontSize: '1.3rem'
            }}>
              📋 Task List
            </h3>
            <button 
              className="button" 
              onClick={addTask}
              style={{ fontSize: '0.9rem' }}
            >
              + Add Task
            </button>
          </div>
          <div style={{ maxHeight: '150px', overflowY: 'auto' }}>
            {tasks.map((task, index) => (
              <div key={index} style={{
                background: 'rgba(255,255,255,0.7)',
                padding: '10px 15px',
                borderRadius: '8px',
                marginBottom: '8px',
                color: '#333',
                fontSize: '0.95rem',
                display: 'flex',
                alignItems: 'center'
              }}>
                <span style={{ marginRight: '10px' }}>✓</span>
                {task}
              </div>
            ))}
          </div>
        </div>

        <div style={{
          display: 'flex',
          gap: '15px',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <button 
            className="button"
            onClick={() => alert('Dashboard is fully functional! 🎉')}
          >
            🎉 Test Alert
          </button>
          <button 
            className="button"
            onClick={() => window.open('https://github.com', '_blank')}
          >
            🔗 Open GitHub
          </button>
          <button 
            className="button"
            onClick={() => window.location.reload()}
          >
            🔄 Refresh Page
          </button>
        </div>

        <div style={{
          marginTop: '30px',
          padding: '20px',
          background: 'rgba(34, 197, 94, 0.1)',
          borderRadius: '10px',
          border: '2px solid rgba(34, 197, 94, 0.3)',
          fontSize: '1rem',
          color: '#059669'
        }}>
          <strong>✅ FULLY OPERATIONAL!</strong><br/>
          Dashboard is working perfectly. All features functional.<br/>
          React hooks, state management, and interactions all working!
        </div>
      </div>
    </div>
  )
}
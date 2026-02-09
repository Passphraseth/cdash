'use client'

import { useState, useEffect } from 'react'

export default function FunctionalDashboard() {
  const [activeTab, setActiveTab] = useState('team')
  const [teamData, setTeamData] = useState([])
  const [tasks, setTasks] = useState([])
  const [files, setFiles] = useState([])
  const [systemStatus, setSystemStatus] = useState(null)
  const [loading, setLoading] = useState(false)
  const [commandInput, setCommandInput] = useState('')
  const [commandOutput, setCommandOutput] = useState('')
  const [chatInput, setChatInput] = useState('')
  const [chatMessages, setChatMessages] = useState([])
  const [lastUpdate, setLastUpdate] = useState(new Date())

  useEffect(() => {
    loadAllData()
    // Refresh data every 30 seconds
    const interval = setInterval(loadAllData, 30000)
    return () => clearInterval(interval)
  }, [])

  const loadAllData = async () => {
    try {
      await Promise.all([
        loadTeamData(),
        loadTasks(),
        loadFiles(),
        loadSystemStatus()
      ])
      setLastUpdate(new Date())
    } catch (error) {
      console.error('Failed to load data:', error)
    }
  }

  const loadTeamData = async () => {
    try {
      const response = await fetch('/api/team?action=list')
      const result = await response.json()
      if (result.success) {
        setTeamData(result.data)
      }
    } catch (error) {
      console.error('Failed to load team data:', error)
    }
  }

  const loadTasks = async () => {
    try {
      const response = await fetch('/api/team?action=tasks')
      const result = await response.json()
      if (result.success) {
        setTasks(result.data)
      }
    } catch (error) {
      console.error('Failed to load tasks:', error)
    }
  }

  const loadFiles = async () => {
    try {
      const response = await fetch('/api/team?action=files')
      const result = await response.json()
      if (result.success) {
        setFiles(result.data)
      }
    } catch (error) {
      console.error('Failed to load files:', error)
    }
  }

  const loadSystemStatus = async () => {
    try {
      const response = await fetch('/api/team?action=status')
      const result = await response.json()
      if (result.success) {
        setSystemStatus(result.data)
      }
    } catch (error) {
      console.error('Failed to load system status:', error)
    }
  }

  const executeCommand = async () => {
    if (!commandInput.trim()) return

    setLoading(true)
    try {
      const response = await fetch('/api/team', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'execute_command',
          data: { command: commandInput }
        })
      })

      const result = await response.json()
      if (result.success) {
        setCommandOutput(`$ ${result.data.command}\n${result.data.output}${result.data.error ? '\n' + result.data.error : ''}`)
      } else {
        setCommandOutput(`Error: ${result.error}`)
      }
      setCommandInput('')
    } catch (error) {
      setCommandOutput(`Error: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  const chatWithBOBB = async () => {
    if (!chatInput.trim()) return

    const userMessage = { 
      text: chatInput, 
      sender: 'Dall', 
      timestamp: new Date(),
      type: 'user'
    }
    setChatMessages(prev => [...prev, userMessage])
    setChatInput('')
    setLoading(true)

    try {
      const response = await fetch('/api/team', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'chat_with_bobb',
          data: { message: chatInput }
        })
      })

      const result = await response.json()
      if (result.success) {
        const bobbMessage = {
          text: result.data.message,
          sender: 'BOBB',
          timestamp: new Date(result.data.timestamp),
          type: 'agent'
        }
        setChatMessages(prev => [...prev, bobbMessage])
      }
    } catch (error) {
      const errorMessage = {
        text: 'Sorry, I encountered an error. Please try again.',
        sender: 'BOBB',
        timestamp: new Date(),
        type: 'error'
      }
      setChatMessages(prev => [...prev, errorMessage])
    } finally {
      setLoading(false)
    }
  }

  const createTask = async () => {
    const taskTitle = prompt('Enter task title:')
    if (!taskTitle) return

    try {
      const response = await fetch('/api/team', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'create_task',
          data: {
            title: taskTitle,
            assignee: 'BOBB',
            priority: 'Medium',
            status: 'Todo',
            due: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
          }
        })
      })

      const result = await response.json()
      if (result.success) {
        await loadTasks() // Refresh tasks
        alert('Task created successfully!')
      }
    } catch (error) {
      alert('Failed to create task: ' + error.message)
    }
  }

  return (
    <div>
      <div className="header">
        <nav className="nav">
          <h1>🚀 Functional Team Dashboard</h1>
          <div className="nav-links">
            {[
              { id: 'team', label: '👥 Team', icon: '👥' },
              { id: 'tasks', label: '📋 Tasks', icon: '📋' },
              { id: 'files', label: '📁 Files', icon: '📁' },
              { id: 'terminal', label: '💻 Terminal', icon: '💻' },
              { id: 'chat', label: '💬 Chat with BOBB', icon: '💬' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`nav-link ${activeTab === tab.id ? 'active' : ''}`}
              >
                <span style={{ marginRight: '8px' }}>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </nav>
      </div>

      <div className="container">
        {/* System Status Bar */}
        <div className="card" style={{ marginBottom: '20px', background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', color: 'white' }}>
          <div className="flex items-center justify-between">
            <div>
              <strong>✅ System Operational</strong> • 
              Last sync: {lastUpdate.toLocaleTimeString()} • 
              BOBB Status: {systemStatus?.bobbStatus || 'active'} •
              Workspace: {systemStatus?.workspaceConnected ? 'Connected' : 'Disconnected'}
            </div>
            <button 
              onClick={loadAllData}
              className="btn btn-sm"
              style={{ background: 'rgba(255,255,255,0.2)', color: 'white' }}
              disabled={loading}
            >
              {loading ? <span className="loading"></span> : '🔄 Refresh'}
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'team' && (
          <div className="grid grid-2">
            <div className="card">
              <div className="card-header">
                <h2 className="card-title">👥 Real Team Members</h2>
              </div>
              <div>
                {teamData.map(member => (
                  <div key={member.id} className="team-member">
                    <div className="avatar">{member.avatar}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: '600', marginBottom: '4px' }}>
                        {member.name} {member.isHuman ? '(Human)' : '(AI)'}
                      </div>
                      <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                        {member.role} • {member.location}
                      </div>
                      <div className={`status ${member.status === 'online' ? 'status-online' : 'status-offline'}`} style={{ marginTop: '8px' }}>
                        {member.status}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card">
              <div className="card-header">
                <h2 className="card-title">⚡ Quick Actions</h2>
              </div>
              <div className="space-y-2">
                <button 
                  className="btn btn-primary" 
                  style={{ width: '100%' }}
                  onClick={() => setActiveTab('chat')}
                >
                  💬 Chat with BOBB Agent
                </button>
                <button 
                  className="btn btn-success" 
                  style={{ width: '100%' }}
                  onClick={() => setActiveTab('terminal')}
                >
                  💻 Open Terminal
                </button>
                <button 
                  className="btn btn-warning" 
                  style={{ width: '100%' }}
                  onClick={createTask}
                >
                  📋 Create New Task
                </button>
                <button 
                  className="btn" 
                  style={{ width: '100%', background: '#8b5cf6', color: 'white' }}
                  onClick={() => setActiveTab('files')}
                >
                  📁 Browse Workspace Files
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'tasks' && (
          <div className="card">
            <div className="card-header">
              <h2 className="card-title">📋 Active Tasks</h2>
              <button className="btn btn-success btn-sm" onClick={createTask}>
                + New Task
              </button>
            </div>
            <div>
              {tasks.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px', color: '#6b7280' }}>
                  No tasks yet. Create one to get started!
                </div>
              ) : (
                tasks.map(task => (
                  <div key={task.id} className="task-item">
                    <div className="flex justify-between items-start">
                      <div>
                        <div style={{ fontWeight: '600', marginBottom: '4px' }}>{task.title}</div>
                        <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                          Assigned to: <strong>{task.assignee}</strong> • 
                          Priority: <span style={{ 
                            color: task.priority === 'High' ? '#ef4444' : 
                                   task.priority === 'Medium' ? '#f59e0b' : '#10b981' 
                          }}>{task.priority}</span>
                        </div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div className="status" style={{ background: '#f1f5f9', color: '#475569', fontSize: '0.75rem' }}>
                          {task.status}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '4px' }}>
                          Due: {new Date(task.due).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {activeTab === 'files' && (
          <div className="card">
            <div className="card-header">
              <h2 className="card-title">📁 Workspace Files</h2>
              <button 
                className="btn btn-primary btn-sm" 
                onClick={loadFiles}
              >
                🔄 Refresh
              </button>
            </div>
            <div>
              {files.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px', color: '#6b7280' }}>
                  {loading ? 'Loading files...' : 'No markdown files found in workspace'}
                </div>
              ) : (
                files.map((file, index) => (
                  <div key={index} className="file-item">
                    <div>
                      <div style={{ fontWeight: '500' }}>{file.name}</div>
                      <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                        {file.size} • Modified {new Date(file.modified).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="space-x-2">
                      <button 
                        className="btn btn-sm" 
                        style={{ background: '#f1f5f9' }}
                        onClick={() => alert(`Would open ${file.name} for viewing`)}
                      >
                        👁️ View
                      </button>
                      <button 
                        className="btn btn-sm" 
                        style={{ background: '#f1f5f9' }}
                        onClick={() => alert(`Would open ${file.name} for editing`)}
                      >
                        ✏️ Edit
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {activeTab === 'terminal' && (
          <div className="card">
            <div className="card-header">
              <h2 className="card-title">💻 Terminal</h2>
              <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                Execute real commands on the server
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={commandInput}
                  onChange={(e) => setCommandInput(e.target.value)}
                  placeholder="Enter command (e.g., ls -la, pwd, date)..."
                  onKeyPress={(e) => e.key === 'Enter' && executeCommand()}
                  disabled={loading}
                />
                <button 
                  onClick={executeCommand}
                  className="btn btn-primary"
                  disabled={loading || !commandInput.trim()}
                  style={{ minWidth: '100px' }}
                >
                  {loading ? <span className="loading"></span> : '▶️ Execute'}
                </button>
              </div>
              
              {commandOutput && (
                <div className="command-output">
                  {commandOutput}
                </div>
              )}

              <div style={{ marginTop: '20px' }}>
                <div className="text-sm font-semibold mb-2">Quick Commands:</div>
                <div className="flex space-x-2" style={{ flexWrap: 'wrap', gap: '8px' }}>
                  {['ls -la', 'pwd', 'date', 'uptime', 'whoami', 'df -h'].map(cmd => (
                    <button
                      key={cmd}
                      onClick={() => setCommandInput(cmd)}
                      className="btn btn-sm"
                      style={{ background: '#f8fafc' }}
                    >
                      {cmd}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'chat' && (
          <div className="card">
            <div className="card-header">
              <h2 className="card-title">💬 Chat with BOBB Agent</h2>
              <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                Direct communication with your AI agent
              </div>
            </div>
            
            <div style={{ minHeight: '300px', maxHeight: '400px', overflowY: 'auto', marginBottom: '20px', padding: '10px', background: '#f8fafc', borderRadius: '8px' }}>
              {chatMessages.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px', color: '#6b7280' }}>
                  Start a conversation with BOBB...
                </div>
              ) : (
                chatMessages.map((msg, index) => (
                  <div 
                    key={index} 
                    className={`chat-bubble ${msg.type === 'agent' ? 'agent' : ''}`}
                    style={{ 
                      marginLeft: msg.type === 'agent' ? 'auto' : '0',
                      marginRight: msg.type === 'user' ? 'auto' : '0'
                    }}
                  >
                    <div style={{ fontWeight: '600', fontSize: '0.875rem', marginBottom: '4px' }}>
                      {msg.sender} • {msg.timestamp.toLocaleTimeString()}
                    </div>
                    <div>{msg.text}</div>
                  </div>
                ))
              )}
              {loading && (
                <div className="chat-bubble agent pulse">
                  <div>BOBB is typing...</div>
                </div>
              )}
            </div>

            <div className="flex space-x-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Type your message to BOBB..."
                onKeyPress={(e) => e.key === 'Enter' && chatWithBOBB()}
                disabled={loading}
              />
              <button 
                onClick={chatWithBOBB}
                className="btn btn-primary"
                disabled={loading || !chatInput.trim()}
                style={{ minWidth: '80px' }}
              >
                {loading ? <span className="loading"></span> : '📤 Send'}
              </button>
            </div>

            <div style={{ marginTop: '15px' }}>
              <div className="text-sm font-semibold mb-2">Quick Messages:</div>
              <div className="flex space-x-2" style={{ flexWrap: 'wrap', gap: '8px' }}>
                {[
                  'What\'s the system status?',
                  'Show me recent files',
                  'What tasks need attention?',
                  'Run a system check'
                ].map(msg => (
                  <button
                    key={msg}
                    onClick={() => setChatInput(msg)}
                    className="btn btn-sm"
                    style={{ background: '#f8fafc', fontSize: '0.8rem' }}
                  >
                    {msg}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
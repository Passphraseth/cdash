'use client'

import { useState, useEffect } from 'react'

export default function TeamDashboard() {
  const [activeTab, setActiveTab] = useState('overview')
  const [teamMembers] = useState([
    { id: 1, name: 'Dall', role: 'Team Lead', status: 'online', workload: 85, avatar: 'D', tasks: 12 },
    { id: 2, name: 'BOBB', role: 'AI Agent', status: 'online', workload: 92, avatar: 'B', tasks: 8 },
    { id: 3, name: 'Sarah', role: 'Developer', status: 'away', workload: 67, avatar: 'S', tasks: 5 },
    { id: 4, name: 'Mike', role: 'Designer', status: 'online', workload: 73, avatar: 'M', tasks: 7 },
    { id: 5, name: 'Alex', role: 'Analyst', status: 'busy', workload: 88, avatar: 'A', tasks: 9 }
  ])

  const [tasks] = useState([
    { id: 1, title: 'Dashboard UI Implementation', assignee: 'Sarah', priority: 'High', status: 'In Progress', due: '2026-02-10' },
    { id: 2, title: 'API Integration Setup', assignee: 'BOBB', priority: 'High', status: 'In Progress', due: '2026-02-09' },
    { id: 3, title: 'User Authentication Flow', assignee: 'Mike', priority: 'Medium', status: 'Review', due: '2026-02-12' },
    { id: 4, title: 'Performance Optimization', assignee: 'Alex', priority: 'Low', status: 'Planning', due: '2026-02-15' },
    { id: 5, title: 'Mobile Responsive Design', assignee: 'Sarah', priority: 'Medium', status: 'Todo', due: '2026-02-14' },
    { id: 6, title: 'Data Analytics Dashboard', assignee: 'Alex', priority: 'High', status: 'In Progress', due: '2026-02-11' }
  ])

  const [files] = useState([
    { name: 'AGENTS.md', size: '7.8 KB', modified: '2 hours ago', type: 'markdown' },
    { name: 'SOUL.md', size: '1.7 KB', modified: '4 hours ago', type: 'markdown' },
    { name: 'dashboard-architecture.md', size: '13.2 KB', modified: '1 day ago', type: 'markdown' },
    { name: 'team-structure.json', size: '2.4 KB', modified: '3 hours ago', type: 'json' },
    { name: 'marketing-strategy.md', size: '25.6 KB', modified: '5 hours ago', type: 'markdown' }
  ])

  const getStatusColor = (status) => {
    switch(status) {
      case 'online': return 'status-online'
      case 'away': return 'status-away'
      case 'busy': return 'status-busy'
      default: return 'status-away'
    }
  }

  const getWorkloadLevel = (workload) => {
    if (workload < 50) return 'low'
    if (workload < 80) return 'medium'
    return 'high'
  }

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'High': return '#ef4444'
      case 'Medium': return '#f59e0b'
      case 'Low': return '#10b981'
      default: return '#6b7280'
    }
  }

  return (
    <div>
      <div className="header">
        <nav className="nav">
          <h1>🚀 Team Dashboard</h1>
          <div className="nav-links">
            <a href="#" className="nav-link active">Dashboard</a>
            <a href="#" className="nav-link">Projects</a>
            <a href="#" className="nav-link">Files</a>
            <a href="#" className="nav-link">Settings</a>
          </div>
        </nav>
      </div>

      <div className="container">
        {/* Overview Metrics */}
        <div className="grid grid-3" style={{ marginBottom: '30px' }}>
          <div className="card">
            <div className="metric">
              <div className="metric-value">{teamMembers.length}</div>
              <div className="metric-label">Team Members</div>
            </div>
          </div>
          <div className="card">
            <div className="metric">
              <div className="metric-value">{tasks.filter(t => t.status === 'In Progress').length}</div>
              <div className="metric-label">Active Tasks</div>
            </div>
          </div>
          <div className="card">
            <div className="metric">
              <div className="metric-value">{Math.round(teamMembers.reduce((acc, m) => acc + m.workload, 0) / teamMembers.length)}%</div>
              <div className="metric-label">Avg Workload</div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-2">
          {/* Team Members */}
          <div className="card">
            <div className="card-header">
              <h2 className="card-title">👥 Team Members</h2>
              <button className="btn btn-primary btn-sm">+ Add Member</button>
            </div>
            <div>
              {teamMembers.map(member => (
                <div key={member.id} className="team-member">
                  <div className="avatar">{member.avatar}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontWeight: '600' }}>{member.name}</div>
                        <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>{member.role}</div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div className={`status ${getStatusColor(member.status)}`}>{member.status}</div>
                        <div style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '4px' }}>
                          {member.tasks} tasks
                        </div>
                      </div>
                    </div>
                    <div style={{ marginTop: '8px' }}>
                      <div style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '4px' }}>
                        Workload: {member.workload}%
                      </div>
                      <div className="progress-bar">
                        <div 
                          className={`progress-fill ${getWorkloadLevel(member.workload)}`}
                          style={{ width: `${member.workload}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Active Tasks */}
          <div className="card">
            <div className="card-header">
              <h2 className="card-title">📋 Active Tasks</h2>
              <button className="btn btn-success btn-sm">+ New Task</button>
            </div>
            <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
              {tasks.map(task => (
                <div key={task.id} className="task-item">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: '600', marginBottom: '4px' }}>{task.title}</div>
                      <div className="task-meta">
                        <span>Assigned to: <strong>{task.assignee}</strong></span>
                        <span style={{ 
                          color: getPriorityColor(task.priority),
                          fontWeight: '600',
                          marginLeft: '12px'
                        }}>
                          {task.priority}
                        </span>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ 
                        padding: '4px 8px',
                        borderRadius: '4px',
                        backgroundColor: '#f1f5f9',
                        fontSize: '0.75rem',
                        fontWeight: '600',
                        marginBottom: '4px'
                      }}>
                        {task.status}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                        Due: {new Date(task.due).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Files & Collaboration */}
        <div className="grid grid-2" style={{ marginTop: '20px' }}>
          {/* Recent Files */}
          <div className="card">
            <div className="card-header">
              <h2 className="card-title">📁 Recent Files</h2>
              <button className="btn btn-primary btn-sm">Browse All</button>
            </div>
            <div>
              {files.map((file, index) => (
                <div key={index} className="file-item">
                  <div>
                    <div style={{ fontWeight: '500' }}>{file.name}</div>
                    <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                      {file.size} • {file.modified}
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button className="btn btn-sm" style={{ background: '#f1f5f9' }}>View</button>
                    <button className="btn btn-sm" style={{ background: '#f1f5f9' }}>Edit</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="card">
            <div className="card-header">
              <h2 className="card-title">⚡ Quick Actions</h2>
            </div>
            <div className="grid" style={{ gap: '12px' }}>
              <button className="btn btn-primary">🎯 Create New Project</button>
              <button className="btn btn-success">👥 Schedule Team Meeting</button>
              <button className="btn btn-warning">📊 Generate Report</button>
              <button className="btn" style={{ background: '#8b5cf6', color: 'white' }}>
                🤖 Chat with BOBB Agent
              </button>
              <button className="btn" style={{ background: '#06b6d4', color: 'white' }}>
                🔄 Sync with External Tools
              </button>
              <button className="btn" style={{ background: '#84cc16', color: 'white' }}>
                📈 View Analytics
              </button>
            </div>
          </div>
        </div>

        {/* Status Bar */}
        <div style={{
          marginTop: '30px',
          padding: '15px',
          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
          borderRadius: '8px',
          color: 'white',
          textAlign: 'center'
        }}>
          <strong>✅ Dashboard Fully Operational</strong> • 
          Last sync: {new Date().toLocaleTimeString()} • 
          {teamMembers.filter(m => m.status === 'online').length} members online • 
          {tasks.filter(t => t.status === 'In Progress').length} tasks in progress
        </div>
      </div>
    </div>
  )
}
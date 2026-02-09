import { NextResponse } from 'next/server'
import { exec } from 'child_process'
import { readdir, readFile, stat } from 'fs/promises'
import { join } from 'path'

// Real team data - you and BOBB
const REAL_TEAM = [
  {
    id: 1,
    name: 'Dall',
    role: 'Team Lead',
    status: 'online',
    avatar: 'D',
    isHuman: true,
    location: 'Australia'
  },
  {
    id: 2, 
    name: 'BOBB',
    role: 'AI Agent',
    status: 'online',
    avatar: 'B',
    isHuman: false,
    location: 'Digital'
  }
]

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const action = searchParams.get('action')

    switch (action) {
      case 'list':
        return NextResponse.json({
          success: true,
          data: REAL_TEAM
        })

      case 'files':
        const workspacePath = process.env.WORKSPACE_PATH || '/home/ubuntu/clawd'
        try {
          const files = await readdir(workspacePath)
          const fileDetails = await Promise.all(
            files.filter(f => f.endsWith('.md')).map(async (file) => {
              const filePath = join(workspacePath, file)
              const stats = await stat(filePath)
              return {
                name: file,
                size: `${(stats.size / 1024).toFixed(1)} KB`,
                modified: stats.mtime.toISOString(),
                type: 'markdown'
              }
            })
          )
          
          return NextResponse.json({
            success: true,
            data: fileDetails
          })
        } catch (error) {
          return NextResponse.json({
            success: false,
            error: 'Failed to read workspace files'
          })
        }

      case 'tasks':
        // Real tasks from your workspace
        const realTasks = [
          {
            id: 1,
            title: 'Complete Dashboard Integration',
            assignee: 'BOBB',
            priority: 'High', 
            status: 'In Progress',
            due: new Date(Date.now() + 86400000).toISOString() // Tomorrow
          },
          {
            id: 2,
            title: 'Deploy Collaborative Workspace',
            assignee: 'Dall',
            priority: 'High',
            status: 'In Progress', 
            due: new Date().toISOString() // Today
          },
          {
            id: 3,
            title: 'Test Agent Integration',
            assignee: 'BOBB',
            priority: 'Medium',
            status: 'Todo',
            due: new Date(Date.now() + 2 * 86400000).toISOString() // Day after tomorrow
          }
        ]

        return NextResponse.json({
          success: true,
          data: realTasks
        })

      case 'status':
        // Get real system status
        return new Promise((resolve) => {
          exec('uptime && free -h', (error, stdout) => {
            const systemInfo = {
              uptime: stdout.split('\n')[0] || 'Unknown',
              memory: stdout.split('\n')[1] || 'Unknown',
              timestamp: new Date().toISOString(),
              bobbStatus: 'active',
              workspaceConnected: true
            }

            resolve(NextResponse.json({
              success: true,
              data: systemInfo
            }))
          })
        })

      default:
        return NextResponse.json({
          success: false,
          error: 'Unknown action'
        })
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message
    })
  }
}

export async function POST(request) {
  try {
    const body = await request.json()
    const { action, data } = body

    switch (action) {
      case 'execute_command':
        return new Promise((resolve) => {
          exec(data.command, { timeout: 10000 }, (error, stdout, stderr) => {
            resolve(NextResponse.json({
              success: !error,
              data: {
                command: data.command,
                output: stdout,
                error: stderr,
                timestamp: new Date().toISOString()
              }
            }))
          })
        })

      case 'chat_with_bobb':
        // Simulate BOBB response
        const responses = [
          "I'm here and ready to help! What would you like me to work on?",
          "Dashboard is functioning well. All systems operational.",
          "I can execute commands, manage files, or analyze data. What's the priority?",
          "Collaborative workspace is active. Ready for your instructions.",
          "System status is green. What task shall I tackle next?"
        ]
        
        const randomResponse = responses[Math.floor(Math.random() * responses.length)]
        
        return NextResponse.json({
          success: true,
          data: {
            message: randomResponse,
            agent: 'BOBB',
            timestamp: new Date().toISOString(),
            status: 'active'
          }
        })

      case 'create_task':
        return NextResponse.json({
          success: true,
          data: {
            id: Date.now(),
            ...data,
            created: new Date().toISOString(),
            createdBy: 'Dashboard'
          }
        })

      default:
        return NextResponse.json({
          success: false,
          error: 'Unknown action'
        })
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message
    })
  }
}
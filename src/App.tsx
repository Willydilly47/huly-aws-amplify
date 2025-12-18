import { useState, useEffect } from 'react';
import { 
  MagnifyingGlassIcon,
  BellIcon,
  UserCircleIcon
} from '@heroicons/react/24/outline';
import { Project, Task, Workspace } from './types';
import Sidebar from './components/Sidebar';
import ProjectView from './components/ProjectView';
import TaskBoard from './components/TaskBoard';
import './App.css';

// Mock data for demonstration
const mockWorkspace: Workspace = {
  id: '1',
  name: 'Huly Workspace',
  description: 'Team collaboration and project management',
  createdAt: '2024-01-01',
  members: [
    { id: '1', email: 'user@huly.com', name: 'John Doe', role: 'admin' },
    { id: '2', email: 'jane@huly.com', name: 'Jane Smith', role: 'member' },
    { id: '3', email: 'bob@huly.com', name: 'Bob Johnson', role: 'member' }
  ],
  projects: [
    {
      id: '1',
      name: 'Website Redesign',
      description: 'Complete redesign of company website',
      status: 'active',
      createdAt: '2024-01-15',
      updatedAt: '2024-01-20',
      ownerId: '1',
      color: '#3B82F6',
      members: []
    },
    {
      id: '2',
      name: 'Mobile App',
      description: 'Development of iOS and Android apps',
      status: 'active',
      createdAt: '2024-01-10',
      updatedAt: '2024-01-18',
      ownerId: '2',
      color: '#10B981',
      members: []
    },
    {
      id: '3',
      name: 'Marketing Campaign',
      description: 'Q1 marketing initiatives',
      status: 'active',
      createdAt: '2024-01-05',
      updatedAt: '2024-01-22',
      ownerId: '1',
      color: '#F59E0B',
      members: []
    }
  ]
};

const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Design Homepage',
    description: 'Create wireframes and mockups for homepage',
    status: 'in-progress',
    priority: 'high',
    assigneeId: '2',
    projectId: '1',
    createdAt: '2024-01-15',
    updatedAt: '2024-01-20',
    labels: ['design', 'frontend']
  },
  {
    id: '2',
    title: 'Setup Authentication',
    description: 'Implement user authentication system',
    status: 'todo',
    priority: 'high',
    assigneeId: '1',
    projectId: '2',
    createdAt: '2024-01-10',
    updatedAt: '2024-01-10',
    labels: ['backend', 'security']
  },
  {
    id: '3',
    title: 'Content Strategy',
    description: 'Develop content marketing strategy',
    status: 'review',
    priority: 'medium',
    assigneeId: '3',
    projectId: '3',
    createdAt: '2024-01-05',
    updatedAt: '2024-01-22',
    labels: ['marketing', 'content']
  }
];

function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [view, setView] = useState<'projects' | 'tasks' | 'team'>('projects');
  const [tasks] = useState<Task[]>(mockTasks);
  const [workspace] = useState<Workspace>(mockWorkspace);

  // Auto-select first project if none selected
  useEffect(() => {
    if (workspace.projects.length > 0 && !selectedProject) {
      setSelectedProject(workspace.projects[0]);
    }
  }, [workspace.projects, selectedProject]);

  const filteredTasks = selectedProject 
    ? tasks.filter(task => task.projectId === selectedProject.id)
    : [];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar 
        workspace={workspace}
        selectedProject={selectedProject}
        onProjectSelect={setSelectedProject}
        view={view}
        onViewChange={setView}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-semibold text-gray-900">
                {view === 'projects' && 'Projects'}
                {view === 'tasks' && selectedProject && `${selectedProject.name} - Tasks`}
                {view === 'team' && 'Team'}
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Notifications */}
              <button className="relative p-2 text-gray-400 hover:text-gray-500">
                <BellIcon className="h-6 w-6" />
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white"></span>
              </button>

              {/* User Profile */}
              <button className="flex items-center space-x-2 p-2 text-gray-700 hover:text-gray-900">
                <UserCircleIcon className="h-8 w-8" />
                <span className="text-sm font-medium">John Doe</span>
              </button>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-auto p-6">
          {view === 'projects' && (
            <ProjectView 
              workspace={workspace}
              onProjectSelect={setSelectedProject}
              selectedProject={selectedProject}
            />
          )}
          
          {view === 'tasks' && selectedProject && (
            <TaskBoard 
              tasks={filteredTasks}
              project={selectedProject}
            />
          )}
          
          {view === 'team' && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Team Members</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {workspace.members.map(member => (
                  <div key={member.id} className="border rounded-lg p-4">
                    <div className="flex items-center space-x-3">
                      <UserCircleIcon className="h-10 w-10 text-gray-400" />
                      <div>
                        <h3 className="font-medium text-gray-900">{member.name}</h3>
                        <p className="text-sm text-gray-500">{member.email}</p>
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          member.role === 'admin' ? 'bg-purple-100 text-purple-800' :
                          member.role === 'member' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {member.role}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;